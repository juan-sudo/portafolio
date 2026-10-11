// React · temas del curso «React.JS, Guía desde 0» (Udemy): buscador local, React Router, llamadas a la API,
// Context API, Zustand, Redux Toolkit con RTK Query y Tailwind CSS, más un nivel final de prácticas profesionales.

import { code, text } from './reactHelpers'

export const reactCourseLevels = [
  {
    title: 'Primer proyecto: buscador local',
    topics: [
      text(
        'Qué se construye en el buscador',
        `Una pantalla con un campo de búsqueda y una lista de personas que se filtra mientras el usuario escribe. Los datos están en un archivo local, sin servidor.

Es el primer ejemplo del curso porque reúne lo esencial: dividir en componentes, pasar props, guardar el texto en el estado, calcular la lista filtrada y renderizarla con map.`,
      ),
      code(
        'Organizar las carpetas del proyecto',
        `src/
├── main.jsx
├── App.jsx
├── assets/               ← imágenes y fuentes
├── components/           ← componentes reutilizables en toda la aplicación
│   └── ui/               ← botones, campos, tarjetas
├── features/             ← una carpeta por funcionalidad
│   └── buscador/
│       ├── components/   ← piezas que solo usa esta funcionalidad
│       ├── hooks/
│       ├── data/
│       └── Buscador.jsx
├── hooks/                ← Hooks compartidos
├── pages/                ← una por ruta
├── services/             ← llamadas a la API
├── store/                ← estado global
└── utils/                ← funciones puras de ayuda`,
        'React no impone una estructura. Agrupar por funcionalidad mantiene junto lo que cambia junto; agrupar solo por tipo (todos los componentes en una carpeta) deja de ser cómodo cuando el proyecto crece.',
      ),
      code(
        'Datos locales y componentes de presentación',
        `// features/buscador/data/personas.js
export const personas = [
  { id: 1, nombre: 'Ana Torres', correo: 'ana@correo.com', ciudad: 'Lima' },
  { id: 2, nombre: 'Luis Ramos', correo: 'luis@correo.com', ciudad: 'Cusco' },
  { id: 3, nombre: 'Marta Díaz', correo: 'marta@correo.com', ciudad: 'Arequipa' },
]

// components/TarjetaPersona.jsx
export function TarjetaPersona({ persona }) {
  return (
    <li className="tarjeta">
      <h3>{persona.nombre}</h3>
      <p>{persona.correo} · {persona.ciudad}</p>
    </li>
  )
}

// components/CampoBusqueda.jsx
export function CampoBusqueda({ valor, alCambiar }) {
  return (
    <input
      type="search"
      value={valor}
      placeholder="Buscar por nombre o ciudad…"
      onChange={(evento) => alCambiar(evento.target.value)}
    />
  )
}`,
        'Son componentes de presentación: reciben datos y funciones por props y no saben de dónde vienen. Por eso se pueden reutilizar y probar con facilidad.',
      ),
      code(
        'Filtrar mientras se escribe',
        `import { useState } from 'react'
import { personas } from './data/personas'

const normalizar = (texto) =>
  texto.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase().trim()

export default function Buscador() {
  const [texto, setTexto] = useState('')

  const consulta = normalizar(texto)
  const resultados = personas.filter((persona) =>
    normalizar(persona.nombre).includes(consulta)
    || normalizar(persona.ciudad).includes(consulta),
  )

  return (
    <section>
      <CampoBusqueda valor={texto} alCambiar={setTexto} />
      <p>{resultados.length} resultado(s)</p>

      {resultados.length === 0 ? (
        <p>No se encontró a nadie con «{texto}».</p>
      ) : (
        <ul>
          {resultados.map((persona) => (
            <TarjetaPersona key={persona.id} persona={persona} />
          ))}
        </ul>
      )}
    </section>
  )
}`,
        'El único estado es el texto: la lista filtrada se calcula en cada renderizado. normalizar quita tildes y mayúsculas para que «diaz» encuentre a «Díaz».',
      ),
      code(
        'Instalar Tailwind CSS',
        `$ npm install tailwindcss @tailwindcss/vite

// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})

/* src/index.css */
@import "tailwindcss";`,
        'Es la instalación de Tailwind 4 con su plugin para Vite. En Tailwind 3 se usaban postcss, autoprefixer y un archivo tailwind.config.js con las rutas de content.',
      ),
      code(
        'Dar estilo con clases utilitarias',
        `export function TarjetaPersona({ persona, destacada }) {
  return (
    <li
      className={
        'rounded-xl border p-4 shadow-sm transition hover:shadow-md '
        + (destacada ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 bg-white')
      }
    >
      <h3 className="text-lg font-semibold text-slate-900">{persona.nombre}</h3>
      <p className="text-sm text-slate-500">{persona.correo}</p>
    </li>
  )
}

<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">...</ul>

<input className="w-full rounded-lg border border-slate-300 px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-indigo-500" />`,
        'Cada clase aplica una sola regla CSS. Los prefijos sm:, md: y lg: aplican la clase a partir de un ancho de pantalla, y hover: o focus: en ese estado. Escribe los nombres de clase completos: Tailwind busca texto en tus archivos y no detecta clases construidas a trozos, como "bg-" + color + "-500".',
      ),
      code(
        'Extraer un Hook para la búsqueda',
        `// hooks/useBusqueda.js
import { useMemo, useState } from 'react'

export function useBusqueda(elementos, campos) {
  const [texto, setTexto] = useState('')

  const resultados = useMemo(() => {
    const consulta = normalizar(texto)
    if (!consulta) return elementos

    return elementos.filter((elemento) =>
      campos.some((campo) => normalizar(String(elemento[campo])).includes(consulta)),
    )
  }, [elementos, campos, texto])

  return { texto, setTexto, resultados }
}

// Fuera del componente para que el arreglo sea siempre el mismo
const CAMPOS = ['nombre', 'ciudad']

export default function Buscador() {
  const { texto, setTexto, resultados } = useBusqueda(personas, CAMPOS)
  // ...
}`,
        'El mismo Hook sirve ahora para buscar productos, artículos o cualquier otra lista.',
      ),
    ],
  },
  {
    title: 'React Router',
    topics: [
      text(
        'Qué es una SPA y para qué sirve el router',
        `En una aplicación de una sola página (SPA) el servidor entrega un único index.html. Al pulsar un enlace no se pide otra página: JavaScript cambia lo que se ve y actualiza la URL.

React no trae enrutamiento. React Router es la librería más usada: asocia cada URL con un componente, permite enlaces sin recarga, lee parámetros de la dirección y mantiene funcionando los botones de atrás y adelante del navegador.

Los ejemplos usan la API declarativa de React Router 6 y 7. En la versión 7 todo se importa de react-router; en la 6, de react-router-dom.`,
      ),
      code(
        'Instalar y definir las rutas',
        `$ npm install react-router

// main.jsx
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

// App.jsx
import { Route, Routes } from 'react-router'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/productos/:id" element={<DetalleProducto />} />
      <Route path="*" element={<NoEncontrado />} />
    </Routes>
  )
}`,
        'Routes elige la ruta que mejor coincide con la URL actual; el orden no importa. path="*" captura todo lo que no coincidió y sirve para la página 404.',
      ),
      code(
        'Enlaces: Link y NavLink',
        `import { Link, NavLink } from 'react-router'

function Menu() {
  return (
    <nav>
      <Link to="/">Logo</Link>

      <NavLink to="/" end className={({ isActive }) => (isActive ? 'enlace activo' : 'enlace')}>
        Inicio
      </NavLink>
      <NavLink to="/productos" className={({ isActive }) => (isActive ? 'enlace activo' : 'enlace')}>
        Productos
      </NavLink>
    </nav>
  )
}`,
        'Link navega sin recargar la página; una etiqueta <a href> normal la recargaría y se perdería el estado. NavLink sabe si su ruta está activa. La prop end hace que "/" solo se marque activo en la raíz exacta.',
      ),
      code(
        'Parámetros de la URL',
        `import { useParams, useSearchParams } from 'react-router'

// Ruta: /productos/:id        URL: /productos/42
function DetalleProducto() {
  const { id } = useParams()   // '42', siempre es texto
  const producto = productos.find((p) => p.id === Number(id))

  if (!producto) return <NoEncontrado />
  return <h1>{producto.nombre}</h1>
}

// URL: /productos?categoria=ropa&pagina=2
function Productos() {
  const [params, setParams] = useSearchParams()

  const categoria = params.get('categoria') ?? 'todas'
  const pagina = Number(params.get('pagina') ?? 1)

  return (
    <button onClick={() => setParams({ categoria, pagina: String(pagina + 1) })}>
      Página siguiente
    </button>
  )
}`,
        'Guardar los filtros y la página en la URL permite recargar, compartir el enlace y usar el botón atrás sin perder la vista.',
      ),
      code(
        'Navegar desde el código',
        `import { Navigate, useNavigate } from 'react-router'

function FormularioProducto() {
  const navigate = useNavigate()

  async function alEnviar(evento) {
    evento.preventDefault()
    const creado = await guardar(datos)
    navigate('/productos/' + creado.id)
  }

  return (
    <form onSubmit={alEnviar}>
      {/* ... */}
      <button type="button" onClick={() => navigate(-1)}>Cancelar</button>
    </form>
  )
}

// Redirigir durante el renderizado
function RutaAntigua() {
  return <Navigate to="/productos" replace />
}`,
        'navigate(-1) equivale al botón atrás. replace sustituye la entrada actual del historial en lugar de añadir una nueva, para que «atrás» no devuelva al usuario a la redirección.',
      ),
      code(
        'Rutas anidadas y layouts con Outlet',
        `import { Outlet, Route, Routes } from 'react-router'

function LayoutPrincipal() {
  return (
    <>
      <Menu />
      <main>
        <Outlet />   {/* aquí se dibuja la ruta hija */}
      </main>
      <Pie />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<LayoutPrincipal />}>
        <Route index element={<Inicio />} />
        <Route path="productos" element={<Productos />} />
        <Route path="productos/:id" element={<DetalleProducto />} />
      </Route>

      <Route path="panel" element={<LayoutPanel />}>
        <Route index element={<Resumen />} />
        <Route path="ajustes" element={<Ajustes />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="*" element={<NoEncontrado />} />
    </Routes>
  )
}`,
        'El layout se dibuja una vez y solo cambia lo que hay en <Outlet />. index marca la ruta hija que se muestra en la dirección del padre.',
      ),
      code(
        'Proteger rutas',
        `import { Navigate, Outlet, useLocation } from 'react-router'

function RutaProtegida({ rol }) {
  const { usuario, cargando } = useAuth()
  const location = useLocation()

  if (cargando) return <p>Comprobando sesión…</p>

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />
  }

  if (rol && usuario.rol !== rol) return <Navigate to="/" replace />

  return <Outlet />
}

<Route element={<RutaProtegida />}>
  <Route path="perfil" element={<Perfil />} />
</Route>

<Route element={<RutaProtegida rol="admin" />}>
  <Route path="panel" element={<Panel />} />
</Route>

// En Login, tras autenticarse
const destino = location.state?.desde ?? '/'
navigate(destino, { replace: true })`,
        'Proteger rutas en el cliente es experiencia de usuario, no seguridad: el código llega igual al navegador. El servidor debe comprobar el permiso en cada petición.',
      ),
      code(
        'Cargar páginas de forma diferida',
        `import { Suspense, lazy } from 'react'

const Panel = lazy(() => import('./pages/Panel.jsx'))
const Ajustes = lazy(() => import('./pages/Ajustes.jsx'))

export default function App() {
  return (
    <Suspense fallback={<p>Cargando página…</p>}>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/ajustes" element={<Ajustes />} />
      </Routes>
    </Suspense>
  )
}`,
        'Cada página diferida se empaqueta en un archivo aparte que se descarga la primera vez que se visita, reduciendo lo que hay que cargar al entrar.',
      ),
    ],
  },
  {
    title: 'Comunicación con la API: Fetch y Axios',
    topics: [
      text(
        'Cómo habla el frontend con el backend',
        `Una API REST expone recursos en direcciones URL y se opera sobre ellos con los métodos HTTP: GET para leer, POST para crear, PUT o PATCH para modificar y DELETE para eliminar. Los datos viajan casi siempre en formato JSON.

Toda petición es asíncrona y puede acabar de tres formas, así que la interfaz necesita tres estados: cargando, error y datos. Los códigos de respuesta indican el resultado: 2xx éxito, 4xx error de quien pide (400 datos inválidos, 401 sin sesión, 403 sin permiso, 404 no existe) y 5xx error del servidor.`,
      ),
      code(
        'Variables de entorno en Vite',
        `# .env  (no se sube al repositorio)
VITE_API_URL=http://localhost:3000/api

# .env.production
VITE_API_URL=https://api.mitienda.com

// en el código
const API_URL = import.meta.env.VITE_API_URL`,
        'Solo las variables que empiezan por VITE_ llegan al código del navegador. Se incrustan al compilar, de modo que cualquiera puede verlas: nunca pongas ahí una contraseña o una clave privada.',
      ),
      code(
        'Pedir datos con fetch',
        `import { useEffect, useState } from 'react'

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controlador = new AbortController()

    async function cargar() {
      try {
        const respuesta = await fetch(API_URL + '/usuarios', { signal: controlador.signal })

        // fetch NO lanza error con un 404 o un 500: hay que comprobarlo
        if (!respuesta.ok) throw new Error('Error ' + respuesta.status)

        setUsuarios(await respuesta.json())
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setCargando(false)
      }
    }

    cargar()
    return () => controlador.abort()   // cancela si el componente se desmonta
  }, [])

  if (cargando) return <p>Cargando…</p>
  if (error) return <p className="error">No se pudieron cargar los usuarios: {error}</p>

  return <ul>{usuarios.map((u) => <li key={u.id}>{u.nombre}</li>)}</ul>
}`,
        'fetch viene con el navegador. Solo rechaza la promesa ante un fallo de red; un 404 o un 500 se consideran respuestas válidas. AbortController cancela la petición en curso.',
      ),
      code(
        'Enviar datos con fetch',
        `async function crearUsuario(datos) {
  const respuesta = await fetch(API_URL + '/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })

  if (!respuesta.ok) {
    const detalle = await respuesta.json().catch(() => ({}))
    throw new Error(detalle.mensaje ?? 'No se pudo crear el usuario')
  }

  return respuesta.json()
}

async function actualizarUsuario(id, cambios) {
  const respuesta = await fetch(API_URL + '/usuarios/' + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cambios),
  })
  if (!respuesta.ok) throw new Error('No se pudo actualizar')
  return respuesta.json()
}

async function eliminarUsuario(id) {
  const respuesta = await fetch(API_URL + '/usuarios/' + id, { method: 'DELETE' })
  if (!respuesta.ok) throw new Error('No se pudo eliminar')
}`,
        'Con fetch hay que convertir el cuerpo a JSON, poner la cabecera y comprobar respuesta.ok a mano en cada llamada.',
      ),
      code(
        'Axios: una instancia configurada',
        `$ npm install axios

// services/api.js
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// services/usuarios.js
export const obtenerUsuarios = (params) => api.get('/usuarios', { params }).then((r) => r.data)
export const obtenerUsuario = (id) => api.get('/usuarios/' + id).then((r) => r.data)
export const crearUsuario = (datos) => api.post('/usuarios', datos).then((r) => r.data)
export const actualizarUsuario = (id, cambios) => api.patch('/usuarios/' + id, cambios).then((r) => r.data)
export const eliminarUsuario = (id) => api.delete('/usuarios/' + id)`,
        'Frente a fetch, Axios convierte JSON automáticamente, rechaza la promesa con cualquier código que no sea 2xx, permite una URL base, tiempo de espera e interceptores. La respuesta del servidor está en la propiedad data.',
      ),
      code(
        'Interceptores de Axios',
        `// Antes de cada petición: añade el token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = 'Bearer ' + token
  return config
})

// Después de cada respuesta: trata los errores comunes
api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.assign('/login')
    }

    const mensaje = error.response?.data?.mensaje ?? 'Error de conexión'
    return Promise.reject(new Error(mensaje))
  },
)`,
        'Los interceptores centralizan lo que se repite en todas las llamadas. error.response existe cuando el servidor respondió con un error; si no existe, la petición no llegó a completarse.',
      ),
      code(
        'Un Hook para reutilizar la carga de datos',
        `// hooks/usePeticion.js
import { useCallback, useEffect, useState } from 'react'

export function usePeticion(funcion, dependencias = []) {
  const [datos, setDatos] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    let ignorar = false
    setCargando(true)
    setError(null)

    funcion()
      .then((resultado) => { if (!ignorar) setDatos(resultado) })
      .catch((err) => { if (!ignorar) setError(err.message) })
      .finally(() => { if (!ignorar) setCargando(false) })

    return () => { ignorar = true }
  }, [...dependencias, version])

  const recargar = useCallback(() => setVersion((v) => v + 1), [])

  return { datos, cargando, error, recargar }
}

function DetalleUsuario({ id }) {
  const { datos: usuario, cargando, error, recargar } = usePeticion(() => obtenerUsuario(id), [id])
  // ...
}`,
        'Evita repetir los tres estados en cada componente. Para aplicaciones reales suele compensar una librería de datos como TanStack Query o RTK Query, que añaden caché, reintentos y revalidación.',
      ),
      code(
        'Crear, editar y eliminar actualizando la lista',
        `function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [guardando, setGuardando] = useState(false)

  async function alCrear(datos) {
    setGuardando(true)
    try {
      const creado = await crearUsuario(datos)
      setUsuarios((actuales) => [...actuales, creado])
    } finally {
      setGuardando(false)
    }
  }

  async function alEliminar(id) {
    if (!confirm('¿Eliminar este usuario?')) return

    const anteriores = usuarios
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id))   // optimista

    try {
      await eliminarUsuario(id)
    } catch {
      setUsuarios(anteriores)   // si falla, se deshace
      alert('No se pudo eliminar')
    }
  }
}`,
        'Tras crear se añade a la lista el objeto que devuelve el servidor, que ya trae su id. Al eliminar se actualiza la interfaz de inmediato y se revierte si la petición falla.',
      ),
    ],
  },
  {
    title: 'Context API en la práctica',
    topics: [
      text(
        'Cuándo usar contexto',
        `El contexto sirve para datos que necesitan muchos componentes en distintos niveles y que cambian poco: el usuario con sesión iniciada, el tema claro u oscuro, el idioma.

No es un gestor de estado en sí mismo: solo transporta un valor. El estado sigue estando en un useState o un useReducer dentro del componente proveedor.

Limitación principal: cuando el valor cambia, se vuelven a renderizar todos los componentes que lo consumen. Para estado global que cambia a menudo o que es grande, una librería como Zustand o Redux Toolkit resulta más cómoda y eficiente.`,
      ),
      code(
        'Proveedor de autenticación',
        `// context/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  // Al arrancar: recupera la sesión si hay un token guardado
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setCargando(false)
      return
    }
    api.get('/auth/yo')
      .then((respuesta) => setUsuario(respuesta.data))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setCargando(false))
  }, [])

  async function iniciarSesion(correo, clave) {
    const { data } = await api.post('/auth/login', { correo, clave })
    localStorage.setItem('token', data.token)
    setUsuario(data.usuario)
  }

  function cerrarSesion() {
    localStorage.removeItem('token')
    setUsuario(null)
  }

  const valor = useMemo(
    () => ({ usuario, cargando, iniciarSesion, cerrarSesion }),
    [usuario, cargando],
  )

  return <AuthContext value={valor}>{children}</AuthContext>
}`,
        'useMemo evita crear un objeto nuevo en cada renderizado del proveedor, que obligaría a renderizar a todos los consumidores aunque nada hubiera cambiado.',
      ),
      code(
        'Hook de acceso y uso en los componentes',
        `export function useAuth() {
  const contexto = useContext(AuthContext)
  if (!contexto) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return contexto
}

// main.jsx
<AuthProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</AuthProvider>

// En cualquier componente
function Cabecera() {
  const { usuario, cerrarSesion } = useAuth()

  return usuario
    ? <button onClick={cerrarSesion}>Salir ({usuario.nombre})</button>
    : <Link to="/login">Ingresar</Link>
}`,
        'El Hook propio esconde el contexto y da un error claro si alguien lo usa fuera del proveedor.',
      ),
      code(
        'Contexto de tema con persistencia',
        `const TemaContext = createContext(null)

export function TemaProvider({ children }) {
  const [tema, setTema] = useState(() => localStorage.getItem('tema') ?? 'claro')

  useEffect(() => {
    document.documentElement.dataset.tema = tema
    localStorage.setItem('tema', tema)
  }, [tema])

  const alternar = useCallback(
    () => setTema((actual) => (actual === 'claro' ? 'oscuro' : 'claro')),
    [],
  )

  const valor = useMemo(() => ({ tema, alternar }), [tema, alternar])
  return <TemaContext value={valor}>{children}</TemaContext>
}

/* CSS */
:root { --fondo: #fff; --texto: #111; }
[data-tema='oscuro'] { --fondo: #111; --texto: #eee; }`,
        'Pasar una función a useState hace que el valor inicial se lea de localStorage una sola vez. El efecto sincroniza el estado con el DOM y con el almacenamiento, que son sistemas externos a React.',
      ),
      code(
        'Carrito con reducer y contexto',
        `function carritoReducer(estado, accion) {
  switch (accion.type) {
    case 'agregar': {
      const existente = estado.find((item) => item.id === accion.producto.id)
      return existente
        ? estado.map((item) =>
            item.id === existente.id ? { ...item, cantidad: item.cantidad + 1 } : item,
          )
        : [...estado, { ...accion.producto, cantidad: 1 }]
    }
    case 'quitar':
      return estado.filter((item) => item.id !== accion.id)
    case 'vaciar':
      return []
    default:
      return estado
  }
}

export function CarritoProvider({ children }) {
  const [items, dispatch] = useReducer(carritoReducer, [])

  const total = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0)
  const unidades = items.reduce((suma, item) => suma + item.cantidad, 0)

  const valor = useMemo(() => ({ items, total, unidades, dispatch }), [items, total, unidades])
  return <CarritoContext value={valor}>{children}</CarritoContext>
}`,
        'total y unidades se calculan a partir de items; no se guardan en el estado para que nunca puedan quedar desincronizados.',
      ),
      text(
        'Evitar renderizados innecesarios con contexto',
        `Separa contextos: uno por dominio (autenticación, tema, carrito) en lugar de uno gigante. Así un cambio de tema no renderiza lo que solo lee el usuario.
Separa datos y acciones: un contexto para el estado y otro para dispatch o las funciones, que no cambian.
Memoiza el valor con useMemo y las funciones con useCallback.
Coloca el proveedor lo más abajo posible: si solo una sección necesita el dato, envuelve solo esa sección.
Pasa children: lo que el proveedor recibe como children no se vuelve a renderizar cuando cambia su estado, salvo los componentes que consumen el contexto.`,
      ),
    ],
  },
  {
    title: 'Estado global con Zustand',
    topics: [
      text(
        'Qué es Zustand',
        `Zustand es una librería pequeña de estado global. El estado vive en un almacén (store) fuera del árbol de React y cualquier componente puede leerlo con un Hook, sin proveedores ni reducers.

Ventajas frente al contexto: cada componente se suscribe solo a la parte que usa, así que no se renderiza cuando cambia otra cosa; hay menos código que escribir, y el almacén también se puede leer y modificar fuera de los componentes.`,
      ),
      code(
        'Crear un almacén y usarlo',
        `$ npm install zustand

// store/contador.js
import { create } from 'zustand'

export const useContador = create((set) => ({
  cuenta: 0,
  incrementar: () => set((estado) => ({ cuenta: estado.cuenta + 1 })),
  reiniciar: () => set({ cuenta: 0 }),
}))

// En los componentes
function Marcador() {
  const cuenta = useContador((estado) => estado.cuenta)
  return <h1>{cuenta}</h1>
}

function Controles() {
  const incrementar = useContador((estado) => estado.incrementar)
  const reiniciar = useContador((estado) => estado.reiniciar)

  return (
    <>
      <button onClick={incrementar}>+1</button>
      <button onClick={reiniciar}>Reiniciar</button>
    </>
  )
}`,
        'create recibe una función que devuelve el estado inicial y las acciones. set fusiona el objeto que le pasas con el estado actual, de modo que no hay que copiar el resto de propiedades.',
      ),
      code(
        'Selectores: suscribirse solo a lo necesario',
        `import { useShallow } from 'zustand/react/shallow'

// Bien: se renderiza solo cuando cambia unidades
const unidades = useCarrito((estado) => estado.unidades)

// Mal: se renderiza con CUALQUIER cambio del almacén
const todo = useCarrito()

// Varios valores: useShallow compara propiedad a propiedad
const { items, total } = useCarrito(
  useShallow((estado) => ({ items: estado.items, total: estado.total })),
)

// Valor derivado calculado en el selector
const hayOfertas = useCarrito((estado) => estado.items.some((item) => item.enOferta))`,
        'El selector decide a qué se suscribe el componente. Si devuelve un objeto o un arreglo nuevo en cada llamada, sin useShallow se provocaría un renderizado continuo.',
      ),
      code(
        'Almacén de carrito con get',
        `export const useCarrito = create((set, get) => ({
  items: [],

  agregar: (producto) =>
    set((estado) => {
      const existente = estado.items.find((item) => item.id === producto.id)
      return {
        items: existente
          ? estado.items.map((item) =>
              item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item,
            )
          : [...estado.items, { ...producto, cantidad: 1 }],
      }
    }),

  quitar: (id) => set((estado) => ({ items: estado.items.filter((item) => item.id !== id) })),

  vaciar: () => set({ items: [] }),

  // get lee el estado actual dentro de una acción
  total: () => get().items.reduce((suma, item) => suma + item.precio * item.cantidad, 0),
}))`,
        'Las actualizaciones siguen siendo inmutables: se crean arreglos y objetos nuevos, igual que con useState.',
      ),
      code(
        'Acciones asíncronas',
        `export const useProductos = create((set, get) => ({
  productos: [],
  cargando: false,
  error: null,

  cargar: async () => {
    if (get().cargando) return

    set({ cargando: true, error: null })
    try {
      const { data } = await api.get('/productos')
      set({ productos: data, cargando: false })
    } catch (err) {
      set({ error: err.message, cargando: false })
    }
  },
}))

function ListaProductos() {
  const productos = useProductos((estado) => estado.productos)
  const cargando = useProductos((estado) => estado.cargando)
  const cargar = useProductos((estado) => estado.cargar)

  useEffect(() => { cargar() }, [cargar])

  if (cargando) return <p>Cargando…</p>
  return <ul>{productos.map((p) => <li key={p.id}>{p.nombre}</li>)}</ul>
}`,
        'No hace falta nada especial para lo asíncrono: la acción es una función async que llama a set cuando tiene el resultado.',
      ),
      code(
        'Persistencia y herramientas de desarrollo',
        `import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useAjustes = create(
  devtools(
    persist(
      (set) => ({
        tema: 'claro',
        idioma: 'es',
        cambiarTema: (tema) => set({ tema }),
        cambiarIdioma: (idioma) => set({ idioma }),
      }),
      {
        name: 'ajustes',                                  // clave en localStorage
        partialize: (estado) => ({ tema: estado.tema }),  // qué se guarda
      },
    ),
    { name: 'Ajustes' },
  ),
)

// Fuera de un componente
const temaActual = useAjustes.getState().tema
useAjustes.setState({ tema: 'oscuro' })`,
        'persist guarda el estado en localStorage y lo restaura al recargar. devtools conecta el almacén con la extensión Redux DevTools para ver cada cambio. getState y setState permiten usarlo fuera de React, por ejemplo en un interceptor de Axios.',
      ),
    ],
  },
  {
    title: 'Redux Toolkit y RTK Query',
    topics: [
      text(
        'Los conceptos de Redux',
        `Redux guarda el estado global de la aplicación en un único almacén (store) y solo permite cambiarlo de una forma predecible.

Store: el objeto que contiene todo el estado.
Acción: un objeto que describe qué pasó, con un type y opcionalmente un payload.
Reducer: una función pura que recibe el estado y una acción y devuelve el estado nuevo.
Dispatch: la función con la que se envía una acción al store.
Selector: una función que extrae del estado justo lo que un componente necesita.

El flujo es de un solo sentido: la interfaz despacha una acción, el reducer calcula el estado nuevo y los componentes suscritos se actualizan. Redux Toolkit (RTK) es la forma oficial y recomendada de escribir Redux hoy.`,
      ),
      code(
        'Configurar el store',
        `$ npm install @reduxjs/toolkit react-redux

// store/index.js
import { configureStore } from '@reduxjs/toolkit'
import contadorReducer from './contadorSlice'
import carritoReducer from './carritoSlice'

export const store = configureStore({
  reducer: {
    contador: contadorReducer,
    carrito: carritoReducer,
  },
})

// main.jsx
import { Provider } from 'react-redux'
import { store } from './store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)`,
        'configureStore combina los reducers, activa las Redux DevTools y añade comprobaciones que avisan si mutas el estado por error.',
      ),
      code(
        'Crear un slice',
        `// store/contadorSlice.js
import { createSlice } from '@reduxjs/toolkit'

const contadorSlice = createSlice({
  name: 'contador',
  initialState: { valor: 0 },
  reducers: {
    incrementar(estado) {
      estado.valor += 1            // parece una mutación, pero Immer crea la copia
    },
    sumar(estado, accion) {
      estado.valor += accion.payload
    },
    reiniciar() {
      return { valor: 0 }          // o devolver un estado nuevo completo
    },
  },
})

export const { incrementar, sumar, reiniciar } = contadorSlice.actions
export default contadorSlice.reducer`,
        'Un slice reúne el estado inicial, los reducers y las acciones de una parte de la aplicación. RTK usa Immer por dentro, así que puedes escribir asignaciones directas y obtienes una actualización inmutable. Haz una cosa u otra: modificar el estado o devolver uno nuevo, nunca ambas.',
      ),
      code(
        'Leer y modificar el estado desde los componentes',
        `import { useDispatch, useSelector } from 'react-redux'
import { incrementar, reiniciar, sumar } from './store/contadorSlice'

export default function Contador() {
  const valor = useSelector((estado) => estado.contador.valor)
  const dispatch = useDispatch()

  return (
    <>
      <h1>{valor}</h1>
      <button onClick={() => dispatch(incrementar())}>+1</button>
      <button onClick={() => dispatch(sumar(5))}>+5</button>
      <button onClick={() => dispatch(reiniciar())}>Reiniciar</button>
    </>
  )
}`,
        'useSelector suscribe el componente a una parte del estado y solo lo renderiza cuando esa parte cambia. El argumento que pasas al creador de la acción llega al reducer como accion.payload.',
      ),
      code(
        'Selectores reutilizables y memoizados',
        `// store/carritoSlice.js
import { createSelector } from '@reduxjs/toolkit'

export const selectItems = (estado) => estado.carrito.items

export const selectTotal = createSelector([selectItems], (items) =>
  items.reduce((suma, item) => suma + item.precio * item.cantidad, 0),
)

export const selectUnidades = createSelector([selectItems], (items) =>
  items.reduce((suma, item) => suma + item.cantidad, 0),
)

// En el componente
const total = useSelector(selectTotal)`,
        'createSelector guarda el último resultado y solo recalcula cuando cambian sus entradas. Definir los selectores junto al slice evita que los componentes conozcan la forma interna del estado.',
      ),
      code(
        'Lógica asíncrona con createAsyncThunk',
        `import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const cargarProductos = createAsyncThunk('productos/cargar', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/productos')
    return data
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

const productosSlice = createSlice({
  name: 'productos',
  initialState: { lista: [], estado: 'inactivo', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cargarProductos.pending, (estado) => {
        estado.estado = 'cargando'
        estado.error = null
      })
      .addCase(cargarProductos.fulfilled, (estado, accion) => {
        estado.estado = 'exito'
        estado.lista = accion.payload
      })
      .addCase(cargarProductos.rejected, (estado, accion) => {
        estado.estado = 'error'
        estado.error = accion.payload
      })
  },
})

// En el componente
useEffect(() => { dispatch(cargarProductos()) }, [dispatch])`,
        'Un thunk despacha automáticamente tres acciones: pending al empezar, fulfilled si va bien y rejected si falla. Se gestionan en extraReducers.',
      ),
      code(
        'RTK Query: definir la API',
        `// store/productosApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productosApi = createApi({
  reducerPath: 'productosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token
      if (token) headers.set('Authorization', 'Bearer ' + token)
      return headers
    },
  }),
  tagTypes: ['Producto'],
  endpoints: (builder) => ({
    obtenerProductos: builder.query({
      query: (categoria) => ({ url: '/productos', params: { categoria } }),
      providesTags: ['Producto'],
    }),
    obtenerProducto: builder.query({
      query: (id) => '/productos/' + id,
    }),
    crearProducto: builder.mutation({
      query: (producto) => ({ url: '/productos', method: 'POST', body: producto }),
      invalidatesTags: ['Producto'],
    }),
    eliminarProducto: builder.mutation({
      query: (id) => ({ url: '/productos/' + id, method: 'DELETE' }),
      invalidatesTags: ['Producto'],
    }),
  }),
})

export const {
  useObtenerProductosQuery,
  useObtenerProductoQuery,
  useCrearProductoMutation,
  useEliminarProductoMutation,
} = productosApi

// store/index.js
export const store = configureStore({
  reducer: { [productosApi.reducerPath]: productosApi.reducer },
  middleware: (porDefecto) => porDefecto().concat(productosApi.middleware),
})`,
        'RTK Query genera un Hook por cada endpoint. Las consultas (query) leen datos y las mutaciones (mutation) los modifican. Las etiquetas conectan ambas: cuando una mutación invalida «Producto», las consultas que la proveen se vuelven a pedir solas.',
      ),
      code(
        'RTK Query: usar los Hooks generados',
        `function Productos({ categoria }) {
  const { data: productos = [], isLoading, isFetching, isError, refetch } =
    useObtenerProductosQuery(categoria)

  const [crearProducto, { isLoading: creando }] = useCrearProductoMutation()
  const [eliminarProducto] = useEliminarProductoMutation()

  async function alCrear(datos) {
    try {
      await crearProducto(datos).unwrap()   // unwrap lanza el error si falla
    } catch (err) {
      alert('No se pudo crear: ' + (err.data?.mensaje ?? 'error'))
    }
  }

  if (isLoading) return <p>Cargando…</p>
  if (isError) return <button onClick={refetch}>Reintentar</button>

  return (
    <ul style={{ opacity: isFetching ? 0.6 : 1 }}>
      {productos.map((producto) => (
        <li key={producto.id}>
          {producto.nombre}
          <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  )
}`,
        'Sin escribir un solo useEffect obtienes caché compartida entre componentes, estados de carga y error, eliminación de peticiones duplicadas y recarga automática tras una mutación. isLoading es la primera carga; isFetching, cualquier recarga posterior.',
      ),
      text(
        'Context, Zustand o Redux Toolkit',
        `useState y props: siempre el punto de partida. La mayor parte del estado es local.
Context: datos que cambian poco y se necesitan en muchos sitios, como el tema, el idioma o la sesión.
Zustand: estado global con poco código y sin ceremonia. Ideal en proyectos pequeños y medianos.
Redux Toolkit: aplicaciones grandes con mucha lógica de estado, equipos que quieren una estructura única y herramientas de depuración avanzadas.
RTK Query o TanStack Query: para los datos que vienen del servidor. Suelen eliminar la mayor parte del estado global, porque casi todo lo que se guardaba era una copia de lo que hay en la API.

Regla práctica: separa el estado del servidor (datos remotos) del estado del cliente (interfaz) y elige la herramienta más simple que resuelva cada uno.`,
      ),
    ],
  },
  {
    title: 'Nivel profesional: pruebas, rendimiento y despliegue',
    topics: [
      code(
        'Configurar las pruebas con Vitest y Testing Library',
        `$ npm install -D vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom

// vite.config.js
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
})

// src/setupTests.js
import '@testing-library/jest-dom/vitest'

// package.json
"scripts": { "test": "vitest", "coverage": "vitest run --coverage" }`,
        'Vitest ejecuta las pruebas reutilizando la configuración de Vite. jsdom simula el navegador en Node.js. Testing Library renderiza los componentes y los consulta como lo haría una persona.',
      ),
      code(
        'Probar un componente como lo usa el usuario',
        `// Contador.test.jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contador from './Contador'

describe('Contador', () => {
  it('empieza en cero', () => {
    render(<Contador />)
    expect(screen.getByRole('heading')).toHaveTextContent('0')
  })

  it('suma uno al pulsar el botón', async () => {
    const usuario = userEvent.setup()
    render(<Contador />)

    await usuario.click(screen.getByRole('button', { name: /sumar/i }))

    expect(screen.getByRole('heading')).toHaveTextContent('1')
  })
})`,
        'Se busca por rol y por texto accesible, no por clases CSS ni por detalles internos. Así la prueba sigue valiendo aunque cambies la implementación, y de paso comprueba la accesibilidad.',
      ),
      code(
        'Probar formularios y código asíncrono',
        `import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

it('envía los datos del formulario', async () => {
  const alEnviar = vi.fn()
  const usuario = userEvent.setup()
  render(<Login alEnviar={alEnviar} />)

  await usuario.type(screen.getByLabelText(/correo/i), 'ana@correo.com')
  await usuario.type(screen.getByLabelText(/contraseña/i), 'secreto123')
  await usuario.click(screen.getByRole('button', { name: /entrar/i }))

  expect(alEnviar).toHaveBeenCalledWith({ correo: 'ana@correo.com', clave: 'secreto123' })
})

it('muestra los usuarios que devuelve la API', async () => {
  vi.spyOn(api, 'get').mockResolvedValue({ data: [{ id: 1, nombre: 'Ana' }] })

  render(<Usuarios />)

  expect(screen.getByText(/cargando/i)).toBeInTheDocument()
  expect(await screen.findByText('Ana')).toBeInTheDocument()   // findBy espera
})`,
        'getBy falla si el elemento no está; queryBy devuelve null, útil para comprobar que algo no aparece; findBy espera a que aparezca. vi.fn() crea una función espía y vi.spyOn sustituye un método real.',
      ),
      code(
        'Probar Hooks y componentes que necesitan proveedores',
        `import { act, render, renderHook } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

it('alterna el valor', () => {
  const { result } = renderHook(() => useAlternar(false))

  act(() => result.current.alternar())

  expect(result.current.valor).toBe(true)
})

// Función de ayuda: renderiza con todo lo que la aplicación provee
function renderizarConProveedores(ui, { ruta = '/' } = {}) {
  return render(
    <Provider store={crearStore()}>
      <MemoryRouter initialEntries={[ruta]}>{ui}</MemoryRouter>
    </Provider>,
  )
}

it('muestra el detalle del producto', async () => {
  renderizarConProveedores(<App />, { ruta: '/productos/1' })
  expect(await screen.findByRole('heading', { name: 'Teclado' })).toBeInTheDocument()
})`,
        'MemoryRouter simula la navegación sin navegador. Crea un store nuevo en cada prueba para que no compartan estado.',
      ),
      text(
        'Optimizar el rendimiento',
        `Primero mide: el Profiler de React Developer Tools muestra qué componentes se renderizan, por qué y cuánto tardan. No optimices a ciegas.

Soluciones, de la más simple a la más compleja:
Baja el estado: si solo una parte de la pantalla lo usa, muévelo a ese componente.
Pasa JSX como children: lo que llega como children no se vuelve a renderizar cuando cambia el estado del contenedor.
Usa key estables en las listas.
Divide el código con lazy y Suspense para descargar menos al inicio.
Virtualiza las listas muy largas con una librería como TanStack Virtual, que solo dibuja lo visible.
Memoiza con memo, useMemo y useCallback, o deja que React Compiler lo haga.
Usa transiciones (useTransition, useDeferredValue) para que una actualización lenta no bloquee la escritura.`,
      ),
      code(
        'Compilar para producción',
        `$ npm run build

vite v6 building for production...
✓ 152 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.30 kB
dist/assets/index-DiwrgTda.css    8.12 kB │ gzip:  2.41 kB
dist/assets/index-C2VMtnMk.js   187.30 kB │ gzip: 59.12 kB
dist/assets/Panel-Bx8Tq1rW.js    24.80 kB │ gzip:  8.03 kB
✓ built in 2.31s

$ npm run preview   # sirve dist/ en local para probar el resultado`,
        'El resultado es una carpeta dist/ con archivos estáticos: minificados, sin el código de desarrollo de React y con un hash en el nombre para la caché. Cada componente cargado con lazy genera su propio archivo.',
      ),
      code(
        'Desplegar una SPA',
        `# Netlify: public/_redirects
/*    /index.html    200

# Vercel: vercel.json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }

# Nginx
location / {
  try_files $uri $uri/ /index.html;
}

# GitHub Pages: la aplicación vive en una subcarpeta
// vite.config.js
export default defineConfig({ base: '/nombre-del-repositorio/' })

// main.jsx
<BrowserRouter basename="/nombre-del-repositorio">`,
        'En Netlify o Vercel basta conectar el repositorio, indicar npm run build como comando y dist como carpeta de salida. Las variables VITE_ se definen en el panel del servicio y exigen volver a compilar. Sin la regla de redirección, recargar la página en /productos/5 devuelve un 404.',
      ),
      text(
        'Accesibilidad y calidad de código',
        `Accesibilidad: usa los elementos HTML correctos (button para acciones, a para navegar, label asociada a cada campo). Todas las imágenes llevan alt. Todo debe poder usarse con el teclado y el foco debe verse. Tras abrir un modal, mueve el foco a él y devuélvelo al cerrarlo. El plugin eslint-plugin-jsx-a11y detecta muchos errores.

Calidad: ESLint con eslint-plugin-react-hooks para las reglas de los Hooks y las dependencias de los efectos; Prettier para el formato; TypeScript para los tipos; pruebas en la integración continua.

Seguridad: React escapa todo lo que se interpola con llaves, lo que previene el XSS. La excepción es dangerouslySetInnerHTML: no lo uses con contenido de usuarios sin sanearlo antes. No guardes secretos en el frontend y valida siempre en el servidor.`,
      ),
      text(
        'Qué aprender después',
        `Un framework completo: Next.js o React Router en modo framework añaden renderizado en servidor, carga de datos por ruta y componentes de servidor.
Datos remotos: TanStack Query para caché, reintentos y sincronización.
Formularios: React Hook Form con Zod para validar con esquemas.
Componentes: una librería accesible como Radix UI o shadcn/ui en lugar de construir cada modal y menú desde cero.
Móvil: React Native con Expo reutiliza lo aprendido para crear aplicaciones nativas.

La documentación oficial se mantiene al día con cada versión y es la mejor referencia: https://react.dev/reference/react`,
      ),
    ],
  },
]
