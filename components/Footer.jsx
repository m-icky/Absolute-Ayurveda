"use client";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Our Healers", href: "#doctors" },
  { label: "Facilities", href: "#facilities" },
  { label: "Courses", href: "#courses" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "#1A1A1A",
        color: "rgba(255,255,255,0.4)",
        padding: "30px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src="/absoluteayur.png" alt="Absolute Ayurveda" style={{ height: "150px", width: "auto", opacity: 0.8 }} />
      </div>

      <div style={{ width: "60px", height: "1px", background: "rgba(201,183,156,0.3)" }} />

      <ul style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "36px", listStyle: "none" }}>
        {footerLinks.map((l) => (
          <li key={l.href}>
            <button
              onClick={() => scrollTo(l.href)}
              style={{
                fontSize: "14px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "color 0.3s",
                fontFamily: "'Lato', sans-serif",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#C9B79C")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.35)")}
            >
              {l.label}
            </button>
          </li>
        ))}
      </ul>

      <p style={{ fontSize: "12px", letterSpacing: "0.5px" }}>
        © {new Date().getFullYear()} Absolute Ayurveda. Healing Since 2008.
      </p>
      <div style={{ display: "flex"}}>
        <a href="mailto:naveentmadhu@gmail.com" style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", fontFamily: "'Lato', sans-serif", textDecoration: "none" }}>Designed by Mack's.Studio</a>
      </div>
    </footer>
  );
}
