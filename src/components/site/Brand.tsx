import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function BrandLockup({ settings, className, compact }: { settings: any; className?: string; compact?: boolean }) {
  return (
    <Link to="/" className={cn("flex items-center gap-3", className)} aria-label={`${settings?.brandName ?? "Home"} — home`}>
      <img src="/logo.jpg" alt={settings?.logoAlt ?? "Aarons Visuals"} width={48} height={30} className="h-8 w-auto" />
      {!compact && (
        <span className="font-wide text-sm font-semibold uppercase tracking-[0.22em]">{settings?.brandName}</span>
      )}
    </Link>
  );
}
