"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

// ─────────────────────────────────────────────────────────────────────────────
//  STATIC DATA
// ─────────────────────────────────────────────────────────────────────────────

const FOOTER_LINKS = {
  quickLinks: [
    { label: "Home",              href: "/" },
    { label: "About Us",          href: "/about" },
    { label: "Training Programs", href: "/training-programs" },
    { label: "Events",            href: "/events" },
    { label: "Merch Store",       href: "/merch" },
    { label: "Contact Us",        href: "/contact" },
  ],
  training: [
    { label: "Free Trial Class",    href: "/signup" },
    { label: "Group Class",         href: "/training-programs" },
    { label: "Private Coaching",    href: "/training-programs" },
    { label: "Kyorugi Program",     href: "/training-programs" },
    { label: "Poomsae Program",     href: "/training-programs" },
    { label: "Register / Enroll",   href: "/signup" },
  ],
};

const ORG_BADGES = ["PTA", "Kukkiwon", "World TKD"] as const;

// ─────────────────────────────────────────────────────────────────────────────
//  SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h5 className="font-semibold text-[0.65rem] tracking-[0.22em] uppercase text-gold mb-4">
        {title}
      </h5>
      <ul className="space-y-2.5">
        {links.map(({ label, href }) => (
          <li key={href + label}>
            <Link
              href={href}
              className="text-white/60 hover:text-gold text-sm transition-colors duration-150"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactItem({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-gold text-base mt-0.5 flex-shrink-0">{icon}</span>
      <span className="text-white/65 text-sm leading-snug">{children}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN FOOTER
// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep border-t-[3px] border-gold/70">
      {/* ── Main grid ── */}
      <div className="container-page pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                  "bg-gradient-green border-2 border-gold",
                  "font-black text-gold text-base font-display",
                  "shadow-gold-sm group-hover:shadow-gold transition-shadow duration-300"
                )}
                aria-hidden="true"
              >
                OSA
              </div>
              <div>
                <div className="font-bold text-white text-sm tracking-wide uppercase leading-tight">
                  Oak Sports Academy
                </div>
                <div className="text-gold text-[0.6rem] tracking-[0.2em] uppercase">
                  Taekwondo Excellence
                </div>
              </div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-[260px]">
              Developing champions through the art and sport of Taekwondo.
              Affiliated with PTA, Kukkiwon, and World Taekwondo.
            </p>

            {/* Org badges */}
            <div className="flex flex-wrap gap-2">
              {ORG_BADGES.map((badge) => (
                <span
                  key={badge}
                  className={cn(
                    "text-[0.6rem] font-semibold tracking-[0.1em] uppercase",
                    "bg-white/5 border border-gold/25 text-gold",
                    "px-3 py-1 rounded-sm"
                  )}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <FooterLinkColumn title="Quick Links" links={FOOTER_LINKS.quickLinks} />

          {/* Training */}
          <FooterLinkColumn title="Training" links={FOOTER_LINKS.training} />

          {/* Contact */}
          <div>
            <h5 className="font-semibold text-[0.65rem] tracking-[0.22em] uppercase text-gold mb-4">
              Contact
            </h5>
            <div className="space-y-3.5">
              <ContactItem icon="📍">
                Academy Address, City, Philippines
              </ContactItem>
              <ContactItem icon="📞">+63 (Contact Number)</ContactItem>
              <ContactItem icon="✉️">info@oaksportsacademy.ph</ContactItem>
              <ContactItem icon="🕐">By Appointment Only</ContactItem>
            </div>

            {/* Social links */}
            <div className="flex gap-2 mt-5">
              {(
                [
                  { label: "Facebook",  char: "f",  href: "#" },
                  { label: "Instagram", char: "ig", href: "#" },
                ] as const
              ).map(({ label, char, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center",
                    "bg-white/6 border border-gold/20 text-white/60 text-xs",
                    "hover:bg-gold hover:border-gold hover:text-navy",
                    "transition-all duration-200"
                  )}
                >
                  {char}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-xs">
            © {currentYear} Oak Sports Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="text-white/35 hover:text-gold text-xs transition-colors duration-150"
            >
              Privacy Policy
            </Link>
            <Link
              href="/about"
              className="text-white/35 hover:text-gold text-xs transition-colors duration-150"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
