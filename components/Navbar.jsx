"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Healers", href: "#doctors" },
  { label: "Facilities", href: "#facilities" },
  { label: "Courses", href: "#courses" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: scrolled ? "5px 60px" : "10px 60px",
          background: scrolled ? "rgba(255,255,255,0.75)" : "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.5)" : "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
          transition: "all 0.5s ease",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src="/absoluteayur.png" alt="Absolute Ayurveda" style={{ height: "60px", width: "auto" }} />
        </div>

        {/* Desktop Links */}
        <ul
          style={{
            listStyle: "none",
          }}
          className="hidden md:flex gap-10"
        >
          {links.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => scrollTo(l.href)}
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: scrolled ? "#6B6B6B" : "rgba(255,255,255,0.85)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.3s",
                  padding: "0",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = scrolled ? "#6B7C5B" : "white")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = scrolled
                    ? "#6B6B6B"
                    : "rgba(255,255,255,0.85)")
                }
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Book Button */}
        <button
          onClick={() => scrollTo("#contact")}
          className="hidden md:block"
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "10px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            padding: "10px 24px",
            border: `1px solid ${scrolled ? "#C9B79C" : "rgba(255,255,255,0.6)"}`,
            color: scrolled ? "#1A1A1A" : "white",
            background: "transparent",
            cursor: "pointer",
            transition: "all 0.4s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#C9B79C";
            e.target.style.borderColor = "#C9B79C";
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.borderColor = scrolled
              ? "#C9B79C"
              : "rgba(255,255,255,0.6)";
            e.target.style.color = scrolled ? "#1A1A1A" : "white";
          }}
        >
          Book a Consultation
        </button>

        {/* Burger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden flex flex-col gap-[5px] cursor-pointer p-1 bg-transparent border-none"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: "22px",
                height: "1px",
                background: scrolled ? "#1A1A1A" : "white",
                display: "block",
                transition: "all 0.3s",
              }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(26, 26, 26, 0.75)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              zIndex: 999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "32px",
            }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: "absolute",
                top: "28px",
                right: "28px",
                fontSize: "28px",
                color: "rgba(255,255,255,0.5)",
                background: "none",
                border: "none",
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ✕
            </button>
            {links.map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.1 }}
                onClick={() => scrollTo(l.href)}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "28px",
                  fontWeight: 400,
                  color: "white",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "1px",
                }}
              >
                {l.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.07 + 0.1 }}
              onClick={() => scrollTo("#contact")}
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                padding: "14px 32px",
                border: "1px solid #C9B79C",
                color: "white",
                background: "transparent",
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              Book a Consultation
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
