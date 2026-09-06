import { useState } from 'react'
import { profile, projects } from '../../data/portfolio'
import { ArrowIcon, CheckIcon, WhatsAppIcon } from '../ui/Icons'
import { SectionHeading } from '../ui/SectionHeading'
import { Modal } from '../ui/Modal'

function whatsappLink(project, plan) {
  const message = `Hola Juan, estoy interesado en el plan ${plan.name} (${plan.price}) para "${project.title}". ¿Podemos coordinar?`
  return `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(message)}`
}

export function Projects() {
  const [activeProject, setActiveProject] = useState(null)

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
                {project.modules && (
                  <ul className="module-list">
                    {project.modules.map((module) => (
                      <li key={module}><CheckIcon /> {module}</li>
                    ))}
                  </ul>
                )}
                <div className="project-actions">
                  {project.link && (
                    <a href={project.link} className="text-link" target="_blank" rel="noopener noreferrer">
                      Ver proyecto <ArrowIcon />
                    </a>
                  )}
                  {project.plans && (
                    <button className="text-link" type="button" onClick={() => setActiveProject(project)}>
                      Ver planes <ArrowIcon />
                    </button>
                  )}
                  <a href="#contacto" className="text-link text-link-muted">Solicitar acceso <ArrowIcon /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeProject && (
        <Modal
          title={`Planes de implementación`}
          description={activeProject.title}
          onClose={() => setActiveProject(null)}
        >
          <div className="plans-grid">
            {activeProject.plans.map((plan) => (
              <div className={plan.highlighted ? 'plan-card plan-card-highlighted' : 'plan-card'} key={plan.name}>
                {plan.highlighted && <span className="plan-badge">Recomendado</span>}
                <div className="plan-heading">
                  <h4>{plan.name}</h4>
                  {plan.price && <p className="plan-price">{plan.price}<span>/proyecto</span></p>}
                </div>
                <ul className="module-list">
                  {plan.features.map((feature) => (
                    <li key={feature}><CheckIcon /> {feature}</li>
                  ))}
                </ul>
                <a className="plan-cta" href={whatsappLink(activeProject, plan)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> Contratar por WhatsApp
                </a>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </section>
  )
}
