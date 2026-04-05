import React, { useEffect, useRef, useState } from "react";

const YT_CHANNEL_URL = "https://www.youtube.com/@tanjilslaserlaparoscopy4123"; 

const videos = [
  {
    id: "dp3FTjobM6g", 
    title: "পাইলস রোগ কি ও কেন",
    views: "7.3K",
    duration: "04:47",
    date: "5 years ago",
    featured: true,
  },
  {
    id: "Qm09emjZS-4",
    title: "ল্যাপারোস্কোপির মাধ্যমে পিত্তথরির পাথর অপারেশন",
    // views: "9.1K",
    duration: "07:00",
    date: "1 month ago",
    featured: false,
  },
  {
    id: "6pvthXmPxRI",
    title: "মলদ্বারে ফিস্টুলা কী করবেন বুঝতে পারছেন না",
    // views: "9.1K",
    duration: "06:18",
    date: "1 month ago",
    featured: false,
  },
  {
    id: "0nFDr1oIyYA",
    title: "Laser Haemorrhoidoplasty",
    // views: "9.1K",
    duration: "02:33",
    date: "1 month ago",
    featured: false,
  },
  {
    id: "TuhFNZOMAKc",
    title: "স্তন ক্যান্সার সচেতনতা পার্ট -১",
    // views: "9.1K",
    duration: "05:23",
    date: "1 month ago",
    featured: false,
  },
  {
    id: "RvIFkRYGr_A",
    title: "পাইলস রোগে অত্যাধুনিক লেজার চিকিৎসা এখন ফরিদপুরে",
    // views: "9.1K",
    duration: "01:57",
    date: "1 month ago",
    featured: false,
  },
  
];

const thumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const embedUrl = (id) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
const ytUrl = (id) => `https://www.youtube.com/watch?v=${id}`;
const CATEGORIES = ["All", "Laparoscopic", "Laser", "Cancer", "Education"];

/* ── small helper components ── */
function PlayIconSVG({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <polygon points="5,3 19,12 5,21" fill="currentColor" />
    </svg>
  );
}
function YTLogoSVG() {
  return (
    <svg width="16" height="11" viewBox="0 0 24 16" fill="none">
      <path d="M23.5 2.5a3 3 0 00-2.1-2.1C19.5 0 12 0 12 0S4.5 0 2.6.4A3 3 0 00.5 2.5C0 4.4 0 8 0 8s0 3.6.5 5.5a3 3 0 002.1 2.1C4.5 16 12 16 12 16s7.5 0 9.4-.4a3 3 0 002.1-2.1C24 11.6 24 8 24 8s0-3.6-.5-5.5z" fill="#fff" fillOpacity=".9" />
      <polygon points="9.75,11.5 15.5,8 9.75,4.5" fill="#FF0000" />
    </svg>
  );
}

