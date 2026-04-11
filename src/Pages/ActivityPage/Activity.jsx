import { useState, useEffect, useRef } from "react";

/* ── Demo Data ────────────────────────────────────────────────── */

const academicData = {
  degrees: [
    {
      icon: "🎓",
      degree: "MBBS",
      institution: "Dhaka Medical College",
      university: "University of Dhaka",
      year: "2003",
      grade: "Distinction",
    },
    {
      icon: "🏅",
      degree: "FCPS (Surgery)",
      institution: "Bangladesh College of Physicians & Surgeons",
      university: "BCPS, Bangladesh",
      year: "2012",
      grade: "Fellowship",
    },
    {
      icon: "🌐",
      degree: "FMAS",
      institution: "World Laparoscopy Hospital",
      university: "Gurugram, India",
      year: "2014",
      grade: "Fellowship",
    },
    {
      icon: "✦",
      degree: "Fellowship — Laparoscopic Colorectal & Hernia",
      institution: "GEM Hospital & Research Centre",
      university: "Coimbatore, India",
      year: "2016",
      grade: "Advanced Fellowship",
    },
  ],
  specializations: [
    { title: "Advanced Laparoscopic Surgery", desc: "Minimally invasive procedures including cholecystectomy, appendectomy, and complex hernia repairs.", level: 95 },
    { title: "Laser Proctology", desc: "State-of-the-art laser treatment for piles, anal fissure, fistula-in-ano and pilonidal sinus.", level: 92 },
    { title: "Cancer Surgery", desc: "Oncological surgery covering breast, abdominal, colorectal, and thyroid cancers.", level: 88 },
    { title: "Colorectal Surgery", desc: "Comprehensive colon and rectal surgical procedures with fellowship-level expertise.", level: 90 },
    { title: "Hernia Surgery", desc: "Advanced mesh-based and laparoscopic hernia repair techniques.", level: 93 },
    { title: "General Surgery", desc: "Broad spectrum surgical care with evidence-based, patient-centred approach.", level: 85 },
  ],
  positions: [
    { role: "Assistant Professor of Surgery", place: "Faridpur Medical College", from: "2018", to: "Present", current: true },
    { role: "Senior Registrar — Surgery", place: "Dhaka Medical College Hospital", from: "2014", to: "2018", current: false },
    { role: "Registrar — Surgery", place: "National Hospital, Dhaka", from: "2012", to: "2014", current: false },
  ],
};

const surgeryData = [
  {
    id: 1,
    title: "Laparoscopic Cholecystectomy — Complex Case",
    date: "March 2024",
    tag: "Laparoscopic",
    tagColor: "#93C5FD",
    summary: "A 52-year-old patient presented with acute cholecystitis and multiple gallstones. Successful laparoscopic removal was performed with no complications, and the patient was discharged within 24 hours.",
    outcome: "Full recovery in 5 days",
    img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80",
  },
  {
    id: 2,
    title: "Laser Haemorrhoidectomy — Grade IV Piles",
    date: "January 2024",
    tag: "Laser",
    tagColor: "#C9A96E",
    summary: "Patient suffered from Grade IV haemorrhoids for over three years. Performed precise laser haemorrhoidectomy under spinal anaesthesia. Patient reported near-zero post-operative pain.",
    outcome: "Pain-free in 48 hours",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
  },
  {
    id: 3,
    title: "Laparoscopic Colorectal Resection",
    date: "November 2023",
    tag: "Cancer",
    tagColor: "#FCA5A5",
    summary: "A 61-year-old male with sigmoid colon carcinoma underwent curative laparoscopic resection. The procedure was completed with clear margins and minimal blood loss.",
    outcome: "Successful curative resection",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
  },
  {
    id: 4,
    title: "Bilateral Inguinal Hernia Repair (TAPP)",
    date: "September 2023",
    tag: "Laparoscopic",
    tagColor: "#93C5FD",
    summary: "A young professional with bilateral inguinal hernias underwent totally extra-peritoneal (TAPP) laparoscopic repair. Both sides addressed in a single sitting, minimal downtime.",
    outcome: "Back to work in 7 days",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
  },
  {
    id: 5,
    title: "Breast Lumpectomy — Early Stage Cancer",
    date: "July 2023",
    tag: "Cancer",
    tagColor: "#FCA5A5",
    summary: "A 44-year-old female diagnosed with early-stage breast carcinoma underwent successful breast-conserving surgery. Clear surgical margins achieved with excellent cosmetic outcome.",
    outcome: "Breast-conserving success",
    img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80",
  },
  {
    id: 6,
    title: "Laser Fistulotomy — Complex Anal Fistula",
    date: "May 2023",
    tag: "Laser",
    tagColor: "#C9A96E",
    summary: "Complex trans-sphincteric anal fistula treated with laser fistulotomy technique. Sphincter preservation was prioritised, achieving complete healing without continence issues.",
    outcome: "Complete healing in 3 weeks",
    img: "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=600&q=80",
  },
];

