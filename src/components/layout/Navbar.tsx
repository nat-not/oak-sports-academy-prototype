"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { NAV_CONFIG } from "@/constants/navigation";

// ─────────────────────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface NavbarProps {
  /** Override transparent background even on scroll (e.g. auth pages) */
  alwaysOpaque?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
//  HAMBURGER ICON
// ─────────────────────────────────────────────────────────────────────────────

function HamburgerIcon({ open }: { open: boolean }) {
  const baseBar = "block absolute h-[2px] bg-gold rounded-full transition-all duration-300";
  return (
    <span className="relative w-6 h-5 flex-shrink-0" aria-hidden="true">
      <span
        className={cn(baseBar, "w-6 left-0", open ? "top-[9px] rotate-45" : "top-0")}
      />
      <span
        className={cn(baseBar, "w-4 left-0 top-[9px]", open ? "opacity-0 translate-x-2" : "opacity-100")}
      />
      <span
        className={cn(baseBar, "w-6 left-0", open ? "top-[9px] -rotate-45" : "top-[18px]")}
      />
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  NAVBAR BRAND
// ─────────────────────────────────────────────────────────────────────────────

function Brand() {
  return (
    <Link
      href={NAV_CONFIG.brand.href}
      className="flex items-center gap-3 flex-shrink-0 group"
      aria-label="Oak Sports Academy — Home"
    >
      {/* Emblem */}
      <div
        className={cn(
          "w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center flex-shrink-0",
          "bg-gradient-green border-2 border-gold",
          "font-black text-gold text-xs sm:text-sm font-display",
          "shadow-gold-sm group-hover:shadow-gold",
          "transition-shadow duration-300"
        )}
        aria-hidden="true"
      >
        OSA
      </div>
      {/* Text — hidden on very small screens */}
      <div className="hidden xs:block">
        <div className="font-bold text-white text-xs sm:text-sm leading-tight tracking-wide uppercase">
          {NAV_CONFIG.brand.name}
        </div>
        <div className="text-gold text-[0.55rem] tracking-[0.2em] uppercase leading-tight">
          {NAV_CONFIG.brand.tagline}
        </div>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  DESKTOP NAV LINK
// ─────────────────────────────────────────────────────────────────────────────

function DesktopNavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "nav-link text-[0.7rem] font-semibold tracking-[0.1em] uppercase px-2 py-1.5",
        isActive && "nav-link-active"
      )}
    >
      {label}
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MOBILE NAV LINK
// ─────────────────────────────────────────────────────────────────────────────

function MobileNavLink({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "block px-4 py-3 font-semibold text-[0.78rem] tracking-[0.1em] uppercase",
        "border-b border-white/6 transition-colors duration-150",
        "hover:bg-white/5 hover:text-gold",
        isActive
          ? "text-gold border-l-[3px] border-l-gold pl-3"
          : "text-white/75"
      )}
    >
      {label}
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN NAVBAR
// ─────────────────────────────────────────────────────────────────────────────

export default function Navbar({ alwaysOpaque = false }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef                = useRef<HTMLDivElement>(null);

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    // Set initial state
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Close mobile menu on route change ────────────────────────────────────
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // ── Trap focus & close on Escape ─────────────────────────────────────────
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("keydown", handleKey);
    // Prevent body scroll when menu is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const isOpaque = alwaysOpaque || scrolled || mobileOpen;

  return (
    <>
      {/* ── Fixed Navbar ── */}
      <header
        role="banner"
        className={cn(
          "fixed top-0 left-0 right-0 z-[var(--z-sticky)]",
          "h-[var(--navbar-height)] transition-all duration-300",
          isOpaque
            ? "bg-navy/98 backdrop-blur-md shadow-nav border-b border-gold/20"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="container-page h-full flex items-center justify-between gap-4">

          {/* Brand */}
          <Brand />

          {/* Desktop nav links */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-0.5"
          >
            {NAV_CONFIG.links.map(({ href, label }) => (
              <DesktopNavLink
                key={href}
                href={href}
                label={label}
                isActive={
                  href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(href)
                }
              />
            ))}
          </nav>

          {/* Desktop CTA buttons */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <Link
              href="/signup"
              className={cn(
                "inline-flex items-center justify-center",
                "px-5 py-2.5 rounded-md",
                "border-2 border-gold text-gold",
                "font-semibold text-[0.68rem] tracking-[0.12em] uppercase",
                "hover:bg-gold hover:text-navy",
                "transition-all duration-200 focus-gold"
              )}
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className={cn(
                "inline-flex items-center justify-center",
                "px-5 py-2.5 rounded-md",
                "bg-gradient-to-r from-gold-dark via-gold to-gold-bright text-navy",
                "font-semibold text-[0.68rem] tracking-[0.12em] uppercase",
                "hover:shadow-gold",
                "transition-all duration-200 focus-gold"
              )}
            >
              Log In
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className={cn(
              "lg:hidden flex items-center justify-center",
              "w-10 h-10 rounded-md",
              "bg-white/5 border border-gold/20",
              "hover:bg-white/10 hover:border-gold/40",
              "transition-all duration-150 focus-gold-dark"
            )}
          >
            <HamburgerIcon open={mobileOpen} />
          </button>

        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-[calc(var(--z-sticky)-1)] lg:hidden"
          aria-hidden="true"
          onClick={closeMobile}
        />
      )}

      {/* ── Mobile Menu Panel ── */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          "fixed top-[var(--navbar-height)] left-0 right-0 z-[var(--z-sticky)]",
          "bg-navy border-b-2 border-gold/60",
          "overflow-y-auto max-h-[calc(100dvh-var(--navbar-height))]",
          "transition-all duration-300 ease-out lg:hidden",
          mobileOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <nav aria-label="Mobile navigation links" className="py-2">
          {NAV_CONFIG.links.map(({ href, label }) => (
            <MobileNavLink
              key={href}
              href={href}
              label={label}
              isActive={
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href)
              }
              onClick={closeMobile}
            />
          ))}
        </nav>

        {/* Mobile CTA buttons */}
        <div className="px-4 pt-4 pb-6 flex flex-col gap-3 border-t border-white/8">
          <Link
            href="/signup"
            onClick={closeMobile}
            className={cn(
              "w-full text-center py-3 rounded-md",
              "border-2 border-gold text-gold",
              "font-semibold text-sm tracking-[0.1em] uppercase",
              "hover:bg-gold hover:text-navy",
              "transition-all duration-200"
            )}
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            onClick={closeMobile}
            className={cn(
              "w-full text-center py-3 rounded-md",
              "bg-gradient-to-r from-gold-dark via-gold to-gold-bright text-navy",
              "font-semibold text-sm tracking-[0.1em] uppercase",
              "hover:shadow-gold",
              "transition-all duration-200"
            )}
          >
            Log In
          </Link>
        </div>
      </div>
    </>
  );
}
