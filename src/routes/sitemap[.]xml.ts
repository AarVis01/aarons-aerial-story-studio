import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const { publicDb } = await import("@/lib/public-db.server");
        const db = publicDb();
        const [{ data: services }, { data: projects }] = await Promise.all([
          db.from("services").select("slug,updated_at").eq("published", true),
          db.from("projects").select("slug,updated_at").eq("status", "published"),
        ]);
        const urls = [
          "/", "/services", "/portfolio", "/about", "/contact", "/privacy",
          ...(services ?? []).map((s) => `/services/${s.slug}`),
          ...(projects ?? []).map((p) => `/portfolio/${p.slug}`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
          .map((u) => `  <url><loc>${origin}${u}</loc></url>`)
          .join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=600" } });
      },
    },
  },
});
