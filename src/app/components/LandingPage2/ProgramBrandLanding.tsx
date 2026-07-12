"use client";

import { useState } from "react";
import {
  DemoModal,
  FeatureStrip,
  ProgramBtn,
  ProgramFAQ,
  ProgramHowItWorks,
  ProgramTestimonials,
  QBankCarousel,
  ResourceGrid,
  StatsBar,
  ZoomableImage,
} from "./landing-v2-program-ui";
import {
  PROGRAMS,
  PROGRAM_FAQS,
  PROGRAM_QBANK_CAROUSEL,
  PROGRAM_RESOURCE_IMAGES_BY_INDEX,
  PROGRAM_TESTIMONIALS,
  programImageBase,
  type ExamTrack,
} from "./landing-v2-data";
import { LandingV2Chrome, type LandingV2ChromeActions } from "./landing-v2-chrome";
import { MonitorMockup } from "./monitor-mockup";
import { ScrollCinematicBackground } from "./scroll-cinematic-bg";
import { NeuralFrameBackground } from "./neural-frame-background";
import { Hero3DLazy } from "./hero-3d-scene-lazy";
import { PremiumFX } from "./premium-fx";

export interface ProgramBrandActions extends LandingV2ChromeActions {
  onBeginPrep: () => void;
}

function ProgramCTASection({
  track,
  actions,
}: {
  track: ExamTrack;
  actions: ProgramBrandActions;
}) {
  const base = programImageBase(track);
  const p = PROGRAMS[track];
  const title = track === "fcps" ? "FCPS-1 question bank" : "JCAT (MDMS) question bank";

  return (
    <section className="section cta">
      <div className="wrap">
        <div className="cta-preview">
          <ZoomableImage src={`${base}/cta-preview.png`} alt={`${p.badge} QBank preview`} />
        </div>
        <span className="eyebrow center">Start Preparing</span>
        <h2 style={{ fontSize: "1.9rem", marginBottom: 10, fontFamily: "Georgia, serif", textAlign: "center" }}>{title}</h2>
        <p style={{ color: "var(--mkt-text-muted)", textAlign: "center" }}>Full explanations for every option.</p>
        <div className="cta-buttons">
          <ProgramBtn size="lg" onClick={actions.onBeginPrep}>
            {track === "fcps" ? "Begin FCPS-1 Preparation" : "Begin JCAT (MDMS) Preparation"}
          </ProgramBtn>
          <ProgramBtn variant="ghost" size="lg" onClick={() => actions.onNavigateToProgram(track === "fcps" ? "jcat" : "fcps")}>
            {track === "fcps" ? "Explore JCAT (MDMS)" : "Explore FCPS-1"}
          </ProgramBtn>
        </div>
      </div>
    </section>
  );
}

export function ProgramBrandLanding({
  track,
  actions,
}: {
  track: ExamTrack;
  actions: ProgramBrandActions;
}) {
  const [demoOpen, setDemoOpen] = useState(false);
  const p = PROGRAMS[track];
  const base = programImageBase(track);

  const qbankImages = PROGRAM_QBANK_CAROUSEL.map((img) => ({
    src: img.src,
    alt: `${p.badge} — ${img.alt}`,
  }));

  const resourceItems = p.resources.map((r, i) => ({
    ...r,
    img: PROGRAM_RESOURCE_IMAGES_BY_INDEX[i] ?? `${base}/resource-${i + 1}.png`,
    alt: r.title,
  }));

  const beginLabel = track === "fcps" ? "Begin FCPS-1 Preparation" : "Begin JCAT (MDMS) Preparation";
  const pageTitle = track === "fcps" ? "FCPS-1 preparation" : "JCAT (MDMS) preparation";
  const testimonialHeading = track === "fcps" ? "What FCPS-1 candidates say" : "What JCAT (MDMS) candidates say";
  const faqEyebrow = track === "fcps" ? "FCPS-1 FAQ" : "JCAT (MDMS) FAQ";

  return (
    <LandingV2Chrome
      activePage={track}
      actions={actions}
      footerBlurb="Postgraduate medical examination preparation for FCPS-1 and JCAT (MDMS). Every option explained. Built for clinical excellence."
      footerBottomNote="Trusted for FCPS-1 & JCAT Preparation · Pakistan"
    >
      <div className="lp-program">
        <PremiumFX />
        {demoOpen && (
          <DemoModal
            badge={p.badge}
            onClose={() => setDemoOpen(false)}
            onSubmit={actions.onBeginPrep}
          />
        )}

        <section className="section" style={{ paddingBottom: 24, position: "relative" }}>
          {/* Hero-only cinematic background — scoped to this section (not
              the whole page) so sections further down use the normal
              theme background and stay readable in both light and dark
              mode. */}
          <NeuralFrameBackground />
          <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
            {/* This hero always sits on the dark neural-frame image (see
                NeuralFrameBackground above), regardless of site light/dark
                theme, so its text is pinned to fixed light colors here
                instead of the theme-following var(--mkt-text) tokens —
                same reasoning as the home page hero override. */}
            <span className="eyebrow-pill" style={{ color: "#f5f3ff" }}>
              <span className="eyebrow-dot" />
              {p.badge} · Medicine & Allied
            </span>
            <div className="split" style={{ alignItems: "center" }}>
              <div>
                <h1 style={{ fontSize: "2.6rem", lineHeight: 1.1, marginBottom: 18, fontFamily: "Georgia, serif", color: "#f5f3ff" }}>{pageTitle}</h1>
                <p style={{ color: "rgba(245,243,255,0.82)", marginBottom: 28, lineHeight: 1.7 }}>{p.heroSubtitle}</p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <ProgramBtn size="lg" onClick={actions.onBeginPrep}>
                    {beginLabel}
                  </ProgramBtn>
                  <ProgramBtn
                    variant="ghost"
                    size="lg"
                    onClick={() => setDemoOpen(true)}
                    style={{ color: "#f5f3ff", borderColor: "rgba(245,243,255,0.35)" }}
                  >
                    View Sample Questions
                  </ProgramBtn>
                </div>
              </div>
              <div className="monitor-mockup-wrap" style={{ position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
                  <Hero3DLazy variant={track} />
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <MonitorMockup alt={`${p.badge} QBank interface on desktop monitor`} />
                </div>
              </div>
            </div>
            <StatsBar stats={p.stats} />
          </div>
        </section>

        <section className="section section-surface">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow center">Inside The Question Bank</span>
              <h2>{p.qbankHeading}</h2>
              <p>{p.qbankText}</p>
            </div>
            <QBankCarousel images={qbankImages} />
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow center">Study Resources</span>
              <h2>{p.resourcesHeading}</h2>
              <p>{p.resourcesText}</p>
            </div>
            <ResourceGrid items={resourceItems} />
          </div>
        </section>

        <section className="section section-surface">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow center">Built Into Every Question</span>
              <h2>What you get with each item</h2>
            </div>
            <FeatureStrip items={p.cards} />
          </div>
        </section>

        <ProgramHowItWorks />
        <ProgramTestimonials items={PROGRAM_TESTIMONIALS[track]} heading={testimonialHeading} />
        <ProgramCTASection track={track} actions={actions} />
        <ProgramFAQ items={PROGRAM_FAQS[track]} eyebrow={faqEyebrow} />
      </div>
    </LandingV2Chrome>
  );
}