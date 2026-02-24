import { FaFacebookF, FaGithub, FaRedditAlien, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <style>{`
        .footer-root {
          background: linear-gradient(180deg, #0A1628 0%, #07101E 100%);
          border-top: 1px solid rgba(201,169,110,0.15);
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }
        /* Subtle background pattern */
        .footer-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(201,169,110,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }
        .footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 64px 24px 32px;
          position: relative;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 48px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(201,169,110,0.12);
        }
        @media (max-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }
        /* Brand column */
        .footer-brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .footer-logo-img {
          height: 44px;
          width: auto;
        }
        .footer-logo-text {
          display: flex;
          flex-direction: column;
        }
        .footer-logo-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #F8F5F0;
          line-height: 1.2;
        }
        .footer-logo-name span { color: #C9A96E; }
        .footer-logo-sub {
          font-size: 0.62rem;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: rgba(201,169,110,0.55);
          margin-top: 2px;
        }
        .footer-brand-desc {
          font-size: 0.85rem;
          color: rgba(248,245,240,0.55);
          line-height: 1.75;
          max-width: 320px;
          margin-bottom: 24px;
        }
        .footer-social-row {
          display: flex;
          gap: 10px;
        }
        .footer-social {
          width: 34px;
          height: 34px;
          border-radius: 4px;
          border: 1px solid rgba(201,169,110,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(201,169,110,0.7);
          font-size: 0.78rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.22s;
        }
        .footer-social:hover {
          border-color: #C9A96E;
          color: #C9A96E;
          background: rgba(201,169,110,0.08);
          transform: translateY(-2px);
        }
        /* Links column */
        .footer-col-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-weight: 600;
          color: #F8F5F0;
          letter-spacing: 0.02em;
          margin-bottom: 4px;
        }
        .footer-col-line {
          display: block;
          width: 32px;
          height: 1px;
          background: linear-gradient(90deg, #C9A96E, transparent);
          margin-bottom: 18px;
        }
        .footer-nav-list {
          list-style: none;
          margin: 0; padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.84rem;
          color: rgba(248,245,240,0.55);
          text-decoration: none;
          transition: color 0.2s, gap 0.2s;
        }
        .footer-nav-link::before {
          content: '';
          width: 4px;
          height: 1px;
          background: #C9A96E;
          opacity: 0.5;
          transition: width 0.2s, opacity 0.2s;
          flex-shrink: 0;
        }
        .footer-nav-link:hover {
          color: #C9A96E;
          gap: 12px;
        }
        .footer-nav-link:hover::before {
          width: 10px;
          opacity: 1;
        }
        /* Contact column */
        .footer-contact-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.84rem;
          color: rgba(248,245,240,0.55);
          line-height: 1.5;
          text-decoration: none;
          transition: color 0.2s;
          cursor: default;
        }
        a.footer-contact-item { cursor: pointer; }
        a.footer-contact-item:hover { color: #C9A96E; }
        .footer-contact-icon-wrap {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(201,169,110,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #C9A96E;
          font-size: 0.65rem;
          margin-top: 1px;
        }
        /* Bottom bar */
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 28px;
          gap: 16px;
          flex-wrap: wrap;
        }
        .footer-copy {
          font-size: 0.78rem;
          color: rgba(248,245,240,0.3);
          letter-spacing: 0.02em;
        }
        .footer-copy span {
          color: rgba(201,169,110,0.5);
        }
        .footer-tagline {
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(201,169,110,0.3);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-tagline::before,
        .footer-tagline::after {
          content: '';
          width: 20px;
          height: 1px;
          background: rgba(201,169,110,0.2);
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-inner">
          {/* Top grid */}
          <div className="footer-top">

            {/* Brand */}
            <div>
              <div className="footer-brand-logo">
                <img src="/logo.png" alt="Logo" className="footer-logo-img" />
                <div className="footer-logo-text">
                  <div className="footer-logo-name">
                    <span>Dr. </span>ASM Tanjilur Rahman
                  </div>
                  <div className="footer-logo-sub">Surgeon & Specialist</div>
                </div>
              </div>

              <p className="footer-brand-desc">
                Assistant Professor of Surgery at Faridpur Medical College. Expert in laparoscopic, laser, and cancer surgeries — committed to patient-centered, minimally invasive care.
              </p>

              <div className="footer-social-row">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="https://reddit.com" target="_blank" rel="noreferrer" className="footer-social" aria-label="Reddit">
                  <FaRedditAlien />
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-social" aria-label="Github">
                  <FaGithub />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="footer-col-title">Quick Links</div>
              <span className="footer-col-line" />
              <ul className="footer-nav-list">
                {["Home", "About", "Services", "Appointments", "Privacy Policy", "Cookies"].map(item => (
                  <li key={item}>
                    <a href="#" className="footer-nav-link">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <div className="footer-col-title">Contact Us</div>
              <span className="footer-col-line" />
              <div className="footer-contact-list">
                <a href="tel:01608058416" className="footer-contact-item">
                  <div className="footer-contact-icon-wrap"><FaPhoneAlt /></div>
                  <span>01608-058416</span>
                </a>
                <a href="mailto:info@drgolammustafa.com" className="footer-contact-item">
                  <div className="footer-contact-icon-wrap"><FaEnvelope /></div>
                  <span>info@drgolammustafa.com</span>
                </a>
                <div className="footer-contact-item">
                  <div className="footer-contact-icon-wrap"><FaMapMarkerAlt /></div>
                  <span>Faridpur Medical College,<br />Faridpur, Bangladesh</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <p className="footer-copy">
              © 2025 <span>Dr. ASM Tanjilur Rahman</span>. All Rights Reserved.
            </p>
            <div className="footer-tagline">
              Trusted Surgical Care
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
