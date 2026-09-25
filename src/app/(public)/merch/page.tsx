"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

// ─── Types & data ─────────────────────────────────────────────────────────────

type Category   = "all" | "uniform" | "apparel" | "accessories";
type Avail      = "available" | "limited" | "sold-out" | "included-in-package";

interface Product {
  id:       string;
  name:     string;
  desc:     string;
  price:    number | null;   // null = package-included
  priceFmt: string;
  category: Category;
  avail:    Avail;
  icon:     string;
  bg:       string;
}

const PRODUCTS: Product[] = [
  { id:"p1", name:"Premium Taekwondo Dobok", desc:"Official OSA training uniform. High-quality fabric, comfortable fit. Included FREE with premium training packages.", price:null, priceFmt:"Included in Package", category:"uniform", avail:"included-in-package", icon:"🥋", bg:"from-green to-navy-light" },
  { id:"p2", name:"OSA Sparring Headgear",   desc:"WTF-approved Taekwondo headgear. Durable, lightweight with adjustable strap for secure fit.", price:2200, priceFmt:"₱2,200", category:"uniform", avail:"available", icon:"🏅", bg:"from-navy to-navy-light" },
  { id:"p3", name:"Foot & Hand Protectors",  desc:"Official Taekwondo protectors for sparring. Kukkiwon-approved material. Available in S, M, L.", price:1800, priceFmt:"₱1,800", category:"uniform", avail:"limited", icon:"🧤", bg:"from-[#1a1814] to-navy-mid" },
  { id:"p4", name:"OSA Training Shirt",      desc:"Official OSA training shirt. Moisture-wicking fabric. Available in Navy and Green. Sizes XS–XL.", price:550, priceFmt:"₱550", category:"apparel", avail:"available", icon:"👕", bg:"from-green-mid to-navy" },
  { id:"p5", name:"OSA Academy Jacket",      desc:"Official OSA jacket with embroidered logo. Perfect for cool training days. Limited stock — order early!", price:1200, priceFmt:"₱1,200", category:"apparel", avail:"limited", icon:"🧥", bg:"from-navy-deep to-green-dark" },
  { id:"p6", name:"OSA Training Sweatpants", desc:"Comfortable training sweatpants with OSA logo. Elastic waistband, tapered fit. Available in S–XL.", price:750, priceFmt:"₱750", category:"apparel", avail:"available", icon:"👖", bg:"from-green-light to-navy-mid" },
  { id:"p7", name:"OSA Snapback Cap",        desc:"Official OSA snapback cap with embroidered academy logo. Adjustable strap, one size fits all.", price:380, priceFmt:"₱380", category:"accessories", avail:"available", icon:"🧢", bg:"from-[#6B4F00] to-navy" },
  { id:"p8", name:"OSA Drawstring Bag",      desc:"Lightweight OSA drawstring gym bag. Perfect for carrying your Dobok and accessories to training.", price:280, priceFmt:"₱280", category:"accessories", avail:"available", icon:"🎒", bg:"from-green to-green-dark" },
  { id:"p9", name:"OSA Logo Sticker Set",    desc:"Set of 5 official OSA stickers. Waterproof vinyl. Perfect for water bottles, helmets, and bags.", price:150, priceFmt:"₱150", category:"accessories", avail:"available", icon:"🏷️", bg:"from-navy-deep to-navy" },
];

const AVAIL_LABELS: Record<Avail, { text: string; className: string }> = {
  available:            { text: "In Stock",  className: "bg-green-mid text-white" },
  limited:              { text: "⚡ Limited", className: "bg-warning text-navy" },
  "sold-out":           { text: "Sold Out",  className: "bg-neutral-400 text-white" },
  "included-in-package":{ text: "⭐ Package", className: "bg-gold text-navy" },
};

