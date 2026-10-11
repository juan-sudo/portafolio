// Ruta original de TypeScript basada en la documentación oficial:
// https://www.typescriptlang.org/docs/

const text = (title, typescript, note) => ({ title, typescript, ...(note && { note }) })
const code = (title, typescript, note) => ({ title, code: true, typescript, ...(note && { note }) })
const links = (title, entries) => ({
  title,
  typescript: entries.map(([label, url]) => `${label}: ${url}`).join('\n'),
})

const typescriptLevels = [
  {
    title: 'Primeros pasos con TypeScript',
    topics: [
      text(
        '¿Qué es TypeScript?',
        `TypeScript amplía JavaScript con un sistema de tipos estático que analiza el código antes de ejecutarlo. El compilador comprueba usos y genera JavaScript; los tipos no se convierten en validaciones automáticas durante la ejecución. JavaScript válido también suele ser TypeScript válido.`,
      ),
      text(
        'Qué necesitas saber de JavaScript',
        `Conviene conocer variables, funciones, objetos, arreglos, módulos y promesas de JavaScript. TypeScript ayuda a expresar y comprobar contratos del código, pero su comportamiento en ejecución sigue siendo JavaScript.`,
      ),
      code(
        'Instalar TypeScript en un proyecto',
        `$ npm init -y
$ npm install --save-dev typescript
$ npx tsc --init`,
        'Instalarlo como dependencia del proyecto permite que el equipo use la misma versión. El comando crea tsconfig.json para configurar el compilador.',
      ),
      code(
        'Crear y compilar un archivo',
        `// src/hola.ts
const nombre: string = 'Ana'
console.log('Hola, ' + nombre)

$ npx tsc src/hola.ts`,
        'tsc comprueba y emite JavaScript. TypeScript no se ejecuta directamente en todos los entornos; usa el flujo de compilación de tu aplicación o herramienta.',
      ),
      code(
        'Ejecutar el JavaScript generado',
        `// hola.ts
const edad: number = 20
console.log(edad)

// Compilar
$ npx tsc hola.ts

// Ejecutar el archivo JavaScript emitido
$ node hola.js`,
        'La salida concreta depende de la configuración del compilador. Node.js ejecuta el JavaScript generado, no necesita los tipos TypeScript.',
      ),
      links('Documentación y tutorial oficial', [
        ['TypeScript: documentación', 'https://www.typescriptlang.org/docs/'],
        ['Para principiantes', 'https://www.typescriptlang.org/docs/handbook/intro.html'],
        ['TypeScript para programadores de JavaScript', 'https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html'],
      ]),
    ],
  },
  {
    title: 'Tipos básicos y anotaciones',
    topics: [
      code(
        'Anotar variables y dejar inferir tipos',
        `let visitas: number = 0
visitas += 1

const ciudad = 'Lima' // TypeScript infiere string`,
        'Las anotaciones documentan contratos, pero no hace falta escribirlas en todas partes: el compilador infiere muchos tipos desde los valores iniciales.',
      ),
      code(
        'Tipos primitivos y arreglos',
        `let nombre: string = 'Iris'
let activo: boolean = true
let puntajes: number[] = [8, 9, 10]
let etiquetas: Array<string> = ['web', 'api']`,
        'string, number y boolean describen valores primitivos. T[] y Array<T> son dos formas de escribir arreglos tipados.',
      ),
      code(
        'Funciones tipadas',
        `function sumar(a: number, b: number): number {
  return a + b
}

const duplicar = (valor: number): number => valor * 2`,
        'Anota parámetros cuando el contexto no pueda inferirlos. El tipo de retorno puede inferirse, aunque explicitar contratos públicos puede mejorar la claridad.',
      ),
      code(
        'Parámetros opcionales y valores predeterminados',
        `function saludar(nombre: string, tratamiento?: string): string {
  return tratamiento ? ` + '`Hola, ${tratamiento} ${nombre}`' + ` : ` + '`Hola, ${nombre}`' + `
}

function limitar(valor: number, máximo = 100) {
  return Math.min(valor, máximo)
}`,
        'Un parámetro opcional puede omitirse y su tipo incluye undefined. Un parámetro con valor por defecto también puede omitirse; TypeScript infiere su tipo.',
      ),
      code(
        'Tuplas y readonly',
        `const coordenada: [number, number] = [12, 8]
const nombres: readonly string[] = ['Ada', 'Lin']

// nombres.push('Grace') // error`,
        'Una tupla expresa posiciones y tipos específicos. readonly impide ciertas modificaciones a través de esa referencia, pero no congela profundamente el valor en ejecución.',
      ),
      text(
        'Evitar any y usar unknown',
        `any desactiva muchas comprobaciones y permite operaciones no verificadas. unknown acepta cualquier entrada, pero obliga a comprobar o estrechar su tipo antes de usarla. Para datos externos, unknown suele ser un punto de partida más seguro.`,
      ),
    ],
  },
  {
    title: 'Objetos, alias e interfaces',
    topics: [
      code(
        'Describir la forma de un objeto',
        `function mostrarUsuario(usuario: { nombre: string; edad: number }) {
  console.log(usuario.nombre, usuario.edad)
}

mostrarUsuario({ nombre: 'Sam', edad: 28 })`,
        'Los tipos estructurales describen las propiedades que un valor debe tener. No hace falta que el objeto herede de una clase concreta para cumplir esa forma.',
      ),
      code(
        'Crear alias con type',
        `type Usuario = {
  id: number
  nombre: string
  correo: string
}

const usuario: Usuario = { id: 1, nombre: 'Sam', correo: 'sam@example.com' }`,
        'type da un nombre a un tipo y permite reutilizarlo en parámetros, retornos, uniones y composiciones.',
      ),
      code(
        'Definir contratos con interface',
        `interface Producto {
  id: string
  nombre: string
  precio: number
}

function etiquetar(producto: Producto): string {
  return producto.nombre
}`,
        'Las interfaces suelen describir formas de objetos. También pueden ampliarse con extends; elige type o interface de forma consistente con las necesidades del modelo.',
      ),
      code(
        'Propiedades opcionales y readonly',
        `interface Perfil {
  readonly id: string
  nombre: string
  biografía?: string
}

function saludar(perfil: Perfil) {
  return ` + '`Hola, ${perfil.nombre}`' + `
}`,
        'El signo ? marca una propiedad opcional, cuyo valor puede estar ausente. readonly restringe su reasignación en comprobaciones estáticas.',
      ),
      code(
        'Componer tipos con intersecciones',
        `type ConId = { id: string }
type ConFecha = { creado: Date }
type Registro = ConId & ConFecha

const registro: Registro = { id: 'a1', creado: new Date() }`,
        'Una intersección A & B exige cumplir ambos tipos. Si las mismas propiedades tienen tipos incompatibles, el resultado puede ser imposible de satisfacer.',
      ),
      text(
        'Exceso de propiedades y asignación estructural',
        `TypeScript compara la compatibilidad estructural de los valores. Los literales de objeto reciben comprobaciones de propiedades adicionales en ciertos contextos para detectar errores tipográficos; no es un mecanismo de validación de datos en runtime.`,
      ),
    ],
  },
  {
    title: 'Uniones, narrowing y control de flujo',
    topics: [
      code(
        'Modelar alternativas con union types',
        `type Id = string | number

function mostrarId(id: Id) {
  console.log(id)
}`,
        'Una unión indica que un valor puede pertenecer a uno de varios tipos. Antes de usar una operación específica de una alternativa, comprueba cuál es.',
      ),
      code(
        'Estrechar tipos con typeof',
        `function formatear(valor: string | number) {
  if (typeof valor === 'string') {
    return valor.toUpperCase()
  }
  return valor.toFixed(2)
}`,
        'TypeScript sigue condiciones conocidas, como typeof, para estrechar el tipo dentro de cada rama.',
      ),
      code(
        'Proteger propiedades con in e instanceof',
        `type Perro = { ladrar: () => void }
type Gato = { maullar: () => void }

function hacerSonido(animal: Perro | Gato) {
  if ('ladrar' in animal) animal.ladrar()
  else animal.maullar()
}`,
        'in comprueba una propiedad y puede estrechar una unión. instanceof ayuda con instancias de clases en el mismo entorno de ejecución.',
      ),
      code(
        'Crear uniones discriminadas',
        `type Resultado =
  | { estado: 'ok'; valor: string }
  | { estado: 'error'; mensaje: string }

function mostrar(resultado: Resultado) {
  if (resultado.estado === 'ok') return resultado.valor
  return resultado.mensaje
}`,
        'Una propiedad literal compartida, como estado, permite distinguir variantes y acceder con seguridad a sus propiedades específicas.',
      ),
      code(
        'Usar never para casos exhaustivos',
        `function assertNever(valor: never): never {
  throw new Error('Caso no contemplado')
}

function procesar(resultado: Resultado) {
  switch (resultado.estado) {
    case 'ok': return resultado.valor
    case 'error': return resultado.mensaje
    default: return assertNever(resultado)
  }
}`,
        'Si se añade una nueva variante y no se maneja, el argumento deja de ser never y TypeScript puede señalar la rama incompleta.',
      ),
      text(
        'Comprobaciones de nulidad y type guards',
        `Con strictNullChecks activo, null y undefined deben manejarse explícitamente. Una función de type guard puede declarar un predicado como valor is Usuario después de realizar una comprobación real de sus propiedades.`,
      ),
    ],
  },
  {
    title: 'Genéricos y tipos reutilizables',
    topics: [
      code(
        'Escribir una función genérica',
        `function primero<T>(valores: T[]): T | undefined {
  return valores[0]
}

const nombre = primero(['Ana', 'Leo'])`,
        'El parámetro de tipo T conserva la relación entre la entrada y la salida en vez de perder información usando any.',
      ),
      code(
        'Usar restricciones genéricas',
        `function obtenerId<T extends { id: string }>(elemento: T): string {
  return elemento.id
}`,
        'extends limita los tipos aceptados a los que cumplen una forma mínima. Así el cuerpo puede usar id con seguridad.',
      ),
      code(
        'Genéricos en interfaces y clases',
        `interface Respuesta<T> {
  datos: T
  correcta: boolean
}

const respuesta: Respuesta<string[]> = {
  datos: ['uno', 'dos'],
  correcta: true,
}`,
        'Un tipo genérico se puede reutilizar con diferentes tipos de datos sin duplicar su estructura.',
      ),
      code(
        'Usar keyof y tipos de acceso',
        `function leer<T, K extends keyof T>(objeto: T, clave: K): T[K] {
  return objeto[clave]
}

const usuario = { nombre: 'Nora', edad: 30 }
const edad = leer(usuario, 'edad')`,
        'keyof produce la unión de claves de un tipo. T[K] obtiene el tipo asociado a una clave específica.',
      ),
      code(
        'Transformar tipos con utility types',
        `interface Usuario {
  id: string
  nombre: string
  correo: string
}

type NuevoUsuario = Omit<Usuario, 'id'>
type UsuarioParcial = Partial<Usuario>
type UsuarioResumen = Pick<Usuario, 'id' | 'nombre'>`,
        'Partial, Pick, Omit, Readonly y Record son utilidades integradas que transforman tipos existentes.',
      ),
      text(
        'Diseñar tipos condicionales y mapeados',
        `Los tipos mapeados recorren claves para construir otra forma; los tipos condicionales seleccionan un resultado según una relación entre tipos. Son herramientas potentes para librerías, pero conviene preferir tipos sencillos y legibles cuando bastan.`,
      ),
    ],
  },
  {
    title: 'Funciones, clases y asincronía',
    topics: [
      code(
        'Tipar callbacks y funciones',
        `type Comparador<T> = (a: T, b: T) => number

function ordenar<T>(valores: T[], comparar: Comparador<T>): T[] {
  return [...valores].sort(comparar)
}`,
        'Los tipos de función describen parámetros y retorno. La inferencia contextual suele deducir tipos de parámetros en callbacks.',
      ),
      code(
        'Sobrecargas de función',
        `function combinar(a: string, b: string): string
function combinar(a: number, b: number): number
function combinar(a: string | number, b: string | number) {
  if (typeof a !== typeof b) throw new Error('Tipos incompatibles')
  return typeof a === 'string' ? a + b : a + b
}`,
        'Las firmas de sobrecarga exponen formas de llamada; la implementación debe admitir todas ellas. No uses sobrecargas si una unión expresa el contrato con más claridad.',
      ),
      code(
        'Implementar clases con implements',
        `interface Guardable {
  guardar(): Promise<void>
}

class Archivo implements Guardable {
  async guardar() {
    console.log('Guardado')
  }
}`,
        'implements comprueba que una clase cumpla un contrato estático; no añade automáticamente métodos ni validaciones al objeto.',
      ),
      code(
        'Declarar propiedades y modificadores',
        `class Cuenta {
  constructor(
    public readonly titular: string,
    private saldo: number = 0,
  ) {}

  consultarSaldo() {
    return this.saldo
  }
}`,
        'Los parámetros de constructor con modificadores declaran e inicializan propiedades. private de TypeScript es una restricción de tipos; los campos # son privados en runtime.',
      ),
      code(
        'Tipar promesas y async',
        `async function cargarNombres(): Promise<string[]> {
  const respuesta = await fetch('/api/nombres')
  if (!respuesta.ok) throw new Error('Error de red')
  return respuesta.json() as Promise<string[]>
}`,
        'El tipo de retorno async normalmente se expresa como Promise<T>. Una aserción de tipo no valida la respuesta; valida o analiza datos externos en runtime.',
      ),
      text(
        'Componer tipos de datos asincrónicos',
        `Representa estados de una solicitud con uniones discriminadas —por ejemplo, loading, success y error— en lugar de combinaciones ambiguas de propiedades opcionales. Así cada estado expone solo los datos que realmente tiene.`,
      ),
    ],
  },
  {
    title: 'Módulos y configuración del compilador',
    topics: [
      code(
        'Exportar e importar tipos',
        `// usuario.ts
export interface Usuario {
  id: string
  nombre: string
}

// main.ts
import type { Usuario } from './usuario'
const usuario: Usuario = { id: 'u1', nombre: 'Eva' }`,
        'import type expresa una dependencia usada solo durante comprobación de tipos. Los módulos TypeScript siguen las reglas de módulos del entorno JavaScript elegido.',
      ),
      code(
        'Configurar strict en tsconfig',
        `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noEmit": true
  },
  "include": ["src"]
}`,
        'La configuración real depende del bundler y runtime. strict activa comprobaciones estrictas; noEmit permite que otra herramienta compile o empaquete el código.',
      ),
      text(
        'Target, module y moduleResolution',
        `target define características de JavaScript a emitir cuando hay emisión. module y moduleResolution deben corresponder con el entorno: Node.js, bundler o navegador. Sigue la guía de la plataforma en vez de copiar una configuración universal.`,
      ),
      code(
        'Separar comprobación y ejecución',
        `$ npx tsc --noEmit

// El bundler o runtime del proyecto se encarga
// de ejecutar o transformar los archivos.`,
        'tsc es el comprobador de tipos oficial. Algunos bundlers transpilan TypeScript sin hacer comprobación completa; ejecuta tsc --noEmit en CI si necesitas ese control.',
      ),
      text(
        'Declaraciones y tipos de dependencias',
        `Los archivos .d.ts describen tipos disponibles sin implementar el código. Muchas bibliotecas incluyen declaraciones; otras usan paquetes comunitarios @types. Elige versiones compatibles y comprueba qué declaración importa realmente el proyecto.`,
      ),
      links('Handbook y guías oficiales', [
        ['The TypeScript Handbook', 'https://www.typescriptlang.org/docs/handbook/intro.html'],
        ['TSConfig Reference', 'https://www.typescriptlang.org/tsconfig/'],
        ['Módulos', 'https://www.typescriptlang.org/docs/handbook/modules/introduction.html'],
      ]),
    ],
  },
  {
    title: 'TypeScript en aplicaciones reales',
    topics: [
      text(
        'Validar datos que llegan en runtime',
        `Los tipos desaparecen al compilar y no verifican JSON, formularios, almacenamiento ni respuestas de red. Recibe esos valores como unknown y valida su forma en runtime antes de tratarlos como un tipo de dominio.`,
      ),
      code(
        'Crear una guarda de tipo',
        `interface Usuario {
  id: string
  nombre: string
}

function esUsuario(valor: unknown): valor is Usuario {
  return typeof valor === 'object'
    && valor !== null
    && 'id' in valor
    && typeof valor.id === 'string'
    && 'nombre' in valor
    && typeof valor.nombre === 'string'
}`,
        'El predicado solo es correcto si su implementación verifica todas las condiciones del contrato que promete.',
      ),
      text(
        'Integrar TypeScript con JavaScript',
        `Se puede adoptar gradualmente: configura allowJs y checkJs según la estrategia del proyecto, añade declaraciones para módulos sin tipos y migra archivos por partes. Mantén claro qué código ya se comprueba y cuál aún no.`,
      ),
      text(
        'Usar TypeScript en React',
        `Tipa props con interfaces o alias, deja que JSX infiera muchos retornos y modela estados con uniones discriminadas. Usa los tipos de React del proyecto y evita declarar manualmente tipos genéricos que ya se infieren.`,
      ),
      text(
        'Usar TypeScript en Node.js',
        `Elige una estrategia coherente entre compilar a JavaScript y ejecutar mediante una herramienta compatible. Alinea module, moduleResolution, package.json y la configuración del runtime; comprueba también tipos de APIs de Node instalados.`,
      ),
      text(
        'Errores comunes al migrar',
        `No resuelvas cada error con any o as. Investiga el contrato, estrecha unknown, corrige nullabilidad y declara tipos de terceros cuando falten. Las aserciones de tipo cambian lo que cree el compilador, no transforman ni validan el valor.`,
      ),
    ],
  },
  {
    title: 'Proyecto integrador: API tipada de tareas',
    topics: [
      text(
        'Definir el dominio y los estados',
        `Modela una tarea con id, título, fecha límite opcional y estado. Representa las respuestas de carga como una unión discriminada que cubra carga, éxito y error; decide qué datos se aceptan desde entradas externas.`,
      ),
      code(
        'Crear tipos para tareas y filtros',
        `type EstadoTarea = 'pendiente' | 'hecha'

interface Tarea {
  id: string
  titulo: string
  estado: EstadoTarea
  fechaLimite?: Date
}

type FiltroTarea = 'todas' | EstadoTarea`,
        'Usa literales para estados acotados y evita cadenas arbitrarias donde el dominio solo admite un conjunto conocido.',
      ),
      text(
        'Implementar funciones genéricas y seguras',
        `Crea operaciones para filtrar y actualizar tareas sin mutaciones accidentales. Tipar una función no basta: comprueba que el identificador exista y que las transiciones solicitadas sean válidas.`,
      ),
      text(
        'Conectar una API con validación',
        `Obtén JSON como unknown, comprueba su estructura y convierte fechas de forma explícita. Trata errores HTTP y de validación por separado; no uses una aserción como sustituto del análisis del dato.`,
      ),
      text(
        'Configurar módulos y pruebas',
        `Organiza tipos de dominio, servicios y presentación en módulos con imports claros. Ejecuta comprobación estricta de tipos y prueba tanto operaciones válidas como entradas inválidas y estados de error.`,
      ),
      text(
        'Revisar y desplegar',
        `Ejecuta el type-check y el build de producción, revisa que no queden any innecesarios y documenta el comando de validación. Confirma que la herramienta de CI comprueba tipos aunque el bundler solo transpile.`,
      ),
    ],
  },
]

