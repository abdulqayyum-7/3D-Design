"use client";

import { useRef, useState, type MouseEvent } from "react";
import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { LandingLightboxClose } from "./landing-v2-lightbox-close";

/**
 * Live 3D tilt that follows the cursor and eases back to flat on mouse leave.
 * Respects prefers-reduced-motion. Applied directly to the monitor element
 * (not a wrapper div) so it doesn't disturb the existing CSS selectors.
 */
function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onMouseMove = (e: MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 14; // left/right, up to ±7deg
    const rotateX = (0.5 - py) * 10; // up/down, up to ±5deg
    el.style.transform = `perspective(1600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1600px) rotateX(0deg) rotateY(0deg)";
  };

  return { ref, onMouseMove, onMouseLeave };
}

export const PROGRAM_HERO_SCREEN = "/images/landing-v2/computer-screen.jpeg";

function ZoomIcon() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
    </svg>
  );
}

function MonitorFrame({
  screenSrc,
  alt,
  className = "",
  tilt = true,
}: {
  screenSrc: string;
  alt: string;
  className?: string;
  tilt?: boolean;
}) {
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>();

  return (
    <div
      ref={tilt ? ref : undefined}
      className={`monitor-mockup ${className}`.trim()}
      onMouseMove={tilt ? onMouseMove : undefined}
      onMouseLeave={tilt ? onMouseLeave : undefined}
    >
      <div className="monitor-mockup__shell">
        <div className="monitor-mockup__bezel">
          <div className="monitor-mockup__screen">
            <img src={screenSrc} alt={alt} />
          </div>
        </div>
        <div className="monitor-mockup__chin">
          <span className="monitor-mockup__camera" />
        </div>
      </div>
      <div className="monitor-mockup__stand">
        <div className="monitor-mockup__neck" />
        <div className="monitor-mockup__foot" />
      </div>
      <div className="monitor-mockup__shadow" />
    </div>
  );
}

export function MonitorMockup({
  screenSrc = PROGRAM_HERO_SCREEN,
  alt = "Question bank interface on desktop monitor",
  zoomable = true,
}: {
  screenSrc?: string;
  alt?: string;
  zoomable?: boolean;
}) {
  const [open, setOpen] = useState(false);

  if (!zoomable) {
    return <MonitorFrame screenSrc={screenSrc} alt={alt} />;
  }

  return (
    <>
      <button
        type="button"
        className="monitor-mockup-trigger"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge preview: ${alt}`}
      >
        <MonitorFrame screenSrc={screenSrc} alt={alt} />
        <span className="monitor-mockup-zoom-hint">
          <ZoomIcon />
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="monitor-mockup-dialog border-0 bg-transparent p-3 shadow-none"
          showCloseButton={false}
        >
          <LandingLightboxClose onClick={() => setOpen(false)} />
          <MonitorFrame screenSrc={screenSrc} alt={alt} className="monitor-mockup--lightbox" tilt={false} />
        </DialogContent>
      </Dialog>
    </>
  );
}
