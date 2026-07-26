import { useState } from "react";
import { motion } from "framer-motion";
import { MdOutlinePsychology as Brain, MdOutlineSchedule as Clock, MdOutlineCalculate as Calculator, MdOutlineCheckCircle as CheckCircle, MdOutlineCancel as XCircle, MdExpandMore as ChevronDown, MdOutlineMedication as Pill, MdOutlineSchool as GraduationCap, MdOutlineMonitorHeart as HeartPulse, MdOutlineBiotech as Microscope, MdOutlineOpenInNew as ExternalLink } from "react-icons/md";
import { TimePerceptionDemo } from "./TimePerceptionDemo";

const ease = [0.16, 1, 0.3, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease },
} as const;

function SectionHeading({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <motion.div {...reveal} className="text-center mb-12">
      {eyebrow && (
        <p className="mx-auto mb-3 inline-flex rounded-full px-3 py-1.5 text-xs uppercase tracking-widest tape-label" style={{ fontWeight: 600 }}>
          {eyebrow}
        </p>
      )}
      <h3 className="font-display text-2xl lg:text-4xl tracking-tight text-ink mb-3" style={{ fontWeight: 520 }}>{title}</h3>
      {intro && <p className="text-ink-muted max-w-lg mx-auto">{intro}</p>}
    </motion.div>
  );
}

