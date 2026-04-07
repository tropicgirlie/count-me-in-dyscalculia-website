import React from "react";
import { Button } from "./ui/button";
import { CheckCircle, BookOpen, Clock, ArrowLeft, Bell, PenLine, Sparkles } from "lucide-react";
import { Link } from "react-router";
import logo from "figma:asset/7df1fcf1a964339a60566b3dcb8f4a1327784680.png";
import bookCover from "figma:asset/a726afb90ad457b7241a0ddc6454faf3faf915cb.png";
import { usePageMeta, useJsonLd } from "../lib/usePageMeta";

export function EbookPage() {
  usePageMeta({
    title: "Numbers Out of Place: Dyscalculia Book for Adults | Count Me In",
    description: "A practical guide to dyscalculia and ADHD in adulthood. Personal stories, workplace strategies, and evidence-based tools. Coming July 2026.",
  });

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Numbers Out of Place",
    author: { "@type": "Person", name: "Luana Micheau" },
    description: "A deeply personal and practical guide for adults navigating dyscalculia and ADHD.",
    bookFormat: "EBook",
    datePublished: "2026-07",
    publisher: { "@type": "Organization", name: "Count Me In" },
  });

  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const features = [
    "Personal late diagnosis story and lived experience insights",
    "ADHD and dyscalculia intersection: managing the double bind",
    "Gender gap exploration: why women are often overlooked",
    "Time-blindness strategies for adult life and work",
    "Everyday number challenges: money, cooking, navigation",
    "Workplace accommodations and strengths-based approaches",
    "Practical tools, templates, and visual systems",
    "Resources for assessment and support across Ireland, UK, and US"
  ];

  const tableOfContents = [
    { part: "Part I", title: "Understanding Dyscalculia in Adulthood", chapters: [
      { title: "When the Numbers Never Added Up: my late diagnosis story" },
      { title: "Dyscalculia 101: not just 'bad at math'" },
      { title: "ADHD, time-blindness, and the double bind" },
      { title: "Why so many women go undiagnosed: the gender gap in neurodiversity" }
    ]},
    { part: "Part II", title: "Living with It, Not Against It", chapters: [
      { title: "Time doesn't tick the same: managing time-blindness as an adult" },
      { title: "Everyday numbers: money, cooking, travel, navigation" },
      { title: "The invisible tax: financial stress and dyscalculia" },
      { title: "Motherhood and mental load: raising kids when numbers don't stick" }
    ]},
    { part: "Part III", title: "Thriving in Work and Study", chapters: [
      { title: "Dyscalculia at work: strengths, struggles, and how to ask for accommodations" },
      { title: "Study and self-improvement hacks: from adult learning to professional growth" },
      { title: "Designing your own systems: checklists, icons, and words alongside numbers" }
    ]},
    { part: "Part IV", title: "Tools, Templates, and Real Stories", chapters: [
      { title: "Practical hacks: bill splitters, budgeting aids, visual timers" },
      { title: "Worksheets and templates: ADHD + dyscalculia-friendly planners" },
      { title: "Stories from late-diagnosed adults: relief, grief, and resilience" }
    ]},
    { part: "Part V", title: "Moving Forward", chapters: [
      { title: "Reframing intelligence: why numbers aren't the measure of worth" },
      { title: "Resources for adults in Ireland, UK, US (assessment + support)" },
      { title: "The future of neurodiversity: making workplaces and families numeracy-inclusive" }
    ]}
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="glass-effect sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto" style={{ padding: '0.875rem clamp(1.5rem, 4vw, 3rem)' }}>
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              style={{ fontWeight: 500 }}
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Count Me In
            </Link>
            <Link to="/" className="flex items-center space-x-2.5">
              <img 
                src={logo} 
                alt="Count Me In Logo" 
                className="w-8 h-8 rounded-lg"
              />
              <div className="flex flex-col">
                <span className="text-sm text-foreground" style={{ fontWeight: 600 }}>Count Me In</span>
                <span className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">Ebook</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="pt-16 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh" />
          <div className="absolute top-32 -right-32 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[80px] pointer-events-none" />

          <div className="container-custom relative z-10">
            {/* Hero Section */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
              <div className="space-y-7">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/[0.08] border border-primary/15">
                    <PenLine className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[13px] text-primary" style={{ fontWeight: 500 }}>Currently Writing</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/[0.08] border border-accent/15">
                    <Clock className="h-3.5 w-3.5 text-accent" />
                    <span className="text-[13px] text-accent" style={{ fontWeight: 500 }}>July 2026</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-muted-foreground text-lg" style={{ fontWeight: 500 }}>I am writing a book.</p>
                  <h1 className="text-[2.75rem] lg:text-[3.5rem] leading-[1.05] tracking-tight">
                    <span className="text-gradient">Numbers Out of Place</span>
                  </h1>
                  <p className="text-xl text-muted-foreground" style={{ fontWeight: 500 }}>
                    A guide to dyscalculia in adulthood
                  </p>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  A deeply personal and practical guide for adults navigating dyscalculia and ADHD.
                  From late diagnosis stories to everyday strategies. Everything I wish someone had told me.
                </p>

                <p className="text-sm text-muted-foreground/70 italic">
                  Having enough Concerta to finish this, probably launching July 2026.
                </p>
                
                <div className="flex items-center gap-5 text-sm text-muted-foreground">
                  {[
                    { icon: BookOpen, label: "~170 pages" },
                    { icon: Sparkles, label: "Evidence-based" },
                    { icon: Clock, label: "July 2026" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <Icon className="h-4 w-4 text-primary/60" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>

                {/* Notify Me Form */}
                <div className="pt-2">
                  {subscribed ? (
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/[0.06] border border-primary/15">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <p className="text-sm text-primary" style={{ fontWeight: 500 }}>
                        You're on the list! I'll let you know when it's ready.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleNotify} className="space-y-3">
                      <p className="text-sm text-muted-foreground" style={{ fontWeight: 500 }}>
                        Get notified when it launches:
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="flex-1 px-4 py-3 rounded-xl border border-border/60 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                        <Button type="submit" className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 whitespace-nowrap">
                          <Bell className="h-4 w-4 mr-2" />
                          Notify Me
                        </Button>
                      </div>
                      <p className="text-[11px] text-muted-foreground/50">
                        No spam, just a single email when the book is out.
                      </p>
                    </form>
                  )}
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="relative rounded-3xl overflow-hidden shadow-elevated">
                  <img
                    src={bookCover}
                    alt="Numbers Out of Place ebook cover by Luana Micheau"
                    className="w-full max-w-md mx-auto"
                  />
                </div>
                <div className="absolute -top-4 -right-4">
                  <span className="bg-accent text-white text-xs px-4 py-2 rounded-full shadow-lg" style={{ fontWeight: 600 }}>
                    Coming July 2026
                  </span>
                </div>
              </div>
            </div>

            {/* What's Inside */}
            <div className="mb-24">
              <div className="text-center mb-12">
                <p className="text-xs text-primary uppercase tracking-widest mb-3" style={{ fontWeight: 600 }}>Contents</p>
                <h2 className="text-3xl lg:text-4xl tracking-tight mb-4">What's planned</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  From personal experience to practical strategies
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-3 max-w-4xl mx-auto">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/40 hover:border-primary/20 transition-all duration-300 hover:shadow-custom">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Table of Contents */}
            <div className="mb-24">
              <div className="text-center mb-12">
                <p className="text-xs text-primary uppercase tracking-widest mb-3" style={{ fontWeight: 600 }}>Structure</p>
                <h2 className="text-3xl lg:text-4xl tracking-tight mb-4">Table of Contents</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Five comprehensive parts covering dyscalculia in adulthood
                </p>
              </div>

              <div className="max-w-3xl mx-auto rounded-3xl bg-card border border-border/40 shadow-custom overflow-hidden">
                <div className="p-8 space-y-8">
                  {tableOfContents.map((part, partIndex) => (
                    <div key={partIndex} className="space-y-3">
                      <div className="flex items-center gap-3 pb-2 border-b border-border/30">
                        <span className="text-[11px] text-primary bg-primary/[0.08] px-2.5 py-1 rounded-full" style={{ fontWeight: 600 }}>
                          {part.part}
                        </span>
                        <span className="text-[15px]" style={{ fontWeight: 600 }}>{part.title}</span>
                      </div>
                      <div className="space-y-1.5 ml-1">
                        {part.chapters.map((chapter, chapterIndex) => (
                          <div key={chapterIndex} className="flex items-start gap-2.5 text-sm text-muted-foreground py-1">
                            <span className="text-primary/30 mt-0.5">·</span>
                            <span>{chapter.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center p-10 lg:p-14 rounded-3xl bg-gradient-to-br from-primary/[0.06] via-background to-accent/[0.04] border border-primary/10">
              <h2 className="text-2xl lg:text-3xl tracking-tight mb-3">This book is for you if...</h2>
              <div className="max-w-xl mx-auto space-y-2.5 mb-8">
                {[
                  "You were diagnosed with dyscalculia (or suspect it) as an adult",
                  "You also have ADHD and wonder how the two intersect",
                  "You're tired of resources aimed at children or written in clinical jargon",
                  "You want practical strategies, not just awareness",
                  "You need to feel less alone in this"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-left">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              {!subscribed ? (
                <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-4 py-3 rounded-xl border border-border/60 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  <Button type="submit" className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 whitespace-nowrap">
                    <Bell className="h-4 w-4 mr-2" />
                    Notify Me
                  </Button>
                </form>
              ) : (
                <div className="inline-flex items-center gap-2 text-primary" style={{ fontWeight: 500 }}>
                  <CheckCircle className="h-5 w-5" />
                  You're on the list!
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
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