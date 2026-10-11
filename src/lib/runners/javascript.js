// Ejecuta JavaScript en un iframe aislado (sandbox) con el HTML que necesita cada ejemplo
const TIMEOUT_MS = 4000

let nextRunId = 0

function buildDocument(code, { html = '', after = '', fetchData }, runId) {
  // "<" se escapa para que el código no pueda cerrar la etiqueta <script>
  const source = JSON.stringify(code).replace(/</g, '\\u003c')
  const mockFetch = fetchData === undefined
    ? ''
    : `window.fetch = async () => new Response(${JSON.stringify(JSON.stringify(fetchData)).replace(/</g, '\\u003c')}, { headers: { 'Content-Type': 'application/json' } });`

  return `<!doctype html><html><head><meta charset="utf-8"></head><body>${html}<script type="module">
const logs = [];
let failure = null;
const show = (value) => {
  if (typeof value === 'string') return value;
  try { return JSON.stringify(value); } catch { return String(value); }
};
const lineOf = (error) => {
  const match = String(error?.stack ?? '').match(/blob:[^\\s)]*:(\\d+):\\d+/);
  return match ? Number(match[1]) : null;
};
const fail = (error, line) => {
  failure ??= { type: error?.name ?? 'Error', message: \`\${error?.name ?? 'Error'}: \${error?.message ?? error}\`, line: line ?? lineOf(error) };
};
console.log = (...values) => logs.push(values.map(show).join(' '));
console.error = console.warn = console.info = console.log;
window.alert = (message) => logs.push('Alerta: ' + message);
window.addEventListener('error', (event) => fail(event.error ?? { message: event.message }, event.lineno || null));
window.addEventListener('unhandledrejection', (event) => fail(event.reason));
${mockFetch}
try {
  const url = URL.createObjectURL(new Blob([${source}], { type: 'text/javascript' }));
  await import(url);
  ${after}
  await new Promise((resolve) => setTimeout(resolve, 50));
} catch (error) {
  fail(error);
}
parent.postMessage({ runId: ${runId}, logs, screen: document.body.innerText.trim(), error: failure }, '*');
</script></body></html>`
}

export function runJavaScript({ code, setup = {} }) {
  return new Promise((resolve) => {
    const runId = ++nextRunId
    const iframe = document.createElement('iframe')
    iframe.setAttribute('sandbox', 'allow-scripts')
    iframe.setAttribute('aria-hidden', 'true')
    iframe.tabIndex = -1
    iframe.style.cssText = 'position:fixed;left:-10000px;top:0;width:480px;height:320px;border:0;'

    const finish = (result) => {
      clearTimeout(timer)
      window.removeEventListener('message', onMessage)
      iframe.remove()
      resolve(result)
    }

    const onMessage = (event) => {
      if (event.source !== iframe.contentWindow || event.data?.runId !== runId) return
      const { logs, screen, error } = event.data
      finish({
        stdout: logs.join('\n'),
        screen: setup.screen === false ? '' : screen,
        error,
      })
    }

    const timer = setTimeout(() => finish({
      stdout: '',
      error: { type: 'Timeout', message: 'El código tardó demasiado en terminar.' },
    }), TIMEOUT_MS)

    window.addEventListener('message', onMessage)
    iframe.srcdoc = buildDocument(code, setup, runId)
    document.body.append(iframe)
  })
}
