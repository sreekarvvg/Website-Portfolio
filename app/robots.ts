import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Open to search engines — the point of the link is to be found. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
