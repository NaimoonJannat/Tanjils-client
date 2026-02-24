import React from "react";
import { useNavigate } from "react-router";

const categoryColors = {
  Laparoscopic: { bg: "rgba(96,165,250,0.15)", text: "#93C5FD", border: "rgba(96,165,250,0.25)" },
  Laser:        { bg: "rgba(201,169,110,0.12)", text: "#C9A96E",  border: "rgba(201,169,110,0.25)" },
  Cancer:       { bg: "rgba(248,113,113,0.12)", text: "#FCA5A5",  border: "rgba(248,113,113,0.2)" },
  General:      { bg: "rgba(52,211,153,0.1)",   text: "#6EE7B7",  border: "rgba(52,211,153,0.2)" },
};

const TreatmentCard = ({ treatment }) => {
  const navigate = useNavigate();
  const colorSet = categoryColors[treatment.category] || categoryColors.General;

  return (
    <>
      <style>{`
        .treat-card {
          position: relative;
          cursor: pointer;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid rgba(201,169,110,0.12);
          background: #0F2040;
          group: true;
          transition: border-color 0.3s, box-shadow 0.3s;
          height: 260px;
        }
        .treat-card:hover {
          border-color: rgba(201,169,110,0.4);
          box-shadow: 0 12px 48px rgba(0,0,0,0.5);
        }
        .treat-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .treat-card:hover .treat-img {
          transform: scale(1.07);
        }
        .treat-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.5) 50%, rgba(10,22,40,0.15) 100%);
          transition: background 0.3s;
        }
        .treat-card:hover .treat-overlay {
          background: linear-gradient(to top, rgba(10,22,40,0.98) 0%, rgba(10,22,40,0.7) 60%, rgba(10,22,40,0.25) 100%);
        }
        /* Gold top line reveal */
        .treat-top-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #C9A96E, transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .treat-card:hover .treat-top-line {
          transform: scaleX(1);
        }
        .treat-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
        }
        .treat-category {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 20px;
          margin-bottom: 8px;
          width: fit-content;
          font-family: 'DM Sans', sans-serif;
        }
        .treat-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: #F8F5F0;
          line-height: 1.3;
          margin-bottom: 8px;
          transition: color 0.2s;
        }
        .treat-card:hover .treat-title { color: #E8D5A3; }
        .treat-desc {
          font-size: 0.77rem;
          color: rgba(248,245,240,0.55);
          line-height: 1.5;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.3s;
          opacity: 0;
        }
        .treat-card:hover .treat-desc {
          max-height: 60px;
          opacity: 1;
        }
        .treat-arrow {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 30px; height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(201,169,110,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C9A96E;
          font-size: 0.8rem;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.3s, transform 0.3s;
        }
        .treat-card:hover .treat-arrow {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div
        className="treat-card"
        onClick={() => navigate(`/treatments/${treatment.slug}`)}
      >
        {treatment.image && (
          <img
            src={treatment.image}
            alt={treatment.title}
            className="treat-img"
            loading="lazy"
            decoding="async"
          />
        )}

        <div className="treat-overlay" />
        <div className="treat-top-line" />

        <div className="treat-content">
          <div
            className="treat-category"
            style={{
              background: colorSet.bg,
              color: colorSet.text,
              border: `1px solid ${colorSet.border}`,
            }}
          >
            {treatment.category}
          </div>
          <div className="treat-title">{treatment.title}</div>
          {treatment.shortDesc && (
            <div className="treat-desc">{treatment.shortDesc}</div>
          )}
        </div>

        <div className="treat-arrow">→</div>
      </div>
    </>
  );
};

export default TreatmentCard;
