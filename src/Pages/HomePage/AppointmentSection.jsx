import React, { useState, useEffect, useRef } from "react";

const chambers = [
  {
    city: "Faridpur",
    hotline: "01300-263332",
    locations: [
      { name: "Faridpur Apollo Specialized Hospital", address: "Alipur, Faridpur" },
      { name: "Islami Bank Community Hospital Ltd.", address: "Faridpur" },
    ],
    schedule: [{ days: "Saturday – Wednesday", time: "4:00 PM – 8:00 PM" }],
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
  },
];

/* ── Animated Phone Component ── */
function AnimatedPhone() {
  const [screen, setScreen] = useState("home"); // home | booking | success
  const [tapVisible, setTapVisible] = useState(true);

  useEffect(() => {
    // Auto demo: home → booking → success → home → repeat
    const cycle = [
      { delay: 0,    fn: () => { setScreen("home"); setTapVisible(true); } },
      { delay: 2200, fn: () => { setTapVisible(false); } },
      { delay: 2700, fn: () => { setScreen("booking"); setTapVisible(false); } },
      { delay: 5200, fn: () => { setScreen("success"); } },
      { delay: 7500, fn: () => { setScreen("home"); setTapVisible(true); } },
    ];
    const timers = cycle.map(({ delay, fn }) => setTimeout(fn, delay));
    const loop = setInterval(() => {
      cycle.forEach(({ delay, fn }) => setTimeout(fn, delay));
    }, 8000);
    return () => { timers.forEach(clearTimeout); clearInterval(loop); };
  }, []);

  return (
    <>
      <style>{`
        /* ── Phone shell ── */
        .phone-shell {
          position: relative;
          width: 220px;
          flex-shrink: 0;
          filter: drop-shadow(0 32px 60px rgba(0,0,0,.55));
          animation: phoneFloat 5s ease-in-out infinite;
        }
        @keyframes phoneFloat {
          0%,100% { transform: translateY(0) rotate(-1deg); }
          50%      { transform: translateY(-14px) rotate(1deg); }
        }
        .phone-body {
          background: linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          border-radius: 36px;
          padding: 14px 10px;
          border: 2px solid rgba(255,255,255,.12);
          position: relative;
          overflow: hidden;
        }
        /* Side buttons */
        .phone-side-btn {
          position: absolute;
          background: rgba(255,255,255,.15);
          border-radius: 2px;
        }
        /* Screen */
        .phone-screen {
          background: #0A1628;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          height: 380px;
        }
        /* Notch */
        .phone-notch {
          position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
          width: 70px; height: 22px;
          background: #1a1a2e;
          border-radius: 12px;
          z-index: 10;
          display: flex; align-items: center; justify-content: center; gap: 5px;
        }
        .notch-camera {
          width: 8px; height: 8px; border-radius: 50%;
          background: #111; border: 1px solid rgba(255,255,255,.1);
        }
        .notch-speaker {
          width: 28px; height: 4px; border-radius: 2px;
          background: #111;
        }

        /* Status bar */
        .phone-status {
          position: absolute; top: 0; left: 0; right: 0;
          height: 42px; padding: 8px 14px 0;
          display: flex; justify-content: space-between; align-items: center;
          z-index: 5;
        }
        .status-time { font-size: .6rem; font-weight: 600; color: rgba(255,255,255,.7); font-family: 'DM Sans',sans-serif; }
        .status-icons { display: flex; gap: 4px; align-items: center; }
        .status-icon { width: 12px; height: 8px; border: 1px solid rgba(255,255,255,.5); border-radius: 1px; position: relative; }
        .status-icon::after { content:''; position:absolute; top:1px; left:1px; bottom:1px; width:70%; background:rgba(255,255,255,.6); border-radius:1px; }

        /* Screen content transitions */
        .screen-content {
          position: absolute; inset: 0; padding: 50px 14px 14px;
          transition: opacity .4s ease, transform .4s ease;
        }
        .screen-content.hidden { opacity: 0; transform: scale(.96); pointer-events: none; }
        .screen-content.visible { opacity: 1; transform: scale(1); }

        /* ── HOME screen ── */
        .phone-hero-img {
          width: 100%; height: 110px; object-fit: cover; object-position: top;
          border-radius: 12px; margin-bottom: 10px;
          border: 1px solid rgba(201,169,110,.25);
        }
        .phone-doc-name {
          font-family: 'Cormorant Garamond',serif;
          font-size: .85rem; font-weight: 700; color: #F8F5F0;
          line-height: 1.2; margin-bottom: 2px;
        }
        .phone-doc-sub { font-size: .55rem; color: rgba(201,169,110,.8); letter-spacing: .06em; margin-bottom: 10px; font-family:'DM Sans',sans-serif; }
        .phone-nav {
          display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px;
        }
        .phone-nav-item {
          font-size: .52rem; padding: 3px 8px; border-radius: 10px;
          background: rgba(201,169,110,.1); border: 1px solid rgba(201,169,110,.2);
          color: rgba(248,245,240,.7); font-family:'DM Sans',sans-serif;
        }
        .phone-book-btn {
          width: 100%; padding: 9px;
          background: linear-gradient(135deg,#C9A96E,#A87C40);
          color: #0A1628; font-size: .72rem; font-weight: 700;
          border-radius: 6px; text-align: center;
          font-family:'DM Sans',sans-serif; letter-spacing:.05em;
          position: relative; overflow: hidden;
          animation: phoneBtnPulse 2s ease-in-out infinite;
        }
        @keyframes phoneBtnPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(201,169,110,.5); }
          50%      { box-shadow: 0 0 0 8px rgba(201,169,110,0); }
        }
        .phone-book-btn::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);
          background-size:200% 100%;
          animation:btnShine 2s linear infinite;
        }
        @keyframes btnShine { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

        /* ── BOOKING screen ── */
        .phone-form-title { font-family:'Cormorant Garamond',serif; font-size:.85rem; font-weight:700; color:#F8F5F0; margin-bottom:12px; }
        .phone-field {
          background:rgba(255,255,255,.05); border:1px solid rgba(201,169,110,.2);
          border-radius:6px; padding:7px 10px; margin-bottom:7px;
        }
        .phone-field-label { font-size:.5rem; letter-spacing:.08em; text-transform:uppercase; color:rgba(201,169,110,.6); font-family:'DM Sans',sans-serif; margin-bottom:2px; }
        .phone-field-value { font-size:.68rem; color:rgba(248,245,240,.8); font-family:'DM Sans',sans-serif; }
        /* Typing cursor on last field */
        .phone-field-value.typing::after { content:'|'; animation:blink .7s infinite; color:#C9A96E; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .phone-submit {
          width:100%; padding:8px;
          background:linear-gradient(135deg,#C9A96E,#A87C40);
          color:#0A1628; font-size:.7rem; font-weight:700;
          border-radius:6px; text-align:center;
          font-family:'DM Sans',sans-serif; margin-top:4px;
          animation:phoneBtnPulse 2s ease-in-out infinite;
        }

        /* ── SUCCESS screen ── */
        .success-screen {
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          height:100%; padding-top:10px;
        }
        .success-check {
          width:56px; height:56px; border-radius:50%;
          background:rgba(201,169,110,.15); border:2px solid #C9A96E;
          display:flex; align-items:center; justify-content:center;
          margin-bottom:14px;
          animation:successPop .5s cubic-bezier(.34,1.56,.64,1) both;
        }
        @keyframes successPop { from{transform:scale(0)} to{transform:scale(1)} }
        .success-title { font-family:'Cormorant Garamond',serif; font-size:.95rem; font-weight:700; color:#C9A96E; margin-bottom:4px; text-align:center; }
        .success-sub { font-size:.62rem; color:rgba(248,245,240,.55); text-align:center; font-family:'DM Sans',sans-serif; line-height:1.5; }

        /* ── TAP HAND ── */
        .tap-hand-wrap {
          position: absolute;
          bottom: 68px; left: 50%; margin-left: -16px;
          z-index: 20;
          pointer-events: none;
          transition: opacity .3s;
        }
        .tap-hand-wrap.hidden { opacity: 0; transform: scale(.7); transition: opacity .3s, transform .3s; }
        .tap-hand {
          font-size: 28px;
          animation: handTap 1.8s ease-in-out infinite;
          display: block;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,.4));
        }
        @keyframes handTap {
          0%,100% { transform: translateY(0) rotate(-10deg); }
          40%      { transform: translateY(8px) rotate(-5deg) scale(.9); }
          60%      { transform: translateY(4px) rotate(-7deg) scale(.95); }
        }
        .tap-ripple {
          position: absolute; top: -4px; left: -4px;
          width: 40px; height: 40px; border-radius: 50%;
          border: 2px solid rgba(201,169,110,.5);
          animation: tapRipple 1.8s ease-out infinite;
          pointer-events: none;
        }
        @keyframes tapRipple {
          0%   { transform:scale(.3); opacity:1; }
          100% { transform:scale(1.8); opacity:0; }
        }

        /* Home button */
        .phone-home-btn {
          width: 36px; height: 5px; border-radius: 3px;
          background: rgba(255,255,255,.2); margin: 8px auto 0;
        }

        /* Glow ring behind phone */
        .phone-glow {
          position:absolute; border-radius:50%; pointer-events:none;
          animation:glowPulse 4s ease-in-out infinite;
        }
        @keyframes glowPulse {
          0%,100% { transform:scale(1); opacity:.4; }
          50%      { transform:scale(1.2); opacity:.7; }
        }
      `}</style>

      <div id="appointment" style={{ position:"relative", display:"flex", justifyContent:"center", alignItems:"center" }}>
        {/* Glow rings */}
        <div className="phone-glow" style={{ width:300,height:300, background:"radial-gradient(circle,rgba(201,169,110,.12) 0%,transparent 70%)" }}/>
        <div className="phone-glow" style={{ width:420,height:420, background:"radial-gradient(circle,rgba(201,169,110,.06) 0%,transparent 70%)", animationDelay:"2s" }}/>

        <div className="phone-shell">
          {/* Side volume buttons */}
          <div className="phone-side-btn" style={{ left:-4, top:80, width:3, height:30 }}/>
          <div className="phone-side-btn" style={{ left:-4, top:120, width:3, height:30 }}/>
          {/* Power button */}
          <div className="phone-side-btn" style={{ right:-4, top:100, width:3, height:45 }}/>

          <div className="phone-body">
            <div className="phone-screen">
              {/* Notch */}
              <div className="phone-notch">
                <div className="notch-camera"/>
                <div className="notch-speaker"/>
              </div>

              {/* Status bar */}
              <div className="phone-status">
                <span className="status-time">9:41</span>
                <div className="status-icons">
                  <div className="status-icon"/>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="rgba(255,255,255,.6)">
                    <path d="M5 1.5C6.5 1.5 7.8 2.1 8.8 3L10 1.7C8.7.6 7 0 5 0S1.3.6 0 1.7L1.2 3C2.2 2.1 3.5 1.5 5 1.5z"/>
                    <path d="M5 4C6 4 6.9 4.4 7.6 5.1L8.8 3.8C7.8 2.9 6.5 2.4 5 2.4S2.2 2.9 1.2 3.8L2.4 5.1C3.1 4.4 4 4 5 4z"/>
                    <circle cx="5" cy="7" r="1"/>
                  </svg>
                </div>
              </div>

              {/* HOME screen */}
              <div className={`screen-content ${screen==="home" ? "visible" : "hidden"}`}>
                <img src="/dp.png" alt="Dr" className="phone-hero-img"/>
                <div className="phone-doc-name">Dr. ASM Tanjilur Rahman</div>
                <div className="phone-doc-sub">FCPS · FMAS · Laparoscopic Surgeon</div>
                <div className="phone-nav">
                  {["Home","About","Services","Appointments"].map(n=>(
                    <div className="phone-nav-item" key={n}>{n}</div>
                  ))}
                </div>
                <div className="phone-book-btn">📅 Book Appointment</div>
              </div>

              {/* BOOKING screen */}
              <div className={`screen-content ${screen==="booking" ? "visible" : "hidden"}`}>
                <div className="phone-form-title">Book a Consultation</div>
                <div className="phone-field">
                  <div className="phone-field-label">Full Name</div>
                  <div className="phone-field-value">Mohammad Rahman</div>
                </div>
                <div className="phone-field">
                  <div className="phone-field-label">Phone Number</div>
                  <div className="phone-field-value">01700-000000</div>
                </div>
                <div className="phone-field">
                  <div className="phone-field-label">Preferred Date</div>
                  <div className="phone-field-value">Mon, 3 Feb 2025</div>
                </div>
                <div className="phone-field">
                  <div className="phone-field-label">Chamber</div>
                  <div className="phone-field-value typing">Faridpur Apollo</div>
                </div>
                <div className="phone-submit">Confirm Appointment ✓</div>
              </div>

              {/* SUCCESS screen */}
              <div className={`screen-content ${screen==="success" ? "visible" : "hidden"}`}>
                <div className="success-screen">
                  <div className="success-check">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div className="success-title">Appointment Confirmed!</div>
                  <div className="success-sub">Dr. Rahman will see you<br/>Monday, 3 Feb · 5:00 PM<br/>Faridpur Apollo Hospital</div>
                </div>
              </div>

            </div>
            <div className="phone-home-btn"/>
          </div>

          {/* Tap hand */}
          <div className={`tap-hand-wrap ${!tapVisible ? "hidden" : ""}`}>
            <div className="tap-ripple"/>
            <span className="tap-hand">👆</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Main Section ── */
export default function AppointmentSection() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);

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

  return (
    <>
      <style>{`
        /* Reveal */
        [data-reveal="up"]    { opacity:0; transform:translateY(40px); transition:opacity .75s cubic-bezier(.22,1,.36,1),transform .75s cubic-bezier(.22,1,.36,1); }
        [data-reveal="left"]  { opacity:0; transform:translateX(-50px); transition:opacity .75s cubic-bezier(.22,1,.36,1),transform .75s cubic-bezier(.22,1,.36,1); }
        [data-reveal="right"] { opacity:0; transform:translateX(50px);  transition:opacity .75s cubic-bezier(.22,1,.36,1),transform .75s cubic-bezier(.22,1,.36,1); }
        [data-reveal].revealed { opacity:1!important; transform:none!important; }

        .appt-section {
          background:linear-gradient(160deg,#0A1628 0%,#0F2040 60%,#0A1628 100%);
          position:relative; overflow:hidden; padding:100px 24px;
          font-family:'DM Sans',sans-serif;
        }
        .appt-section::before {
          content:''; position:absolute; inset:0;
          background-image:radial-gradient(rgba(201,169,110,.055) 1px,transparent 1px);
          background-size:32px 32px; pointer-events:none;
          animation:gridDrift2 25s linear infinite;
        }
        @keyframes gridDrift2 { to { background-position:32px 32px; } }

        .appt-particle {
          position:absolute; border-radius:50%; pointer-events:none;
          animation:apptParticle linear infinite;
        }
        @keyframes apptParticle {
          0%   { transform:translateY(0) scale(1); opacity:0; }
          10%  { opacity:.7; }
          90%  { opacity:.2; }
          100% { transform:translateY(-160px) scale(.2); opacity:0; }
        }

        .appt-inner { max-width:1180px; margin:0 auto; position:relative; }

        /* Header */
        .appt-header { text-align:center; margin-bottom:64px; }
        .appt-tag { display:inline-flex; align-items:center; gap:8px; background:rgba(201,169,110,.1); border:1px solid rgba(201,169,110,.28); border-radius:20px; padding:5px 16px; margin-bottom:20px; }
        .appt-tag-dot { width:5px; height:5px; border-radius:50%; background:#C9A96E; animation:dotPulse2 2s ease-in-out infinite; }
        @keyframes dotPulse2 {
          0%,100%{box-shadow:0 0 0 0 rgba(201,169,110,.5)}
          50%    {box-shadow:0 0 0 6px rgba(201,169,110,0)}
        }
        .appt-tag-text { font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; color:#C9A96E; }
        .appt-h2 { font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,5vw,3.6rem); font-weight:700; color:#F8F5F0; line-height:1.1; margin-bottom:14px; }
        .appt-h2 span {
          background:linear-gradient(90deg,#C9A96E,#E8D5A3,#C9A96E); background-size:200%;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation:shimmer2 3s linear infinite;
        }
        @keyframes shimmer2 { to{background-position:200% center} }
        .appt-subtitle { font-size:.93rem; color:rgba(248,245,240,.5); max-width:500px; margin:0 auto; line-height:1.7; }

        /* Main grid */
        .appt-grid {
          display:grid; grid-template-columns:1fr 1fr;
          gap:40px; align-items:start;
        }
        @media(max-width:960px) {
          .appt-grid { grid-template-columns:1fr; }
          .appt-phone-col { order:-1; }
        }

        /* Left info column */
        .appt-left { display:flex; flex-direction:column; gap:20px; }

        /* Chamber card */
        .chamber-card { background:rgba(255,255,255,.03); border:1px solid rgba(201,169,110,.15); border-radius:10px; overflow:hidden; transition:border-color .3s,box-shadow .3s; }
        .chamber-card:hover { border-color:rgba(201,169,110,.35); box-shadow:0 8px 40px rgba(0,0,0,.3); }
        .chamber-tabs { display:flex; border-bottom:1px solid rgba(201,169,110,.12); }
        .chamber-tab {
          flex:1; padding:14px; font-size:.82rem; font-weight:500;
          letter-spacing:.06em; text-transform:uppercase;
          color:rgba(248,245,240,.4); background:transparent; border:none;
          cursor:pointer; transition:color .2s,background .2s;
          position:relative; font-family:'DM Sans',sans-serif;
        }
        .chamber-tab::after { content:''; position:absolute; bottom:-1px; left:0; right:0; height:2px; background:#C9A96E; transform:scaleX(0); transition:transform .25s; }
        .chamber-tab.active { color:#C9A96E; background:rgba(201,169,110,.05); }
        .chamber-tab.active::after { transform:scaleX(1); }
        .chamber-body { padding:24px; }
        .chamber-city { font-family:'Cormorant Garamond',serif; font-size:1.4rem; font-weight:700; color:#F8F5F0; margin-bottom:6px; }
        .chamber-hotline { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#C9A96E,#A87C40); color:#0A1628; font-size:.8rem; font-weight:600; padding:5px 14px; border-radius:20px; margin-bottom:18px; text-decoration:none; transition:filter .2s; }
        .chamber-hotline:hover { filter:brightness(1.1); }
        .chamber-locations { display:flex; flex-direction:column; gap:8px; margin-bottom:18px; }
        .chamber-location { display:flex; align-items:flex-start; gap:10px; background:rgba(255,255,255,.04); border:1px solid rgba(201,169,110,.1); border-radius:6px; padding:10px 12px; transition:border-color .25s; }
        .chamber-location:hover { border-color:rgba(201,169,110,.3); }
        .chamber-loc-name { font-size:.83rem; font-weight:500; color:rgba(248,245,240,.85); margin-bottom:2px; }
        .chamber-loc-addr { font-size:.73rem; color:rgba(248,245,240,.4); }
        .schedule-title { font-size:.68rem; letter-spacing:.12em; text-transform:uppercase; color:rgba(201,169,110,.55); margin-bottom:8px; }
        .schedule-row { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:8px 12px; background:rgba(201,169,110,.05); border-radius:5px; border-left:2px solid rgba(201,169,110,.4); margin-bottom:6px; }
        .schedule-days { font-size:.8rem; color:rgba(248,245,240,.7); }
        .schedule-time { font-size:.8rem; font-weight:600; color:#C9A96E; white-space:nowrap; }

        /* Contact card */
        .contact-card { background:rgba(255,255,255,.03); border:1px solid rgba(201,169,110,.15); border-radius:10px; padding:22px; }
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
        .appt-cta-btn {
          display:inline-flex; align-items:center; gap:10px; width:100%; justify-content:center;
          background:linear-gradient(135deg,#C9A96E,#A87C40); color:#0A1628;
          font-family:'DM Sans',sans-serif; font-weight:700; font-size:.88rem;
          letter-spacing:.05em; padding:14px 32px; border-radius:4px; border:none;
          cursor:pointer; text-decoration:none; position:relative; overflow:hidden;
          transition:filter .25s,transform .25s,box-shadow .25s;
          box-shadow:0 4px 20px rgba(201,169,110,.3);
        }
        .appt-cta-btn::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent); background-size:200% 100%; animation:btnShine2 2s linear infinite; }
        @keyframes btnShine2 { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .appt-cta-btn:hover { filter:brightness(1.1); transform:translateY(-2px); box-shadow:0 8px 30px rgba(201,169,110,.45); }

        /* Phone column */
        .appt-phone-col {
          display:flex; flex-direction:column; align-items:center;
          justify-content:center; gap:20px;
        }
        .phone-caption {
          text-align:center;
          font-size:.75rem; letter-spacing:.1em; text-transform:uppercase;
          color:rgba(201,169,110,.5);
          display:flex; align-items:center; gap:10px;
        }
        .phone-caption::before,
        .phone-caption::after { content:''; flex:1; height:1px; background:rgba(201,169,110,.15); }
      `}</style>

      <section className="appt-section" ref={sectionRef}>
        {/* Floating particles */}
        {[...Array(10)].map((_,i)=>(
          <div key={i} className="appt-particle" style={{
            width:`${3+(i%3)*3}px`, height:`${3+(i%3)*3}px`,
            background:`rgba(201,169,110,${.1+(i%5)*.06})`,
            left:`${5+i*9}%`, bottom:`${5+(i%6)*10}%`,
            animationDuration:`${8+i*1.2}s`, animationDelay:`${i*.7}s`,
          }}/>
        ))}

        <div className="appt-inner">
          {/* Header */}
          <div className="appt-header" data-reveal="up" data-delay="0">
            <div className="appt-tag"><div className="appt-tag-dot"/><span className="appt-tag-text">Visit Us</span></div>
            <h2 className="appt-h2">Schedule Your<br/><span>Appointment Today</span></h2>
            <p className="appt-subtitle">Book a consultation at any of our chamber locations across Faridpur and Jhenaidah.</p>
          </div>

          <div className="appt-grid">
            {/* Left: Info */}
            <div className="appt-left">
              {/* Chamber tabs */}
              <div className="chamber-card" data-reveal="left" data-delay="150">
                <div className="chamber-tabs">
                  {chambers.map((c,i)=>(
                    <button key={c.city} className={`chamber-tab ${activeTab===i?"active":""}`} onClick={()=>setActiveTab(i)}>
                      {c.city}
                    </button>
                  ))}
                </div>
                <div className="chamber-body">
                  {chambers.map((c,i)=> i!==activeTab ? null : (
                    <div key={c.city}>
                      <div className="chamber-city">{c.city} Chamber</div>
                      <a href={`tel:${c.hotline.replace(/-/g,"")}`} className="chamber-hotline">📞 {c.hotline}</a>
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
                      <div className="schedule-title">Visiting Hours</div>
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

              {/* Contact card */}
              <div className="contact-card" data-reveal="left" data-delay="280">
                <div className="contact-card-title">Direct Contact</div>
                <a href="tel:01300263332" className="contact-item">
                  <div className="contact-icon-wrap">📞</div>
                  <div><div className="contact-label">Faridpur Hotline</div><div className="contact-value">01300-263332</div></div>
                </a>
                <a href="tel:01535165256" className="contact-item">
                  <div className="contact-icon-wrap">📞</div>
                  <div><div className="contact-label">Jhenaidah Hotline</div><div className="contact-value">01535-165256</div></div>
                </a>
                <a href="mailto:btanjil17@gmail.com" className="contact-item">
                  <div className="contact-icon-wrap">✉</div>
                  <div><div className="contact-label">Email</div><div className="contact-value">btanjil17@gmail.com</div></div>
                </a>
                <a href="mailto:laser.lapunit@gmail.com" className="contact-item">
                  <div className="contact-icon-wrap">✉</div>
                  <div><div className="contact-label">Laser & Lap Unit</div><div className="contact-value">laser.lapunit@gmail.com</div></div>
                </a>
              </div>

              <a href="tel:01300263332" className="appt-cta-btn" data-reveal="up" data-delay="380">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Make an Appointment
              </a>
            </div>

            {/* Right: Animated Phone */}
            <div className="appt-phone-col" data-reveal="right" data-delay="200">
              <div className="phone-caption">Live Demo</div>
              <AnimatedPhone/>
              <div className="phone-caption">Book from anywhere</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
