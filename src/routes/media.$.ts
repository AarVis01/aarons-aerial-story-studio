import { createFileRoute } from "@tanstack/react-router";

// Core site images that ship with the site in /public, so they load without storage access.
const PUBLIC_COPIES: Record<string, string> = {
  "brand/logo-mark.png": "/favicon.png",
  "placeholders/hero.jpg": "/house.jpg",
  "placeholders/hero-vision.jpg": "/main.jpg",
  "placeholders/eye.jpg": "/eye.jpg",
  "placeholders/bts.jpg": "/eye.jpg",
  "placeholders/commercial.jpg": "/commercial.jpg",
  "placeholders/auto.jpg": "/car.jpg",
  "placeholders/restaurant.jpg": "/chef.jpg",
  "placeholders/events.jpg": "/events.jpg",
  "placeholders/roof.jpg": "/roof.jpeg",
};

// Serves files from the private media bucket via short-lived signed links.
export const Route = createFileRoute("/media/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = decodeURIComponent(params._splat ?? "");
        if (!path || path.includes("..") || path.length > 500) return new Response("Not found", { status: 404 });
        const local = PUBLIC_COPIES[path];
        if (local) {
          return new Response(null, {
            status: 302,
            headers: { Location: local, "Cache-Control": "public, max-age=3600" },
          });
        }
        let signedUrl: string | undefined;
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data } = await supabaseAdmin.storage.from("media").createSignedUrl(path, 3600);
          signedUrl = data?.signedUrl;
        } catch (e) {
          console.error("Media lookup failed", e);
        }
        if (!signedUrl) return new Response("Not found", { status: 404 });
        const data = { signedUrl };
        return new Response(null, {
          status: 302,
          headers: { Location: data.signedUrl, "Cache-Control": "public, max-age=120" },
        });
      },
    },
  },
});
