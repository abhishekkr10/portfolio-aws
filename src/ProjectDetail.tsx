import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { projects } from './data/projects'
import manifest from './data/proof-manifest.json'
import './project-detail.css'

export function ProjectDetail({slug,onClose}:{slug:string;onClose:()=>void}) {
 const ref=useRef<HTMLDialogElement>(null)
 const [image,setImage]=useState<number|null>(null)
 const p=projects.find(p=>p.slug===slug)!
 const media=manifest[slug as keyof typeof manifest]
 const screenshots=media.filter(m=>!m.video)
 const recordings=media.filter(m=>m.video)
 const [active,setActive]=useState(screenshots[0]?.url ?? recordings[0]?.url ?? '')
 const [failed,setFailed]=useState(false)
 const [copied,setCopied]=useState(false)
 const selected=media.find(m=>m.url===active)
 useEffect(()=>{const previous=document.activeElement as HTMLElement;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';ref.current?.showModal();return()=>{document.body.style.overflow=overflow;previous?.focus()}},[])
 const choose=(url:string)=>{setFailed(false);setActive(url)}
 return <dialog className="project-dossier" ref={ref} onKeyDown={trapFocus} onCancel={()=>onClose()} aria-label={`${p.name} case study and proof`}>
 <button className="dossier-close" onClick={onClose}>× <span>Close</span></button>
 <div className="dossier-content">
 <header className="dossier-header"><span className="dossier-eyebrow">{p.caseStudy.kicker} / Case study</span><span className="dossier-number" aria-hidden="true">0{projects.indexOf(p)+1}</span><h2>{p.name}</h2><p>{p.summary}</p><div className="dossier-actions"><span className="dossier-status"><i/>{p.status}</span>{p.repoUrl&&<a href={p.repoUrl} target="_blank" rel="noreferrer">Source repository ↗</a>}<a href="#dossier-proof" onClick={e=>{e.preventDefault();ref.current?.querySelector('#dossier-proof')?.scrollIntoView({behavior:'instant',block:'start'})}}>Explore evidence ↓</a></div></header>
 <div className="dossier-flow">{p.caseStudy.stages.map((stage,i)=><div key={stage}><span>0{i+1}</span><i/><b>{stage}</b></div>)}</div>
 <div className="dossier-notes"><section><h3>System notes</h3>{p.caseStudy.notes.map(note=><p key={note}>{note}</p>)}{p.metrics.map(m=><p key={m}>{m}</p>)}<p>{p.limitation}</p></section><section><h3>Technical stack</h3><div className="dossier-tags">{p.tags.map(tag=><span key={tag}>{tag}</span>)}</div></section></div>
 {media.length>0&&<section className="dossier-evidence" id="dossier-proof"><div className="dossier-section-heading"><div><span className="dossier-eyebrow">Evidence archive</span><h3>{slug==='aeronode'?'Project documentation':'Inside the build'}</h3></div><span>{screenshots.length} {slug==='aeronode'?'document preview':'screenshots'} · {recordings.length} {recordings.length===1?"recording":"recordings"}</span></div><p className="dossier-muted">{slug==='aeronode'?'Preview of the supplied testing guide. This is documentation, not a recorded test result.':'Screenshots and recorded demonstrations from the project. Select a thumbnail to explore; enlarge any screenshot for a closer look.'}</p>
 <figure className="dossier-viewer"><div className="dossier-viewer-bar"><span>{slug==='aeronode'?'DOCUMENT':selected?.video?'RECORDED / VIDEO':'RECORDED / SCREENSHOT'}</span>{selected&&!selected.video&&<button onClick={()=>setImage(screenshots.findIndex(m=>m.url===active))}>Enlarge ↗</button>}</div><div className="dossier-media">{failed?<div className="dossier-error"><p>This file could not load.</p><button onClick={()=>setFailed(false)}>Retry</button><a href={active} target="_blank" rel="noreferrer">Open original ↗</a></div>:selected?.video?<video key={active} src={active} poster={screenshots[0]?.url} controls muted playsInline preload="none" onError={()=>setFailed(true)} aria-label={selected.caption}/>:selected&&<button className="dossier-image-button" onClick={()=>setImage(screenshots.findIndex(m=>m.url===active))} aria-label={`Enlarge ${selected.caption}`}><img key={active} src={active} alt={selected.caption} onError={()=>setFailed(true)}/></button>}</div><figcaption>{selected?.caption}</figcaption></figure>
 {recordings.length>0&&<div className="dossier-recordings">{recordings.map(m=><button className={active===m.url?'selected':''} aria-pressed={active===m.url} key={m.url} onClick={()=>choose(m.url)}><span className="play-symbol">▷</span><span><b>Watch recorded demonstration</b><small>{m.caption}</small></span><span>MP4</span></button>)}</div>}
 <div className="dossier-thumbnails" aria-label="Project screenshots">{screenshots.map((m,i)=><button key={m.url} className={active===m.url?'selected':''} aria-pressed={active===m.url} onClick={()=>choose(m.url)} aria-label={`View ${m.caption}`}><img src={m.url} alt="" loading="lazy"/><span>{String(i+1).padStart(2,'0')} / {m.caption}</span></button>)}</div>
 {slug==='aeronode'&&<a className="dossier-document" href="/proof/aeronode/AeroNode_Autonomous_Testing_Guide.pdf" target="_blank" rel="noreferrer">Read the complete testing guide · PDF ↗</a>}
 </section>}
 <section className="dossier-code"><div className="dossier-section-heading"><div><span className="dossier-eyebrow">Implementation</span><h3>Key code</h3></div><button onClick={async()=>{try{await navigator.clipboard.writeText(p.snippets[0].code);setCopied(true)}catch{setCopied(false)}}}>{copied?'Copied ✓':'Copy code'}</button></div><div className="dossier-code-bar"><span>{p.snippets[0].path}</span>{p.repoUrl&&<a href={p.snippets[0].url} target="_blank" rel="noreferrer">View pinned source ↗</a>}</div><pre tabIndex={0}><code>{p.snippets[0].code}</code></pre><span role="status" className="sr-only">{copied?'Code copied':''}</span></section>
 <footer className="dossier-footer"><span>{p.name} / Engineering portfolio</span><button onClick={onClose}>Back to selected work ↗</button></footer>
 </div>
 {image!==null&&<ImageLightbox media={screenshots} index={image} onChange={setImage} onClose={()=>setImage(null)}/>}
 </dialog>
}
function ImageLightbox({media,index,onChange,onClose}:{media:{url:string;caption:string}[];index:number;onChange:(i:number)=>void;onClose:()=>void}){
 const ref=useRef<HTMLDialogElement>(null)
 useEffect(()=>{const previous=document.activeElement as HTMLElement;ref.current?.showModal();return()=>previous?.focus()},[])
 return <dialog className="proof-lightbox" ref={ref} aria-label="Enlarged recorded proof" onCancel={e=>{e.stopPropagation();onClose()}} onKeyDown={e=>{trapFocus(e);if(e.key==='ArrowRight')onChange((index+1)%media.length);if(e.key==='ArrowLeft')onChange((index-1+media.length)%media.length)}}><div className="lightbox-toolbar"><span>{index+1} / {media.length}</span><button onClick={onClose}>Close enlarged image ×</button></div><img src={media[index].url} alt={media[index].caption}/><div className="lightbox-toolbar"><button onClick={()=>onChange((index-1+media.length)%media.length)}>← Previous</button><p>{media[index].caption}</p><button onClick={()=>onChange((index+1)%media.length)}>Next →</button></div></dialog>
}
function trapFocus(event:KeyboardEvent<HTMLDialogElement>){if(event.key!=='Tab')return;event.stopPropagation();const elements=Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button,a[href],video[controls],input,[tabindex="0"]')).filter(el=>el.getClientRects().length&&!el.closest('dialog:not([open])'));const first=elements[0],last=elements[elements.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus()}}

