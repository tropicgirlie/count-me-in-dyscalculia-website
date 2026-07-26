import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import {
  MdOutlineSmartphone as Smartphone,
  MdOutlinePsychology as Brain,
  MdOutlineOpenInNew as ExternalLink,
  MdOutlineStar as Star,
  MdOutlineSearch as Search,
  MdOutlineHandyman as Wrench,
  MdArrowForward as ArrowRight,
  MdOutlineCheckCircle as CheckCircle,
} from "react-icons/md";
import { usePageMeta } from "../lib/usePageMeta";

const ease = [0.16, 1, 0.3, 1] as const;

interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  platform: string;
  price: string;
  rating: number;
  link: string;
  bestFor: string;
}

const tools: Tool[] = [
  {
    id: "soulver",
    name: "Soulver",
    category: "Calculators",
    description: "A 'notepad calculator' that lets you write calculations in natural language. Perfect for those who struggle with traditional calculator interfaces.",
    features: ["Natural language input", "Live calculations", "Unit conversions", "Spreadsheet-like functionality"],
    platform: "macOS, iOS",
    price: "$",
    rating: 5,
    link: "https://soulver.app",
    bestFor: "Everyday calculations without the calculator interface",
  },
  {
    id: "time-timer",
    name: "Time Timer",
    category: "Time Management",
    description: "Visual timer that shows time as a disappearing red disk. Eliminates the need to read clock faces or do time math.",
    features: ["Visual time representation", "No numbers required", "Multiple duration options", "App and physical versions"],
    platform: "iOS, Android, Physical",
    price: "Free - $$",
    rating: 5,
    link: "https://timetimer.com",
    bestFor: "Time blindness and avoiding clock reading",
  },
  {
    id: "ynab",
    name: "YNAB (You Need A Budget)",
    category: "Money & Budgeting",
    description: "Budgeting app with a philosophy of 'giving every dollar a job.' Color-coded categories make spending visible without complex math.",
    features: ["Color-coded categories", "Goal tracking", "Bank syncing", "Educational resources"],
    platform: "Web, iOS, Android",
    price: "$$$",
    rating: 4,
    link: "https://ynab.com",
    bestFor: "Managing money without mental arithmetic",
  },
  {
    id: "voice-dream-calculator",
    name: "Voice Dream Calculator",
    category: "Calculators",
    description: "Calculator that speaks numbers and operations aloud. Reduces transcription errors and provides audio feedback.",
    features: ["Voice input and output", "Large buttons", "History log", "Customizable speech"],
    platform: "iOS",
    price: "Free",
    rating: 4,
    link: "https://apps.apple.com/us/app/voice-dream-calculator/id936986627",
    bestFor: "Those who transpose numbers frequently",
  },
  {
    id: "kitchen-stories",
    name: "Kitchen Stories",
    category: "Cooking",
    description: "Recipe app with step-by-step photo instructions and built-in timers. Reduces need for measurement conversions.",
    features: ["Visual step-by-step guides", "Built-in timers", "Measurement scaling", "Shopping lists"],
    platform: "iOS, Android",
    price: "Free",
    rating: 4,
    link: "https://kitchenstories.com",
    bestFor: "Cooking without measuring confusion",
  },
  {
    id: "google-maps-live",
    name: "Google Maps Live View",
    category: "Navigation",
    description: "AR navigation that overlays directions on your camera view. Eliminates the need to interpret maps or cardinal directions.",
    features: ["AR arrow overlays", "Walking directions", "Landmark-based navigation", "No compass needed"],
    platform: "iOS, Android",
    price: "Free",
    rating: 5,
    link: "https://maps.google.com",
    bestFor: "Spatial navigation difficulties",
  },
  {
    id: "otter-ai",
    name: "Otter.ai",
    category: "Productivity",
    description: "AI meeting assistant that transcribes conversations. Great for capturing instructions with numbers without writing them down.",
    features: ["Live transcription", "Searchable notes", "Highlight important points", "Share transcripts"],
    platform: "Web, iOS, Android",
    price: "Free - $$",
    rating: 4,
    link: "https://otter.ai",
    bestFor: "Capturing verbal instructions with numbers",
  },
  {
    id: "dyscalculia-org",
    name: "Dyscalculia.org Screening Tools",
    category: "Assessment",
    description: "Free online screening tools and resources from a leading dyscalculia advocacy organization.",
    features: ["Free screening tests", "Educational resources", "Advocacy information", "Research updates"],
    platform: "Web",
    price: "Free",
    rating: 4,
    link: "https://dyscalculia.org",
    bestFor: "Initial screening and learning about dyscalculia",
  },
];

const categories = ["All", "Calculators", "Time Management", "Money & Budgeting", "Cooking", "Navigation", "Productivity", "Assessment"];

const priceLabels: Record<string, string> = {
  "Free": "Free",
  "$": "Paid",
  "$$": "Mid-range",
  "$$$": "Premium",
};

