import { absoluteImage } from "./media";

/* eslint-disable @typescript-eslint/no-explicit-any */
/** Builds route head() metadata from CMS SEO fields with safe fallbacks. */
export function seoHead(seo: any, fallbackTitle: string, fallbackDesc: string, image?: string | null, type = "website") {
  const title = seo?.title || fallbackTitle;
  const desc = seo?.description || fallbackDesc;
  const img = absoluteImage(seo?.ogImage || image);
  return {
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: type },
      { name: "twitter:card", content: "summary_large_image" },
      ...(img ? [{ property: "og:image", content: img }, { name: "twitter:image", content: img }] : []),
    ],
  };
}
