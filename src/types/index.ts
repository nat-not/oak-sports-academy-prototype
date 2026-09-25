/**
 * Oak Sports Academy — Shared TypeScript Type Definitions
 * Central barrel file for all domain and UI types used across the app.
 */

// ─────────────────────────────────────────────────────────────────────────────
//  UTILITY TYPES
// ─────────────────────────────────────────────────────────────────────────────

/** Helper: extract keys whose values match a type */
export type KeysOfType<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

/** Make specific keys of T required */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Nullable wrapper */
export type Nullable<T> = T | null;

/** Optional wrapper */
export type Maybe<T> = T | null | undefined;

// ─────────────────────────────────────────────────────────────────────────────
//  DESIGN SYSTEM — UI TOKEN TYPES
// ─────────────────────────────────────────────────────────────────────────────

/** Semantic color variants used by badge, alert, button, etc. */
export type SemanticVariant =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";

/** Account / registration status variants (mirrors DB statuses) */
export type AccountStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "suspended";

/** Button visual variants */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "gold-outline";

/** Button size scale */
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

/** Input size scale */
export type InputSize = "sm" | "md" | "lg";

/** Badge size */
export type BadgeSize = "xs" | "sm" | "md";

/** Badge variant — extends semantic with domain-specific states */
export type BadgeVariant =
  | SemanticVariant
  | AccountStatus
  | "default"
  | "gold"
  | "navy";

// ─────────────────────────────────────────────────────────────────────────────
//  NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  /** Whether this link is external (opens in new tab) */
  external?: boolean;
  /** Icon name / component key (optional) */
  icon?: string;
  /** Sub-navigation items */
  children?: NavItem[];
}

export interface NavConfig {
  brand: {
    name: string;
    tagline: string;
    href: string;
  };
  links: NavItem[];
  ctaLinks: Array<{
    label: string;
    href: string;
    variant: ButtonVariant;
  }>;
}

// ─────────────────────────────────────────────────────────────────────────────
//  DOMAIN — ACADEMY
// ─────────────────────────────────────────────────────────────────────────────

/** Taekwondo discipline / training program */
export type TrainingProgram = "kyorugi" | "poomsae";

/** Training format */
export type TrainingOption =
  | "free-trial"
  | "group-class"
  | "private-coaching";

/** Training frequency */
export type TrainingFrequency = "twice-weekly" | "thrice-weekly";

/** Schedule type */
export type ScheduleType = "weekday-after-school" | "weekend-saturday";

/** Age group categories */
export type AgeGroup =
  | "3-5"
  | "6-12"
  | "13-17"
  | "adult";

export interface AgeGroupInfo {
  id: AgeGroup;
  label: string;
  description: string;
  maxSlots: number;
  icon: string;
}

