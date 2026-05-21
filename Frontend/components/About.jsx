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
  { num: "02", title: "Managing life's transitions gracefully", text: "From adolescence to menopause, from stress to serenity—we walk alongside you through every transformative phase of life." },
  { num: "03", title: "Healing emotional and physical blockages", text: "Release what no longer serves you. Through self-awareness practices, we help dissolve the emotional patterns that prevent true healing." },
  { num: "04", title: "Living with self-respect, confidence, and inner happiness", text: "Self-respect, confidence, and lasting happiness are not destinations but qualities we help you cultivate and carry forward every day." },
];

function BotanicalIllustration() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 480 640"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ayurvedic botanical illustration with lotus flower and herbs"
    >
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor="#5a6e4e" />
          <stop offset="100%" stopColor="#2e3d28" />
        </radialGradient>
        <radialGradient id="lotusGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8DCCF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#E8DCCF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="petalGrad" cx="30%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#f0e8df" />
          <stop offset="100%" stopColor="#C9B79C" />
        </radialGradient>
        <radialGradient id="petalGrad2" cx="30%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#e8dfd7" />
          <stop offset="100%" stopColor="#b8a48a" />
        </radialGradient>
        <linearGradient id="stemGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3d5235" />
          <stop offset="100%" stopColor="#6B7C5B" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="480" height="640" fill="url(#bgGrad)" />

      {/* Subtle texture circles */}
      <circle cx="240" cy="320" r="280" fill="none" stroke="white" strokeWidth="0.4" opacity="0.06" />
      <circle cx="240" cy="320" r="220" fill="none" stroke="white" strokeWidth="0.4" opacity="0.07" />
      <circle cx="240" cy="320" r="160" fill="none" stroke="white" strokeWidth="0.4" opacity="0.08" />
      <circle cx="240" cy="320" r="100" fill="none" stroke="white" strokeWidth="0.3" opacity="0.09" />

      {/* Vertical axis line */}
      <line x1="240" y1="40" x2="240" y2="600" stroke="white" strokeWidth="0.4" opacity="0.07" />

      {/* Large background leaf left */}
      <path d="M 60 480 Q 80 360 160 300 Q 110 380 140 460 Z" fill="#3d5235" opacity="0.6" />
      <path d="M 60 480 Q 80 360 160 300" fill="none" stroke="#4a6840" strokeWidth="1" opacity="0.5" />

      {/* Large background leaf right */}
      <path d="M 420 480 Q 400 360 320 300 Q 370 380 340 460 Z" fill="#3d5235" opacity="0.6" />
      <path d="M 420 480 Q 400 360 320 300" fill="none" stroke="#4a6840" strokeWidth="1" opacity="0.5" />

      {/* Sweeping stem left */}
      <path d="M 100 620 Q 120 500 180 400 Q 160 490 200 540" fill="none" stroke="#4d6445" strokeWidth="2.5" opacity="0.7" />
      {/* Leaf on stem left */}
      <path d="M 155 435 Q 95 395 80 340 Q 130 375 155 435 Z" fill="#4a6840" opacity="0.75" />
      <path d="M 155 435 Q 95 395 80 340" fill="none" stroke="#5a7850" strokeWidth="0.8" opacity="0.6" />

      {/* Sweeping stem right */}
      <path d="M 380 620 Q 360 500 300 400 Q 320 490 280 540" fill="none" stroke="#4d6445" strokeWidth="2.5" opacity="0.7" />
      {/* Leaf on stem right */}
      <path d="M 325 435 Q 385 395 400 340 Q 350 375 325 435 Z" fill="#4a6840" opacity="0.75" />
      <path d="M 325 435 Q 385 395 400 340" fill="none" stroke="#5a7850" strokeWidth="0.8" opacity="0.6" />

      {/* Small decorative herbs top left */}
      <path d="M 100 180 Q 90 140 110 110" fill="none" stroke="#5a7850" strokeWidth="1.2" opacity="0.5" />
      <ellipse cx="110" cy="108" rx="7" ry="10" fill="#4d6e40" opacity="0.5" transform="rotate(-15 110 108)" />
      <path d="M 80 195 Q 65 160 80 130" fill="none" stroke="#5a7850" strokeWidth="1" opacity="0.4" />
      <ellipse cx="80" cy="128" rx="5" ry="8" fill="#4d6e40" opacity="0.45" transform="rotate(10 80 128)" />

      {/* Small decorative herbs top right */}
      <path d="M 380 180 Q 390 140 370 110" fill="none" stroke="#5a7850" strokeWidth="1.2" opacity="0.5" />
      <ellipse cx="370" cy="108" rx="7" ry="10" fill="#4d6e40" opacity="0.5" transform="rotate(15 370 108)" />
      <path d="M 400 195 Q 415 160 400 130" fill="none" stroke="#5a7850" strokeWidth="1" opacity="0.4" />
      <ellipse cx="400" cy="128" rx="5" ry="8" fill="#4d6e40" opacity="0.45" transform="rotate(-10 400 128)" />

      {/* Water surface */}
      <ellipse cx="240" cy="480" rx="140" ry="22" fill="#2a3e24" opacity="0.5" />
      <path d="M 120 475 Q 180 468 240 470 Q 300 468 360 475" fill="none" stroke="#3d5a34" strokeWidth="1" opacity="0.4" />
      <path d="M 130 482 Q 190 477 240 479 Q 290 477 350 482" fill="none" stroke="#3d5a34" strokeWidth="0.7" opacity="0.3" />

      {/* Main lotus stem */}
      <path d="M 240 480 Q 235 430 240 370" fill="none" stroke="url(#stemGrad)" strokeWidth="5" strokeLinecap="round" />

      {/* Lotus leaves on water */}
      <path d="M 175 472 Q 200 445 240 448 Q 200 455 185 470 Z" fill="#3d5e34" opacity="0.8" />
      <path d="M 175 472 Q 200 445 240 448" fill="none" stroke="#4a7040" strokeWidth="0.8" opacity="0.6" />
      <path d="M 175 472 Q 195 460 205 470" fill="none" stroke="#4a7040" strokeWidth="0.5" opacity="0.4" />
      <path d="M 305 472 Q 280 445 240 448 Q 280 455 295 470 Z" fill="#3d5e34" opacity="0.8" />
      <path d="M 305 472 Q 280 445 240 448" fill="none" stroke="#4a7040" strokeWidth="0.8" opacity="0.6" />
      <path d="M 305 472 Q 285 460 275 470" fill="none" stroke="#4a7040" strokeWidth="0.5" opacity="0.4" />

      {/* Lotus glow */}
      <ellipse cx="240" cy="300" rx="90" ry="90" fill="url(#lotusGlow)" />

      {/* Back petals (outer row) */}
      <path d="M 240 370 Q 195 330 190 275 Q 220 310 240 330 Q 260 310 290 275 Q 285 330 240 370 Z" fill="#b8a48a" opacity="0.5" />

      {/* Middle-outer petals */}
      <path d="M 240 365 Q 175 340 165 285 Q 200 315 225 340 Z" fill="url(#petalGrad2)" opacity="0.75" />
      <path d="M 240 365 Q 305 340 315 285 Q 280 315 255 340 Z" fill="url(#petalGrad2)" opacity="0.75" />

      {/* Vein lines on outer petals */}
      <path d="M 225 340 Q 192 318 180 290" fill="none" stroke="#C9B79C" strokeWidth="0.5" opacity="0.4" />
      <path d="M 255 340 Q 288 318 300 290" fill="none" stroke="#C9B79C" strokeWidth="0.5" opacity="0.4" />

      {/* Top outer petals */}
      <path d="M 240 365 Q 205 305 208 258 Q 225 295 240 320 Z" fill="url(#petalGrad)" opacity="0.8" />
      <path d="M 240 365 Q 275 305 272 258 Q 255 295 240 320 Z" fill="url(#petalGrad)" opacity="0.8" />

      {/* Vein lines on top petals */}
      <path d="M 220 315 Q 213 283 215 262" fill="none" stroke="#C9B79C" strokeWidth="0.5" opacity="0.5" />
      <path d="M 260 315 Q 267 283 265 262" fill="none" stroke="#C9B79C" strokeWidth="0.5" opacity="0.5" />

      {/* Inner petal layer */}
      <path d="M 240 355 Q 208 325 210 290 Q 225 315 240 335 Z" fill="#f0e8df" opacity="0.9" />
      <path d="M 240 355 Q 272 325 270 290 Q 255 315 240 335 Z" fill="#f0e8df" opacity="0.9" />

      {/* Center inner petals */}
      <path d="M 240 355 Q 225 318 228 290 Q 235 310 240 328 Z" fill="#E8DCCF" opacity="0.95" />
      <path d="M 240 355 Q 255 318 252 290 Q 245 310 240 328 Z" fill="#E8DCCF" opacity="0.95" />

      {/* Vein on inner petals */}
      <path d="M 232 325 Q 229 303 230 292" fill="none" stroke="#b8a48a" strokeWidth="0.5" opacity="0.5" />
      <path d="M 248 325 Q 251 303 250 292" fill="none" stroke="#b8a48a" strokeWidth="0.5" opacity="0.5" />

      {/* Lotus center (seed pod) */}
      <ellipse cx="240" cy="320" rx="18" ry="15" fill="#C9B79C" opacity="0.9" />
      <ellipse cx="240" cy="318" rx="14" ry="11" fill="#d4c4a8" />
      {/* Seed dots */}
      <circle cx="236" cy="315" r="2" fill="#b8a48a" opacity="0.7" />
      <circle cx="244" cy="315" r="2" fill="#b8a48a" opacity="0.7" />
      <circle cx="240" cy="321" r="2" fill="#b8a48a" opacity="0.7" />
      <circle cx="234" cy="321" r="1.5" fill="#b8a48a" opacity="0.5" />
      <circle cx="246" cy="321" r="1.5" fill="#b8a48a" opacity="0.5" />

      {/* Stamens */}
      <line x1="236" y1="313" x2="232" y2="302" stroke="#d4c4a8" strokeWidth="0.7" opacity="0.6" />
      <circle cx="231" cy="300" r="1.5" fill="#E8DCCF" opacity="0.7" />
      <line x1="244" y1="313" x2="248" y2="302" stroke="#d4c4a8" strokeWidth="0.7" opacity="0.6" />
      <circle cx="249" cy="300" r="1.5" fill="#E8DCCF" opacity="0.7" />
      <line x1="240" y1="312" x2="240" y2="300" stroke="#d4c4a8" strokeWidth="0.7" opacity="0.6" />
      <circle cx="240" cy="298" r="1.5" fill="#E8DCCF" opacity="0.7" />

      {/* Left bud */}
      <path d="M 225 400 Q 195 380 188 350 Q 205 365 225 385 Z" fill="none" stroke="#4a6840" strokeWidth="2" strokeLinecap="round" />
      <path d="M 188 350 Q 195 325 205 315 Q 200 338 200 360 Z" fill="#C9B79C" opacity="0.6" />
      <path d="M 188 350 Q 182 325 195 312 Q 192 335 200 360 Z" fill="#d4c4a8" opacity="0.55" />
      <ellipse cx="195" cy="335" rx="5" ry="9" fill="#e8ddd0" opacity="0.4" transform="rotate(-5 195 335)" />

      {/* Right bud */}
      <path d="M 255 400 Q 285 380 292 350 Q 275 365 255 385 Z" fill="none" stroke="#4a6840" strokeWidth="2" strokeLinecap="round" />
      <path d="M 292 350 Q 285 325 275 315 Q 280 338 280 360 Z" fill="#C9B79C" opacity="0.6" />
      <path d="M 292 350 Q 298 325 285 312 Q 288 335 280 360 Z" fill="#d4c4a8" opacity="0.55" />
      <ellipse cx="285" cy="335" rx="5" ry="9" fill="#e8ddd0" opacity="0.4" transform="rotate(5 285 335)" />

      {/* Small floating leaves upper area */}
      <path d="M 135 230 Q 118 210 125 190 Q 138 205 135 230 Z" fill="#4d6e40" opacity="0.55" />
      <path d="M 135 230 Q 118 210 125 190" fill="none" stroke="#5a8050" strokeWidth="0.7" opacity="0.45" />
      <path d="M 345 230 Q 362 210 355 190 Q 342 205 345 230 Z" fill="#4d6e40" opacity="0.55" />
      <path d="M 345 230 Q 362 210 355 190" fill="none" stroke="#5a8050" strokeWidth="0.7" opacity="0.45" />

      {/* Fine herb sprigs mid-left */}
      <path d="M 145 320 Q 130 295 145 270" fill="none" stroke="#4a6840" strokeWidth="1" opacity="0.45" />
      <ellipse cx="145" cy="268" rx="4" ry="6" fill="#4a6840" opacity="0.5" />
      <path d="M 135 305 Q 115 285 128 262" fill="none" stroke="#4a6840" strokeWidth="0.8" opacity="0.4" />
      <ellipse cx="128" cy="261" rx="3" ry="5" fill="#4a6840" opacity="0.45" />

      {/* Fine herb sprigs mid-right */}
      <path d="M 335 320 Q 350 295 335 270" fill="none" stroke="#4a6840" strokeWidth="1" opacity="0.45" />
      <ellipse cx="335" cy="268" rx="4" ry="6" fill="#4a6840" opacity="0.5" />
      <path d="M 345 305 Q 365 285 352 262" fill="none" stroke="#4a6840" strokeWidth="0.8" opacity="0.4" />
      <ellipse cx="352" cy="261" rx="3" ry="5" fill="#4a6840" opacity="0.45" />

      {/* Brand text */}
      <text x="240" y="580" textAnchor="middle" fill="white" opacity="0.2" fontSize="9" fontFamily="serif" letterSpacing="5" fontWeight="300">ABSOLUTE AYURVEDA</text>

      {/* Top mandala detail */}
      <circle cx="240" cy="80" r="22" fill="none" stroke="white" strokeWidth="0.5" opacity="0.12" />
      <circle cx="240" cy="80" r="14" fill="none" stroke="white" strokeWidth="0.4" opacity="0.14" />
      <circle cx="240" cy="80" r="6" fill="none" stroke="white" strokeWidth="0.3" opacity="0.16" />
      <line x1="240" y1="58" x2="240" y2="102" stroke="white" strokeWidth="0.4" opacity="0.1" />
      <line x1="218" y1="80" x2="262" y2="80" stroke="white" strokeWidth="0.4" opacity="0.1" />
      <line x1="224" y1="64" x2="256" y2="96" stroke="white" strokeWidth="0.3" opacity="0.08" />
      <line x1="256" y1="64" x2="224" y2="96" stroke="white" strokeWidth="0.3" opacity="0.08" />

      {/* Scattered dots */}
      <circle cx="160" cy="270" r="1.5" fill="white" opacity="0.12" />
      <circle cx="180" cy="245" r="1" fill="white" opacity="0.1" />
      <circle cx="320" cy="270" r="1.5" fill="white" opacity="0.12" />
      <circle cx="300" cy="245" r="1" fill="white" opacity="0.1" />
      <circle cx="170" cy="380" r="1" fill="white" opacity="0.08" />
      <circle cx="310" cy="380" r="1" fill="white" opacity="0.08" />
    </svg>
  );
}

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
            {/* Illustration */}
            <Reveal>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "3/4",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <BotanicalIllustration />
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