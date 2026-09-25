"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StatusBadge, AccountStatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

type Panel =
  | "overview"
  | "register"
  | "appointments"
  | "registrations"
  | "profile"
  | "notifications";

type TrainingOption = "group" | "private" | null;
type RegPackage     = "with-uniform" | "without-uniform" | null;

// ─── Static mock data ─────────────────────────────────────────────────────────

const MOCK_USER = {
  name:   "Juan Dela Cruz",
  email:  "juan@email.com",
  role:   "Athlete",
  status: "approved" as const,
};

const STAT_CARDS = [
  { label: "Active Registrations", value: "2",  accent: "gold",  icon: "📋" },
  { label: "Upcoming Appointments",value: "3",  accent: "green", icon: "📅" },
  { label: "Sessions Completed",   value: "6",  accent: "navy",  icon: "🥋" },
  { label: "New Notifications",    value: "3",  accent: "warn",  icon: "🔔" },
] as const;

const APPOINTMENTS = [
  { day:"15", month:"Nov", title:"Kyorugi Group Class",          sub:"Session 3 of 8 — Group Training",   time:"3:00 PM", loc:"OSA Training Hall", status:"approved"  as const },
  { day:"18", month:"Nov", title:"Kyorugi Group Class",          sub:"Session 4 of 8 — Group Training",   time:"3:00 PM", loc:"OSA Training Hall", status:"approved"  as const },
  { day:"22", month:"Nov", title:"Inter-Academy Sparring Day",    sub:"Academy Event — Open to all students", time:"2:00 PM", loc:"OSA Training Hall", status:"pending" as const },
  { day:"25", month:"Nov", title:"Kyorugi Group Class",          sub:"Session 5 of 8 — Group Training",   time:"3:00 PM", loc:"OSA Training Hall", status:"approved"  as const },
];

const REGISTRATIONS = [
  { icon:"⚔️", program:"Kyorugi — Group Class",  desc:"Twice a week · After-School · Without Uniform", sessions:"6 / 8",  date:"Started: Nov 1, 2026",  status:"approved" as const },
  { icon:"🎁", program:"Free Trial Class",         desc:"Group · Age 18+ · Trial Day 1 completed",      sessions:"1 / 2",  date:"Trial: Oct 28, 2026",   status:"pending"  as const },
];

const NOTIFICATIONS = [
  { id:"n1", read:false, title:"Belt Promotion Test — Nov 15",    body:"Upcoming Yellow to Green Belt exam. Ensure you've completed required sessions.",       time:"2 hours ago" },
  { id:"n2", read:false, title:"Session Reminder",                 body:"Your Kyorugi Group Class is scheduled for tomorrow at 3:00 PM.",                        time:"5 hours ago" },
  { id:"n3", read:false, title:"New Trial Batch Open",             body:"Free trial class slots now available. Refer friends to join!",                          time:"1 day ago"   },
  { id:"n4", read:true,  title:"Account Approved",                 body:"Your Oak Sports Academy account has been approved. Welcome!",                           time:"Oct 30, 2026"},
  { id:"n5", read:true,  title:"Account Submitted for Review",     body:"Your account registration has been submitted and is pending review.",                   time:"Oct 28, 2026"},
];

const PROFILE_FIELDS = [
  { label:"Surname",       value:"Dela Cruz"                },
  { label:"First Name",    value:"Juan"                     },
  { label:"Middle Name",   value:"Santos"                   },
  { label:"Gender",        value:"Male"                     },
  { label:"Date of Birth", value:"January 15, 2000"         },
  { label:"Age",           value:"26 years old"             },
  { label:"Address",       value:"123 Sample Street, City"  },
  { label:"Mobile",        value:"+63 912 345 6789"         },
  { label:"Email",         value:"juan@email.com"           },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Appointment card row */
function AppointmentRow({
  day, month, title, sub, time, loc, status,
}: typeof APPOINTMENTS[0]) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 py-4 border-b border-neutral-100 last:border-none">
      {/* Date box */}
      <div className="flex-shrink-0 bg-navy rounded-xl px-4 py-3 text-center min-w-[60px]">
        <div className="font-black text-gold text-2xl leading-none">{day}</div>
        <div className="text-white/60 text-[0.58rem] tracking-widest uppercase">{month}</div>
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-navy font-semibold text-sm">{title}</p>
        <p className="text-neutral-500 text-xs mt-0.5">{sub}</p>
        <div className="flex flex-wrap gap-3 mt-1.5 text-neutral-400 text-[0.65rem]">
          <span>⏰ {time}</span><span>📍 {loc}</span>
        </div>
      </div>
      <AccountStatusBadge status={status} className="self-start sm:self-center" />
    </div>
  );
}

