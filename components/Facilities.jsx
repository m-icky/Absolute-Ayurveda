"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import Image from "next/image";

import beachHeal1 from "../assets/beach-heal-1.JPG";
import beachHeal2 from "../assets/beach-heal-2.JPG";
import beachHeal3 from "../assets/beach-heal-3.JPG";

import stress1 from "../assets/stress-management-1.JPG";
import stress2 from "../assets/stress-management-2.JPG";
import stress3 from "../assets/stress-management-3.JPG";

import clinic1 from "../assets/ayurveda-clinic-1.JPG";
import clinic2 from "../assets/ayurveda-clinic-2.JPG";
import clinic3 from "../assets/ayurveda-clinic-3.JPG";

const facilities = [
  {
    num: "01",
    sub: "From Trauma to Tranquility – A Place for Deep Healing",
    title: "Beach Healing Property",
    text: "For those carrying trauma, weakness, or emotional pain. A private retreat by the sea, guided by healers, away from chaos—no rigid routines, only peaceful and deeply personalized healing journeys.",
    cta: "Begin Your Healing Escape",
    label: "Beachfront Retreat",
    images: [beachHeal1, beachHeal2, beachHeal3],
  },
  {
    num: "02",
    sub: "Structured Care for Stress Relief and Balance",
    title: "Stress Management Program",
    text: "For those under constant stress. Structured daily routines with Ayurvedic diet, yoga, breathing practices, and lifestyle corrections that systematically rebuild your inner strength and restore calmness.",
    cta: "Reclaim Your Calm",
    label: "Wellness Retreat",
    images: [stress1, stress2, stress3],
  },
  {
    num: "03",
    sub: "Traditional Healing for Every Stage of Life",
    title: "Ayurveda Clinic & Dormitory",
    text: "A welcoming clinic for traditional healing at every stage of life. Both in-patient and out-patient care available, with comfortable, budget-friendly dormitory accommodation for those requiring extended treatment.",
    cta: "Book Your Consultation",
    label: "Traditional Clinic",
    images: [clinic1, clinic2, clinic3],
  },
];

/* ─── Infinite Image Carousel ─── */
function InfiniteCarousel({ images, label }) {
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const rafRef = useRef(null);
  const speed = 1.5; // px per frame

  const animate = useCallback(() => {
    if (!trackRef.current) return;

    posRef.current -= speed;
    const singleSetWidth = trackRef.current.scrollWidth / 3;

    // When we've scrolled past one full set, jump back seamlessly
    if (Math.abs(posRef.current) >= singleSetWidth) {
      posRef.current += singleSetWidth;
    }

    trackRef.current.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
    rafRef.current = requestAnimationFrame(animate);
  }, [speed]);

  useEffect(() => {
    if (!paused) {
      rafRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, animate]);

  // Triple the images array for seamless infinite loop
  const tripled = [...images, ...images, ...images];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          height: "100%",
          willChange: "transform",
        }}
      >
        {tripled.map((img, i) => (
          <div
            key={i}
            style={{
              minWidth: "100%",
              height: "100%",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <Image
              src={img}
              alt={`${label} ${(i % images.length) + 1}`}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              priority={i < images.length}
              loading="eager"
            />
          </div>
        ))}
      </div>

      {/* Label badge */}
      <span
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          fontFamily: "'Playfair Display', serif",
          fontSize: "12px",
          color: "rgba(255,255,255,0.75)",
          letterSpacing: "2px",
          textTransform: "uppercase",
          zIndex: 2,
          background: "rgba(0,0,0,0.25)",
          backdropFilter: "blur(6px)",
          padding: "8px 16px",
          borderRadius: "2px",
        }}
      >
        {label}
      </span>

      {/* Pause indicator */}
      {paused && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 3,
            opacity: 0.6,
            transition: "opacity 0.3s",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="white"
            opacity="0.7"
          >
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        </div>
      )}

      {/* Subtle vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.08) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.08) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </div>
  );
}

function FacilityContent({ fac }) {
  return (
    <div>
      <span
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "64px",
          fontWeight: 400,
          color: "#E8DCCF",
          lineHeight: 1,
          marginBottom: "16px",
          display: "block",
        }}
      >
        {fac.num}
      </span>

      <div
        style={{
          fontSize: "12px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "#6B7C5B",
          marginBottom: "16px",
        }}
      >
        {fac.sub}
      </div>

      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "30px",
          fontWeight: 400,
          marginBottom: "20px",
          lineHeight: 1.3,
        }}
      >
        {fac.title}
      </h3>

      <p
        style={{
          fontSize: "14px",
          color: "#6B6B6B",
          lineHeight: 1.9,
          marginBottom: "32px",
        }}
      >
        {fac.text}
      </p>

      <a href="#contact" className="cta-link">
        {fac.cta}
      </a>
    </div>
  );
}

export default function Facilities() {
  return (
    <section
      id="facilities"
      style={{ background: "white", padding: "120px 60px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <span className="section-tag">Our Sanctuaries</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-title">
            Spaces Designed for <em>Deep Healing</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="divider" />
        </Reveal>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "100px",
            marginTop: "60px",
          }}
        >
          {facilities.map((fac, i) => {
            const isEven = i % 2 === 0; // 0,2,4 → image left | 1,3 → image right

            return (
              <Reveal key={fac.num} delay={0.1}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "80px",
                    alignItems: "center",
                  }}
                  className="facility-row"
                >
                  {/* LEFT SIDE */}
                  {isEven ? (
                    <div
                      style={{
                        overflow: "hidden",
                        aspectRatio: "4/3",
                        borderRadius: "2px",
                      }}
                    >
                      <InfiniteCarousel images={fac.images} label={fac.label} />
                    </div>
                  ) : (
                    <FacilityContent fac={fac} />
                  )}

                  {/* RIGHT SIDE */}
                  {isEven ? (
                    <FacilityContent fac={fac} />
                  ) : (
                    <div
                      style={{
                        overflow: "hidden",
                        aspectRatio: "4/3",
                        borderRadius: "2px",
                      }}
                    >
                      <InfiniteCarousel images={fac.images} label={fac.label} />
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .facility-row {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}