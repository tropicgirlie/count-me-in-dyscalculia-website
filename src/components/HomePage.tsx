import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { TrustStrip } from "./TrustStrip";
import { TrustedSourcesSection } from "./TrustedSourcesSection";
import { UnderstandSection } from "./UnderstandSection";
import { BooksSection } from "./BooksSection";
import { AccommodationsSection } from "./AccommodationsSection";
import { WorkingMemorySimulator } from "./WorkingMemorySimulator";
import { NumberField } from "./hero/NumberField";
import { AudioWelcome } from "./AudioWelcome";
import { Button } from "./ui/button";
import { MdArrowForward, MdOutlineMenuBook, MdOutlineLightbulb, MdOutlineFavoriteBorder, MdOutlineHandyman, MdOutlinePsychology, MdOutlineSmartphone, MdOutlinePanTool, MdOutlineAir } from "react-icons/md";
import { usePageMeta, useJsonLd } from "../lib/usePageMeta";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
} as const;

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

  const [held, setHeld] = useState(false);

  return (
    <>
      {/* Hero — the site performs its own premise */}
      <section className="relative min-h-[100svh] overflow-hidden bg-paper">
        {/* soft tints */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_20%,rgba(0,150,136,0.07),transparent_65%),radial-gradient(ellipse_50%_40%_at_15%_85%,rgba(240,98,93,0.05),transparent_60%)]" />
        <NumberField held={held} />
        {/* legibility veil */}
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/75 to-paper/10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="container-custom relative z-10">
          <div className="flex min-h-[100svh] items-center pt-24 pb-16">
            <div className="max-w-2xl space-y-7">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card/70 px-3.5 py-1.5 shadow-sm backdrop-blur"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-[13px] text-ink" style={{ fontWeight: 500 }}>1 in 20 people have dyscalculia</span>
              </motion.div>

              <div className="space-y-5">
                <motion.h1
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="font-display text-[clamp(2.6rem,7vw,5rem)] leading-[1.0] tracking-[-0.015em] text-ink"
                  style={{ fontWeight: 520 }}
                >
                  <span className="block">Numbers can move.</span>
                  <span className="block italic text-ink-soft" style={{ fontWeight: 400 }}>
                    Support can hold them still.
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
                  className="max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg"
                >
                  Count Me In blends artful explanation with practical tools for adults navigating dyscalculia, ADHD, working memory, time, and number stress.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.44 }}
                className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              >
                <a href="#understand">
                  <Button className="h-12 w-full bg-ink px-7 text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lg group sm:w-auto">
                    Start with support
                    <MdArrowForward className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setHeld((v) => !v)}
                  aria-pressed={held}
                  className="h-12 w-full border-ink/20 bg-card/65 px-7 text-ink backdrop-blur transition-all duration-300 hover:bg-card sm:w-auto"
                >
                  {held ? <MdOutlineAir className="mr-2 h-4 w-4" /> : <MdOutlinePanTool className="mr-2 h-4 w-4" />}
                  {held ? "Let them move again" : "Hold the numbers still"}
                </Button>
                <AudioWelcome />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap items-center gap-3 pt-1"
              >
                {["Gentle explanation", "Practical scaffolds", "Adult neurodivergent support"].map((label) => (
                  <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-card/70 px-3 py-1.5 text-xs text-ink-muted shadow-sm backdrop-blur">
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    {label}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Working Memory — interactive simulator */}
      <WorkingMemorySimulator />

      {/* Bento-style Quick Nav */}
      <section className="py-20 lg:py-24">
        <div className="container-custom">
          <motion.div {...reveal}>
            <div className="text-center mb-12">
              <p className="mx-auto mb-3 inline-flex rounded-full px-3 py-1.5 text-xs uppercase tracking-widest tape-label" style={{ fontWeight: 600 }}>Resources</p>
              <h2 className="text-3xl lg:text-5xl tracking-tight mb-4 text-ink font-display" style={{ fontWeight: 520 }}>Everything you need</h2>
              <p className="text-ink-muted max-w-md mx-auto">Jump to the section that matters most to you</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { icon: MdOutlinePsychology, label: "Understand", desc: "Learn about dyscalculia, signs, and science behind it", href: "#understand", iconColor: "text-blue-600 bg-blue-100" },
                { icon: MdOutlineSmartphone, label: "Tools", desc: "Apps and assistive technology for dyscalculia", href: "/tools", isRoute: true, iconColor: "text-purple-600 bg-purple-100" },
                { icon: MdOutlineMenuBook, label: "Books", desc: "Curated essential reading on dyscalculia", href: "#books", iconColor: "text-emerald-600 bg-emerald-100" },
                { icon: MdOutlineFavoriteBorder, label: "Free Resources", desc: "Organizations, tools, and community links", href: "/free-resources", isRoute: true, iconColor: "text-primary bg-primary/10" },
                { icon: MdOutlineHandyman, label: "Accommodations", desc: "Practical strategies for work and daily life", href: "#accommodations", iconColor: "text-orange-600 bg-orange-100" },
              ].map((card, i) => {
                const inner = (
                  <div className="group paper-card relative h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-custom">
                    <div className={`w-10 h-10 rounded-xl ${card.iconColor} flex items-center justify-center mb-4 relative z-10`}>
                      <card.icon className="h-5 w-5" />
                    </div>
                    <h3 className="relative z-10 font-sans text-[15px] mb-1.5 text-ink group-hover:text-primary transition-colors" style={{ fontWeight: 600 }}>{card.label}</h3>
                    <p className="relative z-10 text-sm text-ink-muted leading-relaxed">{card.desc}</p>
                    <MdArrowForward className="h-4 w-4 text-ink-muted/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 absolute top-6 right-6" />
                  </div>
                );
                if (card.isRoute) {
                  return <Link key={i} to={card.href}>{inner}</Link>;
                }
                return <a key={i} href={card.href}>{inner}</a>;
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Audience Cards */}
      <section className="py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-paper/45" />
        <div className="container-custom relative z-10">
          <motion.div {...reveal}>
            <div className="text-center mb-12">
              <p className="mx-auto mb-3 inline-flex rounded-full px-3 py-1.5 text-xs uppercase tracking-widest tape-label" style={{ fontWeight: 600 }}>Who this helps</p>
              <h2 className="text-3xl lg:text-5xl tracking-tight mb-4 text-ink font-display" style={{ fontWeight: 520 }}>Designed for different needs</h2>
              <p className="text-ink-muted max-w-md mx-auto">
                Resources for different audiences navigating dyscalculia
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {[
                {
                  icon: MdOutlinePsychology,
                  title: "Adults with ADHD & dyscalculia",
                  description: "Finally understand your brain and get practical tools for daily life",
                  iconColor: "text-primary bg-primary/10",
                },
                {
                  icon: MdOutlineFavoriteBorder,
                  title: "Parents of children with dyscalculia",
                  description: "Evidence-based support and advocacy strategies for your child",
                  iconColor: "text-accent bg-accent/10",
                },
                {
                  icon: MdOutlineLightbulb,
                  title: "Educators & HR professionals",
                  description: "Create inclusive environments with practical accommodations",
                  iconColor: "text-blue-600 bg-blue-100",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  className="paper-card relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-custom group"
                >
                  <div className={`relative z-10 w-12 h-12 rounded-xl ${item.iconColor} flex items-center justify-center mb-5`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="relative z-10 font-sans text-[15px] mb-2 text-ink" style={{ fontWeight: 600 }}>{item.title}</h3>
                  <p className="relative z-10 text-sm text-ink-muted leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
