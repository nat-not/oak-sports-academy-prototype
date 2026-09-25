/**
 * cn — className merge utility
 * Combines clsx (conditional classes) + tailwind-merge (deduplication).
 * Import this everywhere instead of raw `clsx` or string concatenation.
 *
 * @example
 *   cn("px-4 py-2", isActive && "bg-gold", className)
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
