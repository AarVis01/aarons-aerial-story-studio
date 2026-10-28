import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";
import { categoriesQuery, contentQuery, projectsQuery } from "@/lib/queries";
import { useContent } from "@/lib/use-content";
import { PageHero, ProjectCard } from "@/components/site/Blocks";
import { seoHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const Route = createFileRoute("/portfolio/")({
  validateSearch: z.object({ category: z.string().max(100).optional() }),
  loader: async ({ context }) => {
    const [c] = await Promise.all([
      context.queryClient.ensureQueryData(contentQuery),
      context.queryClient.ensureQueryData(projectsQuery),
      context.queryClient.ensureQueryData(categoriesQuery),
    ]);
    return c;
  },
  head: ({ loaderData }) => seoHead((loaderData as any)?.portfolio_page?.seo, "Portfolio — Aarons Visuals", "Aerial, commercial, property and event visual projects."),
  component: PortfolioPage,
});

function PortfolioPage() {
  const p = useContent("portfolio_page");
  const { category } = Route.useSearch();
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const { data: cats } = useSuspenseQuery(categoriesQuery);
  const list = (projects as any[]).filter((x) => !category || x.category?.slug === category);
  const pill = (active: boolean) => cn("rounded-full border px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors", active ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground");
  return (
    <>
      <PageHero eyebrow={p.eyebrow} heading={p.heading} text={p.text} />
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <nav aria-label="Filter by category" className="mb-12 flex flex-wrap gap-3">
          <Link to="/portfolio" search={{}} className={pill(!category)}>{p.allLabel || "All"}</Link>
          {(cats as any[]).map((c) => (
            <Link key={c.id} to="/portfolio" search={{ category: c.slug }} className={pill(category === c.slug)}>{c.name}</Link>
          ))}
        </nav>
        {list.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((x, i) => <ProjectCard key={x.id} p={x} index={i} />)}</div>
        ) : (
          <p className="py-20 text-center text-muted-foreground">{p.emptyText}</p>
        )}
      </section>
    </>
  );
}
