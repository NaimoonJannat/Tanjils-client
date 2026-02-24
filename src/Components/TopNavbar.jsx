import { useState, useRef, useEffect } from "react";
import { FaFacebookF, FaYoutube, FaEnvelope, FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import axios from "axios";

/**
 * TopNavbar
 *
 * Props (all optional):
 *   onThemeChange(theme)  – called with "dark" | "light" when toggled
 *   onLangChange(lang)    – called with "en" | "bn" when changed
 *
 * Theme implementation:
 *   Applies data-theme="dark|light" to <html> and writes CSS variables
 *   to :root so the whole site can react via CSS.
 *
 * Search implementation:
 *   Fetches all treatments on mount (cached), filters by title/category,
 *   shows a dropdown of results, clicking navigates to /treatments/:slug.
 */

const THEME_VARS = {
  dark: {
    "--bg-primary":   "#0A1628",
    "--bg-secondary": "#0F2040",
    "--text-primary": "#F8F5F0",
    "--text-muted":   "rgba(248,245,240,0.6)",
    "--gold":         "#C9A96E",
    "--border":       "rgba(201,169,110,0.18)",
    "--surface":      "rgba(255,255,255,0.03)",
  },
  light: {
    "--bg-primary":   "#F4F1EC",
    "--bg-secondary": "#EAE5DB",
    "--text-primary": "#0A1628",
    "--text-muted":   "rgba(10,22,40,0.6)",
    "--gold":         "#A87C40",
    "--border":       "rgba(10,22,40,0.12)",
    "--surface":      "rgba(0,0,0,0.03)",
  },
};

function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  const vars = THEME_VARS[theme];
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  // Also set body background directly so no flash
  document.body.style.background = vars["--bg-primary"];
}

