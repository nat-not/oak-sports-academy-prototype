/**
 * Home Page — Oak Sports Academy
 * Route: /  (src/app/page.tsx)
 *
 * Sections (per SoftEng1-Project spec):
 *  1.  Navbar           — in layout.tsx
 *  2.  Hero             — "FREE TAEKWONDO TRIAL CLASS" promotional hero
 *  3.  Stats bar        — social proof numbers
 *  4.  Mission & Vision — academy mission and vision cards
 *  5.  Academy Highlights — gallery placeholder grid
 *  6.  Coach Background — coach profile card
 *  7.  Training Programs — Kyorugi & Poomsae cards
 *  8.  Training Options — Free Trial / Group / Private pricing cards
 *  9.  Upcoming Events  — event list preview
 * 10.  OSA Merch        — merch preview grid
 * 11.  CTA Banner       — final sign-up call-to-action
 *  —   Footer           — in layout.tsx
 */

import type { Metadata } from "next";
import { Button }        from "@/components/ui/Button";
import { StatusBadge }   from "@/components/ui/StatusBadge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn }            from "@/lib/cn";
import type {
  AgeGroupInfo,
  ProgramCard,
  OptionCard,
  AcademyEvent,
} from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Oak Sports Academy — World-Class Taekwondo Training",
  description:
    "Experience world-class Taekwondo training at Oak Sports Academy. " +
    "Free trial classes, group and private coaching for ages 3 to adult. " +
    "Affiliated with PTA, Kukkiwon, and World Taekwondo.",
};

// ─────────────────────────────────────────────────────────────────────────────
//  STATIC PAGE DATA
// ─────────────────────────────────────────────────────────────────────────────

const HERO_BADGES = [
  { icon: "🥋", text: "Free Group Trial Class"        },
  { icon: "📅", text: "Max 2 Trial Days / Student"    },
  { icon: "👥", text: "Limited Slots Available"        },
  { icon: "🎯", text: "Ages 3 – Adult"                },
] as const;

const STATS = [
  { value: "20+",  label: "Active Students"     },
  { value: "3",    label: "Training Programs"   },
  { value: "100%", label: "PTA Certified"        },
  { value: "4",    label: "Age Groups Served"   },
] as const;

const AGE_GROUPS: AgeGroupInfo[] = [
  { id: "3-5",   label: "3 – 5 Years",   description: "Fun-based intro to Taekwondo movement & coordination.", maxSlots: 5, icon: "🐣" },
  { id: "6-12",  label: "6 – 12 Years",  description: "Structured training building discipline & core techniques.", maxSlots: 5, icon: "🧒" },
  { id: "13-17", label: "13 – 17 Years", description: "Advanced technique, competition prep & character building.", maxSlots: 5, icon: "🧑" },
  { id: "adult", label: "Adult (18+)",   description: "Fitness-focused and competitive training for any level.", maxSlots: 5, icon: "🏅" },
];

const PROGRAMS: ProgramCard[] = [
  {
    id: "kyorugi",
    title: "Kyorugi",
    subtitle: "Olympic Sparring",
    icon: "⚔️",
    description:
      "Dynamic Olympic-style sparring training. Develop speed, agility, timing, and tactical combat thinking through supervised sparring practice.",
    features: [
      "Olympic-style kick & punch combinations",
      "Footwork, distance & timing management",
      "Defensive & offensive strategies",
      "Physical conditioning & reflex training",
      "Competition preparation",
    ],
    href: "/training-programs",
  },
  {
    id: "poomsae",
    title: "Poomsae",
    subtitle: "Traditional Forms",
    icon: "🌿",
    description:
      "Traditional Taekwondo forms practice aligned with Kukkiwon international standards. Master precision, balance, and mental focus.",
    features: [
      "Kukkiwon-standard Poomsae sequences",
      "Balance, coordination & body control",
      "Precision & technical mastery",
      "Belt promotion exam preparation",
      "Mental discipline & focus training",
    ],
    href: "/training-programs",
  },
];

