"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import Doctor1 from "../assets/soumya-1.png"
import Doctor2 from "../assets/sreejith-1.png"

const doctors = [
  {
    name: "Dr. Soumya Sagar",
    img: Doctor1,
    role: "Founder | Ayurvedic Physician & Women’s Wellness Specialist",
    cred: "BAMS · Diploma in Cosmetology · 20+ Years of Experience",
    bio: "Dr. Soumya Sagar is a passionate Ayurvedic physician dedicated to women’s wellness and holistic health. With over two decades of clinical experience, she blends the timeless wisdom of Ayurveda with modern insights in cosmetology and lifestyle care.\n\nHer healing philosophy is rooted in empowering women to embrace every stage of life with balance and grace—from adolescence to pregnancy to menopause. She offers guidance in skincare, anti-aging, hormonal health, and stress-related disorders with compassion and authenticity.\n\nDr. Soumya is also an innovator, developing her own range of organic Ayurvedic products rooted in purity and sustainability. As a mentor, she shares her knowledge through training future therapists and offering free Panchakarma courses each year, reflecting her deep commitment to community wellness.",
    specs: ["Women’s health & hormonal balance", "Ayurvedic cosmetology & skincare", "Stress-related disorders in women", "Panchakarma & rejuvenation therapies"],
    quote: "Ayurveda is not just a science; it’s a way of life. My mission is to help people reconnect with their natural rhythms and unlock their own healing power.",
  },
  {
    name: "Dr. Sreejith Kumar",
    img: Doctor2,
    role: "Founder | Ayurvedic Physician & Self-Healing Mentor",
    cred: "BAMS · Ayurveda Teacher · International Practitioner",
    bio: "Dr. Sreejith Kumar is an Ayurvedic physician and healer with extensive experience in both India and Europe. Since founding Absolute Ayurveda in 2008, he has dedicated his life to practicing authentic Ayurveda, researching tribal medicine, and teaching the art of massage, yoga, and traditional healing.\n\nHaving worked across Holland, Poland, and Switzerland, Dr. Sreejith combines deep Ayurvedic knowledge with a global perspective. His approach emphasizes self-healing—removing blockages, transforming negative energy, and guiding individuals toward higher frequency living.\n\nHe has also prepared traditional Ayurvedic oils and medicines for his clinic, taught Ayurveda theory and practicals, and integrated yoga into healing journeys. Beyond clinical care, he is a mentor and inspirator, helping people find inner strength, clarity, and confidence.",
    specs: ["Traditional treatments & therapies", "Self-healing through yoga & meditation", "Tribal medicine research", "Massage & lifestyle guidance"],
    quote: "Respect yourself, remove your blockages, and transform your energy—healing begins from within.",
  },
];

const otherDoctors = [
  {
    name: "Dr. Ananya Sharma",
    role: "Senior Ayurvedic Physician",
    spec: "Internal Medicine & Wellness",
    desc: "Specializes in treating chronic metabolic disorders through traditional Ayurvedic principles.",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Dr. Rajesh Verma",
    role: "Panchakarma Specialist",
    spec: "Detoxification & Rejuvenation",
    desc: "Profound knowledge of Panchakarma therapies, focusing on holistic body purification.",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Dr. Kavita Menon",
    role: "Pediatric Consultant",
    spec: "Child Immunity & Nutrition",
    desc: "Dedicated to nurturing children's health naturally, focusing on immunity and balanced growth.",
    img: "https://images.unsplash.com/photo-1594824416186-b489d81d2fcd?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Dr. Vikram Singh",
    role: "Orthopedic Specialist",
    spec: "Joint & Spine Care",
    desc: "Provides non-surgical Ayurvedic solutions for joint pain, arthritis, and spine disorders.",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
  }
];

export default function Doctors() {
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -372 : 372;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .specialists-carousel::-webkit-scrollbar {
          display: none;
        }
      `}} />
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
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "25px",
                      }}
                    >
                      <img src={doc.img?.src || doc.img} alt={doc.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: "0 36px 36px 36px" }}>
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

          {/* Our Specialists Carousel Section */}
          <div style={{ marginTop: "80px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: "50px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", color: "#333", marginBottom: "16px" }}>
                  Our Specialists
                </h3>
                <p style={{ color: "#6B6B6B", fontSize: "16px", maxWidth: "600px", margin: "0 auto", lineHeight: 1.8 }}>
                  Our team of dedicated experts bringing specialized care and authentic Ayurvedic healing to your wellness journey.
                </p>
              </div>
            </Reveal>

            {/* Carousel Container */}
            <div style={{ position: "relative" }}>
              {/* Left Button */}
              <button
                onClick={() => scrollCarousel("left")}
                style={{
                  position: "absolute",
                  left: "-20px",
                  top: "45%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  background: "white",
                  border: "1px solid #E2DADA",
                  borderRadius: "50%",
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  color: "#6B7C5B",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div
                ref={carouselRef}
                className="specialists-carousel"
                style={{
                  display: "flex",
                  gap: "32px",
                  overflowX: "auto",
                  paddingBottom: "40px",
                  scrollSnapType: "x mandatory",
                  scrollbarWidth: "none", // for Firefox
                  msOverflowStyle: "none", // for IE
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {otherDoctors.map((doc, i) => (
                  <Reveal key={doc.name} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ y: -12, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      style={{
                        minWidth: "340px",
                        maxWidth: "340px",
                        background: "white",
                        borderRadius: "16px",
                        overflow: "hidden",
                        scrollSnapAlign: "start",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                        flexShrink: 0,
                        cursor: "grab",
                      }}
                    >
                      <div style={{ height: "260px", overflow: "hidden", position: "relative" }}>
                        <motion.img
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          src={doc.img?.src || doc.img}
                          alt={doc.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div style={{ padding: "32px" }}>
                        <div style={{ fontSize: "11px", color: "#C9B79C", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px" }}>
                          {doc.role}
                        </div>
                        <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", marginBottom: "8px", color: "#222" }}>
                          {doc.name}
                        </h4>
                        <div style={{ fontSize: "13px", fontWeight: "600", color: "#6B7C5B", marginBottom: "20px", letterSpacing: "0.5px" }}>
                          {doc.spec}
                        </div>
                        <p style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: 1.7, marginBottom: 0 }}>
                          {doc.desc}
                        </p>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>

              {/* Right Button */}
              <button
                onClick={() => scrollCarousel("right")}
                style={{
                  position: "absolute",
                  right: "-20px",
                  top: "45%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  background: "white",
                  border: "1px solid #E2DADA",
                  borderRadius: "50%",
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  color: "#6B7C5B",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
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
