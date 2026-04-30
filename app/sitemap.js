import { packagesData } from "./packages/data";

export default function sitemap() {
  const baseUrl = "https://absoluteayurveda.com";

  // Base routes
  const routes = ["", "/packages", "/course"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Package routes
  const packageRoutes = packagesData.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...routes, ...packageRoutes];
}
