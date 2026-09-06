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
server/                     # Backend del chat (proxy a Ollama)
```

Para modificar textos, enlaces, experiencia, tecnologías o proyectos, edita `src/data/portfolio.js`. El chat usa automáticamente esos mismos datos como contexto, así que se mantiene actualizado sin tocar nada más.

## Chat con IA (Ollama)

El widget de chat (botón flotante) llama a un pequeño backend en `server/` que guarda la clave de Ollama de forma segura — **la clave nunca debe ponerse en el código del frontend**, porque quedaría visible para cualquiera que inspeccione la página.

### Ejecutar en local

```bash
# Terminal 1: backend del chat
cd server
npm install
cp .env.example .env   # y pega tu OLLAMA_API_KEY real ahí
npm start              # queda escuchando en http://localhost:8787

# Terminal 2: frontend
npm run dev
```

Por defecto el frontend llama a `http://localhost:8787/api/chat`. Para apuntar a otra URL, crea un `.env` en la raíz con:

```
VITE_CHAT_API_URL=https://tu-backend-desplegado.onrender.com/api/chat
```

### Desplegar el backend

1. Sube el repo a GitHub (el archivo `server/.env` nunca se sube, está en `.gitignore`).
2. En Render (u otro proveedor): crea un **Web Service** con *root directory* `server`, build command `npm install` y start command `npm start`.
3. En las variables de entorno del servicio, agrega `OLLAMA_API_KEY` con tu clave (generada en [ollama.com/settings/keys](https://ollama.com/settings/keys)) y opcionalmente `ALLOWED_ORIGIN` con el dominio del portafolio.
4. Toma la URL pública del servicio y configúrala como `VITE_CHAT_API_URL` (con `/api/chat` al final) en las variables de entorno donde despliegues el frontend, luego vuelve a compilar (`npm run build`).

> ⚠️ **Importante:** si tu clave de Ollama ya fue compartida en un chat, correo o repositorio público, regenérala en ollama.com/settings/keys y actualiza el valor en tu `.env` y en el proveedor donde despliegues el backend. Nunca subas archivos `.env` a git.
