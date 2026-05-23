"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const API_BASE_URL = "http://localhost:8000/api/gallery/";

// Curated aspect ratios for that elegant, varied masonry grid
const premiumAspectRatios = ["3/4", "8/6", "6/7", "1/1", "4/3", "1/1"];

export default function Team() {
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        if (response.ok) {
          const data = await response.json();
          setGalleryPhotos(data);
        }
      } catch (error) {
        console.error("Failed to fetch gallery images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

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

        {/* Loading State */}
        {isLoading && (
          <div style={{ textAlign: "center", color: "#6B6B6B", padding: "40px" }}>
            Loading gallery...
          </div>
        )}

        {/* Empty State */}
        {!isLoading && galleryPhotos.length === 0 && (
          <div style={{ textAlign: "center", color: "#6B6B6B", padding: "40px" }}>
            No images have been uploaded yet.
          </div>
        )}

        {/* Dynamic Gallery Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {galleryPhotos.map((photo, i) => {
            // Cycle through the predefined premium aspect ratios to maintain the design
            const displayAspect = premiumAspectRatios[i % premiumAspectRatios.length];
            
            // Handle Django's relative image paths
            const imageUrl = photo.image?.startsWith('http') 
              ? photo.image 
              : `http://localhost:8000${photo.image}`;

            return (
              <Reveal key={photo.id} delay={minDelay(i)}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    width: "100%",
                    aspectRatio: displayAspect,
                    borderRadius: "2px",
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                    cursor: "pointer",
                    
                    // NEW: Turns the box into a white "Museum Frame"
                    backgroundColor: "#FFFFFF", 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "16px" // Adds breathing room around the uncropped image
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={photo.title || `Gallery photo ${photo.id}`}
                  />

                  {/* Dynamic overlay on hover pulling from Django backend */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,0.6)", // Darkened slightly for better text contrast
                      display: "flex",
                      alignItems: "center", // Centered the text inside the frame
                      justifyContent: "center",
                      textAlign: "center",
                      padding: "24px",
                      zIndex: 2
                    }}
                  >
                    <div style={{ color: "white" }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px" }}>
                        {photo.title}
                      </div>
                      {photo.description && (
                        <div style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", marginTop: "4px", opacity: 0.9 }}>
                          {photo.description}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Helper to stagger delays across rows roughly
function minDelay(index) {
  return (index % 4) * 0.1;
}