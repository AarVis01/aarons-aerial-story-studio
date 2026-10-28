import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { serviceQuery, servicesQuery } from "@/lib/queries";
import { Btn, MediaThumb, MediaViewer, PageHero, Paragraphs, ServiceCard, useViewer } from "@/components/site/Blocks";
import { seoHead } from "@/lib/seo";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const Route = createFileRoute("/services/$slug")({
  loader: async ({ context, params }) => {
    const s = await context.queryClient.ensureQueryData(serviceQuery(params.slug));
    if (!s) throw notFound();
    await context.queryClient.ensureQueryData(servicesQuery);
    return s;
  },
  head: ({ loaderData }) => {
    const s = loaderData as any;
    if (!s) return { meta: [{ title: "Service not found — Aarons Visuals" }, { name: "robots", content: "noindex" }] };
    return seoHead({ title: s.seo_title, description: s.seo_description, ogImage: s.og_image }, `${s.title} — Aarons Visuals`, s.summary, s.image_url);
  },
  component: ServicePage,
  notFoundComponent: () => <PageHero heading="Service not found" text="This service may have been moved or removed." />,
  errorComponent: () => <PageHero heading="This page didn't load" text="Please refresh to try again." />,
});

function ServicePage() {
  const { slug } = Route.useParams();
  const { data: s } = useSuspenseQuery(serviceQuery(slug)) as { data: any };
  const { data: all } = useSuspenseQuery(servicesQuery);
  const v = useViewer();
  const others = (all as any[]).filter((x) => x.slug !== slug).slice(0, 3);
  const video = s.video_url ? [{ url: s.video_url, kind: "video", poster_url: s.image_url, alt: s.title }] : [];
  return (
    <>
      <PageHero eyebrow="Service" heading={s.title} text={s.summary} image={s.image_url} alt={s.image_alt} />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-12 md:px-8">
        <Paragraphs text={s.body} className="text-lg leading-relaxed text-muted-foreground md:col-span-7" />
        <div className="space-y-6 md:col-span-5">
          {video.length ? <MediaThumb m={video[0]} onOpen={() => v.open(0)} /> : s.image_url && <img src={s.image_url} alt={s.image_alt ?? ""} className="w-full rounded-sm" loading="lazy" />}
          <Btn href={s.button_url || "/contact#enquiry"}>{s.button_label || "Get a Quote"}</Btn>
        </div>
      </section>
      {others.length > 0 && (
        <section className="border-t border-border py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 className="mb-10 text-2xl font-bold">More services</h2>
            <div className="grid gap-6 md:grid-cols-3">{others.map((o, i) => <ServiceCard key={o.id} s={o} index={i} />)}</div>
          </div>
        </section>
      )}
      <MediaViewer items={video} index={v.index} onClose={v.close} onIndex={v.open} />
    </>
  );
}
