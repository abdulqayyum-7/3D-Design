"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 34;
const TOTAL_DURATION_MS = 11000; // matches the source clip length
const FRAME_INTERVAL_MS = TOTAL_DURATION_MS / FRAME_COUNT;

function framePath(n: number) {
  return `/images/neural-frames/frame-${String(n).padStart(3, "0")}.jpg`;
}

/**
 * Plays the 34 extracted neural-network frames as a looping, crossfaded
 * background — real photographic/rendered frames, not a procedural canvas.
 * Two stacked <img> layers alternate opacity so frame changes are a smooth
 * dissolve instead of a hard cut. All frames are preloaded up front so the
 * loop never stutters or shows a blank frame.
 *
 * Drop the 34 source images into /public/images/neural-frames/ named
 * frame-001.jpg through frame-034.jpg (see the .txt placeholder in that
 * folder for the exact naming convention).
 */
export function NeuralFrameBackground() {
  const [frame, setFrame] = useState(1);
  const [showA, setShowA] = useState(true);
  const loaded = useRef(false);

  useEffect(() => {
    // Preload every frame once so the loop plays smoothly.
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = framePath(i);
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setFrame((f) => (f % FRAME_COUNT) + 1);
      setShowA((v) => !v);
    }, FRAME_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const nextFrame = (frame % FRAME_COUNT) + 1;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -2,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <img
        src={framePath(frame)}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: showA ? 1 : 0,
          transition: `opacity ${FRAME_INTERVAL_MS * 0.9}ms ease-in-out`,
        }}
      />
      <img
        src={framePath(nextFrame)}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: showA ? 0 : 1,
          transition: `opacity ${FRAME_INTERVAL_MS * 0.9}ms ease-in-out`,
        }}
      />
      {/* Keeps hero text readable over the bright starburst areas of the frames */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(5,6,12,0.55) 0%, rgba(5,6,12,0.72) 55%, rgba(5,6,12,0.9) 100%)",
        }}
      />
    </div>
  );
}
