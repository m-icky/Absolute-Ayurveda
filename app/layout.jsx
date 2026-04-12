import "../styles/globals.css";
import Preloader from "../components/Preloader";
import FloatingButtons from "../components/FloatingButtons";

export const metadata = {
  title: "Ayurveda Healing & Lifestyle Clinic | Natural Wellness Since 2008",
  description:
    "Discover holistic healing with Ayurveda. Since 2008, our clinic has guided people to balance body, mind, and spirit through natural treatments, meditation, yoga, and lifestyle care.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <FloatingButtons />
        {children}
      </body>
    </html>
  );
}
