import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/search?q=", "/mail"],
    },
    sitemap: ["https://manuelenolli.ch/sitemap.xml"]
  };
}