const TRAINING_OPTIONS: OptionCard[] = [
  {
    id: "free-trial",
    title: "Free Trial Class",
    badge: "FREE — No Cost",
    icon: "🎁",
    price: 0,
    priceSub: "Group class · Max 2 trial days",
    features: [
      "Completely FREE group class",
      "Max 2 trial days per student",
      "All 4 age groups available",
      "5 slots per age group",
      "No commitment required",
    ],
    cta: { label: "Book Free Trial", href: "/signup" },
    variant: "secondary",
  },
  {
    id: "group-class",
    title: "Group Class",
    badge: "Most Popular",
    icon: "👥",
    price: 3800,
    priceSub: "Per student · 8 sessions total",
    features: [
      "Min 3 — Max 5 students per group",
      "8 sessions (6 regular + 2 bonus)",
      "Small-group personalised attention",
      "Twice or thrice weekly schedule",
      "₱5,500 with Premium Uniform",
    ],
    cta: { label: "Enroll Now", href: "/signup" },
    variant: "primary",
  },
  {
    id: "private-coaching",
    title: "One-on-One Private",
    badge: "Premium",
    icon: "🎯",
    price: 3800,
    priceSub: "Per package · 8 sessions total",
    features: [
      "Dedicated 1-on-1 coaching session",
      "8 sessions (6 regular + 2 bonus)",
      "Fully personalised curriculum",
      "Flexible schedule by appointment",
      "₱6,500 with Premium Uniform",
    ],
    cta: { label: "Book Session", href: "/signup" },
    variant: "secondary",
  },
];

const EVENTS: AcademyEvent[] = [
  {
    id: "1",
    title: "Yellow Belt → Green Belt Promotion Exam",
    description:
      "All qualifying Yellow Belt students are invited. Ensure you have completed required sessions and Poomsae techniques.",
    date: "2026-11-15",
    time: "9:00 AM",
    location: "OSA Training Hall",
    category: "belt-promotion",
    tags: ["Promotion Test", "All Students"],
    requiresRegistration: true,
  },
  {
    id: "2",
    title: "Inter-Academy Kyorugi Sparring Day",
    description:
      "Friendly supervised sparring for all Kyorugi students. Protective gear required. Beginners welcome.",
    date: "2026-11-22",
    time: "2:00 PM",
    location: "OSA Training Hall",
    category: "sparring",
    tags: ["Kyorugi", "All Levels"],
    requiresRegistration: true,
  },
  {
    id: "3",
    title: "December Free Trial Class Batch — Now Open",
    description:
      "Limited slots now available for all age groups. Create your account and book early to secure your slot.",
    date: "2026-12-01",
    time: "By Appointment",
    location: "OSA Training Hall",
    category: "announcement",
    tags: ["Free Trial", "New Students"],
    requiresRegistration: false,
  },
];

