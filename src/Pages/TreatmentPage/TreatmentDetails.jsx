import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router";
import { useLanguage } from "../../Context/LanguageContext";
import translations from "../../i18n/translations";
import treatmentsData from "../../data/treatments";

const categoryColors = {
  Laparoscopic: { bg: "rgba(96,165,250,.15)",  text: "#93C5FD", border: "rgba(96,165,250,.3)" },
  Laser:        { bg: "rgba(201,169,110,.15)", text: "#C9A96E",  border: "rgba(201,169,110,.35)" },
  Cancer:       { bg: "rgba(248,113,113,.15)", text: "#FCA5A5",  border: "rgba(248,113,113,.3)" },
  General:      { bg: "rgba(52,211,153,.12)",  text: "#6EE7B7",  border: "rgba(52,211,153,.28)" },
};

/* ── useReveal: attaches IntersectionObserver to a single element ── */
function useReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "none";
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
}

/* ── Skeleton ── */
function Skeleton() {
  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", paddingTop: 100 }}>
      <style>{`@keyframes skP{0%,100%{opacity:.35}50%{opacity:.75}} .skb{background:rgba(255,255,255,.07);border-radius:8px;animation:skP 1.6s ease-in-out infinite;}`}</style>
      <div style={{ maxWidth:1100,margin:"0 auto",padding:"40px 24px" }}>
        <div className="skb" style={{ height:420,marginBottom:40 }}/>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 320px",gap:40 }}>
          <div>
            <div className="skb" style={{ height:28,width:"60%",marginBottom:16 }}/>
            <div className="skb" style={{ height:16,marginBottom:10 }}/>
            <div className="skb" style={{ height:16,marginBottom:10 }}/>
            <div className="skb" style={{ height:16,width:"80%",marginBottom:32 }}/>
            <div className="skb" style={{ height:140 }}/>
          </div>
          <div className="skb" style={{ height:320 }}/>
        </div>
      </div>
    </div>
  );
}

/* ── Related card ── */
function RelatedCard({ treatment }) {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const relTitle = treatment.title[lang] ?? treatment.title.en;
  return (
    <div
      onClick={() => navigate(`/treatments/${treatment.slug}`)}
      style={{
        cursor:"pointer", borderRadius:8, overflow:"hidden",
        border:"1px solid rgba(201,169,110,.12)", height:160, position:"relative",
        background:"#0F2040", transition:"border-color .3s,transform .3s,box-shadow .3s",
      }}
      onMouseEnter={e=>{
        e.currentTarget.style.borderColor="rgba(201,169,110,.4)";
        e.currentTarget.style.transform="translateY(-4px)";
        e.currentTarget.style.boxShadow="0 12px 36px rgba(0,0,0,.4)";
        const img=e.currentTarget.querySelector("img");
        if(img) img.style.transform="scale(1.07)";
        const line=e.currentTarget.querySelector(".rc-line");
        if(line) line.style.transform="scaleX(1)";
      }}
      onMouseLeave={e=>{
        e.currentTarget.style.borderColor="rgba(201,169,110,.12)";
        e.currentTarget.style.transform="none";
        e.currentTarget.style.boxShadow="none";
        const img=e.currentTarget.querySelector("img");
        if(img) img.style.transform="scale(1)";
        const line=e.currentTarget.querySelector(".rc-line");
        if(line) line.style.transform="scaleX(0)";
      }}
    >
      {treatment.image && (
        <img src={treatment.image} alt={relTitle} loading="lazy"
          style={{ width:"100%",height:"100%",objectFit:"cover",transition:"transform .5s" }}/>
      )}
      <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(10,22,40,.95) 0%,rgba(10,22,40,.4) 100%)" }}/>
      <div className="rc-line" style={{ position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#C9A96E,transparent)",transform:"scaleX(0)",transformOrigin:"left",transition:"transform .4s" }}/>
      <div style={{ position:"absolute",inset:0,padding:14,display:"flex",flexDirection:"column",justifyContent:"flex-end" }}>
        <div style={{ fontSize:".6rem",letterSpacing:".1em",textTransform:"uppercase",color:"#C9A96E",marginBottom:4,fontFamily:"'DM Sans',sans-serif" }}>{treatment.category}</div>
        <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:".95rem",fontWeight:600,color:"#F8F5F0",lineHeight:1.3 }}>{relTitle}</div>
      </div>
    </div>
  );
}

