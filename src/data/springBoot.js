import { springBootWebTopics } from './springBootWeb'
import { springBootSupplement } from './springBootSupplement'

const springBootCoreLevels = [
  {
    level: 0, title: 'Inicio y herramientas',
    topics: [
      { title: 'Que es Spring Boot', java: 'Spring Boot simplifica aplicaciones Java con auto-configuracion, starters y servidor integrado. Esta ruta sigue la referencia 3.2.5.' },
      { title: 'Requisitos', java: 'Spring Boot 3.2.5 requiere Java 17 como minimo. Maven 3.6.3+ o Gradle 7.5+/8.x son compatibles segun la referencia.' },
      { title: 'Crear el proyecto', code: true, java: 'En https://start.spring.io selecciona Maven, Java, version 3.2.5 y Spring Web. Descarga el proyecto y abrelo en tu IDE.' },
      { title: 'Estructura y starters', code: true, java: 'src/main/java: codigo\nsrc/main/resources: configuracion\nsrc/test/java: pruebas\npom.xml: dependencias Maven\n\nspring-boot-starter-web agrupa dependencias web compatibles.' },
    ],
  },
  {
    level: 1, title: 'Fundamentos de Spring Boot',
    topics: [
      { title: 'Clase principal', code: true, java: 'import org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\n\n@SpringBootApplication\npublic class Aplicacion {\n  public static void main(String[] args) {\n    SpringApplication.run(Aplicacion.class, args);\n  }\n}', note: '@SpringBootApplication habilita configuracion, escaneo de componentes y auto-configuracion.' },
      { title: 'Beans e inyeccion', code: true, java: '@Service\nclass SaludoService {\n  String saludar(String nombre) { return \"Hola, \" + nombre; }\n}\n\n@RestController\nclass SaludoController {\n  private final SaludoService servicio;\n  SaludoController(SaludoService servicio) { this.servicio = servicio; }\n}', note: 'La inyeccion por constructor hace explicitas las dependencias.' },
      { title: 'Paquetes y auto-configuracion', java: 'Coloca la clase principal en un paquete raiz. El escaneo busca componentes debajo de ese paquete. Spring Boot configura beans segun dependencias presentes y configuracion propia.' },
      { title: 'Ejecutar la aplicacion', code: true, java: 'mvn spring-boot:run\n\nO ejecuta Aplicacion desde tu IDE. DevTools puede reiniciar la aplicacion durante el desarrollo.' },
    ],
  },
  {
    level: 2, title: 'Configuracion y perfiles',
    topics: [
      { title: 'Properties y YAML', code: true, java: '# application.properties\nserver.port=8081\nspring.application.name=tienda\n\n# application.yaml\nserver:\n  port: 8081' },
      { title: 'Configuracion externa y secretos', java: 'Lee propiedades desde archivos, variables de entorno, argumentos o sistema. No guardes contrasenas ni tokens en el repositorio; inyectalos desde el entorno.' },
      { title: 'Perfiles', code: true, java: '# application-dev.properties\nserver.port=8081\n\n# activar\nspring.profiles.active=dev\n# o argumento: --spring.profiles.active=dev' },
      { title: 'Propiedades tipadas', code: true, java: '@ConfigurationProperties(prefix = \"tienda\")\npublic record TiendaProperties(String nombre, int limite) {}\n\nActiva el escaneo con @ConfigurationPropertiesScan.' },
    ],
  },
  {
    level: 3, title: 'Web y API REST',
    topics: [
      { title: 'Controladores y rutas', code: true, java: '@RestController\n@RequestMapping(\"/api/saludos\")\nclass SaludoController {\n  @GetMapping\n  String inicio() { return \"API disponible\"; }\n  @GetMapping(\"/{nombre}\")\n  String saludar(@PathVariable String nombre) { return \"Hola, \" + nombre; }\n}' },
      { title: 'Metodos HTTP y respuestas', java: 'GET consulta, POST crea, PUT/PATCH actualiza y DELETE elimina. Usa ResponseEntity para controlar codigos como 200, 201, 204, 400 y 404.' },
      { title: 'JSON y validacion', code: true, java: 'public record CrearUsuario(\n  @NotBlank String nombre,\n  @Email String correo\n) {}\n\n@PostMapping\nResponseEntity<?> crear(@Valid @RequestBody CrearUsuario entrada) { ... }', note: 'Agrega spring-boot-starter-validation.' },
      { title: 'Errores centralizados', code: true, java: '@RestControllerAdvice\nclass ApiErrores {\n  @ExceptionHandler(NoEncontrado.class)\n  ResponseEntity<Void> noEncontrado() {\n    return ResponseEntity.notFound().build();\n  }\n}', note: 'Devuelve errores consistentes sin exponer detalles internos.' },
      { title: 'CORS y contenido estatico', java: 'Configura CORS solo para origenes necesarios. Recursos estaticos convencionales pueden estar en src/main/resources/static.' },
    ],
  },
  {
    level: 4, title: 'Datos y persistencia',
    topics: [
      { title: 'Conectar una base SQL', code: true, java: 'spring.datasource.url=jdbc:postgresql://localhost:5432/tienda\nspring.datasource.username=usuario\nspring.datasource.password=secreto\nspring.jpa.hibernate.ddl-auto=validate\n\nUsa variables externas para las credenciales.' },
      { title: 'JPA y repositorios', code: true, java: '@Entity\nclass Producto {\n  @Id @GeneratedValue\n  private Long id;\n  private String nombre;\n  private BigDecimal precio;\n}\n\ninterface ProductoRepository extends JpaRepository<Producto, Long> {}' },
      { title: 'Consultas, paginacion y transacciones', java: 'JpaRepository ofrece operaciones CRUD y paginacion. Declara consultas derivadas como findByNombreContainingIgnoreCase. Usa @Transactional en servicios para agrupar cambios atomicos.' },
      { title: 'Migraciones de esquema', java: 'Usa Flyway o Liquibase para versionar cambios de base de datos. Evita ddl-auto=update en produccion.' },
    ],
  },
  {
    level: 5, title: 'Pruebas y calidad',
    topics: [
      { title: 'Pruebas unitarias', code: true, java: '@Test\nvoid calculaImpuesto() {\n  PrecioService servicio = new PrecioService();\n  assertEquals(new BigDecimal(\"12.00\"),\n    servicio.conImpuesto(new BigDecimal(\"10.00\")));\n}' },
      { title: 'Pruebas del contexto', code: true, java: '@SpringBootTest\nclass AplicacionTests {\n  @Test void iniciaContexto() {}\n}\n\nComprueba que el contexto de la aplicacion puede arrancar.' },
      { title: 'Pruebas web y de repositorios', java: '@WebMvcTest permite probar controladores con MockMvc. @DataJpaTest prueba mapeos y repositorios con una base de prueba.' },
      { title: 'Integracion con Testcontainers', java: 'Testcontainers puede iniciar PostgreSQL u otros servicios en contenedores durante las pruebas para evitar depender de instalaciones locales.' },
    ],
  },
  {
    level: 6, title: 'Seguridad y observabilidad',
    topics: [
      { title: 'Spring Security', java: 'Al incluir spring-boot-starter-security puedes autenticar usuarios y proteger rutas. Define explicitamente que recursos son publicos y cuales requieren autorizacion.' },
      { title: 'Actuator y health checks', code: true, java: 'Agrega spring-boot-starter-actuator.\n\nmanagement.endpoints.web.exposure.include=health,info\n\nConsulta /actuator/health. Protege los endpoints de administracion.' },
      { title: 'Logs, metricas y trazas', java: 'Usa SLF4J y niveles adecuados; nunca registres secretos. Actuator y Micrometer permiten observar salud y metricas de la aplicacion.' },
      { title: 'Tareas y eventos', code: true, java: '@EnableScheduling\n@Configuration\nclass TareasConfig {}\n\n@Component\nclass Tarea {\n  @Scheduled(fixedRate = 60_000)\n  void ejecutar() { /* tarea periodica */ }\n}', note: 'Considera reintentos y ejecuciones duplicadas.' },
    ],
  },
  {
    level: 7, title: 'Empaquetar y desplegar',
    topics: [
      { title: 'Crear un JAR ejecutable', code: true, java: 'mvn clean package\njava -jar target/tienda-0.0.1-SNAPSHOT.jar\n\nEl plugin de Spring Boot empaqueta dependencias en un JAR ejecutable.' },
      { title: 'Perfiles de produccion', java: 'Externaliza configuracion, credenciales y endpoints. Ajusta logging, conexiones, health checks y recursos para el entorno de despliegue.' },
      { title: 'Contenedores e imagenes OCI', java: 'El plugin Maven de Spring Boot integra Cloud Native Buildpacks para crear imagenes OCI. Tambien puedes construir una imagen con Docker.' },
      { title: 'Imagen nativa y rendimiento', java: 'La integracion con GraalVM Native Image permite generar ejecutables nativos. Mide arranque, memoria y latencia antes de optimizar.' },
      { title: 'Proyecto final: API de productos', java: 'Construye CRUD con DTO validados, persistencia JPA, migraciones, errores consistentes, pruebas, perfiles y health checks.' },
      { title: 'Referencia oficial 3.2.5', java: 'Este modulo es una ruta didactica resumida. Consulta la referencia completa para las opciones y detalles: https://docs.spring.io/spring-boot/docs/3.2.5/reference/htmlsingle/' },
    ],
  },
]

