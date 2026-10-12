import { useEffect, useRef, useState } from 'react'

const COPIED_MS = 1500

// navigator.clipboard solo existe en contextos seguros (https o localhost)
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const field = document.createElement('textarea')
    field.value = text
    field.style.position = 'fixed'
    field.style.opacity = '0'
    document.body.appendChild(field)
    field.select()
    document.execCommand('copy')
    field.remove()
  }
}

export function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const copy = async () => {
    await copyText(text)
    setCopied(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), COPIED_MS)
  }

  return (
    <button className="wa-copy" type="button" onClick={copy} aria-label="Copiar el texto del mensaje">
      {copied ? 'Copiado ✓' : 'Copiar'}
    </button>
  )
}
