import angularIcon from '../assets/angular.svg'
import javaIcon from '../assets/java.svg'
import mongoIcon from '../assets/mongo.svg'
import postgresqlIcon from '../assets/postgre12.svg'
import pythonIcon from '../assets/python.svg'
import reactIcon from '../assets/ireact.svg'
import springIcon from '../assets/sprint.svg'
import projectImage from '../assets/venta.jpg'
import projectImage1 from '../assets/sisgat.jpg'
import projectImage2 from '../assets/colegio.jpg'

export const profile = {
  name: 'Juan de la Cruz Huamani',
  role: 'Desarrollador Full Stack',
  description: 'Construyo aplicaciones web sólidas, rápidas y fáciles de usar, conectando interfaces cuidadas con arquitecturas backend escalables.',
  linkedin: 'https://www.linkedin.com/in/juan-de-la-cruz-huamani-b50649186/',
  facebook: 'https://www.facebook.com/juandelacruz.ncy?locale=es_LA',
  cv: 'https://drive.google.com/file/d/17aZ9GqQtS5wYPqSpMKcmbEKh0RxaB_m3/view?usp=sharing',
  whatsapp: '51955196507',
}

export const navigation = [
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Tecnologías', href: '#tecnologias' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Aprende', href: '#/aprende' },
  { label: 'Contacto', href: '#contacto' },
]

export const experience = [
  {
    period: 'Mar. 2025 — Jun. 2026',
    company: 'Municipalidad Provincial de Lucanas Puquio',
    role: 'Desarrollador y Soporte de Sistemas',
    description: 'Soporte técnico y funcional del Sistema de Recaudación Municipal (SRM). Actualización e implementación de módulos, además del desarrollo y mantenimiento de funcionalidades.',
    technologies: ['PHP', 'Bootstrap', 'SRM', 'Soporte técnico'],
  },
  {
    period: 'Abr. 2024 — Sept. 2024',
    company: 'Krodam S.A.C.',
    role: 'Desarrollador Backend',
    description: 'Desarrollo del módulo de Gestión de Kardex bajo una arquitectura de microservicios, incluyendo su contenerización y gestión de tareas del proyecto.',
    technologies: ['Java 17', 'Spring Boot 3', 'MongoDB', 'Docker', 'Jira', 'Microservicios'],
  },
  {
    period: 'Jul. 2023 — Feb. 2024',
    company: 'Consorcio Gremcosur S.A.C.',
    role: 'Desarrollador Backend',
    description: 'Desarrollo del módulo de gestión de tienda para una plataforma marketplace, aplicando arquitectura hexagonal y controlando el flujo de tareas mediante GitHub.',
    technologies: ['Java 17', 'Spring Boot 3', 'PostgreSQL 14', 'GitHub', 'Arquitectura hexagonal'],
  },
  {
    period: 'Mar. 2022 — Abr. 2023',
    company: 'EdsinCloud E.I.R.L.',
    role: 'Desarrollador Full Stack',
    description: 'Desarrollo e implementación de una aplicación web y despliegue en servidores de la universidad mediante Debian y Docker. Implementación de interfaces con Pipes, interceptores y Guards, además del uso de librerías como SweetAlert2 y Bootstrap.',
    technologies: ['Java 8', 'Spring Boot', 'JPA', 'Angular 8', 'PostgreSQL', 'Docker', 'Debian'],
  },
  {
    period: 'Feb. 2020 — Nov. 2020',
    company: 'Digital Corp Perú S.A.C.',
    role: 'Soporte de Tecnología',
    description: 'Participación en una empresa peruana dedicada a brindar servicios y soluciones de tecnología, ingeniería y medio ambiente, comprometida con la entrega de resultados de alto nivel.',
    technologies: ['Tecnología', 'Soporte técnico', 'Ingeniería'],
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
    modules: ['Gestión de pasajes', 'Gestión de clientes', 'Gestión de rutas', 'Reportes de ventas'],
    plans: [
      { name: 'Básico', price: 'S/ 800', features: ['Catálogo de pasajes', 'Venta y facturación simple', 'Reportes básicos'] },
      { name: 'Estándar', price: 'S/ 1,500', highlighted: true, features: ['Todo lo del plan Básico', 'Gestión de clientes', 'Gestión de rutas', 'Reportes avanzados'] },
      { name: 'Premium', price: 'S/ 2,500', features: ['Todo lo del plan Estándar', 'Multi-sucursal', 'Integración de pagos online', 'Soporte prioritario'] },
    ],
    link:'',
  },
  {
    title: 'Sistema Integrado de Gestión de Administrativa (SISGAT)',
    description: 'Sistema para cobranza de impuestos, arbitrio municipal, cobranza de proveidos y gestion de cobranza de agua',
    image: projectImage1,
    technologies: ['Python', 'Django', 'React next', 'PostgreSQL', 'Docker'],
    modules: ['Cobranza de impuestos', 'Arbitrio municipal', 'Cobranza de proveídos', 'Gestión de cobranza de agua'],
    plans: [
      { name: 'Básico', price: 'S/ 1,200', features: ['Cobranza de impuestos', 'Registro de contribuyentes', 'Reportes básicos'] },
      { name: 'Estándar', price: 'S/ 2,200', highlighted: true, features: ['Todo lo del plan Básico', 'Arbitrio municipal', 'Cobranza de proveídos', 'Dashboard de recaudación'] },
      { name: 'Premium', price: 'S/ 3,500', features: ['Todo lo del plan Estándar', 'Gestión de cobranza de agua', 'Alertas y notificaciones', 'Soporte prioritario'] },
    ],
     link:'https://sisgat-frontend.onrender.com/login',
  },
  {
    title: 'Sistema Gestion de colegio',
    description: 'Sistema para gestionar la administración de un colegio, incluyendo la gestión de estudiantes, profesores y cursos.',
    image: projectImage2,
    technologies: ['Php', 'Laravel', 'Vue', 'PostgreSQL', 'Docker'],
    modules: ['Gestión de estudiantes', 'Gestión de profesores', 'Gestión de cursos', 'Gestión de matrículas'],
    plans: [
      { name: 'Básico', price: 'S/ 1,500', features: ['Inicio', 'Estudiantes', 'Cursos', 'Asistencia', 'Notas', 'Horarios', ] },
      { name: 'Estándar', price: 'S/ 2,800', highlighted: true, features: ['Todo lo del plan Básico','Reporte ', 'Mensaje de Asistencia '] },
      { name: 'Premium', price: 'S/ 4,500', features: ['Todo lo del plan Estándar', 'Contabilidad', 'Soporte prioritario','Varios sede' ] }
    ],
     link:'https://colegio-sistema-produccion.onrender.com/login',
  }


]
