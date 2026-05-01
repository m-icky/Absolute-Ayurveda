import { packagesData } from "../data";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const pkg = packagesData.find((p) => p.slug === slug);

  if (!pkg) {
    return {
      title: "Package Not Found",
    };
  }

  return {
    title: pkg.title,
    description: pkg.description,
    alternates: {
      canonical: `/packages/${slug}`,
    },
    openGraph: {
      title: `${pkg.title} | Ayurveda Package`,
      description: pkg.description,
      url: `https://absoluteayur.com/packages/${slug}`,
      images: [
        {
          url: pkg.image,
          width: 800,
          height: 600,
          alt: pkg.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pkg.title,
      description: pkg.description,
      images: [pkg.image],
    },
  };
}

export default function PackageDetailLayout({ children }) {
  return <>{children}</>;
}
