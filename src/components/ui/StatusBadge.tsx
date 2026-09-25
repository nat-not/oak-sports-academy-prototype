/**
 * StatusBadge — Oak Sports Academy
 *
 * Design spec:
 *  - Shape: pill (border-radius 9999px)
 *  - Font: Poppins semibold, 0.65rem, tracking-wide, uppercase
 *  - Dot indicator: 6px circle, matches text color
 *  - Variants: all AccountStatus states + SemanticVariant + custom (gold, navy)
 *  - Sizes: xs | sm | md
 *  - Accepts any string label; defaults to the variant name if omitted
 */

import React from "react";
import { cn } from "@/lib/cn";
import type { BadgeVariant, BadgeSize } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
//  TOKEN MAPS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Each entry: [backgroundClass, textClass, borderClass]
 * Using Tailwind utility strings so PurgeCSS can tree-shake correctly.
 */
const VARIANT_TOKENS: Record<
  BadgeVariant,
  { bg: string; text: string; border: string; dotBg: string }
> = {
  // ── Account statuses ──────────────────────────────────────────────────────
  pending: {
    bg:     "bg-warning/12",
    text:   "text-warning",
    border: "border-warning/35",
    dotBg:  "bg-warning",
  },
  approved: {
    bg:     "bg-success/12",
    text:   "text-success",
    border: "border-success/35",
    dotBg:  "bg-success",
  },
  rejected: {
    bg:     "bg-error/12",
    text:   "text-error",
    border: "border-error/35",
    dotBg:  "bg-error",
  },
  suspended: {
    bg:     "bg-neutral-500/10",
    text:   "text-neutral-500",
    border: "border-neutral-400/30",
    dotBg:  "bg-neutral-400",
  },

  // ── Semantic variants ─────────────────────────────────────────────────────
  success: {
    bg:     "bg-success/12",
    text:   "text-success",
    border: "border-success/35",
    dotBg:  "bg-success",
  },
  warning: {
    bg:     "bg-warning/12",
    text:   "text-warning",
    border: "border-warning/35",
    dotBg:  "bg-warning",
  },
  error: {
    bg:     "bg-error/12",
    text:   "text-error",
    border: "border-error/35",
    dotBg:  "bg-error",
  },
  info: {
    bg:     "bg-info/12",
    text:   "text-info",
    border: "border-info/30",
    dotBg:  "bg-info",
  },
  neutral: {
    bg:     "bg-neutral-200/60",
    text:   "text-neutral-600",
    border: "border-neutral-300/60",
    dotBg:  "bg-neutral-400",
  },

  // ── Brand-specific ────────────────────────────────────────────────────────
  gold: {
    bg:     "bg-gold/12",
    text:   "text-gold-dark",
    border: "border-gold/35",
    dotBg:  "bg-gold",
  },
  navy: {
    bg:     "bg-navy/8",
    text:   "text-navy",
    border: "border-navy/20",
    dotBg:  "bg-navy",
  },
  default: {
    bg:     "bg-neutral-100",
    text:   "text-neutral-600",
    border: "border-neutral-200",
    dotBg:  "bg-neutral-400",
  },
};

/** Human-readable default labels per variant */
const DEFAULT_LABELS: Record<BadgeVariant, string> = {
  pending:   "Pending",
  approved:  "Approved",
  rejected:  "Rejected",
  suspended: "Suspended",
  success:   "Success",
  warning:   "Warning",
  error:     "Error",
  info:      "Info",
  neutral:   "Neutral",
  gold:      "Featured",
  navy:      "Active",
  default:   "Default",
};

// ─────────────────────────────────────────────────────────────────────────────
//  SIZE MAP
// ─────────────────────────────────────────────────────────────────────────────

const SIZE_CLASSES: Record<BadgeSize, string> = {
  xs: "px-2   py-[2px] text-[0.58rem] tracking-[0.1em]  gap-1",
  sm: "px-2.5 py-[3px] text-[0.65rem] tracking-[0.1em]  gap-1.5", // default
  md: "px-3   py-[4px] text-[0.72rem] tracking-[0.08em] gap-2",
};

const DOT_SIZES: Record<BadgeSize, string> = {
  xs: "w-1.5 h-1.5",
  sm: "w-[6px] h-[6px]",
  md: "w-2 h-2",
};

// ─────────────────────────────────────────────────────────────────────────────
//  PROP TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface StatusBadgeProps {
  /** Semantic color variant */
  variant?: BadgeVariant;
  /** Text to display — defaults to variant name */
  label?: string;
  /** Size tier */
  size?: BadgeSize;
  /** Show the pulsing dot indicator */
  showDot?: boolean;
  /** Whether the dot should animate (pulse) */
  pulseDot?: boolean;
  /** Additional class names */
  className?: string;
  /** Accessible role override (default: "status") */
  role?: React.AriaRole;
}

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function StatusBadge({
  variant  = "default",
  label,
  size     = "sm",
  showDot  = true,
  pulseDot = false,
  className,
  role     = "status",
}: StatusBadgeProps) {
  const tokens      = VARIANT_TOKENS[variant] ?? VARIANT_TOKENS.default;
  const displayText = label ?? DEFAULT_LABELS[variant] ?? variant;

  return (
    <span
      role={role}
      aria-label={displayText}
      className={cn(
        // Pill shape — design spec: border-radius 9999px
        "inline-flex items-center rounded-full border font-semibold uppercase",
        // Variant colors
        tokens.bg,
        tokens.text,
        tokens.border,
        // Size
        SIZE_CLASSES[size],
        className
      )}
    >
      {/* Dot indicator */}
      {showDot && (
        <span
          aria-hidden="true"
          className={cn(
            "rounded-full flex-shrink-0",
            tokens.dotBg,
            DOT_SIZES[size],
            // Pulse animation for "live" / active states
            pulseDot && "animate-pulse"
          )}
        />
      )}

      {/* Label */}
      <span>{displayText}</span>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PRESET EXPORTS — convenience wrappers used throughout the app
// ─────────────────────────────────────────────────────────────────────────────

/** Account status badge — reads the status string from domain models */
export function AccountStatusBadge({
  status,
  size = "sm",
  className,
}: {
  status: "pending" | "approved" | "rejected" | "suspended";
  size?: BadgeSize;
  className?: string;
}) {
  const pulsing = status === "pending";
  return (
    <StatusBadge
      variant={status}
      size={size}
      pulseDot={pulsing}
      className={className}
    />
  );
}

export type { StatusBadgeProps, BadgeVariant, BadgeSize };
