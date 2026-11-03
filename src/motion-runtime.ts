export function startMotion(){
 const cleanups:(()=>void)[]=[]
 const svg=document.querySelector<SVGSVGElement>('.section-circuit')!
 const paths=svg.querySelectorAll<SVGPathElement>('path')
 const sections=Array.from(document.querySelectorAll<HTMLElement>('#about,#capabilities,#work,#uart,#contact'))
 let length=0,frame=0
 const layout=()=>{const h=document.documentElement.scrollHeight;svg.setAttribute('viewBox',`0 0 50 ${h}`);svg.style.height=`${h}px`;let d='M16 120';sections.forEach((s,i)=>{const y=s.getBoundingClientRect().top+window.scrollY+35;d+=` V${y-24} L${i%2?30:8} ${y-12} V${y} H16`});paths.forEach(p=>p.setAttribute('d',d));length=paths[1].getTotalLength();paths[1].style.strokeDasharray=String(length);update()}
 const update=()=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;const max=document.documentElement.scrollHeight-window.innerHeight;paths[1].style.strokeDashoffset=String(length*(1-Math.min(1,window.scrollY/Math.max(1,max))));const active=sections.filter(s=>s.getBoundingClientRect().top<window.innerHeight*.4).at(-1);document.querySelectorAll<HTMLAnchorElement>('.desktop-nav a,.mobile-nav a').forEach(a=>{if(a.hash===`#${active?.id}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})})}
 layout();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',layout);cleanups.push(()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',update);window.removeEventListener('resize',layout);document.querySelectorAll('[aria-current="location"]').forEach(a=>a.removeAttribute('aria-current'))})
 return ()=>cleanups.reverse().forEach(fn=>fn())
}
