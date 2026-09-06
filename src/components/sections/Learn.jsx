import { useState } from 'react'
import { languageComparison, learningPath } from '../../data/portfolio'
import { ArrowIcon, CheckIcon } from '../ui/Icons'
import { SectionHeading } from '../ui/SectionHeading'

const LANGUAGE_LABELS = { python: 'Python', php: 'PHP', java: 'Java' }

export function Learn() {
  const [openLevel, setOpenLevel] = useState(learningPath[0]?.level)
  const [showComparison, setShowComparison] = useState(false)

  return (
    <section className="section" id="aprende">
      <div className="container">
        <SectionHeading
          eyebrow="05 / Aprende a programar"
          title="Un camino claro para empezar a programar."
          description="Una ruta gratuita, pensada para quienes recién comienzan: desde los primeros conceptos hasta tus primeros proyectos propios."
        />
        <div className="learn-path">
          {learningPath.map((level) => {
            const isOpen = level.level === openLevel
            return (
              <div className={isOpen ? 'learn-level learn-level-open' : 'learn-level'} key={level.level}>
                <button
                  className="learn-level-header"
                  type="button"
                  onClick={() => setOpenLevel(isOpen ? null : level.level)}
                  aria-expanded={isOpen}
                >
                  <span className="learn-level-number">{level.level}</span>
                  <span className="learn-level-heading">
                    <span className="learn-level-label">Nivel {level.level}</span>
                    <span className="learn-level-title">{level.title}</span>
                  </span>
                  <span className="learn-level-count">{level.topics.length} temas</span>
                  <ArrowIcon />
                </button>
                {isOpen && (
                  <div className="topic-compare-list">
                    {level.topics.map((topic) => (
                      <div className="topic-compare" key={topic.title}>
                        <h5 className="topic-compare-title"><CheckIcon /> {topic.title}</h5>
                        <div className="topic-compare-grid">
                          {['python', 'php', 'java'].map((lang) => (
                            <div className="topic-compare-col" key={lang}>
                              <span className="topic-compare-lang">{LANGUAGE_LABELS[lang]}</span>
                              {topic.code ? (
                                <pre className="topic-compare-code"><code>{topic[lang]}</code></pre>
                              ) : (
                                <p className="topic-compare-text">{topic[lang]}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          <div className={showComparison ? 'learn-level learn-level-open' : 'learn-level'}>
            <button
              className="learn-level-header"
              type="button"
              onClick={() => setShowComparison((value) => !value)}
              aria-expanded={showComparison}
            >
              <span className="learn-level-number learn-level-number-compact">VS</span>
              <span className="learn-level-heading">
                <span className="learn-level-label">Comparativa</span>
                <span className="learn-level-title">PHP, Python o Java: ¿cuál conviene usar?</span>
              </span>
              <span className="learn-level-count">{languageComparison.rows.length} criterios</span>
              <ArrowIcon />
            </button>
            {showComparison && (
              <div className="lang-compare">
                <p className="lang-compare-intro">
                  Los tres son lenguajes muy usados en el mundo real, pero cada uno brilla en escenarios distintos.
                  Esta comparación se basa en proyectos reales que he construido con cada uno.
                </p>
                <p className="lang-compare-scroll-hint">Desliza para ver la comparación completa →</p>
                <div className="lang-compare-table-wrap">
                  <table className="lang-compare-table">
                    <thead>
                      <tr>
                        <th scope="col">Criterio</th>
                        {languageComparison.languages.map((language) => (
                          <th scope="col" key={language}>{language}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {languageComparison.rows.map((row) => (
                        <tr key={row.label}>
                          <th scope="row">{row.label}</th>
                          {row.values.map((value, index) => (
                            <td key={languageComparison.languages[index]}>{value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
