// Ejecuta PHP con php-wasm dentro de un Web Worker, para poder detener bucles infinitos
const PHP_WASM_URL = 'https://cdn.jsdelivr.net/npm/php-wasm@0.2.0/PhpWeb.mjs'

// php-wasm se compiló para la página y referencia window/document al cargarse
globalThis.window ??= globalThis
globalThis.document ??= { addEventListener() {}, querySelector: () => null, getElementById: () => null }

let modulePromise = null
let isLoaded = false
let queue = Promise.resolve()

// Excepción no atrapada: siempre termina en «thrown in ... on line N»
const UNCAUGHT_PATTERN = /\n?Fatal error: Uncaught ([\s\S]*?)\nStack trace:[\s\S]*?\n {2}thrown in [^\n]+ on line (\d+)\n?/g
const ERROR_PATTERN = /\n?(Parse error|Fatal error|Warning|Notice|Deprecated): ([\s\S]*?) in (?:php-wasm run script|\/[^\s:]+)(?: on line |:)(\d+)\n?/g

function splitOutput(output, lineCount) {
  const problems = []
  const add = (level, message, line) => {
    const number = Number(line)
    problems.push({
      level,
      type: message.match(/^(\w+):/)?.[1] ?? level,
      message: message.trim(),
      line: number <= lineCount ? number : null,
    })
    return ''
  }
  const stdout = output
    .replace(UNCAUGHT_PATTERN, (_, detail, thrownLine) => {
      // «..., called in X on line 7 and defined in X:1»: la línea útil es la de la llamada
      const called = detail.match(/^([\s\S]*?), called in .*? on line (\d+)/)
      if (called) return add('Fatal error', called[1], called[2])
      return add('Fatal error', detail.replace(/ in (?:php-wasm run script|\/[^\s:]+):\d+$/, ''), thrownLine)
    })
    .replace(ERROR_PATTERN, (_, level, message, line) => add(level, message, line))
  const fatal = problems.find((problem) => problem.level !== 'Warning' && problem.level !== 'Notice' && problem.level !== 'Deprecated')
  return {
    stdout: stdout.replace(/^\n+/, ''),
    error: fatal ?? null,
    warnings: problems.filter((problem) => problem !== fatal),
  }
}

// Sustituye readline() (no disponible en wasm) por una versión que usa la entrada simulada
function stdinPrelude(stdin) {
  const values = stdin.map((value) => `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`).join(', ')
  return `function __leer($p = '') { static $i = 0; $v = [${values}][$i++] ?? false; echo $p, $v === false ? '' : $v . "\\n"; return $v; }`
}

// Crea los archivos de apoyo del ejemplo (fibo.php, carpetas con namespaces...)
function filesPrelude(files) {
  return Object.entries(files).map(([path, content]) => {
    const encoded = btoa(String.fromCharCode(...new TextEncoder().encode(content)))
    const folder = path.includes('/') ? `@mkdir('${path.slice(0, path.lastIndexOf('/'))}', 0777, true); ` : ''
    return `${folder}file_put_contents('${path}', base64_decode('${encoded}'));`
  }).join(' ')
}

async function run({ code, stdin = [], setup = '', files = {} }, post) {
  if (!isLoaded) post({ type: 'loading' })
  modulePromise ??= import(/* @vite-ignore */ PHP_WASM_URL)
  const { PhpWeb } = await modulePromise

  // Una instancia nueva por ejecución: así no quedan funciones declaradas de la anterior
  const php = new PhpWeb({ version: '8.4' })
  await php.binary
  isLoaded = true
  post({ type: 'started' })

  let output = ''
  php.addEventListener('output', (event) => { output += event.detail.join('') })
  php.addEventListener('error', (event) => { output += event.detail.join('') })

  const usesReadline = /\breadline\s*\(/.test(code)
  const prelude = [filesPrelude(files), setup, usesReadline && stdinPrelude(stdin)].filter(Boolean).join(' ')
  if (prelude) await php.run(`<?php ${prelude}`)
  output = ''

  // Se mantiene el código en las mismas líneas para que los errores apunten a la línea correcta
  let source = usesReadline ? code.replace(/\breadline\s*\(/g, '__leer(') : code
  if (!/^\s*<\?php/i.test(source)) source = `<?php ${source}`
  await php.run(source)

  return splitOutput(output, code.split('\n').length)
}

self.onmessage = ({ data }) => {
  const post = (message) => self.postMessage({ id: data.id, ...message })
  queue = queue.then(() => run(data, post)
    .then((result) => post({ type: 'result', result }))
    .catch((error) => {
      modulePromise = null
      post({ type: 'result', result: { stdout: '', error: { type: 'LoadError', message: String(error?.message ?? error) } } })
    }))
}
