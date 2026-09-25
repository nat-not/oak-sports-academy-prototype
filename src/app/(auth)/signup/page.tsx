"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

type AccountHolderType  = "athlete" | "parent-guardian";
type GuardianRelationship = "parent" | "aunt-uncle" | "sibling" | "legal-guardian" | "other";
type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface Step1 { email: string; mobile: string; password: string; confirm: string }
interface Step2 { surname: string; firstName: string; middleName: string; gender: string; dob: string; address: string; mobile: string }
interface Step3 { holderType: AccountHolderType | "" }
interface Step4 { pgName: string; relationship: GuardianRelationship | ""; relationshipOther: string; occupation: string; contactNumber: string; pgEmail: string }

type FieldErrors = Record<string, string | undefined>;

// ─── STEP INDICATOR ───────────────────────────────────────────────────────────

const STEPS = [
  { num: 1, label: "Account Info"  },
  { num: 2, label: "Personal Info" },
  { num: 3, label: "Holder Type"   },
  { num: 4, label: "Guardian"      },
  { num: 5, label: "Review"        },
] as const;

function StepIndicator({ current }: { current: Step }) {
  if (current === 6) return null;
  return (
    <nav aria-label="Registration steps" className="flex items-center mb-10 overflow-x-auto pb-1 no-scrollbar">
      {STEPS.map(({ num, label }, i) => {
        const state =
          num < current ? "completed" :
          num === current ? "active" : "upcoming";
        return (
          <div key={num} className="flex items-center flex-1 min-w-0">
            <div className="flex flex-col items-center gap-1.5">
              {/* Circle */}
              <div aria-current={state === "active" ? "step" : undefined}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
                  "font-bold text-sm transition-all duration-200",
                  state === "completed" && "bg-green-mid text-white border-2 border-green-mid",
                  state === "active"    && "bg-gold text-navy border-2 border-gold shadow-gold-sm",
                  state === "upcoming"  && "bg-neutral-200 text-neutral-400 border-2 border-neutral-200"
                )}>
                {state === "completed" ? "✓" : num}
              </div>
              {/* Label */}
              <span className={cn(
                "text-[0.58rem] font-semibold tracking-wide uppercase text-center max-w-[56px] leading-tight",
                state === "active"    && "text-gold",
                state === "completed" && "text-green-mid",
                state === "upcoming"  && "text-neutral-400"
              )}>
                {label}
              </span>
            </div>
            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div className={cn(
                "flex-1 h-[2px] mx-1.5 rounded-full transition-colors duration-300",
                num < current ? "bg-gold" : "bg-neutral-200"
              )} aria-hidden="true" />
            )}
          </div>
        );
      })}
    </nav>
  );
}

// ─── FORM CARD WRAPPER ────────────────────────────────────────────────────────

function FormCard({ title, subtitle, children }: {
  title:    string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl shadow-card overflow-hidden mb-5">
      <div className="px-7 pt-6 pb-4 border-b border-neutral-100">
        <h2 className="text-navy font-bold text-xl">{title}</h2>
        <p className="text-neutral-500 text-sm mt-1">{subtitle}</p>
      </div>
      <div className="px-7 py-6">{children}</div>
    </div>
  );
}

