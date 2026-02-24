import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axios from "axios";

const categoryColors = {
  Laparoscopic: { bg: "rgba(96,165,250,.15)",  text: "#93C5FD", border: "rgba(96,165,250,.3)" },
  Laser:        { bg: "rgba(201,169,110,.15)", text: "#C9A96E",  border: "rgba(201,169,110,.35)" },
  Cancer:       { bg: "rgba(248,113,113,.15)", text: "#FCA5A5",  border: "rgba(248,113,113,.3)" },
  General:      { bg: "rgba(52,211,153,.12)",  text: "#6EE7B7",  border: "rgba(52,211,153,.28)" },
};

/* ── Skeleton loader ── */
function Skeleton() {
  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", paddingTop: 100 }}>
      <style>{`
        @keyframes skPulse {
          0%,100%{opacity:.4} 50%{opacity:.8}
        }
        .sk-block { background:rgba(255,255,255,.07); border-radius:8px; animation:skPulse 1.6s ease-in-out infinite; }
      `}</style>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <div className="sk-block" style={{ height: 420, marginBottom: 40 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 40 }}>
          <div>
            <div className="sk-block" style={{ height: 28, width: "60%", marginBottom: 16 }} />
            <div className="sk-block" style={{ height: 16, marginBottom: 10 }} />
            <div className="sk-block" style={{ height: 16, marginBottom: 10 }} />
            <div className="sk-block" style={{ height: 16, width: "80%", marginBottom: 32 }} />
            <div className="sk-block" style={{ height: 120 }} />
          </div>
          <div className="sk-block" style={{ height: 300 }} />
        </div>
      </div>
    </div>
  );
}

/* ── Related treatment mini-card ── */
function RelatedCard({ treatment }) {
  const navigate = useNavigate();
  return (
    <>
      <style>{`
        .rel-card {
          cursor:pointer; border-radius:8px; overflow:hidden;
          border:1px solid rgba(201,169,110,.12); height:160px; position:relative;
          transition:border-color .3s,transform .3s,box-shadow .3s;
          background:#0F2040;
        }
        .rel-card:hover { border-color:rgba(201,169,110,.4); transform:translateY(-4px); box-shadow:0 12px 36px rgba(0,0,0,.4); }
        .rel-card img { width:100%; height:100%; object-fit:cover; transition:transform .5s; }
        .rel-card:hover img { transform:scale(1.07); }
        .rel-card-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(10,22,40,.95) 0%,rgba(10,22,40,.4) 100%); }
        .rel-card-top-line { position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,#C9A96E,transparent); transform:scaleX(0); transform-origin:left; transition:transform .4s; }
        .rel-card:hover .rel-card-top-line { transform:scaleX(1); }
        .rel-card-content { position:absolute; inset:0; padding:14px; display:flex; flex-direction:column; justify-content:flex-end; }
        .rel-card-cat { font-size:.6rem; letter-spacing:.1em; text-transform:uppercase; color:#C9A96E; margin-bottom:4px; font-family:'DM Sans',sans-serif; }
        .rel-card-title { font-family:'Cormorant Garamond',serif; font-size:.95rem; font-weight:600; color:#F8F5F0; line-height:1.3; }
      `}</style>
      <div className="rel-card" onClick={() => navigate(`/treatments/${treatment.slug}`)}>
        {treatment.image && <img src={treatment.image} alt={treatment.title} loading="lazy" />}
        <div className="rel-card-overlay" />
        <div className="rel-card-top-line" />
        <div className="rel-card-content">
          <div className="rel-card-cat">{treatment.category}</div>
          <div className="rel-card-title">{treatment.title}</div>
        </div>
      </div>
    </>
  );
}

