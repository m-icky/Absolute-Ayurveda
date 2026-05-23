"use client";
import { useState } from "react";
import Reveal from "./Reveal"; // Ensure this import path is correct for your project

const contactDetails = [
  { label: "Location", value: "Temple Road (padinjarae nada)\nVarkala, 695141\nKerala, India" },
  {
    label: "Available For",
    value: "Outpatient Consultations\nHealing Retreats\nAyurveda School Enrollment",
  },
  { label: "Healing Hours", value: "Monday – Saturday\n8:00 AM – 6:00 PM" },
];

const API_BASE_URL = "http://localhost:8000/api/consultations/";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (field, value) => {
    let error = "";
    if (field === "name") {
      if (!value.trim()) {
        error = "Name is required.";
      } else if (value.trim().length < 2) {
        error = "Name must be at least 2 characters.";
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        error = "Name can only contain letters and spaces.";
      }
    } else if (field === "email") {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Please enter a valid email address.";
      }
    } else if (field === "phone") {
      if (!value.trim()) {
        error = "Phone number is required.";
      } else if (!/^\+?[0-9\s\-()]{10,20}$/.test(value)) {
        error = "Please enter a valid phone number (at least 10 digits).";
      }
    } else if (field === "message") {
      if (value && value.length > 1000) {
        error = "Message cannot exceed 1000 characters.";
      }
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  const handleBlur = (field) => {
    validate(field, form[field]);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields first
    const nameErr = validate("name", form.name);
    const emailErr = validate("email", form.email);
    const phoneErr = validate("phone", form.phone);
    const msgErr = validate("message", form.message);

    if (nameErr || emailErr || phoneErr || msgErr) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please check your details and try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Unable to connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" style={{ background: "#F8F6F0", padding: "120px 60px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "100px", alignItems: "start" }} className="contact-grid">
          
          {/* Info Section */}
          <div>
            <Reveal><span className="section-tag">Reach Us</span></Reveal>
            <Reveal delay={0.1}>
              <h2 className="section-title">Your Journey of Healing<br />Begins <em>Here</em></h2>
            </Reveal>
            <Reveal delay={0.2}><div className="divider" /></Reveal>
            <Reveal delay={0.25}>
              <p style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: 1.9, marginBottom: "48px" }}>
                Whether you seek healing for the body, clarity for the mind, or peace for the spirit—our doors are open.
              </p>
            </Reveal>
            {contactDetails.map((d, i) => (
              <Reveal key={d.label} delay={0.1 * (i + 3)}>
                <div style={{ marginBottom: "40px" }}>
                  <span style={{ display: "block", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#A0A0A0", marginBottom: "8px" }}>
                    {d.label}
                  </span>
                  <span style={{ fontSize: "17px", color: "#1A1A1A", lineHeight: 1.6, whiteSpace: "pre-line", display: "block" }}>
                    {d.value}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Form Section */}
          <Reveal delay={0.15}>
            <div style={{ background: "white", padding: "56px" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 400, marginBottom: "36px", color: "#1A1A1A" }}>
                Book a Consultation
              </h3>

              {submitted ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "#6B7C5B", marginBottom: "16px" }}>Thank you</div>
                  <p style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: 1.9 }}>Your message has been received. We will be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {[
                    { label: "Your Name", key: "name", type: "text", placeholder: "Full name", required: true },
                    { label: "Email Address", key: "email", type: "email", placeholder: "your@email.com", required: false },
                    { label: "Phone Number", key: "phone", type: "tel", placeholder: "+91 00000 00000", required: true },
                  ].map((f) => (
                    <div key={f.key} style={{ marginBottom: "28px" }}>
                      <label style={{ display: "block", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: "#A0A0A0", marginBottom: "10px" }}>{f.label}</label>
                      <input
                        required={f.required}
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.key]}
                        onChange={(e) => handleChange(f.key, e.target.value)}
                        style={{ width: "100%", border: "none", borderBottom: errors[f.key] ? "1px solid #C84B31" : "1px solid #E2DADA", background: "transparent", padding: "10px 0", fontFamily: "'Lato', sans-serif", fontSize: "15px", fontWeight: 300, color: "#1A1A1A", outline: "none" }}
                        onFocus={(e) => (e.target.style.borderBottomColor = "#6B7C5B")}
                        onBlur={(e) => {
                          const error = validate(f.key, form[f.key]);
                          e.target.style.borderBottomColor = error ? "#C84B31" : "#E2DADA";
                        }}
                      />
                      {errors[f.key] && (
                        <span style={{ display: "block", fontSize: "11px", color: "#C84B31", marginTop: "6px", fontFamily: "'Lato', sans-serif", fontWeight: 400, letterSpacing: "0.5px" }}>
                          {errors[f.key]}
                        </span>
                      )}
                    </div>
                  ))}
                  <div style={{ marginBottom: "28px" }}>
                    <label style={{ display: "block", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: "#A0A0A0", marginBottom: "10px" }}>Your Message</label>
                    <textarea
                      placeholder="Tell us about your healing intentions..."
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      rows={4}
                      style={{ width: "100%", border: "none", borderBottom: errors.message ? "1px solid #C84B31" : "1px solid #E2DADA", background: "transparent", padding: "10px 0", fontFamily: "'Lato', sans-serif", fontSize: "15px", fontWeight: 300, color: "#1A1A1A", outline: "none", resize: "none" }}
                      onFocus={(e) => (e.target.style.borderBottomColor = "#6B7C5B")}
                      onBlur={(e) => {
                        const error = validate("message", form.message);
                        e.target.style.borderBottomColor = error ? "#C84B31" : "#E2DADA";
                      }}
                    />
                    {errors.message && (
                      <span style={{ display: "block", fontSize: "11px", color: "#C84B31", marginTop: "6px", fontFamily: "'Lato', sans-serif", fontWeight: 400, letterSpacing: "0.5px" }}>
                        {errors.message}
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{ width: "100%", padding: "18px", background: isSubmitting ? "#8a967c" : "#6B7C5B", color: "white", border: "none", fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", cursor: isSubmitting ? "not-allowed" : "pointer", transition: "background 0.4s", marginTop: "8px" }}
                    onMouseEnter={(e) => (!isSubmitting && (e.target.style.background = "#4a5740"))}
                    onMouseLeave={(e) => (!isSubmitting && (e.target.style.background = "#6B7C5B"))}
                  >
                    {isSubmitting ? "Sending..." : "Begin the Conversation"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}