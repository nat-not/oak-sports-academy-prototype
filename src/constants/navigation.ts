import type { NavConfig } from "@/types";

export const NAV_CONFIG: NavConfig = {
  brand: {
    name: "Oak Sports Academy",
    tagline: "Taekwondo Excellence",
    href: "/",
  },
  links: [
    { label: "Home",              href: "/" },
    { label: "About Us",          href: "/about" },
    { label: "Training Programs", href: "/training-programs" },
    { label: "Events",            href: "/events" },
    { label: "Merch",             href: "/merch" },
    { label: "Contact Us",        href: "/contact" },
  ],
  ctaLinks: [
    { label: "Sign Up", href: "/signup", variant: "secondary" },
    { label: "Log In",  href: "/login",  variant: "primary"   },
  ],
};

export const DASHBOARD_NAV = [
  { label: "Overview",        href: "/dashboard",              icon: "🏠" },
  { label: "Register / Enroll", href: "/dashboard/register",   icon: "📋" },
  { label: "My Appointments", href: "/dashboard/appointments", icon: "📅" },
  { label: "My Registrations",href: "/dashboard/registrations",icon: "🎽" },
  { label: "My Profile",      href: "/dashboard/profile",      icon: "👤" },
  { label: "Notifications",   href: "/dashboard/notifications",icon: "🔔" },
];
