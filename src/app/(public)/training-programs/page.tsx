import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Training Programs",
  description:
    "Comprehensive Taekwondo programs at Oak Sports Academy: Kyorugi sparring, Poomsae forms, free trial classes, group sessions, and one-on-one private coaching.",
};

// ─── Static data ─────────────────────────────────────────────────────────────

const PROGRAMS = [
  {
    id: "kyorugi",
    title: "Kyorugi",
    subtitle: "Olympic Sparring Program",
    icon: "⚔️",
    description:
      "Dynamic Olympic-style sparring training. Develop speed, agility, timing, and strategic combat thinking through controlled, supervised sparring practice.",
    features: [
      "Olympic-style kick & punch techniques",
      "Footwork, distance & timing management",
      "Defensive & offensive combinations",
      "Physical conditioning & reflex training",
      "Competition preparation & strategy",
      "Protective gear usage & safety",
    ],
  },
  {
    id: "poomsae",
    title: "Poomsae",
    subtitle: "Traditional Forms Program",
    icon: "🌿",
    description:
      "Traditional Taekwondo forms practice aligned with Kukkiwon international standards. Master precision, balance, and body control.",
    features: [
      "Kukkiwon-standard Poomsae sequences",
      "Balance, coordination & body control",
      "Precision & technical movement mastery",
      "Belt promotion exam preparation",
      "Mental discipline & focus training",
      "Pattern memorisation & execution",
    ],
  },
] as const;

const OPTIONS = [
  {
    id: "free-trial",
    title: "Free Trial Class",
    sub: "New Students Only · FREE",
    icon: "🎁",
    specs: [
      { k: "Cost",       v: "₱0 — FREE" },
      { k: "Format",     v: "Group Class Only" },
      { k: "Trial Days", v: "Max 2 per student" },
      { k: "Slots",      v: "5 per age group" },
      { k: "Age Groups", v: "3–5, 6–12, 13–17, 18+" },
    ],
    cta: { label: "Book Free Trial", href: "/signup" },
    ctaVariant: "secondary" as const,
  },
  {
    id: "group-class",
    title: "Group Class",
    sub: "Regular Training · Small Group",
    icon: "👥",
    specs: [
      { k: "Min Students", v: "3 per group" },
      { k: "Max Students", v: "5 per group" },
      { k: "Sessions",     v: "8 total (6 + 2 bonus)" },
      { k: "Frequency",    v: "2× or 3× per week" },
      { k: "Rate",         v: "₱3,800 – ₱5,500" },
    ],
    cta: { label: "Enroll in Group", href: "/signup" },
    ctaVariant: "primary" as const,
  },
  {
    id: "private",
    title: "One-on-One Private",
    sub: "Premium · Personalised",
    icon: "🎯",
    specs: [
      { k: "Format",     v: "1 student + 1 coach" },
      { k: "Sessions",   v: "8 total (6 + 2 bonus)" },
      { k: "Schedule",   v: "Flexible · By appointment" },
      { k: "Curriculum", v: "Fully personalised" },
      { k: "Rate",       v: "₱3,800 – ₱6,500" },
    ],
    cta: { label: "Book Private Session", href: "/signup" },
    ctaVariant: "secondary" as const,
  },
] as const;

const PACKAGES = [
  {
    type: "One-on-One Private Coaching",
    icon: "🎯",
    items: [
      { name: "Without Premium Uniform", price: "₱3,800", features: ["8 sessions total (6 + 2 bonus)", "1 student with 1 dedicated coach", "Personalised training curriculum", "Flexible schedule by appointment"], featured: false },
      { name: "With Premium Uniform",    price: "₱6,500", features: ["8 sessions total (6 + 2 bonus)", "1 student with 1 dedicated coach", "Personalised training curriculum", "Flexible schedule by appointment", "🎁 FREE Premium Taekwondo Uniform"], featured: true },
    ],
  },
  {
    type: "Group Class",
    icon: "👥",
    items: [
      { name: "Without Premium Uniform", price: "₱3,800", features: ["8 sessions total", "Min 3, Max 5 students per group", "Small-group training environment", "Twice or thrice weekly schedule"], featured: false },
      { name: "With Premium Uniform",    price: "₱5,500", features: ["8 sessions total", "Min 3, Max 5 students per group", "Small-group training environment", "Twice or thrice weekly schedule", "🎁 FREE Premium Taekwondo Uniform", "💰 Enjoy a ₱1,000 discount!"], featured: true },
    ],
  },
] as const;

