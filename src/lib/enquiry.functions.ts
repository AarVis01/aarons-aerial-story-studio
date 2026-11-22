import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { enquirySchema } from "./enquiry-schema";
import { notifyNewEnquiry } from "./notify.server";
import { BUSINESS_EMAIL } from "./site-contact";

async function sha256(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => enquirySchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: false as const, error: "Your enquiry could not be sent." };
    if (Date.now() - data.startedAt < 3000) {
      return { ok: false as const, error: "That was very quick — please check your details and try again." };
    }

    const ip = getRequestHeader("cf-connecting-ip") ?? getRequestHeader("x-forwarded-for")?.split(",") ?? "unknown";
    const ipHash = await sha256(`av:${ip}`);

    let enquiryId = crypto.randomUUID();
    let to = BUSINESS_EMAIL;

    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      const { count } = await supabaseAdmin
        .from("enquiries")
        .select("id", { count: "exact", head: true })
        .eq("ip_hash", ipHash)
        .gte("created_at", since);

      if ((count ?? 0) >= 5) {
        return { ok: false as const, error: "Too many enquiries from this connection. Please try again later." };
      }

      const { data: row } = await supabaseAdmin
        .from("enquiries")
        .insert({
          name: data.name,
          business_name: data.businessName || null,
          email: data.email,
          phone: data.phone || null,
          service: data.service || null,
          location: data.location,
          budget: data.budget || null,
          details: data.details,
          contact_method: data.contactMethod || null,
          ip_hash: ipHash,
        })
        .select("id")
        .single();

      if (row?.id) {
        enquiryId = row.id;
        const { data: settings } = await supabaseAdmin.from("site_content").select("published").eq("key", "settings").maybeSingle();
        const configured = ((settings?.published as Record<string, unknown> | null)?.["notificationEmail"] as string | undefined)?.trim();
        if (configured) to = configured;

        const emailStatus = await notifyNewEnquiry({
          to,
          enquiryId,
          enquiry: {
            name: data.name,
            businessName: data.businessName,
            email: data.email,
            phone: data.phone,
            service: data.service,
            location: data.location,
            budget: data.budget,
            details: data.details,
            contactMethod: data.contactMethod,
          },
        });
        await supabaseAdmin.from("enquiries").update({ email_status: emailStatus }).eq("id", row.id);
      }
    } catch (err) {
      console.error("Enquiry handler warning:", err);
    }

    return { ok: true as const };
  });
