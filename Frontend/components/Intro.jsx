import Reveal from "./Reveal";

const pillars = [
  {
    title: "Body",
    text: "Heal your body with natural cleansing methods",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <circle cx="24" cy="24" r="20" stroke="#6B7C5B" strokeWidth="1.5" />
        <path d="M24 8 C28 16 36 20 36 28 C36 36 30 40 24 40 C18 40 12 36 12 28 C12 20 20 16 24 8Z" fill="#6B7C5B" opacity="0.3" />
        <line x1="24" y1="10" x2="24" y2="38" stroke="#6B7C5B" strokeWidth="1" />
      </svg>
    ),
  },
  {
    title: "Mind",
    text: "Calm your mind with yoga, meditation & breathwork",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <circle cx="24" cy="24" r="20" stroke="#6B7C5B" strokeWidth="1.5" />
        <path d="M16 20 Q24 12 32 20 Q36 28 24 36 Q12 28 16 20Z" fill="#6B7C5B" opacity="0.3" stroke="#6B7C5B" strokeWidth="1" />
        <circle cx="24" cy="24" r="3" fill="#6B7C5B" />
      </svg>
    ),
  },
  {
    title: "Spirit",
    text: "Rejuvenate your spirit with positive energy & self-awareness",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <circle cx="24" cy="24" r="20" stroke="#6B7C5B" strokeWidth="1.5" />
        <path d="M24 10 L26 20 L36 20 L28 26 L31 36 L24 30 L17 36 L20 26 L12 20 L22 20Z" fill="#6B7C5B" opacity="0.35" />
      </svg>
    ),
  },
];

export default function Intro() {
  return (
    <section
      style={{
        background: "#F8F6F0",
        padding: "120px 60px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <span className="section-tag" style={{ justifyContent: "center", display: "block" }}>
            Our Philosophy
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="section-title"
            style={{
              fontSize: "clamp(36px, 5vw, 60px)",
              maxWidth: "700px",
              margin: "0 auto 24px",
            }}
          >
            Your body carries its own <em>healing power</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="divider" style={{ margin: "24px auto" }} />
        </Reveal>
        <Reveal delay={0.3}>
          <p
            style={{
              fontSize: "17px",
              color: "#6B6B6B",
              maxWidth: "680px",
              margin: "0 auto",
              lineHeight: 2,
            }}
          >
            At Absolute Ayurveda, we believe healing is not something done to
            you—it is something awakened within you. Through ancient wisdom and
            compassionate guidance, we help you restore what has always been yours.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "60px",
            marginTop: "80px",
          }}
        >
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12}>
              <div style={{ textAlign: "center", padding: "0 20px" }}>
                <div style={{ width: "48px", height: "48px", margin: "0 auto 24px", opacity: 0.75 }}>
                  {p.svg}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "20px",
                    fontWeight: 400,
                    marginBottom: "12px",
                    color: "#4a5740",
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: 1.9 }}>
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
