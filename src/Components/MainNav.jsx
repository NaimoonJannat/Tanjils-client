import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

const navLinks = [
  { to: "/",            label: "Home" },
  { to: "/about",       label: "About" },
  { to: "/services",    label: "Services" },
  { to: "/appointments",label: "Appointments" },
];

export default function MainNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  return (
    <>
      <style>{`
        .main-nav {
          width: 100%;
          transition: all 0.35s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .main-nav.scrolled {
          background: rgba(10, 22, 40, 0.98);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 10px 0;
          box-shadow: 0 4px 32px rgba(0,0,0,0.4);
          border-bottom: 1px solid rgba(201,169,110,0.12);
        }
        .main-nav.top {
          background: transparent;
          padding: 18px 0;
        }
        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        /* Logo */
        .nav-logo {
          display: flex;
          flex-direction: column;
          line-height: 1;
          text-decoration: none;
          gap: 2px;
        }
        .nav-logo-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 2vw, 1.25rem);
          font-weight: 700;
          color: #F8F5F0;
          letter-spacing: -0.01em;
        }
        .nav-logo-name span {
          color: #C9A96E;
        }
        .nav-logo-sub {
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(201,169,110,0.65);
        }
        /* Desktop links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 6px;
          list-style: none;
          margin: 0; padding: 0;
        }
        .nav-link {
          position: relative;
          padding: 6px 14px;
          font-size: 0.875rem;
          font-weight: 400;
          letter-spacing: 0.02em;
          color: rgba(248,245,240,0.78);
          text-decoration: none;
          transition: color 0.2s;
          border-radius: 2px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 14px; right: 14px;
          height: 1px;
          background: #C9A96E;
          transform: scaleX(0);
          transition: transform 0.25s ease;
          transform-origin: left;
        }
        .nav-link:hover,
        .nav-link.active {
          color: #F8F5F0;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          transform: scaleX(1);
        }
        /* CTA button */
        .nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #C9A96E, #A87C40);
          color: #0A1628;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 9px 22px;
          border-radius: 3px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: filter 0.25s, transform 0.25s, box-shadow 0.25s;
          box-shadow: 0 3px 16px rgba(201,169,110,0.28);
          margin-left: 8px;
        }
        .nav-cta:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(201,169,110,0.4);
        }
        /* Gold dot separator */
        .nav-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(201,169,110,0.3);
          flex-shrink: 0;
        }
        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 6px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(201,169,110,0.2);
          border-radius: 3px;
          transition: background 0.2s;
        }
        .hamburger:hover {
          background: rgba(201,169,110,0.1);
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: #C9A96E;
          border-radius: 1px;
          transition: all 0.3s;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
        /* Mobile drawer */
        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(10,22,40,0.98);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(201,169,110,0.15);
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s;
          opacity: 0;
        }
        .mobile-menu.open {
          max-height: 360px;
          opacity: 1;
        }
        .mobile-menu-inner {
          padding: 16px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .mobile-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          font-size: 0.9rem;
          color: rgba(248,245,240,0.75);
          text-decoration: none;
          border-radius: 3px;
          border: 1px solid transparent;
          transition: all 0.2s;
        }
        .mobile-link::before {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(201,169,110,0.4);
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .mobile-link:hover,
        .mobile-link.active {
          color: #F8F5F0;
          background: rgba(201,169,110,0.07);
          border-color: rgba(201,169,110,0.15);
        }
        .mobile-link:hover::before,
        .mobile-link.active::before {
          background: #C9A96E;
        }
        .mobile-cta {
          margin-top: 8px;
          display: flex;
          justify-content: center;
        }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger { display: flex; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>

      <nav
        className={`main-nav ${scrolled ? "scrolled" : "top"}`}
        style={{ position: "relative" }}
      >
        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <div className="nav-logo-name">
              <span>Dr. </span>ASM Tanjilur Rahman
            </div>
            <div className="nav-logo-sub">Surgeon & Specialist</div>
          </Link>

          {/* Desktop links */}
          <ul className="nav-links nav-links-desktop">
            {navLinks.map((link, i) => (
              <>
                {i > 0 && <li key={`dot-${i}`} className="nav-dot" />}
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`nav-link ${location.pathname === link.to ? "active" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              </>
            ))}
            <li>
              <Link to="/contact" className="nav-cta">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Book Appointment
              </Link>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile Drawer */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <div className="mobile-menu-inner">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`mobile-link ${location.pathname === link.to ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mobile-cta">
              <Link to="/contact" className="nav-cta" style={{ width: "100%", justifyContent: "center" }}>
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
