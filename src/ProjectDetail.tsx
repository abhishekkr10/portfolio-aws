import { useEffect, useRef, useState, type KeyboardEvent } from "react"

import { projects } from "./data/projects"

import manifest from "./data/proof-manifest.json"

export function ProjectDetail({
  slug,
  onClose,
}: {
  slug: string
  onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)

  const [image, setImage] = useState<string | null>(null)

  const p = projects.find((p) => p.slug === slug)!

  const media = manifest[(slug as keyof typeof manifest)]

  useEffect(() => {
    const previous = document.activeElement as HTMLElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    dialog.current?.showModal()
    return () => {
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [])

  return (
    <dialog
      ref={dialog}
      onKeyDown={trapFocus}
      aria-label={`${p.name} case study and proof`}
      onCancel={(e) => {
        if (image) {
          e.preventDefault()
          setImage(null)
        } else onClose()
      }}
    >
      <button onClick={onClose}>Close ×</button>
      <h2>{p.name}</h2>
      <p>{p.status}</p>
      <p>{p.summary}</p>
      <p>{p.limitation}</p>
      {p.metrics.map((m) => (
        <p key={m}>{m}</p>
      ))}
      {p.repoUrl ? (
        <a href={p.repoUrl}>Source repository ↗</a>
      ) : (
        <p>Repository private, available on request</p>
      )}
      {media.length > 0 && (
        <>
          <h3>Proof · RECORDED</h3>
          <div className="proof-grid">
            {media.map((m) => (
              <figure key={m.url}>
                {m.video ? (
                  <video
                    src={m.url}
                    controls
                    muted
                    playsInline
                    preload="none"
                    aria-label={m.caption}
                  />
                ) : (
                  <button
                    onClick={() => setImage(m.url)}
                    aria-label={`Enlarge ${m.caption}`}
                  >
                    <img src={m.url} alt={m.caption} loading="lazy" />
                  </button>
                )}
                <figcaption>RECORDED · {m.caption}</figcaption>
              </figure>
            ))}
          </div>
        </>
      )}
      {image && <ImageLightbox src={image} onClose={() => setImage(null)} />}
    </dialog>
  )
}

function ImageLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const previous = document.activeElement as HTMLElement
    ref.current?.showModal()
    return () => previous?.focus()
  }, [])

  return (
    <dialog
      ref={ref}
      onKeyDown={trapFocus}
      aria-label="Enlarged recorded proof"
      onCancel={(e) => {
        e.stopPropagation()
        onClose()
      }}
    >
      <button onClick={onClose}>Close enlarged image</button>
      <img
        src={src}
        alt="Enlarged recorded project proof"
        style={{ maxWidth: "100%", maxHeight: "70vh", objectFit: "contain" }}
      />
    </dialog>
  )
}


function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
 if(event.key !== 'Tab') return
 event.stopPropagation()
 const elements=Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button,a[href],video[controls],input,[tabindex="0"]')).filter(el=>el.getClientRects().length && !el.closest('dialog:not([open])'))
 const first=elements[0],last=elements[elements.length-1]
 if(event.shiftKey && document.activeElement===first){event.preventDefault();last?.focus()}
 else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first?.focus()}
}
