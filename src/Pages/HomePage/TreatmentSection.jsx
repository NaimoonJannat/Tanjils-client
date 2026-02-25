import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import TreatmentCard from "./TreatmentCard";

const stats = [
  { num: 5000, suffix: "+", label: "Surgeries Performed" },
  { num: 98,   suffix: "%", label: "Success Rate" },
  { num: 15,   suffix: "+", label: "Years Experience" },
  { num: 3,    suffix: "",  label: "Specializations" },
];

function useCountUp(target, active, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

function StatCounter({ num, suffix, label, active }) {
  const val = useCountUp(num, active);
  return (
    <div className="treatment-stat">
      <div className="treatment-stat-num">{val}{suffix}</div>
      <div className="treatment-stat-label">{label}</div>
    </div>
  );
}

const TreatmentSection = () => {
  const [treatments, setTreatments]   = useState([]);
  const [loading, setLoading]         = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [statsActive, setStatsActive] = useState(false);
  const sectionRef = useRef(null);
  const statsRef   = useRef(null);

  const categories = ["All", "Laparoscopic", "Laser", "Cancer", "General"];

  useEffect(() => {
    axios.get("http://localhost:5000/api/treatments")
      .then(res => setTreatments(Array.isArray(res.data) ? res.data : []))
      .catch(() => setTreatments([]))
      .finally(() => setLoading(false));
  }, []);

  // Scroll-reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-reveal]").forEach(el => {
              setTimeout(() => el.classList.add("revealed"), parseInt(el.dataset.delay || 0));
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Stats counter trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsActive(true); },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = activeFilter === "All"
    ? treatments
    : treatments.filter(t => t.category === activeFilter);

  return (
    <>
      <style>{`
        [data-reveal="up"]   { opacity:0; transform:translateY(40px); transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1); }
        [data-reveal="scale"]{ opacity:0; transform:scale(.9);         transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1); }
        [data-reveal].revealed { opacity:1!important; transform:none!important; }

        .treatment-section {
          background:#0A1628; position:relative;
          overflow:hidden; padding:100px 24px;
          font-family:'DM Sans',sans-serif;
        }
        .treatment-section::before {
          content:''; position:absolute; inset:0;
          background-image:radial-gradient(rgba(201,169,110,.05) 1px,transparent 1px);
          background-size:32px 32px; pointer-events:none;
          animation:tGridDrift 22s linear infinite;
        }
        @keyframes tGridDrift { to { background-position:32px 32px; } }

        .treat-blob {
          position:absolute; border-radius:50%; pointer-events:none;
          animation:blobP 10s ease-in-out infinite;
        }
        @keyframes blobP {
          0%,100%{transform:scale(1);opacity:.5}
          50%    {transform:scale(1.2);opacity:.8}
        }

        .treat-particle { position:absolute; border-radius:50%; pointer-events:none; animation:tParticle linear infinite; }
        @keyframes tParticle {
          0%  { transform:translateY(0); opacity:0; }
          10% { opacity:.8; }
          90% { opacity:.2; }
          100%{ transform:translateY(-130px); opacity:0; }
        }

        .treatment-inner { max-width:1180px; margin:0 auto; position:relative; }

        .treatment-header { text-align:center; margin-bottom:48px; }
        .treatment-tag { display:inline-flex; align-items:center; gap:8px; background:rgba(201,169,110,.1); border:1px solid rgba(201,169,110,.28); border-radius:20px; padding:5px 16px; margin-bottom:20px; }
        .treatment-tag-dot { width:5px; height:5px; border-radius:50%; background:#C9A96E; animation:tdotPulse 2s ease-in-out infinite; }
        @keyframes tdotPulse {
          0%,100%{box-shadow:0 0 0 0 rgba(201,169,110,.5)}
          50%    {box-shadow:0 0 0 6px rgba(201,169,110,0)}
        }
        .treatment-tag-text { font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; color:#C9A96E; }
        .treatment-h2 { font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,5vw,3.4rem); font-weight:700; color:#F8F5F0; line-height:1.1; margin-bottom:14px; }
        .treatment-h2 span {
          background:linear-gradient(90deg,#C9A96E,#E8D5A3,#C9A96E); background-size:200%;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation:tShimmer 3s linear infinite;
        }
        @keyframes tShimmer { to { background-position:200% center; } }
        .treatment-subtitle { font-size:.93rem; color:rgba(248,245,240,.5); max-width:500px; margin:0 auto; line-height:1.7; }

        /* Filters */
        .filter-row { display:flex; justify-content:center; flex-wrap:wrap; gap:8px; margin-bottom:48px; }
        .filter-btn {
          padding:7px 20px; font-size:.78rem; font-weight:500; letter-spacing:.06em;
          text-transform:uppercase; border-radius:3px; border:1px solid rgba(201,169,110,.2);
          background:transparent; color:rgba(248,245,240,.5); cursor:pointer;
          font-family:'DM Sans',sans-serif; transition:all .25s; position:relative; overflow:hidden;
        }
        .filter-btn::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(201,169,110,.1),transparent); background-size:200% 100%; opacity:0; transition:opacity .25s; }
        .filter-btn:hover { border-color:rgba(201,169,110,.5); color:rgba(248,245,240,.85); }
        .filter-btn:hover::after { opacity:1; animation:filterShine 1s ease-in-out; }
        @keyframes filterShine { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .filter-btn.active {
          background:linear-gradient(135deg,#C9A96E,#A87C40);
          border-color:transparent; color:#0A1628; font-weight:600;
          box-shadow:0 4px 16px rgba(201,169,110,.3);
        }

        /* Grid */
        .treatment-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:18px; }
        @media(max-width:1024px) { .treatment-grid { grid-template-columns:repeat(3,1fr); } }
        @media(max-width:768px)  { .treatment-grid { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:480px)  { .treatment-grid { grid-template-columns:1fr; } }

        /* Skeleton */
        .skeleton-card { height:260px; border-radius:8px; background:linear-gradient(90deg,rgba(255,255,255,.04) 25%,rgba(255,255,255,.08) 50%,rgba(255,255,255,.04) 75%); background-size:200% 100%; animation:skSh 1.5s infinite; }
        @keyframes skSh { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

        /* Stats */
        .treatment-stats { display:flex; justify-content:center; gap:0; margin-top:64px; border:1px solid rgba(201,169,110,.15); border-radius:8px; overflow:hidden; }
        @media(max-width:600px) { .treatment-stats { flex-direction:column; } }
        .treatment-stat { flex:1; padding:24px 16px; text-align:center; border-right:1px solid rgba(201,169,110,.1); background:rgba(255,255,255,.02); transition:background .25s,transform .25s; }
        .treatment-stat:last-child { border-right:none; }
        .treatment-stat:hover { background:rgba(201,169,110,.06); transform:translateY(-3px); }
        .treatment-stat-num { font-family:'Cormorant Garamond',serif; font-size:2.2rem; font-weight:700; color:#C9A96E; line-height:1; margin-bottom:4px; }
        .treatment-stat-label { font-size:.7rem; letter-spacing:.1em; text-transform:uppercase; color:rgba(248,245,240,.4); }
      `}</style>

      <section id="treatments" className="treatment-section" ref={sectionRef}>
        <div className="treat-blob" style={{width:400,height:400,top:-100,right:-100,background:"radial-gradient(circle,rgba(201,169,110,.06) 0%,transparent 70%)"}}/>
        <div className="treat-blob" style={{width:300,height:300,bottom:-80,left:-60,background:"radial-gradient(circle,rgba(201,169,110,.04) 0%,transparent 70%)",animationDelay:"5s"}}/>
        {[...Array(8)].map((_,i)=>(
          <div key={i} className="treat-particle" style={{
            width:`${3+(i%3)*3}px`,height:`${3+(i%3)*3}px`,
            background:`rgba(201,169,110,${.1+(i%4)*.06})`,
            left:`${6+i*11}%`,bottom:`${6+(i%5)*11}%`,
            animationDuration:`${7+i*1.3}s`,animationDelay:`${i*.9}s`,
          }}/>
        ))}

        <div className="treatment-inner">
          <div className="treatment-header" data-reveal="up" data-delay="0">
            <div className="treatment-tag"><div className="treatment-tag-dot"/><span className="treatment-tag-text">Centre of Excellence</span></div>
            <h2 className="treatment-h2">Expert Surgical <span>Treatments</span></h2>
            <p className="treatment-subtitle">Comprehensive surgical care across laparoscopic, laser, cancer, and general surgery.</p>
          </div>

          <div className="filter-row" data-reveal="up" data-delay="150">
            {categories.map(cat=>(
              <button key={cat} className={`filter-btn ${activeFilter===cat?"active":""}`} onClick={()=>setActiveFilter(cat)}>{cat}</button>
            ))}
          </div>

          {loading ? (
            <div className="treatment-grid">
              {Array(8).fill(0).map((_,i)=><div className="skeleton-card" key={i}/>)}
            </div>
          ) : (
            <div className="treatment-grid">
              {filtered.map((treatment, i)=>(
                <div key={treatment._id} data-reveal="scale" data-delay={i * 70} style={{transition:`opacity .6s ${i*0.07}s cubic-bezier(.22,1,.36,1),transform .6s ${i*0.07}s cubic-bezier(.22,1,.36,1)`}}>
                  <TreatmentCard treatment={treatment}/>
                </div>
              ))}
            </div>
          )}

          <div className="treatment-stats" ref={statsRef}>
            {stats.map(s=>(
              <StatCounter key={s.label} {...s} active={statsActive}/>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TreatmentSection;
