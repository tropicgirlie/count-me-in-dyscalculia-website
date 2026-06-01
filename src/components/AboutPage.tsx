import { useRef } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Heart, BookOpen, Users, ArrowRight, Lightbulb, Globe } from "lucide-react";
import { usePageMeta } from "../lib/usePageMeta";

function useInView(_threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  return { ref, isVisible: true };
}

export function AboutPage() {
  usePageMeta({
    title: "About Count Me In: Dyscalculia Awareness & Late Diagnosis",
    description: "Born from a late dyscalculia and ADHD diagnosis, Count Me In provides practical, evidence-based resources for adults navigating number difficulties.",
  });

  const heroAnim = useInView(0.1);
  const timelineAnim = useInView(0.1);
  const valuesAnim = useInView();
  const luanaAnim = useInView();

  const timeline = [
    {
      year: "Childhood",
      title: "The numbers never made sense",
      description:
        "Struggling with basic arithmetic while excelling in languages and creativity. Teachers said 'just try harder', but trying harder didn't help when the numbers kept moving around.",
    },
    {
      year: "University",
      title: "Workarounds became survival skills",
      description:
        "Developing elaborate systems to avoid mental maths. Using fingers under the desk, relying on calculators for everything, feeling the shame of not splitting a restaurant bill.",
    },
    {
      year: "Adulthood",
      title: "ADHD diagnosis opened a door",
      description:
        "An ADHD diagnosis in my 30s was the first piece of the puzzle. But something still didn't fit: why were numbers specifically so hard?",
    },
    {
      year: "Late diagnosis",
      title: "Finally, dyscalculia had a name",
      description:
        "The dyscalculia assessment was a revelation. Not broken, not lazy, not stupid, just a brain that processes numbers differently. Relief, grief, and then determination.",
    },
    {
      year: "2025",
      title: "Count Me In is born",
      description:
        "Turning lived experience into practical resources. Because the next person searching 'why can't I do basic maths' deserves better answers than I got.",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Neurodiversity-affirming",
      description:
        "Different is not broken. We celebrate how neurodiverse brains think differently, not what they can't do.",
      gradient: "from-pink-500/10 to-pink-500/5",
      iconColor: "text-pink-600 bg-pink-50",
    },
    {
      icon: Lightbulb,
      title: "Evidence-based",
      description:
        "Every resource is grounded in research. We cite our sources and update content as new findings emerge.",
      gradient: "from-amber-500/10 to-amber-500/5",
      iconColor: "text-amber-600 bg-amber-50",
    },
    {
      icon: Users,
      title: "Community-centred",
      description:
        "Built with and for adults with dyscalculia. Real voices, real stories, real strategies that actually work.",
      gradient: "from-primary/10 to-primary/5",
      iconColor: "text-primary bg-primary/10",
    },
    {
      icon: Globe,
      title: "Accessible by design",
      description:
        "Large text, generous spacing, clear language, and prefers-reduced-motion support. Because accessibility isn't optional.",
      gradient: "from-blue-500/10 to-blue-500/5",
      iconColor: "text-blue-600 bg-blue-50",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="pt-24 pb-20 relative overflow-hidden bg-[#F6EFE2]">
        <div className="absolute inset-0 opacity-70">
          <img src="/differentbydesign2.png" alt="" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F6EFE2] via-[#F6EFE2]/88 to-[#F6EFE2]/35" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container-custom relative z-10">
          <div
            ref={heroAnim.ref}
            className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 ${heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full tape-label">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-[13px] text-primary" style={{ fontWeight: 500 }}>About Count Me In</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-[2.5rem] lg:text-[3.25rem] leading-[1.05] tracking-tight">
                  <span className="text-[#173F46]">A late diagnosis</span>
                  <span className="block mt-2 text-muted-foreground text-xl lg:text-2xl" style={{ fontWeight: 500 }}>
                    turned into a mission for clarity
                  </span>
                </h1>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Count Me In was born from personal experience. Years of
                struggling with numbers, a late diagnosis of dyscalculia and
                ADHD, and the realisation that there weren't enough practical
                resources for adults like me.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/self-check">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-7 py-3 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group h-12">
                    Take the Self-Check
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/stories">
                  <Button variant="outline" className="border-1.5 border-primary/25 text-primary hover:bg-primary/5 px-7 py-3 rounded-full transition-all duration-300 h-12">
                    Read Stories
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative paper-surface rounded-3xl p-2 overflow-hidden w-full max-w-md lg:max-w-full">
                <img
                  src="/differentbydesign2.png"
                  alt="A calm workspace with visual planning supports, a calculator, checklist, and color-coded information."
                  className="w-full rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#F6EFE2]/35" />
        <div className="container-custom relative z-10">
          <div
            ref={timelineAnim.ref}
            className={`text-center mb-16 transition-all duration-700 ${timelineAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <p className="mx-auto mb-3 inline-flex rounded-full px-3 py-1.5 text-xs uppercase tracking-widest tape-label" style={{ fontWeight: 600 }}>The journey</p>
            <h2 className="text-3xl lg:text-4xl tracking-tight mb-4">My Journey to Diagnosis</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              The winding road from 'bad at maths' to understanding dyscalculia
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`flex gap-5 transition-all duration-700 ${timelineAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <span className="text-[11px] text-primary" style={{ fontWeight: 700 }}>
                      {index + 1}
                    </span>
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-px bg-gradient-to-b from-primary/20 to-transparent flex-1 min-h-6" />
                  )}
                </div>

                <div className="pb-10">
                  <span className="text-[11px] text-primary bg-primary/[0.08] px-2.5 py-1 rounded-full" style={{ fontWeight: 600 }}>
                    {item.year}
                  </span>
                  <h3 className="text-lg mt-2.5 mb-1.5" style={{ fontWeight: 600 }}>{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container-custom">
          <div
            ref={valuesAnim.ref}
            className={`text-center mb-14 transition-all duration-700 ${valuesAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <p className="mx-auto mb-3 inline-flex rounded-full px-3 py-1.5 text-xs uppercase tracking-widest tape-label" style={{ fontWeight: 600 }}>Our principles</p>
            <h2 className="text-3xl lg:text-4xl tracking-tight mb-4">What Drives Count Me In</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              The principles behind every resource, article, and recommendation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className={`paper-card p-7 rounded-2xl transition-all duration-300 hover:shadow-custom hover:-translate-y-1 ${valuesAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`relative z-10 w-11 h-11 rounded-xl ${value.iconColor} flex items-center justify-center mb-4`}>
                  <value.icon className="h-5 w-5" />
                </div>
                <h3 className="relative z-10 text-[15px] mb-2 text-[#173F46]" style={{ fontWeight: 600 }}>{value.title}</h3>
                <p className="relative z-10 text-sm text-[#496568] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Luana */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#F6EFE2]/35" />
        <div className="container-custom relative z-10">
          <div
            ref={luanaAnim.ref}
            className={`max-w-2xl mx-auto text-center space-y-6 transition-all duration-700 ${luanaAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full tape-label">
              <span className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-[13px] text-accent" style={{ fontWeight: 500 }}>The person behind it</span>
            </div>
            <h2 className="text-3xl lg:text-4xl tracking-tight">Hi, I'm Luana</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a product designer who builds products, polymath, and
              late-diagnosed adult with dyscalculia and ADHD. I built Count Me In
              because I spent years searching for resources that just didn't exist.
              Practical, non-patronising, evidence-based information for adults
              who discover they have dyscalculia later in life.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not building this site, I work at{" "}
              <a
                href="https://luana.systems"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                luana.systems
              </a>
              , write about neurodiversity, and try very hard to remember what
              time my appointments are.
            </p>
            <div className="pt-4">
              <Link to="/ebook">
                <Button className="bg-accent hover:bg-accent/90 text-white px-7 py-3 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group h-12">
                  <BookOpen className="mr-2 h-4 w-4" />
                  About the Book (Coming July 2026)
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center p-12 lg:p-16 rounded-3xl paper-surface">
            <h2 className="text-3xl tracking-tight mb-4">Ready to Explore?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-lg leading-relaxed">
              Whether you're newly diagnosed, suspecting dyscalculia, or
              supporting someone who has it, there's something here for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/self-check">
                <Button className="btn-primary px-8 py-3 text-base">
                  Try the Self-Check
                </Button>
              </Link>
              <Link to="/free-resources">
                <Button variant="outline" className="btn-secondary px-8 py-3 text-base">
                  Free Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