/* ── Main page ── */
export default function TreatmentDetails() {
  const { slug }                    = useParams();
  const navigate                    = useNavigate();
  const [treatment, setTreatment]   = useState(null);
  const [related, setRelated]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [imgLoaded, setImgLoaded]   = useState(false);
  const [parallaxY, setParallaxY]   = useState(0);
  const heroRef                     = useRef(null);
  const contentRef                  = useRef(null);

  // Fetch treatment + all treatments (for related)
  useEffect(() => {
    setLoading(true);
    setImgLoaded(false);
    window.scrollTo({ top: 0, behavior: "instant" });

    Promise.all([
      axios.get(`http://localhost:5000/api/treatments/${slug}`),
      axios.get("http://localhost:5000/api/treatments"),
    ])
      .then(([detailRes, allRes]) => {
        setTreatment(detailRes.data);
        const all = Array.isArray(allRes.data) ? allRes.data : [];
        setRelated(
          all
            .filter(t => t.slug !== slug && t.category === detailRes.data.category)
            .slice(0, 3)
        );
      })
      .catch(() => setTreatment(null))
      .finally(() => setLoading(false));
  }, [slug]);

  // Scroll-reveal
  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-reveal]").forEach(el => {
              setTimeout(() => el.classList.add("td-revealed"), parseInt(el.dataset.delay || 0));
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [treatment]);

  // Hero parallax
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) setParallaxY(window.scrollY * 0.38);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) return <Skeleton />;
  if (!treatment) return (
    <div style={{ minHeight:"100vh", background:"#0A1628", display:"flex", alignItems:"center", justifyContent:"center", paddingTop:100 }}>
      <div style={{ textAlign:"center", color:"#F8F5F0", fontFamily:"'DM Sans',sans-serif" }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"4rem", color:"#C9A96E", lineHeight:1 }}>404</div>
        <div style={{ fontSize:"1.1rem", marginBottom:24, color:"rgba(248,245,240,.6)" }}>Treatment not found</div>
        <button onClick={() => navigate("/")} style={{ background:"linear-gradient(135deg,#C9A96E,#A87C40)", color:"#0A1628", border:"none", padding:"11px 28px", borderRadius:4, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>← Back to Home</button>
      </div>
    </div>
  );

  const colorSet = categoryColors[treatment.category] || categoryColors.General;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Reveal system ── */
        [data-reveal="up"]    { opacity:0; transform:translateY(36px); transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1); }
        [data-reveal="left"]  { opacity:0; transform:translateX(-36px); transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1); }
        [data-reveal="right"] { opacity:0; transform:translateX(36px);  transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1); }
        [data-reveal="scale"] { opacity:0; transform:scale(.93);         transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1); }
        .td-revealed          { opacity:1!important; transform:none!important; }

        .td-page {
          background: #0A1628;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        /* ── HERO ── */
        .td-hero {
          position: relative;
          height: clamp(420px, 58vh, 680px);
          overflow: hidden;
        }
        .td-hero-img {
          width: 100%; height: 130%;
          object-fit: cover; object-position: center;
          display: block;
          opacity: 0; transition: opacity .8s ease;
        }
        .td-hero-img.loaded { opacity: 1; }

        /* Fallback gradient when no image */
        .td-hero-bg-fallback {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #0F2040 0%, #1a3a5e 100%);
        }

        /* Multi-layer overlay */
        .td-hero-overlay-1 {
          position: absolute; inset: 0;
          background: linear-gradient(160deg, rgba(10,22,40,.75) 0%, rgba(10,22,40,.4) 50%, rgba(10,22,40,.25) 100%);
        }
        .td-hero-overlay-2 {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,22,40,1) 0%, rgba(10,22,40,.6) 30%, transparent 70%);
        }

        /* Animated dot grid on hero */
        .td-hero::after {
          content:''; position:absolute; inset:0;
          background-image:radial-gradient(rgba(201,169,110,.06) 1px,transparent 1px);
          background-size:30px 30px; pointer-events:none;
          animation:tdGridDrift 20s linear infinite;
        }
        @keyframes tdGridDrift { to { background-position:30px 30px; } }

        /* Decorative corner brackets */
        .td-corner {
          position: absolute; width: 48px; height: 48px;
          pointer-events: none; opacity: .5;
        }
        .td-corner.tl { top:24px; left:24px; border-top:1.5px solid #C9A96E; border-left:1.5px solid #C9A96E; }
        .td-corner.br { bottom:24px; right:24px; border-bottom:1.5px solid #C9A96E; border-right:1.5px solid #C9A96E; }

        /* Hero content */
        .td-hero-content {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          justify-content: flex-end;
          padding: clamp(24px,5vw,64px);
          z-index: 5;
        }

        /* Breadcrumb */
        .td-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: .72rem; letter-spacing: .05em;
          color: rgba(248,245,240,.5);
          margin-bottom: 20px; flex-wrap: wrap;
        }
        .td-breadcrumb a { color: rgba(248,245,240,.5); text-decoration:none; transition:color .2s; }
        .td-breadcrumb a:hover { color: #C9A96E; }
        .td-breadcrumb-sep { color: rgba(201,169,110,.4); }

        .td-hero-cat {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: .7rem; letter-spacing: .1em; text-transform: uppercase;
          font-weight: 600; padding: 4px 14px; border-radius: 20px;
          margin-bottom: 14px; font-family: 'DM Sans', sans-serif;
          animation: fadeUp .6s ease both;
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }

        .td-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 6vw, 4.5rem);
          font-weight: 700; color: #F8F5F0; line-height: 1.05;
          margin-bottom: 14px; max-width: 740px;
          animation: fadeUp .7s ease .1s both;
        }
        .td-hero-short {
          font-size: clamp(.85rem,1.5vw,1rem);
          color: rgba(248,245,240,.65); max-width: 560px;
          line-height: 1.7;
          animation: fadeUp .7s ease .2s both;
        }

        /* ── Quick stats strip ── */
        .td-stats-strip {
          background: #0F2040;
          border-top: 1px solid rgba(201,169,110,.12);
          border-bottom: 1px solid rgba(201,169,110,.12);
        }
        .td-stats-inner {
          max-width: 1100px; margin: 0 auto;
          padding: 0 24px;
          display: flex; align-items: stretch;
        }
        .td-stat {
          flex: 1; padding: 20px 24px;
          border-right: 1px solid rgba(201,169,110,.1);
          transition: background .25s;
        }
        .td-stat:last-child { border-right: none; }
        .td-stat:hover { background: rgba(201,169,110,.04); }
        .td-stat-label {
          font-size: .65rem; letter-spacing: .12em; text-transform: uppercase;
          color: rgba(201,169,110,.55); margin-bottom: 4px;
        }
        .td-stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem; font-weight: 700; color: #F8F5F0; line-height: 1;
        }
        @media(max-width:600px) {
          .td-stats-inner { flex-wrap: wrap; }
          .td-stat { min-width: 50%; border-bottom: 1px solid rgba(201,169,110,.1); }
          .td-stat:nth-child(2n) { border-right: none; }
        }

        /* ── Content area ── */
        .td-content-area {
          max-width: 1100px; margin: 0 auto;
          padding: 64px 24px;
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 48px;
          align-items: start;
        }
        @media(max-width:900px) { .td-content-area { grid-template-columns: 1fr; gap: 40px; } }

        /* ── LEFT: Main content ── */
        .td-section-label {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 18px;
        }
        .td-section-line { flex:1; height:1px; background:linear-gradient(90deg,rgba(201,169,110,.3),transparent); }
        .td-section-text { font-size:.68rem; letter-spacing:.14em; text-transform:uppercase; color:rgba(201,169,110,.6); white-space:nowrap; }

        .td-description {
          font-size: .96rem; color: rgba(248,245,240,.7);
          line-height: 1.9; margin-bottom: 40px;
        }

        /* Highlights */
        .td-highlights { margin-bottom: 40px; }
        .td-highlights-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px; margin-top: 16px;
        }
        .td-highlight-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(201,169,110,.15);
          border-radius: 8px; padding: 16px 18px;
          display: flex; align-items: center; gap: 12px;
          transition: border-color .3s, background .3s, transform .3s;
          position: relative; overflow: hidden;
        }
        .td-highlight-card::before {
          content:''; position:absolute; left:0; top:0; bottom:0;
          width:3px; background:linear-gradient(180deg,#C9A96E,transparent);
          opacity:0; transition:opacity .3s;
        }
        .td-highlight-card:hover { border-color:rgba(201,169,110,.35); background:rgba(201,169,110,.04); transform:translateX(4px); }
        .td-highlight-card:hover::before { opacity:1; }
        .td-highlight-icon {
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid rgba(201,169,110,.25);
          background: rgba(201,169,110,.08);
          display: flex; align-items: center; justify-content: center;
          color: #C9A96E; font-size: .75rem; flex-shrink: 0;
          transition: background .3s;
        }
        .td-highlight-card:hover .td-highlight-icon { background: rgba(201,169,110,.16); }
        .td-highlight-text { font-size: .84rem; color: rgba(248,245,240,.8); font-weight: 500; }

        /* Info table */
        .td-info-table { border: 1px solid rgba(201,169,110,.15); border-radius:8px; overflow:hidden; margin-bottom:40px; }
        .td-info-row {
          display: flex; align-items: center;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(201,169,110,.08);
          transition: background .2s;
        }
        .td-info-row:last-child { border-bottom: none; }
        .td-info-row:hover { background: rgba(201,169,110,.04); }
        .td-info-key { width: 160px; font-size: .72rem; letter-spacing:.08em; text-transform:uppercase; color:rgba(201,169,110,.6); flex-shrink:0; }
        .td-info-val { font-size: .88rem; color: rgba(248,245,240,.8); font-weight:500; }

        /* ── RIGHT sidebar ── */
        .td-sidebar { display: flex; flex-direction: column; gap: 20px; }

        /* Doctor card */
        .td-doc-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(201,169,110,.18); border-radius:10px; overflow:hidden;
          transition: border-color .3s, box-shadow .3s;
        }
        .td-doc-card:hover { border-color:rgba(201,169,110,.35); box-shadow:0 8px 32px rgba(0,0,0,.3); }
        .td-doc-card-header {
          background: linear-gradient(135deg, rgba(201,169,110,.12), rgba(201,169,110,.05));
          border-bottom: 1px solid rgba(201,169,110,.12); padding:18px;
          display: flex; align-items: center; gap: 14px;
        }
        .td-doc-avatar {
          width: 56px; height: 56px; border-radius: 50%;
          object-fit: cover; object-position: top;
          border: 2px solid rgba(201,169,110,.35);
          box-shadow: 0 4px 16px rgba(0,0,0,.3); flex-shrink:0;
        }
        .td-doc-name { font-family:'Cormorant Garamond',serif; font-size:1rem; font-weight:700; color:#F8F5F0; line-height:1.2; margin-bottom:3px; }
        .td-doc-creds { font-size:.68rem; letter-spacing:.04em; color:rgba(201,169,110,.7); }
        .td-doc-body { padding:18px; }
        .td-doc-desc { font-size:.8rem; color:rgba(248,245,240,.55); line-height:1.65; margin-bottom:14px; }

        /* Book appointment card */
        .td-appt-card {
          background: linear-gradient(160deg, #0F2040 0%, #162947 100%);
          border: 1px solid rgba(201,169,110,.22); border-radius:10px; padding:22px;
          position: relative; overflow: hidden;
        }
        /* Animated gold glow */
        .td-appt-card::before {
          content:''; position:absolute; top:-40px; right:-40px;
          width:140px; height:140px; border-radius:50%;
          background:radial-gradient(circle,rgba(201,169,110,.12) 0%,transparent 70%);
          animation:apptGlow 4s ease-in-out infinite;
        }
        @keyframes apptGlow {
          0%,100%{transform:scale(1);opacity:.6}
          50%    {transform:scale(1.3);opacity:1}
        }
        .td-appt-title {
          font-family:'Cormorant Garamond',serif;
          font-size:1.2rem; font-weight:700; color:#F8F5F0; margin-bottom:6px;
        }
        .td-appt-sub { font-size:.78rem; color:rgba(248,245,240,.5); line-height:1.6; margin-bottom:18px; }

        /* Phone buttons */
        .td-phone-btn {
          display: flex; align-items: center; gap: 12px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(201,169,110,.15);
          border-radius: 7px; padding: 11px 14px;
          text-decoration: none; margin-bottom: 8px;
          transition: border-color .25s, background .25s, transform .25s;
          position: relative; overflow: hidden;
        }
        .td-phone-btn:hover { border-color:#C9A96E; background:rgba(201,169,110,.07); transform:translateX(3px); }
        .td-phone-icon {
          width: 34px; height: 34px; border-radius: 50%; flex-shrink:0;
          background: linear-gradient(135deg,#C9A96E,#A87C40);
          display: flex; align-items: center; justify-content: center;
          font-size: .8rem;
          animation: phoneRing 3s ease-in-out infinite;
        }
        @keyframes phoneRing {
          0%,90%,100%{transform:rotate(0)} 92%{transform:rotate(-12deg)} 94%{transform:rotate(12deg)} 96%{transform:rotate(-8deg)} 98%{transform:rotate(8deg)}
        }
        .td-phone-label { font-size:.65rem; letter-spacing:.07em; text-transform:uppercase; color:rgba(201,169,110,.55); margin-bottom:1px; }
        .td-phone-number { font-size:.92rem; font-weight:600; color:#C9A96E; }

        /* Primary CTA */
        .td-cta-btn {
          display: flex; align-items: center; justify-content:center; gap:10px;
          width: 100%;
          background: linear-gradient(135deg,#C9A96E,#A87C40);
          color: #0A1628; font-family:'DM Sans',sans-serif;
          font-weight:700; font-size:.85rem; letter-spacing:.05em;
          padding:13px; border-radius:5px; border:none;
          cursor:pointer; text-decoration:none; margin-top:14px;
          position:relative; overflow:hidden;
          transition:filter .25s,transform .25s,box-shadow .25s;
          box-shadow:0 4px 20px rgba(201,169,110,.3);
        }
        .td-cta-btn::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);
          background-size:200% 100%;
          animation:tdBtnShine 2.5s linear infinite;
        }
        @keyframes tdBtnShine { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .td-cta-btn:hover { filter:brightness(1.1); transform:translateY(-2px); box-shadow:0 8px 28px rgba(201,169,110,.45); }

        /* Schedule card */
        .td-schedule-card {
          background:rgba(255,255,255,.03);
          border:1px solid rgba(201,169,110,.15); border-radius:10px; padding:20px;
        }
        .td-schedule-title { font-family:'Cormorant Garamond',serif; font-size:1rem; font-weight:600; color:#F8F5F0; margin-bottom:14px; }
        .td-schedule-row {
          display:flex; justify-content:space-between; align-items:center;
          padding:8px 0; border-bottom:1px solid rgba(201,169,110,.07); gap:8px;
        }
        .td-schedule-row:last-child { border-bottom:none; }
        .td-schedule-days { font-size:.78rem; color:rgba(248,245,240,.6); }
        .td-schedule-time { font-size:.78rem; font-weight:600; color:#C9A96E; white-space:nowrap; }
        .td-schedule-location { font-size:.68rem; color:rgba(248,245,240,.35); }

        /* ── Related treatments ── */
        .td-related { max-width:1100px; margin:0 auto; padding:0 24px 80px; }
        .td-related-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:28px; flex-wrap:wrap; gap:12px; }
        .td-related-title { font-family:'Cormorant Garamond',serif; font-size:clamp(1.4rem,3vw,2rem); font-weight:700; color:#F8F5F0; }
        .td-related-title span { background:linear-gradient(90deg,#C9A96E,#E8D5A3); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .td-related-link { font-size:.8rem; color:rgba(201,169,110,.7); text-decoration:none; display:flex; align-items:center; gap:6px; transition:color .2s,gap .2s; }
        .td-related-link:hover { color:#C9A96E; gap:10px; }
        .td-related-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        @media(max-width:700px) { .td-related-grid { grid-template-columns:1fr 1fr; } }
        @media(max-width:460px) { .td-related-grid { grid-template-columns:1fr; } }

        /* ── Back button ── */
        .td-back-btn {
          display:inline-flex; align-items:center; gap:8px;
          font-size:.78rem; letter-spacing:.06em; text-transform:uppercase;
          color:rgba(248,245,240,.5); text-decoration:none;
          padding:6px 0; transition:color .2s,gap .2s;
          margin-bottom:16px;
        }
        .td-back-btn:hover { color:#C9A96E; gap:12px; }

        /* Divider */
        .td-gold-divider {
          height:1px;
          background:linear-gradient(90deg,transparent,rgba(201,169,110,.25),transparent);
          margin:0 0 48px;
        }

        @media(max-width:600px) {
          .td-corner { display:none; }
          .td-hero-content { padding:20px; }
        }
      `}</style>

      <div className="td-page">

        {/* ── HERO ── */}
        <div className="td-hero" ref={heroRef}>
          {!treatment.image && <div className="td-hero-bg-fallback" />}
          {treatment.image && (
            <img
              src={treatment.image}
              alt={treatment.title}
              className={`td-hero-img ${imgLoaded ? "loaded" : ""}`}
              style={{ transform: `translateY(${parallaxY}px)` }}
              onLoad={() => setImgLoaded(true)}
            />
          )}
          <div className="td-hero-overlay-1" />
          <div className="td-hero-overlay-2" />
          <div className="td-corner tl" />
          <div className="td-corner br" />

          <div className="td-hero-content">
            {/* Breadcrumb */}
            <div className="td-breadcrumb">
              <Link to="/">Home</Link>
              <span className="td-breadcrumb-sep">›</span>
              <Link to="/#treatments">Treatments</Link>
              <span className="td-breadcrumb-sep">›</span>
              <span style={{ color:"rgba(201,169,110,.8)" }}>{treatment.title}</span>
            </div>

            {/* Category badge */}
            <div
              className="td-hero-cat"
              style={{ background: colorSet.bg, color: colorSet.text, border:`1px solid ${colorSet.border}` }}
            >
              <span style={{ width:5,height:5,borderRadius:"50%",background:colorSet.text,flexShrink:0 }}/>
              {treatment.category} Surgery
            </div>

            <h1 className="td-hero-title">{treatment.title}</h1>
            {treatment.shortDesc && (
              <p className="td-hero-short">{treatment.shortDesc}</p>
            )}
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        {(treatment.duration || treatment.recovery || treatment.category) && (
          <div className="td-stats-strip">
            <div className="td-stats-inner">
              {treatment.duration && (
                <div className="td-stat">
                  <div className="td-stat-label">Procedure Duration</div>
                  <div className="td-stat-value">{treatment.duration}</div>
                </div>
              )}
              {treatment.recovery && (
                <div className="td-stat">
                  <div className="td-stat-label">Recovery Time</div>
                  <div className="td-stat-value">{treatment.recovery}</div>
                </div>
              )}
              <div className="td-stat">
                <div className="td-stat-label">Specialisation</div>
                <div className="td-stat-value">{treatment.category}</div>
              </div>
              <div className="td-stat">
                <div className="td-stat-label">Performed By</div>
                <div className="td-stat-value" style={{ fontSize:".95rem" }}>Dr. ASM Tanjilur Rahman</div>
              </div>
            </div>
          </div>
        )}

        {/* ── MAIN CONTENT ── */}
        <div className="td-content-area" ref={contentRef}>

          {/* Left column */}
          <div>
            {/* About this procedure */}
            {treatment.description && (
              <div data-reveal="up" data-delay="0">
                <div className="td-section-label">
                  <span className="td-section-text">About This Procedure</span>
                  <div className="td-section-line" />
                </div>
                <p className="td-description">{treatment.description}</p>
              </div>
            )}

            {/* Highlights */}
            {treatment.highlights && treatment.highlights.length > 0 && (
              <div className="td-highlights" data-reveal="up" data-delay="100">
                <div className="td-section-label">
                  <span className="td-section-text">Key Highlights</span>
                  <div className="td-section-line" />
                </div>
                <div className="td-highlights-grid">
                  {treatment.highlights.map((h, i) => (
                    <div className="td-highlight-card" key={i}>
                      <div className="td-highlight-icon">✦</div>
                      <div className="td-highlight-text">{h}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Procedure details table */}
            <div data-reveal="up" data-delay="180">
              <div className="td-section-label">
                <span className="td-section-text">Procedure Details</span>
                <div className="td-section-line" />
              </div>
              <div className="td-info-table">
                {treatment.category && (
                  <div className="td-info-row">
                    <div className="td-info-key">Category</div>
                    <div className="td-info-val">
                      <span style={{ background:colorSet.bg, color:colorSet.text, border:`1px solid ${colorSet.border}`, padding:"2px 10px", borderRadius:20, fontSize:".75rem", fontWeight:600 }}>
                        {treatment.category}
                      </span>
                    </div>
                  </div>
                )}
                {treatment.duration && (
                  <div className="td-info-row">
                    <div className="td-info-key">Duration</div>
                    <div className="td-info-val">{treatment.duration}</div>
                  </div>
                )}
                {treatment.recovery && (
                  <div className="td-info-row">
                    <div className="td-info-key">Recovery</div>
                    <div className="td-info-val">{treatment.recovery}</div>
                  </div>
                )}
                <div className="td-info-row">
                  <div className="td-info-key">Surgeon</div>
                  <div className="td-info-val">Dr. ASM Tanjilur Rahman, FCPS, FMAS</div>
                </div>
                <div className="td-info-row">
                  <div className="td-info-key">Hospital</div>
                  <div className="td-info-val">Faridpur Apollo Specialized Hospital & Islami Bank Community Hospital</div>
                </div>
                <div className="td-info-row">
                  <div className="td-info-key">Approach</div>
                  <div className="td-info-val">Minimally Invasive / Patient-Centred Care</div>
                </div>
              </div>
            </div>

            {/* Mobile: Appointment CTA (only shows on mobile) */}
            <div data-reveal="up" data-delay="240" style={{ display:"none" }} className="td-mobile-appt">
              <div className="td-section-label">
                <span className="td-section-text">Book Appointment</span>
                <div className="td-section-line" />
              </div>
              <div className="td-appt-card">
                <div className="td-appt-title">Ready to Consult?</div>
                <div className="td-appt-sub">Call us directly to book your appointment with Dr. ASM Tanjilur Rahman.</div>
                <a href="tel:01300263332" className="td-phone-btn">
                  <div className="td-phone-icon">📞</div>
                  <div><div className="td-phone-label">Faridpur</div><div className="td-phone-number">01300-263332</div></div>
                </a>
                <a href="tel:01535165256" className="td-phone-btn">
                  <div className="td-phone-icon">📞</div>
                  <div><div className="td-phone-label">Jhenaidah</div><div className="td-phone-number">01535-165256</div></div>
                </a>
                <Link to="/#appointment" className="td-cta-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  View All Appointment Info
                </Link>
              </div>
            </div>

          </div>

          {/* Right sidebar */}
          <div className="td-sidebar" data-reveal="right" data-delay="120">

            {/* Doctor card */}
            <div className="td-doc-card">
              <div className="td-doc-card-header">
                <img src="/dp.png" alt="Dr ASM Tanjilur Rahman" className="td-doc-avatar" />
                <div>
                  <div className="td-doc-name">Dr. ASM Tanjilur Rahman</div>
                  <div className="td-doc-creds">FCPS · FMAS · Fellowship GEM, India</div>
                </div>
              </div>
              <div className="td-doc-body">
                <p className="td-doc-desc">
                  Specialist in Laser, Advanced Laparoscopic and Cancer Surgery. Asst. Professor, Faridpur Medical College.
                </p>
                <Link to="/about" style={{ fontSize:".78rem", color:"#C9A96E", textDecoration:"none", display:"flex", alignItems:"center", gap:6, transition:"gap .2s" }}
                  onMouseEnter={e=>e.currentTarget.style.gap="10px"}
                  onMouseLeave={e=>e.currentTarget.style.gap="6px"}>
                  View Full Profile →
                </Link>
              </div>
            </div>

            {/* Appointment card */}
            <div className="td-appt-card">
              <div className="td-appt-title">Book an Appointment</div>
              <div className="td-appt-sub">Call directly to schedule your consultation. Fast response & priority scheduling available.</div>

              <a href="tel:01300263332" className="td-phone-btn">
                <div className="td-phone-icon">📞</div>
                <div>
                  <div className="td-phone-label">Faridpur Hotline</div>
                  <div className="td-phone-number">01300-263332</div>
                </div>
              </a>
              <a href="tel:01535165256" className="td-phone-btn">
                <div className="td-phone-icon">📞</div>
                <div>
                  <div className="td-phone-label">Jhenaidah Hotline</div>
                  <div className="td-phone-number">01535-165256</div>
                </div>
              </a>

              <Link to="/#appointment" className="td-cta-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                View All Appointment Info
              </Link>
            </div>

            {/* Visiting hours */}
            <div className="td-schedule-card">
              <div className="td-schedule-title">Visiting Hours</div>

              <div style={{ marginBottom:10 }}>
                <div style={{ fontSize:".7rem", letterSpacing:".08em", textTransform:"uppercase", color:"rgba(201,169,110,.5)", marginBottom:6 }}>Faridpur</div>
                <div className="td-schedule-row">
                  <span className="td-schedule-days">Sat – Wed</span>
                  <span className="td-schedule-time">4:00 – 8:00 PM</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize:".7rem", letterSpacing:".08em", textTransform:"uppercase", color:"rgba(201,169,110,.5)", marginBottom:6 }}>Jhenaidah</div>
                <div className="td-schedule-row">
                  <span className="td-schedule-days">Thursday</span>
                  <span className="td-schedule-time">4:00 – 8:00 PM</span>
                </div>
                <div className="td-schedule-row">
                  <span className="td-schedule-days">Friday</span>
                  <span className="td-schedule-time">9:00 AM – 12:30 PM</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Related treatments ── */}
        {related.length > 0 && (
          <div className="td-related" data-reveal="up" data-delay="0">
            <div className="td-gold-divider" />
            <div className="td-related-header">
              <div className="td-related-title">
                Related <span>Treatments</span>
              </div>
              <Link to="/" className="td-related-link">
                View all treatments →
              </Link>
            </div>
            <div className="td-related-grid">
              {related.map(t => <RelatedCard key={t._id || t.slug} treatment={t} />)}
            </div>
          </div>
        )}

      </div>

      {/* Mobile appt display fix */}
      <style>{`
        @media(max-width:900px) {
          .td-mobile-appt { display:block!important; }
          .td-sidebar .td-appt-card { display:none; }
        }
      `}</style>
    </>
  );
}
