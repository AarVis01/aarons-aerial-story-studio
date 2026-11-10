import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { contentQuery, servicesQuery } from "@/lib/queries";
import { useContent } from "@/lib/use-content";
import { Btn, Paragraphs, SectionHead, ServiceCard } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";
import { FlyingDrone } from "@/components/site/FlyingDrone";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const Route = createFileRoute("/")({
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(contentQuery),
      context.queryClient.ensureQueryData(servicesQuery),
    ]).then(([c]) => c),
  head: ({ loaderData }) => {
    const seo = (loaderData as any)?.home?.seo ?? {};
    const title = seo.title || "Aarons Visuals — Drone Filming & Videography, North West London";
    const desc = seo.description || "Cinematic drone filming, aerial photography and commercial videography in North West London and London.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Index,
});

function Index() {
  const s = useContent("settings");
  const home = useContent("home");
  const { data: services } = useSuspenseQuery(servicesQuery);
  const order: any[] = home.sections ?? [];

  const blocks: Record<string, () => React.ReactNode> = {
    hero: () => {
      const h = home.hero ?? {};
      return (
        <section key="hero" className="relative flex min-h-[100svh] items-center overflow-hidden">
          {h.videoUrl ? (
            <video src={h.videoUrl} poster={h.posterUrl} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" aria-hidden />
          ) : (
          <img src="/main.jpeg" alt={h.posterAlt ?? ""} className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-28 text-center md:px-8">
            <FlyingDrone />
            <p className="font-wide text-base font-semibold uppercase tracking-[0.3em] md:text-lg">{s.brandName}</p>
            <p className="mt-3 text-sm text-silver md:text-base">{s.subtitle}</p>
            <h1 className="mt-10 max-w-4xl mx-auto text-5xl font-bold leading-[1.02] md:text-8xl">{h.headline}</h1>
            <p className="mt-6 mx-auto max-w-xl text-base text-muted-foreground md:text-lg">{h.supportingText}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Btn href={h.primaryButtonHref}>{h.primaryButtonLabel}</Btn>
              <Btn href={h.secondaryButtonHref} variant="outline">{h.secondaryButtonLabel}</Btn>
            </div>
          </div>
          {h.scrollLabel && (
            <a href="#intro" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex">
              {h.scrollLabel}<ChevronDown className="h-4 w-4 animate-bounce" />
            </a>
          )}
        </section>
      );
    },
    intro: () => {
      const x = home.intro ?? {};
      return (
        <section key="intro" id="intro" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
          <Reveal className="grid gap-10 md:grid-cols-12">
            <p className="eyebrow md:col-span-3">{x.eyebrow}</p>
            <div className="md:col-span-9">
              <h2 className="text-3xl font-bold leading-tight md:text-5xl">{x.heading}</h2>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{x.text}</p>
            </div>
          </Reveal>
        </section>
      );
    },
    services: () => {
      const x = home.services ?? {};
      return (
        <section key="services" id="services" className="border-t border-border py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <SectionHead eyebrow={x.eyebrow} heading={x.heading} text={x.text} />
              <Btn href={x.buttonHref} variant="outline">{x.buttonLabel}</Btn>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(services as any[]).map((sv, i) => <ServiceCard key={sv.id} s={sv} index={i} />)}
            </div>
          </div>
        </section>
      );
    },
    editing: () => {
      const x = home.editing ?? {};
      return (
        <section key="editing" id="editing" className="border-t border-border bg-card/40 py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHead eyebrow={x.eyebrow} heading={x.heading} text={x.text} />
            <Paragraphs text={x.body} className="mt-12 max-w-3xl text-muted-foreground" />
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {(x.highlights ?? []).map((hl: any, i: number) => (
                <Reveal key={i} delay={i * 80} className="border-t border-foreground/30 pt-6">
                  <h3 className="text-lg font-semibold">{hl.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{hl.text}</p>
                </Reveal>
              ))}
            </div>
            <div className="mt-12"><Btn href={x.buttonHref} variant="outline">{x.buttonLabel}</Btn></div>
          </div>
        </section>
      );
    },
    showcase: () => {
      const x = home.showcase ?? {};
      return (
        <section key="showcase" className="relative overflow-hidden">
          {x.imageUrl && <img src={x.imageUrl} alt={x.imageAlt ?? ""} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
          <div className="hero-overlay absolute inset-0" />
          <div className="relative mx-auto flex min-h-[80vh] max-w-7xl items-end px-5 py-24 md:px-8">
            <Reveal className="max-w-2xl">
              <p className="eyebrow mb-4">{x.eyebrow}</p>
              <h2 className="text-4xl font-bold leading-tight md:text-6xl">{x.heading}</h2>
              <p className="mt-6 text-lg text-muted-foreground">{x.text}</p>
              {x.ctaText && <p className="mt-8 text-foreground">{x.ctaText}</p>}
              <div className="mt-6"><Btn href={x.buttonHref}>{x.buttonLabel}</Btn></div>
            </Reveal>
          </div>
        </section>
      );
    },
    about: () => {
      const x = home.about ?? {};
      return (
        <section key="about" className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
          <Reveal className="overflow-hidden rounded-sm">
            {x.videoUrl ? <video src={x.videoUrl} poster={x.imageUrl} muted loop autoPlay playsInline className="aspect-[4/5] w-full object-cover" /> : x.imageUrl && <img src={x.imageUrl} alt={x.imageAlt ?? ""} loading="lazy" className="aspect-[4/5] w-full object-cover" />}
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow mb-4">{x.eyebrow}</p>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">{x.heading}</h2>
            <Paragraphs text={x.text} className="mt-6 text-muted-foreground" />
            <div className="mt-8"><Btn href={x.buttonHref} variant="outline">{x.buttonLabel}</Btn></div>
          </Reveal>
        </section>
      );
    },
    process: () => {
      const x = home.process ?? {};
      return (
        <section key="process" className="border-t border-border py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHead eyebrow={x.eyebrow} heading={x.heading} />
            <ol className="mt-14 grid gap-10 md:grid-cols-3">
              {(x.steps ?? []).map((st: any, i: number) => (
                <Reveal key={i} as="li" delay={i * 100} className="border-t border-foreground/30 pt-6">
                  <span className="font-wide text-sm text-silver">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-xl font-semibold">{st.title}</h3>
                  <p className="mt-3 text-muted-foreground">{st.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      );
    },
    contact: () => {
      const x = home.contact ?? {};
      return (
        <section key="contact" className="border-t border-border bg-card/40 py-24 md:py-36">
          <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
            <Reveal>
              <p className="eyebrow mb-4">{x.eyebrow}</p>
              <h2 className="text-4xl font-bold leading-tight md:text-6xl">{x.heading}</h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{x.text}</p>
              <div className="mt-10"><Btn href={x.buttonHref}>{x.buttonLabel}</Btn></div>
            </Reveal>
          </div>
        </section>
      );
    },
  };

  const list = order.length ? order : Object.keys(blocks).map((id) => ({ id, visible: true }));
  return <>{list.filter((b) => b.visible !== false).map((b) => blocks[b.id]?.())}</>;
}
