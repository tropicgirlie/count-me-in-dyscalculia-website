import { Link } from "react-router";
import { motion } from "framer-motion";
import { TrustStrip } from "./TrustStrip";
import { TrustedSourcesSection } from "./TrustedSourcesSection";
import { UnderstandSection } from "./UnderstandSection";
import { BooksSection } from "./BooksSection";
import { AccommodationsSection } from "./AccommodationsSection";
import { EverydayExamples } from "./EverydayExamples";
import { MemoryPockets } from "./MemoryPockets";
import { WorkingMemorySimulator } from "./WorkingMemorySimulator";
import { AudioWelcome } from "./AudioWelcome";
import { MdArrowForward, MdOutlineMenuBook, MdOutlineLightbulb, MdOutlineFavoriteBorder, MdOutlineHandyman, MdOutlinePsychology, MdOutlineSmartphone } from "react-icons/md";
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

  return (
    <>
      <section className="count-home-intro" aria-labelledby="count-home-title">
        <div className="container-custom count-home-spread">
          <div className="count-home-copy">
            <h1 id="count-home-title">Dyscalculia in everyday life</h1>
            <p>Information and practical tools for adults who find numbers, time or calculations difficult.</p>
            <div className="count-home-links">
              <a href="#understand">Understand dyscalculia <MdArrowForward aria-hidden="true" /></a>
              <a href="#everyday-examples">See everyday examples</a>
              <AudioWelcome />
            </div>
          </div>
          <MemoryPockets />
        </div>
      </section>

      <EverydayExamples />
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
