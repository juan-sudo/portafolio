# Portafolio de Juan de la Cruz

Portafolio profesional desarrollado con React, Vite y CSS responsive.

## Desarrollo local

```bash
npm install
npm run dev
```

## Comandos

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la versión de producción.
- `npm run lint`: ejecuta el análisis estático.
- `npm run preview`: previsualiza la compilación.

## Arquitectura

```text
src/
├── assets/                 # Imágenes e iconos
├── components/
│   ├── layout/             # Estructura global
│   ├── sections/           # Secciones de la página
│   └── ui/                 # Componentes reutilizables (incluye el chat)
├── data/portfolio.js       # Contenido del portafolio
├── hooks/useTheme.js       # Lógica de tema
├── App.jsx                 # Composición de la aplicación
└── index.css               # Estilos base
server/                     # Backend del chat (proxy de IA)
```

Para modificar textos, enlaces, experiencia, tecnologías o proyectos, edita `src/data/portfolio.js`. El chat usa automáticamente esos mismos datos como contexto, así que se mantiene actualizado sin tocar nada más.

## Chat con IA

El widget de chat y el asistente de aprendizaje llaman al backend de `server/`. El widget usa Ollama; las preguntas que no coinciden con una lección del chat de aprendizaje se envían a Groq, que responde como tutor usando el contexto del módulo. Las claves permanecen en el backend — **nunca las pongas en el frontend**, porque quedarían visibles para cualquiera que inspeccione la página.

### Ejecutar en local

```bash
# Terminal 1: backend del chat
cd server
npm install
cp .env.example .env   # configura las claves que vayas a utilizar
npm start              # queda escuchando en http://localhost:8787

# Terminal 2: frontend
npm run dev
```

Configura `GROQ_API_KEY` en `server/.env` con una clave válida de Groq para habilitar el tutor IA. Por defecto usa `openai/gpt-oss-120b`; puedes cambiarlo con `GROQ_MODEL`. El portafolio llama a `http://localhost:8787/api/chat` y el aprendizaje a `http://localhost:8787/api/learn-chat` (tutor) y `http://localhost:8787/api/learn-exam` (exámenes generados por IA según el nivel; si el servidor no responde se usan preguntas locales de respaldo).

El módulo de Tailwind CSS cubre Tailwind 2.2 desde la instalación hasta un proyecto responsive, configuración, JIT y optimización; termina con un examen final generado por IA.

El módulo de Next.js cubre App Router desde la instalación hasta Server Components, datos, mutaciones, seguridad, rendimiento y despliegue; incluye un proyecto full-stack y examen final con IA.

El módulo de JavaScript cubre el lenguaje desde sus fundamentos hasta asincronía, objetos avanzados, módulos, seguridad y rendimiento; incluye un proyecto integrador y examen final con IA.

El módulo de TypeScript cubre el sistema de tipos desde los fundamentos hasta narrowing, genéricos, módulos, configuración estricta e integración con aplicaciones; incluye un proyecto integrador y examen final con IA, basado en la documentación oficial.

El módulo de Git y GitHub cubre control de versiones, ramas, remotos, pull requests, Actions, seguridad y flujos avanzados; incluye un proyecto integrador y examen final con IA basado en la documentación oficial.

El módulo de Docker cubre imágenes, contenedores, Dockerfile, volúmenes, redes, Compose, CI, seguridad y despliegue; incluye un proyecto integrador y examen final con IA basado en la documentación oficial.

Para apuntar el widget de portafolio a otra URL, crea un `.env` en la raíz con:

```
VITE_CHAT_API_URL=https://tu-backend-desplegado.onrender.com/api/chat
```

### Desplegar el backend

1. Sube el repo a GitHub (el archivo `server/.env` nunca se sube, está en `.gitignore`).
2. En Render (u otro proveedor): crea un **Web Service** con *root directory* `server`, build command `npm install` y start command `npm start`.
3. En las variables de entorno del servicio, agrega `GROQ_API_KEY` con tu clave (generada en [console.groq.com/keys](https://console.groq.com/keys)); configura `OLLAMA_API_KEY` si también quieres habilitar el widget del portafolio. Agrega `ALLOWED_ORIGIN` con el dominio del portafolio.
4. Configura `VITE_CHAT_API_URL` con la URL del backend más `/api/chat`, y `VITE_LEARN_CHAT_API_URL` con la URL del backend más `/api/learn-chat` en el despliegue del frontend. Luego vuelve a compilar (`npm run build`).

> ⚠️ **Importante:** si tu clave de Ollama ya fue compartida en un chat, correo o repositorio público, regenérala en ollama.com/settings/keys y actualiza el valor en tu `.env` y en el proveedor donde despliegues el backend. Nunca subas archivos `.env` a git.