export function ToolsAppsPage() {
  usePageMeta({
    title: "Best Apps & Tools for Dyscalculia | Assistive Technology 2025",
    description: "Curated assistive technology for dyscalculia: calculators, time management apps, budgeting tools, and more. Practical solutions for number difficulties.",
  });

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = tools.filter((tool) => {
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.bestFor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Hero */}
      <section className="pt-36 pb-16 relative overflow-hidden bg-paper">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_70%_15%,rgba(0,150,136,0.07),transparent_65%)]" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="text-center space-y-6 max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full tape-label">
              <Wrench className="h-3.5 w-3.5 text-ink" />
              <span className="text-[13px] text-ink" style={{ fontWeight: 500 }}>Assistive Technology</span>
            </div>

            <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.03] tracking-tight text-ink" style={{ fontWeight: 520 }}>
              Tools that <span className="italic" style={{ fontWeight: 420 }}>help</span>
            </h1>

            <p className="text-lg text-ink-muted leading-relaxed">
              Practical apps and assistive technology designed for brains that process numbers differently.
              From calculators that speak aloud to timers you can see, not read.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-ink/12 rounded-full text-sm text-ink shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-3 border-b border-ink/8 sticky top-20 z-40 bg-background/85 backdrop-blur-md">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-ink text-white shadow-md"
                    : "bg-white border border-ink/10 text-ink-muted hover:text-ink hover:border-ink/30"
                }`}
                style={{ fontWeight: 500 }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 pb-20">
        <div className="container-custom">
          <p className="text-center text-ink-muted text-sm mb-8 tabular-nums">
            {filtered.length} {filtered.length === 1 ? "tool" : "tools"} found
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-ink-muted mb-4">No tools match your search.</p>
              <Button
                variant="outline"
                className="border-ink/20 text-ink hover:bg-ink/5 rounded-full"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <motion.div layout className="grid md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((tool) => (
                  <motion.div
                    layout
                    key={tool.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, ease }}
                    className="paper-card rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-custom group"
                  >
                    <div className="p-7">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2.5">
                            <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs" style={{ fontWeight: 600 }}>
                              {tool.category}
                            </span>
                            <span className="text-xs text-ink-muted">{priceLabels[tool.price]}</span>
                          </div>
                          <h3 className="font-display text-xl lg:text-2xl text-ink group-hover:text-primary transition-colors" style={{ fontWeight: 520 }}>
                            {tool.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500 shrink-0">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm tabular-nums" style={{ fontWeight: 600 }}>{tool.rating}</span>
                        </div>
                      </div>

                      <p className="text-ink-muted leading-relaxed mb-4">{tool.description}</p>

                      <div className="paper-surface rounded-xl p-4 mb-4">
                        <p className="text-sm text-primary mb-1" style={{ fontWeight: 600 }}>Best for</p>
                        <p className="text-sm text-ink-muted">{tool.bestFor}</p>
                      </div>

                      <div className="space-y-2 mb-5">
                        {tool.features.slice(0, 3).map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-ink-muted">
                            <CheckCircle className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-ink/8">
                        <span className="text-xs text-ink-muted">{tool.platform}</span>
                        <a
                          href={tool.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                          style={{ fontWeight: 500 }}
                        >
                          Visit Website
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-paper/35">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
            className="text-center p-12 lg:p-16 rounded-3xl paper-surface"
          >
            <h2 className="font-display text-3xl lg:text-4xl text-ink tracking-tight mb-4" style={{ fontWeight: 520 }}>Have a tool to recommend?</h2>
            <p className="text-ink-muted mb-8 max-w-lg mx-auto text-lg leading-relaxed">
              We're always looking for new assistive technology that helps adults with dyscalculia.
              If you've found something that works, let us know.
            </p>
            <a href="mailto:info@momops.org">
              <Button className="bg-ink hover:bg-ink-soft text-white px-8 h-12 rounded-full shadow-lg group">
                Submit a Recommendation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="font-display text-2xl lg:text-3xl text-ink mb-8 text-center" style={{ fontWeight: 520 }}>Related resources</h2>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { to: "/self-check", icon: Brain, color: "text-primary", title: "Self-Check Quiz", desc: "Wondering if you might have dyscalculia?" },
              { to: "/get-assessed", icon: CheckCircle, color: "text-accent", title: "Get Assessed", desc: "Find professionals who diagnose dyscalculia" },
              { to: "/blog", icon: Smartphone, color: "text-blue-600", title: "App Reviews", desc: "Detailed reviews on our blog" },
            ].map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              >
                <Link to={item.to}>
                  <div className="group p-6 rounded-2xl paper-card transition-all duration-300 hover:shadow-custom hover:-translate-y-1 text-center h-full">
                    <item.icon className={`h-8 w-8 ${item.color} mx-auto mb-3`} />
                    <h3 className="font-sans text-[15px] text-ink mb-1" style={{ fontWeight: 600 }}>{item.title}</h3>
                    <p className="text-sm text-ink-muted">{item.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
