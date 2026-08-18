import { projects } from '../../data/portfolio'
import { ArrowIcon } from '../ui/Icons'
import { SectionHeading } from '../ui/SectionHeading'

export function Projects() {
  return (
    <section className="section" id="proyectos">
      <div className="container">
        <SectionHeading eyebrow="04 / Proyectos" title="Soluciones pensadas para usarse." description="Una selección de trabajos donde aplico producto, diseño e ingeniería." />
        <div className="projects-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <div className="project-image"><img src={project.image} alt={`Vista previa de ${project.title}`} /></div>
              <div className="project-content">
                <span className="project-number">Proyecto 0{index + 1}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="tag-list">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                <a href="#contacto" className="text-link">Solicitar información <ArrowIcon /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
