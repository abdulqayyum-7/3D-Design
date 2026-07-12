import type { CSSProperties, ReactNode } from "react";

export const LP = {
  /** Horizontal inset only — content spans the viewport between padding. */
  padX: "clamp(28px, 5vw, 72px)",
  /** Max width for long-form prose blocks (not the page shell). */
  prose: 720,
};

export const container: CSSProperties = {
  width: "100%",
  maxWidth: "none",
  margin: 0,
  paddingLeft: LP.padX,
  paddingRight: LP.padX,
};

export const sectionPad: CSSProperties = {
  paddingTop: "4.5rem",
  paddingBottom: "4.5rem",
};

export function Container({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`lp-container ${className}`.trim()} style={{ ...container, ...style }}>
      {children}
    </div>
  );
}

export function SectionHeader({
  children,
  align = "left",
}: {
  children: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`lp-section-header${align === "center" ? " lp-section-header--center" : ""}`}
    >
      {children}
    </div>
  );
}

export const LANDING_V2_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

  .medprep-landing-v2 {
    width: 100%;
    overflow-x: hidden;
    font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 17px;
    color: var(--mkt-text);
    -webkit-font-smoothing: antialiased;
    letter-spacing: -0.011em;
  }

  .medprep-landing-v2 h1,
  .medprep-landing-v2 h2,
  .medprep-landing-v2 h3,
  .medprep-landing-v2 h4 {
    font-family: inherit;
    font-weight: 600;
    letter-spacing: -0.025em;
    color: var(--mkt-text);
    line-height: 1.25;
  }

  .medprep-landing-v2 p {
    line-height: 1.6;
  }

  .lp-container {
    box-sizing: border-box;
  }

  .lp-kicker {
    display: block;
    font-size: 1rem;
    font-weight: 600;
    color: var(--mkt-accent);
    margin-bottom: 0.75rem;
    letter-spacing: 0;
    text-transform: none;
  }

  .lp-kicker--center {
    text-align: center;
  }

  .lp-section-header {
    max-width: none;
    margin: 0 0 2.5rem;
    text-align: left;
  }

  .lp-section-header--center {
    text-align: center;
    max-width: ${LP.prose}px;
    margin-left: auto;
    margin-right: auto;
  }

  .lp-section-header .lp-kicker--center {
    text-align: center;
  }

  .lp-section-lead {
    max-width: ${LP.prose}px;
  }

  .lp-section-header--center .lp-section-lead {
    margin-left: auto;
    margin-right: auto;
  }

  .lp-section-header p,
  .lp-section-lead {
    margin: 0.75rem 0 0;
    font-size: 1.125rem;
    line-height: 1.65;
    color: var(--mkt-text-muted);
    font-weight: 400;
  }

  .lp-hero {
    padding: 4.5rem 0 3.5rem;
  }

  .lp-hero-layout {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 2.75rem;
  }

  .lp-hero-copy {
    max-width: 42rem;
    margin: 0 auto;
    text-align: center;
    width: 100%;
  }

  .lp-hero-title {
    max-width: none;
    margin-left: auto;
    margin-right: auto;
  }

  .lp-hero-subtitle {
    max-width: 36rem;
    margin-left: auto;
    margin-right: auto;
  }

  .lp-hero-kicker {
    font-size: 1.0625rem;
    font-weight: 600;
    color: var(--mkt-accent);
    margin-bottom: 1rem;
  }

  .lp-hero-title {
    font-size: 2.375rem;
    font-weight: 700;
    line-height: 1.15;
    margin: 0 0 1rem;
    letter-spacing: -0.03em;
  }

  .lp-hero-subtitle {
    font-size: 1.1875rem;
    line-height: 1.65;
    color: var(--mkt-text-muted);
    margin: 0 0 1.25rem;
    font-weight: 400;
  }

  .lp-hero-punchlines {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 0.65rem;
    justify-content: center;
    margin: 0 auto 2rem;
    max-width: 42rem;
  }

  .lp-hero-punchline {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--mkt-text);
    background: var(--mkt-bg-elevated);
    border: 1px solid var(--mkt-border);
    border-radius: 999px;
    padding: 0.45rem 0.85rem;
    letter-spacing: -0.01em;
  }

  .lp-hero-punchline-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--mkt-accent);
    flex-shrink: 0;
  }

  .lp-hero-stats {
    display: flex;
    width: 100%;
    max-width: 52rem;
    margin: 0 auto;
    border: 1px solid var(--mkt-border);
    border-radius: 8px;
    overflow: hidden;
  }

  /* These boxes sit inside overflow:hidden bars (so corners stay rounded),
     which means a translateY lift would get clipped — scale + brighten +
     shadow instead, so hovering still visibly "pops" the box forward. */
  .hero-stat,
  .medprep-landing-v2 .lp-program .strip > div,
  .medprep-landing-v2 .lp-program .stats-bar .stat-item {
    transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease, background 0.22s ease;
  }
  .hero-stat:hover,
  .medprep-landing-v2 .lp-program .strip > div:hover,
  .medprep-landing-v2 .lp-program .stats-bar .stat-item:hover {
    transform: scale(1.045);
    box-shadow: 0 10px 26px rgba(15, 23, 42, 0.16);
    background: var(--mkt-accent-soft, var(--mkt-bg-elevated));
    position: relative;
    z-index: 2;
  }
  @media (prefers-reduced-motion: reduce) {
    .hero-stat, .medprep-landing-v2 .lp-program .strip > div, .medprep-landing-v2 .lp-program .stats-bar .stat-item,
    .hero-stat:hover, .medprep-landing-v2 .lp-program .strip > div:hover, .medprep-landing-v2 .lp-program .stats-bar .stat-item:hover {
      transform: none;
      box-shadow: none;
    }
  }

  .lp-mission {
    max-width: none;
    margin: 0;
    padding-left: 1.25rem;
    border-left: 3px solid var(--mkt-accent);
  }

  .lp-mission p {
    max-width: 960px;
  }

  .lp-mission p {
    font-size: 1.125rem;
    line-height: 1.65;
    font-weight: 400;
    color: var(--mkt-text);
    margin: 0;
  }

  .lp-faq {
    max-width: none;
    margin: 0;
  }

  .lp-cta-copy {
    max-width: ${LP.prose}px;
    margin: 0 auto;
  }

  .lp-step-card {
    padding: 1.25rem 1.125rem;
    background: var(--mkt-bg-elevated);
    border: 1px solid var(--mkt-border);
    border-radius: 8px;
  }

  .lp-step-num {
    font-size: 0.9375rem;
    font-weight: 700;
    color: var(--mkt-accent);
    font-variant-numeric: tabular-nums;
    margin-bottom: 0.75rem;
    letter-spacing: 0.02em;
  }

  .lp-section-title {
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 1.25;
    margin: 0;
    letter-spacing: -0.025em;
  }

  .lp-section-title--lg {
    font-size: 1.875rem;
  }

  .lp-body-lg {
    font-size: 1.125rem;
    line-height: 1.65;
    color: var(--mkt-text-muted);
    max-width: ${LP.prose}px;
  }

  .lp-stat-num {
    font-size: 2rem;
    font-weight: 700;
    color: var(--mkt-accent);
    line-height: 1;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
  }

  .lp-stat-label {
    font-size: 1rem;
    color: var(--mkt-text-muted);
    margin-top: 0.375rem;
    line-height: 1.45;
  }

  .feature-item h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--mkt-text);
    margin: 0;
  }

  .feature-item p {
    font-size: 0.9375rem;
    color: var(--mkt-text-muted);
    line-height: 1.55;
    margin: 0;
  }

  .lp-step-card h3 {
    font-size: 1.0625rem;
    font-weight: 600;
    margin-bottom: 0.375rem;
  }

  .lp-step-card p {
    font-size: 0.9375rem;
    color: var(--mkt-text-muted);
    line-height: 1.55;
  }

  .lp-pillar-card h3 {
    font-size: 1.0625rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--mkt-text);
  }

  .lp-pillar-card p {
    font-size: 0.9375rem;
    color: var(--mkt-text-muted);
    line-height: 1.55;
  }

  /* 3D depth on hover — cards lift and tilt slightly */
  .medprep-landing-v2 .lp-pillar-card,
  .medprep-landing-v2 .lp-highlight-card,
  .medprep-landing-v2 .lp-step-card,
  .medprep-landing-v2 .feature-item,
  .medprep-landing-v2 .lp-program .resource-card {
    transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease;
    will-change: transform;
  }
  .medprep-landing-v2 .lp-pillar-card:hover,
  .medprep-landing-v2 .lp-highlight-card:hover,
  .medprep-landing-v2 .lp-step-card:hover,
  .medprep-landing-v2 .feature-item:hover,
  .medprep-landing-v2 .lp-program .resource-card:hover {
    transform: perspective(800px) translateY(-6px) rotateX(3deg);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.14);
  }
  @media (prefers-reduced-motion: reduce) {
    .medprep-landing-v2 .lp-pillar-card,
    .medprep-landing-v2 .lp-highlight-card,
    .medprep-landing-v2 .lp-step-card,
    .medprep-landing-v2 .feature-item,
    .medprep-landing-v2 .lp-program .resource-card,
    .medprep-landing-v2 .lp-pillar-card:hover,
    .medprep-landing-v2 .lp-highlight-card:hover,
    .medprep-landing-v2 .lp-step-card:hover,
    .medprep-landing-v2 .feature-item:hover,
    .medprep-landing-v2 .lp-program .resource-card:hover {
      transform: none;
      transition: none;
    }
  }

  .lp-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(2rem, 4vw, 3.5rem);
    align-items: start;
  }

  .lp-grid-2 > .lp-split-copy {
    min-width: 0;
  }

  .lp-grid-2 > .lp-split-media {
    min-width: 0;
  }

  .lp-hero-cta {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 0.25rem;
  }

  .lp-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(1rem, 2vw, 1.5rem);
  }

  .lp-grid-4 {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(1rem, 2vw, 1.25rem);
  }

  .lp-pillar-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(1rem, 2vw, 1.25rem);
  }

  .lp-highlight-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(1rem, 2vw, 1.25rem);
    margin-top: 2.5rem;
  }

  .lp-highlight-card {
    padding: 1.375rem 1.25rem;
    background: var(--mkt-bg-elevated);
    border: 1px solid var(--mkt-border);
    border-radius: 8px;
    min-width: 0;
  }

  .lp-highlight-kicker {
    display: block;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--mkt-accent);
    margin-bottom: 0.625rem;
    letter-spacing: 0.01em;
  }

  .lp-highlight-card h3 {
    font-size: 1.0625rem;
    font-weight: 700;
    line-height: 1.35;
    margin: 0 0 0.625rem;
    letter-spacing: -0.02em;
    color: var(--mkt-text);
  }

  .lp-highlight-card p {
    font-size: 0.9375rem;
    color: var(--mkt-text-muted);
    line-height: 1.55;
    margin: 0;
  }

  .lp-callout-band {
    margin-top: 2.5rem;
    padding: 1.5rem 1.75rem;
    background: var(--mkt-bg);
    border: 1px solid var(--mkt-border);
    border-left: 3px solid var(--mkt-accent);
    border-radius: 8px;
  }

  .lp-callout-band .lp-block-title {
    margin-bottom: 0.625rem;
  }

  .feature-strip {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    border: 1px solid var(--mkt-border);
    border-radius: 8px;
    overflow: hidden;
    background: var(--mkt-bg-elevated);
  }

  .feature-item {
    min-width: 0;
  }

  .lp-image-frame {
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--mkt-border);
  }

  .lp-image-frame img {
    width: 100%;
    display: block;
    max-height: 480px;
    object-fit: cover;
  }

  @media (min-width: 1200px) {
    .lp-image-frame img {
      max-height: 560px;
    }
  }

  .lp-block-title {
    font-size: 1.375rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 0.75rem;
    letter-spacing: -0.02em;
    max-width: ${LP.prose}px;
  }

  .lp-grid-2 .lp-block-title,
  .lp-grid-2 .lp-body-lg {
    max-width: none;
  }

  .tab-switcher-inner {
    display: flex;
    width: 100%;
    max-width: none;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--mkt-border);
    flex-wrap: wrap;
  }

  .tab-switcher-inner button {
    flex: 1 1 200px;
  }

  @media (min-width: 900px) {
    .lp-hero {
      padding: 5rem 0 4rem;
    }

    .lp-hero-layout {
      gap: 3rem;
    }
  }

  @media (max-width: 899px) {
    .lp-hero-copy {
      text-align: center;
    }

    .lp-hero-title,
    .lp-hero-subtitle {
      max-width: none;
      margin-left: auto;
      margin-right: auto;
    }

    .lp-hero .cta-buttons {
      justify-content: center !important;
    }
  }

  @media (max-width: 768px) {
    .lp-hero-title {
      font-size: 1.875rem;
    }

    .lp-hero-subtitle {
      font-size: 1.0625rem;
    }

    .lp-section-title--lg {
      font-size: 1.5rem;
    }
  }

  .feature-item:last-child {
    border-right: none;
  }

  @media (max-width: 1100px) {
    .feature-strip {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .feature-item {
      border-right: none !important;
      border-bottom: 1px solid var(--mkt-border) !important;
    }
    .lp-pillar-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .lp-highlight-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .lp-grid-4 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 768px) {
    .nav-desktop { display: none !important; }
    .nav-mobile-toggle { display: flex !important; }
    .mobile-menu-overlay { display: block !important; }
    .lp-hero { padding: 3.5rem 0 2.5rem; }
    .lp-grid-2,
    .lp-grid-3,
    .lp-grid-4,
    .lp-pillar-grid,
    .lp-highlight-grid {
      grid-template-columns: 1fr !important;
    }
    .feature-strip {
      grid-template-columns: 1fr !important;
    }
    .program-tabs-hero {
      grid-template-columns: 1fr !important;
      padding: 2rem 1.5rem !important;
      gap: 2rem !important;
    }
    .program-stats {
      grid-template-columns: 1fr 1fr !important;
    }
    .footer-grid {
      grid-template-columns: 1fr !important;
    }
    .hero-stats,
    .lp-hero-stats {
      flex-wrap: wrap !important;
    }
    .hero-stat {
      flex: 1 1 45% !important;
      border-right: none !important;
      border-bottom: 1px solid var(--mkt-border) !important;
    }
    .cta-buttons {
      flex-direction: column !important;
      align-items: stretch !important;
    }
    .cta-buttons button,
    .cta-buttons a {
      width: 100% !important;
      max-width: 320px !important;
      margin: 0 auto !important;
    }
    .tab-switcher > div {
      flex-direction: column !important;
      width: 100% !important;
    }
    .tab-switcher button {
      border-right: none !important;
      border-bottom: 1px solid var(--mkt-border) !important;
    }
  }

  @media (min-width: 769px) {
    .nav-mobile-toggle { display: none !important; }
    .nav-desktop { display: flex !important; }
    .mobile-menu-overlay { display: none !important; }
  }

  /* ── FCPS / JCAT program brand pages ── */
  .medprep-landing-v2 .lp-program .wrap {
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .medprep-landing-v2 .lp-program .section { padding: 64px 24px; }
  .medprep-landing-v2 .lp-program .section-surface { background: var(--mkt-bg-elevated); }
  .medprep-landing-v2 .lp-program .section-head { text-align: center; margin-bottom: 40px; }
  .medprep-landing-v2 .lp-program .section-head h2 {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.9rem;
    margin-bottom: 10px;
    font-weight: 600;
  }
  .medprep-landing-v2 .lp-program .section-head p {
    color: var(--mkt-text-muted);
    max-width: 560px;
    margin: 0 auto;
    line-height: 1.7;
  }
  .medprep-landing-v2 .lp-program .eyebrow {
    font-family: monospace;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--mkt-accent);
    text-transform: uppercase;
    letter-spacing: 0.07em;
    display: block;
    margin-bottom: 12px;
  }
  .medprep-landing-v2 .lp-program .eyebrow.center { text-align: center; }
  .medprep-landing-v2 .lp-program .eyebrow-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: monospace;
    font-size: 0.75rem;
    color: var(--mkt-accent-hover);
    background: var(--mkt-badge-bg);
    border: 1px solid var(--mkt-accent);
    padding: 6px 14px;
    border-radius: 100px;
    margin-bottom: 20px;
  }
  .medprep-landing-v2 .lp-program .eyebrow-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--mkt-accent);
  }
  .medprep-landing-v2 .lp-program .split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }
  .medprep-landing-v2 .lp-program .split h1,
  .medprep-landing-v2 .lp-program .split h2 {
    font-family: Georgia, "Times New Roman", serif;
  }
  .medprep-landing-v2 .lp-program .stats-bar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-top: 40px;
  }
  .medprep-landing-v2 .lp-program .stat-num {
    font-family: Georgia, serif;
    font-size: 1.8rem;
    color: var(--mkt-text);
  }
  .medprep-landing-v2 .lp-program .stat-label {
    color: var(--mkt-text-muted);
    font-size: 0.82rem;
    margin-top: 2px;
  }
  .medprep-landing-v2 .lp-program .strip {
    display: flex;
    border: 1px solid var(--mkt-border);
    border-radius: 14px;
    overflow: hidden;
  }
  .medprep-landing-v2 .lp-program .strip > div {
    flex: 1;
    padding: 22px 16px;
    text-align: left;
    border-right: 1px solid var(--mkt-border);
  }
  .medprep-landing-v2 .lp-program .strip > div:last-child { border-right: none; }
  .medprep-landing-v2 .lp-program .card-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--mkt-badge-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
  }
  .medprep-landing-v2 .lp-program .shot {
    aspect-ratio: 16/10;
    width: 100%;
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid var(--mkt-border);
    background: var(--mkt-bg-elevated);
  }
  .medprep-landing-v2 .lp-program .shot img { width: 100%; height: 100%; object-fit: contain; }
  .medprep-landing-v2 .lp-program .shot-4-3 { aspect-ratio: 4/3; }
  .medprep-landing-v2 .lp-program .shot-frame { border-radius: 14px; overflow: hidden; }
  .medprep-landing-v2 .lp-program .steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  .medprep-landing-v2 .lp-program .step-num {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--mkt-accent);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
    margin-bottom: 14px;
  }
  .medprep-landing-v2 .lp-program .resource-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .medprep-landing-v2 .lp-program .resource-card {
    border: 1px solid var(--mkt-border);
    border-radius: 14px;
    overflow: hidden;
    background: var(--mkt-bg);
  }
  .medprep-landing-v2 .lp-program .resource-card-body { padding: 20px 22px 24px; }
  .medprep-landing-v2 .lp-program .resource-card-body h3 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .medprep-landing-v2 .lp-program .resource-card-body p {
    color: var(--mkt-text-muted);
    font-size: 0.86rem;
    line-height: 1.6;
  }
  .medprep-landing-v2 .lp-program .review-card {
    background: var(--mkt-bg);
    border: 1px solid var(--mkt-border);
    border-radius: 14px;
    padding: 22px;
  }
  .medprep-landing-v2 .lp-program .review-quote {
    color: var(--mkt-text);
    font-size: 0.92rem;
    line-height: 1.6;
    margin: 10px 0 16px;
  }
  .medprep-landing-v2 .lp-program .review-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .medprep-landing-v2 .lp-program .review-name { font-weight: 600; font-size: 0.88rem; }
  .medprep-landing-v2 .lp-program .review-role { font-size: 0.78rem; color: var(--mkt-text-muted); }
  .medprep-landing-v2 .lp-program .stars { display: flex; gap: 2px; }
  .medprep-landing-v2 .lp-program .faq-item { border-bottom: 1px solid var(--mkt-border); }
  .medprep-landing-v2 .lp-program .faq-q {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: none;
    border: none;
    cursor: pointer;
    padding: 18px 4px;
    text-align: left;
    font-family: Georgia, serif;
    font-size: 0.98rem;
    font-weight: 500;
    color: var(--mkt-text);
  }
  .medprep-landing-v2 .lp-program .faq-a {
    color: var(--mkt-text-muted);
    font-size: 0.9rem;
    line-height: 1.7;
    padding: 0 4px 18px;
    margin: 0;
  }
  .medprep-landing-v2 .lp-program .cta {
    text-align: center;
    background: var(--mkt-bg-elevated);
  }
  .medprep-landing-v2 .lp-program .cta-preview {
    max-width: 900px;
    margin: 0 auto 28px;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid var(--mkt-border);
    box-shadow: 0 12px 30px rgba(15,23,42,0.12);
  }
  .medprep-landing-v2 .lp-program .cta-preview img { width: 100%; display: block; }
  .medprep-landing-v2 .lp-program .cta-buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 24px;
  }
  .medprep-landing-v2 .lp-program .zoomable,
  .medprep-landing-v2 .lp-program .cta-preview {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
    will-change: transform;
  }
  .medprep-landing-v2 .lp-program .zoomable:hover,
  .medprep-landing-v2 .lp-program .cta-preview:hover {
    transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) scale(1.015);
    box-shadow: 0 24px 48px rgba(15, 23, 42, 0.18);
  }
  @media (prefers-reduced-motion: reduce) {
    .medprep-landing-v2 .lp-program .zoomable:hover,
    .medprep-landing-v2 .lp-program .cta-preview:hover {
      transform: none;
    }
  }
  .medprep-landing-v2 .lp-program .zoomable { position: relative; cursor: zoom-in; width: 100%; height: 100%; }
  .medprep-landing-v2 .lp-program .zoomable--inline { pointer-events: none; }
  .medprep-landing-v2 .lp-program .zoomable img { width: 100%; height: 100%; object-fit: cover; display: block; }
  /* Resource-card screenshots pan slowly left↔right, LED-ticker style, so
     content that would otherwise be cropped by object-fit: cover eventually
     scrolls fully into view. */
  .medprep-landing-v2 .lp-program .shot .zoomable img {
    width: 148%;
    max-width: none;
    height: 100%;
    object-fit: cover;
    object-position: left center;
    animation: shot-marquee-pan 17s ease-in-out infinite alternate;
  }
  .medprep-landing-v2 .lp-program .resource-card:hover .shot .zoomable img {
    animation-play-state: paused;
  }
  @keyframes shot-marquee-pan {
    0%, 8% { transform: translateX(0); }
    92%, 100% { transform: translateX(-32.4%); }
  }
  @media (prefers-reduced-motion: reduce) {
    .medprep-landing-v2 .lp-program .shot .zoomable img {
      width: 100%;
      animation: none;
      transform: none;
    }
  }
  .medprep-landing-v2 .lp-program .zoom-hint {
    position: absolute;
    bottom: 12px;
    right: 12px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: rgba(15,23,42,0.75);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity .15s;
    pointer-events: none;
  }
  .medprep-landing-v2 .lp-program .zoomable:hover .zoom-hint { opacity: 1; }
  .medprep-landing-v2 .lp-program .qbank-carousel { position: relative; display: flex; align-items: center; justify-content: center; padding: 0 60px; }
  .medprep-landing-v2 .lp-program .qbank-stage { position: relative; width: 100%; max-width: 720px; height: 250px; display: flex; align-items: center; justify-content: center; }
  .medprep-landing-v2 .lp-program .qbank-slide {
    position: absolute;
    border-radius: 14px;
    border: 1px solid var(--mkt-border);
    overflow: hidden;
    cursor: pointer;
    transition: all .4s ease;
    background: var(--mkt-bg-elevated);
  }
  .medprep-landing-v2 .lp-program .qbank-slide img { width: 100%; height: 100%; display: block; object-fit: cover; }
  .medprep-landing-v2 .lp-program .qbank-slide.is-center { width: 76%; aspect-ratio: 2.4/1; box-shadow: 0 18px 40px rgba(15,23,42,0.18); z-index: 3; cursor: zoom-in; transform: translateX(0) scale(1); opacity: 1; }
  .medprep-landing-v2 .lp-program .qbank-slide.is-prev { width: 58%; aspect-ratio: 2.4/1; transform: translateX(-58%) scale(0.86); opacity: 0.55; z-index: 2; }
  .medprep-landing-v2 .lp-program .qbank-slide.is-next { width: 58%; aspect-ratio: 2.4/1; transform: translateX(58%) scale(0.86); opacity: 0.55; z-index: 2; }
  .medprep-landing-v2 .lp-program .qbank-slide.is-hidden { opacity: 0; pointer-events: none; z-index: 1; }
  .medprep-landing-v2 .lp-program .qbank-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: var(--mkt-bg);
    border: 1px solid var(--mkt-border);
    color: var(--mkt-text-muted);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 4;
  }
  .medprep-landing-v2 .lp-program .qbank-arrow.left { left: 0; }
  .medprep-landing-v2 .lp-program .qbank-arrow.right { right: 0; }
  .medprep-landing-v2 .lp-program .qbank-dots { display: flex; justify-content: center; gap: 8px; margin-top: 22px; }
  .medprep-landing-v2 .lp-program .qbank-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--mkt-border); border: none; cursor: pointer; padding: 0; }
  .medprep-landing-v2 .lp-program .qbank-dot.active { background: var(--mkt-accent); width: 20px; border-radius: 4px; }
  .medprep-landing-v2 .lp-program .testi-carousel { display: flex; align-items: center; gap: 16px; }
  .medprep-landing-v2 .lp-program .testi-track { flex: 1; overflow: hidden; }
  .medprep-landing-v2 .lp-program .testi-page { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .medprep-landing-v2 .lp-program .testi-arrow {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--mkt-bg);
    border: 1px solid var(--mkt-border);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .medprep-landing-v2 .lp-program .testi-dots { display: flex; justify-content: center; gap: 8px; margin-top: 28px; }
  .medprep-landing-v2 .lp-program .testi-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--mkt-border); border: none; cursor: pointer; padding: 0; }
  .medprep-landing-v2 .lp-program .testi-dot.active { background: var(--mkt-accent); width: 20px; border-radius: 4px; }
  .medprep-landing-v2 .lp-program .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15,23,42,0.55);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .medprep-landing-v2 .lp-program .modal-card {
    background: var(--mkt-bg);
    border-radius: 14px;
    width: 100%;
    max-width: 480px;
    padding: 36px 32px;
    position: relative;
    box-shadow: 0 20px 60px rgba(15,23,42,0.25);
  }
  .medprep-landing-v2 .lp-program .modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--mkt-text-muted);
  }
  .medprep-landing-v2 .lp-program .modal-brand { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 22px; }
  .medprep-landing-v2 .lp-program .modal-title { font-size: 1.15rem; text-align: center; margin-bottom: 24px; line-height: 1.4; font-family: Georgia, serif; }
  .medprep-landing-v2 .lp-program .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
  .medprep-landing-v2 .lp-program .field label { display: block; font-size: 0.82rem; color: var(--mkt-text-muted); font-weight: 500; }
  .medprep-landing-v2 .lp-program .field input,
  .medprep-landing-v2 .lp-program .field select {
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid var(--mkt-border);
    font-family: inherit;
    font-size: 0.9rem;
    color: var(--mkt-text);
    background: var(--mkt-bg);
    margin-top: 6px;
  }
  .medprep-landing-v2 .lp-program .required { color: #DC2626; }
  .medprep-landing-v2 .lp-program .brand-mark {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background: var(--mkt-accent);
    display: inline-block;
  }
  .medprep-landing-v2 .nav-link-active { color: var(--mkt-text) !important; font-weight: 600; }

  @media (max-width: 900px) {
    .medprep-landing-v2 .lp-program .stats-bar { grid-template-columns: repeat(2, 1fr); }
    .medprep-landing-v2 .lp-program .resource-grid { grid-template-columns: 1fr; }
    .medprep-landing-v2 .lp-program .testi-page { grid-template-columns: 1fr 1fr; }
    .medprep-landing-v2 .lp-program .split { grid-template-columns: 1fr; gap: 28px; }
    .medprep-landing-v2 .lp-program .steps { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 640px) {
    .medprep-landing-v2 .lp-program .strip { flex-direction: column; }
    .medprep-landing-v2 .lp-program .strip > div { border-right: none; border-bottom: 1px solid var(--mkt-border); }
    .medprep-landing-v2 .lp-program .testi-page { grid-template-columns: 1fr; }
    .medprep-landing-v2 .lp-program .field-row { grid-template-columns: 1fr; }
    .medprep-landing-v2 .lp-program .qbank-carousel { padding: 0 44px; }
    .medprep-landing-v2 .lp-program .qbank-stage { height: 190px; }
  }

  .medprep-landing-v2 .lp-program .faq-chevron {
    transition: transform .2s;
    display: inline-flex;
  }
  .medprep-landing-v2 .lp-program .faq-chevron.open { transform: rotate(90deg); }

  .medprep-landing-v2 .lightbox-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15,23,42,0.88);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .medprep-landing-v2 .lightbox-close {
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(255,255,255,0.12);
    border: none;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 201;
  }
  .medprep-landing-v2 .lightbox-frame { max-width: min(1100px, 96vw); max-height: 90vh; }
  .medprep-landing-v2 .lightbox-img { max-width: 100%; max-height: 90vh; display: block; border-radius: 10px; }

  /* ── iMac-style monitor mockup (program hero + lightbox; global BEM so portal dialog matches) ── */
  .monitor-mockup {
    position: relative;
    width: 100%;
    max-width: 560px;
    margin: 0 auto;
    padding: 8px 4px 0;
  }
  .monitor-mockup__shell {
    background: linear-gradient(165deg, #f2f2f4 0%, #e2e2e6 42%, #cbcbd1 100%);
    border-radius: 20px 20px 0 0;
    padding: 11px 11px 0;
    box-shadow:
      0 1px 0 rgba(255,255,255,0.75) inset,
      0 22px 44px rgba(15,23,42,0.16);
  }
  .monitor-mockup__bezel {
    background: #12151a;
    border-radius: 8px 8px 0 0;
    padding: 6px 6px 0;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.05) inset;
  }
  .monitor-mockup__screen {
    overflow: hidden;
    border-radius: 3px 3px 0 0;
    background: #fff;
    line-height: 0;
  }
  .monitor-mockup__screen img {
    width: 100%;
    height: auto;
    display: block;
    vertical-align: top;
  }
  .monitor-mockup__chin {
    height: 26px;
    background: linear-gradient(180deg, #dddde2 0%, #b9b9c0 100%);
    border-radius: 0 0 16px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .monitor-mockup__camera {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #8b919a;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.15);
  }
  .monitor-mockup__neck {
    width: 84px;
    height: 58px;
    background: linear-gradient(90deg, #aeb0b6 0%, #ececf0 38%, #fafafc 50%, #ececf0 62%, #aeb0b6 100%);
    clip-path: polygon(16% 0%, 84% 0%, 100% 100%, 0% 100%);
    margin-top: -1px;
  }
  .monitor-mockup__foot {
    width: 168px;
    height: 14px;
    background: linear-gradient(180deg, #c9c9cf 0%, #a3a3aa 100%);
    border-radius: 0 0 50% 50% / 0 0 100% 100%;
    box-shadow: 0 8px 18px rgba(15,23,42,0.14);
  }
  .medprep-landing-v2 .monitor-mockup-wrap {
    position: relative;
    padding: 12px 0 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1600px;
    animation: monitor-idle-float 6s ease-in-out infinite;
  }
  @keyframes monitor-idle-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .medprep-landing-v2 .monitor-mockup-wrap { animation: none; }
  }
  .medprep-landing-v2 .monitor-mockup-wrap .monitor-mockup {
    transition: transform 0.15s ease-out;
    transform-style: preserve-3d;
    will-change: transform;
  }
  .medprep-landing-v2 .monitor-mockup-wrap::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 90% 70% at 15% 40%, rgba(var(--color-primary-400-rgb),0.07) 0%, transparent 58%),
      radial-gradient(ellipse 80% 60% at 88% 65%, rgba(100,116,139,0.06) 0%, transparent 52%);
    pointer-events: none;
    z-index: 0;
  }
  .monitor-mockup__stand {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .monitor-mockup__shadow {
    position: absolute;
    left: 50%;
    bottom: 4px;
    transform: translateX(-50%);
    width: 68%;
    height: 16px;
    background: radial-gradient(ellipse at center, rgba(15,23,42,0.2) 0%, transparent 72%);
    pointer-events: none;
  }
  .medprep-landing-v2 .monitor-mockup-wrap .monitor-mockup {
    position: relative;
    z-index: 1;
  }

  .monitor-mockup-trigger {
    display: block;
    width: 100%;
    max-width: 560px;
    margin: 0 auto;
    padding: 0;
    border: none;
    background: none;
    cursor: zoom-in;
    position: relative;
    font: inherit;
    text-align: inherit;
  }

  .monitor-mockup-trigger:focus-visible {
    outline: 2px solid var(--mkt-accent);
    outline-offset: 4px;
    border-radius: 12px;
  }

  .monitor-mockup-zoom-hint {
    position: absolute;
    bottom: 18%;
    right: 8%;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(15, 23, 42, 0.78);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.15s ease;
    pointer-events: none;
    z-index: 2;
  }

  .monitor-mockup-trigger:hover .monitor-mockup-zoom-hint,
  .monitor-mockup-trigger:focus-visible .monitor-mockup-zoom-hint {
    opacity: 1;
  }

  .monitor-mockup--lightbox {
    max-width: min(1000px, 92vw);
    margin: 0 auto;
    padding-top: 0;
  }

  .monitor-mockup-dialog {
    overflow: visible;
    width: min(calc(100vw - 2rem), 1200px) !important;
    max-width: min(calc(100vw - 2rem), 1200px) !important;
  }

  .landing-v2-lightbox-close {
    position: fixed;
    top: 1.25rem;
    right: 1.25rem;
    z-index: 102;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
    margin: 0;
    border: none;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.72);
    color: #fff;
    cursor: pointer;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
    transition: background 0.15s ease, transform 0.15s ease;
  }

  .landing-v2-lightbox-close:hover {
    background: rgba(15, 23, 42, 0.88);
    transform: scale(1.04);
  }

  .landing-v2-lightbox-close:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  .landing-v2-lightbox-close svg {
    display: block;
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }

  .landing-v2-image-dialog {
    overflow: visible;
  }

  .landing-v2-gallery-dialog {
    overflow: visible;
    width: min(calc(100vw - 2rem), 1440px) !important;
    max-width: min(calc(100vw - 2rem), 1440px) !important;
    max-height: 96vh;
  }

  .landing-v2-gallery-dialog--nav {
    width: min(calc(100vw - 1rem), 1520px) !important;
    max-width: min(calc(100vw - 1rem), 1520px) !important;
  }

  .landing-v2-lightbox-shell {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
  }

  .landing-v2-lightbox-shell.has-nav .landing-v2-lightbox-main {
    flex: 1;
    min-width: 0;
  }

  .landing-v2-lightbox-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  .landing-v2-lightbox-scroll {
    width: 100%;
    max-height: min(92vh, calc(100vh - 2rem));
    overflow-y: auto;
    overflow-x: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.04);
  }

  .landing-v2-lightbox-scroll img {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
    margin: 0 auto;
    object-fit: contain;
  }

  .landing-v2-lightbox-arrow {
    position: relative;
    flex-shrink: 0;
    align-self: center;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
    margin: 0;
    border: none;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.72);
    color: #fff;
    cursor: pointer;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
    transition: background 0.15s ease, transform 0.15s ease;
  }

  .landing-v2-lightbox-arrow:hover {
    background: rgba(15, 23, 42, 0.88);
    transform: scale(1.04);
  }

  .landing-v2-lightbox-arrow:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  .landing-v2-lightbox-counter {
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.72);
    color: #fff;
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    pointer-events: none;
  }

  @media (max-width: 640px) {
    .landing-v2-lightbox-shell {
      gap: 8px;
    }
    .landing-v2-lightbox-arrow {
      width: 2.25rem;
      height: 2.25rem;
    }
  }

  @media (max-width: 900px) {
    .monitor-mockup { max-width: 440px; }
    .monitor-mockup__neck { height: 44px; width: 64px; }
    .monitor-mockup__foot { width: 128px; }
    .monitor-mockup--lightbox { max-width: min(92vw, 640px); }
  }

  /* Let the cinematic scroll background show through; sections become frosted glass panels.
     Placed last on purpose so it wins over the opaque .section-surface rule above. */
  .medprep-landing-v2 {
    background: transparent !important;
  }
  .medprep-landing-v2 .lp-program .section,
  .medprep-landing-v2 .lp-program .section-surface {
    background: rgba(255, 255, 255, 0.72) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  .dark .medprep-landing-v2 .lp-program .section,
  .dark .medprep-landing-v2 .lp-program .section-surface {
    background: rgba(15, 23, 42, 0.6) !important;
  }

  /* ── Premium FX (magnetic cards, buttons, scroll reveal, shine) ── */
  .fx-magnetic-card {
    position: relative;
    transition: transform 0.2s ease-out, box-shadow 0.2s ease;
    transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  }
  .fx-magnetic-card::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.25s ease;
    background: radial-gradient(180px circle at var(--mx, 50%) var(--my, 50%), rgba(var(--color-primary-400-rgb), 0.16), transparent 70%);
  }
  .fx-magnetic-card:hover::after { opacity: 1; }
  .fx-magnetic-card:hover {
    box-shadow: 0 22px 44px rgba(15, 23, 42, 0.16);
  }

  .fx-magnetic-btn {
    transition: transform 0.12s ease-out;
    position: relative;
    overflow: hidden;
  }
  .fx-ripple {
    position: absolute;
    width: 10px;
    height: 10px;
    margin: -5px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.55);
    transform: scale(0);
    animation: fx-ripple-anim 0.6s ease-out;
    pointer-events: none;
  }
  @keyframes fx-ripple-anim {
    to { transform: scale(16); opacity: 0; }
  }

  .fx-reveal-section > .wrap > *,
  .fx-reveal-section.lp-hero > * > .lp-hero-layout > *,
  .fx-reveal-section > .lp-container > *,
  .fx-reveal-section > .lp-container > [class*="lp-grid"] > * {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 0.6s ease var(--fx-delay, 0ms), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) var(--fx-delay, 0ms);
  }
  .fx-reveal-section.fx-revealed > .wrap > *,
  .fx-reveal-section.fx-revealed.lp-hero > * > .lp-hero-layout > *,
  .fx-reveal-section.fx-revealed > .lp-container > *,
  .fx-reveal-section.fx-revealed > .lp-container > [class*="lp-grid"] > * {
    opacity: 1;
    transform: translateY(0);
  }

  .fx-shine,
  .fx-sweep {
    position: relative;
    overflow: hidden;
  }
  .fx-shine::before,
  .fx-sweep::before {
    content: "";
    position: absolute;
    top: 0;
    left: -60%;
    width: 40%;
    height: 100%;
    background: linear-gradient(115deg, transparent, rgba(255, 255, 255, 0.35), transparent);
    transform: skewX(-20deg);
    transition: left 0.7s ease;
    pointer-events: none;
  }
  .fx-shine:hover::before,
  .fx-sweep:hover::before {
    left: 130%;
  }

  @media (prefers-reduced-motion: reduce) {
    .fx-magnetic-card,
    .fx-magnetic-btn,
    .fx-reveal-section > * > *,
    .fx-reveal-section > * {
      transform: none !important;
      transition: none !important;
      opacity: 1 !important;
    }
    .fx-shine::before { display: none; }
  }
  .medprep-landing-v2 .lp-pillar-card:hover,
  .medprep-landing-v2 .lp-highlight-card:hover,
  .medprep-landing-v2 .lp-step-card:hover,
  .medprep-landing-v2 .feature-item:hover,
  .medprep-landing-v2 .lp-program .resource-card:hover {
    transform: perspective(900px) rotateX(var(--rx, 3deg)) rotateY(var(--ry, 0deg)) translateY(-6px);
    box-shadow: 0 22px 44px rgba(15, 23, 42, 0.16);
  }

  /* Pop-forward hover for the remaining box-style elements: testimonial
     cards, the callout band, and the fx-sweep boxes used by the program
     "what you get" strip and the How It Works steps. */
  .medprep-landing-v2 .lp-testimonial-card,
  .medprep-landing-v2 .lp-callout-band,
  .medprep-landing-v2 .fx-sweep {
    transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease;
    will-change: transform;
  }
  .medprep-landing-v2 .lp-testimonial-card:hover,
  .medprep-landing-v2 .lp-callout-band:hover,
  .medprep-landing-v2 .fx-sweep:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.16);
    position: relative;
    z-index: 2;
  }
  @media (prefers-reduced-motion: reduce) {
    .medprep-landing-v2 .lp-testimonial-card,
    .medprep-landing-v2 .lp-callout-band,
    .medprep-landing-v2 .fx-sweep,
    .medprep-landing-v2 .lp-testimonial-card:hover,
    .medprep-landing-v2 .lp-callout-band:hover,
    .medprep-landing-v2 .fx-sweep:hover {
      transform: none;
      box-shadow: none;
    }
  }

  /* Custom dark-teal visual updates (appended rules) */
  .medprep-landing-v2 {
    background: var(--mkt-bg);
    position: relative;
    z-index: 1;
  }

  .medprep-landing-v2::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.35;
    background-image: radial-gradient(rgba(var(--color-primary-400-rgb), 0.35) 1px, transparent 1px);
    background-size: 26px 26px;
    animation: dot-grid-drift 40s linear infinite;
  }
  @keyframes dot-grid-drift {
    from { background-position: 0 0; }
    to { background-position: 260px 260px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .medprep-landing-v2::after { animation: none; }
  }

  .dark .medprep-landing-v2::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(60% 40% at 30% 18%, rgba(var(--color-primary-400-rgb),0.10), transparent 18%),
      radial-gradient(50% 35% at 82% 12%, rgba(var(--color-primary-400-rgb),0.06), transparent 20%),
      linear-gradient(180deg, rgba(6,16,20,0.4), rgba(6,16,20,0.65));
    mix-blend-mode: overlay;
    z-index: 0;
  }

  .medprep-landing-v2 > * { position: relative; z-index: 1; }

  .medprep-landing-v2 .lp-highlight-card,
  .medprep-landing-v2 .lp-step-card,
  .medprep-landing-v2 .lp-pillar-card,
  .medprep-landing-v2 .feature-item,
  .medprep-landing-v2 .lp-callout-band,
  .medprep-landing-v2 .lp-program .resource-card,
  .medprep-landing-v2 .lp-program .review-card {
    background: var(--mkt-bg-elevated);
    border: 1px solid var(--mkt-border);
    box-shadow: 0 12px 30px rgba(2,6,10,0.08);
    color: var(--mkt-text);
  }
  .dark .medprep-landing-v2 .lp-highlight-card,
  .dark .medprep-landing-v2 .lp-step-card,
  .dark .medprep-landing-v2 .lp-pillar-card,
  .dark .medprep-landing-v2 .feature-item,
  .dark .medprep-landing-v2 .lp-callout-band,
  .dark .medprep-landing-v2 .lp-program .resource-card,
  .dark .medprep-landing-v2 .lp-program .review-card {
    background: #0f1a1f;
    border: 1px solid rgba(var(--color-primary-400-rgb), 0.12);
    box-shadow: 0 12px 30px rgba(2,6,10,0.6);
  }

  .lp-stat { display:flex; flex-direction:column; align-items:center; gap:6px; }
  .lp-stat .stat-icon { width:36px; height:36px; display:flex; align-items:center; justify-content:center; color: var(--mkt-accent); }
  .lp-stat .lp-stat-num { color: var(--mkt-accent); }

  .lp-hero { position: relative; overflow: visible; }
  .lp-hero::before,
  .lp-hero::after {
    content: "";
    position: absolute;
    width: 320px;
    height: 320px;
    opacity: 0.12;
    filter: blur(36px);
    pointer-events: none;
    mix-blend-mode: screen;
    z-index:0;
  }
  .lp-hero::before { left: -6%; top: -6%; background: radial-gradient(circle at 30% 30%, rgba(var(--color-primary-400-rgb),0.14), rgba(0,0,0,0) 40%); transform: rotate(-6deg); }
  .lp-hero::after { right: -6%; top: -4%; background: radial-gradient(circle at 70% 30%, rgba(var(--color-primary-400-rgb),0.10), rgba(0,0,0,0) 40%); transform: rotate(8deg); }

  .lp-cta-panel,
  .medprep-landing-v2 .lp-cta {
    background: linear-gradient(135deg, rgba(var(--color-primary-700-rgb),0.14), rgba(var(--color-primary-500-rgb),0.06));
    border: 1px solid rgba(var(--color-primary-400-rgb),0.12);
    padding: 28px;
    border-radius: 14px;
  }

  @keyframes slide-in-lr {
    from { transform: translateX(-18px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slide-in-rl {
    from { transform: translateX(18px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  .lp-image-frame img,
  .lp-highlight-card,
  .lp-pillar-card,
  .lp-step-card,
  .feature-item {
    animation: slide-in-lr 640ms cubic-bezier(0.2,0.9,0.2,1) both;
  }
  .lp-image-frame img:nth-child(even),
  .lp-highlight-card:nth-child(even),
  .lp-pillar-card:nth-child(even),
  .lp-step-card:nth-child(even),
  .feature-item:nth-child(even) {
    animation-name: slide-in-rl;
  }

  .fx-magnetic-card::after {
    background: radial-gradient(180px circle at var(--mx,50%) var(--my,50%), rgba(var(--color-primary-500-rgb),0.14), transparent 70%);
  }

  .dark .medprep-landing-v2 .lp-program .section,
  .dark .medprep-landing-v2 .lp-program .section-surface {
    background: linear-gradient(180deg, rgba(5,12,16,0.72), rgba(9,18,22,0.5));
    border: 1px solid rgba(var(--color-primary-400-rgb),0.08);
    backdrop-filter: blur(8px);
  }

  @media (prefers-reduced-motion: reduce) {
    .lp-image-frame img,
    .lp-highlight-card,
    .lp-pillar-card,
    .lp-step-card,
    .feature-item { animation: none !important; transform: none !important; }
  }

  /* Decorative hero corner accents (use images in /public/demo/images/landing-v2/ if present) */
  .lp-hero-decor { position: absolute; width: 180px; height: 180px; opacity: 0.16; pointer-events: none; filter: grayscale(100%) contrast(0.9) brightness(0.95); mix-blend-mode: screen; z-index: 0; }
  .lp-hero-decor--tl { left: 2%; top: -2%; background-position: left top; background-size: contain; background-repeat: no-repeat; }
  .lp-hero-decor--tr { right: 3%; top: -6%; background-position: right top; background-size: contain; background-repeat: no-repeat; }
  /* If images are available, place them here (not added by default): */
  .lp-hero-decor--tl { background-image: url('/demo/images/landing-v2/stethoscope.png'); }
  .lp-hero-decor--tr { background-image: url('/demo/images/landing-v2/dna-helix.png'); }

  /* Right-side 3D heart accent — no card/background, just the model itself,
     faded at the edges via mask so it blends into the hero rather than
     reading as a hard rectangle. Shrinks and re-centers on smaller screens
     so it never competes with or overlaps the (still centered) copy. */
  .lp-hero-heart-visual {
    transition: opacity 0.4s ease;
  }
  @media (max-width: 1100px) {
    .lp-hero-heart-visual {
      width: 450px !important;
      height: 450px !important;
      top: -5% !important;
      right: -5% !important;
    }
  }
  @media (max-width: 768px) {
    .lp-hero-heart-visual {
      width: 330px !important;
      height: 330px !important;
      top: -7% !important;
      right: -2% !important;
      opacity: 0.8;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .lp-hero-heart-visual { opacity: 0.9; }
  }

  /* Home hero stethoscope glyph — a slow, gentle float + sway so it feels
     alive without being distracting. */
  .lp-hero-stethoscope {
    animation: hero-stethoscope-float 9s ease-in-out infinite;
    transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.4s ease;
  }
  .lp-hero-stethoscope:hover {
    animation-play-state: paused;
    transform: rotate(18deg) scale(1.18) !important;
    filter: drop-shadow(0 0 18px rgba(139, 92, 246, 0.5));
  }
  @keyframes hero-stethoscope-float {
    0%, 100% { transform: translateY(0) rotate(-3deg); }
    50% { transform: translateY(-10px) rotate(3deg); }
  }
  @media (prefers-reduced-motion: reduce) {
    .lp-hero-stethoscope { animation: none; }
  }
  
  /* Enhance interactive program/carousel areas with hover + motion effects */
  .medprep-landing-v2 .lp-program .qbank-stage { perspective: 1200px; }
  .medprep-landing-v2 .lp-program .qbank-slide {
    will-change: transform, opacity;
    transition: transform 420ms cubic-bezier(.2,.9,.2,1), opacity 420ms ease, box-shadow 420ms ease;
    transform-origin: center center;
  }
  .medprep-landing-v2 .lp-program .qbank-slide:hover {
    transform: translateY(-8px) scale(1.02) rotateZ(-0.6deg);
    box-shadow: 0 28px 60px rgba(2,6,10,0.6);
    z-index: 6 !important;
    opacity: 1 !important;
  }
  /* When container hovered, nudge side slides to give a flowing motion */
  .medprep-landing-v2 .lp-program .qbank-stage:hover .qbank-slide.is-prev { transform: translateX(-68%) scale(0.82) rotateY(6deg) translateY(-6px); opacity: .6; }
  .medprep-landing-v2 .lp-program .qbank-stage:hover .qbank-slide.is-next { transform: translateX(68%) scale(0.82) rotateY(-6deg) translateY(-6px); opacity: .6; }

  /* Auto-flow option: add class 'qbank-auto' to parent to enable smooth continuous pan */
  @keyframes qbank-pan {
    0% { transform: translateX(0); }
    100% { transform: translateX(-20%); }
  }
  .medprep-landing-v2 .lp-program .qbank-stage.qbank-auto .qbank-slide {
    animation: qbank-pan 12s linear infinite alternate;
    opacity: 0.95;
  }

  /* Shots and resource cards: subtle lift + shine on hover */
  .medprep-landing-v2 .lp-program .shot,
  .medprep-landing-v2 .lp-program .resource-card,
  .medprep-landing-v2 .lp-program .review-card {
    transition: transform .36s cubic-bezier(.2,.9,.2,1), box-shadow .36s ease, border-color .36s ease;
    will-change: transform;
  }
  .medprep-landing-v2 .lp-program .shot:hover,
  .medprep-landing-v2 .lp-program .resource-card:hover,
  .medprep-landing-v2 .lp-program .review-card:hover {
    transform: translateY(-10px) scale(1.01);
    box-shadow: 0 28px 60px rgba(2,6,10,0.55);
    border-color: rgba(var(--color-primary-400-rgb),0.12);
  }

  /* Testimonial track: gentle auto-scroll when .testi-auto is present */
  @keyframes testi-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-33%); }
  }
  .medprep-landing-v2 .lp-program .testi-track.testi-auto .testi-page { display: flex; gap: 20px; animation: testi-scroll 18s linear infinite; }

  /* Respect reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .medprep-landing-v2 .lp-program .qbank-stage.qbank-auto .qbank-slide,
    .medprep-landing-v2 .lp-program .testi-track.testi-auto .testi-page { animation: none !important; }
    .medprep-landing-v2 .lp-program .qbank-slide:hover,
    .medprep-landing-v2 .lp-program .shot:hover,
    .medprep-landing-v2 .lp-program .resource-card:hover,
    .medprep-landing-v2 .lp-program .review-card:hover { transform: none; box-shadow: none; }
  }

  /* The neural-frame hero background is always a dark photographic image,
     regardless of site light/dark mode — so hero text that sits DIRECTLY
     on that image (no card/pill behind it) must stay light-colored
     unconditionally, rather than following --mkt-text (which correctly
     turns dark in light mode elsewhere, but would be invisible against
     this always-dark backdrop).
     NOTE: .lp-hero-punchline is deliberately excluded from this list — those
     pills have their own opaque, theme-aware background
     (var(--mkt-bg-elevated), e.g. white in light mode), so they should keep
     following --mkt-text normally. Forcing them light too made the text
     invisible against their own white background in light mode. */
  .medprep-landing-v2 .lp-hero .lp-hero-title,
  .medprep-landing-v2 .lp-hero .lp-hero-subtitle,
  .medprep-landing-v2 .lp-hero .lp-hero-kicker {
    color: #f5f3ff;
  }
  .medprep-landing-v2 .lp-hero .lp-hero-subtitle strong {
    color: #ffffff !important;
  }
`;