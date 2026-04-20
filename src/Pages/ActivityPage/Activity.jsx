import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../Context/LanguageContext";
import translations from "../../i18n/translations";
import { FaGraduationCap, FaUserDoctor, FaHandshake, FaFlask } from "react-icons/fa6";
import { academicData, surgeryData, socialData, researchData } from "../../data/activityData.jsx";

/* ── Activity Page ────────────────────────────────────────────── */

export default function Activity() {
  const [activeTab, setActiveTab] = useState("Academic");
  const [revealed, setRevealed] = useState(false);
  const [expandedBlogs, setExpandedBlogs] = useState({});
  const heroRef = useRef(null);
  const { lang } = useLanguage();
  const tr = translations[lang];

  const toggleBlog = (id) =>
    setExpandedBlogs((prev) => ({ ...prev, [id]: !prev[id] }));

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Reset reveal animation on tab change
  const [tabKey, setTabKey] = useState(0);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setTabKey((k) => k + 1);
  };

  return (
    <>
      <style>{`
        /* ── Base ── */
        .act-page {
          min-height: 100vh;
          background: #0A1628;
          font-family: 'DM Sans', sans-serif;
          color: #F8F5F0;
        }

        /* ── Hero Banner ── */
        .act-hero {
          position: relative;
          overflow: hidden;
          padding: 90px 24px 70px;
          text-align: center;
          background: linear-gradient(160deg, #0A1628 0%, #0F2040 50%, #0A1628 100%);
        }
        .act-hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('/doctor.jpg');
          background-size: cover;
          background-position: center top;
          background-repeat: no-repeat;
          opacity: 0.13;
          pointer-events: none;
        }
        .act-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(201,169,110,.06) 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none;
        }
        .act-hero-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
        }
        .act-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(201,169,110,.1);
          border: 1px solid rgba(201,169,110,.3);
          border-radius: 20px;
          padding: 5px 16px;
          font-size: .72rem;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #C9A96E;
          margin-bottom: 22px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .7s .1s, transform .7s .1s cubic-bezier(.22,1,.36,1);
        }
        .act-hero-eyebrow.in { opacity: 1; transform: none; }
        .act-hero-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #C9A96E;
          animation: actDotPulse 2s ease-in-out infinite;
        }
        @keyframes actDotPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(201,169,110,.5); }
          50%      { box-shadow: 0 0 0 6px rgba(201,169,110,0); }
        }
        .act-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 6vw, 4.2rem);
          font-weight: 700;
          line-height: 1.08;
          margin-bottom: 18px;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity .75s .22s, transform .75s .22s cubic-bezier(.22,1,.36,1);
        }
        .act-hero-title.in { opacity: 1; transform: none; }
        .act-hero-title span {
          background: linear-gradient(90deg, #C9A96E, #E8D5A3, #C9A96E);
          background-size: 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: actShimmer 3s linear infinite;
        }
        @keyframes actShimmer { to { background-position: 200% center; } }
        .act-hero-sub {
          max-width: 560px;
          margin: 0 auto 36px;
          font-size: 1rem;
          color: rgba(248,245,240,.58);
          line-height: 1.8;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .7s .38s, transform .7s .38s cubic-bezier(.22,1,.36,1);
        }
        .act-hero-sub.in { opacity: 1; transform: none; }

        /* Stats row */
        .act-stats {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
          margin-bottom: 54px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .7s .5s, transform .7s .5s cubic-bezier(.22,1,.36,1);
        }
        .act-stats.in { opacity: 1; transform: none; }
        .act-stat-item { text-align: center; }
        .act-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem; font-weight: 700;
          color: #C9A96E; line-height: 1;
        }
        .act-stat-label {
          font-size: .7rem; letter-spacing: .1em;
          text-transform: uppercase; color: rgba(248,245,240,.45);
          margin-top: 4px;
        }
        .act-stat-div { width: 1px; background: rgba(201,169,110,.18); align-self: stretch; }

        /* ── Tab bar ── */
        .act-tabs-wrap {
          display: flex;
          justify-content: center;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity .65s .6s, transform .65s .6s cubic-bezier(.22,1,.36,1);
        }
        .act-tabs-wrap.in { opacity: 1; transform: none; }
        .act-tabs {
          display: inline-flex;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(201,169,110,.2);
          border-radius: 8px;
          padding: 4px;
          gap: 2px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .act-tab-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 10px 26px;
          border-radius: 5px;
          font-size: .88rem;
          font-weight: 600;
          letter-spacing: .04em;
          cursor: pointer;
          border: none;
          background: transparent;
          color: rgba(248,245,240,.5);
          font-family: 'DM Sans', sans-serif;
          transition: color .22s, background .22s, box-shadow .22s, transform .2s;
          white-space: nowrap;
        }
        .act-tab-btn:hover:not(.active) {
          color: rgba(248,245,240,.8);
          background: rgba(201,169,110,.07);
        }
        .act-tab-btn.active {
          background: linear-gradient(135deg, #C9A96E, #A87C40);
          color: #0A1628;
          box-shadow: 0 4px 18px rgba(201,169,110,.35);
          transform: translateY(-1px);
        }
        .act-tab-icon { font-size: 1rem; }
        @media (max-width: 540px) {
          .act-tab-btn { padding: 9px 16px; font-size: .8rem; }
        }

        /* ── Content area ── */
        .act-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 24px 100px;
        }

        /* Fade-in on tab switch */
        .act-fade {
          animation: actFadeUp .55s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes actFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: none; }
        }

        /* ── Section heading ── */
        .act-section-head {
          margin-bottom: 48px;
          text-align: center;
        }
        .act-section-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(201,169,110,.1);
          border: 1px solid rgba(201,169,110,.25);
          border-radius: 20px;
          padding: 4px 14px;
          font-size: .7rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #C9A96E;
          margin-bottom: 16px;
        }
        .act-section-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 700;
          line-height: 1.15;
          color: #F8F5F0;
          margin-bottom: 12px;
        }
        .act-section-h2 em {
          font-style: normal;
          color: #C9A96E;
        }
        .act-section-divider {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, #C9A96E, transparent);
          margin: 0 auto 14px;
        }
        .act-section-p {
          max-width: 540px;
          margin: 0 auto;
          font-size: .9rem;
          color: rgba(248,245,240,.45);
          line-height: 1.7;
        }

        /* ══════════════════════════════════════
           ACADEMIC TAB
        ══════════════════════════════════════ */

        /* Degree cards */
        .acad-degrees {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
          margin-bottom: 64px;
        }
        .acad-deg-card {
          position: relative;
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(201,169,110,.15);
          border-radius: 12px;
          padding: 28px 24px;
          overflow: hidden;
          transition: border-color .3s, transform .3s, box-shadow .3s;
          animation: actFadeUp .55s cubic-bezier(.22,1,.36,1) both;
        }
        .acad-deg-card:hover {
          border-color: rgba(201,169,110,.45);
          transform: translateY(-5px);
          box-shadow: 0 16px 50px rgba(0,0,0,.3);
        }
        .acad-deg-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #C9A96E, transparent);
          opacity: 0;
          transition: opacity .3s;
        }
        .acad-deg-card:hover::before { opacity: 1; }
        .acad-deg-icon {
          font-size: 2rem;
          margin-bottom: 14px;
          display: block;
        }
        .acad-deg-year {
          position: absolute;
          top: 20px; right: 20px;
          font-size: .7rem;
          font-weight: 700;
          letter-spacing: .08em;
          color: #C9A96E;
          background: rgba(201,169,110,.1);
          border: 1px solid rgba(201,169,110,.2);
          border-radius: 20px;
          padding: 2px 10px;
        }
        .acad-deg-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #F8F5F0;
          margin-bottom: 6px;
        }
        .acad-deg-inst {
          font-size: .82rem;
          color: rgba(248,245,240,.6);
          margin-bottom: 4px;
        }
        .acad-deg-uni {
          font-size: .76rem;
          color: rgba(248,245,240,.35);
          margin-bottom: 12px;
        }
        .acad-deg-badge {
          display: inline-block;
          font-size: .65rem;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #0A1628;
          background: linear-gradient(135deg, #C9A96E, #A87C40);
          border-radius: 3px;
          padding: 3px 10px;
        }

        /* Specializations */
        .acad-spec-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 64px;
        }
        .acad-spec-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(201,169,110,.12);
          border-radius: 10px;
          padding: 22px;
          transition: border-color .3s, transform .3s;
        }
        .acad-spec-card:hover {
          border-color: rgba(201,169,110,.35);
          transform: translateX(4px);
        }
        .acad-spec-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
        }
        .acad-spec-title {
          font-size: .9rem;
          font-weight: 600;
          color: #F8F5F0;
        }
        .acad-spec-pct {
          font-size: .8rem;
          font-weight: 700;
          color: #C9A96E;
          white-space: nowrap;
          margin-left: 12px;
        }
        .acad-spec-desc {
          font-size: .78rem;
          color: rgba(248,245,240,.45);
          line-height: 1.6;
          margin-bottom: 14px;
        }
        .acad-spec-bar {
          height: 3px;
          border-radius: 2px;
          background: rgba(201,169,110,.12);
          overflow: hidden;
        }
        .acad-spec-fill {
          height: 100%;
          border-radius: 2px;
          background: linear-gradient(90deg, #C9A96E, #E8D5A3);
          transition: width 1.2s cubic-bezier(.22,1,.36,1);
        }

        /* Positions timeline */
        .acad-timeline { position: relative; padding-left: 24px; }
        .acad-timeline::before {
          content: '';
          position: absolute;
          left: 0; top: 8px; bottom: 8px;
          width: 1px;
          background: linear-gradient(180deg, #C9A96E, rgba(201,169,110,.1));
        }
        .acad-tl-item {
          position: relative;
          padding: 0 0 36px 28px;
        }
        .acad-tl-dot {
          position: absolute;
          left: -8px; top: 4px;
          width: 16px; height: 16px;
          border-radius: 50%;
          border: 2px solid #C9A96E;
          background: #0A1628;
          display: flex; align-items: center; justify-content: center;
        }
        .acad-tl-dot-inner {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #C9A96E;
          animation: actDotPulse 2s ease-in-out infinite;
        }
        .acad-tl-inactive .acad-tl-dot { border-color: rgba(201,169,110,.3); }
        .acad-tl-inactive .acad-tl-dot-inner {
          background: rgba(201,169,110,.3);
          animation: none;
        }
        .acad-tl-period {
          font-size: .7rem;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #C9A96E;
          margin-bottom: 6px;
        }
        .acad-tl-role {
          font-size: 1rem;
          font-weight: 600;
          color: #F8F5F0;
          margin-bottom: 4px;
        }
        .acad-tl-place {
          font-size: .82rem;
          color: rgba(248,245,240,.45);
        }
        .acad-current-badge {
          display: inline-block;
          font-size: .62rem;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #6EE7B7;
          background: rgba(110,231,183,.1);
          border: 1px solid rgba(110,231,183,.25);
          border-radius: 20px;
          padding: 2px 10px;
          margin-left: 10px;
          vertical-align: middle;
        }

        /* ══════════════════════════════════════
           SURGERY TAB
        ══════════════════════════════════════ */
        .surg-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }
        .surg-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(201,169,110,.13);
          border-radius: 14px;
          overflow: hidden;
          transition: transform .32s, box-shadow .32s, border-color .3s;
        }
        .surg-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,.35);
          border-color: rgba(201,169,110,.38);
        }
        .surg-img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .surg-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform .5s ease;
          filter: brightness(.75);
        }
        .surg-card:hover .surg-img { transform: scale(1.06); }
        .surg-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,22,40,.85) 0%, transparent 60%);
        }
        .surg-tag {
          position: absolute;
          top: 14px; left: 14px;
          font-size: .65rem;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #0A1628;
          padding: 4px 12px;
          border-radius: 20px;
        }
        .surg-date {
          position: absolute;
          top: 14px; right: 14px;
          font-size: .68rem;
          color: rgba(248,245,240,.6);
          background: rgba(10,22,40,.6);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(201,169,110,.15);
          border-radius: 20px;
          padding: 3px 10px;
        }
        .surg-body { padding: 22px; }
        .surg-title {
          font-size: .95rem;
          font-weight: 700;
          color: #F8F5F0;
          margin-bottom: 10px;
          line-height: 1.4;
        }
        .surg-summary {
          font-size: .8rem;
          color: rgba(248,245,240,.48);
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .surg-outcome {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: .78rem;
          color: #6EE7B7;
          background: rgba(110,231,183,.07);
          border: 1px solid rgba(110,231,183,.15);
          border-radius: 6px;
          padding: 7px 14px;
        }
        .surg-outcome-icon { font-size: .9rem; }

        /* ══════════════════════════════════════
           SOCIAL TAB
        ══════════════════════════════════════ */
        /* ── Social Blog Layout ── */
        .blog-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .blog-entry {
          display: flex;
          gap: 0;
          border-bottom: 1px solid rgba(201,169,110,.12);
          padding: 36px 0;
          animation: actFadeUp .55s both;
        }
        .blog-entry:first-child { padding-top: 0; }
        .blog-entry:last-child { border-bottom: none; }
        .blog-entry.img-right { flex-direction: row-reverse; }
        .blog-img-col {
          flex: 0 0 280px;
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          align-self: flex-start;
          margin-right: 32px;
        }
        .blog-entry.img-right .blog-img-col {
          margin-right: 0;
          margin-left: 32px;
        }
        .blog-img-col img {
          width: 100%;
          height: 195px;
          object-fit: cover;
          display: block;
          filter: brightness(.75) saturate(.85);
          transition: transform .5s ease, filter .4s ease;
        }
        .blog-entry:hover .blog-img-col img {
          transform: scale(1.05);
          filter: brightness(.88) saturate(1);
        }
        .blog-img-badge {
          position: absolute;
          top: 10px; left: 10px;
          font-size: .62rem;
          font-weight: 700;
          letter-spacing: .09em;
          text-transform: uppercase;
          background: rgba(10,22,40,.72);
          border: 1px solid rgba(201,169,110,.35);
          color: #C9A96E;
          padding: 4px 11px;
          border-radius: 20px;
          backdrop-filter: blur(6px);
        }
        .blog-participants-badge {
          position: absolute;
          bottom: 10px; right: 10px;
          font-size: .68rem;
          font-weight: 600;
          color: rgba(248,245,240,.78);
          background: rgba(10,22,40,.65);
          border: 1px solid rgba(201,169,110,.15);
          border-radius: 20px;
          padding: 3px 10px;
          backdrop-filter: blur(5px);
        }
        .blog-text-col {
          flex: 1;
          min-width: 0;
        }
        .blog-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }
        .blog-date {
          font-size: .68rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #C9A96E;
        }
        .blog-meta-sep {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(201,169,110,.4);
        }
        .blog-cat-inline {
          font-size: .66rem;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: rgba(248,245,240,.4);
        }
        .blog-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #F8F5F0;
          line-height: 1.3;
          margin-bottom: 12px;
        }
        .blog-divider {
          width: 38px;
          height: 2px;
          background: linear-gradient(90deg, #C9A96E, transparent);
          margin-bottom: 13px;
          border-radius: 2px;
        }
        .blog-excerpt {
          font-size: .85rem;
          color: rgba(248,245,240,.52);
          line-height: 1.8;
          margin-bottom: 18px;
        }
        .blog-expanded-text {
          font-size: .85rem;
          color: rgba(248,245,240,.45);
          line-height: 1.8;
          margin-bottom: 18px;
          overflow: hidden;
          max-height: 0;
          transition: max-height .45s cubic-bezier(.22,1,.36,1), opacity .35s ease;
          opacity: 0;
        }
        .blog-expanded-text.open {
          max-height: 400px;
          opacity: 1;
        }
        .blog-read-more {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: .75rem;
          font-weight: 700;
          letter-spacing: .07em;
          text-transform: uppercase;
          color: #C9A96E;
          background: rgba(201,169,110,.08);
          border: 1px solid rgba(201,169,110,.28);
          border-radius: 20px;
          padding: 7px 18px;
          cursor: pointer;
          transition: background .25s, border-color .25s, transform .2s;
        }
        .blog-read-more:hover {
          background: rgba(201,169,110,.16);
          border-color: rgba(201,169,110,.55);
          transform: translateX(3px);
        }
        .blog-read-more svg {
          transition: transform .3s ease;
        }
        .blog-read-more.expanded svg {
          transform: rotate(180deg);
        }
        @media (max-width: 640px) {
          .blog-entry, .blog-entry.img-right { flex-direction: column; }
          .blog-img-col {
            flex: none;
            width: 100%;
            margin-right: 0 !important;
            margin-left: 0 !important;
            margin-bottom: 20px;
          }
          .blog-img-col img { height: 200px; }
        }

        /* ══════════════════════════════════════
           RESEARCH TAB
        ══════════════════════════════════════ */
        .research-list {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .research-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(201,169,110,.13);
          border-radius: 14px;
          padding: 28px 30px;
          position: relative;
          overflow: hidden;
          transition: border-color .3s, transform .3s, box-shadow .3s;
        }
        .research-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #C9A96E, transparent);
          opacity: 0;
          transition: opacity .3s;
        }
        .research-card:hover {
          border-color: rgba(201,169,110,.35);
          transform: translateX(4px);
          box-shadow: 0 10px 40px rgba(0,0,0,.25);
        }
        .research-card:hover::before { opacity: 1; }
        .research-top {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .research-type {
          font-size: .65rem;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #0A1628;
          padding: 3px 12px;
          border-radius: 3px;
          white-space: nowrap;
        }
        .research-highlight {
          font-size: .65rem;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          border-radius: 20px;
          padding: 3px 12px;
        }
        .research-highlight.published {
          color: #6EE7B7;
          background: rgba(110,231,183,.1);
          border: 1px solid rgba(110,231,183,.22);
        }
        .research-highlight.ongoing {
          color: #A78BFA;
          background: rgba(167,139,250,.1);
          border: 1px solid rgba(167,139,250,.22);
        }
        .research-highlight.presented {
          color: #FDE68A;
          background: rgba(253,230,138,.08);
          border: 1px solid rgba(253,230,138,.2);
        }
        .research-year {
          font-size: .75rem;
          color: rgba(248,245,240,.35);
          margin-left: auto;
        }
        .research-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #F8F5F0;
          line-height: 1.4;
          margin-bottom: 8px;
        }
        .research-meta {
          font-size: .78rem;
          color: #C9A96E;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .research-meta-div { color: rgba(201,169,110,.3); }
        .research-abstract {
          font-size: .82rem;
          color: rgba(248,245,240,.45);
          line-height: 1.75;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .act-hero { padding: 70px 16px 50px; }
          .act-content { padding: 40px 16px 80px; }
          .act-stats { gap: 24px; }
          .acad-degrees { grid-template-columns: 1fr; }
          .acad-spec-grid { grid-template-columns: 1fr; }
          .surg-grid { grid-template-columns: 1fr; }
          .social-grid { grid-template-columns: 1fr; }
          .research-card { padding: 22px 18px; }
        }
        @media (max-width: 480px) {
          .act-tabs { width: 100%; }
          .act-tab-btn { flex: 1; justify-content: center; }
          .research-year { margin-left: 0; width: 100%; }
        }
      `}</style>

      <div className="act-page">

        {/* ── Hero ── */}
        <div className="act-hero" ref={heroRef}>
          {/* Background image */}
          <div className="act-hero-bg" />
          {/* Glow blobs */}
          <div className="act-hero-glow" style={{ width: 500, height: 500, top: -150, left: "50%", marginLeft: -250, background: "radial-gradient(circle, rgba(201,169,110,.12) 0%, transparent 70%)" }} />
          <div className="act-hero-glow" style={{ width: 300, height: 300, bottom: -80, right: "10%", background: "radial-gradient(circle, rgba(201,169,110,.07) 0%, transparent 70%)" }} />

          <div className={`act-hero-eyebrow ${revealed ? "in" : ""}`}>
            <div className="act-hero-eyebrow-dot" />
            {tr.actHeroTitle}
          </div>

          <h1 className={`act-hero-title ${revealed ? "in" : ""}`}>
            {tr.actHeroTitle}
          </h1>

          <p className={`act-hero-sub ${revealed ? "in" : ""}`}>
            {tr.actHeroSubtitle}
          </p>

          {/* Stats */}
          <div className={`act-stats ${revealed ? "in" : ""}`}>
            {tr.actHeroStats.flatMap((s, i) =>
              i < tr.actHeroStats.length - 1
                ? [s, null]
                : [s]
            ).map((s, i) =>
              s === null ? (
                <div key={`div-${i}`} className="act-stat-div" />
              ) : (
                <div key={s.label} className="act-stat-item">
                  <div className="act-stat-num">{s.num}</div>
                  <div className="act-stat-label">{s.label}</div>
                </div>
              )
            )}
          </div>

          {/* Tab bar */}
          <div className={`act-tabs-wrap ${revealed ? "in" : ""}`}>
            <div className="act-tabs">
              {[
                { name: "Academic", icon: <FaGraduationCap />, label: tr.actTabAcademic },
                { name: "Surgery",  icon: <FaUserDoctor />,   label: tr.actTabSurgeries },
                { name: "Social",   icon: <FaHandshake />,    label: tr.actTabSocial },
                { name: "Research", icon: <FaFlask />,        label: tr.actTabResearch },
              ].map((tab) => (
                <button
                  key={tab.name}
                  className={`act-tab-btn ${activeTab === tab.name ? "active" : ""}`}
                  onClick={() => handleTabChange(tab.name)}
                >
                  <span className="act-tab-icon">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tab Content ── */}
        <div className="act-content">

          {/* ═══ ACADEMIC ═══ */}
          {activeTab === "Academic" && (
            <div key={`academic-${tabKey}`} className="act-fade">
              {/* Degrees */}
              <div className="act-section-head">
                <div className="act-section-tag">{tr.actAcadDegreesTag}</div>
                <h2 className="act-section-h2">{tr.actAcadDegreesTitle}</h2>
                <div className="act-section-divider" />
                <p className="act-section-p">{tr.actAcadDegreesDesc}</p>
              </div>

              <div className="acad-degrees">
                {academicData.degrees.map((d, i) => (
                  <div
                    key={d.degree}
                    className="acad-deg-card"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <span className="acad-deg-icon">{d.icon}</span>
                    <div className="acad-deg-year">{d.year}</div>
                    <div className="acad-deg-title">{d.degree}</div>
                    <div className="acad-deg-inst">{d.institution}</div>
                    <div className="acad-deg-uni">{d.university}</div>
                    <div className="acad-deg-badge">{d.grade}</div>
                  </div>
                ))}
              </div>

              {/* Specializations */}
              <div className="act-section-head">
                <div className="act-section-tag">{tr.actAcadSpecTag}</div>
                <h2 className="act-section-h2">{tr.actAcadSpecTitle}</h2>
                <div className="act-section-divider" />
              </div>

              <div className="acad-spec-grid" style={{ marginBottom: 64 }}>
                {academicData.specializations.map((s, i) => (
                  <div key={s.title} className="acad-spec-card" style={{ animationDelay: `${i * 0.09}s` }}>
                    <div className="acad-spec-header">
                      <div className="acad-spec-title">{s.title}</div>
                      <div className="acad-spec-pct">{s.level}%</div>
                    </div>
                    <div className="acad-spec-desc">{s.desc}</div>
                    <div className="acad-spec-bar">
                      <div className="acad-spec-fill" style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Academic Positions */}
              <div className="act-section-head">
                <div className="act-section-tag">{tr.actAcadPosTag}</div>
                <h2 className="act-section-h2">{tr.actAcadPosTitle}</h2>
                <div className="act-section-divider" />
              </div>

              <div className="acad-timeline">
                {academicData.positions.map((p, i) => (
                  <div key={i} className={`acad-tl-item ${p.current ? "" : "acad-tl-inactive"}`}>
                    <div className="acad-tl-dot">
                      <div className="acad-tl-dot-inner" />
                    </div>
                    <div className="acad-tl-period">
                      {p.from} — {p.to}
                    </div>
                    <div className="acad-tl-role">
                      {p.role}
                      {p.current && <span className="acad-current-badge">{tr.actAcadCurrentBadge}</span>}
                    </div>
                    <div className="acad-tl-place">{p.place}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ SURGERY ═══ */}
          {activeTab === "Surgery" && (
            <div key={`surgery-${tabKey}`} className="act-fade">
              <div className="act-section-head">
                <div className="act-section-tag">{tr.actSurgTag}</div>
                <h2 className="act-section-h2">{tr.actSurgeriesTitle}</h2>
                <div className="act-section-divider" />
                <p className="act-section-p">{tr.actSurgeriesSubtitle}</p>
              </div>

              <div className="surg-grid">
                {surgeryData.map((s, i) => (
                  <div key={s.id} className="surg-card" style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className="surg-img-wrap">
                      <img src={s.img} alt={s.title} className="surg-img" loading="lazy" />
                      <div className="surg-img-overlay" />
                      <div className="surg-tag" style={{ background: s.tagColor }}>{s.tag}</div>
                      <div className="surg-date">{s.date}</div>
                    </div>
                    <div className="surg-body">
                      <div className="surg-title">{s.title}</div>
                      <div className="surg-summary">{s.summary}</div>
                      <div className="surg-outcome">
                        <span className="surg-outcome-icon">✓</span>
                        {s.outcome}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ SOCIAL ═══ */}
          {activeTab === "Social" && (
            <div key={`social-${tabKey}`} className="act-fade">
              <div className="act-section-head">
                <div className="act-section-tag">{tr.actSocialTag}</div>
                <h2 className="act-section-h2">{tr.actSocialTitle}</h2>
                <div className="act-section-divider" />
                <p className="act-section-p">{tr.actSocialDesc}</p>
              </div>

              <div className="blog-list">
                {socialData.map((s, i) => {
                  const isExpanded = !!expandedBlogs[s.id];
                  const isRight = i % 2 !== 0;
                  return (
                    <div
                      key={s.id}
                      className={`blog-entry${isRight ? " img-right" : ""}`}
                      style={{ animationDelay: `${i * 0.08}s` }}
                    >
                      {/* Image column */}
                      <div className="blog-img-col">
                        <img src={s.img} alt={s.title} loading="lazy" />
                        <div className="blog-img-badge">{s.category}</div>
                        <div className="blog-participants-badge">{s.participants}</div>
                      </div>

                      {/* Text column */}
                      <div className="blog-text-col">
                        <div className="blog-meta">
                          <span className="blog-date">{s.date}</span>
                          <span className="blog-meta-sep" />
                          <span className="blog-cat-inline">{s.category}</span>
                        </div>
                        <div className="blog-title">{s.title}</div>
                        <div className="blog-divider" />
                        <p className="blog-excerpt">{s.desc.slice(0, 100)}&hellip;</p>
                        <div className={`blog-expanded-text${isExpanded ? " open" : ""}`}>
                          {s.desc}
                        </div>
                        <button
                          className={`blog-read-more${isExpanded ? " expanded" : ""}`}
                          onClick={() => toggleBlog(s.id)}
                        >
                          {isExpanded ? tr.actReadLess : tr.actReadMore}
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 4.5L6 8.5L10 4.5" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══ RESEARCH ═══ */}
          {activeTab === "Research" && (
            <div key={`research-${tabKey}`} className="act-fade">
              <div className="act-section-head">
                <div className="act-section-tag">{tr.actResearchTag}</div>
                <h2 className="act-section-h2">{tr.actResearchTitle}</h2>
                <div className="act-section-divider" />
                <p className="act-section-p">{tr.actResearchDesc}</p>
              </div>

              <div className="research-list">
                {researchData.map((r, i) => (
                  <div key={r.id} className="research-card" style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className="research-top">
                      <span className="research-type" style={{ background: r.typeColor }}>{r.type}</span>
                      <span className={`research-highlight ${r.highlight.toLowerCase()}`}>{r.highlight}</span>
                      <span className="research-year">{r.year}</span>
                    </div>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="research-title"
  style={{ textDecoration: "none", cursor: "pointer", transition: "color .2s" }}
  onMouseEnter={e => e.currentTarget.style.color = "#C9A96E"}
  onMouseLeave={e => e.currentTarget.style.color = "#F8F5F0"}
>
  {r.title}
</a>
                    <div className="research-meta">
                      <span>{r.journal}</span>
                      {r.vol !== "—" && (
                        <>
                          <span className="research-meta-div">·</span>
                          <span>{r.vol}</span>
                        </>
                      )}
                    </div>
                    <div className="research-abstract">{r.abstract}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
