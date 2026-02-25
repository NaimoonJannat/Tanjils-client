import { useEffect, useState, useRef } from "react";

const slides = [
  {
    id: 1,
    type: "profile",
    image: "doctor.jpg",
    profileImage: "dp.png",
    title: "Dr. ASM Tanjilur Rahman",
    subtitle: "FCPS (Surgery) | FMAS (India) | Laparoscopic & Laser Surgeon",
    description:
      "Assistant Professor of Surgery at Faridpur Medical College with fellowship training in laparoscopic colorectal & hernia surgery. Expert in laser, advanced laparoscopic, and cancer surgeries, providing patient-centered, minimally invasive care.",
    badge: "15+ Years Experience",
  },
  {
    id: 2,
    type: "image",
    image: "slide1.jpeg",
    tag: "Minimally Invasive",
    title: "Advanced Laparoscopic Surgery",
    description:
      "Specialized in gall bladder, appendix, and hernia surgeries using modern minimally invasive techniques for faster recovery and less pain.",
    stat1: { value: "5000+", label: "Surgeries" },
    stat2: { value: "98%", label: "Success Rate" },
  },
  {
    id: 3,
    type: "image",
    image: "slide2.jpg",
    tag: "Laser Technology",
    title: "Laser Treatment Expertise",
    description:
      "Expert care for piles, anal fissure, and anal fistula with state-of-the-art laser technology, ensuring precise treatment and improved patient comfort.",
    stat1: { value: "Zero", label: "Cuts / Stitches" },
    stat2: { value: "1 Day", label: "Recovery" },
  },
  {
    id: 4,
    type: "image",
    image: "slide3.jpg",
    tag: "Oncology",
    title: "Comprehensive Cancer Surgery",
    description:
      "Providing advanced surgical care for breast, abdominal, colon, and rectal cancers with focus on safety, precision, and optimal long-term outcomes.",
    stat1: { value: "Breast", label: "& GI Cancers" },
    stat2: { value: "Multi", label: "Disciplinary" },
  },
];

