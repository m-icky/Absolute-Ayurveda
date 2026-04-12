"use client";

import Reveal from "./Reveal";

const courses = [
  {
    num: "01",
    name: "Ayurvedic Massage Therapy",
    desc: "Master the ancient art of Abhyanga and specialized Ayurvedic massage traditions from Kerala's healing lineage.",
  },
  {
    num: "02",
    name: "Traditional Healing Treatments",
    desc: "Study classical Panchakarma protocols, herbal preparations, and traditional treatment modalities used for centuries.",
  },
  {
    num: "03",
    name: "Lifestyle & Wellness Guidance",
    desc: "Learn to counsel others on seasonal routines, dietary principles, yoga integration, and conscious daily living practices effectively.",
  },
];

export default function Courses() {
  return (
    <section
      id="courses"
      style={{ background: "#1A1A1A", padding: "120px 60px", color: "white" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <span className="section-tag" style={{ color: "#C9B79C" }}>
            School of Ayurveda
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-title" style={{ color: "white", fontSize: "clamp(32px, 4vw, 42px)" }}>
            Learn the Science of Healing,<br />
            <em style={{ color: "#E8DCCF" }}>Share the Art of Wellness</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="divider" style={{ background: "#C9B79C" }} />
        </Reveal>
        <Reveal delay={0.3}>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", maxWidth: "560px", lineHeight: 1.9 }}>
            Not just techniques—an invitation to embrace Ayurveda as a complete
            way of life. Share the art of wellness with the world.
          </p>
        </Reveal>

        {/* Courses grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1px",
            marginTop: "60px",
            background: "rgba(255,255,255,0.1)",
          }}
        >
          {courses.map((c, i) => (
            <Reveal key={c.num} delay={i * 0.12}>
              <div
                style={{
                  background: "#1A1A1A",
                  padding: "48px 36px",
                  transition: "background 0.4s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#222")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1A1A1A")}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "48px",
                    fontWeight: 400,
                    color: "rgba(201,183,156,0.22)",
                    marginBottom: "16px",
                    lineHeight: 1,
                  }}
                >
                  {c.num}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "22px",
                    fontWeight: 400,
                    color: "white",
                    marginBottom: "12px",
                  }}
                >
                  {c.name}
                </h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                  {c.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.3}>
          <div style={{ textAlign: "center", marginTop: "80px" }}>
            <p
              style={{
                fontSize: "18px",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "32px",
                fontStyle: "italic",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              &ldquo;Becoming a healer begins with healing yourself.&rdquo;
            </p>
            <button
              className="outline-btn"
              onClick={() => {
                const el = document.querySelector("#contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Enquire About Courses
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
