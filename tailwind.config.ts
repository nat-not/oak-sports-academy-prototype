import type { Config } from "tailwindcss";

/**
 * Oak Sports Academy — Tailwind CSS Configuration
 * Design tokens aligned with the OSA design system (PDF spec)
 *
 * Color architecture:
 *  - brand-navy   : primary dark backgrounds & text
 *  - brand-green  : secondary brand accent backgrounds
 *  - brand-gold   : accent / CTA / highlights
 *  - feedback     : success / warning / error / info
 *  - neutral      : grays, surfaces, borders
 */
const config: Config = {
  // ── Content paths ──────────────────────────────────────────────────────────
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // ── Dark-mode strategy ────────────────────────────────────────────────────
  darkMode: "class",

  theme: {
    // ── Override only what we need; rest falls through to Tailwind defaults ──
    extend: {
      // ────────────────────────────────────────────────────────────────────────
      //  COLOR PALETTE
      // ────────────────────────────────────────────────────────────────────────
      colors: {
        // ── Primary Brand — Navy Blue ────────────────────────────────────────
        navy: {
          DEFAULT: "#071A24", // primary surface / text
          deep:    "#041219", // deepest bg, footer
          light:   "#0D2A3A", // slightly lifted surfaces
          mid:     "#0A2132", // card backgrounds on dark
          muted:   "rgba(7,26,36,0.65)", // translucent overlay
        },

        // ── Secondary Brand — Forest Green ──────────────────────────────────
        green: {
          DEFAULT: "#0B3D2E", // brand accent green
          dark:    "#145A3D", // secondary green shade
          light:   "#1A5C44", // hover / active states
          mid:     "#1E7050", // highlights / chips
          muted:   "rgba(11,61,46,0.15)", // tinted background
        },

        // ── Accent Brand — Gold ──────────────────────────────────────────────
        gold: {
          DEFAULT: "#D4AF37", // primary CTA, highlights
          bright:  "#F2D16B", // hover / lighter variant
          dark:    "#B8941E", // pressed / active state
          muted:   "rgba(212,175,55,0.12)", // tinted gold bg
          border:  "rgba(212,175,55,0.35)", // gold border at rest
          focus:   "rgba(212,175,55,0.45)", // gold focus ring
        },

        // ── Semantic Feedback ────────────────────────────────────────────────
        success: {
          DEFAULT: "#2E8B57",
          light:   "rgba(46,139,87,0.12)",
          border:  "rgba(46,139,87,0.35)",
        },
        warning: {
          DEFAULT: "#D99A22",
          light:   "rgba(217,154,34,0.12)",
          border:  "rgba(217,154,34,0.35)",
        },
        error: {
          DEFAULT: "#C93C3C",
          light:   "rgba(201,60,60,0.10)",
          border:  "rgba(201,60,60,0.35)",
        },
        info: {
          DEFAULT: "#3882B6",
          light:   "rgba(56,130,182,0.12)",
          border:  "rgba(56,130,182,0.30)",
        },

        // ── Neutral palette (surfaces, borders, text) ────────────────────────
        neutral: {
          50:  "#F9F8F5",
          100: "#F2EFE8",
          200: "#E4E0D6",
          300: "#CECA BE",
          400: "#A8A297",
          500: "#7A7469",
          600: "#534E44",
          700: "#3A3630",
          800: "#252219",
          900: "#12100B",
        },
      },

      // ────────────────────────────────────────────────────────────────────────
      //  TYPOGRAPHY — Poppins for everything
      // ────────────────────────────────────────────────────────────────────────
      fontFamily: {
        sans:    ["Poppins", "system-ui", "-apple-system", "sans-serif"],
        display: ["Poppins", "system-ui", "-apple-system", "sans-serif"],
        body:    ["Poppins", "system-ui", "-apple-system", "sans-serif"],
        mono:    ["JetBrains Mono", "Fira Code", "monospace"],
      },

      fontSize: {
        // Custom display sizes for hero headings
        "display-2xl": ["4.5rem",  { lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "900" }],
        "display-xl":  ["3.75rem", { lineHeight: "1.1",  letterSpacing: "-0.02em", fontWeight: "800" }],
        "display-lg":  ["3rem",    { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "700" }],
        "display-md":  ["2.25rem", { lineHeight: "1.2",  letterSpacing: "-0.01em", fontWeight: "700" }],
        "display-sm":  ["1.875rem",{ lineHeight: "1.25", letterSpacing: "0",       fontWeight: "600" }],
      },

      fontWeight: {
        thin:       "100",
        extralight: "200",
        light:      "300",
        normal:     "400",
        medium:     "500",
        semibold:   "600",
        bold:       "700",
        extrabold:  "800",
        black:      "900",
      },

      letterSpacing: {
        tightest:  "-0.05em",
        tighter:   "-0.025em",
        tight:     "-0.015em",
        normal:    "0em",
        wide:      "0.025em",
        wider:     "0.075em",
        widest:    "0.15em",
        "ultra-wide": "0.25em",
      },

      // ────────────────────────────────────────────────────────────────────────
      //  BORDER RADIUS — Design system tokens
      // ────────────────────────────────────────────────────────────────────────
      borderRadius: {
        none:    "0px",
        sm:      "4px",
        DEFAULT: "6px",
        md:      "8px",   // inputs, buttons
        lg:      "12px",  // cards, modals
        xl:      "16px",  // large cards
        "2xl":   "20px",
        "3xl":   "24px",
        pill:    "9999px", // badges / chips
        full:    "9999px",
      },

      // ────────────────────────────────────────────────────────────────────────
      //  SPACING — base 4 / 8 system
      // ────────────────────────────────────────────────────────────────────────
      spacing: {
        "4.5":  "1.125rem",
        "13":   "3.25rem",
        "15":   "3.75rem",
        "18":   "4.5rem",
        "22":   "5.5rem",
        "26":   "6.5rem",
        "30":   "7.5rem",
        "34":   "8.5rem",
        "38":   "9.5rem",
        "42":   "10.5rem",
        "46":   "11.5rem",
        "50":   "12.5rem",
        "76":   "19rem",
        "84":   "21rem",
        "88":   "22rem",
        "92":   "23rem",
        "100":  "25rem",
        "108":  "27rem",
        "116":  "29rem",
        "128":  "32rem",
        "144":  "36rem",
      },

      // ────────────────────────────────────────────────────────────────────────
      //  ELEVATION / SHADOWS
      // ────────────────────────────────────────────────────────────────────────
      boxShadow: {
        // Subtle card lift
        "card-sm":   "0 1px 3px rgba(7,26,36,0.08), 0 1px 2px rgba(7,26,36,0.06)",
        "card":      "0 4px 12px rgba(7,26,36,0.10), 0 2px 6px rgba(7,26,36,0.07)",
        "card-md":   "0 8px 20px rgba(7,26,36,0.12), 0 4px 8px rgba(7,26,36,0.08)",
        "card-lg":   "0 16px 40px rgba(7,26,36,0.16), 0 6px 14px rgba(7,26,36,0.10)",
        "card-xl":   "0 24px 64px rgba(7,26,36,0.22), 0 10px 24px rgba(7,26,36,0.14)",
        // Gold glow — for CTA buttons and highlighted elements
        "gold-sm":   "0 2px 8px rgba(212,175,55,0.25)",
        "gold":      "0 4px 18px rgba(212,175,55,0.35)",
        "gold-lg":   "0 6px 28px rgba(212,175,55,0.45)",
        // Inner shadow for inputs
        "inner-sm":  "inset 0 1px 3px rgba(7,26,36,0.08)",
        "inner":     "inset 0 2px 6px rgba(7,26,36,0.12)",
        // Focus rings
        "focus-gold":  "0 0 0 3px rgba(212,175,55,0.45)",
        "focus-error": "0 0 0 3px rgba(201,60,60,0.30)",
        "focus-navy":  "0 0 0 3px rgba(7,26,36,0.25)",
        // Navbar shadow
        "nav":       "0 2px 16px rgba(7,26,36,0.20)",
        // Modal overlay
        "modal":     "0 24px 64px rgba(7,26,36,0.50), 0 8px 24px rgba(7,26,36,0.35)",
      },

      // ────────────────────────────────────────────────────────────────────────
      //  TRANSITIONS
      // ────────────────────────────────────────────────────────────────────────
      transitionDuration: {
        "0":   "0ms",
        "75":  "75ms",
        "100": "100ms",
        "150": "150ms",
        "200": "200ms",
        "300": "300ms",
        "400": "400ms",
        "500": "500ms",
        "700": "700ms",
      },

      transitionTimingFunction: {
        "ease-in-out-quad": "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
        "ease-out-expo":    "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
        "ease-in-expo":     "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
        "spring":           "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },

      // ────────────────────────────────────────────────────────────────────────
      //  ANIMATIONS
      // ────────────────────────────────────────────────────────────────────────
      keyframes: {
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          "0%":   { opacity: "0", transform: "translateY(-16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%":   { opacity: "0", transform: "translateX(32px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212,175,55,0)" },
          "50%":       { boxShadow: "0 0 0 8px rgba(212,175,55,0.18)" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "spin-slow": {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },

      animation: {
        "fade-in":        "fade-in 0.5s ease forwards",
        "fade-up":        "fade-up 0.6s ease forwards",
        "fade-down":      "fade-down 0.4s ease forwards",
        "slide-in-right": "slide-in-right 0.5s ease forwards",
        "scale-in":       "scale-in 0.35s ease forwards",
        "pulse-gold":     "pulse-gold 2.5s ease-in-out infinite",
        "spin-slow":      "spin-slow 8s linear infinite",
      },

      // ────────────────────────────────────────────────────────────────────────
      //  BACKGROUND IMAGE helpers
      // ────────────────────────────────────────────────────────────────────────
      backgroundImage: {
        // Brand gradients
        "gradient-navy":   "linear-gradient(135deg, #071A24 0%, #041219 100%)",
        "gradient-hero":   "linear-gradient(155deg, #071A24 0%, #0B3D2E 55%, #071A24 100%)",
        "gradient-green":  "linear-gradient(135deg, #0B3D2E 0%, #145A3D 100%)",
        "gradient-gold":   "linear-gradient(135deg, #D4AF37 0%, #F2D16B 50%, #B8941E 100%)",
        "gradient-overlay":"linear-gradient(to top, rgba(7,26,36,0.95) 0%, rgba(7,26,36,0.60) 60%, transparent 100%)",
        "gradient-card":   "linear-gradient(160deg, rgba(13,42,58,1) 0%, rgba(11,61,46,0.6) 100%)",
        // Subtle pattern overlay (CSS url not supported here; use in globals.css)
      },

      // ────────────────────────────────────────────────────────────────────────
      //  SCREEN breakpoints (extend, not override)
      // ────────────────────────────────────────────────────────────────────────
      screens: {
        "xs":  "480px",
        "3xl": "1920px",
      },

      // ────────────────────────────────────────────────────────────────────────
      //  Z-INDEX scale
      // ────────────────────────────────────────────────────────────────────────
      zIndex: {
        "dropdown":  "1000",
        "sticky":    "1100",
        "overlay":   "1200",
        "modal":     "1300",
        "popover":   "1400",
        "toast":     "1500",
        "tooltip":   "1600",
      },

      // ────────────────────────────────────────────────────────────────────────
      //  MAX WIDTH tokens for layout containers
      // ────────────────────────────────────────────────────────────────────────
      maxWidth: {
        "prose-narrow": "55ch",
        "prose":        "68ch",
        "prose-wide":   "78ch",
        "page":         "1280px",
        "page-wide":    "1440px",
      },

      // ────────────────────────────────────────────────────────────────────────
      //  LINE HEIGHT fine-tuning
      // ────────────────────────────────────────────────────────────────────────
      lineHeight: {
        "tightest": "1.05",
        "tighter":  "1.15",
        "snug":     "1.35",
        "normal":   "1.5",
        "relaxed":  "1.65",
        "loose":    "1.85",
        "2":        "2",
      },
    },
  },

  plugins: [
    // Uncomment after: npm install @tailwindcss/forms @tailwindcss/typography
    // require("@tailwindcss/forms"),
    // require("@tailwindcss/typography"),
  ],
};

export default config;
