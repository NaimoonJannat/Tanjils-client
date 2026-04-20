import React, { useRef } from "react";
import { useNavigate } from "react-router";
import { useLanguage } from "../../Context/LanguageContext";
import translations from "../../i18n/translations";

const categoryColors = {
  Laparoscopic: { bg:"rgba(96,165,250,.15)",  text:"#93C5FD", border:"rgba(96,165,250,.25)" },
  Laser:        { bg:"rgba(201,169,110,.12)", text:"#C9A96E",  border:"rgba(201,169,110,.3)" },
  Cancer:       { bg:"rgba(248,113,113,.12)", text:"#FCA5A5",  border:"rgba(248,113,113,.22)" },
  General:      { bg:"rgba(52,211,153,.1)",   text:"#6EE7B7",  border:"rgba(52,211,153,.22)" },
};

const TreatmentCard = ({ treatment }) => {
  const navigate = useNavigate();
  const cardRef  = useRef(null);
  const { lang } = useLanguage();
  const t        = translations[lang];
  const colorSet = categoryColors[treatment.category] || categoryColors.General;
  const categoryLabel = t.treatCategoryLabels[treatment.category] || treatment.category;
  const title     = treatment.title[lang]     ?? treatment.title.en;
  const shortDesc = treatment.shortDesc[lang] ?? treatment.shortDesc.en;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.setProperty("--mx", `${x}%`);
    card.style.setProperty("--my", `${y}%`);
  };

  return (
    <>
      <style>{`
        .treat-card {
          position:relative; cursor:pointer;
          overflow:hidden; border-radius:8px;
          border:1px solid rgba(201,169,110,.12);
          background:#0F2040; height:260px;
          transition:border-color .35s, box-shadow .35s, transform .35s;
          --mx:50%; --my:50%;
        }
        .treat-card:hover {
          border-color:rgba(201,169,110,.45);
          box-shadow:0 16px 56px rgba(0,0,0,.55);
          transform:translateY(-5px) scale(1.01);
        }
        /* Mouse-follow spotlight */
        .treat-card::before {
          content:''; position:absolute; inset:0;
          background:radial-gradient(circle 100px at var(--mx) var(--my), rgba(201,169,110,.12), transparent 70%);
          opacity:0; transition:opacity .3s; pointer-events:none; z-index:2;
        }
        .treat-card:hover::before { opacity:1; }

        .treat-img {
          width:100%; height:100%; object-fit:cover;
          transition:transform .6s cubic-bezier(.22,1,.36,1);
        }
        .treat-card:hover .treat-img { transform:scale(1.1); }

        .treat-overlay {
          position:absolute; inset:0;
          background:linear-gradient(to top,rgba(10,22,40,.96) 0%,rgba(10,22,40,.55) 55%,rgba(10,22,40,.12) 100%);
          transition:background .35s;
        }
        .treat-card:hover .treat-overlay {
          background:linear-gradient(to top,rgba(10,22,40,.99) 0%,rgba(10,22,40,.72) 65%,rgba(10,22,40,.2) 100%);
        }

        /* Top gold line sweep */
        .treat-top-line {
          position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,transparent,#C9A96E,transparent);
          transform:scaleX(0); transform-origin:left;
          transition:transform .45s ease; z-index:3;
        }
        .treat-card:hover .treat-top-line { transform:scaleX(1); }

        /* Side glow */
        .treat-side-glow {
          position:absolute; left:0; top:0; bottom:0; width:3px;
          background:linear-gradient(180deg,transparent,#C9A96E,transparent);
          opacity:0; transition:opacity .4s; z-index:3;
        }
        .treat-card:hover .treat-side-glow { opacity:1; }

        .treat-content {
          position:absolute; inset:0;
          display:flex; flex-direction:column; justify-content:flex-end;
          padding:20px; z-index:4;
        }

        .treat-category {
          display:inline-flex; align-items:center; gap:5px;
          font-size:.63rem; letter-spacing:.1em; text-transform:uppercase;
          font-weight:600; padding:3px 10px; border-radius:20px; margin-bottom:8px;
          width:fit-content; font-family:'DM Sans',sans-serif;
          transition:transform .3s;
        }
        .treat-card:hover .treat-category { transform:translateX(3px); }

        .treat-title {
          font-family:'Cormorant Garamond',serif;
          font-size:1.15rem; font-weight:600; color:#F8F5F0;
          line-height:1.3; margin-bottom:8px;
          transition:color .25s, transform .35s;
        }
        .treat-card:hover .treat-title { color:#E8D5A3; transform:translateY(-2px); }

        .treat-desc {
          font-size:.77rem; color:rgba(248,245,240,.55); line-height:1.55;
          max-height:0; overflow:hidden;
          transition:max-height .45s ease, opacity .35s;
          opacity:0;
        }
        .treat-card:hover .treat-desc { max-height:60px; opacity:1; }

        /* Arrow */
        .treat-arrow {
          position:absolute; top:16px; right:16px;
          width:32px; height:32px; border-radius:50%;
          border:1px solid rgba(201,169,110,.3);
          display:flex; align-items:center; justify-content:center;
          color:#C9A96E; font-size:.85rem;
          opacity:0; transform:translateY(6px) rotate(-45deg);
          transition:opacity .3s, transform .3s; z-index:5;
        }
        .treat-card:hover .treat-arrow { opacity:1; transform:translateY(0) rotate(0deg); }

        /* Particle burst on hover (CSS only) */
        .treat-particle-wrap {
          position:absolute; top:50%; left:50%;
          width:0; height:0; pointer-events:none; z-index:1;
        }
        .treat-spark {
          position:absolute; width:3px; height:3px; border-radius:50%;
          background:#C9A96E; opacity:0;
          transition:none;
        }
        .treat-card:hover .treat-spark:nth-child(1) { animation:spark1 .6s ease-out .05s both; }
        .treat-card:hover .treat-spark:nth-child(2) { animation:spark2 .6s ease-out .1s  both; }
        .treat-card:hover .treat-spark:nth-child(3) { animation:spark3 .6s ease-out .08s both; }
        @keyframes spark1 { 0%{opacity:1;transform:translate(0,0) scale(1)} 100%{opacity:0;transform:translate(20px,-30px) scale(.3)} }
        @keyframes spark2 { 0%{opacity:1;transform:translate(0,0) scale(1)} 100%{opacity:0;transform:translate(-25px,-20px) scale(.3)} }
        @keyframes spark3 { 0%{opacity:1;transform:translate(0,0) scale(1)} 100%{opacity:0;transform:translate(15px, 25px) scale(.3)} }
      `}</style>

      <div
        className="treat-card"
        ref={cardRef}
        onClick={() => navigate(`/treatments/${treatment.slug}`)}
        onMouseMove={handleMouseMove}
      >
        {treatment.image && (
          <img src={treatment.image} alt={title} className="treat-img" loading="lazy" decoding="async"/>
        )}
        <div className="treat-overlay"/>
        <div className="treat-top-line"/>
        <div className="treat-side-glow"/>

        {/* Spark particles */}
        <div className="treat-particle-wrap">
          <div className="treat-spark"/>
          <div className="treat-spark"/>
          <div className="treat-spark"/>
        </div>

        <div className="treat-content">
          <div className="treat-category" style={{ background:colorSet.bg, color:colorSet.text, border:`1px solid ${colorSet.border}` }}>
            {categoryLabel}
          </div>
          <div className="treat-title">{title}</div>
          {shortDesc && <div className="treat-desc">{shortDesc}</div>}
        </div>

        <div className="treat-arrow">→</div>
      </div>
    </>
  );
};

export default TreatmentCard;
