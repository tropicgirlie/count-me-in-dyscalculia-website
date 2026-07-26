import { Link } from "react-router";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { MdOutlineCheckCircle as CheckCircle, MdOutlineMenuBook as BookOpen, MdOutlineSchedule as Clock, MdOutlineMail as Mail, MdOutlineRateReview as PenLine, MdOutlineAutoAwesome as Sparkles } from "react-icons/md";
import { usePageMeta, useJsonLd } from "../lib/usePageMeta";

const ease = [0.16, 1, 0.3, 1] as const;

const roman = ["I", "II", "III", "IV", "V"];

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

  const features = [
    "Personal late diagnosis story and lived experience insights",
    "ADHD and dyscalculia intersection: managing the double bind",
    "Gender gap exploration: why women are often overlooked",
    "Time-blindness strategies for adult life and work",
    "Everyday number challenges: money, cooking, navigation",
    "Workplace accommodations and strengths-based approaches",
    "Practical tools, templates, and visual systems",
    "Resources for assessment and support across Ireland, UK, and US",
  ];

  const tableOfContents = [
    {
      part: "Part I",
      title: "Understanding Dyscalculia in Adulthood",
      chapters: [
        "When the Numbers Never Added Up: my late diagnosis story",
        "Dyscalculia 101: not just 'bad at math'",
        "ADHD, time-blindness, and the double bind",
        "Why so many women go undiagnosed: the gender gap in neurodiversity",
      ],
    },
    {
      part: "Part II",
      title: "Living with It, Not Against It",
      chapters: [
        "Time doesn't tick the same: managing time-blindness as an adult",
        "Everyday numbers: money, cooking, travel, navigation",
        "The invisible tax: financial stress and dyscalculia",
        "Motherhood and mental load: raising kids when numbers don't stick",
      ],
    },
    {
      part: "Part III",
      title: "Thriving in Work and Study",
      chapters: [
        "Dyscalculia at work: strengths, struggles, and how to ask for accommodations",
        "Study and self-improvement hacks: from adult learning to professional growth",
        "Designing your own systems: checklists, icons, and words alongside numbers",
      ],
    },
    {
      part: "Part IV",
      title: "Tools, Templates, and Real Stories",
      chapters: [
        "Practical hacks: bill splitters, budgeting aids, visual timers",
        "Worksheets and templates: ADHD + dyscalculia-friendly planners",
        "Stories from late-diagnosed adults: relief, grief, and resilience",
      ],
    },
    {
      part: "Part V",
      title: "Moving Forward",
      chapters: [
        "Reframing intelligence: why numbers aren't the measure of worth",
        "Resources for adults in Ireland, UK, US (assessment + support)",
        "The future of neurodiversity: making workplaces and families numeracy-inclusive",
      ],
    },
  ];

  const audience = [
    "You were diagnosed with dyscalculia, or suspect it, as an adult",
    "You also have ADHD and wonder how the two intersect",
    "You're tired of resources aimed at children or written in clinical jargon",
    "You want practical strategies, not just awareness",
    "You need to feel less alone in this",
  ];

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-paper pt-36 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_75%_20%,rgba(0,150,136,0.08),transparent_65%),radial-gradient(ellipse_45%_40%_at_10%_90%,rgba(240,98,93,0.05),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="container-custom relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease }}
              className="space-y-7"
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 tape-label">
                  <PenLine className="h-3.5 w-3.5 text-ink" />
                  <span className="text-[13px] text-ink" style={{ fontWeight: 500 }}>Currently Writing</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/70 px-3.5 py-1.5 shadow-sm">
                  <Clock className="h-3.5 w-3.5 text-accent" />
                  <span className="text-[13px] text-accent" style={{ fontWeight: 500 }}>July 2026</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-lg text-ink-muted" style={{ fontWeight: 500 }}>I am writing a book.</p>
                <h1 className="font-display text-[clamp(2.75rem,7vw,4.75rem)] leading-[1.0] tracking-[-0.015em] text-ink" style={{ fontWeight: 520 }}>
                  Numbers Out of <span className="italic" style={{ fontWeight: 420 }}>Place</span>
                </h1>
                <p className="text-xl text-ink-soft" style={{ fontWeight: 500 }}>
                  A guide to dyscalculia in adulthood
                </p>
              </div>

              <p className="max-w-lg text-lg leading-relaxed text-ink-soft">
                A deeply personal and practical guide for adults navigating dyscalculia and ADHD.
                From late diagnosis stories to everyday strategies. Everything I wish someone had told me.
              </p>

              <p className="text-sm italic text-ink-muted/80">
                Having enough Concerta to finish this, probably launching July 2026.
              </p>

              <div className="flex flex-wrap items-center gap-3 text-sm text-ink-muted">
                {[
                  { icon: BookOpen, label: "~170 pages" },
                  { icon: Sparkles, label: "Evidence-based" },
                  { icon: Clock, label: "July 2026" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 shadow-sm">
                    <Icon className="h-4 w-4 text-primary/70" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="mailto:info@momops.org?subject=Numbers%20Out%20of%20Place%20interest%20list">
                  <Button className="h-12 bg-ink px-7 text-white hover:bg-ink-soft shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                    <Mail className="mr-2 h-4 w-4" />
                    Join the interest list
                  </Button>
                </a>
                <Link to="/contact">
                  <Button variant="outline" className="h-12 border-ink/20 bg-white/70 px-7 text-ink hover:bg-white">
                    Share a story
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: -1.5 }}
              transition={{ duration: 0.9, ease, delay: 0.15 }}
              className="relative flex items-center justify-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative overflow-hidden rounded-3xl p-3 paper-card"
              >
                <img
                  src="/bookcover.png"
                  alt="Numbers Out of Place book cover by Luana Micheau"
                  className="mx-auto aspect-square w-full max-w-md rounded-2xl object-cover shadow-elevated"
                />
              </motion.div>
              <div className="absolute -top-4 -right-4">
                <span className="inline-block rotate-2 rounded-full bg-accent px-4 py-2 text-xs text-white shadow-lg" style={{ fontWeight: 600 }}>
                  Coming July 2026
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's planned */}
      <section className="py-20 lg:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
            className="mb-12 text-center"
          >
            <p className="mx-auto mb-3 inline-flex rounded-full px-3 py-1.5 text-xs uppercase tracking-widest tape-label" style={{ fontWeight: 600 }}>
              Contents
            </p>
            <h2 className="font-display mb-4 text-3xl tracking-tight text-ink lg:text-4xl" style={{ fontWeight: 520 }}>What's planned</h2>
            <p className="mx-auto max-w-md text-ink-muted">
              From personal experience to practical strategies
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-4xl gap-3 md:grid-cols-2">
            {features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease, delay: (i % 2) * 0.08 }}
                className="flex items-center gap-3 rounded-xl p-4 transition-all duration-300 hover:shadow-custom hover:-translate-y-0.5 paper-card"
              >
                <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-sm text-ink-soft">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Table of Contents — editorial */}
      <section className="bg-paper/35 py-20 lg:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
            className="mb-14 text-center"
          >
            <p className="mx-auto mb-3 inline-flex rounded-full px-3 py-1.5 text-xs uppercase tracking-widest tape-label" style={{ fontWeight: 600 }}>
              Structure
            </p>
            <h2 className="font-display mb-4 text-3xl tracking-tight text-ink lg:text-4xl" style={{ fontWeight: 520 }}>Table of contents</h2>
            <p className="mx-auto max-w-md text-ink-muted">
              Five comprehensive parts covering dyscalculia in adulthood
            </p>
          </motion.div>

          <div className="mx-auto max-w-3xl space-y-4">
            {tableOfContents.map((part, i) => (
              <motion.div
                key={part.part}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.05 }}
                className="paper-card rounded-3xl p-7 sm:p-8"
              >
                <div className="flex items-baseline gap-5 mb-4">
                  <span className="numeral text-4xl sm:text-5xl text-primary/70 leading-none" style={{ fontWeight: 480 }}>
                    {roman[i]}
                  </span>
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-ink-muted/60" style={{ fontWeight: 700 }}>
                      {part.part}
                    </span>
                    <span className="font-display text-lg sm:text-xl text-ink" style={{ fontWeight: 540 }}>{part.title}</span>
                  </div>
                </div>
                <ul className="space-y-2 sm:pl-14">
                  {part.chapters.map((chapter) => (
                    <li key={chapter} className="flex items-start gap-2.5 text-sm text-ink-muted leading-relaxed">
                      <span className="mt-[9px] h-1 w-1 rounded-full bg-primary/50 flex-shrink-0" />
                      <span>{chapter}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience CTA */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
            className="rounded-3xl p-10 text-center paper-surface lg:p-14"
          >
            <h2 className="font-display mb-6 text-2xl tracking-tight text-ink lg:text-3xl" style={{ fontWeight: 520 }}>This book is for you if…</h2>
            <div className="mx-auto mb-8 max-w-xl space-y-2.5">
              {audience.map((item) => (
                <div key={item} className="flex items-start gap-3 text-left">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="text-sm text-ink-muted">{item}</span>
                </div>
              ))}
            </div>
            <a href="mailto:info@momops.org?subject=Numbers%20Out%20of%20Place%20interest%20list">
              <Button className="rounded-full bg-ink px-8 h-12 text-white shadow-sm transition-all duration-300 hover:bg-ink-soft hover:shadow-lg hover:-translate-y-0.5">
                <Mail className="mr-2 h-4 w-4" />
                Join the interest list
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
