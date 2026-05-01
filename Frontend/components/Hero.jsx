"use client";
import { motion } from "framer-motion";
import CircularText from "./CircularText";
import HomeBg from "../assets/ayurveda-hero1.png";

export default function Hero() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      style={{
        height: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img 
          src={HomeBg.src || HomeBg} 
          alt="Home Background" 
          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
          className="bg-animate"
        />
      </div>

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 60% 50%, rgba(107,124,91,0.3) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.45) 100%)",
          zIndex: 2,
        }}
      />

      {/* Decorative leaf SVG */}
      {/* <svg
        style={{
          position: "absolute",
          right: "-5%",
          top: "5%",
          width: "45%",
          opacity: 0.1,
          zIndex: 1,
          pointerEvents: "none",
        }}
        viewBox="0 0 500 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M250 20 C350 80 480 200 460 350 C440 480 320 560 250 580 C180 560 60 480 40 350 C20 200 150 80 250 20Z"
          fill="#C9B79C"
        />
        <path d="M250 20 L250 580" stroke="#C9B79C" strokeWidth="1.5" opacity="0.5" />
        <path d="M130 150 Q250 200 370 150" stroke="#C9B79C" strokeWidth="1" opacity="0.4" />
        <path d="M80 250 Q250 320 420 250" stroke="#C9B79C" strokeWidth="1" opacity="0.4" />
        <path d="M90 350 Q250 410 410 350" stroke="#C9B79C" strokeWidth="1" opacity="0.4" />
        <path d="M120 430 Q250 480 380 430" stroke="#C9B79C" strokeWidth="1" opacity="0.35" />
      </svg> */}

      {/* Circular spinning text – top-right */}
      <motion.div
        className="circular-text-wrapper"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        style={{
          position: "absolute",
          top: "100px",
          right: "40px",
          zIndex: 4,
        }}
      >
        <CircularText
          text="Absolute Ayurveda · Est. 2008 · "
          spinDuration={15}
          onHover="slowDown"
        />
      </motion.div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          color: "white",
          padding: "0 20px",
          maxWidth: "900px",
        }}
      >
        <motion.img
          src="/absoluteayur.png"
          alt="Absolute Ayurveda Logo"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: [0, -12, 0],        // up → down
            scale: [1, 1.06, 1]    // pop effect
          }}
          transition={{
            opacity: { duration: 0.6 },   // only for first load
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            },
            scale: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          style={{
            height: "125px",
            width: "auto",
            margin: "25px auto 10px",
            opacity: 0.95
          }}
          className="rounded-lg backdrop-blur-sm border border-white/10"
        />
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          style={{
            display: "block",
            fontSize: "11px",
            letterSpacing: "5px",
            textTransform: "uppercase",
            opacity: 0.65,
            marginBottom: "28px",
            fontWeight: 300,
          }}
        >
          Est. 2008 · Kerala, India
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(44px, 7vw, 88px)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "1px",
            marginBottom: "32px",
          }}
        >
          Healing Beyond
          <br />
          <em style={{ fontStyle: "italic", color: "#E8DCCF" }}>Medicine</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            fontSize: "15px",
            fontWeight: 300,
            opacity: 0.8,
            maxWidth: "600px",
            margin: "0 auto 52px",
            lineHeight: 1.9,
          }}
        >
          At our Ayurveda Clinic, we believe your body has the power to heal itself—naturally. Since 2008, we’ve been helping people restore balance, strengthen immunity, and find peace without antibiotics or harsh treatments.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          onClick={() => scrollTo("#about")}
          style={{
            display: "inline-block",
            fontSize: "10px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            padding: "16px 44px",
            border: "1px solid rgba(201,183,156,0.7)",
            color: "white",
            background: "transparent",
            cursor: "pointer",
            transition: "all 0.5s",
            fontFamily: "'Lato', sans-serif",
          }}
          whileHover={{
            backgroundColor: "#C9B79C",
            borderColor: "#C9B79C",
          }}
        >
          Start your journey of healing today
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          color: "rgba(255,255,255,0.45)",
          fontSize: "9px",
          letterSpacing: "3px",
          textTransform: "uppercase",
        }}
      >
        <span>Scroll</span>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "50px",
            background: "linear-gradient(to bottom, transparent, rgba(201,183,156,0.7))",
            transformOrigin: "top",
          }}
        />
      </motion.div>
    </section>
  );
}
