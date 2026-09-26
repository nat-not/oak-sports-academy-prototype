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
  const [regAgeGroup,     setRegAgeGroup]     = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [waiverChecked,      setWaiverChecked]      = useState(false);
  const [trialWaiverChecked, setTrialWaiverChecked] = useState(false);
  const [waiverModalOpen,    setWaiverModalOpen]    = useState(false);
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
    setTrialAgeGroup("");
    setTrialWaiverChecked(false);
    showToast("✓ Free trial class booked!");
  };

  const confirmEnrollment = () => {
    setRegModalOpen(false);
    setRegAgeGroup("");
    setSelectedProgram("");
    setSelectedPackage(null);
    setWaiverChecked(false);
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
              {/* ── Header ── */}
              <div className="mb-8">
                <h1 id="reg-heading" className="text-navy font-bold text-2xl">Register / Enroll</h1>
                <p className="text-neutral-500 text-sm mt-1">
                  Choose the training option that fits your goals and schedule.
                </p>
              </div>

              {/* ════════════════════════════════════
                  ROW 1 — Free Trial (full width)
              ════════════════════════════════════ */}
              <div className="mb-5">
                <button
                  type="button"
                  onClick={() => setTrialModalOpen(true)}
                  className="w-full text-left bg-white border-2 border-neutral-200 rounded-2xl
                             overflow-hidden hover:border-green hover:shadow-card-lg
                             hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                >
                  <div className="grid md:grid-cols-[auto_1fr] gap-0">
                    {/* Left accent strip */}
                    <div className="bg-gradient-to-b from-green to-navy-mid
                                    flex items-center justify-center
                                    px-8 py-7 md:py-0 min-w-[120px]">
                      <div className="text-center">
                        <span className="text-5xl block mb-2" aria-hidden="true">🎁</span>
                        <span className="font-black text-gold-bright text-2xl leading-none block">
                          FREE
                        </span>
                        <span className="text-white/60 text-[0.6rem] tracking-widest uppercase">
                          ₱0
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-navy font-bold text-xl">Free Trial Class</h3>
                        <span className="bg-green/10 border border-green/20 text-green-mid
                                         text-[0.62rem] font-semibold tracking-[0.1em] uppercase
                                         px-2.5 py-1 rounded-full">
                          No Cost · No Commitment
                        </span>
                      </div>
                      <p className="text-neutral-500 text-sm leading-relaxed mb-4 max-w-xl">
                        Experience Oak Sports Academy Taekwondo training at no cost.
                        Available for all age groups — perfect for new students exploring the sport.
                      </p>
                      <ul className="flex flex-wrap gap-x-6 gap-y-1.5">
                        {[
                          "Completely FREE group class",
                          "Max 2 trial days per student",
                          "All 4 age groups (3–5, 6–12, 13–17, 18+)",
                          "Max 5 slots per age group",
                          "No commitment required",
                        ].map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-neutral-600">
                            <span className="text-green-mid font-bold flex-shrink-0" aria-hidden="true">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </button>
              </div>

              {/* ════════════════════════════════════
                  ROW 2 — Group Class  |  Private
              ════════════════════════════════════ */}
              <div className="grid md:grid-cols-2 gap-5 mb-8">

                {/* ── GROUP CLASS ── */}
                <div
                  className="bg-white border-2 border-neutral-200 rounded-2xl overflow-hidden
                             hover:border-gold hover:shadow-gold hover:-translate-y-1
                             transition-all duration-200 flex flex-col"
                >
                  {/* Card header */}
                  <div className="bg-gradient-to-br from-navy to-navy-light px-6 pt-6 pb-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30
                                      flex items-center justify-center text-2xl flex-shrink-0">
                        👥
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg leading-tight">Group Classes</h3>
                        <p className="text-white/55 text-xs mt-0.5">
                          Min 3 · Max 5 students per group
                        </p>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Learn, grow, and stay motivated alongside your peers in an optimal,
                      small-group environment.
                    </p>
                  </div>

                  {/* Package cards */}
                  <div className="p-5 flex flex-col gap-3 flex-1">

                    {/* Premium */}
                    <div className="rounded-xl border-2 border-gold/40 bg-gold/5 p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="text-[0.6rem] font-bold tracking-[0.12em] uppercase
                                           text-gold-dark bg-gold/15 px-2 py-0.5 rounded-full">
                            Premium Package
                          </span>
                          <p className="text-navy font-black text-2xl mt-1.5 leading-none">
                            ₱5,500
                            <span className="text-neutral-400 font-normal text-sm ml-1">/ student</span>
                          </p>
                        </div>
                        <span className="text-[0.62rem] font-semibold text-green-mid bg-green/8
                                         border border-green/20 px-2 py-1 rounded-full whitespace-nowrap">
                          Save ₱1,000!
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {[
                          "8 total sessions",
                          "🎁 FREE Premium Taekwondo Uniform (every student)",
                          "Enjoy a ₱1,000 discount",
                        ].map((f) => (
                          <li key={f} className="flex items-start gap-2 text-xs text-neutral-700">
                            <span className="text-gold-dark font-bold flex-shrink-0 mt-0.5">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Standard */}
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                      <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase
                                    text-neutral-500 mb-1.5">
                        Standard Package
                      </p>
                      <p className="text-navy font-black text-2xl leading-none mb-2">
                        ₱3,800
                        <span className="text-neutral-400 font-normal text-sm ml-1">/ student</span>
                      </p>
                      <ul className="space-y-1.5">
                        {[
                          "8 total sessions",
                          "No uniform included",
                        ].map((f) => (
                          <li key={f} className="flex items-start gap-2 text-xs text-neutral-600">
                            <span className="text-neutral-400 font-bold flex-shrink-0 mt-0.5">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <button
                      type="button"
                      onClick={() => { setTrainingOption("group"); setRegModalOpen(true); }}
                      className="mt-auto w-full py-3 rounded-xl
                                 bg-gradient-to-r from-gold-dark via-gold to-gold-bright
                                 text-navy font-bold text-sm tracking-wide
                                 hover:shadow-gold hover:-translate-y-0.5
                                 transition-all duration-200"
                    >
                      Enroll in Group Class
                    </button>
                  </div>
                </div>

                {/* ── ONE-ON-ONE PRIVATE ── */}
                <div
                  className="bg-white border-2 border-neutral-200 rounded-2xl overflow-hidden
                             hover:border-gold hover:shadow-gold hover:-translate-y-1
                             transition-all duration-200 flex flex-col"
                >
                  {/* Card header */}
                  <div className="bg-gradient-to-br from-green to-navy-mid px-6 pt-6 pb-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30
                                      flex items-center justify-center text-2xl flex-shrink-0">
                        🎯
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg leading-tight">One-on-One Private</h3>
                        <p className="text-white/55 text-xs mt-0.5">
                          1 student · 1 dedicated coach
                        </p>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Maximize your growth with individualized attention tailored specifically
                      to your pace and goals.
                    </p>
                  </div>

                  {/* Package cards */}
                  <div className="p-5 flex flex-col gap-3 flex-1">

                    {/* Premium */}
                    <div className="rounded-xl border-2 border-gold/40 bg-gold/5 p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="text-[0.6rem] font-bold tracking-[0.12em] uppercase
                                           text-gold-dark bg-gold/15 px-2 py-0.5 rounded-full">
                            Premium Package
                          </span>
                          <p className="text-navy font-black text-2xl mt-1.5 leading-none">
                            ₱6,500
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-1.5">
                        {[
                          "8 total sessions (6 Sessions + 2 FREE Bonus Sessions)",
                          "🎁 FREE Premium Taekwondo Uniform",
                          "Fully personalised curriculum",
                        ].map((f) => (
                          <li key={f} className="flex items-start gap-2 text-xs text-neutral-700">
                            <span className="text-gold-dark font-bold flex-shrink-0 mt-0.5">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Standard */}
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                      <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase
                                    text-neutral-500 mb-1.5">
                        Standard Package
                      </p>
                      <p className="text-navy font-black text-2xl leading-none mb-2">₱3,800</p>
                      <ul className="space-y-1.5">
                        {[
                          "8 total sessions (6 Sessions + 2 FREE Bonus Sessions)",
                          "No uniform included",
                        ].map((f) => (
                          <li key={f} className="flex items-start gap-2 text-xs text-neutral-600">
                            <span className="text-neutral-400 font-bold flex-shrink-0 mt-0.5">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <button
                      type="button"
                      onClick={() => { setTrainingOption("private"); setRegModalOpen(true); }}
                      className="mt-auto w-full py-3 rounded-xl
                                 bg-gradient-to-r from-gold-dark via-gold to-gold-bright
                                 text-navy font-bold text-sm tracking-wide
                                 hover:shadow-gold hover:-translate-y-0.5
                                 transition-all duration-200"
                    >
                      Book Private Session
                    </button>
                  </div>
                </div>

              </div>

              {/* ── By Appointment notice ── */}
              <div className="p-4 bg-info/8 border border-info/25 rounded-xl
                              text-sm text-navy/75 flex gap-3">
                <span className="text-info flex-shrink-0" aria-hidden="true">ℹ️</span>
                <p>
                  OSA operates on a <strong>By Appointment Only</strong> basis.
                  After selecting your training option, you will choose your preferred
                  schedule and time slot.
                </p>
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
            <Button variant="secondary" size="md" onClick={() => setTrialModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={confirmTrial}
              disabled={!trialWaiverChecked}
              title={!trialWaiverChecked
                ? "Please read and agree to the waiver to continue."
                : undefined}
            >
              Confirm Free Trial
            </Button>
          </>
        }
      >
        <div className="space-y-6">

          {/* Info banner */}
          <div className="p-3.5 bg-success/8 border border-success/25 rounded-xl
                          flex gap-2.5 text-sm text-navy/80">
            <span aria-hidden="true" className="text-success flex-shrink-0">🎉</span>
            <div>
              <strong>FREE GROUP TRIAL CLASS</strong> — Experience OSA Taekwondo training at no
              cost. Max 2 trial days per student. Total capacity: 20 students across all groups.
            </div>
          </div>

          {/* Age Group Selection */}
          <div>
            <p className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase
                           text-navy/90 mb-3">
              Step 1 — Select Your Age Group <span className="text-error">*</span>
            </p>

            {/* Capacity bar */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs text-neutral-500">Total Capacity</span>
              <span className="text-xs font-semibold text-navy">20 Students (5 per group)</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { v: "3-5",    icon: "🐣", label: "3 – 5 Years Old",   sub: "Little Champions", slots: 5 },
                { v: "6-12",   icon: "🧒", label: "6 – 12 Years Old",  sub: "Junior Warriors",  slots: 5 },
                { v: "13-18",  icon: "🧑", label: "13 – 18 Years Old", sub: "Teen Athletes",    slots: 5 },
                { v: "adults", icon: "🏅", label: "Adults (18+)",      sub: "Adult Champions",  slots: 5 },
              ].map(({ v, icon, label, sub, slots }) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setTrialAgeGroup(v)}
                  aria-pressed={trialAgeGroup === v}
                  className={cn(
                    "text-left p-4 rounded-xl border-2 transition-all duration-150",
                    trialAgeGroup === v
                      ? "border-gold bg-gold/5 shadow-gold-sm"
                      : "border-neutral-200 hover:border-gold/40 bg-white"
                  )}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-2xl" aria-hidden="true">{icon}</span>
                    {trialAgeGroup === v && (
                      <span className="w-5 h-5 rounded-full bg-gold flex items-center
                                       justify-center text-navy text-[0.65rem] font-black
                                       flex-shrink-0">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-navy text-sm leading-tight">{label}</p>
                  <p className="text-neutral-500 text-xs mt-0.5">{sub}</p>
                  {/* Slot indicator */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: slots }).map((_, i) => (
                        <div
                          key={i}
                          className="w-4 h-1.5 rounded-full bg-green-mid/40"
                        />
                      ))}
                    </div>
                    <span className="text-[0.62rem] text-neutral-400">
                      {slots} slots available
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date + time */}
          <div>
            <p className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase
                           text-navy/90 mb-3">
              Step 2 — Schedule Your Trial Day <span className="text-error">*</span>
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase
                                   text-navy/90 block mb-1.5">
                  Preferred Date
                </label>
                <input
                  type="date"
                  className="w-full h-11 px-4 rounded-md border border-neutral-300 text-sm
                             bg-white focus:outline-none focus:border-gold
                             focus:shadow-focus-gold transition-all"
                />
              </div>
              <div>
                <label className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase
                                   text-navy/90 block mb-1.5">
                  Preferred Time
                </label>
                <select
                  className="w-full h-11 px-4 rounded-md border border-neutral-300 text-sm
                             bg-white focus:outline-none focus:border-gold
                             focus:shadow-focus-gold transition-all appearance-none"
                >
                  <option value="" disabled>Select time slot</option>
                  {["8:00 AM – 9:30 AM", "10:00 AM – 11:30 AM",
                    "2:00 PM – 3:30 PM",  "4:00 PM – 5:30 PM"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Rate */}
          <div className="p-4 bg-green/6 border border-green/15 rounded-xl
                          flex items-center justify-between">
            <div>
              <p className="text-[0.62rem] font-semibold tracking-[0.15em] uppercase
                            text-green-mid mb-0.5">
                Rate
              </p>
              <p className="text-green-mid font-black text-2xl leading-none">₱0 — FREE</p>
            </div>
            <span className="text-4xl" aria-hidden="true">🎁</span>
          </div>

          {/* Waiver & Consent */}
          <div>
            <p className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase
                           text-navy/90 mb-3">
              Step 3 — Waiver &amp; Consent <span className="text-error">*</span>
            </p>

            {/* Checkbox row */}
            <label
              className={cn(
                "flex items-start gap-3.5 p-5 rounded-xl border-2 cursor-pointer",
                "transition-all duration-150 select-none",
                trialWaiverChecked
                  ? "border-gold bg-gold/5"
                  : "border-neutral-200 bg-white hover:border-gold/40"
              )}
            >
              {/* Custom checkbox */}
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={trialWaiverChecked}
                  onChange={(e) => setTrialWaiverChecked(e.target.checked)}
                  className="sr-only"
                  aria-describedby="trial-waiver-desc"
                />
                <div
                  className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center",
                    "transition-all duration-150",
                    trialWaiverChecked
                      ? "bg-gold border-gold"
                      : "bg-white border-neutral-300"
                  )}
                  aria-hidden="true"
                >
                  {trialWaiverChecked && (
                    <svg
                      className="w-3 h-3 text-navy"
                      viewBox="0 0 12 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="1,5 4.5,8.5 11,1" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Label text */}
              <span
                id="trial-waiver-desc"
                className="text-sm text-neutral-700 leading-relaxed"
              >
                By checking this box, I confirm that I have read, understood, and agree
                to the terms and conditions of the{" "}
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); setWaiverModalOpen(true); }}
                  className="font-bold text-gold-dark underline underline-offset-2
                             hover:text-gold transition-colors duration-150
                             focus:outline-none focus-visible:ring-2
                             focus-visible:ring-gold focus-visible:rounded-sm"
                >
                  Oak Sports Academy Waiver and Release Form
                </button>
                .
              </span>
            </label>

            {/* Read waiver link */}
            <p className="text-xs text-neutral-400 mt-2.5 flex items-center gap-1.5">
              <span aria-hidden="true">📄</span>
              <span>
                You can{" "}
                <button
                  type="button"
                  onClick={() => setWaiverModalOpen(true)}
                  className="text-gold-dark font-medium underline underline-offset-2
                             hover:text-gold transition-colors"
                >
                  read the full waiver here
                </button>{" "}
                before agreeing.
              </span>
            </p>
          </div>
        </div>
      </Modal>

      {/* ════════════════════════════════════════
          REGULAR TRAINING MODAL
      ════════════════════════════════════════ */}
      <Modal
        title={trainingOption === "private"
          ? "🎯 One-on-One Private Coaching"
          : "👥 Group Class Enrollment"}
        open={regModalOpen}
        onClose={() => setRegModalOpen(false)}
        footer={
          <>
            <Button variant="secondary" size="md" onClick={() => setRegModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={confirmEnrollment}
              disabled={!waiverChecked}
              title={!waiverChecked ? "Please read and agree to the waiver to continue." : undefined}
            >
              Confirm Enrollment
            </Button>
          </>
        }
      >
        <div className="space-y-7">

          {/* ── Context banner ── */}
          <div className={cn(
            "p-3.5 rounded-xl border flex gap-3 text-sm",
            trainingOption === "private"
              ? "bg-green/6 border-green/20 text-navy/80"
              : "bg-info/8 border-info/25 text-navy/80"
          )}>
            <span aria-hidden="true" className="flex-shrink-0 text-lg">
              {trainingOption === "private" ? "🎯" : "👥"}
            </span>
            <p>
              {trainingOption === "private"
                ? "One-on-One Private Coaching — fully personalised sessions with the head coach at your own pace."
                : "Group Class — small-group training (min 3, max 5 students). Train alongside peers in a focused environment."}
            </p>
          </div>

          {/* ── Step 1 — Age Group ── */}
          <div>
            <p className="font-semibold text-[0.65rem] tracking-[0.18em] uppercase
                           text-neutral-400 mb-3">
              Step 1 — Select Age Group <span className="text-error">*</span>
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { v: "3-5",    icon: "🐣", label: "3 – 5 Years Old",   sub: "Little Champions" },
                { v: "6-12",   icon: "🧒", label: "6 – 12 Years Old",  sub: "Junior Warriors"  },
                { v: "13-18",  icon: "🧑", label: "13 – 18 Years Old", sub: "Teen Athletes"    },
                { v: "adults", icon: "🏅", label: "Adults (18+)",      sub: "Adult Champions"  },
              ].map(({ v, icon, label, sub }) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setRegAgeGroup(v)}
                  aria-pressed={regAgeGroup === v}
                  className={cn(
                    "text-left p-3.5 rounded-xl border-2 transition-all duration-150",
                    regAgeGroup === v
                      ? "border-gold bg-gold/5 shadow-gold-sm"
                      : "border-neutral-200 hover:border-gold/40 bg-white"
                  )}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl" aria-hidden="true">{icon}</span>
                    {regAgeGroup === v && (
                      <span className="w-5 h-5 rounded-full bg-gold flex items-center
                                       justify-center text-navy text-[0.65rem] font-black">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-navy text-sm leading-tight">{label}</p>
                  <p className="text-neutral-400 text-xs mt-0.5">{sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* ── Step 2 — Program ── */}
          <div>
            <p className="font-semibold text-[0.65rem] tracking-[0.18em] uppercase
                           text-neutral-400 mb-3">
              Step 2 — Select Program <span className="text-error">*</span>
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { v: "kyorugi", icon: "⚔️", label: "Kyorugi", sub: "Olympic Sparring" },
                { v: "poomsae", icon: "🌿", label: "Poomsae", sub: "Traditional Forms" },
              ].map(({ v, icon, label, sub }) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSelectedProgram(v)}
                  aria-pressed={selectedProgram === v}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border-2 text-left",
                    "transition-all duration-150",
                    selectedProgram === v
                      ? "border-gold bg-gold/5 shadow-gold-sm"
                      : "border-neutral-200 hover:border-gold/50 bg-white"
                  )}
                >
                  <span className="text-2xl flex-shrink-0" aria-hidden="true">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy text-sm">{label}</p>
                    <p className="text-neutral-400 text-xs mt-0.5">{sub}</p>
                  </div>
                  {selectedProgram === v && (
                    <span
                      className="w-5 h-5 rounded-full bg-gold flex items-center justify-center
                                 text-navy text-[0.65rem] font-black flex-shrink-0"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Step 3 — Frequency & Schedule ── */}
          <div>
            <p className="font-semibold text-[0.65rem] tracking-[0.18em] uppercase
                           text-neutral-400 mb-3">
              Step 3 — Frequency &amp; Schedule <span className="text-error">*</span>
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase
                                   text-navy/90 block mb-1.5">
                  Training Frequency
                </label>
                <select className="w-full h-11 px-4 rounded-md border border-neutral-300
                                   text-sm bg-white focus:outline-none focus:border-gold
                                   transition-all appearance-none">
                  <option value="" disabled>Select frequency</option>
                  <option>Twice a week</option>
                  <option>Thrice a week</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase
                                   text-navy/90 block mb-1.5">
                  Schedule
                </label>
                <select className="w-full h-11 px-4 rounded-md border border-neutral-300
                                   text-sm bg-white focus:outline-none focus:border-gold
                                   transition-all appearance-none">
                  <option value="" disabled>Select schedule</option>
                  <option>Weekday — After-School Classes</option>
                  <option>Weekend — Saturday Classes</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── Step 4 — Package ── */}
          <div>
            <p className="font-semibold text-[0.65rem] tracking-[0.18em] uppercase
                           text-neutral-400 mb-3">
              Step 4 — Select Package <span className="text-error">*</span>
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {([
                {
                  v:        "with-uniform" as RegPackage,
                  name:     "Premium Package",
                  price:    trainingOption === "private" ? "₱6,500" : "₱5,500",
                  detail:   trainingOption === "private"
                              ? "8 sessions (6 + 2 FREE Bonus) · 🎁 Free Uniform"
                              : "8 sessions · 🎁 Free Uniform · Save ₱1,000",
                  featured: true,
                },
                {
                  v:        "without-uniform" as RegPackage,
                  name:     "Standard Package",
                  price:    "₱3,800",
                  detail:   trainingOption === "private"
                              ? "8 sessions (6 + 2 FREE Bonus) · No uniform"
                              : "8 sessions · No uniform",
                  featured: false,
                },
              ]).map(({ v, name, price, detail, featured }) => (
                <button
                  key={String(v)}
                  type="button"
                  onClick={() => setSelectedPackage(v)}
                  aria-pressed={selectedPackage === v}
                  className={cn(
                    "rounded-xl overflow-hidden border-2 text-left transition-all duration-150",
                    selectedPackage === v
                      ? "border-gold shadow-gold-sm"
                      : featured
                      ? "border-gold/40 hover:border-gold"
                      : "border-neutral-200 hover:border-gold/40"
                  )}
                >
                  <div className={cn(
                    "px-5 py-4 text-center",
                    featured ? "bg-gradient-to-br from-green to-navy" : "bg-navy"
                  )}>
                    {featured && (
                      <p className="text-gold text-[0.6rem] tracking-widest uppercase mb-1">
                        Recommended
                      </p>
                    )}
                    <p className="text-white font-semibold text-sm mb-1.5">{name}</p>
                    <p className="font-black text-gold-bright text-2xl">{price}</p>
                  </div>
                  <div className="p-3.5 bg-white text-xs text-neutral-600 text-center leading-relaxed">
                    {detail}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ── Step 5 — Appointment ── */}
          <div>
            <p className="font-semibold text-[0.65rem] tracking-[0.18em] uppercase
                           text-neutral-400 mb-3">
              Step 5 — Schedule First Appointment <span className="text-error">*</span>
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase
                                   text-navy/90 block mb-1.5">
                  Preferred Start Date
                </label>
                <input
                  type="date"
                  className="w-full h-11 px-4 rounded-md border border-neutral-300 text-sm
                             bg-white focus:outline-none focus:border-gold
                             focus:shadow-focus-gold transition-all"
                />
              </div>
              <div>
                <label className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase
                                   text-navy/90 block mb-1.5">
                  Preferred Time
                </label>
                <select className="w-full h-11 px-4 rounded-md border border-neutral-300
                                   text-sm bg-white focus:outline-none focus:border-gold
                                   transition-all appearance-none">
                  <option value="" disabled>Select time slot</option>
                  {["8:00 AM – 9:30 AM", "10:00 AM – 11:30 AM",
                    "2:00 PM – 3:30 PM",  "4:00 PM – 5:30 PM"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ── Step 6 — Waiver & Consent ── */}
          <div>
            <p className="font-semibold text-[0.65rem] tracking-[0.18em] uppercase
                           text-neutral-400 mb-4">
              Step 6 — Waiver &amp; Consent <span className="text-error">*</span>
            </p>

            {/* Checkbox row */}
            <label
              className={cn(
                "flex items-start gap-3.5 p-5 rounded-xl border-2 cursor-pointer",
                "transition-all duration-150 select-none",
                waiverChecked
                  ? "border-gold bg-gold/5"
                  : "border-neutral-200 bg-white hover:border-gold/40"
              )}
            >
              {/* Custom checkbox */}
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={waiverChecked}
                  onChange={(e) => setWaiverChecked(e.target.checked)}
                  className="sr-only"
                  aria-describedby="waiver-desc"
                />
                <div
                  className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center",
                    "transition-all duration-150",
                    waiverChecked
                      ? "bg-gold border-gold"
                      : "bg-white border-neutral-300"
                  )}
                  aria-hidden="true"
                >
                  {waiverChecked && (
                    <svg
                      className="w-3 h-3 text-navy"
                      viewBox="0 0 12 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="1,5 4.5,8.5 11,1" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Label text */}
              <span
                id="waiver-desc"
                className="text-sm text-neutral-700 leading-relaxed"
              >
                By checking this box, I confirm that I have read, understood, and agree
                to the terms and conditions of the{" "}
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); setWaiverModalOpen(true); }}
                  className="font-bold text-gold-dark underline underline-offset-2
                             hover:text-gold transition-colors duration-150
                             focus:outline-none focus-visible:ring-2
                             focus-visible:ring-gold focus-visible:rounded-sm"
                >
                  Oak Sports Academy Waiver and Release Form
                </button>
                .
              </span>
            </label>

            {/* View waiver link below */}
            <p className="text-xs text-neutral-400 mt-2.5 flex items-center gap-1.5">
              <span aria-hidden="true">📄</span>
              <span>
                You can{" "}
                <button
                  type="button"
                  onClick={() => setWaiverModalOpen(true)}
                  className="text-gold-dark font-medium underline underline-offset-2
                             hover:text-gold transition-colors"
                >
                  read the full waiver here
                </button>{" "}
                before agreeing.
              </span>
            </p>
          </div>

        </div>
      </Modal>

      {/* ════════════════════════════════════════
          WAIVER & RELEASE FORM MODAL
      ════════════════════════════════════════ */}
      <Modal
        title="📜 Oak Sports Academy — Waiver & Release Form"
        open={waiverModalOpen}
        onClose={() => setWaiverModalOpen(false)}
        footer={
          <Button variant="primary" size="md" onClick={() => setWaiverModalOpen(false)}>
            Close
          </Button>
        }
      >
        <div className="space-y-6 text-sm text-neutral-700 leading-relaxed">

          {/* Header */}
          <div className="p-4 bg-navy rounded-xl text-center">
            <p className="text-gold font-bold text-[0.68rem] tracking-[0.2em] uppercase mb-1">
              Legal Document
            </p>
            <h3 className="text-white font-bold text-base leading-snug">
              Release and Waiver of Liability<br />and Indemnity Agreement
            </h3>
          </div>

          <p className="text-neutral-600">
            In consideration of being allowed to participate in any Oaks Sports Academy program,
            activity, or event, or to enter any restricted area where access to the general public
            is not permitted, the parent(s) and/or legal guardian(s) of the minor participant agree
            to the following terms:
          </p>

          {/* Section 1 */}
          <div>
            <h4 className="font-bold text-navy mb-2">1. Safety Responsibility</h4>
            <ul className="space-y-2 list-none pl-0">
              {[
                "I/We agree to instruct the minor participant to carefully inspect the facilities and equipment before participating in any martial arts activity or event.",
                "If the participant notices or believes that any facility, equipment, or condition is unsafe, he/she must immediately inform the appropriate instructor or official and must not participate until the concern has been addressed.",
                "I/We understand that the participant has the right and responsibility to refuse to participate in any activity that he/she believes is unsafe.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-gold font-bold flex-shrink-0 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h4 className="font-bold text-navy mb-2">2. Understanding of the Risks</h4>
            <p className="mb-2">
              I/We fully understand and acknowledge that participation in martial arts activities
              involves inherent risks, including but not limited to:
            </p>
            <ul className="space-y-1.5 pl-4 mb-3">
              {[
                "Bodily injury or physical harm;",
                "Serious or permanent disability;",
                "Paralysis;",
                "Property damage; and",
                "Death.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-gold font-bold flex-shrink-0">–</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mb-2">
              I/We also understand that these risks may result in significant medical, personal,
              emotional, and financial consequences.
            </p>
            <p>
              These risks may arise from the actions or inactions of the participant, other
              participants, instructors, staff, or other individuals, including the parties
              identified as &quot;Releasees&quot; below. I/We also acknowledge that there may be risks
              that are unknown or cannot reasonably be anticipated at this time.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h4 className="font-bold text-navy mb-2">3. Assumption of Risk</h4>
            <p>
              I/We voluntarily accept and assume all risks associated with the participant&apos;s
              involvement in the martial arts program, activity, or event. This includes
              responsibility for any loss, injury, disability, paralysis, death, or property damage
              that may occur, whether caused in whole or in part by the negligence or actions of
              the Releasees, to the extent permitted by applicable law.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h4 className="font-bold text-navy mb-2">4. Release and Waiver of Liability</h4>
            <p className="mb-2">
              I/We hereby <strong>RELEASE, WAIVE, DISCHARGE, AND AGREE NOT TO SUE</strong> Oak
              Sports and the martial arts facility used by the participant, including its owners,
              managers, instructors, promoters, lessees, event or premises inspectors, consultants,
              underwriters, agents, employees, officers, directors, and other individuals or
              organizations involved in providing recommendations, instructions, supervision, risk
              evaluation, or safety and loss-control activities related to the facility or event.
            </p>
            <p className="mb-2">
              All of the above parties are collectively referred to as the &quot;Releasees.&quot;
            </p>
            <p>
              To the fullest extent permitted by applicable law, I/We release and hold the Releasees
              harmless from any and all claims, demands, losses, damages, liabilities, or causes of
              action arising from or related to the participant&apos;s involvement in the martial arts
              program, activity, or event, including claims involving personal injury, disability,
              death, or property damage, whether alleged to have been caused in whole or in part by
              the negligence of the Releasees or otherwise.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h4 className="font-bold text-navy mb-2">5. Acknowledgment of Serious Risks</h4>
            <p className="mb-2">
              I/We understand and acknowledge that martial arts activities can be physically
              demanding and involve the risk of serious injury, disability, death, and/or property
              damage.
            </p>
            <p>
              I/We further understand that an injury may become more serious due to circumstances
              involving emergency response, rescue, or medical assistance, including circumstances
              involving the negligence of persons providing such assistance, to the extent permitted
              by applicable law.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h4 className="font-bold text-navy mb-2">6. Applicable Law and Severability</h4>
            <p className="mb-2">
              I/We agree that this Release, Waiver, and Indemnity Agreement is intended to be as
              broad and inclusive as permitted by the laws of the Province or State in which the
              martial arts program or event takes place.
            </p>
            <p>
              If any portion of this Agreement is determined to be invalid or unenforceable, the
              remaining provisions shall continue to remain in full force and effect to the extent
              permitted by law.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h4 className="font-bold text-navy mb-2">
              7. Parent/Legal Guardian Agreement and Indemnification
            </h4>
            <p className="mb-2">
              By signing this Agreement, I/We confirm that I/We are the parent(s) and/or legal
              guardian(s) of the minor participant and that I/We have read, understood, and
              voluntarily agreed to the terms of this Release, Waiver, and Indemnity Agreement.
            </p>
            <p>
              I/We agree that if, despite this Agreement, the participant or anyone acting on the
              participant&apos;s behalf makes a claim or brings an action against any of the Releasees,
              I/We will, to the extent permitted by applicable law, reimburse and hold harmless the
              Releasees from any amounts they are legally required to pay to the participant or on
              the participant&apos;s behalf.
            </p>
          </div>

          {/* Footer notice */}
          <div className="p-4 bg-warning/8 border border-warning/25 rounded-xl
                          flex items-start gap-2.5 text-xs text-neutral-600">
            <span className="text-warning flex-shrink-0" aria-hidden="true">⚠️</span>
            <p>
              Please read this document carefully before accepting. By ticking the checkbox
              in the enrollment form, you confirm that you have read, understood, and agree
              to all terms above.
            </p>
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
