"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AccountStatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  email:      string;
  password:   string;
  rememberMe: boolean;
}
type FormErrors = Partial<{ email: string; password: string; general: string }>;

const ORG_BADGES = ["PTA", "Kukkiwon", "World TKD"] as const;

const BRAND_FEATURES = [
  { icon: "📋", text: "Manage your training registrations" },
  { icon: "📅", text: "View upcoming appointments"         },
  { icon: "🔔", text: "Receive important notifications"    },
  { icon: "🥋", text: "Track your progress & achievements" },
] as const;

const STATUS_ROWS: Array<{
  status: React.ComponentProps<typeof AccountStatusBadge>["status"];
  label:  string;
}> = [
  { status: "approved",  label: "Full access to dashboard & registration" },
  { status: "pending",   label: "Awaiting admin approval — limited access" },
  { status: "rejected",  label: "Corrections required before access"       },
  { status: "suspended", label: "Contact academy for assistance"           },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm]       = useState<FormState>({ email: "", password: "", rememberMe: false });
  const [errors, setErrors]   = useState<FormErrors>({});
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!form.password) {
      errs.password = "Password is required.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate async auth → redirect to dashboard
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    router.push("/dashboard");
  };

  const setField =
    <K extends keyof FormState>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = key === "rememberMe"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
      setForm((p) => ({ ...p, [key]: value }));
      if (key !== "rememberMe" && errors[key as keyof FormErrors]) {
        setErrors((p) => ({ ...p, [key]: undefined }));
      }
    };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* ── Brand panel (left) ── */}
      <aside
        aria-hidden="true"
        className="hidden lg:flex flex-col items-center justify-center
                   bg-gradient-hero relative overflow-hidden p-12"
      >
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-30
          [background-image:radial-gradient(circle_at_20%_50%,rgba(212,175,55,0.1),transparent_50%),
           radial-gradient(circle_at_80%_20%,rgba(11,61,46,0.2),transparent_40%)]" />

        <div className="relative z-10 text-center max-w-sm">
          {/* Emblem */}
          <div className="w-24 h-24 rounded-full bg-gradient-green border-[3px] border-gold
                          flex items-center justify-center
                          font-black text-gold text-2xl font-display
                          shadow-[0_0_50px_rgba(212,175,55,0.3)] mx-auto mb-7">
            OSA
          </div>

          <h2 className="text-white font-bold text-2xl mb-3">
            Welcome Back to<br />Oak Sports Academy
          </h2>
          <p className="text-white/65 text-sm leading-relaxed mb-8">
            Log in to access your dashboard, manage registrations, view schedules, and track your Taekwondo journey.
          </p>

          {/* Feature list */}
          <ul className="text-left space-y-3 mb-8">
            {BRAND_FEATURES.map(({ icon, text }) => (
              <li key={text}
                className="flex items-center gap-3 bg-white/5 border border-gold/15
                           rounded-lg px-4 py-3 text-white/80 text-sm">
                <span className="text-lg flex-shrink-0" aria-hidden="true">{icon}</span>
                {text}
              </li>
            ))}
          </ul>

          {/* Org badges */}
          <div className="flex gap-2.5 justify-center">
            {ORG_BADGES.map((b) => (
              <span key={b}
                className="text-[0.6rem] font-semibold tracking-[0.1em] uppercase
                           bg-white/5 border border-gold/25 text-gold px-3 py-1 rounded-sm">
                {b}
              </span>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Form panel (right) ── */}
      <main className="flex items-center justify-center bg-neutral-50 p-6 sm:p-10 min-h-screen">
        <div className="w-full max-w-[440px]">

          {/* Back link */}
          <Link href="/"
            className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-navy
                       text-sm mb-8 transition-colors">
            <span aria-hidden="true">←</span> Back to Home
          </Link>

          {/* Heading */}
          <div className="mb-8">
            {/* Mobile emblem (visible on small screens) */}
            <div className="flex items-center gap-3 mb-5 lg:hidden">
              <div className="w-10 h-10 rounded-full bg-gradient-green border-2 border-gold
                              flex items-center justify-center font-black text-gold text-xs font-display">
                OSA
              </div>
              <div>
                <div className="font-bold text-navy text-sm leading-tight">Oak Sports Academy</div>
                <div className="text-gold text-[0.6rem] tracking-widest uppercase">Taekwondo Excellence</div>
              </div>
            </div>
            <h1 className="text-navy font-bold text-2xl mb-1">Log In to Your Account</h1>
            <p className="text-neutral-500 text-sm">
              Enter your registered email and password to access your dashboard.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-7 shadow-card">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              {/* General error */}
              {errors.general && (
                <div role="alert"
                  className="flex items-start gap-2.5 p-3.5 bg-error/8 border border-error/30
                             rounded-xl text-error text-sm">
                  <span className="text-lg flex-shrink-0" aria-hidden="true">⚠️</span>
                  {errors.general}
                </div>
              )}

              <Input
                label="Email Address"
                type="email"
                required
                placeholder="yourname@email.com"
                value={form.email}
                onChange={setField("email")}
                error={errors.email}
                autoComplete="email"
              />

              {/* Password with show/hide toggle */}
              <Input
                label="Password"
                type={showPw ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={form.password}
                onChange={setField("password")}
                error={errors.password}
                autoComplete="current-password"
                rightElement={
                  <button
                    type="button"
                    aria-label={showPw ? "Hide password" : "Show password"}
                    onClick={() => setShowPw((v) => !v)}
                    className="text-neutral-400 hover:text-navy transition-colors text-sm"
                  >
                    {showPw ? "🙈" : "👁"}
                  </button>
                }
              />

              {/* Remember me + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-neutral-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.rememberMe}
                    onChange={setField("rememberMe")}
                    className="accent-gold w-4 h-4"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-gold-dark hover:text-gold text-sm font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
              >
                Log In
              </Button>
            </form>

            {/* Account status info */}
            <div className="mt-6 pt-5 border-t border-neutral-100">
              <p className="text-[0.62rem] font-semibold tracking-[0.15em] uppercase text-neutral-400 mb-3">
                Account Access Rules
              </p>
              <dl className="space-y-2">
                {STATUS_ROWS.map(({ status, label }) => (
                  <div key={status} className="flex items-center gap-3 py-1.5 border-b border-neutral-100 last:border-none">
                    <AccountStatusBadge status={status} />
                    <dd className="text-neutral-500 text-xs">{label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Sign-up link */}
          <p className="text-center mt-6 text-sm text-neutral-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup"
              className="text-gold-dark font-semibold hover:text-gold transition-colors">
              Create Account →
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
