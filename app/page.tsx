"use client";
import { useEffect, useRef, useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { Celebration } from "@/components/celebration";
const DUST=Array.from({length:16},(_,i)=>({left:(i*43+9)%100,top:(i*29+13)%90,size:2+(i%3),dur:6+(i*5)%6,delay:-((i*11)%13)}));
const FLOATS=Array.from({length:12},(_,i)=>({left:(i*59+7)%96,size:11+(i*7)%13,dur:11+(i*5)%9,delay:-((i*7)%16),color:["#ff9fb2","#ffd58a","#ff7f9a","#ffe3b3"][i%4]}));
type Burst={id:number;items:{dx:number;dy:number;r:number;s:number;c:string;d:number}[]};
export default function Home() {
 const [ta,setTa]=useState(false),[menu,setMenu]=useState(false),[changing,setChanging]=useState(false);
 const [scrolled,setScrolled]=useState(false),heroRef=useRef<HTMLElement>(null);
 useEffect(()=>{let raf=0;const onScroll=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const y=window.scrollY;setScrolled(y>60);if(y<window.innerHeight*1.3)heroRef.current?.style.setProperty("--sy",String(y));});};onScroll();window.addEventListener("scroll",onScroll,{passive:true});return()=>{window.removeEventListener("scroll",onScroll);cancelAnimationFrame(raf);};},[]);
 const [bursts,setBursts]=useState<Burst[]>([]),[thanks,setThanks]=useState(false),burstId=useRef(0),thanksTimer=useRef<ReturnType<typeof setTimeout>>(undefined);
 const sendLove=()=>{const id=++burstId.current,colors=["#ff6f91","#ff9fb2","#ffd58a","#ffffff","#ff4d79","#f7b5c4"];const items=Array.from({length:22},(_,i)=>{const a=(Math.PI*2*i)/22+Math.random()*.5,dist=90+Math.random()*130;return{dx:Math.round(Math.cos(a)*dist),dy:Math.round(Math.sin(a)*dist*.8-70-Math.random()*90),r:Math.round(Math.random()*80-40),s:+(.7+Math.random()*1.1).toFixed(2),c:colors[i%colors.length],d:Math.round(Math.random()*140)};});setBursts(b=>[...b,{id,items}]);setTimeout(()=>setBursts(b=>b.filter(x=>x.id!==id)),2600);setThanks(true);clearTimeout(thanksTimer.current);thanksTimer.current=setTimeout(()=>setThanks(false),2400);};
 useEffect(()=>{const el=heroRef.current;if(!el||matchMedia("(prefers-reduced-motion: reduce)").matches||matchMedia("(pointer: coarse)").matches)return;let tx=0,ty=0,cx=0,cy=0,raf=0;const loop=()=>{cx+=(tx-cx)*.07;cy+=(ty-cy)*.07;el.style.setProperty("--mx",cx.toFixed(4));el.style.setProperty("--my",cy.toFixed(4));raf=Math.abs(tx-cx)>.001||Math.abs(ty-cy)>.001?requestAnimationFrame(loop):0;};const move=(e:PointerEvent)=>{const r=el.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5;if(!raf)raf=requestAnimationFrame(loop);};const leave=()=>{tx=0;ty=0;if(!raf)raf=requestAnimationFrame(loop);};el.addEventListener("pointermove",move);el.addEventListener("pointerleave",leave);return()=>{el.removeEventListener("pointermove",move);el.removeEventListener("pointerleave",leave);cancelAnimationFrame(raf);};},[]);
 const switchLanguage=(next:boolean)=>{if(next===ta)return;setChanging(true);setTimeout(()=>{setTa(next);setChanging(false);},150);};
 useEffect(()=>{document.documentElement.lang=ta?"ta":"en";},[ta]);
 const t=(en:string,tamil:string)=>ta?tamil:en;
 return <div className={(ta?"site tamil":"site")+(changing?" changing":"")}>
 <header className={"header "+(scrolled||menu?"solid":"over")}><a className="monogram" href="#home" aria-label={t("Home","முகப்பு")}>S<span>&</span>S<i>15.11.26</i></a><nav className={menu?"nav open":"nav"} aria-label={t("Main navigation","முதன்மை வழிசெலுத்தல்")}>{[["story",t("Our story","எங்கள் கதை")],["events",t("The reception","வரவேற்பு")],["venue",t("The venue","விழா இடம்")],["gallery",t("Little moments","இனிய தருணங்கள்")]].map(([id,label])=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{label}</a>)}</nav><div className="header-actions"><div className="language" aria-label="Language"><button className={!ta?"selected":""} onClick={()=>switchLanguage(false)} aria-pressed={!ta}>EN</button><span>/</span><button lang="ta" className={ta?"selected":""} onClick={()=>switchLanguage(true)} aria-pressed={ta}>தமிழ்</button></div><button className="menu-button" aria-label={t("Open or close menu","மெனுவைத் திறக்க அல்லது மூட")} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div></header>
 <main><section id="home" className="cine" ref={heroRef}>
 <div className="cine-bg" aria-hidden="true"><div className="cine-stage"><img src="/images/hero.webp" alt="" width="1672" height="941" fetchPriority="high"/></div></div>
 <div className="cine-shade" aria-hidden="true"/><div className="cine-grain" aria-hidden="true"/>
 <div className="cine-dust" aria-hidden="true">{DUST.map((p,i)=><i key={i} style={{left:p.left+"%",top:p.top+"%",width:p.size,height:p.size,animationDuration:p.dur+"s",animationDelay:p.delay+"s"}}/>)}</div>
 <div className="cine-float" aria-hidden="true">{FLOATS.map((p,i)=><span key={i} style={{left:p.left+"%",animationDuration:p.dur+"s",animationDelay:p.delay+"s",color:p.color}}><Heart size={p.size} fill="currentColor" strokeWidth={0}/></span>)}</div>
 <div className="cine-copy">
 <p className="cine-eyebrow fade" style={{["--d" as string]:"1.8s"}}>{t("Together with our families","எங்கள் குடும்பத்தினரின் அன்புடன்")}</p>
 <h1 aria-label={t("Swetha and Shiva Pandiyan","சுவேதா மற்றும் சிவா பாண்டியன்")}><span className="nm write" style={{["--d" as string]:"2.2s"}}>{t("Swetha","சுவேதா")}</span><span className="amp fade" style={{["--d" as string]:"3.5s"}}>{t("and","&")}</span><span className="nm write" style={{["--d" as string]:"3.7s"}}>{t("Shiva Pandiyan","சிவா பாண்டியன்")}</span></h1>
 <div className="cine-rule fade" style={{["--d" as string]:"5.5s"}} aria-hidden="true"><span/><svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 0l1.6 5.4L14 7l-5.4 1.6L7 14l-1.6-5.4L0 7l5.4-1.6z" fill="currentColor"/></svg><span/></div>
 <p className="cine-date fade" style={{["--d" as string]:"5.8s"}}><span>{t("15 November 2026","15 நவம்பர் 2026")}</span><b>·</b><span>{t("Trichy, Tamil Nadu","திருச்சி, தமிழ்நாடு")}</span></p>
 <p className="cine-line fade" style={{["--d" as string]:"6.2s"}}>{t("We warmly invite you to our wedding reception.","எங்கள் திருமண வரவேற்புக்கு உங்களை அன்புடன் அழைக்கிறோம்.")}</p>
 <div className="cine-buttons fade" style={{["--d" as string]:"6.6s"}}><a className="cine-btn" href="#events">{t("Reception details","வரவேற்பு விவரங்கள்")}</a><a className="cine-link" href="/wedding.ics" download>{t("Save the date","தேதியைக் குறித்துக்கொள்ளுங்கள்")}</a></div>
 </div>
 <div className="cine-love fade" style={{["--d" as string]:"7s"}}>
 <span className={"cine-love-label"+(thanks?" on":"")} aria-live="polite">{thanks?t("Sent with love","அன்புடன் நன்றி"):t("Send love to the couple","மணமக்களுக்கு அன்பை அனுப்புங்கள்")}</span>
 <button type="button" className="cine-love-btn" onClick={sendLove} aria-label={t("Send love to the couple","மணமக்களுக்கு அன்பை அனுப்புங்கள்")}><span className="ring" aria-hidden="true"/><Heart size={30} fill="currentColor" strokeWidth={0}/>
 <span className="burst" aria-hidden="true">{bursts.map(b=><span key={b.id} className="burst-set"><i className="shock"/>{b.items.map((h,i)=><em key={i} style={{["--dx" as string]:h.dx+"px",["--dy" as string]:h.dy+"px",["--r" as string]:h.r+"deg",["--s" as string]:h.s,color:h.c,animationDelay:h.d+"ms"}}><Heart size={22} fill="currentColor" strokeWidth={0}/></em>)}</span>)}</span>
 </button></div>
 <a className="cine-scroll" href="#story" aria-label={t("Scroll to our story","எங்கள் கதைக்குச் செல்க")}><span aria-hidden="true"/></a>
 <div className="cine-bloom" aria-hidden="true"/><div className="cine-veil" aria-hidden="true"/>
 </section><Celebration ta={ta} t={t}/></main></div>;
}