const socialData = [
  {
    id: 1,
    title: "Free Medical Camp — Char Fasson, Bhola",
    date: "February 2024",
    category: "Medical Camp",
    participants: "400+ patients",
    img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&q=80",
    desc: "Organised a free surgical consultation camp in a remote coastal region, providing diagnostic services, medicines, and post-operative follow-up to underprivileged patients.",
  },
  {
    id: 2,
    title: "Health Awareness Programme — Faridpur",
    date: "December 2023",
    category: "Awareness",
    participants: "250+ attendees",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
    desc: "Led a community health awareness session covering early cancer detection, healthy lifestyle, and the importance of timely surgical intervention.",
  },
  {
    id: 3,
    title: "Blood Donation Drive — Dhaka Medical",
    date: "October 2023",
    category: "Blood Drive",
    participants: "120+ donors",
    img: "https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=600&q=80",
    desc: "Coordinated a blood donation drive with medical students and junior doctors, collecting over 120 units of blood for critical surgical patients.",
  },
  {
    id: 4,
    title: "Cleft Lip Repair Mission — Mymensingh",
    date: "August 2023",
    category: "Charity Surgery",
    participants: "35 children",
    img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80",
    desc: "Volunteered in a charitable surgical mission performing cleft lip and palate repairs on children from low-income families, transforming lives at no cost.",
  },
  {
    id: 5,
    title: "Telemedicine Initiative — Rural Bangladesh",
    date: "June 2023",
    category: "Telemedicine",
    participants: "500+ consultations",
    img: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&q=80",
    desc: "Launched a weekly telemedicine consultation service reaching patients in remote areas of Rajshahi and Sylhet divisions, providing free surgical advice.",
  },
  {
    id: 6,
    title: "Medical Scholarship Fund — Faridpur",
    date: "March 2023",
    category: "Education",
    participants: "12 beneficiaries",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
    desc: "Established a merit-based scholarship fund supporting economically disadvantaged medical students at Faridpur Medical College to pursue their studies.",
  },
];

const researchData = [
  {
    id: 1,
    type: "Original Research",
    typeColor: "#93C5FD",
    title: "Outcomes of Laparoscopic vs Open Cholecystectomy in Acute Cholecystitis: A Retrospective Cohort Study",
    journal: "Bangladesh Journal of Surgery",
    year: "2024",
    vol: "Vol. 29, Issue 1",
    doi: "10.XXXX/bjs.2024.01.004",
    abstract: "A retrospective analysis of 340 patients comparing outcomes between laparoscopic and open cholecystectomy for acute cholecystitis. Laparoscopic approach demonstrated significantly reduced hospital stay, lower complication rates, and faster return to normal activity.",
    highlight: "Published",
  },
  {
    id: 2,
    type: "Clinical Study",
    typeColor: "#6EE7B7",
    title: "Laser Haemorrhoidoplasty for Grade III & IV Haemorrhoids: Short-term Outcomes and Patient Satisfaction",
    journal: "Annals of Colorectal Surgery",
    year: "2023",
    vol: "Vol. 8, Issue 3",
    doi: "10.XXXX/acs.2023.08.012",
    abstract: "Prospective evaluation of 180 patients undergoing laser haemorrhoidoplasty. The study demonstrated superior pain scores, shorter operative time, and high patient satisfaction compared to conventional excisional haemorrhoidectomy.",
    highlight: "Published",
  },
  {
    id: 3,
    type: "Case Report",
    typeColor: "#C9A96E",
    title: "Laparoscopic Management of Giant Incisional Hernia with Component Separation: A Challenging Case",
    journal: "Journal of Surgical Case Reports",
    year: "2023",
    vol: "Vol. 2023, Issue 7",
    doi: "10.XXXX/jscr.2023.07.089",
    abstract: "Report of a challenging giant incisional hernia managed successfully via laparoscopic approach with bilateral component separation. The case highlights the feasibility and safety of minimally invasive techniques in complex hernia scenarios.",
    highlight: "Published",
  },
  {
    id: 4,
    type: "Review Article",
    typeColor: "#FCA5A5",
    title: "Evolution of Colorectal Surgery in Bangladesh: Challenges, Progress and Future Directions",
    journal: "Bangladesh Medical Research Council Bulletin",
    year: "2022",
    vol: "Vol. 48, Issue 2",
    doi: "10.XXXX/bmrcb.2022.48.023",
    abstract: "A comprehensive review of colorectal surgical practice in Bangladesh over the past two decades, analysing training infrastructure, patient outcomes, and recommendations for advancing sub-specialty care nationally.",
    highlight: "Published",
  },
  {
    id: 5,
    type: "Ongoing Research",
    typeColor: "#A78BFA",
    title: "Comparative Study of Sutureless vs Sutured Mesh Fixation in Laparoscopic Inguinal Hernia Repair",
    journal: "Under Peer Review",
    year: "2024",
    vol: "—",
    doi: "—",
    abstract: "An ongoing randomised controlled trial comparing sutureless tack fixation against sutured mesh fixation in TAPP hernia repair. Primary endpoints include chronic groin pain, recurrence rate, and operative time.",
    highlight: "Ongoing",
  },
  {
    id: 6,
    type: "Conference Paper",
    typeColor: "#FDE68A",
    title: "Single-Port Laparoscopic Appendectomy: Technique and Early Outcomes",
    journal: "16th SAARC Surgical Congress, Colombo",
    year: "2023",
    vol: "Oral Presentation",
    doi: "—",
    abstract: "Presentation of technique and 60-patient experience with single-port laparoscopic appendectomy at a tertiary centre in Bangladesh, demonstrating comparable safety and superior cosmetic results.",
    highlight: "Presented",
  },
];

