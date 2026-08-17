import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** One continuous page, so one entry. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
