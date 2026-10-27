import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useContent } from "@/lib/use-content";
import { BrandLockup } from "./Brand";
import { SmartLink } from "./SmartLink";
import { cn } from "@/lib/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function SiteHeader() {
  const s = useContent("settings");
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const solid = scrolled || pathname !== "/" || open;
  const nav: any[] = s.nav ?? [];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid ? "border-b border-border bg-background/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <BrandLockup settings={s} />
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {nav.map((n, i) => (
            <SmartLink
              key={i}
              href={n.href}
              className={cn(
                "text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground",
                pathname === n.href && "text-foreground",
              )}
            >
              {n.label}
            </SmartLink>
          ))}
          {s.ctaLabel && (
            <SmartLink
              href={s.ctaHref}
              className="rounded-sm border border-foreground/60 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:bg-foreground hover:text-background"
            >
              {s.ctaLabel}
            </SmartLink>
          )}
        </nav>
        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-border bg-background px-6 pb-10 pt-6 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((n, i) => (
              <SmartLink key={i} href={n.href} onClick={() => setOpen(false)} className="border-b border-border py-5 font-display text-2xl font-semibold">
                {n.label}
              </SmartLink>
            ))}
            {s.ctaLabel && (
              <SmartLink
                href={s.ctaHref}
                onClick={() => setOpen(false)}
                className="mt-8 rounded-sm bg-primary py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground"
              >
                {s.ctaLabel}
              </SmartLink>
            )}
          </nav>
          {s.subtitle && <p className="mt-10 text-sm text-muted-foreground">{s.subtitle}</p>}
        </div>
      )}
    </header>
  );
}
