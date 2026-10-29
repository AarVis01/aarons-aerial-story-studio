import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Play, X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { SmartLink } from "./SmartLink";
import { Reveal } from "./Reveal";
import { isVideoFile, toEmbedUrl } from "@/lib/media";
import { cn } from "@/lib/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function Paragraphs({ text, className }: { text?: string; className?: string }) {
  if (!text) return null;
  return (
    <div className={cn("space-y-5", className)}>
      {text.split(/\n{2,}/).map((p, i) => {
        const lines = p.split("\n");
        if (lines.length > 1 && (lines[0] ?? "").length < 60) {
          return (
            <div key={i}>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{lines[0]}</h3>
              <p>{lines.slice(1).join(" ")}</p>
            </div>
          );
        }
        return <p key={i}>{p}</p>;
      })}
    </div>
  );
}

export function SectionHead({ eyebrow, heading, text, center }: { eyebrow?: string; heading?: string; text?: string; center?: boolean }) {
  return (
    <Reveal className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      {heading && <h2 className="text-3xl font-bold leading-tight md:text-5xl">{heading}</h2>}
      {text && <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{text}</p>}
    </Reveal>
  );
}

export function Btn({ href, children, variant = "solid", className }: { href?: string; children: ReactNode; variant?: "solid" | "outline"; className?: string }) {
  if (!children) return null;
  return (
    <SmartLink
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-sm px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors",
        variant === "solid" ? "bg-primary text-primary-foreground hover:bg-primary/85" : "border border-foreground/50 hover:bg-foreground hover:text-background",
        className,
      )}
    >
      {children}
    </SmartLink>
  );
}

export function PageHero({ eyebrow, heading, text, image, alt }: { eyebrow?: string; heading?: string; text?: string; image?: string | null; alt?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border pt-[72px]">
      {image && <img src={image} alt={alt ?? ""} className="absolute inset-0 h-full w-full object-cover opacity-40" />}
      <div className="hero-overlay absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
        <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] md:text-6xl">{heading}</h1>
        {text && <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{text}</p>}
      </div>
    </section>
  );
}

export function ServiceCard({ s, index }: { s: any; index: number }) {
  return (
    <Reveal delay={(index % 3) * 80}>
      <SmartLink href={`/services/${s.slug}`} className="group block overflow-hidden rounded-sm border border-border bg-card">
        <div className="relative aspect-[4/3] overflow-hidden">
          {s.image_url && <img src={s.image_url} alt={s.image_alt ?? ""} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />}
          <span className="absolute left-4 top-4 font-wide text-xs text-silver">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="p-6">
          <h3 className="flex items-start justify-between gap-4 text-xl font-semibold">
            {s.title}
            <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
        </div>
      </SmartLink>
    </Reveal>
  );
}

export function ProjectCard({ p, index, large }: { p: any; index: number; large?: boolean }) {
  return (
    <Reveal delay={(index % 3) * 80}>
      <SmartLink href={`/portfolio/${p.slug}`} className="group relative block overflow-hidden rounded-sm bg-card">
        <div className={cn("relative overflow-hidden", large ? "aspect-[16/10]" : "aspect-[4/5]")}>
          {p.thumbnail_url && <img src={p.thumbnail_url} alt={p.thumbnail_alt ?? ""} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />}
          <div className="hero-overlay absolute inset-0" />
          {p.is_placeholder && <span className="absolute right-3 top-3 rounded-sm bg-background/80 px-2 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">Sample</span>}
          <div className="absolute inset-x-0 bottom-0 p-6">
            {p.category?.name && <p className="eyebrow mb-2">{p.category.name}</p>}
            <h3 className="text-xl font-semibold">{p.title}</h3>
          </div>
        </div>
      </SmartLink>
    </Reveal>
  );
}

/** Full-screen media viewer for images, uploaded videos and YouTube/Vimeo/Instagram links. */
export function MediaViewer({ items, index, onClose, onIndex }: { items: any[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % items.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, items.length, onClose, onIndex]);
  if (index === null || !items[index]) return null;
  const m = items[index];
  const embed = toEmbedUrl(m.url);
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Media viewer" className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4" onClick={onClose}>
      <button aria-label="Close" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center" onClick={onClose}><X className="h-7 w-7" /></button>
      {items.length > 1 && (
        <>
          <button aria-label="Previous" className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center" onClick={(e) => (e.stopPropagation(), onIndex((index - 1 + items.length) % items.length))}><ChevronLeft className="h-8 w-8" /></button>
          <button aria-label="Next" className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center" onClick={(e) => (e.stopPropagation(), onIndex((index + 1) % items.length))}><ChevronRight className="h-8 w-8" /></button>
        </>
      )}
      <figure className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
        {embed ? (
          <div className="aspect-video w-full"><iframe src={embed} title={m.alt || "Video"} className="h-full w-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /></div>
        ) : isVideoFile(m.url) || m.kind === "video" ? (
          <video src={m.url} poster={m.poster_url ?? undefined} controls autoPlay playsInline className="max-h-[85vh] w-full" />
        ) : (
          <img src={m.url} alt={m.alt ?? ""} className="mx-auto max-h-[85vh] w-auto object-contain" />
        )}
        {m.caption && <figcaption className="mt-3 text-center text-sm text-muted-foreground">{m.caption}</figcaption>}
      </figure>
    </div>,
    document.body,
  );
}

export function MediaThumb({ m, onOpen }: { m: any; onOpen: () => void }) {
  const isVid = m.kind !== "image" || isVideoFile(m.url) || !!toEmbedUrl(m.url);
  const src = isVid ? m.poster_url : m.url;
  return (
    <button type="button" onClick={onOpen} className="group relative block w-full overflow-hidden rounded-sm bg-card" aria-label={`Open ${m.alt || "media"}`}>
      <div className="aspect-[4/3]">
        {src ? <img src={src} alt={m.alt ?? ""} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /> : <div className="h-full w-full bg-muted" />}
      </div>
      {isVid && <span className="absolute inset-0 flex items-center justify-center"><span className="flex h-16 w-16 items-center justify-center rounded-full border border-foreground/70 bg-background/40 backdrop-blur"><Play className="ml-1 h-6 w-6" /></span></span>}
    </button>
  );
}

export function useViewer() {
  const [i, setI] = useState<number | null>(null);
  return { index: i, open: setI, close: () => setI(null) };
}
