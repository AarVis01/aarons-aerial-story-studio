import { useQuery } from "@tanstack/react-query";
import { Instagram } from "lucide-react";
import { useContent } from "@/lib/use-content";
import { servicesQuery } from "@/lib/queries";
import { SmartLink } from "./SmartLink";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function SiteFooter() {
  const s = useContent("settings");
  const { data: services } = useQuery(servicesQuery);
  const f = s.footer ?? {};
  const c = s.contact ?? {};
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-4">
          {s.logoUrl && <img src={s.logoUrl} alt={s.logoAlt ?? ""} width={64} height={40} loading="lazy" className="h-10 w-auto" />}
          <p className="font-wide mt-5 text-base font-semibold uppercase tracking-[0.2em]">{s.brandName}</p>
          <p className="mt-2 text-sm text-silver">{s.subtitle}</p>
          {f.description && <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">{f.description}</p>}
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-4">{f.navHeading}</p>
          <ul className="space-y-3 text-sm">
            {(s.nav ?? []).map((n: any, i: number) => (
              <li key={i}><SmartLink href={n.href} className="text-muted-foreground hover:text-foreground">{n.label}</SmartLink></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-4">{f.servicesHeading}</p>
          <ul className="space-y-3 text-sm">
            {(services ?? []).map((sv: any) => (
              <li key={sv.id}>
                <SmartLink href={`/services/${sv.slug}`} className="text-muted-foreground hover:text-foreground">{sv.title}</SmartLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-4">{f.contactHeading}</p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {c.email && <li><a className="hover:text-foreground" href={`mailto:${c.email}`}>{c.email}</a></li>}
            {c.phone && <li><a className="hover:text-foreground" href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a></li>}
            {c.website && <li><SmartLink className="hover:text-foreground" href={/^https?:/.test(c.website) ? c.website : `https://${c.website}`}>{c.website}</SmartLink></li>}
            {c.serviceArea && <li>{c.serviceArea}</li>}
            {(s.social ?? []).map((so: any, i: number) => (
              <li key={i}>
                <a href={so.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
                  {/instagram/i.test(so.url ?? "") && <Instagram className="h-4 w-4" aria-hidden />} {so.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {year} {f.copyrightName ?? s.brandName}. All rights reserved.</p>
          <SmartLink href="/privacy" className="hover:text-foreground">{f.privacyLabel ?? "Privacy Policy"}</SmartLink>
        </div>
      </div>
    </footer>
  );
}
