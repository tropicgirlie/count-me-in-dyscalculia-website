import { useState, type ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  ExternalLink,
  ArrowLeft,
  Timer,
  Calculator,
  ClipboardList,
  UtensilsCrossed,
  Headphones,
  Star,
  Info,
  ShoppingCart,
  Filter,
} from "lucide-react";
import { Link } from "react-router";
import { getStoreProducts, type StoreProduct } from "../lib/data-store";
import { usePageMeta } from "../lib/usePageMeta";

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
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Affiliate disclaimer banner */}
        <div className="bg-amber-50/80 border-b border-amber-200/40">
          <div className="container-custom py-2.5 flex items-center justify-center gap-2 text-[11px] text-amber-700">
            <Info className="h-3.5 w-3.5 flex-shrink-0" />
            <span><strong>Affiliate disclaimer:</strong> This page contains Amazon affiliate links. Purchases support Count Me In at no extra cost to you.</span>
          </div>
        </div>

        {/* Hero */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh" />
          <div className="container-custom relative z-10">
            {/* Back */}
            <div className="mb-8">
              <Link
                to="/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
                style={{ fontWeight: 500 }}
              >
                <ArrowLeft className="h-3.5 w-3.5 mr-1.5 group-hover:-translate-x-0.5 transition-transform" />
                Back to home
              </Link>
            </div>

            <div className="text-center space-y-5 mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/[0.08] border border-primary/15">
                <ShoppingCart className="h-3.5 w-3.5 text-primary" />
                <span className="text-[13px] text-primary" style={{ fontWeight: 500 }}>Helpful Gadgets</span>
              </div>

              <h1 className="text-[2.5rem] lg:text-[3.25rem] leading-[1.05] tracking-tight">
                Dyscalculia-Friendly Tools & Gadgets
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Curated tools that make everyday number tasks easier. Each product is chosen for how
                it reduces cognitive load around numbers, time, and measurement.
              </p>
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] transition-all duration-300
                    ${
                      activeCategory === cat.id
                        ? "bg-primary text-white shadow-sm"
                        : "bg-card border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/20"
                    }
                  `}
                  style={{ fontWeight: 500 }}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Product count */}
            <p className="text-center text-sm text-muted-foreground mb-8">
              Showing {filtered.length} {filtered.length === 1 ? "product" : "products"}
              {activeCategory !== "all" &&
                ` in ${categories.find((c) => c.id === activeCategory)?.label}`}
            </p>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((product) => (
                <article
                  key={product.id}
                  className="bg-card rounded-2xl border border-border/40 hover:border-primary/20 overflow-hidden transition-all duration-300 hover:shadow-custom hover:-translate-y-1 flex flex-col group"
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

                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Why it helps callout */}
                    <div className="mt-4 bg-primary/5 rounded-lg p-3 border border-primary/10">
                      <p className="text-xs text-primary mb-1" style={{ fontWeight: 600 }}>
                        Why it helps with dyscalculia
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
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
                        <Button className="w-full bg-[#FF9900] hover:bg-[#e88b00] text-white rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                          View on Amazon
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Suggestion CTA */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center p-10 lg:p-14 rounded-3xl bg-gradient-to-br from-primary/[0.06] via-background to-accent/[0.04] border border-primary/10">
              <h2 className="text-2xl lg:text-3xl tracking-tight mb-3">Know a Great Tool We're Missing?</h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
                We're always looking for tools that genuinely help with dyscalculia and
                neurodivergent-friendly daily life. If you use something that makes numbers easier,
                we'd love to hear about it.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/#accommodations">
                  <Button className="btn-primary px-7 py-3">
                    View Accommodations
                  </Button>
                </Link>
                <Link to="/free-resources">
                  <Button variant="outline" className="btn-secondary px-7 py-3">
                    Free Resources
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center gap-4 mt-8">
                {["Hand-picked tools", "Evidence-informed", "Regularly updated"].map(label => (
                  <span key={label} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background">
        <div className="container-custom py-8 text-center space-y-2">
          <p className="text-xs text-background/30">
            © {new Date().getFullYear()} Count Me In · Information and support for dyscalculia awareness
          </p>
          <p className="text-xs text-background/30">
            made by{" "}
            <a
              href="https://luana.systems"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/70 hover:text-primary transition-colors"
            >
              luana.systems
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}