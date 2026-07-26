import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  MdOutlineOpenInNew as ExternalLink,
  MdOutlineTimer as Timer,
  MdOutlineCalculate as Calculator,
  MdOutlineAssignment as ClipboardList,
  MdOutlineRestaurant as UtensilsCrossed,
  MdOutlineHeadphones as Headphones,
  MdOutlineStar as Star,
  MdOutlineInfo as Info,
  MdOutlineShoppingCart as ShoppingCart,
} from "react-icons/md";
import { Link } from "react-router";
import { getStoreProducts } from "../lib/data-store";
import { usePageMeta } from "../lib/usePageMeta";

const ease = [0.16, 1, 0.3, 1] as const;

type Category =
  | "all"
  | "timers"
  | "math"
  | "organization"
  | "kitchen"
  | "focus";

const categories: { id: Category; label: string; icon: ReactNode }[] = [
  { id: "all", label: "All Tools", icon: <ShoppingCart className="h-4 w-4" /> },
  { id: "timers", label: "Timers & Clocks", icon: <Timer className="h-4 w-4" /> },
  { id: "math", label: "Math Tools", icon: <Calculator className="h-4 w-4" /> },
  { id: "organization", label: "Organization", icon: <ClipboardList className="h-4 w-4" /> },
  { id: "kitchen", label: "Kitchen & Measurement", icon: <UtensilsCrossed className="h-4 w-4" /> },
  { id: "focus", label: "Focus & Sensory", icon: <Headphones className="h-4 w-4" /> },
];

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.3;
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < full
              ? "fill-yellow-400 text-yellow-400"
              : i === full && hasHalf
              ? "fill-yellow-400/50 text-yellow-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">{rating}</span>
    </div>
  );
}

export function StorePage() {
  usePageMeta({
    title: "Dyscalculia-Friendly Tools & Gadgets. Store | Count Me In",
    description: "Curated tools and gadgets that make everyday number tasks easier for people with dyscalculia. Visual timers, math aids, and organisational tools.",
  });

  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const products = getStoreProducts();

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-background">
      {/* Affiliate disclaimer banner */}
      <div className="bg-amber-50/80 border-b border-amber-200/40">
        <div className="container-custom py-2.5 flex items-center justify-center gap-2 text-[11px] text-amber-700">
          <Info className="h-3.5 w-3.5 flex-shrink-0" />
          <span><strong>Affiliate disclaimer:</strong> This page contains Amazon affiliate links. Purchases support Count Me In at no extra cost to you.</span>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-36 pb-16 relative overflow-hidden bg-paper">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(0,150,136,0.10), transparent)",
          }}
        />
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="text-center space-y-5 mb-12"
          >
            <span className="tape-label">
              <ShoppingCart className="h-3.5 w-3.5" />
              Helpful Gadgets
            </span>

            <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] tracking-tight text-ink">
              Tools that make{" "}
              <em className="text-primary not-italic italic">numbers kinder</em>
            </h1>

            <p className="text-xl text-ink-soft max-w-3xl mx-auto leading-relaxed">
              Curated gadgets that make everyday number tasks easier. Each product is chosen
              for how it reduces cognitive load around numbers, time, and measurement.
            </p>
          </motion.div>

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] transition-all duration-300
                  ${
                    activeCategory === cat.id
                      ? "bg-ink text-white"
                      : "bg-card border border-border/40 text-ink-muted hover:text-ink hover:border-ink/20"
                  }
                `}
                style={{ fontWeight: 500 }}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Product count */}
          <p className="text-center text-sm text-ink-muted">
            Showing {filtered.length} {filtered.length === 1 ? "product" : "products"}
            {activeCategory !== "all" &&
              ` in ${categories.find((c) => c.id === activeCategory)?.label}`}
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((product, i) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease }}
                className="paper-card rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-custom hover:-translate-y-1 flex flex-col group"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 bg-accent text-white shadow-md">
                      {product.badge}
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg" style={{ fontWeight: 600 }}>
                      {product.name}
                    </h3>
                    <span
                      className="text-primary whitespace-nowrap"
                      style={{ fontWeight: 600 }}
                    >
                      {product.price}
                    </span>
                  </div>

                  <StarRating rating={product.rating} />

                  <p className="text-sm text-ink-muted mt-3 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Why it helps callout */}
                  <div className="mt-4 paper-surface rounded-xl p-3">
                    <p className="text-xs text-primary mb-1" style={{ fontWeight: 600 }}>
                      Why it helps with dyscalculia
                    </p>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      {product.whyItHelps}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto pt-5">
                    <a
                      href={product.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                    >
                      <Button className="w-full bg-[#FF9900] hover:bg-[#e88b00] text-white rounded-full transition-all duration-200 hover:-translate-y-0.5">
                        View on Amazon
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Suggestion CTA */}
      <section className="py-20 bg-paper/35">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="text-center p-10 lg:p-14 rounded-3xl paper-surface"
          >
            <h2 className="font-display text-2xl lg:text-3xl tracking-tight text-ink mb-3">
              Know a great tool we're missing?
            </h2>
            <p className="text-ink-soft mb-8 max-w-lg mx-auto leading-relaxed">
              We're always looking for tools that genuinely help with dyscalculia and
              neurodivergent-friendly daily life. If you use something that makes numbers easier,
              we'd love to hear about it.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/#accommodations">
                <Button className="bg-ink hover:bg-ink-soft text-white rounded-full h-12 px-7">
                  View Accommodations
                </Button>
              </Link>
              <Link to="/free-resources">
                <Button variant="outline" className="rounded-full h-12 px-7">
                  Free Resources
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              {["Hand-picked tools", "Evidence-informed", "Regularly updated"].map(label => (
                <span key={label} className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
