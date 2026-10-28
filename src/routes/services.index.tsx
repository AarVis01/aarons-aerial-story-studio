import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { contentQuery, servicesQuery } from "@/lib/queries";
import { useContent } from "@/lib/use-content";
import { Btn, PageHero, ServiceCard } from "@/components/site/Blocks";
import { seoHead } from "@/lib/seo";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const Route = createFileRoute("/services/")({
  loader: async ({ context }) => {
    const [c] = await Promise.all([context.queryClient.ensureQueryData(contentQuery), context.queryClient.ensureQueryData(servicesQuery)]);
    return c;
  },
  head: ({ loaderData }) => seoHead((loaderData as any)?.services_page?.seo, "Services — Aarons Visuals", "Drone filming, videography and photography services in London."),
  component: ServicesPage,
});

function ServicesPage() {
  const p = useContent("services_page");
  const { data } = useSuspenseQuery(servicesQuery);
  return (
    <>
      <PageHero eyebrow={p.eyebrow} heading={p.heading} text={p.text} />
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(data as any[]).map((s, i) => <ServiceCard key={s.id} s={s} index={i} />)}
        </div>
      </section>
      <section className="border-t border-border py-20 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">{p.ctaHeading}</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{p.ctaText}</p>
        <div className="mt-8"><Btn href={p.ctaButtonHref}>{p.ctaButtonLabel}</Btn></div>
      </section>
    </>
  );
}
