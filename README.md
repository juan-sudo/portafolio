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
│   └── ui/                 # Componentes reutilizables
├── data/portfolio.js       # Contenido del portafolio
├── hooks/useTheme.js       # Lógica de tema
├── App.jsx                 # Composición de la aplicación
└── index.css               # Estilos base
```

Para modificar textos, enlaces, experiencia, tecnologías o proyectos, edita `src/data/portfolio.js`.
