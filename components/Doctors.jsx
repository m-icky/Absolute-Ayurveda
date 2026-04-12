"use client";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const doctors = [
  {
    name: "Dr. Soumya Sagar",
    role: "Founder | Ayurvedic Physician & Women’s Wellness Specialist",
    cred: "BAMS · Diploma in Cosmetology · 20+ Years of Experience",
    bio: "Dr. Soumya Sagar is a passionate Ayurvedic physician dedicated to women’s wellness and holistic health. With over two decades of clinical experience, she blends the timeless wisdom of Ayurveda with modern insights in cosmetology and lifestyle care.\n\nHer healing philosophy is rooted in empowering women to embrace every stage of life with balance and grace—from adolescence to pregnancy to menopause. She offers guidance in skincare, anti-aging, hormonal health, and stress-related disorders with compassion and authenticity.\n\nDr. Soumya is also an innovator, developing her own range of organic Ayurvedic products rooted in purity and sustainability. As a mentor, she shares her knowledge through training future therapists and offering free Panchakarma courses each year, reflecting her deep commitment to community wellness.",
    specs: ["Women’s health & hormonal balance", "Ayurvedic cosmetology & skincare", "Stress-related disorders in women", "Panchakarma & rejuvenation therapies"],
    quote: "Ayurveda is not just a science; it’s a way of life. My mission is to help people reconnect with their natural rhythms and unlock their own healing power.",
    bg: "linear-gradient(145deg, #8fa07d, #6B7C5B, #4a5740)",
  },
  {
    name: "Dr. Sreejith Kumar",
    role: "Founder | Ayurvedic Physician & Self-Healing Mentor",
    cred: "BAMS · Ayurveda Teacher · International Practitioner",
    bio: "Dr. Sreejith Kumar is an Ayurvedic physician and healer with extensive experience in both India and Europe. Since founding Absolute Ayurveda in 2008, he has dedicated his life to practicing authentic Ayurveda, researching tribal medicine, and teaching the art of massage, yoga, and traditional healing.\n\nHaving worked across Holland, Poland, and Switzerland, Dr. Sreejith combines deep Ayurvedic knowledge with a global perspective. His approach emphasizes self-healing—removing blockages, transforming negative energy, and guiding individuals toward higher frequency living.\n\nHe has also prepared traditional Ayurvedic oils and medicines for his clinic, taught Ayurveda theory and practicals, and integrated yoga into healing journeys. Beyond clinical care, he is a mentor and inspirator, helping people find inner strength, clarity, and confidence.",
    specs: ["Traditional treatments & therapies", "Self-healing through yoga & meditation", "Tribal medicine research", "Massage & lifestyle guidance"],
    quote: "Respect yourself, remove your blockages, and transform your energy—healing begins from within.",
    bg: "linear-gradient(145deg, #5a6e4e, #7d9170, #a8bc9a)",
  },
];

export default function Doctors() {
  return (
    <>
      <section id="doctors" style={{ background: "#F8F6F0", padding: "120px 60px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <span className="section-tag">Our Healers</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-title">
              Meet the <em>Physicians</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="divider" />
          </Reveal>
          <Reveal delay={0.3}>
            <p style={{ fontSize: "15px", color: "#6B6B6B", maxWidth: "560px", lineHeight: 1.9 }}>
              Two founders, one vision—guiding you toward wholeness through the complementary arts of body medicine and spirit awakening.
            </p>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "60px",
              marginTop: "60px",
            }}
          >
            {doctors.map((doc, i) => (
              <Reveal key={doc.name} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ background: "white", overflow: "hidden" }}
                >
                  {/* Image */}
                  <div
                    style={{
                      aspectRatio: "3/4",
                      background: doc.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        border: "1.5px solid rgba(201,183,156,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="60" height="70" viewBox="0 0 60 70" fill="none">
                        <ellipse cx="30" cy="25" rx="16" ry="18" fill="rgba(255,255,255,0.25)" />
                        <path d="M8 65 C8 48 52 48 52 65" fill="rgba(255,255,255,0.2)" />
                      </svg>
                    </div>
                    <span
                      style={{
                        position: "absolute",
                        bottom: "24px",
                        left: "24px",
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.55)",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                      }}
                    >
                      {doc.role}
                    </span>
                  </div>

                  {/* Info */}
                  <div style={{ padding: "36px" }}>
                    <div
                      style={{
                        fontSize: "11px",
                        letterSpacing: "2.5px",
                        textTransform: "uppercase",
                        color: "#C9B79C",
                        marginBottom: "6px",
                      }}
                    >
                      {doc.role}
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "26px",
                        fontWeight: 400,
                        marginBottom: "6px",
                      }}
                    >
                      {doc.name}
                    </h3>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#A0A0A0",
                        letterSpacing: "1px",
                        marginBottom: "20px",
                      }}
                    >
                      {doc.cred}
                    </div>
                    <p style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: 1.9, marginBottom: "24px", whiteSpace: "pre-wrap" }}>
                      {doc.bio}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                      {doc.specs.map((s) => (
                        <span
                          key={s}
                          style={{
                            fontSize: "11px",
                            letterSpacing: "1.5px",
                            textTransform: "uppercase",
                            padding: "6px 14px",
                            border: "1px solid #E2DADA",
                            color: "#6B6B6B",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontStyle: "italic",
                        fontSize: "15px",
                        color: "#6B7C5B",
                        paddingTop: "16px",
                        borderTop: "1px solid #E2DADA",
                        lineHeight: 1.7,
                      }}
                    >
                      &ldquo;{doc.quote}&rdquo;
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <div
        style={{
          background: "#6B7C5B",
          padding: "100px 60px",
          textAlign: "center",
        }}
      >
        <Reveal>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(22px, 3vw, 34px)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "white",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            &ldquo;The body has been speaking to you all along. Ayurveda teaches you to finally listen.&rdquo;
          </p>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              marginTop: "32px",
            }}
          >
            Dr. Sreejith Kumar · Founder, Absolute Ayurveda
          </div>
        </Reveal>
      </div>
    </>
  );
}
