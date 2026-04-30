export const metadata = {
  title: "Ayurveda Packages",
  description: "Explore our specialized Ayurveda programs including Panchakarma, Rejuvenation, Slimming, and more. Tailored treatments for holistic wellness.",
  alternates: {
    canonical: "/packages",
  },
  openGraph: {
    title: "Ayurveda Packages | Absolute Ayurveda",
    description: "Explore our specialized Ayurveda programs including Panchakarma, Rejuvenation, Slimming, and more.",
    url: "https://absoluteayurveda.com/packages",
    images: [
      {
        url: "/absoluteayur.png",
        width: 800,
        height: 600,
        alt: "Ayurveda Packages",
      },
    ],
  },
};

export default function PackagesLayout({ children }) {
  return <>{children}</>;
}
