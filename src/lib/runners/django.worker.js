// Ejecuta un proyecto Django real con Pyodide dentro de un Web Worker.
// Django no puede recargar sus modelos ni su configuración, así que cada worker atiende una sola ejecución.
const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/'
const WHEELS = [
  'https://files.pythonhosted.org/packages/c9/83/90ff2dbfac7b519ed77620bdbb827cd2d1a83faf00d076bf95056428bce7/django-6.1.2-py3-none-any.whl',
  'https://files.pythonhosted.org/packages/c0/1b/54f4ad77cd8a584fa70746c47df988e002cf1ee1eba43364d46f87803647/asgiref-3.12.1-py3-none-any.whl',
  'https://files.pythonhosted.org/packages/d9/50/f00935da0ec7cbf325f8dc4f772ae46fbc7b672dd62876e73f0a94adda57/sqlparse-0.6.0-py3-none-any.whl',
]
const WORKDIR = '/home/pyodide'

// Configuración de un proyecto típico, con base de datos SQLite en memoria
const SETTINGS = `
import os, sys, logging
os.environ['DJANGO_ALLOW_ASYNC_UNSAFE'] = 'true'   # Pyodide corre dentro de un bucle asíncrono
sys.path.insert(0, ${JSON.stringify(WORKDIR)})
sys.dont_write_bytecode = True
import django
from django.conf import settings
from pathlib import Path

_urls = 'miapp.urls' if Path(${JSON.stringify(WORKDIR)}, 'miapp', 'urls.py').exists() else 'django_ejemplo_urls'
settings.configure(
    DEBUG=True,
    SECRET_KEY='clave-solo-para-ejemplos',
    ALLOWED_HOSTS=['*'],
    ROOT_URLCONF=_urls,
    INSTALLED_APPS=[
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'miapp',
    ],
    MIDDLEWARE=[
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
        *[m for m in [os.environ.get('MIDDLEWARE_EXTRA')] if m],
    ],
    DATABASES={'default': {'ENGINE': 'django.db.backends.sqlite3', 'NAME': ':memory:'}},
    TEMPLATES=[{
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {'context_processors': [
            'django.template.context_processors.request',
            'django.contrib.auth.context_processors.auth',
            'django.contrib.messages.context_processors.messages',
        ]},
    }],
    STATIC_URL='static/',
    MEDIA_ROOT='/tmp/media',
    MEDIA_URL='media/',
    DEFAULT_AUTO_FIELD='django.db.models.BigAutoField',
    USE_TZ=True,
    TIME_ZONE='America/Lima',
    LANGUAGE_CODE='es',
    PASSWORD_HASHERS=['django.contrib.auth.hashers.MD5PasswordHasher'],   # rápido, solo para ejemplos
    # Pyodide necesita DJANGO_ALLOW_ASYNC_UNSAFE; en un proyecto real esta comprobación no saltaría
    SILENCED_SYSTEM_CHECKS=['async.E001'],
    LOGGING={'version': 1, 'disable_existing_loggers': False,
             'loggers': {'django.request': {'level': 'CRITICAL'}}},   # el error ya se muestra en la caja de error
)
django.setup()
from django.test.utils import setup_test_environment
setup_test_environment()   # para que el cliente de pruebas guarde respuesta.context, como en python manage.py test
from django.core.management import call_command
call_command('migrate', run_syncdb=True, verbosity=0)
`

let ready = null
let isReady = false

// Una descarga que falla por la red se reintenta una vez antes de mostrar el error
async function retry(task) {
  try {
    return await task(0)
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return task(1)
  }
}

async function prepare() {
  const { loadPyodide } = await retry((intento) => import(/* @vite-ignore */ `${PYODIDE_URL}pyodide.mjs${intento ? '?reintento' : ''}`))   // el navegador guarda en caché un import fallido
  const pyodide = await retry(() => loadPyodide({ indexURL: PYODIDE_URL }))
  const problemas = []
  await pyodide.loadPackage(['micropip', 'tzdata'], { errorCallback: (mensaje) => problemas.push(mensaje) })
  if (!pyodide.loadedPackages.micropip) {
    // A veces la primera descarga falla: se reintenta una vez antes de rendirse
    await pyodide.loadPackage(['micropip', 'tzdata'], { errorCallback: (mensaje) => problemas.push(mensaje) })
  }
  if (!pyodide.loadedPackages.micropip) throw new Error(`No se pudo cargar micropip: ${problemas.join(' | ')}`)
  await retry(() => pyodide.pyimport('micropip').install(WHEELS, { deps: false }))
  pyodide.runPython('import django')   // deja Django importado para que la ejecución sea rápida
  isReady = true
  return pyodide
}

