import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/cn";

// ─────────────────────────────────────────────────────────────────────────────
//  METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: "Oak Sports Academy — Taekwondo Excellence",
    template: "%s | Oak Sports Academy",
  },
  description:
    "Oak Sports Academy offers world-class Taekwondo training for all ages. " +
    "Free trial classes, group training, and one-on-one coaching. " +
    "Affiliated with PTA, Kukkiwon, and World Taekwondo.",
  keywords: [
    "Taekwondo",
    "Oak Sports Academy",
    "Kyorugi",
    "Poomsae",
    "Taekwondo training Philippines",
    "martial arts",
    "belt promotion",
    "free trial class",
  ],
  authors: [{ name: "Oak Sports Academy" }],
  creator: "Oak Sports Academy",
  metadataBase: new URL("https://oaksportsacademy.ph"),
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://oaksportsacademy.ph",
    siteName: "Oak Sports Academy",
    title: "Oak Sports Academy — Taekwondo Excellence",
    description:
      "World-class Taekwondo training for all ages. Free trial classes available.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Oak Sports Academy — Taekwondo Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oak Sports Academy — Taekwondo Excellence",
    description: "World-class Taekwondo training for all ages.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#071A24" },
    { media: "(prefers-color-scheme: dark)",  color: "#041219" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
//  ROOT LAYOUT
// ─────────────────────────────────────────────────────────────────────────────

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    /*
     * Next.js 15: font class applied on <html> so Poppins tokens
     * cascade to every element via CSS var(--font-sans) in globals.css.
     * We set font-display:swap in the @import; no next/font needed
     * here because we import from Google Fonts directly in globals.css.
     */
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "font-sans antialiased",
          // Background for pages that don't set their own bg
          "bg-white text-navy",
          // Prevent layout shift from scrollbar appearing
          "overflow-x-hidden"
        )}
      >
        {/* Skip-to-content link for keyboard/screen-reader users */}
        <a
          href="#main-content"
          className={cn(
            "sr-only focus:not-sr-only",
            "fixed top-4 left-4 z-[var(--z-toast)]",
            "px-4 py-2 rounded-md",
            "bg-gold text-navy font-semibold text-sm",
            "focus:outline-none focus:ring-2 focus:ring-gold-dark"
          )}
        >
          Skip to main content
        </a>

        {/* ── Persistent navigation ── */}
        <Navbar />

        {/* ── Page content ── */}
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>

        {/* ── Persistent footer ── */}
        <Footer />
      </body>
    </html>
  );
}
