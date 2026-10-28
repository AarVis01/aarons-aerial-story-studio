import { createFileRoute } from "@tanstack/react-router";
import { contentQuery } from "@/lib/queries";
import { useContent } from "@/lib/use-content";
import { PageHero, Paragraphs } from "@/components/site/Blocks";
import { seoHead } from "@/lib/seo";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const Route = createFileRoute("/privacy")({
  loader: ({ context }) => context.queryClient.ensureQueryData(contentQuery),
  head: ({ loaderData }) => seoHead((loaderData as any)?.privacy?.seo, "Privacy Policy — Aarons Visuals", "How Aarons Visuals handles personal information."),
  component: PrivacyPage,
});

function PrivacyPage() {
  const p = useContent("privacy");
  return (
    <>
      <PageHero heading={p.heading} />
      <section className="mx-auto max-w-3xl px-5 py-20 md:px-8">
        <Paragraphs text={p.body} className="leading-relaxed text-muted-foreground" />
      </section>
    </>
  );
}
