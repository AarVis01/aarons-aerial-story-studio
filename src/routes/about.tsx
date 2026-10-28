import { createFileRoute } from "@tanstack/react-router";
import { contentQuery } from "@/lib/queries";
import { useContent } from "@/lib/use-content";
import { Btn, PageHero, Paragraphs } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";
import { seoHead } from "@/lib/seo";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const Route = createFileRoute("/about")({
  loader: ({ context }) => context.queryClient.ensureQueryData(contentQuery),
  head: ({ loaderData }) => seoHead((loaderData as any)?.about?.seo, "About — Aarons Visuals", "Independent visual production in North West London."),
  component: AboutPage,
});

function AboutPage() {
  const a = useContent("about");
  return (
    <>
      <PageHero eyebrow={a.eyebrow} heading={a.heading} text={a.intro} />
      <section className="mx-auto grid max-w-7xl items-start gap-12 px-5 py-20 md:grid-cols-2 md:px-8">
        <Reveal className="overflow-hidden rounded-sm">
          {a.videoUrl ? <video src={a.videoUrl} poster={a.imageUrl} controls playsInline className="w-full" /> : a.imageUrl && <img src={a.imageUrl} alt={a.imageAlt ?? ""} className="aspect-[4/5] w-full object-cover" />}
        </Reveal>
        <Reveal delay={100}>
          <Paragraphs text={a.body} className="text-lg leading-relaxed text-muted-foreground" />
          <div className="mt-10"><Btn href={a.buttonHref}>{a.buttonLabel}</Btn></div>
        </Reveal>
      </section>
      {(a.values ?? []).length > 0 && (
        <section className="border-t border-border py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 className="text-3xl font-bold md:text-4xl">{a.valuesHeading}</h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {a.values.map((v: any, i: number) => (
                <Reveal key={i} delay={i * 80} className="border-t border-foreground/30 pt-6">
                  <h3 className="text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-muted-foreground">{v.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
