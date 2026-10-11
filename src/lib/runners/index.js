import { runJavaScript } from './javascript'
import { runPostgres } from './postgres'

const TIMEOUT_MS = 5000

const TIMEOUT_ERROR = {
  type: 'Timeout',
  message: `El programa no terminó en ${TIMEOUT_MS / 1000} segundos y se detuvo.`,
}

// Mantiene un Web Worker por lenguaje y lo reinicia si una ejecución se queda colgada
function createWorkerRunner(createWorker) {
  let worker = null
  let nextId = 0
  const pending = new Map()

  const restart = (reason) => {
    worker?.terminate()
    worker = null
    pending.forEach(({ resolve, timer }) => {
      clearTimeout(timer)
      resolve({ stdout: '', error: reason })
    })
    pending.clear()
  }

  const getWorker = () => {
    if (worker) return worker
    worker = createWorker()
    worker.onmessage = ({ data }) => {
      const job = pending.get(data.id)
      if (!job) return
      if (data.type === 'loading') job.onStatus?.('loading')
      if (data.type === 'started') {
        job.onStatus?.('running')
        job.timer = setTimeout(() => {
          pending.delete(data.id)
          job.resolve({ stdout: '', error: TIMEOUT_ERROR })
          restart({ type: 'Interrupted', message: 'Se reinició el intérprete. Vuelve a ejecutar.' })
        }, TIMEOUT_MS)
      }
      if (data.type === 'result') {
        clearTimeout(job.timer)
        pending.delete(data.id)
        job.resolve(data.result)
      }
    }
    worker.onerror = (event) => {
      event.preventDefault()
      restart({ type: 'LoadError', message: event.message || 'No se pudo iniciar el intérprete.' })
    }
    return worker
  }

  return (request, onStatus) => new Promise((resolve) => {
    const id = ++nextId
    pending.set(id, { resolve, onStatus, timer: null })
    getWorker().postMessage({ id, ...request })
  })
}

const runPython = createWorkerRunner(() => new Worker(new URL('./python.worker.js', import.meta.url), { type: 'module' }))
const runPhp = createWorkerRunner(() => new Worker(new URL('./php.worker.js', import.meta.url), { type: 'module' }))

const DJANGO_TIMEOUT_MS = 15000

// Django no puede recargar modelos ni configuración: cada ejecución usa un worker nuevo.
// Mientras tanto se prepara el siguiente en segundo plano para que la próxima ejecución sea rápida.
function createDjangoRunner() {
  const createWorker = () => new Worker(new URL('./django.worker.js', import.meta.url), { type: 'module' })
  let spare = null
  let nextId = 0

  const prepareSpare = () => {
    spare = createWorker()
    spare.postMessage({ type: 'prepare' })
  }

  return (request, onStatus) => new Promise((resolve) => {
    const worker = spare ?? createWorker()
    spare = null
    const id = ++nextId
    let timer = null

    const finish = (result) => {
      clearTimeout(timer)
      worker.terminate()
      prepareSpare()
      resolve(result)
    }

    worker.onmessage = ({ data }) => {
      if (data.id !== id) return
      if (data.type === 'loading') onStatus?.('loading')
      if (data.type === 'started') {
        onStatus?.('running')
        timer = setTimeout(() => finish({ stdout: '', error: TIMEOUT_ERROR_DJANGO }), DJANGO_TIMEOUT_MS)
      }
      if (data.type === 'result') finish(data.result)
    }
    worker.onerror = (event) => {
      event.preventDefault()
      finish({ stdout: '', error: { type: 'LoadError', message: event.message || 'No se pudo iniciar Django.' } })
    }
    worker.postMessage({ id, ...request })
  })
}

const TIMEOUT_ERROR_DJANGO = {
  type: 'Timeout',
  message: `El programa no terminó en ${DJANGO_TIMEOUT_MS / 1000} segundos y se detuvo.`,
}

const runDjango = createDjangoRunner()

const RUNNERS = {
  python: { run: runPython, name: 'Python', size: '~10 MB' },
  php: { run: runPhp, name: 'PHP', size: '~12 MB' },
  javascript: { run: runJavaScript, name: 'JavaScript' },
  postgresql: { run: runPostgres, name: 'PostgreSQL', size: '~3 MB' },
  django: { run: runDjango, name: 'Python y Django', size: '~20 MB' },
}

export const canRun = (language) => language in RUNNERS

export function loadingMessage(language) {
  const { name, size } = RUNNERS[language]
  return size ? `Descargando ${name} (${size}, solo la primera vez)…` : `Preparando ${name}…`
}

/**
 * Ejecuta código de verdad en el navegador.
 * Devuelve { stdout, screen?, notes?, warnings?, error?: { type, message, line?, details?, hint? } }.
 */
export function runCode(language, request, onStatus) {
  return RUNNERS[language].run(request, onStatus)
}