const MERCH_ITEMS = [
  { name: "Premium Taekwondo Dobok",    icon: "🥋", price: "Included in Package", bg: "from-green to-navy-light",    avail: "Featured"   },
  { name: "OSA Training Shirt",          icon: "👕", price: "₱550",                bg: "from-navy to-navy-light",      avail: "Available"  },
  { name: "OSA Snapback Cap",            icon: "🧢", price: "₱380",                bg: "from-[#6B4F00] to-navy-mid",   avail: "Available"  },
  { name: "OSA Academy Jacket",          icon: "🧥", price: "₱1,200",              bg: "from-navy-deep to-green-dark", avail: "Limited"    },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
//  HELPER — Event category colour
// ─────────────────────────────────────────────────────────────────────────────

function eventCategoryBadge(cat: AcademyEvent["category"]) {
  const map: Record<
    AcademyEvent["category"],
    { variant: React.ComponentProps<typeof StatusBadge>["variant"]; label: string }
  > = {
    "belt-promotion": { variant: "gold",    label: "Belt Promotion" },
    sparring:         { variant: "error",   label: "Sparring Event" },
    announcement:     { variant: "success", label: "Announcement"   },
    activity:         { variant: "info",    label: "Activity"       },
    training:         { variant: "navy",    label: "Training Event" },
  };
  return map[cat] ?? { variant: "default" as const, label: cat };
}

// ─────────────────────────────────────────────────────────────────────────────
//  SECTION COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

/* ── §1 HERO ─────────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      aria-label="Free Taekwondo Trial Class promotion"
      className={cn(
        "relative min-h-screen flex items-center overflow-hidden",
        "bg-gradient-hero pattern-hero"
      )}
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
          [background:radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(212,175,55,0.10),transparent)]"
      />

      <div className="container-page relative z-10 py-32 md:py-36 lg:py-44">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Text ── */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow pill */}
            <div className="inline-flex items-center gap-2.5 mb-6
                            bg-gold/8 border border-gold/30 rounded-full
                            px-4 py-1.5">
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full bg-gold animate-pulse"
              />
              <span className="text-gold font-semibold text-[0.68rem] tracking-[0.2em] uppercase">
                Free Taekwondo Trial Class — Limited Slots
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-white font-black text-balance leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}>
              Train With{" "}
              <span className="text-gradient-gold">Champions</span>
              <br />
              at Oak Sports
            </h1>

            <p className="text-white/72 text-lg leading-relaxed mb-8 max-w-[480px]">
              Experience world-class Taekwondo for all ages. Build discipline,
              strength, and confidence under expert coaching.
            </p>

            {/* Badges */}
            <ul className="flex flex-wrap gap-3 mb-10" aria-label="Trial class features">
              {HERO_BADGES.map(({ icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-2
                             bg-white/5 border border-gold/18 rounded-md
                             px-3 py-2 text-white/85 text-sm"
                >
                  <span aria-hidden="true">{icon}</span>
                  {text}
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Button href="/signup" variant="primary" size="lg"
                aria-label="Sign up for a free trial class">
                Sign Up Free
              </Button>
              <Button href="/training-programs" variant="gold-outline" size="lg"
                aria-label="Learn more about training programs">
                Learn More
              </Button>
            </div>
          </div>

          {/* ── Right: Emblem ── */}
          <div
            className="order-1 lg:order-2 flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="relative">
              {/* Outer ring */}
              <div className="w-72 h-72 md:w-80 md:h-80 lg:w-[360px] lg:h-[360px]
                              rounded-full bg-green/30 border border-gold/20
                              flex items-center justify-center">
                {/* Middle ring */}
                <div className="w-56 h-56 md:w-64 md:h-64 lg:w-[280px] lg:h-[280px]
                                rounded-full bg-gradient-to-br from-green to-navy
                                border-[3px] border-gold
                                flex flex-col items-center justify-center text-center
                                shadow-[0_0_60px_rgba(212,175,55,0.22)]">
                  <span className="text-gold/70 text-[0.5rem] tracking-[0.3em] uppercase mb-1">
                    Oak Sports
                  </span>
                  <span className="text-gold font-black text-5xl leading-none font-display">
                    OSA
                  </span>
                  <span className="text-white/45 text-[0.45rem] tracking-[0.2em] uppercase mt-1.5">
                    Academy · Philippines
                  </span>
                </div>
              </div>

              {/* Floating credential tags */}
              {[
                { label: "Affiliation", value: "🇵🇭 PTA Member",     pos: "-top-4 -right-8" },
                { label: "Certified",   value: "🏅 Kukkiwon",         pos: "top-1/2 -right-14 -translate-y-1/2" },
                { label: "World Body",  value: "🌍 World Taekwondo",  pos: "-bottom-4 -right-8" },
              ].map(({ label, value, pos }) => (
                <div
                  key={label}
                  className={cn(
                    "absolute glass rounded-md px-3 py-2 text-left",
                    "animate-fade-up",
                    pos
                  )}
                >
                  <div className="text-gold text-[0.52rem] font-semibold tracking-[0.15em] uppercase mb-0.5">
                    {label}
                  </div>
                  <div className="text-white text-xs font-semibold whitespace-nowrap">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-1.5
                   text-white/35 text-[0.6rem] tracking-[0.2em] uppercase font-semibold
                   animate-bounce"
      >
        <span>Scroll</span>
        <span className="text-base">↓</span>
      </div>
    </section>
  );
}

/* ── §2 STATS ────────────────────────────────────────────────────────────── */
function StatsSection() {
  return (
    <section
      aria-label="Academy statistics"
      className="bg-gradient-green border-y border-gold/25 py-12"
    >
      <div className="container-page">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-gold/20">
          {STATS.map(({ value, label }) => (
            <li key={label} className="text-center px-6 py-4">
              <span
                className="block font-black text-gold-bright leading-none mb-1"
                style={{ fontSize: "clamp(2.4rem,4vw,3.2rem)" }}
              >
                {value}
              </span>
              <span className="text-white/65 text-[0.7rem] tracking-[0.18em] uppercase font-semibold">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── §3 MISSION & VISION ─────────────────────────────────────────────────── */
function MissionVisionSection() {
  return (
    <section id="mission" aria-labelledby="mv-heading" className="section bg-neutral-50">
      <div className="container-page">
        <SectionHeader
          eyebrow="Our Foundation"
          heading="Mission & Vision"
          description="Guided by purpose, driven by excellence — the principles that define Oak Sports Academy."
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Mission */}
          <article
            aria-label="Academy Mission"
            className={cn(
              "card card-hover p-8 lg:p-10 relative overflow-hidden",
              "border-t-4 border-gold"
            )}
          >
            {/* Decorative quote mark */}
            <span
              aria-hidden="true"
              className="absolute top-2 right-4 text-8xl font-serif text-gold/6 leading-none select-none"
            >
              "
            </span>
            <div className="w-12 h-12 rounded-xl bg-gradient-green border border-gold/25
                            flex items-center justify-center text-xl mb-5"
              aria-hidden="true"
            >
              🎯
            </div>
            <h3 className="text-[0.62rem] font-semibold tracking-[0.22em] uppercase text-gold mb-3">
              Our Mission
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              To develop well-rounded martial artists by providing high-quality Taekwondo
              instruction in a safe, disciplined, and supportive environment. We are committed
              to nurturing each student&apos;s physical fitness, mental fortitude, and character
              through the art and sport of Taekwondo.
            </p>
          </article>

          {/* Vision */}
          <article
            aria-label="Academy Vision"
            className={cn(
              "card card-hover p-8 lg:p-10 relative overflow-hidden",
              "border-t-4 border-green"
            )}
          >
            <span
              aria-hidden="true"
              className="absolute top-2 right-4 text-8xl font-serif text-green/6 leading-none select-none"
            >
              "
            </span>
            <div className="w-12 h-12 rounded-xl bg-gradient-navy border border-gold/20
                            flex items-center justify-center text-xl mb-5"
              aria-hidden="true"
            >
              🌟
            </div>
            <h3 className="text-[0.62rem] font-semibold tracking-[0.22em] uppercase text-gold mb-3">
              Our Vision
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              To be the leading Taekwondo academy in the region, recognized for producing
              champions — not just in sport, but in life. We envision a community where every
              student discovers their full potential through the transformative power of
              Taekwondo training.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ── §4 HIGHLIGHTS ───────────────────────────────────────────────────────── */
function HighlightsSection() {
  const tiles = [
    { label: "Training Environment", icon: "🥋", span: "row-span-2 col-span-1", bg: "from-green to-navy" },
    { label: "Student Achievements", icon: "🏆", span: "",                       bg: "from-navy to-navy-light" },
    { label: "Academy Activities",   icon: "👥", span: "",                       bg: "from-navy-mid to-green" },
    { label: "Kyorugi Training",     icon: "🎽", span: "",                       bg: "from-green-dark to-navy-deep" },
    { label: "Poomsae Practice",     icon: "🌿", span: "",                       bg: "from-navy-light to-green" },
  ] as const;

  return (
    <section id="highlights" aria-labelledby="hl-heading" className="section bg-white">
      <div className="container-page">
        <SectionHeader
          eyebrow="Gallery"
          heading="Academy Highlights"
          description="A glimpse into our training environment, student achievements, and academy activities."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[200px]">
          {tiles.map(({ label, icon, span, bg }) => (
            <div
              key={label}
              className={cn(
                "relative rounded-xl overflow-hidden cursor-pointer group",
                `bg-gradient-to-br ${bg}`,
                span
              )}
              role="img"
              aria-label={label}
            >
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4
                              transition-all duration-300 group-hover:scale-105">
                <span className="text-4xl" aria-hidden="true">{icon}</span>
                <span className="text-gold/50 text-[0.55rem] tracking-[0.2em] uppercase font-semibold">
                  {label}
                </span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20
                              transition-colors duration-300" aria-hidden="true" />
              {/* Label chip at bottom */}
              <div className="absolute bottom-3 left-3">
                <span className="bg-navy/70 backdrop-blur-sm text-gold text-[0.58rem]
                                 tracking-[0.15em] uppercase font-semibold
                                 px-2.5 py-1 rounded-sm">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── §5 COACH ────────────────────────────────────────────────────────────── */
function CoachSection() {
  const credentials = [
    "Kukkiwon Certified Instructor",
    "Philippine Taekwondo Association Member",
    "World Taekwondo Affiliated",
    "Black Belt Dan Holder",
    "Certified Coach & Referee",
  ];

  const expertise = [
    "Kyorugi (Olympic Sparring)",
    "Poomsae (Traditional Forms)",
    "Youth & Junior Development",
    "Competition Preparation",
    "Physical Fitness & Conditioning",
    "Self-Defense Techniques",
    "Belt Exam Preparation",
    "Mental Focus & Discipline",
  ];

  return (
    <section id="coach" aria-labelledby="coach-heading" className="section bg-gradient-navy">
      <div className="container-page">
        <SectionHeader
          eyebrow="Meet Your Coach"
          heading="Coach Background"
          theme="light"
          description="Expert guidance from a seasoned Taekwondo practitioner and educator."
        />

        <div className="card-dark rounded-2xl overflow-hidden
                        grid md:grid-cols-[320px_1fr] gap-0">

          {/* Photo side */}
          <div className="bg-gradient-to-b from-green to-navy-mid
                          flex flex-col items-center justify-center
                          p-10 gap-6 min-h-[320px]">
            {/* Avatar placeholder */}
            <div className="w-40 h-40 rounded-full
                            bg-gold/12 border-[3px] border-gold
                            flex flex-col items-center justify-center gap-1
                            shadow-[0_0_40px_rgba(212,175,55,0.22)]"
              aria-label="Coach photo placeholder"
            >
              <span className="text-5xl" aria-hidden="true">👤</span>
              <span className="text-white/35 text-[0.52rem] tracking-widest uppercase">
                Coach Photo
              </span>
            </div>

            {/* Credential chips */}
            <ul className="flex flex-col gap-2 w-full" aria-label="Coach credentials">
              {credentials.map((c) => (
                <li key={c}
                  className="flex items-center gap-2.5 text-white/75 text-xs py-2
                             border-b border-white/6 last:border-none">
                  <span className="text-gold text-sm flex-shrink-0" aria-hidden="true">🏅</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Info side */}
          <div className="p-8 lg:p-12">
            <p className="text-gold font-semibold text-[0.62rem] tracking-[0.25em] uppercase mb-2">
              Head Coach &amp; Instructor
            </p>
            <h3 className="text-white font-bold text-2xl md:text-3xl mb-6">
              Coach / Instructor Name
            </h3>

            <div className="space-y-4 mb-8">
              {[
                "An experienced Taekwondo practitioner with an extensive background in both competitive and instructional Taekwondo. Committed to developing each student's full potential through a balanced approach combining technical precision, physical conditioning, and mental discipline.",
                "Certified by Kukkiwon — the World Taekwondo Headquarters — and a recognized member of the Philippine Taekwondo Association, bringing years of competitive and coaching experience at regional and national levels.",
              ].map((para, i) => (
                <p key={i} className="text-white/68 leading-relaxed text-sm">
                  {para}
                </p>
              ))}
            </div>

            {/* Expertise grid */}
            <h4 className="text-gold text-[0.6rem] tracking-[0.2em] uppercase font-semibold mb-4">
              Coaching Expertise
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {expertise.map((item) => (
                <li key={item}
                  className="flex items-center gap-2.5
                             bg-white/4 border border-gold/8
                             rounded-md px-3 py-2.5
                             text-white/80 text-xs">
                  <span className="text-gold text-sm flex-shrink-0" aria-hidden="true">▸</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button href="/about" variant="secondary" size="md">
                Learn More About OSA
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── §6 TRAINING PROGRAMS ────────────────────────────────────────────────── */
function ProgramsSection() {
  return (
    <section id="programs" aria-labelledby="prog-heading" className="section bg-white">
      <div className="container-page">
        <SectionHeader
          eyebrow="What We Teach"
          heading="Training Programs"
          description="Choose your path — from competitive sparring to traditional forms, we have a program for every goal."
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {PROGRAMS.map((prog) => (
            <article
              key={prog.id}
              aria-labelledby={`prog-${prog.id}`}
              className="card card-hover overflow-hidden"
            >
              {/* Coloured header */}
              <div className="bg-gradient-hero relative px-8 py-10 overflow-hidden">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-40
                    [background-image:radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.12),transparent_60%)]"
                />
                <div className="relative text-center">
                  <span className="text-5xl block mb-4" aria-hidden="true">{prog.icon}</span>
                  <h3 id={`prog-${prog.id}`} className="text-white font-bold text-2xl mb-1">
                    {prog.title}
                  </h3>
                  <p className="text-gold font-semibold text-[0.65rem] tracking-[0.2em] uppercase">
                    {prog.subtitle}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-7">
                <p className="text-neutral-500 text-sm leading-relaxed mb-5">
                  {prog.description}
                </p>
                <ul className="space-y-2 mb-6" aria-label={`${prog.title} features`}>
                  {prog.features.map((f) => (
                    <li key={f}
                      className="flex items-start gap-2.5 text-sm text-neutral-700
                                 border-b border-neutral-100 pb-2 last:border-none last:pb-0">
                      <span className="text-green-dark font-bold mt-px flex-shrink-0"
                        aria-hidden="true">
                        ✦
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button href={prog.href} variant="primary" size="md" fullWidth>
                  Explore {prog.title}
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Age groups */}
        <SectionHeader
          eyebrow="Who Can Join"
          heading="Training for Every Age"
          description="Programs tailored to each developmental stage."
        />

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {AGE_GROUPS.map((ag) => (
            <li key={ag.id}
              className="card card-hover p-6 text-center border border-neutral-200
                         hover:border-gold transition-colors duration-200">
              <span className="block text-3xl mb-3" aria-hidden="true">{ag.icon}</span>
              <p className="text-gold font-semibold text-[0.62rem] tracking-[0.15em] uppercase mb-1">
                {ag.label}
              </p>
              <h4 className="text-navy font-semibold text-base mb-2">
                {ag.id === "3-5"   ? "Little Champions" :
                 ag.id === "6-12"  ? "Junior Warriors"  :
                 ag.id === "13-17" ? "Teen Athletes"     : "Adult Champions"}
              </h4>
              <p className="text-neutral-500 text-xs leading-snug mb-3">
                {ag.description}
              </p>
              <span className="chip bg-navy/6 border-navy/15 text-navy/70 text-[0.6rem]">
                Max {ag.maxSlots} slots
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── §7 TRAINING OPTIONS ─────────────────────────────────────────────────── */
function OptionsSection() {
  return (
    <section id="training-options" aria-labelledby="opt-heading"
      className="section bg-neutral-50">
      <div className="container-page">
        <SectionHeader
          eyebrow="How to Train"
          heading="Training Options"
          description="Pick the format that fits your goals, schedule, and preferences."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {TRAINING_OPTIONS.map((opt, idx) => {
            const isFeatured = idx === 1; // Group Class
            return (
              <article
                key={opt.id}
                aria-labelledby={`opt-${opt.id}`}
                className={cn(
                  "rounded-2xl overflow-hidden flex flex-col shadow-card",
                  "transition-all duration-300 hover:-translate-y-2",
                  isFeatured
                    ? "hover:shadow-gold ring-2 ring-gold/40"
                    : "hover:shadow-card-lg border border-neutral-200 bg-white"
                )}
              >
                {/* Header */}
                <div className={cn(
                  "relative px-7 py-8 text-center overflow-hidden",
                  opt.id === "free-trial"
                    ? "bg-gradient-to-br from-green to-navy"
                    : opt.id === "group-class"
                    ? "bg-gradient-navy"
                    : "bg-gradient-to-br from-[#6B4F00] to-navy"
                )}>
                  {/* Featured badge */}
                  {isFeatured && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2">
                      <StatusBadge variant="gold" label={opt.badge} size="xs" showDot={false} />
                    </div>
                  )}

                  <span className="text-4xl block mb-4 mt-2" aria-hidden="true">{opt.icon}</span>
                  <h3 id={`opt-${opt.id}`} className="text-white font-bold text-xl mb-3">
                    {opt.title}
                  </h3>
                  <div className="text-gold-bright font-black leading-none"
                    style={{ fontSize: "clamp(2rem,3.5vw,2.5rem)" }}>
                    {opt.price === 0 ? "FREE" : `₱${opt.price.toLocaleString()}`}
                  </div>
                  <p className="text-white/55 text-xs mt-1">{opt.priceSub}</p>
                </div>

                {/* Features */}
                <div className={cn("p-7 flex-1 flex flex-col", !isFeatured && "bg-white")}>
                  <ul className="space-y-2.5 mb-6 flex-1" aria-label={`${opt.title} features`}>
                    {opt.features.map((f) => (
                      <li key={f}
                        className="flex items-start gap-2.5 text-sm text-neutral-700
                                   border-b border-neutral-100 pb-2.5 last:border-none">
                        <span className="text-green-dark font-bold mt-0.5 flex-shrink-0"
                          aria-hidden="true">
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    href={opt.cta.href}
                    variant={isFeatured ? "primary" : "secondary"}
                    size="md"
                    fullWidth
                  >
                    {opt.cta.label}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── §8 EVENTS ───────────────────────────────────────────────────────────── */
function EventsSection() {
  return (
    <section id="events" aria-labelledby="events-heading"
      className="section bg-gradient-navy">
      <div className="container-page">
        <SectionHeader
          eyebrow="What's Happening"
          heading="Upcoming Events"
          theme="light"
          description="Stay updated on academy activities, promotion tests, and important announcements."
        />

        <div className="flex flex-col gap-4 max-w-3xl mx-auto mb-10">
          {EVENTS.map((ev) => {
            const d         = new Date(ev.date);
            const day       = d.getDate().toString().padStart(2, "0");
            const month     = d.toLocaleString("en-PH", { month: "short" }).toUpperCase();
            const { variant, label } = eventCategoryBadge(ev.category);

            return (
              <article
                key={ev.id}
                aria-labelledby={`ev-${ev.id}`}
                className="card-dark rounded-xl overflow-hidden border border-gold/12
                           hover:border-gold/35 transition-all duration-200
                           flex flex-col sm:flex-row gap-0"
              >
                {/* Date column */}
                <div className="bg-gradient-to-b from-gold-dark to-gold
                                flex-shrink-0 flex flex-col items-center justify-center
                                px-6 py-5 sm:py-0 sm:min-w-[80px] gap-0.5"
                  aria-label={`Date: ${day} ${month}`}
                >
                  <span className="font-black text-navy leading-none text-3xl">{day}</span>
                  <span className="font-semibold text-navy/75 text-[0.58rem] tracking-widest uppercase">
                    {month}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 p-5">
                  <StatusBadge
                    variant={variant}
                    label={label}
                    size="xs"
                    showDot={false}
                    className="mb-2"
                  />
                  <h4 id={`ev-${ev.id}`} className="text-white font-semibold text-base mb-1.5">
                    {ev.title}
                  </h4>
                  <p className="text-white/60 text-sm leading-snug mb-3">
                    {ev.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-white/45 text-xs">
                    <span>📅 {ev.date}</span>
                    <span>⏰ {ev.time}</span>
                    <span>📍 {ev.location}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center">
          <Button href="/events" variant="secondary" size="lg">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ── §9 MERCH ─────────────────────────────────────────────────────────────── */
function MerchSection() {
  return (
    <section id="merch" aria-labelledby="merch-heading"
      className="section bg-neutral-100">
      <div className="container-page">
        <SectionHeader
          eyebrow="Official Store"
          heading="OSA Merch"
          description="Represent Oak Sports Academy with official academy merchandise."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-10">
          {MERCH_ITEMS.map(({ name, icon, price, bg, avail }) => (
            <article
              key={name}
              className="card card-hover overflow-hidden"
              aria-label={name}
            >
              {/* Image area */}
              <div className={cn(
                "h-44 flex items-center justify-center relative",
                `bg-gradient-to-br ${bg}`
              )}>
                <span className="text-5xl" aria-hidden="true">{icon}</span>
                <span className={cn(
                  "absolute top-2.5 left-2.5 text-[0.58rem] font-bold",
                  "tracking-[0.1em] uppercase px-2.5 py-1 rounded-sm",
                  avail === "Featured"
                    ? "bg-gold text-navy"
                    : avail === "Limited"
                    ? "bg-warning text-navy"
                    : "bg-green-mid text-white"
                )}>
                  {avail}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <h4 className="text-navy font-semibold text-sm mb-1">{name}</h4>
                <p className="text-gold-dark font-bold text-sm">{price}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button href="/merch" variant="primary" size="lg">
            Shop All Merch
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ── §10 FINAL CTA BANNER ─────────────────────────────────────────────────── */
function CtaBannerSection() {
  return (
    <section
      aria-label="Sign up call to action"
      className="relative overflow-hidden py-24 bg-gradient-hero"
    >
      {/* Radial glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0
        [background:radial-gradient(ellipse_70%_80%_at_20%_50%,rgba(212,175,55,0.10),transparent),
                  radial-gradient(ellipse_70%_80%_at_80%_50%,rgba(212,175,55,0.07),transparent)]"
      />

      <div className="container-page relative z-10 text-center">
        <h2 className="text-white font-black text-balance mb-4"
          style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
          Ready to Begin Your Taekwondo Journey?
        </h2>
        <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
          Sign up today and claim your FREE trial class at Oak Sports Academy.
          Limited slots — don&apos;t miss out.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/signup" variant="primary" size="xl"
            aria-label="Create an account and register for training">
            Create Account &amp; Register
          </Button>
          <Button href="/training-programs" variant="gold-outline" size="xl"
            aria-label="Explore training programs">
            Explore Programs
          </Button>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <MissionVisionSection />
      <HighlightsSection />
      <CoachSection />
      <ProgramsSection />
      <OptionsSection />
      <EventsSection />
      <MerchSection />
      <CtaBannerSection />
    </>
  );
}
