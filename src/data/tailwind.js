// Ruta original de Tailwind CSS 2.2, basada en la documentación oficial v2:
// https://v2.tailwindcss.com/docs

const text = (title, tailwind, note) => ({ title, tailwind, ...(note && { note }) })
const code = (title, tailwind, note) => ({ title, code: true, tailwind, ...(note && { note }) })
const links = (title, entries) => ({
  title,
  tailwind: entries.map(([label, url]) => `${label}: ${url}`).join('\n'),
})

const tailwindLevels = [
  {
    title: 'Primeros pasos',
    topics: [
      text(
        '¿Qué es Tailwind CSS?',
        `Tailwind CSS es un framework CSS utility-first: en vez de escribir una clase distinta para cada componente, se combinan clases pequeñas que representan propiedades visuales. Por ejemplo, flex organiza elementos, p-4 añade espacio interior y text-center alinea texto. El resultado sigue siendo CSS estándar, generado durante la compilación.`,
      ),
      text(
        'Preparar Node.js, npm y el proyecto',
        `Tailwind CSS 2 se integra en una herramienta de compilación como PostCSS. Instala una versión de Node.js compatible con las dependencias del proyecto y revisa que npm esté disponible antes de configurar el pipeline.`,
      ),
      code(
        'Instalar Tailwind CSS 2 y PostCSS',
        `$ npm install -D tailwindcss@2.2.19 postcss@8 autoprefixer@10
$ npx tailwindcss init -p`,
        'El comando crea tailwind.config.js y postcss.config.js. Fijar Tailwind en la serie 2 evita mezclar la configuración clásica de v2 con la de versiones mayores.',
      ),
      code(
        'Añadir las directivas de Tailwind al CSS',
        `/* src/styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;`,
        'base agrega estilos de reinicio, components es la capa para componentes CSS y utilities incluye las clases de utilidad. El bundler procesa este archivo por PostCSS.',
      ),
      code(
        'Configurar el archivo de entrada y la compilación',
        `// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,
        'Importa src/styles.css desde la aplicación y asegúrate de que el bundler lo procese. En una integración PostCSS existente, conserva los demás plugins y respeta su orden.',
      ),
      links('Documentación de instalación', [
        ['Instalación con PostCSS', 'https://v2.tailwindcss.com/docs/installation#using-postcss'],
        ['Instalación con CLI', 'https://v2.tailwindcss.com/docs/installation#using-tailwind-cli'],
        ['Guía de migración a Tailwind v2', 'https://v2.tailwindcss.com/docs/upgrading-to-v2'],
      ]),
    ],
  },
  {
    title: 'Fundamentos de las utilidades',
    topics: [
      text(
        'Utility-first y composición de estilos',
        `Una clase de utilidad aplica una decisión CSS concreta. Combinar utilidades en el marcado hace visible el diseño junto al contenido y permite cambiarlo de forma local. Conviene extraer componentes cuando un patrón visual se repite, en lugar de crear una clase global para cada etiqueta.`,
      ),
      code(
        'Espaciado: padding y margin',
        `<section class="p-6">
  <h2 class="mb-3">Panel</h2>
  <p class="mt-2 px-4 py-2">Contenido con espacio interior</p>
</section>`,
        'p-6 aplica padding en todos los lados; px-4 y py-2 aplican espacio horizontal y vertical. m, mx, my, mt, mr, mb y ml controlan margin.',
      ),
      code(
        'Ancho, alto y tamaño máximo',
        `<div class="mx-auto w-full max-w-4xl">
  <div class="h-16 w-1/2">Mitad del contenedor</div>
</div>`,
        'Tailwind incluye escalas de tamaño, fracciones como w-1/2 y límites como max-w-4xl. La configuración del tema permite extender o reemplazar esas escalas.',
      ),
      code(
        'Colores de texto, fondo y borde',
        `<article class="border border-gray-200 bg-white p-4 text-gray-800">
  <h2 class="text-blue-700">Título</h2>
</article>`,
        'Los colores siguen el patrón propiedad-color-intensidad. La paleta y sus intensidades forman parte del tema y se pueden personalizar.',
      ),
      code(
        'Tipografía y alineación',
        `<h1 class="font-bold text-2xl leading-tight tracking-tight">
  Diseño claro
</h1>
<p class="text-center text-sm text-gray-600">Descripción</p>`,
        'Las familias, tamaños, peso, altura de línea, espaciado entre letras y alineación se controlan con utilidades como font-sans, text-lg, font-semibold, leading-relaxed y text-center.',
      ),
      text(
        'Leer una cadena de clases',
        `Ordena mentalmente una cadena larga por grupos: layout, dimensiones, espaciado, tipografía, color, borde y estado. El orden de las clases en el HTML no determina por sí solo qué regla CSS gana; la cascada y la especificidad del CSS generado siguen aplicando.`,
      ),
    ],
  },
  {
    title: 'Diseño responsive',
    topics: [
      text(
        'Enfoque mobile-first y breakpoints',
        `Las utilidades sin prefijo se aplican en todos los tamaños. Los prefijos sm:, md:, lg: y xl: aplican una utilidad desde el breakpoint indicado hacia arriba. Empieza con una composición legible en móvil y añade cambios para pantallas más anchas.`,
      ),
      code(
        'Cambiar columnas por breakpoint',
        `<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  <article class="rounded-lg bg-white p-4">Uno</article>
  <article class="rounded-lg bg-white p-4">Dos</article>
  <article class="rounded-lg bg-white p-4">Tres</article>
</div>`,
        'La cuadrícula empieza con una columna, cambia a dos desde md y llega a tres desde lg. Los breakpoints predeterminados pueden consultarse y modificarse en screens dentro del tema.',
      ),
      code(
        'Responsive en padding y tipografía',
        `<main class="px-4 py-8 sm:px-6 lg:px-8">
  <h1 class="text-2xl sm:text-3xl lg:text-5xl">Mi página</h1>
</main>`,
        'Cada prefijo se combina con la utilidad que modifica. No hace falta una hoja de estilos ni una media query separada para estos cambios comunes.',
      ),
      text(
        'Breakpoints personalizados',
        `En tailwind.config.js, screens permite definir, reemplazar o ampliar los breakpoints. Mantén una escala pequeña y coherente con los puntos donde el contenido deja de caber, en lugar de escogerlos solo por modelos concretos de dispositivo.`,
      ),
      code(
        'Configurar breakpoints en Tailwind v2',
        `module.exports = {
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',
      },
    },
  },
}`,
        'Dentro de extend se agrega un breakpoint sin borrar los predeterminados. Si redefinieras theme.screens directamente, estarías reemplazando la escala por defecto.',
      ),
      text(
        'Revisar responsive con DevTools',
        `Prueba anchos estrechos y amplios, y observa dónde se rompen líneas, controles y navegación. Las clases responsive son min-width por defecto en Tailwind v2; si necesitas un rango, combina una condición de inicio con una variante max-width definida por el proyecto.`,
      ),
    ],
  },
  {
    title: 'Layout: flexbox, grid y posicionamiento',
    topics: [
      code(
        'Alinear elementos con Flexbox',
        `<header class="flex items-center justify-between gap-4">
  <a class="font-bold">Marca</a>
  <nav class="flex items-center gap-3">Navegación</nav>
</header>`,
        'flex crea un contenedor flexible; items-center alinea en el eje transversal, justify-between distribuye espacio en el eje principal y gap-4 separa elementos.',
      ),
      code(
        'Controlar dirección y ajuste de flex',
        `<div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
  <button class="shrink-0">Acción</button>
  <p class="min-w-0 flex-1">Texto que puede ocupar el espacio restante</p>
</div>`,
        'flex-col cambia la dirección, flex-wrap permite saltos de línea y flex-1 distribuye el espacio disponible. min-w-0 ayuda a que un hijo pueda encogerse dentro de un flex item.',
      ),
      code(
        'Crear layouts con CSS Grid',
        `<div class="grid grid-cols-12 gap-4">
  <aside class="col-span-12 md:col-span-4">Filtros</aside>
  <main class="col-span-12 md:col-span-8">Resultados</main>
</div>`,
        'grid-cols-12 define doce columnas y col-span-* determina cuántas ocupa cada elemento. Las variantes responsive permiten reorganizar la cuadrícula según el espacio.',
      ),
      code(
        'Posicionar elementos y apilar capas',
        `<div class="relative">
  <img class="w-full" src="/foto.jpg" alt="Paisaje">
  <span class="absolute bottom-3 left-3 rounded bg-black p-2 text-white">
    Destacado
  </span>
</div>`,
        'relative establece el contexto para el hijo absolute. top, right, bottom, left e inset controlan la posición; z-10 ajusta el orden de apilamiento cuando es necesario.',
      ),
      text(
        'Overflow, display y visibilidad',
        `Utilidades como block, inline-flex, hidden, overflow-hidden y overflow-auto controlan cómo participa un elemento en el layout y cómo se recorta su contenido. Usa hidden solo cuando el contenido pueda ocultarse sin perder información importante ni controles.`,
      ),
      text(
        'Centrar contenido y dimensionar contenedores',
        `Combina mx-auto con un ancho máximo para centrar una página y evitar líneas demasiado largas. container ofrece anchos por breakpoint configurables; un max-w-* explícito puede ser más predecible para una sección concreta.`,
      ),
    ],
  },
  {
    title: 'Estados, interacción y accesibilidad',
    topics: [
      code(
        'Estados hover, focus y active',
        `<button class="rounded bg-blue-600 px-4 py-2 text-white
               hover:bg-blue-700 focus:outline-none focus:ring-2
               focus:ring-blue-400 active:bg-blue-800">
  Guardar
</button>`,
        'Las variantes hover:, focus: y active: aplican estilos al estado correspondiente. Conserva un indicador de foco visible para teclado; no elimines outlines sin ofrecer una alternativa.',
      ),
      code(
        'Deshabilitar controles',
        `<button disabled
  class="rounded bg-blue-600 px-4 py-2 text-white
         disabled:cursor-not-allowed disabled:opacity-50">
  Enviar
</button>`,
        'Tailwind v2.2 incluye variantes disabled. El atributo HTML disabled es el que realmente deshabilita el control; las clases solo presentan el estado visual.',
      ),
      text(
        'Variantes disponibles y configuración',
        `No todas las variantes se habilitan para todos los plugins en la configuración clásica de Tailwind v2. En variants se habilitan las necesarias para cada utilidad. El modo JIT de v2.2 amplía la generación bajo demanda y permite variantes que antes requerían configuración adicional.`,
      ),
      code(
        'Estilo de grupo y relación entre controles',
        `<a class="group block rounded p-4 hover:bg-gray-100" href="/producto">
  <h2 class="font-semibold group-hover:text-blue-700">Producto</h2>
  <p class="text-gray-600">Ver detalles</p>
</a>`,
        'group permite que un descendiente reaccione al estado hover o focus del elemento padre. En Tailwind v2.2, peer-* también se puede habilitar con JIT para reaccionar al estado de un hermano anterior.',
      ),
      text(
        'Contraste, semántica y foco accesible',
        `Utilidades visuales no sustituyen HTML semántico ni etiquetas accesibles. Usa button para acciones, a para navegación, label para campos y texto alternativo útil en imágenes. Revisa contraste, foco con teclado y estados que no dependan solo del color.`,
      ),
      text(
        'Dark mode en Tailwind v2',
        `La variante dark: se habilita con darkMode: 'media' para seguir la preferencia del sistema o con darkMode: 'class' para controlarla desde la aplicación. En modo class, un ancestro con la clase dark activa las utilidades dark:* de sus descendientes.`,
      ),
    ],
  },
  {
    title: 'Componentes visuales y estados',
    topics: [
      code(
        'Crear una tarjeta reutilizable',
        `<article class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
  <img class="h-48 w-full object-cover" src="/curso.jpg" alt="Curso">
  <div class="p-5">
    <p class="text-sm font-semibold text-blue-700">Diseño web</p>
    <h2 class="mt-2 text-xl font-bold">Aprende paso a paso</h2>
    <p class="mt-2 text-gray-600">Una descripción breve.</p>
  </div>
</article>`,
        'El ejemplo reúne layout, borde, sombra, recorte de imagen, tipografía y espaciado. En una aplicación, extrae una tarjeta como componente si se repite o tiene comportamiento propio.',
      ),
      code(
        'Diseñar formularios con estados',
        `<label class="block">
  <span class="text-sm font-medium text-gray-700">Correo</span>
  <input type="email" required
    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm
           focus:border-blue-500 focus:ring-blue-500">
</label>`,
        'Las clases definen la presentación y los atributos semánticos aplican validación nativa. Los estados de error, ayuda y éxito deben comunicarse también con texto y relaciones accesibles.',
      ),
      code(
        'Transiciones, transformaciones y sombras',
        `<a class="block rounded-lg bg-white p-5 shadow transition
            duration-200 hover:-translate-y-1 hover:shadow-lg"
   href="/detalle">
  Ver detalle
</a>`,
        'transition habilita transiciones en propiedades; duration-* ajusta el tiempo y transformaciones como translate o scale expresan movimiento. Prefiere animaciones breves y respeta prefers-reduced-motion cuando la interacción sea significativa.',
      ),
      text(
        'Imágenes, object-fit y proporciones',
        `object-cover llena el contenedor recortando lo necesario y object-contain mantiene la imagen completa. Define ancho, altura o relación de aspecto apropiados y agrega alt que describa el propósito, no el nombre del archivo.`,
      ),
      text(
        'Sombras, bordes, radios y separadores',
        `rounded-* controla el radio, border-* el borde, shadow-* la elevación y divide-* los separadores entre hijos. Usa estas señales con consistencia para construir jerarquía visual, sin depender de demasiadas sombras o contornos simultáneos.`,
      ),
      text(
        'Extraer patrones en componentes',
        `Repetir cadenas extensas de clases puede ser una señal para crear un componente con variantes explícitas. @apply permite agrupar utilidades en CSS, pero no reemplaza la composición de componentes y conviene reservarlo para estilos compartidos que realmente deban vivir en una hoja de estilos.`,
      ),
    ],
  },
  {
    title: 'Personalización y configuración',
    topics: [
      code(
        'Entender tailwind.config.js',
        `module.exports = {
  purge: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}`,
        'La configuración clásica de Tailwind v2 usa purge para encontrar clases en producción, theme para el diseño, variants para estados habilitados y plugins para ampliar utilidades y estilos.',
      ),
      code(
        'Extender colores, fuentes y espaciado',
        `module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#176b4d',
          light: '#d9f2e6',
        },
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
      },
    },
  },
}`,
        'extend añade tokens sin reemplazar las escalas predeterminadas. Luego pueden usarse, por ejemplo, como bg-brand, text-brand-light y font-display.',
      ),
      text(
        'Reemplazar valores frente a extender el tema',
        `Una clave definida directamente bajo theme reemplaza su escala predeterminada; una clave dentro de theme.extend la amplía. Elige reemplazo solo si el proyecto controla completamente esa escala y realmente no necesita los valores originales.`,
      ),
      code(
        'Añadir utilidades propias con @layer',
        `@layer components {
  .btn-primary {
    @apply rounded bg-brand px-4 py-2 font-semibold text-white;
  }
}`,
        '@layer coloca reglas propias en una capa de Tailwind y @apply inserta utilidades existentes. El selector debe aparecer en el CSS de entrada y no conviene crear reglas circulares aplicando una clase sobre sí misma.',
      ),
      text(
        'Plugins oficiales y de terceros',
        `Los plugins pueden registrar estilos base, componentes o utilidades. Tailwind v2 ofrece extensiones oficiales para formularios y tipografía, además de una API de plugins. Evalúa mantenimiento, tamaño y efectos globales antes de instalar una extensión.`,
      ),
      code(
        'Registrar el plugin de formularios',
        `module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
  ],
}`,
        'Instala una versión del plugin compatible con Tailwind CSS 2 y vuelve a compilar. Revisa la documentación del plugin para entender qué controles normaliza.',
      ),
    ],
  },
  {
    title: 'JIT, producción y mantenimiento',
    topics: [
      code(
        'Activar el modo JIT de Tailwind 2.2',
        `module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
}`,
        'En Tailwind v2.2, JIT se habilita explícitamente con mode: "jit". La generación bajo demanda habilita valores arbitrarios y variantes adicionales; no confundas esta configuración con la de Tailwind v3 o v4.',
      ),
      code(
        'Usar valores arbitrarios con JIT',
        `<div class="top-[117px] grid-cols-[1fr,2fr]">
  Panel con medidas específicas
