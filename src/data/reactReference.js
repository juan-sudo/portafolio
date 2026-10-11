// React · niveles basados en la referencia de la API: https://react.dev/reference/react

import { code, links, text } from './reactHelpers'

export const reactReferenceLevels = [
  {
    title: 'Hooks de rendimiento y utilidades',
    topics: [
      text(
        'Las reglas de los Hooks',
        `Los Hooks son funciones que empiezan por use y dan acceso a características de React desde un componente.

1. Llámalos solo en el nivel superior: nunca dentro de condiciones, bucles, funciones anidadas, try/catch ni después de un return anticipado. React los identifica por el orden en que se llaman, y ese orden debe ser idéntico en cada renderizado.
2. Llámalos solo desde componentes de función o desde otros Hooks personalizados, no desde funciones normales de JavaScript.

El plugin eslint-plugin-react-hooks comprueba ambas reglas mientras escribes.`,
      ),
      code(
        'useMemo: guardar el resultado de un cálculo',
        `import { useMemo } from 'react'

function ListaTareas({ tareas, filtro, tema }) {
  // Solo se recalcula si cambian tareas o filtro, no al cambiar el tema
  const visibles = useMemo(
    () => filtrarTareas(tareas, filtro),
    [tareas, filtro],
  )

  return (
    <div className={tema}>
      <Lista elementos={visibles} />
    </div>
  )
}`,
        'Es solo una optimización: el código debe funcionar igual sin él. Úsalo cuando el cálculo sea de verdad lento (mídelo con console.time) o cuando el valor se pase a un componente envuelto en memo. Si usas React Compiler, este tipo de memoización se aplica automáticamente.',
      ),
      code(
        'memo y useCallback: evitar renderizados de los hijos',
        `import { memo, useCallback } from 'react'

// Solo se vuelve a renderizar si cambian sus props
const FormularioEnvio = memo(function FormularioEnvio({ alEnviar }) {
  // ...
})

function PaginaProducto({ productoId, referido, tema }) {
  // Sin useCallback, la función sería distinta en cada renderizado
  // y memo no serviría de nada
  const alEnviar = useCallback(
    (datosPedido) => {
      enviar('/producto/' + productoId + '/comprar', { referido, datosPedido })
    },
    [productoId, referido],
  )

  return (
    <div className={tema}>
      <FormularioEnvio alEnviar={alEnviar} />
    </div>
  )
}`,
        'memo compara las props nuevas con las anteriores y se salta el renderizado si son iguales. Como una función o un objeto creado dentro del componente es nuevo cada vez, hay que estabilizarlo con useCallback o useMemo.',
      ),
      code(
        'useTransition: actualizaciones que no bloquean',
        `import { useState, useTransition } from 'react'

function Pestanas() {
  const [pestana, setPestana] = useState('inicio')
  const [pendiente, startTransition] = useTransition()

  function elegir(siguiente) {
    startTransition(() => {
      setPestana(siguiente)   // actualización no urgente
    })
  }

  return (
    <>
      <button onClick={() => elegir('publicaciones')}>
        Publicaciones {pendiente && '…'}
      </button>
      <Contenido pestana={pestana} />
    </>
  )
}`,
        'Una transición marca una actualización como no urgente: si renderizarla es lento, la interfaz sigue respondiendo y el usuario puede interrumpirla pulsando otra cosa. pendiente permite mostrar un indicador. En React 19 la función que se pasa a startTransition puede ser asíncrona.',
      ),
      code(
        'useDeferredValue: mostrar el valor anterior mientras llega el nuevo',
        `import { Suspense, useDeferredValue, useState } from 'react'

export default function Buscador() {
  const [consulta, setConsulta] = useState('')
  const consultaDiferida = useDeferredValue(consulta)
  const desactualizado = consulta !== consultaDiferida

  return (
    <>
      <input value={consulta} onChange={(e) => setConsulta(e.target.value)} />
      <Suspense fallback={<p>Cargando…</p>}>
        <div style={{ opacity: desactualizado ? 0.5 : 1 }}>
          <Resultados consulta={consultaDiferida} />
        </div>
      </Suspense>
    </>
  )
}`,
        'El campo de texto se actualiza al instante y la lista, que es la parte lenta, va un paso por detrás y se renderiza en segundo plano. A diferencia de un debounce, no hay un retraso fijo: se adapta a la velocidad del dispositivo.',
      ),
      code(
        'useId: identificadores para accesibilidad',
        `import { useId } from 'react'

function CampoClave() {
  const id = useId()

  return (
    <>
      <label htmlFor={id + '-clave'}>Contraseña</label>
      <input id={id + '-clave'} type="password" aria-describedby={id + '-ayuda'} />
      <p id={id + '-ayuda'}>Debe tener al menos 18 caracteres.</p>
    </>
  )
}`,
        'Genera un identificador único y estable, igual en el servidor y en el cliente, de modo que puedes usar el componente varias veces en la misma página sin que los id choquen. No lo uses para las key de una lista.',
      ),
      code(
        'useLayoutEffect: medir antes de que el navegador pinte',
        `import { useLayoutEffect, useRef, useState } from 'react'

function Tooltip({ children, objetivo }) {
  const ref = useRef(null)
  const [alto, setAlto] = useState(0)

  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect()
    setAlto(height)   // el segundo renderizado ocurre antes de pintar
  }, [])

  // Si no cabe arriba, se coloca debajo
  const arriba = objetivo.top - alto < 0 ? objetivo.bottom : objetivo.top - alto

  return <div ref={ref} style={{ position: 'absolute', top: arriba }}>{children}</div>
}`,
        'Se ejecuta después de actualizar el DOM pero antes de que el navegador pinte, así el usuario nunca ve la posición intermedia. Bloquea el pintado y puede perjudicar el rendimiento: prefiere useEffect siempre que sea posible.',
      ),
      code(
        'useImperativeHandle: exponer solo algunos métodos',
        `import { useImperativeHandle, useRef } from 'react'

function CampoBusqueda({ ref }) {
  const inputRef = useRef(null)

  useImperativeHandle(ref, () => ({
    enfocar() {
      inputRef.current.focus()
    },
    limpiar() {
      inputRef.current.value = ''
    },
  }), [])

  return <input ref={inputRef} />
}

function Pagina() {
  const campoRef = useRef(null)
  return (
    <>
      <CampoBusqueda ref={campoRef} />
      <button onClick={() => campoRef.current.enfocar()}>Buscar</button>
    </>
  )
}`,
        'En lugar de entregar el nodo del DOM completo, el componente decide qué puede hacer el padre con él. No abuses: lo que se pueda expresar con una prop debe ser una prop.',
      ),
      code(
        'useSyncExternalStore: suscribirse a un almacén externo',
        `import { useSyncExternalStore } from 'react'

function suscribir(callback) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

export function useEstadoConexion() {
  return useSyncExternalStore(
    suscribir,
    () => navigator.onLine,   // valor en el cliente
    () => true,               // valor durante el renderizado en servidor
  )
}`,
        'Es la forma recomendada de leer datos que viven fuera de React y cambian con el tiempo: una API del navegador o una librería de estado. Librerías como Zustand y Redux lo usan por dentro. Sustituye al patrón de useState más useEffect para estos casos.',
      ),
      links('Referencia de Hooks', [
        ['Todos los Hooks', 'reference/react/hooks'],
        ['Reglas de los Hooks', 'reference/rules/rules-of-hooks'],
        ['useMemo', 'reference/react/useMemo'],
        ['useCallback', 'reference/react/useCallback'],
        ['memo', 'reference/react/memo'],
        ['useTransition', 'reference/react/useTransition'],
        ['useDeferredValue', 'reference/react/useDeferredValue'],
        ['useSyncExternalStore', 'reference/react/useSyncExternalStore'],
      ]),
    ],
  },
  {
    title: 'Componentes y APIs integradas',
    topics: [
      code(
        'Fragment: agrupar sin añadir nodos',
        `import { Fragment } from 'react'

function Publicacion() {
  return (
    <>
      <Titulo />
      <Cuerpo />
    </>
  )
}

// La forma larga es necesaria cuando el fragmento lleva key
function Glosario({ terminos }) {
  return (
    <dl>
      {terminos.map((termino) => (
        <Fragment key={termino.id}>
          <dt>{termino.nombre}</dt>
          <dd>{termino.definicion}</dd>
        </Fragment>
      ))}
    </dl>
  )
}`,
      ),
      text(
        'StrictMode: encontrar errores en desarrollo',
        `<StrictMode> activa comportamientos adicionales solo en desarrollo; en producción no hace nada.

Renderiza cada componente dos veces para detectar los que no son puros.
Ejecuta cada efecto una vez de más (montar, limpiar, volver a montar) para detectar limpiezas que faltan.
Ejecuta una vez de más las funciones de ref.
Avisa del uso de API obsoletas.

Por eso ves algunos console.log duplicados. No es un fallo: si tu código se comporta distinto al ejecutarse dos veces, es que tiene un error que conviene arreglar.`,
      ),
      code(
        'Suspense y lazy: cargar código bajo demanda',
        `import { Suspense, lazy, useState } from 'react'

// El código de este componente va en un archivo aparte
const VistaPrevia = lazy(() => import('./VistaPrevia.jsx'))

export default function Editor() {
  const [mostrar, setMostrar] = useState(false)

  return (
    <>
      <button onClick={() => setMostrar(true)}>Ver vista previa</button>

      {mostrar && (
        <Suspense fallback={<p>Cargando…</p>}>
          <VistaPrevia />
        </Suspense>
      )}
    </>
  )
}`,
        'lazy retrasa la descarga de un componente hasta que se renderiza por primera vez; el módulo debe tener una exportación por defecto. Suspense muestra el fallback mientras alguno de sus hijos está cargando. Declara lazy fuera de los componentes.',
      ),
      code(
        'Límites de error',
        `import { Component } from 'react'

class LimiteError extends Component {
  state = { hayError: false }

  static getDerivedStateFromError() {
    return { hayError: true }
  }

  componentDidCatch(error, info) {
    registrarError(error, info.componentStack)
  }

  render() {
    return this.state.hayError ? this.props.fallback : this.props.children
  }
}

<LimiteError fallback={<p>Algo salió mal.</p>}>
  <Perfil />
</LimiteError>`,
        'Si un componente lanza un error al renderizar, React desmonta todo el árbol. Un límite de error captura el fallo y muestra una alternativa solo en esa parte. Todavía no existe un equivalente con función: se escribe con una clase o se usa el paquete react-error-boundary. No captura errores de manejadores de eventos ni de código asíncrono.',
      ),
      code(
        'createPortal: renderizar fuera del contenedor',
        `import { useState } from 'react'
import { createPortal } from 'react-dom'

function Modal({ alCerrar, children }) {
  return createPortal(
    <div className="modal-fondo" onClick={alCerrar}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  )
}

export default function App() {
  const [abierto, setAbierto] = useState(false)

  return (
    <div style={{ overflow: 'hidden' }}>
      <button onClick={() => setAbierto(true)}>Abrir</button>
      {abierto && <Modal alCerrar={() => setAbierto(false)}>Contenido</Modal>}
    </div>
  )
}`,
        'El portal coloca el contenido en otro lugar del DOM, fuera de un padre con overflow: hidden o con un z-index bajo. Sigue siendo hijo del componente que lo renderiza: recibe su contexto y sus eventos suben por el árbol de React.',
      ),
      code(
        'Activity: ocultar sin perder el estado',
        `import { Activity, useState } from 'react'

export default function App() {
  const [pestana, setPestana] = useState('inicio')

  return (
    <>
      <button onClick={() => setPestana('inicio')}>Inicio</button>
      <button onClick={() => setPestana('ajustes')}>Ajustes</button>

      <Activity mode={pestana === 'inicio' ? 'visible' : 'hidden'}>
        <Inicio />
      </Activity>
      <Activity mode={pestana === 'ajustes' ? 'visible' : 'hidden'}>
        <Ajustes />
      </Activity>
    </>
  )
}`,
        'Con un renderizado condicional, al ocultar un componente se destruye su estado. <Activity> lo oculta con display: none, conserva el estado y el DOM, y limpia sus efectos mientras no se ve. Disponible desde React 19.2.',
      ),
      code(
        'Profiler y flushSync',
        `import { Profiler } from 'react'
import { flushSync } from 'react-dom'

function alRenderizar(id, fase, duracionReal, duracionBase) {
  console.log(id, fase, duracionReal.toFixed(1) + ' ms')
}

<Profiler id="BarraLateral" onRender={alRenderizar}>
  <BarraLateral />
</Profiler>

// flushSync: aplicar el cambio al DOM de inmediato
function agregarTarea() {
  flushSync(() => {
    setTareas([...tareas, nueva])
  })
  listaRef.current.lastChild.scrollIntoView()   // el elemento nuevo ya existe
}`,
        'Profiler mide por código cuánto tarda en renderizar una parte del árbol. flushSync obliga a React a actualizar el DOM de forma síncrona; perjudica el rendimiento, así que es un último recurso para integrarse con código del navegador o de terceros.',
      ),
      links('Referencia de componentes y APIs', [
        ['Componentes integrados', 'reference/react/components'],
        ['Suspense', 'reference/react/Suspense'],
        ['lazy', 'reference/react/lazy'],
        ['StrictMode', 'reference/react/StrictMode'],
        ['Activity', 'reference/react/Activity'],
        ['createPortal', 'reference/react-dom/createPortal'],
        ['Capturar errores con un límite de error', 'reference/react/Component#catching-rendering-errors-with-an-error-boundary'],
      ]),
    ],
  },
  {
    title: 'React 19: acciones, formularios y servidor',
    topics: [
      code(
        'Acciones en los formularios',
        `function Buscador() {
  function buscar(formData) {
    const consulta = formData.get('consulta')
    alert('Buscaste: ' + consulta)
  }

  return (
    <form action={buscar}>
      <input name="consulta" />
      <button type="submit">Buscar</button>
    </form>
  )
}`,
        'En React 19 la prop action de <form> acepta una función. React la llama con los datos del formulario (FormData), la ejecuta dentro de una transición y, al terminar, reinicia los campos no controlados. No hace falta preventDefault ni un estado por cada campo.',
      ),
      code(
        'useActionState: estado y pendiente de una acción',
        `import { useActionState } from 'react'

async function actualizarNombre(estadoAnterior, formData) {
  const nombre = formData.get('nombre')
  if (!nombre) return { error: 'El nombre es obligatorio' }

  const error = await guardarNombre(nombre)
  return error ? { error } : { error: null, guardado: true }
}

function CambiarNombre() {
  const [estado, accion, pendiente] = useActionState(actualizarNombre, { error: null })

  return (
    <form action={accion}>
      <input name="nombre" />
      <button disabled={pendiente}>{pendiente ? 'Guardando…' : 'Guardar'}</button>
      {estado.error && <p className="error">{estado.error}</p>}
      {estado.guardado && <p>Guardado.</p>}
    </form>
  )
}`,
        'Recibe la acción y el estado inicial, y devuelve el último resultado, la acción que debes pasar al formulario y un indicador de pendiente. La acción recibe como primer argumento el estado anterior.',
      ),
      code(
        'useFormStatus: el estado del formulario desde un hijo',
        `import { useFormStatus } from 'react-dom'

function BotonEnviar() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Enviando…' : 'Enviar'}
    </button>
  )
}

function Formulario({ accion }) {
  return (
    <form action={accion}>
      <input name="correo" type="email" />
      <BotonEnviar />
    </form>
  )
}`,
        'Permite hacer un botón reutilizable que sabe si su formulario se está enviando, sin pasarle props. Debe llamarse desde un componente que esté dentro del <form>, no desde el que lo define.',
      ),
      code(
        'useOptimistic: mostrar el resultado antes de que llegue',
        `import { useOptimistic, useRef } from 'react'

function Hilo({ mensajes, enviarMensaje }) {
  const formRef = useRef(null)

  const [mensajesOptimistas, agregarOptimista] = useOptimistic(
    mensajes,
    (actuales, texto) => [...actuales, { texto, enviando: true }],
  )

  async function accion(formData) {
    agregarOptimista(formData.get('mensaje'))
    formRef.current.reset()
    await enviarMensaje(formData)
  }

  return (
    <>
      {mensajesOptimistas.map((mensaje, i) => (
        <p key={i}>{mensaje.texto}{mensaje.enviando && <small> (enviando…)</small>}</p>
      ))}
      <form action={accion} ref={formRef}>
        <input name="mensaje" placeholder="Hola" />
        <button type="submit">Enviar</button>
      </form>
    </>
  )
}`,
        'La interfaz se actualiza al instante con el valor esperado mientras la petición sigue en curso. Cuando la acción termina o falla, React vuelve a mostrar el estado real.',
      ),
      code(
        'use: leer una promesa o un contexto',
        `import { Suspense, use } from 'react'

function Comentarios({ promesaComentarios }) {
  // Suspende el componente hasta que la promesa se resuelve
  const comentarios = use(promesaComentarios)
  return comentarios.map((comentario) => <p key={comentario.id}>{comentario.texto}</p>)
}

function Pagina({ promesaComentarios }) {
  return (
    <Suspense fallback={<p>Cargando comentarios…</p>}>
      <Comentarios promesaComentarios={promesaComentarios} />
    </Suspense>
  )
}

// A diferencia de useContext, se puede llamar dentro de un if
function Titulo({ mostrar, children }) {
  if (!mostrar) return null
  const tema = use(TemaContext)
  return <h1 className={tema}>{children}</h1>
}`,
        'use es una API, no un Hook, y por eso puede llamarse dentro de condiciones y bucles. La promesa debe crearse fuera del componente cliente (en el servidor o en una caché); si se crea en cada renderizado, se repite sin fin.',
      ),
      code(
        'Otras novedades de React 19',
        `// ref como prop: ya no hace falta forwardRef
function MiInput({ placeholder, ref }) {
  return <input placeholder={placeholder} ref={ref} />
}

// El contexto se usa directamente como proveedor
<TemaContext value="oscuro">{children}</TemaContext>

// Función de limpieza en las refs
<input ref={(nodo) => {
  registrar(nodo)
  return () => quitar(nodo)
}} />

// Metadatos del documento desde cualquier componente
function Articulo({ articulo }) {
  return (
    <article>
      <title>{articulo.titulo}</title>
      <meta name="description" content={articulo.resumen} />
      <link rel="canonical" href={articulo.url} />
      <h1>{articulo.titulo}</h1>
    </article>
  )
}`,
        'React mueve automáticamente <title>, <meta> y <link> a la sección <head> del documento.',
      ),
      text(
        'Componentes de servidor y funciones de servidor',
        `Los componentes de servidor (Server Components) se renderizan por adelantado, en el servidor o durante la compilación, y su código no se envía al navegador. Pueden ser async, leer la base de datos o el sistema de archivos directamente y no pueden usar estado, efectos ni manejadores de eventos.

Los componentes cliente son los de siempre. Se marcan con la directiva 'use client' al inicio del archivo y pueden recibir como props datos serializables o JSX ya renderizado en el servidor.

Las funciones de servidor (Server Functions) se marcan con 'use server' y permiten que un componente cliente llame a código que se ejecuta en el servidor, por ejemplo desde la action de un formulario.

No funcionan con React a secas: requieren un framework que los implemente, como Next.js.`,
      ),
      code(
        'React Compiler',
        `$ npm install -D babel-plugin-react-compiler@latest

// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: ['babel-plugin-react-compiler'] },
    }),
  ],
})

// Antes: memoización manual
const visibles = useMemo(() => filtrar(tareas, filtro), [tareas, filtro])
const alEnviar = useCallback((datos) => enviar(id, datos), [id])

// Con el compilador: se escribe el código directo y él lo optimiza
const visibles = filtrar(tareas, filtro)
const alEnviar = (datos) => enviar(id, datos)`,
        'Es una herramienta que actúa al compilar y memoiza automáticamente componentes y valores, de modo que en código nuevo rara vez hacen falta useMemo, useCallback o memo. Solo optimiza componentes que cumplen las reglas de React (puros, sin mutar props ni estado). Se puede adoptar por carpetas.',
      ),
      links('Referencia de React 19', [
        ['<form>', 'reference/react-dom/components/form'],
        ['useActionState', 'reference/react/useActionState'],
        ['useFormStatus', 'reference/react-dom/hooks/useFormStatus'],
        ['useOptimistic', 'reference/react/useOptimistic'],
        ['use', 'reference/react/use'],
        ['Componentes de servidor', 'reference/rsc/server-components'],
        ['React Compiler', 'learn/react-compiler'],
      ]),
    ],
  },
  {
    title: 'Formularios y elementos del DOM',
    topics: [
      code(
        'Campos controlados',
        `import { useState } from 'react'

export default function Formulario() {
  const [nombre, setNombre] = useState('')
  const [edad, setEdad] = useState(18)

  return (
    <>
      <label>
        Nombre:
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </label>
      <label>
        Edad:
        <input type="number" value={edad} onChange={(e) => setEdad(Number(e.target.value))} />
      </label>
      {nombre !== '' && <p>Te llamas {nombre}.</p>}
    </>
  )
}`,
        'En un campo controlado, el estado de React es la única fuente de verdad: value muestra el estado y onChange lo actualiza. Si pasas value sin onChange, el campo queda de solo lectura. El valor nunca debe ser undefined o null: usa una cadena vacía.',
      ),
      code(
        'Campos no controlados y FormData',
        `export default function Registro() {
  function alEnviar(evento) {
    evento.preventDefault()

    const formData = new FormData(evento.target)
    const datos = Object.fromEntries(formData.entries())
    console.log(datos)   // { correo: '...', plan: 'pro', boletin: 'on' }
  }

  return (
    <form onSubmit={alEnviar}>
      <input name="correo" type="email" defaultValue="" required />
      <select name="plan" defaultValue="gratis">
        <option value="gratis">Gratis</option>
        <option value="pro">Pro</option>
      </select>
      <label><input name="boletin" type="checkbox" defaultChecked /> Boletín</label>
      <button type="submit">Crear cuenta</button>
    </form>
  )
}`,
        'En un campo no controlado el navegador guarda el valor y tú lo lees al enviar. defaultValue y defaultChecked fijan el valor inicial. Cada campo necesita el atributo name. Es más simple cuando no necesitas reaccionar a cada tecla.',
      ),
      code(
        'select, textarea, casillas y botones de opción',
        `const [fruta, setFruta] = useState('naranja')
const [verduras, setVerduras] = useState(['maiz', 'tomate'])
const [comentario, setComentario] = useState('')
const [acepta, setAcepta] = useState(false)
const [envio, setEnvio] = useState('normal')

<select value={fruta} onChange={(e) => setFruta(e.target.value)}>
  <option value="manzana">Manzana</option>
  <option value="naranja">Naranja</option>
</select>

<select multiple value={verduras} onChange={(e) =>
  setVerduras([...e.target.selectedOptions].map((opcion) => opcion.value))
}>
  <option value="maiz">Maíz</option>
  <option value="tomate">Tomate</option>
</select>

<textarea value={comentario} onChange={(e) => setComentario(e.target.value)} rows={4} />

<input type="checkbox" checked={acepta} onChange={(e) => setAcepta(e.target.checked)} />

<input type="radio" name="envio" value="normal"
       checked={envio === 'normal'} onChange={(e) => setEnvio(e.target.value)} />
<input type="radio" name="envio" value="rapido"
       checked={envio === 'rapido'} onChange={(e) => setEnvio(e.target.value)} />`,
        'En React, <select> y <textarea> reciben su contenido con la prop value, igual que <input>. Las casillas y los botones de opción usan checked.',
      ),
      code(
        'Un solo estado y un solo manejador para todo el formulario',
        `const [formulario, setFormulario] = useState({
  nombre: '',
  correo: '',
  acepta: false,
})

function alCambiar(evento) {
  const { name, type, value, checked } = evento.target

  setFormulario((actual) => ({
    ...actual,
    [name]: type === 'checkbox' ? checked : value,
  }))
}

<input name="nombre" value={formulario.nombre} onChange={alCambiar} />
<input name="correo" type="email" value={formulario.correo} onChange={alCambiar} />
<input name="acepta" type="checkbox" checked={formulario.acepta} onChange={alCambiar} />`,
        'El atributo name de cada campo coincide con la clave del estado, así un único manejador sirve para todos.',
      ),
      code(
        'Validar y mostrar los errores',
        `function validar({ nombre, correo, clave }) {
  const errores = {}
  if (nombre.trim().length < 3) errores.nombre = 'Mínimo 3 caracteres'
  if (!/^\\S+@\\S+\\.\\S+$/.test(correo)) errores.correo = 'El correo no es válido'
  if (clave.length < 8) errores.clave = 'Mínimo 8 caracteres'
  return errores
}

export default function Registro() {
  const [valores, setValores] = useState({ nombre: '', correo: '', clave: '' })
  const [tocados, setTocados] = useState({})

  const errores = validar(valores)                      // se calcula, no es estado
  const esValido = Object.keys(errores).length === 0

  function alEnviar(evento) {
    evento.preventDefault()
    setTocados({ nombre: true, correo: true, clave: true })
    if (esValido) enviar(valores)
  }

  return (
    <form onSubmit={alEnviar} noValidate>
      <input
        name="nombre"
        value={valores.nombre}
        onChange={(e) => setValores({ ...valores, nombre: e.target.value })}
        onBlur={() => setTocados({ ...tocados, nombre: true })}
        aria-invalid={Boolean(tocados.nombre && errores.nombre)}
      />
      {tocados.nombre && errores.nombre && <p className="error">{errores.nombre}</p>}
      {/* ...resto de campos */}
      <button type="submit">Crear cuenta</button>
    </form>
  )
}`,
        'Los errores se derivan de los valores en cada renderizado. Solo se muestran en los campos que el usuario ya visitó (onBlur) o tras intentar enviar. Para formularios grandes es habitual usar React Hook Form con un validador de esquemas como Zod.',
      ),
      code(
        'Estilos: clases, estilos en línea y módulos CSS',
        `import './Boton.css'                     // CSS global
import estilos from './Tarjeta.module.css' // módulo CSS: clases con nombre único

function Tarjeta({ destacada, color, children }) {
  const clases = ['tarjeta', destacada && 'tarjeta-destacada'].filter(Boolean).join(' ')

  return (
    <article className={clases}>
      <div className={estilos.contenido} style={{ borderColor: color, padding: 16 }}>
        {children}
      </div>
    </article>
  )
}`,
        'React no impone una forma de dar estilo. Los módulos CSS evitan choques de nombres porque cada clase se renombra al compilar. En style, un número sin unidad se interpreta como píxeles. Para combinar clases condicionales existe la librería clsx.',
      ),
      links('Referencia de componentes del DOM', [
        ['Componentes comunes', 'reference/react-dom/components/common'],
        ['<input>', 'reference/react-dom/components/input'],
        ['<select>', 'reference/react-dom/components/select'],
        ['<textarea>', 'reference/react-dom/components/textarea'],
        ['<form>', 'reference/react-dom/components/form'],
      ]),
    ],
  },
  {
    title: 'React con TypeScript',
    topics: [
      code(
        'Crear un proyecto con TypeScript',
        `$ npm create vite@latest mi-app -- --template react-ts

# En un proyecto existente
$ npm install -D typescript @types/react @types/react-dom`,
        'Los archivos con JSX deben tener la extensión .tsx. En tsconfig.json la opción jsx debe estar definida (react-jsx en la mayoría de proyectos) y lib debe incluir dom.',
      ),
      code(
        'Tipar las props',
        `interface BotonProps {
  titulo: string
  deshabilitado?: boolean                 // opcional
  variante?: 'primario' | 'secundario'    // unión de valores permitidos
  alHacerClic: () => void
  children?: React.ReactNode              // cualquier cosa que React pueda renderizar
}

function Boton({ titulo, deshabilitado = false, variante = 'primario', alHacerClic, children }: BotonProps) {
  return (
    <button className={variante} disabled={deshabilitado} onClick={alHacerClic}>
      {titulo}
      {children}
    </button>
  )
}`,
        'Si olvidas una prop obligatoria o pasas un tipo incorrecto, el editor lo marca antes de ejecutar nada. Para el objeto style usa React.CSSProperties.',
      ),
      code(
        'Tipar useState y useReducer',
        `import { useReducer, useState } from 'react'

// Se infiere del valor inicial: boolean
const [activo, setActivo] = useState(false)

// Hay que indicarlo cuando el valor inicial no lo dice todo
type Estado = 'inactivo' | 'cargando' | 'exito' | 'error'
const [estado, setEstado] = useState<Estado>('inactivo')

const [usuario, setUsuario] = useState<Usuario | null>(null)

// Unión discriminada: cada estado lleva solo sus datos
type Peticion =
  | { estado: 'cargando' }
  | { estado: 'exito'; datos: Producto[] }
  | { estado: 'error'; error: Error }

// Reducer
interface Contador { cuenta: number }
type Accion = { type: 'reiniciar' } | { type: 'fijar'; valor: number }

function reducer(estado: Contador, accion: Accion): Contador {
  switch (accion.type) {
    case 'reiniciar': return { cuenta: 0 }
    case 'fijar': return { cuenta: accion.valor }
  }
}

const [contador, dispatch] = useReducer(reducer, { cuenta: 0 })`,
        'Con una unión discriminada, TypeScript sabe que datos solo existe cuando estado es exito y no te deja leerlo en otro caso.',
      ),
      code(
        'Tipar contexto, refs y memoización',
        `import { createContext, useCallback, useContext, useMemo, useRef } from 'react'

// Contexto sin valor por defecto razonable
const UsuarioContext = createContext<Usuario | null>(null)

function useUsuario(): Usuario {
  const usuario = useContext(UsuarioContext)
  if (!usuario) throw new Error('useUsuario debe usarse dentro de UsuarioProvider')
  return usuario
}

// Ref a un elemento del DOM
const inputRef = useRef<HTMLInputElement>(null)
inputRef.current?.focus()

// Ref a un valor mutable
const intervaloRef = useRef<number | null>(null)

// useMemo y useCallback infieren el tipo de lo que devuelve la función
const visibles = useMemo(() => filtrar(tareas, filtro), [tareas, filtro])
const alCambiar = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
  (evento) => setValor(evento.currentTarget.value),
  [],
)`,
        'El Hook personalizado que lanza un error cuando falta el proveedor quita el null del tipo, así los componentes no tienen que comprobarlo cada vez.',
      ),
      code(
        'Tipar eventos',
        `function Formulario() {
  const [valor, setValor] = useState('')

  function alCambiar(evento: React.ChangeEvent<HTMLInputElement>) {
    setValor(evento.currentTarget.value)
  }

  function alEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()
  }

  function alPulsarTecla(evento: React.KeyboardEvent<HTMLInputElement>) {
    if (evento.key === 'Enter') console.log('Enter')
  }

  return (
    <form onSubmit={alEnviar}>
      {/* En línea no hace falta anotar: el tipo se infiere */}
      <input value={valor} onChange={alCambiar} onKeyDown={alPulsarTecla}
             onFocus={(evento) => evento.currentTarget.select()} />
    </form>
  )
}`,
        'Pasa el ratón por encima del manejador en el editor para ver qué tipo espera. El tipo base de todos los eventos es React.SyntheticEvent.',
      ),
      code(
        'Extender las props de un elemento HTML',
        `import type { ComponentProps } from 'react'

// Acepta todas las props de <button> y añade las propias
interface BotonProps extends ComponentProps<'button'> {
  variante?: 'primario' | 'peligro'
}

function Boton({ variante = 'primario', className = '', ...resto }: BotonProps) {
  return <button className={'boton ' + variante + ' ' + className} {...resto} />
}

<Boton variante="peligro" type="submit" disabled onClick={() => eliminar()}>
  Eliminar
</Boton>

// Componente genérico
interface ListaProps<T> {
  elementos: T[]
  renderizar: (elemento: T) => React.ReactNode
  clave: (elemento: T) => string | number
}

function Lista<T>({ elementos, renderizar, clave }: ListaProps<T>) {
  return <ul>{elementos.map((e) => <li key={clave(e)}>{renderizar(e)}</li>)}</ul>
}`,
        'ComponentProps evita declarar a mano onClick, disabled, type y decenas de atributos más. Un componente genérico conserva el tipo de sus elementos.',
      ),
      links('Páginas de TypeScript', [
        ['Usar TypeScript', 'learn/typescript'],
      ]),
    ],
  },
]
