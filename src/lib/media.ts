/** Helpers for rendering stored media and hosted video links. */

export function isVideoFile(url?: string | null) {
  return !!url && /\.(mp4|webm|mov|m4v)(\?|$)/i.test(url);
}

/** Convert YouTube / Vimeo / Instagram links into embeddable URLs. Returns null if not an embed. */
export function toEmbedUrl(url?: string | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = u.searchParams.get("v") ?? u.pathname.split("/shorts/")[1]?.split("/")[0];
      return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` : null;
    }
    if (host === "youtu.be") return `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}?autoplay=1&rel=0`;
    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}?autoplay=1` : null;
    }
    if (host === "instagram.com") {
      const m = u.pathname.match(/\/(reel|p|tv)\/([^/]+)/);
      return m ? `https://www.instagram.com/${m[1]}/${m[2]}/embed` : null;
    }
  } catch {
    return null;
  }
  return null;
}

export function isExternal(href?: string | null) {
  return !!href && /^https?:\/\//.test(href);
}

export function absoluteImage(url?: string | null): string | null {
  return url && /^https:\/\//.test(url) ? url : null;
}