// ─── REVIEW ROW ───────────────────────────────────────────────────────────────

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start py-2.5 border-b border-neutral-100 last:border-none text-sm">
      <span className="text-neutral-400 flex-shrink-0 min-w-[140px]">{label}</span>
      <span className="text-navy font-medium text-right">{value || "—"}</span>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function SignupPage() {
  const [step, setStep]             = useState<Step>(1);
  const [holderType, setHolderType] = useState<AccountHolderType | "">("");
  const [relationship, setRelationship] = useState<GuardianRelationship | "">("");

  const [s1, setS1] = useState<Step1>({ email:"", mobile:"", password:"", confirm:"" });
  const [s2, setS2] = useState<Step2>({ surname:"", firstName:"", middleName:"", gender:"", dob:"", address:"", mobile:"" });
  const [s4, setS4] = useState<Step4>({ pgName:"", relationship:"", relationshipOther:"", occupation:"", contactNumber:"", pgEmail:"" });
  const [photoFile, setPhotoFile]   = useState<File | null>(null);
  const [docFile, setDocFile]       = useState<File | null>(null);
  const [errors, setErrors]         = useState<FieldErrors>({});

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const clearErr = (field: string) =>
    setErrors((p) => ({ ...p, [field]: undefined }));

  const s1Field =
    (f: keyof Step1) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setS1((p) => ({ ...p, [f]: e.target.value }));
      clearErr(f);
    };

  const s2Field =
    (f: keyof Step2) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setS2((p) => ({ ...p, [f]: e.target.value }));
      clearErr(f);
    };

  const s4Field =
    (f: keyof Step4) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setS4((p) => ({ ...p, [f]: e.target.value }));
      clearErr(f);
    };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // ── Step validations ────────────────────────────────────────────────────────
  const validateStep1 = (): boolean => {
    const errs: FieldErrors = {};
    if (!s1.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s1.email)) errs.email = "Valid email required.";
    if (!s1.mobile.trim()) errs.mobile = "Mobile number is required.";
    if (s1.password.length < 8) errs.password = "Password must be at least 8 characters.";
    if (s1.password !== s1.confirm) errs.confirm = "Passwords do not match.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errs: FieldErrors = {};
    if (!s2.surname.trim())   errs.surname    = "Surname is required.";
    if (!s2.firstName.trim()) errs.firstName  = "First name is required.";
    if (!s2.gender)           errs.gender     = "Please select a gender.";
    if (!s2.dob)              errs.dob        = "Date of birth is required.";
    if (!s2.address.trim())   errs.address    = "Address is required.";
    if (!s2.mobile.trim())    errs.s2mobile   = "Mobile number is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = (): boolean => {
    if (!holderType) {
      setErrors({ holderType: "Please select an account holder type." });
      return false;
    }
    return true;
  };

  const validateStep4 = (): boolean => {
    const errs: FieldErrors = {};
    if (!s4.pgName.trim())        errs.pgName        = "Guardian full name is required.";
    if (!relationship)             errs.relationship  = "Please select a relationship.";
    if (!s4.occupation.trim())     errs.occupation    = "Occupation is required.";
    if (!s4.contactNumber.trim())  errs.contactNumber = "Contact number is required.";
    if (!s4.pgEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s4.pgEmail)) errs.pgEmail = "Valid email required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Navigation ──────────────────────────────────────────────────────────────
  const next = useCallback(() => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3) {
      if (!validateStep3()) return;
      // Skip step 4 for athletes
      if (holderType === "athlete") { setStep(5); scrollTop(); return; }
    }
    if (step === 4 && !validateStep4()) return;
    setStep((s) => (s + 1) as Step);
    scrollTop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, s1, s2, s4, holderType, relationship]);

  const back = useCallback(() => {
    if (step === 5 && holderType === "athlete") { setStep(3); scrollTop(); return; }
    setStep((s) => (s - 1) as Step);
    scrollTop();
  }, [step, holderType]);

  const submit = () => { setStep(6); scrollTop(); };

  // ── UI ───────────────────────────────────────────────────────────────────────
  const stepLabel = `Step ${step < 6 ? step : 5} of 5`;
  const fullName  = [s2.firstName, s2.middleName, s2.surname].filter(Boolean).join(" ");

  return (
    <div className="min-h-screen grid lg:grid-cols-[300px_1fr]">

      {/* ── Left sidebar ── */}
      <aside className="hidden lg:flex flex-col justify-center bg-gradient-hero relative overflow-hidden p-8">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C9A84C' fill-opacity='0.08'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10">
          {/* Logo */}
          <div className="w-16 h-16 rounded-full bg-gradient-green border-2 border-gold
                          flex items-center justify-center font-black text-gold text-base
                          shadow-gold-sm mb-6">
            OSA
          </div>
          <h2 className="text-white font-bold text-xl mb-2">Create Your<br />OSA Account</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-8">
            Join Oak Sports Academy to register for Taekwondo training, manage sessions, and track your progress.
          </p>

          {/* Step overview */}
          <ul className="space-y-3">
            {[
              { n:1, title:"Account Information", sub:"Email, password & mobile"            },
              { n:2, title:"Personal Information", sub:"Name, gender, date of birth"         },
              { n:3, title:"Account Holder Type",  sub:"Athlete or Parent/Guardian"          },
              { n:4, title:"Guardian Info",         sub:"Required for minors"                },
              { n:5, title:"Review & Submit",       sub:"Confirm & send for approval"        },
            ].map(({ n, title, sub }) => (
              <li key={n} className="flex items-start gap-3">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                  "font-bold text-[0.65rem]",
                  n < step  && "bg-gold/20 border border-gold/40 text-gold",
                  n === step && "bg-gold text-navy",
                  n > step  && "bg-white/8 border border-white/15 text-white/35"
                )}>
                  {n < step ? "✓" : n}
                </div>
                <div>
                  <p className={cn("text-sm font-semibold leading-tight", n === step ? "text-gold" : n < step ? "text-white/80" : "text-white/35")}>{title}</p>
                  <p className="text-white/35 text-xs mt-0.5">{sub}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Org badges */}
          <div className="flex gap-2 mt-8">
            {(["PTA", "Kukkiwon", "World TKD"] as const).map((b) => (
              <span key={b} className="text-[0.58rem] font-semibold tracking-[0.1em] uppercase
                                       bg-white/5 border border-gold/25 text-gold px-2.5 py-1 rounded-sm">
                {b}
              </span>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Main form area ── */}
      <main className="flex flex-col items-center justify-start bg-neutral-50 p-6 sm:p-10 py-12">
        <div className="w-full max-w-[680px]">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="text-neutral-400 hover:text-navy text-sm transition-colors flex items-center gap-1.5">
              <span aria-hidden="true">←</span> Home
            </Link>
            <span className="text-neutral-400 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-gold-dark font-semibold hover:text-gold transition-colors">
                Log In
              </Link>
            </span>
          </div>

          {/* Step indicator */}
          <StepIndicator current={step} />

          {/* ══ STEP 1 — Account Information ══ */}
          {step === 1 && (
            <FormCard
              title="Account Information"
              subtitle="Provide your login credentials for your Oak Sports Academy account."
            >
              <div className="space-y-5">
                <Input
                  label="Email Address" type="email" required
                  placeholder="yourname@email.com"
                  value={s1.email} onChange={s1Field("email")}
                  error={errors.email} autoComplete="email"
                />
                <Input
                  label="Mobile Number" type="tel" required
                  placeholder="+63 9XX XXX XXXX"
                  value={s1.mobile} onChange={s1Field("mobile")}
                  error={errors.mobile}
                  hint="This will be used for appointment reminders."
                />
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="Password" type="password" required
                    placeholder="Create a strong password"
                    value={s1.password} onChange={s1Field("password")}
                    error={errors.password}
                    hint="Minimum 8 characters"
                    autoComplete="new-password"
                  />
                  <Input
                    label="Confirm Password" type="password" required
                    placeholder="Re-enter your password"
                    value={s1.confirm} onChange={s1Field("confirm")}
                    error={errors.confirm}
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </FormCard>
          )}

          {/* ══ STEP 2 — Personal Information ══ */}
          {step === 2 && (
            <FormCard
              title="Personal Information"
              subtitle="Provide the participant's personal details. For minor participants, this is the student's information."
            >
              <div className="space-y-5">
                {/* Name row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input label="Surname" required placeholder="Last Name"
                    value={s2.surname} onChange={s2Field("surname")} error={errors.surname} />
                  <Input label="First Name" required placeholder="First Name"
                    value={s2.firstName} onChange={s2Field("firstName")} error={errors.firstName} />
                </div>
                <Input label="Middle Name" placeholder="Middle Name (optional)"
                  value={s2.middleName} onChange={s2Field("middleName")} />

                {/* Gender + DOB */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase text-navy/90 block mb-1.5">
                      Gender <span className="text-error">*</span>
                    </label>
                    <select
                      value={s2.gender}
                      onChange={s2Field("gender")}
                      className={cn(
                        "w-full h-11 px-4 rounded-md border text-sm bg-white text-navy",
                        "focus:outline-none transition-all duration-150",
                        errors.gender
                          ? "border-error focus:border-error focus:shadow-focus-error"
                          : "border-neutral-300 focus:border-gold focus:shadow-focus-gold"
                      )}
                    >
                      <option value="" disabled>Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                    {errors.gender && (
                      <p className="mt-1.5 text-error text-[0.72rem] font-medium flex items-center gap-1.5">
                        <span aria-hidden="true">⚠</span>{errors.gender}
                      </p>
                    )}
                  </div>
                  <Input label="Date of Birth" type="date" required
                    value={s2.dob} onChange={s2Field("dob")} error={errors.dob} />
                </div>

                <Input label="Address" required placeholder="Complete home address"
                  value={s2.address} onChange={s2Field("address")} error={errors.address} />
                <Input label="Mobile Number" type="tel" required placeholder="+63 9XX XXX XXXX"
                  value={s2.mobile} onChange={s2Field("mobile")} error={errors.s2mobile} />

                {/* Photo upload */}
                <div>
                  <p className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase text-navy/90 mb-1.5">
                    Upload 2×2 Picture <span className="text-error">*</span>
                  </p>
                  <label
                    htmlFor="photo-upload"
                    className="flex flex-col items-center justify-center gap-2
                               border-2 border-dashed border-neutral-300 rounded-xl p-6
                               cursor-pointer bg-neutral-50 hover:border-gold hover:bg-gold/3
                               transition-all duration-200"
                  >
                    {photoFile ? (
                      <>
                        <span className="text-3xl" aria-hidden="true">✅</span>
                        <span className="text-green-mid font-semibold text-sm">{photoFile.name}</span>
                        <span className="text-neutral-400 text-xs">Photo uploaded</span>
                      </>
                    ) : (
                      <>
                        <span className="text-3xl text-neutral-400" aria-hidden="true">📷</span>
                        <span className="text-sm text-neutral-500">
                          Click to upload your <span className="text-gold font-semibold">2×2 photo</span>
                        </span>
                        <span className="text-neutral-400 text-xs">JPG, PNG — max 5 MB</span>
                      </>
                    )}
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
                  />
                </div>
              </div>
            </FormCard>
          )}

          {/* ══ STEP 3 — Account Holder Type ══ */}
          {step === 3 && (
            <FormCard
              title="Account Holder Type"
              subtitle="Indicate who will own and manage this account. This does NOT select a training type — it only identifies the account manager."
            >
              <div className="space-y-4">
                {(
                  [
                    { type: "athlete"          as AccountHolderType, icon: "🥋", title: "Athlete",          desc: "For an adult participant (18+) who will create and manage their own account." },
                    { type: "parent-guardian"  as AccountHolderType, icon: "👨‍👧", title: "Parent / Guardian", desc: "For a parent or legal guardian managing an account on behalf of a minor participant." },
                  ] as const
                ).map(({ type, icon, title, desc }) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => { setHolderType(type); clearErr("holderType"); }}
                    aria-pressed={holderType === type}
                    className={cn(
                      "w-full text-left border-2 rounded-2xl p-6 transition-all duration-200",
                      "flex items-start gap-5",
                      holderType === type
                        ? "border-gold bg-gold/5 shadow-gold-sm"
                        : "border-neutral-200 hover:border-gold/50 bg-white"
                    )}
                  >
                    <span className="text-3xl flex-shrink-0" aria-hidden="true">{icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-navy mb-1">{title}</p>
                      <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
                    </div>
                    {holderType === type && (
                      <span className="w-6 h-6 rounded-full bg-gold text-navy font-bold text-xs
                                       flex items-center justify-center flex-shrink-0 mt-0.5"
                        aria-hidden="true">✓</span>
                    )}
                  </button>
                ))}
                {errors.holderType && (
                  <p className="text-error text-xs flex items-center gap-1.5" role="alert">
                    <span aria-hidden="true">⚠</span>{errors.holderType}
                  </p>
                )}

                <div className="p-4 bg-info/8 border border-info/25 rounded-xl text-xs text-navy/75 flex gap-2.5">
                  <span className="text-info flex-shrink-0" aria-hidden="true">ℹ️</span>
                  <p>Selecting <strong>Parent/Guardian</strong> unlocks an additional step to provide guardian information and upload required documents.</p>
                </div>
              </div>
            </FormCard>
          )}

          {/* ══ STEP 4 — Parent/Guardian Information ══ */}
          {step === 4 && (
            <FormCard
              title="Parent / Guardian Information"
              subtitle="Required when the account is being created for a minor participant."
            >
              <div className="space-y-5">
                <Input label="Full Name" required placeholder="Full legal name of parent/guardian"
                  value={s4.pgName} onChange={s4Field("pgName")} error={errors.pgName} />

                {/* Relationship grid */}
                <div>
                  <p className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase text-navy/90 mb-2">
                    Relationship to Participant <span className="text-error">*</span>
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {(
                      [
                        { v: "parent",          l: "Parent"        },
                        { v: "aunt-uncle",      l: "Aunt / Uncle"  },
                        { v: "sibling",         l: "Sibling"       },
                        { v: "legal-guardian",  l: "Legal Guardian"},
                        { v: "other",           l: "Other"         },
                      ] as const
                    ).map(({ v, l }) => (
                      <button key={v} type="button"
                        onClick={() => { setRelationship(v); setS4((p) => ({ ...p, relationship: v })); clearErr("relationship"); }}
                        aria-pressed={relationship === v}
                        className={cn(
                          "px-3 py-2.5 rounded-lg border text-sm font-medium transition-all duration-150",
                          relationship === v
                            ? "border-gold bg-gold/6 text-gold-dark"
                            : "border-neutral-200 text-neutral-600 hover:border-gold/40"
                        )}>
                        {l}
                      </button>
                    ))}
                  </div>
                  {errors.relationship && (
                    <p className="mt-1.5 text-error text-xs flex gap-1.5" role="alert">
                      <span aria-hidden="true">⚠</span>{errors.relationship}
                    </p>
                  )}
                  {relationship === "other" && (
                    <Input
                      placeholder="Specify relationship"
                      value={s4.relationshipOther}
                      onChange={s4Field("relationshipOther")}
                      className="mt-3"
                    />
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Input label="Occupation" required placeholder="Occupation"
                    value={s4.occupation} onChange={s4Field("occupation")} error={errors.occupation} />
                  <Input label="Contact Number" type="tel" required placeholder="+63 9XX XXX XXXX"
                    value={s4.contactNumber} onChange={s4Field("contactNumber")} error={errors.contactNumber} />
                </div>
                <Input label="Email Address" type="email" required placeholder="Guardian email address"
                  value={s4.pgEmail} onChange={s4Field("pgEmail")} error={errors.pgEmail} />

                {/* Document upload */}
                <div>
                  <p className="font-semibold text-[0.68rem] tracking-[0.15em] uppercase text-navy/90 mb-1.5">
                    Identification & Specimen Signatures <span className="text-error">*</span>
                  </p>
                  <div className="p-3 bg-warning/8 border border-warning/30 rounded-xl text-xs text-navy/75 flex gap-2.5 mb-3">
                    <span aria-hidden="true" className="text-warning flex-shrink-0">📎</span>
                    <p>Upload <strong>one (1) PDF file</strong> containing: Valid ID of Parent/Guardian, Valid ID of Participant, and Three (3) specimen signatures of the Parent/Guardian.</p>
                  </div>
                  <label htmlFor="doc-upload"
                    className="flex flex-col items-center justify-center gap-2
                               border-2 border-dashed border-neutral-300 rounded-xl p-6
                               cursor-pointer bg-neutral-50 hover:border-gold hover:bg-gold/3
                               transition-all duration-200">
                    {docFile ? (
                      <>
                        <span className="text-3xl" aria-hidden="true">✅</span>
                        <span className="text-green-mid font-semibold text-sm">{docFile.name}</span>
                        <span className="text-neutral-400 text-xs">Document uploaded successfully</span>
                      </>
                    ) : (
                      <>
                        <span className="text-3xl text-neutral-400" aria-hidden="true">📄</span>
                        <span className="text-sm text-neutral-500">
                          Click to upload your <span className="text-gold font-semibold">PDF Document</span>
                        </span>
                        <span className="text-neutral-400 text-xs">PDF only — max 10 MB</span>
                      </>
                    )}
                  </label>
                  <input id="doc-upload" type="file" accept=".pdf" className="sr-only"
                    onChange={(e) => setDocFile(e.target.files?.[0] ?? null)} />
                </div>
              </div>
            </FormCard>
          )}

          {/* ══ STEP 5 — Review & Submit ══ */}
          {step === 5 && (
            <>
              {/* Account info */}
              <div className="bg-white border border-neutral-200 rounded-2xl shadow-card overflow-hidden mb-5">
                <div className="px-7 pt-5 pb-3 border-b border-neutral-100">
                  <h3 className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-neutral-400">Account Information</h3>
                </div>
                <div className="px-7 py-5">
                  <ReviewRow label="Email Address" value={s1.email} />
                  <ReviewRow label="Mobile Number" value={s1.mobile} />
                </div>
              </div>

              {/* Personal info */}
              <div className="bg-white border border-neutral-200 rounded-2xl shadow-card overflow-hidden mb-5">
                <div className="px-7 pt-5 pb-3 border-b border-neutral-100">
                  <h3 className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-neutral-400">Personal Information</h3>
                </div>
                <div className="px-7 py-5">
                  <ReviewRow label="Full Name"         value={fullName} />
                  <ReviewRow label="Gender"            value={s2.gender} />
                  <ReviewRow label="Date of Birth"     value={s2.dob} />
                  <ReviewRow label="Address"           value={s2.address} />
                  <ReviewRow label="Account Holder"    value={holderType === "athlete" ? "Athlete" : "Parent / Guardian"} />
                  <ReviewRow label="Photo Uploaded"    value={photoFile?.name ?? "Not uploaded"} />
                </div>
              </div>

              {/* Guardian info (if applicable) */}
              {holderType === "parent-guardian" && (
                <div className="bg-white border border-neutral-200 rounded-2xl shadow-card overflow-hidden mb-5">
                  <div className="px-7 pt-5 pb-3 border-b border-neutral-100">
                    <h3 className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-neutral-400">Parent / Guardian Information</h3>
                  </div>
                  <div className="px-7 py-5">
                    <ReviewRow label="Guardian Name"  value={s4.pgName} />
                    <ReviewRow label="Relationship"   value={relationship === "other" ? `Other: ${s4.relationshipOther}` : relationship} />
                    <ReviewRow label="Occupation"     value={s4.occupation} />
                    <ReviewRow label="Contact"        value={s4.contactNumber} />
                    <ReviewRow label="Email"          value={s4.pgEmail} />
                    <ReviewRow label="Documents"      value={docFile?.name ?? "Not uploaded"} />
                  </div>
                </div>
              )}

              {/* Important notice */}
              <div className="p-4 bg-info/8 border border-info/25 rounded-xl text-sm text-navy/75 flex gap-3 mb-5">
                <span className="text-info flex-shrink-0" aria-hidden="true">ℹ️</span>
                <p>After submission, your account will be reviewed by Oak Sports Academy. <strong>You cannot register for classes until your account is approved.</strong></p>
              </div>
            </>
          )}

          {/* ══ STEP 6 — Pending Confirmation ══ */}
          {step === 6 && (
            <div className="bg-white border border-neutral-200 rounded-2xl shadow-card p-10 text-center">
              <div className="w-20 h-20 bg-warning/10 border-2 border-warning/30 rounded-full
                              flex items-center justify-center text-4xl mx-auto mb-6">
                ⏳
              </div>
              <h2 className="text-navy font-bold text-2xl mb-3">Account Submitted for Approval</h2>
              <p className="text-neutral-500 leading-relaxed max-w-lg mx-auto mb-6">
                &quot;Your account registration has been submitted and is currently waiting for approval from Oak Sports Academy. You will be notified once your account has been approved.&quot;
              </p>
              <div className="inline-flex items-center gap-2 bg-warning/10 border border-warning/30
                              rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-warning animate-pulse" aria-hidden="true" />
                <span className="text-warning font-semibold text-sm">Pending Approval</span>
              </div>
              <p className="text-neutral-400 text-sm mb-8">
                You cannot proceed to class registration until your account is approved by the administrator.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button href="/login" variant="primary"  size="lg">Go to Login</Button>
                <Button href="/"     variant="secondary" size="lg">Back to Home</Button>
              </div>
            </div>
          )}

          {/* ── Step navigation buttons ── */}
          {step < 6 && (
            <div className="flex items-center justify-between gap-3 mt-2">
              {step > 1 ? (
                <Button type="button" variant="secondary" size="md" onClick={back}>
                  ← Back
                </Button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <Button type="button" variant="primary" size="md" onClick={next}>
                  Continue →
                </Button>
              ) : (
                <Button type="button" variant="primary" size="md" onClick={submit}>
                  Submit Application
                </Button>
              )}
            </div>
          )}

          {/* Sign-in link */}
          {step < 6 && (
            <p className="text-center mt-6 text-sm text-neutral-500">
              Already have an account?{" "}
              <Link href="/login" className="text-gold-dark font-semibold hover:text-gold transition-colors">
                Log In →
              </Link>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
