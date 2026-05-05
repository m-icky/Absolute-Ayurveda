"use client";

import Reveal from "./Reveal";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Configuration for your local Django backend
const API_BASE_URL = "http://127.0.0.1:8000/api/courses/";

export default function Courses() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        const data = await response.json();
        
        // Filter: Accepts both 'active' and 'open' statuses
        const activeCourses = data.filter(course => {
          if (!course.status) return true; 
          const status = String(course.status).toLowerCase();
          return status === 'active' || status === 'open';
        });
        
        setCourses(activeCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

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
              minHeight: "250px", // Ensures space while loading
              display: "flex",
              alignItems: "center"
            }}
          >
            {isLoading ? (
              <div style={{ width: "100%", textAlign: "center", color: "rgba(255,255,255,0.5)", fontFamily: "Lato" }}>
                Loading courses...
              </div>
            ) : courses.length === 0 ? (
              <div style={{ width: "100%", textAlign: "center", color: "rgba(255,255,255,0.5)", fontFamily: "Lato" }}>
                No active courses available at the moment.
              </div>
            ) : (
              <>
                <style>{`
                  @keyframes marquee-courses {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                  .marquee-wrapper:hover .marquee-content {
                    animation-play-state: paused;
                  }
                `}</style>
                <div className="marquee-wrapper" style={{ display: "flex", width: "100%" }}>
                  <div
                    className="marquee-content"
                    style={{
                      display: "flex",
                      animation: "marquee-courses 30s linear infinite",
                      width: "max-content",
                    }}
                  >
                    {/* Duplicating the array to create the seamless scrolling effect */}
                    {[...courses, ...courses].map((c, i) => {
                      // Calculate actual index to generate numbers like 01, 02 correctly even for the duplicated items
                      const actualIndex = i % courses.length;
                      const displayNum = String(actualIndex + 1).padStart(2, "0");

                      return (
                        <div
                          key={`${c.id || actualIndex}-${i}`}
                          style={{
                            flexShrink: 0,
                            width: "320px",
                            background: "#1A1A1A",
                            padding: "48px 36px",
                            transition: "background 0.4s",
                            cursor: "default",
                            marginRight: "1px",
                            display: "flex",
                            flexDirection: "column"
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
                            {displayNum}
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
                            {/* Falls back to name if title isn't available */}
                            {c.title || c.name}
                          </h3>
                          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                            {/* Supports both description (Django model) and desc (Static format) */}
                            {c.description || c.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
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