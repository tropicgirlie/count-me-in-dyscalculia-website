import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import {
  MdOutlineOpenInNew as ExternalLink,
  MdArrowForward as ArrowRight,
  MdOutlinePlace as MapPin,
  MdOutlineSchedule as Clock,
  MdOutlineCreditCard as CreditCard,
  MdOutlineCheckCircle as CheckCircle,
  MdOutlineWarningAmber as AlertTriangle,
  MdExpandMore as ChevronDown,
  MdExpandLess as ChevronUp,
  MdOutlineDescription as FileText,
  MdOutlineGroups as Users,
  MdOutlineLightbulb as Lightbulb,
} from "react-icons/md";
import { usePageMeta } from "../lib/usePageMeta";

const ease = [0.16, 1, 0.3, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, ease },
} as const;

interface Provider {
  name: string;
  region: string;
  country: string;
  service: string;
  price: string;
  waitTime: string;
  url: string;
  notes: string;
  assessesAdults: boolean;
}

const providers: Provider[] = [
  {
    name: "Dyslexia Association of Ireland",
    region: "Ireland",
    country: "IE",
    service: "Adult dyscalculia assessment",
    price: "~€600",
    waitTime: "4–8 weeks",
    url: "https://www.dyslexia.ie",
    notes:
      "One of the few Irish providers offering dedicated dyscalculia assessment for adults. Based in Dublin with some regional availability.",
    assessesAdults: true,
  },
  {
    name: "National Learning Network",
    region: "Ireland",
    country: "IE",
    service: "Learning difficulty assessment",
    price: "Varies",
    waitTime: "2–6 weeks",
    url: "https://www.nln.ie",
    notes:
      "Part of the Rehab Group. Offers assessment as part of broader learning support. May refer to specialist for dyscalculia.",
    assessesAdults: true,
  },
  {
    name: "British Dyslexia Association",
    region: "UK",
    country: "GB",
    service: "Dyscalculia screening & assessment",
    price: "~£690",
    waitTime: "2–4 weeks",
    url: "https://www.bdadyslexia.org.uk",
    notes:
      "Offers both online screening and full diagnostic assessments. Can recommend local assessors across the UK.",
    assessesAdults: true,
  },
  {
    name: "Dyscalculia.me",
    region: "UK",
    country: "GB",
    service: "Specialist dyscalculia assessment",
    price: "~£500–£800",
    waitTime: "2–6 weeks",
    url: "https://dyscalculia.me.uk",
    notes:
      "Specialist dyscalculia service. Offers remote and in-person assessments with detailed reports and recommendations.",
    assessesAdults: true,
  },
  {
    name: "NHS (via GP referral)",
    region: "UK",
    country: "GB",
    service: "Educational psychology assessment",
    price: "Free (NHS)",
    waitTime: "3–12 months",
    url: "https://www.nhs.uk",
    notes:
      "Free via NHS but long waiting lists. Your GP can refer you to educational psychology services. Availability varies by region.",
    assessesAdults: true,
  },
  {
    name: "National Center for Learning Disabilities",
    region: "United States",
    country: "US",
    service: "Assessment directory & resources",
    price: "Varies ($500–$3,000)",
    waitTime: "Varies",
    url: "https://www.ncld.org",
    notes:
      "Provides a directory of assessment professionals and guidance on seeking evaluation. Costs vary significantly by state and provider.",
    assessesAdults: true,
  },
  {
    name: "Understood.org",
    region: "United States",
    country: "US",
    service: "Assessment guidance",
    price: "Free guidance",
    waitTime: "N/A",
    url: "https://www.understood.org",
    notes:
      "Excellent free resource for understanding the assessment process. Helps you find local evaluators and understand your rights.",
    assessesAdults: true,
  },
];

const steps = [
  {
    icon: Lightbulb,
    title: "Learn about dyscalculia",
    description:
      "Understand what dyscalculia is and isn't. Our self-check can help you reflect on your experiences.",
  },
  {
    icon: FileText,
    title: "Gather your history",
    description:
      "School reports, work challenges, examples of daily struggles with numbers. This context helps assessors.",
  },
  {
    icon: Users,
    title: "Choose a provider",
    description:
      "Use the directory below to find an assessment provider. Ask if they specialise in adult dyscalculia.",
  },
  {
    icon: CheckCircle,
    title: "Attend assessment",
    description:
      "Assessments typically take 2–3 hours and include various number-related tasks. It's thorough but not scary.",
  },
];

