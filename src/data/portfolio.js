import angularIcon from '../assets/angular.svg'
import javaIcon from '../assets/java.svg'
import mongoIcon from '../assets/mongo.svg'
import postgresqlIcon from '../assets/postgre12.svg'
import pythonIcon from '../assets/python.svg'
import reactIcon from '../assets/ireact.svg'
import springIcon from '../assets/sprint.svg'
import projectImage from '../assets/venta.jpg'

export const profile = {
  name: 'Juan de la Cruz Huamani',
  role: 'Desarrollador Full Stack',
  description: 'Construyo aplicaciones web sólidas, rápidas y fáciles de usar, conectando interfaces cuidadas con arquitecturas backend escalables.',
  linkedin: 'https://www.linkedin.com/in/juan-de-la-cruz-huamani-b50649186/',
  facebook: 'https://www.facebook.com/juandelacruz.ncy?locale=es_LA',
  cv: 'https://drive.google.com/file/d/1gvwX0cVSg4HZ5VuRqDBuXV8j3Vz15sQs/view?usp=sharing',
}

export const navigation = [
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Tecnologías', href: '#tecnologias' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
]

export const experience = [
  {
    period: '2020 — 2021',
    company: 'Edsin Cloud E.I.R.L.',
    role: 'Desarrollador Full Stack',
    description: 'Participé en el desarrollo de soluciones web, integrando interfaces, lógica de negocio y persistencia de datos dentro de un flujo de trabajo colaborativo.',
    technologies: ['Java', 'Spring', 'React', 'PostgreSQL'],
  },
]

export const skills = [
  { name: 'Java', icon: javaIcon, category: 'Backend' },
  { name: 'Spring', icon: springIcon, category: 'Backend' },
  { name: 'Python', icon: pythonIcon, category: 'Backend' },
  { name: 'React', icon: reactIcon, category: 'Frontend' },
  { name: 'Angular', icon: angularIcon, category: 'Frontend' },
  { name: 'PostgreSQL', icon: postgresqlIcon, category: 'Datos' },
  { name: 'MongoDB', icon: mongoIcon, category: 'Datos' },
]

export const projects = [
  {
    title: 'Sistema de venta de pasajes turísticos',
    description: 'Aplicación para gestionar la venta y administración de pasajes turísticos desde una experiencia web centralizada.',
    image: projectImage,
    technologies: ['Java', 'Spring', 'React', 'PostgreSQL'],
  },
]
