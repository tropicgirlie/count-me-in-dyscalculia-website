import { useState } from "react";
import { Link } from "react-router";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Calculator,
  Clock,
  Smartphone,
  Wallet,
  ChefHat,
  MapPin,
  Brain,
  ExternalLink,
  Star,
  Search,
  Wrench,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { usePageMeta } from "../lib/usePageMeta";

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
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="container-custom relative z-10">
          <div className="text-center space-y-5 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/[0.08] border border-primary/15">
              <Wrench className="h-3.5 w-3.5 text-primary" />
              <span className="text-[13px] text-primary" style={{ fontWeight: 500 }}>Assistive Technology</span>
            </div>

            <h1 className="text-[2.5rem] lg:text-[3.25rem] leading-[1.05] tracking-tight">
              <span className="text-gradient">Tools That Help</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Practical apps and assistive technology designed for brains that process numbers differently. 
              From calculators that speak aloud to timers you can see, not read.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-card border border-border/60 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 border-b border-border/30 sticky top-[72px] z-40 bg-background/95 backdrop-blur-sm">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-lg"
                    : "bg-card border text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
                style={{ fontWeight: 500 }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-6">
        <div className="container-custom">
          <p className="text-center text-muted-foreground text-sm">
            {filtered.length} {filtered.length === 1 ? "tool" : "tools"} found
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-8 pb-20">
        <div className="container-custom">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">No tools match your search.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filtered.map((tool) => (
                <Card
                  key={tool.id}
                  className="shadow-custom hover:shadow-hover transition-all duration-300 overflow-hidden group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-primary border-primary/30 text-xs">
                            {tool.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{priceLabels[tool.price]}</span>
                        </div>
                        <h3 className="text-xl group-hover:text-primary transition-colors">
                          {tool.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm" style={{ fontWeight: 600 }}>{tool.rating}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {tool.description}
                    </p>

                    <div className="bg-primary/[0.04] rounded-xl p-4 mb-4">
                      <p className="text-sm text-primary mb-1" style={{ fontWeight: 600 }}>
                        Best for
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {tool.bestFor}
                      </p>
                    </div>

                    <div className="space-y-2 mb-4">
                      {tool.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                      <span className="text-xs text-muted-foreground">
                        {tool.platform}
                      </span>
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
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30 border-y border-border/30">
        <div className="container-custom">
          <div className="text-center p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-primary/[0.06] via-background to-accent/[0.04] border border-primary/10">
            <h2 className="text-3xl tracking-tight mb-4">Have a Tool to Recommend?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-lg leading-relaxed">
              We're always looking for new assistive technology that helps adults with dyscalculia. 
              If you've found something that works, let us know.
            </p>
            <a href="mailto:info@momops.org">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full shadow-lg">
                Submit a Recommendation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-2xl mb-8 text-center">Related Resources</h2>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Link to="/self-check">
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-transparent hover:border-border/50 transition-all duration-300 hover:shadow-custom text-center">
                <Brain className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="text-[15px] mb-1" style={{ fontWeight: 600 }}>Self-Check Quiz</h3>
                <p className="text-sm text-muted-foreground">Wondering if you might have dyscalculia?</p>
              </div>
            </Link>
            <Link to="/get-assessed">
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-transparent hover:border-border/50 transition-all duration-300 hover:shadow-custom text-center">
                <CheckCircle className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="text-[15px] mb-1" style={{ fontWeight: 600 }}>Get Assessed</h3>
                <p className="text-sm text-muted-foreground">Find professionals who diagnose dyscalculia</p>
              </div>
            </Link>
            <Link to="/blog">
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-transparent hover:border-border/50 transition-all duration-300 hover:shadow-custom text-center">
                <Smartphone className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="text-[15px] mb-1" style={{ fontWeight: 600 }}>App Reviews</h3>
                <p className="text-sm text-muted-foreground">Detailed reviews on our blog</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