/** Registration list row */
function RegistrationRow({ icon, program, desc, sessions, date, status }: typeof REGISTRATIONS[0]) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-neutral-100 last:border-none">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green to-green-dark
                      flex items-center justify-center text-lg flex-shrink-0"
        aria-hidden="true">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-navy font-semibold text-sm leading-tight">{program}</p>
        <p className="text-neutral-500 text-xs mt-0.5">{desc}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-navy font-bold text-sm">{sessions} sessions</p>
        <p className="text-neutral-400 text-[0.65rem] mt-0.5">{date}</p>
        <AccountStatusBadge status={status} size="xs" className="mt-1.5" />
      </div>
    </div>
  );
}

/** Notification item */
function NotifItem({ read, title, body, time }: typeof NOTIFICATIONS[0]) {
  return (
    <div className="flex gap-3 py-4 border-b border-neutral-100 last:border-none">
      <span className={cn(
        "w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5",
        read ? "bg-neutral-300" : "bg-gold"
      )} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm leading-snug", read ? "text-neutral-600" : "text-navy font-semibold")}>{title}</p>
        <p className="text-neutral-500 text-xs mt-1 leading-relaxed">{body}</p>
        <time className="text-neutral-400 text-[0.65rem] mt-1 block">{time}</time>
      </div>
    </div>
  );
}

