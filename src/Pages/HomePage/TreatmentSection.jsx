import React, { useEffect, useState } from "react";
import axios from "axios";
import TreatmentCard from "./TreatmentCard";

const TreatmentSection = () => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Laparoscopic", "Laser", "Cancer", "General"];

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/treatments");
        setTreatments(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error(error);
        setTreatments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTreatments();
  }, []);

  const filtered =
    activeFilter === "All"
      ? treatments
      : treatments.filter((t) => t.category === activeFilter);

  return (
    <>
      <style>{`
        .treatment-section {
          background: #0A1628;
          position: relative;
          overflow: hidden;
          padding: 100px 24px;
          font-family: 'DM Sans', sans-serif;
        }
        .treatment-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(201,169,110,0.05) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }
        .treatment-inner {
          max-width: 1180px;
          margin: 0 auto;
          position: relative;
        }
        .treatment-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .treatment-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(201,169,110,0.1);
          border: 1px solid rgba(201,169,110,0.28);
          border-radius: 20px;
          padding: 5px 16px;
          margin-bottom: 20px;
        }
        .treatment-tag-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #C9A96E;
        }
        .treatment-tag-text {
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #C9A96E;
        }
        .treatment-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3.4rem);
          font-weight: 700;
          color: #F8F5F0;
          line-height: 1.1;
          margin-bottom: 14px;
        }
        .treatment-h2 span {
          background: linear-gradient(90deg, #C9A96E, #E8D5A3, #C9A96E);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200%;
          animation: shimmer 3s linear infinite;
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .treatment-subtitle {
          font-size: 0.93rem;
          color: rgba(248,245,240,0.5);
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.7;
        }
        /* Filter tabs */
        .filter-row {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 48px;
        }
        .filter-btn {
          padding: 7px 20px;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-radius: 3px;
          border: 1px solid rgba(201,169,110,0.2);
          background: transparent;
          color: rgba(248,245,240,0.5);
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .filter-btn:hover {
          border-color: rgba(201,169,110,0.5);
          color: rgba(248,245,240,0.8);
        }
        .filter-btn.active {
          background: linear-gradient(135deg, #C9A96E, #A87C40);
          border-color: transparent;
          color: #0A1628;
          font-weight: 600;
          box-shadow: 0 4px 16px rgba(201,169,110,0.25);
        }
        /* Grid */
        .treatment-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        @media (max-width: 1024px) { .treatment-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px)  { .treatment-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px)  { .treatment-grid { grid-template-columns: 1fr; } }
        /* Skeleton */
        .skeleton-card {
          height: 260px;
          border-radius: 8px;
          background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.04) 75%);
          background-size: 200% 100%;
          animation: skeletonShimmer 1.5s infinite;
        }
        @keyframes skeletonShimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        /* Bottom stat bar */
        .treatment-stats {
          display: flex;
          justify-content: center;
          gap: 0;
          margin-top: 64px;
          border: 1px solid rgba(201,169,110,0.15);
          border-radius: 8px;
          overflow: hidden;
        }
        @media (max-width: 600px) {
          .treatment-stats { flex-direction: column; }
        }
        .treatment-stat {
          flex: 1;
          padding: 24px 16px;
          text-align: center;
          border-right: 1px solid rgba(201,169,110,0.12);
          background: rgba(255,255,255,0.02);
          transition: background 0.2s;
        }
        .treatment-stat:last-child { border-right: none; }
        .treatment-stat:hover { background: rgba(201,169,110,0.05); }
        .treatment-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #C9A96E;
          line-height: 1;
          margin-bottom: 4px;
        }
        .treatment-stat-label {
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(248,245,240,0.4);
        }
      `}</style>

      <section className="treatment-section">
        <div className="treatment-inner">

          {/* Header */}
          <div className="treatment-header">
            <div className="treatment-tag">
              <div className="treatment-tag-dot" />
              <span className="treatment-tag-text">Centre of Excellence</span>
            </div>
            <h2 className="treatment-h2">
              Expert Surgical <span>Treatments</span>
            </h2>
            <p className="treatment-subtitle">
              Comprehensive surgical care across laparoscopic, laser, cancer, and general surgery — all under one roof.
            </p>
          </div>

          {/* Filters */}
          <div className="filter-row">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="treatment-grid">
              {Array(8).fill(0).map((_, i) => (
                <div className="skeleton-card" key={i} />
              ))}
            </div>
          ) : (
            <div className="treatment-grid">
              {filtered.map((treatment) => (
                <TreatmentCard key={treatment._id} treatment={treatment} />
              ))}
            </div>
          )}

          {/* Stats bar */}
          <div className="treatment-stats">
            {[
              { num: "5000+", label: "Surgeries Performed" },
              { num: "98%", label: "Success Rate" },
              { num: "15+", label: "Years Experience" },
              { num: "3", label: "Specializations" },
            ].map((s) => (
              <div className="treatment-stat" key={s.label}>
                <div className="treatment-stat-num">{s.num}</div>
                <div className="treatment-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default TreatmentSection;