const expectations = [
  {
    title: "Background interview",
    time: "30–60 min",
    description:
      "The assessor will ask about your educational history, daily challenges with numbers, family history, and any existing diagnoses (like ADHD).",
  },
  {
    title: "Standardised tests",
    time: "60–90 min",
    description:
      "You'll complete a series of number-related tasks: arithmetic, estimation, number sense, working memory. It's thorough but not intimidating.",
  },
  {
    title: "Report & recommendations",
    time: "1–2 weeks after",
    description:
      "You'll receive a detailed report with findings, a diagnosis (if applicable), and tailored recommendations for accommodations and strategies.",
  },
];

export function GetAssessedPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null);

  const regions = ["all", ...new Set(providers.map((p) => p.region))];
  const filtered =
    selectedRegion === "all"
      ? providers
      : providers.filter((p) => p.region === selectedRegion);

  usePageMeta({
    title: "Get Assessed for Dyscalculia",
    description:
      "Find professional assessment providers for adult dyscalculia, learn about the assessment process, and understand what to expect.",
  });

  return (
    <div>
      {/* Hero */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-paper">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_75%_15%,rgba(0,150,136,0.08),transparent_65%)]" />
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease }}
              className="space-y-7"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full tape-label">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-[13px] text-ink" style={{ fontWeight: 500 }}>Get Assessed</span>
              </div>

              <div className="space-y-4">
                <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.03] tracking-tight text-ink" style={{ fontWeight: 520 }}>
                  Professional <span className="italic" style={{ fontWeight: 420 }}>assessment</span>
                </h1>
                <p className="text-xl text-ink-soft" style={{ fontWeight: 500 }}>
                  The key to understanding and support
                </p>
              </div>

              <p className="text-lg text-ink-muted leading-relaxed max-w-lg">
                A professional dyscalculia assessment isn't just a label. It's
                access to accommodations, self-understanding, and strategies
                tailored to how your brain actually works.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/self-check">
                  <Button className="bg-ink hover:bg-ink-soft text-white px-7 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group h-12">
                    Take Self-Check First
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a href="#providers">
                  <Button
                    variant="outline"
                    className="border-ink/20 text-ink hover:bg-white/70 px-7 rounded-full transition-all duration-300 h-12"
                  >
                    View Providers
                  </Button>
                </a>
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
                  alt="A calm workspace with visual planning supports, calculator, checklist, and color-coded information."
                  className="w-full rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 lg:py-24 bg-paper/35">
        <div className="container-custom">
          <motion.div {...reveal} className="text-center mb-14">
            <h2 className="font-display text-3xl lg:text-4xl text-ink mb-4" style={{ fontWeight: 520 }}>How to get assessed</h2>
            <p className="text-lg text-ink-muted max-w-2xl mx-auto">
              Four straightforward steps from curiosity to clarity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease, delay: index * 0.09 }}
                className="paper-card rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-custom"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="p-2.5 bg-primary/10 rounded-xl">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="numeral text-3xl text-ink/15" style={{ fontWeight: 500 }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-sans text-[15px] text-ink mb-2" style={{ fontWeight: 600 }}>{step.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Providers */}
      <section id="providers" className="py-20 lg:py-24 scroll-mt-24">
        <div className="container-custom">
          <motion.div {...reveal} className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl text-ink mb-4" style={{ fontWeight: 520 }}>Assessment providers</h2>
            <p className="text-lg text-ink-muted max-w-2xl mx-auto">
              Organisations that offer dyscalculia assessment for adults
            </p>
          </motion.div>

          {/* Region Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                aria-pressed={selectedRegion === region}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                  selectedRegion === region
                    ? "bg-ink text-white shadow-md"
                    : "bg-white border border-ink/10 text-ink-muted hover:text-ink hover:border-ink/30"
                }`}
                style={{ fontWeight: 500 }}
              >
                {region === "all" ? "All Regions" : region}
              </button>
            ))}
          </div>

          <motion.div layout className="space-y-4 max-w-4xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filtered.map((provider) => {
                const expanded = expandedProvider === provider.name;
                return (
                  <motion.div
                    layout
                    key={provider.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease }}
                    className="paper-card rounded-3xl transition-all duration-200 hover:shadow-custom overflow-hidden"
                  >
                    <div className="p-6 sm:p-7">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2.5 mb-2">
                            <h3 className="font-display text-lg text-ink" style={{ fontWeight: 540 }}>{provider.name}</h3>
                            <span className="inline-flex rounded-full bg-ink/[0.06] text-ink-muted px-2.5 py-0.5 text-[11px]" style={{ fontWeight: 600 }}>
                              {provider.region}
                            </span>
                            {provider.assessesAdults && (
                              <span className="inline-flex rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[11px]" style={{ fontWeight: 600 }}>
                                Adults
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-ink-muted mb-4">{provider.service}</p>

                          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-muted">
                            <div className="flex items-center gap-1.5">
                              <CreditCard className="h-3.5 w-3.5 text-primary" />
                              <span>{provider.price}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-primary" />
                              <span>Wait: {provider.waitTime}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5 text-primary" />
                              <span>{provider.region}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={provider.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="outline"
                              className="rounded-full text-sm border-ink/20 text-ink hover:bg-ink/5 group"
                            >
                              Visit
                              <ExternalLink className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Button>
                          </a>
                          <button
                            onClick={() =>
                              setExpandedProvider(expanded ? null : provider.name)
                            }
                            className="p-2 rounded-full text-ink-muted hover:text-ink hover:bg-ink/5 transition-colors"
                            aria-label={expanded ? "Hide details" : "Show more details"}
                            aria-expanded={expanded}
                          >
                            {expanded ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease }}
                            className="overflow-hidden"
                          >
                            <p className="mt-4 pt-4 border-t border-ink/10 text-sm text-ink-muted leading-relaxed">
                              {provider.notes}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Pricing Disclaimer */}
          <motion.div {...reveal} className="max-w-4xl mx-auto mt-8 p-4 paper-surface rounded-xl">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-ink-muted flex-shrink-0 mt-0.5" />
              <p className="text-sm text-ink-muted">
                <strong>Pricing disclaimer:</strong> Prices and wait times are
                approximate and were gathered from provider websites. Always
                check directly with providers for current pricing, availability,
                and whether they assess adults specifically.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 lg:py-24 bg-paper/35">
        <div className="container-custom max-w-3xl">
          <motion.div {...reveal} className="text-center mb-14">
            <h2 className="font-display text-3xl lg:text-4xl text-ink mb-4" style={{ fontWeight: 520 }}>What to expect</h2>
            <p className="text-lg text-ink-muted">A typical adult dyscalculia assessment</p>
          </motion.div>

          <div className="space-y-4">
            {expectations.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease, delay: i * 0.08 }}
                className="paper-card rounded-3xl p-6 sm:p-7"
              >
                <div className="flex items-start gap-5">
                  <span className="numeral text-4xl text-primary/60 leading-none mt-1" style={{ fontWeight: 480 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                      <h3 className="font-display text-lg text-ink" style={{ fontWeight: 540 }}>{item.title}</h3>
                      <span className="text-xs text-primary" style={{ fontWeight: 600 }}>{item.time}</span>
                    </div>
                    <p className="text-sm text-ink-muted leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div {...reveal} className="text-center p-12 paper-surface rounded-3xl">
            <h2 className="font-display text-3xl lg:text-4xl text-ink mb-4" style={{ fontWeight: 520 }}>Not sure yet?</h2>
            <p className="text-ink-muted mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              That's completely okay. Start with our self-check to reflect on
              your experiences, or explore our free resources to learn more about
              dyscalculia at your own pace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/self-check">
                <Button className="bg-ink hover:bg-ink-soft text-white px-8 h-12 rounded-full shadow-lg group text-[15px]">
                  Take the Self-Check
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
