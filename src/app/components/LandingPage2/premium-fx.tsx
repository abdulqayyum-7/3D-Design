"use client";

import { useEffect } from "react";

const CARD_SELECTOR =
  ".lp-pillar-card, .lp-highlight-card, .lp-step-card, .feature-item, .lp-program .resource-card, .lp-testimonial-card, .review-card";
const BUTTON_SELECTOR = ".medprep-landing-v2 button";
const REVEAL_SELECTOR = ".medprep-landing-v2 .section, .medprep-landing-v2 section, .medprep-landing-v2 .lp-hero";
const STAT_SELECTOR = ".lp-stat-num, .stat-num, [data-count-target]";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Cursor-follow tilt + glow position, driven by CSS custom properties (--mx/--my/--rx/--ry). */
function setupMagneticCards(reduced: boolean) {
  const cards = document.querySelectorAll<HTMLElement>(CARD_SELECTOR);
  const cleanups: Array<() => void> = [];

  cards.forEach((card) => {
    card.classList.add("fx-magnetic-card");
    if (reduced) return;

    function onMove(e: MouseEvent) {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      card.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      card.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      card.style.setProperty("--ry", `${((px - 0.5) * 10).toFixed(2)}deg`);
      card.style.setProperty("--rx", `${((0.5 - py) * 8).toFixed(2)}deg`);
    }
    function onLeave() {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    }

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    cleanups.push(() => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

/** Buttons shift a few px toward the cursor when it's nearby, even before hover. */
function setupMagneticButtons(reduced: boolean) {
  if (reduced) return () => {};
  const buttons = document.querySelectorAll<HTMLElement>(BUTTON_SELECTOR);
  const RADIUS = 90;
  const STRENGTH = 0.28;

  function onMove(e: MouseEvent) {
    buttons.forEach((btn) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < RADIUS) {
        const pull = 1 - dist / RADIUS;
        btn.style.transform = `translate(${(dx * STRENGTH * pull).toFixed(1)}px, ${(dy * STRENGTH * pull).toFixed(1)}px)`;
      } else {
        btn.style.transform = "translate(0, 0)";
      }
    });
  }
  window.addEventListener("mousemove", onMove, { passive: true });

  function onClick(e: MouseEvent) {
    const btn = (e.currentTarget as HTMLElement) ?? null;
    if (!btn) return;
    const ripple = document.createElement("span");
    ripple.className = "fx-ripple";
    const rect = btn.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  }
  buttons.forEach((btn) => {
    btn.classList.add("fx-magnetic-btn");
    btn.addEventListener("click", onClick);
  });

  return () => {
    window.removeEventListener("mousemove", onMove);
    buttons.forEach((btn) => btn.removeEventListener("click", onClick));
  };
}

/** Fades + slides sections and their direct children in, staggered, as they scroll into view. */
function setupScrollReveal(reduced: boolean) {
  const sections = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
  if (reduced) {
    sections.forEach((s) => s.classList.add("fx-revealed"));
    return () => {};
  }

  sections.forEach((section) => {
    section.classList.add("fx-reveal-section");
    const children = Array.from(
      section.querySelectorAll<HTMLElement>(
        ":scope > .wrap > *, :scope > * > .lp-hero-layout > *, :scope > .lp-container > *, :scope > .lp-container > [class*='lp-grid'] > *",
      ),
    );
    children.slice(0, 12).forEach((child, i) => {
      child.style.setProperty("--fx-delay", `${Math.min(i * 70, 420)}ms`);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fx-revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
  );
  sections.forEach((s) => observer.observe(s));
  return () => observer.disconnect();
}

/** Animates stat numbers counting up from 0 once scrolled into view. */
function setupCountUp(reduced: boolean) {
  const nodes = document.querySelectorAll<HTMLElement>(STAT_SELECTOR);
  if (nodes.length === 0) return () => {};

  function animate(el: HTMLElement) {
    const raw = el.textContent ?? "";
    const match = raw.match(/[\d,]+/);
    if (!match) return;
    const target = parseInt(match[0].replace(/,/g, ""), 10);
    if (Number.isNaN(target) || reduced) return;
    const prefix = raw.slice(0, match.index);
    const suffix = raw.slice((match.index ?? 0) + match[0].length);
    const duration = 2800;
    const start = performance.now();
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(target * eased);
      el.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = raw;
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 },
  );
  nodes.forEach((n) => observer.observe(n));
  return () => observer.disconnect();
}

/** Adds a one-shot diagonal shine sweep class on hover for screenshots/carousel slides. */
function setupShineSweep() {
  const targets = document.querySelectorAll<HTMLElement>(".lp-program .zoomable, .lp-program .cta-preview, .qbank-slide");
  targets.forEach((el) => el.classList.add("fx-shine"));
}

/**
 * Mount once per page. Applies magnetic card tilt + glow, magnetic buttons
 * with ripple, staggered scroll-reveal, animated stat count-up, and image
 * shine sweep — all via delegated listeners so no existing component markup
 * needs to change. Fully skipped/short-circuited under prefers-reduced-motion.
 */
export function PremiumFX() {
  useEffect(() => {
    const reduced = prefersReducedMotion();
    const id = requestAnimationFrame(() => {
      const cleanups = [
        setupMagneticCards(reduced),
        setupMagneticButtons(reduced),
        setupScrollReveal(reduced),
        setupCountUp(reduced),
      ];
      setupShineSweep();
      (window as unknown as { __fxCleanup?: Array<() => void> }).__fxCleanup = cleanups;
    });
    return () => {
      cancelAnimationFrame(id);
      const cleanups = (window as unknown as { __fxCleanup?: Array<() => void> }).__fxCleanup;
      cleanups?.forEach((fn) => fn());
    };
  }, []);

  return null;
}
