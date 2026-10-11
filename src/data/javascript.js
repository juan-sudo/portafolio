// Ruta original de JavaScript moderno, basada en documentación de MDN:
// https://developer.mozilla.org/es/docs/Web/JavaScript

const text = (title, javascript, note) => ({ title, javascript, ...(note && { note }) })
const code = (title, javascript, note) => ({ title, code: true, javascript, ...(note && { note }) })
const links = (title, entries) => ({
  title,
  javascript: entries.map(([label, url]) => `${label}: ${url}`).join('\n'),
})

const javascriptLevels = [
  {
    title: 'Preparar el entorno',
    topics: [
      text(
        '¿Qué es JavaScript?',
        `JavaScript es un lenguaje dinámico que se ejecuta en navegadores y otros entornos como Node.js. En el navegador permite responder a interacciones, actualizar la página y comunicarse con servicios. Aunque comparte nombre con Java, son lenguajes distintos.`,
      ),
      code(
        'Comprobar Node.js y npm',
        `$ node --version
v22.0.0

$ npm --version
10.7.0`,
        'Node.js incluye npm. Las versiones mostradas son ejemplos; instala una versión LTS compatible con los proyectos que quieras ejecutar.',
      ),
      code(
        'Probar JavaScript en la consola',
        `> 2 + 3
5
> const nombre = 'Ana'
undefined
> console.log('Hola, ' + nombre)
Hola, Ana`,
        'Puedes ejecutar código en la consola de las herramientas de desarrollo del navegador o en Node.js escribiendo node en una terminal.',
      ),
      code(
        'Ejecutar un archivo con Node.js',
        `// hola.js
console.log('Hola, mundo')

$ node hola.js
Hola, mundo`,
        'Guarda el archivo en UTF-8. Node.js ejecuta JavaScript fuera del navegador; el acceso al DOM, como document, solo existe en entornos que proporcionan una página web.',
      ),
      text(
        'Usar JavaScript en una página HTML',
        `Un elemento <script> conecta un archivo JavaScript con HTML. Para código de aplicación, usa un archivo externo y el atributo defer o un script type="module" para evitar depender del orden accidental de carga.`,
      ),
      code(
        'Separar HTML y JavaScript',
        `<!-- index.html -->
<button id="saludar">Saludar</button>
<script type="module" src="./main.js"></script>

// main.js
document.querySelector('#saludar').addEventListener('click', () => {
  console.log('¡Hola!')
})`,
        'Los módulos se ejecutan en modo estricto y permiten importar y exportar valores. Sirve la página mediante un servidor local cuando el navegador restringe módulos abiertos como archivos.',
      ),
    ],
  },
  {
    title: 'Sintaxis, valores y operadores',
    topics: [
      code(
        'Declarar valores con const y let',
        `const nombre = 'Lucía'
let visitas = 0
visitas += 1

console.log(nombre, visitas)`,
        'Usa const por defecto y let cuando una variable deba reasignarse. const impide reasignar el vínculo, pero no vuelve inmutable un objeto o arreglo.',
      ),
      text(
        'Tipos primitivos y valores',
        `Los primitivos incluyen string, number, bigint, boolean, undefined, symbol y null. Los objetos, arreglos y funciones son valores de referencia. typeof ayuda a inspeccionar muchos tipos, aunque typeof null devuelve "object" por una particularidad histórica.`,
      ),
      code(
        'Plantillas de texto',
        'const usuario = { nombre: \'Ana\', puntos: 12 }\nconst mensaje = `Hola, ${usuario.nombre}. Tienes ${usuario.puntos} puntos.`\nconsole.log(mensaje)',
        'Las plantillas con acentos graves interpolan expresiones con ${...} y permiten escribir cadenas en varias líneas.',
      ),
      code(
        'Conversión y comparación estricta',
        `const entrada = '42'
const cantidad = Number(entrada)
const habilitado = Boolean(cantidad)

console.log(cantidad === 42) // true`,
        'Convierte tipos explícitamente cuando el formato importa. === y !== evitan coerciones implícitas que pueden hacer menos predecibles las comparaciones.',
      ),
      code(
        'Operadores lógicos y valores por defecto',
        `const nombre = ''
const etiqueta = nombre || 'Invitado'
const visible = nombre ?? 'Sin nombre'
const longitud = nombre?.length ?? 0`,
        '|| usa el valor alternativo ante cualquier valor falsy; ?? solo lo hace con null o undefined. ?. evita acceder a una propiedad cuando la referencia es nula.',
      ),
      code(
        'Desestructurar y usar el operador rest',
        `const persona = { nombre: 'Noa', ciudad: 'Lima' }
const { nombre, ...datosRestantes } = persona
const [primero, ...resto] = [10, 20, 30]

console.log(nombre, datosRestantes, primero, resto)`,
        'La desestructuración extrae propiedades o posiciones. En objetos y arreglos, ...rest reúne los elementos restantes; su significado depende del contexto.',
      ),
    ],
  },
  {
    title: 'Condiciones, bucles y funciones',
    topics: [
      code(
        'Tomar decisiones con if y else',
        `const edad = 20

if (edad >= 18) {
  console.log('Mayor de edad')
} else {
  console.log('Menor de edad')
}`,
        'Las condiciones convierten su expresión a booleano. Mantén las ramas claras y evita anidar decisiones más de lo necesario.',
      ),
      code(
        'Seleccionar un caso con switch',
        `const estado = 'enviado'

switch (estado) {
  case 'nuevo':
    console.log('Pendiente')
    break
  case 'enviado':
    console.log('En camino')
    break
  default:
    console.log('Estado desconocido')
}`,
        'break evita continuar con el siguiente caso. Para correspondencias pequeñas también puede convenir un objeto de funciones o una expresión condicional.',
      ),
      code(
        'Recorrer valores con for...of',
        `const lenguajes = ['JavaScript', 'Python', 'Java']

for (const lenguaje of lenguajes) {
  console.log(lenguaje)
}`,
        'for...of recorre valores de iterables como arreglos y cadenas. for...in enumera claves enumerables y normalmente no es la opción para recorrer un arreglo.',
      ),
      code(
        'Declarar funciones y devolver resultados',
        `function sumar(a, b) {
  return a + b
}

const resultado = sumar(4, 6)`,
        'Una función puede recibir parámetros, realizar trabajo y devolver un valor con return. Si no ejecuta return, su resultado es undefined.',
      ),
      code(
        'Funciones flecha y callbacks',
        `const duplicar = (numero) => numero * 2
const numeros = [1, 2, 3]
const dobles = numeros.map(duplicar)`,
        'Las funciones flecha ofrecen una sintaxis concisa y no crean su propio this. Una función callback se pasa para ejecutarse dentro de otra operación.',
      ),
      text(
        'Alcance, closures y manejo de errores',
        `El alcance léxico determina dónde se puede usar un nombre. Un closure conserva acceso a variables del contexto donde se creó la función. Usa try/catch para manejar errores recuperables y lanza errores con mensajes útiles cuando una operación no puede continuar.`,
      ),
    ],
  },
  {
    title: 'Arreglos, objetos y datos',
    topics: [
      code(
        'Transformar arreglos con map y filter',
        `const productos = [
  { nombre: 'Teclado', precio: 30 },
  { nombre: 'Mouse', precio: 15 },
]

const nombres = productos.map((producto) => producto.nombre)
const económicos = productos.filter((producto) => producto.precio < 20)`,
        'map produce un arreglo transformado; filter conserva los elementos que cumplen una condición. Ambos devuelven arreglos nuevos.',
      ),
      code(
        'Reducir valores y buscar elementos',
        `const precios = [12, 8, 20]
const total = precios.reduce((acumulado, precio) => acumulado + precio, 0)
const encontrado = precios.find((precio) => precio > 10)`,
        'reduce acumula a partir de un valor inicial explícito. find devuelve el primer elemento coincidente o undefined; some y every responden preguntas de existencia.',
      ),
      code(
        'Crear y leer objetos',
        `const usuario = {
  nombre: 'Mara',
  activo: true,
  presentarse() {
    return ` + '`Hola, soy ${this.nombre}`' + `,
  },
}

console.log(usuario.presentarse())`,
        'Los objetos agrupan propiedades y métodos. Usa notación de punto para nombres conocidos y corchetes para claves dinámicas o que contienen caracteres especiales.',
      ),
      code(
        'Copiar objetos y combinar propiedades',
        `const perfil = { nombre: 'Mara', activo: true }
const actualizado = { ...perfil, activo: false }

console.log(perfil.activo) // true`,
        'La sintaxis spread crea una copia superficial: propiedades anidadas siguen compartiendo sus referencias. Object.assign también combina propiedades, pero modifica su primer argumento.',
      ),
      text(
        'Mutación, referencias y datos inmutables',
        `Dos variables pueden referirse al mismo objeto; modificarlo a través de una afecta a la otra. Para actualizaciones predecibles, crea un nuevo objeto o arreglo con spread, map o filter. La copia superficial no duplica automáticamente objetos anidados.`,
      ),
      code(
        'Serializar datos con JSON',
        `const datos = { nombre: 'Mara', roles: ['lectura', 'edición'] }
const textoJson = JSON.stringify(datos)
const copia = JSON.parse(textoJson)

console.log(copia.roles[0])`,
        'JSON es un formato de intercambio, no una copia universal: funciones, undefined y varios tipos especiales no se conservan como valores originales. Valida datos externos antes de confiar en ellos.',
      ),
    ],
  },
  {
    title: 'JavaScript en el navegador',
    topics: [
      code(
        'Seleccionar elementos del DOM',
        `const titulo = document.querySelector('h1')
const botones = document.querySelectorAll('button')

if (titulo) {
  titulo.textContent = 'Página interactiva'
}`,
        'querySelector devuelve el primer elemento coincidente o null; querySelectorAll devuelve una colección estática de coincidencias.',
      ),
      code(
        'Escuchar eventos de usuario',
        `const formulario = document.querySelector('form')

formulario?.addEventListener('submit', (evento) => {
  evento.preventDefault()
  console.log('Formulario enviado')
})`,
        'Un listener recibe el evento cuando ocurre la acción. preventDefault evita el comportamiento predeterminado, como navegar al enviar un formulario.',
      ),
      code(
        'Actualizar clases y atributos',
        `const tarjeta = document.querySelector('.tarjeta')

tarjeta?.classList.toggle('seleccionada')
tarjeta?.setAttribute('aria-pressed', 'true')`,
        'Usa classList para gestionar clases y atributos semánticos para estados relevantes. No construyas selectores con entradas del usuario sin validarlas.',
      ),
      code(
        'Crear contenido de forma segura',
        `const elemento = document.createElement('li')
elemento.textContent = 'Nuevo elemento'
document.querySelector('ul')?.append(elemento)`,
        'textContent trata el contenido como texto. Evita asignar entrada no confiable a innerHTML, ya que puede interpretar marcado y abrir una vulnerabilidad XSS.',
      ),
      text(
        'Propagación y delegación de eventos',
        `Los eventos pueden propagarse desde el elemento de origen hacia sus ancestros. La delegación registra un listener en un contenedor y usa event.target o closest() para identificar la acción; resulta práctica en listas que cambian dinámicamente.`,
      ),
      text(
        'Almacenamiento del navegador',
        `localStorage conserva cadenas entre sesiones y sessionStorage dura mientras está abierta la pestaña. Ambos son accesibles desde JavaScript del mismo origen y no son un lugar seguro para secretos. Maneja cuotas, datos inválidos y preferencias de privacidad.`,
      ),
    ],
  },
  {
    title: 'Promesas, asincronía y APIs',
    topics: [
      code(
        'Comprender el event loop',
        `console.log('inicio')
setTimeout(() => console.log('temporizador'), 0)
console.log('fin')

// inicio
// fin
// temporizador`,
        'El código síncrono se ejecuta primero. Las tareas asíncronas se procesan después según el event loop; una demora de cero no significa ejecución inmediata.',
      ),
      code(
        'Encadenar promesas',
        `fetch('/api/productos')
  .then((respuesta) => {
    if (!respuesta.ok) throw new Error('No se pudo cargar')
    return respuesta.json()
  })
  .then((productos) => console.log(productos))
  .catch((error) => console.error(error))`,
        'Una promesa representa un resultado que estará disponible más adelante. fetch rechaza errores de red, pero respuestas HTTP como 404 no rechazan automáticamente: revisa response.ok.',
      ),
      code(
        'Usar async y await',
        `async function cargarProductos() {
  const respuesta = await fetch('/api/productos')
  if (!respuesta.ok) throw new Error('Respuesta no válida')
  return respuesta.json()
}

cargarProductos().catch(console.error)`,
        'await pausa la función async hasta que se resuelva la promesa. La función async siempre devuelve una promesa y los errores se pueden manejar con try/catch.',
      ),
      code(
        'Gestionar errores en operaciones asíncronas',
        `async function cargarPerfil() {
  try {
    const respuesta = await fetch('/api/perfil')
    if (!respuesta.ok) throw new Error('Error HTTP')
    return await respuesta.json()
  } catch (error) {
    console.error('No se pudo cargar el perfil:', error)
    throw error
  }
}`,
        'No ocultes errores con valores por defecto que aparenten éxito. Decide si recuperarte, informar al usuario o volver a propagar el error.',
      ),
      code(
        'Ejecutar tareas independientes en paralelo',
        `const [perfil, notificaciones] = await Promise.all([
  fetch('/api/perfil').then((respuesta) => respuesta.json()),
  fetch('/api/notificaciones').then((respuesta) => respuesta.json()),
])`,
        'Promise.all espera a todas y rechaza si una falla. Promise.allSettled permite inspeccionar por separado resultados cumplidos y rechazados.',
      ),
      text(
        'Cancelar solicitudes y enviar datos',
        `AbortController permite cancelar un fetch mediante su signal, por ejemplo al cambiar de pantalla. Para enviar datos, define método, cabeceras y body según la API; valida las entradas y no incluyas secretos en código cliente.`,
      ),
    ],
  },
  {
    title: 'Objetos avanzados y programación orientada a objetos',
    topics: [
      text(
        'Prototipos y cadena de herencia',
        `Los objetos de JavaScript pueden delegar búsquedas de propiedades a un prototipo. Esta cadena explica la herencia del lenguaje; class ofrece una sintaxis más familiar sobre el mismo modelo basado en prototipos.`,
      ),
      code(
        'Crear clases y métodos',
        `class Cuenta {
  constructor(titular, saldo = 0) {
    this.titular = titular
    this.saldo = saldo
  }

  depositar(cantidad) {
    if (cantidad <= 0) throw new RangeError('Cantidad inválida')
    this.saldo += cantidad
  }
}

const cuenta = new Cuenta('Noa')`,
        'Una clase define el comportamiento de sus instancias. Valida invariantes en los límites de la clase para evitar estados inválidos.',
      ),
      code(
        'Herencia y super',
        `class CuentaAhorro extends Cuenta {
  constructor(titular, saldo, tasa) {
    super(titular, saldo)
    this.tasa = tasa
  }
}`,
        'extends establece herencia de prototipo. Una subclase debe llamar a super() antes de usar this en su constructor.',
      ),
      text(
        'Composición frente a herencia',
        `La composición combina objetos pequeños que colaboran; la herencia modela una relación de especialización. Prefiere composición cuando evita jerarquías rígidas o cuando una capacidad puede compartirse sin afirmar que un tipo es subtipo de otro.`,
      ),
      code(
        'Propiedades privadas y getters',
        `class Contador {
  #valor = 0

  incrementar() {
    this.#valor += 1
  }

  get valor() {
    return this.#valor
  }
}`,
        'Los campos con # son privados del lenguaje y no se pueden leer desde fuera de la clase. Un getter expone una lectura controlada como si fuera una propiedad.',
      ),
      text(
        'this, call, apply y bind',
        `El valor de this en una función depende de cómo se invoca. call y apply llaman con un this elegido; bind crea una función enlazada. Las funciones flecha capturan this léxicamente y no tienen un this propio.`,
      ),
    ],
  },
  {
    title: 'Módulos, iteradores y herramientas',
    topics: [
      code(
        'Exportar e importar módulos ES',
        `// utilidades.js
export const duplicar = (numero) => numero * 2
export default function saludar(nombre) {
  return ` + '`Hola, ${nombre}`' + `
}

// main.js
import saludar, { duplicar } from './utilidades.js'`,
        'Los módulos ES permiten separar responsabilidades y declarar dependencias explícitas. Un archivo puede ofrecer exports nombrados y un export default.',
      ),
      text(
        'Importaciones dinámicas',
        `import() carga un módulo de forma asíncrona y devuelve una promesa. Es útil para funcionalidades opcionales o divisiones de código; captura errores de carga y evalúa si la carga diferida mejora la experiencia.`,
      ),
      code(
        'Usar Set y Map',
        `const etiquetas = new Set(['web', 'web', 'datos'])
const visitas = new Map([['inicio', 12]])

etiquetas.add('diseño')
visitas.set('contacto', 4)`,
        'Set conserva valores únicos; Map asocia claves de cualquier tipo con valores y evita algunos problemas de claves especiales de objetos simples.',
      ),
      text(
        'Iterables, iteradores y generadores',
        `Un iterable proporciona un iterador y puede usarse con for...of o spread. Una función generadora declarada con function* produce valores bajo demanda mediante yield; puede modelar secuencias o flujos de datos.`,
      ),
      text(
        'Expresiones regulares y fechas',
        `Las expresiones regulares ayudan a reconocer patrones, pero no sustituyen la validación completa de formatos complejos. Date representa instantes en milisegundos; para fechas locales o calendarios, define zona horaria y formato de manera explícita.`,
      ),
      text(
        'Depuración, lint y pruebas',
        `Usa breakpoints y la consola del navegador o Node.js para observar la ejecución. Un linter detecta patrones problemáticos y las pruebas automatizadas verifican comportamiento esperado, casos límite y errores sin depender de inspección manual.`,
      ),
    ],
  },
  {
    title: 'Calidad, seguridad y rendimiento',
    topics: [
      text(
        'Validar datos en los límites',
        `Los datos de formularios, URL, almacenamiento y APIs son entradas no confiables. Comprueba tipo, formato y rango en el punto de entrada; TypeScript puede complementar, pero no valida automáticamente datos recibidos en runtime.`,
      ),
      text(
        'Prevenir XSS y proteger el navegador',
        `Inserta texto con textContent y evita construir HTML con datos no confiables. No expongas tokens o secretos en JavaScript del cliente; aplica controles del lado servidor y políticas de seguridad de contenido según la aplicación.`,
      ),
      text(
        'Accesibilidad en interacciones',
        `Usa controles nativos como button y form, conserva navegación por teclado y comunica cambios importantes con semántica accesible. Una interacción que funciona solo con clic o solo con color excluye a algunos usuarios.`,
      ),
      text(
        'Rendimiento y complejidad',
        `Mide antes de optimizar. Evita trabajo repetido innecesario, divide funcionalidades que no se usan al inicio y selecciona estructuras de datos acordes a la operación. Los algoritmos y el tamaño del DOM pueden importar más que microoptimizaciones.`,
      ),
      text(
        'Diseñar APIs y manejar estados',
        `Expón funciones con entradas y resultados previsibles. Distingue carga, éxito, vacío y error; evita estados compartidos mutables cuando hacen difícil entender quién puede cambiar los datos.`,
      ),
      links('Documentación para profundizar', [
        ['Guía JavaScript de MDN', 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide'],
        ['Objetos y conceptos avanzados', 'https://developer.mozilla.org/es/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects'],
        ['Referencia del lenguaje', 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference'],
      ]),
    ],
  },
  {
    title: 'Proyecto integrador: gestor de tareas',
    topics: [
      text(
        'Planificar la interfaz y los datos',
        `Define tareas con identificador, título, estado y fecha. Diseña una interfaz accesible para añadir, completar, filtrar y eliminar tareas; identifica estados de carga, vacío y error antes de programar.`,
      ),
      code(
        'Modelar y mostrar tareas',
        `const tareas = [
  { id: 1, titulo: 'Repasar promesas', completada: false },
]

const pendientes = tareas.filter((tarea) => !tarea.completada)
console.log(pendientes.map((tarea) => tarea.titulo))`,
        'Mantén una fuente de datos clara y deriva las vistas con map y filter. Usa identificadores estables para relacionar cada tarea con sus controles.',
      ),
      text(
        'Implementar acciones y delegación',
        `Conecta el formulario y los botones con listeners. Valida títulos vacíos, usa textContent al representar texto ingresado y actualiza el estado sin que cada control modifique elementos ajenos a su responsabilidad.`,
      ),
      text(
        'Persistir y restaurar información',
        `Guarda los datos en localStorage si el alcance es una demo local. Maneja JSON inválido y cambios de esquema; comunica que los datos quedan en ese navegador y no se sincronizan entre dispositivos.`,
      ),
      text(
        'Añadir filtros y estados accesibles',
        `Permite cambiar entre todas, pendientes y completadas. Haz que los controles funcionen con teclado, etiqueta formularios y anuncia de forma apropiada los resultados o errores.`,
      ),
      text(
        'Probar, revisar y publicar',
        `Verifica añadir, completar, filtrar, persistir y eliminar, además de entradas inválidas y almacenamiento dañado. Revisa consola, accesibilidad y tamaños móviles; separa módulos y documenta cómo ejecutar el proyecto.`,
      ),
    ],
  },
]

export const javascriptModule = {
  id: 'javascript',
  label: 'JavaScript',
  title: 'Domina JavaScript desde cero hasta avanzado.',
  description: 'Aprende JavaScript moderno con variables, funciones, arreglos, objetos, DOM, asincronía, clases, prototipos, módulos, seguridad y rendimiento. Incluye un proyecto integrador y examen final generado por IA.',
  subtitle: 'Lenguaje de programación · navegador y Node.js',
  languages: [{ key: 'javascript', label: 'JavaScript' }],
  levels: javascriptLevels.map((level, index) => ({ ...level, level: index })),
  outputLabel: 'Resultado de ejemplo',
  comparison: {
    title: 'JavaScript en el navegador y Node.js',
    languages: ['Navegador', 'Node.js'],
    rows: [
      { label: 'Entorno', values: ['Se ejecuta dentro de una página web', 'Se ejecuta fuera del navegador'] },
      { label: 'APIs disponibles', values: ['DOM, eventos y almacenamiento web', 'Módulos, procesos y APIs del sistema'] },
      { label: 'Uso común', values: ['Interfaz e interacción web', 'Herramientas, automatización y servicios'] },
      { label: 'Código compartido', values: ['Lógica JavaScript independiente del entorno', 'Lógica JavaScript independiente del entorno'] },
    ],
  },
}
