// Ruta original de Docker basada en la documentación oficial:
// https://docs.docker.com/

const text = (title, docker, note) => ({ title, docker, ...(note && { note }) })
const code = (title, docker, note) => ({ title, code: true, docker, ...(note && { note }) })
const links = (title, entries) => ({
  title,
  docker: entries.map(([label, url]) => `${label}: ${url}`).join('\n'),
})

const dockerLevels = [
  {
    title: 'Introducción y entorno',
    topics: [
      text(
        '¿Qué es Docker?',
        `Docker es una plataforma para construir, distribuir y ejecutar aplicaciones en contenedores. Un contenedor agrupa una aplicación y sus dependencias sobre el kernel del sistema anfitrión. Las imágenes son plantillas de solo lectura desde las que se crean contenedores.`,
      ),
      text(
        'Contenedores y máquinas virtuales',
        `Las máquinas virtuales incluyen un sistema operativo invitado completo; los contenedores comparten el kernel del anfitrión y aíslan procesos mediante capacidades del sistema operativo. Ambos enfoques tienen usos válidos y las garantías de aislamiento dependen de la configuración.`,
      ),
      text(
        'Instalar Docker Desktop o Docker Engine',
        `Docker Desktop ofrece Docker Engine y herramientas integradas para Windows y macOS, y también está disponible en Linux. En servidores Linux se puede instalar Docker Engine siguiendo la guía de la distribución. Revisa requisitos, licencias y permisos de uso correspondientes.`,
      ),
      code(
        'Comprobar cliente y servidor',
        `$ docker --version
$ docker version
$ docker info`,
        'docker --version muestra el cliente; docker version e info consultan también el daemon. Si el servidor no responde, revisa que Docker Desktop o el servicio Engine estén iniciados.',
      ),
      code(
        'Ejecutar el primer contenedor',
        `$ docker run hello-world`,
        'Docker descarga la imagen si falta y luego ejecuta el contenedor. El mensaje de hello-world confirma que el cliente pudo comunicarse con Docker Engine.',
      ),
      links('Documentación oficial para comenzar', [
        ['Documentación de Docker', 'https://docs.docker.com/'],
        ['Guía para empezar', 'https://docs.docker.com/get-started/'],
        ['Instalar Docker Desktop', 'https://docs.docker.com/get-started/get-docker/'],
      ]),
    ],
  },
  {
    title: 'Imágenes y contenedores',
    topics: [
      code(
        'Buscar, descargar y listar imágenes',
        `$ docker search nginx
$ docker pull nginx:alpine
$ docker image ls`,
        'Una etiqueta como alpine selecciona una variante, pero puede cambiar con el tiempo si no es inmutable. Para reproducibilidad estricta, considera fijar una versión específica o digest.',
      ),
      code(
        'Iniciar un contenedor en segundo plano',
        `$ docker run -d --name web nginx:alpine
$ docker ps
$ docker ps -a`,
        '-d ejecuta en segundo plano. docker ps lista contenedores activos y -a incluye los detenidos.',
      ),
      code(
        'Publicar un puerto',
        `$ docker run -d --name web -p 8080:80 nginx:alpine`,
        'La opción -p publica el puerto del contenedor en el anfitrión: puerto local 8080 hacia el puerto 80 del contenedor. Sin publicación, no queda expuesto mediante ese puerto del host.',
      ),
      code(
        'Ver logs y detalles',
        `$ docker logs web
$ docker logs -f web
$ docker inspect web`,
        'logs muestra la salida estándar del proceso principal; -f sigue los mensajes nuevos. inspect devuelve metadatos detallados en JSON; evita compartir datos sensibles que pudieran aparecer allí.',
      ),
      code(
        'Entrar a un contenedor en ejecución',
        `$ docker exec -it web sh`,
        'exec ejecuta un proceso adicional dentro del contenedor. No depende de que bash esté instalado; muchas imágenes pequeñas incluyen sh.',
      ),
      code(
        'Detener, iniciar y eliminar recursos',
        `$ docker stop web
$ docker start web
$ docker rm -f web
$ docker image rm nginx:alpine`,
        'rm -f fuerza la detención antes de eliminar el contenedor. Comprueba nombre y datos persistentes antes de borrar: los archivos de la capa escribible desaparecen al eliminar el contenedor.',
      ),
    ],
  },
  {
    title: 'Crear imágenes con Dockerfile',
    topics: [
      code(
        'Escribir un Dockerfile mínimo',
        `FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm", "start"]`,
        'FROM selecciona una imagen base, WORKDIR fija el directorio, RUN ejecuta acciones durante el build y CMD define el comando predeterminado al iniciar.',
      ),
      code(
        'Construir y etiquetar una imagen',
        `$ docker build -t mi-app:1.0 .
$ docker image ls mi-app`,
        'El punto final es el contexto de build. La etiqueta ayuda a identificar versiones; el tag latest no garantiza que sea la versión más reciente o deseada.',
      ),
      text(
        'Contexto de build y .dockerignore',
        `Docker envía el contexto de build al constructor. Un .dockerignore evita incluir archivos innecesarios o secretos, como node_modules, .git y .env. No copies credenciales dentro de una imagen: sus capas pueden conservarlas incluso si luego borras el archivo.`,
      ),
      text(
        'Capas y caché de construcción',
        `Las instrucciones del Dockerfile crean capas y el constructor puede reutilizar resultados. Copia primero los manifiestos de dependencias y ejecuta su instalación antes de copiar el código que cambia con frecuencia, para mejorar la reutilización de caché.`,
      ),
      code(
        'Usar CMD y ENTRYPOINT',
        `ENTRYPOINT ["node"]
CMD ["server.js"]`,
        'ENTRYPOINT define el ejecutable principal; CMD aporta argumentos predeterminados que se pueden sobrescribir. Usa la forma JSON para que el proceso reciba señales correctamente.',
      ),
      text(
        'ARG y ENV',
        `ARG existe principalmente durante la construcción; ENV define variables disponibles al construir y ejecutar según la capa. Ninguna de ellas es apropiada para guardar secretos: usa mecanismos de secretos del build o del orquestador.`,
      ),
    ],
  },
  {
    title: 'Persistencia y datos',
    topics: [
      text(
        'Sistema de archivos del contenedor',
        `La capa escribible del contenedor es efímera: los datos pueden perderse al eliminarlo. Separa los datos persistentes de la imagen y del ciclo de vida de cada instancia.`,
      ),
      code(
        'Crear y montar un volumen nombrado',
        `$ docker volume create datos-db
$ docker run -d --name db -v datos-db:/var/lib/postgresql/data postgres:16`,
        'Los volúmenes nombrados los gestiona Docker y son una opción habitual para persistir datos de servicios. Revisa las rutas requeridas por la imagen y las instrucciones de respaldo del motor.',
      ),
      code(
        'Montar una carpeta del anfitrión',
        `$ docker run --rm -it -v "${'${PWD}'}:/app" -w /app node:22-alpine node index.js`,
        'Un bind mount conecta una ruta del host con una ruta del contenedor. En Windows la sintaxis y permisos dependen de PowerShell, Docker Desktop y del shell usado.',
      ),
      text(
        'Bind mounts y volúmenes',
        `Los bind mounts apuntan a una ruta concreta del anfitrión y son prácticos durante desarrollo. Los volúmenes los administra Docker, facilitan persistencia y suelen ser preferibles para datos que no deben depender de una ruta local.`,
      ),
      text(
        'Respaldar y restaurar datos',
        `Define una estrategia de respaldo coherente con la aplicación: consistencia transaccional, cifrado, retención y pruebas de restauración. Copiar archivos de una base activa sin coordinarse con el motor puede generar un respaldo inválido.`,
      ),
      text(
        'Permisos y propietario de archivos',
        `Comprueba UID, GID y permisos entre host y contenedor, especialmente con bind mounts. Ejecutar como root puede ocultar problemas de permisos y aumentar el impacto de una vulnerabilidad.`,
      ),
    ],
  },
  {
    title: 'Redes y comunicación',
    topics: [
      text(
        'Redes de Docker',
        `Las redes conectan contenedores y ofrecen aislamiento configurable. Una red bridge definida por el usuario permite resolución de nombres entre contenedores conectados; la red predeterminada tiene diferencias de descubrimiento.`,
      ),
      code(
        'Crear una red y conectar servicios',
        `$ docker network create app-net
$ docker run -d --name api --network app-net node:22-alpine
$ docker network inspect app-net`,
        'La aplicación dentro del contenedor debe iniciar un proceso de servidor para responder; el comando ilustrativo solo destaca cómo conectar la red.',
      ),
      text(
        'Descubrimiento por nombre de servicio',
        `En una red definida por el usuario, los contenedores pueden resolver nombres conectados, por ejemplo la aplicación puede acceder al servicio db por el puerto interno del motor. Usa el nombre DNS del servicio, no localhost: dentro de un contenedor localhost es el propio contenedor.`,
      ),
      code(
        'Publicar solo el puerto necesario',
        `$ docker run -d --name api -p 127.0.0.1:3000:3000 mi-api:1.0`,
        'Vincular el puerto a 127.0.0.1 lo limita a conexiones locales del anfitrión. Publicar sin dirección específica puede exponerlo en interfaces de red del host; confirma las necesidades y reglas del firewall.',
      ),
      text(
        'Puertos del contenedor y puertos del host',
        `EXPOSE en una imagen documenta el puerto que suele utilizar la aplicación, pero no lo publica. -p crea el mapeo host:contenedor; la comunicación entre servicios en una red puede usar el puerto interno sin publicar al host.`,
      ),
      text(
        'Diagnosticar conectividad',
        `Comprueba que los contenedores comparten una red, el proceso escucha en la interfaz correcta, el puerto coincide y el servicio está listo. Inspecciona redes y logs; un orden de inicio no garantiza que una dependencia ya acepte conexiones.`,
      ),
    ],
  },
  {
    title: 'Docker Compose para múltiples servicios',
    topics: [
      text(
        'Qué resuelve Docker Compose',
        `Compose define en un archivo la aplicación de varios contenedores, sus redes, volúmenes y configuración. Permite iniciar un entorno reproducible con un comando y es útil en desarrollo, pruebas y algunos despliegues.`,
      ),
      code(
        'Definir servicios en compose.yaml',
        `services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: app`,
        'Compose crea una red predeterminada y hace resolubles los nombres de servicio. En producción, gestiona credenciales mediante secretos y configuración segura del proveedor.',
      ),
      code(
        'Levantar y detener el proyecto',
        `$ docker compose up -d
$ docker compose ps
$ docker compose logs -f
$ docker compose down`,
        'up crea y arranca recursos declarados. down elimina contenedores y redes, pero normalmente conserva volúmenes nombrados salvo que se solicite explícitamente eliminarlos.',
      ),
      code(
        'Esperar dependencias saludables',
        `services:
  api:
    build: .
    depends_on:
      db:
        condition: service_healthy
  db:
    image: postgres:16
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 3s
      retries: 10`,
        'depends_on controla orden y, con healthcheck, puede esperar a que el servicio se considere saludable. La aplicación también debe tolerar reconexión y fallos transitorios.',
      ),
      text(
        'Variables y archivos de entorno',
        `Compose puede interpolar variables y leer archivos de entorno para configuración local. No compartas ni subas archivos con secretos; define valores requeridos explícitamente y evita contraseñas predeterminadas en despliegues reales.`,
      ),
      text(
        'Perfiles y configuración por entorno',
        `Los perfiles permiten activar servicios opcionales. Para separar desarrollo y producción, elige una estrategia clara de archivos y variables y valida la configuración efectiva antes de desplegar.`,
      ),
    ],
  },
  {
    title: 'Desarrollo, pruebas y registro en un registry',
    topics: [
      text(
        'Flujo de desarrollo con contenedores',
        `Un entorno de desarrollo puede montar el código fuente y ejecutar recarga automática. Mantén artefactos y dependencias locales fuera de la imagen cuando corresponda, y evita que bind mounts sobrescriban accidentalmente directorios instalados en el contenedor.`,
      ),
      code(
        'Construir y ejecutar pruebas',
        `$ docker build -t mi-app:test .
$ docker run --rm mi-app:test npm test`,
        'El contenedor debe ejecutar una tarea de prueba y salir con código distinto de cero ante fallos. Ajusta comando y dependencias a la aplicación real.',
      ),
      text(
        'Publicar en Docker Hub',
        `Autentícate en el registry, etiqueta la imagen con el nombre del usuario o equipo y una versión, y publica solo imágenes aprobadas. Nunca incluyas credenciales en el Dockerfile ni las dejes en capas o logs.`,
      ),
      code(
        'Etiquetar y publicar una imagen',
        `$ docker tag mi-app:1.0 usuario/mi-app:1.0
$ docker login
$ docker push usuario/mi-app:1.0`,
        'Usa una etiqueta de versión rastreable y considera fijar imágenes por digest para despliegues reproducibles. Protege las credenciales del registry.',
      ),
      text(
        'Usar un registry privado',
        `Un registry privado controla el acceso a imágenes. Configura permisos por equipo y automatización, rota credenciales, revisa registros de acceso y evita distribuir imágenes sensibles públicamente.`,
      ),
      text(
        'Integrar Docker en CI',
        `En CI, construye la imagen, ejecuta pruebas y análisis, y publícala solo bajo condiciones acordadas. Fija acciones y dependencias de confianza, limita permisos y evita exponer secretos a código no confiable.`,
      ),
    ],
  },
  {
    title: 'Imágenes pequeñas, seguridad y rendimiento',
    topics: [
      text(
        'Construcciones multi-stage',
        `Un Dockerfile multi-stage separa dependencias de construcción y runtime. Copia a la etapa final solo los artefactos necesarios para reducir tamaño, superficie de ataque y herramientas que no hacen falta en producción.`,
      ),
      code(
        'Ejemplo de build multi-stage',
        `FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html`,
        'Las etapas nombradas hacen explícito qué archivos llegan a la imagen final. Confirma que la etapa final incluya configuración y archivos necesarios para ejecutar el servicio.',
      ),
      text(
        'Ejecutar como usuario no privilegiado',
        `Cuando la imagen lo permita, crea o selecciona un usuario sin privilegios y ejecuta la aplicación con ese usuario. Reduce permisos del proceso y evita montar el socket Docker o capacidades elevadas sin una necesidad justificada.`,
      ),
      text(
        'Actualizar imágenes base y analizar vulnerabilidades',
        `Mantén imágenes base, dependencias y herramientas actualizadas. Escanea vulnerabilidades, prioriza según exposición y disponibilidad de parches, y reconstruye imágenes después de actualizar dependencias.`,
      ),
      text(
        'Secretos durante el build y en runtime',
        `Los secretos de build deben proporcionarse mediante mecanismos de secret mount compatibles, no ARG, ENV ni COPY. En runtime, utiliza el gestor de secretos del entorno y limita qué servicio puede leer cada valor.`,
      ),
      text(
        'Reducir tamaño y mejorar caché',
        `Elige una imagen base adecuada, combina cuidadosamente dependencias de runtime, usa .dockerignore y ordena instrucciones para aprovechar caché. Mide tiempo y tamaño, sin sacrificar soporte, actualizaciones o diagnóstico.`,
      ),
    ],
  },
  {
    title: 'Diagnóstico, mantenimiento y despliegue',
    topics: [
      code(
        'Inspeccionar procesos y consumo',
        `$ docker stats
$ docker top mi-contenedor
$ docker inspect mi-contenedor`,
        'stats resume uso de recursos y top muestra procesos. Las métricas ayudan a detectar límites y fugas, pero el diagnóstico requiere entender la carga y el runtime de la aplicación.',
      ),
      text(
        'Usar healthchecks correctamente',
        `Un healthcheck debe verificar una condición significativa del servicio y tener intervalos, timeout y reintentos razonables. Un contenedor en estado unhealthy no se reinicia por sí solo en todos los entornos.`,
      ),
      text(
        'Límites de CPU y memoria',
        `Configura límites de recursos según mediciones y la plataforma de despliegue. Prueba el comportamiento bajo presión; una aplicación debe gestionar memoria, señales de cierre y saturación con gracia.`,
      ),
      text(
        'Logs, señales y cierre ordenado',
        `Escribe logs útiles a stdout y stderr para que la plataforma los recopile. Ejecuta el proceso principal sin un shell intermediario cuando sea posible, maneja señales de terminación y permite que la aplicación cierre conexiones y persista estado necesario.`,
      ),
      text(
        'Diferencias entre desarrollo y producción',
        `En producción fija versiones de imagen, protege puertos, usa secretos, configura almacenamiento y monitoreo, y automatiza actualizaciones y rollback. Compose facilita definir servicios, pero disponibilidad, red y secretos dependen también de la infraestructura.`,
      ),
      links('Documentación oficial para profundizar', [
        ['Referencia de Dockerfile', 'https://docs.docker.com/reference/dockerfile/'],
        ['Referencia de Docker Compose', 'https://docs.docker.com/reference/compose-file/'],
        ['Seguridad en Docker', 'https://docs.docker.com/engine/security/'],
      ]),
    ],
  },
  {
    title: 'Proyecto integrador: aplicación con Docker Compose',
    topics: [
      text(
        'Diseñar los servicios y su configuración',
        `Elige una aplicación web y una base de datos. Define qué servicio necesita cada uno, puertos internos, datos persistentes, comprobaciones de salud y variables de configuración antes de escribir el compose.yaml.`,
      ),
      text(
        'Crear un Dockerfile eficiente',
        `Construye la aplicación con contexto reducido y capas reutilizables. Separa build y runtime con multi-stage cuando convenga y ejecuta el servicio con permisos mínimos.`,
      ),
      text(
        'Conectar web y base de datos',
        `Configura Compose para que los servicios se descubran por nombre dentro de la red. No publiques la base de datos al host salvo que el caso de desarrollo lo requiera; usa puertos internos para comunicación entre contenedores.`,
      ),
      text(
        'Persistir datos y proteger secretos',
        `Añade un volumen para los datos del servicio que lo necesita, prueba reinicios y documenta el respaldo. Mantén credenciales fuera de imágenes y del control de versiones; usa valores seguros y gestión de secretos apropiada.`,
      ),
      text(
        'Automatizar build y pruebas',
        `Crea pasos de CI para lint, pruebas y construcción. Publica imágenes etiquetadas solo después de las verificaciones acordadas y restringe secretos y permisos del workflow.`,
      ),
      text(
        'Documentar y validar la operación',
        `Escribe instrucciones de inicio y parada, variables requeridas, puertos y solución de problemas. Comprueba logs, healthchecks, persistencia, limpieza segura y comportamiento al reconstruir o actualizar imágenes.`,
      ),
    ],
  },
]

