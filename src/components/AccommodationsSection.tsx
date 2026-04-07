import { useState, useRef } from "react";
import { Button } from "./ui/button";
import {
  Briefcase, GraduationCap, Home, Clock, DollarSign, MapPin,
  ChevronDown, ChevronUp, CheckCircle, Smartphone, Lightbulb, Sparkles
} from "lucide-react";

function useInView(_threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  return { ref, isVisible: true };
}

const categories = [
  {
    id: "work",
    icon: Briefcase,
    title: "Workplace",
    color: "text-blue-600 bg-blue-50",
    strategies: [
      {
        title: "Request written instructions",
        description: "Ask for tasks and deadlines in writing rather than verbal-only. Use email confirmations for numerical information like budgets, dates, or quantities.",
        tools: ["Email templates", "Task management apps", "Notion/Trello boards"],
      },
      {
        title: "Use visual scheduling tools",
        description: "Replace traditional calendars with colour-coded, block-based visual planners. Visual timers help break down the workday into manageable chunks.",
        tools: ["Google Calendar colour coding", "Toggl Track", "Visual Timer app"],
      },
      {
        title: "Advocate for accommodations",
        description: "Under equality legislation (UK Equality Act 2010, ADA in US, Employment Equality Acts in Ireland), you may be entitled to reasonable adjustments.",
        tools: ["HR accommodation request letter", "Occupational health referral"],
      },
      {
        title: "Simplify financial tasks",
        description: "Use spreadsheet templates with built-in formulas for expense reports. Request a buddy system for invoice processing or budget reviews.",
        tools: ["Pre-built Excel/Sheets templates", "Expensify", "Calculator apps"],
      },
    ],
  },
  {
    id: "education",
    icon: GraduationCap,
    title: "Education & Study",
    color: "text-emerald-600 bg-emerald-50",
    strategies: [
      {
        title: "Multi-sensory learning",
        description: "Combine visual, auditory, and kinesthetic approaches. Use physical manipulatives, colour-coded notes, and verbal explanations together.",
        tools: ["Cuisenaire rods", "Number lines", "Colour-coded worksheets"],
      },
      {
        title: "Extra time and alternative assessments",
        description: "Apply for formal accommodations through your institution's disability services including extra exam time and alternative assessment formats.",
        tools: ["Disability services office", "Formal assessment documentation"],
      },
      {
        title: "Break problems into micro-steps",
        description: "Decompose complex calculations into tiny sequential steps. Write each step down rather than trying to hold numbers in working memory.",
        tools: ["Step-by-step worksheets", "Graph paper", "ModMath app"],
      },
    ],
  },
  {
    id: "daily",
    icon: Home,
    title: "Daily Life",
    color: "text-purple-600 bg-purple-50",
    strategies: [
      {
        title: "Cooking with visual measurements",
        description: "Use colour-coded measuring cups and spoons. Convert recipes to visual formats with pictures instead of numbers where possible.",
        tools: ["Colour-coded measuring sets", "Visual recipe apps", "Kitchen scale"],
      },
      {
        title: "Bill splitting and money management",
        description: "Use apps that automate splitting and budgeting. Set up automatic payments to avoid calculation errors with due dates and amounts.",
        tools: ["Splitwise", "YNAB", "Automatic bank transfers"],
      },
      {
        title: "Navigation without numbers",
        description: "Use landmark-based directions rather than street numbers. Save frequently visited places in your maps app with custom names.",
        tools: ["Google Maps saved places", "What3Words", "Screenshot directions"],
      },
    ],
  },
  {
    id: "time",
    icon: Clock,
    title: "Time Management",
    color: "text-orange-600 bg-orange-50",
    strategies: [
      {
        title: "Visual timers over digital clocks",
        description: "Analogue visual timers that show time as a shrinking coloured segment are more intuitive than digital countdowns.",
        tools: ["Time Timer", "Sand timers", "Visual Timer app"],
      },
      {
        title: "Buffer time between activities",
        description: "Build in 15-minute buffers between commitments. Time-blindness means transitions always take longer than expected.",
        tools: ["Calendar blocking", "Alarm chains", "Transition reminders"],
      },
      {
        title: "Anchor routines to events, not times",
        description: "Instead of 'at 2pm', think 'after lunch'. Tying activities to sensory/event anchors reduces reliance on number-based scheduling.",
        tools: ["Routine charts", "Visual schedules", "Habit stacking"],
      },
    ],
  },
  {
    id: "money",
    icon: DollarSign,
    title: "Financial Strategies",
    color: "text-teal-600 bg-teal-50",
    strategies: [
      {
        title: "Automate everything possible",
        description: "Set up automatic bill payments, savings transfers, and investment contributions. Remove the need to manually process numbers.",
        tools: ["Bank auto-pay", "Round-up savings apps", "Direct debits"],
      },
      {
        title: "Visual budgeting systems",
        description: "Use envelope budgeting (physical or digital) where you can see money allocated visually rather than as abstract numbers.",
        tools: ["YNAB", "Goodbudget", "Physical cash envelopes"],
      },
      {
        title: "Simplify mental maths at shops",
        description: "Round prices to the nearest whole number. Use contactless payments to avoid counting change. Keep a calculator app one tap away.",
        tools: ["Phone calculator widget", "Contactless card", "Rounding strategies"],
      },
    ],
  },
  {
    id: "navigation",
    icon: MapPin,
    title: "Spatial Navigation",
    color: "text-pink-600 bg-pink-50",
    strategies: [
      {
        title: "Landmark-based wayfinding",
        description: "Create personal maps using landmarks, colours, and images instead of street numbers and distances.",
        tools: ["Photo route maps", "Google Maps Street View", "Voice-guided GPS"],
      },
      {
        title: "Practice routes in advance",
        description: "Use Google Street View to virtually walk a new route before travelling. This builds spatial memory without number-based directions.",
        tools: ["Google Street View", "Route planning apps", "Written landmark notes"],
      },
    ],
  },
];

