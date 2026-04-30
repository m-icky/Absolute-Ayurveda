"use client";
import { useRouter, usePathname } from "next/navigation";
import { MdCall } from "react-icons/md";
import { MdEmail } from "react-icons/md";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Our Healers", href: "#doctors" },
  { label: "Facilities", href: "#facilities" },
  { label: "Courses", href: "/course" },
  { label: "Packages", href: "/packages" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (href) => {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/${href}`);
      }
    } else {
      router.push(href);
    }
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
        className="cursor-pointer"
        onClick={() => router.push("/")}
      >
        <img src="/absoluteayur.png" alt="Absolute Ayurveda" style={{ height: "150px", width: "auto", opacity: 0.8 }} />
      </div>

      <div style={{ width: "60px", height: "1px", background: "rgba(201,183,156,0.3)" }} />

      <ul style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "36px", listStyle: "none" }}>
        {footerLinks.map((l) => (
          <li key={l.href}>
            <button
              onClick={() => handleNavigation(l.href)}
              style={{
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontFamily: "'Lato', sans-serif",
              }}
              className="cursor-pointer hover:text-[#C9B79C] transition-all duration-300 ease-in-out"
            >
              {l.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-12 my-6 px-4">
        <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left font-['Lato'] text-[14px]">
          <h4 className="text-[#C9B79C] text-sm uppercase tracking-[2px] mb-1">Contact Us</h4>
          <p className="max-w-[250px] leading-relaxed">Temple Road (padinjarae nada),<br />Varkala, Kerala 695141</p>
          <div className="flex items-center gap-3">
            <MdEmail />
            <a href="mailto:absoayur@gmail.com" className="hover:text-[#C9B79C] transition-colors">absoayur@gmail.com</a>
          </div>
          <span className="leading-relaxed flex flex-col">
            <p className="flex items-center gap-3">
              <MdCall />
              <a href="tel:+919995267659" className="hover:text-[#C9B79C] transition-colors">+91 9995267659</a>
            </p>
            <p className="flex items-center gap-3">
              <MdCall />
              <a href="tel:+919447069435" className="hover:text-[#C9B79C] transition-colors">+91 9447069435</a>
            </p>
          </span>
        </div>

        <div className="w-full max-w-[400px] h-[200px] rounded-sm overflow-hidden border border-[rgba(201,183,156,0.1)] opacity-80 hover:opacity-100 transition-opacity duration-300">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15774.304963360437!2d76.716858!3d8.731726!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05eed8780c5c9f%3A0xa1c33a76c4b4cbb7!2sTemple%20Rd%2C%20Varkala%2C%20Kerala%20695141%2C%20India!5e0!3m2!1sen!2sus!4v1777549838679!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{border:0}} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: "800px", height: "1px", background: "rgba(201,183,156,0.1)", marginBottom: "10px" }} />

      <p style={{ fontSize: "12px", letterSpacing: "0.5px" }}>
        © {new Date().getFullYear()} Absolute Ayurveda. Healing Since 2008.
      </p>
      <div style={{ display: "flex"}}>
        <a href="https://www.cyberprism.in/" style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", fontFamily: "'Lato', sans-serif", textDecoration: "none" }}>Designed & Developed by <span style={{color: "#90ff7cff"}}>Cyber Prism</span></a>
      </div>
    </footer>
  );
}