const CATEGORY_TABS: { id: Category; label: string; count: number }[] = [
  { id:"all",         label:"All Products", count: PRODUCTS.length },
  { id:"uniform",     label:"Uniforms & Gear", count: PRODUCTS.filter(p=>p.category==="uniform").length },
  { id:"apparel",     label:"Apparel",         count: PRODUCTS.filter(p=>p.category==="apparel").length },
  { id:"accessories", label:"Accessories",     count: PRODUCTS.filter(p=>p.category==="accessories").length },
];

// ─── Product card ─────────────────────────────────────────────────────────────

function ProductCard({ product, onAddToCart }: {
  product: Product;
  onAddToCart: (name: string) => void;
}) {
  const avail    = AVAIL_LABELS[product.avail];
  const soldOut  = product.avail === "sold-out";

  return (
    <article
      className="bg-white border border-neutral-200 rounded-2xl overflow-hidden
                 shadow-card hover:shadow-card-md hover:-translate-y-1
                 transition-all duration-200 flex flex-col"
      aria-label={product.name}
    >
      {/* Image area */}
      <div className={cn("h-48 flex items-center justify-center relative bg-gradient-to-br", product.bg)}>
        <span className="text-6xl" aria-hidden="true">{product.icon}</span>
        <span className={cn("absolute top-2.5 left-2.5 text-[0.58rem] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-sm", avail.className)}>
          {avail.text}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-gold-dark text-[0.58rem] font-semibold tracking-[0.12em] uppercase mb-1">
          {product.category === "uniform" ? "Uniforms & Gear" : product.category === "apparel" ? "Apparel" : "Accessories"}
        </p>
        <h3 className="text-navy font-semibold text-sm mb-2 leading-snug">{product.name}</h3>
        <p className="text-neutral-500 text-xs leading-relaxed mb-4 flex-1">{product.desc}</p>

        <div className="flex items-center justify-between gap-2 border-t border-neutral-100 pt-4 mt-auto">
          <div>
            <p className="text-navy font-bold text-base">{product.priceFmt}</p>
            {product.price !== null && (
              <p className="text-neutral-400 text-[0.62rem]">Per unit</p>
            )}
          </div>
          <button
            type="button"
            disabled={soldOut}
            onClick={() => !soldOut && onAddToCart(product.name)}
            aria-label={soldOut ? `${product.name} — sold out` : `Enquire about ${product.name}`}
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center text-base",
              "transition-all duration-150",
              soldOut
                ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                : "bg-navy text-gold hover:bg-gold hover:text-navy cursor-pointer"
            )}
          >
            🛒
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MerchPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [toast, setToast]                   = useState<string | null>(null);

  const filtered = activeCategory === "all"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleAddToCart = (name: string) => {
    setToast(`"${name}" — contact us to order!`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <>
      {/* Page hero */}
      <section aria-label="Merch hero" className="page-hero text-center">
        <div className="container-page relative z-10">
          <span className="section-label">Official Store</span>
          <h1 className="text-white mt-2 mb-4">Oak Sports Academy Merch</h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Represent OSA with official academy merchandise. Quality gear for champions in and out of the dojang.
          </p>
          <nav aria-label="Breadcrumb"
            className="mt-6 flex items-center justify-center gap-2 text-sm text-white/45">
            <a href="/" className="hover:text-gold transition-colors">Home</a>
            <span>/</span>
            <span className="text-white/70">Merch</span>
          </nav>
        </div>
      </section>

      <section className="section bg-neutral-50">
        <div className="container-page">

          {/* Featured banner */}
          <div className="bg-gradient-hero rounded-2xl overflow-hidden p-8 mb-10
                          grid md:grid-cols-[1fr_auto] gap-6 items-center border border-gold/15">
            <div>
              <span className="section-label block mb-2">🎁 Included in Training Packages</span>
              <h2 className="text-white font-black leading-tight mb-3"
                style={{ fontSize: "clamp(1.4rem,2.5vw,1.9rem)" }}>
                Premium Taekwondo Dobok<br />Included in Select Packages
              </h2>
              <p className="text-white/65 text-sm mb-5 max-w-md">
                Enroll in a Premium Package (Group or One-on-One) and receive a Free Premium Taekwondo Uniform — a ₱1,500+ value at no extra cost!
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/training-programs" variant="primary" size="md">
                  View Training Packages
                </Button>
                <Button href="/signup" variant="gold-outline" size="md">
                  Enroll Now
                </Button>
              </div>
            </div>
            <span className="text-[6rem] hidden md:block" aria-hidden="true">🥋</span>
          </div>

          <div className="grid lg:grid-cols-[240px_1fr] gap-8 items-start">

            {/* ── Filter sidebar ── */}
            <aside className="space-y-4 lg:sticky lg:top-[calc(var(--navbar-height)+16px)]">
              {/* Categories */}
              <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-card">
                <div className="bg-navy px-5 py-4">
                  <h3 className="text-gold font-semibold text-[0.65rem] tracking-[0.18em] uppercase">Categories</h3>
                </div>
                <div className="p-3 space-y-1">
                  {CATEGORY_TABS.map(({ id, label, count }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActiveCategory(id)}
                      aria-pressed={activeCategory === id}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5",
                        "rounded-lg text-sm font-medium transition-all duration-150",
                        activeCategory === id
                          ? "bg-navy text-gold"
                          : "text-neutral-600 hover:bg-neutral-50 hover:text-navy"
                      )}
                    >
                      <span>{label}</span>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        activeCategory === id
                          ? "bg-gold/20 text-gold"
                          : "bg-neutral-100 text-neutral-400"
                      )}>
                        {count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Shop notice */}
              <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-card">
                <div className="bg-navy px-5 py-4">
                  <h3 className="text-gold font-semibold text-[0.65rem] tracking-[0.18em] uppercase">Shop Notice</h3>
                </div>
                <div className="p-5">
                  <p className="text-neutral-500 text-xs leading-relaxed mb-4">
                    To place an order, log in to your account or contact us directly for purchasing details.
                  </p>
                  <Button href="/login"   variant="primary"   size="sm" fullWidth>Log In to Order</Button>
                  <Button href="/contact" variant="secondary" size="sm" fullWidth className="mt-2.5">Contact Us</Button>
                </div>
              </div>

              {/* Info */}
              {[
                { icon:"📦", title:"Order Process",   body:"Orders processed in-person at the academy. Log in or contact us to enquire." },
                { icon:"💰", title:"Payment",          body:"Cash and GCash accepted. Payment collected at the academy upon pickup." },
                { icon:"🔄", title:"Exchange Policy",  body:"Unused items in original condition may be exchanged within 7 days with receipt." },
              ].map(({ icon, title, body }) => (
                <div key={title}
                  className="bg-white border border-neutral-200 rounded-xl p-4 shadow-card-sm">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-xl" aria-hidden="true">{icon}</span>
                    <h4 className="text-navy font-semibold text-sm">{title}</h4>
                  </div>
                  <p className="text-neutral-500 text-xs leading-relaxed">{body}</p>
                </div>
              ))}
            </aside>

            {/* ── Product grid ── */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <p className="text-neutral-400 text-sm">
                  Showing <strong className="text-navy">{filtered.length}</strong> products
                </p>
              </div>

              {filtered.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-neutral-400">
                  <span className="text-4xl block mb-3">🛍️</span>
                  <p>No products in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Toast */}
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "fixed bottom-8 right-8 z-[var(--z-toast)]",
          "flex items-center gap-3 px-5 py-3.5",
          "bg-navy border border-gold/40 rounded-xl shadow-modal text-white text-sm font-medium",
          "transition-all duration-300",
          toast ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        )}
      >
        <span aria-hidden="true">🛒</span>
        {toast}
      </div>
    </>
  );
}