export function AccommodationsSection() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("work");
  const headerAnim = useInView();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div
          ref={headerAnim.ref}
          className={`text-center mb-14 transition-all duration-700 ${headerAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/[0.08] border border-primary/15 mb-5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-[13px] text-primary" style={{ fontWeight: 500 }}>Practical Support</span>
          </div>
          <h2 className="text-3xl lg:text-4xl tracking-tight mb-5">Accommodations & Strategies</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Real-world strategies for managing dyscalculia across every area of life.
          </p>
        </div>

        {/* Pro tip */}
        <div className="mb-12 p-5 rounded-2xl bg-primary/[0.04] border border-primary/10 flex items-start gap-4 max-w-4xl mx-auto">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm mb-0.5" style={{ fontWeight: 600 }}>You don't need a formal diagnosis to start.</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Many of these strategies benefit anyone who finds numbers challenging. Start small, experiment, and keep what works.
            </p>
          </div>
        </div>

        {/* Category layout */}
        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar */}
          <div className="space-y-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all duration-300 group
                  ${expandedCategory === cat.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-card border border-border/40 hover:border-border/60 hover:shadow-custom'
                  }`}
              >
                <div className={`p-2 rounded-lg transition-colors ${
                  expandedCategory === cat.id ? 'bg-white/20' : cat.color
                }`}>
                  <cat.icon className={`h-4 w-4 ${expandedCategory === cat.id ? 'text-white' : ''}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm" style={{ fontWeight: 600 }}>{cat.title}</div>
                  <div className={`text-[11px] ${expandedCategory === cat.id ? 'text-white/60' : 'text-muted-foreground/60'}`}>
                    {cat.strategies.length} strategies
                  </div>
                </div>
                {expandedCategory === cat.id
                  ? <ChevronUp className="h-4 w-4 flex-shrink-0" />
                  : <ChevronDown className="h-4 w-4 text-muted-foreground/40 flex-shrink-0" />
                }
              </button>
            ))}
          </div>

          {/* Strategy cards */}
          <div>
            {expandedCategory ? (
              <div className="space-y-4 animate-fade-in">
                {categories
                  .find(c => c.id === expandedCategory)
                  ?.strategies.map((strategy, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-card border border-border/40 hover:border-border/60 transition-all duration-300 hover:shadow-custom">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="space-y-3 flex-1">
                          <div>
                            <h4 className="text-[15px] mb-1" style={{ fontWeight: 600 }}>{strategy.title}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {strategy.description}
                            </p>
                          </div>

                          {strategy.tools.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5">
                              <Smartphone className="h-3.5 w-3.5 text-muted-foreground/40 mr-0.5" />
                              {strategy.tools.map((tool, tIdx) => (
                                <span key={tIdx} className="text-[11px] text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full border border-border/30">
                                  {tool}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground rounded-2xl border border-dashed border-border/40">
                <p className="text-sm">Select a category to view strategies</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 p-10 rounded-3xl bg-gradient-to-br from-primary/[0.06] to-accent/[0.04] border border-primary/10">
          <h3 className="text-xl mb-3" style={{ fontWeight: 600 }}>Want the complete accommodation toolkit?</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            "Numbers Out of Place" includes printable templates, workplace accommodation letter drafts,
            and visual planning systems designed specifically for dyscalculic brains.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/ebook">
              <Button className="btn-primary">Learn about the ebook</Button>
            </a>
            <a href="/free-resources">
              <Button variant="outline" className="btn-secondary">Browse free resources</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}