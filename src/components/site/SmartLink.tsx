import { Link } from "@tanstack/react-router";
import type { ReactNode, MouseEvent } from "react";
import { isExternal } from "@/lib/media";

type Props = { href?: string | null | undefined; className?: string; children: ReactNode; onClick?: () => void; "aria-label"?: string };

/** Renders an internal router link, in-page anchor, or external link from a CMS-provided href. */
export function SmartLink({ href, className, children, onClick, ...rest }: Props) {
  const h = (href ?? "").trim() || "/";
  if (isExternal(h) || h.startsWith("mailto:") || h.startsWith("tel:")) {
    return (
      <a href={h} className={className} onClick={onClick} target={isExternal(h) ? "_blank" : undefined} rel="noopener noreferrer" aria-label={rest["aria-label"]}>
        {children}
      </a>
    );
  }
  if (h.startsWith("#")) {
    const id = h.slice(1);
    const handle = (e: MouseEvent) => {
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      onClick?.();
    };
    return (
      <a href={`/${h}`} className={className} onClick={handle} aria-label={rest["aria-label"]}>
        {children}
      </a>
    );
  }
  const [path, hash] = h.split("#");
  return (
    <Link to={(path || "/") as "/"} {...(hash ? { hash } : {})} className={className} onClick={onClick} aria-label={rest["aria-label"]}>
      {children}
    </Link>
  );
}
