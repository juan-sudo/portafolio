// Ruta original de Next.js basada en la documentación oficial:
// https://nextjs.org/docs

const text = (title, nextjs, note) => ({ title, nextjs, ...(note && { note }) })
const code = (title, nextjs, note) => ({ title, code: true, nextjs, ...(note && { note }) })
const links = (title, entries) => ({
  title,
  nextjs: entries.map(([label, url]) => `${label}: ${url}`).join('\n'),
})

const nextLevels = [
  {
    title: 'Primeros pasos y entorno',
    topics: [
      text(
        '¿Qué es Next.js?',
        `Next.js es un framework de React para crear aplicaciones web full-stack. Añade enrutamiento basado en archivos, renderizado en servidor, optimización de recursos y herramientas de producción. La ruta usa App Router, el router recomendado para proyectos nuevos; Pages Router sigue disponible en proyectos existentes.`,
      ),
      code(
        'Requisitos y crear una aplicación',
        `$ node --version
v20.9.0

$ npx create-next-app@latest mi-app
$ cd mi-app
$ npm run dev`,
        'La documentación actual requiere Node.js 20.9 o posterior. create-next-app configura opciones como TypeScript, ESLint, Tailwind CSS, App Router y alias de importación.',
      ),
      code(
        'Comandos del ciclo de desarrollo',
        `$ npm run dev     # desarrollo
$ npm run build   # compilación de producción
$ npm run start   # servir la compilación
$ npx next info   # información del entorno`,
        'Turbopack es el bundler predeterminado en las versiones actuales. Usa los comandos definidos en el package.json del proyecto.',
      ),
      code(
        'Estructura inicial con App Router',
        `app/
├── layout.tsx
├── page.tsx
├── globals.css
└── favicon.ico
public/
package.json
next.config.ts`,
        'app contiene rutas y convenciones especiales; public sirve archivos estáticos por URL. También puedes colocar app dentro de src/.',
      ),
      code(
        'Crear el layout y la página raíz',
        `// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

// app/page.tsx
export default function Page() {
  return <h1>Hola, Next.js</h1>
}`,
        'El layout raíz es obligatorio y define html y body. La página raíz se resuelve desde app/page.tsx.',
      ),
      links('Primeros pasos oficiales', [
        ['Instalación', 'https://nextjs.org/docs/app/getting-started/installation'],
        ['Estructura del proyecto', 'https://nextjs.org/docs/app/getting-started/project-structure'],
        ['Tutorial Learn', 'https://nextjs.org/learn'],
      ]),
    ],
  },
  {
    title: 'Rutas, layouts y navegación',
    topics: [
      text(
        'Enrutamiento basado en archivos',
        `En App Router, las carpetas organizan segmentos de ruta y page.tsx hace que un segmento sea accesible. Por ejemplo, app/about/page.tsx crea /about. Una carpeta sin page, route u otra convención no se convierte por sí sola en una página pública.`,
      ),
      code(
        'Layouts anidados y persistentes',
        `// app/dashboard/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <section>
      <nav>Panel</nav>
      <main>{children}</main>
    </section>
  )
}`,
        'Un layout envuelve las páginas y layouts descendientes de su segmento. Se conserva durante la navegación entre rutas hermanas, lo que permite mantener estructura y estado compartidos.',
      ),
      code(
        'Segmentos dinámicos',
        `// app/products/[id]/page.tsx
export default async function ProductPage({ params }) {
  const { id } = await params
  return <h1>Producto {id}</h1>
}`,
        'Los corchetes definen un segmento dinámico. En versiones actuales, params es asíncrono en las convenciones del App Router.',
      ),
      text(
        'Grupos de rutas y rutas paralelas',
        `Los grupos entre paréntesis, como (marketing), ordenan archivos sin añadir el nombre del grupo a la URL. Las rutas paralelas usan segmentos @nombre para renderizar varias áreas dentro de un layout; son útiles para interfaces con paneles independientes.`,
      ),
      code(
        'Navegar con Link',
        `import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Inicio</Link>
      <Link href="/products">Productos</Link>
    </nav>
  )
}`,
        'next/link permite navegación del lado cliente, precarga cuando corresponde y mantiene accesible el enlace. Para navegación imperativa en un Client Component se usa useRouter de next/navigation.',
      ),
      text(
        'Not found, redirects y navegación',
        `not-found.tsx define la interfaz de una ruta no encontrada; notFound() permite activar ese estado desde una página o layout. redirect() permite redirigir desde código del servidor. Elige la convención según si falta el recurso o si la navegación debe continuar en otra URL.`,
      ),
    ],
  },
  {
    title: 'Componentes y renderizado',
    topics: [
      text(
        'Server Components por defecto',
        `Los componentes del App Router se ejecutan en el servidor por defecto. Pueden acceder a datos y secretos del entorno del servidor sin enviar su implementación al navegador. No pueden usar estado, efectos o APIs del navegador como window.`,
      ),
      code(
        'Crear un Client Component',
        `'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}`,
        'La directiva "use client" establece un límite entre servidor y cliente. Colócala en el punto de entrada interactivo, no en todo el árbol si solo una pequeña parte necesita estado.',
      ),
      text(
        'Elegir el límite entre servidor y cliente',
        `Mantén en el servidor los componentes que no requieren interactividad y convierte en Client Components solo los que usan estado, eventos o APIs del navegador. Un Client Component puede recibir como children contenido renderizado por el servidor, pero las props que cruzan el límite deben ser serializables.`,
      ),
      text(
        'Renderizado estático, dinámico y streaming',
        `Next.js puede preparar contenido durante la compilación, resolverlo por solicitud o transmitir partes de la interfaz a medida que están listas. La elección depende de los datos, las APIs usadas y la configuración de caché; streaming permite mostrar primero el shell y cargar regiones lentas después.`,
      ),
      code(
        'Estados de carga con Suspense',
        `import { Suspense } from 'react'

export default function Page() {
  return (
    <main>
      <h1>Panel</h1>
      <Suspense fallback={<p>Cargando actividad…</p>}>
        <Activity />
      </Suspense>
    </main>
  )
}`,
        'Suspense muestra un fallback mientras una parte suspendida termina de resolverse. app/dashboard/loading.tsx ofrece un estado de carga automático para el segmento.',
      ),
      text(
        'Manejo de errores por segmento',
        `error.tsx crea un límite de error para un segmento; en el App Router es un Client Component y puede ofrecer una acción de reintento. global-error.tsx permite personalizar errores en la raíz. Los errores deben registrarse en el servidor sin filtrar detalles sensibles al usuario.`,
      ),
    ],
  },
  {
    title: 'Datos, caché y revalidación',
    topics: [
      code(
        'Obtener datos en un Server Component',
        `async function getProducts() {
  const response = await fetch('https://api.example.com/products')
  if (!response.ok) throw new Error('No se pudieron cargar los productos')
  return response.json()
}

export default async function ProductsPage() {
  const products = await getProducts()
  return <ProductList products={products} />
}`,
        'Los Server Components pueden ser funciones asíncronas y esperar datos directamente. Comprueba errores HTTP y valida la forma de los datos externos antes de usarlos.',
      ),
      text(
        'Entender la caché de Next.js',
        `El comportamiento de caché ha cambiado entre versiones y puede depender de opciones de configuración como Cache Components. Decide explícitamente qué datos pueden reutilizarse, por cuánto tiempo y quién puede verlos; no asumas que toda petición fetch se almacena o se omite por defecto.`,
      ),
      code(
        'Usar cache y etiquetas de datos',
        `import { cacheTag } from 'next/cache'

async function getCatalog() {
  'use cache'
  cacheTag('catalog')
  return await readCatalogFromDatabase()
}`,
        'En configuraciones que habilitan Cache Components, "use cache" marca una función cacheable y cacheTag permite asociar etiquetas para invalidación. Verifica el modelo de caché configurado en el proyecto.',
      ),
      text(
        'Revalidar rutas o etiquetas',
        `Después de una mutación, Next.js permite invalidar rutas o datos etiquetados para que las siguientes lecturas no dependan de información obsoleta. Elige la invalidación más específica que refleje qué cambió y quién debe ver la actualización.`,
      ),
      text(
        'Evitar fugas de datos entre usuarios',
        `Los datos privados de una sesión no deben guardarse en una caché compartida sin una clave y política seguras. Aplica autorización en el servidor antes de devolver datos y separa cuidadosamente datos públicos, personales y dependientes de cookies.`,
      ),
      text(
        'Bases de datos y acceso desde el servidor',
        `Conecta la base de datos desde módulos de servidor, nunca desde componentes enviados al navegador. Centraliza consultas, usa parámetros en SQL, administra conexiones según el entorno de ejecución y devuelve a la interfaz solo los campos que necesita.`,
      ),
    ],
  },
  {
    title: 'Mutaciones, formularios y Route Handlers',
    topics: [
      code(
        'Crear una Server Action',
        `'use server'

export async function createProduct(formData) {
  const name = String(formData.get('name') ?? '').trim()
  if (!name) throw new Error('El nombre es obligatorio')
  await saveProduct({ name })
}`,
        'Una Server Function marcada con "use server" se ejecuta en el servidor. Valida los datos dentro de la función y vuelve a verificar autorización para cada mutación.',
      ),
      code(
        'Conectar una acción a un formulario',
        `import { createProduct } from './actions'

export function ProductForm() {
  return (
    <form action={createProduct}>
      <label>
        Nombre
        <input name="name" required />
      </label>
      <button type="submit">Guardar</button>
    </form>
  )
}`,
        'Los formularios pueden invocar Server Actions directamente. Añade estados de envío y errores apropiados cuando la experiencia lo requiera, y nunca tomes la interfaz como frontera de seguridad.',
      ),
      text(
        'Validar entradas y controlar permisos',
        `Valida tipo, longitud y formato tanto para mejorar los errores como para proteger los datos. La Server Action debe comprobar la identidad y los permisos sobre el recurso solicitado; ocultar un botón o proteger una página no reemplaza esa comprobación.`,
      ),
      code(
        'Crear un Route Handler',
        `// app/api/products/route.ts
export async function GET() {
  const products = await readProducts()
  return Response.json(products)
}

export async function POST(request: Request) {
  const body = await request.json()
  const product = await createProduct(body)
  return Response.json(product, { status: 201 })
}`,
        'route.ts define un endpoint HTTP en el segmento correspondiente. Implementa solo los métodos necesarios y valida cuerpos, autenticación, códigos de estado y respuestas.',
      ),
      text(
        'Cuándo usar Server Actions o Route Handlers',
        `Server Actions suelen ser apropiadas para mutaciones originadas en la propia interfaz Next.js. Route Handlers exponen una API HTTP para clientes externos, webhooks o integraciones. Evita duplicar lógica de negocio: ambos pueden llamar a la misma capa de servicio del servidor.`,
      ),
      text(
        'Cookies, cabeceras y middleware de petición',
        `Las APIs de cookies y headers permiten leer el contexto de una solicitud en el servidor. El archivo proxy.ts de versiones actuales ejecuta lógica de enrutamiento antes de completar la solicitud; úsalo para redirecciones o comprobaciones ligeras, no como única protección de datos privados.`,
      ),
    ],
  },
  {
    title: 'Estilos, recursos y metadatos',
    topics: [
      code(
        'CSS global y CSS Modules',
        `// app/layout.tsx
import './globals.css'

// components/Card.module.css
// .card { border-radius: 12px; padding: 1rem; }
import styles from './Card.module.css'

export function Card({ children }) {
  return <article className={styles.card}>{children}</article>
}`,
        'Los estilos globales se importan desde el layout raíz. CSS Modules limita nombres de clase al módulo y reduce colisiones.',
      ),
      text(
        'Usar Tailwind CSS en Next.js',
        `Next.js puede integrar Tailwind CSS para estilizar componentes con clases de utilidad. Sigue la guía de instalación correspondiente a la versión de Tailwind elegida: las versiones actuales y Tailwind v2 usan configuración y directivas distintas.`,
      ),
      code(
        'Optimizar imágenes con next/image',
        `import Image from 'next/image'

export function Avatar() {
  return (
    <Image
      src="/avatar.png"
      alt="Retrato de Ana"
      width={96}
      height={96}
    />
  )
}`,
        'next/image ofrece dimensiones y optimización de imágenes. Las fuentes remotas deben configurarse según las reglas de imágenes permitidas de Next.js.',
      ),
      text(
        'Cargar fuentes con next/font',
        `next/font descarga o empaqueta fuentes durante la compilación y puede servirlas desde el propio sitio para reducir solicitudes externas. Define la fuente en el layout o en el ámbito donde se utiliza y revisa licencias y subconjuntos.`,
      ),
      code(
        'Definir metadatos por ruta',
        `export const metadata = {
  title: 'Catálogo | Mi tienda',
  description: 'Explora productos disponibles.',
}

export default function Page() {
  return <h1>Catálogo</h1>
}`,
        'metadata o generateMetadata permiten definir title, description y metadatos por página dentro del App Router. Las convenciones del framework generan las etiquetas HTML correspondientes.',
      ),
      text(
        'Open Graph, iconos y archivos especiales',
        `Los metadatos Open Graph controlan cómo se comparte una página; iconos y robots.txt o sitemap.xml también pueden generarse mediante convenciones del App Router. El contenido debe describir la ruta real y no repetirse indiscriminadamente en toda la aplicación.`,
      ),
    ],
  },
  {
    title: 'Autenticación, seguridad y arquitectura',
    topics: [
      text(
        'Diseñar autenticación para la aplicación',
        `La autenticación identifica al usuario; la autorización determina qué puede hacer con un recurso. Usa una biblioteca mantenida o una integración probada, protege sesiones con cookies seguras y evita diseñar criptografía o tokens propios sin necesidad.`,
      ),
      text(
        'Proteger páginas y operaciones',
        `La comprobación de permisos debe ejecutarse en el servidor cerca de los datos y en cada acción o Route Handler. Un redirect en una página protege esa navegación concreta, pero no necesariamente otras rutas, endpoints o mutaciones que acceden al mismo recurso.`,
      ),
      text(
        'Variables de entorno y secretos',
        `Guarda claves en variables del servidor y no las prefijes con NEXT_PUBLIC_ salvo que deban ser públicas. Los valores NEXT_PUBLIC_ se incrustan en el bundle del navegador. Nunca registres contraseñas o tokens en errores visibles.`,
      ),
      text(
        'Seguridad de Server Actions',
        `Trata cada Server Action como una entrada remota: valida datos, verifica sesión y permisos, y limita operaciones. Los identificadores de acción no son una autorización; un usuario puede invocarla fuera del flujo visual esperado.`,
      ),
      text(
        'Organizar capas de presentación y datos',
        `Mantén las consultas y reglas de negocio en módulos de servidor reutilizables, separadas de la composición visual. Usa importaciones con límites server-only cuando corresponda y evita importar módulos que contienen secretos dentro de un Client Component.`,
      ),
      text(
        'Runtime Node.js y Edge',
        `El runtime Node.js ofrece APIs y compatibilidad de paquetes más amplia. El runtime Edge tiene restricciones y puede acercar lógica a usuarios, pero no todos los módulos de Node funcionan allí. Selecciona el runtime según dependencias, latencia y despliegue objetivo.`,
      ),
    ],
  },
  {
    title: 'Rendimiento, pruebas y despliegue',
    topics: [
      text(
        'Reducir JavaScript enviado al navegador',
        `Aprovecha Server Components y limita la superficie de "use client". Importa solo las dependencias necesarias, carga funciones pesadas cuando se requieran y analiza el bundle para encontrar código grande que llega al navegador sin aportar interacción.`,
      ),
      text(
        'Cargar componentes de manera diferida',
        `next/dynamic puede diferir componentes y bibliotecas cliente que no son necesarias en la primera vista. Elige un fallback útil y mide la carga real; dividir código sin una necesidad de usuario puede aumentar la complejidad y las solicitudes.`,
      ),
      text(
        'Streaming y experiencia de carga',
        `Usa loading.tsx o límites Suspense para mostrar regiones útiles mientras se resuelven datos lentos. Evita bloquear toda la página por un widget secundario y comunica errores o reintentos de forma comprensible.`,
      ),
      text(
        'Pruebas de componentes e integración',
        `Prueba componentes interactivos con herramientas de React Testing Library y flujos completos en navegador con Playwright u otra herramienta compatible. Para datos privados y mutaciones, incluye pruebas que verifiquen tanto el caso permitido como el rechazo por permisos.`,
      ),
      code(
        'Compilar y ejecutar en producción',
        `$ npm run build
$ npm run start`,
        'La compilación detecta errores y prepara la aplicación para producción. Reproduce el entorno desplegado, define variables por entorno y revisa logs de servidor sin imprimir secretos.',
      ),
      text(
        'Despliegue y observabilidad',
        `Next.js puede desplegarse en Vercel o en infraestructura Node.js compatible. Confirma que el proveedor soporte las funciones utilizadas, configura dominios y variables seguras, y observa errores, latencia, consumo y fallos de revalidación después del lanzamiento.`,
      ),
    ],
  },
  {
    title: 'Proyecto integrador: catálogo full-stack',
    topics: [
      text(
        'Definir rutas y estructura de catálogo',
        `Diseña una tienda pequeña con portada, catálogo, detalle dinámico de producto y panel privado. Propón app/, layouts compartidos, segmentos dinámicos y estados not-found, loading y error antes de implementar la interfaz.`,
      ),
      text(
        'Construir catálogo y detalle con datos del servidor',
        `Carga el catálogo en Server Components y genera páginas de detalle desde una ruta dinámica. Valida el identificador, trata productos ausentes como not found y mantiene credenciales de base de datos exclusivamente en el servidor.`,
      ),
      text(
        'Añadir filtros, búsqueda y navegación',
        `Representa filtros compartibles en searchParams cuando deban sobrevivir al refresco o copiarse como URL. Usa Link para navegar y decide qué partes necesitan estado cliente frente a cuáles pueden renderizarse en el servidor.`,
      ),
      text(
        'Implementar alta de producto segura',
        `Crea una Server Action o Route Handler para registrar productos. Valida entradas, verifica rol y sesión en el servidor, maneja errores y actualiza las vistas afectadas con la estrategia de revalidación adecuada.`,
      ),
      text(
        'Mejorar SEO y recursos visuales',
        `Añade metadata específica para catálogo y cada producto, imágenes con texto alternativo y next/image con dimensiones correctas. Revisa vista previa social, sitemap y carga en conexiones lentas.`,
      ),
      text(
        'Verificar calidad y publicar',
        `Prueba navegación, formularios, rutas inexistentes, datos vacíos y permisos insuficientes. Ejecuta build, define variables de entorno de producción, despliega y revisa logs y métricas con un flujo de reversión disponible.`,
      ),
    ],
  },
]

