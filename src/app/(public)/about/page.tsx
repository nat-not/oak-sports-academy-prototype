import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Oak Sports Academy — our background, mission, coach profile, programs, policies, and contact details.",
};

// ─── Static data ─────────────────────────────────────────────────────────────

const PURPOSE_CARDS = [
  {
    icon: "🏛️",
    title: "Academy Background",
    body: "Oak Sports Academy was established to bring high-quality Taekwondo training to the community. Rooted in authentic Korean martial arts tradition, we combine traditional techniques with modern coaching methodologies.",
  },
  {
    icon: "🎯",
    title: "Our Purpose",
    body: "Our purpose is to empower individuals of all ages through Taekwondo. Beyond sport, we aim to build character, instill core values, and create a supportive community where students grow physically, mentally, and emotionally.",
  },
  {
    icon: "🥋",
    title: "Taekwondo Training",
    body: "We offer comprehensive Taekwondo training covering both Kyorugi (sparring) and Poomsae (forms) in a safe, structured environment with programs tailored for different age groups, skill levels, and goals.",
  },
] as const;

const CREDENTIALS = [
  { icon: "🏅", label: "Kukkiwon Certified Instructor" },
  { icon: "🇵🇭", label: "Philippine Taekwondo Association" },
  { icon: "🌍", label: "World Taekwondo Member" },
  { icon: "🥋", label: "Dan Holder — Black Belt" },
  { icon: "📋", label: "Certified Coach & Referee" },
] as const;

const EXPERTISE = [
  "Kyorugi (Olympic Sparring)",
  "Poomsae (Traditional Forms)",
  "Youth & Junior Development",
  "Competition Preparation",
  "Physical Fitness & Conditioning",
  "Self-Defense Techniques",
  "Belt Exam Preparation",
  "Mental Focus & Discipline",
] as const;

const PROGRAMS = [
  {
    icon: "⚔️",
    title: "Kyorugi — Sparring Program",
    body: "Dynamic Olympic-style sparring training covering kick combinations, footwork, distance management, defensive/offensive strategy, and competition preparation. Suitable for all levels.",
  },
  {
    icon: "🌿",
    title: "Poomsae — Forms Program",
    body: "Traditional Taekwondo forms aligned with Kukkiwon international standards. Builds balance, body control, and mental focus. Essential for belt promotion and technical mastery.",
  },
  {
    icon: "🎁",
    title: "Free Trial Class",
    body: "A complimentary introductory group session for new students. Maximum 2 trial days per student. Limited to 5 slots per age group — early registration is strongly encouraged.",
  },
] as const;

const POLICIES = [
  {
    num: "01",
    title: "Account Approval Required",
    body: "All students must have an approved account before registering for any class. The administrator reviews all submitted information; you will be notified once approved.",
  },
  {
    num: "02",
    title: "By Appointment Only",
    body: "Oak Sports Academy operates on a by-appointment basis. All sessions must be scheduled in advance through the online registration system. Walk-ins are not accepted.",
  },
  {
    num: "03",
    title: "Free Trial Limitations",
    body: "Each student is entitled to a maximum of two (2) free trial days. Trial classes are group sessions only, with up to 5 slots per age group.",
  },
  {
    num: "04",
    title: "Waiver & Consent Requirement",
    body: "All students and parents/guardians must review and agree to the OSA Waiver and Release Form before participating in any training activity.",
  },
  {
    num: "05",
    title: "Minor Participant Requirements",
    body: "Minor participants require a parent or legal guardian to create and manage the account. Valid IDs and specimen signatures must be submitted during registration.",
  },
  {
    num: "06",
    title: "Group Class Minimum",
    body: "Group classes require a minimum of 3 students and a maximum of 5 per group. Classes may be rescheduled if minimum enrollment is not met.",
  },
] as const;

const SCHEDULE_ROWS = [
  { program: "Group Class",        schedule: "After-School",   days: "Weekday",  freq: "2× or 3×/week",  note: "Mon–Fri" },
  { program: "Group Class",        schedule: "Weekend",        days: "Saturday", freq: "2× or 3×/week",  note: "Saturday sessions" },
  { program: "One-on-One Private", schedule: "By Appointment", days: "Flexible", freq: "As scheduled",   note: "Personalised per student" },
  { program: "Free Trial Class",   schedule: "By Appointment", days: "Flexible", freq: "Max 2 trial days", note: "Subject to availability" },
] as const;

const PILLARS = ["Discipline", "Respect", "Excellence", "Integrity", "Perseverance", "Community"] as const;

