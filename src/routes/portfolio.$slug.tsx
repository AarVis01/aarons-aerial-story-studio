import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { projectQuery } from "@/lib/queries";
import { Btn, MediaThumb, MediaViewer, PageHero, Paragraphs, useViewer } from "@/components/site/Blocks";
import { seoHead } from "@/lib/seo";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const Route = createFileRoute("/portfolio/$slug")({
  loader: async ({ context, params }) => {
    const p = await context.queryClient.ensureQueryData(projectQuery(params.slug));
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => {
    const p = loaderData as any;
    if (!p) return { meta: [{ title: "Project not found — Aarons Visuals" }, { name: "robots", content: "noindex" }] };
    return seoHead({ title: p.seo_title, description: p.seo_description }, `${p.title} — Aarons Visuals`, p.short_description, p.thumbnail_url, "article");
  },
  component: ProjectPage,
  notFoundComponent: () => <PageHero heading="Project not found" text="This project may have been moved or removed." />,
  errorComponent: () => <PageHero heading="This page didn't load" text="Please refresh to try again." />,
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const { data: p } = useSuspenseQuery(projectQuery(slug)) as { data: any };
  const v = useViewer();
  const media: any[] = [
    ...(p.cover_video_url ? [{ url: p.cover_video_url, kind: "video", poster_url: p.thumbnail_url, alt: p.title }] : []),
    ...(p.media ?? []),
  ];
  return (
    <>
      <PageHero eyebrow={p.category?.name} heading={p.title} text={p.short_description} image={p.thumbnail_url} alt={p.thumbnail_alt} />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-8">
          <Paragraphs text={p.full_description} className="text-lg leading-relaxed text-muted-foreground" />
        </div>
        <dl className="space-y-5 text-sm md:col-span-4">
          {p.client_name && <div><dt className="eyebrow mb-1">Client</dt><dd>{p.client_name}</dd></div>}
          {p.category?.name && <div><dt className="eyebrow mb-1">Category</dt><dd>{p.category.name}</dd></div>}
          {p.project_date && <div><dt className="eyebrow mb-1">Date</dt><dd>{new Date(p.project_date).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</dd></div>}
          <div className="flex flex-wrap gap-3 pt-2">
            {p.instagram_url && <Btn href={p.instagram_url} variant="outline">Instagram</Btn>}
            {p.external_url && <Btn href={p.external_url} variant="outline">View link</Btn>}
          </div>
        </dl>
      </section>
      {media.length > 0 && (
        <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 sm:grid-cols-2 md:px-8 lg:grid-cols-3">
          {media.map((m, i) => <MediaThumb key={i} m={m} onOpen={() => v.open(i)} />)}
        </section>
      )}
      <section className="border-t border-border py-20 text-center">
        <h2 className="text-3xl font-bold">Have a project in mind?</h2>
        <div className="mt-8"><Btn href="/contact#enquiry">Get a Quote</Btn></div>
      </section>
      <MediaViewer items={media} index={v.index} onClose={v.close} onIndex={v.open} />
    </>
  );
}