</div>`,
        'JIT permite expresar valores puntuales con corchetes cuando la escala estándar no basta. Antes de añadirlos, comprueba si el valor debería convertirse en un token reutilizable del tema.',
      ),
      text(
        'Purge en producción y clases dinámicas',
        `En Tailwind v2, purge analiza los archivos declarados en la configuración y elimina CSS no utilizado en producción. Las clases deben aparecer completas como texto estático: construir bg-${'${color}'}-500 dinámicamente puede impedir que el escáner encuentre el nombre final. Usa un mapa de clases completas o safelist para casos justificados.`,
      ),
      code(
        'Incluir patrones de purga y safelist',
        `module.exports = {
  purge: {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    options: {
      safelist: ['bg-red-500', 'bg-green-500'],
    },
  },
}`,
        'La forma de purge con content y options aplica a la configuración de Tailwind v2. Revisa que cubra plantillas, componentes y páginas reales para no eliminar clases usadas.',
      ),
      text(
        'Optimizar el CSS y validar el build',
        `Comprueba el tamaño del CSS de producción, no solo el servidor de desarrollo. Verifica que los patrones purge cubran archivos generados y componentes compartidos, y ejecuta una compilación limpia para descubrir errores de configuración que el modo de desarrollo no muestra.`,
      ),
      text(
        'Migración responsable entre versiones',
        `Tailwind v2, v3 y v4 tienen diferencias importantes en detección de contenido, configuración, instalación y herramientas. Antes de actualizar, identifica plugins y clases arbitrarias, lee la guía oficial de migración y actualiza por pasos con capturas o pruebas visuales de páginas clave.`,
      ),
    ],
  },
  {
    title: 'Proyecto integrador: landing responsive',
    topics: [
      text(
        'Planificar la página y sus componentes',
        `Define una landing para un producto o servicio con encabezado, propuesta de valor, beneficios, prueba social y llamada a la acción. Separa las piezas repetibles en componentes y asigna tokens de color, tipografía, radio y espaciado antes de pulir cada sección.`,
      ),
      text(
        'Construir navegación y hero accesibles',
        `Usa un header semántico, enlaces descriptivos y un botón real para acciones. Diseña el hero primero para móvil y aplica variantes para columnas, tamaños y espaciado en pantallas grandes. El contenido debe conservar un orden lógico aunque el layout cambie.`,
      ),
      text(
        'Componer tarjetas y una cuadrícula de beneficios',
        `Crea tarjetas con un patrón visual consistente y datos separados del marcado cuando sea una lista. En móvil presenta una columna; amplía a dos o tres columnas con breakpoints a medida que el contenido tenga espacio suficiente.`,
      ),
      text(
        'Configurar tipografía, marca y estados',
        `Añade los tokens de marca con theme.extend, y documenta el uso de las utilidades de estado. Asegura foco de teclado, contraste suficiente, estados disabled y movimiento reducido para cualquier transición relevante.`,
      ),
      text(
        'Preparar producción y revisar el resultado',
        `Configura purge para todos los archivos de la aplicación, genera el build de producción y comprueba que las utilidades dinámicas sigan presentes. Revisa la página a distintos anchos, con teclado, con imágenes lentas y con contenido más largo del esperado.`,
      ),
      links('Guías de referencia para el proyecto', [
        ['Responsive design', 'https://v2.tailwindcss.com/docs/responsive-design'],
        ['Customizing configuration', 'https://v2.tailwindcss.com/docs/configuration'],
        ['Optimizing for production', 'https://v2.tailwindcss.com/docs/optimizing-for-production'],
        ['Dark mode', 'https://v2.tailwindcss.com/docs/dark-mode'],
      ]),
    ],
  },
].map((level, index) => ({ ...level, level: index }))

export const tailwindModule = {
  id: 'tailwind',
  label: 'Tailwind',
  title: 'Diseña interfaces web con utilidades CSS.',
  description: 'Aprende Tailwind CSS 2 desde la instalación y las utilidades esenciales hasta responsive design, accesibilidad, personalización, JIT, optimización para producción y un proyecto integrador. La ruta usa la configuración clásica documentada para Tailwind v2 y termina con un examen final generado por IA.',
  subtitle: 'Framework CSS utility-first · Tailwind CSS 2.2',
  languages: [{ key: 'tailwind', label: 'Tailwind CSS' }],
  levels: tailwindLevels,
  outputLabel: 'Vista de ejemplo',
  comparison: {
    title: 'Tailwind CSS: conceptos clave',
    languages: ['Tailwind CSS', 'CSS tradicional', 'CSS Modules'],
    rows: [
      { label: 'Metodología', values: ['Componer clases de utilidad en el marcado', 'Escribir reglas y selectores propios', 'Escribir reglas locales al componente'] },
      { label: 'Responsive', values: ['Prefijos mobile-first como sm:, md:, lg: y xl:', 'Media queries definidas por el equipo', 'Media queries en la hoja del componente'] },
      { label: 'Configuración v2', values: ['tailwind.config.js con purge, theme, variants y plugins', 'Variables y convenciones propias', 'Variables y convenciones propias'] },
      { label: 'Producción', values: ['Purge elimina estilos no usados del CSS generado', 'El pipeline puede minimizar el CSS', 'El pipeline puede minimizar cada módulo CSS'] },
    ],
  },
}
