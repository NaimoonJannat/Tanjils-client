import React, { useState } from "react";

const chambers = [
  {
    city: "Faridpur",
    hotline: "01300-263332",
    locations: [
      {
        name: "Faridpur Apollo Specialized Hospital",
        address: "Alipur, Faridpur",
        icon: "🏥",
      },
      {
        name: "Islami Bank Community Hospital Ltd.",
        address: "Faridpur",
        icon: "🏥",
      },
    ],
    schedule: [
      { days: "Saturday – Wednesday", time: "4:00 PM – 8:00 PM" },
    ],
  },
  {
    city: "Jhenaidah",
    hotline: "01535-165256",
    locations: [
      {
        name: "Islami Bank Community Hospital Ltd.",
        address: "Chuadanga Bus Stand, Jhenaidah",
        icon: "🏥",
      },
    ],
    schedule: [
      { days: "Thursday", time: "4:00 PM – 8:00 PM" },
      { days: "Friday", time: "9:00 AM – 12:30 PM" },
    ],
  },
];

const services = [
  { label: "Laparoscopic Surgery", items: ["Gall Bladder", "Appendix", "Male Hernia", "Female Hernia"] },
  { label: "Laser Surgery", items: ["Piles", "Anal Fissure", "Anal Fistula"] },
  { label: "Cancer Surgery", items: ["Breast Cancer", "Abdominal Cancer", "Colon & Rectal Cancer"] },
];

