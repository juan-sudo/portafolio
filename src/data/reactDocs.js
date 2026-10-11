// React · niveles basados en la sección «Learn» de la documentación oficial: https://react.dev/learn

import { code, links, text } from './reactHelpers'

export const reactDocsLevels = [
  {
    title: 'Primeros pasos',
    topics: [
      text(
        '¿Qué es React?',
        `React es una librería de JavaScript para construir interfaces de usuario. La idea central es dividir la pantalla en piezas independientes y reutilizables llamadas componentes: un botón, una tarjeta, un formulario, una página entera.

Cada componente es una función de JavaScript que devuelve el marcado que debe verse. Tú describes cómo debe ser la interfaz para unos datos concretos y React se encarga de actualizar el navegador cuando esos datos cambian.

React solo se ocupa de la interfaz. El enrutamiento, las peticiones al servidor o el estado global se resuelven con otras librerías o con un framework como Next.js.`,
      ),
      code(
        'Crear un proyecto con Vite',
        `$ npm create vite@latest mi-app -- --template react
$ cd mi-app
$ npm install
$ npm run dev

  VITE ready in 300 ms
  ➜  Local:   http://localhost:5173/`,
        'Necesitas Node.js instalado. La documentación recomienda empezar con un framework completo (Next.js, React Router o Expo) o montar la aplicación desde cero con una herramienta de compilación como Vite, Parcel o Rsbuild. Create React App está obsoleto. Para TypeScript usa la plantilla react-ts.',
      ),
      code(
        'Estructura del proyecto',
        `mi-app/
├── index.html          ← la única página; contiene <div id="root">
├── package.json        ← dependencias y scripts
├── vite.config.js      ← configuración de Vite
├── public/             ← archivos que se copian tal cual
└── src/
    ├── main.jsx        ← punto de entrada: monta React en el DOM
    ├── App.jsx         ← componente raíz
    ├── App.css
    ├── index.css       ← estilos globales
    └── assets/         ← imágenes importadas desde el código`,
        'Los archivos con JSX llevan la extensión .jsx (o .tsx con TypeScript).',
      ),
      code(
        'El punto de entrada',
        `// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)`,
        'createRoot() le indica a React en qué elemento del HTML debe dibujar, y render() muestra el componente raíz. Solo se llama una vez. StrictMode activa comprobaciones extra durante el desarrollo.',
      ),
      code(
        'Tu primer componente',
        `function MiBoton() {
  return <button>Soy un botón</button>
}

export default function App() {
  return (
    <div>
      <h1>Bienvenido a mi aplicación</h1>
      <MiBoton />
      <MiBoton />
    </div>
  )
}`,
        'Un componente es una función que devuelve marcado. Su nombre debe empezar con mayúscula: así React lo distingue de las etiquetas HTML, que van en minúscula.',
      ),
      code(
        'Resumen rápido: datos, condiciones y listas',
        `const usuario = { nombre: 'Hedy Lamarr', foto: 'https://i.imgur.com/yXOvdOSs.jpg' }
const productos = [
  { id: 1, titulo: 'Repollo', esFruta: false },
  { id: 2, titulo: 'Manzana', esFruta: true },
]

export default function Perfil({ haIniciadoSesion }) {
  return (
    <>
      <h1>{usuario.nombre}</h1>
      <img className="avatar" src={usuario.foto} alt={'Foto de ' + usuario.nombre} />

      {haIniciadoSesion ? <p>Sesión iniciada</p> : <p>Inicia sesión</p>}

      <ul>
        {productos.map((producto) => (
          <li key={producto.id} style={{ color: producto.esFruta ? 'magenta' : 'darkgreen' }}>
            {producto.titulo}
          </li>
        ))}
      </ul>
    </>
  )
}`,
        'Las llaves insertan JavaScript dentro del marcado. No hay sintaxis especial para condiciones ni bucles: se usa el propio JavaScript (operador ternario, && y map).',
      ),
      code(
        'Resumen rápido: eventos y estado',
        `import { useState } from 'react'

export default function Contador() {
  const [cuenta, setCuenta] = useState(0)

  function alHacerClic() {
    setCuenta(cuenta + 1)
  }

  return <button onClick={alHacerClic}>Has hecho clic {cuenta} veces</button>
}`,
        'useState devuelve el valor actual y la función para cambiarlo. Se pasa la función alHacerClic sin paréntesis: React la llamará cuando ocurra el clic. Cada <Contador /> que pongas en pantalla tiene su propio estado.',
      ),
      text(
        'Herramientas: editor y React Developer Tools',
        `Editor: VS Code es el más usado. Conviene instalar ESLint con la configuración de React, que avisa de errores como romper las reglas de los Hooks, y Prettier para dar formato al guardar.

React Developer Tools: extensión para Chrome, Firefox y Edge. Añade dos pestañas a las herramientas del navegador: Components, para inspeccionar el árbol de componentes y ver o editar sus props y su estado, y Profiler, para medir qué se renderiza y cuánto tarda.`,
      ),
      links('Páginas de primeros pasos', [
        ['Inicio rápido', 'learn'],
        ['Instalación', 'learn/installation'],
        ['Crear una aplicación de React', 'learn/creating-a-react-app'],
        ['Construir una aplicación desde cero', 'learn/build-a-react-app-from-scratch'],
        ['Configurar el editor', 'learn/editor-setup'],
        ['React Developer Tools', 'learn/react-developer-tools'],
      ]),
    ],
  },
  {
    title: 'Describir la interfaz',
    topics: [
      code(
        'Definir un componente paso a paso',
        `// 1. Exportar   2. Definir la función   3. Devolver el marcado
export default function Perfil() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}

export function Galeria() {
  return (
    <section>
      <h1>Científicas increíbles</h1>
      <Perfil />
      <Perfil />
    </section>
  )
}`,
        'Si el marcado ocupa varias líneas, envuélvelo entre paréntesis: sin ellos, JavaScript ignora todo lo que venga después de return. Nunca definas un componente dentro de otro: se volvería a crear en cada renderizado y perdería su estado.',
      ),
      code(
        'Importar y exportar componentes',
        `// Galeria.jsx
export function Perfil() {            // exportación con nombre
  return <img src="https://i.imgur.com/QIrZWGIs.jpg" alt="Alan L. Hart" />
}

export default function Galeria() {   // exportación por defecto
  return (
    <section>
      <Perfil />
      <Perfil />
    </section>
  )
}

// App.jsx
import Galeria from './Galeria.jsx'        // por defecto: sin llaves, el nombre es libre
import { Perfil } from './Galeria.jsx'     // con nombre: con llaves, el nombre debe coincidir`,
        'Un archivo solo puede tener una exportación por defecto, pero todas las exportaciones con nombre que quieras. Lo habitual es un componente principal por archivo.',
      ),
      code(
        'Las reglas de JSX',
        `export default function ListaTareas() {
  return (
    // 1. Un solo elemento raíz: usa un contenedor o un fragmento <>...</>
    <>
      <h1>Tareas de Hedy Lamarr</h1>

      {/* 2. Todas las etiquetas se cierran: <img />, <br />, <li>...</li> */}
      <img src="https://i.imgur.com/yXOvdOSs.jpg" alt="Hedy Lamarr" className="foto" />

      {/* 3. Los atributos van en camelCase: className, htmlFor, strokeWidth, onClick */}
      <ul>
        <li>Inventar un semáforo nuevo</li>
        <li>Ensayar una escena de película</li>
      </ul>
    </>
  )
}`,
        'JSX es una extensión de sintaxis de JavaScript: parece HTML pero es más estricto y se convierte en objetos de JavaScript. class es una palabra reservada, por eso se escribe className. Los atributos aria-* y data-* conservan el guion.',
      ),
      code(
        'JavaScript dentro de JSX con llaves',
        `const persona = {
  nombre: 'Gregorio Y. Zara',
  tema: { backgroundColor: 'black', color: 'pink' },
}

function formatearFecha(fecha) {
  return new Intl.DateTimeFormat('es', { weekday: 'long' }).format(fecha)
}

export default function ListaTareas() {
  return (
    // Doble llave: un objeto de JavaScript dentro de las llaves de JSX
    <div style={persona.tema}>
      <h1>Tareas de {persona.nombre}</h1>
      <p>Hoy es {formatearFecha(new Date())}</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>Mejorar el videoteléfono</li>
      </ul>
    </div>
  )
}`,
        'Las llaves solo valen en dos sitios: como texto dentro de una etiqueta y como valor de un atributo, justo después del signo igual. No sirven para el nombre de la etiqueta. Las propiedades de style van en camelCase.',
      ),
      code(
        'Pasar props a un componente',
        `function Avatar({ persona, tamano = 100 }) {
  return (
    <img
      className="avatar"
      src={persona.foto}
      alt={persona.nombre}
      width={tamano}
      height={tamano}
    />
  )
}

function Tarjeta({ children }) {
  return <div className="tarjeta">{children}</div>
}

export default function Perfil() {
  const persona = { nombre: 'Lin Lanying', foto: 'https://i.imgur.com/1bX5QH6.jpg' }

  return (
    <Tarjeta>
      <Avatar persona={persona} tamano={80} />
      <Avatar persona={persona} />
    </Tarjeta>
  )
}`,
        'Las props son los argumentos del componente y se leen desestructurando el primer parámetro. children contiene lo que se escribe entre la etiqueta de apertura y la de cierre. Las props son de solo lectura: un componente nunca debe modificarlas; si necesita cambiar algo, usa estado.',
      ),
      code(
        'Renderizado condicional',
        `function Articulo({ nombre, empacado, cantidad }) {
  // 1. Salida anticipada: null no dibuja nada
  if (cantidad === 0) return null

  return (
    <li className="articulo">
      {/* 2. Operador ternario: una cosa u otra */}
      {empacado ? <del>{nombre}</del> : nombre}

      {/* 3. &&: mostrar algo o nada */}
      {empacado && ' ✅'}

      {/* Cuidado: 0 && ... dibuja un 0. Usa una comparación */}
      {cantidad > 1 && <span> x{cantidad}</span>}
    </li>
  )
}`,
        'También puedes guardar JSX en una variable con let y asignarla dentro de un if, que suele ser la opción más legible cuando hay varias ramas.',
      ),
      code(
        'Renderizar listas',
        `const personas = [
  { id: 0, nombre: 'Creola Katherine Johnson', profesion: 'matemática' },
  { id: 1, nombre: 'Mario José Molina', profesion: 'químico' },
  { id: 2, nombre: 'Mohammad Abdus Salam', profesion: 'físico' },
  { id: 3, nombre: 'Percy Lavon Julian', profesion: 'químico' },
]

export default function Lista() {
  const quimicos = personas.filter((persona) => persona.profesion === 'químico')

  return (
    <ul>
      {quimicos.map((persona) => (
        <li key={persona.id}>
          <b>{persona.nombre}</b>: {persona.profesion}
        </li>
      ))}
    </ul>
  )
}`,
        'filter() elige los elementos y map() convierte cada uno en JSX. Cada elemento necesita una key única y estable entre sus hermanos, normalmente el id de la base de datos. No uses el índice del arreglo si la lista puede reordenarse, ni generes la key al vuelo con Math.random().',
      ),
      code(
        'Mantener los componentes puros',
        `// Impuro: modifica una variable que existía antes del renderizado
let invitado = 0

function TazaImpura() {
  invitado = invitado + 1
  return <h2>Taza de té para el invitado n.º {invitado}</h2>
}

// Puro: el mismo valor de entrada da siempre el mismo resultado
function Taza({ invitado }) {
  return <h2>Taza de té para el invitado n.º {invitado}</h2>
}

// Mutación local: está permitida, la variable se crea en este mismo renderizado
function Reunion() {
  const tazas = []
  for (let i = 1; i <= 3; i++) {
    tazas.push(<Taza key={i} invitado={i} />)
  }
  return tazas
}`,
        'Un componente puro se ocupa de sus propios asuntos y devuelve el mismo JSX para las mismas props, estado y contexto. Los efectos secundarios (cambiar el DOM, pedir datos) van en los manejadores de eventos. El modo estricto llama dos veces a cada componente en desarrollo para delatar los que no son puros.',
      ),
      text(
        'La interfaz como un árbol',
        `React modela la interfaz como árboles, y entender dos de ellos ayuda a razonar sobre el rendimiento y el estado.

Árbol de renderizado: representa qué componente renderiza a cuál en una pasada concreta. Los componentes de arriba afectan al rendimiento de todo lo que tienen debajo; los componentes hoja son los que más se vuelven a renderizar.

Árbol de dependencias de módulos: representa qué archivo importa a cuál. Las herramientas de compilación lo usan para decidir qué código empaquetar; cuanto más grande, más tarda en descargarse la aplicación.`,
      ),
      links('Páginas de «Describir la UI»', [
        ['Tu primer componente', 'learn/your-first-component'],
        ['Importar y exportar componentes', 'learn/importing-and-exporting-components'],
        ['Escribir marcado con JSX', 'learn/writing-markup-with-jsx'],
        ['JavaScript en JSX con llaves', 'learn/javascript-in-jsx-with-curly-braces'],
        ['Pasar props a un componente', 'learn/passing-props-to-a-component'],
        ['Renderizado condicional', 'learn/conditional-rendering'],
        ['Renderizar listas', 'learn/rendering-lists'],
        ['Mantener los componentes puros', 'learn/keeping-components-pure'],
        ['La UI como un árbol', 'learn/understanding-your-ui-as-a-tree'],
      ]),
    ],
  },
  {
    title: 'Añadir interactividad',
    topics: [
      code(
        'Responder a eventos',
        `function Boton({ onClick, children }) {
  return (
    <button
      onClick={(evento) => {
        evento.stopPropagation()   // el clic no sube a los elementos padres
        onClick()
      }}
    >
      {children}
    </button>
  )
}

export default function BarraHerramientas() {
  return (
    <div className="barra" onClick={() => alert('Clic en la barra')}>
      <Boton onClick={() => alert('Reproduciendo')}>Reproducir película</Boton>
      <Boton onClick={() => alert('Subiendo')}>Subir imagen</Boton>
    </div>
  )
}

function Registro() {
  return (
    <form onSubmit={(evento) => { evento.preventDefault(); alert('Enviando') }}>
      <input />
      <button>Enviar</button>
    </form>
  )
}`,
        'Se pasa la función, no su resultado: onClick={guardar} y no onClick={guardar()}. Por convención, las props de evento empiezan por on y los manejadores por handle (o «al» en español). preventDefault() evita el comportamiento por defecto del navegador, como recargar al enviar un formulario.',
      ),
      code(
        'Estado: la memoria de un componente',
        `import { useState } from 'react'
import { esculturas } from './datos.js'

export default function Galeria() {
  const [indice, setIndice] = useState(0)
  const [verMas, setVerMas] = useState(false)

  const escultura = esculturas[indice]

  return (
    <>
      <button onClick={() => setIndice(indice + 1)}>Siguiente</button>
      <h2>{escultura.nombre}</h2>
      <button onClick={() => setVerMas(!verMas)}>
        {verMas ? 'Ocultar' : 'Mostrar'} detalles
      </button>
      {verMas && <p>{escultura.descripcion}</p>}
    </>
  )
}`,
        'Una variable normal no sirve: se pierde entre renderizados y cambiarla no redibuja nada. useState conserva el dato y avisa a React para que vuelva a renderizar. Los Hooks (funciones que empiezan por use) solo se llaman en el nivel superior del componente, nunca dentro de condiciones, bucles ni funciones anidadas. El estado es privado de cada instancia.',
      ),
      text(
        'Renderizado y confirmación',
        `Una actualización de pantalla pasa por tres pasos:

1. Desencadenar: ocurre en el renderizado inicial o cuando cambia el estado de un componente o de alguno de sus ancestros.
2. Renderizar: React llama a tus componentes para calcular qué debe verse. Es un cálculo puro; todavía no se toca el navegador.
3. Confirmar (commit): React aplica al DOM solo las diferencias entre el resultado nuevo y el anterior.

Después el navegador pinta la pantalla. Si el resultado del renderizado es igual al anterior, React no toca el DOM.`,
      ),
      code(
        'El estado como una instantánea',
        `import { useState } from 'react'

export default function Contador() {
  const [numero, setNumero] = useState(0)

  return (
    <>
      <h1>{numero}</h1>
      <button
        onClick={() => {
          setNumero(numero + 5)
          alert(numero)                        // muestra 0, no 5

          setTimeout(() => alert(numero), 3000) // sigue mostrando 0
        }}
      >
        +5
      </button>
    </>
  )
}`,
        'Cambiar el estado no modifica la variable que ya tienes: solicita un renderizado nuevo. Dentro de un mismo renderizado el valor del estado está fijo, también en los manejadores de eventos y en los temporizadores creados en él.',
      ),
      code(
        'Encolar varias actualizaciones del estado',
        `// Suma 1: las tres llamadas usan la misma instantánea (numero = 0)
setNumero(numero + 1)
setNumero(numero + 1)
setNumero(numero + 1)

// Suma 3: cada función recibe el valor pendiente más reciente
setNumero((n) => n + 1)
setNumero((n) => n + 1)
setNumero((n) => n + 1)

// Resultado 6: reemplaza por 5 y luego suma 1
setNumero(numero + 5)
setNumero((n) => n + 1)`,
        'React espera a que termine el manejador de eventos para procesar las actualizaciones juntas (batching) y hacer un solo renderizado. Pasa una función actualizadora cuando el valor nuevo depende del anterior.',
      ),
      code(
        'Actualizar objetos en el estado',
        `const [persona, setPersona] = useState({
  nombre: 'Barbara',
  correo: 'bhepworth@escultura.com',
  obra: { titulo: 'Blue Nana', ciudad: 'Hamburgo' },
})

// Mal: muta el objeto existente; React no detecta el cambio
// persona.nombre = 'Ana'

// Bien: crea un objeto nuevo copiando el anterior
function alCambiar(evento) {
  setPersona({
    ...persona,
    [evento.target.name]: evento.target.value,
  })
}

// Objeto anidado: hay que copiar cada nivel que cambia
function alCambiarCiudad(evento) {
  setPersona({
    ...persona,
    obra: { ...persona.obra, ciudad: evento.target.value },
  })
}`,
        'Trata el estado como si fuera de solo lectura. La sintaxis de propagación (...) copia solo un nivel. Para objetos muy anidados, la librería Immer permite escribir código que «muta» y genera la copia por ti.',
      ),
      code(
        'Actualizar arreglos en el estado',
        `const [artistas, setArtistas] = useState([])

// Añadir: propagación en lugar de push o unshift
setArtistas([...artistas, { id: siguienteId++, nombre }])

// Eliminar: filter en lugar de splice o pop
setArtistas(artistas.filter((artista) => artista.id !== id))

// Transformar o reemplazar: map en lugar de asignar por índice
setArtistas(artistas.map((artista) =>
  artista.id === id ? { ...artista, visto: true } : artista,
))

// Insertar en una posición: slice
setArtistas([...artistas.slice(0, posicion), nuevo, ...artistas.slice(posicion)])

// Ordenar o invertir: primero una copia
const ordenados = [...artistas].sort((a, b) => a.nombre.localeCompare(b.nombre))
setArtistas(ordenados)`,
        'Evita los métodos que mutan el arreglo (push, pop, shift, unshift, splice, sort, reverse) y usa los que devuelven uno nuevo (concat, filter, map, slice). Copiar el arreglo no copia los objetos que contiene: para cambiar uno, crea también un objeto nuevo.',
      ),
      links('Páginas de «Añadir interactividad»', [
        ['Responder a eventos', 'learn/responding-to-events'],
        ['El estado: la memoria de un componente', 'learn/state-a-components-memory'],
        ['Renderizado y confirmación', 'learn/render-and-commit'],
        ['El estado como una instantánea', 'learn/state-as-a-snapshot'],
        ['Encolar actualizaciones del estado', 'learn/queueing-a-series-of-state-updates'],
        ['Actualizar objetos en el estado', 'learn/updating-objects-in-state'],
        ['Actualizar arreglos en el estado', 'learn/updating-arrays-in-state'],
      ]),
    ],
  },
  {
    title: 'Gestionar el estado',
    topics: [
      code(
        'Reaccionar a la entrada con el estado',
        `import { useState } from 'react'

export default function Formulario() {
  const [respuesta, setRespuesta] = useState('')
  const [error, setError] = useState(null)
  const [estado, setEstado] = useState('escribiendo')   // 'enviando' | 'exito'

  if (estado === 'exito') return <h1>¡Correcto!</h1>

  async function alEnviar(evento) {
    evento.preventDefault()
    setEstado('enviando')
    try {
      await enviar(respuesta)
      setEstado('exito')
    } catch (err) {
      setEstado('escribiendo')
      setError(err)
    }
  }

  return (
    <form onSubmit={alEnviar}>
      <textarea
        value={respuesta}
        onChange={(evento) => setRespuesta(evento.target.value)}
        disabled={estado === 'enviando'}
      />
      <button disabled={respuesta.length === 0 || estado === 'enviando'}>Enviar</button>
      {error !== null && <p className="error">{error.message}</p>}
    </form>
  )
}`,
        'En React no se dan órdenes del tipo «deshabilita el botón»: se describe cómo debe verse la interfaz en cada estado y se cambia el estado. Pasos: identifica los estados visuales, qué los provoca, represéntalos con useState, elimina los que sobren y conecta los manejadores de eventos.',
      ),
      text(
        'Elegir la estructura del estado',
        `Cinco principios para evitar errores:

1. Agrupa lo relacionado: si dos variables cambian siempre juntas, únelas en una sola (por ejemplo, x e y en un objeto posición).
2. Evita contradicciones: en lugar de dos booleanos como enviando y enviado, que podrían ser verdaderos a la vez, usa una variable estado con tres valores.
3. Evita lo redundante: si un valor se puede calcular a partir de las props o de otro estado, calcúlalo durante el renderizado. Tener nombre, apellido y además nombreCompleto en el estado sobra.
4. Evita duplicar: no guardes el mismo objeto en dos sitios; guarda el id del elemento seleccionado, no una copia.
5. Evita el anidamiento profundo: un estado plano (normalizado), con objetos indexados por id, es mucho más fácil de actualizar.`,
      ),
      code(
        'Compartir estado entre componentes',
        `import { useState } from 'react'

function Panel({ titulo, activo, alMostrar, children }) {
  return (
    <section className="panel">
      <h3>{titulo}</h3>
      {activo ? <p>{children}</p> : <button onClick={alMostrar}>Mostrar</button>}
    </section>
  )
}

export default function Acordeon() {
  const [indiceActivo, setIndiceActivo] = useState(0)

  return (
    <>
      <Panel titulo="Acerca de" activo={indiceActivo === 0} alMostrar={() => setIndiceActivo(0)}>
        Almaty es la ciudad más grande de Kazajistán.
      </Panel>
      <Panel titulo="Etimología" activo={indiceActivo === 1} alMostrar={() => setIndiceActivo(1)}>
        El nombre viene de la palabra kazaja para «manzana».
      </Panel>
    </>
  )
}`,
        'Para que dos componentes cambien de forma coordinada, se saca el estado de ambos, se sube al padre común más cercano y se les pasa por props, junto con las funciones para cambiarlo. Se conoce como «levantar el estado». Cada dato debe tener una única fuente de verdad.',
      ),
      code(
        'Conservar y reiniciar el estado',
        `export default function Marcador() {
  const [esJugadorA, setEsJugadorA] = useState(true)

  return (
    <div>
      {/* Misma posición y mismo componente: el estado se CONSERVA al alternar */}
      {esJugadorA ? <Contador persona="Ana" /> : <Contador persona="Luis" />}

      {/* Con key distinta, React lo trata como otro componente y REINICIA su estado */}
      {esJugadorA
        ? <Contador key="Ana" persona="Ana" />
        : <Contador key="Luis" persona="Luis" />}

      <button onClick={() => setEsJugadorA(!esJugadorA)}>Siguiente jugador</button>
    </div>
  )
}

// Uso típico: vaciar un formulario al cambiar de destinatario
<Chat key={contacto.id} contacto={contacto} />`,
        'React asocia el estado a la posición del componente en el árbol. Mientras el mismo componente siga en el mismo sitio, su estado se mantiene; si cambia el tipo de componente o desaparece, se destruye. key permite forzar el reinicio.',
      ),
      code(
        'Extraer la lógica del estado a un reducer',
        `import { useReducer } from 'react'

function tareasReducer(tareas, accion) {
  switch (accion.type) {
    case 'agregada':
      return [...tareas, { id: accion.id, texto: accion.texto, hecha: false }]
    case 'cambiada':
      return tareas.map((tarea) => (tarea.id === accion.tarea.id ? accion.tarea : tarea))
    case 'eliminada':
      return tareas.filter((tarea) => tarea.id !== accion.id)
    default:
      throw Error('Acción desconocida: ' + accion.type)
  }
}

export default function App() {
  const [tareas, dispatch] = useReducer(tareasReducer, [])

  function alAgregar(texto) {
    dispatch({ type: 'agregada', id: crypto.randomUUID(), texto })
  }

  function alEliminar(id) {
    dispatch({ type: 'eliminada', id })
  }

  // ...
}`,
        'Con useState dices qué valor poner; con un reducer describes qué hizo el usuario mediante una acción, y la función reductora decide el estado siguiente. Toda la lógica queda en un solo lugar, fuera del componente y fácil de probar. El reducer debe ser puro y cada acción representa una sola interacción.',
      ),
      code(
        'Pasar datos en profundidad con contexto',
        `// NivelContext.js
import { createContext } from 'react'
export const NivelContext = createContext(1)

// Seccion.jsx: provee el valor a todo lo que tiene dentro
import { useContext } from 'react'

export function Seccion({ children }) {
  const nivel = useContext(NivelContext)
  return (
    <section>
      <NivelContext value={nivel + 1}>{children}</NivelContext>
    </section>
  )
}

// Titulo.jsx: lee el valor del proveedor más cercano
export function Titulo({ children }) {
  const nivel = useContext(NivelContext)
  const Etiqueta = 'h' + nivel
  return <Etiqueta>{children}</Etiqueta>
}`,
        'El contexto evita el «prop drilling»: pasar una prop a través de muchos componentes que no la usan. Tres pasos: crearlo, proveerlo y usarlo. Antes de recurrir a él, prueba a pasar props o a pasar JSX como children. Usos típicos: tema, usuario actual, idioma. En React 18 y anteriores el proveedor se escribe <NivelContext.Provider value={...}>.',
      ),
      code(
        'Escalar con reducer y contexto',
        `// TareasContext.jsx
import { createContext, useContext, useReducer } from 'react'

const TareasContext = createContext(null)
const TareasDispatchContext = createContext(null)

export function TareasProvider({ children }) {
  const [tareas, dispatch] = useReducer(tareasReducer, [])

  return (
    <TareasContext value={tareas}>
      <TareasDispatchContext value={dispatch}>{children}</TareasDispatchContext>
    </TareasContext>
  )
}

export const useTareas = () => useContext(TareasContext)
export const useTareasDispatch = () => useContext(TareasDispatchContext)

// Cualquier componente dentro de <TareasProvider>
function AgregarTarea() {
  const dispatch = useTareasDispatch()
  return <button onClick={() => dispatch({ type: 'agregada', texto: 'Nueva' })}>Agregar</button>
}`,
        'El reducer centraliza la lógica y el contexto la reparte por el árbol sin pasar props. Se usan dos contextos, uno para los datos y otro para dispatch, de modo que los componentes que solo disparan acciones no se rendericen cuando cambia la lista.',
      ),
      links('Páginas de «Gestionar el estado»', [
        ['Reaccionar a la entrada con estado', 'learn/reacting-to-input-with-state'],
        ['Elegir la estructura del estado', 'learn/choosing-the-state-structure'],
        ['Compartir estado entre componentes', 'learn/sharing-state-between-components'],
        ['Conservar y reiniciar el estado', 'learn/preserving-and-resetting-state'],
        ['Extraer lógica a un reducer', 'learn/extracting-state-logic-into-a-reducer'],
        ['Pasar datos en profundidad con contexto', 'learn/passing-data-deeply-with-context'],
        ['Escalar con reducer y contexto', 'learn/scaling-up-with-reducer-and-context'],
      ]),
    ],
  },
  {
    title: 'Puertas de escape: refs y efectos',
    topics: [
      code(
        'Referenciar valores con refs',
        `import { useRef, useState } from 'react'

export default function Cronometro() {
  const [inicio, setInicio] = useState(null)
  const [ahora, setAhora] = useState(null)
  const intervaloRef = useRef(null)

  function iniciar() {
    setInicio(Date.now())
    setAhora(Date.now())
    clearInterval(intervaloRef.current)
    intervaloRef.current = setInterval(() => setAhora(Date.now()), 10)
  }

  function detener() {
    clearInterval(intervaloRef.current)
  }

  const segundos = inicio && ahora ? (ahora - inicio) / 1000 : 0

  return (
    <>
      <h1>{segundos.toFixed(3)}</h1>
      <button onClick={iniciar}>Iniciar</button>
      <button onClick={detener}>Detener</button>
    </>
  )
}`,
        'Una ref es un objeto { current } que se conserva entre renderizados, igual que el estado, pero cambiarlo no provoca un renderizado nuevo. Sirve para lo que no se ve en pantalla: identificadores de temporizadores, elementos del DOM. No leas ni escribas ref.current durante el renderizado.',
      ),
      code(
        'Manipular el DOM con refs',
        `import { useRef } from 'react'

function MiInput({ ref }) {
  return <input ref={ref} />
}

export default function Formulario() {
  const inputRef = useRef(null)

  return (
    <>
      <MiInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Enfocar el campo</button>
      <button onClick={() => inputRef.current.scrollIntoView({ behavior: 'smooth' })}>
        Ir al campo
      </button>
    </>
  )
}`,
        'Al pasar la ref al atributo ref de una etiqueta, React guarda en current el nodo del DOM. Úsala para acciones que no destruyen nada: enfocar, desplazar, medir. No modifiques, añadas ni elimines nodos que React gestiona. En React 19 un componente recibe ref como una prop más; en versiones anteriores hacía falta forwardRef.',
      ),
      code(
        'Sincronizar con efectos',
        `import { useEffect, useState } from 'react'
import { crearConexion } from './chat.js'

function SalaChat({ salaId }) {
  const [urlServidor, setUrlServidor] = useState('https://localhost:1234')

  useEffect(() => {
    const conexion = crearConexion(urlServidor, salaId)
    conexion.conectar()

    // Limpieza: antes de la siguiente ejecución y al desmontar
    return () => conexion.desconectar()
  }, [urlServidor, salaId])   // se repite solo si cambia alguna dependencia

  return <h1>Bienvenido a la sala {salaId}</h1>
}`,
        'Un efecto ejecuta código después del renderizado para sincronizar el componente con algo externo a React: una conexión, una API del navegador, una librería de terceros. Sin arreglo de dependencias corre tras cada renderizado; con [] solo al montar; con valores, cuando alguno cambia. En desarrollo, el modo estricto monta, desmonta y vuelve a montar para comprobar que la limpieza funciona.',
      ),
      code(
        'Quizá no necesites un efecto',
        `// Mal: estado redundante y un efecto para calcular algo
const [nombreCompleto, setNombreCompleto] = useState('')
useEffect(() => {
  setNombreCompleto(nombre + ' ' + apellido)
}, [nombre, apellido])

// Bien: se calcula durante el renderizado
const nombreCompleto = nombre + ' ' + apellido

// Cálculo costoso: se guarda en memoria con useMemo
const visibles = useMemo(() => filtrar(tareas, filtro), [tareas, filtro])

// Mal: lógica de un evento dentro de un efecto
useEffect(() => {
  if (producto.enCarrito) mostrarAviso('Añadido al carrito')
}, [producto])

// Bien: en el manejador del evento que lo provoca
function alComprar() {
  agregarAlCarrito(producto)
  mostrarAviso('Añadido al carrito')
}`,
        'No hacen falta efectos para transformar datos antes de mostrarlos ni para responder a acciones del usuario. Para reiniciar todo el estado cuando cambia una prop, usa key. Los efectos son solo para sincronizar con sistemas externos.',
      ),
      code(
        'Pedir datos en un efecto sin condiciones de carrera',
        `function Resultados({ consulta }) {
  const [resultados, setResultados] = useState([])

  useEffect(() => {
    let ignorar = false

    buscar(consulta).then((datos) => {
      if (!ignorar) setResultados(datos)
    })

    return () => {
      ignorar = true   // la respuesta de una consulta anterior se descarta
    }
  }, [consulta])

  return <Lista elementos={resultados} />
}`,
        'Si el usuario escribe rápido, las respuestas pueden llegar desordenadas y una antigua podría pisar a la nueva. La función de limpieza lo evita. Pedir datos en efectos tiene más inconvenientes (sin caché, sin renderizado en servidor, cascadas de peticiones), por lo que la documentación recomienda el mecanismo del framework o una librería como TanStack Query.',
      ),
      text(
        'El ciclo de vida de los efectos reactivos',
        `Un componente se monta, se actualiza y se desmonta. Un efecto solo hace dos cosas: empezar a sincronizar y dejar de sincronizar, y puede hacerlo muchas veces mientras el componente sigue en pantalla.

Piensa cada efecto de forma aislada, como un proceso independiente, y no desde el punto de vista del componente.

Son valores reactivos las props, el estado y todo lo que se calcula con ellos dentro del componente. Si un efecto lee un valor reactivo, debe incluirlo en sus dependencias. No se eligen: las dicta el código, y el linter (regla exhaustive-deps) comprueba que estén todas. No lo silencies: si una dependencia sobra, hay que cambiar el código para que deje de serlo.`,
      ),
      code(
        'Separar eventos de efectos',
        `import { useEffect, useEffectEvent } from 'react'

function SalaChat({ salaId, tema }) {
  // Lee el tema más reciente sin ser una dependencia del efecto
  const alConectar = useEffectEvent(() => {
    mostrarAviso('¡Conectado!', tema)
  })

  useEffect(() => {
    const conexion = crearConexion(urlServidor, salaId)
    conexion.on('connected', () => alConectar())
    conexion.conectar()
    return () => conexion.desconectar()
  }, [salaId])   // cambiar el tema ya no reconecta el chat

  return <h1>Bienvenido a la sala {salaId}</h1>
}`,
        'Los manejadores de eventos responden a una interacción concreta; los efectos se vuelven a ejecutar cuando cambia cualquier valor que leen. A veces un efecto necesita leer un valor sin reaccionar a él: useEffectEvent extrae esa parte no reactiva. Solo se llama desde efectos y no se pasa a otros componentes. Disponible desde React 19.2.',
      ),
      code(
        'Eliminar dependencias innecesarias',
        `// Problema: el objeto se crea en cada renderizado, así que el efecto siempre se repite
function SalaChat({ salaId }) {
  const opciones = { urlServidor, salaId }

  useEffect(() => {
    const conexion = crearConexion(opciones)
    conexion.conectar()
    return () => conexion.desconectar()
  }, [opciones])
}

// Solución: crear el objeto dentro del efecto y depender de valores primitivos
function SalaChat({ salaId }) {
  useEffect(() => {
    const opciones = { urlServidor, salaId }
    const conexion = crearConexion(opciones)
    conexion.conectar()
    return () => conexion.desconectar()
  }, [salaId])
}

// Leer el estado anterior sin depender de él
useEffect(() => {
  conexion.on('message', (mensaje) => {
    setMensajes((actuales) => [...actuales, mensaje])
  })
}, [])`,
        'Para quitar una dependencia hay que demostrar que no lo es. Preguntas útiles: ¿este código debería ir en un manejador de eventos?, ¿el efecto hace dos cosas no relacionadas y conviene dividirlo?, ¿se puede usar una función actualizadora?, ¿se puede mover el objeto o la función dentro del efecto o fuera del componente?',
      ),
      code(
        'Reutilizar lógica con Hooks personalizados',
        `// useEstadoConexion.js
import { useEffect, useState } from 'react'

export function useEstadoConexion() {
  const [enLinea, setEnLinea] = useState(true)

  useEffect(() => {
    const conectar = () => setEnLinea(true)
    const desconectar = () => setEnLinea(false)

    window.addEventListener('online', conectar)
    window.addEventListener('offline', desconectar)

    return () => {
      window.removeEventListener('online', conectar)
      window.removeEventListener('offline', desconectar)
    }
  }, [])

  return enLinea
}

// Dos componentes distintos lo reutilizan
function BarraEstado() {
  const enLinea = useEstadoConexion()
  return <h1>{enLinea ? '✅ En línea' : '❌ Sin conexión'}</h1>
}

function BotonGuardar() {
  const enLinea = useEstadoConexion()
  return <button disabled={!enLinea}>{enLinea ? 'Guardar' : 'Reconectando…'}</button>
}`,
        'Un Hook personalizado es una función cuyo nombre empieza por use y que llama a otros Hooks. Comparte la lógica, no el estado: cada componente que lo usa tiene su propia copia. Esconde los detalles (cómo) y deja en el componente la intención (qué).',
      ),
      links('Páginas de «Puertas de escape»', [
        ['Referenciar valores con refs', 'learn/referencing-values-with-refs'],
        ['Manipular el DOM con refs', 'learn/manipulating-the-dom-with-refs'],
        ['Sincronizar con efectos', 'learn/synchronizing-with-effects'],
        ['Quizá no necesites un efecto', 'learn/you-might-not-need-an-effect'],
        ['Ciclo de vida de los efectos reactivos', 'learn/lifecycle-of-reactive-effects'],
        ['Separar eventos de efectos', 'learn/separating-events-from-effects'],
        ['Eliminar dependencias de los efectos', 'learn/removing-effect-dependencies'],
        ['Reutilizar lógica con Hooks personalizados', 'learn/reusing-logic-with-custom-hooks'],
      ]),
    ],
  },
  {
    title: 'Pensar en React y el tutorial del tres en raya',
    topics: [
      text(
        'Pensar en React: los cinco pasos',
        `La documentación propone construir cualquier pantalla así, partiendo de un diseño y de los datos de una API:

1. Divide la interfaz en una jerarquía de componentes. Cada componente debería hacer una sola cosa.
2. Construye una versión estática: solo props, sin estado ni interactividad.
3. Encuentra la representación mínima pero completa del estado. No repitas información: lo que se puede calcular no es estado.
4. Decide dónde vive cada estado: en el padre común más cercano de todos los componentes que lo usan.
5. Añade el flujo de datos inverso: los hijos avisan al padre mediante funciones recibidas por props.`,
      ),
      code(
        'Paso 1 y 2: jerarquía y versión estática',
        `// TablaProductosFiltrable
// ├── BarraBusqueda
// └── TablaProductos
//     ├── FilaCategoria
//     └── FilaProducto

function FilaProducto({ producto }) {
  const nombre = producto.enStock
    ? producto.nombre
    : <span style={{ color: 'red' }}>{producto.nombre}</span>

  return (
    <tr>
      <td>{nombre}</td>
      <td>{producto.precio}</td>
    </tr>
  )
}

function TablaProductos({ productos }) {
  return (
    <table>
      <tbody>
        {productos.map((producto) => (
          <FilaProducto key={producto.nombre} producto={producto} />
        ))}
      </tbody>
    </table>
  )
}`,
        'Los datos bajan desde el componente superior hasta los de abajo por props: es el flujo de datos en un solo sentido. En proyectos pequeños es más fácil construir de arriba abajo; en los grandes, de abajo arriba.',
      ),
      code(
        'Pasos 3 a 5: estado mínimo y flujo inverso',
        `// ¿Es estado? No si no cambia, si llega por props o si se puede calcular.
// Estado: el texto de búsqueda y la casilla. La lista filtrada se calcula.

function TablaProductosFiltrable({ productos }) {
  const [texto, setTexto] = useState('')
  const [soloEnStock, setSoloEnStock] = useState(false)

  const visibles = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(texto.toLowerCase())
    && (!soloEnStock || producto.enStock),
  )

  return (
    <div>
      <BarraBusqueda
        texto={texto}
        soloEnStock={soloEnStock}
        alCambiarTexto={setTexto}
        alCambiarStock={setSoloEnStock}
      />
      <TablaProductos productos={visibles} />
    </div>
  )
}

function BarraBusqueda({ texto, soloEnStock, alCambiarTexto, alCambiarStock }) {
  return (
    <form>
      <input value={texto} placeholder="Buscar…" onChange={(e) => alCambiarTexto(e.target.value)} />
      <label>
        <input type="checkbox" checked={soloEnStock} onChange={(e) => alCambiarStock(e.target.checked)} />
        Solo productos en stock
      </label>
    </form>
  )
}`,
      ),
      code(
        'Tutorial: el tablero del tres en raya',
        `import { useState } from 'react'

function Casilla({ valor, alHacerClic }) {
  return <button className="casilla" onClick={alHacerClic}>{valor}</button>
}

function Tablero({ turnoX, casillas, alJugar }) {
  function alHacerClic(i) {
    if (casillas[i] || calcularGanador(casillas)) return

    const siguientes = casillas.slice()   // copia: no se muta el arreglo
    siguientes[i] = turnoX ? 'X' : 'O'
    alJugar(siguientes)
  }

  const ganador = calcularGanador(casillas)
  const estado = ganador ? 'Ganador: ' + ganador : 'Siguiente jugador: ' + (turnoX ? 'X' : 'O')

  return (
    <>
      <div className="estado">{estado}</div>
      <div className="tablero">
        {casillas.map((valor, i) => (
          <Casilla key={i} valor={valor} alHacerClic={() => alHacerClic(i)} />
        ))}
      </div>
    </>
  )
}`,
        'El estado de las nueve casillas vive en el padre, no en cada casilla, porque el tablero necesita verlas todas para saber quién gana.',
      ),
      code(
        'Tutorial: calcular el ganador',
        `function calcularGanador(casillas) {
  const lineas = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],   // filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8],   // columnas
    [0, 4, 8], [2, 4, 6],              // diagonales
  ]

  for (const [a, b, c] of lineas) {
    if (casillas[a] && casillas[a] === casillas[b] && casillas[a] === casillas[c]) {
      return casillas[a]
    }
  }
  return null
}`,
      ),
      code(
        'Tutorial: historial y viaje en el tiempo',
        `export default function Juego() {
  const [historial, setHistorial] = useState([Array(9).fill(null)])
  const [movimientoActual, setMovimientoActual] = useState(0)

  const turnoX = movimientoActual % 2 === 0        // se calcula, no se guarda
  const casillas = historial[movimientoActual]

  function alJugar(siguientes) {
    const nuevoHistorial = [...historial.slice(0, movimientoActual + 1), siguientes]
    setHistorial(nuevoHistorial)
    setMovimientoActual(nuevoHistorial.length - 1)
  }

  return (
    <div className="juego">
      <Tablero turnoX={turnoX} casillas={casillas} alJugar={alJugar} />
      <ol>
        {historial.map((_, movimiento) => (
          <li key={movimiento}>
            <button onClick={() => setMovimientoActual(movimiento)}>
              {movimiento > 0 ? 'Ir al movimiento n.º ' + movimiento : 'Ir al inicio'}
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}`,
        'Como cada jugada crea un arreglo nuevo en lugar de modificar el anterior, guardar el historial es trivial. La inmutabilidad hace fácil deshacer y permite a React detectar qué cambió con una simple comparación. Aquí el índice sirve como key porque los movimientos nunca se reordenan.',
      ),
      links('Páginas de práctica', [
        ['Pensar en React', 'learn/thinking-in-react'],
        ['Tutorial: tres en raya', 'learn/tutorial-tic-tac-toe'],
      ]),
    ],
  },
]