// Deja solo las partes del error que vienen del código del ejemplo, no las internas de Django
function parseError(error) {
  const text = String(error.message ?? error)
  const lines = text.split('\n')
  const start = lines.findIndex((line) => line.includes('File "<exec>"') || line.includes(`File "${WORKDIR}/`))
  const relevant = start >= 0 ? lines.slice(start) : lines
  const kept = []
  let skipping = false
  for (const line of relevant) {
    if (/^\s*File "/.test(line)) skipping = !(line.includes('"<exec>"') || line.includes(`"${WORKDIR}/`))
    // Las líneas sin sangría (el mensaje del error, «During handling...») se conservan siempre
    if (!skipping || !/^\s/.test(line)) kept.push(line)
  }
  const message = relevant.filter((line) => line.trim()).at(-1) ?? text
  const lineMatches = [...kept.join('\n').matchAll(/File "(?:<exec>|[^"]+)", line (\d+)/g)]
  return {
    type: error.type ?? message.split(':')[0],
    message,
    line: lineMatches.length ? Number(lineMatches.at(-1)[1]) : null,
    details: kept.join('\n').replaceAll(`${WORKDIR}/`, '').trim(),
  }
}

async function run({ code, files = {}, mainFile, driver, middleware }, post) {
  if (!isReady) post({ type: 'loading' })
  const pyodide = await ready
  post({ type: 'started' })

  let stdout = ''
  const decoder = new TextDecoder()
  const write = (buffer) => {
    stdout += decoder.decode(buffer)
    return buffer.length
  }
  pyodide.setStdout({ write })
  pyodide.setStderr({ write })

  const allFiles = { 'miapp/__init__.py': '', ...files }
  if (mainFile) allFiles[mainFile] = code
  if (!Object.keys(allFiles).some((name) => name === 'miapp/models.py')) allFiles['miapp/models.py'] = ''
  if (!allFiles['miapp/urls.py']) allFiles['django_ejemplo_urls.py'] = 'urlpatterns = []\n'
  Object.entries(allFiles).forEach(([name, content]) => {
    const path = `${WORKDIR}/${name}`
    pyodide.FS.mkdirTree(path.slice(0, path.lastIndexOf('/')))
    pyodide.FS.writeFile(path, content)
  })

  const program = mainFile ? driver : code
  const globals = pyodide.globals.get('dict')()
  globals.set('__name__', '__main__')
  try {
    if (middleware) pyodide.runPython(`import os; os.environ['MIDDLEWARE_EXTRA'] = ${JSON.stringify(middleware)}`)
    pyodide.runPython(SETTINGS)
    pyodide.runPython(program, { globals })
    pyodide.runPython('import sys; sys.stdout.flush(); sys.stderr.flush()')
    return { stdout }
  } catch (error) {
    pyodide.runPython('import sys; sys.stdout.flush(); sys.stderr.flush()')
    const parsed = parseError(error)
    if (!mainFile) return { stdout, error: parsed }
    // La línea útil es la del archivo que se edita (views.py, models.py...), no la de probar.py
    const inMain = [...parsed.details.matchAll(new RegExp(`File "${mainFile}", line (\\d+)`, 'g'))]
    return { stdout, error: { ...parsed, line: inMain.length ? Number(inMain.at(-1)[1]) : null } }
  }
}

self.onmessage = ({ data }) => {
  const post = (message) => self.postMessage({ id: data.id, ...message })
  if (data.type === 'prepare') {
    ready ??= prepare()
    return
  }
  ready ??= prepare()
  run(data, post)
    .then((result) => post({ type: 'result', result }))
    .catch((error) => post({ type: 'result', result: { stdout: '', error: { type: 'LoadError', message: String(error?.message ?? error) } } }))
}