export default function AppointmentSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <style>{`
        .appt-section {
          background: linear-gradient(160deg, #0A1628 0%, #0F2040 60%, #0A1628 100%);
          position: relative;
          overflow: hidden;
          padding: 100px 24px;
          font-family: 'DM Sans', sans-serif;
        }
        /* Dot grid */
        .appt-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(201,169,110,0.06) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }
        /* Gold orb */
        .appt-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .appt-inner {
          max-width: 1180px;
          margin: 0 auto;
          position: relative;
        }
        /* Section header */
        .appt-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .appt-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(201,169,110,0.1);
          border: 1px solid rgba(201,169,110,0.28);
          border-radius: 20px;
          padding: 5px 16px;
          margin-bottom: 20px;
        }
        .appt-tag-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #C9A96E;
        }
        .appt-tag-text {
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #C9A96E;
        }
        .appt-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3.6rem);
          font-weight: 700;
          color: #F8F5F0;
          line-height: 1.1;
          margin-bottom: 14px;
        }
        .appt-h2 span {
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
        .appt-subtitle {
          font-size: 0.95rem;
          color: rgba(248,245,240,0.55);
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.7;
        }
        /* Main grid */
        .appt-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        @media (max-width: 900px) {
          .appt-grid { grid-template-columns: 1fr; }
        }
        /* Chamber card */
        .chamber-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,169,110,0.15);
          border-radius: 10px;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .chamber-card:hover {
          border-color: rgba(201,169,110,0.35);
          box-shadow: 0 8px 40px rgba(0,0,0,0.3);
        }
        /* Tabs */
        .chamber-tabs {
          display: flex;
          border-bottom: 1px solid rgba(201,169,110,0.12);
        }
        .chamber-tab {
          flex: 1;
          padding: 14px;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(248,245,240,0.45);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.2s, background 0.2s;
          position: relative;
          font-family: 'DM Sans', sans-serif;
        }
        .chamber-tab::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 2px;
          background: #C9A96E;
          transform: scaleX(0);
          transition: transform 0.25s;
        }
        .chamber-tab.active {
          color: #C9A96E;
          background: rgba(201,169,110,0.05);
        }
        .chamber-tab.active::after {
          transform: scaleX(1);
        }
        /* Chamber body */
        .chamber-body {
          padding: 28px;
        }
        .chamber-city {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #F8F5F0;
          margin-bottom: 6px;
        }
        .chamber-hotline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #C9A96E, #A87C40);
          color: #0A1628;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 20px;
          text-decoration: none;
          transition: filter 0.2s;
        }
        .chamber-hotline:hover { filter: brightness(1.1); }
        .chamber-locations {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        .chamber-location {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,169,110,0.12);
          border-radius: 7px;
          padding: 12px 14px;
        }
        .chamber-location-icon {
          font-size: 1rem;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .chamber-location-name {
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(248,245,240,0.85);
          margin-bottom: 2px;
        }
        .chamber-location-addr {
          font-size: 0.75rem;
          color: rgba(248,245,240,0.45);
        }
        /* Schedule */
        .chamber-schedule-title {
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(201,169,110,0.6);
          margin-bottom: 10px;
        }
        .chamber-schedule {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .schedule-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 9px 12px;
          background: rgba(201,169,110,0.05);
          border-radius: 5px;
          border-left: 2px solid rgba(201,169,110,0.4);
        }
        .schedule-days {
          font-size: 0.8rem;
          color: rgba(248,245,240,0.7);
        }
        .schedule-time {
          font-size: 0.8rem;
          font-weight: 600;
          color: #C9A96E;
          white-space: nowrap;
        }
        /* Right panel */
        .appt-right {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        /* Contact card */
        .contact-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,169,110,0.15);
          border-radius: 10px;
          padding: 28px;
        }
        .contact-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: #F8F5F0;
          margin-bottom: 18px;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(201,169,110,0.08);
          text-decoration: none;
          transition: gap 0.2s;
        }
        .contact-item:last-child { border-bottom: none; }
        a.contact-item:hover { gap: 18px; }
        .contact-icon-wrap {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(201,169,110,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 0.9rem;
        }
        .contact-label {
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(201,169,110,0.6);
          margin-bottom: 2px;
        }
        .contact-value {
          font-size: 0.88rem;
          color: rgba(248,245,240,0.8);
          font-weight: 500;
        }
        a.contact-item .contact-value { color: #C9A96E; }
        /* Services quick list */
        .services-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,169,110,0.15);
          border-radius: 10px;
          padding: 28px;
        }
        .services-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: #F8F5F0;
          margin-bottom: 18px;
        }
        .services-groups {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .services-group-label {
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #C9A96E;
          margin-bottom: 7px;
        }
        .services-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .services-pill {
          font-size: 0.75rem;
          padding: 4px 12px;
          border-radius: 20px;
          background: rgba(201,169,110,0.08);
          border: 1px solid rgba(201,169,110,0.2);
          color: rgba(248,245,240,0.7);
        }
        /* CTA */
        .appt-cta {
          background: linear-gradient(135deg, rgba(201,169,110,0.12), rgba(201,169,110,0.05));
          border: 1px solid rgba(201,169,110,0.25);
          border-radius: 10px;
          padding: 28px;
          text-align: center;
        }
        .appt-cta-text {
          font-size: 0.88rem;
          color: rgba(248,245,240,0.6);
          margin-bottom: 16px;
          line-height: 1.6;
        }
        .appt-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #C9A96E, #A87C40);
          color: #0A1628;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.88rem;
          letter-spacing: 0.04em;
          padding: 13px 32px;
          border-radius: 3px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: filter 0.25s, transform 0.25s, box-shadow 0.25s;
          box-shadow: 0 4px 20px rgba(201,169,110,0.3);
        }
        .appt-cta-btn:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(201,169,110,0.45);
        }
      `}</style>

      <section className="appt-section">
        {/* Background orbs */}
        <div className="appt-orb" style={{ width: 500, height: 500, top: -200, right: -200, background: "radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%)" }} />
        <div className="appt-orb" style={{ width: 300, height: 300, bottom: -100, left: -100, background: "radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)" }} />

        <div className="appt-inner">

          {/* Header */}
          <div className="appt-header">
            <div className="appt-tag">
              <div className="appt-tag-dot" />
              <span className="appt-tag-text">Visit Us</span>
            </div>
            <h2 className="appt-h2">
              Schedule Your<br />
              <span>Appointment Today</span>
            </h2>
            <p className="appt-subtitle">
              Book a consultation at any of our chamber locations. Expert surgical care across Faridpur and Jhenaidah.
            </p>
          </div>

          {/* Main grid */}
          <div className="appt-grid">

            {/* Left: Chamber tabs */}
            <div className="chamber-card">
              <div className="chamber-tabs">
                {chambers.map((c, i) => (
                  <button
                    key={c.city}
                    className={`chamber-tab ${activeTab === i ? "active" : ""}`}
                    onClick={() => setActiveTab(i)}
                  >
                    {c.city}
                  </button>
                ))}
              </div>

              <div className="chamber-body">
                {chambers.map((c, i) =>
                  i !== activeTab ? null : (
                    <div key={c.city}>
                      <div className="chamber-city">{c.city} Chamber</div>

                      <a href={`tel:${c.hotline}`} className="chamber-hotline">
                        📞 Hotline: {c.hotline}
                      </a>

                      <div className="chamber-locations">
                        {c.locations.map((loc) => (
                          <div className="chamber-location" key={loc.name}>
                            <div className="chamber-location-icon">{loc.icon}</div>
                            <div>
                              <div className="chamber-location-name">{loc.name}</div>
                              <div className="chamber-location-addr">{loc.address}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="chamber-schedule-title">Visiting Hours</div>
                      <div className="chamber-schedule">
                        {c.schedule.map((s) => (
                          <div className="schedule-row" key={s.days}>
                            <span className="schedule-days">{s.days}</span>
                            <span className="schedule-time">{s.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Right: contact + services + CTA */}
            <div className="appt-right">

              {/* Contact */}
              <div className="contact-card">
                <div className="contact-card-title">Direct Contact</div>

                <a href="tel:01300263332" className="contact-item">
                  <div className="contact-icon-wrap">📞</div>
                  <div>
                    <div className="contact-label">Faridpur Hotline</div>
                    <div className="contact-value">01300-263332</div>
                  </div>
                </a>

                <a href="tel:01535165256" className="contact-item">
                  <div className="contact-icon-wrap">📞</div>
                  <div>
                    <div className="contact-label">Jhenaidah Hotline</div>
                    <div className="contact-value">01535-165256</div>
                  </div>
                </a>

                <a href="mailto:btanjil17@gmail.com" className="contact-item">
                  <div className="contact-icon-wrap">✉</div>
                  <div>
                    <div className="contact-label">Email</div>
                    <div className="contact-value">btanjil17@gmail.com</div>
                  </div>
                </a>

                <a href="mailto:laser.lapunit@gmail.com" className="contact-item">
                  <div className="contact-icon-wrap">✉</div>
                  <div>
                    <div className="contact-label">Laser & Lap Unit</div>
                    <div className="contact-value">laser.lapunit@gmail.com</div>
                  </div>
                </a>
              </div>

              {/* Services quick list */}
              <div className="services-card">
                <div className="services-card-title">Available Services</div>
                <div className="services-groups">
                  {services.map((sg) => (
                    <div key={sg.label}>
                      <div className="services-group-label">{sg.label}</div>
                      <div className="services-pills">
                        {sg.items.map((item) => (
                          <div className="services-pill" key={item}>{item}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="appt-cta">
                <p className="appt-cta-text">
                  Ready to book your consultation? Call us directly for priority scheduling and fast response.
                </p>
                <a href="tel:01300263332" className="appt-cta-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  Make an Appointment
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}
