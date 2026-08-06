import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://joaoSilvaDev2.github.io/marmoraria-gran/sitemap.xml",
  };
}
