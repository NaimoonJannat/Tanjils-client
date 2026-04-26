import { useEffect, useRef } from "react";
import { useLanguage } from "../../Context/LanguageContext";
import translations from "../../i18n/translations";

const FB_PAGE_URL = "https://www.facebook.com/TanjilsLaserandLaparoscopy";

function FBLogoSVG({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.022 4.388 11.013 10.125 11.927v-8.437H7.078V12.07h3.047V9.428c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.49 0-1.953.925-1.953 1.874v2.25h3.328l-.532 3.493h-2.796V24C19.612 23.086 24 18.095 24 12.073z"/>
    </svg>
  );
}

const FEATURE_ICONS = [
  /* mic */
  <svg key="mic" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
  /* activity */
  <svg key="act" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  /* heart */
  <svg key="heart" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  /* bell */
  <svg key="bell" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
];

export default function FacebookSection() {
  const sectionRef = useRef(null);
  const { lang } = useLanguage();
  const t = translations[lang];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-reveal]").forEach((el) => {
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

  return (
    <>
      <style>{`
        .fb-section {
          background: #0D1E35;
          position: relative;
          overflow: hidden;
          padding: 96px 24px;
          font-family: 'DM Sans', sans-serif;
        }
        .fb-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(24,119,242,.04) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          animation: fbGridDrift 24s linear infinite;
        }
        @keyframes fbGridDrift { to { background-position: 32px 32px; } }

        .fb-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: fbBlob 12s ease-in-out infinite;
        }
        @keyframes fbBlob {
          0%, 100% { transform: scale(1); opacity: .45; }
          50%       { transform: scale(1.18); opacity: .75; }
        }

        .fb-inner { max-width: 1180px; margin: 0 auto; position: relative; }

        /* header */
        .fb-header { text-align: center; margin-bottom: 56px; }
        .fb-tag {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(24,119,242,.12); border: 1px solid rgba(24,119,242,.3);
          border-radius: 20px; padding: 5px 16px; margin-bottom: 20px;
        }
        .fb-tag-dot {
          width: 5px; height: 5px; border-radius: 50%; background: #1877F2;
          animation: fbDot 2s ease-in-out infinite;
        }
        @keyframes fbDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(24,119,242,.5); }
          50%       { box-shadow: 0 0 0 6px rgba(24,119,242,0); }
        }
        .fb-tag-text { font-size: .72rem; letter-spacing: .1em; text-transform: uppercase; color: #4f9cf9; }

        .fb-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3.4rem);
          font-weight: 700;
          color: #F8F5F0;
          line-height: 1.1;
          margin-bottom: 14px;
        }
        .fb-h2 span {
          background: linear-gradient(90deg, #4f9cf9, #a8d4ff, #4f9cf9);
          background-size: 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fbShimmer 3.5s linear infinite;
        }
        @keyframes fbShimmer { to { background-position: 200% center; } }
        .fb-sub { font-size: .93rem; color: rgba(248,245,240,.5); max-width: 520px; margin: 0 auto; line-height: 1.7; }

        /* feature grid */
        .fb-feature-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 48px;
        }
        @media (max-width: 900px) { .fb-feature-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .fb-feature-grid { grid-template-columns: 1fr; } }

        .fb-feat-card {
          background: rgba(24,119,242,.06);
          border: 1px solid rgba(24,119,242,.15);
          border-radius: 12px;
          padding: 24px 20px;
          transition: border-color .3s, box-shadow .3s, transform .3s;
        }
        .fb-feat-card:hover {
          border-color: rgba(24,119,242,.4);
          box-shadow: 0 10px 36px rgba(24,119,242,.12);
          transform: translateY(-4px);
        }
        .fb-feat-icon {
          width: 44px; height: 44px; border-radius: 10px;
          background: rgba(24,119,242,.15);
          border: 1px solid rgba(24,119,242,.25);
          display: flex; align-items: center; justify-content: center;
          color: #4f9cf9;
          margin-bottom: 14px;
        }
        .fb-feat-title {
          font-size: .9rem; font-weight: 600; color: #F8F5F0;
          margin-bottom: 6px; line-height: 1.3;
        }
        .fb-feat-desc { font-size: .78rem; color: rgba(248,245,240,.42); line-height: 1.6; }

        /* CTA strip */
        .fb-cta {
          border: 1px solid rgba(24,119,242,.2);
          border-radius: 14px;
          background: rgba(24,119,242,.04);
          display: flex;
          align-items: center;
          padding: clamp(18px, 3vw, 28px) clamp(18px, 3vw, 32px);
          gap: 24px;
          flex-wrap: wrap;
        }
        .fb-cta-avatar-wrap { position: relative; flex-shrink: 0; }
        .fb-cta-avatar {
          width: 68px; height: 68px; border-radius: 50%;
          object-fit: cover; object-position: top;
          border: 2px solid rgba(24,119,242,.5);
        }
        .fb-cta-badge {
          position: absolute; bottom: -4px; right: -4px;
          width: 22px; height: 22px; border-radius: 50%;
          background: #1877F2;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid #0D1E35;
          color: #fff;
        }
        .fb-cta-info { flex: 1; min-width: 200px; }
        .fb-cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem; font-weight: 700; color: #F8F5F0; margin-bottom: 4px;
        }
        .fb-cta-sub { font-size: .8rem; color: rgba(248,245,240,.45); line-height: 1.5; }
        .fb-cta-stats { display: flex; gap: 20px; margin-top: 10px; flex-wrap: wrap; }
        .fb-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; font-weight: 700; color: #4f9cf9;
        }
        .fb-stat-lbl { font-size: .62rem; color: rgba(248,245,240,.35); letter-spacing: .07em; text-transform: uppercase; }

        .btn-fb-follow {
          display: inline-flex; align-items: center; gap: 9px;
          background: #1877F2;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600; font-size: .82rem; letter-spacing: .03em;
          padding: 11px 24px; border-radius: 4px;
          border: none; cursor: pointer; text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 4px 18px rgba(24,119,242,.35);
          transition: filter .25s, transform .25s;
        }
        .btn-fb-follow:hover { filter: brightness(1.12); transform: translateY(-1px); }

        /* reveal animations (same convention as VideoSection) */
        [data-reveal] { opacity: 0; transform: translateY(36px); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
        [data-reveal="scale"] { transform: scale(.92); }
        [data-reveal].revealed { opacity: 1 !important; transform: none !important; }
      `}</style>

      <section className="fb-section" ref={sectionRef}>
        {/* ambient blobs */}
        <div className="fb-blob" style={{ width: 480, height: 480, top: -140, right: -100, background: "radial-gradient(circle,rgba(24,119,242,.06) 0%,transparent 70%)" }} />
        <div className="fb-blob" style={{ width: 300, height: 300, bottom: -60, left: -80, background: "radial-gradient(circle,rgba(24,119,242,.05) 0%,transparent 70%)", animationDelay: "6s" }} />

        <div className="fb-inner">
          {/* Header */}
          <div className="fb-header" data-reveal data-delay="0">
            <div className="fb-tag">
              <div className="fb-tag-dot" />
              <span className="fb-tag-text">{t.fbTag}</span>
            </div>
            <h2 className="fb-h2"><span>{t.fbTitle}</span></h2>
            <p className="fb-sub">{t.fbSubtitle}</p>
          </div>

          {/* Feature cards */}
          <div className="fb-feature-grid">
            {t.fbFeatures.map((feat, i) => (
              <div
                key={i}
                className="fb-feat-card"
                data-reveal="scale"
                data-delay={i * 90}
              >
                <div className="fb-feat-icon">{FEATURE_ICONS[i]}</div>
                <div className="fb-feat-title">{feat.title}</div>
                <div className="fb-feat-desc">{feat.desc}</div>
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div className="fb-cta" data-reveal data-delay="420">
            <div className="fb-cta-avatar-wrap">
              <img className="fb-cta-avatar" src="/dp.png" alt="Dr ASM Tanjilur Rahman" />
              <div className="fb-cta-badge">
                <FBLogoSVG size={11} />
              </div>
            </div>
            <div className="fb-cta-info">
              <div className="fb-cta-title">Dr. ASM Tanjilur Rahman</div>
              <div className="fb-cta-sub">{t.fbCtaSub}</div>
              <div className="fb-cta-stats">
                {t.fbCtaStatLabels.map((lbl, i) => (
                  <div key={i}>
                    <div className="fb-stat-val">{["2K+", "300+", "5+"][i]}</div>
                    <div className="fb-stat-lbl">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            <a className="btn-fb-follow" href={FB_PAGE_URL} target="_blank" rel="noopener noreferrer">
              <FBLogoSVG size={16} /> {t.fbFollow}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