export const springBootLevels = [
  {
    level: 0, title: 'Modulo 01: Aspectos legales y alcance',
    topics: [
      { title: 'Como usar este curso', java: 'Este temario es una guia didactica basada en Spring Boot Reference Documentation 3.2.5. Los ejemplos son adaptaciones breves; consulta la documentacion oficial para el contexto completo.' },
      { title: 'Licencias y atribucion', java: 'Spring Boot y sus dependencias tienen sus propias licencias. Revisa las licencias de cada componente antes de distribuir una aplicacion. Referencia: https://docs.spring.io/spring-boot/docs/3.2.5/reference/htmlsingle/#legal' },
      { title: 'Versiones del curso', java: 'Los ejemplos se orientan a Spring Boot 3.2.5. Sus requisitos y opciones pertenecen a esa version; confirma compatibilidad antes de copiar configuraciones en otro proyecto.' },
    ],
  },
  {
    level: 1, title: 'Modulo 02: Obtener ayuda',
    topics: [
      { title: 'Encontrar una respuesta', java: 'Identifica primero version, mensaje de error y seccion relacionada. Busca por nombre de clase, propiedad o starter en la referencia oficial.' },
      { title: 'Diagnosticar problemas', code: true, java: 'mvn -v\njava -version\nmvn spring-boot:run --debug\n\nRevisa la causa mas profunda de la traza y las condiciones de auto-configuracion.' },
      { title: 'Pedir ayuda con contexto', java: 'Incluye versiones, pasos para reproducir, traza relevante y un ejemplo minimo. Nunca publiques claves, tokens ni datos personales.' },
      { title: 'Recursos oficiales', java: 'Referencia 3.2.5: https://docs.spring.io/spring-boot/docs/3.2.5/reference/htmlsingle/\nSpring Guides: https://spring.io/guides' },
    ],
  },
  {
    level: 2, title: 'Modulo 03: Recorrido de la documentacion',
    topics: [
      { title: 'Mapa de la referencia', java: 'La guia cubre primeros pasos, desarrollo, funciones centrales, web, datos, mensajeria, IO, contenedores, produccion, despliegue, imagenes nativas, CLI, plugins y recetas.' },
      { title: 'Como leer cada seccion', java: 'Busca requisitos, dependencia necesaria, configuracion, ejemplo y limitaciones. Diferencia las funciones de Spring Boot de las que pertenecen a otros proyectos Spring.' },
      { title: 'Ruta recomendada', java: 'Completa primero los modulos 04 a 09 para construir una API. Continua con modulos 10 a 13 para integrar servicios, pruebas y operacion; termina con las herramientas avanzadas.' },
    ],
  },
  {
    level: 3, title: 'Modulo 04: Primeros pasos',
    topics: springBootCoreLevels[0].topics,
  },
  {
    level: 4, title: 'Modulo 05: Actualizar Spring Boot',
    topics: [
      { title: 'Planificar la actualizacion', java: 'Anota las versiones actuales de Java, Spring Boot, plugins y dependencias. Define la version objetivo y un plan de retroceso antes de cambiar el proyecto.' },
      { title: 'Leer notas y guias de migracion', java: 'Las instrucciones de actualizacion aparecen en las notas de cada version. Si hay versiones intermedias, revisa tambien sus notas para detectar cambios acumulados.' },
      { title: 'Diagnosticar propiedades obsoletas', java: 'Al arrancar, Spring Boot puede informar propiedades renombradas o eliminadas. Usa esos mensajes para localizar la configuracion que debes corregir.' },
      { title: 'Validar y cerrar la migracion', java: 'Actualiza una version objetivo a la vez, compila y verifica flujos principales, endpoints, persistencia, seguridad y despliegue. Retira herramientas temporales al terminar.' },
    ],
  },
  {
    level: 5, title: 'Modulo 06: Desarrollar con Spring Boot',
    topics: springBootCoreLevels[1].topics,
  },
  {
    level: 6, title: 'Modulo 07: Funciones centrales',
    topics: springBootCoreLevels[2].topics,
  },
  {
    level: 7, title: 'Modulo 08: Aplicaciones web',
    topics: [...springBootCoreLevels[3].topics, ...springBootWebTopics],
  },
  {
    level: 8, title: 'Modulo 09: Acceso a datos',
    topics: springBootCoreLevels[4].topics,
  },
  {
    level: 9, title: 'Modulo 10: Mensajeria e integracion',
    topics: [
      { title: 'Mensajeria asincrona', java: 'La mensajeria desacopla productores y consumidores. Spring Boot integra opciones como JMS, AMQP, Kafka y Pulsar mediante starters.' },
      { title: 'RabbitMQ con AMQP', code: true, java: 'Agrega spring-boot-starter-amqp y configura spring.rabbitmq.*.\n\n@RabbitListener(queues = \"pedidos\")\nvoid recibir(String mensaje) { ... }\n\nDefine colas y politicas de reintento para tu caso.' },
      { title: 'Kafka y eventos', java: 'Spring Boot puede configurar productores y consumidores Kafka desde propiedades. Define claves, serializacion, grupos de consumidores y manejo de errores.' },
      { title: 'WebSocket y RSocket', java: 'WebSocket mantiene una conexion para intercambios interactivos. RSocket ofrece patrones de comunicacion reactivos; selecciona el protocolo segun la necesidad.' },
    ],
  },
  {
    level: 10, title: 'Modulo 11: IO y servicios',
    topics: [
      { title: 'Cache', java: 'Activa caching con @EnableCaching y usa @Cacheable, @CachePut o @CacheEvict. Configura un proveedor adecuado y define expiracion.' },
      { title: 'Validacion', java: 'La integracion con Jakarta Validation permite comprobar objetos con @NotBlank, @Email y restricciones propias. Inicia la validacion en el limite de la API.' },
      { title: 'Llamar otras APIs', java: 'RestClient es adecuado para llamadas sincrónicas; WebClient soporta uso reactivo. Define timeouts, autenticacion y traduccion de errores.' },
      { title: 'Correo y tareas', java: 'spring-boot-starter-mail configura JavaMailSender. Para tareas recurrentes usa @Scheduled, maneja fallos y evita enviar datos sensibles en logs.' },
    ],
  },
  {
    level: 11, title: 'Modulo 12: Imagenes de contenedor',
    topics: [
      { title: 'Por que usar contenedores', java: 'Una imagen empaqueta aplicacion y entorno de ejecucion para que los despliegues sean reproducibles.' },
      { title: 'Capas de la imagen', java: 'El plugin de Spring Boot puede separar dependencias, loader y clases de aplicacion en capas para mejorar la reutilizacion de cache.' },
      { title: 'Buildpacks', code: true, java: 'mvn spring-boot:build-image\n\nEl plugin usa Cloud Native Buildpacks para crear una imagen OCI sin mantener un Dockerfile propio.' },
      { title: 'Dockerfile y ejecucion', code: true, java: 'FROM eclipse-temurin:17-jre\nCOPY target/app.jar app.jar\nENTRYPOINT [\"java\", \"-jar\", \"/app.jar\"]\n\nConstruye la imagen y configura puertos, memoria y variables en el despliegue.' },
    ],
  },
  {
    level: 12, title: 'Modulo 13: Funciones para produccion',
    topics: [...springBootCoreLevels[5].topics, ...springBootCoreLevels[6].topics],
  },
  {
    level: 13, title: 'Modulo 14: Desplegar aplicaciones',
    topics: [
      { title: 'Preparar el despliegue', java: 'Define configuracion externa, salud, logs, limites de recursos, puertos, almacenamiento y estrategia de actualizacion antes de publicar.' },
      { title: 'Despliegue en nube y Kubernetes', java: 'La referencia incluye plataformas cloud y Kubernetes. Usa readiness y liveness probes, configura secretos fuera de la imagen y define recursos del contenedor.' },
      { title: 'Ejecutar como servicio', java: 'Un JAR ejecutable puede ejecutarse como servicio de sistema. Configura usuario sin privilegios, reinicios, directorio de trabajo y salida de logs.' },
      { title: 'Despliegues eficientes', java: 'La guia cubre descompresion del JAR y opciones AOT/JVM como checkpoint y restore. Mide el resultado en el entorno objetivo.' },
      ...springBootCoreLevels[7].topics.slice(0, 2),
    ],
  },
  {
    level: 14, title: 'Modulo 15: Imagenes nativas con GraalVM',
    topics: [
      { title: 'JVM y ejecutable nativo', java: 'Una imagen nativa puede reducir tiempo de arranque y memoria, pero cambia la construccion y tiene restricciones de compatibilidad.' },
      { title: 'Procesamiento AOT', java: 'Spring AOT genera codigo y metadatos antes de ejecutar. Reflexion, proxies y recursos dinamicos pueden requerir hints.' },
      { title: 'Construir con Maven', code: true, java: 'mvn -Pnative native:compile\n\nLa construccion requiere GraalVM Native Image o el soporte de buildpacks y recursos compatibles.' },
      { title: 'Probar la imagen nativa', java: 'Prueba rutas, serializacion, reflexion y acceso a recursos en el ejecutable nativo. No asumas que una prueba sobre JVM cubre esas diferencias.' },
      ...springBootCoreLevels[7].topics.slice(3, 4),
    ],
  },
  {
    level: 15, title: 'Modulo 16: Spring Boot CLI',
    topics: [
      { title: 'Instalar la CLI', java: 'La CLI permite inicializar y ejecutar proyectos desde la terminal. Para el trabajo diario tambien puedes usar Maven o Gradle directamente.' },
      { title: 'Inicializar un proyecto', code: true, java: 'spring init --build=maven --java-version=17 --dependencies=web demo.zip\n\nDescomprime el archivo y abre el proyecto.' },
      { title: 'Comandos de la CLI', java: 'Usa spring help para consultar comandos y opciones disponibles en la version instalada. La CLI puede ejecutar scripts compatibles y crear proyectos iniciales.' },
      { title: 'Cuando usarla', java: 'La CLI es util para prototipos y automatizacion. En proyectos de equipo conserva el wrapper Maven o Gradle y configura el IDE.' },
    ],
  },
  {
    level: 16, title: 'Modulo 17: Plugins de compilacion',
    topics: [
      { title: 'Spring Boot Maven Plugin', code: true, java: 'mvn spring-boot:run\nmvn package\nmvn spring-boot:build-image\n\nEl plugin ejecuta, empaqueta y puede crear imagenes.' },
      { title: 'Plugin de Gradle', code: true, java: 'plugins {\n  id \"org.springframework.boot\" version \"3.2.5\"\n  id \"io.spring.dependency-management\" version \"1.1.4\"\n}\n\nUsa bootRun, bootJar y tareas de imagen cuando esten configuradas.' },
      { title: 'Dependencias y empaquetado', java: 'Los plugins ayudan a gestionar versiones y generar archivos ejecutables. Fija versiones de plugins y conserva archivos wrapper para builds reproducibles.' },
      { title: 'Otros sistemas de build', java: 'Si no usas Maven o Gradle, revisa el soporte de repackaging y bibliotecas anidadas. Mantener el classpath correcto es responsabilidad de la configuracion.' },
    ],
  },
  {
    level: 17, title: 'Modulo 18: Guias practicas (How-to)',
    topics: [
      { title: 'Cambiar el puerto y el servidor', java: 'server.port=0\n\nUn puerto 0 solicita un puerto disponible. Para cambiar el servidor embebido, sustituye el starter correspondiente y valida compatibilidad.' },
      { title: 'Personalizar Spring MVC y JSON', java: 'Usa @RestController para JSON, configura Jackson mediante propiedades o un bean cuando sea necesario y personaliza manejo de errores de forma central.' },
      { title: 'Configurar dos fuentes de datos', java: 'Declara dos DataSource con prefijos distintos, identifica uno como @Primary cuando aplique y asigna cada repositorio a su entidad y administrador de transacciones.' },
      { title: 'Resolver problemas de auto-configuracion', java: 'Inicia con --debug para obtener el informe de condiciones. Comprueba dependencias y propiedades antes de excluir una auto-configuracion.' },
      { title: 'Recetas para el proyecto final', java: 'Integra API REST, persistencia, validacion, pruebas, seguridad, Actuator y empaquetado. Registra decisiones y consulta las recetas oficiales para configuraciones especificas.' },
      { title: 'Documentacion completa', java: 'La referencia oficial contiene las opciones avanzadas, recetas y limitaciones de cada version: https://docs.spring.io/spring-boot/docs/3.2.5/reference/htmlsingle/' },
    ],
  },
]
springBootLevels.forEach((module, index) => {
  const extraTopics = springBootSupplement[index] ?? []
  module.topics.push(...extraTopics.map(([title, java]) => ({ title, java })))
})

export const springBootComparison = {
  languages: ['Java', 'Spring Framework', 'Spring Boot'],
  rows: [
    { label: 'Papel', values: ['Lenguaje y plataforma JVM', 'Base de contenedor y modulos Spring', 'Herramientas para crear aplicaciones Spring listas para ejecutar'] },
    { label: 'Configuracion', values: ['Tipos, clases y compilacion', 'Beans e inyeccion de dependencias', 'Auto-configuracion, starters y servidor integrado'] },
    { label: 'Uso', values: ['Implementar logica', 'Construir aplicaciones gestionadas', 'Crear APIs, servicios y aplicaciones desplegables'] },
  ],
}
