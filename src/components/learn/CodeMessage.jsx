import { useEffect, useRef, useState } from 'react'
import { explainError } from '../../lib/runners/explain'
import { loadingMessage, runCode } from '../../lib/runners'
import { PlayIcon } from '../ui/Icons'

const EXAMPLE_DELAY_MS = 600

export function CodeMessage({ language, runnable, sender, senderClass, code, output, note, outputLabel, stdin, setup, files, mainFile, driver, middleware, exercise = false }) {
  const [value, setValue] = useState(code)
  const [inputText, setInputText] = useState((stdin ?? []).join('\n'))
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const mountedRef = useRef(true)
  const isEdited = value !== code
  const isBusy = status === 'loading' || status === 'running'

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  const update = (setter) => (next) => {
    if (mountedRef.current) setter(next)
  }

  const run = async () => {
    setStatus('running')

    if (!runnable) {
      await new Promise((resolve) => setTimeout(resolve, EXAMPLE_DELAY_MS))
      update(setResult)({ stdout: output, isExample: true })
      update(setStatus)('done')
      return
    }

    const response = await runCode(language, {
      code: value,
      stdin: exercise ? inputText.split(/\r?\n/) : stdin,
      setup,
      files,
      mainFile,
      driver,
      middleware,
    }, update(setStatus))
    // Si no se pudo descargar el intérprete, el código original aún puede mostrar su salida conocida
    const next = response.error?.type === 'LoadError' && !isEdited
      ? { stdout: output, isExample: true, notes: ['No se pudo descargar el intérprete; se muestra la salida esperada.'] }
      : response
    update(setResult)(next)
    update(setStatus)('done')
  }

  const onKeyDown = (event) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey) && !isBusy) {
      event.preventDefault()
      run()
    }
  }

  return (
    <>
      <div className="wa-bubble wa-bubble-in wa-bubble-code">
        <span className="wa-code-header">
          <span className={`wa-sender ${senderClass}`}>{sender}</span>
          {runnable && !isEdited && <span className="wa-code-hint">Puedes editar el código</span>}
          {isEdited && (
            <button className="wa-code-reset" type="button" onClick={() => setValue(code)}>
              Restaurar original
            </button>
          )}
        </span>
        {files && Object.entries(files).map(([name, content]) => (
          <div className="wa-file" key={name}>
            <span className="wa-file-name">{name}</span>
            {content.trim()
              ? <pre className="wa-code"><code>{content}</code></pre>
              : <span className="wa-file-empty">(archivo vacío: solo indica que la carpeta es un paquete)</span>}
          </div>
        ))}
        {(files || mainFile) && <span className="wa-file-name">{mainFile ?? 'Programa principal'}{runnable ? ' · editable' : ''}</span>}
        {exercise && runnable && stdin && (
          <label className="wa-exercise-input">
            <span>Datos de entrada (uno por línea)</span>
            <textarea
              className="wa-code wa-input-editor"
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
              rows={Math.max(1, inputText.split('\n').length)}
              spellCheck={false}
              aria-label={`Datos de entrada para ${sender}`}
            />
          </label>
        )}
        {runnable ? (
          <textarea
            className="wa-code wa-editor"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            rows={value.split('\n').length}
            wrap="off"
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            aria-label={`Código de ${sender}. Ctrl + Enter para ejecutar`}
          />
        ) : (
          <pre className="wa-code"><code>{code}</code></pre>
        )}
        {driver && (
          <div className="wa-file">
            <span className="wa-file-name">probar.py · lo que se ejecuta</span>
            <pre className="wa-code"><code>{driver}</code></pre>
          </div>
        )}
        {(runnable || output) && (
          <button className="wa-run" type="button" onClick={run} disabled={isBusy}>
            <PlayIcon /> {status === 'done' ? 'Ejecutar de nuevo' : 'Ejecutar'}
          </button>
        )}
      </div>

      <div className="wa-live" aria-live="polite">
        {isBusy && (
          <div className="wa-bubble wa-bubble-in wa-typing-wrap" role="status">
            <span className="wa-typing" aria-hidden="true"><span /><span /><span /></span>
            <span className="wa-typing-text">
              {status === 'loading' ? loadingMessage(language) : `${sender} está escribiendo…`}
            </span>
          </div>
        )}
        {status === 'done' && result && (
          <RunResult
            result={result}
            language={language}
            sender={sender}
            senderClass={senderClass}
            note={note}
            outputLabel={result.isExample ? `${outputLabel} de ejemplo` : outputLabel}
          />
        )}
      </div>
    </>
  )
}

function RunResult({ result, language, sender, senderClass, note, outputLabel }) {
  const { screen, notes = [], warnings = [], error } = result
  const stdout = result.stdout?.replace(/\n+$/, '')
  const hasOutput = Boolean(stdout || screen)

  return (
    <div className="wa-bubble wa-bubble-in wa-bubble-output">
      <span className={`wa-sender ${senderClass}`}>{sender} · {outputLabel}</span>
      {note && <span className="wa-output-note">{note}</span>}
      {notes.map((text) => <span className="wa-output-note" key={text}>{text}</span>)}
      {stdout && (
        <>
          {screen && <span className="wa-output-section">Consola</span>}
          <pre><code>{stdout}</code></pre>
        </>
      )}
      {screen && (
        <>
          <span className="wa-output-section">Pantalla</span>
          <pre className="wa-screen"><code>{screen}</code></pre>
        </>
      )}
      {!hasOutput && !error && <pre className="wa-output-empty"><code>(Terminó sin mostrar nada)</code></pre>}
      {warnings.map((warning) => (
        <ErrorBox key={`${warning.line}-${warning.message}`} kind="warning" error={warning} language={language} />
      ))}
      {error && <ErrorBox kind="error" error={error} language={language} />}
    </div>
  )
}

function ErrorBox({ kind, error, language }) {
  const title = kind === 'error' ? 'Error' : 'Advertencia'
  return (
    <div className={`wa-error wa-error-${kind}`}>
      <strong>{title}{error.line ? ` en la línea ${error.line}` : ''}</strong>
      <pre><code>{error.details ?? error.message}</code></pre>
      {error.hint && <p className="wa-error-hint">Pista: {error.hint}</p>}
      <p className="wa-error-why"><b>¿Por qué?</b> {explainError(language, error)}</p>
    </div>
  )
}
