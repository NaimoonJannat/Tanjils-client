import React from "react";
import { Link } from "react-router";

const credentials = [
  { label: "FCPS", sub: "Surgery" },
  { label: "FMAS", sub: "India" },
  { label: "Fellowship", sub: "Laparoscopic Colorectal & Hernia, GEM India" },
];

const specialties = [
  { icon: "⚕", title: "Advanced Laparoscopic", desc: "Gall bladder, appendix & hernia surgery" },
  { icon: "✦", title: "Laser Surgery", desc: "Piles, anal fissure & fistula" },
  { icon: "◈", title: "Cancer Surgery", desc: "Breast, abdominal, colon & rectal" },
  { icon: "◉", title: "General Surgery", desc: "Comprehensive surgical care" },
];

const AboutMe = () => {
  return (
    <>
      <style>{`
        .about-section {
          background: #F8F5F0;
          position: relative;
          overflow: hidden;
          padding: 100px 24px;
          font-family: 'DM Sans', sans-serif;
        }
        /* Subtle dot grid */
        .about-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(10,22,40,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }
        /* Gold accent blob */
        .about-blob {
          position: absolute;
          width: 480px; height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .about-inner {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          position: relative;
        }
        @media (max-width: 900px) {
          .about-inner { grid-template-columns: 1fr; gap: 48px; }
          .about-image-col { order: -1; }
        }
        /* ── Image side ── */
        .about-image-col { position: relative; }
        .about-img-wrap {
          position: relative;
          display: inline-block;
          cursor: default;
        }
        .tilt-card {
          transition: transform 0.3s ease-out;
          transform-style: preserve-3d;
        }
        .about-img-frame {
          position: absolute;
          inset: -12px;
          border: 1px solid rgba(201,169,110,0.25);
          border-radius: 16px;
          pointer-events: none;
        }
        .about-img-frame-2 {
          position: absolute;
          inset: -24px;
          border: 1px dashed rgba(201,169,110,0.12);
          border-radius: 22px;
          pointer-events: none;
        }
        .about-img-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #0A1628, #1a3a5e);
          border-radius: 14px;
          transform: rotate(2.5deg) translate(6px, 8px);
        }
        .about-img {
          position: relative;
          width: 100%;
          max-width: 380px;
          border-radius: 14px;
          object-fit: cover;
          object-position: top;
          display: block;
          border: 3px solid rgba(201,169,110,0.3);
          box-shadow: 0 24px 80px rgba(10,22,40,0.2);
        }
        .about-badge {
          position: absolute;
          bottom: -18px;
          right: -18px;
          background: #0A1628;
          border: 1px solid rgba(201,169,110,0.35);
          border-radius: 10px;
          padding: 14px 20px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
          backdrop-filter: blur(8px);
        }
        .about-badge-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #C9A96E;
          line-height: 1;
        }
        .about-badge-label {
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(248,245,240,0.6);
          margin-top: 3px;
        }
        /* credential tags on image */
        .cred-tag {
          position: absolute;
          left: -20px;
          background: linear-gradient(135deg, #C9A96E, #A87C40);
          color: #0A1628;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          padding: 5px 14px;
          border-radius: 20px;
          white-space: nowrap;
          box-shadow: 0 4px 14px rgba(0,0,0,0.2);
        }
        /* ── Text side ── */
        .about-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(201,169,110,0.1);
          border: 1px solid rgba(201,169,110,0.3);
          border-radius: 20px;
          padding: 5px 14px;
          margin-bottom: 20px;
        }
        .about-tag-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #C9A96E;
          flex-shrink: 0;
        }
        .about-tag-text {
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #C9A96E;
        }
        .about-gold-line {
          height: 2px;
          width: 56px;
          background: linear-gradient(90deg, #C9A96E, transparent);
          margin-bottom: 18px;
        }
        .about-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700;
          color: #0A1628;
          line-height: 1.1;
          margin-bottom: 10px;
        }
        .about-h2 span {
          background: linear-gradient(90deg, #C9A96E, #A87C40);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .about-credentials {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .cred-pill {
          background: #0A1628;
          color: rgba(248,245,240,0.8);
          font-size: 0.73rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          padding: 5px 14px;
          border-radius: 20px;
          border: 1px solid rgba(201,169,110,0.2);
        }
        .cred-pill span {
          color: #C9A96E;
          margin-right: 4px;
        }
        .about-desc {
          font-size: 0.95rem;
          color: rgba(10,22,40,0.65);
          line-height: 1.8;
          margin-bottom: 32px;
        }
        /* Specialty cards grid */
        .about-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 36px;
        }
        @media (max-width: 480px) {
          .about-cards { grid-template-columns: 1fr; }
          .about-img { max-width: 100%; }
          .cred-tag { left: 0; }
          .about-badge { right: 0; }
        }
        .about-card {
          background: white;
          border: 1px solid rgba(10,22,40,0.08);
          border-radius: 8px;
          padding: 16px;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
          position: relative;
          overflow: hidden;
        }
        .about-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 100%;
          background: linear-gradient(180deg, #C9A96E, transparent);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .about-card:hover {
          border-color: rgba(201,169,110,0.35);
          box-shadow: 0 8px 24px rgba(10,22,40,0.08);
          transform: translateY(-2px);
        }
        .about-card:hover::before { opacity: 1; }
        .about-card-icon {
          font-size: 1.1rem;
          color: #C9A96E;
          margin-bottom: 6px;
        }
        .about-card-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: #0A1628;
          margin-bottom: 3px;
        }
        .about-card-desc {
          font-size: 0.77rem;
          color: rgba(10,22,40,0.5);
          line-height: 1.4;
        }
        .about-btn-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .about-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #C9A96E, #A87C40);
          color: #0A1628;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.04em;
          padding: 12px 26px;
          border-radius: 3px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: filter 0.25s, transform 0.25s, box-shadow 0.25s;
          box-shadow: 0 4px 20px rgba(201,169,110,0.28);
        }
        .about-btn-primary:hover {
          filter: brightness(1.08);
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(201,169,110,0.4);
        }
        .about-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #0A1628;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 0.85rem;
          padding: 11px 22px;
          border-radius: 3px;
          border: 1px solid rgba(10,22,40,0.2);
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.25s, background 0.25s;
        }
        .about-btn-outline:hover {
          border-color: #C9A96E;
          background: rgba(201,169,110,0.06);
        }
      `}</style>

      <section className="about-section">
        <div className="about-blob" style={{ top: -100, right: -100 }} />
        <div className="about-blob" style={{ bottom: -80, left: -80 }} />

        <div className="about-inner">

          {/* ── Image Column ── */}
          <div className="about-image-col" style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="about-img-wrap"
              style={{ perspective: "1200px" }}
              onMouseMove={(e) => {
                const card = e.currentTarget.querySelector(".tilt-card");
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = ((y - rect.height / 2) / rect.height) * -8;
                const rotateY = ((x - rect.width / 2) / rect.width) * 8;
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget.querySelector(".tilt-card");
                card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
              }}
            >
              <div className="tilt-card" style={{ position: "relative" }}>
                <div className="about-img-bg" />
                <div className="about-img-frame" />
                <div className="about-img-frame-2" />

                <img
                  src="/dp.png"
                  alt="Dr ASM Tanjilur Rahman"
                  className="about-img"
                />

                {/* Floating credential tag */}
                <div className="cred-tag" style={{ top: 32 }}>FCPS · FMAS · Fellowship</div>

                {/* Experience badge */}
                <div className="about-badge">
                  <div className="about-badge-num">15+</div>
                  <div className="about-badge-label">Years Experience</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Text Column ── */}
          <div>
            <div className="about-tag">
              <div className="about-tag-dot" />
              <span className="about-tag-text">About the Surgeon</span>
            </div>

            <div className="about-gold-line" />

            <h2 className="about-h2">
              Dr. ASM<br />
              <span>Tanjilur Rahman</span>
            </h2>

            {/* Credential pills */}
            <div className="about-credentials">
              <div className="cred-pill"><span>✦</span>FCPS (Surgery)</div>
              <div className="cred-pill"><span>✦</span>FMAS (India)</div>
              <div className="cred-pill"><span>✦</span>Fellowship – GEM, India</div>
              <div className="cred-pill"><span>✦</span>Asst. Professor, Faridpur Medical College</div>
            </div>

            <p className="about-desc">
              Dr. ASM Tanjilur Rahman is a highly skilled Laser, Advanced Laparoscopic and Cancer Surgeon
              with specialized fellowship training in Laparoscopic Colorectal and Hernia Surgery from
              GEM Hospital, India. He currently serves as Assistant Professor of Surgery at Faridpur
              Medical College, bringing evidence-based, patient-centered surgical care to every patient —
              with a focus on faster recovery, reduced pain, and optimal outcomes.
            </p>

            {/* Specialty cards */}
            <div className="about-cards">
              {specialties.map((s) => (
                <div className="about-card" key={s.title}>
                  <div className="about-card-icon">{s.icon}</div>
                  <div className="about-card-title">{s.title}</div>
                  <div className="about-card-desc">{s.desc}</div>
                </div>
              ))}
            </div>

            <div className="about-btn-row">
              <Link to="/appointments" className="about-btn-primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Book Consultation
              </Link>
              <Link to="/about" className="about-btn-outline">
                Learn More →
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default AboutMe;
