/**
 * SectionHeader — reusable eyebrow + heading + divider + description block.
 * Used at the top of every homepage section.
 */
import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  eyebrow: string;
  heading: string | React.ReactNode;
  description?: string;
  /** Left-align instead of center (default is centered) */
  align?: "left" | "center";
  /** Theme for eyebrow label — "light" for dark-bg sections */
  theme?: "dark" | "light";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  heading,
  description,
  align = "center",
  theme = "dark",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isDark   = theme === "dark";

  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        isCenter && "text-center",
        className
      )}
    >
      {/* Eyebrow */}
      <span
        className={cn(
          "section-label block",
          isCenter && "inline-block"
        )}
      >
        {eyebrow}
      </span>

      {/* Heading */}
      <h2
        className={cn(
          "mt-2 font-bold text-balance",
          "text-3xl md:text-4xl lg:text-[2.6rem] leading-tight",
          isDark ? "text-navy" : "text-white"
        )}
      >
        {heading}
      </h2>

      {/* Gold divider */}
      <div
        className={cn(
          "divider-gold mt-4 h-[3px] w-14",
          isCenter && "mx-auto"
        )}
        aria-hidden="true"
      />

      {/* Description */}
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed max-w-prose",
            isCenter && "mx-auto",
            isDark ? "text-neutral-500" : "text-white/65"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