export default function TopNavbar({ onThemeChange, onLangChange }) {
  const navigate = useNavigate();

  const [theme, setTheme]           = useState(() => {
    const saved = localStorage.getItem("site-theme") || "dark";
    applyTheme(saved);
    return saved;
  });
  const [lang, setLang]             = useState("en");
  const [searchOpen, setSearchOpen] = useState(false);   // mobile overlay
  const [searchVal, setSearchVal]   = useState("");
  const [langOpen, setLangOpen]     = useState(false);
  const [allTreatments, setAllTreatments] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults]     = useState(false);

  const searchRef     = useRef(null);
  const mobSearchRef  = useRef(null);
  const langRef       = useRef(null);
  const resultsRef    = useRef(null);

  // Fetch treatments for search once
  useEffect(() => {
    axios.get("http://localhost:5000/api/treatments")
      .then(res => setAllTreatments(Array.isArray(res.data) ? res.data : []))
      .catch(() => {});
  }, []);

  // Filter results as user types
  useEffect(() => {
    const q = searchVal.trim().toLowerCase();
    if (!q) { setSearchResults([]); setShowResults(false); return; }
    const results = allTreatments.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.category?.toLowerCase().includes(q) ||
      t.shortDesc?.toLowerCase().includes(q)
    ).slice(0, 6);
    setSearchResults(results);
    setShowResults(true);
  }, [searchVal, allTreatments]);

  // Close results on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        resultsRef.current && !resultsRef.current.contains(e.target) &&
        searchRef.current  && !searchRef.current.contains(e.target) &&
        mobSearchRef.current && !mobSearchRef.current.contains(e.target)
      ) {
        setShowResults(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Mobile search autofocus
  useEffect(() => {
    if (searchOpen && mobSearchRef.current) mobSearchRef.current.focus();
  }, [searchOpen]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("site-theme", next);
    onThemeChange?.(next);
  };

  const selectLang = (l) => {
    setLang(l);
    setLangOpen(false);
    onLangChange?.(l);
  };

  const handleResultClick = (slug) => {
    setSearchVal("");
    setShowResults(false);
    setSearchOpen(false);
    navigate(`/treatments/${slug}`);
  };

  const handleSearchKey = (e) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      handleResultClick(searchResults[0].slug);
    }
    if (e.key === "Escape") { setShowResults(false); setSearchOpen(false); }
  };

  const clearSearch = () => { setSearchVal(""); setShowResults(false); };

  const categoryColors = {
    Laparoscopic: "#93C5FD",
    Laser:        "#C9A96E",
    Cancer:       "#FCA5A5",
    General:      "#6EE7B7",
  };

  return (
    <>
      <style>{`
        .tnav {
          width:100%;
          background:linear-gradient(90deg,#0A1628 0%,#0F2040 100%);
          border-bottom:1px solid rgba(201,169,110,.18);
          height:40px; display:flex; align-items:center;
          position:relative; z-index:100;
          font-family:'DM Sans',sans-serif;
        }
        [data-theme="light"] .tnav {
          background:linear-gradient(90deg,#1a3a5e 0%,#0F2040 100%);
        }
        .tnav-inner {
          max-width:1280px; margin:0 auto; padding:0 24px;
          width:100%; display:flex; align-items:center;
          justify-content:space-between; gap:10px;
        }
        .tnav-left { display:flex; align-items:center; gap:6px; flex-shrink:0; }
        .tnav-social {
          width:26px; height:26px; border-radius:50%;
          border:1px solid rgba(201,169,110,.22);
          display:flex; align-items:center; justify-content:center;
          color:rgba(201,169,110,.7); font-size:.68rem;
          cursor:pointer; text-decoration:none;
          transition:border-color .2s,color .2s,background .2s,transform .22s;
        }
        .tnav-social:hover { transform:scale(1.18); }
        .tnav-social.fb:hover { border-color:#1877F2; color:#1877F2; background:rgba(24,119,242,.12); }
        .tnav-social.yt:hover { border-color:#FF0000; color:#FF0000; background:rgba(255,0,0,.12); }
        .tnav-social.em:hover { border-color:#C9A96E; color:#C9A96E; background:rgba(201,169,110,.1); }
        .tnav-div { width:1px; height:14px; background:rgba(201,169,110,.18); flex-shrink:0; }

        /* ── Search (desktop) ── */
        .tnav-search-wrap { flex:1; max-width:320px; position:relative; }
        .tnav-search-field {
          display:flex; align-items:center;
          background:rgba(255,255,255,.06); border:1px solid rgba(201,169,110,.2);
          border-radius:13px; height:27px; overflow:hidden;
          transition:border-color .25s,background .25s,box-shadow .25s;
        }
        .tnav-search-field:focus-within {
          border-color:rgba(201,169,110,.55); background:rgba(255,255,255,.09);
          box-shadow:0 0 0 3px rgba(201,169,110,.08);
        }
        .tnav-search-icon-btn { display:flex; align-items:center; padding:0 8px 0 11px; color:rgba(201,169,110,.5); font-size:.63rem; flex-shrink:0; background:none; border:none; cursor:default; }
        .tnav-search-input {
          flex:1; height:100%; background:transparent; border:none; outline:none;
          font-size:.72rem; color:rgba(248,245,240,.85); font-family:'DM Sans',sans-serif;
          padding-right:8px;
        }
        .tnav-search-input::placeholder { color:rgba(248,245,240,.3); }
        .tnav-search-clear { display:flex; align-items:center; padding:0 8px; color:rgba(201,169,110,.5); font-size:.6rem; cursor:pointer; background:none; border:none; transition:color .2s; flex-shrink:0; }
        .tnav-search-clear:hover { color:#C9A96E; }

        /* Search dropdown */
        .tnav-results {
          position:absolute; top:calc(100% + 8px); left:0; right:0;
          background:#0F2040; border:1px solid rgba(201,169,110,.25);
          border-radius:8px; overflow:hidden; z-index:500;
          box-shadow:0 12px 36px rgba(0,0,0,.5);
          max-height:320px; overflow-y:auto;
        }
        .tnav-results::-webkit-scrollbar { width:4px; }
        .tnav-results::-webkit-scrollbar-track { background:transparent; }
        .tnav-results::-webkit-scrollbar-thumb { background:rgba(201,169,110,.3); border-radius:2px; }
        .tnav-result-item {
          display:flex; align-items:center; gap:11px;
          padding:10px 14px; cursor:pointer; border-bottom:1px solid rgba(201,169,110,.06);
          transition:background .15s;
        }
        .tnav-result-item:last-child { border-bottom:none; }
        .tnav-result-item:hover { background:rgba(201,169,110,.07); }
        .tnav-result-img { width:38px; height:38px; border-radius:5px; object-fit:cover; flex-shrink:0; border:1px solid rgba(201,169,110,.15); }
        .tnav-result-img-placeholder { width:38px; height:38px; border-radius:5px; background:rgba(255,255,255,.06); flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:.9rem; }
        .tnav-result-title { font-size:.78rem; font-weight:500; color:rgba(248,245,240,.85); margin-bottom:2px; line-height:1.3; }
        .tnav-result-cat { font-size:.64rem; letter-spacing:.06em; font-weight:600; }
        .tnav-no-result { padding:16px 14px; font-size:.78rem; color:rgba(248,245,240,.4); text-align:center; font-family:'DM Sans',sans-serif; }

        /* ── Right controls ── */
        .tnav-right { display:flex; align-items:center; gap:8px; flex-shrink:0; }
        .tnav-mob-btn {
          display:none; width:28px; height:28px; border-radius:50%;
          border:1px solid rgba(201,169,110,.22); background:transparent;
          color:rgba(201,169,110,.7); align-items:center; justify-content:center;
          cursor:pointer; font-size:.7rem; flex-shrink:0;
          transition:border-color .2s,color .2s,background .2s,transform .2s;
        }
        .tnav-mob-btn:hover { border-color:#C9A96E; color:#C9A96E; background:rgba(201,169,110,.1); transform:scale(1.12); }

        /* Theme toggle */
        .tt-wrap { position:relative; width:42px; height:22px; cursor:pointer; flex-shrink:0; }
        .tt-track { width:100%; height:100%; border-radius:11px; background:rgba(201,169,110,.1); border:1px solid rgba(201,169,110,.22); position:relative; transition:background .3s,border-color .3s; }
        .tt-wrap.light .tt-track { background:rgba(201,169,110,.28); border-color:rgba(201,169,110,.5); }
        .tt-thumb { position:absolute; top:2px; left:2px; width:16px; height:16px; border-radius:50%; background:linear-gradient(135deg,#C9A96E,#A87C40); transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s; display:flex; align-items:center; justify-content:center; font-size:.58rem; box-shadow:0 1px 5px rgba(0,0,0,.35); line-height:1; }
        .tt-wrap.light .tt-thumb { transform:translateX(20px); }
        .tt-thumb:hover { box-shadow:0 0 10px rgba(201,169,110,.5); }

        /* Language */
        .lang-wrap { position:relative; }
        .lang-btn { display:flex; align-items:center; gap:5px; background:rgba(201,169,110,.07); border:1px solid rgba(201,169,110,.2); border-radius:4px; padding:3px 8px; color:rgba(201,169,110,.85); font-size:.7rem; font-weight:500; letter-spacing:.04em; cursor:pointer; font-family:'DM Sans',sans-serif; transition:border-color .2s,background .2s; white-space:nowrap; }
        .lang-btn:hover { border-color:#C9A96E; background:rgba(201,169,110,.14); }
        .lang-chev { transition:transform .25s; }
        .lang-chev.open { transform:rotate(180deg); }
        .lang-drop { position:absolute; top:calc(100% + 6px); right:0; background:#0F2040; border:1px solid rgba(201,169,110,.25); border-radius:7px; overflow:hidden; min-width:112px; box-shadow:0 10px 28px rgba(0,0,0,.45); z-index:300; opacity:0; transform:translateY(-8px) scale(.96); pointer-events:none; transition:opacity .22s cubic-bezier(.22,1,.36,1),transform .22s cubic-bezier(.22,1,.36,1); }
        .lang-drop.open { opacity:1; transform:none; pointer-events:auto; }
        .lang-opt { display:flex; align-items:center; gap:9px; padding:9px 14px; cursor:pointer; font-size:.76rem; color:rgba(248,245,240,.6); font-family:'DM Sans',sans-serif; transition:background .15s,color .15s; border-bottom:1px solid rgba(201,169,110,.07); }
        .lang-opt:last-child { border-bottom:none; }
        .lang-opt:hover { background:rgba(201,169,110,.09); color:#C9A96E; }
        .lang-opt.active { color:#C9A96E; font-weight:600; }
        .lang-flag { font-size:.9rem; }
        .lang-chk { margin-left:auto; font-size:.68rem; color:#C9A96E; }

        /* Mobile search overlay */
        .tnav-mob-overlay { position:absolute; inset:0; height:40px; background:#0A1628; border-bottom:1px solid rgba(201,169,110,.22); display:flex; align-items:center; padding:0 12px; gap:8px; transform:translateY(-100%); opacity:0; transition:transform .3s cubic-bezier(.22,1,.36,1),opacity .3s; pointer-events:none; z-index:200; }
        .tnav-mob-overlay.open { transform:translateY(0); opacity:1; pointer-events:auto; }
        .tnav-mob-overlay .tnav-results { top:calc(100% + 8px); left:0; right:0; }
        .tnav-mob-input { flex:1; height:27px; background:rgba(255,255,255,.07); border:1px solid rgba(201,169,110,.28); border-radius:14px; padding:0 14px; font-size:.78rem; color:rgba(248,245,240,.85); font-family:'DM Sans',sans-serif; outline:none; }
        .tnav-mob-input::placeholder { color:rgba(248,245,240,.3); }
        .tnav-mob-close { width:27px; height:27px; border-radius:50%; border:1px solid rgba(201,169,110,.2); background:transparent; color:rgba(201,169,110,.65); display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:.7rem; flex-shrink:0; transition:color .2s,border-color .2s; }
        .tnav-mob-close:hover { color:#C9A96E; border-color:#C9A96E; }

        @media(max-width:768px) {
          .tnav-search-wrap    { display:none!important; }
          .tnav-mob-btn        { display:flex!important; }
        }
        @media(max-width:520px) { .tnav-social.em{display:none} }
        @media(max-width:400px) { .tnav-social.yt{display:none} .tnav-inner{padding:0 10px;gap:5px} }
      `}</style>

      <div className="tnav">
        <div className="tnav-inner">

          {/* Socials */}
          <div className="tnav-left">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="tnav-social fb"><FaFacebookF/></a>
            <a href="https://youtube.com"  target="_blank" rel="noreferrer" className="tnav-social yt"><FaYoutube/></a>
            <a href="mailto:btanjil17@gmail.com"                            className="tnav-social em"><FaEnvelope/></a>
          </div>

          <div className="tnav-div"/>

          {/* Desktop search */}
          <div className="tnav-search-wrap">
            <div className="tnav-search-field">
              <div className="tnav-search-icon-btn"><FaSearch/></div>
              <input
                ref={searchRef}
                className="tnav-search-input"
                type="text"
                placeholder="Search treatments..."
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                onKeyDown={handleSearchKey}
                onFocus={() => searchVal && setShowResults(true)}
              />
              {searchVal && (
                <button className="tnav-search-clear" onClick={clearSearch}><FaTimes/></button>
              )}
            </div>

            {/* Results dropdown */}
            {showResults && (
              <div className="tnav-results" ref={resultsRef}>
                {searchResults.length === 0 ? (
                  <div className="tnav-no-result">No treatments found for "{searchVal}"</div>
                ) : (
                  searchResults.map(t => (
                    <div key={t._id || t.slug} className="tnav-result-item" onClick={() => handleResultClick(t.slug)}>
                      {t.image
                        ? <img src={t.image} alt={t.title} className="tnav-result-img"/>
                        : <div className="tnav-result-img-placeholder">🏥</div>
                      }
                      <div>
                        <div className="tnav-result-title">{t.title}</div>
                        <div className="tnav-result-cat" style={{ color: categoryColors[t.category] || "#C9A96E" }}>
                          {t.category}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Right controls */}
          <div className="tnav-right">

            {/* Mobile search btn */}
            <button className="tnav-mob-btn" onClick={() => setSearchOpen(true)}><FaSearch/></button>

            <div className="tnav-div"/>

            {/* Theme toggle */}
            <div className={`tt-wrap ${theme === "light" ? "light" : ""}`} onClick={toggleTheme} title={theme === "dark" ? "Light mode" : "Dark mode"}>
              <div className="tt-track">
                <div className="tt-thumb">{theme === "dark" ? "🌙" : "☀️"}</div>
              </div>
            </div>

            <div className="tnav-div"/>

            {/* Language */}
            <div className="lang-wrap" ref={langRef}>
              <button className="lang-btn" onClick={() => setLangOpen(v => !v)}>
                <span>{lang === "en" ? "🇬🇧" : "🇧🇩"}</span>
                <span>{lang === "en" ? "EN" : "বাং"}</span>
                <svg className={`lang-chev ${langOpen ? "open" : ""}`} width="9" height="6" viewBox="0 0 9 6" fill="none">
                  <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              <div className={`lang-drop ${langOpen ? "open" : ""}`}>
                <div className={`lang-opt ${lang==="en"?"active":""}`} onClick={() => selectLang("en")}><span className="lang-flag">🇬🇧</span><span>English</span>{lang==="en"&&<span className="lang-chk">✓</span>}</div>
                <div className={`lang-opt ${lang==="bn"?"active":""}`} onClick={() => selectLang("bn")}><span className="lang-flag">🇧🇩</span><span>বাংলা</span>{lang==="bn"&&<span className="lang-chk">✓</span>}</div>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile search overlay */}
        <div className={`tnav-mob-overlay ${searchOpen ? "open" : ""}`}>
          <FaSearch style={{ color:"rgba(201,169,110,.45)",fontSize:".68rem",flexShrink:0 }}/>
          <input
            ref={mobSearchRef}
            className="tnav-mob-input"
            type="text"
            placeholder="Search treatments..."
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            onKeyDown={handleSearchKey}
          />
          <button className="tnav-mob-close" onClick={() => { setSearchOpen(false); clearSearch(); }}><FaTimes/></button>

          {/* Mobile results dropdown — sits below overlay */}
          {showResults && searchOpen && (
            <div className="tnav-results" ref={resultsRef} style={{ position:"fixed",top:80,left:12,right:12,zIndex:500 }}>
              {searchResults.length === 0 ? (
                <div className="tnav-no-result">No results for "{searchVal}"</div>
              ) : (
                searchResults.map(t => (
                  <div key={t._id || t.slug} className="tnav-result-item" onClick={() => handleResultClick(t.slug)}>
                    {t.image ? <img src={t.image} alt={t.title} className="tnav-result-img"/> : <div className="tnav-result-img-placeholder">🏥</div>}
                    <div>
                      <div className="tnav-result-title">{t.title}</div>
                      <div className="tnav-result-cat" style={{ color: categoryColors[t.category] || "#C9A96E" }}>{t.category}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
