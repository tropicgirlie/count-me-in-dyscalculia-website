import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { TrustStrip } from "./TrustStrip";
import { TrustedSourcesSection } from "./TrustedSourcesSection";
import { UnderstandSection } from "./UnderstandSection";
import { BooksSection } from "./BooksSection";
import { AccommodationsSection } from "./AccommodationsSection";
import { Button } from "./ui/button";
import { ArrowRight, BookOpen, Lightbulb, Heart, Wrench, Brain, Sparkles, Smartphone } from "lucide-react";
import heroImage from "figma:asset/7981c074fe56bc94aa5e0ff2db2f3f841442433f.png";
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
  const [shuffleNums, setShuffleNums] = useState([4, 7, 6, 2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShuffleNums(prev => prev.map(n => {
        if (Math.random() > 0.6) {
          const swaps: Record<number, number> = { 4: 7, 7: 4, 6: 9, 9: 6, 2: 5, 5: 2 };
          return swaps[n] ?? n;
        }
        return n;
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pb-28 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-32 -right-32 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[80px] pointer-events-none" />

        {/* Floating number decorations */}
        <div className="absolute top-40 left-[10%] text-primary/[0.06] text-[120px] select-none pointer-events-none animate-float" style={{ fontWeight: 700 }}>7</div>
        <div className="absolute bottom-32 right-[15%] text-accent/[0.06] text-[100px] select-none pointer-events-none animate-float-delayed" style={{ fontWeight: 700 }}>3</div>

        <div className="container-custom relative z-10">
          <div
            ref={heroAnim.ref}
            className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center animate-fade-up`}
          >
            {/* Left – Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/[0.08] border border-primary/15">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-[13px] text-primary" style={{ fontWeight: 500 }}>1 in 20 people have dyscalculia</span>
              </div>

              <div className="space-y-5">
                <h1 className="text-[2.75rem] lg:text-[3.5rem] leading-[1.05] tracking-tight">
                  <span className="text-gradient">Clarity</span> for
                  <br />dyscalculia
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Practical tools, stories, and research to help adults navigate life with dyscalculia and ADHD.
                  From workplace strategies to everyday accommodations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#understand">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-7 py-3 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group h-12">
                    Explore Resources
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <Link to="/ebook">
                  <Button variant="outline" className="border-1.5 border-primary/25 text-primary hover:bg-primary/5 px-7 py-3 rounded-full transition-all duration-300 h-12">
                    The Book, July 2026
                  </Button>
                </Link>
              </div>

              {/* Trust chips */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {["Evidence-based", "Expert-reviewed", "Community-supported"].map(label => (
                  <span key={label} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-full">
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right – Hero visual */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-lg">
                {/* Main image */}
                <div className="relative rounded-3xl overflow-hidden shadow-elevated">
                  <img
                    src={heroImage}
                    alt="Floating 3D numbers in coral and teal colours representing how numbers feel out of place with dyscalculia"
                    className="w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
                </div>

                {/* Floating card – number scramble */}
                <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-elevated p-4 border border-border/50 animate-fade-up">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Sparkles className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <span className="text-[11px] text-muted-foreground" style={{ fontWeight: 600 }}>Numbers scramble</span>
                  </div>
                  <div className="flex gap-1.5">
                    {shuffleNums.map((n, i) => (
                      <span
                        key={i}
                        className="w-9 h-9 rounded-lg bg-accent/[0.08] text-accent flex items-center justify-center text-sm transition-all duration-500"
                        style={{ fontWeight: 700 }}
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Floating card – stat */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-elevated px-4 py-3 border border-border/50 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                  <div className="text-xs text-muted-foreground mb-0.5">Often occurs with</div>
                  <div className="text-primary text-lg" style={{ fontWeight: 700 }}>ADHD · 40–60%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento-style Quick Nav */}
      <section className="py-20">
        <div className="container-custom">
          <div
            ref={cardsAnim.ref}
            className={`transition-all duration-700 ${cardsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="text-center mb-12">
              <p className="text-xs text-primary uppercase tracking-widest mb-3" style={{ fontWeight: 600 }}>Resources</p>
              <h2 className="text-3xl lg:text-4xl tracking-tight mb-4">Everything you need</h2>
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
                  <div className={`group relative p-6 rounded-2xl bg-gradient-to-br ${card.gradient} border border-transparent hover:border-border/50 transition-all duration-300 hover:shadow-custom hover:-translate-y-1 h-full`}>
                    <div className={`w-10 h-10 rounded-xl ${card.iconColor} flex items-center justify-center mb-4`}>
                      <card.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-[15px] mb-1.5 group-hover:text-primary transition-colors" style={{ fontWeight: 600 }}>{card.label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
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
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />
        <div className="container-custom relative z-10">
          <div
            ref={audienceAnim.ref}
            className={`transition-all duration-700 ${audienceAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="text-center mb-12">
              <p className="text-xs text-primary uppercase tracking-widest mb-3" style={{ fontWeight: 600 }}>Who this helps</p>
              <h2 className="text-3xl lg:text-4xl tracking-tight mb-4">Designed for different needs</h2>
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
                  className={`relative p-8 bg-gradient-to-b ${item.gradient} rounded-2xl border border-border/40 hover:border-border/60 transition-all duration-300 hover:shadow-custom hover:-translate-y-1 group`}
                >
                  <div className={`w-12 h-12 rounded-xl ${item.iconColor} flex items-center justify-center mb-5`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-[15px] mb-2" style={{ fontWeight: 600 }}>{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
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