// ─── Page component ───────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <section
        aria-label="About Us hero"
        className="page-hero text-center"
      >
        <div className="container-page relative z-10">
          <span className="section-label">Our Story</span>
          <h1 className="text-white mt-2 mb-4">About Oak Sports Academy</h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Dedicated to developing champions through the art, discipline, and sport of Taekwondo.
          </p>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mt-6 flex items-center justify-center gap-2 text-sm text-white/45">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">About Us</span>
          </nav>
        </div>
      </section>

      {/* ── Intro + Emblem ── */}
      <section aria-labelledby="intro-heading" className="section bg-white">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Emblem side */}
            <div className="flex items-center justify-center order-2 lg:order-1" aria-hidden="true">
              <div className="relative">
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-full
                                bg-gradient-to-br from-green/20 to-navy/30
                                border border-gold/20 flex items-center justify-center">
                  <div className="w-52 h-52 md:w-60 md:h-60 rounded-full
                                  bg-gradient-to-br from-green to-navy
                                  border-[3px] border-gold
                                  flex flex-col items-center justify-center text-center
                                  shadow-[0_0_60px_rgba(212,175,55,0.2)]">
                    <span className="text-gold/70 text-[0.5rem] tracking-[0.3em] uppercase">Oak Sports</span>
                    <span className="text-gold font-black text-4xl leading-none font-display">OSA</span>
                    <span className="text-white/45 text-[0.45rem] tracking-[0.2em] uppercase mt-1">Academy · Philippines</span>
                  </div>
                </div>
                {/* Floating tags */}
                {[
                  { label: "Affiliated With", value: "PTA Member",     pos: "-top-3 left-4" },
                  { label: "World Certified",  value: "Kukkiwon",       pos: "-bottom-3 left-4" },
                  { label: "World Body",       value: "World Taekwondo", pos: "top-1/2 -right-4 -translate-y-1/2" },
                ].map(({ label, value, pos }) => (
                  <div key={label}
                    className={cn("absolute glass rounded-md px-3 py-2 text-left", pos)}>
                    <div className="text-gold text-[0.52rem] font-semibold tracking-[0.15em] uppercase mb-0.5">{label}</div>
                    <div className="text-white text-xs font-semibold whitespace-nowrap">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Text side */}
            <div className="order-1 lg:order-2">
              <span className="section-label">Who We Are</span>
              <h2 id="intro-heading" className="mt-2 mb-6 text-navy">
                Building Champions,<br />Shaping Lives
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  "Oak Sports Academy is a dedicated Taekwondo training center committed to providing world-class martial arts instruction to students of all ages and skill levels. Founded on the principles of discipline, respect, and excellence, our academy offers a structured and nurturing environment where every student can thrive.",
                  "As a proud member of the Philippine Taekwondo Association (PTA) and affiliated with Kukkiwon and World Taekwondo, we uphold the highest international standards in Taekwondo training and certification.",
                  "Whether you are a young beginner, a competitive athlete, or an adult looking to build fitness and self-confidence, Oak Sports Academy has a program designed for you.",
                ].map((para, i) => (
                  <p key={i} className="text-neutral-600 leading-relaxed">{para}</p>
                ))}
              </div>
              {/* Pillar chips */}
              <div className="flex flex-wrap gap-2" aria-label="Academy values">
                {PILLARS.map((p) => (
                  <span key={p}
                    className="chip bg-navy/5 border-navy/15 text-navy/80 font-medium">
                    <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" aria-hidden="true" />
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Purpose ── */}
      <section aria-labelledby="purpose-heading" className="section bg-neutral-50">
        <div className="container-page">
          <SectionHeader eyebrow="Foundation" heading="Background & Purpose"
            description="Understanding what drives us helps you understand what we can do for you." />
          <div className="grid md:grid-cols-3 gap-6">
            {PURPOSE_CARDS.map(({ icon, title, body }) => (
              <article key={title}
                className="card card-hover p-7 border-l-4 border-l-gold">
                <span className="text-3xl block mb-4" aria-hidden="true">{icon}</span>
                <h3 className="text-navy font-semibold text-lg mb-3">{title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coach Profile ── */}
      <section aria-labelledby="coach-heading" className="section bg-gradient-navy">
        <div className="container-page">
          <SectionHeader eyebrow="Your Instructor" heading="Coach / Instructor Information"
            theme="light"
            description="Meet the experienced professional leading your Taekwondo journey at OSA." />

          <div className="card-dark rounded-2xl overflow-hidden grid md:grid-cols-[300px_1fr]">
            {/* Photo column */}
            <div className="bg-gradient-to-b from-green to-navy-mid flex flex-col items-center justify-center p-8 gap-5 min-h-[280px]">
              <div className="w-36 h-36 rounded-full bg-gold/12 border-[3px] border-gold
                              flex flex-col items-center justify-center
                              shadow-[0_0_40px_rgba(212,175,55,0.2)]" aria-label="Coach photo">
                <span className="text-4xl" aria-hidden="true">👤</span>
                <span className="text-white/35 text-[0.5rem] tracking-widest uppercase mt-1">Photo</span>
              </div>
              <ul className="w-full space-y-2" aria-label="Credentials">
                {CREDENTIALS.map(({ icon, label }) => (
                  <li key={label}
                    className="flex items-center gap-2.5 text-white/75 text-xs
                               py-2 border-b border-white/6 last:border-none">
                    <span className="text-gold flex-shrink-0" aria-hidden="true">{icon}</span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Details column */}
            <div className="p-8 lg:p-12">
              <p className="text-gold text-[0.62rem] tracking-[0.25em] uppercase font-semibold mb-2">Head Coach &amp; Instructor</p>
              <h2 id="coach-heading" className="text-white font-bold text-2xl mb-4">Coach / Instructor Name</h2>
              <div className="space-y-3 mb-8">
                {[
                  "A passionate and experienced Taekwondo practitioner with an extensive background in both competitive and instructional Taekwondo. Committed to developing each student's full potential through a balanced approach combining technical precision, physical conditioning, and mental discipline.",
                  "Certified by Kukkiwon and a recognized member of the Philippine Taekwondo Association, bringing years of competitive and coaching experience at regional and national levels.",
                ].map((p, i) => (
                  <p key={i} className="text-white/68 text-sm leading-relaxed">{p}</p>
                ))}
              </div>
              <h3 className="text-gold text-[0.6rem] tracking-[0.2em] uppercase font-semibold mb-4">Coaching Expertise</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {EXPERTISE.map((item) => (
                  <li key={item}
                    className="flex items-center gap-2.5 bg-white/4 border border-gold/8
                               rounded-md px-3 py-2.5 text-white/80 text-xs">
                    <span className="text-gold text-sm flex-shrink-0" aria-hidden="true">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Academy Info Tabs (rendered as sections) ── */}
      <section aria-labelledby="info-heading" className="section bg-neutral-50">
        <div className="container-page">
          <SectionHeader eyebrow="The Academy" heading="Academy Information"
            description="Everything you need to know about our programs, schedules, and policies." />

          {/* Programs */}
          <h3 className="text-[0.65rem] font-semibold tracking-[0.22em] uppercase text-navy/60 mb-4">Academy Programs</h3>
          <div className="space-y-4 mb-12">
            {PROGRAMS.map(({ icon, title, body }) => (
              <div key={title}
                className="card p-5 flex gap-4 items-start hover:border-gold/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-green border border-gold/20
                                flex items-center justify-center text-xl flex-shrink-0" aria-hidden="true">
                  {icon}
                </div>
                <div>
                  <h4 className="text-navy font-semibold mb-1">{title}</h4>
                  <p className="text-neutral-500 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Schedule table */}
          <h3 className="text-[0.65rem] font-semibold tracking-[0.22em] uppercase text-navy/60 mb-4">Training Schedules</h3>
          <div className="table-wrapper rounded-xl mb-12 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-navy text-white">
                <tr>
                  {["Program", "Schedule", "Days", "Frequency", "Notes"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[0.65rem] font-semibold tracking-[0.12em] uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SCHEDULE_ROWS.map((row, i) => (
                  <tr key={i} className="border-b border-neutral-100 last:border-none hover:bg-gold/4 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-navy">{row.program}</td>
                    <td className="px-5 py-3.5 text-neutral-600">{row.schedule}</td>
                    <td className="px-5 py-3.5">
                      <span className="chip bg-green/8 border-green/20 text-green-dark">{row.days}</span>
                    </td>
                    <td className="px-5 py-3.5 text-neutral-600">{row.freq}</td>
                    <td className="px-5 py-3.5 text-neutral-500 text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Policies */}
          <h3 className="text-[0.65rem] font-semibold tracking-[0.22em] uppercase text-navy/60 mb-4">Academy Policies</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {POLICIES.map(({ num, title, body }) => (
              <div key={num}
                className="card p-5 flex gap-4 items-start hover:border-gold/40 transition-colors">
                <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center
                                font-bold text-gold text-xs flex-shrink-0">
                  {num}
                </div>
                <div>
                  <h4 className="text-navy font-semibold text-sm mb-1">{title}</h4>
                  <p className="text-neutral-500 text-xs leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact snippet ── */}
      <section aria-labelledby="contact-heading" className="section bg-white">
        <div className="container-page max-w-4xl">
          <SectionHeader eyebrow="Reach Us" heading="Contact Details" />
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {[
              { icon: "📍", label: "Address",        value: "Academy Address, City, Philippines" },
              { icon: "📞", label: "Contact Number", value: "+63 (Contact Number)" },
              { icon: "✉️", label: "Email",           value: "info@oaksportsacademy.ph" },
              { icon: "🕐", label: "Hours",           value: "By Appointment Only" },
            ].map(({ icon, label, value }) => (
              <div key={label}
                className="card p-5 flex items-start gap-4">
                <div className="w-11 h-11 bg-gold/10 border border-gold/25 rounded-xl
                                flex items-center justify-center text-lg flex-shrink-0" aria-hidden="true">
                  {icon}
                </div>
                <div>
                  <p className="text-gold text-[0.6rem] font-semibold tracking-[0.15em] uppercase mb-0.5">{label}</p>
                  <p className="text-navy font-medium text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button href="/signup" variant="primary" size="lg">Create Account</Button>
            <Button href="/contact" variant="secondary" size="lg">Contact Us</Button>
          </div>
        </div>
      </section>
    </>
  );
}
