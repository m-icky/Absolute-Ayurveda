"use client";

import Reveal from "./Reveal";

const philosophyItems = [
  "The body carries its own cleansing power",
  "The mind gains clarity through meditation and breathing",
  "Positive surroundings create positive energy",
  "Weaknesses of body and mind can be understood, tracked, and rejuvenated.",
];

const missionCards = [
  { num: "01", title: "Building immunity naturally", text: "Strengthen your body's innate defense through tailored herbal protocols, seasonal routines, and dietary wisdom passed through generations." },
  { num: "02", title: "Managing life’s transitions gracefully", text: "From adolescence to menopause, from stress to serenity—we walk alongside you through every transformative phase of life." },
  { num: "03", title: "Healing emotional and physical blockages", text: "Release what no longer serves you. Through self-awareness practices, we help dissolve the emotional patterns that prevent true healing." },
  { num: "04", title: "Living with self-respect, confidence, and inner happiness", text: "Self-respect, confidence, and lasting happiness are not destinations but qualities we help you cultivate and carry forward every day." },
];

export default function About() {
  return (
    <>
      <section id="about" style={{ background: "white", padding: "120px 60px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "100px",
              alignItems: "center",
            }}
            className="about-grid"
          >
            {/* Image */}
            <Reveal>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "3/4",
                    background: "linear-gradient(145deg, #4a5740 0%, #6B7C5B 50%, #8a9b7a 100%)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <svg
                    viewBox="0 0 300 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }}
                  >
                    <path d="M150 20 C200 80 260 160 250 260 C240 340 200 380 150 390 C100 380 60 340 50 260 C40 160 100 80 150 20Z" fill="white" opacity="0.6" />
                    <path d="M150 60 C185 110 220 170 215 240 C210 300 185 340 150 350 C115 340 90 300 85 240 C80 170 115 110 150 60Z" fill="white" opacity="0.4" />
                    <circle cx="150" cy="200" r="60" fill="none" stroke="white" strokeWidth="0.5" opacity="0.6" />
                    <circle cx="150" cy="200" r="100" fill="none" stroke="white" strokeWidth="0.5" opacity="0.4" />
                    <path d="M150 60 L150 350" stroke="white" strokeWidth="0.5" opacity="0.5" />
                    <path d="M90 180 Q150 210 210 180" stroke="white" strokeWidth="0.5" opacity="0.5" />
                    <path d="M75 240 Q150 270 225 240" stroke="white" strokeWidth="0.5" opacity="0.5" />
                    <text x="150" y="195" textAnchor="middle" fill="white" opacity="0.5" fontSize="11" fontFamily="serif" letterSpacing="3">ABSOLUTE</text>
                    <text x="150" y="215" textAnchor="middle" fill="white" opacity="0.5" fontSize="11" fontFamily="serif" letterSpacing="3">AYURVEDA</text>
                  </svg>
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "-30px",
                    right: "-30px",
                    width: "70%",
                    aspectRatio: "1",
                    background: "linear-gradient(135deg, #E8DCCF, #C9B79C)",
                    opacity: 0.2,
                    zIndex: -1,
                  }}
                />
              </div>
            </Reveal>

            {/* Content */}
            <Reveal delay={0.15}>
              <span className="section-tag">Our Story</span>
              <h2 className="section-title">
                Ayurveda is not<br />just a treatment—<br />it&apos;s a <em>Lifestyle</em>
              </h2>
              <div className="divider" />
              <blockquote
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "20px",
                  fontStyle: "italic",
                  color: "#6B7C5B",
                  lineHeight: 1.7,
                  margin: "32px 0",
                  paddingLeft: "24px",
                  borderLeft: "2px solid #C9B79C",
                }}
              >
                &ldquo;To help every individual know themselves deeply, embrace balance, and live a high-frequency life filled with inner peace.&rdquo;
              </blockquote>
              <p style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: 1.9, marginBottom: "24px" }}>
                Founded in 2008, Absolute Ayurveda was born from a shared vision: that every person carries within them the blueprint for perfect health. Our clinic brings together the timeless science of Ayurveda with compassionate, personalized care.
              </p>
              <ul style={{ listStyle: "none" }}>
                {philosophyItems.map((item) => (
                  <li
                    key={item}
                    style={{
                      padding: "12px 0",
                      borderBottom: "1px solid #E2DADA",
                      fontSize: "14px",
                      color: "#6B6B6B",
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "#C9B79C",
                        marginTop: "9px",
                        flexShrink: 0,
                        display: "block",
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "2px",
          background: "#E2DADA",
        }}
        className="mission-grid"
      >
        {missionCards.map((c, i) => (
          <Reveal key={c.num} delay={i * 0.1}>
            <div
              style={{
                background: "#F8F6F0",
                padding: "48px 40px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "36px",
                  color: "#C9B79C",
                  opacity: 0.5,
                  marginBottom: "16px",
                }}
              >
                {c.num}
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "20px",
                  color: "#1A1A1A",
                  marginBottom: "12px",
                  fontWeight: 400,
                }}
              >
                {c.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: 1.9 }}>
                {c.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;  
            gap: 48px !important;
          }
          .mission-grid {
            grid-template-columns: 1fr !important;
          }
        }
          
      `}</style>
    </>
  );
}
