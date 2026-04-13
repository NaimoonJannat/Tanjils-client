import React, { useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useLanguage } from "../../Context/LanguageContext";
import translations from "../../i18n/translations";

const specialtyIcons = ["⚕", "✦", "◈", "◉"];

const AboutMe = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useLanguage();
  const t = translations[lang];

  const handleAppointmentRedirect = (e) => {
    e.preventDefault();

    const scrollToSection = () => {
      const el = document.querySelector("#appointment");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToSection, 120);
    } else {
      scrollToSection();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll("[data-reveal]");
            els.forEach((el) => {
              const delay = parseInt(el.dataset.delay || 0);
              setTimeout(() => el.classList.add("revealed"), delay);
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
        [data-reveal="up"]    { opacity:0; transform:translateY(40px); transition:opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1); }
        [data-reveal="left"]  { opacity:0; transform:translateX(-50px); transition:opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1); }
        [data-reveal="right"] { opacity:0; transform:translateX(50px);  transition:opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1); }
        [data-reveal="scale"] { opacity:0; transform:scale(.88);         transition:opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1); }
        [data-reveal].revealed { opacity:1!important; transform:none!important; }

        .about-section {
          background:#F8F5F0; position:relative;
          overflow:hidden; padding:110px 24px;
          font-family:'DM Sans',sans-serif;
        }
        .about-section::before {
          content:''; position:absolute; inset:0;
          background-image:radial-gradient(rgba(10,22,40,.055) 1px,transparent 1px);
          background-size:28px 28px;
          pointer-events:none;
          animation:gridDrift 20s linear infinite;
        }
        @keyframes gridDrift { to { background-position:28px 28px; } }

        .about-blob {
          position:absolute; border-radius:50%; pointer-events:none;
          animation:blobPulse 8s ease-in-out infinite;
        }
        @keyframes blobPulse {
          0%,100% { transform:scale(1); opacity:.6; }
          50%      { transform:scale(1.18); opacity:1; }
        }

        .about-particle {
          position:absolute; border-radius:50%; pointer-events:none;
          animation:particleRise linear infinite;
        }
        @keyframes particleRise {
          0%   { transform:translateY(0) scale(1); opacity:0; }
          15%  { opacity:1; }
          85%  { opacity:.4; }
          100% { transform:translateY(-140px) scale(.3); opacity:0; }
        }

        .about-inner {
          max-width:1180px; margin:0 auto;
          display:grid; grid-template-columns:1fr 1fr;
          gap:80px; align-items:center; position:relative;
        }
        @media(max-width:900px) {
          .about-inner { grid-template-columns:1fr; gap:48px; }
          .about-image-col { order:-1; }
        }

        /* ── orbit rings ── */
        .orbit-ring {
          position:absolute; border-radius:50%;
          border:1px solid rgba(201,169,110,.18);
          pointer-events:none;
          animation:orbitSpin linear infinite;
        }
        @keyframes orbitSpin { to { transform:rotate(360deg); } }
        .orbit-dot {
          position:absolute; top:-4px; left:50%;
          width:8px; height:8px; border-radius:50%;
          background:#C9A96E; margin-left:-4px;
          box-shadow:0 0 10px #C9A96E;
        }

        .tilt-card { transition:transform .35s ease-out; transform-style:preserve-3d; }

        .about-img-bg {
          position:absolute; inset:0;
          background:linear-gradient(135deg,#0A1628,#1a3a5e);
          border-radius:14px;
          animation:bgSway 6s ease-in-out infinite;
        }
        @keyframes bgSway {
          0%,100% { transform:rotate(2.5deg) translate(6px,8px); }
          50%      { transform:rotate(3.5deg) translate(10px,13px); }
        }

        .about-img {
          position:relative; width:100%; max-width:380px;
          border-radius:14px; object-fit:cover; object-position:top;
          display:block; border:3px solid rgba(201,169,110,.3);
          box-shadow:0 24px 80px rgba(10,22,40,.18);
        }
        .img-shimmer {
          position:absolute; inset:0; border-radius:14px;
          background:linear-gradient(110deg,transparent 30%,rgba(201,169,110,.12) 50%,transparent 70%);
          background-size:200% 100%;
          animation:imgShimmer 4s ease-in-out infinite;
          pointer-events:none;
        }
        @keyframes imgShimmer {
          0%   { background-position:-200% 0; }
          100% { background-position: 200% 0; }
        }

        .about-badge {
          position:absolute; bottom:-18px; right:-18px;
          background:#0A1628; border:1px solid rgba(201,169,110,.35);
          border-radius:10px; padding:14px 20px;
          box-shadow:0 8px 32px rgba(0,0,0,.25);
          animation:badgeFloat 4s ease-in-out infinite;
        }
        @keyframes badgeFloat {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(-7px); }
        }
        .about-badge-num { font-family:'Cormorant Garamond',serif; font-size:1.6rem; font-weight:700; color:#C9A96E; line-height:1; }
        .about-badge-label { font-size:.7rem; letter-spacing:.08em; text-transform:uppercase; color:rgba(248,245,240,.6); margin-top:3px; }

        .cred-float-tag {
          position:absolute; left:-20px;
          background:linear-gradient(135deg,#C9A96E,#A87C40);
          color:#0A1628; font-size:.7rem; font-weight:600;
          letter-spacing:.06em; padding:5px 14px; border-radius:20px;
          white-space:nowrap; box-shadow:0 4px 14px rgba(0,0,0,.2);
          animation:tagFloat 5s ease-in-out infinite;
        }
        @keyframes tagFloat {
          0%,100% { transform:translateY(0) rotate(-1deg); }
          50%      { transform:translateY(-6px) rotate(.5deg); }
        }

        /* ── text side ── */
        .about-tag { display:inline-flex; align-items:center; gap:8px; background:rgba(201,169,110,.1); border:1px solid rgba(201,169,110,.3); border-radius:20px; padding:5px 14px; margin-bottom:20px; }
        .about-tag-dot { width:5px; height:5px; border-radius:50%; background:#C9A96E; animation:dotPulse 2s ease-in-out infinite; }
        @keyframes dotPulse {
          0%,100% { box-shadow:0 0 0 0 rgba(201,169,110,.5); }
          50%      { box-shadow:0 0 0 6px rgba(201,169,110,0); }
        }
        .about-tag-text { font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; color:#C9A96E; }

        .about-gold-line { height:2px; width:56px; background:linear-gradient(90deg,#C9A96E,transparent); margin-bottom:18px; }

        .about-h2 { font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,4vw,3.2rem); font-weight:700; color:#0A1628; line-height:1.1; margin-bottom:10px; }
        .about-h2 span {
          background:linear-gradient(90deg,#C9A96E,#E8D5A3,#C9A96E);
          background-size:200%;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:shimmer 3s linear infinite;
        }
        @keyframes shimmer { to { background-position:200% center; } }

        .about-credentials { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px; }
        .cred-pill {
          background:#0A1628; color:rgba(248,245,240,.8);
          font-size:.73rem; font-weight:500; letter-spacing:.05em;
          padding:5px 14px; border-radius:20px;
          border:1px solid rgba(201,169,110,.2);
          transition:border-color .25s, background .25s, transform .25s;
          cursor:default;
        }
        .cred-pill:hover { border-color:#C9A96E; background:#162947; transform:translateY(-2px); }
        .cred-pill span { color:#C9A96E; margin-right:4px; }

        .about-desc { font-size:.95rem; color:rgba(10,22,40,.65); line-height:1.8; margin-bottom:32px; }

        .about-cards { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:36px; }
        @media(max-width:480px) { .about-cards { grid-template-columns:1fr; } .about-img { max-width:100%; } .cred-float-tag { left:0; } .about-badge { right:0; } }

        .about-card {
          background:white; border:1px solid rgba(10,22,40,.08);
          border-radius:8px; padding:16px; position:relative; overflow:hidden;
          transition:border-color .3s, box-shadow .3s, transform .3s;
        }
        .about-card::before { content:''; position:absolute; top:0; left:0; width:3px; height:0; background:linear-gradient(180deg,#C9A96E,transparent); transition:height .4s; }
        .about-card:hover { border-color:rgba(201,169,110,.35); box-shadow:0 8px 28px rgba(10,22,40,.1); transform:translateY(-3px); }
        .about-card:hover::before { height:100%; }
        .about-card-icon { font-size:1.1rem; color:#C9A96E; margin-bottom:6px; transition:transform .3s; display:inline-block; }
        .about-card:hover .about-card-icon { transform:scale(1.25) rotate(12deg); }
        .about-card-title { font-size:.85rem; font-weight:600; color:#0A1628; margin-bottom:3px; }
        .about-card-desc  { font-size:.77rem; color:rgba(10,22,40,.5); line-height:1.4; }

        .about-btn-row { display:flex; gap:12px; flex-wrap:wrap; }
        .about-btn-primary {
          display:inline-flex; align-items:center; gap:8px;
          background:linear-gradient(135deg,#C9A96E,#A87C40);
          color:#0A1628; font-family:'DM Sans',sans-serif;
          font-weight:600; font-size:.85rem; letter-spacing:.04em;
          padding:12px 26px; border-radius:3px; border:none;
          cursor:pointer; text-decoration:none; position:relative; overflow:hidden;
          transition:filter .25s, transform .25s, box-shadow .25s;
          box-shadow:0 4px 20px rgba(201,169,110,.28);
        }
        .about-btn-primary::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent);
          background-size:200% 100%;
          animation:btnShine 2.5s ease-in-out infinite;
        }
        @keyframes btnShine { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .about-btn-primary:hover { filter:brightness(1.1); transform:translateY(-2px); box-shadow:0 8px 28px rgba(201,169,110,.42); }

        .about-btn-outline {
          display:inline-flex; align-items:center; gap:8px;
          background:transparent; color:#0A1628;
          font-family:'DM Sans',sans-serif; font-weight:400; font-size:.85rem;
          padding:11px 22px; border-radius:3px; border:1px solid rgba(10,22,40,.2);
          cursor:pointer; text-decoration:none;
          transition:border-color .25s, background .25s, gap .25s;
        }
        .about-btn-outline:hover { border-color:#C9A96E; background:rgba(201,169,110,.06); gap:14px; }
      `}</style>

      <section id="about" className="about-section" ref={sectionRef}>
        <div className="about-blob" style={{ width:500,height:500,top:-120,right:-120, background:"radial-gradient(circle,rgba(201,169,110,.07) 0%,transparent 70%)" }} />
        <div className="about-blob" style={{ width:300,height:300,bottom:-80,left:-80, background:"radial-gradient(circle,rgba(201,169,110,.05) 0%,transparent 70%)", animationDelay:"4s" }} />

        {[...Array(9)].map((_,i)=>(
          <div key={i} className="about-particle" style={{
            width:`${4+(i%3)*3}px`, height:`${4+(i%3)*3}px`,
            background:`rgba(201,169,110,${.12+(i%4)*.07})`,
            left:`${8+i*10}%`, bottom:`${8+(i%5)*12}%`,
            animationDuration:`${7+i*1.4}s`, animationDelay:`${i*.8}s`,
          }} />
        ))}

        <div className="about-inner">
          {/* Image column */}
          <div className="about-image-col" style={{display:"flex",justifyContent:"center"}} data-reveal="left" data-delay="100">
            <div
              className="about-img-wrap"
              style={{position:"relative",perspective:"1200px"}}
              onMouseMove={(e)=>{
                const card=e.currentTarget.querySelector(".tilt-card");
                const r=e.currentTarget.getBoundingClientRect();
                const rx=((e.clientY-r.top-r.height/2)/r.height)*-10;
                const ry=((e.clientX-r.left-r.width/2)/r.width)*10;
                card.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
              }}
              onMouseLeave={(e)=>{ e.currentTarget.querySelector(".tilt-card").style.transform="none"; }}
            >
              <div className="orbit-ring" style={{width:460,height:460,top:"50%",left:"50%",marginTop:-230,marginLeft:-230,animationDuration:"22s"}}>
                <div className="orbit-dot"/>
              </div>
              <div className="orbit-ring" style={{width:560,height:560,top:"50%",left:"50%",marginTop:-280,marginLeft:-280,animationDuration:"35s",animationDirection:"reverse",borderStyle:"dashed",opacity:.4}}>
                <div className="orbit-dot" style={{background:"rgba(201,169,110,.35)",boxShadow:"none",width:6,height:6}}/>
              </div>

              <div className="tilt-card" style={{position:"relative"}}>
                <div className="about-img-bg"/>
                <div style={{position:"absolute",inset:-12,border:"1px solid rgba(201,169,110,.2)",borderRadius:18,pointerEvents:"none"}}/>
                <img src="/dp.png" alt="Dr ASM Tanjilur Rahman" className="about-img"/>
                <div className="img-shimmer"/>
                <div className="cred-float-tag" style={{top:32}}>{t.aboutCredTag}</div>
                <div className="about-badge">
                  <div className="about-badge-num">{t.aboutBadgeNum}</div>
                  <div className="about-badge-label">{t.aboutBadgeLabel}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div>
            <div data-reveal="up" data-delay="150">
              <div className="about-tag">
                <div className="about-tag-dot"/>
                <span className="about-tag-text">{t.aboutTag}</span>
              </div>
            </div>

            <div className="about-gold-line" data-reveal="up" data-delay="200"/>

            <h2 className="about-h2" data-reveal="up" data-delay="250">
              {t.doctorPrefix} <br/><span>{t.doctorName}</span>
            </h2>

            <div className="about-credentials" data-reveal="up" data-delay="320">
              {["FCPS (Surgery)","FMAS (India)","Fellowship – GEM, India","Asst. Professor, Faridpur Medical College"].map(c=>(
                <div className="cred-pill" key={c}><span>✦</span>{c}</div>
              ))}
            </div>

            <p className="about-desc" data-reveal="up" data-delay="380">
              {t.aboutDesc}
            </p>

            <div className="about-cards">
              {t.aboutSpecialties.map((s,i)=>(
                <div className="about-card" key={s.title} data-reveal="up" data-delay={440+i*80}>
                  <div className="about-card-icon">{specialtyIcons[i]}</div>
                  <div className="about-card-title">{s.title}</div>
                  <div className="about-card-desc">{s.desc}</div>
                </div>
              ))}
            </div>

            <div className="about-btn-row" data-reveal="up" data-delay="740">
              <Link to="/" onClick={handleAppointmentRedirect} className="about-btn-primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {t.aboutBookConsultation}
              </Link>
              <Link to="/about" className="about-btn-outline">{t.aboutLearnMore}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutMe;