export const dockerModule = {
  id: 'docker',
  label: 'Docker',
  title: 'Empaqueta y ejecuta aplicaciones en contenedores.',
  description: 'Aprende Docker desde imágenes y contenedores hasta Dockerfile, volúmenes, redes, Compose, CI, seguridad y despliegue. Basado en la documentación oficial e incluye un proyecto integrador y examen final generado por IA.',
  subtitle: 'Contenedores · imágenes · Docker Compose',
  languages: [{ key: 'docker', label: 'Docker' }],
  levels: dockerLevels.map((level, index) => ({ ...level, level: index })),
  outputLabel: 'Resultado de ejemplo',
  comparison: {
    title: 'Contenedor e imagen',
    languages: ['Imagen Docker', 'Contenedor Docker'],
    rows: [
      { label: 'Función', values: ['Plantilla inmutable para ejecutar una aplicación', 'Instancia en ejecución o detenida creada desde una imagen'] },
      { label: 'Cambios', values: ['Se construye o descarga', 'Tiene una capa escribible efímera'] },
      { label: 'Persistencia', values: ['No almacena datos de runtime', 'Necesita volúmenes para conservar datos al eliminarse'] },
      { label: 'Comandos comunes', values: ['build, pull, tag, push', 'run, ps, logs, exec, stop'] },
    ],
  },
}
