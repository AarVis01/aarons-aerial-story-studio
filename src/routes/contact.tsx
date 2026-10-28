import { createFileRoute } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { contentQuery } from "@/lib/queries";
import { useContent } from "@/lib/use-content";
import { PageHero } from "@/components/site/Blocks";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { seoHead } from "@/lib/seo";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const Route = createFileRoute("/contact")({
  loader: ({ context }) => context.queryClient.ensureQueryData(contentQuery),
  head: ({ loaderData }) => seoHead((loaderData as any)?.contact?.seo, "Contact & Quotes — Aarons Visuals", "Request a quote for drone filming, videography or photography."),
  component: ContactPage,
});

function ContactPage() {
  const c = useContent("contact");
  const s = useContent("settings");
  const info = s.contact ?? {};
  const ig = (s.social ?? []).find((x: any) => /instagram/i.test(x.url ?? ""));
  return (
    <>
      <PageHero eyebrow={c.eyebrow} heading={c.heading} text={c.text} />
      <section id="enquiry" className="mx-auto grid max-w-7xl scroll-mt-24 gap-14 px-5 py-20 md:grid-cols-12 md:px-8">
        <aside className="space-y-6 text-sm md:col-span-4">
          {info.email && <div><p className="eyebrow mb-1">Email</p><a href={`mailto:${info.email}`} className="text-lg hover:underline">{info.email}</a></div>}
          {info.phone && <div><p className="eyebrow mb-1">Phone</p><a href={`tel:${info.phone.replace(/\s/g, "")}`} className="text-lg hover:underline">{info.phone}</a></div>}
          {info.serviceArea && <div><p className="eyebrow mb-1">Service area</p><p className="text-lg">{info.serviceArea}</p></div>}
          {ig && (
            <a href={ig.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lg hover:underline">
              <Instagram className="h-5 w-5" aria-hidden /> {c.instagramLabel || ig.label}
            </a>
          )}
        </aside>
        <div className="md:col-span-8"><EnquiryForm f={c.form ?? {}} /></div>
      </section>
    </>
  );
}
