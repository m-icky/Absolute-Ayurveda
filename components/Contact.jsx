"use client";
import { useState } from "react";
import Reveal from "./Reveal";

const contactDetails = [
  { label: "Location", value: "Kerala, India" },
  {
    label: "Available For",
    value: "Outpatient Consultations\nHealing Retreats\nAyurveda School Enrollment",
  },
  { label: "Healing Hours", value: "Monday – Saturday\n8:00 AM – 6:00 PM" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      style={{ background: "#F8F6F0", padding: "120px 60px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "100px",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Info */}
          <div>
            <Reveal>
              <span className="section-tag">Reach Us</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="section-title">
                Your Journey of Healing<br />Begins <em>Here</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="divider" />
            </Reveal>
            <Reveal delay={0.25}>
              <p style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: 1.9, marginBottom: "48px" }}>
                Whether you seek healing for the body, clarity for the mind, or
                peace for the spirit—our doors are open. Visit us for a
                consultation, join a healing retreat, or enroll in our Ayurveda
                school.
              </p>
            </Reveal>
            {contactDetails.map((d, i) => (
              <Reveal key={d.label} delay={0.1 * (i + 3)}>
                <div style={{ marginBottom: "40px" }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: "10px",
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      color: "#A0A0A0",
                      marginBottom: "8px",
                    }}
                  >
                    {d.label}
                  </span>
                  <span
                    style={{
                      fontSize: "17px",
                      color: "#1A1A1A",
                      lineHeight: 1.6,
                      whiteSpace: "pre-line",
                      display: "block",
                    }}
                  >
                    {d.value}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Form */}
          <Reveal delay={0.15}>
            <div style={{ background: "white", padding: "56px" }}>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "24px",
                  fontWeight: 400,
                  marginBottom: "36px",
                  color: "#1A1A1A",
                }}
              >
                Book a Consultation
              </h3>

              {submitted ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "22px",
                      color: "#6B7C5B",
                      marginBottom: "16px",
                    }}
                  >
                    Thank you
                  </div>
                  <p style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: 1.9 }}>
                    Your message has been received. We will be in touch with you
                    shortly to begin your healing journey.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {[
                    { label: "Your Name", key: "name", type: "text", placeholder: "Full name" },
                    { label: "Email Address", key: "email", type: "email", placeholder: "your@email.com" },
                    { label: "Phone Number", key: "phone", type: "tel", placeholder: "+91 00000 00000" },
                  ].map((f) => (
                    <div key={f.key} style={{ marginBottom: "28px" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "10px",
                          letterSpacing: "2.5px",
                          textTransform: "uppercase",
                          color: "#A0A0A0",
                          marginBottom: "10px",
                        }}
                      >
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.key]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        style={{
                          width: "100%",
                          border: "none",
                          borderBottom: "1px solid #E2DADA",
                          background: "transparent",
                          padding: "10px 0",
                          fontFamily: "'Lato', sans-serif",
                          fontSize: "15px",
                          fontWeight: 300,
                          color: "#1A1A1A",
                          outline: "none",
                        }}
                        onFocus={(e) => (e.target.style.borderBottomColor = "#6B7C5B")}
                        onBlur={(e) => (e.target.style.borderBottomColor = "#E2DADA")}
                      />
                    </div>
                  ))}
                  <div style={{ marginBottom: "28px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "10px",
                        letterSpacing: "2.5px",
                        textTransform: "uppercase",
                        color: "#A0A0A0",
                        marginBottom: "10px",
                      }}
                    >
                      Your Message
                    </label>
                    <textarea
                      placeholder="Tell us about your healing intentions..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      style={{
                        width: "100%",
                        border: "none",
                        borderBottom: "1px solid #E2DADA",
                        background: "transparent",
                        padding: "10px 0",
                        fontFamily: "'Lato', sans-serif",
                        fontSize: "15px",
                        fontWeight: 300,
                        color: "#1A1A1A",
                        outline: "none",
                        resize: "none",
                      }}
                      onFocus={(e) => (e.target.style.borderBottomColor = "#6B7C5B")}
                      onBlur={(e) => (e.target.style.borderBottomColor = "#E2DADA")}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "18px",
                      background: "#6B7C5B",
                      color: "white",
                      border: "none",
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "11px",
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "background 0.4s",
                      marginTop: "8px",
                    }}
                    onMouseEnter={(e) => (e.target.style.background = "#4a5740")}
                    onMouseLeave={(e) => (e.target.style.background = "#6B7C5B")}
                  >
                    Begin the Conversation
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
