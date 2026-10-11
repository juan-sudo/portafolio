// Ruta de aprendizaje de React. Combina la documentación oficial (https://react.dev/learn y su referencia de la API)
// con el temario del curso «React.JS, Guía desde 0» de Udemy.
// Los ejemplos muestran código real de React como referencia; no se ejecutan en el navegador.

import { reactDocsLevels } from './reactDocs'
import { reactReferenceLevels } from './reactReference'
import { reactCourseLevels } from './reactCourse'

const reactComparison = {
  title: 'React, Angular o Vue: ¿cuál conviene usar?',
  languages: ['React', 'Angular', 'Vue'],
  rows: [
    { label: 'Qué es', values: ['Librería para construir interfaces; el resto se elige aparte', 'Plataforma completa: framework, router, formularios, HTTP y CLI', 'Framework progresivo con router y estado oficiales opcionales'] },
    { label: 'Lenguaje', values: ['JavaScript o TypeScript con JSX', 'TypeScript', 'JavaScript o TypeScript con plantillas HTML'] },
    { label: 'Plantillas', values: ['JSX: marcado escrito dentro de JavaScript', 'HTML con sintaxis propia: {{ }}, [prop], (evento), @if, @for', 'HTML con directivas: v-if, v-for, v-model'] },
    { label: 'Estado', values: ['useState y useReducer; global con Context, Zustand o Redux', 'Signals y servicios con inyección de dependencias', 'ref y reactive; global con Pinia'] },
    { label: 'Enrutamiento', values: ['React Router o el del framework (Next.js)', 'Angular Router, incluido', 'Vue Router, oficial'] },
    { label: 'Curva de aprendizaje', values: ['Media: pocos conceptos, muchas decisiones', 'Alta: muchos conceptos desde el inicio', 'Baja a media'] },
    { label: 'Cuándo elegirlo', values: ['Interfaces flexibles, ecosistema enorme y salto a móvil con React Native', 'Aplicaciones grandes y equipos que quieren una estructura única', 'Proyectos pequeños o medianos y adopción gradual'] },
  ],
}

// Primero la documentación oficial y luego los temas del curso
const reactLevels = [...reactDocsLevels, ...reactReferenceLevels, ...reactCourseLevels]
  .map((level, index) => ({ ...level, level: index }))

export const reactModule = {
  id: 'react',
  label: 'React',
  subtitle: 'Librería de JavaScript para interfaces · React 19',
  title: 'Construye interfaces con componentes y React.',
  description: 'Aprende React desde el primer componente hasta el nivel profesional. Los niveles 0 a 10 siguen la documentación oficial de react.dev (componentes, JSX, estado, efectos, Hooks, React 19 y TypeScript); los niveles 11 a 17 siguen el temario del curso «React.JS, Guía desde 0» (buscador local, React Router, Fetch y Axios, Context API, Zustand, Redux Toolkit y Tailwind CSS) y terminan con pruebas, rendimiento y despliegue. Los ejemplos muestran código de React como referencia: no se ejecutan en el navegador.',
  languages: [{ key: 'react', label: 'React' }],
  levels: reactLevels,
  outputLabel: 'Resultado de ejemplo',
  comparison: reactComparison,
}
