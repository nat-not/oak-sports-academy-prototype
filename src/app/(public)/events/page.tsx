"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/cn";
import type { AcademyEvent } from "@/types";

// ─── Static data ──────────────────────────────────────────────────────────────

type EventFilter = AcademyEvent["category"] | "all";

const EVENTS: AcademyEvent[] = [
  {
    id: "1",
    title: "Yellow Belt → Green Belt Promotion Examination",
    description:
      "All qualifying Yellow Belt students are invited to take the Green Belt promotion exam. Ensure you have completed required sessions and demonstrated proficiency in required Poomsae and techniques.",
    date: "2026-11-15",
    time: "9:00 AM",
    location: "OSA Training Hall",
    category: "belt-promotion",
    tags: ["Promotion Test", "All Enrolled Students", "Kukkiwon Standard"],
    requiresRegistration: true,
  },
  {
    id: "2",
    title: "Inter-Academy Kyorugi Sparring Day",
    description:
      "A friendly supervised sparring event open to all enrolled Kyorugi students. A great opportunity to apply training in a safe, controlled environment. Protective gear required. Beginners are welcome.",
    date: "2026-11-22",
    time: "2:00 PM – 5:00 PM",
    location: "OSA Training Hall",
    category: "sparring",
    tags: ["Kyorugi Students", "All Levels", "Gear Required"],
    requiresRegistration: true,
  },
  {
    id: "3",
    title: "December Free Trial Class Batch — Registration Now Open",
    description:
      "New free trial class slots for December are now open for all age groups. Limited to 5 students per age group. The trial is completely free — create your account and book your slot today!",
    date: "2026-12-01",
    time: "By Appointment",
    location: "OSA Training Hall",
    category: "announcement",
    tags: ["New Students", "All Age Groups", "FREE"],
    requiresRegistration: false,
  },
  {
    id: "4",
    title: "Poomsae Workshop — All Belt Levels",
    description:
      "A comprehensive Poomsae workshop for all enrolled students covering foundational to intermediate Kukkiwon Poomsae patterns. Focused on improving form precision and performance quality.",
    date: "2026-12-06",
    time: "8:00 AM – 12:00 PM",
    location: "OSA Training Hall",
    category: "training",
    tags: ["All Enrolled Students", "Poomsae", "Workshop"],
    requiresRegistration: true,
  },
  {
    id: "5",
    title: "OSA Year-End Celebration & Student Recognition",
    description:
      "Join us for the Oak Sports Academy Year-End Celebration! Students will be recognised for achievements throughout the year. Belt promotions, certificates, and special awards will be presented. Families welcome!",
    date: "2026-12-20",
    time: "3:00 PM – 6:00 PM",
    location: "OSA Training Hall",
    category: "activity",
    tags: ["All Students & Families", "Awards Night", "Celebration"],
    requiresRegistration: false,
  },
  {
    id: "6",
    title: "New Year Promotion Test — Multiple Belt Levels",
    description:
      "The first major promotion test of 2027 covering multiple belt levels. Students who have completed their required sessions and met the technical requirements are eligible to test.",
    date: "2027-01-10",
    time: "9:00 AM",
    location: "OSA Training Hall",
    category: "belt-promotion",
    tags: ["Belt Test", "Multiple Levels", "By Eligibility"],
    requiresRegistration: true,
  },
];

// Badge config per category
const CATEGORY_CONFIG: Record<
  AcademyEvent["category"],
  { label: string; variant: React.ComponentProps<typeof StatusBadge>["variant"] }
> = {
  "belt-promotion": { label: "Belt Promotion", variant: "gold"    },
  sparring:         { label: "Sparring Event", variant: "error"   },
  announcement:     { label: "Announcement",   variant: "success" },
  training:         { label: "Training Event", variant: "navy"    },
  activity:         { label: "Academy Activity", variant: "info"  },
};

