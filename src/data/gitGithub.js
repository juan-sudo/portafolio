// Ruta original de Git y GitHub basada en la documentación oficial:
// https://docs.github.com/es y https://git-scm.com/doc

const text = (title, git, note) => ({ title, git, ...(note && { note }) })
const code = (title, git, note) => ({ title, code: true, git, ...(note && { note }) })
const links = (title, entries) => ({
  title,
  git: entries.map(([label, url]) => `${label}: ${url}`).join('\n'),
})

const gitGithubLevels = [
  {
    title: 'Primeros pasos con Git y GitHub',
    topics: [
      text(
        '¿Qué son Git y GitHub?',
        `Git es un sistema distribuido de control de versiones que guarda la historia de cambios de un proyecto. GitHub es una plataforma para alojar repositorios Git y colaborar mediante issues, pull requests, revisiones y automatización. Git también puede usarse sin GitHub.`,
      ),
      text(
        'Repositorio, commit y árbol de trabajo',
        `Un repositorio contiene archivos y su historial. El árbol de trabajo es tu copia editable, el área de preparación reúne los cambios que irán al próximo commit y cada commit guarda una instantánea identificada por un hash junto a autoría y mensaje.`,
      ),
      code(
        'Instalar y comprobar Git',
        `$ git --version
git version 2.x

$ git config --global user.name "Tu Nombre"
$ git config --global user.email "tu-correo@example.com"`,
        'Configura un nombre y correo adecuados para tus commits. Git permite configuración por sistema, usuario y repositorio; la más específica tiene prioridad.',
      ),
      code(
        'Crear un repositorio',
        `$ mkdir mi-proyecto
$ cd mi-proyecto
$ git init
$ git status`,
        'git init crea un repositorio local en la carpeta actual. git status muestra la rama y el estado de archivos preparados, modificados o sin seguimiento.',
      ),
      code(
        'Clonar un repositorio existente',
        `$ git clone https://github.com/usuario/proyecto.git
$ cd proyecto
$ git status`,
        'git clone descarga el repositorio y su historial y configura normalmente un remoto llamado origin. También puedes clonar usando SSH si configuraste una clave.',
      ),
      links('Documentación oficial para empezar', [
        ['GitHub: empezar con Git', 'https://docs.github.com/es/get-started/using-git/about-git'],
        ['GitHub: configurar Git', 'https://docs.github.com/es/get-started/git-basics/set-up-git'],
        ['Libro Pro Git en español', 'https://git-scm.com/book/es/v2'],
      ]),
    ],
  },
  {
    title: 'Cambios, commits e historial',
    topics: [
      code(
        'Revisar el estado y las diferencias',
        `$ git status
$ git diff
$ git diff --staged`,
        'git diff muestra cambios no preparados; --staged compara el área de preparación con el último commit. Revisa el diff antes de guardar cambios.',
      ),
      code(
        'Preparar y guardar cambios',
        `$ git add README.md
$ git add src/
$ git commit -m "Añade documentación inicial"`,
        'git add prepara rutas concretas; git commit crea un nuevo punto en el historial con lo preparado. Prefiere commits pequeños que representen un cambio coherente.',
      ),
      code(
        'Escribir mensajes de commit útiles',
        `feat: añade búsqueda de productos
fix: corrige validación del formulario
docs: aclara instalación local`,
        'El mensaje debe describir el propósito del cambio. Convenciones como Conventional Commits son acuerdos del equipo, no un requisito de Git.',
      ),
      code(
        'Consultar el historial',
        `$ git log --oneline --decorate
$ git show HEAD
$ git log -- src/`,
        'git log recorre commits; git show presenta los cambios de un commit. Puedes limitar el historial por archivo, autor o rango.',
      ),
      code(
        'Ignorar archivos locales',
        `# .gitignore
node_modules/
.env
dist/
*.log`,
        '.gitignore evita que archivos que todavía no están versionados se muestren como candidatos. Si un archivo ya se sigue, añadirlo a .gitignore no lo elimina del historial ni del índice.',
      ),
      code(
        'Corregir el último commit con cuidado',
        `$ git add archivo-corregido.js
$ git commit --amend`,
        '--amend modifica el commit más reciente. Evítalo en commits ya compartidos salvo que el equipo coordine la reescritura de historia.',
      ),
    ],
  },
  {
    title: 'Ramas y trabajo paralelo',
    topics: [
      code(
        'Crear y cambiar de rama',
        `$ git switch -c feature/busqueda
# realiza cambios y crea commits
$ git switch main`,
        'Una rama es una referencia móvil a un commit. Crear ramas permite desarrollar cambios aislados sin alterar directamente la rama principal.',
      ),
      code(
        'Consultar y limpiar ramas',
        `$ git branch
$ git branch -a
$ git branch -d feature/busqueda`,
        'git branch muestra ramas locales; -a incluye referencias remotas. -d elimina una rama local ya integrada; usa -D solo cuando entiendas que forzará la eliminación.',
      ),
      code(
        'Integrar una rama con merge',
        `$ git switch main
$ git merge feature/busqueda`,
        'merge integra los cambios de otra rama y puede crear un commit de merge. Asegúrate de estar en la rama destino antes de ejecutar el comando.',
      ),
      code(
        'Reorganizar commits con rebase',
        `$ git switch feature/busqueda
$ git rebase main`,
        'rebase reaplica commits sobre otra base y crea nuevos identificadores. No reescribas historia compartida sin acuerdo; ante dudas, merge conserva la historia publicada.',
      ),
      text(
        'Resolver conflictos de merge',
        `Un conflicto ocurre cuando Git no puede combinar automáticamente cambios incompatibles. Abre cada archivo marcado, decide el contenido final, elimina los marcadores, prueba el resultado y ejecuta git add seguido de git commit o continúa la operación de rebase.`,
      ),
      code(
        'Deshacer una integración en curso',
        `$ git merge --abort
# o, si el conflicto ocurrió durante rebase:
$ git rebase --abort`,
        'Los comandos abort intentan regresar al estado anterior a la operación en curso. Comprueba el estado y guarda trabajo importante antes de iniciar integraciones complejas.',
      ),
    ],
  },
  {
    title: 'Remotos y sincronización',
    topics: [
      code(
        'Configurar y consultar remotos',
        `$ git remote -v
$ git remote add origin https://github.com/usuario/proyecto.git
$ git remote show origin`,
        'Un remoto es un nombre local asociado a una URL de otro repositorio. origin es un nombre convencional, no una palabra reservada.',
      ),
      code(
        'Publicar una rama',
        `$ git push -u origin feature/busqueda`,
        'push envía commits al remoto. -u configura la rama upstream para que futuros push y pull puedan omitir referencias explícitas.',
      ),
      code(
        'Obtener cambios y actualizar la rama',
        `$ git fetch origin
$ git switch main
$ git pull --ff-only origin main`,
        'fetch descarga referencias sin integrar cambios en tu rama. pull combina una descarga y una integración; --ff-only evita crear un merge automáticamente si no es posible avanzar en línea recta.',
      ),
      code(
        'Publicar cambios con SSH o HTTPS',
        `$ git remote set-url origin git@github.com:usuario/proyecto.git
# o usar una URL HTTPS`,
        'SSH requiere una clave pública registrada en GitHub; HTTPS puede autenticarse con los mecanismos admitidos por GitHub. Nunca guardes tokens en texto plano dentro de una URL compartida.',
      ),
      text(
        'Entender upstream y seguimiento remoto',
        `Las ramas remotas como origin/main son referencias locales al último estado conocido del servidor. No cambian hasta ejecutar fetch. Una rama upstream vincula tu rama local con otra remota para simplificar comparación y sincronización.`,
      ),
      text(
        'Resolver divergencias antes de publicar',
        `Si el remoto avanzó, trae sus cambios y decide si integrar con merge o rebase según las normas del equipo. Revisa el historial y los conflictos, ejecuta pruebas y evita force push sobre ramas compartidas.`,
      ),
    ],
  },
  {
    title: 'GitHub: repositorios y colaboración',
    topics: [
      text(
        'Crear un repositorio en GitHub',
        `Crea un repositorio desde GitHub y elige su visibilidad. Si ya tienes un proyecto local, evita inicializar ambos lados con historias incompatibles; agrega el remoto y publica tu rama inicial según la guía indicada por la plataforma.`,
      ),
      code(
        'Fork y colaboración',
        `$ git clone https://github.com/tu-usuario/proyecto.git
$ git remote add upstream https://github.com/organizacion/proyecto.git
$ git remote -v`,
        'Un fork es una copia de un repositorio en tu cuenta. upstream suele nombrar el repositorio original; los permisos de escritura dependen de la organización.',
      ),
      text(
        'Issues y plantillas',
        `Un issue permite describir errores, propuestas o tareas. Incluye contexto reproducible, resultado esperado y real, pasos y entorno. Las plantillas ayudan a reunir información consistente sin añadir datos sensibles.`,
      ),
      text(
        'Crear un pull request',
        `Un pull request propone integrar una rama en otra. Explica qué problema resuelve, cómo probarlo y qué riesgos tiene; enlaza issues relacionados y revisa archivos, pruebas y capturas relevantes antes de solicitar revisión.`,
      ),
      text(
        'Revisar cambios y conversar',
        `Una revisión de pull request comenta líneas concretas, identifica riesgos y acuerda cambios. Distingue bloqueos importantes de sugerencias, responde a observaciones con contexto y actualiza la rama hasta que las comprobaciones requeridas terminen.`,
      ),
      text(
        'Proteger ramas y definir CODEOWNERS',
        `Las reglas de protección pueden exigir revisiones, comprobaciones de estado y restricciones de actualización. CODEOWNERS asigna revisores por rutas; el equipo debe mantener sus patrones y permisos actualizados.`,
      ),
    ],
  },
  {
    title: 'Pull requests, versiones y trabajo en equipo',
    topics: [
      code(
        'Mantener una rama actualizada',
        `$ git fetch origin
$ git switch feature/busqueda
$ git rebase origin/main`,
        'Este flujo reescribe commits locales para ponerlos sobre main actualizado. Si la rama ya fue publicada, coordina con colaboradores y actualiza el remoto de forma segura.',
      ),
      text(
        'Elegir estrategia de merge en GitHub',
        `GitHub puede ofrecer merge commit, squash y merge, o rebase y merge según la configuración del repositorio. Elige según la política de historial; revisa los efectos en commits y ramas antes de habilitar opciones.`,
      ),
      text(
        'Publicar una versión con tags y Releases',
        `Un tag identifica un punto del historial, por ejemplo una versión. GitHub Releases añade notas y puede adjuntar artefactos; confirma que el commit etiquetado corresponde a código probado y que la numeración sigue la política del proyecto.`,
      ),
      code(
        'Crear y publicar un tag',
        `$ git tag -a v1.0.0 -m "Versión 1.0.0"
$ git push origin v1.0.0
$ git show v1.0.0`,
        'Los tags anotados almacenan metadatos y mensaje. Para compartir el tag, publícalo explícitamente o utiliza git push --follow-tags conforme al flujo del equipo.',
      ),
      text(
        'Proyectos de GitHub y planificación',
        `GitHub Projects permite organizar issues y pull requests en vistas como tabla, tablero o roadmap. Automatiza estados si aporta claridad y mantén los elementos vinculados al trabajo real, no como una lista duplicada sin mantenimiento.`,
      ),
      text(
        'Contribuir a proyectos de código abierto',
        `Lee README, CONTRIBUTING, código de conducta y licencia. Busca issues existentes, sigue las convenciones, ejecuta pruebas, describe la motivación y respeta el proceso de revisión del proyecto antes de proponer cambios.`,
      ),
    ],
  },
  {
    title: 'GitHub Actions y automatización',
    topics: [
      text(
        'Qué es GitHub Actions',
        `GitHub Actions automatiza flujos ante eventos del repositorio, como push, pull_request o la creación de tags. Un workflow define jobs; cada job contiene steps que ejecutan acciones reutilizables o comandos.`,
      ),
      code(
        'Crear un workflow básico',
        `# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test -- --run`,
        'Guarda workflows YAML en .github/workflows. Ajusta comandos y versiones al proyecto; revisa y actualiza las acciones utilizadas.',
      ),
      text(
        'Jobs, steps y dependencias',
        `Los jobs pueden ejecutarse en paralelo o declarar needs para depender de otros. Los steps de un mismo job comparten entorno; usa artifacts o caches cuando debas pasar archivos o acelerar instalaciones entre ejecuciones.`,
      ),
      text(
        'Variables, secretos y permisos',
        `Guarda credenciales en GitHub Secrets o variables según su sensibilidad. Define permisos mínimos con permissions y evita imprimir secretos en logs. Considera el riesgo de workflows activados por contribuciones externas y no ejecutes código no confiable con credenciales privilegiadas.`,
      ),
      text(
        'Matrices, caché y artefactos',
        `Una matrix ejecuta un job con combinaciones de versiones o sistemas operativos. La caché acelera dependencias; los artifacts conservan resultados de una ejecución. Define claves y tiempos de retención apropiados y no almacenes secretos en ellos.`,
      ),
      text(
        'Depurar ejecuciones fallidas',
        `Inspecciona el job y step que falló, reproduce el comando localmente y revisa variables, permisos, rutas y diferencias entre entornos. Usa logs y artifacts como evidencia; evita desactivar una comprobación sin entender qué riesgo cubría.`,
      ),
    ],
  },
  {
    title: 'Seguridad y mantenimiento',
    topics: [
      text(
        'No subir secretos al repositorio',
        `No guardes claves API, contraseñas, tokens ni archivos .env con credenciales en commits. Añade los archivos locales a .gitignore y usa un gestor de secretos para despliegues. Si un secreto se publicó, revócalo y rótalo de inmediato: borrarlo del último commit no lo invalida.`,
      ),
      text(
        'Secret scanning y protección de push',
        `GitHub puede detectar credenciales expuestas y bloquear ciertos pushes según el plan y configuración. Estas protecciones complementan, pero no reemplazan, la prevención local, revisión de cambios y rotación de secretos comprometidos.`,
      ),
      text(
        'Dependencias y Dependabot',
        `Mantén dependencias actualizadas y revisa alertas de seguridad y pull requests automatizados. Evalúa cambios, compatibilidad y pruebas antes de fusionar; una actualización automática no garantiza que la aplicación esté libre de vulnerabilidades.`,
      ),
      code(
        'Revertir un cambio compartido',
        `$ git revert <hash-del-commit>`,
        'revert crea un commit nuevo que invierte cambios anteriores y suele ser adecuado para historia ya compartida. Revisa el diff y resuelve conflictos si el código posterior depende del cambio.',
      ),
      code(
        'Recuperar una referencia con reflog',
        `$ git reflog
$ git switch -c recuperar-trabajo <hash>`,
        'reflog registra movimientos recientes de referencias locales y puede ayudar a recuperar commits que ya no aparecen en una rama. No es un respaldo permanente ni reemplaza copias del repositorio.',
      ),
      text(
        'Licencias y políticas del repositorio',
        `Incluye una licencia que exprese cómo se puede usar el código; publicar un repositorio no concede automáticamente todos los permisos. Añade políticas de seguridad, contribución y soporte según el tipo de proyecto.`,
      ),
    ],
  },
  {
    title: 'Git avanzado y resolución de problemas',
    topics: [
      code(
        'Aplicar un commit con cherry-pick',
        `$ git switch release
$ git cherry-pick <hash-del-commit>`,
        'cherry-pick aplica los cambios de un commit existente como un commit nuevo en la rama actual. Puede generar conflictos y duplica la historia lógica si se usa sin coordinación.',
      ),
      code(
        'Encontrar el commit que introdujo un error',
        `        $ git bisect start
        $ git bisect bad
        $ git bisect good <hash-conocido>`,
        'bisect realiza una búsqueda binaria en el historial: prueba cada revisión indicada y marca good o bad hasta localizar el cambio sospechoso. Finaliza con git bisect reset.',
      ),
      text(
        'Reescribir commits con interactive rebase',
        `git rebase -i permite reorganizar, combinar o editar commits locales. Reescribir cambia sus hashes; úsalo en ramas propias antes de compartir y conserva una referencia de recuperación si el cambio es delicado.`,
      ),
      code(
        'Limpiar cambios no preparados con seguridad',
        `$ git restore archivo.js
$ git restore --staged archivo.js`,
        'La primera forma descarta cambios no preparados del archivo; la segunda lo saca del área de preparación. Estas acciones pueden perder trabajo: revisa git diff y git diff --staged antes de ejecutarlas.',
      ),
      text(
        'Entender reset y sus riesgos',
        `git reset mueve la referencia actual y puede cambiar el índice o el árbol de trabajo según la opción. --hard descarta cambios y commits de la rama actual; evita utilizarlo si no entiendes qué datos dejarán de estar referenciados.`,
      ),
      links('Referencia oficial y guías avanzadas', [
        ['Referencia de GitHub Docs', 'https://docs.github.com/es'],
        ['Conceptos básicos de GitHub', 'https://docs.github.com/es/get-started/quickstart'],
        ['Libro Pro Git: ramas', 'https://git-scm.com/book/es/v2/Ramificaciones-en-Git-Ramas-en-Git'],
      ]),
    ],
  },
  {
    title: 'Proyecto integrador: colaboración con pull request',
    topics: [
      text(
        'Preparar un repositorio con documentación',
        `Crea un repositorio con README, licencia elegida, .gitignore, instrucciones de desarrollo y una política mínima de contribución. Configura una rama principal protegida cuando las opciones de la cuenta lo permitan.`,
      ),
      text(
        'Trabajar en una rama de funcionalidad',
        `Crea una rama con nombre descriptivo, implementa una mejora pequeña, separa cambios por commits comprensibles y revisa diff y estado antes de publicar. Mantén fuera del repositorio credenciales y archivos generados.`,
      ),
      text(
        'Publicar y abrir un pull request',
        `Envía la rama a GitHub, abre un pull request con contexto, pasos de prueba y relación con el issue. Revisa los archivos y confirma que la rama destino sea la correcta antes de solicitar aprobación.`,
      ),
      text(
        'Añadir validaciones automáticas',
        `Crea un workflow de CI para instalar dependencias, ejecutar lint y pruebas. Revisa permisos, versiones de acciones y resultados de pull requests antes de configurar esas comprobaciones como requisitos de fusión.`,
      ),
      text(
        'Revisar, corregir y fusionar',
        `Responde a comentarios, publica correcciones y verifica que la CI pase. Integra con la estrategia elegida por el proyecto, elimina ramas terminadas y comprueba que la rama principal quede actualizada.`,
      ),
      text(
        'Etiquetar y documentar una versión',
        `Crea un tag anotado sobre el commit probado, redacta notas de versión y publica un Release si corresponde. Documenta cómo reportar problemas y cómo contribuir al siguiente cambio.`,
      ),
    ],
  },
]

export const gitGithubModule = {
  id: 'git',
  label: 'Git y GitHub',
  title: 'Controla versiones y colabora en proyectos.',
  description: 'Aprende Git desde commits, ramas y remotos hasta pull requests, GitHub Actions, seguridad, releases y recuperación avanzada. Basado en la documentación oficial; incluye un proyecto integrador y examen final generado por IA.',
  subtitle: 'Control de versiones · colaboración en GitHub',
  languages: [{ key: 'git', label: 'Git' }],
  levels: gitGithubLevels.map((level, index) => ({ ...level, level: index })),
  outputLabel: 'Resultado de ejemplo',
  comparison: {
    title: 'Git y GitHub',
    languages: ['Git local', 'GitHub'],
    rows: [
      { label: 'Propósito', values: ['Controlar versiones y ramas', 'Alojar repositorios y colaborar'] },
      { label: 'Requiere conexión', values: ['La mayoría de operaciones locales no', 'Para sincronizar y usar la plataforma sí'] },
      { label: 'Historial', values: ['Commits distribuidos entre repositorios', 'Copia remota con herramientas de colaboración'] },
      { label: 'Funciones', values: ['Ramas, commits, merge y tags', 'Pull requests, issues, Actions y Releases'] },
    ],
  },
}
