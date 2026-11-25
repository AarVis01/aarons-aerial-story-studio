import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function BrandLockup({ settings, className, compact }: { settings: any; className?: string; compact?: boolean }) {
  const logoSrc = settings?.logoUrl === "/favicon.png" ? "/favicon.PNG" : settings?.logoUrl;

  return (
    <Link to="/" className={cn("flex items-center gap-3", className)} aria-label={`${settings?.brandName ?? "Home"} — home`}>
      {logoSrc ? (
        <img src={logoSrc} alt={settings.logoAlt ?? ""} width={48} height={30} className="h-8 w-auto" />
      ) : (
        <span className="font-wide text-lg font-bold">AV</span>
      )}
      {!compact && (
        <span className="font-wide text-sm font-semibold uppercase tracking-[0.22em]">{settings?.brandName}</span>
      )}
    </Link>
  );
}