export const nextModule = {
  id: 'next',
  label: 'Next.js',
  title: 'Construye aplicaciones full-stack con React.',
  description: 'Aprende Next.js desde la configuración y el App Router hasta Server Components, datos y caché, mutaciones, Route Handlers, seguridad, rendimiento y despliegue. Incluye un proyecto integrador y examen final generado por IA. El Pages Router se aborda como contexto para reconocer proyectos existentes.',
  subtitle: 'Framework full-stack de React · App Router',
  languages: [{ key: 'nextjs', label: 'Next.js' }],
  levels: nextLevels.map((level, index) => ({ ...level, level: index })),
  outputLabel: 'Resultado de ejemplo',
  comparison: {
    title: 'React y los routers de Next.js',
    languages: ['Next.js App Router', 'Next.js Pages Router', 'React sin framework'],
    rows: [
      { label: 'Enrutamiento', values: ['Basado en carpetas y convenciones app/', 'Basado en archivos dentro de pages/', 'Se configura con una librería o por la aplicación'] },
      { label: 'Componentes de servidor', values: ['Integrados en el modelo del App Router', 'No usa el modelo RSC del App Router', 'Depende de la infraestructura elegida'] },
      { label: 'API del servidor', values: ['Route Handlers y Server Actions', 'API Routes', 'Se implementa aparte'] },
      { label: 'Mejor uso', values: ['Aplicaciones nuevas con funciones modernas de Next.js', 'Aplicaciones existentes que continúan mantenidas', 'Interfaces donde se quiere elegir cada pieza'] },
    ],
  },
}
