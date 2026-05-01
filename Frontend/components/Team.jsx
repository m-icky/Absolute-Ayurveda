"use client";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import Image from "next/image";

import Gallery1 from "../assets/Gallery1.JPG";
import Gallery2 from "../assets/Gallery2.JPG";
import Gallery3 from "../assets/Gallery3.JPG";
import Gallery4 from "../assets/Gallery4.JPG";
import Gallery5 from "../assets/Gallery5.JPG";
import Gallery6 from "../assets/Gallery6.JPG";
import Gallery7 from "../assets/Gallery7.JPG";
import Gallery8 from "../assets/Gallery8.JPG";
import Gallery9 from "../assets/Gallery9.JPG";
import Gallery10 from "../assets/Gallery10.JPG";
import Gallery11 from "../assets/Gallery11.JPG";
import Gallery12 from "../assets/stress-management-1.JPG";

const galleryPhotos = [
  { id: 2, src: Gallery2, aspect: "3/4" },
  { id: 1, src: Gallery1, aspect: "8/6" },
  { id: 3, src: Gallery3, aspect: "6/7" },
  { id: 4, src: Gallery4, aspect: "1/1" },
  { id: 5, src: Gallery5, aspect: "3/4" },
  { id: 7, src: Gallery7, aspect: "1/1" },
  { id: 6, src: Gallery6, aspect: "4/3" },
  { id: 8, src: Gallery8, aspect: "3/4" },
  { id: 9, src: Gallery9, aspect: "4/3" },
  { id: 10, src: Gallery10, aspect: "1/1" },
  { id: 11, src: Gallery11, aspect: "3/4" },
  { id: 12, src: Gallery12, aspect: "1/1" },
];

export default function Team() {
  return (
    <section id="team" style={{ background: "#FFFFFF", padding: "120px 60px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <Reveal>
            <span className="section-tag">Our Family</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-title">
              Here's our <em>Gallery &amp; Healing Team</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="divider" style={{ margin: "0 auto" }} />
          </Reveal>
          <Reveal delay={0.3}>
            <p style={{ fontSize: "15px", color: "#6B6B6B", maxWidth: "600px", margin: "32px auto 0", lineHeight: 1.9 }}>
              Meet the compassionate souls behind your transformation. Our dedicated team of therapists, guides, and caretakers are here to walk with you on your journey of healing and self-discovery.
            </p>
          </Reveal>
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {galleryPhotos.map((photo, i) => (
            <Reveal key={photo.id} delay={minDelay(i)}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  width: "100%",
                  aspectRatio: photo.aspect,
                  borderRadius: "2px",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  cursor: "pointer",
                }}
              >
                <Image
                  src={photo.src}
                  alt={`Gallery photo ${photo.id}`}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />

                {/* Example overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.2)",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "24px",
                  }}
                >
                  <div style={{ color: "white" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px" }}>Absolute Ayurveda</div>
                    <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px", opacity: 0.8 }}>Healing Beyond Medicine</div>
                  </div>
                </motion.div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper to stagger delays across rows roughly
function minDelay(index) {
  return (index % 4) * 0.1;
}
