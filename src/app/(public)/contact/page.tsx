"use client";

import { useState, useId } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  fullName:    string;
  email:       string;
  phone:       string;
  message:     string;
}
type FormErrors = Partial<Record<keyof FormState, string>>;

const SUBJECTS = [
  { id: "general",         label: "💬 General Inquiry"          },
  { id: "training",        label: "🥋 Training Programs"         },
  { id: "registration",    label: "📋 Registration"              },
  { id: "appointment",     label: "📅 Schedule Appointment"      },
  { id: "merch",           label: "🛒 Merch / Products"          },
  { id: "other",           label: "📌 Other"                     },
] as const;

const FAQ_ITEMS = [
  {
    q: "How do I register for a training class?",
    a: "Create an account on the Oak Sports Academy website. Submit your application and wait for admin approval. Once approved, log in to your dashboard and register for either a Free Trial Class or Regular Training.",
  },
  {
    q: "Is the Free Trial Class really free?",
    a: "Yes! The Free Trial Class is completely free (₱0). It is a group class open to all new students across four age groups. Each student is allowed a maximum of 2 trial days. Slots are limited to 5 per age group.",
  },
  {
    q: "How long does account approval take?",
    a: "Account approval typically takes 1–3 business days. The administrator reviews all submitted information. You will be notified once your account has been approved.",
  },
  {
    q: "What is the difference between Group Class and One-on-One Private Coaching?",
    a: "Group Class is small-group training (min 3, max 5 students). One-on-One Private Coaching provides fully individualised sessions with the head coach — tailored curriculum, flexible scheduling, and accelerated progress. Both include 8 total sessions.",
  },
  {
    q: "Are sessions available on weekends?",
    a: "Yes! OSA offers both weekday (after-school) and weekend (Saturday) training schedules. All sessions must be scheduled in advance through the appointment system.",
  },
  {
    q: "Do I need my own Taekwondo uniform?",
    a: "You do not need a uniform for your first trial class. For regular training, a Dobok is included free with Premium Package enrollment. You may also purchase one from the OSA Merch store.",
  },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const panelId         = useId();

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4
                   text-left hover:bg-neutral-50 transition-colors"
      >
        <span className="font-semibold text-navy text-sm pr-4">{q}</span>
        <span
          aria-hidden="true"
          className={cn(
            "text-gold text-lg font-light flex-shrink-0 transition-transform duration-200",
            open && "rotate-45"
          )}
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="px-5 pb-5 text-neutral-600 text-sm leading-relaxed"
      >
        {a}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm]         = useState<FormState>({ fullName: "", email: "", phone: "", message: "" });
  const [errors, setErrors]     = useState<FormErrors>({});
  const [subject, setSubject]   = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "A valid email address is required.";
    if (!form.message.trim()) errs.message = "Please enter your message.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  return (
    <>
      {/* Page hero */}
      <section aria-label="Contact Us hero" className="page-hero text-center">
        <div className="container-page relative z-10">
          <span className="section-label">We&apos;re Here to Help</span>
          <h1 className="text-white mt-2 mb-4">Contact Us</h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Have questions about training, registration, or schedules? We&apos;d love to hear from you.
          </p>
          <nav aria-label="Breadcrumb"
            className="mt-6 flex items-center justify-center gap-2 text-sm text-white/45">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">Contact Us</span>
          </nav>
        </div>
      </section>

      {/* Contact main */}
      <section className="section bg-neutral-50">
        <div className="container-page">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-start">

            {/* ── Form ── */}
            <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-card">
              {/* Form header */}
              <div className="bg-gradient-to-br from-navy to-green px-7 py-6">
                <h2 className="text-white font-bold text-xl">Send Us a Message</h2>
                <p className="text-white/60 text-sm mt-1">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
              </div>

              <div className="p-7">
                {submitted ? (
                  /* ── Success state ── */
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-success/10 border-2 border-success/30 rounded-full
                                    flex items-center justify-center text-3xl mx-auto mb-5">
                      ✅
                    </div>
                    <h3 className="text-navy font-bold text-xl mb-2">Message Sent!</h3>
                    <p className="text-neutral-500 text-sm max-w-sm mx-auto mb-6">
                      Thank you for reaching out. We&apos;ll get back to you within 1–2 business days.
                    </p>
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      onClick={() => { setSubmitted(false); setForm({ fullName:"", email:"", phone:"", message:"" }); setSubject(""); }}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  /* ── Form ── */
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Input
                        label="Full Name"
                        required
                        placeholder="Your full name"
                        value={form.fullName}
                        onChange={handleChange("fullName")}
                        error={errors.fullName}
                        autoComplete="name"
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange("email")}
                        error={errors.email}
                        autoComplete="email"
                      />
                    </div>

                    <Input
                      label="Contact Number"
                      type="tel"
                      placeholder="+63 9XX XXX XXXX"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      autoComplete="tel"
                    />

                    {/* Subject chips */}
                    <div>
                      <p className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase text-navy/90 mb-2">
                        Subject / Inquiry Type
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {SUBJECTS.map(({ id, label }) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setSubject(id)}
                            aria-pressed={subject === id}
                            className={cn(
                              "px-3 py-2.5 rounded-lg border text-xs font-medium text-left",
                              "transition-all duration-150",
                              subject === id
                                ? "border-gold bg-gold/6 text-gold-dark font-semibold"
                                : "border-neutral-200 text-neutral-600 hover:border-gold/50"
                            )}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Textarea
                      label="Message"
                      required
                      placeholder="Write your message here..."
                      rows={5}
                      value={form.message}
                      onChange={handleChange("message")}
                      error={errors.message}
                    />

                    <Button type="submit" variant="primary" size="lg" fullWidth>
                      Send Message ✉️
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* ── Contact info ── */}
            <div className="space-y-5">
              {/* Detail card */}
              <div className="bg-navy rounded-2xl p-7 border border-gold/15">
                <h3 className="text-gold font-semibold text-[0.65rem] tracking-[0.2em] uppercase mb-5 pb-3 border-b border-gold/15">
                  Contact Information
                </h3>
                <dl className="space-y-4">
                  {[
                    { icon: "📍", label: "Address",        value: "Academy Address, Barangay, City, Province, Philippines", note: "By Appointment Only — no walk-ins" },
                    { icon: "📞", label: "Contact Number", value: "+63 (Contact Number)",              note: "Available during operating hours" },
                    { icon: "✉️", label: "Email Address",  value: "info@oaksportsacademy.ph",          note: "Response within 1–2 business days" },
                    { icon: "🕐", label: "Operating Hours",value: "By Appointment Only",               note: "Schedule in advance through the system" },
                  ].map(({ icon, label, value, note }) => (
                    <div key={label} className="flex gap-4">
                      <div className="w-10 h-10 bg-gold/10 border border-gold/20 rounded-lg
                                      flex items-center justify-center text-base flex-shrink-0"
                        aria-hidden="true">
                        {icon}
                      </div>
                      <div>
                        <dt className="text-gold text-[0.58rem] font-semibold tracking-[0.15em] uppercase mb-0.5">{label}</dt>
                        <dd className="text-white text-sm font-medium">{value}</dd>
                        <dd className="text-white/45 text-xs mt-0.5">{note}</dd>
                      </div>
                    </div>
                  ))}
                </dl>

                {/* Social links */}
                <div className="mt-6 pt-4 border-t border-white/8">
                  <p className="text-white/45 text-xs mb-3">Connect with us</p>
                  <div className="flex gap-2.5">
                    {[
                      { label: "Facebook",  icon: "f",  href: "#" },
                      { label: "Instagram", icon: "ig", href: "#" },
                    ].map(({ label, icon, href }) => (
                      <a key={label} href={href} aria-label={label}
                        className="w-10 h-10 rounded-full bg-white/6 border border-gold/20
                                   flex items-center justify-center text-white/60 text-xs
                                   hover:bg-gold hover:border-gold hover:text-navy
                                   transition-all duration-150">
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Appointment notice */}
              <div className="bg-gradient-to-br from-green to-navy rounded-2xl p-6 text-center border border-gold/15">
                <span className="text-4xl block mb-3" aria-hidden="true">📅</span>
                <h3 className="text-white font-bold mb-2">By Appointment Only</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  OSA operates strictly by appointment. To schedule your training session, create an account and use the member portal registration system.
                </p>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <Button href="/signup" variant="primary"   size="sm" fullWidth>Create Account</Button>
                  <Button href="/login"  variant="secondary" size="sm" fullWidth>Log In</Button>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-neutral-200 rounded-2xl min-h-[220px] flex flex-col items-center
                              justify-center text-center p-8 text-neutral-400 border border-neutral-200">
                <span className="text-5xl mb-3" aria-hidden="true">🗺️</span>
                <h4 className="font-medium text-neutral-500 mb-1">Academy Location</h4>
                <p className="text-xs max-w-[220px] leading-relaxed">
                  Contact us for exact directions and appointment scheduling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="section bg-white">
        <div className="container-page max-w-3xl">
          <div className="text-center mb-12">
            <span className="section-label">Common Questions</span>
            <h2 className="mt-2 text-navy">Frequently Asked Questions</h2>
            <div className="divider-gold w-14 mx-auto mt-4" />
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-neutral-500 text-sm mb-4">
              Still have questions? We&apos;re happy to help.
            </p>
            <Button href="/signup" variant="primary" size="lg">Create Account &amp; Register</Button>
          </div>
        </div>
      </section>
    </>
  );
}