/* ── Modal ── */
function VideoModal({ video, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <>
      <style>{`
        .modal-backdrop { position:fixed; inset:0; background:rgba(0,0,0,.9); z-index:1000; display:flex; align-items:center; justify-content:center; padding:20px; animation:modalFadeIn .25s ease; }
        @keyframes modalFadeIn { from{opacity:0} to{opacity:1} }
        .modal-box { width:100%; max-width:840px; background:#0A1628; border:1px solid rgba(201,169,110,.25); border-radius:14px; overflow:hidden; box-shadow:0 32px 100px rgba(0,0,0,.7); animation:modalIn .35s cubic-bezier(.22,1,.36,1); }
        @keyframes modalIn { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }
        .modal-iframe-wrap { position:relative; aspect-ratio:16/9; background:#000; }
        .modal-iframe-wrap iframe { width:100%; height:100%; border:none; }
        .modal-close-btn { position:absolute; top:12px; right:12px; width:36px; height:36px; border-radius:50%; background:rgba(0,0,0,.75); border:1px solid rgba(255,255,255,.2); color:#fff; font-size:1.1rem; cursor:pointer; display:flex; align-items:center; justify-content:center; z-index:10; transition:background .2s; }
        .modal-close-btn:hover { background:rgba(201,169,110,.3); border-color:#C9A96E; }
        .modal-info { padding:18px 22px 22px; }
        .modal-cat { font-size:.67rem; letter-spacing:.1em; text-transform:uppercase; color:#C9A96E; margin-bottom:6px; font-family:'DM Sans',sans-serif; }
        .modal-title { font-family:'Cormorant Garamond',serif; font-size:1.25rem; font-weight:700; color:#F8F5F0; margin-bottom:12px; }
        .modal-actions { display:flex; gap:10px; flex-wrap:wrap; }
        .modal-btn-yt { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#C9A96E,#A87C40); color:#0A1628; font-family:'DM Sans',sans-serif; font-weight:600; font-size:.82rem; letter-spacing:.04em; padding:10px 22px; border-radius:3px; border:none; cursor:pointer; text-decoration:none; transition:filter .25s; }
        .modal-btn-yt:hover { filter:brightness(1.1); }
        .modal-btn-close { display:inline-flex; align-items:center; gap:8px; background:transparent; color:#F8F5F0; font-family:'DM Sans',sans-serif; font-weight:400; font-size:.82rem; padding:10px 20px; border-radius:3px; border:1px solid rgba(255,255,255,.15); cursor:pointer; transition:border-color .25s; }
        .modal-btn-close:hover { border-color:#C9A96E; }
      `}</style>
      <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="modal-box">
          <div className="modal-iframe-wrap">
            <iframe src={embedUrl(video.id)} allowFullScreen allow="autoplay; encrypted-media" title={video.title} />
            <button className="modal-close-btn" onClick={onClose}>✕</button>
          </div>
          <div className="modal-info">
            <div className="modal-cat">{video.category}</div>
            <div className="modal-title">{video.title}</div>
            <div className="modal-actions">
              <a className="modal-btn-yt" href={ytUrl(video.id)} target="_blank" rel="noopener noreferrer">
                <YTLogoSVG /> Open on YouTube
              </a>
              <button className="modal-btn-close" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Video Card ── */
function VideoCard({ video, onClick, delay }) {
  return (
    <div
      className="vid-card"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onClick(video)}
      data-reveal="scale"
      data-delay={delay}
    >
      <div className="vid-thumb-wrap">
        <img src={thumb(video.id)} alt={video.title} loading="lazy" />
        <div className="vid-thumb-overlay">
          <div className="vid-play-icon"><PlayIconSVG size={18} /></div>
        </div>
        <div className="vid-duration">{video.duration}</div>
      </div>
      <div className="vid-card-body">
        <div className="vid-card-title">{video.title}</div>
        <div className="vid-card-meta">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="vid-meta-item">{video.date}</span>
          </div>
          <a
            className="vid-yt-link"
            href={ytUrl(video.id)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            YouTube ↗
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ── */
export default function VideoSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [modalVideo, setModalVideo] = useState(null);
  const [featuredPlaying, setFeaturedPlaying] = useState(false);
  const sectionRef = useRef(null);

  const featured = videos.find((v) => v.featured) || videos[0];

  const filtered = (activeFilter === "All" ? videos : videos.filter((v) => v.category === activeFilter))
    .filter((v) => v.id !== featured.id);

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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        [data-reveal] { opacity:0; transform:translateY(36px); transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1); }
        [data-reveal="scale"] { transform:scale(.92); }
        [data-reveal].revealed { opacity:1!important; transform:none!important; }

        .vid-section { background:#0A1628; position:relative; overflow:hidden; padding:100px 24px; font-family:'DM Sans',sans-serif; }
        .vid-section::before { content:''; position:absolute; inset:0; background-image:radial-gradient(rgba(201,169,110,.05) 1px,transparent 1px); background-size:32px 32px; pointer-events:none; animation:vGridDrift 22s linear infinite; }
        @keyframes vGridDrift { to{background-position:32px 32px} }

        .vid-blob { position:absolute; border-radius:50%; pointer-events:none; animation:vBlob 10s ease-in-out infinite; }
        @keyframes vBlob { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.2);opacity:.85} }
        .vid-particle { position:absolute; border-radius:50%; pointer-events:none; animation:vParticle linear infinite; }
        @keyframes vParticle { 0%{transform:translateY(0);opacity:0} 10%{opacity:.8} 90%{opacity:.2} 100%{transform:translateY(-140px);opacity:0} }

        .vid-inner { max-width:1180px; margin:0 auto; position:relative; }
        .vid-header { text-align:center; margin-bottom:52px; }

        .vid-tag { display:inline-flex; align-items:center; gap:8px; background:rgba(201,169,110,.1); border:1px solid rgba(201,169,110,.28); border-radius:20px; padding:5px 16px; margin-bottom:20px; }
        .vid-tag-dot { width:5px; height:5px; border-radius:50%; background:#C9A96E; animation:vDot 2s ease-in-out infinite; }
        @keyframes vDot { 0%,100%{box-shadow:0 0 0 0 rgba(201,169,110,.5)} 50%{box-shadow:0 0 0 6px rgba(201,169,110,0)} }
        .vid-tag-text { font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; color:#C9A96E; }

        .vid-h2 { font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,5vw,3.4rem); font-weight:700; color:#F8F5F0; line-height:1.1; margin-bottom:14px; }
        .vid-h2 span { background:linear-gradient(90deg,#C9A96E,#E8D5A3,#C9A96E); background-size:200%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:vShimmer 3s linear infinite; }
        @keyframes vShimmer { to{background-position:200% center} }
        .vid-sub { font-size:.93rem; color:rgba(248,245,240,.5); max-width:500px; margin:0 auto; line-height:1.7; }

        .vid-filter-row { display:flex; justify-content:center; flex-wrap:wrap; gap:8px; margin-bottom:48px; }
        .vid-filter-btn { padding:7px 20px; font-size:.78rem; font-weight:500; letter-spacing:.06em; text-transform:uppercase; border-radius:3px; border:1px solid rgba(201,169,110,.2); background:transparent; color:rgba(248,245,240,.5); cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .25s; }
        .vid-filter-btn:hover { border-color:rgba(201,169,110,.5); color:rgba(248,245,240,.85); }
        .vid-filter-btn.active { background:linear-gradient(135deg,#C9A96E,#A87C40); border-color:transparent; color:#0A1628; font-weight:600; box-shadow:0 4px 16px rgba(201,169,110,.3); }

        /* featured */
        .vid-featured { margin-bottom:32px; border-radius:14px; overflow:hidden; border:1px solid rgba(201,169,110,.2); box-shadow:0 24px 80px rgba(0,0,0,.5); position:relative; background:#000; cursor:pointer; }
        .vid-featured-img { width:100%; aspect-ratio:16/9; object-fit:cover; display:block; transition:transform .4s ease; }
        .vid-featured:hover .vid-featured-img { transform:scale(1.02); }
        .vid-featured-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(10,22,40,.95) 0%,rgba(10,22,40,.4) 50%,transparent 100%); display:flex; flex-direction:column; justify-content:flex-end; padding:clamp(16px,4vw,32px); }
        .vid-featured-tag { display:inline-flex; align-items:center; gap:6px; background:rgba(201,169,110,.15); border:1px solid rgba(201,169,110,.35); border-radius:20px; padding:4px 12px; width:fit-content; margin-bottom:12px; }
        .vid-featured-tag-dot { width:5px; height:5px; border-radius:50%; background:#C9A96E; flex-shrink:0; }
        .vid-featured-tag-text { font-size:.68rem; letter-spacing:.1em; text-transform:uppercase; color:#E8D5A3; }
        .vid-featured-title { font-family:'Cormorant Garamond',serif; font-size:clamp(1.2rem,2.5vw,2rem); font-weight:700; color:#F8F5F0; line-height:1.2; margin-bottom:10px; }
        .vid-featured-meta { display:flex; align-items:center; gap:14px; margin-bottom:18px; flex-wrap:wrap; }
        .vid-featured-meta span { font-size:.75rem; color:rgba(248,245,240,.5); }

        .vid-play-big { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:68px; height:68px; border-radius:50%; background:rgba(201,169,110,.15); border:2px solid rgba(201,169,110,.5); display:flex; align-items:center; justify-content:center; backdrop-filter:blur(8px); transition:background .3s,transform .3s,border-color .3s; }
        .vid-featured:hover .vid-play-big { background:rgba(201,169,110,.3); border-color:#C9A96E; transform:translate(-50%,-50%) scale(1.1); }

        .vid-featured-embed { position:absolute; inset:0; display:none; background:#000; }
        .vid-featured-embed.active { display:block; }
        .vid-featured-embed iframe { width:100%; height:100%; border:none; }
        .vid-embed-close { position:absolute; top:14px; right:14px; width:34px; height:34px; border-radius:50%; background:rgba(0,0,0,.7); border:1px solid rgba(255,255,255,.2); color:#fff; font-size:1rem; cursor:pointer; display:flex; align-items:center; justify-content:center; z-index:10; transition:background .2s; }
        .vid-embed-close:hover { background:rgba(201,169,110,.3); border-color:#C9A96E; }

        .vid-featured-actions { display:flex; gap:10px; flex-wrap:wrap; }
        .btn-play-gold { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#C9A96E,#A87C40); color:#0A1628; font-family:'DM Sans',sans-serif; font-weight:600; font-size:.82rem; letter-spacing:.04em; padding:10px 22px; border-radius:3px; border:none; cursor:pointer; box-shadow:0 4px 20px rgba(201,169,110,.3); transition:filter .25s,transform .25s; text-decoration:none; }
        .btn-play-gold:hover { filter:brightness(1.1); transform:translateY(-1px); }
        .btn-ghost { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,.07); color:#F8F5F0; font-family:'DM Sans',sans-serif; font-weight:400; font-size:.82rem; padding:10px 20px; border-radius:3px; border:1px solid rgba(255,255,255,.15); cursor:pointer; transition:border-color .25s,background .25s; text-decoration:none; }
        .btn-ghost:hover { border-color:#C9A96E; background:rgba(201,169,110,.08); }

        /* grid */
        .vid-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
        @media(max-width:900px) { .vid-grid{grid-template-columns:repeat(2,1fr)} }
        @media(max-width:560px) { .vid-grid{grid-template-columns:1fr} }

        /* card */
        .vid-card { background:rgba(255,255,255,.03); border:1px solid rgba(201,169,110,.12); border-radius:10px; overflow:hidden; cursor:pointer; transition:border-color .3s,box-shadow .3s,transform .3s; }
        .vid-card:hover { border-color:rgba(201,169,110,.35); box-shadow:0 12px 40px rgba(0,0,0,.4); transform:translateY(-4px); }
        .vid-thumb-wrap { position:relative; overflow:hidden; aspect-ratio:16/9; background:#000; }
        .vid-thumb-wrap img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .4s; }
        .vid-card:hover .vid-thumb-wrap img { transform:scale(1.06); }
        .vid-thumb-overlay { position:absolute; inset:0; background:rgba(10,22,40,.45); display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity .3s; }
        .vid-card:hover .vid-thumb-overlay { opacity:1; }
        .vid-play-icon { width:48px; height:48px; border-radius:50%; background:rgba(201,169,110,.2); border:2px solid rgba(201,169,110,.6); display:flex; align-items:center; justify-content:center; color:#C9A96E; transition:background .3s,transform .3s; }
        .vid-card:hover .vid-play-icon { background:rgba(201,169,110,.35); transform:scale(1.12); }
        .vid-duration { position:absolute; bottom:8px; right:8px; background:rgba(0,0,0,.8); color:#fff; font-size:.68rem; font-weight:600; padding:2px 7px; border-radius:3px; }
        .vid-cat-badge { position:absolute; top:8px; left:8px; background:rgba(10,22,40,.85); border:1px solid rgba(201,169,110,.3); border-radius:4px; padding:2px 8px; font-size:.62rem; letter-spacing:.07em; text-transform:uppercase; color:#C9A96E; font-family:'DM Sans',sans-serif; }
        .vid-card-body { padding:14px 16px; }
        .vid-card-title { font-size:.9rem; font-weight:500; color:#F8F5F0; line-height:1.35; margin-bottom:8px; }
        .vid-card-meta { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:6px; }
        .vid-meta-item { font-size:.7rem; color:rgba(248,245,240,.4); }
        .vid-yt-link { font-size:.7rem; color:rgba(201,169,110,.6); text-decoration:none; border-bottom:1px solid transparent; transition:color .2s,border-color .2s; }
        .vid-yt-link:hover { color:#C9A96E; border-color:#C9A96E; }

        /* channel cta */
        .vid-channel-cta { margin-top:52px; border:1px solid rgba(201,169,110,.2); border-radius:12px; background:rgba(255,255,255,.02); display:flex; align-items:center; padding:clamp(18px,3vw,28px) clamp(18px,3vw,32px); gap:24px; flex-wrap:wrap; }
        .cta-avatar-wrap { position:relative; flex-shrink:0; }
        .cta-avatar { width:68px; height:68px; border-radius:50%; object-fit:cover; object-position:top; border:2px solid rgba(201,169,110,.5); }
        .cta-yt-badge { position:absolute; bottom:-4px; right:-4px; width:22px; height:22px; border-radius:50%; background:#FF0000; display:flex; align-items:center; justify-content:center; border:2px solid #0A1628; }
        .cta-info { flex:1; min-width:200px; }
        .cta-title { font-family:'Cormorant Garamond',serif; font-size:1.35rem; font-weight:700; color:#F8F5F0; margin-bottom:4px; }
        .cta-sub { font-size:.8rem; color:rgba(248,245,240,.45); line-height:1.5; }
        .cta-stats { display:flex; gap:20px; margin-top:10px; }
        .cta-stat-val { font-family:'Cormorant Garamond',serif; font-size:1.1rem; font-weight:700; color:#C9A96E; }
        .cta-stat-lbl { font-size:.62rem; color:rgba(248,245,240,.35); letter-spacing:.07em; text-transform:uppercase; }
        .btn-subscribe { display:inline-flex; align-items:center; gap:8px; background:#FF0000; color:#fff; font-family:'DM Sans',sans-serif; font-weight:600; font-size:.82rem; letter-spacing:.04em; padding:11px 24px; border-radius:3px; border:none; cursor:pointer; text-decoration:none; white-space:nowrap; box-shadow:0 4px 18px rgba(255,0,0,.3); transition:filter .25s,transform .25s; }
        .btn-subscribe:hover { filter:brightness(1.12); transform:translateY(-1px); }
      `}</style>

      <section id="videos" className="vid-section" ref={sectionRef}>
        <div className="vid-blob" style={{ width: 450, height: 450, top: -120, left: -100, background: "radial-gradient(circle,rgba(201,169,110,.06) 0%,transparent 70%)" }} />
        <div className="vid-blob" style={{ width: 320, height: 320, bottom: -80, right: -80, background: "radial-gradient(circle,rgba(201,169,110,.05) 0%,transparent 70%)", animationDelay: "5s" }} />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="vid-particle" style={{ width: `${3 + (i % 3) * 3}px`, height: `${3 + (i % 3) * 3}px`, background: `rgba(201,169,110,${.1 + (i % 4) * .05})`, left: `${8 + i * 14}%`, bottom: `${6 + (i % 5) * 12}%`, animationDuration: `${8 + i * 1.3}s`, animationDelay: `${i * .8}s` }} />
        ))}

        <div className="vid-inner">
          {/* Header */}
          <div className="vid-header" data-reveal data-delay="0">
            <div className="vid-tag"><div className="vid-tag-dot" /><span className="vid-tag-text">YouTube Channel</span></div>
            <h2 className="vid-h2">Watch &amp; <span>Become Aware</span></h2>
            <p className="vid-sub">Explore surgical insights, patient education videos, and procedure walkthroughs from Dr. ASM Tanjilur Rahman's official YouTube channel.</p>
          </div>

          {/* Featured */}
          <div className="vid-featured" data-reveal data-delay="180" onClick={() => !featuredPlaying && setFeaturedPlaying(true)}>
            <img className="vid-featured-img" src={thumb(featured.id)} alt={featured.title} />
            {!featuredPlaying && (
              <div className="vid-featured-overlay">
                <div className="vid-play-big">
                  <PlayIconSVG size={22} />
                </div>
                <div>
                  <div className="vid-featured-tag"><div className="vid-featured-tag-dot" /></div>
                  <div className="vid-featured-title">{featured.title}</div>
                  <div className="vid-featured-meta">
                    <span>👁 {featured.views} views</span>
                    <span>⏱ {featured.duration}</span>
                    <span>{featured.date}</span>
                  </div>
                  <div className="vid-featured-actions" onClick={(e) => e.stopPropagation()}>
                    <button className="btn-play-gold" onClick={() => setFeaturedPlaying(true)}>
                      <PlayIconSVG /> Watch Now
                    </button>
                    <a className="btn-ghost" href={ytUrl(featured.id)} target="_blank" rel="noopener noreferrer">
                      <YTLogoSVG /> Open on YouTube
                    </a>
                  </div>
                </div>
              </div>
            )}
            {featuredPlaying && (
              <div className="vid-featured-embed active">
                <iframe src={embedUrl(featured.id)} allowFullScreen allow="autoplay; encrypted-media" title={featured.title} />
                <button className="vid-embed-close" onClick={(e) => { e.stopPropagation(); setFeaturedPlaying(false); }}>✕</button>
              </div>
            )}
          </div>

          {/* Grid */}
          <div className="vid-grid">
            {filtered.map((v, i) => (
              <VideoCard key={v.id} video={v} onClick={setModalVideo} delay={i * 70} />
            ))}
          </div>

          {/* Channel CTA */}
          <div className="vid-channel-cta" data-reveal data-delay="500">
            <div className="cta-avatar-wrap">
              <img className="cta-avatar" src="/dp.png" alt="Dr ASM Tanjilur Rahman" />
              <div className="cta-yt-badge">
                <svg width="10" height="7" viewBox="0 0 24 16" fill="none">
                  <path d="M23.5 2.5a3 3 0 00-2.1-2.1C19.5 0 12 0 12 0S4.5 0 2.6.4A3 3 0 00.5 2.5C0 4.4 0 8 0 8s0 3.6.5 5.5a3 3 0 002.1 2.1C4.5 16 12 16 12 16s7.5 0 9.4-.4a3 3 0 002.1-2.1C24 11.6 24 8 24 8s0-3.6-.5-5.5z" fill="#fff" fillOpacity=".9" />
                  <polygon points="9.75,11.5 15.5,8 9.75,4.5" fill="#FF0000" />
                </svg>
              </div>
            </div>
            <div className="cta-info">
              <div className="cta-title">Dr. ASM Tanjilur Rahman</div>
              <div className="cta-sub">Subscribe to get the latest surgical education videos, patient stories, and procedure insights.</div>
              <div className="cta-stats">
                <div><div className="cta-stat-val">50+</div><div className="cta-stat-lbl">Videos</div></div>
                <div><div className="cta-stat-val">7K+</div><div className="cta-stat-lbl">Surgeries</div></div>
                <div><div className="cta-stat-val">15+</div><div className="cta-stat-lbl">Yrs Exp</div></div>
              </div>
            </div>
            <a className="btn-subscribe" href={YT_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
              <YTLogoSVG /> Subscribe on YouTube
            </a>
          </div>
        </div>

        {/* Modal */}
        {modalVideo && <VideoModal video={modalVideo} onClose={() => setModalVideo(null)} />}
      </section>
    </>
  );
}