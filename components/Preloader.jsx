"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#F8F6F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Moving Background Elements */}
          <motion.div
            animate={{
              x: ["-20%", "20%", "-20%"],
              y: ["-20%", "20%", "-20%"],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              top: "-10%",
              left: "-10%",
              width: "50vw",
              height: "50vw",
              background: "radial-gradient(circle, rgba(107,124,91,0.08) 0%, rgba(248,246,240,0) 70%)",
              borderRadius: "50%",
            }}
          />
          <motion.div
            animate={{
              x: ["20%", "-20%", "20%"],
              y: ["20%", "-20%", "20%"],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              bottom: "-10%",
              right: "-10%",
              width: "60vw",
              height: "60vw",
              background: "radial-gradient(circle, rgba(201,183,156,0.12) 0%, rgba(248,246,240,0) 70%)",
              borderRadius: "50%",
            }}
          />

          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ zIndex: 10, position: "relative", textAlign: "center" }}
          >
            <motion.img
              src="/absoluteayur.png"
              alt="Absolute Ayurveda Logo Loader"
              animate={{ 
                scale: [1, 1.05, 1],
                filter: ["drop-shadow(0px 0px 0px rgba(107,124,91,0))", "drop-shadow(0px 0px 20px rgba(107,124,91,0.2))", "drop-shadow(0px 0px 0px rgba(107,124,91,0))"]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                height: "120px",
                width: "auto",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
