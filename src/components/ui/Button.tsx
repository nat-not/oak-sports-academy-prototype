/**
 * Button — Oak Sports Academy
 *
 * Design spec:
 *  - Min touch target: 44px height (WCAG 2.5.5)
 *  - Border radius: 10px (rounded-[10px])
 *  - Font: Poppins semibold, tight tracking, uppercase
 *  - Variants: primary | secondary | ghost | danger | gold-outline
 *  - Sizes: xs | sm | md | lg | xl
 *  - States: default | hover | active | focus-visible | disabled | loading
 */

"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ButtonVariant, ButtonSize } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
//  VARIANT & SIZE MAPS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * All color/border/shadow tokens for each variant.
 * Hover is handled with Tailwind hover: prefix so no JS needed.
 */
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: cn(
    // Background — gold gradient
    "bg-gradient-to-r from-gold-dark via-gold to-gold-bright",
    "text-navy font-semibold",
    // Hover: brighten + lift + glow
    "hover:from-gold hover:via-gold-bright hover:to-gold",
    "hover:shadow-gold hover:-translate-y-px",
    // Active: press down
    "active:translate-y-0 active:shadow-gold-sm active:brightness-95",
    // Border
    "border border-gold/30",
    // Focus ring
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white",
    // Disabled
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:shadow-none disabled:translate-y-0"
  ),

  secondary: cn(
    "bg-transparent text-gold",
    "border-2 border-gold",
    "hover:bg-gold hover:text-navy hover:-translate-y-px hover:shadow-gold-sm",
    "active:translate-y-0 active:bg-gold-dark active:text-navy",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:translate-y-0"
  ),

  ghost: cn(
    "bg-transparent text-navy/80",
    "border border-transparent",
    "hover:bg-navy/6 hover:text-navy hover:border-navy/15",
    "active:bg-navy/10",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40 focus-visible:ring-offset-2",
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
  ),

  danger: cn(
    "bg-error text-white",
    "border border-error/30",
    "hover:bg-[#b02f2f] hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(201,60,60,0.40)]",
    "active:translate-y-0 active:bg-[#a02929]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:translate-y-0"
  ),

  "gold-outline": cn(
    // For dark backgrounds (hero, navy sections)
    "bg-transparent text-white",
    "border-2 border-white/40",
    "hover:border-gold hover:text-gold hover:-translate-y-px",
    "active:translate-y-0",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none disabled:translate-y-0"
  ),
};

/**
 * Size classes — all sizes produce a min-height ≥ 44px to meet
 * WCAG 2.5.5 touch target requirements on mobile.
 */
const SIZE_CLASSES: Record<ButtonSize, string> = {
  xs: "h-9  min-h-[36px] px-3.5  text-[0.65rem] tracking-[0.12em] gap-1.5",
  sm: "h-10 min-h-[40px] px-4.5  text-[0.68rem] tracking-[0.12em] gap-2",
  md: "h-11 min-h-[44px] px-6    text-[0.72rem] tracking-[0.12em] gap-2",   // default
  lg: "h-12 min-h-[48px] px-8    text-[0.75rem] tracking-[0.12em] gap-2.5",
  xl: "h-14 min-h-[56px] px-10   text-[0.8rem]  tracking-[0.12em] gap-3",
};

// ─────────────────────────────────────────────────────────────────────────────
//  SPINNER (loading state)
// ─────────────────────────────────────────────────────────────────────────────

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PROP TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface BaseButtonProps {
  /** Visual style */
  variant?: ButtonVariant;
  /** Size tier */
  size?: ButtonSize;
  /** Full-width block layout */
  fullWidth?: boolean;
  /** Shows a loading spinner and disables interaction */
  loading?: boolean;
  /** Accessible label when the button text alone is insufficient */
  srLabel?: string;
  /** Icon placed before the label */
  leftIcon?: React.ReactNode;
  /** Icon placed after the label */
  rightIcon?: React.ReactNode;
  className?: string;
}

/** <button> element version */
type ButtonAsButton = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: undefined;
    external?: undefined;
  };

/** <a> / Next.js Link version — renders when `href` is provided */
type ButtonAsLink = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    /** Pass href to render as a Next.js Link */
    href: string;
    /** Open link in new tab */
    external?: boolean;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    variant  = "primary",
    size     = "md",
    fullWidth = false,
    loading  = false,
    srLabel,
    leftIcon,
    rightIcon,
    className,
    children,
    ...rest
  } = props;

  // ── Composed class string ─────────────────────────────────────────────────
  const classes = cn(
    // Layout base
    "relative inline-flex items-center justify-center",
    "font-semibold uppercase font-sans",
    "rounded-[10px]",                 // Design spec: 10px radius
    "transition-all duration-200",
    "select-none whitespace-nowrap",
    "overflow-hidden",                // clip shimmer pseudo-element
    // Variant styles
    VARIANT_CLASSES[variant],
    // Size styles
    SIZE_CLASSES[size],
    // Full width
    fullWidth && "w-full",
    // Loading state — keep layout, hide content opacity
    loading && "cursor-wait",
    className
  );

  // ── Inner content ─────────────────────────────────────────────────────────
  const content = (
    <>
      {/* Shimmer overlay — only on primary for CTA feel */}
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 overflow-hidden rounded-[10px]",
            "before:absolute before:inset-0",
            "before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
            "before:-translate-x-full",
            "group-hover:before:translate-x-full",
            "before:transition-transform before:duration-700"
          )}
        />
      )}

      {/* Loading spinner — replaces left icon */}
      {loading ? (
        <Spinner
          className={cn(
            "flex-shrink-0",
            size === "xs" || size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"
          )}
        />
      ) : (
        leftIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )
      )}

      {/* Label */}
      <span className={cn(loading && "opacity-70")}>
        {children}
        {srLabel && <span className="sr-only">{srLabel}</span>}
      </span>

      {/* Right icon — hidden while loading */}
      {!loading && rightIcon && (
        <span className="flex-shrink-0" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </>
  );

  // ── Render as Next.js Link ────────────────────────────────────────────────
  if ("href" in props && props.href !== undefined) {
    const { href, external, ...linkRest } = rest as ButtonAsLink;

    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <Link
        href={href}
        {...externalProps}
        {...(linkRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  // ── Render as <button> ────────────────────────────────────────────────────
  const { ...btnRest } = rest as ButtonAsButton;

  return (
    <button
      type="button"
      {...btnRest}
      ref={ref as React.Ref<HTMLButtonElement>}
      disabled={(btnRest as React.ButtonHTMLAttributes<HTMLButtonElement>).disabled || loading}
      aria-busy={loading}
      className={classes}
    >
      {content}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