const INTERVAL = 7000;

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);

  const goTo = (idx) => {
    setCurrent(idx);
    setAnimKey((k) => k + 1);
    setProgress(0);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % slides.length;
        setAnimKey((k) => k + 1);
        setProgress(0);
        return next;
      });
    }, INTERVAL);

    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / INTERVAL) * 100, 100));
    }, 50);
    return () => clearInterval(progressRef.current);
  }, [current]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .hero-root {
          --gold: #C9A96E;
          --gold-light: #E8D5A3;
          --navy: #0A1628;
          --navy-mid: #0F2040;
          --white: #F8F5F0;
          font-family: 'DM Sans', sans-serif;
        }

        .hero-root * { box-sizing: border-box; }

        /* Slide fade */
        .slide-enter { opacity: 0; transform: scale(1.04); }
        .slide-active { opacity: 1; transform: scale(1); transition: opacity 1.1s ease, transform 7s ease; }
        .slide-exit  { opacity: 0; transition: opacity 0.8s ease; }

        /* Text reveal animations */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideRight {
          from { width: 0; }
          to   { width: 64px; }
        }
        @keyframes profileIn {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes badgePop {
          from { opacity: 0; transform: scale(0.7) rotate(-4deg); }
          to   { opacity: 1; transform: scale(1) rotate(-4deg); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .anim-tag  { animation: fadeIn 0.6s ease both; animation-delay: 0.1s; }
        .anim-line { animation: slideRight 0.7s ease both; animation-delay: 0.2s; }
        .anim-h1   { animation: fadeUp 0.7s ease both; animation-delay: 0.25s; }
        .anim-p    { animation: fadeUp 0.7s ease both; animation-delay: 0.42s; }
        .anim-btn  { animation: fadeUp 0.7s ease both; animation-delay: 0.58s; }
        .anim-stats{ animation: fadeUp 0.7s ease both; animation-delay: 0.7s; }
        .anim-profile { animation: profileIn 0.9s cubic-bezier(.22,1,.36,1) both; animation-delay: 0.15s; }
        .anim-badge  { animation: badgePop 0.5s cubic-bezier(.34,1.56,.64,1) both; animation-delay: 0.65s; }

        .gold-shimmer {
          background: linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold));
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        /* Progress bar */
        .prog-bar {
          height: 2px;
          background: var(--gold);
          transition: width 0.05s linear;
          border-radius: 2px;
        }

        /* Nav dots */
        .dot {
          position: relative;
          width: 36px;
          height: 3px;
          border-radius: 2px;
          background: rgba(255,255,255,0.25);
          cursor: pointer;
          overflow: hidden;
          transition: background 0.3s;
        }
        .dot.active { background: rgba(255,255,255,0.15); }
        .dot-fill {
          position: absolute;
          left: 0; top: 0; height: 100%;
          background: var(--gold);
          border-radius: 2px;
        }

        /* Decorative ring on profile */
        .ring-outer {
          position: absolute; inset: -8px;
          border-radius: 50%;
          border: 1px solid rgba(201,169,110,0.35);
        }
        .ring-inner {
          position: absolute; inset: -16px;
          border-radius: 50%;
          border: 1px dashed rgba(201,169,110,0.2);
        }

        /* Buttons */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, var(--gold), #A87C40);
          color: #0A1628;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.88rem;
          letter-spacing: 0.04em;
          padding: 13px 28px;
          border-radius: 3px;
          border: none;
          cursor: pointer;
          transition: transform 0.25s, box-shadow 0.25s, filter 0.25s;
          box-shadow: 0 4px 24px rgba(201,169,110,0.3);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          filter: brightness(1.08);
          box-shadow: 0 8px 32px rgba(201,169,110,0.45);
        }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent;
          color: var(--white);
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 0.88rem;
          letter-spacing: 0.04em;
          padding: 13px 24px;
          border-radius: 3px;
          border: 1px solid rgba(255,255,255,0.25);
          cursor: pointer;
          transition: border-color 0.25s, background 0.25s;
        }
        .btn-secondary:hover {
          border-color: var(--gold);
          background: rgba(201,169,110,0.08);
        }

        /* Stat cards */
        .stat-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(201,169,110,0.2);
          border-radius: 4px;
          padding: 14px 22px;
          backdrop-filter: blur(8px);
        }

        /* Corner decoration */
        .corner-tl {
          position: absolute; top: 24px; left: 24px;
          width: 40px; height: 40px;
          border-top: 2px solid var(--gold);
          border-left: 2px solid var(--gold);
          opacity: 0.5;
        }
        .corner-br {
          position: absolute; bottom: 24px; right: 24px;
          width: 40px; height: 40px;
          border-bottom: 2px solid var(--gold);
          border-right: 2px solid var(--gold);
          opacity: 0.5;
        }

        /* Vertical text */
        .vert-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .profile-grid { flex-direction: column !important; text-align: center !important; }
          .profile-img-wrap { margin: 0 auto 24px !important; width: 180px !important; height: 180px !important; }
          .hero-title { font-size: clamp(1.7rem, 6vw, 3.2rem) !important; }
          .hero-subtitle { font-size: 1rem !important; }
          .stats-row { gap: 10px !important; }
          .stat-card { padding: 10px 14px !important; }
          .corner-tl, .corner-br { display: none; }
          .vert-text { display: none; }
          .btn-row { flex-direction: column; align-items: stretch; }
          .btn-row button { width: 100%; justify-content: center; }
        }
      `}</style>

      <div
        className="hero-root"
        id="hero"
        style={{
          position: "relative",
          width: "100%",
          height: "100svh",
          minHeight: 480,
          overflow: "hidden",
          background: "#0A1628",
        }}
      >
        {/* Slides */}
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: isActive ? 10 : 0,
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              {/* Background image */}
              <div
                className={isActive ? "slide-active" : "slide-enter"}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: isActive ? 1 : 0,
                }}
              />

              {/* Multi-layer overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(120deg, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.7) 50%, rgba(10,22,40,0.5) 100%)",
              }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(10,22,40,0.8) 0%, transparent 60%)",
              }} />

              {/* Decorative corners */}
              <div className="corner-tl" />
              <div className="corner-br" />

              {/* Vertical side label */}
              <div style={{
                position: "absolute", right: 28, top: "50%",
                transform: "translateY(-50%)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                zIndex: 5,
              }}>
                <div style={{ width: 1, height: 40, background: "rgba(201,169,110,0.3)" }} />
                <span className="vert-text">Trusted Surgeon</span>
                <div style={{ width: 1, height: 40, background: "rgba(201,169,110,0.3)" }} />
              </div>

              {/* Content */}
              {isActive && (
                <div
                  key={animKey}
                  style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center",
                    padding: "0 clamp(20px, 5vw, 80px)",
                  }}
                >
                  <div style={{ maxWidth: 1180, width: "100%", margin: "0 auto" }}>

                    {slide.type === "profile" ? (
                      /* ── PROFILE SLIDE ── */
                      <div
                        className="profile-grid"
                        style={{ display: "flex", alignItems: "center", gap: "clamp(32px,5vw,72px)" }}
                      >
                        {/* Avatar */}
                        <div
                          className="anim-profile profile-img-wrap"
                          style={{ position: "relative", flexShrink: 0, width: 230, height: 230 }}
                        >
                          <div className="ring-outer" />
                          <div className="ring-inner" />
                          <img
                            src={slide.profileImage}
                            alt="Dr. ASM Tanjilur Rahman"
                            style={{
                              width: "100%", height: "100%",
                              objectFit: "cover",
                              borderRadius: "50%",
                              border: "3px solid rgba(201,169,110,0.6)",
                              boxShadow: "0 12px 60px rgba(0,0,0,0.5)",
                            }}
                          />
                          {/* Badge */}
                          <div
                            className="anim-badge"
                            style={{
                              position: "absolute", bottom: -4, right: -4,
                              background: "linear-gradient(135deg,#C9A96E,#A87C40)",
                              color: "#0A1628",
                              fontSize: "0.68rem",
                              fontWeight: 600,
                              letterSpacing: "0.05em",
                              padding: "6px 12px",
                              borderRadius: 20,
                              whiteSpace: "nowrap",
                              boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                              transform: "rotate(-4deg)",
                            }}
                          >
                            {slide.badge}
                          </div>
                        </div>

                        {/* Text block */}
                        <div style={{ color: "#F8F5F0" }}>
                          {/* Gold line */}
                          <div className="anim-line" style={{
                            height: 2, width: 64,
                            background: "linear-gradient(90deg,#C9A96E,transparent)",
                            marginBottom: 16,
                          }} />

                          <h1
                            className="hero-title anim-h1"
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                              fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
                              fontWeight: 700,
                              lineHeight: 1.1,
                              margin: "0 0 8px",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            <span className="gold-shimmer">{slide.title}</span>
                          </h1>

                          <p
                            className="hero-subtitle anim-p"
                            style={{
                              fontSize: "clamp(0.85rem,1.5vw,1.05rem)",
                              color: "rgba(232,213,163,0.9)",
                              margin: "0 0 14px",
                              letterSpacing: "0.02em",
                            }}
                          >
                            {slide.subtitle}
                          </p>

                          <p
                            className="anim-p"
                            style={{
                              fontSize: "clamp(0.83rem,1.3vw,0.96rem)",
                              color: "rgba(248,245,240,0.7)",
                              maxWidth: 500,
                              lineHeight: 1.7,
                              margin: "0 0 28px",
                            }}
                          >
                            {slide.description}
                          </p>

                          <div className="anim-btn btn-row" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                            <button className="btn-primary">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                              Book Appointment
                            </button>
                            <button className="btn-secondary">Learn More →</button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* ── IMAGE SLIDES ── */
                      <div style={{ maxWidth: 680 }}>
                        {/* Tag */}
                        <div className="anim-tag" style={{
                          display: "inline-flex", alignItems: "center", gap: 8,
                          background: "rgba(201,169,110,0.15)",
                          border: "1px solid rgba(201,169,110,0.35)",
                          borderRadius: 20,
                          padding: "5px 14px",
                          marginBottom: 20,
                        }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A96E", flexShrink: 0 }} />
                          <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "#E8D5A3", textTransform: "uppercase" }}>
                            {slide.tag}
                          </span>
                        </div>

                        {/* Gold line */}
                        <div className="anim-line" style={{
                          height: 2,
                          background: "linear-gradient(90deg,#C9A96E,transparent)",
                          marginBottom: 18,
                        }} />

                        <h1
                          className="hero-title anim-h1"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(2.2rem, 5vw, 4rem)",
                            fontWeight: 700,
                            color: "#F8F5F0",
                            lineHeight: 1.1,
                            margin: "0 0 18px",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {slide.title}
                        </h1>

                        <p
                          className="anim-p"
                          style={{
                            fontSize: "clamp(0.87rem,1.4vw,1rem)",
                            color: "rgba(248,245,240,0.72)",
                            lineHeight: 1.75,
                            marginBottom: 32,
                          }}
                        >
                          {slide.description}
                        </p>

                        {/* Stats */}
                        <div className="anim-stats stats-row" style={{ display: "flex", gap: 14, marginBottom: 32, flexWrap: "wrap" }}>
                          <div className="stat-card">
                            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 700, color: "#E8D5A3", lineHeight: 1 }}>
                              {slide.stat1.value}
                            </div>
                            <div style={{ fontSize: "0.72rem", color: "rgba(248,245,240,0.55)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>
                              {slide.stat1.label}
                            </div>
                          </div>
                          <div className="stat-card">
                            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 700, color: "#E8D5A3", lineHeight: 1 }}>
                              {slide.stat2.value}
                            </div>
                            <div style={{ fontSize: "0.72rem", color: "rgba(248,245,240,0.55)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>
                              {slide.stat2.label}
                            </div>
                          </div>
                        </div>

                        <div className="anim-btn btn-row" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                          <button className="btn-primary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            Book Appointment
                          </button>
                          <button className="btn-secondary">Learn More →</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Bottom bar: dots + progress */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          zIndex: 30,
          padding: "0 clamp(20px,5vw,60px) clamp(20px,4vh,36px)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 16,
        }}>
          {/* Slide counter */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2rem",
              fontWeight: 700,
              color: "#C9A96E",
              lineHeight: 1,
            }}>
              {String(current + 1).padStart(2, "0")}
            </span>
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", margin: "0 2px" }}>/</span>
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          {/* Progress dots */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`dot ${idx === current ? "active" : ""}`}
                onClick={() => goTo(idx)}
                title={`Slide ${idx + 1}`}
              >
                {idx === current && (
                  <div className="dot-fill" style={{ width: `${progress}%` }} />
                )}
              </div>
            ))}
          </div>

          {/* Prev / Next */}
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { label: "←", action: () => goTo((current - 1 + slides.length) % slides.length) },
              { label: "→", action: () => goTo((current + 1) % slides.length) },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                style={{
                  width: 38, height: 38,
                  borderRadius: "50%",
                  border: "1px solid rgba(201,169,110,0.35)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#C9A96E",
                  fontSize: "1rem",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.2s, border-color 0.2s",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(201,169,110,0.15)";
                  e.currentTarget.style.borderColor = "#C9A96E";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)";
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Top progress bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "rgba(255,255,255,0.07)", zIndex: 30,
        }}>
          <div className="prog-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </>
  );
}
