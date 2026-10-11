// Ejecuta Python con Pyodide dentro de un Web Worker, para poder detener bucles infinitos
const PYODIDE_URL = 'https://cdn.jsdelivr.net/npm/pyodide@314.0.7/'

let pyodidePromise = null
let queue = Promise.resolve()

const getPyodide = () => {
  pyodidePromise ??= import(/* @vite-ignore */ `${PYODIDE_URL}pyodide.mjs`)
    .then(({ loadPyodide }) => loadPyodide({ indexURL: PYODIDE_URL }))
  return pyodidePromise
}

// Deja solo las líneas del traceback que pertenecen al código del usuario
function parseError(error, code) {
  const lines = String(error.message ?? error).split('\n')
  const start = lines.findIndex((line) => line.includes('File "<exec>"'))
  const relevant = start >= 0 ? lines.slice(start) : lines
  const lineMatches = [...relevant.join('\n').matchAll(/File "<exec>", line (\d+)/g)]
  const message = relevant.filter((line) => line.trim()).at(-1) ?? String(error)
  const line = lineMatches.length ? Number(lineMatches.at(-1)[1]) : null
  return {
    type: error.type ?? message.split(':')[0],
    message,
    line: line && line <= code.split('\n').length ? line : null,
    // Las rutas internas del navegador no aportan nada a quien aprende
    details: relevant.join('\n').replaceAll(`${WORKDIR}/`, '').trim(),
  }
}

const WORKDIR = '/home/pyodide'
let writtenFiles = []

// Escribe los módulos de apoyo del ejemplo (fibo.py, paquetes...) y olvida los de la ejecución anterior
function prepareFiles(pyodide, files) {
  writtenFiles.forEach((path) => {
    try { pyodide.FS.unlink(path) } catch { /* ya no existe */ }
  })
  writtenFiles = []
  Object.entries(files).forEach(([name, content]) => {
    const path = `${WORKDIR}/${name}`
    pyodide.FS.mkdirTree(path.slice(0, path.lastIndexOf('/')))
    pyodide.FS.writeFile(path, content)
    writtenFiles.push(path)
  })
  pyodide.runPython(`
import sys, importlib
sys.dont_write_bytecode = True
if ${JSON.stringify(WORKDIR)} not in sys.path:
    sys.path.insert(0, ${JSON.stringify(WORKDIR)})
for _nombre, _modulo in list(sys.modules.items()):
    _rutas = [getattr(_modulo, '__file__', None) or '', *(getattr(_modulo, '__path__', None) or [])]
    if any(str(_ruta).startswith(${JSON.stringify(WORKDIR)}) for _ruta in _rutas):
        del sys.modules[_nombre]
importlib.invalidate_caches()
`)
}

async function run({ code, stdin = [], files = {} }, post) {
  if (!pyodidePromise) post({ type: 'loading' })
  const pyodide = await getPyodide()
  post({ type: 'started' })
  prepareFiles(pyodide, files)

  const decoder = new TextDecoder()
  const input = [...stdin]
  let stdout = ''
  const write = (buffer) => {
    stdout += decoder.decode(buffer)
    return buffer.length
  }
  pyodide.setStdout({ write })
  pyodide.setStderr({ write })
  pyodide.setStdin({
    stdin: () => {
      const value = input.shift()
      if (value === undefined) return undefined
      stdout += `${value}\n`
      return value
    },
  })

  const globals = pyodide.globals.get('dict')()
  globals.set('__name__', '__main__')  // el código del usuario es el programa principal
  // print(..., end=',') deja texto sin salto de línea en el búfer: hay que vaciarlo al terminar
  const flush = () => pyodide.runPython('import sys; sys.stdout.flush(); sys.stderr.flush()')
  try {
    // El modo asíncrono convierte StopIteration en RuntimeError: solo se usa si hace falta
    if (/\bawait\b/.test(code)) await pyodide.runPythonAsync(code, { globals })
    else pyodide.runPython(code, { globals })
    flush()
    return { stdout }
  } catch (error) {
    flush()
    return { stdout, error: parseError(error, code) }
  } finally {
    globals.destroy()
  }
}

self.onmessage = ({ data }) => {
  const post = (message) => self.postMessage({ id: data.id, ...message })
  queue = queue.then(() => run(data, post)
    .then((result) => post({ type: 'result', result }))
    .catch((error) => {
      pyodidePromise = null
      post({ type: 'result', result: { stdout: '', error: { type: 'LoadError', message: String(error?.message ?? error) } } })
    }))
}
