import { useState, useRef, useEffect } from "react";
import { FaFacebookF, FaYoutube, FaEnvelope, FaSearch, FaTimes } from "react-icons/fa";

const TopNavbar = ({ onThemeChange, onLangChange }) => {
  const [theme, setTheme]           = useState("dark");
  const [lang, setLang]             = useState("en");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal]   = useState("");
  const [langOpen, setLangOpen]     = useState(false);
  const searchRef = useRef(null);
  const langRef   = useRef(null);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    onThemeChange?.(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const selectLang = (l) => {
    setLang(l);
    setLangOpen(false);
    onLangChange?.(l);
  };

  return (
    <>
      <style>{`
        .tnav {
          width: 100%;
          background: linear-gradient(90deg, #0A1628 0%, #0F2040 100%);
          border-bottom: 1px solid rgba(201,169,110,.18);
          height: 40px;
          display: flex;
          align-items: center;
          position: relative;
          z-index: 100;
          font-family: 'DM Sans', sans-serif;
        }
        .tnav-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 24px; width: 100%;
          display: flex; align-items: center;
          justify-content: space-between; gap: 10px;
        }

        /* ── Socials ── */
        .tnav-left { display:flex; align-items:center; gap:6px; flex-shrink:0; }
        .tnav-social {
          width: 26px; height: 26px; border-radius: 50%;
          border: 1px solid rgba(201,169,110,.22);
          display: flex; align-items: center; justify-content: center;
          color: rgba(201,169,110,.7); font-size: .68rem;
          cursor: pointer; text-decoration: none;
          transition: border-color .2s, color .2s, background .2s, transform .22s;
        }
        .tnav-social:hover { transform: scale(1.18); }
        .tnav-social.fb:hover { border-color:#1877F2; color:#1877F2; background:rgba(24,119,242,.12); }
        .tnav-social.yt:hover { border-color:#FF0000; color:#FF0000; background:rgba(255,0,0,.12); }
        .tnav-social.em:hover { border-color:#C9A96E; color:#C9A96E; background:rgba(201,169,110,.1); }

        .tnav-divider { width:1px; height:14px; background:rgba(201,169,110,.18); flex-shrink:0; }

        /* ── Search (desktop) ── */
        .tnav-search-wrap { flex:1; max-width:320px; position:relative; }
        .tnav-search-input {
          width:100%; height:26px;
          background:rgba(255,255,255,.06);
          border:1px solid rgba(201,169,110,.2); border-radius:13px;
          padding:0 32px 0 14px; font-size:.72rem;
          color:rgba(248,245,240,.8); font-family:'DM Sans',sans-serif;
          outline:none; transition:border-color .25s, background .25s;
        }
        .tnav-search-input::placeholder { color:rgba(248,245,240,.32); }
        .tnav-search-input:focus { border-color:rgba(201,169,110,.5); background:rgba(255,255,255,.09); }
        .tnav-search-icon {
          position:absolute; right:10px; top:50%; transform:translateY(-50%);
          color:rgba(201,169,110,.5); font-size:.62rem; pointer-events:none;
        }

        /* ── Right controls ── */
        .tnav-right { display:flex; align-items:center; gap:8px; flex-shrink:0; }

        /* Mobile search icon */
        .tnav-mob-search-btn {
          display:none; width:28px; height:28px; border-radius:50%;
          border:1px solid rgba(201,169,110,.22); background:transparent;
          color:rgba(201,169,110,.7); align-items:center; justify-content:center;
          cursor:pointer; font-size:.72rem; flex-shrink:0;
          transition:border-color .2s,color .2s,background .2s,transform .2s;
        }
        .tnav-mob-search-btn:hover { border-color:#C9A96E; color:#C9A96E; background:rgba(201,169,110,.1); transform:scale(1.12); }

        /* ── Theme toggle ── */
        .theme-toggle {
          position:relative; width:42px; height:22px;
          cursor:pointer; flex-shrink:0;
        }
        .tt-track {
          width:100%; height:100%; border-radius:11px;
          background:rgba(201,169,110,.1);
          border:1px solid rgba(201,169,110,.22);
          position:relative; overflow:visible;
          transition:background .3s, border-color .3s;
        }
        .theme-toggle.light .tt-track { background:rgba(201,169,110,.28); border-color:rgba(201,169,110,.5); }
        .tt-thumb {
          position:absolute; top:2px; left:2px;
          width:16px; height:16px; border-radius:50%;
          background:linear-gradient(135deg,#C9A96E,#A87C40);
          transition:transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s;
          display:flex; align-items:center; justify-content:center;
          font-size:.58rem; box-shadow:0 1px 5px rgba(0,0,0,.35);
          line-height:1;
        }
        .theme-toggle.light .tt-thumb { transform:translateX(20px); }
        .tt-thumb:hover { box-shadow:0 0 10px rgba(201,169,110,.6); }

        /* ── Language switcher ── */
        .lang-wrap { position:relative; }
        .lang-btn {
          display:flex; align-items:center; gap:5px;
          background:rgba(201,169,110,.07);
          border:1px solid rgba(201,169,110,.2); border-radius:4px;
          padding:3px 8px; color:rgba(201,169,110,.85);
          font-size:.7rem; font-weight:500; letter-spacing:.04em;
          cursor:pointer; font-family:'DM Sans',sans-serif;
          transition:border-color .2s,background .2s; white-space:nowrap;
        }
        .lang-btn:hover { border-color:#C9A96E; background:rgba(201,169,110,.14); }
        .lang-chevron { transition:transform .25s; }
        .lang-chevron.open { transform:rotate(180deg); }

        .lang-dropdown {
          position:absolute; top:calc(100% + 6px); right:0;
          background:#0F2040; border:1px solid rgba(201,169,110,.25);
          border-radius:7px; overflow:hidden; min-width:115px;
          box-shadow:0 10px 28px rgba(0,0,0,.45); z-index:300;
          opacity:0; transform:translateY(-8px) scale(.96);
          pointer-events:none;
          transition:opacity .22s cubic-bezier(.22,1,.36,1), transform .22s cubic-bezier(.22,1,.36,1);
        }
        .lang-dropdown.open { opacity:1; transform:none; pointer-events:auto; }

        .lang-option {
          display:flex; align-items:center; gap:9px;
          padding:9px 14px; cursor:pointer; font-size:.78rem;
          color:rgba(248,245,240,.6); font-family:'DM Sans',sans-serif;
          transition:background .15s,color .15s;
          border-bottom:1px solid rgba(201,169,110,.07);
        }
        .lang-option:last-child { border-bottom:none; }
        .lang-option:hover { background:rgba(201,169,110,.09); color:#C9A96E; }
        .lang-option.active { color:#C9A96E; font-weight:600; }
        .lang-flag { font-size:.9rem; }
        .lang-check { margin-left:auto; font-size:.7rem; color:#C9A96E; }

        /* ── Mobile search overlay ── */
        .tnav-mob-overlay {
          position:absolute; inset:0; height:40px;
          background:#0A1628;
          border-bottom:1px solid rgba(201,169,110,.22);
          display:flex; align-items:center;
          padding:0 14px; gap:10px;
          transform:translateY(-100%); opacity:0;
          transition:transform .3s cubic-bezier(.22,1,.36,1), opacity .3s;
          pointer-events:none; z-index:200;
        }
        .tnav-mob-overlay.open { transform:translateY(0); opacity:1; pointer-events:auto; }
        .tnav-mob-input {
          flex:1; height:27px;
          background:rgba(255,255,255,.07);
          border:1px solid rgba(201,169,110,.28); border-radius:14px;
          padding:0 14px; font-size:.78rem;
          color:rgba(248,245,240,.85); font-family:'DM Sans',sans-serif; outline:none;
        }
        .tnav-mob-input::placeholder { color:rgba(248,245,240,.32); }
        .tnav-mob-close {
          width:27px; height:27px; border-radius:50%;
          border:1px solid rgba(201,169,110,.2); background:transparent;
          color:rgba(201,169,110,.65); display:flex; align-items:center;
          justify-content:center; cursor:pointer; font-size:.72rem; flex-shrink:0;
          transition:color .2s,border-color .2s;
        }
        .tnav-mob-close:hover { color:#C9A96E; border-color:#C9A96E; }

        /* ── Responsive breakpoints ── */
        @media (max-width:768px) {
          .tnav-search-wrap      { display:none!important; }
          .tnav-mob-search-btn   { display:flex!important; }
        }
        @media (max-width:520px) {
          .tnav-social.em        { display:none; }
          .tnav-divider.d-hide   { display:none; }
        }
        @media (max-width:400px) {
          .tnav-inner            { padding:0 10px; gap:5px; }
          .tnav-social.yt        { display:none; }
        }
      `}</style>

      <div className="tnav">
        <div className="tnav-inner">

          {/* Socials */}
          <div className="tnav-left">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="tnav-social fb" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://youtube.com"  target="_blank" rel="noreferrer" className="tnav-social yt" aria-label="YouTube" ><FaYoutube  /></a>
            <a href="mailto:btanjil17@gmail.com"                            className="tnav-social em" aria-label="Email"   ><FaEnvelope /></a>
          </div>

          <div className="tnav-divider d-hide" />

          {/* Desktop search */}
          <div className="tnav-search-wrap">
            <input
              className="tnav-search-input"
              type="text"
              placeholder="Search treatments, services..."
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
            />
            <FaSearch className="tnav-search-icon" />
          </div>

          {/* Right controls */}
          <div className="tnav-right">

            {/* Mobile search btn */}
            <button className="tnav-mob-search-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
              <FaSearch />
            </button>

            <div className="tnav-divider" />

            {/* Theme toggle */}
            <div
              className={`theme-toggle ${theme === "light" ? "light" : ""}`}
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <div className="tt-track">
                <div className="tt-thumb">{theme === "dark" ? "🌙" : "☀️"}</div>
              </div>
            </div>

            <div className="tnav-divider" />

            {/* Language */}
            <div className="lang-wrap" ref={langRef}>
              <button className="lang-btn" onClick={() => setLangOpen(v => !v)}>
                <span>{lang === "en" ? "🇬🇧" : "🇧🇩"}</span>
                <span>{lang === "en" ? "EN" : "বাং"}</span>
                <svg className={`lang-chevron ${langOpen ? "open" : ""}`} width="9" height="6" viewBox="0 0 9 6" fill="none">
                  <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              <div className={`lang-dropdown ${langOpen ? "open" : ""}`}>
                <div className={`lang-option ${lang === "en" ? "active" : ""}`} onClick={() => selectLang("en")}>
                  <span className="lang-flag">🇬🇧</span><span>English</span>
                  {lang === "en" && <span className="lang-check">✓</span>}
                </div>
                <div className={`lang-option ${lang === "bn" ? "active" : ""}`} onClick={() => selectLang("bn")}>
                  <span className="lang-flag">🇧🇩</span><span>বাংলা</span>
                  {lang === "bn" && <span className="lang-check">✓</span>}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile search overlay */}
        <div className={`tnav-mob-overlay ${searchOpen ? "open" : ""}`}>
          <FaSearch style={{ color:"rgba(201,169,110,.5)", fontSize:".7rem", flexShrink:0 }} />
          <input
            ref={searchRef}
            className="tnav-mob-input"
            type="text"
            placeholder="Search treatments, services..."
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
          />
          <button className="tnav-mob-close" onClick={() => { setSearchOpen(false); setSearchVal(""); }}>
            <FaTimes />
          </button>
        </div>
      </div>
    </>
  );
};

export default TopNavbar;
