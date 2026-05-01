import "../styles/globals.css";
import Preloader from "../components/Preloader";
import FloatingButtons from "../components/FloatingButtons";

export const metadata = {
  metadataBase: new URL("https://absoluteayur.com"),
  title: {
    default: "Ayurveda Healing & Lifestyle Clinic | Natural Wellness Since 2008",
    template: "%s | Absolute Ayurveda"
  },
  description:
    "Discover holistic healing with Ayurveda. Since 2008, our clinic has guided people to balance body, mind, and spirit through natural treatments, meditation, yoga, and lifestyle care.",
  keywords: ["Ayurveda", "Wellness", "Natural Healing", "Detox", "Panchakarma", "Holistic Health", "Yoga", "Meditation"],
  authors: [{ name: "Absolute Ayurveda" }],
  creator: "Absolute Ayurveda",
  publisher: "Absolute Ayurveda",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ayurveda Healing & Lifestyle Clinic | Natural Wellness Since 2008",
    description: "Discover holistic healing with Ayurveda. Since 2008, our clinic has guided people to balance body, mind, and spirit through natural treatments, meditation, yoga, and lifestyle care.",
    url: "https://absoluteayur.com",
    siteName: "Absolute Ayurveda",
    images: [
      {
        url: "/absoluteayur.png",
        width: 800,
        height: 600,
        alt: "Absolute Ayurveda Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayurveda Healing & Lifestyle Clinic | Natural Wellness Since 2008",
    description: "Discover holistic healing with Ayurveda. Since 2008, our clinic has guided people to balance body, mind, and spirit through natural treatments, meditation, yoga, and lifestyle care.",
    images: ["/absoluteayur.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/absoluteayur.png",
    shortcut: "/absoluteayur.png",
    apple: "/absoluteayur.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Preloader />
        <FloatingButtons />
        {children}
      </body>
    </html>
  );
}
