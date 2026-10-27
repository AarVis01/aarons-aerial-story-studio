import { createFileRoute } from "@tanstack/react-router";
import { contentQuery } from "@/lib/queries";
import { useContent } from "@/lib/use-content";
import { SmartLink } from "@/components/site/SmartLink";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(contentQuery),
  head: () => ({
    meta: [
      { title: "Aarons Visuals — Drone Filming & Videography, North West London" },
      { name: "description", content: "Cinematic drone filming, aerial photography and commercial videography in North West London and London." },
      { property: "og:title", content: "Aarons Visuals" },
      { property: "og:description", content: "From Ground to Sky, Bring Your Vision to Life." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const s = useContent("settings");
  const h = useContent("home").hero ?? {};
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      {h.posterUrl && <img src={h.posterUrl} alt={h.posterAlt ?? ""} className="absolute inset-0 h-full w-full object-cover" />}
      <div className="hero-overlay absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 md:px-8">
        <p className="font-wide text-lg font-semibold uppercase tracking-[0.3em]">{s.brandName}</p>
        <p className="mt-3 text-silver">{s.subtitle}</p>
        <h1 className="mt-10 max-w-3xl text-4xl font-bold md:text-7xl">{h.headline}</h1>
        <p className="mt-5 max-w-xl text-muted-foreground">{h.supportingText}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <SmartLink href={h.primaryButtonHref} className="rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">{h.primaryButtonLabel}</SmartLink>
          <SmartLink href={h.secondaryButtonHref} className="rounded-sm border border-foreground/60 px-6 py-3 text-sm font-semibold">{h.secondaryButtonLabel}</SmartLink>
        </div>
      </div>
    </section>
  );
}
