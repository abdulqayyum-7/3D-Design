"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shared/utils/cn";

/**
 * Minimal dependency-free stand-in for the shadcn/radix Dialog. Supports
 * only what this project's image lightbox needs: open/onOpenChange,
 * ESC-to-close, backdrop-click-to-close, and a portal to <body>.
 */

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const DialogContext = React.createContext<DialogContextValue | null>(null);

export function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return <DialogContext.Provider value={{ open, onOpenChange }}>{children}</DialogContext.Provider>;
}

export function DialogContent({
  className,
  children,
  showCloseButton = true,
}: {
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}) {
  const ctx = React.useContext(DialogContext);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!ctx?.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") ctx.onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [ctx]);

  if (!ctx?.open || !mounted) return null;

  return createPortal(
    <div
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.5)" }}
      onClick={() => ctx.onOpenChange(false)}
    >
      <div
        className={cn(className)}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 101,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        {showCloseButton && (
          <button
            type="button"
            aria-label="Close"
            onClick={() => ctx.onOpenChange(false)}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        )}
      </div>
    </div>,
    document.body,
  );
}