/** Training package */
export interface TrainingPackage {
  id: string;
  label: string;
  price: number;
  /** ₱0 = free */
  isFree: boolean;
  sessionCount: number;
  bonusSessions: number;
  includesUniform: boolean;
  discount?: number;
  details: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
//  DOMAIN — USER / ACCOUNT
// ─────────────────────────────────────────────────────────────────────────────

export type AccountHolderType = "athlete" | "parent-guardian";

export type GuardianRelationship =
  | "parent"
  | "aunt-uncle"
  | "sibling"
  | "legal-guardian"
  | "other";

export interface UserProfile {
  id: string;
  email: string;
  mobileNumber: string;
  accountHolderType: AccountHolderType;
  accountStatus: AccountStatus;
  participant: ParticipantInfo;
  guardian?: GuardianInfo;
  createdAt: string;
  updatedAt: string;
}

export interface ParticipantInfo {
  surname: string;
  firstName: string;
  middleName?: string;
  gender: "male" | "female" | "prefer-not-to-say";
  dateOfBirth: string;
  address: string;
  mobileNumber: string;
  photoUrl?: string;
}

export interface GuardianInfo {
  fullName: string;
  relationship: GuardianRelationship;
  relationshipOther?: string;
  occupation: string;
  contactNumber: string;
  email: string;
  documentsUrl?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
//  DOMAIN — REGISTRATION / ENROLLMENT
// ─────────────────────────────────────────────────────────────────────────────

export interface FreeTrialRegistration {
  userId: string;
  ageGroup: AgeGroup;
  preferredDate: string;
  preferredTime: string;
  waiverAccepted: boolean;
  mediaConsentGiven: boolean;
}

export interface RegularTrainingRegistration {
  userId: string;
  trainingOption: Exclude<TrainingOption, "free-trial">;
  program: TrainingProgram;
  frequency: TrainingFrequency;
  schedule: ScheduleType;
  packageId: string;
  firstAppointmentDate: string;
  firstAppointmentTime: string;
  waiverAccepted: boolean;
  mediaConsentGiven: boolean;
}

export type Registration =
  | FreeTrialRegistration
  | RegularTrainingRegistration;

// ─────────────────────────────────────────────────────────────────────────────
//  DOMAIN — EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export type EventCategory =
  | "belt-promotion"
  | "sparring"
  | "announcement"
  | "activity"
  | "training";

export interface AcademyEvent {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string
  time: string;
  location: string;
  category: EventCategory;
  tags: string[];
  requiresRegistration: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
//  DOMAIN — MERCHANDISE
// ─────────────────────────────────────────────────────────────────────────────

export type MerchCategory =
  | "uniform"
  | "apparel"
  | "accessories"
  | "protective-gear";

export type MerchAvailability =
  | "available"
  | "limited"
  | "sold-out"
  | "included-in-package";

export interface MerchProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MerchCategory;
  availability: MerchAvailability;
  imageUrl?: string;
  sizes?: string[];
  isPackageIncluded?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
//  DOMAIN — APPOINTMENTS
// ─────────────────────────────────────────────────────────────────────────────

export type AppointmentStatus =
  | "confirmed"
  | "pending"
  | "cancelled"
  | "completed";

export interface Appointment {
  id: string;
  userId: string;
  registrationId: string;
  date: string;
  time: string;
  location: string;
  sessionNumber: number;
  totalSessions: number;
  status: AppointmentStatus;
  notes?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
//  CONTENT — MARKETING / CMS
// ─────────────────────────────────────────────────────────────────────────────

export interface HeroContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  description: string;
  badges: Array<{ icon: string; label: string }>;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface MissionVisionContent {
  mission: {
    title: string;
    body: string;
  };
  vision: {
    title: string;
    body: string;
  };
}

export interface CoachProfile {
  name: string;
  role: string;
  bio: string[];
  credentials: string[];
  expertise: string[];
  photoUrl?: string;
}

export interface ProgramCard {
  id: TrainingProgram;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  features: string[];
  href: string;
}

export interface OptionCard {
  id: TrainingOption;
  title: string;
  badge: string;
  icon: string;
  price: number;
  priceSub: string;
  features: string[];
  cta: { label: string; href: string };
  variant: "primary" | "secondary" | "accent";
}

// ─────────────────────────────────────────────────────────────────────────────
//  FORM TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignupStep1Values {
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
}

export interface SignupStep2Values {
  surname: string;
  firstName: string;
  middleName: string;
  gender: ParticipantInfo["gender"] | "";
  dateOfBirth: string;
  address: string;
  mobileNumber: string;
  photo: File | null;
}

export interface SignupStep3Values {
  accountHolderType: AccountHolderType | "";
}

export interface SignupStep4Values {
  fullName: string;
  relationship: GuardianRelationship | "";
  relationshipOther: string;
  occupation: string;
  contactNumber: string;
  email: string;
  documents: File | null;
}

export interface ContactFormValues {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  hearAboutUs: string;
}

// ─────────────────────────────────────────────────────────────────────────────
//  API / RESPONSE TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENT PROP TYPES (shared across UI layer)
// ─────────────────────────────────────────────────────────────────────────────

/** Props accepted by any page-level component */
export interface PageProps {
  params: Record<string, string>;
  searchParams: Record<string, string | string[] | undefined>;
}

/** Standard children prop */
export interface WithChildren {
  children: React.ReactNode;
}

/** Standard className override prop */
export interface WithClassName {
  className?: string;
}
