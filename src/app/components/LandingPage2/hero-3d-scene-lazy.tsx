"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { CinematicVariant } from "./scroll-cinematic-bg";

const Hero3DScene = dynamic(() => import("./hero-3d-scene").then((m) => m.Hero3DScene), {
  ssr: false,
  loading: () => null,
});

/**
 * Mounts the (heavy) Three.js hero object only once it's actually in or near
 * the viewport, and never on the server. Keeps initial page load light.
 */
export function Hero3DLazy({ variant }: { variant: CinematicVariant }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      {visible && <Hero3DScene variant={variant} />}
    </div>
  );
}
