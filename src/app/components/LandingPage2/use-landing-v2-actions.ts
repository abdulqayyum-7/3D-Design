"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { ExamTrack } from "./landing-v2-data";
import type { MedPrepLandingActions } from "./MedPrepAILanding";
import type { ProgramBrandActions } from "./ProgramBrandLanding";

/**
 * Standalone version of the landing-page actions hook — no auth/backend
 * dependency. Every "Sign in" / "Dashboard" / "Start" button routes to a
 * placeholder path so nothing crashes; swap these callbacks for real URLs
 * (e.g. your deployed app's /login and /dashboard) whenever you wire this
 * landing page up to the real product.
 */
export function useLandingV2Actions() {
  const router = useRouter();
  const isAuthenticated = false;

  const goToAuth = useCallback(() => {
    router.push("/landing-page#sign-in");
  }, [router]);

  const navigateToProgram = useCallback(
    (program: ExamTrack) => {
      router.push(`/landing-page/${program}`);
    },
    [router],
  );

  const beginPrep = useCallback(() => {
    goToAuth();
  }, [goToAuth]);

  const homeActions: MedPrepLandingActions = useMemo(
    () => ({
      isAuthenticated,
      loginLabel: "Sign in",
      primaryCtaLabel: "Sign in",
      onLogin: goToAuth,
      onSignup: goToAuth,
      onStartTrial: goToAuth,
      onNavigateToProgram: navigateToProgram,
    }),
    [goToAuth, navigateToProgram],
  );

  const programActions = useCallback(
    (): ProgramBrandActions => ({
      isAuthenticated,
      primaryCtaLabel: "Sign in",
      onLogin: goToAuth,
      onNavigateToProgram: navigateToProgram,
      onBeginPrep: beginPrep,
    }),
    [beginPrep, goToAuth, navigateToProgram],
  );

  return { homeActions, programActions };
}
