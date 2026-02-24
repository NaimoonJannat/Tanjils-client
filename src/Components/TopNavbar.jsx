import { FaFacebookF, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const TopNavbar = () => {
  return (
    <>
      <style>{`
        .top-nav-bar {
          width: 100%;
          background: linear-gradient(90deg, #0A1628 0%, #0F2040 100%);
          border-bottom: 1px solid rgba(201, 169, 110, 0.18);
          height: 36px;
          display: flex;
          align-items: center;
        }
        .top-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .top-nav-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .top-social-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid rgba(201, 169, 110, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(201, 169, 110, 0.8);
          font-size: 0.65rem;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          text-decoration: none;
        }
        .top-social-icon:hover {
          border-color: #C9A96E;
          color: #C9A96E;
          background: rgba(201, 169, 110, 0.1);
        }
        .top-divider {
          width: 1px;
          height: 14px;
          background: rgba(201, 169, 110, 0.2);
        }
        .top-nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .top-contact-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 0.72rem;
          letter-spacing: 0.02em;
          color: rgba(248, 245, 240, 0.65);
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: color 0.2s;
          text-decoration: none;
        }
        .top-contact-item:hover {
          color: #C9A96E;
        }
        .top-contact-icon {
          color: #C9A96E;
          font-size: 0.65rem;
          flex-shrink: 0;
        }
        /* Hide right side on very small screens */
        @media (max-width: 480px) {
          .top-nav-right .top-contact-item:last-child {
            display: none;
          }
        }
      `}</style>

      <div className="top-nav-bar">
        <div className="top-nav-inner">
          {/* Left: Social */}
          <div className="top-nav-left">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="top-social-icon"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <div className="top-divider" />
            <span style={{
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              color: "rgba(201,169,110,0.5)",
              textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Follow Us
            </span>
          </div>

          {/* Right: Contact info */}
          <div className="top-nav-right">
            <a href="tel:01608058416" className="top-contact-item">
              <FaPhoneAlt className="top-contact-icon" />
              <span>01608-058416</span>
            </a>
            <div className="top-divider" />
            <a href="mailto:info@drgolammustafa.com" className="top-contact-item">
              <FaEnvelope className="top-contact-icon" />
              <span>info@drgolammustafa.com</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNavbar;
