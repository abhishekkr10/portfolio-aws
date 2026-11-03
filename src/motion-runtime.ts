export function startMotion(){
 const cleanups:(()=>void)[]=[]
 const svg=document.querySelector<SVGSVGElement>('.section-circuit')!
 const paths=svg.querySelectorAll<SVGPathElement>('path')
 const sections=Array.from(document.querySelectorAll<HTMLElement>('#about,#capabilities,#work,#uart,#contact'))
 let length=0,frame=0
 const layout=()=>{const h=document.documentElement.scrollHeight;svg.setAttribute('viewBox',`0 0 50 ${h}`);svg.style.height=`${h}px`;let d='M16 120';sections.forEach((s,i)=>{const y=s.getBoundingClientRect().top+window.scrollY+35;d+=` V${y-24} L${i%2?30:8} ${y-12} V${y} H16`});paths.forEach(p=>p.setAttribute('d',d));length=paths[1].getTotalLength();paths[1].style.strokeDasharray=String(length);update()}
 const update=()=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;const max=document.documentElement.scrollHeight-window.innerHeight;paths[1].style.strokeDashoffset=String(length*(1-Math.min(1,window.scrollY/Math.max(1,max))));const active=sections.filter(s=>s.getBoundingClientRect().top<window.innerHeight*.4).at(-1);document.querySelectorAll<HTMLAnchorElement>('.desktop-nav a,.mobile-nav a').forEach(a=>{if(a.hash===`#${active?.id}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})})}
 layout();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',layout);cleanups.push(()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',update);window.removeEventListener('resize',layout);document.querySelectorAll('[aria-current="location"]').forEach(a=>a.removeAttribute('aria-current'))})
 const cards=document.querySelectorAll<HTMLElement>('.project')
 const visibility=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('motion-visible',e.isIntersecting)),{threshold:.15})
 cards.forEach(card=>visibility.observe(card));cleanups.push(()=>{visibility.disconnect();cards.forEach(c=>c.classList.remove('motion-visible'))})
 const precise=window.matchMedia('(hover: hover) and (pointer: fine)')
 const bindPointer=(element:HTMLElement,move:(x:number,y:number,rect:DOMRect)=>void,reset:()=>void)=>{
  let pending=0,x=0,y=0
  const onMove=(e:PointerEvent)=>{if(e.pointerType!=='mouse'||!precise.matches)return;x=e.clientX;y=e.clientY;if(!pending)pending=requestAnimationFrame(()=>{pending=0;move(x,y,element.getBoundingClientRect())})}
  const onLeave=()=>{cancelAnimationFrame(pending);pending=0;reset()}
  element.addEventListener('pointermove',onMove);element.addEventListener('pointerleave',onLeave);element.addEventListener('focusout',onLeave)
  cleanups.push(()=>{onLeave();element.removeEventListener('pointermove',onMove);element.removeEventListener('pointerleave',onLeave);element.removeEventListener('focusout',onLeave)})
 }
 cards.forEach(card=>bindPointer(card,(x,y,r)=>{card.style.setProperty('--spot-x',`${x-r.left}px`);card.style.setProperty('--spot-y',`${y-r.top}px`);card.style.setProperty('--tilt-x',`${((y-r.top)/r.height-.5)*-2}deg`);card.style.setProperty('--tilt-y',`${((x-r.left)/r.width-.5)*2}deg`)},()=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');card.style.removeProperty('--spot-x');card.style.removeProperty('--spot-y')}))
 return ()=>cleanups.reverse().forEach(fn=>fn())
}
