import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../Context/LanguageContext";
import translations from "../../i18n/translations";

const chambers = [
  {
    city: "Faridpur",
    hotline: "01300-263332",
    locations: [
      { name: "Faridpur Apollo Specialized Hospital", address: "Alipur, Faridpur" },
      { name: "Islami Bank Community Hospital Ltd.", address: "Faridpur" },
    ],
    schedule: [{ days: "Saturday – Wednesday", time: "4:00 PM – 8:00 PM" }],
    mapQuery: "Faridpur+Apollo+Specialized+Hospital+Alipur+Faridpur+Bangladesh",
    mapEmbedUrl: "https://maps.google.com/maps?q=Faridpur+Apollo+Specialized+Hospital,+Alipur,+Faridpur,+Bangladesh&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  {
    city: "Jhenaidah",
    hotline: "01535-165256",
    locations: [
      { name: "Islami Bank Community Hospital Ltd.", address: "Chuadanga Bus Stand, Jhenaidah" },
    ],
    schedule: [
      { days: "Thursday", time: "4:00 PM – 8:00 PM" },
      { days: "Friday",   time: "9:00 AM – 12:30 PM" },
    ],
    mapQuery: "Islami+Bank+Community+Hospital+Jhenaidah+Bangladesh",
    mapEmbedUrl: "https://maps.google.com/maps?q=Islami+Bank+Community+Hospital,+Jhenaidah,+Bangladesh&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
];

function AnimatedPhone() {
  const [screen, setScreen] = useState("website");
  const [callTimer, setCallTimer] = useState(0);
  const [btnPressed, setBtnPressed] = useState(false);
  const [islandActive, setIslandActive] = useState(false);

  useEffect(() => {
    let timers = [];
    const runCycle = () => {
      setScreen("website"); setBtnPressed(false); setIslandActive(false); setCallTimer(0);
      timers.push(setTimeout(() => setBtnPressed(true), 2500));
      timers.push(setTimeout(() => { setScreen("calling"); setBtnPressed(false); setIslandActive(true); }, 3400));
      timers.push(setTimeout(() => setScreen("connected"), 6800));
      timers.push(setTimeout(() => { setScreen("confirmed"); setIslandActive(false); }, 10200));
      timers.push(setTimeout(() => { setScreen("website"); setBtnPressed(false); setIslandActive(false); setCallTimer(0); }, 14000));
    };
    runCycle();
    const loop = setInterval(runCycle, 14500);
    return () => { timers.forEach(clearTimeout); clearInterval(loop); };
  }, []);

  useEffect(() => {
    if (screen !== "connected") { setCallTimer(0); return; }
    const interval = setInterval(() => setCallTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [screen]);

  const fmt = (s) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  return (
    <>
      <style>{`
        .ph-shell { position:relative; width:216px; flex-shrink:0; filter:drop-shadow(0 28px 55px rgba(0,0,0,.6)); animation:phFloat 5s ease-in-out infinite; }
        @keyframes phFloat { 0%,100%{transform:translateY(0) rotate(-1.5deg)} 50%{transform:translateY(-12px) rotate(1deg)} }
        .ph-body { background:linear-gradient(160deg,#181828 0%,#1a1f3a 50%,#111827 100%); border-radius:38px; padding:14px 10px 18px; border:1.5px solid rgba(255,255,255,.1); box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 0 0 1px rgba(0,0,0,.5); }
        .ph-screen { background:#0A1628; border-radius:26px; overflow:hidden; position:relative; height:400px; }
        .ph-island { position:absolute; top:10px; left:50%; transform:translateX(-50%); width:88px; height:26px; background:#000; border-radius:13px; z-index:20; display:flex; align-items:center; justify-content:center; gap:6px; transition:width .45s cubic-bezier(.34,1.56,.64,1),background .3s; }
        .ph-island.active-island { width:138px; background:#0d2e0d; }
        .island-cam { width:9px; height:9px; border-radius:50%; background:#1a1a1a; border:1px solid rgba(255,255,255,.08); flex-shrink:0; }
        .island-dot { width:8px; height:8px; border-radius:50%; background:#4ade80; animation:islandDot .8s ease-in-out infinite; flex-shrink:0; }
        @keyframes islandDot { 0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(74,222,128,.5)} 50%{transform:scale(1.2);box-shadow:0 0 0 4px rgba(74,222,128,0)} }
        .island-txt { font-size:.48rem; color:#4ade80; font-family:'DM Sans',sans-serif; font-weight:600; letter-spacing:.04em; white-space:nowrap; }
        .ph-status { position:absolute; top:0; left:0; right:0; height:44px; padding:10px 16px 0; display:flex; justify-content:space-between; align-items:center; z-index:5; }
        .ph-time { font-size:.62rem; font-weight:600; color:rgba(255,255,255,.75); font-family:'DM Sans',sans-serif; }
        .ph-sc { position:absolute; inset:0; transition:opacity .5s ease,transform .5s ease; }
        .ph-sc.hidden { opacity:0; transform:scale(.96); pointer-events:none; }
        .ph-sc.visible { opacity:1; transform:scale(1); }
        .ws-screen { padding:48px 0 0; display:flex; flex-direction:column; height:100%; background:linear-gradient(160deg,#0A1628 0%,#0d2040 100%); }
        .ws-nav { display:flex; align-items:center; justify-content:space-between; padding:0 12px 10px; border-bottom:1px solid rgba(201,169,110,.12); }
        .ws-logo { font-family:'Cormorant Garamond',serif; font-size:.65rem; font-weight:700; color:#F8F5F0; }
        .ws-logo span { color:#C9A96E; }
        .ws-nav-links { display:flex; gap:8px; }
        .ws-nav-link { font-size:.42rem; color:rgba(248,245,240,.4); font-family:'DM Sans',sans-serif; }
        .ws-hero { padding:12px 12px 0; flex:1; display:flex; flex-direction:column; }
        .ws-hero-tag { display:inline-flex; align-items:center; gap:4px; background:rgba(201,169,110,.1); border:1px solid rgba(201,169,110,.25); border-radius:10px; padding:2px 8px; margin-bottom:8px; width:fit-content; }
        .ws-hero-tag span { font-size:.42rem; color:#C9A96E; letter-spacing:.08em; font-family:'DM Sans',sans-serif; text-transform:uppercase; }
        .ws-hero-title { font-family:'Cormorant Garamond',serif; font-size:.9rem; font-weight:700; color:#F8F5F0; line-height:1.2; margin-bottom:4px; }
        .ws-hero-title span { color:#C9A96E; }
        .ws-hero-sub { font-size:.46rem; color:rgba(248,245,240,.45); line-height:1.5; font-family:'DM Sans',sans-serif; margin-bottom:10px; max-width:160px; }
        .ws-appt-btn { display:inline-flex; align-items:center; gap:5px; background:linear-gradient(135deg,#C9A96E,#A87C40); color:#0A1628; font-size:.55rem; font-weight:700; padding:7px 12px; border-radius:3px; font-family:'DM Sans',sans-serif; letter-spacing:.05em; width:fit-content; position:relative; overflow:hidden; transition:transform .15s,box-shadow .15s,filter .15s; }
        .ws-appt-btn.pressed { transform:scale(.92); filter:brightness(1.25); box-shadow:0 0 0 5px rgba(201,169,110,.35); }
        .ws-appt-btn::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent); background-size:200% 100%; animation:wsBtnShine 2.5s linear infinite; }
        @keyframes wsBtnShine { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .ws-cursor { position:absolute; font-size:18px; pointer-events:none; transition:all .65s cubic-bezier(.34,1.2,.64,1); filter:drop-shadow(0 2px 6px rgba(0,0,0,.5)); z-index:30; }
        .ws-info-strip { margin-top:10px; padding:8px 10px; background:rgba(255,255,255,.03); border-top:1px solid rgba(201,169,110,.1); display:flex; justify-content:space-between; align-items:center; }
        .ws-info-item { text-align:center; }
        .ws-info-val { font-family:'Cormorant Garamond',serif; font-size:.7rem; font-weight:700; color:#C9A96E; }
        .ws-info-lbl { font-size:.38rem; color:rgba(248,245,240,.35); letter-spacing:.08em; text-transform:uppercase; font-family:'DM Sans',sans-serif; }
        .calling-screen { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; padding:20px; background:linear-gradient(180deg,#0d1f0d 0%,#081420 100%); }
        .calling-status { font-size:.58rem; color:rgba(248,245,240,.4); letter-spacing:.12em; text-transform:uppercase; font-family:'DM Sans',sans-serif; margin-bottom:22px; animation:callingPulse 1.5s ease-in-out infinite; }
        @keyframes callingPulse { 0%,100%{opacity:.4} 50%{opacity:1} }
        .call-avatar-wrap { position:relative; width:88px; height:88px; margin-bottom:12px; }
        .call-ripple { position:absolute; border-radius:50%; border:1.5px solid rgba(201,169,110,.35); animation:callRipple 2s ease-out infinite; }
        .call-ripple:nth-child(1){inset:-10px;animation-delay:0s} .call-ripple:nth-child(2){inset:-22px;animation-delay:.55s} .call-ripple:nth-child(3){inset:-34px;animation-delay:1.1s}
        @keyframes callRipple { 0%{opacity:.8;transform:scale(.9)} 100%{opacity:0;transform:scale(1.08)} }
        .call-avatar { width:88px; height:88px; border-radius:50%; object-fit:cover; object-position:top; border:2.5px solid rgba(201,169,110,.5); box-shadow:0 0 30px rgba(201,169,110,.2); }
        .call-name { font-family:'Cormorant Garamond',serif; font-size:.95rem; font-weight:700; color:#F8F5F0; margin-bottom:3px; }
        .call-creds { font-size:.52rem; color:rgba(201,169,110,.7); letter-spacing:.05em; font-family:'DM Sans',sans-serif; margin-bottom:14px; }
        .call-number-badge { background:rgba(201,169,110,.1); border:1px solid rgba(201,169,110,.25); border-radius:12px; padding:5px 14px; margin-bottom:28px; font-size:.62rem; color:#C9A96E; font-family:'DM Sans',sans-serif; font-weight:600; }
        .call-actions { display:flex; gap:18px; align-items:center; }
        .call-btn { width:40px; height:40px; border-radius:50%; background:rgba(255,255,255,.08); display:flex; align-items:center; justify-content:center; font-size:.8rem; }
        .call-btn.end { width:54px; height:54px; background:#dc2626; box-shadow:0 4px 18px rgba(220,38,38,.4); font-size:1rem; }
        .connected-screen { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; padding:20px; background:linear-gradient(180deg,#0a1f0a 0%,#081420 100%); }
        .conn-timer { font-family:'Cormorant Garamond',serif; font-size:1.6rem; font-weight:700; color:#4ade80; margin-bottom:4px; }
        .conn-label { font-size:.55rem; color:rgba(248,245,240,.4); letter-spacing:.1em; text-transform:uppercase; font-family:'DM Sans',sans-serif; margin-bottom:18px; }
        .conn-avatar { width:80px; height:80px; border-radius:50%; object-fit:cover; object-position:top; border:2.5px solid #4ade80; box-shadow:0 0 0 6px rgba(74,222,128,.1),0 0 28px rgba(74,222,128,.25); margin-bottom:10px; }
        .conn-name { font-family:'Cormorant Garamond',serif; font-size:.88rem; font-weight:700; color:#F8F5F0; margin-bottom:3px; }
        .conn-creds { font-size:.52rem; color:rgba(201,169,110,.7); letter-spacing:.05em; font-family:'DM Sans',sans-serif; margin-bottom:14px; }
        .sound-wave { display:flex; align-items:center; gap:3px; height:22px; margin-bottom:16px; }
        .wave-bar { width:3px; border-radius:2px; background:#4ade80; animation:waveBounce .8s ease-in-out infinite; }
        @keyframes waveBounce { 0%,100%{height:5px;opacity:.5} 50%{height:20px;opacity:1} }
        .conn-tip { padding:7px 12px; background:rgba(74,222,128,.07); border:1px solid rgba(74,222,128,.2); border-radius:7px; font-size:.54rem; color:#4ade80; font-family:'DM Sans',sans-serif; text-align:center; line-height:1.5; margin-bottom:14px; }
        .confirmed-screen { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; padding:18px; background:linear-gradient(160deg,#0A1628 0%,#0d2040 100%); }
        .conf-check { width:58px; height:58px; border-radius:50%; background:rgba(201,169,110,.12); border:2px solid #C9A96E; display:flex; align-items:center; justify-content:center; margin-bottom:12px; animation:confPop .6s cubic-bezier(.34,1.56,.64,1) both; }
        @keyframes confPop { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
        .conf-title { font-family:'Cormorant Garamond',serif; font-size:1.05rem; font-weight:700; color:#C9A96E; margin-bottom:4px; text-align:center; }
        .conf-sub { font-size:.58rem; color:rgba(248,245,240,.5); text-align:center; font-family:'DM Sans',sans-serif; line-height:1.6; margin-bottom:14px; }
        .conf-card { background:rgba(255,255,255,.04); border:1px solid rgba(201,169,110,.2); border-radius:10px; padding:10px 14px; width:100%; }
        .conf-row { display:flex; align-items:center; gap:8px; padding:5px 0; border-bottom:1px solid rgba(201,169,110,.07); }
        .conf-row:last-child { border-bottom:none; }
        .conf-icon { font-size:.72rem; flex-shrink:0; }
        .conf-key { font-size:.48rem; color:rgba(201,169,110,.55); text-transform:uppercase; letter-spacing:.08em; font-family:'DM Sans',sans-serif; }
        .conf-val { font-size:.64rem; color:rgba(248,245,240,.8); font-family:'DM Sans',sans-serif; font-weight:500; }
        .ph-home-bar { width:38px; height:4px; border-radius:2px; background:rgba(255,255,255,.18); margin:10px auto 0; }
        .ph-side { position:absolute; background:rgba(255,255,255,.12); border-radius:2px; }
        .ph-glow { position:absolute; border-radius:50%; pointer-events:none; animation:phGlow 4s ease-in-out infinite; }
        @keyframes phGlow { 0%,100%{transform:scale(1);opacity:.35} 50%{transform:scale(1.2);opacity:.65} }
      `}</style>

      <div style={{ position:"relative", display:"flex", justifyContent:"center", alignItems:"center" }}>
        <div className="ph-glow" style={{ width:280,height:280, background:"radial-gradient(circle,rgba(201,169,110,.13) 0%,transparent 70%)" }}/>
        <div className="ph-glow" style={{ width:400,height:400, background:"radial-gradient(circle,rgba(201,169,110,.06) 0%,transparent 70%)", animationDelay:"2s" }}/>
        <div className="ph-shell">
          <div className="ph-side" style={{ left:-3, top:88, width:3, height:26 }}/>
          <div className="ph-side" style={{ left:-3, top:122, width:3, height:26 }}/>
          <div className="ph-side" style={{ right:-3, top:106, width:3, height:40 }}/>
          <div className="ph-body">
            <div className="ph-screen">
              <div className={`ph-island ${islandActive ? "active-island" : ""}`}>
                {islandActive ? (<><div className="island-dot"/><div className="island-txt">{screen==="connected" ? fmt(callTimer) : "Calling..."}</div></>) : (<div className="island-cam"/>)}
              </div>
              <div className="ph-status">
                <span className="ph-time">9:41</span>
                <div style={{display:"flex",gap:3,alignItems:"center"}}>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="rgba(255,255,255,.65)"><rect x="0" y="6" width="2" height="4" rx="1"/><rect x="3" y="4" width="2" height="6" rx="1"/><rect x="6" y="2" width="2" height="8" rx="1"/><rect x="9" y="0" width="2" height="10" rx="1"/></svg>
                  <svg width="22" height="10" viewBox="0 0 22 10" fill="none" style={{marginLeft:3}}><rect x="0" y="1" width="18" height="8" rx="2" stroke="rgba(255,255,255,.5)" strokeWidth="1.2"/><rect x="1.5" y="2.5" width="11" height="5" rx="1" fill="rgba(255,255,255,.7)"/><path d="M19.5 3.5v3a1.5 1.5 0 000-3z" fill="rgba(255,255,255,.4)"/></svg>
                </div>
              </div>
              <div className={`ph-sc ${screen==="website" ? "visible" : "hidden"}`} style={{overflow:"hidden"}}>
                <div className="ws-screen">
                  <div className="ws-nav">
                    <div className="ws-logo"><span>Dr. </span>ASM Tanjilur</div>
                    <div className="ws-nav-links">{["Home","About","Services"].map(l=><div key={l} className="ws-nav-link">{l}</div>)}</div>
                  </div>
                  <div className="ws-hero">
                    <div className="ws-hero-tag"><span>Trusted Surgeon</span></div>
                    <div className="ws-hero-title">Advanced<br/><span>Laparoscopic</span><br/>& Laser Surgery</div>
                    <div className="ws-hero-sub">FCPS · FMAS · Fellowship — Faridpur Medical College</div>
                    <div style={{position:"relative",display:"inline-block"}}>
                      <div className={`ws-appt-btn ${btnPressed ? "pressed" : ""}`}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        Book Appointment
                      </div>
                      <div className="ws-cursor" style={{ bottom:btnPressed?"2px":"-35px", right:btnPressed?"6px":"-25px", opacity:screen==="website"?1:0, transform:btnPressed?"scale(.82)":"scale(1)" }}>👆</div>
                    </div>
                  </div>
                  <div className="ws-info-strip">
                    {[["7000+","Surgeries"],["15+","Yrs Exp"],["98%","Success"]].map(([v,l])=>(
                      <div key={l} className="ws-info-item"><div className="ws-info-val">{v}</div><div className="ws-info-lbl">{l}</div></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={`ph-sc ${screen==="calling" ? "visible" : "hidden"}`}>
                <div className="calling-screen">
                  <div className="calling-status">Calling…</div>
                  <div className="call-avatar-wrap"><div className="call-ripple"/><div className="call-ripple"/><div className="call-ripple"/><img src="/dp.png" alt="Dr" className="call-avatar"/></div>
                  <div className="call-name">Dr. ASM Tanjilur Rahman</div>
                  <div className="call-creds">FCPS · FMAS · Laparoscopic Surgeon</div>
                  <div className="call-number-badge">📞 01300-263332</div>
                  <div className="call-actions"><div className="call-btn">🔇</div><div className="call-btn end">📵</div><div className="call-btn">🔊</div></div>
                </div>
              </div>
              <div className={`ph-sc ${screen==="connected" ? "visible" : "hidden"}`}>
                <div className="connected-screen">
                  <div className="conn-timer">{fmt(callTimer)}</div>
                  <div className="conn-label">Call Connected</div>
                  <img src="/dp.png" alt="Dr" className="conn-avatar"/>
                  <div className="conn-name">Dr. ASM Tanjilur Rahman</div>
                  <div className="conn-creds">Faridpur Apollo Hospital</div>
                  <div className="sound-wave">{[0,.1,.2,.3,.4,.3,.2,.1,0].map((d,i)=><div key={i} className="wave-bar" style={{animationDelay:`${d}s`}}/>)}</div>
                  <div className="conn-tip">📅 Mention your preferred date & time<br/>to schedule your visit</div>
                  <div className="call-actions"><div className="call-btn">🔇</div><div className="call-btn end">📵</div><div className="call-btn">🔊</div></div>
                </div>
              </div>
              <div className={`ph-sc ${screen==="confirmed" ? "visible" : "hidden"}`}>
                <div className="confirmed-screen">
                  <div className="conf-check"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>
                  <div className="conf-title">Appointment Booked!</div>
                  <div className="conf-sub">Your appointment has been confirmed<br/>with Dr. ASM Tanjilur Rahman</div>
                  <div className="conf-card">
                    {[["👨‍⚕️","Doctor","Dr. ASM Tanjilur Rahman"],["🏥","Chamber","Faridpur Apollo Hospital"],["📅","Schedule","Sat–Wed · 4:00–8:00 PM"],["📞","Hotline","01300-263332"]].map(([icon,key,val])=>(
                      <div key={key} className="conf-row"><div className="conf-icon">{icon}</div><div><div className="conf-key">{key}</div><div className="conf-val">{val}</div></div></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="ph-home-bar"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AppointmentSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [mapLoaded, setMapLoaded] = useState([false, false]);
  const sectionRef = useRef(null);
  const { lang } = useLanguage();
  const t = translations[lang];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-reveal]").forEach((el) => {
              setTimeout(()=>el.classList.add("revealed"), parseInt(el.dataset.delay||0));
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMapLoad = (idx) => {
    setMapLoaded(prev => { const n=[...prev]; n[idx]=true; return n; });
  };

  return (
    <>
      <style>{`
        [data-reveal="up"]    { opacity:0; transform:translateY(40px); transition:opacity .75s cubic-bezier(.22,1,.36,1),transform .75s cubic-bezier(.22,1,.36,1); }
        [data-reveal="left"]  { opacity:0; transform:translateX(-50px); transition:opacity .75s cubic-bezier(.22,1,.36,1),transform .75s cubic-bezier(.22,1,.36,1); }
        [data-reveal="right"] { opacity:0; transform:translateX(50px);  transition:opacity .75s cubic-bezier(.22,1,.36,1),transform .75s cubic-bezier(.22,1,.36,1); }
        [data-reveal].revealed { opacity:1!important; transform:none!important; }

        .appt-section { background:linear-gradient(160deg,#0A1628 0%,#0F2040 60%,#0A1628 100%); position:relative; overflow:hidden; padding:100px 24px; font-family:'DM Sans',sans-serif; }
        .appt-section::before { content:''; position:absolute; inset:0; background-image:radial-gradient(rgba(201,169,110,.055) 1px,transparent 1px); background-size:32px 32px; pointer-events:none; animation:gridDrift2 25s linear infinite; }
        @keyframes gridDrift2 { to{background-position:32px 32px} }
        .appt-particle { position:absolute; border-radius:50%; pointer-events:none; animation:apptParticle linear infinite; }
        @keyframes apptParticle { 0%{transform:translateY(0) scale(1);opacity:0} 10%{opacity:.7} 90%{opacity:.2} 100%{transform:translateY(-160px) scale(.2);opacity:0} }
        .appt-inner { max-width:1180px; margin:0 auto; position:relative; }
        .appt-header { text-align:center; margin-bottom:64px; }
        .appt-tag { display:inline-flex; align-items:center; gap:8px; background:rgba(201,169,110,.1); border:1px solid rgba(201,169,110,.28); border-radius:20px; padding:5px 16px; margin-bottom:20px; }
        .appt-tag-dot { width:5px; height:5px; border-radius:50%; background:#C9A96E; animation:dotPulse2 2s ease-in-out infinite; }
        @keyframes dotPulse2 { 0%,100%{box-shadow:0 0 0 0 rgba(201,169,110,.5)} 50%{box-shadow:0 0 0 6px rgba(201,169,110,0)} }
        .appt-tag-text { font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; color:#C9A96E; }
        .appt-h2 { font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,5vw,3.6rem); font-weight:700; color:#F8F5F0; line-height:1.1; margin-bottom:14px; }
        .appt-h2 span { background:linear-gradient(90deg,#C9A96E,#E8D5A3,#C9A96E); background-size:200%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer2 3s linear infinite; }
        @keyframes shimmer2 { to{background-position:200% center} }
        .appt-subtitle { font-size:.93rem; color:rgba(248,245,240,.5); max-width:500px; margin:0 auto; line-height:1.7; }
        .appt-grid { display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:start; }
        @media(max-width:960px) { .appt-grid { grid-template-columns:1fr; } .appt-phone-col { order:-1; } }
        .appt-left { display:flex; flex-direction:column; gap:20px; }

        /* Chamber */
        .chamber-card { background:rgba(255,255,255,.03); border:1px solid rgba(201,169,110,.15); border-radius:12px; overflow:hidden; transition:border-color .3s,box-shadow .3s; }
        .chamber-card:hover { border-color:rgba(201,169,110,.3); box-shadow:0 8px 40px rgba(0,0,0,.3); }
        .chamber-tabs {
  display: flex;
  border-bottom: 1px solid rgba(201,169,110,.12);
  background: rgba(201,169,110,.04);
  padding: 8px 10px;
  gap: 8px;
}
      .chamber-tab {
  flex: 1;
  padding: 10px 14px;
  font-size: .82rem;
  font-weight: 600;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: rgba(248,245,240,.45);
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(201,169,110,.15);
  border-radius: 6px;
  cursor: pointer;
  transition: color .2s, background .2s, border-color .2s, box-shadow .2s;
  position: relative;
  font-family: 'DM Sans', sans-serif;
}

        .chamber-tab::after { display: none; }
        .chamber-tab:hover {
  color: rgba(201,169,110,.8);
  background: rgba(201,169,110,.08);
  border-color: rgba(201,169,110,.3);
}

       .chamber-tab.active {
  color: #0A1628;
  background: linear-gradient(135deg, #C9A96E, #A87C40);
  border-color: transparent;
  box-shadow: 0 4px 16px rgba(201,169,110,.35);
}
        .chamber-tab.active::after { transform:scaleX(1); }
        .chamber-body { padding:22px; }
        .chamber-city { font-family:'Cormorant Garamond',serif; font-size:1.35rem; font-weight:700; color:#F8F5F0; margin-bottom:6px; }
        .chamber-hotline { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#C9A96E,#A87C40); color:#0A1628; font-size:.8rem; font-weight:600; padding:5px 14px; border-radius:20px; margin-bottom:16px; text-decoration:none; transition:filter .2s; }
        .chamber-hotline:hover { filter:brightness(1.1); }

        /* Map */
        .map-wrap { position:relative; border-radius:10px; overflow:hidden; height:168px; margin-bottom:16px; border:1px solid rgba(201,169,110,.2); background:#08111f; box-shadow:inset 0 0 0 1px rgba(201,169,110,.08); }
        .map-wrap iframe { width:100%; height:100%; border:none; display:block; filter:hue-rotate(190deg) invert(88%) saturate(0.55) brightness(0.82) contrast(1.05); transition:opacity .6s ease; }
        .map-wrap iframe.map-visible { opacity:1; }
        .map-wrap iframe.map-hidden { opacity:0; }
        .map-topbar { position:absolute; top:0; left:0; right:0; z-index:3; padding:6px 10px; display:flex; align-items:center; justify-content:space-between; background:linear-gradient(90deg,rgba(8,17,31,.95) 0%,rgba(10,22,40,.85) 100%); border-bottom:1px solid rgba(201,169,110,.18); backdrop-filter:blur(4px); }
        .map-live-badge { display:flex; align-items:center; gap:5px; font-size:.58rem; letter-spacing:.09em; text-transform:uppercase; color:#C9A96E; font-family:'DM Sans',sans-serif; }
        .map-live-dot { width:6px; height:6px; border-radius:50%; background:#4ade80; animation:mapDotPulse 1.8s ease-in-out infinite; flex-shrink:0; }
        @keyframes mapDotPulse { 0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,.5)} 50%{box-shadow:0 0 0 4px rgba(74,222,128,0)} }
        .map-open-link { font-size:.56rem; color:rgba(201,169,110,.6); text-decoration:none; display:flex; align-items:center; gap:3px; letter-spacing:.03em; transition:color .2s; font-family:'DM Sans',sans-serif; }
        .map-open-link:hover { color:#C9A96E; }
        .map-skeleton { position:absolute; inset:0; z-index:2; background:linear-gradient(110deg,#08111f 30%,rgba(201,169,110,.05) 50%,#08111f 70%); background-size:200% 100%; animation:skelShimmer 1.8s linear infinite; }
        @keyframes skelShimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .map-skeleton.done { display:none; }

        .chamber-locations { display:flex; flex-direction:column; gap:8px; margin-bottom:16px; }
        .chamber-location { display:flex; align-items:flex-start; gap:10px; background:rgba(255,255,255,.04); border:1px solid rgba(201,169,110,.1); border-radius:6px; padding:10px 12px; transition:border-color .25s; }
        .chamber-location:hover { border-color:rgba(201,169,110,.3); }
        .chamber-loc-name { font-size:.83rem; font-weight:500; color:rgba(248,245,240,.85); margin-bottom:2px; }
        .chamber-loc-addr { font-size:.73rem; color:rgba(248,245,240,.4); }
        .schedule-title { font-size:.68rem; letter-spacing:.12em; text-transform:uppercase; color:rgba(201,169,110,.55); margin-bottom:8px; }
        .schedule-row { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:8px 12px; background:rgba(201,169,110,.05); border-radius:5px; border-left:2px solid rgba(201,169,110,.4); margin-bottom:6px; }
        .schedule-days { font-size:.8rem; color:rgba(248,245,240,.7); }
        .schedule-time { font-size:.8rem; font-weight:600; color:#C9A96E; white-space:nowrap; }

        /* Contact */
        .contact-card { background:rgba(255,255,255,.03); border:1px solid rgba(201,169,110,.15); border-radius:12px; padding:22px; }
        .contact-card-title { font-family:'Cormorant Garamond',serif; font-size:1.2rem; font-weight:600; color:#F8F5F0; margin-bottom:14px; }
        .contact-item { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid rgba(201,169,110,.07); text-decoration:none; transition:gap .2s; }
        .contact-item:last-child { border-bottom:none; }
        a.contact-item:hover { gap:16px; }
        .contact-icon-wrap { width:32px; height:32px; border-radius:50%; border:1px solid rgba(201,169,110,.25); display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:.85rem; transition:background .2s,border-color .2s; }
        a.contact-item:hover .contact-icon-wrap { background:rgba(201,169,110,.1); border-color:#C9A96E; }
        .contact-label { font-size:.65rem; letter-spacing:.08em; text-transform:uppercase; color:rgba(201,169,110,.55); margin-bottom:1px; }
        .contact-value { font-size:.85rem; color:rgba(248,245,240,.75); font-weight:500; }
        a.contact-item .contact-value { color:#C9A96E; }

        /* CTA */
        .appt-cta-btn { display:inline-flex; align-items:center; gap:10px; width:100%; justify-content:center; background:linear-gradient(135deg,#C9A96E,#A87C40); color:#0A1628; font-family:'DM Sans',sans-serif; font-weight:700; font-size:.88rem; letter-spacing:.05em; padding:14px 32px; border-radius:4px; border:none; cursor:pointer; text-decoration:none; position:relative; overflow:hidden; transition:filter .25s,transform .25s,box-shadow .25s; box-shadow:0 4px 20px rgba(201,169,110,.3); }
        .appt-cta-btn::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent); background-size:200% 100%; animation:btnShine2 2s linear infinite; }
        @keyframes btnShine2 { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .appt-cta-btn:hover { filter:brightness(1.1); transform:translateY(-2px); box-shadow:0 8px 30px rgba(201,169,110,.45); }

        /* Phone col */
        .appt-phone-col { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; }
        .phone-caption { text-align:center; font-size:.7rem; letter-spacing:.1em; text-transform:uppercase; color:rgba(201,169,110,.4); display:flex; align-items:center; gap:10px; width:100%; max-width:240px; }
        .phone-caption::before,.phone-caption::after { content:''; flex:1; height:1px; background:rgba(201,169,110,.15); }
      `}</style>

      <section id="appointment" className="appt-section" ref={sectionRef}>
        {[...Array(10)].map((_,i)=>(
          <div key={i} className="appt-particle" style={{
            width:`${3+(i%3)*3}px`, height:`${3+(i%3)*3}px`,
            background:`rgba(201,169,110,${.1+(i%5)*.06})`,
            left:`${5+i*9}%`, bottom:`${5+(i%6)*10}%`,
            animationDuration:`${8+i*1.2}s`, animationDelay:`${i*.7}s`,
          }}/>
        ))}

        <div className="appt-inner">
          <div className="appt-header" data-reveal="up" data-delay="0">
            <div className="appt-tag"><div className="appt-tag-dot"/><span className="appt-tag-text">{t.apptSectionTag}</span></div>
            <h2 className="appt-h2">{t.apptSectionTitle}</h2>
            <p className="appt-subtitle">{t.apptSectionSubtitle}</p>
          </div>

          <div className="appt-grid">
            <div className="appt-left">
              <div className="chamber-card" data-reveal="left" data-delay="150">
                <div className="chamber-tabs">
                  {chambers.map((c,i)=>(
                    <button key={c.city} className={`chamber-tab ${activeTab===i?"active":""}`} onClick={()=>setActiveTab(i)}>{c.city}</button>
                  ))}
                </div>
                <div className="chamber-body">
                  {chambers.map((c, i) => i !== activeTab ? null : (
                    <div key={c.city}>
                      <div className="chamber-city">{c.city} {t.apptChamberSuffix}</div>
                      <a href={`tel:${c.hotline.replace(/-/g,"")}`} className="chamber-hotline">📞 {c.hotline}</a>

                      {/* ── Map embed ── */}
                      <div className="map-wrap">
                        <div className="map-topbar">
                          <div className="map-live-badge">
                            <div className="map-live-dot"/>
                            {t.apptLiveLocation}
                          </div>
                          <a
                            href={`https://maps.google.com/?q=${c.mapQuery}`}
                            target="_blank"
                            rel="noreferrer"
                            className="map-open-link"
                          >
                            {t.apptOpenMaps}
                          </a>
                        </div>
                        <div className={`map-skeleton ${mapLoaded[i] ? "done" : ""}`}/>
                        <iframe
                          src={c.mapEmbedUrl}
                          className={mapLoaded[i] ? "map-visible" : "map-hidden"}
                          onLoad={() => handleMapLoad(i)}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`${c.city} Chamber Map`}
                        />
                      </div>

                      <div className="chamber-locations">
                        {c.locations.map(loc=>(
                          <div className="chamber-location" key={loc.name}>
                            <div style={{fontSize:"1.1rem",flexShrink:0,marginTop:2}}>🏥</div>
                            <div>
                              <div className="chamber-loc-name">{loc.name}</div>
                              <div className="chamber-loc-addr">{loc.address}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="schedule-title">{t.apptVisitingHours}</div>
                      {c.schedule.map(s=>(
                        <div className="schedule-row" key={s.days}>
                          <span className="schedule-days">{s.days}</span>
                          <span className="schedule-time">{s.time}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="contact-card" data-reveal="left" data-delay="280">
                <div className="contact-card-title">{t.apptDirectContact}</div>
                <a href="mailto:btanjil17@gmail.com" className="contact-item">
                  <div className="contact-icon-wrap">✉</div>
                  <div><div className="contact-label">{t.apptEmail}</div><div className="contact-value">btanjil17@gmail.com</div></div>
                </a>
                {/* <a href="mailto:laser.lapunit@gmail.com" className="contact-item">
                  <div className="contact-icon-wrap">✉</div>
                  <div><div className="contact-label">Laser & Lap Unit</div><div className="contact-value">laser.lapunit@gmail.com</div></div>
                </a> */}
              </div>

              <a href="tel:01300263332" className="appt-cta-btn" data-reveal="up" data-delay="380">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                {t.apptMakeAppointment}
              </a>
            </div>

            <div className="appt-phone-col" data-reveal="right" data-delay="200">
              <div className="phone-caption">{t.apptHowItWorks}</div>
              <AnimatedPhone/>
              <div className="phone-caption">{t.apptOneCallAway}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
