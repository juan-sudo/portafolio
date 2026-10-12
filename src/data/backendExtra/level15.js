// Nivel 15 · ¿Y ahora qué?
const PROYECTO = 'El siguiente paso es elegir un problema real y resolverlo en partes pequeñas. '

const RUTA = (extra) => `1. Practica con proyectos pequeños.\n2. Consulta la documentación cuando surjan dudas.\n3. ${extra}\n4. Escribe pruebas y comparte tu código para recibir comentarios.`

export default {
  'Aplicar lo aprendido a un proyecto': {
    javascript: PROYECTO + 'Una buena primera idea en Node.js es una API pequeña que guarde y devuelva tareas en JSON.',
    go: PROYECTO + 'Una buena primera idea en Go es una herramienta de terminal o un servicio web hecho solo con la biblioteca estándar.',
    csharp: PROYECTO + 'Una buena primera idea en C# es una API mínima con ASP.NET Core que gestione una lista de tareas.',
    ruby: PROYECTO + 'Una buena primera idea en Ruby es un script que automatice una tarea repetitiva, o una aplicación web pequeña con Sinatra.',
    rust: PROYECTO + 'Una buena primera idea en Rust es una herramienta de terminal, como el buscador de texto que se construye en el libro oficial.',
    kotlin: PROYECTO + 'Una buena primera idea en Kotlin es una API pequeña con Ktor, o reescribir en Kotlin un programa que ya tengas en Java.',
  },
  'Consultar la documentación de Python': {
    javascript: 'Guía de JavaScript en MDN: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide\nReferencia de JavaScript: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference\nDocumentación de Node.js: https://nodejs.org/docs/latest/api/',
    go: 'Documentación de Go: https://go.dev/doc/\nGo eficaz, la guía de estilo y buenas prácticas: https://go.dev/doc/effective_go\nEspecificación del lenguaje: https://go.dev/ref/spec',
    csharp: 'Documentación de C#: https://learn.microsoft.com/es-es/dotnet/csharp/\nReferencia del lenguaje: https://learn.microsoft.com/es-es/dotnet/csharp/language-reference/',
    ruby: 'Documentación de Ruby: https://www.ruby-lang.org/es/documentation/\nReferencia del lenguaje y sus clases: https://docs.ruby-lang.org/en/master/',
    rust: 'El libro de Rust: https://doc.rust-lang.org/book/\nRust con ejemplos: https://doc.rust-lang.org/rust-by-example/\nReferencia del lenguaje: https://doc.rust-lang.org/reference/',
    kotlin: 'Documentación de Kotlin: https://kotlinlang.org/docs/home.html\nReferencia del lenguaje: https://kotlinlang.org/docs/basic-syntax.html',
  },
  'Explorar la biblioteca estándar': {
    javascript: 'Módulos incluidos en Node.js: https://nodejs.org/docs/latest/api/\nRevisa lo que ya trae (archivos, red, pruebas, criptografía) antes de instalar un paquete: cada dependencia nueva hay que mantenerla.',
    go: 'Biblioteca estándar: https://pkg.go.dev/std\nEs muy completa: servidor web, JSON, pruebas, criptografía y plantillas vienen incluidos. Muchos servicios en Go no usan ninguna dependencia externa.',
    csharp: 'Explorador de API de .NET: https://learn.microsoft.com/es-es/dotnet/api/\nLa biblioteca de clases cubre archivos, red, JSON, colecciones y mucho más antes de recurrir a NuGet.',
    ruby: 'Biblioteca estándar: https://docs.ruby-lang.org/en/master/standard_library_md.html\nRevisa las clases incluidas (String, Array, Hash, File, Time) y las gemas que ya vienen con Ruby, como json o csv.',
    rust: 'Biblioteca estándar: https://doc.rust-lang.org/std/\nEs pequeña a propósito: cubre colecciones, archivos, hilos y red básica. Para lo demás (JSON, fechas, web) se usan paquetes muy establecidos.',
    kotlin: 'Biblioteca estándar: https://kotlinlang.org/api/core/kotlin-stdlib/\nAdemás puedes usar toda la biblioteca de Java. Las bibliotecas oficiales kotlinx añaden corrutinas, serialización y fechas.',
  },
  'Buscar paquetes de terceros': {
    javascript: 'Registro de npm: https://www.npmjs.com/\nAntes de instalar un paquete, mira cuándo se actualizó por última vez, cuántas descargas tiene y de cuántos otros paquetes depende.',
    go: 'Buscador de paquetes: https://pkg.go.dev/\nMuestra la documentación, la licencia y quién usa cada paquete. Añádelos con go get y fija su versión en go.mod.',
    csharp: 'Galería de NuGet: https://www.nuget.org/\nConsulta la compatibilidad con tu versión de .NET, la licencia y la frecuencia de actualización antes de añadir un paquete.',
    ruby: 'RubyGems: https://rubygems.org/\nThe Ruby Toolbox (https://www.ruby-toolbox.com/) compara gemas por categoría y muestra cuáles siguen en mantenimiento.',
    rust: 'Registro de paquetes: https://crates.io/\nLa documentación de todos ellos se publica sola en https://docs.rs/. Revisa descargas, mantenimiento y dependencias antes de añadir uno.',
    kotlin: 'Maven Central: https://central.sonatype.com/\nSirve cualquier biblioteca de Java. Para las que están hechas pensando en Kotlin, consulta https://klibs.io/.',
  },
  'Aprender con ejemplos y comunidades': {
    javascript: 'The Modern JavaScript Tutorial en español: https://es.javascript.info/\nAprende Node.js (sitio oficial): https://nodejs.org/es/learn\nExpress, el framework web más usado: https://expressjs.com/es/',
    go: 'Go con ejemplos: https://gobyexample.com/\nUn recorrido por Go: https://go.dev/tour/\nBlog oficial: https://go.dev/blog/',
    csharp: 'Aprende C# (sitio oficial): https://dotnet.microsoft.com/es-es/learn/csharp\nMicrosoft Learn, con rutas guiadas: https://learn.microsoft.com/es-es/training/dotnet/',
    ruby: 'Ruby en 20 minutos: https://www.ruby-lang.org/es/documentation/quickstart/\nGuías de Ruby on Rails: https://guides.rubyonrails.org/\nComunidad: https://www.ruby-lang.org/es/community/',
    rust: 'Rustlings, ejercicios pequeños para practicar: https://github.com/rust-lang/rustlings\nComunidad y foros: https://www.rust-lang.org/es/community',
    kotlin: 'Kotlin Koans, ejercicios para practicar: https://kotlinlang.org/docs/koans.html\nKotlin con ejemplos: https://play.kotlinlang.org/byExample/overview\nComunidad: https://kotlinlang.org/community/',
  },
  'Ruta recomendada para continuar': {
    javascript: RUTA('Aprende un framework (Express o NestJS) y prueba TypeScript para añadir tipos.'),
    go: RUTA('Profundiza en goroutines y canales, y construye un servicio con net/http.'),
    csharp: RUTA('Aprende ASP.NET Core para la web y Entity Framework Core para bases de datos.'),
    ruby: RUTA('Aprende Ruby on Rails, el framework que hizo popular al lenguaje.'),
    rust: RUTA('Dedica tiempo a ownership y préstamos: es lo que más cuesta y lo que más diferencia a Rust.'),
    kotlin: RUTA('Aprende corrutinas y un framework como Ktor o Spring Boot.'),
  },
  'Para leer más': {
    javascript: 'Ruta de aprendizaje de backend con Node.js: https://roadmap.sh/nodejs',
    go: 'Aprender Go, recursos oficiales: https://go.dev/learn/',
    csharp: 'Ruta de aprendizaje de ASP.NET Core: https://roadmap.sh/aspnet-core',
    ruby: 'Recursos oficiales para aprender Ruby: https://www.ruby-lang.org/es/documentation/',
    rust: 'Aprender Rust, recursos oficiales: https://www.rust-lang.org/es/learn',
    kotlin: 'Kotlin para el lado del servidor: https://kotlinlang.org/docs/server-overview.html',
  },
}
