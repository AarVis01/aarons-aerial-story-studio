import { createFileRoute } from "@tanstack/react-router";

// Serves files from the private media bucket via short-lived signed links.
export const Route = createFileRoute("/media/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = decodeURIComponent(params._splat ?? "");
        if (!path || path.includes("..") || path.length > 500) return new Response("Not found", { status: 404 });
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage.from("media").createSignedUrl(path, 3600);
        if (error || !data?.signedUrl) return new Response("Not found", { status: 404 });
        return new Response(null, {
          status: 302,
          headers: { Location: data.signedUrl, "Cache-Control": "public, max-age=120" },
        });
      },
    },
  },
});
