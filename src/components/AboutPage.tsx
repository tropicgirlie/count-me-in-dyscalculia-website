import { Link } from "react-router";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { MdOutlineFavoriteBorder as Heart, MdOutlineMenuBook as BookOpen, MdOutlineGroups as Users, MdArrowForward as ArrowRight, MdOutlineLightbulb as Lightbulb, MdOutlinePublic as Globe } from "react-icons/md";
import { usePageMeta } from "../lib/usePageMeta";

const ease = [0.16, 1, 0.3, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, ease },
} as const;

export function AboutPage() {
  usePageMeta({
    title: "About Count Me In: Dyscalculia Awareness & Late Diagnosis",
    description: "Born from a late dyscalculia and ADHD diagnosis, Count Me In provides practical, evidence-based resources for adults navigating number difficulties.",
  });

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
      iconColor: "text-pink-600 bg-pink-50",
    },
    {
      icon: Lightbulb,
      title: "Evidence-based",
      description:
        "Every resource is grounded in research. We cite our sources and update content as new findings emerge.",
      iconColor: "text-amber-600 bg-amber-50",
    },
    {
      icon: Users,
      title: "Community-centred",
      description:
        "Built with and for adults with dyscalculia. Real voices, real stories, real strategies that actually work.",
      iconColor: "text-primary bg-primary/10",
    },
    {
      icon: Globe,
      title: "Accessible by design",
      description:
        "Large text, generous spacing, clear language, and prefers-reduced-motion support. Because accessibility isn't optional.",
      iconColor: "text-blue-600 bg-blue-50",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-paper">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_75%_15%,rgba(0,150,136,0.08),transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease }}
              className="space-y-7"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full tape-label">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-[13px] text-ink" style={{ fontWeight: 500 }}>About Count Me In</span>
              </div>

              <div className="space-y-4">
                <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.03] tracking-tight text-ink" style={{ fontWeight: 520 }}>
                  A late <span className="italic" style={{ fontWeight: 420 }}>diagnosis</span>
                  <span className="block mt-3 font-sans text-ink-muted text-xl lg:text-2xl tracking-normal" style={{ fontWeight: 500 }}>
                    turned into a mission for clarity
                  </span>
                </h1>
              </div>

              <p className="text-lg text-ink-muted leading-relaxed max-w-lg">
                Count Me In was born from personal experience. Years of
                struggling with numbers, a late diagnosis of dyscalculia and
                ADHD, and the realisation that there weren't enough practical
                resources for adults like me.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/self-check">
                  <Button className="bg-ink hover:bg-ink-soft text-white px-7 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group h-12">
                    Take the Self-Check
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/stories">
                  <Button variant="outline" className="border-ink/20 text-ink hover:bg-card/70 px-7 rounded-full transition-all duration-300 h-12">
                    Read Stories
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease, delay: 0.15 }}
              className="flex items-center justify-center"
            >
              <div className="relative paper-card rounded-3xl p-2.5 overflow-hidden w-full max-w-md lg:max-w-full">
                <img
                  src="/differentbydesign2.png"
                  alt="A calm workspace with visual planning supports, a calculator, checklist, and color-coded information."
                  className="w-full rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-paper/35" />
        <div className="container-custom relative z-10">
          <motion.div {...reveal} className="text-center mb-16">
            <p className="mx-auto mb-3 inline-flex rounded-full px-3 py-1.5 text-xs uppercase tracking-widest tape-label" style={{ fontWeight: 600 }}>The journey</p>
            <h2 className="font-display text-3xl lg:text-4xl tracking-tight text-ink mb-4" style={{ fontWeight: 520 }}>My journey to diagnosis</h2>
            <p className="text-ink-muted max-w-md mx-auto">
              The winding road from 'bad at maths' to understanding dyscalculia
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24, x: -16 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease, delay: index * 0.06 }}
                className="flex gap-6"
              >
                <div className="flex flex-col items-center">
                  <span className="numeral text-3xl text-primary/60 leading-none mt-1 tabular-nums" style={{ fontWeight: 480 }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {index < timeline.length - 1 && (
                    <div className="w-px bg-gradient-to-b from-primary/25 to-transparent flex-1 min-h-6 mt-2" />
                  )}
                </div>

                <div className="pb-12">
                  <span className="text-[11px] text-primary bg-primary/[0.08] px-2.5 py-1 rounded-full" style={{ fontWeight: 600 }}>
                    {item.year}
                  </span>
                  <h3 className="font-display text-xl text-ink mt-2.5 mb-1.5" style={{ fontWeight: 540 }}>{item.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container-custom">
          <motion.div {...reveal} className="text-center mb-14">
            <p className="mx-auto mb-3 inline-flex rounded-full px-3 py-1.5 text-xs uppercase tracking-widest tape-label" style={{ fontWeight: 600 }}>Our principles</p>
            <h2 className="font-display text-3xl lg:text-4xl tracking-tight text-ink mb-4" style={{ fontWeight: 520 }}>What drives Count Me In</h2>
            <p className="text-ink-muted max-w-md mx-auto">
              The principles behind every resource, article, and recommendation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease, delay: (index % 2) * 0.09 }}
                className="paper-card p-7 rounded-2xl transition-all duration-300 hover:shadow-custom hover:-translate-y-1"
              >
                <div className={`w-11 h-11 rounded-xl ${value.iconColor} flex items-center justify-center mb-4`}>
                  <value.icon className="h-5 w-5" />
                </div>
                <h3 className="font-sans text-[15px] mb-2 text-ink" style={{ fontWeight: 600 }}>{value.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Luana */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-paper/35" />
        <div className="container-custom relative z-10">
          <motion.div {...reveal} className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full tape-label">
              <span className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-[13px] text-ink" style={{ fontWeight: 500 }}>The person behind it</span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl tracking-tight text-ink" style={{ fontWeight: 520 }}>
              Hi, I'm <span className="italic" style={{ fontWeight: 420 }}>Luana</span>
            </h2>
            <p className="text-lg text-ink-muted leading-relaxed">
              I'm a product designer who builds products, polymath, and
              late-diagnosed adult with dyscalculia and ADHD. I built Count Me In
              because I spent years searching for resources that just didn't exist.
              Practical, non-patronising, evidence-based information for adults
              who discover they have dyscalculia later in life.
            </p>
            <p className="text-lg text-ink-muted leading-relaxed">
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
                <Button className="bg-accent hover:bg-accent/90 text-white px-7 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group h-12">
                  <BookOpen className="mr-2 h-4 w-4" />
                  About the Book (Coming July 2026)
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div {...reveal} className="text-center p-12 lg:p-16 rounded-3xl paper-surface">
            <h2 className="font-display text-3xl lg:text-4xl text-ink tracking-tight mb-4" style={{ fontWeight: 520 }}>Ready to explore?</h2>
            <p className="text-ink-muted mb-8 max-w-lg mx-auto text-lg leading-relaxed">
              Whether you're newly diagnosed, suspecting dyscalculia, or
              supporting someone who has it, there's something here for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/self-check">
                <Button className="bg-ink hover:bg-ink-soft text-white px-8 h-12 rounded-full shadow-lg group text-[15px]">
                  Try the Self-Check
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/free-resources">
                <Button variant="outline" className="border-ink/20 text-ink hover:bg-ink/5 px-8 h-12 rounded-full text-[15px]">
                  Free Resources
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