export const typescriptModule = {
  id: 'typescript',
  label: 'TypeScript',
  title: 'Escribe JavaScript con tipos y confianza.',
  description: 'Aprende TypeScript desde la instalación y tipos básicos hasta narrowing, genéricos, utility types, módulos, configuración estricta e integración con aplicaciones reales. Incluye un proyecto tipado y examen final generado por IA.',
  subtitle: 'Superset tipado de JavaScript · documentación oficial',
  languages: [{ key: 'typescript', label: 'TypeScript' }],
  levels: typescriptLevels.map((level, index) => ({ ...level, level: index })),
  outputLabel: 'Resultado de ejemplo',
  comparison: {
    title: 'JavaScript y TypeScript',
    languages: ['JavaScript', 'TypeScript'],
    rows: [
      { label: 'Comprobación de tipos', values: ['Principalmente durante la ejecución', 'Análisis estático antes de ejecutar'] },
      { label: 'Ejecución', values: ['Lo ejecuta el runtime compatible', 'Se transforma a JavaScript o lo procesa una herramienta'] },
      { label: 'Validación de datos externos', values: ['Debe implementarse en runtime', 'También debe implementarse en runtime'] },
      { label: 'Adopción', values: ['Se usa directamente', 'Puede añadirse gradualmente a proyectos JavaScript'] },
    ],
  },
}
