import Link from "next/link";
import NotFoundIllustration from "../components/NotFoundIllustration";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Page Not Found | Absolute Ayurveda",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 20px 40px", // Padding for fixed navbar
          textAlign: "center",
          backgroundColor: "#FAF9F6", // Matching the clean background
        }}
      >
        <div style={{ maxWidth: "600px", width: "100%" }}>
          <NotFoundIllustration />
        </div>
        
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            color: "#6B7C5B",
            marginTop: "20px",
            marginBottom: "16px",
          }}
        >
          Oops! Page Not Found
        </h1>
        
        <p
          style={{
            fontSize: "16px",
            fontWeight: 300,
            opacity: 0.8,
            maxWidth: "500px",
            margin: "0 auto 40px",
            lineHeight: 1.8,
            color: "#4A4A4A",
          }}
        >
          The link you followed may be broken, or the page may have been removed. 
          Let's get you back on your path to wellness.
        </p>

        <style>{`
          .not-found-btn:hover {
            background-color: #B8A58A !important;
          }
        `}</style>
        <Link
          href="/"
          className="not-found-btn"
          style={{
            display: "inline-block",
            fontSize: "12px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            padding: "16px 44px",
            border: "1px solid rgba(201,183,156,0.7)",
            color: "#FAF9F6",
            backgroundColor: "#C9B79C",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontFamily: "'Lato', sans-serif",
            textDecoration: "none",
          }}
        >
          Return Home
        </Link>
      </main>
      <Footer />
    </>
  );
}