/** Dashboard card wrapper */
function DashCard({ title, action, children }: {
  title:    string;
  action?:  { label: string; onClick: () => void };
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-card mb-5">
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
        <h3 className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-navy/80">{title}</h3>
        {action && (
          <button type="button" onClick={action.onClick}
            className="text-gold-dark font-semibold text-xs hover:text-gold transition-colors">
            {action.label}
          </button>
        )}
      </div>
      <div className="px-6 py-4">{children}</div>
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────

function Modal({ title, open, onClose, children, footer }: {
  title:    string;
  open:     boolean;
  onClose:  () => void;
  children: React.ReactNode;
  footer?:  React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div className="relative bg-white rounded-2xl w-full max-w-2xl
                      max-h-[90dvh] overflow-y-auto shadow-modal z-10">
        {/* Header */}
        <div className="sticky top-0 bg-white flex items-center justify-between
                        px-6 py-5 border-b border-neutral-100 z-10">
          <h2 id="modal-title" className="text-navy font-bold text-lg">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200
                       flex items-center justify-center text-neutral-500
                       transition-colors text-lg"
          >
            ×
          </button>
        </div>
        {/* Body */}
        <div className="px-6 py-6">{children}</div>
        {/* Footer */}
        {footer && (
          <div className="sticky bottom-0 bg-white flex justify-end gap-3
                          px-6 py-4 border-t border-neutral-100">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activePanel,     setActivePanel]     = useState<Panel>("overview");
  const [sidebarOpen,     setSidebarOpen]     = useState(false);
  const [trialModalOpen,  setTrialModalOpen]  = useState(false);
  const [regModalOpen,    setRegModalOpen]    = useState(false);
  const [trainingOption,  setTrainingOption]  = useState<TrainingOption>(null);
  const [selectedPackage, setSelectedPackage] = useState<RegPackage>(null);
  const [confirmToast,    setConfirmToast]    = useState<string | null>(null);
  const [trialAgeGroup,   setTrialAgeGroup]   = useState("");
  const [notifs,          setNotifs]          = useState(NOTIFICATIONS);

  const showPanel = useCallback((p: Panel) => {
    setActivePanel(p);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const showToast = (msg: string) => {
    setConfirmToast(msg);
    setTimeout(() => setConfirmToast(null), 3200);
  };

  const confirmTrial = () => {
    setTrialModalOpen(false);
    showToast("✓ Free trial class booked!");
  };

  const confirmEnrollment = () => {
    setRegModalOpen(false);
    showToast("✓ Enrollment confirmed!");
  };

  const markAllRead = () =>
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));

  const unreadCount = notifs.filter((n) => !n.read).length;

  // ── Sidebar nav items ────────────────────────────────────────────────────────
  const NAV_ITEMS: Array<{ id: Panel; icon: string; label: string; badge?: number }> = [
    { id: "overview",       icon: "🏠", label: "Dashboard Overview" },
    { id: "register",       icon: "📋", label: "Register / Enroll"   },
    { id: "appointments",   icon: "📅", label: "My Appointments"     },
    { id: "registrations",  icon: "🎽", label: "My Registrations"    },
    { id: "profile",        icon: "👤", label: "My Profile"          },
    { id: "notifications",  icon: "🔔", label: "Notifications",   badge: unreadCount > 0 ? unreadCount : undefined },
  ];

  // ── Price helpers ────────────────────────────────────────────────────────────
  const withPrice    = trainingOption === "private" ? "₱6,500" : "₱5,500";
  const withoutPrice = "₱3,800";

  return (
    <>
      {/* ════════════════════════════════════════
          TOP NAVBAR
      ════════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 h-[var(--navbar-height)] z-[var(--z-sticky)]
                   bg-navy border-b border-gold/20 flex items-center justify-between
                   px-4 sm:px-6 gap-4"
      >
        {/* Brand + sidebar toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen((v) => !v)}
            className="lg:hidden w-9 h-9 rounded-lg bg-white/6 border border-gold/20
                       flex items-center justify-center text-white/70 text-lg
                       hover:bg-white/10 transition-colors"
          >
            ☰
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-green border-2 border-gold
                            flex items-center justify-center font-black text-gold text-xs">
              OSA
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-xs leading-tight tracking-wide uppercase">
                Oak Sports Academy
              </div>
              <div className="text-gold text-[0.55rem] tracking-[0.18em] uppercase">Member Portal</div>
            </div>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Notification bell */}
          <button
            type="button"
            aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
            onClick={() => showPanel("notifications")}
            className="relative w-9 h-9 rounded-full bg-white/6 border border-gold/20
                       flex items-center justify-center text-white/70 text-base
                       hover:bg-white/10 transition-colors"
          >
            🔔
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full
                               text-white text-[0.55rem] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User menu */}
          <div className="flex items-center gap-2.5 bg-white/5 border border-gold/20
                          rounded-full px-3 py-1.5 cursor-pointer
                          hover:bg-white/8 transition-colors">
            <div className="w-7 h-7 rounded-full bg-gradient-green border border-gold
                            flex items-center justify-center text-sm">
              👤
            </div>
            <div className="hidden sm:block">
              <div className="text-white text-xs font-semibold leading-tight">{MOCK_USER.name}</div>
              <div className="text-gold text-[0.55rem] tracking-wide uppercase">{MOCK_USER.role}</div>
            </div>
          </div>

          {/* Exit */}
          <Link href="/"
            className="hidden md:flex items-center gap-1.5 text-white/50 hover:text-gold
                       text-xs font-semibold tracking-wide uppercase transition-colors">
            ← Exit
          </Link>
        </div>
      </header>

      {/* ════════════════════════════════════════
          LAYOUT
      ════════════════════════════════════════ */}
      <div className="pt-[var(--navbar-height)] flex min-h-screen">

        {/* ── Mobile overlay ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-[var(--z-overlay)] lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* ════════ SIDEBAR ════════ */}
        <aside
          className={cn(
            "fixed lg:sticky top-[var(--navbar-height)] left-0",
            "w-[260px] h-[calc(100dvh-var(--navbar-height))]",
            "bg-navy border-r border-gold/12 overflow-y-auto z-[var(--z-overlay)] lg:z-auto",
            "flex flex-col transition-transform duration-300 ease-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          {/* User card */}
          <div className="mx-3 mt-5 mb-4 p-4 bg-gold/6 border border-gold/18 rounded-xl text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-green border-2 border-gold
                            flex items-center justify-center text-2xl mx-auto mb-3">
              👤
            </div>
            <p className="text-white font-semibold text-sm">{MOCK_USER.name}</p>
            <p className="text-white/50 text-xs mt-0.5">{MOCK_USER.email}</p>
            <div className="mt-2.5 flex justify-center">
              <AccountStatusBadge status={MOCK_USER.status} size="xs" />
            </div>
          </div>

          {/* Nav groups */}
          <nav aria-label="Dashboard navigation" className="flex-1 px-3">
            <p className="text-[0.58rem] font-semibold tracking-[0.22em] uppercase
                          text-gold/40 px-2 mb-2">Main</p>
            <ul className="space-y-0.5 mb-5">
              {NAV_ITEMS.map(({ id, icon, label, badge }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => showPanel(id)}
                    aria-current={activePanel === id ? "page" : undefined}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm",
                      "transition-all duration-150",
                      activePanel === id
                        ? "bg-gold/12 text-gold border-l-[3px] border-l-gold font-semibold"
                        : "text-white/60 hover:bg-white/5 hover:text-white/85"
                    )}
                  >
                    <span className="text-base w-5 flex-shrink-0" aria-hidden="true">{icon}</span>
                    <span className="flex-1 text-left">{label}</span>
                    {badge !== undefined && (
                      <span className="bg-error text-white text-[0.58rem] font-bold
                                       w-4.5 h-4.5 rounded-full flex items-center justify-center px-1.5">
                        {badge}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <p className="text-[0.58rem] font-semibold tracking-[0.22em] uppercase
                          text-gold/40 px-2 mb-2">Quick Links</p>
            <ul className="space-y-0.5 mb-5">
              {[
                { label:"Training Programs", href:"/training-programs", icon:"🥋" },
                { label:"Events",             href:"/events",           icon:"📢" },
                { label:"Merch Store",        href:"/merch",            icon:"🛒" },
              ].map(({ label, href, icon }) => (
                <li key={href}>
                  <Link href={href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                               text-white/60 hover:bg-white/5 hover:text-white/85
                               transition-all duration-150">
                    <span className="text-base w-5 flex-shrink-0" aria-hidden="true">{icon}</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-white/6">
            <Link href="/login"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                         text-white/40 hover:bg-error/10 hover:text-error
                         text-sm transition-all duration-150">
              <span aria-hidden="true">🚪</span> Log Out
            </Link>
          </div>
        </aside>

        {/* ════════ MAIN CONTENT ════════ */}
        <main className="flex-1 min-w-0 bg-neutral-100 p-5 sm:p-7 lg:p-8">

          {/* ═══ OVERVIEW ═══ */}
          {activePanel === "overview" && (
            <section aria-label="Dashboard overview">
              {/* Page header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-7">
                <div>
                  <h1 className="text-navy font-bold text-2xl">Welcome back, Juan! 👋</h1>
                  <p className="text-neutral-500 text-sm mt-1">Here&apos;s an overview of your Oak Sports Academy account.</p>
                </div>
                <Button variant="primary" size="md" onClick={() => showPanel("register")}>
                  + Register / Enroll
                </Button>
              </div>

              {/* Account status banner */}
              <div className="bg-gradient-to-r from-green to-navy rounded-2xl p-5 mb-6
                              flex flex-col sm:flex-row items-start sm:items-center gap-5
                              border border-gold/15">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-gold/15 border-2 border-gold rounded-full
                                  flex items-center justify-center text-xl flex-shrink-0">👤</div>
                  <div className="min-w-0">
                    <p className="text-gold text-[0.6rem] font-semibold tracking-[0.18em] uppercase">Account Status</p>
                    <p className="text-white font-bold truncate">{MOCK_USER.name}</p>
                    <p className="text-white/55 text-xs">{MOCK_USER.email} · {MOCK_USER.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <AccountStatusBadge status={MOCK_USER.status} />
                  <Button variant="primary" size="sm" onClick={() => showPanel("register")}>
                    Register for Training
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                {STAT_CARDS.map(({ label, value, accent, icon }) => (
                  <div key={label}
                    className="bg-white border border-neutral-200 rounded-2xl p-5
                               shadow-card flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border",
                      accent === "gold"  && "bg-gold/10  border-gold/20",
                      accent === "green" && "bg-green/8  border-green/15",
                      accent === "navy"  && "bg-navy/7   border-navy/12",
                      accent === "warn"  && "bg-warning/10 border-warning/20"
                    )} aria-hidden="true">
                      {icon}
                    </div>
                    <div>
                      <p className="font-black text-navy leading-none text-3xl">{value}</p>
                      <p className="text-neutral-500 text-xs mt-1">{label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Content grid */}
              <div className="grid xl:grid-cols-[1fr_300px] gap-5">
                <div>
                  {/* Upcoming appointments preview */}
                  <DashCard
                    title="Upcoming Appointments"
                    action={{ label:"View All →", onClick: () => showPanel("appointments") }}
                  >
                    {APPOINTMENTS.slice(0, 3).map((a) => (
                      <AppointmentRow key={a.day + a.title} {...a} />
                    ))}
                  </DashCard>

                  {/* Current registrations preview */}
                  <DashCard
                    title="Current Registrations"
                    action={{ label:"View All →", onClick: () => showPanel("registrations") }}
                  >
                    {REGISTRATIONS.map((r) => (
                      <RegistrationRow key={r.program} {...r} />
                    ))}
                  </DashCard>
                </div>

                {/* Right column */}
                <div>
                  {/* Notifications preview */}
                  <DashCard
                    title="Notifications"
                    action={{ label:"All →", onClick: () => showPanel("notifications") }}
                  >
                    {notifs.slice(0, 4).map((n) => (
                      <NotifItem key={n.id} {...n} />
                    ))}
                  </DashCard>

                  {/* Quick actions */}
                  <DashCard title="Quick Actions">
                    <div className="flex flex-col gap-2">
                      <Button variant="primary"   size="sm" fullWidth onClick={() => showPanel("register")}>📋 Register for Training</Button>
                      <Button href="/training-programs" variant="secondary" size="sm" fullWidth>🥋 View Programs</Button>
                      <Button href="/events"  variant="ghost" size="sm" fullWidth>📢 Upcoming Events</Button>
                      <Button href="/merch"   variant="ghost" size="sm" fullWidth>🛒 Shop Merch</Button>
                    </div>
                  </DashCard>
                </div>
              </div>
            </section>
          )}

          {/* ═══ REGISTER / ENROLL ═══ */}
          {activePanel === "register" && (
            <section aria-labelledby="reg-heading">
              <div className="mb-7">
                <h1 id="reg-heading" className="text-navy font-bold text-2xl">Register / Enroll</h1>
                <p className="text-neutral-500 text-sm mt-1">Choose what you would like to register for at Oak Sports Academy.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mb-8">
                {/* Free Trial */}
                <button type="button" onClick={() => setTrialModalOpen(true)}
                  className="text-left bg-white border-2 border-neutral-200 rounded-2xl p-7
                             hover:border-green hover:shadow-card-lg hover:-translate-y-1.5
                             transition-all duration-200 group cursor-pointer">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-green border border-gold/20
                                  flex items-center justify-center text-3xl mb-5">🎁</div>
                  <div className="inline-block bg-green/10 border border-green/20 text-green-mid
                                  text-[0.62rem] font-semibold tracking-[0.1em] uppercase
                                  px-2.5 py-1 rounded-full mb-3">
                    FREE — No Cost
                  </div>
                  <h3 className="text-navy font-bold text-xl mb-2">Free Trial Class</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                    Experience Oak Sports Academy Taekwondo Training at no cost. Available for all age groups.
                  </p>
                  <ul className="space-y-2">
                    {["Completely FREE group class","Max 2 trial days per student","All 4 age groups","Max 5 slots per age group","No commitment required"].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-neutral-600">
                        <span className="text-green-mid font-bold flex-shrink-0">✓</span>{f}
                      </li>
                    ))}
                  </ul>
                </button>

                {/* Regular Training */}
                <button type="button" onClick={() => setRegModalOpen(true)}
                  className="text-left bg-white border-2 border-neutral-200 rounded-2xl p-7
                             hover:border-gold hover:shadow-gold hover:-translate-y-1.5
                             transition-all duration-200 group cursor-pointer">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-dark to-navy
                                  flex items-center justify-center text-3xl mb-5">🥋</div>
                  <div className="inline-block bg-gold/12 border border-gold/30 text-gold-dark
                                  text-[0.62rem] font-semibold tracking-[0.1em] uppercase
                                  px-2.5 py-1 rounded-full mb-3">
                    Paid — Choose Package
                  </div>
                  <h3 className="text-navy font-bold text-xl mb-2">Regular Training</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                    Enroll in full Taekwondo training with your choice of program, schedule, and coaching format.
                  </p>
                  <ul className="space-y-2">
                    {["Kyorugi or Poomsae program","Group or One-on-One coaching","8 sessions (6 + 2 bonus)","Twice or thrice weekly","Optional Premium Uniform"].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-neutral-600">
                        <span className="text-gold-dark font-bold flex-shrink-0">✓</span>{f}
                      </li>
                    ))}
                  </ul>
                </button>
              </div>

              <div className="p-4 bg-info/8 border border-info/25 rounded-xl text-sm text-navy/75 flex gap-3 max-w-2xl">
                <span className="text-info flex-shrink-0" aria-hidden="true">ℹ️</span>
                <p>OSA operates on a <strong>By Appointment Only</strong> basis. After selecting your registration type, you will choose your preferred schedule and time slot.</p>
              </div>
            </section>
          )}

          {/* ═══ APPOINTMENTS ═══ */}
          {activePanel === "appointments" && (
            <section aria-labelledby="apt-heading">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
                <div>
                  <h1 id="apt-heading" className="text-navy font-bold text-2xl">My Appointments</h1>
                  <p className="text-neutral-500 text-sm mt-1">All scheduled sessions and academy appointments.</p>
                </div>
                <Button variant="primary" size="md" onClick={() => showPanel("register")}>
                  + New Appointment
                </Button>
              </div>
              <DashCard title="Upcoming Appointments">
                {APPOINTMENTS.map((a) => <AppointmentRow key={a.day + a.title} {...a} />)}
              </DashCard>
            </section>
          )}

          {/* ═══ REGISTRATIONS ═══ */}
          {activePanel === "registrations" && (
            <section aria-labelledby="regs-heading">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
                <div>
                  <h1 id="regs-heading" className="text-navy font-bold text-2xl">My Registrations</h1>
                  <p className="text-neutral-500 text-sm mt-1">All current and past training enrollments.</p>
                </div>
                <Button variant="primary" size="md" onClick={() => showPanel("register")}>
                  + New Registration
                </Button>
              </div>
              <div className="bg-white border border-neutral-200 rounded-2xl shadow-card overflow-hidden">
                <div className="px-6 py-4 border-b border-neutral-100">
                  <h3 className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-navy/80">Active Registrations</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-navy">
                      <tr>
                        {["Program","Training Type","Schedule","Package","Sessions","Status"].map((h) => (
                          <th key={h} className="px-5 py-3 text-left text-[0.62rem] font-semibold
                                                  tracking-[0.1em] uppercase text-white/80 whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-neutral-100 hover:bg-gold/3 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-navy">⚔️ Kyorugi</td>
                        <td className="px-5 py-3.5 text-neutral-600">Group Class</td>
                        <td className="px-5 py-3.5 text-neutral-600">Twice/wk · Weekday</td>
                        <td className="px-5 py-3.5 text-neutral-600">Without Uniform — ₱3,800</td>
                        <td className="px-5 py-3.5 text-neutral-600 font-semibold">6 / 8</td>
                        <td className="px-5 py-3.5"><AccountStatusBadge status="approved" size="xs" /></td>
                      </tr>
                      <tr className="hover:bg-gold/3 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-navy">🎁 Free Trial</td>
                        <td className="px-5 py-3.5 text-neutral-600">Group Trial</td>
                        <td className="px-5 py-3.5 text-neutral-600">By Appt · Age 18+</td>
                        <td className="px-5 py-3.5 text-neutral-600">FREE — ₱0</td>
                        <td className="px-5 py-3.5 text-neutral-600 font-semibold">1 / 2</td>
                        <td className="px-5 py-3.5"><StatusBadge variant="info" label="In Progress" size="xs" /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* ═══ PROFILE ═══ */}
          {activePanel === "profile" && (
            <section aria-labelledby="profile-heading">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
                <div>
                  <h1 id="profile-heading" className="text-navy font-bold text-2xl">My Profile</h1>
                  <p className="text-neutral-500 text-sm mt-1">View and manage your personal information.</p>
                </div>
                <Button variant="secondary" size="md">Edit Profile</Button>
              </div>

              <div className="grid md:grid-cols-[260px_1fr] gap-5">
                {/* Avatar card */}
                <div className="bg-white border border-neutral-200 rounded-2xl shadow-card p-7 text-center h-fit">
                  <div className="w-20 h-20 rounded-full bg-gradient-green border-2 border-gold
                                  flex items-center justify-center text-3xl mx-auto mb-4">👤</div>
                  <p className="text-navy font-bold">{MOCK_USER.name}</p>
                  <p className="text-neutral-500 text-sm mt-0.5">{MOCK_USER.email}</p>
                  <div className="mt-3 flex justify-center">
                    <AccountStatusBadge status={MOCK_USER.status} />
                  </div>
                  <div className="mt-3 text-neutral-400 text-xs">Account Holder: Athlete</div>
                </div>

                {/* Fields */}
                <DashCard title="Personal Information">
                  <dl>
                    {PROFILE_FIELDS.map(({ label, value }) => (
                      <div key={label}
                        className="flex justify-between items-start py-3
                                   border-b border-neutral-100 last:border-none text-sm">
                        <dt className="text-neutral-400 min-w-[120px] flex-shrink-0">{label}</dt>
                        <dd className="text-navy font-medium text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </DashCard>
              </div>
            </section>
          )}

          {/* ═══ NOTIFICATIONS ═══ */}
          {activePanel === "notifications" && (
            <section aria-labelledby="notif-heading">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
                <div>
                  <h1 id="notif-heading" className="text-navy font-bold text-2xl">Notifications</h1>
                  <p className="text-neutral-500 text-sm mt-1">Academy announcements and account updates.</p>
                </div>
                {unreadCount > 0 && (
                  <Button variant="secondary" size="md" onClick={markAllRead}>
                    Mark All as Read
                  </Button>
                )}
              </div>
              <DashCard title={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}>
                {notifs.map((n) => <NotifItem key={n.id} {...n} />)}
              </DashCard>
            </section>
          )}

        </main>
      </div>

      {/* ════════════════════════════════════════
          FREE TRIAL MODAL
      ════════════════════════════════════════ */}
      <Modal
        title="🎁 Free Trial Class Registration"
        open={trialModalOpen}
        onClose={() => setTrialModalOpen(false)}
        footer={
          <>
            <Button variant="secondary" size="md" onClick={() => setTrialModalOpen(false)}>Cancel</Button>
            <Button variant="primary"   size="md" onClick={confirmTrial}>Confirm Free Trial</Button>
          </>
        }
      >
        <div className="space-y-5">
          <div className="p-3.5 bg-success/8 border border-success/25 rounded-xl flex gap-2.5 text-sm text-navy/80">
            <span aria-hidden="true" className="text-success flex-shrink-0">🎉</span>
            <div><strong>FREE GROUP TRIAL CLASS</strong> — Experience Oak Sports Academy training! Max 2 trial days. Limited slots per age group.</div>
          </div>

          {/* Age group */}
          <div>
            <p className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase text-navy/90 mb-2.5">
              Select Age Group <span className="text-error">*</span>
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { v:"3-5",   l:"3–5 Years Old",  s:"Max 5 slots" },
                { v:"6-12",  l:"6–12 Years Old", s:"Max 5 slots" },
                { v:"13-17", l:"13–17 Years Old", s:"Max 5 slots" },
                { v:"adult", l:"Adult (18+)",    s:"Max 5 slots" },
              ].map(({ v, l, s }) => (
                <button key={v} type="button"
                  onClick={() => setTrialAgeGroup(v)}
                  aria-pressed={trialAgeGroup === v}
                  className={cn(
                    "text-left p-4 rounded-xl border-2 transition-all duration-150",
                    trialAgeGroup === v
                      ? "border-gold bg-gold/5"
                      : "border-neutral-200 hover:border-gold/40"
                  )}>
                  <p className="font-semibold text-navy text-sm">{l}</p>
                  <p className="text-neutral-400 text-xs mt-0.5">{s}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Date + time */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase text-navy/90 block mb-1.5">
                Preferred Trial Date <span className="text-error">*</span>
              </label>
              <input type="date"
                className="w-full h-11 px-4 rounded-md border border-neutral-300 text-sm bg-white
                           focus:outline-none focus:border-gold focus:shadow-focus-gold transition-all" />
            </div>
            <div>
              <label className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase text-navy/90 block mb-1.5">
                Preferred Time <span className="text-error">*</span>
              </label>
              <select className="w-full h-11 px-4 rounded-md border border-neutral-300 text-sm bg-white
                                  focus:outline-none focus:border-gold focus:shadow-focus-gold transition-all appearance-none">
                <option value="" disabled>Select time slot</option>
                {["8:00 AM – 9:30 AM","10:00 AM – 11:30 AM","2:00 PM – 3:30 PM","4:00 PM – 5:30 PM"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Rate */}
          <div className="p-4 bg-green/6 border border-green/15 rounded-xl">
            <p className="text-[0.62rem] font-semibold tracking-[0.15em] uppercase text-green-mid mb-1">Rate</p>
            <p className="text-green-mid font-black text-2xl">₱0 — FREE</p>
          </div>

          <div className="p-4 bg-warning/8 border border-warning/25 rounded-xl text-xs text-navy/75 flex gap-2.5">
            <span className="text-warning flex-shrink-0" aria-hidden="true">⚠️</span>
            <p>By confirming, you acknowledge that you have read and agree to the <strong>Oak Sports Academy Waiver and Release Form</strong>.</p>
          </div>
        </div>
      </Modal>

      {/* ════════════════════════════════════════
          REGULAR TRAINING MODAL
      ════════════════════════════════════════ */}
      <Modal
        title="🥋 Regular Training Registration"
        open={regModalOpen}
        onClose={() => setRegModalOpen(false)}
        footer={
          <>
            <Button variant="secondary" size="md" onClick={() => setRegModalOpen(false)}>Cancel</Button>
            <Button variant="primary"   size="md" onClick={confirmEnrollment}>Confirm Enrollment</Button>
          </>
        }
      >
        <div className="space-y-7">
          {/* Training option */}
          <div>
            <p className="font-semibold text-[0.65rem] tracking-[0.18em] uppercase text-neutral-400 mb-3">
              Step 1 — Choose Training Option
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {([
                { v:"group"   as const, icon:"👥", title:"Group Class",           desc:"Min 3 – Max 5 students per group" },
                { v:"private" as const, icon:"🎯", title:"One-on-One Private",    desc:"One participant · One coach" },
              ]).map(({ v, icon, title, desc }) => (
                <button key={v} type="button"
                  onClick={() => { setTrainingOption(v); setSelectedPackage(null); }}
                  aria-pressed={trainingOption === v}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-150",
                    trainingOption === v
                      ? "border-gold bg-gold/5"
                      : "border-neutral-200 hover:border-gold/40"
                  )}>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy to-green
                                  flex items-center justify-center text-xl flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">{title}</p>
                    <p className="text-neutral-400 text-xs mt-0.5">{desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Program */}
          <div>
            <p className="font-semibold text-[0.65rem] tracking-[0.18em] uppercase text-neutral-400 mb-3">
              Step 2 — Select Program
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { v:"kyorugi", icon:"⚔️", label:"Kyorugi", sub:"Sparring" },
                { v:"poomsae", icon:"🌿", label:"Poomsae", sub:"Forms" },
              ].map(({ v, icon, label, sub }) => (
                <button key={v} type="button"
                  className="flex items-center gap-3 p-4 rounded-xl border-2 border-neutral-200
                             hover:border-gold/50 text-left transition-all duration-150">
                  <span className="text-2xl" aria-hidden="true">{icon}</span>
                  <div>
                    <p className="font-semibold text-navy text-sm">{label}</p>
                    <p className="text-neutral-400 text-xs">{sub}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Frequency + schedule */}
          <div>
            <p className="font-semibold text-[0.65rem] tracking-[0.18em] uppercase text-neutral-400 mb-3">
              Step 3 — Frequency &amp; Schedule
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase text-navy/90 block mb-1.5">
                  Training Frequency <span className="text-error">*</span>
                </label>
                <select className="w-full h-11 px-4 rounded-md border border-neutral-300 text-sm bg-white
                                    focus:outline-none focus:border-gold transition-all appearance-none">
                  <option value="" disabled>Select frequency</option>
                  <option>Twice a week</option>
                  <option>Thrice a week</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase text-navy/90 block mb-1.5">
                  Schedule <span className="text-error">*</span>
                </label>
                <select className="w-full h-11 px-4 rounded-md border border-neutral-300 text-sm bg-white
                                    focus:outline-none focus:border-gold transition-all appearance-none">
                  <option value="" disabled>Select schedule</option>
                  <option>Weekday — After-School Classes</option>
                  <option>Weekend — Saturday Classes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Package */}
          <div>
            <p className="font-semibold text-[0.65rem] tracking-[0.18em] uppercase text-neutral-400 mb-3">
              Step 4 — Select Package
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {([
                { v:"without-uniform" as RegPackage, name:"Without Premium Uniform", price:withoutPrice, detail:"8 sessions total", featured:false },
                { v:"with-uniform"    as RegPackage, name:"With Premium Uniform",    price:withPrice,    detail:"8 sessions + Free Dobok", featured:true },
              ]).map(({ v, name, price, detail, featured }) => (
                <button key={String(v)} type="button"
                  onClick={() => setSelectedPackage(v)}
                  aria-pressed={selectedPackage === v}
                  className={cn(
                    "rounded-xl overflow-hidden border-2 text-left transition-all duration-150",
                    selectedPackage === v || featured
                      ? "border-gold shadow-gold-sm"
                      : "border-neutral-200 hover:border-gold/40"
                  )}>
                  <div className={cn(
                    "px-5 py-4 text-center",
                    featured ? "bg-gradient-to-br from-green to-navy" : "bg-navy"
                  )}>
                    {featured && <p className="text-gold text-[0.6rem] tracking-widest uppercase mb-1">Recommended</p>}
                    <p className="text-white font-semibold text-sm mb-2">{name}</p>
                    <p className="font-black text-gold-bright text-2xl">{price}</p>
                  </div>
                  <div className="p-4 bg-white text-sm text-neutral-600 text-center">{detail}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Appointment date/time */}
          <div>
            <p className="font-semibold text-[0.65rem] tracking-[0.18em] uppercase text-neutral-400 mb-3">
              Step 5 — Schedule First Appointment
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase text-navy/90 block mb-1.5">
                  Preferred Start Date <span className="text-error">*</span>
                </label>
                <input type="date"
                  className="w-full h-11 px-4 rounded-md border border-neutral-300 text-sm bg-white
                             focus:outline-none focus:border-gold focus:shadow-focus-gold transition-all" />
              </div>
              <div>
                <label className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase text-navy/90 block mb-1.5">
                  Preferred Time <span className="text-error">*</span>
                </label>
                <select className="w-full h-11 px-4 rounded-md border border-neutral-300 text-sm bg-white
                                    focus:outline-none focus:border-gold transition-all appearance-none">
                  <option value="" disabled>Select time slot</option>
                  {["8:00 AM – 9:30 AM","10:00 AM – 11:30 AM","2:00 PM – 3:30 PM","4:00 PM – 5:30 PM"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="p-4 bg-warning/8 border border-warning/25 rounded-xl text-xs text-navy/75 flex gap-2.5">
            <span className="text-warning flex-shrink-0" aria-hidden="true">⚠️</span>
            <p>By confirming, you agree to the <strong>Oak Sports Academy Waiver and Release Form</strong>.</p>
          </div>
        </div>
      </Modal>

      {/* ── Confirm toast ── */}
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "fixed bottom-8 left-1/2 -translate-x-1/2 z-[var(--z-toast)]",
          "flex items-center gap-3 px-6 py-3.5",
          "bg-navy border border-gold/40 rounded-full shadow-modal",
          "text-white font-semibold text-sm tracking-wide",
          "transition-all duration-300",
          confirmToast
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 pointer-events-none"
        )}
      >
        {confirmToast}
      </div>
    </>
  );
}
