import { Link } from "react-router";
import { Button } from "./ui/button";
import { CheckCircle, BookOpen, Clock, Mail, PenLine, Sparkles } from "lucide-react";
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
      <section className="relative overflow-hidden bg-[#F6EFE2] pt-28 pb-20">
        <div className="absolute inset-0 opacity-60">
          <img src="/abstracthero.png" alt="" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F6EFE2] via-[#F6EFE2]/90 to-[#F6EFE2]/45" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-7">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 tape-label">
                  <PenLine className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[13px] text-primary" style={{ fontWeight: 500 }}>Currently Writing</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-white/70 px-3 py-1.5 shadow-sm">
                  <Clock className="h-3.5 w-3.5 text-accent" />
                  <span className="text-[13px] text-accent" style={{ fontWeight: 500 }}>July 2026</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-lg text-[#496568]" style={{ fontWeight: 500 }}>I am writing a book.</p>
                <h1 className="text-[2.75rem] leading-[1.02] tracking-[-0.03em] text-[#173F46] lg:text-[4.5rem]">
                  Numbers Out of Place
                </h1>
                <p className="text-xl text-[#496568]" style={{ fontWeight: 500 }}>
                  A guide to dyscalculia in adulthood
                </p>
              </div>

              <p className="max-w-lg text-lg leading-relaxed text-[#2F4F52]">
                A deeply personal and practical guide for adults navigating dyscalculia and ADHD.
                From late diagnosis stories to everyday strategies. Everything I wish someone had told me.
              </p>

              <p className="text-sm italic text-[#496568]/80">
                Having enough Concerta to finish this, probably launching July 2026.
              </p>

              <div className="flex flex-wrap items-center gap-3 text-sm text-[#496568]">
                {[
                  { icon: BookOpen, label: "~170 pages" },
                  { icon: Sparkles, label: "Evidence-based" },
                  { icon: Clock, label: "July 2026" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 shadow-sm">
                    <Icon className="h-4 w-4 text-primary/60" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="mailto:info@momops.org?subject=Numbers%20Out%20of%20Place%20interest%20list">
                  <Button className="h-12 bg-[#173F46] px-7 text-white hover:bg-[#225966]">
                    <Mail className="mr-2 h-4 w-4" />
                    Join the interest list
                  </Button>
                </a>
                <Link to="/contact">
                  <Button variant="outline" className="h-12 border-primary/25 bg-white/70 px-7 text-primary hover:bg-white">
                    Share a story
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="relative rotate-[-1.5deg] overflow-hidden rounded-3xl p-3 paper-surface">
                <img
                  src="/bookcover.png"
                  alt="Numbers Out of Place book cover by Luana Micheau"
                  className="mx-auto aspect-square w-full max-w-md rounded-2xl object-cover shadow-elevated"
                />
              </div>
              <div className="absolute -top-4 -right-4">
                <span className="inline-block rotate-2 rounded-full bg-accent px-4 py-2 text-xs text-white shadow-lg" style={{ fontWeight: 600 }}>
                  Coming July 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <p className="mx-auto mb-3 inline-flex rounded-full px-3 py-1.5 text-xs uppercase tracking-widest tape-label" style={{ fontWeight: 600 }}>
              Contents
            </p>
            <h2 className="mb-4 text-3xl tracking-tight text-[#173F46] lg:text-4xl">What's planned</h2>
            <p className="mx-auto max-w-md text-muted-foreground">
              From personal experience to practical strategies
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-3 md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="relative flex items-center gap-3 rounded-xl p-4 transition-all duration-300 hover:shadow-custom paper-card">
                <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                <span className="relative z-10 text-sm text-[#2F4F52]">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F6EFE2]/35 py-20 lg:py-24">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <p className="mx-auto mb-3 inline-flex rounded-full px-3 py-1.5 text-xs uppercase tracking-widest tape-label" style={{ fontWeight: 600 }}>
              Structure
            </p>
            <h2 className="mb-4 text-3xl tracking-tight text-[#173F46] lg:text-4xl">Table of Contents</h2>
            <p className="mx-auto max-w-md text-muted-foreground">
              Five comprehensive parts covering dyscalculia in adulthood
            </p>
          </div>

          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl paper-surface">
            <div className="space-y-8 p-8">
              {tableOfContents.map((part) => (
                <div key={part.part} className="space-y-3">
                  <div className="flex items-center gap-3 border-b border-[#173F46]/10 pb-2">
                    <span className="rounded-full bg-primary/[0.08] px-2.5 py-1 text-[11px] text-primary" style={{ fontWeight: 600 }}>
                      {part.part}
                    </span>
                    <span className="text-[15px] text-[#173F46]" style={{ fontWeight: 600 }}>{part.title}</span>
                  </div>
                  <div className="ml-1 space-y-1.5">
                    {part.chapters.map((chapter) => (
                      <div key={chapter} className="flex items-start gap-2.5 py-1 text-sm text-[#496568]">
                        <span className="mt-0.5 text-primary/40">.</span>
                        <span>{chapter}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="rounded-3xl p-10 text-center paper-surface lg:p-14">
            <h2 className="mb-3 text-2xl tracking-tight text-[#173F46] lg:text-3xl">This book is for you if...</h2>
            <div className="mx-auto mb-8 max-w-xl space-y-2.5">
              {audience.map((item) => (
                <div key={item} className="flex items-start gap-3 text-left">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="text-sm text-[#496568]">{item}</span>
                </div>
              ))}
            </div>
            <a href="mailto:info@momops.org?subject=Numbers%20Out%20of%20Place%20interest%20list">
              <Button className="rounded-xl bg-primary px-7 py-3 text-white shadow-sm transition-all duration-300 hover:bg-primary/90 hover:shadow-lg">
                <Mail className="mr-2 h-4 w-4" />
                Join the interest list
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
