/**
 * Input — Oak Sports Academy
 *
 * Design spec:
 *  - Border radius: 8px (rounded-md / --radius-input)
 *  - Default border: neutral-300 (#CECABE)
 *  - Focus border + ring: gold (#D4AF37) — gold ring shadow
 *  - Error border + ring: error (#C93C3C) — red ring shadow
 *  - Success border: success (#2E8B57)
 *  - Disabled: reduced opacity, not-allowed cursor
 *  - Error text: error color, 12px, below field
 *  - Helper text: neutral-500, 12px, below field
 *  - Label: Poppins semibold, 0.68rem, tracking-wide, uppercase
 */

"use client";

import React, { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";
import type { InputSize } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
//  SIZE MAP
// ─────────────────────────────────────────────────────────────────────────────

const SIZE_CLASSES: Record<InputSize, string> = {
  sm: "h-9  px-3  py-2   text-sm",
  md: "h-11 px-4  py-2.5 text-sm",    // default — 44px
  lg: "h-12 px-4  py-3   text-base",
};

// ─────────────────────────────────────────────────────────────────────────────
//  PROP TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Field label — rendered above the input */
  label?: string;
  /** Helper text rendered below the field (only shown if no error) */
  hint?: string;
  /** Inline error message — renders in error/red below the field */
  error?: string;
  /** Controlled success state (green border) */
  success?: boolean;
  /** Size tier */
  size?: InputSize;
  /** Icon rendered inside the left of the input */
  leftIcon?: React.ReactNode;
  /** Icon or button rendered inside the right of the input */
  rightElement?: React.ReactNode;
  /** Marks the label with a required asterisk */
  required?: boolean;
  /** className applied to the outer wrapper div */
  wrapperClassName?: string;
  /** className applied to the label element */
  labelClassName?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    hint,
    error,
    success = false,
    size = "md",
    leftIcon,
    rightElement,
    required,
    wrapperClassName,
    labelClassName,
    className,
    id: propId,
    disabled,
    ...rest
  },
  ref
) {
  // Auto-generate stable id if none provided (useId gives SSR-safe value)
  const generatedId = useId();
  const id          = propId ?? generatedId;
  const errorId     = `${id}-error`;
  const hintId      = `${id}-hint`;

  const hasError   = Boolean(error);
  const hasSuccess = success && !hasError;
  const hasHint    = Boolean(hint) && !hasError;

  // Build aria-describedby from present descriptors
  const describedBy = [
    hasError ? errorId : undefined,
    hasHint  ? hintId  : undefined,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  // ── Input border/ring state ───────────────────────────────────────────────
  const stateClasses = cn(
    // Default
    "border border-neutral-300",
    "focus:outline-none focus:border-gold focus:shadow-focus-gold",
    // Error override
    hasError && [
      "border-error",
      "focus:border-error focus:shadow-focus-error",
    ],
    // Success override
    hasSuccess && "border-success focus:border-success",
    // Disabled
    disabled && "opacity-50 cursor-not-allowed bg-neutral-100"
  );

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>

      {/* ── Label ── */}
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "font-semibold text-[0.68rem] tracking-[0.15em] uppercase",
            "text-navy/90",
            labelClassName
          )}
        >
          {label}
          {required && (
            <span
              className="text-error ml-1"
              aria-hidden="true"
              title="Required"
            >
              *
            </span>
          )}
        </label>
      )}

      {/* ── Input wrapper (for icon insets) ── */}
      <div className="relative flex items-center">

        {/* Left icon */}
        {leftIcon && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 flex items-center text-neutral-400"
          >
            {leftIcon}
          </span>
        )}

        {/* The actual <input> */}
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          required={required}
          aria-invalid={hasError ? "true" : undefined}
          aria-describedby={describedBy}
          aria-required={required}
          className={cn(
            // Base
            "w-full rounded-md font-sans",
            "bg-white text-navy placeholder:text-neutral-400",
            "transition-all duration-150",
            // Size
            SIZE_CLASSES[size],
            // Icon padding adjustments
            leftIcon   && "pl-10",
            rightElement && "pr-10",
            // State
            stateClasses,
            className
          )}
          {...rest}
        />

        {/* Right element (icon, show/hide toggle, etc.) */}
        {rightElement && (
          <span className="absolute right-3 flex items-center">
            {rightElement}
          </span>
        )}

      </div>

      {/* ── Error message ── */}
      {hasError && (
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          className="flex items-center gap-1.5 text-error text-[0.72rem] font-medium leading-snug"
        >
          {/* Error icon */}
          <svg
            className="w-3.5 h-3.5 flex-shrink-0"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 3.75a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zm.75 7a.875.875 0 110-1.75.875.875 0 010 1.75z" />
          </svg>
          {error}
        </p>
      )}

      {/* ── Hint text (hidden when there is an error) ── */}
      {hasHint && (
        <p
          id={hintId}
          className="text-neutral-400 text-[0.72rem] leading-snug"
        >
          {hint}
        </p>
      )}

    </div>
  );
});

Input.displayName = "Input";

// ─────────────────────────────────────────────────────────────────────────────
//  TEXTAREA VARIANT
// Shares the same visual language but renders a <textarea>
// ─────────────────────────────────────────────────────────────────────────────

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  wrapperClassName?: string;
  labelClassName?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    hint,
    error,
    required,
    wrapperClassName,
    labelClassName,
    className,
    id: propId,
    disabled,
    ...rest
  },
  ref
) {
  const generatedId = useId();
  const id          = propId ?? generatedId;
  const errorId     = `${id}-error`;
  const hintId      = `${id}-hint`;
  const hasError    = Boolean(error);
  const hasHint     = Boolean(hint) && !hasError;

  const describedBy = [
    hasError ? errorId : undefined,
    hasHint  ? hintId  : undefined,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "font-semibold text-[0.68rem] tracking-[0.15em] uppercase text-navy/90",
            labelClassName
          )}
        >
          {label}
          {required && (
            <span className="text-error ml-1" aria-hidden="true">*</span>
          )}
        </label>
      )}

      <textarea
        ref={ref}
        id={id}
        disabled={disabled}
        required={required}
        aria-invalid={hasError ? "true" : undefined}
        aria-describedby={describedBy}
        aria-required={required}
        className={cn(
          "w-full rounded-md font-sans px-4 py-3 text-sm",
          "bg-white text-navy placeholder:text-neutral-400",
          "border border-neutral-300",
          "focus:outline-none focus:border-gold focus:shadow-focus-gold",
          "transition-all duration-150 resize-vertical min-h-[120px]",
          hasError && "border-error focus:border-error focus:shadow-focus-error",
          disabled && "opacity-50 cursor-not-allowed bg-neutral-100",
          className
        )}
        {...rest}
      />

      {hasError && (
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          className="flex items-center gap-1.5 text-error text-[0.72rem] font-medium"
        >
          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 3.75a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zm.75 7a.875.875 0 110-1.75.875.875 0 010 1.75z" />
          </svg>
          {error}
        </p>
      )}

      {hasHint && (
        <p id={hintId} className="text-neutral-400 text-[0.72rem]">{hint}</p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export { Input, Textarea };
export type { InputProps, TextareaProps };