const FILTER_BUTTONS: { id: EventFilter; label: string }[] = [
  { id: "all",            label: "All Events"     },
  { id: "belt-promotion", label: "Belt Promotion" },
  { id: "sparring",       label: "Sparring"       },
  { id: "announcement",   label: "Announcements"  },
  { id: "training",       label: "Training Events"},
  { id: "activity",       label: "Activities"     },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function EventCard({ event }: { event: AcademyEvent }) {
  const d     = new Date(event.date);
  const day   = d.getDate().toString().padStart(2, "0");
  const month = d.toLocaleString("en-PH", { month: "short" }).toUpperCase();
  const year  = d.getFullYear();
  const cfg   = CATEGORY_CONFIG[event.category];

  return (
    <article
      aria-labelledby={`ev-title-${event.id}`}
      className="bg-white border border-neutral-200 rounded-2xl overflow-hidden
                 shadow-card hover:shadow-card-md hover:-translate-y-0.5
                 transition-all duration-200"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Date column */}
        <div
          className="bg-gradient-to-b from-gold-dark to-gold
                     flex-shrink-0 flex flex-col items-center justify-center
                     px-6 py-5 sm:py-0 sm:min-w-[88px]"
          aria-label={`Date: ${day} ${month} ${year}`}
        >
          <span className="font-black text-navy leading-none"
            style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)" }}>{day}</span>
          <span className="font-semibold text-navy/80 text-[0.58rem] tracking-widest uppercase">{month}</span>
          <span className="text-navy/60 text-[0.55rem]">{year}</span>
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          <StatusBadge
            variant={cfg.variant}
            label={cfg.label}
            size="xs"
            showDot={false}
            className="mb-2"
          />
          <h3
            id={`ev-title-${event.id}`}
            className="text-navy font-semibold text-base mb-2 leading-snug"
          >
            {event.title}
          </h3>
          <p className="text-neutral-500 text-sm leading-relaxed mb-3">{event.description}</p>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-neutral-400 text-xs mb-3">
            <span>📅 {new Date(event.date).toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
            <span>⏰ {event.time}</span>
            <span>📍 {event.location}</span>
          </div>

          {/* Tags + CTA */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {event.tags.map((tag) => (
                <span key={tag}
                  className="chip bg-neutral-100 border-neutral-200 text-neutral-500 text-[0.6rem]">
                  {tag}
                </span>
              ))}
            </div>
            {event.requiresRegistration && (
              <Link
                href="/login"
                className="text-gold font-semibold text-xs hover:text-gold-dark
                           underline underline-offset-2 transition-colors flex-shrink-0"
              >
                Register →
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<EventFilter>("all");

  const filtered = activeFilter === "all"
    ? EVENTS
    : EVENTS.filter((e) => e.category === activeFilter);

  return (
    <>
      {/* Page hero */}
      <section aria-label="Events hero" className="page-hero text-center">
        <div className="container-page relative z-10">
          <span className="section-label">Stay Updated</span>
          <h1 className="text-white mt-2 mb-4">Events &amp; Announcements</h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Stay informed about upcoming promotion tests, sparring days, academy activities, and important announcements.
          </p>
          <nav aria-label="Breadcrumb"
            className="mt-6 flex items-center justify-center gap-2 text-sm text-white/45">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">Events</span>
          </nav>
        </div>
      </section>

      <section className="section bg-neutral-50">
        <div className="container-page">
          {/* Announcement banner */}
          <div className="bg-gradient-to-r from-green to-navy rounded-2xl p-6 flex flex-col sm:flex-row gap-5
                          items-start sm:items-center mb-10 border border-gold/15">
            <div className="w-12 h-12 bg-gold/15 border-2 border-gold rounded-full
                            flex items-center justify-center text-xl flex-shrink-0" aria-hidden="true">
              📢
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gold text-[0.6rem] font-semibold tracking-[0.18em] uppercase mb-1">
                Important Announcement
              </p>
              <h2 className="text-white font-bold text-lg leading-snug mb-1">
                Free Trial Class — New Batch Open for Registration
              </h2>
              <p className="text-white/65 text-sm leading-relaxed">
                Limited slots available for all age groups. Early registration strongly encouraged.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button href="/signup" variant="primary" size="sm">Register Now</Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_280px] gap-8 items-start">
            {/* ── Main events list ── */}
            <div>
              {/* Filter bar */}
              <div className="flex flex-wrap gap-2 mb-6 bg-white border border-neutral-200
                              rounded-xl p-3 shadow-card-sm">
                <span className="text-[0.62rem] font-semibold tracking-[0.15em] uppercase
                                 text-neutral-400 self-center px-1 flex-shrink-0">
                  Filter:
                </span>
                {FILTER_BUTTONS.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveFilter(id)}
                    aria-pressed={activeFilter === id}
                    className={cn(
                      "px-3 py-1.5 rounded-full border text-[0.65rem] font-semibold",
                      "tracking-[0.08em] uppercase transition-all duration-150",
                      activeFilter === id
                        ? "bg-navy border-navy text-white shadow-sm"
                        : "bg-transparent border-neutral-200 text-neutral-500 hover:border-gold hover:text-gold-dark"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Results count */}
              <p className="text-neutral-400 text-xs mb-4">
                Showing {filtered.length} event{filtered.length !== 1 ? "s" : ""}
              </p>

              {/* Event cards */}
              {filtered.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {filtered.map((ev) => <EventCard key={ev.id} event={ev} />)}
                </div>
              ) : (
                <div className="text-center py-16 text-neutral-400">
                  <span className="text-4xl block mb-3">📭</span>
                  <p className="font-medium">No events found for this filter.</p>
                  <button
                    type="button"
                    onClick={() => setActiveFilter("all")}
                    className="mt-3 text-gold text-sm hover:text-gold-dark transition-colors underline underline-offset-2"
                  >
                    Show all events
                  </button>
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <aside className="space-y-5 lg:sticky lg:top-[calc(var(--navbar-height)+16px)]">
              {/* Upcoming at a glance */}
              <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-card">
                <div className="bg-navy px-5 py-4">
                  <h3 className="text-gold font-semibold text-[0.65rem] tracking-[0.18em] uppercase">
                    Upcoming at a Glance
                  </h3>
                </div>
                <div className="divide-y divide-neutral-100">
                  {EVENTS.slice(0, 5).map((ev) => {
                    const d = new Date(ev.date);
                    return (
                      <div key={ev.id} className="flex items-start gap-3 p-4">
                        <div className="bg-navy rounded-lg px-2.5 py-1.5 text-center flex-shrink-0 min-w-[44px]">
                          <div className="font-black text-gold text-lg leading-none">
                            {d.getDate().toString().padStart(2, "0")}
                          </div>
                          <div className="text-white/60 text-[0.52rem] tracking-widest uppercase">
                            {d.toLocaleString("en-PH", { month: "short" })}
                          </div>
                        </div>
                        <div>
                          <p className="text-navy font-semibold text-xs leading-snug line-clamp-2">{ev.title}</p>
                          <p className="text-neutral-400 text-[0.65rem] mt-0.5">{ev.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category legend */}
              <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-card">
                <div className="bg-navy px-5 py-4">
                  <h3 className="text-gold font-semibold text-[0.65rem] tracking-[0.18em] uppercase">
                    Categories
                  </h3>
                </div>
                <div className="p-4 space-y-2.5">
                  {Object.entries(CATEGORY_CONFIG).map(([cat, { label, variant }]) => (
                    <div key={cat} className="flex items-center gap-2.5">
                      <StatusBadge variant={variant} size="xs" showDot label={label} />
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div className="bg-gradient-to-br from-green to-navy rounded-2xl p-6 text-center border border-gold/15">
                <span className="text-3xl block mb-3" aria-hidden="true">🥋</span>
                <h3 className="text-white font-bold mb-2">Want to Participate?</h3>
                <p className="text-white/65 text-xs leading-relaxed mb-4">
                  Create your account and get approved to register for events and training sessions.
                </p>
                <Button href="/signup" variant="primary" size="sm" fullWidth>Create Account</Button>
                <Link href="/login"
                  className="block mt-2.5 text-gold/80 hover:text-gold text-xs transition-colors">
                  Already have an account? Log In →
                </Link>
              </div>

              {/* Notice */}
              <div className="p-4 bg-info/8 border border-info/25 rounded-xl text-xs text-navy/75 flex gap-2.5">
                <span className="text-info flex-shrink-0" aria-hidden="true">📌</span>
                <p>All sessions operate on a <strong>By Appointment Only</strong> basis. Attendance must be confirmed through the member portal.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