export function UnderstandSection() {
  const [showAllMisconceptions, setShowAllMisconceptions] = useState(false);

  const keyPoints = [
    {
      icon: Brain,
      title: "Neurological difference",
      description: "Dyscalculia affects how the brain processes numerical information, spatial relationships, and time concepts. It's present from birth and is not related to intelligence.",
      iconColor: "bg-blue-100 text-blue-600",
    },
    {
      icon: Calculator,
      title: "Number processing",
      description: "Difficulties with number sense, mathematical calculations, and understanding quantity relationships. Numbers may feel abstract or 'slippery'.",
      iconColor: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: Clock,
      title: "Time and sequence",
      description: "Challenges with time perception, sequencing events, and understanding temporal relationships. Often co-occurs with ADHD time-blindness.",
      iconColor: "bg-purple-100 text-purple-600",
    },
  ];

  const misconceptions = [
    { myth: "Just bad at maths", reality: "A specific neurological difference affecting number processing, unrelated to effort or intelligence" },
    { myth: "Due to poor teaching", reality: "Lifelong condition present from birth, independent of education quality" },
    { myth: "Same as maths anxiety", reality: "Distinct condition, though anxiety can be a secondary effect of undiagnosed dyscalculia" },
    { myth: "Can be 'cured' with practice", reality: "Permanent difference that can be supported with accommodations and strategies" },
    { myth: "Only affects children", reality: "A lifelong condition, and many adults are diagnosed late and have developed coping strategies" },
    { myth: "Very rare", reality: "Affects approximately 5–7% of the population, similar to dyslexia prevalence" },
  ];

  const visibleMisconceptions = showAllMisconceptions ? misconceptions : misconceptions.slice(0, 4);

  const comorbidities = [
    { name: "ADHD", percentage: "40–60%", bar: 50, description: "Attention and executive function challenges" },
    { name: "Dyslexia", percentage: "30–40%", bar: 35, description: "Reading and language processing differences" },
    { name: "Anxiety", percentage: "50–70%", bar: 60, description: "Often secondary to academic struggles" },
    { name: "Depression", percentage: "20–30%", bar: 25, description: "Can develop from prolonged difficulties" },
  ];

  const treatments = [
    {
      icon: Pill,
      title: "No approved medication",
      description: "No medication is approved or routinely used to treat dyscalculia directly. It is a learning difference, not a condition that responds to pharmaceutical treatment on its own.",
      source: "Cleveland Clinic",
      sourceUrl: "https://my.clevelandclinic.org/health/diseases/23949-dyscalculia",
      iconColor: "bg-red-50 text-red-500",
    },
    {
      icon: GraduationCap,
      title: "Primary treatments",
      description: "Dyscalculia is managed through targeted educational interventions, including one-on-one tutoring focused on number sense, basic arithmetic, and problem-solving.",
      source: "Understood.org",
      sourceUrl: "https://www.understood.org/en/articles/treatment-options-for-dyscalculia",
      iconColor: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: HeartPulse,
      title: "Co-occurring conditions",
      description: "Medications may help when dyscalculia occurs alongside ADHD, anxiety, or similar conditions, improving focus or reducing related symptoms to support learning.",
      source: "WebMD",
      sourceUrl: "https://www.webmd.com/add-adhd/childhood-adhd/dyscalculia-facts",
      iconColor: "bg-blue-50 text-blue-600",
    },
    {
      icon: Microscope,
      title: "Emerging approaches",
      description: "Research is exploring non-drug options like neurofeedback and brain stimulation, but these lack widespread evidence and aren't standard practice.",
      source: "Leigh Brain & Spine",
      sourceUrl: "https://leighbrainandspine.com/brain-based-conditions/dyscalculia-treatment/",
      iconColor: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-paper/45" />
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div {...reveal} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full tape-label mb-5">
            <Brain className="h-3.5 w-3.5 text-ink" />
            <span className="text-[13px] text-ink" style={{ fontWeight: 500 }}>Understanding Dyscalculia</span>
          </div>
          <h2 className="font-display text-3xl lg:text-5xl tracking-tight mb-5 text-ink" style={{ fontWeight: 520 }}>
            What is <span className="italic" style={{ fontWeight: 420 }}>dyscalculia?</span>
          </h2>
          <p className="text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
            A specific learning difference that affects how people process numbers, time, and mathematical concepts.
            It's not about intelligence. It's about how the brain works differently.
          </p>
        </motion.div>

        {/* Key Characteristics */}
        <div className="mb-24">
          <motion.p {...reveal} className="text-center text-xs text-ink-muted/60 uppercase tracking-widest mb-10" style={{ fontWeight: 600 }}>
            Key characteristics
          </motion.p>
          <div className="grid md:grid-cols-3 gap-5">
            {keyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease, delay: index * 0.1 }}
                className="paper-card p-7 rounded-2xl transition-all duration-300 hover:shadow-custom hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${point.iconColor} mb-5`}>
                  <point.icon className="h-6 w-6" />
                </div>
                <h4 className="font-sans text-[15px] mb-2 text-ink" style={{ fontWeight: 600 }}>{point.title}</h4>
                <p className="text-sm text-ink-muted leading-relaxed">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Time perception — interactive */}
        <div className="mb-24 grid min-w-0 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div {...reveal} className="min-w-0 space-y-5 order-2 lg:order-1">
            <p className="text-xs uppercase tracking-widest text-primary" style={{ fontWeight: 600 }}>
              Feel it for a moment
            </p>
            <h3 className="font-display text-3xl lg:text-4xl tracking-tight text-ink max-w-md" style={{ fontWeight: 520 }}>
              Time can feel unreliable too.
            </h3>
            <p className="text-ink-muted leading-relaxed max-w-lg">
              Number sense and time sense live close together in the brain. Many people with dyscalculia —
              and most with ADHD — experience <span className="text-ink" style={{ fontWeight: 500 }}>time-blindness</span>:
              minutes stretch or compress, and "I'll be there in five" is genuinely hard to judge.
            </p>
            <p className="text-ink-muted leading-relaxed max-w-lg">
              This isn't carelessness. It's perception. Try the experiment and notice how slippery
              ten seconds can be.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.12 }}
            className="min-w-0 order-1 lg:order-2"
          >
            <TimePerceptionDemo />
          </motion.div>
        </div>

        {/* Common Misconceptions */}
        <div className="mb-24">
          <SectionHeading
            title="What dyscalculia is not"
            intro="Clearing up the misconceptions that prevent proper understanding"
          />
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {visibleMisconceptions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease, delay: (index % 4) * 0.08 }}
                className="p-5 paper-card rounded-2xl transition-all duration-300 hover:shadow-custom"
              >
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <div className="text-sm text-accent" style={{ fontWeight: 600 }}>Myth: "{item.myth}"</div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-ink-muted leading-relaxed">{item.reality}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {!showAllMisconceptions && misconceptions.length > 4 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAllMisconceptions(true)}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm px-4 py-2 rounded-full hover:bg-primary/5"
                style={{ fontWeight: 500 }}
              >
                Show more
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Comorbidities */}
        <div className="mb-24">
          <SectionHeading
            title="Often occurs with"
            intro="Understanding these connections helps with comprehensive support"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {comorbidities.map((condition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease, delay: index * 0.08 }}
                className="text-center p-6 paper-card rounded-2xl transition-all duration-300 hover:shadow-custom"
              >
                <div className="numeral text-4xl text-ink mb-1 tabular-nums" style={{ fontWeight: 500 }}>{condition.percentage}</div>
                <div className="h-1.5 bg-ink/[0.06] rounded-full overflow-hidden my-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${condition.bar}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease, delay: 0.2 + index * 0.1 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
                <h4 className="text-sm text-ink mb-1.5" style={{ fontWeight: 600 }}>{condition.name}</h4>
                <p className="text-xs text-ink-muted">{condition.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Treatment & Medication */}
        <div className="mb-16">
          <SectionHeading
            title="Treatment & medication"
            intro="Support focuses on educational strategies, accommodations, and treating co-occurring conditions"
          />
          <div className="grid md:grid-cols-2 gap-4">
            {treatments.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease, delay: (idx % 2) * 0.1 }}
                className="p-6 paper-card rounded-2xl transition-all duration-300 hover:shadow-custom"
              >
                <div className="flex items-start gap-4">
                  <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${item.iconColor} flex-shrink-0`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h4 className="font-sans text-[15px] text-ink" style={{ fontWeight: 600 }}>{item.title}</h4>
                    <p className="text-sm text-ink-muted leading-relaxed">{item.description}</p>
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                    >
                      {item.source}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div {...reveal} className="text-center p-10 paper-surface rounded-3xl">
          <h3 className="font-display text-2xl text-ink mb-3" style={{ fontWeight: 520 }}>Ready to learn more?</h3>
          <p className="text-ink-muted mb-6 max-w-lg mx-auto">
            Explore accommodation strategies or browse our curated reading list.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#accommodations" className="btn-primary inline-block text-center px-6 py-3">View accommodations</a>
            <a href="#books" className="btn-secondary inline-block text-center px-6 py-3">Browse books</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
