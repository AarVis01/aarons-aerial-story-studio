import { useEffect, useRef, useState } from "react";

/** Small animated drone that sits above the hero brand name, then follows the visitor as they scroll. */
export function FlyingDrone() {
  const anchor = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      const el = anchor.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setTop(Math.max(84, r.top));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div ref={anchor} className="mb-5 h-12 w-24" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none fixed left-1/2 z-40 -translate-x-1/2"
        style={{ top: top ?? 0, opacity: top === null ? 0 : 1 }}
      >
        <div className="drone-bob">
          <DroneSvg />
        </div>
      </div>
    </>
  );
}

function Rotor({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="15" className="fill-none stroke-silver/25" strokeWidth="1" />
      <g className="prop-spin">
        <rect x={cx - 14} y={cy - 1.6} width="28" height="3.2" rx="1.6" className="fill-silver" />
      </g>
      <circle cx={cx} cy={cy} r="2.6" className="fill-ember" />
    </g>
  );
}

function DroneSvg() {
  return (
    <svg width="96" height="48" viewBox="0 0 120 60" className="drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)]">
      <g className="stroke-silver" strokeWidth="3" strokeLinecap="round">
        <line x1="60" y1="30" x2="22" y2="16" />
        <line x1="60" y1="30" x2="98" y2="16" />
        <line x1="60" y1="30" x2="22" y2="44" />
        <line x1="60" y1="30" x2="98" y2="44" />
      </g>
      <rect x="46" y="22" width="28" height="16" rx="6" className="fill-silver" />
      <rect x="50" y="26" width="20" height="3" rx="1.5" className="fill-ember" />
      <circle cx="60" cy="41" r="3.5" className="fill-background stroke-ember" strokeWidth="1.5" />
      <Rotor cx={22} cy={16} />
      <Rotor cx={98} cy={16} />
      <Rotor cx={22} cy={44} />
      <Rotor cx={98} cy={44} />
    </svg>
  );
}