const SCHEDULES = [
  {
    type: "Weekday Program",
    icon: "📚",
    sub: "After-School Classes · Mon–Fri",
    slots: [
      { time: "3:00 PM – 4:30 PM", groups: ["Ages 3–5", "Ages 6–12"] },
      { time: "4:30 PM – 6:00 PM", groups: ["Ages 13–17", "Adult 18+"] },
      { time: "6:00 PM – 7:30 PM", groups: ["Adult 18+", "Private"] },
    ],
  },
  {
    type: "Weekend Program",
    icon: "🌅",
    sub: "Saturday Classes",
    slots: [
      { time: "8:00 AM – 9:30 AM",   groups: ["Ages 3–5", "Ages 6–12"] },
      { time: "10:00 AM – 11:30 AM", groups: ["Ages 13–17", "Adult 18+"] },
      { time: "2:00 PM – 3:30 PM",   groups: ["Open · All Ages", "Private"] },
    ],
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TrainingProgramsPage() {
  return (
    <>
      {/* Page hero */}
      <section aria-label="Training Programs hero" className="page-hero text-center">
        <div className="container-page relative z-10">
          <span className="section-label">What We Offer</span>
          <h1 className="text-white mt-2 mb-4">Training Programs</h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Comprehensive Taekwondo programs designed for every age, goal, and skill level.
          </p>
          <nav aria-label="Breadcrumb" className="mt-6 flex items-center justify-center gap-2 text-sm text-white/45">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">Training Programs</span>
          </nav>
        </div>
      </section>

      {/* Programs */}
      <section aria-labelledby="prog-heading" className="section bg-white">
        <div className="container-page">
          <SectionHeader eyebrow="Our Programs" heading="Choose Your Discipline"
            description="Two core Taekwondo disciplines, both aligned with Kukkiwon international standards." />

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {PROGRAMS.map((prog) => (
              <article key={prog.id} aria-labelledby={`prog-${prog.id}`}
                className="card card-hover overflow-hidden">
                <div className="bg-gradient-hero relative px-8 py-10 text-center overflow-hidden">
                  <div aria-hidden="true"
                    className="absolute inset-0 opacity-40
                      [background-image:radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.12),transparent_60%)]" />
                  <span className="text-5xl block mb-3 relative" aria-hidden="true">{prog.icon}</span>
                  <h2 id={`prog-${prog.id}`} className="text-white font-bold text-2xl relative">{prog.title}</h2>
                  <p className="text-gold text-[0.65rem] tracking-[0.2em] uppercase relative mt-1">{prog.subtitle}</p>
                </div>
                <div className="p-7">
                  <p className="text-neutral-500 text-sm leading-relaxed mb-5">{prog.description}</p>
                  <ul className="space-y-2 mb-6">
                    {prog.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-neutral-700
                                             border-b border-neutral-100 pb-2 last:border-none">
                        <span className="text-green-dark font-bold mt-0.5 flex-shrink-0" aria-hidden="true">✦</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button href="/signup" variant="primary" size="md" fullWidth>
                    Enroll in {prog.title}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Training Options */}
      <section aria-labelledby="opts-heading" className="section bg-gradient-navy">
        <div className="container-page">
          <SectionHeader eyebrow="How to Train" heading="Training Options" theme="light"
            description="Choose the training format that best fits your goals and learning style." />

          <div className="grid md:grid-cols-3 gap-6">
            {OPTIONS.map((opt) => (
              <article key={opt.id} aria-labelledby={`opt-${opt.id}`}
                className="card-dark rounded-2xl overflow-hidden flex flex-col
                           border border-gold/12 hover:border-gold/35 transition-colors">
                <div className="p-6 border-b border-gold/12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gold/10 border border-gold/25 rounded-xl
                                    flex items-center justify-center text-2xl flex-shrink-0"
                      aria-hidden="true">
                      {opt.icon}
                    </div>
                    <div>
                      <h3 id={`opt-${opt.id}`} className="text-white font-semibold">{opt.title}</h3>
                      <p className="text-white/50 text-xs">{opt.sub}</p>
                    </div>
                  </div>
                  <dl className="space-y-2">
                    {opt.specs.map(({ k, v }) => (
                      <div key={k} className="flex justify-between items-center text-xs
                                              py-1.5 border-b border-white/6 last:border-none">
                        <dt className="text-white/50">{k}</dt>
                        <dd className="text-white font-medium">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="p-5 mt-auto">
                  <Button href={opt.cta.href} variant={opt.ctaVariant} size="md" fullWidth>
                    {opt.cta.label}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Packages & Rates */}
      <section aria-labelledby="pkg-heading" className="section bg-neutral-50">
        <div className="container-page">
          <SectionHeader eyebrow="Pricing" heading="Packages & Rates"
            description="All packages include 8 total sessions (6 regular + 2 bonus). Transparent pricing for every training option." />

          <div className="space-y-8">
            {PACKAGES.map(({ type, icon, items }) => (
              <div key={type} className="bg-white rounded-2xl overflow-hidden shadow-card">
                <div className="bg-navy px-6 py-4 flex items-center gap-3">
                  <span className="text-xl" aria-hidden="true">{icon}</span>
                  <h3 className="text-gold font-semibold text-[0.72rem] tracking-[0.15em] uppercase">{type}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 p-6">
                  {items.map((pkg) => (
                    <div key={pkg.name}
                      className={cn("rounded-xl overflow-hidden border-2 transition-all",
                        pkg.featured
                          ? "border-gold shadow-gold"
                          : "border-neutral-200 hover:border-gold/40")}>
                      <div className={cn("px-6 py-5 text-center",
                        pkg.featured ? "bg-gradient-to-br from-green to-navy" : "bg-navy")}>
                        {pkg.featured && (
                          <p className="text-gold text-[0.6rem] tracking-[0.12em] uppercase font-semibold mb-1">
                            Recommended
                          </p>
                        )}
                        <h4 className="text-white font-semibold mb-2">{pkg.name}</h4>
                        <p className="font-black text-gold-bright leading-none"
                          style={{ fontSize: "clamp(1.8rem,3vw,2.2rem)" }}>
                          {pkg.price}
                        </p>
                      </div>
                      <div className="p-5">
                        <ul className="space-y-2">
                          {pkg.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5 text-sm text-neutral-700
                                                    border-b border-neutral-100 pb-2 last:border-none">
                              <span className="text-green-dark font-bold flex-shrink-0" aria-hidden="true">✓</span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-info/8 border border-info/25 rounded-xl text-sm text-navy/80 flex gap-3">
            <span aria-hidden="true" className="text-info text-lg flex-shrink-0">ℹ️</span>
            <p>All packages include <strong>8 sessions total (6 regular + 2 bonus)</strong>. Premium Uniform packages include a Free Premium Taekwondo Dobok. Payment details will be discussed upon registration approval.</p>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section aria-labelledby="sched-heading" className="section bg-white">
        <div className="container-page">
          <SectionHeader eyebrow="When to Train" heading="Training Schedules"
            description="Oak Sports Academy offers flexible scheduling options. All sessions are by appointment only." />

          <div className="grid md:grid-cols-2 gap-6">
            {SCHEDULES.map((sched) => (
              <div key={sched.type} className="card overflow-hidden">
                <div className="bg-gradient-navy px-6 py-5 flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">{sched.icon}</span>
                  <div>
                    <h3 className="text-white font-semibold">{sched.type}</h3>
                    <p className="text-white/55 text-xs">{sched.sub}</p>
                  </div>
                </div>
                <div className="p-5 space-y-2.5">
                  {sched.slots.map(({ time, groups }) => (
                    <div key={time}
                      className="flex flex-col sm:flex-row sm:items-center gap-2
                                 bg-neutral-50 rounded-lg px-4 py-3">
                      <span className="font-semibold text-navy text-sm min-w-[160px]">{time}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {groups.map((g) => (
                          <span key={g} className="chip bg-navy/6 border-navy/15 text-navy/70 text-[0.6rem]">{g}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waiver */}
      <section aria-labelledby="waiver-heading" className="section bg-neutral-50">
        <div className="container-page max-w-3xl">
          <SectionHeader eyebrow="Before You Start" heading="Waiver & Consent"
            description="All participants must review and agree to the OSA Waiver before training." />
          <div className="bg-white rounded-2xl overflow-hidden shadow-card">
            <div className="bg-navy text-center px-8 py-7">
              <h3 className="text-white font-bold text-xl">Oak Sports Academy Waiver & Release Form</h3>
              <p className="text-white/60 text-sm mt-2">Required for all enrolled students. Parent/Guardian agreement required for minors.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 p-7">
              {[
                { icon: "📜", title: "Release & Waiver of Liability", body: "Participants acknowledge the inherent risks of Taekwondo and voluntarily release OSA from liability for injuries." },
                { icon: "⚡", title: "Assumption of Risk",            body: "Students voluntarily assume risks associated with Taekwondo training, including physical contact and equipment use." },
                { icon: "👨‍👧", title: "Parent/Guardian Agreement",   body: "For minors, the parent or legal guardian must sign and agree to all waiver terms on behalf of the student." },
              ].map(({ icon, title, body }) => (
                <div key={title} className="text-center">
                  <span className="text-3xl block mb-3" aria-hidden="true">{icon}</span>
                  <h4 className="text-navy font-semibold text-sm mb-2">{title}</h4>
                  <p className="text-neutral-500 text-xs leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Sign up CTA" className="section bg-gradient-hero text-center">
        <div className="container-page">
          <h2 className="text-white font-black mb-4" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
            Ready to Start Your Taekwondo Journey?
          </h2>
          <p className="text-white/70 max-w-md mx-auto mb-8">
            Create your account, get approved, and choose your training program today. Free trial available!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/signup"  variant="primary"      size="xl">Sign Up Free</Button>
            <Button href="/contact" variant="gold-outline"  size="xl">Contact Us</Button>
          </div>
        </div>
      </section>
    </>
  );
}
