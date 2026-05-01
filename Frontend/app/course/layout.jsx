export const metadata = {
  title: "Ayurveda Courses & Training",
  description: "Join our professional Ayurveda courses and workshops. Learn traditional healing techniques, herbal medicine, and lifestyle management from expert practitioners.",
  alternates: {
    canonical: "/course",
  },
  openGraph: {
    title: "Ayurveda Courses & Training | Absolute Ayurveda",
    description: "Join our professional Ayurveda courses and workshops. Learn traditional healing techniques and lifestyle management.",
    url: "https://absoluteayur.com/course",
    images: [
      {
        url: "/absoluteayur.png",
        width: 800,
        height: 600,
        alt: "Ayurveda Courses",
      },
    ],
  },
};

export default function CourseLayout({ children }) {
  return <>{children}</>;
}