/* ── Reveal wrapper: fades+slides element in when scrolled into view ── */
function Reveal({ children, direction = "up", delay = 0, style = {} }) {
  const ref = useReveal(delay);
  const initial = {
    up:    { opacity:0, transform:"translateY(36px)" },
    left:  { opacity:0, transform:"translateX(-36px)" },
    right: { opacity:0, transform:"translateX(36px)" },
    scale: { opacity:0, transform:"scale(.93)" },
  }[direction];
  return (
    <div
      ref={ref}
      style={{
        ...initial,
        transition:`opacity .7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════ */
export default function TreatmentDetails() {
  const { slug }                  = useParams();
  const navigate                  = useNavigate();
  const location                  = useLocation();
  const { lang }                  = useLanguage();
  const t                         = translations[lang];
  const [treatment, setTreatment] = useState(null);
  const [related, setRelated]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const heroRef                   = useRef(null);

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
    setLoading(true);
    setImgLoaded(false);
    window.scrollTo({ top:0, behavior:"instant" });

    const found = treatmentsData.find(tr => tr.slug === slug) || null;
    setTreatment(found);
    if (found) {
      setRelated(treatmentsData.filter(tr => tr.slug !== slug && tr.category === found.category).slice(0, 3));
    } else {
      setRelated([]);
    }
    setLoading(false);
  }, [slug]);

  // Parallax on hero image — passive listener, no layout jank
  useEffect(() => {
    const onScroll = () => setParallaxY(window.scrollY * 0.35);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) return <Skeleton />;
  if (!treatment) return (
    <div style={{ minHeight:"100vh",background:"#0A1628",display:"flex",alignItems:"center",justifyContent:"center",paddingTop:100 }}>
      <div style={{ textAlign:"center",color:"#F8F5F0",fontFamily:"'DM Sans',sans-serif" }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"4rem",color:"#C9A96E",lineHeight:1 }}>404</div>
        <div style={{ fontSize:"1.1rem",marginBottom:24,color:"rgba(248,245,240,.6)" }}>{t.tdNotFound}</div>
        <button onClick={()=>navigate("/")} style={{ background:"linear-gradient(135deg,#C9A96E,#A87C40)",color:"#0A1628",border:"none",padding:"11px 28px",borderRadius:4,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif" }}>{t.tdBackHome}</button>
      </div>
    </div>
  );

  const colorSet   = categoryColors[treatment.category] || categoryColors.General;
  const title      = treatment.title[lang]       ?? treatment.title.en;
  const shortDesc  = treatment.shortDesc[lang]   ?? treatment.shortDesc.en;
  const description = treatment.description[lang] ?? treatment.description.en;
  const highlights = treatment.highlights[lang]  ?? treatment.highlights.en;
  const duration   = treatment.duration[lang]    ?? treatment.duration.en;
  const recovery   = treatment.recovery[lang]    ?? treatment.recovery.en;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .td-page { background:#0A1628; min-height:100vh; font-family:'DM Sans',sans-serif; overflow-x:hidden; }

        /* ── HERO ── */
        .td-hero { position:relative; height:clamp(400px,56vh,660px); overflow:hidden; }
        .td-hero-img { width:100%; height:135%; object-fit:cover; object-position:center top; display:block; opacity:0; transition:opacity .9s ease; will-change:transform; }
        .td-hero-img.loaded { opacity:1; }
        .td-hero-fallback { position:absolute; inset:0; background:linear-gradient(135deg,#0F2040,#1a3a5e); }
        .td-hero-ov1 { position:absolute; inset:0; background:linear-gradient(160deg,rgba(10,22,40,.78) 0%,rgba(10,22,40,.38) 55%,rgba(10,22,40,.22) 100%); }
        .td-hero-ov2 { position:absolute; inset:0; background:linear-gradient(to top,rgba(10,22,40,1) 0%,rgba(10,22,40,.55) 28%,transparent 65%); }
        .td-hero-dots { position:absolute; inset:0; background-image:radial-gradient(rgba(201,169,110,.055) 1px,transparent 1px); background-size:30px 30px; pointer-events:none; animation:dotsMove 22s linear infinite; }
        @keyframes dotsMove { to { background-position:30px 30px; } }
        .td-corner { position:absolute; width:44px; height:44px; pointer-events:none; opacity:.45; }
        .td-corner.tl { top:22px; left:22px; border-top:1.5px solid #C9A96E; border-left:1.5px solid #C9A96E; }
        .td-corner.br { bottom:22px; right:22px; border-bottom:1.5px solid #C9A96E; border-right:1.5px solid #C9A96E; }
        .td-hero-body { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:flex-end; padding:clamp(20px,5vw,60px); z-index:5; }

        /* Breadcrumb */
        .td-crumb { display:flex; align-items:center; gap:7px; font-size:.7rem; letter-spacing:.04em; color:rgba(248,245,240,.45); margin-bottom:18px; flex-wrap:wrap; }
        .td-crumb a { color:rgba(248,245,240,.45); text-decoration:none; transition:color .2s; }
        .td-crumb a:hover { color:#C9A96E; }

        /* Hero anim */
        @keyframes heroUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
        .td-hero-cat  { animation:heroUp .6s ease both; }
        .td-hero-h1   { animation:heroUp .65s ease .1s both; }
        .td-hero-short{ animation:heroUp .65s ease .2s both; }

        .td-hero-h1 { font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,5.5vw,4.2rem); font-weight:700; color:#F8F5F0; line-height:1.06; margin-bottom:12px; max-width:700px; }

        /* ── STATS STRIP ── */
        .td-strip { background:#0F2040; border-top:1px solid rgba(201,169,110,.1); border-bottom:1px solid rgba(201,169,110,.1); }
        .td-strip-inner { max-width:1100px; margin:0 auto; padding:0 24px; display:flex; align-items:stretch; }
        .td-stat { flex:1; padding:18px 20px; border-right:1px solid rgba(201,169,110,.08); transition:background .25s; }
        .td-stat:last-child { border-right:none; }
        .td-stat:hover { background:rgba(201,169,110,.04); }
        .td-stat-lbl { font-size:.62rem; letter-spacing:.12em; text-transform:uppercase; color:rgba(201,169,110,.5); margin-bottom:4px; }
        .td-stat-val { font-family:'Cormorant Garamond',serif; font-size:1.15rem; font-weight:700; color:#F8F5F0; line-height:1; }
        @media(max-width:580px) {
          .td-strip-inner { flex-wrap:wrap; }
          .td-stat { min-width:50%; border-bottom:1px solid rgba(201,169,110,.07); }
          .td-stat:nth-child(2n) { border-right:none; }
        }

        /* ── LAYOUT ── */
        .td-layout { max-width:1100px; margin:0 auto; padding:56px 24px 72px; display:grid; grid-template-columns:1fr 310px; gap:44px; align-items:start; }
        @media(max-width:880px) { .td-layout { grid-template-columns:1fr; gap:36px; } }

        /* ── LEFT ── */
        .td-sec-label { display:flex; align-items:center; gap:12px; margin-bottom:16px; }
        .td-sec-line { flex:1; height:1px; background:linear-gradient(90deg,rgba(201,169,110,.28),transparent); }
        .td-sec-text { font-size:.66rem; letter-spacing:.14em; text-transform:uppercase; color:rgba(201,169,110,.55); white-space:nowrap; }

        .td-desc { font-size:.95rem; color:rgba(248,245,240,.68); line-height:1.88; margin-bottom:38px; }

        .td-hl-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:11px; margin-bottom:38px; }
        .td-hl-card {
          background:rgba(255,255,255,.03); border:1px solid rgba(201,169,110,.14);
          border-radius:7px; padding:14px 16px; display:flex; align-items:center; gap:11px;
          transition:border-color .28s,background .28s,transform .28s; position:relative; overflow:hidden;
        }
        .td-hl-card::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; background:linear-gradient(180deg,#C9A96E,transparent); opacity:0; transition:opacity .28s; }
        .td-hl-card:hover { border-color:rgba(201,169,110,.35); background:rgba(201,169,110,.05); transform:translateX(4px); }
        .td-hl-card:hover::before { opacity:1; }
        .td-hl-icon { width:30px; height:30px; border-radius:50%; border:1px solid rgba(201,169,110,.25); background:rgba(201,169,110,.08); display:flex; align-items:center; justify-content:center; color:#C9A96E; font-size:.72rem; flex-shrink:0; transition:background .28s; }
        .td-hl-card:hover .td-hl-icon { background:rgba(201,169,110,.18); }
        .td-hl-text { font-size:.83rem; color:rgba(248,245,240,.8); font-weight:500; }

        .td-table { border:1px solid rgba(201,169,110,.14); border-radius:8px; overflow:hidden; margin-bottom:38px; }
        .td-row { display:flex; align-items:center; padding:13px 18px; border-bottom:1px solid rgba(201,169,110,.07); transition:background .2s; }
        .td-row:last-child { border-bottom:none; }
        .td-row:hover { background:rgba(201,169,110,.04); }
        .td-key { width:150px; font-size:.68rem; letter-spacing:.08em; text-transform:uppercase; color:rgba(201,169,110,.55); flex-shrink:0; }
        .td-val { font-size:.86rem; color:rgba(248,245,240,.8); font-weight:500; line-height:1.5; }

        /* ── SIDEBAR ── */
        .td-sidebar { display:flex; flex-direction:column; gap:18px; }

        .td-doc-card { background:rgba(255,255,255,.03); border:1px solid rgba(201,169,110,.16); border-radius:10px; overflow:hidden; transition:border-color .3s,box-shadow .3s; }
        .td-doc-card:hover { border-color:rgba(201,169,110,.35); box-shadow:0 8px 32px rgba(0,0,0,.28); }
        .td-doc-head { background:linear-gradient(135deg,rgba(201,169,110,.1),rgba(201,169,110,.04)); border-bottom:1px solid rgba(201,169,110,.1); padding:16px; display:flex; align-items:center; gap:12px; }
        .td-doc-avatar { width:52px; height:52px; border-radius:50%; object-fit:cover; object-position:top; border:2px solid rgba(201,169,110,.35); box-shadow:0 4px 14px rgba(0,0,0,.3); flex-shrink:0; }
        .td-doc-name { font-family:'Cormorant Garamond',serif; font-size:.95rem; font-weight:700; color:#F8F5F0; line-height:1.2; margin-bottom:2px; }
        .td-doc-creds { font-size:.65rem; letter-spacing:.04em; color:rgba(201,169,110,.65); }
        .td-doc-body { padding:16px; }
        .td-doc-desc { font-size:.78rem; color:rgba(248,245,240,.5); line-height:1.65; margin-bottom:12px; }
        .td-doc-link { font-size:.76rem; color:#C9A96E; text-decoration:none; display:inline-flex; align-items:center; gap:5px; transition:gap .2s; }
        .td-doc-link:hover { gap:9px; }

        .td-appt-card { background:linear-gradient(160deg,#0F2040 0%,#162947 100%); border:1px solid rgba(201,169,110,.2); border-radius:10px; padding:20px; position:relative; overflow:hidden; }
        .td-appt-card::before { content:''; position:absolute; top:-40px; right:-40px; width:130px; height:130px; border-radius:50%; background:radial-gradient(circle,rgba(201,169,110,.1) 0%,transparent 70%); animation:apptGlow 4s ease-in-out infinite; }
        @keyframes apptGlow { 0%,100%{transform:scale(1);opacity:.55} 50%{transform:scale(1.3);opacity:1} }
        .td-appt-title { font-family:'Cormorant Garamond',serif; font-size:1.15rem; font-weight:700; color:#F8F5F0; margin-bottom:5px; position:relative; }
        .td-appt-sub { font-size:.76rem; color:rgba(248,245,240,.48); line-height:1.6; margin-bottom:16px; position:relative; }

        .td-phone { display:flex; align-items:center; gap:11px; background:rgba(255,255,255,.04); border:1px solid rgba(201,169,110,.14); border-radius:7px; padding:10px 13px; text-decoration:none; margin-bottom:8px; transition:border-color .25s,background .25s,transform .25s; position:relative; }
        .td-phone:hover { border-color:#C9A96E; background:rgba(201,169,110,.07); transform:translateX(3px); }
        .td-phone-icon { width:32px; height:32px; border-radius:50%; background:linear-gradient(135deg,#C9A96E,#A87C40); display:flex; align-items:center; justify-content:center; font-size:.78rem; flex-shrink:0; animation:phoneRing 3.5s ease-in-out infinite; }
        @keyframes phoneRing { 0%,88%,100%{transform:rotate(0)} 90%{transform:rotate(-14deg)} 92%{transform:rotate(14deg)} 94%{transform:rotate(-9deg)} 96%{transform:rotate(9deg)} }
        .td-phone-lbl { font-size:.62rem; letter-spacing:.07em; text-transform:uppercase; color:rgba(201,169,110,.5); margin-bottom:1px; }
        .td-phone-num { font-size:.88rem; font-weight:600; color:#C9A96E; }

        .td-cta { display:flex; align-items:center; justify-content:center; gap:9px; width:100%; background:linear-gradient(135deg,#C9A96E,#A87C40); color:#0A1628; font-family:'DM Sans',sans-serif; font-weight:700; font-size:.82rem; letter-spacing:.05em; padding:12px; border-radius:5px; border:none; cursor:pointer; text-decoration:none; margin-top:12px; position:relative; overflow:hidden; transition:filter .25s,transform .25s,box-shadow .25s; box-shadow:0 4px 18px rgba(201,169,110,.28); }
        .td-cta::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.24),transparent); background-size:200% 100%; animation:ctaShine 2.5s linear infinite; }
        @keyframes ctaShine { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .td-cta:hover { filter:brightness(1.1); transform:translateY(-2px); box-shadow:0 8px 26px rgba(201,169,110,.44); }

        .td-sched-card { background:rgba(255,255,255,.03); border:1px solid rgba(201,169,110,.14); border-radius:10px; padding:18px; }
        .td-sched-title { font-family:'Cormorant Garamond',serif; font-size:.98rem; font-weight:600; color:#F8F5F0; margin-bottom:12px; }
        .td-sched-city { font-size:.65rem; letter-spacing:.1em; text-transform:uppercase; color:rgba(201,169,110,.5); margin:10px 0 6px; }
        .td-sched-row { display:flex; justify-content:space-between; align-items:center; padding:7px 0; border-bottom:1px solid rgba(201,169,110,.06); gap:8px; }
        .td-sched-row:last-child { border-bottom:none; }
        .td-sched-days { font-size:.76rem; color:rgba(248,245,240,.58); }
        .td-sched-time { font-size:.76rem; font-weight:600; color:#C9A96E; white-space:nowrap; }

        /* mobile appt inline */
        .td-mob-appt { display:none; }
        @media(max-width:880px) {
          .td-mob-appt { display:block; margin-bottom:36px; }
          .td-sidebar .td-appt-card { display:none; }
        }

        /* ── RELATED ── */
        .td-related-wrap { max-width:1100px; margin:0 auto; padding:0 24px 80px; }
        .td-divider { height:1px; background:linear-gradient(90deg,transparent,rgba(201,169,110,.22),transparent); margin-bottom:44px; }
        .td-related-hdr { display:flex; align-items:center; justify-content:space-between; margin-bottom:26px; flex-wrap:wrap; gap:12px; }
        .td-related-title { font-family:'Cormorant Garamond',serif; font-size:clamp(1.4rem,3vw,1.9rem); font-weight:700; color:#F8F5F0; }
        .td-related-title span { background:linear-gradient(90deg,#C9A96E,#E8D5A3); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .td-related-more { font-size:.78rem; color:rgba(201,169,110,.65); text-decoration:none; display:inline-flex; align-items:center; gap:5px; transition:color .2s,gap .2s; }
        .td-related-more:hover { color:#C9A96E; gap:9px; }
        .td-related-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
        @media(max-width:680px) { .td-related-grid { grid-template-columns:1fr 1fr; } }
        @media(max-width:440px) { .td-related-grid { grid-template-columns:1fr; } }

        @media(max-width:560px) { .td-corner { display:none; } .td-hero-body { padding:18px 18px 24px; } }
      `}</style>

      <div className="td-page">

        {/* ── HERO ── */}
        <div className="td-hero" ref={heroRef}>
          {!treatment.image && <div className="td-hero-fallback"/>}
          {treatment.image && (
            <img
              src={treatment.image}
              alt={title}
              className={`td-hero-img ${imgLoaded ? "loaded" : ""}`}
              style={{ transform:`translateY(${parallaxY}px)` }}
              onLoad={() => setImgLoaded(true)}
            />
          )}
          <div className="td-hero-ov1"/>
          <div className="td-hero-ov2"/>
          <div className="td-hero-dots"/>
          <div className="td-corner tl"/>
          <div className="td-corner br"/>

          <div className="td-hero-body">
            <div className="td-crumb">
              <Link to="/">{t.navHome}</Link>
              <span style={{ color:"rgba(201,169,110,.35)" }}>›</span>
              <Link to="/">{t.tdCrumbTreatments}</Link>
              <span style={{ color:"rgba(201,169,110,.35)" }}>›</span>
              <span style={{ color:"rgba(201,169,110,.75)" }}>{title}</span>
            </div>

            <div
              className="td-hero-cat"
              style={{ display:"inline-flex",alignItems:"center",gap:7,fontSize:".68rem",letterSpacing:".1em",textTransform:"uppercase",fontWeight:600,padding:"4px 13px",borderRadius:20,marginBottom:12,fontFamily:"'DM Sans',sans-serif",background:colorSet.bg,color:colorSet.text,border:`1px solid ${colorSet.border}` }}
            >
              <span style={{ width:5,height:5,borderRadius:"50%",background:colorSet.text,flexShrink:0 }}/>
              {t.treatCategoryLabels[treatment.category] || treatment.category}
            </div>

            <h1 className="td-hero-h1">{title}</h1>

            {shortDesc && (
              <p className="td-hero-short" style={{ fontSize:"clamp(.83rem,1.4vw,.97rem)",color:"rgba(248,245,240,.62)",maxWidth:540,lineHeight:1.72 }}>
                {shortDesc}
              </p>
            )}
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        <div className="td-strip">
          <div className="td-strip-inner">
            {duration && (
              <div className="td-stat">
                <div className="td-stat-lbl">{t.tdStatDuration}</div>
                <div className="td-stat-val">{duration}</div>
              </div>
            )}
            {recovery && (
              <div className="td-stat">
                <div className="td-stat-lbl">{t.tdStatRecovery}</div>
                <div className="td-stat-val">{recovery}</div>
              </div>
            )}
            <div className="td-stat">
              <div className="td-stat-lbl">{t.tdStatSpec}</div>
              <div className="td-stat-val">{t.treatCategoryLabels[treatment.category] || treatment.category}</div>
            </div>
            <div className="td-stat">
              <div className="td-stat-lbl">{t.tdStatSurgeon}</div>
              <div className="td-stat-val" style={{ fontSize:".88rem" }}>{t.doctorPrefix} {t.doctorName}</div>
            </div>
          </div>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div className="td-layout">

          {/* LEFT */}
          <div>

            {/* Mobile appointment card */}
            <div className="td-mob-appt">
              <div className="td-appt-card">
                <div className="td-appt-title">{t.tdApptTitle}</div>
                <div className="td-appt-sub">{t.tdApptSubMob}</div>
                <a href="tel:01300263332" className="td-phone">
                  <div className="td-phone-icon">📞</div>
                  <div><div className="td-phone-lbl">{t.tdFaridpurLabel}</div><div className="td-phone-num">01300-263332</div></div>
                </a>
                <a href="tel:01535165256" className="td-phone">
                  <div className="td-phone-icon">📞</div>
                  <div><div className="td-phone-lbl">{t.tdJhenaidahLabel}</div><div className="td-phone-num">01535-165256</div></div>
                </a>
                <Link
                  to="/"
                  onClick={handleAppointmentRedirect}
                  className="td-cta"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {t.tdApptCta}
                </Link>
              </div>
            </div>

            {/* Description */}
            {description && (
              <Reveal direction="up" delay={0}>
                <div className="td-sec-label"><span className="td-sec-text">{t.tdAboutProc}</span><div className="td-sec-line"/></div>
                <p className="td-desc">{description}</p>
              </Reveal>
            )}

            {/* Highlights */}
            {highlights?.length > 0 && (
              <Reveal direction="up" delay={80}>
                <div className="td-sec-label"><span className="td-sec-text">{t.tdKeyHighlights}</span><div className="td-sec-line"/></div>
                <div className="td-hl-grid">
                  {highlights.map((h, i) => (
                    <div className="td-hl-card" key={i}>
                      <div className="td-hl-icon">✦</div>
                      <div className="td-hl-text">{h}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Details table */}
            <Reveal direction="up" delay={140}>
              <div className="td-sec-label"><span className="td-sec-text">{t.tdProcDetails}</span><div className="td-sec-line"/></div>
              <div className="td-table">
                {treatment.category && (
                  <div className="td-row">
                    <div className="td-key">{t.tdKeyCategory}</div>
                    <div className="td-val">
                      <span style={{ background:colorSet.bg,color:colorSet.text,border:`1px solid ${colorSet.border}`,padding:"2px 10px",borderRadius:20,fontSize:".73rem",fontWeight:600 }}>
                        {t.treatCategoryLabels[treatment.category] || treatment.category}
                      </span>
                    </div>
                  </div>
                )}
                {duration && <div className="td-row"><div className="td-key">{t.tdKeyDuration}</div><div className="td-val">{duration}</div></div>}
                {recovery && <div className="td-row"><div className="td-key">{t.tdKeyRecovery}</div><div className="td-val">{recovery}</div></div>}
                <div className="td-row"><div className="td-key">{t.tdKeySurgeon}</div><div className="td-val">{t.tdSurgeonVal}</div></div>
                <div className="td-row"><div className="td-key">{t.tdKeyHospital}</div><div className="td-val">{t.tdHospitalVal}</div></div>
                <div className="td-row"><div className="td-key">{t.tdKeyApproach}</div><div className="td-val">{t.tdApproachVal}</div></div>
              </div>
            </Reveal>

          </div>

          {/* RIGHT SIDEBAR */}
          <Reveal direction="right" delay={100}>
            <div className="td-sidebar">

              {/* Doctor card */}
              <div className="td-doc-card">
                <div className="td-doc-head">
                  <img src="/dp.png" alt="Dr ASM Tanjilur Rahman" className="td-doc-avatar"/>
                  <div>
                    <div className="td-doc-name">{t.doctorPrefix} {t.doctorName}</div>
                    <div className="td-doc-creds">{t.tdDocCreds}</div>
                  </div>
                </div>
                <div className="td-doc-body">
                  <p className="td-doc-desc">{t.tdDocDesc}</p>
                  <Link to="/about" className="td-doc-link">{t.tdDocLink}</Link>
                </div>
              </div>

              {/* Appointment card (hidden on mobile — shown inline above) */}
              <div className="td-appt-card">
                <div className="td-appt-title">{t.tdApptTitle}</div>
                <div className="td-appt-sub">{t.tdApptSub}</div>
                <a href="tel:01300263332" className="td-phone">
                  <div className="td-phone-icon">📞</div>
                  <div><div className="td-phone-lbl">{t.tdFaridpurHotline}</div><div className="td-phone-num">01300-263332</div></div>
                </a>
                <a href="tel:01535165256" className="td-phone">
                  <div className="td-phone-icon">📞</div>
                  <div><div className="td-phone-lbl">{t.tdJhenaidahHotline}</div><div className="td-phone-num">01535-165256</div></div>
                </a>
                <Link
                  to="/"
                  onClick={handleAppointmentRedirect}
                  className="td-cta"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {t.tdApptCta}
                </Link>
              </div>

              {/* Schedule */}
              <div className="td-sched-card">
                <div className="td-sched-title">{t.apptVisitingHours}</div>
                <div className="td-sched-city">{t.tdFaridpurLabel}</div>
                <div className="td-sched-row"><span className="td-sched-days">{t.tdSchedRow1Days}</span><span className="td-sched-time">{t.tdSchedRow1Time}</span></div>
                <div className="td-sched-city">{t.tdJhenaidahLabel}</div>
                <div className="td-sched-row"><span className="td-sched-days">{t.tdSchedRow2Days}</span><span className="td-sched-time">{t.tdSchedRow2Time}</span></div>
                <div className="td-sched-row"><span className="td-sched-days">{t.tdSchedRow3Days}</span><span className="td-sched-time">{t.tdSchedRow3Time}</span></div>
              </div>

            </div>
          </Reveal>

        </div>

        {/* ── RELATED — NO wrapper reveal, each card reveals independently ── */}
        {related.length > 0 && (
          <div className="td-related-wrap">
            <div className="td-divider"/>
            <div className="td-related-hdr">
              <Reveal direction="up" delay={0}>
                <div className="td-related-title">{t.tdRelatedTitle} <span>{t.tdRelatedSpan}</span></div>
              </Reveal>
              <Link to="/" className="td-related-more">{t.tdRelatedMore}</Link>
            </div>
            <div className="td-related-grid">
              {related.map((t, i) => (
                <Reveal key={t._id || t.slug} direction="up" delay={i * 90}>
                  <RelatedCard treatment={t}/>
                </Reveal>
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  );
}
