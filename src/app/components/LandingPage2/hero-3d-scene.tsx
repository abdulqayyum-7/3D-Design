"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Center } from "@react-three/drei";
import * as THREE from "three";
import type { CinematicVariant } from "./scroll-cinematic-bg";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const MODEL_SRC = "/models/heart.glb";

/** Per-page accent tint for the rim light behind the model. */
const TINT: Record<CinematicVariant, string> = {
  home: "#8b5cf6",
  fcps: "#8b5cf6",
  jcat: "#a78bfa",
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Caps DPR at 2 and pauses the render loop when the tab isn't visible. */
function PerfGuard() {
  const { gl, invalidate } = useThree();
  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }, [gl]);
  useEffect(() => {
    function onVis() {
      if (document.visibilityState === "visible") invalidate();
    }
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [invalidate]);
  return null;
}

/**
 * The real anatomical heart mesh — downloaded GLB, optimized with
 * gltf-transform (meshopt-compressed + simplified from ~3M to ~750k render
 * vertices, WebP 1k textures, ~3.6MB total). A gentle idle "breathing"
 * scale stands in for a heartbeat since the source file has no baked
 * animation.
 *
 * onHoverChange fires from R3F's raycast-based pointer events, which test
 * against the actual mesh geometry — not the (much larger) bounding
 * container — so it's true only when the cursor is precisely over the
 * rendered heart pixels, not the transparent space around it.
 */
function HeartModel({
  reduced,
  onHoverChange,
}: {
  reduced: boolean;
  onHoverChange: (hovering: boolean) => void;
}) {
  const { scene } = useGLTF(MODEL_SRC);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current || reduced) return;
    const beat = 1 + Math.sin(state.clock.elapsedTime * 1.7) * 0.015;
    group.current.scale.setScalar(beat);
  });

  return (
    <Center>
      <group
        ref={group}
        scale={2.4}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHoverChange(true);
        }}
        onPointerOut={() => onHoverChange(false)}
      >
        <primitive object={cloned} />
      </group>
    </Center>
  );
}

function Scene({ variant, reduced }: { variant: CinematicVariant; reduced: boolean }) {
  const controls = useRef<OrbitControlsImpl | null>(null);
  const tint = TINT[variant];
  const [hoveringHeart, setHoveringHeart] = useState(false);

  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[3, 4, 3]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-3, -1, -2]} intensity={0.35} color={tint} />
      <pointLight position={[-2, 1, 2.5]} intensity={0.7} color={tint} distance={8} />
      <Suspense fallback={null}>
        <HeartModel reduced={reduced} onHoverChange={setHoveringHeart} />
        {!reduced && <Environment preset="studio" />}
      </Suspense>
      <PerfGuard />
      <OrbitControls
        ref={controls}
        enableZoom={hoveringHeart}
        enableRotate={hoveringHeart}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.6}
        zoomSpeed={0.9}
        minDistance={2.6}
        maxDistance={6.5}
        autoRotate={!reduced}
        autoRotateSpeed={3.65}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.55}
      />
    </>
  );
}

/**
 * Hero visual: a real, downloaded-and-optimized anatomical heart GLB model,
 * lit with studio environment reflections and a brand-tinted rim light —
 * rendered on a fully transparent canvas (no card, no background box).
 * Auto-rotates gently at idle; drag left/right to spin it, scroll/pinch to
 * zoom in and out. Mounts lazily and client-only — see
 * hero-3d-scene-lazy.tsx.
 */
export function Hero3DScene({ variant }: { variant: CinematicVariant }) {
  const reduced = useReducedMotion();
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent", touchAction: "none" }}
      >
        <Scene variant={variant} reduced={reduced} />
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_SRC);