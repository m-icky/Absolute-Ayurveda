"use client";

import Reveal from "./Reveal";
import { useRouter } from "next/navigation";

const courses = [
  {
    num: "01",
    name: "Ayurveda Massage Workshop",
    desc: "You will be capable of giving general body massage",
    duration: "10 hours (2h per day)",
  },
  {
    num: "02",
    name: "Ayurveda Cooking Workshop",
    desc: "You will be capable of preparing ayurvedic diet followed food",
    duration: "10 hours (2h per day)",
  },
  {
    num: "03",
    name: "Basic Ayurveda Workshop",
    desc: "You will be capable of doing prakriti analysis",
    duration: "24 hours (2h per day)",
  },
  {
    num: "04",
    name: "Intermediate Ayurveda Workshop",
    desc: "You will be capable of giving diet advice and massage",
    duration: "40 hours (3h per day)",
  },
  {
    num: "05",
    name: "Advanced Ayurveda Workshop",
    desc: "You will be capable of preparing medicines and giving massages",
    duration: "70 hours (3h per day)",
  },
];

export default function Courses() {
  const router = useRouter();

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

        {/* Courses Marquee */}
        <Reveal delay={0.4}>
          <div
            style={{
              marginTop: "60px",
              overflow: "hidden",
              position: "relative",
              background: "rgba(255,255,255,0.1)",
            }}
          >
            <style>{`
              @keyframes marquee-courses {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .marquee-wrapper:hover .marquee-content {
                animation-play-state: paused;
              }
            `}</style>
            <div className="marquee-wrapper" style={{ display: "flex" }}>
              <div
                className="marquee-content"
                style={{
                  display: "flex",
                  animation: "marquee-courses 30s linear infinite",
                  width: "max-content",
                }}
              >
                {[...courses, ...courses].map((c, i) => (
                  <div
                    key={`${c.num}-${i}`}
                    style={{
                      flexShrink: 0,
                      width: "320px",
                      background: "#1A1A1A",
                      padding: "48px 36px",
                      transition: "background 0.4s",
                      cursor: "default",
                      marginRight: "1px",
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
                ))}
              </div>
            </div>
          </div>
        </Reveal>

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
              onClick={() => router.push("/course")}
            >
              Enquire About Courses
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
