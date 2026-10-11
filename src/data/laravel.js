// Ruta de aprendizaje de Laravel 10, basada en la documentación de la versión 10.x.
// Los ejemplos muestran código real del framework; no se ejecutan en el intérprete PHP del navegador.

const laravelLevels = [
  {
    level: 0,
    title: "Primeros pasos",
    topics: [
      {
        title: "¿Qué es Laravel?",
        php: "Laravel es un framework web de PHP que organiza una aplicación alrededor de rutas, controladores, modelos y vistas. Incluye herramientas para base de datos, validación, autenticación, colas, caché y pruebas. Esta ruta sigue Laravel 10.x.",
      },
      {
        title: "¿Por qué usar Laravel?",
        php: "Laravel ofrece una estructura para que puedas concentrarte en tu aplicación: inyección de dependencias, acceso expresivo a bases de datos, colas, tareas programadas y herramientas de pruebas.\n\nEs progresivo: puedes empezar con rutas y vistas, y luego incorporar funcionalidades más avanzadas. También puede escalar con cachés compartidas, Redis y varios servidores.",
      },
      {
        title: "Requisitos de Laravel 10",
        php: "Laravel 10 requiere PHP 8.1 o posterior y Composer. También necesitarás extensiones de PHP según los paquetes que instales y una base de datos, por ejemplo SQLite, MySQL o PostgreSQL.\n\nLaravel 10 ya no recibe correcciones de seguridad desde el 4 de febrero de 2025. Aprende esta versión con su documentación, pero para proyectos nuevos elige una versión que todavía tenga soporte.",
        note: "Fuente de versión y fechas de soporte: https://laravel-docs.com/es/docs/10.x/releases",
      },
      {
        title: "Crear un proyecto con Composer",
        code: true,
        fixed: ["php"],
        php: "$ composer create-project \"laravel/laravel:^10.0\" mi-tienda\n$ cd mi-tienda\n$ php artisan --version\nLaravel Framework 10.x",
        note: "Composer descarga el esqueleto y las dependencias. Laravel 10 ya no recibe correcciones de seguridad; para proyectos nuevos usa una versión con soporte vigente.",
      },
      {
        title: "Crear un proyecto con el instalador de Laravel",
        code: true,
        fixed: ["php"],
        php: "$ composer global require laravel/installer\n$ laravel new mi-tienda\n$ cd mi-tienda\n$ php artisan serve",
        note: "El instalador global facilita crear proyectos nuevos. Para fijar exactamente Laravel 10, usa create-project con la restricción ^10.0.",
      },
      {
        title: "Starter kits para empezar con autenticación",
        php: "Los starter kits oficiales proporcionan scaffolding para autenticación y frontend. Son una alternativa a construir desde cero pantallas como inicio de sesión y registro.\n\nRevisa qué opciones son compatibles con la versión de Laravel que elegiste: https://laravel.com/docs/10.x/starter-kits",
      },
      {
        title: "Iniciar la aplicación local",
        code: true,
        fixed: ["php"],
        php: "$ cd mi-tienda\n$ php artisan serve\n\nINFO  Server running on [http://127.0.0.1:8000].",
        note: "Abre http://localhost:8000 en el navegador. Este servidor es para desarrollo local, no para publicar la aplicación en producción.",
      },
      {
        title: "Revisar la configuración inicial",
        code: true,
        fixed: ["php"],
        php: "config/\n├── app.php       ← nombre, zona horaria, idioma y opciones generales\n├── database.php  ← conexiones de base de datos\n└── ...           ← configuración de otros servicios",
        note: "Laravel requiere poca configuración para comenzar. Revisa app.php y ajusta la zona horaria y el idioma para tu aplicación.",
      },
      {
        title: "Configurar el entorno con .env",
        code: true,
        fixed: ["php"],
        php: "# .env: valores propios de tu entorno, no del código compartido\nAPP_ENV=local\nAPP_DEBUG=true\nAPP_URL=http://localhost\n\n# No publiques contraseñas, tokens ni claves reales.",
        note: "El archivo .env no debe versionarse. Cada desarrollador y servidor puede necesitar credenciales diferentes; protege especialmente cualquier copia de seguridad de este archivo.",
      },
      {
        title: "Configurar una base de datos MySQL",
        code: true,
        fixed: ["php"],
        php: "# En una instalación nueva, el ejemplo de Laravel 10 usa MySQL.\nDB_CONNECTION=mysql\nDB_HOST=127.0.0.1\nDB_PORT=3306\nDB_DATABASE=mi_tienda\nDB_USERNAME=usuario\nDB_PASSWORD=contraseña",
        note: "Crea la base de datos y configura credenciales válidas para tu entorno. No uses contraseñas de ejemplo en un servidor real.",
      },
      {
        title: "Usar SQLite como alternativa local",
        code: true,
        fixed: ["php"],
        php: "# En .env, conserva la conexión SQLite y elimina o comenta\n# las demás variables DB_* de MySQL.\nDB_CONNECTION=sqlite\n\n$ php artisan migrate",
        note: "Laravel puede crear database/database.sqlite al ejecutar la migración si el archivo todavía no existe.",
      },
      {
        title: "Ejecutar las migraciones iniciales",
        code: true,
        fixed: ["php"],
        php: "$ php artisan migrate\n\nINFO  Running migrations.",
        note: "Las migraciones crean las tablas que necesita la aplicación. Asegúrate de que la base de datos configurada esté disponible.",
      },
      {
        title: "Servir Laravel desde el directorio correcto",
        php: "El servidor web debe apuntar a la carpeta public/ del proyecto Laravel. No publiques la raíz del repositorio ni coloques la aplicación dentro de un subdirectorio del directorio web: podrías exponer .env, código y otros archivos sensibles.",
      },
      {
        title: "¿Qué es Laravel Sail?",
        php: "Sail es una interfaz ligera para desarrollar con Laravel usando Docker. Los contenedores proporcionan servicios de desarrollo como PHP, una base de datos y Redis sin tener que instalar cada uno directamente en tu sistema.\n\nNecesitas Docker Desktop o Docker Compose. La configuración puede personalizarse en docker-compose.yml.",
      },
      {
        title: "Instalar Sail en macOS",
        code: true,
        fixed: ["php"],
        php: "# Con Docker Desktop instalado:\n$ curl -s \"https://laravel.build/mi-tienda\" | bash\n$ cd mi-tienda\n$ ./vendor/bin/sail up\n\n# Abre http://localhost",
        note: "El comando de la guía crea el proyecto en el directorio actual y construye contenedores. Ejecuta scripts remotos solo si confías en la fuente y entiendes qué harán.",
      },
      {
        title: "Instalar Sail en Windows con WSL2",
        code: true,
        fixed: ["php"],
        php: "# 1. Instala Docker Desktop y habilita la integración con WSL2.\n# 2. Abre Windows Terminal en una distribución Linux de WSL2.\n$ curl -s https://laravel.build/mi-tienda | bash\n$ cd mi-tienda\n$ ./vendor/bin/sail up\n\n# La aplicación queda disponible en http://localhost",
        note: "Sail se ejecuta dentro del terminal Linux de WSL2, no desde PowerShell o CMD. Para editar los archivos en WSL, la guía recomienda VS Code con Remote Development.",
      },
      {
        title: "Editar el proyecto dentro de WSL2",
        code: true,
        fixed: ["php"],
        php: "# Desde Windows Terminal, en la raíz del proyecto dentro de WSL:\n$ code .",
        note: "Instala Visual Studio Code y la extensión Remote Development; abre el proyecto desde el entorno WSL para trabajar directamente con sus archivos.",
      },
      {
        title: "Instalar Sail en Linux",
        code: true,
        fixed: ["php"],
        php: "# Con Docker Compose instalado:\n$ docker context use default  # si usas Docker Desktop para Linux\n$ curl -s https://laravel.build/mi-tienda | bash\n$ cd mi-tienda\n$ ./vendor/bin/sail up\n\n# Abre http://localhost",
        note: "Omite docker context use default si no usas Docker Desktop para Linux.",
      },
      {
        title: "Elegir servicios al crear el proyecto Sail",
        code: true,
        fixed: ["php"],
        php: "# Seleccionar servicios en docker-compose.yml:\n$ curl -s \"https://laravel.build/mi-tienda?with=mysql,redis\" | bash\n\n# La guía lista: mysql, pgsql, mariadb, redis,\n# memcached, meilisearch, typesense, minio,\n# selenium y mailpit.",
        note: "Si no indicas servicios, la configuración predeterminada incluye MySQL, Redis, Meilisearch, Mailpit y Selenium. Evita iniciar servicios que tu proyecto no necesite.",
      },
      {
        title: "Crear un Devcontainer con Sail",
        code: true,
        fixed: ["php"],
        php: "$ curl -s \"https://laravel.build/mi-tienda?with=mysql,redis&devcontainer\" | bash",
        note: "La opción devcontainer agrega una configuración base de contenedor de desarrollo. Consulta la guía Sail para personalizarla.",
      },
      {
        title: "Elegir un IDE para Laravel",
        php: "Puedes desarrollar Laravel con el editor que prefieras. La guía destaca PhpStorm por su soporte para Laravel y el ecosistema, y Laravel Idea como plugin comunitario con generación de código y autocompletado para Eloquent y validación.\n\nPhpStorm: https://www.jetbrains.com/phpstorm/laravel/\nLaravel Idea: https://laravel-idea.com/",
      },
      {
        title: "Conectar agentes de IA con Laravel Boost",
        php: "Laravel Boost ofrece herramientas y documentación del proyecto a agentes de codificación compatibles. La guía 10.x indica que puede instalarse en aplicaciones Laravel 10, 11 y 12 con PHP 8.1 o superior.",
      },
      {
        title: "Instalar Laravel Boost",
        code: true,
        fixed: ["php"],
        php: "$ composer require laravel/boost --dev\n$ php artisan boost:install",
        note: "El instalador interactivo detecta IDE y agentes compatibles y permite elegir opciones. Comprueba la documentación vigente de Boost antes de instalarlo en proyectos existentes.",
      },
      {
        title: "Elegir cómo construir con Laravel",
        php: "Laravel full stack: el servidor gestiona rutas y vistas con Blade o una interfaz híbrida como Inertia. Para aprender este enfoque, sigue con routing, vistas, Blade, Eloquent, frontend y Vite.\n\nLaravel como backend API: Laravel entrega datos a una aplicación web JavaScript o móvil; consulta routing, Eloquent y Laravel Sanctum para autenticación.",
      },
      {
        title: "Bootcamp y próximos pasos",
        php: "Bootcamp oficial, recorrido práctico: https://bootcamp.laravel.com\nRouting: https://laravel.com/docs/10.x/routing\nVistas: https://laravel.com/docs/10.x/views\nBlade: https://laravel.com/docs/10.x/blade\nEloquent: https://laravel.com/docs/10.x/eloquent\nFrontend y Vite: https://laravel.com/docs/10.x/vite\nSanctum: https://laravel.com/docs/10.x/sanctum",
      },
      {
        title: "Conocer la estructura del proyecto",
        code: true,
        fixed: ["php"],
        php: "app/                 ← modelos, controladores y lógica de la aplicación\n routes/web.php       ← rutas para páginas web\n routes/api.php       ← rutas de API\n resources/views/     ← plantillas Blade\n database/migrations/ ← cambios versionados del esquema\n tests/               ← pruebas\n .env                 ← configuración local y secretos (no se publica)",
      },
      {
        title: "Artisan y servidor local",
        code: true,
        fixed: ["php"],
        php: "$ php artisan list\n$ php artisan serve\n\nINFO  Server running on [http://127.0.0.1:8000].\n\n$ php artisan make:controller ProductoController",
        note: "Artisan es la interfaz de línea de comandos de Laravel. El servidor de desarrollo no sustituye a la configuración de producción.",
      },
      {
        title: "Configuración y archivo .env",
        code: true,
        fixed: ["php"],
        php: "APP_NAME=\"Mi tienda\"\nAPP_ENV=local\nAPP_DEBUG=true\nAPP_URL=http://localhost\n\n# La configuración inicial de Laravel 10 usa MySQL.\nDB_CONNECTION=mysql\nDB_HOST=127.0.0.1\nDB_PORT=3306\nDB_DATABASE=mi_tienda\nDB_USERNAME=usuario\nDB_PASSWORD=contraseña\n\n# También puedes elegir SQLite, PostgreSQL u otro driver compatible.",
        note: "No subas credenciales ni claves reales al repositorio. En producción, usa APP_DEBUG=false.",
      },
      {
        title: "Documentación de Laravel 10",
        php: "Instalación 10.x en español: https://laravel-docs.com/es/docs/10.x/installation\nVersionado y soporte: https://laravel-docs.com/es/docs/10.x/releases\nDocumentación oficial 10.x: https://laravel.com/docs/10.x",
      },
    ],
  },
  {
    level: 1,
    title: "Routing en Laravel 10",
    topics: [
      {
        title: "Tu primera ruta",
        code: true,
        fixed: ["php"],
        php: "// routes/web.php\nuse Illuminate\\Support\\Facades\\Route;\n\nRoute::get('/', function () {\n    return '¡Hola desde Laravel!';\n});",
      },
      {
        title: "Métodos HTTP y nombres de ruta",
        code: true,
        fixed: ["php"],
        php: "Route::get('/productos', [ProductoController::class, 'index'])\n    ->name('productos.index');\n\nRoute::post('/productos', [ProductoController::class, 'store'])\n    ->name('productos.store');\n\nRoute::put('/productos/{producto}', [ProductoController::class, 'update']);\nRoute::patch('/productos/{producto}', [ProductoController::class, 'update']);\nRoute::delete('/productos/{producto}', [ProductoController::class, 'destroy']);\nRoute::options('/productos', [ProductoController::class, 'options']);\n\nRoute::match(['get', 'post'], '/buscar', [BusquedaController::class, 'buscar']);\nRoute::any('/webhook-prueba', [WebhookController::class, 'handle']);",
        note: "GET suele consultar; POST crea; PUT/PATCH actualiza; DELETE elimina. Prefiere verbos específicos: any() acepta todos los métodos HTTP. Las rutas web que modifican datos deben protegerse con CSRF.",
      },
      {
        title: "Parámetros de ruta y route model binding",
        code: true,
        fixed: ["php"],
        php: "use App\\Models\\Producto;\nuse Illuminate\\Support\\Facades\\Route;\n\nRoute::get('/productos/{producto}', function (Producto $producto) {\n    return $producto->nombre;\n});",
        note: "Laravel busca el modelo por su clave primaria. Si no existe, responde con 404.",
      },
      {
        title: "Crear un controlador",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:controller ProductoController --resource\n\n// routes/web.php\nRoute::resource('productos', ProductoController::class);",
        note: "Una ruta resource registra las acciones habituales de listar, mostrar, crear, guardar, editar, actualizar y eliminar.",
      },
      {
        title: "Responder con vistas y redirecciones",
        code: true,
        fixed: ["php"],
        php: "public function index()\n{\n    return view('productos.index', [\n        'productos' => Producto::latest()->get(),\n    ]);\n}\n\npublic function store(Request $request)\n{\n    // Validación y guardado...\n    return redirect()->route('productos.index')\n        ->with('estado', 'Producto creado.');\n}",
      },
      {
        title: "Leer datos de la petición",
        code: true,
        fixed: ["php"],
        php: "public function buscar(Request $request)\n{\n    $termino = $request->query('q', '');\n    $pagina = $request->integer('pagina', 1);\n\n    return response()->json([\n        'termino' => $termino,\n        'pagina' => $pagina,\n    ]);\n}",
      },
      {
        title: "Archivos de rutas web y API",
        php: "routes/web.php define rutas con middleware web, como sesión y protección CSRF.\n\nroutes/api.php define rutas sin estado para APIs; Laravel aplica el prefijo /api automáticamente por defecto. Ajusta el prefijo y los grupos en RouteServiceProvider si tu aplicación lo necesita.",
        note: "No agregues /api manualmente a cada URI si ya se aplica el prefijo predeterminado.",
      },
      {
        title: "Crear rutas de vista y redirección",
        code: true,
        fixed: ["php"],
        php: "Route::view('/acerca', 'acerca');\nRoute::view('/bienvenida/{nombre}', 'bienvenida', ['equipo' => 'Web']);\n\nRoute::redirect('/tienda', '/productos');\nRoute::permanentRedirect('/antigua-tienda', '/productos');",
        note: "Route::view es un atajo para mostrar una plantilla. Route::redirect responde por defecto con 302; permanentRedirect usa 301.",
      },
      {
        title: "Inspeccionar las rutas registradas",
        code: true,
        fixed: ["php"],
        php: "$ php artisan route:list\n$ php artisan route:list -v\n$ php artisan route:list -vv\n$ php artisan route:list --path=api",
        note: "-v muestra middleware; -vv expande los grupos de middleware. --path filtra por URI, y --except-vendor o --only-vendor permiten filtrar rutas de paquetes.",
      },
      {
        title: "Parámetros obligatorios y orden de argumentos",
        code: true,
        fixed: ["php"],
        php: "Route::get('/usuarios/{usuario}/pedidos/{pedido}', function (\n    Request $request,\n    string $usuario,\n    string $pedido,\n) {\n    return [$usuario, $pedido];\n});",
        note: "Los parámetros de URI van entre llaves. Laravel los pasa a la acción siguiendo su orden en la ruta; si también inyectas dependencias, declara primero las dependencias y luego los parámetros de ruta.",
      },
      {
        title: "Parámetros de ruta opcionales",
        code: true,
        fixed: ["php"],
        php: "Route::get('/catalogo/{categoria?}', function (?string $categoria = null) {\n    return $categoria ?? 'todas';\n});",
        note: "El parámetro opcional usa ? dentro de las llaves y necesita un valor predeterminado en la función.",
      },
      {
        title: "Restringir parámetros de ruta",
        code: true,
        fixed: ["php"],
        php: "Route::get('/usuarios/{id}', [UsuarioController::class, 'show'])\n    ->whereNumber('id');\n\nRoute::get('/categorias/{slug}', [CategoriaController::class, 'show'])\n    ->where('slug', '[a-z0-9-]+');\n\nRoute::get('/posts/{post}', [PostController::class, 'show'])\n    ->whereUuid('post');",
        note: "where() acepta expresiones regulares; helpers como whereNumber(), whereAlpha(), whereAlphaNumeric(), whereUuid() y whereUlid() cubren formatos comunes. Si no coincide, la ruta devuelve 404.",
      },
      {
        title: "Definir restricciones globales",
        code: true,
        fixed: ["php"],
        php: "// En RouteServiceProvider::boot()\nRoute::pattern('id', '[0-9]+');\n\n// El patrón se aplica a todas las rutas con {id}.\nRoute::get('/usuarios/{id}', [UsuarioController::class, 'show']);",
        note: "Usa patrones globales para reglas que deben ser uniformes en toda la aplicación.",
      },
      {
        title: "Parámetros que contienen barras",
        code: true,
        fixed: ["php"],
        php: "Route::get('/buscar/{termino}', function (string $termino) {\n    return $termino;\n})->where('termino', '.*');",
        note: "Laravel excluye / de los parámetros de ruta por defecto. Para aceptar una barra codificada, permite explícitamente el patrón y coloca el parámetro al final de la ruta.",
      },
      {
        title: "Generar URLs con rutas nombradas",
        code: true,
        fixed: ["php"],
        php: "Route::get('/usuarios/{usuario}/perfil', [PerfilController::class, 'show'])\n    ->name('usuarios.perfil');\n\n$url = route('usuarios.perfil', ['usuario' => 42]);\nreturn to_route('usuarios.perfil', ['usuario' => 42]);",
        note: "Los nombres de ruta deben ser únicos. Los parámetros adicionales no usados en el URI se agregan a la query string.",
      },
      {
        title: "Generar una URL arbitraria",
        code: true,
        fixed: ["php"],
        php: `$url = url('/productos/42');

// El generador toma el esquema y host de la solicitud actual.
// Ejemplo: https://tienda.example/productos/42`,
        note: "El helper url() sirve para construir URLs de la aplicación a partir de una ruta. Para enlaces a rutas registradas, prefiere route() porque desacopla el código de la URI concreta.",
      },
      {
        title: "Consultar la URL actual o anterior",
        code: true,
        fixed: ["php"],
        php: `$actual = url()->current(); // sin query string
$completa = url()->full();  // con query string
$anterior = url()->previous();

// También se puede usar la fachada URL:
use Illuminate\\Support\\Facades\\URL;
$actual = URL::current();`,
        note: "Estos helpers son útiles en controladores, middleware y vistas que necesitan conocer la URL asociada a la solicitud. Trata la URL anterior como dato de navegación, no como autorización.",
      },
      {
        title: "Parámetros y modelos en rutas nombradas",
        code: true,
        fixed: ["php"],
        php: `Route::get('/posts/{post}', [PostController::class, 'show'])
    ->name('posts.show');

$url = route('posts.show', ['post' => $post]);
$buscar = route('posts.show', [
    'post' => $post,
    'q' => 'Laravel',
]);
// El segundo valor incluye ?q=Laravel`,
        note: "Pasa parámetros por nombre para que coincidan con los marcadores de la ruta. Los modelos Eloquent aportan automáticamente su clave de ruta; los parámetros adicionales se convierten en query string.",
      },
      {
        title: "Generar URLs de acciones de controladores",
        code: true,
        fixed: ["php"],
        php: `use App\\Http\\Controllers\\HomeController;
use App\\Http\\Controllers\\UsuarioController;

$inicio = action([HomeController::class, 'index']);
$perfil = action([UsuarioController::class, 'show'], ['usuario' => 42]);`,
        note: "action() genera una URL a partir de una acción de controlador y sus parámetros de ruta. Para navegación ordinaria, una ruta nombrada suele ser más estable y explícita.",
      },
      {
        title: "Crear URLs firmadas",
        code: true,
        fixed: ["php"],
        php: `use Illuminate\\Support\\Facades\\URL;

$enlace = URL::signedRoute('invitaciones.aceptar', [
    'invitacion' => $invitacion->id,
]);

$enlaceTemporal = URL::temporarySignedRoute(
    'descargas.publicas',
    now()->addMinutes(30),
    ['archivo' => $archivo->id],
);`,
        note: "Laravel agrega una firma que permite detectar modificaciones de la URL. La firma no reemplaza autenticación ni autorización: valida también que la persona pueda realizar la acción sobre el recurso.",
      },
      {
        title: "Validar una URL firmada",
        code: true,
        fixed: ["php"],
        php: `use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Route;

Route::get('/invitaciones/{invitacion}/aceptar', function (
    Request $request,
    string $invitacion,
) {
    abort_unless($request->hasValidSignature(), 403);
    // Procesar la invitación...
})->name('invitaciones.aceptar');

// Alternativa: middleware de Laravel
Route::get('/descargas/{archivo}', [DescargaController::class, 'show'])
    ->name('descargas.publicas')
    ->middleware('signed');`,
        note: "La verificación detecta firmas inválidas o vencidas para enlaces temporales. El middleware signed devuelve 403 si la firma no es válida; si generaste una firma relativa, configura la validación relativa correspondiente.",
      },
      {
        title: "Parámetros de consulta y firmas",
        code: true,
        fixed: ["php"],
        php: `$valida = $request->hasValidSignatureWhileIgnoring([
    'pagina',
    'orden',
]);`,
        note: "Ignorar parámetros permite que cualquier persona los modifique sin invalidar la firma. Limítalo a datos de presentación no sensibles; nunca ignores parámetros que cambien el recurso o la acción autorizada.",
      },
      {
        title: "Definir valores predeterminados para URLs",
        code: true,
        fixed: ["php"],
        php: `// En un middleware que ya determinó el idioma de la solicitud:
use Illuminate\\Support\\Facades\\URL;

URL::defaults(['locale' => $request->user()->locale]);

// Una ruta puede incluir el parámetro {locale}:
Route::get('/{locale}/articulos', [ArticuloController::class, 'index'])
    ->name('articulos.index');

// Al generar el enlace, Laravel usa el valor predeterminado:
$url = route('articulos.index');`,
        note: "URL::defaults evita repetir parámetros comunes al generar rutas. Si el middleware también depende de route model binding, debe ejecutarse antes de SubstituteBindings según la prioridad de middleware.",
      },
      {
        title: "Documentación de URLs",
        php: "URLs de Laravel 10 en español: https://laravel-docs.com/es/docs/10.x/urls\nRouting: https://laravel-docs.com/es/docs/10.x/routing\nMiddleware: https://laravel-docs.com/es/docs/10.x/middleware",
      },
      {
        title: "Consultar la ruta actual",
        code: true,
        fixed: ["php"],
        php: "$ruta = Route::current();\n$nombre = Route::currentRouteName();\n$accion = Route::currentRouteAction();\n\nif (Route::current()->named('usuarios.perfil')) {\n    // La solicitud coincide con esa ruta.\n}",
        note: "Puedes inspeccionar la ruta actual desde middleware o código que necesite conocer el nombre o la acción que atiende la solicitud.",
      },
      {
        title: "Agrupar rutas con middleware y controladores",
        code: true,
        fixed: ["php"],
        php: "Route::middleware(['auth', 'verified'])\n    ->controller(AdminUsuarioController::class)\n    ->group(function () {\n        Route::get('/admin/usuarios', 'index');\n        Route::delete('/admin/usuarios/{usuario}', 'destroy');\n    });",
        note: "Los atributos del grupo se aplican a sus rutas. Los middleware se ejecutan en el orden indicado.",
      },
      {
        title: "Agrupar por prefijo de URI y nombre",
        code: true,
        fixed: ["php"],
        php: "Route::prefix('admin')\n    ->name('admin.')\n    ->group(function () {\n        Route::get('/usuarios', [AdminUsuarioController::class, 'index'])\n            ->name('usuarios.index');\n    });\n\n// URI: /admin/usuarios\n// Nombre: admin.usuarios.index",
        note: "prefix() agrega un segmento URI y name() antepone literalmente el prefijo de nombre; incluye el punto final para separar los nombres.",
      },
      {
        title: "Enrutamiento por subdominio",
        code: true,
        fixed: ["php"],
        php: "Route::domain('{cuenta}.example.com')->group(function () {\n    Route::get('/usuarios/{id}', function (string $cuenta, string $id) {\n        return [$cuenta, $id];\n    });\n});",
        note: "Los parámetros del subdominio se inyectan junto con los parámetros URI. Registra las rutas de subdominio antes que rutas del dominio raíz con paths coincidentes.",
      },
      {
        title: "Vinculación implícita de modelos",
        code: true,
        fixed: ["php"],
        php: "use App\\Models\\Post;\n\nRoute::get('/posts/{post}', function (Post $post) {\n    return $post;\n});",
        note: "Cuando el nombre del parámetro y la variable tipada coinciden, Laravel busca automáticamente el modelo. Si no existe, responde 404.",
      },
      {
        title: "Usar slugs y relaciones en model binding",
        code: true,
        fixed: ["php"],
        php: "Route::get('/posts/{post:slug}', function (Post $post) {\n    return $post;\n});\n\nRoute::get('/usuarios/{user}/posts/{post:slug}', function (User $user, Post $post) {\n    return $post;\n});",
        note: "Puedes elegir una clave como slug. En rutas anidadas con clave personalizada, Laravel limita el modelo hijo usando la relación esperada en el modelo padre; también puedes activar scopeBindings() explícitamente.",
      },
      {
        title: "Model binding avanzado y excepciones",
        code: true,
        fixed: ["php"],
        php: "Route::get('/usuarios/{user}/posts/{post}', [PostController::class, 'show'])\n    ->scopeBindings();\n\nRoute::get('/posts/{post}', function (Post $post) {\n    return $post;\n})->withTrashed();\n\nRoute::get('/lugares/{lugar:slug}', [LugarController::class, 'show'])\n    ->missing(function (Request $request) {\n        return to_route('lugares.index');\n    });",
        note: "scopeBindings() exige que un modelo hijo pertenezca al padre; withTrashed() permite resolver modelos con borrado suave; missing() personaliza qué ocurre cuando no se encuentra el modelo.",
      },
      {
        title: "Vinculación explícita y personalizada",
        code: true,
        fixed: ["php"],
        php: "// RouteServiceProvider::boot(): elige la opción que necesites.\n\n// Asociar el parámetro con un modelo:\nRoute::model('usuario', User::class);\n\n// O definir una lógica de búsqueda propia:\nRoute::bind('usuario', function (string $valor) {\n    return User::where('name', $valor)->firstOrFail();\n});",
        note: "Route::model asocia un parámetro con una clase Eloquent; Route::bind permite definir la consulta. También puedes personalizar resolveRouteBinding() en el modelo.",
      },
      {
        title: "Crear una ruta fallback",
        code: true,
        fixed: ["php"],
        php: "Route::fallback(function () {\n    return response()->view('errors.404', [], 404);\n});",
        note: "La ruta fallback atiende solicitudes sin coincidencia y debe registrarse al final de las rutas de la aplicación.",
      },
      {
        title: "Definir limitadores de solicitudes",
        code: true,
        fixed: ["php"],
        php: "// RouteServiceProvider.php\nuse Illuminate\\Cache\\RateLimiting\\Limit;\nuse Illuminate\\Http\\Request;\nuse Illuminate\\Support\\Facades\\RateLimiter;\n\n// En boot():\nRateLimiter::for('inicio-sesion', function (Request $request) {\n    return [\n        Limit::perMinute(500),\n        Limit::perMinute(3)->by($request->input('email')),\n    ];\n});",
        note: "Un limitador puede variar según la solicitud y puede devolver varios límites. Al excederlos, Laravel responde HTTP 429.",
      },
      {
        title: "Aplicar limitación de tasa a rutas",
        code: true,
        fixed: ["php"],
        php: "Route::post('/iniciar-sesion', [SesionController::class, 'store'])\n    ->middleware('throttle:inicio-sesion');\n\nRoute::middleware('throttle:api')->group(function () {\n    Route::get('/reportes', [ReporteController::class, 'index']);\n});",
        note: "Usa el middleware throttle para asociar el nombre del limitador a una ruta o grupo. Segmenta los límites por usuario o IP según el caso.",
      },
      {
        title: "CSRF y simulación de método HTML",
        code: true,
        fixed: ["php"],
        php: "<form method=\"POST\" action=\"{{ route('productos.update', $producto) }}\">\n    @method('PATCH')\n    @csrf\n    <button type=\"submit\">Actualizar</button>\n</form>",
        note: "Los formularios HTML solo envían GET y POST: @method() simula PUT, PATCH o DELETE. Los formularios que modifican datos en rutas web deben incluir @csrf.",
      },
      {
        title: "Configurar CORS",
        php: "Laravel maneja automáticamente solicitudes OPTIONS de CORS mediante el middleware HandleCors. Ajusta orígenes, métodos y encabezados permitidos en config/cors.php según los clientes que deban acceder a tu API.",
        note: "Permite solo los orígenes necesarios; no abras el acceso a cualquier dominio sin una razón.",
      },
      {
        title: "Registrar rutas API de recursos",
        code: true,
        fixed: ["php"],
        php: `// routes/api.php
use App\\Http\\Controllers\\Api\\ProductoController;
use Illuminate\\Support\\Facades\\Route;

Route::apiResource('productos', ProductoController::class)
    ->only(['index', 'show', 'store']);

// Laravel aplica /api por defecto a las rutas de api.php.
// GET /api/productos y GET /api/productos/{producto}`,
        note: "apiResource registra las acciones habituales de una API y omite las vistas HTML create y edit. Elige solo las acciones que el cliente necesita; el prefijo API predeterminado se configura en RouteServiceProvider.",
      },
      {
        title: "Probar el comportamiento de una ruta",
        code: true,
        fixed: ["php"],
        php: `public function test_catalogo_muestra_productos(): void
{
    Producto::factory()->create(['nombre' => 'Teclado']);

    $this->get('/productos')
        ->assertOk()
        ->assertSee('Teclado');
}

public function test_producto_inexistente_responde_404(): void
{
    $this->get('/productos/999999')
        ->assertNotFound();
}`,
        note: "Las pruebas de feature verifican el recorrido completo por el router, middleware y controlador. Para rutas protegidas, crea el usuario y autentícalo con actingAs(); comprueba el estado HTTP y el contenido o redirección esperados.",
      },
      {
        title: "Usar rutas nombradas en pruebas",
        code: true,
        fixed: ["php"],
        php: `public function test_ruta_de_producto_responde(): void
{
    $producto = Producto::factory()->create();

    $this->get(route('productos.show', $producto))
        ->assertOk()
        ->assertSee($producto->nombre);
}`,
        note: "Generar la URL mediante route() evita acoplar la prueba a una URI escrita manualmente y confirma que el nombre de ruta está registrado. La factory debe crear un producto válido para tu modelo.",
      },
      {
        title: "Cachear rutas en producción",
        code: true,
        fixed: ["php"],
        php: "$ php artisan route:cache\n\n# Cuando cambies rutas y debas eliminar la caché:\n$ php artisan route:clear",
        note: "La caché acelera el registro de rutas. Genérala como parte del despliegue y vuelve a generarla después de cambiar las definiciones.",
      },
      {
        title: "Documentación completa de routing",
        php: "Routing de Laravel 10 en español: https://laravel-docs.com/es/docs/10.x/routing\nURLs: https://laravel-docs.com/es/docs/10.x/urls\nControladores: https://laravel-docs.com/es/docs/10.x/controllers\nMiddleware: https://laravel-docs.com/es/docs/10.x/middleware\nCSRF: https://laravel-docs.com/es/docs/10.x/csrf\nPruebas: https://laravel-docs.com/es/docs/10.x/testing\nContenedor: https://laravel-docs.com/es/docs/10.x/container",
      },
    ],
  },
  {
    level: 2,
    title: "Controladores en Laravel 10",
    topics: [
      {
        title: "¿Para qué sirven los controladores?",
        php: "Los controladores agrupan en clases la lógica que responde a solicitudes HTTP relacionadas. En lugar de concentrar muchas closures en los archivos de rutas, puedes organizar acciones como listar, crear y actualizar usuarios en UserController.\n\nLaravel guarda normalmente estas clases en app/Http/Controllers.",
      },
      {
        title: "Crear y conectar un controlador",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:controller UsuarioController\n\n// app/Http/Controllers/UsuarioController.php\nclass UsuarioController extends Controller\n{\n    public function show(string $id)\n    {\n        return User::findOrFail($id);\n    }\n}\n\n// routes/web.php\nRoute::get('/usuarios/{id}', [UsuarioController::class, 'show']);",
        note: "El router llama al método público cuando coincide la ruta y le pasa los parámetros de URI. Extender la clase base Controller es opcional, pero habilita helpers como middleware() y authorize().",
      },
      {
        title: "Devolver una vista desde el controlador",
        code: true,
        fixed: ["php"],
        php: "use App\\Models\\User;\nuse Illuminate\\View\\View;\n\npublic function show(string $id): View\n{\n    return view('usuarios.perfil', [\n        'user' => User::findOrFail($id),\n    ]);\n}",
        note: "Puedes entregar datos a Blade mediante un arreglo. Para registros inexistentes, findOrFail() produce una respuesta 404.",
      },
      {
        title: "Inyectar dependencias y modelos",
        code: true,
        fixed: ["php"],
        php: "use App\\Models\\User;\nuse Illuminate\\Http\\Request;\n\npublic function update(Request $request, User $user)\n{\n    $datos = $request->validate([\n        'name' => ['required', 'string', 'max:100'],\n    ]);\n\n    $user->update($datos);\n\n    return to_route('usuarios.show', $user);\n}",
        note: "El contenedor inyecta dependencias tipadas como Request. El route model binding puede resolver User desde el parámetro de ruta cuando el nombre coincide.",
      },
      {
        title: "Crear un controlador de acción única",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:controller ProvisionServer --invokable\n\nclass ProvisionServer extends Controller\n{\n    public function __invoke()\n    {\n        // Ejecutar una acción específica...\n    }\n}\n\nRoute::post('/servidores', ProvisionServer::class);",
        note: "Un controlador invocable contiene un único método __invoke y se registra pasando la clase directamente a la ruta.",
      },
      {
        title: "Aplicar middleware desde el controlador",
        code: true,
        fixed: ["php"],
        php: "class UsuarioController extends Controller\n{\n    public function __construct()\n    {\n        $this->middleware('auth');\n        $this->middleware('log')->only('index');\n        $this->middleware('verified')->except('store');\n    }\n}",
        note: "También puedes asignar middleware directamente a las rutas. En el controlador, only() y except() limitan las acciones alcanzadas.",
      },
      {
        title: "Generar un controlador de recursos",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:controller PhotoController --resource\n\n// routes/web.php\nRoute::resource('photos', PhotoController::class);",
        note: "Artisan crea métodos para las acciones CRUD convencionales y Route::resource registra sus rutas correspondientes.",
      },
      {
        title: "Acciones CRUD de un recurso",
        code: true,
        fixed: ["php"],
        php: "index   GET      /photos              // listar\ncreate  GET      /photos/create       // formulario de alta\nstore   POST     /photos              // guardar\nshow    GET      /photos/{photo}      // mostrar\nedit    GET      /photos/{photo}/edit // formulario de edición\nupdate  PUT/PATCH /photos/{photo}     // actualizar\ndestroy DELETE   /photos/{photo}      // eliminar",
        note: "Las rutas también reciben nombres como photos.index, photos.create, photos.store y photos.destroy. Usa php artisan route:list para revisar exactamente lo registrado.",
      },
      {
        title: "Controladores de recursos para API",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:controller Api/PhotoController --api\n\nRoute::apiResource('photos', PhotoController::class);\n\n// Registrar varios recursos a la vez:\nRoute::apiResources([\n    'photos' => PhotoController::class,\n    'posts' => PostController::class,\n]);",
        note: "apiResource excluye create y edit, que corresponden a formularios HTML. Para una aplicación API suelen ser acciones innecesarias.",
      },
      {
        title: "Generar controlador con modelo y Form Requests",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:controller PhotoController --model=Photo --resource --requests",
        note: "--model indica el modelo asociado; --requests genera solicitudes de formulario para validar store y update. Revisa las reglas generadas antes de usarlas.",
      },
      {
        title: "Limitar acciones de un controlador de recursos",
        code: true,
        fixed: ["php"],
        php: "Route::resource('photos', PhotoController::class)\n    ->only(['index', 'show']);\n\nRoute::resource('posts', PostController::class)\n    ->except(['create', 'edit']);",
        note: "Usa only() para permitir una lista explícita de acciones o except() para omitir algunas. Esto evita exponer rutas que la aplicación no necesita.",
      },
      {
        title: "Crear controladores de recursos anidados",
        code: true,
        fixed: ["php"],
        php: "Route::resource('photos.comments', PhotoCommentController::class);\n\n// Ejemplo de URI:\n/photos/{photo}/comments/{comment}",
        note: "La notación con punto registra las acciones de comentarios dentro del recurso foto. Combínala con model binding con ámbito para comprobar la relación entre padre e hijo.",
      },
      {
        title: "Usar anidamiento superficial",
        code: true,
        fixed: ["php"],
        php: "Route::resource('photos.comments', CommentController::class)\n    ->shallow();\n\n// Las rutas de colección conservan al padre:\n/photos/{photo}/comments\n\n// Las rutas para un comentario usan su identificador:\n/comments/{comment}",
        note: "shallow() evita repetir el identificador del padre en las rutas show, edit, update y destroy cuando el identificador del hijo ya es único.",
      },
      {
        title: "Personalizar parámetros y nombres de rutas",
        code: true,
        fixed: ["php"],
        php: "Route::resource('users', AdminUserController::class)\n    ->parameters(['users' => 'admin_user'])\n    ->names(['create' => 'users.build']);",
        note: "parameters() cambia el nombre del parámetro URI y names() permite personalizar nombres de acciones. Mantén los nombres únicos y coherentes.",
      },
      {
        title: "Model binding y modelos faltantes en recursos",
        code: true,
        fixed: ["php"],
        php: "Route::resource('photos', PhotoController::class)\n    ->missing(function (Request $request) {\n        return to_route('photos.index');\n    })\n    ->withTrashed(['show']);",
        note: "missing() personaliza la respuesta cuando no se encuentra un modelo enlazado. withTrashed() permite incluir modelos eliminados suavemente en las acciones indicadas.",
      },
      {
        title: "Documentación completa de controladores",
        php: "Controladores de Laravel 10 en español: https://laravel-docs.com/es/docs/10.x/controllers\nRouting: https://laravel-docs.com/es/docs/10.x/routing\nMiddleware: https://laravel-docs.com/es/docs/10.x/middleware\nValidación y Form Requests: https://laravel.com/docs/10.x/validation",
      },
    ],
  },
  {
    level: 3,
    title: "Requests HTTP en Laravel 10",
    topics: [
      {
        title: "¿Qué es Illuminate\\Http\\Request?",
        php: "La clase Request de Laravel encapsula la petición HTTP actual y te permite leer datos de la URL, formularios, JSON, cookies, archivos y cabeceras. Es la forma orientada a objetos de interactuar con lo que llega al servidor sin depender de variables globales como $_GET o $_POST.",
        note: "Documentación oficial: https://laravel-docs.com/es/docs/10.x/requests",
      },
      {
        title: "Inyectar la solicitud en un controlador",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Http\\Request;\n\npublic function guardar(Request $request)\n{\n    $nombre = $request->input('nombre');\n    $correo = $request->input('correo', 'anonimo@example.com');\n\n    return [$nombre, $correo];\n}\n\n// También puedes inyectarlo con el tipo Request en una acción del controlador.",
      },
      {
        title: "Leer query string, parámetros y JSON",
        code: true,
        fixed: ["php"],
        php: "$termino = $request->query('q');\n$pagina = $request->query('pagina', 1);\n\n$nombre = $request->input('nombre');\n$payload = $request->json()->all();\n\n// En una API REST, request->json() suele ser más claro que input() para payloads JSON.",
        note: "input() busca primero en los datos del body y luego en la query string. json() es más explícito cuando el cliente envía JSON.",
      },
      {
        title: "Ver rutas, cookies, cabeceras y archivos",
        code: true,
        fixed: ["php"],
        php: "$ruta = $request->path();\n$metodo = $request->method();\n$cookie = $request->cookie('theme', 'light');\n$token = $request->header('X-CSRF-TOKEN');\n$archivo = $request->file('avatar');\n\nif ($request->hasFile('avatar')) {\n    $archivo->store('avatars');\n}",
        note: "Usa hasFile() antes de trabajar con un archivo. Laravel gestiona la carga y la validación del archivo según tu configuración.",
      },
      {
        title: "Comprobar el tipo de solicitud",
        code: true,
        fixed: ["php"],
        php: "if ($request->isMethod('post')) {\n    // Acciones de creación.\n}\n\nif ($request->expectsJson()) {\n    return response()->json(['ok' => true]);\n}\n\nif ($request->ajax()) {\n    // Solicitudes AJAX antiguas.\n}",
        note: "expectsJson() se usa mucho para responder JSON cuando el cliente lo solicita. En nuevas implementaciones, usa Accept: application/json o X-Requested-With según el caso.",
      },
      {
        title: "Validar datos con validate()",
        code: true,
        fixed: ["php"],
        php: "$datos = $request->validate([\n    'nombre' => ['required', 'string', 'max:150'],\n    'email' => ['required', 'email'],\n    'edad' => ['nullable', 'integer', 'min:18'],\n]);\n\nreturn response()->json($datos);",
        note: "La validación falla con una respuesta 422 y un payload con los errores. Puedes reutilizar la misma lógica en controladores y form requests.",
      },
      {
        title: "Usar Form Requests para reglas reutilizables",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:request GuardarProductoRequest\n\n// app/Http/Requests/GuardarProductoRequest.php\npublic function rules(): array\n{\n    return [\n        'nombre' => ['required', 'string', 'max:150'],\n        'precio' => ['required', 'numeric', 'min:0'],\n    ];\n}\n\n// En el controlador\npublic function store(GuardarProductoRequest $request)\n{\n    $producto = Producto::create($request->validated());\n    return redirect()->route('productos.show', $producto);\n}",
        note: "Form Requests separan la validación del controlador y permiten reutilizar reglas en varias acciones.",
      },
      {
        title: "Recuperar datos validados con trusted data",
        code: true,
        fixed: ["php"],
        php: "$datos = $request->safe()->all();\n$nombre = $request->safe()->string('nombre');\n\n// safe() evita aceptar campos no válidos si la validación ya se hizo.\n// En requeridos, puedes confiar más en los datos ya filtrados que en input() sin validarlos.",
        note: "Cuando usas validación, safe() te da un arreglo consistente con los datos aprobados por las reglas de Laravel.",
      },
      {
        title: "Ajustar el valor de la solicitud antes de usarlo",
        code: true,
        fixed: ["php"],
        php: "$request->merge(['nombre' => trim($request->input('nombre', ''))]);\n$request->replace(['nombre' => 'Nuevo valor']);\n\n// merge() agrega o sobrescribe valores sin perder el resto;\n// replace() reemplaza todo el conjunto de entrada.",
        note: "Se usa con cuidado: si modificas la solicitud, documenta la razón y evita mutar datos del usuario sin validación previa.",
      },
      {
        title: "Qué es una sesión HTTP",
        php: "HTTP no conserva estado entre solicitudes. Laravel usa sesiones para mantener datos asociados a un visitante entre distintas solicitudes, como preferencias o un carrito. Los datos viven en un backend y el navegador conserva una cookie identificadora; no confundas el ID de sesión con autenticación o autorización.",
        note: "Las rutas del grupo web incluyen el middleware necesario para sesiones. Las rutas API son normalmente sin estado y no deben depender de una sesión web salvo que configures deliberadamente ese flujo.",
      },
      {
        title: "Configurar el driver de sesión",
        code: true,
        fixed: ["php"],
        php: `// config/session.php; el valor suele provenir de .env
'driver' => env('SESSION_DRIVER', 'file'),

// Opciones habituales:
// file     → storage/framework/sessions
// database → base de datos relacional
// redis    → almacenamiento compartido rápido
// cookie   → datos en cookie cifrada
// array    → no persiste; útil en pruebas`,
        note: "En Laravel 10 el driver predeterminado es file. Para varias instancias de aplicación usa almacenamiento compartido como Redis o una base de datos; el driver cookie no sirve para bloqueo de sesión.",
      },
      {
        title: "Preparar sesiones con base de datos o Redis",
        code: true,
        fixed: ["php"],
        php: `# Driver database: crea la migración de sesiones
$ php artisan session:table
$ php artisan migrate

# Driver redis: instala PhpRedis o predis/predis
# y configura la conexión correspondiente en config/database.php`,
        note: "Asegúrate de tener instalado y configurado el backend antes de seleccionarlo. Redis permite elegir una conexión para sesiones mediante la opción connection de config/session.php.",
      },
      {
        title: "Leer y escribir datos de sesión",
        code: true,
        fixed: ["php"],
        php: `// En un controlador, inyecta Request:
$tema = $request->session()->get('tema', 'claro');
$request->session()->put('tema', 'oscuro');

// El helper global ofrece una alternativa:
$carrito = session('carrito', []);
session(['carrito' => $carrito]);`,
        note: "El segundo argumento de get() es el valor predeterminado. Puedes usar la instancia de Request o el helper session(); elige un estilo consistente en cada capa.",
      },
      {
        title: "Comprobar, recorrer y retirar datos",
        code: true,
        fixed: ["php"],
        php: `$todos = $request->session()->all();
$perfil = $request->session()->only(['nombre', 'correo']);
$sinPerfil = $request->session()->except(['nombre', 'correo']);

$existeNoNulo = $request->session()->has('carrito');
$existeInclusoNulo = $request->session()->exists('filtro');
$noExiste = $request->session()->missing('aviso');

// Leer y borrar una clave en una sola operación:
$token = $request->session()->pull('token_temporal');`,
        note: "has() considera presente una clave si su valor no es null; exists() también la considera presente cuando vale null. pull() lee y elimina el valor.",
      },
      {
        title: "Actualizar valores tipo arreglo",
        code: true,
        fixed: ["php"],
        php: `$request->session()->push('usuario.equipos', 'frontend');
$request->session()->increment('visitas');
$request->session()->increment('puntos', 5);
$request->session()->decrement('intentos');`,
        note: "push() agrega a un arreglo almacenado bajo la clave indicada. increment() y decrement() modifican valores enteros en la sesión.",
      },
      {
        title: "Mensajes flash entre redirecciones",
        code: true,
        fixed: ["php"],
        php: `// Controlador: disponible en la siguiente solicitud
return to_route('productos.index')
    ->with('estado', 'Producto guardado.');

// En Blade
@if (session('estado'))
    <p>{{ session('estado') }}</p>
@endif

// Mantener datos flash una solicitud adicional:
$request->session()->reflash();
$request->session()->keep(['estado']);`,
        note: "Los datos flash están disponibles inmediatamente y durante la siguiente solicitud; luego se eliminan. now() los limita a la solicitud actual. No guardes datos sensibles como mensajes flash.",
      },
      {
        title: "Eliminar datos de sesión",
        code: true,
        fixed: ["php"],
        php: `$request->session()->forget('filtro');
$request->session()->forget(['filtro', 'aviso']);

// Elimina todos los datos de la sesión:
$request->session()->flush();`,
        note: "forget() elimina una o varias claves. flush() borra todos los datos, así que úsalo solo cuando realmente quieras vaciar el estado completo de la sesión.",
      },
      {
        title: "Regenerar el ID tras autenticar",
        code: true,
        fixed: ["php"],
        php: `if (Auth::attempt($credenciales)) {
    $request->session()->regenerate();

    return redirect()->intended('/panel');
}

// Borrar datos y regenerar el ID al cerrar sesión:
$request->session()->invalidate();
$request->session()->regenerateToken();`,
        note: "Regenerar el ID reduce el riesgo de fijación de sesión. Laravel lo hace automáticamente con los starter kits o Fortify, pero al implementar autenticación manual debes regenerarlo tras iniciar sesión. Al cerrar sesión, invalida la sesión y regenera el token CSRF.",
      },
      {
        title: "Bloquear solicitudes concurrentes",
        code: true,
        fixed: ["php"],
        php: `Route::post('/perfil', [PerfilController::class, 'update'])
    ->block($lockSeconds = 10, $waitSeconds = 10);`,
        note: "El bloqueo evita que solicitudes simultáneas con el mismo ID de sesión sobrescriban cambios entre sí. Requiere un driver de caché con locks atómicos y no funciona con el driver de sesión cookie; una espera agotada puede lanzar LockTimeoutException.",
      },
      {
        title: "Probar el estado de sesión",
        code: true,
        fixed: ["php"],
        php: `$response = $this->get('/panel');

$response->assertSessionHas('estado');
$response->assertSessionHas('tema', 'oscuro');
$response->assertSessionMissing('token_temporal');`,
        note: "Los tests de Laravel ofrecen aserciones para comprobar valores presentes o ausentes en sesión. El driver array, que no persiste, es útil para pruebas aisladas.",
      },
      {
        title: "Crear un driver de sesión personalizado",
        code: true,
        fixed: ["php"],
        php: `class CustomSessionHandler implements \\SessionHandlerInterface
{
    // Esqueleto didáctico: cada método debe conectarse
    // al almacenamiento real de la aplicación.
    public function open(string $path, string $name): bool { return true; }
    public function close(): bool { return true; }
    public function read(string $id): string|false { return ''; }
    public function write(string $id, string $data): bool { return true; }
    public function destroy(string $id): bool { return true; }
    public function gc(int $maxLifetime): int|false { return 0; }
}`,
        note: "Laravel permite registrar un manejador propio cuando los drivers incluidos no cubren la necesidad. El ejemplo solo muestra la forma de la interfaz y no persiste datos; una implementación real debe leer, guardar y eliminar sesiones en el backend elegido, además de limpiar registros vencidos.",
      },
      {
        title: "Documentación completa de sesiones",
        php: "Sesiones de Laravel 10 en español: https://laravel-docs.com/es/docs/10.x/session\nRequests: https://laravel-docs.com/es/docs/10.x/requests\nMiddleware: https://laravel-docs.com/es/docs/10.x/middleware\nAutenticación: https://laravel-docs.com/es/docs/10.x/authentication\nPruebas: https://laravel-docs.com/es/docs/10.x/testing",
      },
      {
        title: "Rendimiento y seguridad con Request",
        php: "Usa validated() o safe() después de validar. Evita confiar en input() sin comprobar antes la presencia y el tipo de cada campo. Para JSON y formularios, valida el esquema esperado y no dependa de datos no verificados. Laravel 10 ofrece una API limpia para esto y es la forma recomendada de manejar entradas HTTP.",
        note: "La validación y la autorizar la operación son dos preocupaciones separadas: valida el formato, luego comprueba permisos con policies o gates.",
      },
      {
        title: "Documentación relacionada",
        php: "Requests de Laravel 10 en español: https://laravel-docs.com/es/docs/10.x/requests\nValidación: https://laravel-docs.com/es/docs/10.x/validation\nForm Requests: https://laravel.com/docs/10.x/validation#form-request-validation\nControladores: https://laravel-docs.com/es/docs/10.x/controllers",
      },
    ],
  },
  {
    level: 4,
    title: "Responses HTTP en Laravel 10",
    topics: [
      {
        title: "¿Qué es una respuesta en Laravel?",
        php: "Una respuesta HTTP es el resultado que devuelve Laravel al navegador o a un cliente API. Puede ser HTML, JSON, una redirección, un archivo descargable, una respuesta en streaming o un error con un código HTTP específico.",
        note: "Documentación oficial: https://laravel-docs.com/es/docs/10.x/responses",
      },
      {
        title: "Devolver cadenas, vistas y arreglos",
        code: true,
        fixed: ["php"],
        php: "Route::get('/saludo', function () {\n    return 'Hola desde Laravel';\n});\n\nRoute::get('/perfil', function () {\n    return view('perfil', ['nombre' => 'Ana']);\n});\n\nRoute::get('/api/estado', function () {\n    return ['ok' => true, 'version' => '10.x'];\n});",
        note: "Laravel convierte automáticamente arrays y objetos a JSON en respuestas API. Las vistas se resuelven con Blade cuando devuelves view().",
      },
      {
        title: "Usar el helper response()",
        code: true,
        fixed: ["php"],
        php: "return response('Contenido simple', 200)\n    ->header('Content-Type', 'text/plain');\n\nreturn response()->json([\n    'mensaje' => 'Guardado correctamente',\n    'codigo' => 201,\n], 201);\n\nreturn response()->view('productos.index', ['productos' => $productos], 200);",
        note: "response() te permite controlar el estado, cabeceras, caché y contenido exacto. Es útil cuando necesitas más control que un simple return.",
      },
      {
        title: "Establecer códigos HTTP y cabeceras",
        code: true,
        fixed: ["php"],
        php: "return response()->json([\n    'error' => 'No autorizado',\n], 401)\n    ->header('X-Trace-Id', 'abc-123');\n\nreturn response('No encontrado', 404)\n    ->header('Cache-Control', 'no-store');",
        note: "Los códigos de estado HTTP son parte del contrato de la API. Usa los correctos para cada caso: 200, 201, 204, 302, 404, 422, 429, 500, etc.",
      },
      {
        title: "Redireccionar con redirect()",
        code: true,
        fixed: ["php"],
        php: "return redirect('/productos');\nreturn redirect()->route('productos.show', $producto);\nreturn redirect()->back();\nreturn redirect()->route('login')->with('status', 'Sesión iniciada');",
        note: "Con with() puedes guardar mensajes flash para mostrarlos en la siguiente respuesta. evade usar redirect()->back() sin objetivo claro.",
      },
      {
        title: "Flash messages y session status",
        code: true,
        fixed: ["php"],
        php: "return redirect()->route('pedidos.index')\n    ->with('success', 'Pedido guardado con éxito');\n\n// En la vista:\n@if (session('success'))\n    <div class='alert alert-success'>{{ session('success') }}</div>\n@endif",
        note: "Las sesiones flash viven solo para la siguiente petición. Son ideales para feedback del usuario como confirmaciones o errores de validación.",
      },
      {
        title: "Responder con JSON y recursos",
        code: true,
        fixed: ["php"],
        php: "return response()->json([\n    'usuario' => [\n        'id' => 42,\n        'nombre' => 'Ana',\n    ],\n    'links' => [\n        'self' => '/usuarios/42',\n    ],\n]);\n\n// En APIs REST, usa Resource collections si necesitas formato consistente para muchos modelos.",
        note: "JSON es común en APIs modernas y permite serializar datos de forma segura para clientes como JavaScript, móviles o terceros.",
      },
      {
        title: "Descargas y contenido binario",
        code: true,
        fixed: ["php"],
        php: "return response()->download($rutaArchivo, 'factura.pdf');\nreturn response()->file($rutaArchivo);\nreturn response()->streamDownload(function () {\n    echo 'contenido csv';\n}, 'reporte.csv');",
        note: "download() fuerza la descarga del archivo; file() envía el contenido manteniendo el tipo correcto. streamDownload() permite generar contenido según se escribe.",
      },
      {
        title: "Respuestas por defecto y errores HTTP",
        php: "Laravel ofrece respuestas de error con abort(), abort_if(), abort_unless() y helpers como notFound(), unauthorized(), forbidden(). Estas rutas permiten interrumpir el flujo con un código HTTP explícito y que el framework responda de manera uniforme.",
        note: "Para APIs, combine abort() con validaciones de dominio y policies. Para vistas web, usa redirecciones o mensajes flash cuando el usuario necesita corregir algo.",
      },
      {
        title: "Configurar el modo de depuración",
        code: true,
        fixed: ["php"],
        php: `// .env local
APP_ENV=local
APP_DEBUG=true

// .env de producción
APP_ENV=production
APP_DEBUG=false`,
        note: "APP_DEBUG controla cuántos detalles del error se muestran. Actívalo solo en desarrollo local: en producción debe ser false para no exponer trazas, rutas internas, configuración ni secretos. Después de cambiar variables de entorno con configuración cacheada, limpia o reconstruye la caché según el despliegue.",
      },
      {
        title: "Cómo Laravel procesa una excepción",
        php: "Laravel captura las excepciones no controladas en App\\Exceptions\\Handler. El manejador las reporta para logging o monitoreo y las convierte en una respuesta HTTP adecuada. No ocultes errores con respuestas exitosas genéricas: conserva el código de estado correcto y un registro útil para diagnóstico.",
      },
      {
        title: "Reportar una excepción sin interrumpir el flujo",
        code: true,
        fixed: ["php"],
        php: `try {
    $resultado = $servicioExterno->consultar();
} catch (Throwable $e) {
    report($e);

    // Solo continúa si existe un resultado alternativo válido.
    return $this->resultadoAlternativo();
}`,
        note: "report($e) envía la excepción al manejador de Laravel sin renderizar una página de error por sí mismo. Úsalo si vas a manejar explícitamente la condición y tienes una alternativa legítima; no captures Throwable de forma amplia para silenciar fallos.",
      },
      {
        title: "Personalizar el reporte en Handler",
        code: true,
        fixed: ["php"],
        php: `// app/Exceptions/Handler.php
use App\\Exceptions\\PedidoInvalidoException;

public function register(): void
{
    $this->reportable(function (PedidoInvalidoException $e) {
        // Enviar contexto relevante a un monitor de errores.
    });
}`,
        note: "Los callbacks reportable se seleccionan por el tipo de excepción. Laravel mantiene además su registro normal, a menos que el callback detenga explícitamente la propagación con ->stop() o devuelva false.",
      },
      {
        title: "Añadir contexto y controlar el registro",
        code: true,
        fixed: ["php"],
        php: `// En una excepción propia:
public function context(): array
{
    return ['pedido_id' => $this->pedidoId];
}

// En Handler.php puedes excluir tipos intencionalmente
// o configurar su nivel de log:
protected $dontReport = [
    PedidoYaCanceladoException::class,
];`,
        note: "El contexto facilita investigar un error, pero debe excluir contraseñas, tokens, datos personales innecesarios y otros secretos. dontReport evita reportar el tipo indicado; no lo uses para ocultar errores inesperados.",
      },
      {
        title: "Renderizar excepciones personalizadas",
        code: true,
        fixed: ["php"],
        php: `// app/Exceptions/Handler.php
use App\\Exceptions\\PedidoInvalidoException;
use Illuminate\\Http\\Request;

public function register(): void
{
    $this->renderable(function (
        PedidoInvalidoException $e,
        Request $request
    ) {
        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'No se pudo procesar el pedido.',
            ], 422);
        }

        return response()->view('errors.pedido-invalido', [], 422);
    });
}`,
        note: "renderable personaliza la respuesta para una clase de excepción. Devuelve respuestas distintas según el cliente, pero no incluyas el mensaje interno ni los detalles de la excepción en producción.",
      },
      {
        title: "Lanzar errores HTTP intencionales",
        code: true,
        fixed: ["php"],
        php: `abort(404);
abort_if($pedido === null, 404);
abort_unless($request->user()?->can('view', $pedido), 403);

// Mensaje público opcional:
abort(403, 'No tienes permiso para ver este recurso.');`,
        note: "abort() detiene el flujo lanzando una excepción HTTP que Laravel transforma en la respuesta correspondiente. Usa códigos apropiados: 401 para falta de autenticación, 403 para falta de permiso y 404 para recurso inexistente o no visible.",
      },
      {
        title: "Crear páginas de error personalizadas",
        code: true,
        fixed: ["php"],
        php: `resources/views/errors/
├── 403.blade.php
├── 404.blade.php
└── 500.blade.php

<!-- resources/views/errors/404.blade.php -->
<h1>No encontramos esa página</h1>
<p>Comprueba la dirección o vuelve al inicio.</p>`,
        note: "Laravel utiliza vistas con el código HTTP como nombre para páginas de error personalizadas. Mantenlas sencillas y no muestres stack traces, consultas SQL ni configuración del servidor.",
      },
      {
        title: "Probar respuestas de error",
        code: true,
        fixed: ["php"],
        php: `$this->get('/recurso-inexistente')
    ->assertNotFound();

$this->get('/panel-sin-permiso')
    ->assertForbidden();

$this->getJson('/api/recurso-inexistente')
    ->assertNotFound()
    ->assertJson(['message' => 'No encontrado.']);`,
        note: "Prueba tanto el estado HTTP como el formato de respuesta esperado por cada cliente. Evita acoplar las pruebas a mensajes internos o trazas que pueden cambiar.",
      },
      {
        title: "Configurar los canales de logging",
        code: true,
        fixed: ["php"],
        php: `// config/logging.php
'default' => env('LOG_CHANNEL', 'stack'),

'channels' => [
    'stack' => [
        'driver' => 'stack',
        'channels' => ['single'],
    ],
    'single' => [
        'driver' => 'single',
        'path' => storage_path('logs/laravel.log'),
        'level' => env('LOG_LEVEL', 'debug'),
    ],
],`,
        note: "Laravel configura canales en config/logging.php y por defecto suele usar stack para combinar destinos. Entre los drivers comunes están single, daily, errorlog, syslog, slack y monolog; selecciona el canal predeterminado con LOG_CHANNEL.",
      },
      {
        title: "Registrar mensajes con niveles",
        code: true,
        fixed: ["php"],
        php: `use Illuminate\\Support\\Facades\\Log;

Log::debug('Datos de diagnóstico');
Log::info('Pedido creado');
Log::notice('Servicio próximo a su límite');
Log::warning('Reintento de servicio externo');
Log::error('No se pudo procesar el pago');
Log::critical('Base de datos no disponible');`,
        note: "Laravel ofrece emergency, alert, critical, error, warning, notice, info y debug. El nivel configurado en cada canal actúa como severidad mínima; elige el nivel según la acción que requiere el evento, no solo por su apariencia.",
      },
      {
        title: "Añadir contexto estructurado",
        code: true,
        fixed: ["php"],
        php: `Log::info('Pedido procesado', [
    'pedido_id' => $pedido->id,
    'estado' => $pedido->estado,
]);

// Para contexto adicional en mensajes posteriores del canal:
Log::withContext([
    'request_id' => $requestId,
]);

// Para compartirlo con todos los canales:
Log::shareContext([
    'request_id' => $requestId,
]);`,
        note: "Los datos de contexto permiten filtrar y correlacionar eventos. Un middleware puede asignar un request_id a cada solicitud. Nunca incluyas contraseñas, tokens, cookies, datos de pago ni contenido completo de formularios.",
      },
      {
        title: "Escribir en un canal o stack específico",
        code: true,
        fixed: ["php"],
        php: `// Canal definido en config/logging.php
Log::channel('daily')->warning('Tarea reintentada');

// Enviar el mismo mensaje a más de un canal
Log::stack(['single', 'slack'])
    ->critical('Servicio esencial no disponible');`,
        note: "Una pila envía mensajes a varios canales, pero cada canal puede filtrarlos por su propio nivel mínimo. Restringe notificaciones de chat a eventos que realmente necesiten atención.",
      },
      {
        title: "Rotar archivos y definir retención",
        code: true,
        fixed: ["php"],
        php: `// config/logging.php
'daily' => [
    'driver' => 'daily',
    'path' => storage_path('logs/laravel.log'),
    'level' => env('LOG_LEVEL', 'debug'),
    'days' => 14,
],`,
        note: "El canal daily genera archivos rotados por día y permite establecer cuántos días conservarlos. Verifica también permisos, espacio en disco y la política de retención del sistema de observabilidad de producción.",
      },
      {
        title: "Registrar en un canal durante la ejecución",
        code: true,
        fixed: ["php"],
        php: `// Crear un canal puntual que escribe en un archivo
$canal = Log::build([
    'driver' => 'single',
    'path' => storage_path('logs/importacion.log'),
]);

$canal->info('Importación iniciada', [
    'lote_id' => $loteId,
]);`,
        note: "Log::build() crea un canal bajo demanda cuando no quieres declararlo en config/logging.php. Usa esta opción con moderación: la configuración centralizada es más fácil de revisar y operar.",
      },
      {
        title: "Registrar advertencias de desaprobación",
        code: true,
        fixed: ["php"],
        php: `// .env
LOG_DEPRECATIONS_CHANNEL=deprecations

// config/logging.php
'channels' => [
    'deprecations' => [
        'driver' => 'single',
        'path' => storage_path('logs/deprecations.log'),
    ],
],`,
        note: "Un canal de deprecations ayuda a identificar APIs que conviene actualizar antes de cambiar de versión. Laravel también puede usar un canal con el nombre deprecations si existe en la configuración.",
      },
      {
        title: "Buenas prácticas de logging en producción",
        php: "• Usa un canal que el entorno pueda recoger (archivo con rotación, stderr o servicio centralizado).\n• Define niveles mínimos distintos para desarrollo y producción según el volumen esperado.\n• Añade IDs de solicitud o entidad para correlacionar eventos, evitando información sensible.\n• Revisa retención, permisos y alertas; no dependas de archivos locales en una infraestructura efímera.\n• No registres el mismo error manualmente si el manejador de excepciones ya lo reportará.",
      },
      {
        title: "Documentación de errores y logging",
        php: "Manejo de errores de Laravel 10 en español: https://laravel-docs.com/es/docs/10.x/errors\nLogging: https://laravel-docs.com/es/docs/10.x/logging\nResponses: https://laravel-docs.com/es/docs/10.x/responses\nCanales de logging: https://laravel-docs.com/es/docs/10.x/logging#building-log-stacks",
      },
      {
        title: "Documentación relacionada",
        php: "Responses de Laravel 10 en español: https://laravel-docs.com/es/docs/10.x/responses\nRedirecciones: https://laravel-docs.com/es/docs/10.x/redirects\nVistas: https://laravel-docs.com/es/docs/10.x/views\nHTTP status: https://laravel.com/docs/10.x/http-client#response",
      },
    ],
  },
  {
    level: 5,
    title: "Vistas en Laravel 10",
    topics: [
      {
        title: "¿Qué son las vistas?",
        php: "Las vistas son archivos HTML con lógica ligera que separan la presentación del código de negocio. En Laravel viven en resources/views y normalmente se renderizan con Blade, el motor de plantillas del framework.",
        note: "Documentación oficial: https://laravel-docs.com/es/docs/10.x/views",
      },
      {
        title: "Crear una vista básica",
        code: true,
        fixed: ["php"],
        php: `<!-- resources/views/saludo.blade.php -->
<h1>Hola, {{ $nombre }}</h1>
<p>Bienvenido a tu tienda.</p>`,
        note: "Blade procesa el archivo y sustituye variables con {{ ... }}. Es decir, puedes mezclar HTML con lógica mínima sin mezclar el backend con la plantilla.",
      },
      {
        title: "Devolver una vista desde una ruta",
        code: true,
        fixed: ["php"],
        php: `Route::get('/saludo/{nombre}', function (string $nombre) {
    return view('saludo', ['nombre' => $nombre]);
});`,
        note: "view('saludo', [...]) carga la plantilla y le pasa datos; el nombre no incluye la extensión .blade.php.",
      },
      {
        title: "Lógica de control en Blade",
        code: true,
        fixed: ["php"],
        php: `@if ($usuario)
    <h2>Bienvenido, {{ $usuario->nombre }}</h2>
@else
    <p>Debes iniciar sesión.</p>
@endif

@foreach ($productos as $producto)
    <li>{{ $producto->nombre }} — {{ $producto->precio }}</li>
@endforeach`,
        note: "Blade permite if, foreach, switch, ternarios y otros bloques sin perder legibilidad. La sintaxis se parece mucho al HTML con pequeños atajos.",
      },
      {
        title: "Uso de @extends, @section y @yield",
        code: true,
        fixed: ["php"],
        php: `<!-- resources/views/layouts/app.blade.php -->
<!doctype html>
<html>
<head>
    <title>@yield('titulo', 'Mi tienda')</title>
</head>
<body>
    <main>@yield('contenido')</main>
</body>
</html>

<!-- resources/views/productos/index.blade.php -->
@extends('layouts.app')

@section('titulo', 'Productos')
@section('contenido')
    <h1>Catálogo</h1>
@endsection`,
        note: "Los layouts ayudan a reutilizar headers, footers y estructuraทั่วไป de la página sin duplicar cada pieza.",
      },
      {
        title: "Variables globales, old() y errores",
        code: true,
        fixed: ["php"],
        php: `<input name="nombre" value="{{ old('nombre') }}">

@error('nombre')
    <div class="alert alert-danger">{{ $message }}</div>
@enderror`,
        note: "old() recupera el valor enviado antes de una validación fallida; @error() muestra el mensaje de error asociado a ese campo.",
      },
      {
        title: "Componentes y slots",
        code: true,
        fixed: ["php"],
        php: `<!-- resources/views/components/alerta.blade.php -->
<div class="alerta">
    {{ $slot }}
</div>

<!-- uso -->
<x-alerta>Producto guardado correctamente.</x-alerta>`,
        note: "Los componentes de Blade reutilizan estructuras y ayudan a encapsular UI repetida como alertas, tarjetas o modales.",
      },
      {
        title: "Incluir sub-vistas con @include",
        code: true,
        fixed: ["php"],
        php: `@include('partials.header', ['titulo' => 'Productos'])

<ul>
    @foreach ($productos as $producto)
        <li>{{ $producto->nombre }}</li>
    @endforeach
</ul>`,
        note: "include() sirve para reutilizar bloques; el primer argumento es la vista parcial y el segundo un arreglo de variables.",
      },
      {
        title: "Escapar contenido con {{ }} y {!! !!}",
        code: true,
        fixed: ["php"],
        php: `{{ $mensaje }}
{!! $htmlSeguro !!}

// Evita imprimir HTML sin escapar cuando el contenido provenga del usuario.
// En Blade, {{ }} escapa por seguridad; {!! !!} lo imprime como HTML.`,
        note: "Solo usa {!! !!} con contenido confiable; de lo contrario puedes introducir XSS en la aplicación.",
      },
      {
        title: "Estructura recomendada de vistas",
        php: `resources/views/
├── auth/
├── components/
├── layouts/
├── partials/
├── productos/
├── welcome.blade.php
└── dashboard.blade.php`,
        note: "Organiza la UI por dominio o por tipo de vista. Así creces sin mezclar muchos templates en un solo directorio.",
      },
      {
        title: "Documentación relacionada",
        php: "Views de Laravel 10 en español: https://laravel-docs.com/es/docs/10.x/views\nBlade: https://laravel-docs.com/es/docs/10.x/blade\nFrontend: https://laravel-docs.com/es/docs/10.x/frontend\nControladores: https://laravel-docs.com/es/docs/10.x/controllers",
      },
    ],
  },
  {
    level: 6,
    title: "Middleware en Laravel 10",
    topics: [
      {
        title: "¿Qué es un middleware?",
        php: "El middleware inspecciona o filtra solicitudes HTTP antes de que lleguen a la aplicación. Puede permitir que continúen, responder directamente o ejecutar tareas después de obtener la respuesta.\n\nLaravel incluye middleware para autenticación, CSRF y otras funciones; también puedes crear los tuyos en app/Http/Middleware.",
      },
      {
        title: "Crear un middleware con Artisan",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:middleware EnsureUserHasRole\n\n# Laravel crea:\napp/Http/Middleware/EnsureUserHasRole.php",
        note: "Los middleware se resuelven mediante el contenedor de servicios, por lo que puedes declarar sus dependencias con tipos en el constructor.",
      },
      {
        title: "Dejar continuar o rechazar una solicitud",
        code: true,
        fixed: ["php"],
        php: "use Closure;\nuse Illuminate\\Http\\Request;\nuse Symfony\\Component\\HttpFoundation\\Response;\n\npublic function handle(Request $request, Closure $next): Response\n{\n    if (! $request->user()?->hasRole('editor')) {\n        abort(403);\n    }\n\n    return $next($request);\n}",
        note: "Llama a $next($request) para continuar la cadena. Un middleware puede detenerla devolviendo una respuesta o lanzando una excepción HTTP, como abort(403).",
      },
      {
        title: "Ejecutar lógica antes y después de la respuesta",
        code: true,
        fixed: ["php"],
        php: "public function handle(Request $request, Closure $next): Response\n{\n    // Antes de que la solicitud llegue al controlador.\n    $response = $next($request);\n    // Después de que el controlador genere la respuesta.\n\n    return $response;\n}",
        note: "El código antes de $next procesa la solicitud entrante; el código posterior puede inspeccionar o ajustar la respuesta.",
      },
      {
        title: "Registrar middleware global",
        php: "Para ejecutar un middleware en cada solicitud HTTP, agrégalo a la propiedad $middleware de app/Http/Kernel.php.\n\nUsa middleware global solo cuando la regla realmente deba aplicarse a toda la aplicación; para áreas concretas, asígnalo a las rutas.",
      },
      {
        title: "Asignar middleware a una ruta",
        code: true,
        fixed: ["php"],
        php: "Route::get('/perfil', [PerfilController::class, 'show'])\n    ->middleware(Authenticate::class);\n\nRoute::get('/admin', [AdminController::class, 'index'])\n    ->middleware([Authenticate::class, EnsureUserHasRole::class]);",
        note: "Puedes asociar una clase o una lista de clases a una ruta. El middleware de ruta se ejecuta en el orden aplicable del pipeline.",
      },
      {
        title: "Definir alias en el kernel HTTP",
        code: true,
        fixed: ["php"],
        php: "// app/Http/Kernel.php\nprotected $middlewareAliases = [\n    'auth' => \\App\\Http\\Middleware\\Authenticate::class,\n    'role' => \\App\\Http\\Middleware\\EnsureUserHasRole::class,\n];\n\n// Uso en una ruta:\nRoute::get('/admin', [AdminController::class, 'index'])\n    ->middleware(['auth', 'role:editor']);",
        note: "Laravel 10 define los alias de middleware en $middlewareAliases dentro de app/Http/Kernel.php. El archivo trae alias comunes como auth y throttle.",
      },
      {
        title: "Grupos web y api",
        code: true,
        fixed: ["php"],
        php: "// app/Http/Kernel.php\nprotected $middlewareGroups = [\n    'web' => [\n        // cookies, sesión, CSRF y route model binding...\n    ],\n    'api' => [\n        // limitación de solicitudes y route model binding...\n    ],\n];",
        note: "Los grupos reúnen middleware relacionados. Laravel aplica automáticamente el grupo web a routes/web.php y api a routes/api.php mediante RouteServiceProvider.",
      },
      {
        title: "Excluir middleware de una ruta o grupo",
        code: true,
        fixed: ["php"],
        php: "Route::middleware([EnsureUserHasRole::class])->group(function () {\n    Route::get('/admin', [AdminController::class, 'index']);\n\n    Route::get('/estado-publico', [EstadoController::class, 'show'])\n        ->withoutMiddleware([EnsureUserHasRole::class]);\n});",
        note: "withoutMiddleware puede excluir middleware de ruta, incluso desde un grupo. No elimina middleware global.",
      },
      {
        title: "Controlar la prioridad de ejecución",
        php: "Si necesitas imponer un orden específico entre middleware no globales, usa la propiedad $middlewarePriority de app/Http/Kernel.php.\n\nLaravel proporciona un orden predeterminado para dependencias sensibles, como sesiones, autenticación, throttle, route model binding y autorización. Modifícalo solo si existe una necesidad concreta.",
      },
      {
        title: "Pasar parámetros al middleware",
        code: true,
        fixed: ["php"],
        php: "public function handle(Request $request, Closure $next, string $role): Response\n{\n    abort_unless($request->user()?->hasRole($role), 403);\n\n    return $next($request);\n}\n\n// En la ruta:\nRoute::put('/posts/{post}', [PostController::class, 'update'])\n    ->middleware('role:editor');",
        note: "Los argumentos extra se reciben después de $next. Separa el alias y sus parámetros con : y varios parámetros con comas, por ejemplo role:editor,publisher.",
      },
      {
        title: "Middleware terminable",
        code: true,
        fixed: ["php"],
        php: "public function terminate(Request $request, Response $response): void\n{\n    // Registrar métricas después de enviar la respuesta.\n}",
        note: "Con un servidor FastCGI, Laravel llama a terminate() después de enviar la respuesta. El middleware debe estar registrado; si handle() y terminate() necesitan la misma instancia, enlázalo como singleton en un service provider.",
      },
      {
        title: "Combinar grupos de middleware",
        code: true,
        fixed: ["php"],
        php: `Route::middleware(['auth'])->group(function () {
    Route::prefix('admin')
        ->middleware(['verified', 'role:admin'])
        ->name('admin.')
        ->group(function () {
            Route::get('/reportes', [ReporteController::class, 'index'])
                ->name('reportes');
        });
});

// URI: /admin/reportes
// Middleware: auth, verified, role:admin
// Nombre: admin.reportes`,
        note: "Los grupos anidados combinan middleware heredados y agregan prefijos URI y nombres. El orden de declaración ayuda a entender la configuración; la prioridad del kernel puede ordenar middleware no globales cuando existe una dependencia específica.",
      },
      {
        title: "Usar middleware integrados de Laravel",
        code: true,
        fixed: ["php"],
        php: `Route::get('/panel', [PanelController::class, 'index'])
    ->middleware(['auth', 'verified']);

Route::post('/comentarios', [ComentarioController::class, 'store'])
    ->middleware('throttle:10,1');

Route::get('/invitaciones/{id}', [InvitacionController::class, 'show'])
    ->middleware('signed');`,
        note: "auth exige una sesión autenticada; verified limita acceso a cuentas con correo verificado; throttle limita solicitudes; signed valida una URL firmada. Usa los alias integrados en lugar de reimplementar estas protecciones.",
      },
      {
        title: "Probar rutas protegidas por middleware",
        code: true,
        fixed: ["php"],
        php: `public function test_visitante_es_redirigido_al_login(): void
{
    $this->get('/panel')
        ->assertRedirect('/login');
}

public function test_usuario_autenticado_puede_ver_el_panel(): void
{
    $usuario = User::factory()->create();

    $this->actingAs($usuario)
        ->get('/panel')
        ->assertOk();
}`,
        note: "Prueba la ruta con y sin las condiciones de acceso para verificar tanto el rechazo como el caso permitido. Ajusta la URI de redirección y los datos de fábrica a la configuración real de tu aplicación.",
      },
      {
        title: "Middleware y documentación relacionada",
        php: "Middleware de Laravel 10 en español: https://laravel-docs.com/es/docs/10.x/middleware\nRouting: https://laravel-docs.com/es/docs/10.x/routing\nContenedor de servicios: https://laravel-docs.com/es/docs/10.x/container\nAutenticación: https://laravel.com/docs/10.x/authentication",
      },
    ],
  },
  {
    level: 4,
    title: "Protección CSRF en Laravel 10",
    topics: [
      {
        title: "¿Qué es un ataque CSRF?",
        php: "La falsificación de solicitudes entre sitios (CSRF) ocurre cuando un sitio externo induce al navegador de una persona autenticada a enviar una solicitud no deseada a otra aplicación, por ejemplo, cambiar su correo o realizar una acción con su sesión.\n\nUn token secreto vinculado a la sesión ayuda a verificar que la solicitud fue iniciada desde la aplicación legítima.",
      },
      {
        title: "Cómo protege Laravel contra CSRF",
        php: "Laravel genera un token CSRF para cada sesión activa. El middleware VerifyCsrfToken, incluido por defecto en el grupo web, compara el token recibido con el guardado en la sesión.\n\nSi no coinciden o falta el token en una solicitud que cambia estado, Laravel rechaza la petición.",
      },
      {
        title: "Incluir @csrf en formularios Blade",
        code: true,
        fixed: ["php"],
        php: "<form method=\"POST\" action=\"{{ route('perfil.actualizar') }}\">\n    @csrf\n    <label for=\"correo\">Correo</label>\n    <input id=\"correo\" name=\"correo\" type=\"email\">\n    <button type=\"submit\">Guardar</button>\n</form>",
        note: "@csrf genera un campo oculto _token con el token de la sesión. Inclúyelo en los formularios POST, PUT, PATCH y DELETE de rutas web.",
      },
      {
        title: "Simular verbos HTTP en formularios",
        code: true,
        fixed: ["php"],
        php: "<form method=\"POST\" action=\"{{ route('perfil.actualizar') }}\">\n    @method('PATCH')\n    @csrf\n    <button type=\"submit\">Actualizar</button>\n</form>",
        note: "HTML solo envía GET y POST. @method() agrega el campo _method que Laravel usa para reconocer PUT, PATCH o DELETE; no reemplaza @csrf.",
      },
      {
        title: "Consultar el token de la sesión",
        code: true,
        fixed: ["php"],
        php: "// En código que ya tiene acceso a la solicitud:\n$desdeLaSesion = request()->session()->token();\n\n// Helper global de Laravel:\n$token = csrf_token();",
        note: "Estas expresiones permiten consultar el token desde código de la aplicación. No crees un endpoint que lo exponga indiscriminadamente; Laravel suele entregarlo mediante el formulario o la página de la sesión correspondiente. El token cambia cuando se regenera la sesión.",
      },
      {
        title: "Enviar CSRF en solicitudes AJAX",
        code: true,
        fixed: ["php"],
        php: "<meta name=\"csrf-token\" content=\"{{ csrf_token() }}\">\n\n<script>\n$.ajaxSetup({\n    headers: {\n        'X-CSRF-TOKEN': document.querySelector('meta[name=\"csrf-token\"]').content\n    }\n});\n</script>",
        note: "VerifyCsrfToken acepta el encabezado X-CSRF-TOKEN. Conserva el token dentro de la sesión autenticada y úsalo en solicitudes que cambien estado.",
      },
      {
        title: "Usar la cookie XSRF-TOKEN",
        php: "Laravel incluye una cookie cifrada XSRF-TOKEN en las respuestas. Bibliotecas como Axios y Angular pueden leerla y enviar su valor en el encabezado X-XSRF-TOKEN para solicitudes del mismo origen.\n\nEl starter de Laravel 10 incluye Axios configurado en resources/js/bootstrap.js para este flujo.",
      },
      {
        title: "CSRF en SPA y API",
        php: "Una SPA que usa Laravel como backend debe seguir el flujo de autenticación y protección CSRF de Laravel Sanctum cuando trabaja con cookies y sesiones.\n\nNo des por protegida una API solo por tener rutas en routes/api.php: define el esquema de autenticación y autorización adecuado para sus clientes.",
        note: "Guía de Sanctum: https://laravel.com/docs/10.x/sanctum",
      },
      {
        title: "Webhooks y excepciones de CSRF",
        code: true,
        fixed: ["php"],
        php: "// app/Http/Middleware/VerifyCsrfToken.php\nprotected $except = [\n    'webhooks/proveedor-pagos',\n];",
        note: "Un proveedor externo no puede enviar el token de la sesión, por lo que un webhook puede requerir una excepción. Prefiere rutas fuera del grupo web o excluye únicamente la URI exacta necesaria; valida la firma del proveedor y nunca excluyas rutas de usuario de forma amplia.",
      },
      {
        title: "CSRF durante las pruebas",
        php: "Laravel desactiva automáticamente el middleware CSRF al ejecutar pruebas. Esto permite probar las acciones sin generar tokens de sesión en cada solicitud.\n\nAun así, incluye @csrf en las vistas reales y prueba por separado los flujos de sesión y autenticación relevantes.",
      },
      {
        title: "Lista rápida de protección CSRF",
        php: "• Incluye @csrf en cada formulario web que modifica datos.\n• Usa @method('PUT'), @method('PATCH') o @method('DELETE') cuando corresponda.\n• No desactives CSRF globalmente para resolver errores 419.\n• Para webhooks, verifica firmas y limita la excepción a la ruta necesaria.\n• En SPAs con sesión, sigue la configuración recomendada de Sanctum.",
      },
      {
        title: "Documentación completa de CSRF",
        php: "CSRF de Laravel 10 en español: https://laravel-docs.com/es/docs/10.x/csrf\nMiddleware: https://laravel-docs.com/es/docs/10.x/middleware\nRouting: https://laravel-docs.com/es/docs/10.x/routing\nSesiones: https://laravel-docs.com/es/docs/10.x/session\nSanctum: https://laravel.com/docs/10.x/sanctum",
      },
    ],
  },
  {
    level: 5,
    title: "Vistas con Blade",
    topics: [
      {
        title: "Crear una plantilla Blade",
        code: true,
        fixed: ["php"],
        php: "<!-- resources/views/productos/index.blade.php -->\n<h1>Productos</h1>\n\n<ul>\n    @foreach ($productos as $producto)\n        <li>{{ $producto->nombre }} — {{ $producto->precio }}</li>\n    @endforeach\n</ul>",
        note: "La sintaxis {{ }} escapa el contenido para reducir el riesgo de XSS. Evita imprimir HTML sin escapar con {!! !!} cuando el contenido no sea de confianza.",
      },
      {
        title: "Layouts y secciones",
        code: true,
        fixed: ["php"],
        php: "<!-- resources/views/layouts/app.blade.php -->\n<!doctype html>\n<html lang=\"es\">\n<head><title>@yield('titulo', 'Mi tienda')</title></head>\n<body>\n    <main>@yield('contenido')</main>\n</body>\n</html>\n\n<!-- en una vista hija -->\n@extends('layouts.app')\n@section('titulo', 'Productos')\n@section('contenido')\n    <h1>Catálogo</h1>\n@endsection",
      },
      {
        title: "Condicionales y formularios",
        code: true,
        fixed: ["php"],
        php: "@if (session('estado'))\n    <p>{{ session('estado') }}</p>\n@endif\n\n<form method=\"POST\" action=\"{{ route('productos.store') }}\">\n    @csrf\n    <label for=\"nombre\">Nombre</label>\n    <input id=\"nombre\" name=\"nombre\" value=\"{{ old('nombre') }}\">\n    @error('nombre') <p>{{ $message }}</p> @enderror\n    <button type=\"submit\">Guardar</button>\n</form>",
        note: "@csrf agrega el token necesario para proteger el formulario web.",
      },
      {
        title: "Componentes Blade",
        code: true,
        fixed: ["php"],
        php: "<!-- resources/views/components/alerta.blade.php -->\n<div class=\"alerta\" role=\"status\">\n    {{ $slot }}\n</div>\n\n<!-- uso -->\n<x-alerta>Producto guardado correctamente.</x-alerta>",
      },
      {
        title: "Paginación en la vista",
        code: true,
        fixed: ["php"],
        php: "// Controlador\n$productos = Producto::latest()->paginate(15);\nreturn view('productos.index', compact('productos'));\n\n// Vista Blade\n@foreach ($productos as $producto)\n    <p>{{ $producto->nombre }}</p>\n@endforeach\n{{ $productos->links() }}",
      },
      {
        title: "Mostrar datos y escapar la salida",
        code: true,
        fixed: ["php"],
        php: `{{ $usuario->nombre }}
{{ $html }}

{!! $htmlConfiable !!}`,
        note: "{{ ... }} escapa la salida HTML usando el mecanismo de Laravel. {!! ... !!} imprime HTML sin escapar y solo debe usarse con contenido confiable; no lo uses para texto proporcionado por usuarios.",
      },
      {
        title: "Usar Blade junto con JavaScript",
        code: true,
        fixed: ["php"],
        php: `<!-- Escapa una expresión de Blade para que JavaScript la procese -->
<p>@{{ nombre }}</p>

<!-- Evita que Blade procese una sección completa -->
@verbatim
    <p>{{ nombre }}</p>
@endverbatim

<script>
    const productos = @json($productos);
</script>`,
        note: "@{{ ... }} y @verbatim son útiles con frameworks de JavaScript que también usan llaves. @json serializa un valor PHP para incluirlo como JSON.",
      },
      {
        title: "Condiciones y directivas de contexto",
        code: true,
        fixed: ["php"],
        php: `@unless ($producto->agotado)
    <button>Agregar al carrito</button>
@endunless

@auth
    <p>Hola, {{ auth()->user()->name }}</p>
@else
    <a href="{{ route('login') }}">Iniciar sesión</a>
@endauth

@env('production')
    <p>Entorno de producción</p>
@endenv`,
        note: "Además de @if/@else, Blade incluye atajos como @unless, @isset, @empty, @auth, @guest y @env para expresar condiciones comunes.",
      },
      {
        title: "Bucles y variable $loop",
        code: true,
        fixed: ["php"],
        php: `@forelse ($productos as $producto)
    <article>
        <h2>{{ $producto->nombre }}</h2>
        @if ($loop->first)
            <span>Primer resultado</span>
        @endif
    </article>
@empty
    <p>No hay productos disponibles.</p>
@endforelse`,
        note: "@forelse combina el recorrido con el estado vacío. Dentro de un bucle, $loop ofrece información como first, last, index, iteration, count y remaining.",
      },
      {
        title: "Clases y estilos condicionales",
        code: true,
        fixed: ["php"],
        php: `<button @class([
    'boton',
    'boton--activo' => $activo,
    'boton--deshabilitado' => ! $disponible,
])>
    Guardar
</button>

<div @style([
    'color: red' => $producto->agotado,
    'font-weight: bold' => $producto->destacado,
])>
    {{ $producto->nombre }}
</div>`,
        note: "@class y @style construyen atributos condicionales a partir de arreglos; mantienen la plantilla más legible que concatenar cadenas manualmente.",
      },
      {
        title: "Incluir vistas parciales",
        code: true,
        fixed: ["php"],
        php: `@include('productos.partials.tarjeta', ['producto' => $producto])

@includeWhen($mostrarAyuda, 'partials.ayuda')
@includeUnless($esInvitado, 'partials.opciones-cuenta')
@includeFirst(['partials.menu-personalizado', 'partials.menu'])`,
        note: "@include comparte la vista actual y permite pasar datos adicionales. @includeWhen, @includeUnless y @includeFirst cubren casos condicionales; para UI reutilizable con atributos y slots, prefiere componentes.",
      },
      {
        title: "Componentes anónimos, props y slots",
        code: true,
        fixed: ["php"],
        php: `<!-- resources/views/components/tarjeta.blade.php -->
@props(['titulo', 'tipo' => 'info'])

<section {{ $attributes->class(['tarjeta', 'tarjeta--' . $tipo]) }}>
    <h2>{{ $titulo }}</h2>
    <div>{{ $slot }}</div>
</section>

<!-- uso -->
<x-tarjeta titulo="Resumen" tipo="exito" id="resumen">
    Pedido guardado.
</x-tarjeta>`,
        note: "@props declara propiedades y valores predeterminados. El slot predeterminado contiene el contenido interno; $attributes permite recibir y combinar atributos HTML adicionales.",
      },
      {
        title: "Slots con nombre y componentes dinámicos",
        code: true,
        fixed: ["php"],
        php: `<x-panel>
    <x-slot name="titulo">Últimos pedidos</x-slot>
    <x-slot name="acciones">
        <a href="{{ route('pedidos.index') }}">Ver todos</a>
    </x-slot>

    <p>Contenido principal del panel.</p>
</x-panel>

<x-dynamic-component :component="$componente" />`,
        note: "Los slots con nombre separan regiones del componente, como título y acciones. <x-dynamic-component> permite elegir el componente a renderizar mediante un valor dinámico.",
      },
      {
        title: "Compartir estilos y scripts con stacks",
        code: true,
        fixed: ["php"],
        php: `<!-- En el layout -->
<head>
    @stack('styles')
</head>
<body>
    @yield('contenido')
    @stack('scripts')
</body>

<!-- En una vista hija -->
@push('scripts')
    <script src="{{ asset('js/productos.js') }}"></script>
@endpush

@pushOnce('styles', 'productos-styles')
    <link rel="stylesheet" href="{{ asset('css/productos.css') }}">
@endPushOnce`,
        note: "@push agrega contenido a un stack y @stack lo muestra en el layout. @pushOnce evita registrar el mismo bloque varias veces cuando una vista parcial se incluye repetidamente.",
      },
      {
        title: "Inyectar un servicio y mantener vistas simples",
        code: true,
        fixed: ["php"],
        php: `@inject('reportes', 'App\\Services\\ReporteService')

<p>Pedidos de hoy: {{ $reportes->pedidosDeHoy() }}</p>`,
        note: "@inject resuelve una dependencia desde el contenedor, pero las vistas deberían centrarse en presentar datos. Para lógica de negocio o consultas, prepara los datos en el controlador o en una clase dedicada.",
      },
      {
        title: "Compilar y limpiar las vistas",
        code: true,
        fixed: ["php"],
        php: `$ php artisan view:cache

# Eliminar las vistas compiladas
$ php artisan view:clear`,
        note: "Laravel compila las plantillas Blade a PHP y las almacena en caché. En despliegues puedes precalcularlas con view:cache; al depurar plantillas, view:clear elimina esa caché.",
      },
      {
        title: "Documentación completa de Blade",
        php: "Blade de Laravel 10 en español: https://laravel-docs.com/es/docs/10.x/blade\nVistas: https://laravel-docs.com/es/docs/10.x/views\nComponentes: https://laravel-docs.com/es/docs/10.x/blade#components\nFrontend: https://laravel-docs.com/es/docs/10.x/frontend",
      },
    ],
  },
  {
    level: 6,
    title: "Frontend con Blade y Vite",
    topics: [
      {
        title: "¿Qué es el frontend en Laravel?",
        php: "Laravel es principalmente un framework backend, pero también incluye una experiencia completa para construir interfaces web. Puedes usar Blade para plantillas y Vite para compilar CSS y JavaScript, o entregar una API para un frontend en React, Vue o Livewire.\n\nLa documentación oficial de Laravel 10 sobre frontend: https://laravel-docs.com/es/docs/10.x/frontend",
      },
      {
        title: "Blade como motor de vistas",
        code: true,
        fixed: ["php"],
        php: "<!-- resources/views/welcome.blade.php -->\n<h1>Mi tienda</h1>\n<p>{{ $mensaje }}</p>\n\n@if ($usuario)\n    <p>Bienvenido, {{ $usuario->nombre }}</p>\n@endif",
        note: "Blade combina HTML con lógica de control, variables y componentes. La salida con {{ }} escapa contenido para reducir el riesgo de XSS.",
      },
      {
        title: "Instalar y usar Vite",
        code: true,
        fixed: ["php"],
        php: "$ npm install\n$ npm run dev\n\n# En Blade, incluye assets con la directiva @vite\n@vite(['resources/css/app.css', 'resources/js/app.js'])",
        note: "Vite compila CSS y JavaScript, ofrece recarga rápida y es la forma recomendada por Laravel para la mayoría de proyectos modernos.",
      },
      {
        title: "Requisitos y dependencias",
        code: true,
        fixed: ["php"],
        php: "$ node -v\n$ npm -v\n\n# En una instalación Laravel 10 recién creada:\n$ npm install",
        note: "La guía de Laravel 10 requiere Node.js 16 o posterior y NPM. El package.json de una instalación estándar ya incluye Vite y el plugin de Laravel; los starter kits también ofrecen la configuración inicial.",
      },
      {
        title: "Configurar puntos de entrada",
        code: true,
        fixed: ["php"],
        php: `// vite.config.js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel([
            'resources/css/app.css',
            'resources/js/app.js',
        ]),
    ],
});`,
        note: "Los puntos de entrada son los archivos fuente que Vite debe procesar. Pueden ser CSS o JavaScript, incluidos TypeScript, JSX, TSX y Sass cuando sus plugins y dependencias están configurados.",
      },
      {
        title: "Importar CSS desde JavaScript",
        code: true,
        fixed: ["php"],
        php: `// resources/js/app.js
import './bootstrap';
import '../css/app.css';

// En el layout Blade basta con cargar el punto de entrada JS:
@vite('resources/js/app.js')`,
        note: "Importar los estilos desde JavaScript puede simplificar los puntos de entrada, especialmente en una SPA o una aplicación Inertia. En ese caso, incluye en @vite el entrypoint JavaScript que importa el CSS.",
      },
      {
        title: "Desarrollo local y Hot Module Replacement",
        code: true,
        fixed: ["php"],
        php: `$ npm run dev

<!-- En el <head> del layout raíz -->
@vite(['resources/css/app.css', 'resources/js/app.js'])`,
        note: "El servidor de desarrollo detecta cambios y los refleja en el navegador. @vite reconoce automáticamente el servidor local e incorpora el cliente de Vite para HMR; detén el proceso cuando termines.",
      },
      {
        title: "Construir recursos para producción",
        code: true,
        fixed: ["php"],
        php: `$ npm run build

# Laravel sirve los recursos compilados y versionados desde el manifiesto de Vite.`,
        note: "El comando build agrupa y versiona CSS y JavaScript para despliegue. Ejecuta la compilación en el proceso de publicación y despliega sus artefactos junto con la aplicación; no uses npm run dev en producción.",
      },
      {
        title: "Múltiples entradas y ruta de compilación",
        code: true,
        fixed: ["php"],
        php: `// Blade: carga varias entradas registradas en vite.config.js
@vite(['resources/css/app.css', 'resources/js/admin.js'])

// Se puede indicar una ruta de build personalizada relativa a public/
@vite('resources/js/app.js', 'vendor/courier/build')`,
        note: "Registra cada entrada en la configuración antes de referenciarla desde Blade. Una ruta de build personalizada solo es necesaria cuando el proyecto configura sus recursos compilados fuera de la ubicación predeterminada.",
      },
      {
        title: "Usar React con Vite",
        code: true,
        fixed: ["php"],
        php: `// Instala y configura @vitejs/plugin-react en vite.config.js
// Usa un entrypoint JSX, por ejemplo resources/js/app.jsx.

<!-- En el layout Blade, el refresco de React va antes de @vite -->
@viteReactRefresh
@vite('resources/js/app.jsx')`,
        note: "React requiere su plugin de Vite y la directiva @viteReactRefresh antes de @vite. Vue requiere @vitejs/plugin-vue y su configuración correspondiente. Los starter kits de Laravel pueden proporcionar este scaffolding.",
      },
      {
        title: "Aliases y configuración avanzada",
        code: true,
        fixed: ["php"],
        php: `// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});`,
        note: "Los aliases permiten importar módulos con rutas más cortas. Vite también admite varias entradas y configuración SSR; agrega solo la configuración que el tipo de aplicación necesita.",
      },
      {
        title: "Diagnosticar recursos que no cargan",
        php: "• Confirma que Node.js y npm estén instalados y que npm install haya terminado correctamente.\n• Comprueba que las rutas en vite.config.js coincidan con los archivos existentes.\n• Verifica que @vite use los mismos puntos de entrada que el plugin de Laravel.\n• Para desarrollo, inicia npm run dev; para producción, genera los recursos con npm run build.\n• Si usas React, coloca @viteReactRefresh antes de @vite.\n• En Sail sobre WSL2 o con HTTPS, configura el host y HMR según tu entorno.",
      },
      {
        title: "Documentación completa de Vite",
        php: "Vite para Laravel 10 en español: https://laravel-docs.com/es/docs/10.x/vite\nFrontend: https://laravel-docs.com/es/docs/10.x/frontend\nBlade: https://laravel-docs.com/es/docs/10.x/blade\nConfiguración de Laravel: https://laravel-docs.com/es/docs/10.x/configuration",
      },
      {
        title: "Estructura de recursos frontend",
        code: true,
        fixed: ["php"],
        php: "resources/\n├── css/\n│   └── app.css\n├── js/\n│   └── app.js\n└── views/\n    └── welcome.blade.php\n\npublic/build/  ← archivos compilados por Vite",
        note: "Los archivos fuente viven en resources/; los artefactos compilados se sirven desde public/build/ o desde una ruta que configure Vite.",
      },
      {
        title: "Tailwind CSS con Laravel",
        code: true,
        fixed: ["php"],
        php: "@import 'tailwindcss';\n\nbody {\n    @apply bg-slate-100 text-slate-900;\n}\n\n// En un componente Blade:\n<div class=\"rounded-lg bg-white p-4 shadow\">Hola</div>",
        note: "Tailwind se integra muy bien con Laravel y Vite. Si usas Tailwind, puedes combinar clases utilitarias directamente en Blade o en componentes.",
      },
      {
        title: "JavaScript del lado del cliente",
        code: true,
        fixed: ["php"],
        php: "import './bootstrap';\n\nconst boton = document.querySelector('#guardar');\n\nboton?.addEventListener('click', () => {\n    console.log('Guardar pedido');\n});",
        note: "El JavaScript puede vivir en resources/js/app.js y conectarse a eventos del DOM sin mezclar la lógica del frontend con la lógica de negocio del backend.",
      },
      {
        title: "Full-stack frente a API",
        php: "Un proyecto full stack usa Blade + Vite + formularios y rutas web; un proyecto API entrega JSON y deja el frontend en React, Vue o una SPA aparte.\n\nLaravel puede servir ambos modelos. La clave es decidir si el navegador renderiza HTML desde Blade o si el backend se comporta como API para otra interfaz.",
      },
      {
        title: "Siguiente nivel tras frontend",
        php: "Documentación oficial de frontend: https://laravel-docs.com/es/docs/10.x/frontend\nBlade: https://laravel.com/docs/10.x/blade\nVite: https://laravel.com/docs/10.x/vite\nBootcamp oficial: https://bootcamp.laravel.com",
      },
    ],
  },
  {
    level: 7,
    title: "Base de datos y Eloquent",
    topics: [
      {
        title: "Configurar la base de datos",
        code: true,
        fixed: ["php"],
        php: "DB_CONNECTION=mysql\nDB_HOST=127.0.0.1\nDB_PORT=3306\nDB_DATABASE=mi_tienda\nDB_USERNAME=usuario\nDB_PASSWORD=contraseña\n\n$ php artisan config:clear",
        note: "Usa credenciales locales de desarrollo en tu .env y secretos seguros proporcionados por el entorno en producción.",
      },
      {
        title: "Crear una migración",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:model Producto -m\n\n// database/migrations/..._create_productos_table.php\nSchema::create('productos', function (Blueprint $table) {\n    $table->id();\n    $table->string('nombre');\n    $table->decimal('precio', 8, 2);\n    $table->unsignedInteger('stock')->default(0);\n    $table->timestamps();\n});",
      },
      {
        title: "Ejecutar y revertir migraciones",
        code: true,
        fixed: ["php"],
        php: "$ php artisan migrate\n$ php artisan migrate:status\n$ php artisan migrate:rollback\n$ php artisan migrate:fresh --seed",
        note: "migrate:fresh elimina todas las tablas: úsalo solo en una base de datos desechable de desarrollo o pruebas.",
      },
      {
        title: "Definir un modelo Eloquent",
        code: true,
        fixed: ["php"],
        php: "namespace App\\Models;\n\nuse Illuminate\\Database\\Eloquent\\Factories\\HasFactory;\nuse Illuminate\\Database\\Eloquent\\Model;\n\nclass Producto extends Model\n{\n    use HasFactory;\n\n    protected $fillable = ['nombre', 'precio', 'stock'];\n\n    protected $casts = [\n        'precio' => 'decimal:2',\n        'stock' => 'integer',\n    ];\n}",
        note: "Declara solo los atributos que permites asignar en masa; no marques indiscriminadamente todos los campos como fillable.",
      },
      {
        title: "Consultar, crear y actualizar registros",
        code: true,
        fixed: ["php"],
        php: "$productos = Producto::where('stock', '>', 0)\n    ->orderBy('nombre')\n    ->get();\n\n$producto = Producto::create([\n    'nombre' => 'Teclado',\n    'precio' => 120.00,\n]);\n\n$producto->update(['stock' => 10]);",
      },
      {
        title: "Crear colecciones",
        code: true,
        fixed: ["php"],
        php: "$numeros = collect([1, 2, 3]);\n\n// Las consultas Eloquent con get() también devuelven colecciones.\n$productos = Producto::where('activo', true)->get();",
        note: "Illuminate\\Support\\Collection ofrece métodos fluidos para trabajar con arrays. Eloquent devuelve su propia colección, que amplía la colección base con operaciones específicas para modelos.",
      },
      {
        title: "Transformar y filtrar elementos",
        code: true,
        fixed: ["php"],
        php: "$nombres = collect(['ana', 'luis', 'sofia'])\n    ->map(fn (string $nombre) => ucfirst($nombre))\n    ->filter(fn (string $nombre) => str_starts_with($nombre, 'S'))\n    ->values();\n\n// Resultado: ['Sofia']",
        note: "map transforma cada elemento; filter conserva los que cumplen el criterio. La mayoría de los métodos de transformación devuelven una nueva colección, por lo que puedes encadenarlos.",
      },
      {
        title: "Extraer campos y agrupar elementos",
        code: true,
        fixed: ["php"],
        php: "$productos = collect([\n    ['nombre' => 'Teclado', 'categoria' => 'accesorios', 'precio' => 80, 'destacado' => true],\n    ['nombre' => 'Mouse', 'categoria' => 'accesorios', 'precio' => 35, 'destacado' => false],\n    ['nombre' => 'Monitor', 'categoria' => 'pantallas', 'precio' => 250, 'destacado' => true],\n]);\n\n$nombres = $productos->pluck('nombre');\n$porCategoria = $productos->groupBy('categoria');",
        note: "pluck obtiene los valores de una clave; groupBy organiza elementos bajo una clave común. Ambos métodos son útiles para preparar datos de vistas y respuestas.",
      },
      {
        title: "Buscar y ordenar colecciones",
        code: true,
        fixed: ["php"],
        php: "$destacados = $productos\n    ->where('destacado', true)\n    ->sortBy('precio')\n    ->values();\n\n$hayTeclado = $productos->contains('nombre', 'Teclado');\n$primero = $productos->first();",
        note: "where filtra por clave y valor, sortBy ordena por atributo, contains comprueba si hay coincidencia y first devuelve el primer elemento (o null si no existe).",
      },
      {
        title: "Calcular totales y reducir datos",
        code: true,
        fixed: ["php"],
        php: "$total = $productos->sum('precio');\n$promedio = $productos->avg('precio');\n\n$totalConImpuesto = $productos->reduce(function (float $acumulado, array $producto) {\n    return $acumulado + $producto['precio'] * 1.16;\n}, 0);",
        note: "sum y avg calculan agregados directamente, incluso sobre un atributo. reduce combina todos los elementos en un único resultado usando un acumulador.",
      },
      {
        title: "Procesar colecciones por partes",
        code: true,
        fixed: ["php"],
        php: "$productos->chunk(100)->each(function ($grupo) {\n    // Procesar este grupo de hasta 100 elementos.\n});\n\n$productos->each(function (array $producto) {\n    logger($producto['nombre']);\n});",
        note: "chunk divide una colección en grupos y each permite ejecutar una acción por elemento. Para recorrer grandes conjuntos de registros sin cargarlos todos en memoria, considera los métodos de iteración por bloques de Eloquent como chunkById.",
      },
      {
        title: "Obtener los datos subyacentes",
        code: true,
        fixed: ["php"],
        php: "$coleccion = collect(['nombre' => 'Ana', 'rol' => 'editora']);\n\n$elementos = $coleccion->all();\n$arreglo = $coleccion->toArray();\n\n$json = $coleccion->toJson();",
        note: "all devuelve el arreglo interno. toArray convierte también los elementos que implementan la interfaz Arrayable; toJson genera su representación JSON.",
      },
      {
        title: "Guía de Collections de Laravel 10",
        php: "Collections en español: https://laravel-docs.com/es/docs/10.x/collections\nEloquent: https://laravel-docs.com/es/docs/10.x/eloquent\nRespuestas JSON: https://laravel-docs.com/es/docs/10.x/responses",
      },
      {
        title: "Relaciones uno a muchos",
        code: true,
        fixed: ["php"],
        php: "// App\\Models\\Categoria\npublic function productos(): HasMany\n{\n    return $this->hasMany(Producto::class);\n}\n\n// App\\Models\\Producto\npublic function categoria(): BelongsTo\n{\n    return $this->belongsTo(Categoria::class);\n}\n\n$categoria->productos()->create(['nombre' => 'Mouse', 'precio' => 45]);",
      },
      {
        title: "Evitar el problema N+1",
        code: true,
        fixed: ["php"],
        php: "$productos = Producto::with('categoria')->get();\n\nforeach ($productos as $producto) {\n    echo $producto->categoria->nombre;\n}",
        note: "La carga anticipada (eager loading) obtiene las relaciones en consultas agrupadas en vez de consultar por cada producto.",
      },
      {
        title: "Transacciones de base de datos",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\DB;\n\nDB::transaction(function () use ($datos) {\n    $pedido = Pedido::create($datos['pedido']);\n    $pedido->items()->createMany($datos['items']);\n});",
        note: "Si ocurre una excepción, la transacción revierte todos los cambios del bloque.",
      },
    ],
  },
  {
    level: 8,
    title: "Validación y operaciones CRUD",
    topics: [
      {
        title: "Validar una petición",
        code: true,
        fixed: ["php"],
        php: "public function store(Request $request)\n{\n    $datos = $request->validate([\n        'nombre' => ['required', 'string', 'max:150'],\n        'precio' => ['required', 'numeric', 'min:0'],\n        'stock' => ['required', 'integer', 'min:0'],\n    ]);\n\n    Producto::create($datos);\n    return redirect()->route('productos.index');\n}",
      },
      {
        title: "Form Requests para reglas reutilizables",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:request GuardarProductoRequest\n\n// app/Http/Requests/GuardarProductoRequest.php\npublic function rules(): array\n{\n    return [\n        'nombre' => ['required', 'string', 'max:150'],\n        'precio' => ['required', 'numeric', 'min:0'],\n    ];\n}\n\n// En el controlador\npublic function store(GuardarProductoRequest $request)\n{\n    Producto::create($request->validated());\n}",
      },
      {
        title: "Validar datos únicos al actualizar",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Validation\\Rule;\n\n$request->validate([\n    'correo' => [\n        'required',\n        'email',\n        Rule::unique('usuarios', 'correo')->ignore($usuario->id),\n    ],\n]);",
        note: "Ignora el identificador del modelo actual, no un valor arbitrario enviado por el usuario.",
      },
      {
        title: "Almacenar archivos de forma segura",
        code: true,
        fixed: ["php"],
        php: "$datos = $request->validate([\n    'imagen' => ['required', 'image', 'max:2048'],\n]);\n\n$ruta = $request->file('imagen')->store('productos', 'public');\n$producto->update(['imagen' => $ruta]);",
        note: "Valida tipo y tamaño, y configura correctamente el disco. No confíes en el nombre o la extensión enviados por el cliente.",
      },
      {
        title: "Discos y configuración de Filesystem",
        php: "config/filesystems.php define discos con un driver y una ruta raíz. La API Storage es la misma aunque los archivos estén en el servidor local o en un servicio remoto.\n\nEl disco local guarda por defecto en storage/app; el disco public está pensado para contenido público y Amazon S3 permite almacenar objetos en la nube. También puedes definir varios discos para un mismo driver.",
        note: "Mantén credenciales de S3 o SFTP en variables de entorno o en el gestor de secretos del servidor; no las incluyas en el repositorio.",
      },
      {
        title: "Elegir un disco y guardar archivos",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Storage;\n\nStorage::disk('local')->put('reportes/hoy.txt', $contenido);\nStorage::disk('s3')->put('avatares/1.jpg', $contenido);\n\n// Sin disk(), se usa el disco predeterminado.\nStorage::put('reportes/ayer.txt', $contenido);",
        note: "Las rutas son relativas a la raíz del disco seleccionado. Storage::put puede recibir contenido o un recurso PHP; para archivos grandes, transmitir el flujo puede reducir el uso de memoria.",
      },
      {
        title: "Guardar archivos cargados desde una petición",
        code: true,
        fixed: ["php"],
        php: "$datos = $request->validate([\n    'documento' => ['required', 'file', 'mimes:pdf,txt', 'max:5120'],\n]);\n\n$archivo = $request->file('documento');\n$ruta = $archivo->store('documentos', 'local');\n\n// Elegir explícitamente un nombre y una ubicación:\n$rutaConNombre = $archivo->storeAs(\n    'documentos',\n    Str::uuid().'.'.$archivo->extension(),\n    'local',\n);",
        note: "El ejemplo guarda en el disco local, fuera del enlace público predeterminado. Valida el tipo y tamaño en el servidor y genera un nombre seguro; no guardes directamente el nombre proporcionado por el usuario ni aceptes una ruta arbitraria.",
      },
      {
        title: "Archivos públicos y enlaces simbólicos",
        code: true,
        fixed: ["php"],
        php: "$ruta = $request->file('imagen')->store('productos', 'public');\n\n# Vincula storage/app/public con public/storage:\n$ php artisan storage:link\n\n$url = Storage::disk('public')->url($ruta);",
        note: "El disco public se usa para contenido que cualquiera puede consultar. No coloques documentos personales, credenciales ni archivos que requieran autorización en una ubicación públicamente accesible.",
      },
      {
        title: "Leer, descargar y consultar archivos",
        code: true,
        fixed: ["php"],
        php: "if (Storage::disk('local')->exists($ruta)) {\n    $contenido = Storage::disk('local')->get($ruta);\n    $tamano = Storage::disk('local')->size($ruta);\n    $mime = Storage::disk('local')->mimeType($ruta);\n}\n\nreturn Storage::disk('local')->download($ruta, 'documento.pdf');",
        note: "Comprueba el acceso del usuario antes de entregar un archivo privado. exists(), size(), mimeType() y lastModified() permiten consultar archivos sin asumir que la ruta local existe.",
      },
      {
        title: "Generar URLs temporales para archivos privados",
        code: true,
        fixed: ["php"],
        php: "$url = Storage::disk('s3')->temporaryUrl(\n    $ruta,\n    now()->addMinutes(5),\n);",
        note: "Las URLs temporales de S3 dan acceso durante un periodo limitado y pueden compartirse sin exponer credenciales. temporaryUrl depende de las capacidades del driver; la guía de Laravel 10 documenta soporte para S3.",
      },
      {
        title: "Copiar, mover y eliminar archivos",
        code: true,
        fixed: ["php"],
        php: "Storage::disk('local')->copy('borradores/reporte.pdf', 'reportes/reporte.pdf');\nStorage::disk('local')->move('temporal/foto.jpg', 'productos/foto.jpg');\nStorage::disk('local')->delete('temporal/obsoleto.txt');\nStorage::disk('local')->deleteDirectory('temporal');",
        note: "Valida y limita las rutas que se operan con datos de usuario. deleteDirectory elimina todo el contenido de ese directorio en el disco.",
      },
      {
        title: "Configurar S3, SFTP y discos con ámbito",
        php: "Para S3 instala el adaptador requerido por Flysystem y configura bucket, región y credenciales en config/filesystems.php. SFTP también requiere su adaptador.\n\nLaravel permite definir discos con ámbito (scoped) para restringir operaciones a un prefijo y discos de solo lectura cuando una integración solo debe consultar archivos.",
        note: "Instala únicamente el adaptador del driver que tu aplicación vaya a utilizar. Un disco con ámbito reduce el área de trabajo, pero no sustituye la autorización de cada usuario.",
      },
      {
        title: "Detectar y reportar errores de escritura",
        code: true,
        fixed: ["php"],
        php: "if (! Storage::disk('local')->put($ruta, $contenido)) {\n    throw new RuntimeException('No se pudo guardar el archivo.');\n}\n\n// Alternativa: configurar 'throw' => true en el disco\n// para que los errores de escritura lancen una excepción.",
        note: "No asumas que una escritura tuvo éxito. Comprueba el resultado o configura el disco para lanzar excepciones y registra el fallo sin incluir contenido sensible.",
      },
      {
        title: "Guía de Filesystem de Laravel 10",
        php: "Filesystem en español: https://laravel-docs.com/es/docs/10.x/filesystem\nValidación de archivos: https://laravel-docs.com/es/docs/10.x/validation#validating-files\nRequests: https://laravel-docs.com/es/docs/10.x/requests\nStorage: https://laravel-docs.com/es/docs/10.x/filesystem",
      },
      {
        title: "Soft deletes",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Database\\Eloquent\\SoftDeletes;\n\nclass Producto extends Model\n{\n    use SoftDeletes;\n}\n\n$producto->delete();             // marca deleted_at\nProducto::withTrashed()->get();  // incluye eliminados\n$producto->restore();",
        note: "La tabla requiere una columna deleted_at; genera la migración con $table->softDeletes().",
      },
      {
        title: "Reglas de validación y su formato",
        code: true,
        fixed: ["php"],
        php: `$datos = $request->validate([
    'titulo' => ['required', 'string', 'max:150'],
    'descripcion' => ['nullable', 'string'],
    'publicado' => ['sometimes', 'boolean'],
    'fecha_publicacion' => ['nullable', 'date'],
]);`,
        note: "Las reglas se pueden escribir como cadenas separadas por | o como arreglos; los arreglos facilitan reglas con parámetros y objetos Rule. required exige un valor, nullable permite null, y sometimes valida el campo solo cuando viene en la solicitud.",
      },
      {
        title: "Detener reglas ante el primer error de un campo",
        code: true,
        fixed: ["php"],
        php: `$datos = $request->validate([
    'correo' => ['bail', 'required', 'email', 'unique:users,email'],
    'nombre' => ['required', 'string', 'max:100'],
]);`,
        note: "bail detiene las reglas restantes para ese atributo después del primer fallo. No detiene necesariamente la validación de los demás campos.",
      },
      {
        title: "Validar datos anidados y listas",
        code: true,
        fixed: ["php"],
        php: `$datos = $request->validate([
    'direccion.ciudad' => ['required', 'string'],
    'items' => ['required', 'array', 'min:1'],
    'items.*.producto_id' => ['required', 'integer', 'exists:productos,id'],
    'items.*.cantidad' => ['required', 'integer', 'min:1'],
]);`,
        note: "La notación con puntos valida campos anidados y el asterisco aplica reglas a cada elemento de una colección. Define explícitamente qué claves se aceptan para arreglos de entrada.",
      },
      {
        title: "Reglas condicionales",
        code: true,
        fixed: ["php"],
        php: `use Illuminate\\Validation\\Rule;

$datos = $request->validate([
    'tipo' => ['required', Rule::in(['persona', 'empresa'])],
    'razon_social' => [
        Rule::requiredIf($request->input('tipo') === 'empresa'),
        'nullable',
        'string',
    ],
    'codigo_promocional' => ['nullable', 'string'],
    'descuento' => ['exclude_unless:codigo_promocional,VIP', 'numeric', 'min:0'],
]);`,
        note: "Laravel incluye reglas como required_if, required_unless, exclude_if y exclude_unless. Usa reglas condicionales para expresar el contrato del formulario; no sustituyen la autorización del usuario.",
      },
      {
        title: "Mensajes y nombres de atributos personalizados",
        code: true,
        fixed: ["php"],
        php: `$datos = $request->validate(
    ['correo' => ['required', 'email']],
    [
        'correo.required' => 'Escribe tu correo electrónico.',
        'correo.email' => 'El formato del correo no es válido.',
    ],
    ['correo' => 'correo electrónico']
);`,
        note: "El segundo argumento de validate() permite personalizar mensajes por campo y regla; el tercero asigna nombres legibles a los atributos. Para traducir mensajes de forma global, publica los archivos de idioma con php artisan lang:publish.",
      },
      {
        title: "Mostrar errores y recuperar entradas previas",
        code: true,
        fixed: ["php"],
        php: `@error('correo')
    <p class="error">{{ $message }}</p>
@enderror

<input name="correo" value="{{ old('correo') }}">

@if ($errors->any())
    <ul>
        @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
        @endforeach
    </ul>
@endif`,
        note: "Con el middleware web, un fallo de validación normalmente redirige a la página anterior y coloca errores y datos anteriores en la sesión. old() ayuda a reponer campos; escapa siempre su salida con {{ }}.",
      },
      {
        title: "Validación y errores en una API",
        code: true,
        fixed: ["php"],
        php: `// Si la solicitud espera JSON y falla la validación:
// Laravel responde con HTTP 422 y un objeto errors.
{
    "message": "The email field must be a valid email address.",
    "errors": {
        "email": ["The email field must be a valid email address."]
    }
}`,
        note: "Cuando el cliente espera JSON (por ejemplo, con Accept: application/json), Laravel convierte automáticamente ValidationException en una respuesta 422. Los nombres de campos anidados aparecen aplanados con notación de puntos.",
      },
      {
        title: "Validar en un Form Request",
        code: true,
        fixed: ["php"],
        php: `$ php artisan make:request GuardarPedidoRequest

// app/Http/Requests/GuardarPedidoRequest.php
public function authorize(): bool
{
    return $this->user()?->can('create', Pedido::class) ?? false;
}

public function rules(): array
{
    return [
        'items' => ['required', 'array', 'min:1'],
        'items.*.producto_id' => ['required', 'exists:productos,id'],
    ];
}

// Laravel valida antes de entrar al controlador:
public function store(GuardarPedidoRequest $request)
{
    $datos = $request->validated();
}`,
        note: "Form Requests agrupan reglas y autorización específicas de una operación. Si authorize() devuelve false, se rechaza la solicitud; mantener esa decisión separada de las reglas de formato evita confundir permisos con validez de datos.",
      },
      {
        title: "Personalizar un Form Request",
        code: true,
        fixed: ["php"],
        php: `public function messages(): array
{
    return [
        'items.required' => 'Agrega al menos un producto.',
    ];
}

public function attributes(): array
{
    return [
        'items.*.producto_id' => 'producto',
    ];
}

protected function prepareForValidation(): void
{
    $this->merge([
        'codigo' => strtoupper((string) $this->input('codigo')),
    ]);
}`,
        note: "messages() y attributes() personalizan el error del request. prepareForValidation() permite normalizar datos antes de validar; úsalo para transformaciones previsibles, no para confiar en datos ni reemplazar reglas.",
      },
      {
        title: "Obtener únicamente datos validados",
        code: true,
        fixed: ["php"],
        php: `$datos = $request->validated();
$soloContacto = $request->safe()->only(['nombre', 'correo']);
$sinInternos = $request->safe()->except(['es_admin']);`,
        note: "Usa validated() o safe() en persistencia y evita pasar todo el input de la solicitud a modelos. Define reglas para cada campo esperado, especialmente en arreglos anidados, para evitar aceptar claves no contempladas.",
      },
      {
        title: "Usar el validador manualmente",
        code: true,
        fixed: ["php"],
        php: `use Illuminate\\Support\\Facades\\Validator;

$validator = Validator::make($request->all(), [
    'correo' => ['required', 'email'],
    'edad' => ['required', 'integer', 'min:18'],
]);

if ($validator->fails()) {
    return redirect()->back()
        ->withErrors($validator)
        ->withInput();
}

$datos = $validator->validated();`,
        note: "Validator::make resulta útil cuando no se usa el flujo automático de Request::validate(), o cuando la validación debe controlarse explícitamente. En formularios con varias secciones puedes usar bolsas de errores nombradas para evitar mezclar mensajes.",
      },
      {
        title: "Validaciones posteriores y errores con nombre",
        code: true,
        fixed: ["php"],
        php: `use Illuminate\\Validation\\Validator;

// En un Form Request:
public function rules(): array
{
    return [
        'inicio' => ['required', 'date'],
        'fin' => ['required', 'date', 'after_or_equal:inicio'],
    ];
}

// Para verificaciones de negocio que no expresa una regla integrada:
public function after(): array
{
    return [
        function (Validator $validator) {
            if ($validator->errors()->isNotEmpty()) {
                return;
            }

            if ($this->reglaAdicionalNoSeCumple()) {
                $validator->errors()->add(
                    'fin',
                    'La combinación de fechas no está permitida.'
                );
            }
        },
    ];
}

// Para una bolsa de errores con Request:
$request->validateWithBag('pedido', [
    'correo' => ['required', 'email'],
]);`,
        note: "after() permite añadir comprobaciones que dependen de varios valores una vez ejecutadas las reglas iniciales. Valida presencia y tipo antes de compararlos; las bolsas nombradas separan los errores de formularios independientes.",
      },
      {
        title: "Crear una regla de validación personalizada",
        code: true,
        fixed: ["php"],
        php: `$ php artisan make:rule CodigoProducto

// app/Rules/CodigoProducto.php
use Closure;
use Illuminate\\Contracts\\Validation\\ValidationRule;

public function validate(
    string $attribute,
    mixed $value,
    Closure $fail
): void {
    if (! is_string($value) || ! preg_match('/^[A-Z]{3}-[0-9]{4}$/', $value)) {
        $fail('El :attribute debe tener el formato ABC-1234.');
    }
}`,
        note: "Una regla propia encapsula una condición reutilizable y se aplica como una instancia dentro del arreglo de reglas. Mantén el mensaje traducible y evita consultas costosas por cada elemento de una lista.",
      },
      {
        title: "Validar cargas de archivos",
        code: true,
        fixed: ["php"],
        php: `$datos = $request->validate([
    'documento' => [
        'required',
        'file',
        'mimes:pdf',
        'max:5120',
    ],
]);

$ruta = $request->file('documento')->store('documentos');`,
        note: "Valida que el archivo exista, su tipo y tamaño antes de almacenarlo. El nombre y la extensión enviados por el cliente no son confiables; configura el disco y los permisos de acceso de acuerdo con el uso del archivo.",
      },
      {
        title: "Probar errores de validación",
        code: true,
        fixed: ["php"],
        php: `$response = $this->post('/productos', [
    'nombre' => '',
    'precio' => -1,
]);

$response->assertSessionHasErrors(['nombre', 'precio']);

$api = $this->postJson('/api/productos', []);
$api->assertUnprocessable()
    ->assertJsonValidationErrors(['nombre', 'precio']);`,
        note: "Prueba el comportamiento de formularios web y APIs según sus contratos de respuesta: errores en sesión para web y JSON 422 para endpoints que esperan JSON.",
      },
      {
        title: "Guía completa de validación",
        php: "Validación de Laravel 10 en español: https://laravel-docs.com/es/docs/10.x/validation\nRequests: https://laravel-docs.com/es/docs/10.x/requests\nForm Requests: https://laravel-docs.com/es/docs/10.x/validation#form-request-validation\nPruebas: https://laravel-docs.com/es/docs/10.x/testing\nLocalización: https://laravel-docs.com/es/docs/10.x/localization",
      },
    ],
  },
  {
    level: 9,
    title: "Autenticación y autorización",
    topics: [
      {
        title: "Autenticación y sesiones",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Auth;\n\nif (Auth::attempt($request->only('email', 'password'))) {\n    $request->session()->regenerate();\n    return redirect()->intended('/panel');\n}\n\nreturn back()->withErrors([\n    'email' => 'Las credenciales no son válidas.',\n]);",
        note: "Regenera la sesión después de autenticar para prevenir la fijación de sesión. Usa un starter oficial para scaffolding de pantallas de autenticación.",
      },
      {
        title: "Proteger rutas con middleware auth",
        code: true,
        fixed: ["php"],
        php: "Route::middleware('auth')->group(function () {\n    Route::get('/panel', [PanelController::class, 'index']);\n    Route::post('/salir', [SesionController::class, 'destroy'])\n        ->name('logout');\n});",
      },
      {
        title: "Hash de contraseñas",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Hash;\n\n$usuario->password = Hash::make($request->input('password'));\n$usuario->save();\n\nif (Hash::check($passwordIngresada, $usuario->password)) {\n    // La contraseña coincide.\n}",
        note: "Nunca almacenes contraseñas en texto plano ni uses un hash rápido como MD5 o SHA-1.",
      },
      {
        title: "Policies para permisos sobre modelos",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:policy ProductoPolicy --model=Producto\n\n// ProductoPolicy\npublic function update(User $user, Producto $producto): bool\n{\n    return $user->id === $producto->propietario_id;\n}\n\n// Controlador\n$this->authorize('update', $producto);",
      },
      {
        title: "Roles y permisos",
        code: true,
        fixed: ["php"],
        php: "if ($request->user()->can('update', $producto)) {\n    // El usuario puede actualizar este producto.\n}\n\nRoute::delete('/usuarios/{user}', [UsuarioController::class, 'destroy'])\n    ->middleware('can:delete,user');",
        note: "Las Policies centralizan autorización relacionada con modelos. La autenticación identifica al usuario; la autorización decide qué puede hacer.",
      },
    ],
  },
  {
    level: 10,
    title: "APIs y manejo de errores",
    topics: [
      {
        title: "Definir rutas de API",
        code: true,
        fixed: ["php"],
        php: "// routes/api.php\nuse Illuminate\\Support\\Facades\\Route;\n\nRoute::apiResource('productos', ProductoApiController::class)\n    ->middleware('auth:sanctum');",
        note: "Las rutas API son sin estado y usan el prefijo /api. Configura la autenticación de API según el cliente y el riesgo.",
      },
      {
        title: "Responder JSON y códigos HTTP",
        code: true,
        fixed: ["php"],
        php: "return response()->json([\n    'data' => $producto,\n], 201);\n\nreturn response()->json([\n    'message' => 'Producto no encontrado',\n], 404);",
      },
      {
        title: "API Resources para transformar modelos",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:resource ProductoResource\n\n// ProductoResource\npublic function toArray($request): array\n{\n    return [\n        'id' => $this->id,\n        'nombre' => $this->nombre,\n        'precio' => $this->precio,\n    ];\n}\n\nreturn new ProductoResource($producto);",
      },
      {
        title: "Middleware propio",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:middleware VerificarCuentaActiva\n\npublic function handle($request, Closure $next)\n{\n    if (! $request->user()?->activa) {\n        abort(403);\n    }\n\n    return $next($request);\n}",
      },
      {
        title: "Limitar solicitudes",
        code: true,
        fixed: ["php"],
        php: "Route::middleware('throttle:60,1')->group(function () {\n    Route::get('/reportes', [ReporteController::class, 'index']);\n});\n\n// La cuota es de 60 solicitudes por minuto.",
        note: "Ajusta los límites al tipo de endpoint y a tu infraestructura; un límite no reemplaza la autenticación ni la autorización.",
      },
      {
        title: "CORS y manejo de errores",
        code: true,
        fixed: ["php"],
        php: "// config/cors.php\n'paths' => ['api/*'],\n'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE'],\n'allowed_origins' => ['https://app.ejemplo.com'],\n\n// Producción\nAPP_DEBUG=false",
        note: "Permite solo los orígenes y métodos necesarios. No expongas trazas, consultas SQL ni secretos en errores de producción.",
      },
    ],
  },
  {
    level: 11,
    title: "Pruebas, eventos y tareas",
    topics: [
      {
        title: "Crear una prueba de feature",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:test ListaProductosTest\n\npublic function test_muestra_productos(): void\n{\n    Producto::factory()->count(3)->create();\n\n    $this->get('/productos')\n        ->assertOk()\n        ->assertSee('Productos');\n}",
        note: "Las pruebas feature ejercitan varias partes de la aplicación juntas, como rutas, middleware, controladores y vistas.",
      },
      {
        title: "Probar APIs y validación",
        code: true,
        fixed: ["php"],
        php: "public function test_rechaza_un_producto_sin_nombre(): void\n{\n    $this->postJson('/api/productos', ['precio' => 10])\n        ->assertUnprocessable()\n        ->assertJsonValidationErrors(['nombre']);\n}",
      },
      {
        title: "Factories y seeders",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:factory ProductoFactory --model=Producto\n$ php artisan make:seeder ProductoSeeder\n\nProducto::factory()->count(20)->create();\n\n$ php artisan db:seed",
        note: "Usa datos de prueba ficticios. No ejecutes seeders destructivos sobre producción.",
      },
      {
        title: "Eventos y listeners",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:event PedidoCreado\n$ php artisan make:listener EnviarConfirmacionPedido\n\n// Despachar un evento\nPedidoCreado::dispatch($pedido);",
        note: "Los eventos separan quien anuncia que algo pasó de los listeners que reaccionan.",
      },
      {
        title: "Registrar y descubrir listeners",
        code: true,
        fixed: ["php"],
        php: "// app/Providers/EventServiceProvider.php\nprotected $listen = [\n    PedidoCreado::class => [\n        EnviarConfirmacionPedido::class,\n    ],\n];\n\n$ php artisan event:list\n$ php artisan event:generate",
        note: "En Laravel 10 registra normalmente las relaciones en EventServiceProvider. El descubrimiento automático está desactivado por defecto; puedes habilitarlo sobrescribiendo shouldDiscoverEvents().",
      },
      {
        title: "Definir un evento como contenedor de datos",
        code: true,
        fixed: ["php"],
        php: "// app/Events/PedidoCreado.php\nuse App\\Models\\Pedido;\nuse Illuminate\\Foundation\\Events\\Dispatchable;\nuse Illuminate\\Queue\\SerializesModels;\n\nclass PedidoCreado\n{\n    use Dispatchable, SerializesModels;\n\n    public function __construct(public Pedido $pedido) {}\n}\n\nPedidoCreado::dispatch($pedido);",
        note: "Un evento suele transportar los datos relevantes del hecho ocurrido sin asumir qué acciones lo procesarán. SerializesModels facilita serializar modelos Eloquent cuando se envían a listeners en cola.",
      },
      {
        title: "Responder a un evento desde un listener",
        code: true,
        fixed: ["php"],
        php: "// app/Listeners/EnviarConfirmacionPedido.php\nclass EnviarConfirmacionPedido\n{\n    public function handle(PedidoCreado $event): void\n    {\n        // Enviar la confirmación usando $event->pedido.\n    }\n}",
        note: "Laravel inyecta la instancia tipada del evento en handle(). Puedes registrar varios listeners para el mismo evento; cada uno se ocupa de una responsabilidad.",
      },
      {
        title: "Registrar listeners manuales y wildcard",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Event;\n\nEvent::listen(PedidoCreado::class, EnviarConfirmacionPedido::class);\n\nEvent::listen('pedido.*', function (string $nombreEvento, array $datos) {\n    // Listener wildcard para eventos con el prefijo pedido.\n});",
        note: "Para la mayoría de listeners de clase usa el mapa $listen del EventServiceProvider. Los registros manuales y wildcard sirven para integraciones o casos transversales.",
      },
      {
        title: "Poner listeners lentos en cola",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Contracts\\Queue\\ShouldQueue;\n\nclass EnviarConfirmacionPedido implements ShouldQueue\n{\n    public $connection = 'redis';\n    public $queue = 'notificaciones';\n    public $delay = 10;\n\n    public function handle(PedidoCreado $event): void\n    {\n        // Enviar correo sin bloquear la petición que creó el pedido.\n    }\n}",
        note: "Configura una conexión de cola y mantén un worker activo. Puedes decidir la conexión, cola o retraso en tiempo de ejecución con viaConnection(), viaQueue() y withDelay().",
      },
      {
        title: "Controlar reintentos y fallos del listener",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Contracts\\Queue\\ShouldQueue;\nuse Throwable;\n\nclass EnviarConfirmacionPedido implements ShouldQueue\n{\n    public $tries = 3;\n\n    public function handle(PedidoCreado $event): void\n    {\n        // Acción que puede fallar temporalmente.\n    }\n\n    public function failed(PedidoCreado $event, Throwable $error): void\n    {\n        // Registrar o notificar el fallo definitivo.\n    }\n}",
        note: "Define reintentos y una estrategia idempotente para evitar duplicar efectos. Un listener puede implementar shouldQueue() para decidir en tiempo de ejecución si debe enviarse a la cola.",
      },
      {
        title: "Despachar listeners después de confirmar la transacción",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Contracts\\Events\\ShouldHandleEventsAfterCommit;\nuse Illuminate\\Contracts\\Queue\\ShouldQueue;\n\nclass EnviarConfirmacionPedido implements ShouldQueue, ShouldHandleEventsAfterCommit\n{\n    public function handle(PedidoCreado $event): void\n    {\n        // El pedido ya está confirmado en la base de datos.\n    }\n}",
        note: "Un worker podría procesar el listener antes de que la transacción termine y no encontrar los datos recién creados. ShouldHandleEventsAfterCommit aplaza este listener hasta la confirmación.",
      },
      {
        title: "Probar el despacho de eventos",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Event;\n\nEvent::fake();\n\nPedidoCreado::dispatch($pedido);\n\nEvent::assertDispatched(PedidoCreado::class);\nEvent::assertListening(\n    PedidoCreado::class,\n    EnviarConfirmacionPedido::class,\n);",
        note: "Event::fake evita ejecutar listeners reales durante una prueba y permite comprobar qué eventos se despacharon y qué listeners están registrados.",
      },
      {
        title: "Optimizar el registro de eventos en producción",
        code: true,
        fixed: ["php"],
        php: "$ php artisan event:cache\n\n# Eliminar el manifiesto de eventos en caché:\n$ php artisan event:clear",
        note: "Incluye event:cache en el despliegue cuando corresponda para evitar descubrir listeners en cada solicitud. Si cambias el registro, vuelve a generar o limpiar el manifiesto.",
      },
      {
        title: "Documentación de Events de Laravel 10",
        php: "Events en español: https://laravel-docs.com/es/docs/10.x/events\nBroadcasting: https://laravel-docs.com/es/docs/10.x/broadcasting\nColas: https://laravel-docs.com/es/docs/10.x/queues\nPruebas: https://laravel-docs.com/es/docs/10.x/testing",
      },
      {
        title: "Broadcasting y actualizaciones en tiempo real",
        php: "Broadcasting transmite eventos del servidor al navegador por WebSockets. El cliente se suscribe a canales con Laravel Echo y recibe cambios sin tener que recargar la página.\n\nEn Laravel 10 puedes usar servicios como Reverb, Pusher Channels o Ably. Elige el driver en config/broadcasting.php y define sus credenciales en el entorno del servidor.",
        note: "Broadcasting transporta eventos; no reemplaza la autenticación, autorización ni la lógica de negocio. No publiques secretos en el código JavaScript.",
      },
      {
        title: "Configurar el servidor de broadcasting",
        code: true,
        fixed: ["php"],
        php: "# Instalar Reverb como servidor WebSocket, si ese es el driver elegido:\n$ composer require laravel/reverb\n$ php artisan reverb:install\n\n# Revisar config/broadcasting.php y .env.\n# Para Pusher, instala su SDK PHP y configura sus credenciales.\n# Laravel también ofrece los drivers log y null para depurar o desactivar.",
        note: "En Laravel 10 verifica que App\\Providers\\BroadcastServiceProvider esté habilitado en config/app.php. Para los eventos en cola configura el driver y ejecuta un worker; en producción administra y supervisa ambos procesos.",
      },
      {
        title: "Crear un evento que se difunde",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:event EstadoPedidoActualizado\n\nclass EstadoPedidoActualizado implements ShouldBroadcast\n{\n    public function __construct(public Pedido $pedido) {}\n\n    public function broadcastOn(): array\n    {\n        return [new PrivateChannel('orders.'.$this->pedido->id)];\n    }\n}\n\nEstadoPedidoActualizado::dispatch($pedido);",
        note: "Importa ShouldBroadcast y PrivateChannel desde Illuminate. Solo las propiedades públicas se envían por defecto; limita el evento a los datos que el cliente realmente necesita. ShouldBroadcast envía mediante la cola.",
      },
      {
        title: "Autorizar canales privados",
        code: true,
        fixed: ["php"],
        php: "// routes/channels.php\nBroadcast::channel('orders.{orderId}', function (User $user, int $orderId) {\n    $pedido = Pedido::find($orderId);\n\n    return $pedido !== null && $pedido->user_id === $user->id;\n});",
        note: "Los canales privados requieren autenticación y una autorización del lado servidor para cada suscripción. Comprueba que el usuario tenga acceso al recurso; conocer o adivinar el ID nunca debe bastar.",
      },
      {
        title: "Escuchar eventos con Laravel Echo",
        code: true,
        fixed: ["php"],
        php: "# Instala las dependencias JavaScript para el driver elegido:\n$ npm install --save-dev laravel-echo pusher-js\n\n// Inicializa Echo en resources/js/bootstrap.js según Reverb o Pusher.\nwindow.Echo.private('orders.' + orderId)\n    .listen('EstadoPedidoActualizado', (event) => {\n        console.log(event.pedido);\n    });\n\n$ npm run dev",
        note: "Configura Echo con el mismo host, clave pública y driver del servidor. Usa Vite para compilar los assets; las variables VITE_* son visibles para el navegador y no deben contener secretos.",
      },
      {
        title: "Canales públicos, privados y de presencia",
        code: true,
        fixed: ["php"],
        php: "new Channel('news')                  // público\nnew PrivateChannel('orders.'.$id)   // requiere autorización\nnew PresenceChannel('chat.'.$room)  // presencia de miembros autorizados",
        note: "Un canal público no exige autorización. Los privados protegen el acceso a eventos; los de presencia también informan qué usuarios autorizados están conectados. Elige el canal según los datos y la experiencia que expones.",
      },
      {
        title: "Elegir entre broadcasting en cola o inmediato",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Contracts\\Broadcasting\\ShouldBroadcast;\n\nclass PedidoActualizado implements ShouldBroadcast\n{\n    // Se procesa mediante un worker de colas.\n}\n\n// ShouldBroadcastNow omite la cola y difunde durante la petición.",
        note: "Prefiere ShouldBroadcast para evitar que la entrega WebSocket alargue la petición. ShouldBroadcastNow puede ser útil en casos puntuales, pero bloquea la respuesta mientras se difunde.",
      },
      {
        title: "Probar eventos broadcast",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Broadcast;\n\nBroadcast::fake();\n\nEstadoPedidoActualizado::dispatch($pedido);\n\nBroadcast::assertBroadcasted(EstadoPedidoActualizado::class);",
        note: "Aísla las pruebas del servicio WebSocket. Prueba por separado que la autorización del canal permita al propietario y rechace a otros usuarios.",
      },
      {
        title: "Guía de Broadcasting de Laravel 10",
        php: "Broadcasting en español: https://laravel-docs.com/es/docs/10.x/broadcasting\nEventos: https://laravel-docs.com/es/docs/10.x/events\nColas: https://laravel-docs.com/es/docs/10.x/queues\nVite: https://laravel-docs.com/es/docs/10.x/vite\nReverb: https://laravel.com/docs/10.x/reverb",
      },
      {
        title: "Colas y jobs",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:job ProcesarPedido\n\nProcesarPedido::dispatch($pedido);\n\n$ php artisan queue:work",
        note: "Configura un driver de cola persistente en producción, supervisa los workers y define reintentos e idempotencia.",
      },
      {
        title: "Tareas programadas",
        code: true,
        fixed: ["php"],
        php: "// app/Console/Kernel.php\nprotected function schedule(Schedule $schedule): void\n{\n    $schedule->command('reportes:generar')->dailyAt('02:00');\n}\n\n// El servidor ejecuta el scheduler cada minuto:\n* * * * * cd /ruta/mi-tienda && php artisan schedule:run",
      },
    ],
  },
  {
    level: 12,
    title: "Rendimiento y producción",
    topics: [
      {
        title: "Caché de consultas",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Cache;\n\n$productos = Cache::remember('productos.destacados', 300, function () {\n    return Producto::where('destacado', true)->get();\n});",
        note: "Elige una clave, duración e invalidación que mantengan los datos coherentes. En producción considera Redis o un backend compartido.",
      },
      {
        title: "Configurar drivers de caché",
        php: "Laravel unifica el acceso a distintos almacenes desde config/cache.php. Laravel 10 incluye drivers file, database, Redis, Memcached y DynamoDB; array y null son útiles en pruebas y escenarios especiales.\n\nEl driver file viene configurado por defecto. Para varias instancias de la aplicación, elige un almacén compartido como Redis o una base de datos para que todos los servidores vean las mismas claves.",
        note: "Cada driver tiene requisitos propios. Redis requiere PhpRedis o predis/predis; el driver database necesita una tabla de caché que puedes generar con php artisan cache:table y aplicar con php artisan migrate.",
      },
      {
        title: "Leer, guardar y expirar valores",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Cache;\n\n$tema = Cache::get('usuario.tema', 'claro');\nCache::put('usuario.tema', 'oscuro', now()->addMinutes(30));\n\nif (Cache::has('usuario.tema')) {\n    // La clave existe.\n}\n\nCache::forget('usuario.tema');",
        note: "get devuelve el valor predeterminado cuando la clave no existe. Define expiraciones apropiadas: los datos que cambian deben invalidarse o caducar para no servir información obsoleta.",
      },
      {
        title: "Recordar el resultado de una operación",
        code: true,
        fixed: ["php"],
        php: "$productos = Cache::remember('productos.destacados', now()->addMinutes(10), function () {\n    return Producto::where('destacado', true)->get();\n});\n\n$ajustes = Cache::rememberForever('ajustes.publicos', function () {\n    return Ajuste::publicos()->get();\n});",
        note: "remember ejecuta el callback solo si la clave no está en caché y guarda su resultado. rememberForever no expira automáticamente, así que debes invalidarlo cuando cambien los datos.",
      },
      {
        title: "Usar almacenes y helper de caché",
        code: true,
        fixed: ["php"],
        php: "$valor = Cache::store('file')->get('clave');\nCache::store('redis')->put('catalogo', $catalogo, 600);\n\n// El helper global también permite acceder a la caché:\n$usuario = cache('usuario.actual');\ncache()->remember('categorias', 300, fn () => Categoria::all());",
        note: "Los nombres de almacén deben existir en la sección stores de config/cache.php. Usa claves con nombres claros y prefijos de dominio para reducir colisiones.",
      },
      {
        title: "Actualizar valores e inicializar claves",
        code: true,
        fixed: ["php"],
        php: "Cache::add('contador.visitas', 0, now()->addHours(4));\nCache::increment('contador.visitas');\nCache::decrement('contador.visitas', 2);\n\n$mensaje = Cache::pull('mensaje.temporal'); // obtiene y elimina\nCache::forever('version.catalogo', 'v2');\nCache::forget('version.catalogo');",
        note: "add es atómico y solo guarda la clave si aún no existe. increment y decrement operan sobre valores enteros; forever requiere invalidación manual.",
      },
      {
        title: "Usar bloqueos atómicos",
        code: true,
        fixed: ["php"],
        php: "$lock = Cache::lock('reporte:diario', 60);\n\nif ($lock->get()) {\n    try {\n        // Solo un proceso ejecuta esta sección a la vez.\n    } finally {\n        $lock->release();\n    }\n}\n\n// Esperar hasta 5 segundos por el bloqueo:\nCache::lock('reporte:diario', 60)->block(5, function () {\n    // El bloqueo se libera al terminar el callback.\n});",
        note: "Los bloqueos requieren un driver compatible y, en varias instancias, un almacén central compartido. Establece una duración suficiente y libera el bloqueo incluso si ocurre una excepción.",
      },
      {
        title: "Limpiar la caché con cuidado",
        code: true,
        fixed: ["php"],
        php: "Cache::forget('productos.destacados');\n\n// Borra todo el almacén, no solo las claves de esta función:\nCache::flush();\n\n# Artisan también permite limpiar la caché predeterminada:\n$ php artisan cache:clear",
        note: "flush no respeta el prefijo configurado y puede borrar entradas compartidas con otras aplicaciones. En general invalida claves concretas en vez de vaciar todo el almacén.",
      },
      {
        title: "Guía de caché de Laravel 10",
        php: "Caché en español: https://laravel-docs.com/es/docs/10.x/cache\nRedis: https://laravel-docs.com/es/docs/10.x/redis\nConfiguración: https://laravel-docs.com/es/docs/10.x/configuration\nPruebas: https://laravel-docs.com/es/docs/10.x/testing",
      },
      {
        title: "Optimizar consultas",
        code: true,
        fixed: ["php"],
        php: "$pedidos = Pedido::query()\n    ->with(['usuario:id,nombre', 'items.producto'])\n    ->latest()\n    ->paginate(25);\n\n// Revisa las consultas y agrega índices según los patrones reales.",
        note: "Evita cargar columnas y relaciones que no necesitas. Mide antes de optimizar.",
      },
      {
        title: "Laravel Pennant y feature flags",
        code: true,
        fixed: ["php"],
        php: "use Laravel\\Pennant\\Feature;\n\nFeature::define('nuevo-catalogo', fn (User $user) => $user->es_beta);\n\nif (Feature::active('nuevo-catalogo')) {\n    // Mostrar la nueva experiencia.\n}",
        note: "Pennant se presentó junto con Laravel 10. Controla gradualmente funcionalidades y retira las flags temporales cuando ya no hagan falta.",
      },
      {
        title: "Ejecutar procesos externos",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Process;\n\n$resultado = Process::timeout(30)\n    ->run(['git', 'status', '--short']);\n\nif ($resultado->successful()) {\n    return $resultado->output();\n}",
        note: "Laravel 10 introdujo la facade Process. Pasa argumentos separados, valida entradas y no construyas comandos concatenando texto no confiable.",
      },
      {
        title: "Configuración de producción",
        code: true,
        fixed: ["php"],
        php: "APP_ENV=production\nAPP_DEBUG=false\nAPP_KEY=base64:clave-generada-para-el-entorno\n\n$ php artisan config:cache\n$ php artisan route:cache\n$ php artisan view:cache\n$ php artisan migrate --force",
        note: "Mantén APP_KEY y credenciales fuera del repositorio. Haz copias de seguridad y revisa el impacto de migraciones antes del despliegue.",
      },
      {
        title: "Seguridad antes del despliegue",
        php: "Valida todos los datos de entrada. Usa Eloquent o consultas parametrizadas; nunca concatentes datos del usuario en SQL.\n\nAplica autorización en el servidor, protege formularios web con CSRF, limita intentos sensibles, valida archivos y sirve el sitio por HTTPS.\n\nMantén dependencias actualizadas. Laravel 10 terminó sus correcciones de seguridad el 4 de febrero de 2025; evita exponer una aplicación Laravel 10 nueva en producción.",
      },
      {
        title: "Seguir aprendiendo",
        php: "Configuración: https://laravel-docs.com/es/docs/10.x/configuration\nGuía de actualización a Laravel 10: https://laravel.com/docs/10.x/upgrade\nPruebas: https://laravel.com/docs/10.x/testing\nSeguridad: https://laravel.com/docs/10.x/security\nColas: https://laravel.com/docs/10.x/queues\nDespliegue: https://laravel.com/docs/10.x/deployment\nVersiones y soporte: https://laravel-docs.com/es/docs/10.x/releases",
      },
    ],
  },
  {
    level: 13,
    title: "Configuración de Laravel",
    topics: [
      {
        title: "Dónde vive la configuración",
        php: "Los archivos de configuración del framework están en config/. Ahí se configuran conexiones de base de datos, correo, zona horaria, clave de cifrado y otros servicios.\n\nLee la configuración resumida de la aplicación:\n$ php artisan about\n\nFiltra una sección o inspecciona un archivo:\n$ php artisan about --only=environment\n$ php artisan config:show database",
      },
      {
        title: "Configurar por entorno con DotEnv",
        code: true,
        fixed: ["php"],
        php: "# Laravel parte de .env.example y durante la instalación\n# prepara el .env local.\nAPP_ENV=local\nAPP_DEBUG=true\nAPP_URL=http://localhost\n\n# En equipo, comparte .env.example con marcadores,\n# nunca las credenciales reales de una máquina.",
        note: "Variables de entorno externas del sistema o del servidor pueden sobrescribir valores del archivo .env.",
      },
      {
        title: "Usar archivos .env específicos por entorno",
        code: true,
        fixed: ["php"],
        php: "# Laravel puede cargar .env.staging si el entorno staging\n# se especifica desde fuera del archivo o por CLI:\n$ php artisan comando --env=staging\n\n# APP_ENV=staging también puede venir del entorno del servidor.",
        note: "Cuando se selecciona un entorno, Laravel intenta cargar .env.[APP_ENV]; si no existe, usa .env.",
      },
      {
        title: "Tipos y valores en archivos .env",
        code: true,
        fixed: ["php"],
        php: "APP_NAME=\"Mi aplicación web\"\nAPP_DEBUG=true\nFEATURE_ACTIVA=(false)\nVACIO=(empty)\nSIN_VALOR=(null)\n\n# env() interpreta true/false, empty y null\n# en sus formas simples y entre paréntesis.",
        note: "Normalmente DotEnv trata los valores como texto. Usa comillas dobles cuando el valor contiene espacios.",
      },
      {
        title: "Leer variables de entorno desde la configuración",
        code: true,
        fixed: ["php"],
        php: "// config/app.php\n'debug' => env('APP_DEBUG', false),\n\n// En la aplicación, consulta la configuración:\n$debug = config('app.debug');",
        note: "Usa env() dentro de los archivos config/. En otras partes de la aplicación usa config(), especialmente porque .env no se carga al cachear la configuración.",
      },
      {
        title: "Detectar el entorno de ejecución",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\App;\n\n$entorno = App::environment();\n\nif (App::environment('local')) {\n    // Comportamiento solo para desarrollo local.\n}\n\nif (App::environment(['local', 'staging'])) {\n    // Se ejecuta en cualquiera de esos entornos.\n}",
        note: "APP_ENV del entorno del servidor puede definir o sobrescribir el entorno de la aplicación.",
      },
      {
        title: "Proteger archivos de entorno",
        php: "No agregues .env sin cifrar al control de versiones: contiene configuración y puede incluir secretos. Comparte .env.example con nombres y valores de marcador para que el equipo sepa qué variables debe configurar.\n\nLaravel permite cifrar archivos de entorno para almacenar el archivo cifrado en el repositorio. Protege la clave de descifrado en un gestor de secretos y nunca la incluyas en el mismo repositorio.",
      },
      {
        title: "Cifrar un archivo .env",
        code: true,
        fixed: ["php"],
        php: "$ php artisan env:encrypt\n\n# Opcional: selecciona entorno o cifrado.\n$ php artisan env:encrypt --env=staging\n$ php artisan env:encrypt --cipher=AES-256-CBC",
        note: "Laravel guarda el contenido cifrado en .env.encrypted y muestra una clave. Guárdala en un gestor de contraseñas o secretos; no la compartas ni la registres en logs. También puedes pasar una clave propia con --key. AES-256-CBC requiere una clave de 32 caracteres.",
      },
      {
        title: "Descifrar un archivo de entorno",
        code: true,
        fixed: ["php"],
        php: "$ php artisan env:decrypt\n$ php artisan env:decrypt --env=staging\n$ php artisan env:decrypt --force",
        note: "Laravel lee la clave desde LARAVEL_ENV_ENCRYPTION_KEY o puedes proporcionarla con --key. Al descifrar se crea el .env en texto plano; --force sobrescribe un archivo existente. Inyecta claves desde un gestor de secretos y no las guardes en el código.",
      },
      {
        title: "Leer valores de configuración",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Config;\n\n$zona = Config::get('app.timezone');\n$zona = config('app.timezone');\n\n// Valor por defecto si la clave no existe:\n$zona = config('app.timezone', 'UTC');",
      },
      {
        title: "Cambiar configuración durante la ejecución",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Config;\n\nConfig::set('app.timezone', 'America/Bogota');\n\n// También puedes pasar un arreglo:\nconfig(['app.timezone' => 'America/Bogota']);",
        note: "Este cambio vive en la ejecución actual; no sustituye la configuración persistente por entorno o por archivo config.",
      },
      {
        title: "Cachear la configuración en producción",
        code: true,
        fixed: ["php"],
        php: "# Durante el despliegue de producción:\n$ php artisan config:cache\n\n# Si necesitas regenerarla:\n$ php artisan config:clear",
        note: "No cachees durante el desarrollo local si editas configuración con frecuencia. Una vez cacheada, Laravel no carga .env durante las solicitudes o comandos Artisan; env() solo encuentra variables externas del sistema.",
      },
      {
        title: "Evitar errores al cachear la configuración",
        php: "Llama env() únicamente desde archivos de configuración en config/. En código de aplicación, controladores y servicios consulta config('archivo.clave').\n\nAl ejecutar config:cache, el archivo .env deja de cargarse en las solicitudes y comandos Artisan. Por eso una llamada env('APP_DEBUG') directa fuera de config puede devolver un valor inesperado.",
      },
      {
        title: "Modo debug y APP_DEBUG",
        code: true,
        fixed: ["php"],
        php: "# Desarrollo local\nAPP_DEBUG=true\n\n# Producción\nAPP_DEBUG=false",
        note: "El modo debug controla cuánto detalle se muestra en los errores. En producción debe estar siempre en false para no exponer configuración ni datos sensibles.",
      },
      {
        title: "Activar el modo mantenimiento",
        code: true,
        fixed: ["php"],
        php: "$ php artisan down\n\n# Opcional: refrescar cada 15 segundos y sugerir reintento\n$ php artisan down --refresh=15 --retry=60",
        note: "Las solicitudes reciben HTTP 503 y una vista de mantenimiento. Durante este modo no se procesan trabajos de cola; se reanudan al salir del modo.",
      },
      {
        title: "Permitir acceso con un token durante mantenimiento",
        code: true,
        fixed: ["php"],
        php: "# Usa un token aleatorio, difícil de adivinar y confidencial.\n$ php artisan down --secret=\"<token-aleatorio-seguro>\"\n\n# También puedes pedirle a Laravel que lo genere:\n$ php artisan down --with-secret",
        note: "El acceso especial establece una cookie de omisión para ese navegador. No uses tokens predecibles ni caracteres con significado especial en URL, como ? o &.",
      },
      {
        title: "Pre-renderizar la página de mantenimiento",
        code: true,
        fixed: ["php"],
        php: "$ php artisan down --render=\"errors::503\"",
        note: "La vista se prepara para poder mostrarse antes de cargar todas las dependencias de la aplicación durante un despliegue.",
      },
      {
        title: "Redirigir solicitudes durante mantenimiento",
        code: true,
        fixed: ["php"],
        php: "$ php artisan down --redirect=/mantenimiento",
        note: "Puedes redirigir las solicitudes hacia una URI específica en lugar de mostrar la página de mantenimiento para cada URL.",
      },
      {
        title: "Personalizar y desactivar mantenimiento",
        code: true,
        fixed: ["php"],
        php: "# Crea resources/views/errors/503.blade.php\n# para personalizar la página de mantenimiento.\n\n# Cuando termine el despliegue:\n$ php artisan up",
      },
      {
        title: "Despliegues con menos tiempo de inactividad",
        php: "El modo mantenimiento produce un periodo de indisponibilidad. Para reducirlo o evitarlo, la guía sugiere considerar plataformas y herramientas de despliegue como Laravel Vapor o Envoyer, según la arquitectura del proyecto.",
      },
      {
        title: "Guía completa de configuración Laravel 10",
        php: "Configuración 10.x en español: https://laravel-docs.com/es/docs/10.x/configuration\nInstalación 10.x: https://laravel-docs.com/es/docs/10.x/installation\nVariables de entorno y despliegue: revisa siempre la configuración específica de tu entorno.",
      },
    ],
  },
  {
    level: 14,
    title: "Estructura de Laravel",
    topics: [
      {
        title: "Cómo entender la estructura del proyecto",
        php: "La estructura predeterminada de Laravel sirve como punto de partida para proyectos pequeños y grandes. Puedes organizar tu aplicación de otra manera si Composer puede cargar automáticamente las clases.\n\nLa mayoría del código propio vive en app/. Artisan puede crear directorios a medida que los necesites; no todos aparecen en una instalación nueva.",
      },
      {
        title: "Vista general del directorio raíz",
        code: true,
        fixed: ["php"],
        php: "app/        ← código principal de la aplicación\nbootstrap/  ← inicio del framework y cachés generadas\nconfig/     ← configuración\ndatabase/   ← migraciones, factories y seeders\npublic/     ← punto de entrada web y recursos públicos\nresources/  ← vistas y recursos sin compilar\nroutes/     ← rutas HTTP, consola y broadcasting\nstorage/    ← logs, cachés, sesiones y archivos generados\ntests/      ← pruebas automatizadas\nvendor/     ← dependencias instaladas por Composer",
      },
      {
        title: "El directorio app",
        php: "app/ contiene la mayoría de las clases de la aplicación. Por defecto usa el namespace App y Composer las carga mediante PSR-4.\n\nHttp y Console son entradas hacia la lógica de la aplicación: HTTP y CLI son formas diferentes de invocar esa lógica. Mantén las reglas del negocio organizadas en clases propias en lugar de concentrarlas todas en controladores o comandos.",
      },
      {
        title: "bootstrap: inicio y cachés del framework",
        code: true,
        fixed: ["php"],
        php: "bootstrap/app.php   ← crea e inicia la aplicación Laravel\nbootstrap/cache/    ← archivos generados para optimizar servicios y rutas",
        note: "Normalmente no necesitas modificar los archivos de bootstrap/cache; Laravel y Artisan los generan.",
      },
      {
        title: "config: opciones de la aplicación",
        code: true,
        fixed: ["php"],
        php: "config/app.php       ← opciones generales de la aplicación\nconfig/database.php  ← conexiones y drivers de base de datos\nconfig/mail.php      ← configuración de correo\nconfig/             ← otros servicios del framework",
        note: "Revisa la configuración antes de personalizar. Usa variables de entorno desde config/ y consulta luego los valores mediante config().",
      },
      {
        title: "database: migraciones, factories y seeders",
        code: true,
        fixed: ["php"],
        php: "database/\n├── migrations/  ← cambios versionados del esquema\n├── factories/   ← generación de modelos de prueba\n├── seeders/     ← datos iniciales o de desarrollo\n└── database.sqlite  ← ubicación posible de una base SQLite",
        note: "SQLite puede vivir dentro de database/. No almacenes datos reales de usuarios dentro del repositorio.",
      },
      {
        title: "public: punto de entrada web",
        code: true,
        fixed: ["php"],
        php: "public/\n├── index.php  ← punto de entrada de las solicitudes y carga automática\n├── build/     ← recursos compilados, según la configuración\n└── imágenes, CSS y JavaScript públicos",
        note: "Configura el servidor web para servir únicamente la carpeta public/. No expongas la raíz del proyecto: podría revelar .env y código interno.",
      },
      {
        title: "resources: vistas y recursos fuente",
        code: true,
        fixed: ["php"],
        php: "resources/\n├── views/  ← plantillas Blade\n├── css/    ← hojas de estilo fuente\n└── js/     ← JavaScript fuente",
        note: "CSS y JavaScript fuente suelen compilarse con Vite; public/ contiene los archivos que el servidor entrega al navegador.",
      },
      {
        title: "routes: cuatro puntos de entrada",
        code: true,
        fixed: ["php"],
        php: "routes/web.php       ← rutas web con sesión, cookies y CSRF\nroutes/api.php       ← rutas API sin estado\nroutes/console.php   ← comandos de consola basados en closures\nroutes/channels.php  ← canales de eventos broadcast",
        note: "Una instalación puede no utilizar todos los archivos de rutas. Cada archivo corresponde a un tipo de entrada diferente.",
      },
      {
        title: "Rutas web frente a rutas API",
        php: "web.php se carga con middleware web: sesión, cookies cifradas y protección CSRF. Es apropiado para páginas web tradicionales y formularios.\n\napi.php se carga con middleware api y está pensado para solicitudes sin estado; no depende de la sesión web. Protege estas rutas mediante autenticación por tokens cuando corresponda, por ejemplo con Sanctum.",
      },
      {
        title: "Rutas de consola",
        code: true,
        fixed: ["php"],
        php: "// routes/console.php: comandos basados en closures\nArtisan::command('saludar', function () {\n    $this->comment('¡Hola!');\n});",
        note: "Este archivo registra comandos de consola basados en closures; no define rutas HTTP.",
      },
      {
        title: "Rutas de canales broadcast",
        code: true,
        fixed: ["php"],
        php: "// routes/channels.php\nBroadcast::channel('orders.{orderId}', function ($user, $orderId) {\n    return (int) $user->id === (int) $orderId;\n});",
        note: "Este archivo autoriza quién puede escuchar los canales de eventos en tiempo real. Si la aplicación no usa broadcasting, quizá no necesites esta funcionalidad.",
      },
      {
        title: "storage: archivos generados y logs",
        code: true,
        fixed: ["php"],
        php: "storage/\n├── app/       ← archivos generados por la aplicación\n│   └── public/← archivos que pueden exponerse públicamente\n├── framework/ ← cachés, vistas compiladas y sesiones\n└── logs/      ← registros de la aplicación\n\n$ php artisan storage:link",
        note: "storage:link crea public/storage apuntando a storage/app/public. Guarda ahí solo archivos destinados a ser públicos; conserva archivos privados en un disco privado.",
      },
      {
        title: "Cambiar la ubicación de storage",
        code: true,
        fixed: ["php"],
        php: "# Variable de entorno del sistema o del servidor:\nLARAVEL_STORAGE_PATH=/ruta/segura/storage",
        note: "Laravel permite cambiar la ubicación del directorio storage mediante LARAVEL_STORAGE_PATH. Configura permisos adecuados en el destino.",
      },
      {
        title: "tests: pruebas automatizadas",
        code: true,
        fixed: ["php"],
        php: "tests/\n├── Feature/  ← integración de varias partes de la aplicación\n└── Unit/     ← pruebas de unidades de código\n\n# Ejecutar con Laravel:\n$ php artisan test\n\n# También puedes usar PHPUnit:\n$ vendor/bin/phpunit",
        note: "Las clases de prueba terminan en Test. Laravel incluye ejemplos de pruebas unitarias y feature que puedes tomar como referencia.",
      },
      {
        title: "vendor: dependencias de Composer",
        code: true,
        fixed: ["php"],
        php: "vendor/  ← paquetes instalados por Composer\ncomposer.json       ← dependencias declaradas\ncomposer.lock       ← versiones resueltas del proyecto",
        note: "No edites manualmente los paquetes dentro de vendor/: Composer puede regenerarlos. Añade dependencias mediante Composer.",
      },
      {
        title: "app/Console: comandos propios y scheduler",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:command ImportarCatalogo\n\napp/Console/Commands/ImportarCatalogo.php\napp/Console/Kernel.php  ← registro de comandos y tareas programadas",
        note: "En Laravel 10, Console contiene comandos Artisan personalizados y el kernel de consola donde se registran comandos y tareas programadas.",
      },
      {
        title: "app/Http: controladores, middleware y requests",
        code: true,
        fixed: ["php"],
        php: "app/Http/\n├── Controllers/  ← controladores HTTP\n├── Middleware/   ← filtros antes o después de una petición\n└── Requests/     ← Form Requests y validación",
        note: "La lógica para responder las solicitudes entrantes normalmente vive en esta área, separada en controladores, middleware y requests.",
      },
      {
        title: "app/Models: modelos Eloquent",
        code: true,
        fixed: ["php"],
        php: "app/Models/Producto.php\n\nclass Producto extends Model\n{\n    protected $fillable = ['nombre', 'precio'];\n}\n\n$productos = Producto::where('activo', true)->get();",
        note: "Los modelos Eloquent representan datos y permiten consultar y modificar registros mediante el ORM.",
      },
      {
        title: "app/Exceptions: excepciones de la aplicación",
        php: "app/Exceptions/ contiene el manejador de excepciones y es un lugar adecuado para excepciones propias.\n\nEn Laravel 10, modifica Handler cuando necesites personalizar cómo se registran o presentan los errores. Evita mostrar detalles internos o secretos a los usuarios.",
      },
      {
        title: "app/Providers: registrar servicios",
        php: "Los service providers preparan la aplicación: registran servicios en el contenedor, listeners de eventos u otras integraciones. Los providers existentes están en app/Providers; crea uno propio cuando necesites añadir una integración transversal.",
      },
      {
        title: "Directorios app creados bajo demanda",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:channel OrdenChannel       # app/Broadcasting\n$ php artisan make:event PedidoCreado            # app/Events\n$ php artisan make:job ProcesarPedido             # app/Jobs\n$ php artisan make:listener EnviarConfirmacion    # app/Listeners\n$ php artisan make:mail ReciboPedido               # app/Mail\n$ php artisan make:notification PedidoEnviado     # app/Notifications\n$ php artisan make:policy PedidoPolicy             # app/Policies\n$ php artisan make:rule CodigoValido               # app/Rules\n\n$ php artisan list make",
        note: "Broadcasting, Events, Jobs, Listeners, Mail, Notifications, Policies y Rules pueden no existir en un proyecto nuevo: Artisan los crea cuando generas la primera clase de ese tipo.",
      },
      {
        title: "app/Broadcasting: canales de eventos",
        php: "app/Broadcasting/ contiene clases de canales para eventos broadcast. No existe necesariamente desde el inicio; Artisan lo crea al generar un canal con make:channel.",
      },
      {
        title: "app/Events y app/Listeners",
        php: "Events/ contiene clases que anuncian que ocurrió algo; Listeners/ contiene las clases que reaccionan a ese evento. Esta separación reduce el acoplamiento entre quien produce un hecho y las tareas que deben responder.\n\nArtisan puede generar estas clases con make:event y make:listener.",
      },
      {
        title: "app/Jobs: trabajos de cola",
        php: "Jobs/ contiene trabajos que la aplicación puede encolar o ejecutar de forma síncrona. Son útiles para aislar tareas como procesar un pedido o enviar un correo fuera del flujo principal.\n\nEl directorio suele crearse con php artisan make:job.",
      },
      {
        title: "app/Mail y app/Notifications",
        php: "Mail/ contiene clases que representan correos que envía la aplicación; Notifications/ contiene notificaciones transaccionales que pueden entregarse por canales como correo, SMS, Slack o base de datos.\n\nSe crean con make:mail y make:notification.",
      },
      {
        title: "app/Policies y app/Rules",
        php: "Policies/ agrupa decisiones de autorización sobre recursos: por ejemplo, si una persona puede editar un pedido. Rules/ encapsula reglas de validación reutilizables y complejas.\n\nArtisan puede crearlas con make:policy y make:rule.",
      },
      {
        title: "Generar clases siguiendo las convenciones",
        code: true,
        fixed: ["php"],
        php: "$ php artisan list make\n$ php artisan make:model Producto -m\n$ php artisan make:controller ProductoController --resource\n$ php artisan make:request GuardarProductoRequest",
        note: "Los comandos make generan archivos en los directorios convencionales, reducen errores de nombres y ayudan a mantener una estructura familiar para el equipo.",
      },
      {
        title: "Guía completa de estructura Laravel 10",
        php: "Estructura 10.x en español: https://laravel-docs.com/es/docs/10.x/structure\nInstalación: https://laravel-docs.com/es/docs/10.x/installation\nConfiguración: https://laravel-docs.com/es/docs/10.x/configuration",
      },
    ],
  },
  {
    level: 15,
    title: "Contenedor de servicios e inyección de dependencias",
    topics: [
      {
        title: "¿Qué es el contenedor de servicios?",
        php: "El contenedor de Laravel administra la creación de objetos y sus dependencias. En vez de que una clase construya por su cuenta todo lo que necesita, Laravel puede recibir esas dependencias e inyectarlas.\n\nEsta técnica se llama inyección de dependencias y facilita sustituir servicios y probar el código.",
      },
      {
        title: "Inyección por constructor",
        code: true,
        fixed: ["php"],
        php: "class PedidoController extends Controller\n{\n    public function __construct(\n        protected PedidoRepository $pedidos,\n    ) {}\n\n    public function show(string $id)\n    {\n        return $this->pedidos->findOrFail($id);\n    }\n}",
        note: "El contenedor crea PedidoController e inyecta PedidoRepository. La clase declara claramente lo que necesita y no busca dependencias globales por su cuenta.",
      },
      {
        title: "Resolución automática sin configuración",
        code: true,
        fixed: ["php"],
        php: "class GeneradorSaludo\n{\n    public function mensaje(): string\n    {\n        return 'Hola desde Laravel';\n    }\n}\n\nRoute::get('/', function (GeneradorSaludo $saludo) {\n    return $saludo->mensaje();\n});",
        note: "Laravel puede resolver automáticamente clases concretas y sus dependencias concretas. A menudo basta con declarar el tipo en la ruta, constructor o método.",
      },
      {
        title: "Cuándo registrar bindings manualmente",
        php: "No necesitas registrar cada clase. Un binding es útil principalmente cuando una clase depende de una interfaz y Laravel necesita saber qué implementación concreta usar, o cuando un paquete debe registrar sus servicios.\n\nControladores, middleware, listeners y otros componentes Laravel suelen resolverse automáticamente.",
      },
      {
        title: "Registrar un binding en un service provider",
        code: true,
        fixed: ["php"],
        php: "// app/Providers/AppServiceProvider.php\nuse App\\Services\\PodcastParser;\nuse App\\Services\\Transistor;\nuse Illuminate\\Contracts\\Foundation\\Application;\n\npublic function register(): void\n{\n    $this->app->bind(Transistor::class, function (Application $app) {\n        return new Transistor($app->make(PodcastParser::class));\n    });\n}",
        note: "Los bindings suelen registrarse en el método register() de un proveedor de servicios. $this->app es el contenedor de la aplicación.",
      },
      {
        title: "Vincular una interfaz con su implementación",
        code: true,
        fixed: ["php"],
        php: "// app/Providers/AppServiceProvider.php\n$this->app->bind(\n    EventPusher::class,\n    RedisEventPusher::class,\n);\n\n// Una clase puede depender de la abstracción:\npublic function __construct(\n    protected EventPusher $pusher,\n) {}",
        note: "El contenedor inyectará RedisEventPusher donde se solicite EventPusher. La aplicación depende del contrato, no de una implementación rígida.",
      },
      {
        title: "Qué son los Contracts de Laravel",
        php: "Los Contracts son interfaces que describen servicios centrales del framework sin imponer una implementación concreta. Por ejemplo, Illuminate\\Contracts\\Queue\\Queue define operaciones para encolar trabajos e Illuminate\\Contracts\\Mail\\Mailer describe el envío de correo.\n\nLaravel proporciona las implementaciones y el contenedor las entrega cuando una clase solicita el contrato.",
        note: "Estos contratos pertenecen al framework. No son lo mismo que las interfaces de dominio propias de la aplicación, aunque ambas ayudan a depender de abstracciones.",
      },
      {
        title: "Inyectar un contrato de Laravel",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Contracts\\Cache\\Repository as CacheRepository;\n\nclass CatalogoService\n{\n    public function __construct(\n        protected CacheRepository $cache,\n    ) {}\n\n    public function destacados()\n    {\n        return $this->cache->remember(\n            'productos.destacados',\n            300,\n            fn () => Producto::where('destacado', true)->get(),\n        );\n    }\n}",
        note: "El contenedor resuelve el contrato de caché y lo inyecta al servicio. Controladores, listeners, middleware, trabajos y closures de rutas también pueden recibir dependencias tipadas.",
      },
      {
        title: "Contratos frente a facades",
        php: "Con un contrato, declara la dependencia de forma explícita en el constructor:\n\npublic function __construct(\n    protected CacheRepository $cache,\n) {}\n\nCon una facade, accede al servicio estáticamente:\n\nCache::remember('productos', 300, fn () => Producto::all());",
        note: "Ambos estilos son válidos y se pueden combinar en una misma aplicación. Los contratos hacen visibles las dependencias de la clase; las facades son convenientes y Laravel permite sustituirlas durante las pruebas.",
      },
      {
        title: "Cuándo elegir Contracts",
        php: "Prefiere un contrato cuando quieras que una clase declare explícitamente sus dependencias, facilitar la sustitución por una implementación de prueba o desacoplar un paquete de la implementación concreta del framework.\n\nPara paquetes reutilizables que se integran con componentes Illuminate, illuminate/contracts permite referenciar interfaces sin exigir todas las implementaciones Laravel como dependencias.",
        note: "No es necesario convertir cada servicio en una interfaz. Usa contratos donde aporten una frontera útil; para muchas aplicaciones Laravel, las facades y clases concretas también son una opción adecuada.",
      },
      {
        title: "Cambiar implementaciones para probar",
        php: "Al depender de una interfaz, puedes reemplazar el servicio real por un fake o mock en las pruebas. Así pruebas el comportamiento del consumidor sin necesitar Redis u otro servicio externo.\n\nDefine el binding de prueba apropiado en la configuración de tests o en el propio test, según el alcance que necesites.",
      },
      {
        title: "Elegir el ciclo de vida del binding",
        code: true,
        fixed: ["php"],
        php: "$this->app->bind(Reporte::class, ReporteDiario::class);\n$this->app->singleton(ClienteApi::class, ClienteApiReal::class);\n$this->app->scoped(ContextoSolicitud::class, ContextoSolicitudWeb::class);",
        note: "bind crea una instancia al resolver el servicio; singleton conserva una misma instancia; scoped la conserva durante una solicitud o trabajo y la reinicia al comenzar el siguiente ciclo de vida.",
      },
      {
        title: "Registrar una instancia existente",
        code: true,
        fixed: ["php"],
        php: "$servicio = new ClienteApi($configuracion);\n$this->app->instance(ClienteApi::class, $servicio);",
        note: "instance registra un objeto que ya construiste; las resoluciones posteriores devuelven esa misma instancia.",
      },
      {
        title: "Bindings condicionales",
        code: true,
        fixed: ["php"],
        php: "$this->app->bindIf(Transistor::class, function (Application $app) {\n    return new Transistor($app->make(PodcastParser::class));\n});\n\n$this->app->singletonIf(ClienteApi::class, function (Application $app) {\n    return new ClienteApi($app->make(ApiConfig::class));\n});",
        note: "bindIf y singletonIf registran el binding solo si todavía no existe uno para ese tipo.",
      },
      {
        title: "Bindings contextuales",
        code: true,
        fixed: ["php"],
        php: "$this->app->when(InformeController::class)\n    ->needs(Filesystem::class)\n    ->give(fn () => Storage::disk('local'));\n\n$this->app->when(ExportacionController::class)\n    ->needs(Filesystem::class)\n    ->give(fn () => Storage::disk('s3'));",
        note: "Un binding contextual permite inyectar implementaciones distintas de una misma interfaz según la clase consumidora.",
      },
      {
        title: "Inyectar valores primitivos y configuración",
        code: true,
        fixed: ["php"],
        php: "$this->app->when(ReporteController::class)\n    ->needs('$zonaHoraria')\n    ->giveConfig('app.timezone');\n\n$this->app->when(InformeController::class)\n    ->needs('$limite')\n    ->give(100);",
        note: "Usa needs() para indicar el parámetro constructor requerido y give() o giveConfig() para proporcionar el valor.",
      },
      {
        title: "Binding de dependencias variádicas",
        code: true,
        fixed: ["php"],
        php: "$this->app->when(Firewall::class)\n    ->needs(Filter::class)\n    ->give([\n        NullFilter::class,\n        ProfanityFilter::class,\n        TooLongFilter::class,\n    ]);",
        note: "Para un constructor que recibe Filter ...$filters, give() puede proporcionar la lista de clases que el contenedor resolverá.",
      },
      {
        title: "Etiquetar y resolver grupos de servicios",
        code: true,
        fixed: ["php"],
        php: "$this->app->tag([CpuReport::class, MemoryReport::class], 'reports');\n\n$reportes = $this->app->tagged('reports');",
        note: "Las etiquetas permiten registrar una categoría de servicios y resolverlos todos juntos. Cada clase debe poder resolverse desde el contenedor; también puedes inyectar dependencias etiquetadas con giveTagged().",
      },
      {
        title: "Extender un servicio resuelto",
        code: true,
        fixed: ["php"],
        php: "$this->app->extend(ClienteApi::class, function (ClienteApi $servicio, Application $app) {\n    return new ClienteApiConRegistro($servicio);\n});",
        note: "extend permite decorar o configurar un servicio después de que el contenedor lo crea. El callback recibe el servicio y el contenedor.",
      },
      {
        title: "Resolver servicios manualmente",
        code: true,
        fixed: ["php"],
        php: "$transistor = app()->make(Transistor::class);\n\n// También puedes pasar parámetros que no resuelve el contenedor:\n$transistor = app()->makeWith(Transistor::class, ['id' => 1]);\n\nif (app()->bound(Transistor::class)) {\n    // El tipo tiene un binding explícito.\n}",
        note: "En código de aplicación suele preferirse la inyección automática. make() y makeWith() son útiles cuando de verdad necesitas resolver de forma dinámica.",
      },
      {
        title: "Inyección automática en métodos",
        code: true,
        fixed: ["php"],
        php: "Route::get('/usuarios', function (Request $request) {\n    return $request->user();\n});\n\npublic function handle(UserRepository $usuarios): void\n{\n    // Laravel inyecta el repositorio al ejecutar el job.\n}",
        note: "Además de constructores, Laravel puede inyectar dependencias en rutas, middleware, listeners y el método handle() de trabajos en cola.",
      },
      {
        title: "Invocar métodos con App::call",
        code: true,
        fixed: ["php"],
        php: "$resultado = App::call([new UserReport, 'generate']);\n\n$resultado = App::call(function (UserRepository $usuarios) {\n    return $usuarios->count();\n});",
        note: "App::call() invoca un callable e inyecta sus dependencias tipadas, incluidas las de closures.",
      },
      {
        title: "Escuchar la resolución de servicios",
        code: true,
        fixed: ["php"],
        php: "$this->app->resolving(Transistor::class, function (Transistor $servicio, Application $app) {\n    $servicio->configurar();\n});\n\n$this->app->resolving(function (mixed $objeto, Application $app) {\n    // Se ejecuta para objetos resueltos por el contenedor.\n});",
        note: "El callback recibe el objeto resuelto antes de entregarlo a quien lo solicitó. Usa este hook para configuración transversal, no para ocultar dependencias importantes.",
      },
      {
        title: "Compatibilidad PSR-11",
        code: true,
        fixed: ["php"],
        php: "use Psr\\Container\\ContainerInterface;\n\nRoute::get('/', function (ContainerInterface $contenedor) {\n    $servicio = $contenedor->get(Transistor::class);\n    return $servicio->estado();\n});",
        note: "El contenedor de Laravel implementa PSR-11. Si un identificador no puede resolverse, se lanza una excepción de contenedor; no asumas que get() siempre tendrá éxito.",
      },
      {
        title: "Guía completa del contenedor de Laravel 10",
        php: "Contenedor 10.x en español: https://laravel-docs.com/es/docs/10.x/container\nService providers: https://laravel.com/docs/10.x/providers\nFacades: https://laravel.com/docs/10.x/facades\nPruebas: https://laravel.com/docs/10.x/testing",
      },
      {
        title: "Guía de Contracts de Laravel 10",
        php: "Contracts en español: https://laravel-docs.com/es/docs/10.x/contracts\nContenedor: https://laravel-docs.com/es/docs/10.x/container\nFacades: https://laravel-docs.com/es/docs/10.x/facades\nRepositorio de contratos Illuminate: https://github.com/illuminate/contracts",
      },
    ],
  },
  {
    level: 16,
    title: "Funciones helper de Laravel 10",
    topics: [
      {
        title: "Qué son los helpers",
        php: "Laravel incluye funciones globales de ayuda para tareas frecuentes en aplicaciones PHP: leer datos anidados, construir URLs, resolver rutas del proyecto, trabajar con fechas y manejar valores opcionales.\n\nÚsalas cuando hagan el código más claro. Las facades y clases del framework siguen siendo una alternativa cuando quieras declarar explícitamente el servicio utilizado.",
      },
      {
        title: "Leer y modificar arrays con Arr",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Arr;\n\n$config = ['tienda' => ['moneda' => 'USD']];\n\n$moneda = Arr::get($config, 'tienda.moneda', 'MXN');\nArr::set($config, 'tienda.idioma', 'es');\n$publico = Arr::only($config, ['tienda']);\n$sinCredenciales = Arr::except($config, ['secreto']);",
        note: "Arr::get permite consultar claves anidadas con notación de puntos y un valor predeterminado. only y except ayudan a seleccionar claves; valida qué campos expones antes de devolver datos.",
      },
      {
        title: "Consultar datos anidados en arrays y objetos",
        code: true,
        fixed: ["php"],
        php: "$pedido = [\n    'cliente' => ['nombre' => 'Ana'],\n    'items' => [['nombre' => 'Teclado']],\n];\n\n$nombre = data_get($pedido, 'cliente.nombre');\n$primerItem = data_get($pedido, 'items.0.nombre', 'Sin artículos');\n\n$valor = data_get($pedido, 'items.*.nombre');",
        note: "data_get lee rutas anidadas tanto en arrays como en objetos y admite comodines para colecciones. Usa un valor predeterminado cuando la clave pueda faltar.",
      },
      {
        title: "Comprobar si un valor está vacío o informado",
        code: true,
        fixed: ["php"],
        php: "$sinValor = blank('   ');       // true\n$tieneValor = filled('Laravel'); // true\n\nif (filled($request->input('codigo'))) {\n    // El código contiene un valor no vacío.\n}",
        note: "blank y filled manejan valores vacíos de manera consistente para cadenas, colecciones y otros tipos; no sustituyen la validación de formato, presencia obligatoria o autorización.",
      },
      {
        title: "Agrupar expresiones con with y tap",
        code: true,
        fixed: ["php"],
        php: "$resultado = with(new Producto, function (Producto $producto) {\n    $producto->nombre = 'Teclado';\n    return $producto;\n});\n\n$producto = tap(Producto::findOrFail($id), function (Producto $producto) {\n    $producto->increment('vistas');\n});",
        note: "with entrega un valor a un callback y devuelve el resultado del callback. tap ejecuta un callback sobre el valor y devuelve el valor original, útil para añadir una acción sin romper una cadena.",
      },
      {
        title: "Manejar excepciones con rescue y retry",
        code: true,
        fixed: ["php"],
        php: "$respuesta = rescue(function () {\n    return servicioExterno()->consultar();\n}, report: true);\n\n$datos = retry(3, function () {\n    return servicioExterno()->consultar();\n}, 100);",
        note: "rescue puede devolver un valor de respaldo ante una excepción y reportarla; úsalo solo si existe un fallback válido, nunca para ocultar fallos importantes. retry reintenta una operación propensa a fallos transitorios; limita intentos y demora.",
      },
      {
        title: "Construir rutas y URLs",
        code: true,
        fixed: ["php"],
        php: "$url = route('productos.show', ['producto' => $producto]);\n$inicio = url('/');\n$foto = asset('images/logo.png');\n$segura = secure_asset('images/logo.png');",
        note: "route genera URLs usando nombres de rutas, lo que evita codificar manualmente paths con parámetros. asset apunta a recursos públicos; nunca lo uses para exponer archivos privados.",
      },
      {
        title: "Resolver rutas del proyecto",
        code: true,
        fixed: ["php"],
        php: "$raiz = base_path();\n$configuracion = config_path('app.php');\n$publico = public_path('images');\n$almacenamiento = storage_path('app');\n\n$zonaHoraria = config('app.timezone', 'UTC');",
        note: "Los helpers de rutas construyen ubicaciones a partir de la instalación actual, sin asumir una ruta absoluta fija. Para leer configuración usa config(); reserva env() para archivos config/.",
      },
      {
        title: "Trabajar con fechas y horas",
        code: true,
        fixed: ["php"],
        php: "$ahora = now();\n$hoy = today();\n\n$vence = now()->addDays(7);\n$esHoy = $fecha->isToday();",
        note: "now() y today() devuelven instancias Carbon con la zona horaria configurada en la aplicación. Para lógica sensible a zonas horarias, define y prueba claramente la zona esperada.",
      },
      {
        title: "Abortar una petición y lanzar excepciones condicionales",
        code: true,
        fixed: ["php"],
        php: "abort_unless($pedido->user_id === $request->user()->id, 403);\n\nthrow_if($saldo < $total, new DomainException('Saldo insuficiente'));\nthrow_unless($pedido->exists, new RuntimeException('Pedido no disponible'));",
        note: "abort y sus variantes terminan la petición con un estado HTTP. Usa políticas de autorización para reglas de acceso a recursos; las excepciones de dominio deben manejarse según la estrategia de errores de la aplicación.",
      },
      {
        title: "Escapar HTML de forma segura",
        code: true,
        fixed: ["php"],
        php: "$htmlSeguro = e($valorUsuario);\n\n// En Blade, la interpolación normal también escapa HTML:\n{{ $valorUsuario }}",
        note: "Escapa por defecto los valores no confiables para reducir el riesgo de XSS. No uses {!! !!} con contenido del usuario salvo que lo sanitices con una política adecuada.",
      },
      {
        title: "Helpers cubiertos en otras guías",
        php: "Laravel incluye helpers adicionales como cache(), session(), request(), response(), old(), csrf_token() y collect(). Para aprender cada API con mayor profundidad, consulta también sus módulos específicos: caché, sesiones, requests, responses, CSRF y Collections.",
      },
      {
        title: "Guía de Helpers de Laravel 10",
        php: "Helpers en español: https://laravel-docs.com/es/docs/10.x/helpers\nCollections: https://laravel-docs.com/es/docs/10.x/collections\nURLs: https://laravel-docs.com/es/docs/10.x/urls\nRequests: https://laravel-docs.com/es/docs/10.x/requests\nResponses: https://laravel-docs.com/es/docs/10.x/responses",
      },
    ],
  },
  {
    level: 17,
    title: "Cliente HTTP de Laravel 10",
    topics: [
      {
        title: "Realizar una solicitud HTTP saliente",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Http;\n\n$respuesta = Http::get('https://api.ejemplo.com/productos');\n\nif ($respuesta->successful()) {\n    $productos = $respuesta->json('data', []);\n}",
        note: "El cliente HTTP de Laravel es una API sobre Guzzle, incluido normalmente en la instalación. Una respuesta 4xx o 5xx no lanza excepción automáticamente: inspecciona su estado antes de usar los datos.",
      },
      {
        title: "Enviar datos y parámetros de consulta",
        code: true,
        fixed: ["php"],
        php: "$respuesta = Http::post('https://api.ejemplo.com/pedidos', [\n    'producto_id' => 25,\n    'cantidad' => 2,\n]);\n\n$busqueda = Http::get('https://api.ejemplo.com/productos', [\n    'pagina' => 1,\n    'categoria' => 'libros',\n]);",
        note: "Los datos de POST se envían como JSON por defecto. GET admite un arreglo de parámetros que Laravel agrega a la query string.",
      },
      {
        title: "Configurar encabezados y autenticación",
        code: true,
        fixed: ["php"],
        php: "$respuesta = Http::acceptJson()\n    ->withHeaders(['X-Client' => 'mi-tienda'])\n    ->withToken(config('services.catalogo.token'))\n    ->get('https://api.ejemplo.com/productos');",
        note: "Guarda tokens en configuración basada en variables de entorno y no los incluyas en el repositorio ni en logs. También puedes usar withBasicAuth() o withDigestAuth() cuando el servicio lo requiera.",
      },
      {
        title: "Enviar formularios, contenido y archivos",
        code: true,
        fixed: ["php"],
        php: "$formulario = Http::asForm()->post($url, ['usuario' => 'ana']);\n\n$crudo = Http::withBody($contenido, 'application/xml')\n    ->post($url);\n\n$archivo = Http::attach('documento', fopen($ruta, 'r'), 'informe.pdf')\n    ->post('https://api.ejemplo.com/archivos');",
        note: "Usa asForm() para application/x-www-form-urlencoded, withBody() para un cuerpo crudo y attach() para multipart. Asegúrate de cerrar o administrar los recursos de archivo según su ciclo de vida.",
      },
      {
        title: "Establecer límites de tiempo",
        code: true,
        fixed: ["php"],
        php: "$respuesta = Http::connectTimeout(3)\n    ->timeout(10)\n    ->get('https://api.ejemplo.com/estado');",
        note: "connectTimeout limita el tiempo para establecer la conexión y timeout el máximo para recibir respuesta. Un timeout de conexión lanza ConnectionException y debe manejarse de acuerdo con el caso.",
      },
      {
        title: "Reintentar fallos transitorios",
        code: true,
        fixed: ["php"],
        php: "$respuesta = Http::retry(3, 200)\n    ->timeout(5)\n    ->get('https://api.ejemplo.com/estado');\n\n$respuesta->throw();\n$datos = $respuesta->json();",
        note: "retry define el máximo de intentos y la espera entre ellos. Úsalo con límites y solo cuando repetir sea seguro; POST puede duplicar operaciones si el servicio no ofrece idempotencia. Si se agotan los reintentos, se lanza RequestException salvo que se configure throw: false; los fallos de conexión todavía pueden lanzar ConnectionException.",
      },
      {
        title: "Inspeccionar respuestas y tratar errores",
        code: true,
        fixed: ["php"],
        php: "$respuesta = Http::get($url);\n\nif ($respuesta->clientError()) {\n    // Respuesta 4xx: revisar datos, permisos o límite del servicio.\n} elseif ($respuesta->serverError()) {\n    // Respuesta 5xx: registrar el fallo y aplicar la política adecuada.\n} else {\n    $estado = $respuesta->status();\n    $cabeceras = $respuesta->headers();\n    $cuerpo = $respuesta->json();\n}",
        note: "Los métodos json(), body(), object(), collect(), status(), header(), successful(), failed(), clientError() y serverError() permiten examinar la respuesta. throw() convierte respuestas 4xx/5xx en RequestException, pero no sustituye el manejo de fallos de conexión.",
      },
      {
        title: "Crear solicitudes concurrentes",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Http\\Client\\Pool;\nuse Illuminate\\Support\\Facades\\Http;\n\n$respuestas = Http::pool(fn (Pool $pool) => [\n    $pool->get('https://api.ejemplo.com/productos'),\n    $pool->get('https://api.ejemplo.com/categorias'),\n]);\n\n$productos = $respuestas[0]->json();\n$categorias = $respuestas[1]->json();",
        note: "pool envía solicitudes en paralelo y devuelve respuestas en el orden de las solicitudes. Comprueba los estados de cada respuesta antes de usar sus datos.",
      },
      {
        title: "Probar sin llamar servicios externos",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Http;\n\nHttp::fake([\n    'api.ejemplo.com/*' => Http::response(['data' => []], 200),\n]);\n\n$respuesta = Http::get('https://api.ejemplo.com/productos');\n\nHttp::assertSent(function ($request) {\n    return $request->url() === 'https://api.ejemplo.com/productos'\n        && $request->hasHeader('Accept', 'application/json');\n});",
        note: "Http::fake evita llamadas reales durante la prueba. Agrega expectativas con assertSent o assertNotSent y define respuestas simuladas para errores además de respuestas exitosas.",
      },
      {
        title: "Documentación del cliente HTTP",
        php: "Cliente HTTP en español: https://laravel-docs.com/es/docs/10.x/http-client\nColas: https://laravel-docs.com/es/docs/10.x/queues\nPruebas: https://laravel-docs.com/es/docs/10.x/testing\nConfiguración de servicios: https://laravel-docs.com/es/docs/10.x/configuration",
      },
    ],
  },
  {
    level: 18,
    title: "Localización e idiomas",
    topics: [
      {
        title: "Cómo organiza Laravel las traducciones",
        php: "Laravel admite archivos PHP organizados por idioma en lang/{locale}/ y archivos JSON lang/{locale}.json.\n\nlang/es/messages.php y lang/en/messages.php funcionan bien cuando usas claves cortas; los archivos JSON son cómodos cuando quieres usar el texto original como clave en una aplicación con muchas cadenas traducibles.",
        note: "El directorio lang no siempre viene en el esqueleto nuevo. Puedes crear la estructura predeterminada con php artisan lang:publish.",
      },
      {
        title: "Publicar los archivos de idioma",
        code: true,
        fixed: ["php"],
        php: "$ php artisan lang:publish\n\nlang/\n├── en/\n│   └── validation.php\n├── es/\n│   └── validation.php\n├── en.json\n└── es.json",
        note: "Revisa los archivos publicados y agrega las traducciones que realmente usa la aplicación. No dependas de que un archivo de idioma de un paquete coincida con tus necesidades.",
      },
      {
        title: "Configurar idioma predeterminado y fallback",
        code: true,
        fixed: ["php"],
        php: "// config/app.php\n'locale' => 'es',\n'fallback_locale' => 'en',",
        note: "locale define el idioma predeterminado. fallback_locale se utiliza si falta una cadena en el idioma activo.",
      },
      {
        title: "Definir claves de traducción",
        code: true,
        fixed: ["php"],
        php: "<?php\n// lang/es/messages.php\nreturn [\n    'welcome' => '¡Bienvenida, :name!',\n    'saved' => 'Los cambios se guardaron.',\n];\n\n// lang/en/messages.php\nreturn [\n    'welcome' => 'Welcome, :name!',\n    'saved' => 'Changes saved.',\n];",
        note: "Organiza las traducciones por dominio o pantalla, por ejemplo messages.php, auth.php y validation.php. Mantén las mismas claves en cada idioma soportado.",
      },
      {
        title: "Traducir desde PHP y Blade",
        code: true,
        fixed: ["php"],
        php: "$saludo = __('messages.welcome', ['name' => $usuario->name]);\n\n// En Blade, la salida con llaves se escapa:\n{{ __('messages.saved') }}\n\n// Con archivos JSON puede usarse el texto original como clave:\n__('I love programming.');",
        note: "El helper __ devuelve la clave si no encuentra traducción, lo que facilita detectar cadenas faltantes. Usa la salida escapada de Blade para contenido traducido que contenga valores no confiables.",
      },
      {
        title: "Cambiar y consultar el idioma por solicitud",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\App;\n\n$idioma = $request->route('locale');\nabort_unless(in_array($idioma, ['es', 'en'], true), 404);\n\nApp::setLocale($idioma);\n\n$actual = App::currentLocale();\n$esEspanol = App::isLocale('es');",
        note: "Valida el idioma contra una lista permitida antes de cambiarlo. Normalmente se configura en middleware para que todas las rutas de una solicitud compartan el locale correcto.",
      },
      {
        title: "Pluralizar traducciones y usar conteos",
        code: true,
        fixed: ["php"],
        php: "// lang/es/messages.php\n'items' => '{0} No hay productos|{1} Hay un producto|[2,*] Hay :count productos',\n\n// La forma se elige según el conteo:\necho trans_choice('messages.items', $cantidad);",
        note: "trans_choice selecciona una forma según las reglas de pluralización del idioma y reemplaza el marcador :count. También puedes proporcionar marcadores propios como tercer argumento.",
      },
      {
        title: "Configurar formatos de reemplazo",
        code: true,
        fixed: ["php"],
        php: "// En un ServiceProvider, al iniciar la aplicación:\nuse Illuminate\\Support\\Facades\\Lang;\nuse Money\\Money;\n\nLang::stringable(function (Money $dinero) {\n    return $dinero->formatTo('es_ES');\n});",
        note: "Los marcadores de traducción admiten valores de reemplazo. Para objetos que no controlas, Lang::stringable permite definir explícitamente cómo se convierten a texto.",
      },
      {
        title: "Traducir textos de paquetes y pluralización de Eloquent",
        php: "Para sobrescribir traducciones de un paquete, agrega solo las claves que quieras reemplazar en lang/vendor/{paquete}/{locale}/.\n\nSi cambias el idioma del pluralizador de Laravel con Pluralizer::useLanguage('spanish') dentro de un proveedor, define explícitamente los nombres de tabla de tus modelos Eloquent para evitar que el cambio altere convenciones esperadas.",
      },
      {
        title: "Guía de Localization de Laravel 10",
        php: "Localización en español: https://laravel-docs.com/es/docs/10.x/localization\nConfiguración: https://laravel-docs.com/es/docs/10.x/configuration\nValidación y mensajes: https://laravel-docs.com/es/docs/10.x/validation\nRutas: https://laravel-docs.com/es/docs/10.x/routing",
      },
    ],
  },
  {
    level: 19,
    title: "Correo electrónico con Laravel 10",
    topics: [
      {
        title: "Configurar el envío de correo",
        php: "Laravel configura mailers y transportes en config/mail.php. Puedes enviar mediante SMTP, Mailgun, Postmark, Amazon SES o sendmail; el mailer default determina cuál se usa cuando no especificas otro.\n\nEn desarrollo, dirige los mensajes a un servicio de captura como Mailpit para inspeccionarlos sin contactar a usuarios reales.",
        note: "Algunos transportes requieren paquetes adicionales de Composer. Guarda claves API, contraseñas y credenciales únicamente en variables de entorno o en el gestor de secretos del entorno.",
      },
      {
        title: "Definir credenciales y remitente",
        code: true,
        fixed: ["php"],
        php: "# .env del entorno (valores ficticios como ejemplo):\nMAIL_MAILER=smtp\nMAIL_HOST=mailpit\nMAIL_PORT=1025\nMAIL_USERNAME=null\nMAIL_PASSWORD=null\nMAIL_FROM_ADDRESS=\"hola@example.test\"\nMAIL_FROM_NAME=\"Mi tienda\"\n\n# La configuración del mailer se lee desde config/mail.php.",
        note: "No publiques credenciales reales ni uses un remitente de ejemplo en producción. Configura SPF, DKIM y DMARC en el dominio de envío y comprueba la reputación y políticas del proveedor.",
      },
      {
        title: "Generar una clase Mailable",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:mail PedidoEnviado\n\n# Las clases Mailable se guardan normalmente en app/Mail/.",
        note: "Representa cada tipo de correo de la aplicación con una clase Mailable para separar destinatarios, asunto, vista, datos y adjuntos del controlador.",
      },
      {
        title: "Definir asunto, remitente y respuesta",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Mail\\Mailables\\Address;\nuse Illuminate\\Mail\\Mailables\\Envelope;\n\npublic function envelope(): Envelope\n{\n    return new Envelope(\n        from: new Address('hola@example.com', 'Mi tienda'),\n        replyTo: [new Address('soporte@example.com', 'Soporte')],\n        subject: 'Tu pedido fue enviado',\n    );\n}",
        note: "La dirección global from y reply_to puede configurarse en config/mail.php. Define remitentes autorizados por el proveedor para mejorar la entrega y evitar suplantación.",
      },
      {
        title: "Crear contenido HTML y texto plano",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Mail\\Mailables\\Content;\n\npublic function content(): Content\n{\n    return new Content(\n        view: 'mail.pedidos.enviado',\n        text: 'mail.pedidos.enviado-texto',\n        with: ['pedido' => $this->pedido],\n    );\n}",
        note: "Las vistas viven normalmente en resources/views. Entregar HTML y texto plano mejora accesibilidad y compatibilidad con clientes de correo; escapa valores dinámicos en Blade.",
      },
      {
        title: "Enviar un correo desde la aplicación",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Mail;\n\nMail::to($usuario->email)\n    ->send(new PedidoEnviado($pedido));\n\n// También puedes añadir cc() o bcc() antes de send().",
        note: "Valida y normaliza el destinatario antes del envío. No aceptes cabeceras ni direcciones de remitente arbitrarias proporcionadas por una persona usuaria.",
      },
      {
        title: "Poner un correo en cola",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Contracts\\Queue\\ShouldQueue;\n\nclass PedidoEnviado extends Mailable implements ShouldQueue\n{\n    // Propiedades y métodos envelope(), content() y attachments().\n}\n\nMail::to($usuario->email)->queue(new PedidoEnviado($pedido));\nMail::to($usuario->email)->later(now()->addMinutes(10), new PedidoEnviado($pedido));",
        note: "Configura un driver de cola y ejecuta un worker. Enviar mediante cola evita que una petición web espere al proveedor de correo; define reintentos e idempotencia para no duplicar mensajes.",
      },
      {
        title: "Adjuntar archivos al correo",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Mail\\Mailables\\Attachment;\n\npublic function attachments(): array\n{\n    return [\n        Attachment::fromStorageDisk('private', $this->pedido->factura_path)\n            ->as('factura.pdf')\n            ->withMime('application/pdf'),\n    ];\n}",
        note: "La ruta es ilustrativa: configura el disco private en config/filesystems.php y autoriza el acceso al archivo. Evita adjuntar datos sensibles innecesarios y limita el tamaño total del mensaje.",
      },
      {
        title: "Crear correos Markdown",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:mail PedidoEnviado --markdown=mail.pedidos.enviado\n\n// En content():\nreturn new Content(\n    markdown: 'mail.pedidos.enviado',\n    with: ['url' => $url],\n);",
        note: "Las vistas Markdown permiten usar componentes de correo de Laravel y generan versiones HTML y texto plano. Personaliza y prueba el renderizado en distintos clientes de correo.",
      },
      {
        title: "Configurar respaldo y distribución entre mailers",
        code: true,
        fixed: ["php"],
        php: "// config/mail.php\n'mailers' => [\n    'failover' => [\n        'transport' => 'failover',\n        'mailers' => ['postmark', 'ses'],\n    ],\n],\n\n// Establece failover como mailer predeterminado si lo necesitas.\n// roundrobin permite repartir envíos entre mailers configurados.",
        note: "Failover mejora continuidad cuando falla un proveedor; roundrobin distribuye carga. Configura y prueba cada transporte, límites y comportamiento de reintento antes de depender de ellos.",
      },
      {
        title: "Probar envíos sin enviar correos reales",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Mail;\n\nMail::fake();\n\nMail::to('ana@example.test')->send(new PedidoEnviado($pedido));\n\nMail::assertSent(PedidoEnviado::class, function ($mail) {\n    return $mail->hasTo('ana@example.test');\n});",
        note: "Mail::fake evita el envío real. Para mensajes encolados, verifica el comportamiento de la cola con las aserciones de correo en cola disponibles en Laravel 10 y cubre también destinatario, asunto y datos.",
      },
      {
        title: "Guía de Mail de Laravel 10",
        php: "Mail en español: https://laravel-docs.com/es/docs/10.x/mail\nColas: https://laravel-docs.com/es/docs/10.x/queues\nBlade: https://laravel-docs.com/es/docs/10.x/blade\nFilesystem: https://laravel-docs.com/es/docs/10.x/filesystem\nPruebas: https://laravel-docs.com/es/docs/10.x/testing",
      },
    ],
  },
  {
    level: 20,
    title: "Notificaciones de Laravel 10",
    topics: [
      {
        title: "Qué son las notificaciones",
        php: "Las notificaciones son mensajes breves sobre hechos de la aplicación, como un pago recibido o un pedido enviado. Una misma clase puede entregarse por correo, SMS, Slack, base de datos o broadcast, y Laravel adapta el mensaje para cada canal.",
        note: "Usa un Mailable cuando necesites un correo completo y altamente personalizado. Una Notification es útil cuando el mismo aviso puede entregarse por varios canales.",
      },
      {
        title: "Crear una clase de notificación",
        code: true,
        fixed: ["php"],
        php: "$ php artisan make:notification PedidoEnviado\n\n// Laravel genera la clase en app/Notifications.\n// Allí defines via() y los métodos del canal, por ejemplo toMail().",
        note: "Mantén en la clase los datos necesarios para construir el mensaje. Evita almacenar información sensible que no sea necesaria para la entrega.",
      },
      {
        title: "Enviar a entidades con Notifiable",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Notifications\\Notifiable;\n\nclass User extends Authenticatable\n{\n    use Notifiable;\n}\n\n$usuario->notify(new PedidoEnviado($pedido));",
        note: "El trait Notifiable ya está incluido en el modelo User de Laravel y puede utilizarse también en otros modelos notificables.",
      },
      {
        title: "Enviar a varios destinatarios y elegir canales",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Notification;\n\nNotification::send($usuarios, new PedidoEnviado($pedido));\n\npublic function via(object $notifiable): array\n{\n    return $notifiable->prefiere_sms\n        ? ['vonage']\n        : ['mail', 'database'];\n}",
        note: "via() determina los canales para cada destinatario. Elige canales según preferencias guardadas y confirmadas por el usuario, y configura las credenciales de los proveedores que uses.",
      },
      {
        title: "Notificaciones bajo demanda",
        code: true,
        fixed: ["php"],
        php: "Notification::route('mail', 'ana@example.com')\n    ->route('vonage', '5555555555')\n    ->notify(new PedidoEnviado($pedido));",
        note: "Las rutas bajo demanda sirven para destinatarios que no están representados por un modelo Notifiable. Valida y autoriza los destinos antes de usarlos, especialmente si provienen de entrada del usuario.",
      },
      {
        title: "Construir un mensaje por correo",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Notifications\\Messages\\MailMessage;\n\npublic function toMail(object $notifiable): MailMessage\n{\n    return (new MailMessage)\n        ->subject('Tu pedido fue enviado')\n        ->greeting('¡Hola!')\n        ->line('Tu pedido está en camino.')\n        ->action('Ver pedido', route('pedidos.show', $this->pedido))\n        ->line('Gracias por tu compra.');\n}",
        note: "MailMessage facilita correos transaccionales sencillos. Usa una clase Mailable cuando necesites controlar con más detalle plantillas, adjuntos o estructura del mensaje.",
      },
      {
        title: "Guardar notificaciones en la base de datos",
        code: true,
        fixed: ["php"],
        php: "$ php artisan notifications:table\n$ php artisan migrate\n\npublic function toDatabase(object $notifiable): array\n{\n    return [\n        'pedido_id' => $this->pedido->id,\n        'estado' => $this->pedido->estado,\n    ];\n}",
        note: "El canal database serializa el arreglo en la columna data. Devuelve solo los campos necesarios para la interfaz; no incluyas secretos ni datos personales innecesarios.",
      },
      {
        title: "Consultar y marcar notificaciones como leídas",
        code: true,
        fixed: ["php"],
        php: "$noLeidas = $usuario->unreadNotifications;\n\nforeach ($noLeidas as $notificacion) {\n    echo $notificacion->data['estado'];\n}\n\n$usuario->unreadNotifications()->update(['read_at' => now()]);\n$usuario->notifications()->delete();",
        note: "Notifiable proporciona las relaciones notifications y unreadNotifications. Limita las consultas al usuario autenticado y evita aceptar desde el cliente IDs de notificaciones pertenecientes a otras personas.",
      },
      {
        title: "Poner notificaciones en cola y retrasarlas",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Bus\\Queueable;\nuse Illuminate\\Contracts\\Queue\\ShouldQueue;\n\nclass PedidoEnviado extends Notification implements ShouldQueue\n{\n    use Queueable;\n}\n\n$usuario->notify(\n    (new PedidoEnviado($pedido))->delay(now()->addMinutes(5))\n);",
        note: "Configura una conexión y un worker de cola. Laravel crea un trabajo por destinatario y canal; puedes configurar retrasos por canal y usar afterCommit() si la notificación depende de datos de una transacción recién confirmada.",
      },
      {
        title: "Entregar avisos en tiempo real",
        code: true,
        fixed: ["php"],
        php: "public function via(object $notifiable): array\n{\n    return ['database', 'broadcast'];\n}\n\npublic function toBroadcast(object $notifiable): BroadcastMessage\n{\n    return new BroadcastMessage([\n        'pedido_id' => $this->pedido->id,\n        'estado' => $this->pedido->estado,\n    ]);\n}",
        note: "El canal broadcast requiere configurar el servidor y el cliente WebSocket. Autoriza los canales privados y limita estrictamente el payload; consulta también la guía de Broadcasting.",
      },
      {
        title: "Probar notificaciones sin entregarlas",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Notification;\n\nNotification::fake();\n\n$usuario->notify(new PedidoEnviado($pedido));\n\nNotification::assertSentTo(\n    $usuario,\n    PedidoEnviado::class,\n);",
        note: "Notification::fake evita contactar servicios externos. Añade aserciones para el destinatario y los canales necesarios, y prueba por separado preferencias, datos y autorización.",
      },
      {
        title: "Documentación de Notifications de Laravel 10",
        php: "Notifications en español: https://laravel-docs.com/es/docs/10.x/notifications\nMail: https://laravel-docs.com/es/docs/10.x/mail\nColas: https://laravel-docs.com/es/docs/10.x/queues\nBroadcasting: https://laravel-docs.com/es/docs/10.x/broadcasting\nPruebas: https://laravel-docs.com/es/docs/10.x/testing",
      },
    ],
  },
  {
    level: 21,
    title: "Desarrollo de paquetes para Laravel 10",
    topics: [
      {
        title: "Qué es un paquete de Laravel",
        php: "Los paquetes permiten distribuir funcionalidades reutilizables. Un paquete independiente de Laravel, como una biblioteca de fechas, puede funcionar con cualquier proyecto PHP. Un paquete específico de Laravel puede integrar proveedores de servicios, rutas, vistas, traducciones, comandos y configuración.\n\nComposer administra las dependencias de ambos tipos; los paquetes Laravel aprovechan además los mecanismos de integración del framework.",
        note: "Al diseñar un paquete, define qué funcionalidad es genérica y cuál depende de Laravel. Evita acoplar la lógica central a facades o detalles de una aplicación concreta.",
      },
      {
        title: "Definir la estructura y autocarga del paquete",
        code: true,
        fixed: ["php"],
        php: "// composer.json del paquete\n{\n    \"name\": \"acme/courier\",\n    \"type\": \"library\",\n    \"autoload\": {\n        \"psr-4\": {\n            \"Acme\\\\Courier\\\\\": \"src/\"\n        }\n    },\n    \"require\": {\n        \"php\": \"^8.1\",\n        \"illuminate/support\": \"^10.0\"\n    }\n}",
        note: "Ajusta namespace, versión de PHP y dependencias a las versiones que realmente soporta el paquete. Después de cambiar autoload en desarrollo, ejecuta composer dump-autoload. Declara solo componentes Illuminate que uses y verifica la compatibilidad al publicar.",
      },
      {
        title: "Integrar el paquete con Composer",
        code: true,
        fixed: ["php"],
        php: "// En composer.json de una aplicación consumidora:\n{\n    \"require\": {\n        \"acme/courier\": \"^1.0\"\n    }\n}\n\n// Para desarrollar el paquete localmente, configura un\n// repositorio Composer de tipo path y requiere su versión.",
        note: "Composer instala el código y resuelve sus dependencias. En un paquete distribuible, documenta la instalación y publica versiones etiquetadas; no edites directamente archivos dentro de vendor.",
      },
      {
        title: "Habilitar el descubrimiento automático",
        code: true,
        fixed: ["php"],
        php: "// composer.json del paquete\n{\n    \"extra\": {\n        \"laravel\": {\n            \"providers\": [\n                \"Acme\\\\Courier\\\\CourierServiceProvider\"\n            ],\n            \"aliases\": {\n                \"Courier\": \"Acme\\\\Courier\\\\Facades\\\\Courier\"\n            }\n        }\n    }\n}",
        note: "Laravel registra automáticamente los providers y aliases declarados tras instalar el paquete. Si el descubrimiento causa conflictos, la aplicación consumidora puede excluir el paquete mediante extra.laravel.dont-discover, o usar \"*\" para desactivar todo descubrimiento.",
      },
      {
        title: "Crear un proveedor de servicios",
        code: true,
        fixed: ["php"],
        php: "namespace Acme\\Courier;\n\nuse Illuminate\\Support\\ServiceProvider;\n\nclass CourierServiceProvider extends ServiceProvider\n{\n    public function register(): void\n    {\n        $this->mergeConfigFrom(\n            __DIR__.'/../config/courier.php',\n            'courier',\n        );\n\n        $this->app->singleton(CourierManager::class);\n    }\n\n    public function boot(): void\n    {\n        $this->loadRoutesFrom(__DIR__.'/../routes/web.php');\n        $this->loadViewsFrom(__DIR__.'/../resources/views', 'courier');\n    }\n}",
        note: "register() es para bindings y configuración del contenedor; boot() se ejecuta cuando los providers ya fueron registrados y es apropiado para cargar rutas y recursos. El provider conecta el paquete con Laravel.",
      },
      {
        title: "Publicar y combinar configuración",
        code: true,
        fixed: ["php"],
        php: "public function register(): void\n{\n    $this->mergeConfigFrom(\n        __DIR__.'/../config/courier.php',\n        'courier',\n    );\n}\n\npublic function boot(): void\n{\n    $this->publishes([\n        __DIR__.'/../config/courier.php' => config_path('courier.php'),\n    ], 'courier-config');\n}",
        note: "mergeConfigFrom proporciona valores predeterminados y se registra en register(). La fusión cubre solo el primer nivel del arreglo. Los usuarios pueden copiar y personalizar el archivo con php artisan vendor:publish --tag=courier-config. No incluyas closures en configuración que deba admitir config:cache.",
      },
      {
        title: "Cargar rutas y migraciones del paquete",
        code: true,
        fixed: ["php"],
        php: "public function boot(): void\n{\n    $this->loadRoutesFrom(__DIR__.'/../routes/web.php');\n    $this->loadMigrationsFrom(__DIR__.'/../database/migrations');\n}",
        note: "loadRoutesFrom respeta la caché de rutas de la aplicación. Las migraciones registradas con loadMigrationsFrom se ejecutan con php artisan migrate sin copiarlas al directorio database/migrations de la aplicación.",
      },
      {
        title: "Registrar traducciones y vistas",
        code: true,
        fixed: ["php"],
        php: "public function boot(): void\n{\n    $this->loadTranslationsFrom(__DIR__.'/../lang', 'courier');\n    $this->loadJsonTranslationsFrom(__DIR__.'/../lang');\n    $this->loadViewsFrom(__DIR__.'/../resources/views', 'courier');\n}\n\n// Uso desde la aplicación:\n__('courier::messages.welcome');\nreturn view('courier::dashboard');",
        note: "Las traducciones agrupadas usan la sintaxis paquete::archivo.clave; las JSON usan loadJsonTranslationsFrom. Las vistas usan paquete::vista y Laravel busca primero las sobrescrituras publicadas en resources/views/vendor/courier.",
      },
      {
        title: "Publicar traducciones y vistas",
        code: true,
        fixed: ["php"],
        php: "$this->publishes([\n    __DIR__.'/../lang' => $this->app->langPath('vendor/courier'),\n], 'courier-translations');\n\n$this->publishes([\n    __DIR__.'/../resources/views' => resource_path('views/vendor/courier'),\n], 'courier-views');\n\n// El consumidor elige qué recursos copiar:\n// php artisan vendor:publish --tag=courier-views",
        note: "Publica recursos con etiquetas distintas para que cada consumidor elija qué personalizar. Las vistas publicadas sobrescriben las originales del paquete.",
      },
      {
        title: "Registrar componentes Blade",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Blade;\nuse Acme\\Courier\\View\\Components\\AlertComponent;\n\npublic function boot(): void\n{\n    Blade::component('courier-alert', AlertComponent::class);\n}\n\n// En una vista Blade:\n// <x-courier-alert />",
        note: "También puedes registrar un namespace de componentes con Blade::componentNamespace() para cargarlos por convención. Los componentes anónimos se colocan en el subdirectorio components de las vistas del paquete y se usan como <x-courier::alert />.",
      },
      {
        title: "Registrar comandos Artisan y datos del paquete",
        code: true,
        fixed: ["php"],
        php: "use Acme\\Courier\\Console\\InstallCommand;\nuse Illuminate\\Foundation\\Console\\AboutCommand;\n\npublic function boot(): void\n{\n    if ($this->app->runningInConsole()) {\n        $this->commands([InstallCommand::class]);\n    }\n\n    AboutCommand::add('Courier', fn () => [\n        'Versión' => '1.0.0',\n    ]);\n}",
        note: "Registra comandos con commands() y limita su registro al entorno de consola. AboutCommand::add() agrega información del paquete a php artisan about.",
      },
      {
        title: "Publicar assets y grupos de archivos",
        code: true,
        fixed: ["php"],
        php: "$this->publishes([\n    __DIR__.'/../public' => public_path('vendor/courier'),\n], 'public');\n\n$this->publishes([\n    __DIR__.'/../database/migrations/' => database_path('migrations'),\n], 'courier-migrations');\n\n// Publicar solo un grupo:\n// php artisan vendor:publish --tag=courier-migrations\n// Actualizar assets existentes:\n// php artisan vendor:publish --tag=public --force",
        note: "Define etiquetas específicas para configuración, migraciones y otros recursos para que no se publiquen juntos por accidente. --force sobrescribe archivos existentes: úsalo solo cuando esa actualización sea intencional.",
      },
      {
        title: "Probar un paquete Laravel",
        code: true,
        fixed: ["php"],
        php: "// composer.json de desarrollo del paquete\n{\n    \"require-dev\": {\n        \"orchestra/testbench\": \"^8.0\",\n        \"phpunit/phpunit\": \"^10.0\"\n    }\n}\n\n// Ejemplo conceptual de prueba de integración:\n$this->get('/courier/status')->assertOk();",
        note: "Orchestra Testbench permite probar el paquete dentro de una aplicación Laravel de prueba, con providers y helpers del framework. Alinea su versión y PHPUnit con las versiones de Laravel/PHP soportadas, y cubre instalación, configuración, rutas, comandos y recursos publicados.",
      },
      {
        title: "Guía de paquetes de Laravel 10",
        php: "Packages en español: https://laravel-docs.com/es/docs/10.x/packages\nProveedores de servicios: https://laravel-docs.com/es/docs/10.x/providers\nContenedor: https://laravel-docs.com/es/docs/10.x/container\nConfiguración: https://laravel-docs.com/es/docs/10.x/configuration\nLocalization: https://laravel-docs.com/es/docs/10.x/localization\nPruebas: https://laravel-docs.com/es/docs/10.x/testing\nOrchestra Testbench: https://github.com/orchestral/testbench",
      },
    ],
  },
  {
    level: 22,
    title: "Procesos del sistema en Laravel 10",
    topics: [
      {
        title: "Invocar un proceso externo",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Process;\n\n$resultado = Process::run([\n    'php',\n    'artisan',\n    'about',\n]);\n\nif ($resultado->successful()) {\n    echo $resultado->output();\n} else {\n    logger()->error($resultado->errorOutput());\n}",
        note: "run() ejecuta el proceso de forma síncrona y devuelve un resultado con successful(), failed(), exitCode(), output() y errorOutput(). Prefiere una lista de argumentos fija y no concatentes entrada del usuario en comandos: los procesos externos pueden ejecutar acciones con los permisos del servidor.",
      },
      {
        title: "Convertir fallos de proceso en excepciones",
        code: true,
        fixed: ["php"],
        php: "$resultado = Process::run(['php', 'artisan', 'about'])\n    ->throw();\n\n$resultado = Process::run($comandoPermitido)\n    ->throwIf($debeFallar);",
        note: "throw() lanza ProcessFailedException si el código de salida indica un fallo; throwIf() lo hace condicionalmente. Maneja esa excepción en el límite apropiado de la aplicación y no registres datos sensibles en la salida.",
      },
      {
        title: "Configurar directorio, entrada y timeout",
        code: true,
        fixed: ["php"],
        php: "$resultado = Process::path(base_path())\n    ->input('entrada para stdin')\n    ->timeout(120)\n    ->idleTimeout(30)\n    ->run(['php', 'artisan', 'about']);",
        note: "path() define el directorio de trabajo; input() envía datos por stdin. Laravel usa un timeout predeterminado de 60 segundos; timeout() lo cambia, forever() lo desactiva e idleTimeout() limita cuánto puede pasar sin salida. Configura límites razonables para evitar procesos colgados.",
      },
      {
        title: "Controlar variables de entorno del proceso",
        code: true,
        fixed: ["php"],
        php: "$resultado = Process::path(base_path())\n    ->env([\n        'IMPORT_PATH' => storage_path('app/imports'),\n        'LOAD_PATH' => false,\n    ])\n    ->run(['php', 'artisan', 'about']);",
        note: "El proceso hereda el entorno del sistema. env() define o reemplaza variables; asignar false elimina del entorno del proceso una variable heredada. No pases secretos a comandos o entornos que puedan aparecer en registros o diagnósticos.",
      },
      {
        title: "Leer y transmitir la salida",
        code: true,
        fixed: ["php"],
        php: "$resultado = Process::run(\n    ['php', 'artisan', 'about'],\n    function (string $tipo, string $salida): void {\n        // $tipo es stdout o stderr; procesa la salida según corresponda.\n    },\n);\n\n$stdout = $resultado->output();\n$stderr = $resultado->errorOutput();\n$contieneTexto = $resultado->seeInOutput('Laravel');",
        note: "El callback permite recibir salida en tiempo real desde stdout o stderr. seeInOutput() y seeInErrorOutput() buscan texto en cada canal. Usa quietly() si no necesitas recopilar la salida y quieres reducir el consumo de memoria.",
      },
      {
        title: "Encadenar procesos con pipelines",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Process\\Pipe;\n\n$resultado = Process::pipe(function (Pipe $pipe): void {\n    $pipe->command(['php', 'artisan', 'about']);\n    $pipe->as('filtro')->command(['php', 'scripts/filtrar.php']);\n});\n\nif ($resultado->successful()) {\n    echo $resultado->output();\n}",
        note: "pipe() conecta la salida de cada proceso con la entrada del siguiente y devuelve el resultado del último. También acepta una lista de comandos. Usa solo ejecutables y argumentos controlados por la aplicación.",
      },
      {
        title: "Ejecutar y supervisar un proceso asíncrono",
        code: true,
        fixed: ["php"],
        php: "$proceso = Process::timeout(120)\n    ->start(['php', 'artisan', 'about']);\n\nwhile ($proceso->running()) {\n    echo $proceso->latestOutput();\n    echo $proceso->latestErrorOutput();\n    usleep(250_000);\n}\n\n$resultado = $proceso->wait();\n$salidaFinal = $resultado->output();",
        note: "start() permite continuar el código mientras corre el proceso; running() consulta su estado y wait() espera y obtiene el resultado final. output() y errorOutput() contienen la salida acumulada; latestOutput() y latestErrorOutput() entregan la salida nueva desde la última lectura. Para trabajo durable o que deba sobrevivir al ciclo de vida de una petición, considera una cola.",
      },
      {
        title: "Consultar el ID y enviar señales",
        code: true,
        fixed: ["php"],
        php: "$proceso = Process::start($comandoPermitido);\n\n$idDelSistema = $proceso->id();\n\nif ($proceso->running()) {\n    $proceso->signal(SIGTERM);\n}\n\n$resultado = $proceso->wait();",
        note: "id() devuelve el identificador del proceso del sistema operativo y signal() envía una señal, como SIGTERM, si está disponible en la plataforma. Las señales y sus constantes no son portables a todos los sistemas; confirma el soporte y define cómo manejar la terminación.",
      },
      {
        title: "Ejecutar procesos concurrentes",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Process\\Pool;\n\n$resultados = Process::concurrently(function (Pool $pool): void {\n    $pool->as('estado')->command(['php', 'artisan', 'about']);\n    $pool->as('rutas')->command(['php', 'artisan', 'route:list']);\n});\n\n$estado = $resultados['estado'];\n$rutas = $resultados['rutas'];",
        note: "Process::pool() inicia varias tareas asíncronas y wait() espera por sus resultados; concurrently() ofrece la forma abreviada de iniciar el pool y esperar. Usa as() para asignar nombres estables a resultados. Limita el número de procesos según los recursos disponibles.",
      },
      {
        title: "Simular procesos durante las pruebas",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Process\\PendingProcess;\nuse Illuminate\\Contracts\\Process\\ProcessResult;\nuse Illuminate\\Support\\Facades\\Process;\n\nProcess::fake();\n\n$resultado = Process::run(['php', 'artisan', 'about']);\n\nProcess::assertRan(function (\n    PendingProcess $proceso,\n    ProcessResult $resultado,\n): bool {\n    return $proceso->command === ['php', 'artisan', 'about'];\n});",
        note: "Process::fake() evita ejecutar los procesos reales en las pruebas y permite verificar que fueron invocados. Puedes definir resultados falsos con Process::result(output:, errorOutput:, exitCode:) y respuestas específicas por patrón de comando. Los comandos sin fake específico pueden ejecutarse realmente, así que configura los patrones con cuidado.",
      },
      {
        title: "Documentación de Processes de Laravel 10",
        php: "Processes en español: https://laravel-docs.com/es/docs/10.x/processes\nPruebas: https://laravel-docs.com/es/docs/10.x/testing\nColas: https://laravel-docs.com/es/docs/10.x/queues\nComponente Process de Symfony: https://symfony.com/doc/current/components/process.html",
      },
    ],
  },
  {
    level: 23,
    title: "Colas y jobs avanzados en Laravel 10",
    topics: [
      {
        title: "Entender conexiones, colas y drivers",
        php: "Una conexión selecciona el backend que almacena jobs (database, Redis, Amazon SQS, Beanstalkd, sync o null). Cada conexión puede ofrecer varias colas, que separan o priorizan trabajos.\n\nEl driver sync ejecuta el job inmediatamente en la petición; para procesamiento en segundo plano configura un backend persistente en config/queue.php y la variable QUEUE_CONNECTION.",
        note: "Una conexión es el backend; una cola es una fila lógica dentro de ese backend. Los servicios SQS, Beanstalkd y Redis necesitan sus dependencias y configuración propias. Laravel Horizon administra colas basadas en Redis.",
      },
      {
        title: "Preparar el driver de base de datos",
        code: true,
        fixed: ["php"],
        php: "$ php artisan queue:table\n$ php artisan migrate\n\n// .env\nQUEUE_CONNECTION=database\n\n// Iniciar un worker:\n$ php artisan queue:work",
        note: "queue:table crea la migración que almacena jobs y migrate la aplica. En producción, utiliza una conexión persistente acorde con tu carga; el driver sync no procesa trabajos en segundo plano.",
      },
      {
        title: "Crear un job y diseñar su carga útil",
        code: true,
        fixed: ["php"],
        php: "use App\\Models\\Pedido;\nuse App\\Services\\GeneradorFactura;\nuse Illuminate\\Bus\\Queueable;\nuse Illuminate\\Contracts\\Queue\\ShouldQueue;\nuse Illuminate\\Foundation\\Bus\\Dispatchable;\nuse Illuminate\\Queue\\InteractsWithQueue;\nuse Illuminate\\Queue\\SerializesModels;\n\nclass GenerarFactura implements ShouldQueue\n{\n    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;\n\n    public function __construct(public Pedido $pedido) {}\n\n    public function handle(GeneradorFactura $generador): void\n    {\n        $generador->generar($this->pedido);\n    }\n}",
        note: "ShouldQueue marca el trabajo para la cola. El contenedor inyecta dependencias en handle(). SerializesModels guarda la identidad de los modelos Eloquent y los vuelve a consultar al procesar el job; relaciones cargadas pueden aumentar la carga útil y sus restricciones no se conservan al restaurarlas. Usa withoutRelations() o el atributo #[WithoutRelations] cuando corresponda. Para datos binarios, codifica a Base64 antes de serializar.",
      },
      {
        title: "Despachar jobs a una cola o conexión",
        code: true,
        fixed: ["php"],
        php: "GenerarFactura::dispatch($pedido)\n    ->onConnection('redis')\n    ->onQueue('facturas')\n    ->delay(now()->addMinutes(2));\n\nGenerarFactura::dispatchIf($pedido->pagado, $pedido);\nGenerarFactura::dispatchUnless($pedido->cancelado, $pedido);",
        note: "onConnection() elige el backend y onQueue() la cola lógica. delay() programa la disponibilidad futura; SQS limita el retraso a 15 minutos. dispatchIf() y dispatchUnless() permiten despachar condicionalmente. dispatchAfterResponse() difiere trabajos breves hasta enviar la respuesta HTTP, pero siguen procesándose dentro del ciclo de la petición y no sustituyen un worker para tareas duraderas.",
      },
      {
        title: "Despachar después de confirmar una transacción",
        code: true,
        fixed: ["php"],
        php: "DB::transaction(function () use ($pedido): void {\n    $pedido->update(['estado' => 'pagado']);\n\n    GenerarFactura::dispatch($pedido)->afterCommit();\n});\n\n// O configurar after_commit en la conexión de cola.\n// beforeCommit() fuerza el despacho previo al commit.",
        note: "afterCommit() evita que el worker lea datos que todavía no existen porque una transacción no ha confirmado. También puedes configurar after_commit en la conexión; beforeCommit() permite el comportamiento previo al commit cuando sea intencional.",
      },
      {
        title: "Evitar jobs duplicados con unicidad",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Contracts\\Queue\\ShouldBeUnique;\nuse Illuminate\\Contracts\\Queue\\ShouldQueue;\n\nclass SincronizarProducto implements ShouldQueue, ShouldBeUnique\n{\n    public int $uniqueFor = 3600;\n\n    public function __construct(public int $productoId) {}\n\n    public function uniqueId(): string\n    {\n        return (string) $this->productoId;\n    }\n}",
        note: "ShouldBeUnique usa un lock de caché y evita despachar otra instancia con la misma clave hasta completar o agotar el job; uniqueFor establece la expiración del lock. Todos los servidores deben compartir un backend de caché compatible con locks. ShouldBeUniqueUntilProcessing libera la unicidad al iniciar el procesamiento. La unicidad no aplica a jobs dentro de batches; para evitar ejecución simultánea usa WithoutOverlapping.",
      },
      {
        title: "Cifrar la carga de un job",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Contracts\\Queue\\ShouldBeEncrypted;\nuse Illuminate\\Contracts\\Queue\\ShouldQueue;\n\nclass ProcesarDatosConfidenciales implements ShouldQueue, ShouldBeEncrypted\n{\n    // Mantén solo los datos necesarios para procesar el trabajo.\n}",
        note: "ShouldBeEncrypted cifra el job antes de colocarlo en la cola, protegiendo la confidencialidad e integridad de su carga. Aun así, evita incluir secretos innecesarios y restringe el acceso al backend y a los registros.",
      },
      {
        title: "Controlar intentos, backoff y timeout",
        code: true,
        fixed: ["php"],
        php: "class SincronizarCatalogo implements ShouldQueue\n{\n    public int $tries = 5;\n    public int $maxExceptions = 3;\n    public int $timeout = 90;\n    public bool $failOnTimeout = true;\n\n    public function backoff(): array\n    {\n        return [10, 30, 60];\n    }\n\n    public function handle(): void\n    {\n        // Sincronización con timeout propio en cada API externa.\n    }\n}",
        note: "Configura intentos y backoff para fallos transitorios; retryUntil() permite fijar una fecha límite en lugar de un conteo. maxExceptions limita excepciones no controladas. El timeout del job debe ser menor que retry_after de la conexión para evitar que el mismo trabajo vuelva a procesarse en paralelo; la extensión pcntl es necesaria para aplicar timeouts. Configura también timeout en clientes de red.",
      },
      {
        title: "Liberar o marcar manualmente un job como fallido",
        code: true,
        fixed: ["php"],
        php: "public function handle(): void\n{\n    if ($this->servicioNoDisponible()) {\n        $this->release(30);\n        return;\n    }\n\n    if ($this->pedidoCancelado()) {\n        $this->fail(new RuntimeException('Pedido cancelado'));\n        return;\n    }\n\n    $this->procesar();\n}\n\npublic function failed(Throwable $error): void\n{\n    // Registrar el fallo definitivo o alertar a operaciones.\n}",
        note: "release() devuelve el trabajo a la cola, opcionalmente con demora; cada liberación cuenta como intento. fail() lo marca como fallido. failed() sirve para la acción posterior al fallo definitivo. Diseña el job para que sea idempotente: un worker puede volver a ejecutarlo tras un fallo o interrupción.",
      },
      {
        title: "Aplicar middleware de jobs",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Queue\\Middleware\\WithoutOverlapping;\nuse Illuminate\\Queue\\Middleware\\ThrottlesExceptions;\n\npublic function middleware(): array\n{\n    return [\n        (new WithoutOverlapping('pedido:'.$this->pedidoId))\n            ->releaseAfter(60)\n            ->expireAfter(180),\n        (new ThrottlesExceptions(10, 5))\n            ->backoff(1)\n            ->by('servicio-facturas'),\n    ];\n}",
        note: "WithoutOverlapping usa locks de caché para serializar trabajos por clave; shared() permite compartir la clave entre clases, y dontRelease() descarta los solapados en vez de reencolarlos. ThrottlesExceptions reduce la presión sobre servicios inestables; ajusta sus límites y retryUntil() para controlar la ventana de reintentos. RateLimited y RateLimitedWithRedis aplican límites de tasa; liberar por throttling también consume intentos.",
      },
      {
        title: "Encadenar jobs en secuencia",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Bus;\n\nBus::chain([\n    new DescargarPodcast($podcast),\n    new ConvertirPodcast($podcast),\n    new PublicarPodcast($podcast),\n])->onConnection('redis')\n  ->onQueue('podcasts')\n  ->catch(function (Throwable $error): void {\n      // Gestionar el fallo de cualquier job de la cadena.\n  })\n  ->dispatch();",
        note: "La cadena ejecuta los jobs en orden y solo continúa si el anterior termina correctamente. Si uno falla, los siguientes se omiten; catch() permite reaccionar ante el fallo. La conexión y la cola se pueden definir para toda la cadena.",
      },
      {
        title: "Procesar jobs como un lote",
        code: true,
        fixed: ["php"],
        php: "$ php artisan queue:batches-table\n$ php artisan migrate\n\n$batch = Bus::batch([\n    new ImportarArchivo($rutaUno),\n    new ImportarArchivo($rutaDos),\n])->then(function (Batch $batch): void {\n    // Todos los jobs terminaron correctamente.\n})->catch(function (Batch $batch, Throwable $error): void {\n    // Falló el primer job del lote.\n})->finally(function (Batch $batch): void {\n    // El lote terminó, incluso si hubo fallos.\n})->dispatch();",
        note: "Los batches requieren la tabla job_batches generada por queue:batches-table. Los jobs que pertenezcan al lote deben usar el trait Batchable; pueden consultar batch()->cancelled() para detener trabajo pendiente. Los callbacks se serializan, así que evita capturar $this y considera las restricciones de transacciones al despachar lotes.",
      },
      {
        title: "Ejecutar workers con prioridades y reinicios",
        code: true,
        fixed: ["php"],
        php: "$ php artisan queue:work redis --queue=high,default \\\n    --sleep=3 --tries=3 --timeout=90\n\n// Tras desplegar, pedir a los workers de larga vida que reinicien:\n$ php artisan queue:restart",
        note: "queue:work procesa continuamente y prioriza las colas en el orden indicado. Los workers son procesos de larga duración: reinícialos en despliegues para cargar código nuevo y usa un supervisor de procesos para mantenerlos activos. Limita intentos, timeout y sleep según las tareas y el backend.",
      },
      {
        title: "Gestionar jobs fallidos",
        code: true,
        fixed: ["php"],
        php: "$ php artisan queue:failed-table\n$ php artisan migrate\n\n$ php artisan queue:failed\n$ php artisan queue:retry all\n$ php artisan queue:retry 5\n$ php artisan queue:forget 5\n$ php artisan queue:flush",
        note: "La tabla failed_jobs conserva los trabajos que agotaron sus intentos para inspeccionarlos y reintentarlos. queue:forget elimina uno y queue:flush elimina todos los registros de fallos; usa estos comandos con cuidado y confirma antes de borrar información operativa.",
      },
      {
        title: "Probar el despacho de jobs sin procesarlos",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\Bus;\n\nBus::fake();\n\nGenerarFactura::dispatch($pedido);\n\nBus::assertDispatched(GenerarFactura::class);\nBus::assertDispatched(function (GenerarFactura $job) use ($pedido): bool {\n    return $job->pedido->is($pedido);\n});",
        note: "Bus::fake() permite verificar despachos sin ejecutar el trabajo. Añade aserciones sobre argumentos, cola o conexión cuando formen parte del comportamiento esperado. Prueba por separado handle() con dependencias falsas y cubre errores, reintentos, idempotencia y efectos externos.",
      },
      {
        title: "Guía de colas y jobs de Laravel 10",
        php: "Queues en español: https://laravel-docs.com/es/docs/10.x/queues\nJobs fallidos: https://laravel-docs.com/es/docs/10.x/queues#dealing-with-failed-jobs\nEventos: https://laravel-docs.com/es/docs/10.x/events\nMail: https://laravel-docs.com/es/docs/10.x/mail\nNotifications: https://laravel-docs.com/es/docs/10.x/notifications\nCache y locks: https://laravel-docs.com/es/docs/10.x/cache#atomic-locks\nHorizon: https://laravel-docs.com/es/docs/10.x/horizon",
      },
    ],
  },
  {
    level: 24,
    title: "Limitación de tasa en Laravel 10",
    topics: [
      {
        title: "Qué es el rate limiting",
        php: "La limitación de tasa restringe cuántas veces puede ejecutarse una acción durante una ventana de tiempo. Laravel guarda los contadores en la caché y ofrece una API para limitar acciones de aplicación, además del middleware throttle para solicitudes HTTP y el middleware de jobs en cola.",
        note: "Este nivel trata la fachada RateLimiter para acciones propias. Para proteger rutas consulta la guía de Routing; para limitar jobs consulta Colas. Usa un almacén de caché compartido en producción si la aplicación corre en varios servidores.",
      },
      {
        title: "Elegir el almacén de caché del limitador",
        code: true,
        fixed: ["php"],
        php: "// config/cache.php\n'default' => env('CACHE_DRIVER', 'file'),\n'limiter' => 'redis',",
        note: "Por defecto, el limitador utiliza el almacén de caché definido como default. La opción limiter permite seleccionar otro driver dedicado, por ejemplo Redis. Configura un backend coherente en todos los servidores para que los límites no se reinicien ni diverjan entre instancias.",
      },
      {
        title: "Limitar una acción con attempt",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\RateLimiter;\n\n$clave = 'enviar-mensaje:'.$usuario->id;\n\n$permitido = RateLimiter::attempt(\n    $clave,\n    $maximo = 5,\n    function (): bool {\n        enviarMensaje();\n        return true;\n    },\n    $ventanaSegundos = 60,\n);\n\nif (! $permitido) {\n    return 'Has alcanzado el límite. Inténtalo más tarde.';\n}",
        note: "attempt() ejecuta el callback si hay capacidad y devuelve false cuando se agotaron los intentos; de lo contrario devuelve el resultado del callback (o true si no retorna uno). El cuarto argumento define cuándo se recuperan los intentos. Devuelve un valor distinguible de false desde el callback para no confundir el resultado de la operación con un límite excedido.",
      },
      {
        title: "Diseñar claves por usuario y acción",
        code: true,
        fixed: ["php"],
        php: "$claveUsuario = 'restablecer-clave:usuario:'.$usuario->id;\n$claveDireccion = 'restablecer-clave:ip:'.$request->ip();\n\n$permitido = RateLimiter::attempt(\n    $claveUsuario,\n    3,\n    fn () => enviarEnlaceRestablecimiento($usuario),\n    900,\n);",
        note: "Incluye en la clave el nombre de la acción y una identidad estable para que contadores independientes no colisionen. Según el riesgo, limita por cuenta, dirección IP o ambas. Evita confiar únicamente en identificadores controlados por el cliente; una clave incorrecta puede dejar sin protección o bloquear a usuarios ajenos.",
      },
      {
        title: "Consultar intentos y aumentar el contador manualmente",
        code: true,
        fixed: ["php"],
        php: "$clave = 'verificar-codigo:'.$usuario->id;\n$maximo = 5;\n\nif (RateLimiter::tooManyAttempts($clave, $maximo)) {\n    $segundos = RateLimiter::availableIn($clave);\n    return 'Vuelve a intentarlo en '.$segundos.' segundos.';\n}\n\nRateLimiter::increment($clave);\nverificarCodigo($codigo);",
        note: "tooManyAttempts() comprueba si se alcanzó el máximo, remaining() devuelve intentos disponibles, increment() aumenta el contador y availableIn() indica los segundos hasta que expire. Para incrementar en más de uno, usa increment($clave, amount: 3). La comprobación y el incremento manuales son operaciones separadas; prefiere attempt() cuando necesitas reservar un intento y ejecutar una acción con una sola API.",
      },
      {
        title: "Restablecer el límite",
        code: true,
        fixed: ["php"],
        php: "$clave = 'verificar-codigo:'.$usuario->id;\n\nif ($codigoEsValido) {\n    RateLimiter::clear($clave);\n    confirmarCuenta($usuario);\n}",
        note: "clear() elimina el contador y restablece los intentos de la clave. Úsalo solo cuando el flujo de negocio haya completado correctamente la acción que justifica el reinicio.",
      },
      {
        title: "Aplicar límites a rutas HTTP",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Cache\\RateLimiting\\Limit;\nuse Illuminate\\Http\\Request;\nuse Illuminate\\Support\\Facades\\RateLimiter;\n\nRateLimiter::for('reportes', function (Request $request) {\n    return Limit::perMinute(30)\n        ->by($request->user()?->id ?: $request->ip());\n});\n\nRoute::get('/reportes', [ReporteController::class, 'index'])\n    ->middleware('throttle:reportes');",
        note: "RateLimiter::for() define un perfil para el middleware throttle y Limit::perMinute() fija su cuota por ventana. Usa una identidad autenticada o la IP como clave y configura proxies de confianza para que request()->ip() represente al cliente correcto. Los ejemplos de limitación por ruta están ampliados en la guía de Routing.",
      },
      {
        title: "Manejar límites excedidos en una API",
        code: true,
        fixed: ["php"],
        php: "if (RateLimiter::tooManyAttempts($clave, $maximo)) {\n    $espera = RateLimiter::availableIn($clave);\n\n    return response()->json(\n        ['message' => 'Demasiadas solicitudes'],\n        429,\n    )->header('Retry-After', (string) $espera);\n}",
        note: "Para APIs devuelve HTTP 429 y comunica cuándo se puede reintentar si el flujo lo permite. No reveles si una cuenta existe al limitar procesos como el inicio de sesión o el restablecimiento de contraseña.",
      },
      {
        title: "Probar y operar límites de tasa",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Facades\\RateLimiter;\n\nRateLimiter::clear('enviar-mensaje:'.$usuario->id);\n\n$primero = RateLimiter::attempt($clave, 1, fn () => true, 60);\n$segundo = RateLimiter::attempt($clave, 1, fn () => true, 60);\n\nassert($primero === true);\nassert($segundo === false);",
        note: "Aísla las pruebas limpiando las claves que utilizan y verifica tanto el callback permitido como el caso de cuota agotada y el tiempo de espera. En producción, vigila disponibilidad y configuración del backend de caché; perder o compartir mal ese almacén altera la efectividad del límite.",
      },
      {
        title: "Guía de Rate Limiting de Laravel 10",
        php: "Rate Limiting en español: https://laravel-docs.com/es/docs/10.x/rate-limiting\nCaché: https://laravel-docs.com/es/docs/10.x/cache\nRouting: https://laravel-docs.com/es/docs/10.x/routing\nMiddleware: https://laravel-docs.com/es/docs/10.x/middleware\nColas: https://laravel-docs.com/es/docs/10.x/queues",
      },
    ],
  },
  {
    level: 25,
    title: "Cadenas y texto en Laravel 10",
    topics: [
      {
        title: "Usar la clase Str y cadenas fluent",
        code: true,
        fixed: ["php"],
        php: "use Illuminate\\Support\\Str;\n\n$slug = Str::slug('Guía de Laravel 10');\n\n$texto = Str::of('  Hola, LARAVEL  ')\n    ->trim()\n    ->lower()\n    ->replace('laravel', 'mundo')\n    ->append('!');\n\n$valor = (string) $texto;",
        note: "Str agrupa utilidades estáticas de Illuminate\\Support; Str::of() crea una instancia Stringable para encadenar transformaciones legibles. El resultado fluent se convierte a una cadena PHP con (string).",
      },
      {
        title: "Normalizar nombres y generar slugs",
        code: true,
        fixed: ["php"],
        php: "$camel = Str::camel('nombre_de_producto');\n$snake = Str::snake('NombreDeProducto');\n$studly = Str::studly('nombre_de_producto');\n$kebab = Str::kebab('NombreDeProducto');\n$titulo = Str::headline('correoEnviado');\n$slug = Str::slug('Café de Veracruz');",
        note: "Estos métodos convierten entre convenciones de nombres y crean encabezados o slugs legibles. Un slug no garantiza unicidad: genera y valida un sufijo o identificador separado cuando se use como clave persistente.",
      },
      {
        title: "Buscar texto y comprobar patrones",
        code: true,
        fixed: ["php"],
        php: "$contiene = Str::contains('Curso Laravel', 'Laravel');\n$contieneAlguno = Str::contains('Curso Laravel', ['PHP', 'Laravel']);\n$contieneTodos = Str::containsAll('Curso de PHP Laravel', ['PHP', 'Laravel']);\n$termina = Str::endsWith('reporte.csv', '.csv');\n$coincide = Str::is('pedido-*', 'pedido-125');\n$jsonValido = Str::isJson('{\"estado\":\"ok\"}');",
        note: "contains es sensible a mayúsculas y minúsculas; puede recibir un arreglo para comprobar si aparece alguno de los valores. is() admite * como comodín, no como expresión regular. Estas comprobaciones no sustituyen la validación rigurosa de datos externos.",
      },
      {
        title: "Extraer fragmentos de una cadena",
        code: true,
        fixed: ["php"],
        php: "$despues = Str::after('pedido:125', ':');\n$ultimoSegmento = Str::afterLast('App\\\\Models\\\\Pedido', '\\\\');\n$antes = Str::before('nombre.apellido', '.');\n$fragmento = Str::between('[estado]', '[', ']');\n\n$extracto = Str::excerpt($descripcion, 'Laravel', [\n    'radius' => 20,\n    'omission' => '…',\n]);",
        note: "after(), before() y between() son útiles para extraer partes delimitadas; sus variantes afterLast() y beforeLast() usan la última coincidencia. excerpt() crea un fragmento alrededor de una frase. Comprueba los casos sin delimitador o con valores ausentes según tu lógica.",
      },
      {
        title: "Limitar, contar y preparar texto",
        code: true,
        fixed: ["php"],
        php: "$cantidad = Str::length($descripcion);\n$resumen = Str::limit($descripcion, 120, '…');\n$espaciosNormalizados = Str::squish($entrada);\n$minusc = Str::lower($entrada);\n$mayusc = Str::upper($entrada);",
        note: "length() cuenta caracteres según las funciones multibyte de Laravel, limit() trunca y permite elegir el sufijo, y squish() elimina espacios redundantes. No uses un resumen truncado como validación de longitud del dato original.",
      },
      {
        title: "Reemplazar texto y formato de cadenas",
        code: true,
        fixed: ["php"],
        php: "$plantilla = 'El pedido :pedido está :estado';\n\n$mensaje = preg_replace_array(\n    '/:[a-z_]+/',\n    ['A-104', 'enviado'],\n    $plantilla,\n);\n\n$ruta = Str::finish('archivos/pedidos', '/');\n$prefijo = Str::start('Laravel', 'Curso de ');",
        note: "preg_replace_array() sustituye coincidencias secuencialmente según el arreglo. finish() agrega el sufijo indicado una sola vez y start() garantiza un prefijo. Para plantillas de interfaz traducibles, prefiere el sistema de Localization con parámetros nombrados.",
      },
      {
        title: "Transliterar y pluralizar",
        code: true,
        fixed: ["php"],
        php: "$ascii = Str::ascii('Córdoba');\n\n$plural = Str::plural('child', 2);\n$singular = Str::plural('child', 1);\n\n$nombreArchivo = Str::slug($ascii);",
        note: "ascii() intenta transliterar caracteres a ASCII, por ejemplo para crear slugs o nombres técnicos; no es una traducción. plural() admite una cantidad y aplica las reglas de pluralización disponibles según el locale de Laravel; consulta Localization para reglas y traducciones completas.",
      },
      {
        title: "Generar identificadores y contraseñas",
        code: true,
        fixed: ["php"],
        php: "$uuid = (string) Str::uuid();\n$uuidOrdenable = (string) Str::orderedUuid();\n$ulid = (string) Str::ulid();\n$esUuid = Str::isUuid($uuid);\n$esUlid = Str::isUlid($ulid);\n\n$contrasenaTemporal = Str::password(24);",
        note: "uuid(), orderedUuid() y ulid() generan identificadores con formatos y propiedades distintos; selecciona el tipo acorde al esquema de datos. password() genera texto aleatorio para una contraseña, pero al autenticar usuarios guarda siempre el resultado mediante el hashing de Laravel, nunca en texto plano.",
      },
      {
        title: "Enmascarar información sensible",
        code: true,
        fixed: ["php"],
        php: "$correoOculto = Str::mask(\n    'ana@example.com',\n    '*',\n    3,\n    5,\n);\n\n$telefonoOculto = Str::mask(\n    '5551234567',\n    '*',\n    0,\n    -4,\n);",
        note: "mask() reemplaza una porción por el carácter indicado; una posición negativa puede contar desde el final. Ocultar la presentación no protege el dato original: limita también su acceso, almacenamiento y registro.",
      },
      {
        title: "Convertir Markdown con seguridad",
        code: true,
        fixed: ["php"],
        php: "$html = Str::markdown($markdown, [\n    'html_input' => 'strip',\n    'allow_unsafe_links' => false,\n]);\n\n$htmlEnLinea = Str::inlineMarkdown('**Laravel**', [\n    'html_input' => 'strip',\n    'allow_unsafe_links' => false,\n]);",
        note: "markdown() y inlineMarkdown() convierten CommonMark a HTML. Si el texto proviene de usuarios, desactiva o escapa HTML crudo y enlaces inseguros con estas opciones; si permites HTML, sanitiza el resultado con un purificador confiable. No insertes HTML no confiable directamente en la página.",
      },
      {
        title: "Escapar texto para HTML",
        code: true,
        fixed: ["php"],
        php: "$seguro = e($entradaUsuario);\n\n// Blade también escapa la interpolación normal:\n// {{ $entradaUsuario }}",
        note: "e() aplica escaping HTML, pero no sanitiza HTML para permitir etiquetas concretas ni sirve para escapar valores dentro de JavaScript, CSS o SQL. Usa el contexto y las herramientas adecuadas para cada salida; consulta también Helpers y seguridad.",
      },
      {
        title: "Guía de Strings de Laravel 10",
        php: "Strings en español: https://laravel-docs.com/es/docs/10.x/strings\nHelpers: https://laravel-docs.com/es/docs/10.x/helpers\nLocalization: https://laravel-docs.com/es/docs/10.x/localization\nValidación: https://laravel-docs.com/es/docs/10.x/validation\nSeguridad: https://laravel-docs.com/es/docs/10.x/security",
      },
    ],
  },
]

const laravelComparison = {
  title: "Laravel, Django o Spring Boot: ¿cuál conviene usar?",
  languages: ["Laravel", "Django", "Spring Boot"],
  rows: [
    { label: "Lenguaje", values: ["PHP", "Python", "Java (o Kotlin)"] },
    { label: "ORM", values: ["Eloquent", "Django ORM", "JPA / Hibernate"] },
    { label: "Plantillas", values: ["Blade", "Django Templates", "Thymeleaf"] },
    { label: "Estilo", values: ["Convenciones y herramientas integradas para construir rápido", "Pilas incluidas y administración integrada", "Ecosistema configurable para aplicaciones empresariales"] },
    { label: "Curva de aprendizaje", values: ["Media", "Media", "Alta"] },
    { label: "Cuándo elegirlo", values: ["Aplicaciones PHP, APIs y productos web con un ecosistema amplio", "Aplicaciones Python con ORM y panel administrativo integrado", "Servicios Java y sistemas empresariales de gran escala"] },
  ],
}

export const laravelModule = {
  id: "laravel",
  label: "Laravel",
  subtitle: "Framework web de PHP · Laravel 10",
  title: "Construye aplicaciones web con PHP y Laravel.",
  description: "Aprende Laravel 10 desde rutas, controladores, middleware, protección CSRF, Blade y Eloquent hasta APIs, contenedor de servicios, seguridad, pruebas y producción. Los ejemplos muestran código de Laravel como referencia: el intérprete PHP del navegador no incluye Laravel y no ejecuta estos ejemplos. Laravel 10 terminó su soporte de seguridad el 4 de febrero de 2025.",
  languages: [{ key: "php", label: "Laravel 10" }],
  levels: laravelLevels,
  outputLabel: "Resultado de ejemplo",
  comparison: laravelComparison,
}