/* ── Activity Page ────────────────────────────────────────────── */

export default function Activity() {
  const [activeTab, setActiveTab] = useState("Academic");
  const [revealed, setRevealed] = useState(false);
  const heroRef = useRef(null);

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
          background: var(--bg-primary, #0A1628);
          font-family: 'DM Sans', sans-serif;
          color: var(--text-primary, #F8F5F0);
        }

        /* ── Hero Banner ── */
        .act-hero {
          position: relative;
          overflow: hidden;
          padding: 90px 24px 70px;
          text-align: center;
          background: linear-gradient(160deg, #0A1628 0%, #0F2040 50%, #0A1628 100%);
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
        .social-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }
        .social-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(201,169,110,.13);
          border-radius: 14px;
          overflow: hidden;
          transition: transform .3s, box-shadow .3s, border-color .3s;
        }
        .social-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 55px rgba(0,0,0,.32);
          border-color: rgba(201,169,110,.38);
        }
        .social-img-wrap {
          position: relative;
          height: 190px;
          overflow: hidden;
        }
        .social-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform .5s ease;
          filter: brightness(.7) saturate(.8);
        }
        .social-card:hover .social-img { transform: scale(1.06); filter: brightness(.8) saturate(1); }
        .social-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,22,40,.9) 0%, transparent 55%);
        }
        .social-cat {
          position: absolute;
          top: 14px; left: 14px;
          font-size: .65rem;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          background: rgba(201,169,110,.18);
          border: 1px solid rgba(201,169,110,.3);
          color: #C9A96E;
          padding: 4px 12px;
          border-radius: 20px;
          backdrop-filter: blur(6px);
        }
        .social-participants {
          position: absolute;
          bottom: 14px; right: 14px;
          font-size: .72rem;
          font-weight: 600;
          color: rgba(248,245,240,.7);
          background: rgba(10,22,40,.65);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(201,169,110,.15);
          border-radius: 20px;
          padding: 4px 12px;
        }
        .social-body { padding: 22px; }
        .social-date {
          font-size: .7rem;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #C9A96E;
          margin-bottom: 8px;
        }
        .social-title {
          font-size: .95rem;
          font-weight: 700;
          color: #F8F5F0;
          margin-bottom: 10px;
          line-height: 1.4;
        }
        .social-desc {
          font-size: .8rem;
          color: rgba(248,245,240,.45);
          line-height: 1.7;
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
          {/* Glow blobs */}
          <div className="act-hero-glow" style={{ width: 500, height: 500, top: -150, left: "50%", marginLeft: -250, background: "radial-gradient(circle, rgba(201,169,110,.12) 0%, transparent 70%)" }} />
          <div className="act-hero-glow" style={{ width: 300, height: 300, bottom: -80, right: "10%", background: "radial-gradient(circle, rgba(201,169,110,.07) 0%, transparent 70%)" }} />

          <div className={`act-hero-eyebrow ${revealed ? "in" : ""}`}>
            <div className="act-hero-eyebrow-dot" />
            Surgeon's Portfolio
          </div>

          <h1 className={`act-hero-title ${revealed ? "in" : ""}`}>
            Academic, Clinical &<br /><span>Professional Journey</span>
          </h1>

          <p className={`act-hero-sub ${revealed ? "in" : ""}`}>
            An in-depth overview of Dr. ASM Tanjilur Rahman's educational
            credentials, surgical milestones, social contributions, and research publications.
          </p>

          {/* Stats */}
          <div className={`act-stats ${revealed ? "in" : ""}`}>
            {[
              { num: "15+", label: "Years Experience" },
              null,
              { num: "3000+", label: "Surgeries Performed" },
              null,
              { num: "6", label: "Research Papers" },
              null,
              { num: "500+", label: "Social Beneficiaries" },
            ].map((s, i) =>
              s === null ? (
                <div key={i} className="act-stat-div" />
              ) : (
                <div key={i} className="act-stat-item">
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
                { name: "Academic", icon: "🎓" },
                { name: "Surgery", icon: "🔬" },
                { name: "Social", icon: "🤝" },
                { name: "Research", icon: "📄" },
              ].map((t) => (
                <button
                  key={t.name}
                  className={`act-tab-btn ${activeTab === t.name ? "active" : ""}`}
                  onClick={() => handleTabChange(t.name)}
                >
                  <span className="act-tab-icon">{t.icon}</span>
                  {t.name}
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
                <div className="act-section-tag">✦ Education</div>
                <h2 className="act-section-h2">Degrees & <em>Qualifications</em></h2>
                <div className="act-section-divider" />
                <p className="act-section-p">
                  A foundation of rigorous academic training and internationally recognised fellowship programmes.
                </p>
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
                <div className="act-section-tag">◈ Expertise</div>
                <h2 className="act-section-h2">Clinical <em>Specializations</em></h2>
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
                <div className="act-section-tag">◉ Career</div>
                <h2 className="act-section-h2">Academic <em>Positions</em></h2>
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
                      {p.current && <span className="acad-current-badge">Current</span>}
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
                <div className="act-section-tag">🔬 Operating Theatre</div>
                <h2 className="act-section-h2">Surgery <em>Highlights</em></h2>
                <div className="act-section-divider" />
                <p className="act-section-p">
                  Selected case studies showcasing the breadth, complexity and outcomes of surgical procedures performed.
                </p>
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
                <div className="act-section-tag">🤝 Community</div>
                <h2 className="act-section-h2">Social <em>Works & Outreach</em></h2>
                <div className="act-section-divider" />
                <p className="act-section-p">
                  A commitment to giving back — through free camps, awareness programmes, charitable surgeries and community welfare.
                </p>
              </div>

              <div className="social-grid">
                {socialData.map((s, i) => (
                  <div key={s.id} className="social-card" style={{ animationDelay: `${i * 0.09}s` }}>
                    <div className="social-img-wrap">
                      <img src={s.img} alt={s.title} className="social-img" loading="lazy" />
                      <div className="social-img-overlay" />
                      <div className="social-cat">{s.category}</div>
                      <div className="social-participants">{s.participants}</div>
                    </div>
                    <div className="social-body">
                      <div className="social-date">{s.date}</div>
                      <div className="social-title">{s.title}</div>
                      <div className="social-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ RESEARCH ═══ */}
          {activeTab === "Research" && (
            <div key={`research-${tabKey}`} className="act-fade">
              <div className="act-section-head">
                <div className="act-section-tag">📄 Publications</div>
                <h2 className="act-section-h2">Research & <em>Publications</em></h2>
                <div className="act-section-divider" />
                <p className="act-section-p">
                  Peer-reviewed research, clinical studies, and conference contributions advancing surgical knowledge.
                </p>
              </div>

              <div className="research-list">
                {researchData.map((r, i) => (
                  <div key={r.id} className="research-card" style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className="research-top">
                      <span className="research-type" style={{ background: r.typeColor }}>{r.type}</span>
                      <span className={`research-highlight ${r.highlight.toLowerCase()}`}>{r.highlight}</span>
                      <span className="research-year">{r.year}</span>
                    </div>
                    <div className="research-title">{r.title}</div>
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
