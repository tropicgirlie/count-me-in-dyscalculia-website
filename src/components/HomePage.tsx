import { useState, useRef } from "react";
import { Link } from "react-router";
import { TrustStrip } from "./TrustStrip";
import { TrustedSourcesSection } from "./TrustedSourcesSection";
import { UnderstandSection } from "./UnderstandSection";
import { BooksSection } from "./BooksSection";
import { AccommodationsSection } from "./AccommodationsSection";
import { Button } from "./ui/button";
import { ArrowRight, BookOpen, Lightbulb, Heart, Wrench, Brain, PlayCircle, Smartphone } from "lucide-react";
import { usePageMeta, useJsonLd } from "../lib/usePageMeta";

function useInView(_threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  return { ref, isVisible: true };
}

export function HomePage() {
  usePageMeta({
    title: "Count Me In: Dyscalculia Support & Resources for Adults",
    description: "Evidence-based dyscalculia resources, tools, and strategies for adults. Understand dyscalculia, find accommodations, and explore support for ADHD and number difficulties.",
  });

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Count Me In",
    url: "https://countmein.site",
    description: "Evidence-based information and support for understanding and navigating life with dyscalculia.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://countmein.site/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  });

  const heroAnim = useInView(0.1);
  const cardsAnim = useInView();
  const audienceAnim = useInView();
  const [showNarration, setShowNarration] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[650px] overflow-hidden bg-[#F6EFE2] pt-20 sm:min-h-[680px] lg:min-h-[760px] lg:pt-24">
        <img
          src="/abstracthero.png"
          alt="A tactile collage of number supports, place value notes, memory prompts, and gentle reminders for dyscalculia."
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F6EFE2] via-[#F6EFE2]/82 to-[#F6EFE2]/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        <div className="container-custom relative z-10">
          <div
            ref={heroAnim.ref}
            className="grid min-h-[570px] items-center animate-fade-up sm:min-h-[600px] lg:min-h-[640px]"
          >
            <div className="min-w-0 max-w-2xl space-y-7 py-12 lg:py-14">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-3 py-1.5 shadow-sm backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-[13px] text-primary" style={{ fontWeight: 500 }}>1 in 20 people have dyscalculia</span>
              </div>

              <div className="space-y-5">
                <h1 className="max-w-[calc(100vw-3rem)] text-[2.08rem] leading-[1.08] tracking-[-0.025em] text-[#173F46] sm:max-w-2xl sm:text-[4rem] sm:leading-[0.98] sm:tracking-[-0.03em] lg:text-[4.75rem]">
                  <span className="block">Numbers can move.</span>
                  <span className="block">Support can hold</span>
                  <span className="block">them still.</span>
                </h1>
                <p className="max-w-[29ch] text-base leading-relaxed text-[#2F4F52] sm:max-w-lg sm:text-lg">
                  Count Me In blends artful explanation with practical tools for adults navigating dyscalculia, ADHD, working memory, time, and number stress.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="#understand">
                  <Button className="h-12 w-full max-w-80 bg-[#173F46] px-7 py-3 text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#225966] hover:shadow-lg group sm:w-auto sm:max-w-none">
                    Start with support
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNarration((value) => !value)}
                  className="border-1.5 h-12 w-full max-w-80 border-[#173F46]/25 bg-white/65 px-7 py-3 text-[#173F46] backdrop-blur transition-all duration-300 hover:bg-white sm:w-auto sm:max-w-none"
                  aria-expanded={showNarration}
                >
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Listen to guided version
                </Button>
              </div>

              {showNarration && (
                <div className="max-w-sm rounded-2xl border border-[#173F46]/15 bg-white/85 p-4 shadow-elevated backdrop-blur animate-fade-up">
                  <audio
                    src="/narration-audio.mp3"
                    controls
                    preload="metadata"
                    className="w-full"
                    aria-label="Optional narration for the Count Me In hero experience"
                  />
                  <p className="mt-2 text-xs leading-relaxed text-[#496568]">
                    Optional audio. Use the controls above to play, pause, or adjust volume.
                  </p>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-1">
                {["Gentle explanation", "Practical scaffolds", "Adult neurodivergent support"].map(label => (
                  <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 text-xs text-[#496568] shadow-sm backdrop-blur">
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Working Memory Feature */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container-custom">
          <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
            <div className="min-w-0 space-y-6">
              <p className="text-xs uppercase tracking-widest text-primary" style={{ fontWeight: 600 }}>Inside the calculation</p>
              <div className="space-y-4">
                <h2 className="w-80 max-w-full text-3xl tracking-tight text-foreground lg:w-auto lg:max-w-lg lg:text-5xl">
                  Working memory is the quiet workspace.
                </h2>
                <p className="w-80 max-w-full text-muted-foreground leading-relaxed lg:w-auto lg:max-w-xl">
                  The goal is not to make math feel dramatic. It is to show why small supports matter: visible steps, stable place value, fewer pieces at once, and more time to think.
                </p>
              </div>
              <div className="grid w-80 max-w-full gap-3 sm:grid-cols-2 lg:w-auto lg:max-w-none">
                {[
                  "Color-code groups",
                  "Keep place value visible",
                  "Move left to right",
                  "Use clear boundaries",
                ].map((item) => (
                  <div key={item} className="paper-card rounded-xl px-4 py-3 text-sm text-[#173F46]">
                    {item}
                  </div>
                ))}
              </div>
              <Link to="/self-check">
                <Button variant="outline" className="border-primary/25 text-primary hover:bg-primary/5">
                  Try the self-check
                  <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
              </Link>
            </div>
            <div className="min-w-0 overflow-hidden rounded-[1.5rem] paper-surface p-2">
              <img
                src="/workingmemoryduringcalculation.png"
                alt="An educational collage showing working memory slots, place value, step-by-step calculation supports, and visual scaffolds."
                loading="lazy"
                className="w-full rounded-[1.1rem]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bento-style Quick Nav */}
      <section className="py-16">
        <div className="container-custom">
          <div
            ref={cardsAnim.ref}
            className={`transition-all duration-700 ${cardsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="text-center mb-12">
              <p className="mx-auto mb-3 inline-flex rounded-full px-3 py-1.5 text-xs uppercase tracking-widest tape-label" style={{ fontWeight: 600 }}>Resources</p>
              <h2 className="text-3xl lg:text-4xl tracking-tight mb-4 text-[#173F46]">Everything you need</h2>
              <p className="text-muted-foreground max-w-md mx-auto">Jump to the section that matters most to you</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { icon: Brain, label: "Understand", desc: "Learn about dyscalculia, signs, and science behind it", href: "#understand", gradient: "from-blue-500/10 to-blue-500/5", iconColor: "text-blue-600 bg-blue-100" },
                { icon: Smartphone, label: "Tools", desc: "Apps and assistive technology for dyscalculia", href: "/tools", isRoute: true, gradient: "from-purple-500/10 to-purple-500/5", iconColor: "text-purple-600 bg-purple-100" },
                { icon: BookOpen, label: "Books", desc: "Curated essential reading on dyscalculia", href: "#books", gradient: "from-emerald-500/10 to-emerald-500/5", iconColor: "text-emerald-600 bg-emerald-100" },
                { icon: Heart, label: "Free Resources", desc: "Organizations, tools, and community links", href: "/free-resources", isRoute: true, gradient: "from-primary/10 to-primary/5", iconColor: "text-primary bg-primary/10" },
                { icon: Wrench, label: "Accommodations", desc: "Practical strategies for work and daily life", href: "#accommodations", gradient: "from-orange-500/10 to-orange-500/5", iconColor: "text-orange-600 bg-orange-100" },
              ].map((card, i) => {
                const inner = (
                  <div className="group paper-card relative h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-custom">
                    <div className={`w-10 h-10 rounded-xl ${card.iconColor} flex items-center justify-center mb-4 relative z-10`}>
                      <card.icon className="h-5 w-5" />
                    </div>
                    <h3 className="relative z-10 text-[15px] mb-1.5 text-[#173F46] group-hover:text-primary transition-colors" style={{ fontWeight: 600 }}>{card.label}</h3>
                    <p className="relative z-10 text-sm text-[#496568] leading-relaxed">{card.desc}</p>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 absolute top-6 right-6" />
                  </div>
                );
                if (card.isRoute) {
                  return <Link key={i} to={card.href}>{inner}</Link>;
                }
                return <a key={i} href={card.href}>{inner}</a>;
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Audience Cards */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#F6EFE2]/45" />
        <div className="container-custom relative z-10">
          <div
            ref={audienceAnim.ref}
            className={`transition-all duration-700 ${audienceAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="text-center mb-12">
              <p className="mx-auto mb-3 inline-flex rounded-full px-3 py-1.5 text-xs uppercase tracking-widest tape-label" style={{ fontWeight: 600 }}>Who this helps</p>
              <h2 className="text-3xl lg:text-4xl tracking-tight mb-4 text-[#173F46]">Designed for different needs</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Resources for different audiences navigating dyscalculia
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {[
                {
                  icon: Brain,
                  title: "Adults with ADHD & dyscalculia",
                  description: "Finally understand your brain and get practical tools for daily life",
                  gradient: "from-primary/8 to-transparent",
                  iconColor: "text-primary bg-primary/10",
                },
                {
                  icon: Heart,
                  title: "Parents of children with dyscalculia",
                  description: "Evidence-based support and advocacy strategies for your child",
                  gradient: "from-accent/8 to-transparent",
                  iconColor: "text-accent bg-accent/10",
                },
                {
                  icon: Lightbulb,
                  title: "Educators & HR professionals",
                  description: "Create inclusive environments with practical accommodations",
                  gradient: "from-blue-500/8 to-transparent",
                  iconColor: "text-blue-600 bg-blue-100",
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="paper-card relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-custom group"
                >
                  <div className={`relative z-10 w-12 h-12 rounded-xl ${item.iconColor} flex items-center justify-center mb-5`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="relative z-10 text-[15px] mb-2 text-[#173F46]" style={{ fontWeight: 600 }}>{item.title}</h3>
                  <p className="relative z-10 text-sm text-[#496568] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />
      <TrustedSourcesSection />

      <div id="understand">
        <UnderstandSection />
      </div>

      <div id="books">
        <BooksSection />
      </div>

      <div id="accommodations">
        <AccommodationsSection />
      </div>
    </>
  );
}
