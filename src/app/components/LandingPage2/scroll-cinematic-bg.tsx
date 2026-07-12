"use client";

import { useEffect, useRef } from "react";

export type CinematicVariant = "home" | "fcps" | "jcat";

/**
 * Optional real video sources. Drop matching files at these paths (any
 * length/resolution) and the engine automatically switches from the
 * procedural fallback to true scroll-scrubbed video frames — same scroll
 * math either way, so nothing else needs to change.
 */
const VIDEO_SRC: Record<CinematicVariant, string> = {
  home: "/videos/3d-home-scroll.mp4",
  fcps: "/videos/3d-fcps-scroll.mp4",
  jcat: "/videos/3d-jcat-scroll.mp4",
};

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
}

/**
 * Draws one frame of the procedural fallback scene for a given progress
 * value (0 = top of page, 1 = bottom of page). Each variant is a self
 * contained animator; all three share the same canvas size / clear logic.
 */
function drawHome(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, particles: Particle[], accentRgb: string) {
  ctx.clearRect(0, 0, w, h);
  const camZ = 1 + t * 1.4;
  const accent = `rgba(${accentRgb}, OPA)`;
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
  }
  ctx.lineWidth = 1;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.hypot(dx, dy);
      const maxDist = 140 * camZ;
      if (dist < maxDist) {
        const op = (1 - dist / maxDist) * 0.35;
        ctx.strokeStyle = accent.replace("OPA", op.toFixed(3));
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  for (const p of particles) {
    const size = 1.6 + Math.sin((p.x + p.y + t * 400) * 0.02) * 0.8;
    ctx.fillStyle = accent.replace("OPA", "0.85");
    ctx.beginPath();
    ctx.arc(p.x, p.y, size * camZ * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.trim().replace("#", "");
  if (clean.length !== 6) return `rgba(2, 16, 24, ${alpha})`;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function drawFcps(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, accentRgb: string, time: number) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2;
  const turns = 5;
  const amplitude = Math.min(w, 520) * 0.16;
  // Scroll drives most of the spin; a slow, gentle idle spin keeps it alive
  // even when the page isn't being scrolled.
  const idleSpin = time * 0.00012;
  const rotation = t * Math.PI * 2.2 + idleSpin;
  const step = 6;
  for (let strand = 0; strand < 2; strand++) {
    ctx.beginPath();
    for (let y = -step; y <= h + step; y += step) {
      const angle = (y / h) * Math.PI * 2 * turns + rotation + strand * Math.PI;
      const x = cx + Math.sin(angle) * amplitude;
      const depth = (Math.cos(angle) + 1) / 2;
      const op = 0.05 + depth * 0.22;
      ctx.strokeStyle = `rgba(${accentRgb}, ${op.toFixed(3)})`;
      ctx.lineWidth = 0.75 + depth * 1.5;
      if (y === -step) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 26) {
    const angle = (y / h) * Math.PI * 2 * turns + rotation;
    const x1 = cx + Math.sin(angle) * amplitude;
    const x2 = cx + Math.sin(angle + Math.PI) * amplitude;
    const depth = (Math.cos(angle) + 1) / 2;
    ctx.strokeStyle = `rgba(${accentRgb}, ${(0.03 + depth * 0.12).toFixed(3)})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x1, y);
    ctx.lineTo(x2, y);
    ctx.stroke();
  }

  // Fade the upper portion toward the page background so the hero copy sits
  // on a clean, uncluttered area and the helix reads as a subtle accent
  // rather than a bold shape competing with the headline.
  const bg = getComputedStyle(document.documentElement).getPropertyValue("--mkt-bg")?.trim() || "#021018";
  const fadeHeight = h * 0.62;
  const fade = ctx.createLinearGradient(0, 0, 0, fadeHeight);
  fade.addColorStop(0, hexToRgba(bg, 0.97));
  fade.addColorStop(0.55, hexToRgba(bg, 0.55));
  fade.addColorStop(1, hexToRgba(bg, 0));
  ctx.fillStyle = fade;
  ctx.fillRect(0, 0, w, fadeHeight);
}
function drawJcat(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, accentRgb: string) {
  ctx.clearRect(0, 0, w, h);
  const midY = h * 0.55;
  const speed = t * w * 3;
  ctx.strokeStyle = `rgba(${accentRgb}, 0.55)`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = -50; x < w + 50; x += 2) {
    const phase = (x + speed) % 260;
    let y = midY;
    if (phase < 20) y = midY - phase * 3.4;
    else if (phase < 34) y = midY - 68 + (phase - 20) * 6.4;
    else if (phase < 46) y = midY + 18 - (phase - 34) * 8.2;
    else if (phase < 60) y = midY - 80 + (phase - 46) * 5.7;
    if (x === -50) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  const nodeCount = 7;
  for (let i = 0; i < nodeCount; i++) {
    const fx = ((i + t * 1.6) % 1) * w;
    const fy = h * (0.2 + 0.15 * ((i * 37) % 5));
    const pulse = 3 + Math.sin(t * 10 + i) * 1.4;
    ctx.fillStyle = `rgba(${accentRgb}, 0.5)`;
    ctx.beginPath();
    ctx.arc(fx, fy, 5 + pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `rgba(${accentRgb}, 0.5)`;
    ctx.lineWidth = 1;
    ctx.strokeRect(fx - 22, fy - 14, 44, 28);
  }
}

function makeParticles(w: number, h: number, count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    z: Math.random(),
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
  }));
}

export function ScrollCinematicBackground({ variant }: { variant: CinematicVariant }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = makeParticles(canvas.width, canvas.height, 46);
    }
    resize();
    window.addEventListener("resize", resize);

    function onScroll() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      progressRef.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let running = true;
    function frame(time: number) {
      if (!running || !canvas) return;
      const c = canvas;
      const context = ctx as CanvasRenderingContext2D;
      const w = c.width;
      const h = c.height;
      const t = progressRef.current;
      const video = videoRef.current;

      if (video && video.readyState >= 2 && video.duration && !Number.isNaN(video.duration)) {
        video.currentTime = t * video.duration;
        context.clearRect(0, 0, w, h);
        context.drawImage(video, 0, 0, w, h);
      } else {
        // Use theme marketing color if available (falls back to teal)
        const cs = getComputedStyle(document.documentElement).getPropertyValue("--color-primary-400-rgb")?.trim() || "45, 212, 191";
        const accentRgb = cs.replace(/\s+/g, "");
        // Home now shares the same rotating DNA helix as FCPS — it rotates
        // continuously and winds forward/backward as the page scrolls down/up.
        if (variant === "home") drawFcps(context, w, h, t, accentRgb, time);
        else if (variant === "fcps") drawFcps(context, w, h, t, accentRgb, time);
        else drawJcat(context, w, h, t, accentRgb);
      }

      if (!reduceMotion) {
        rafRef.current = requestAnimationFrame(frame);
      }
    }
    rafRef.current = requestAnimationFrame(frame);
    if (reduceMotion) frame(0);

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [variant]);

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
      <video ref={videoRef} src={VIDEO_SRC[variant]} muted playsInline preload="auto" style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      />
      {/* Faint film-grain texture so the dark canvas reads as premium rather
          than flat/empty. Barely visible on purpose. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "120px 120px",
        }}
      />
    </div>
  );
}
