import { useState, useRef } from "react";
import { Brain, Clock, Calculator, CheckCircle, XCircle, ChevronDown, Pill, GraduationCap, HeartPulse, Microscope, ExternalLink } from "lucide-react";

function useInView(_threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  return { ref, isVisible: true };
}

export function UnderstandSection() {
  const [showAllMisconceptions, setShowAllMisconceptions] = useState(false);
  const headerAnim = useInView();
  const cardsAnim = useInView();
  const mythsAnim = useInView();
  const comorbAnim = useInView();
  const treatmentAnim = useInView();

  const keyPoints = [
    {
      icon: Brain,
      title: "Neurological difference",
      description: "Dyscalculia affects how the brain processes numerical information, spatial relationships, and time concepts. It's present from birth and is not related to intelligence.",
      gradient: "from-blue-500/10 to-blue-500/5",
      iconColor: "bg-blue-100 text-blue-600",
    },
    {
      icon: Calculator,
      title: "Number processing",
      description: "Difficulties with number sense, mathematical calculations, and understanding quantity relationships. Numbers may feel abstract or 'slippery'.",
      gradient: "from-emerald-500/10 to-emerald-500/5",
      iconColor: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: Clock,
      title: "Time and sequence",
      description: "Challenges with time perception, sequencing events, and understanding temporal relationships. Often co-occurs with ADHD time-blindness.",
      gradient: "from-purple-500/10 to-purple-500/5",
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
    { name: "ADHD", percentage: "40–60%", description: "Attention and executive function challenges" },
    { name: "Dyslexia", percentage: "30–40%", description: "Reading and language processing differences" },
    { name: "Anxiety", percentage: "50–70%", description: "Often secondary to academic struggles" },
    { name: "Depression", percentage: "20–30%", description: "Can develop from prolonged difficulties" },
  ];

  const treatments = [
    {
      icon: Pill,
      title: "No approved medication",
      description: "No medication is approved or routinely used to treat dyscalculia directly. It is a learning difference, not a condition that responds to pharmaceutical treatment on its own.",
      source: "Cleveland Clinic",
      sourceUrl: "https://my.clevelandclinic.org/health/diseases/23949-dyscalculia",
      iconColor: "bg-red-50 text-red-500 border-red-100",
    },
    {
      icon: GraduationCap,
      title: "Primary treatments",
      description: "Dyscalculia is managed through targeted educational interventions, including one-on-one tutoring focused on number sense, basic arithmetic, and problem-solving.",
      source: "Understood.org",
      sourceUrl: "https://www.understood.org/en/articles/treatment-options-for-dyscalculia",
      iconColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      icon: HeartPulse,
      title: "Co-occurring conditions",
      description: "Medications may help when dyscalculia occurs alongside ADHD, anxiety, or similar conditions, improving focus or reducing related symptoms to support learning.",
      source: "WebMD",
      sourceUrl: "https://www.webmd.com/add-adhd/childhood-adhd/dyscalculia-facts",
      iconColor: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      icon: Microscope,
      title: "Emerging approaches",
      description: "Research is exploring non-drug options like neurofeedback and brain stimulation, but these lack widespread evidence and aren't standard practice.",
      source: "Leigh Brain & Spine",
      sourceUrl: "https://leighbrainandspine.com/brain-based-conditions/dyscalculia-treatment/",
      iconColor: "bg-purple-50 text-purple-600 border-purple-100",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div
          ref={headerAnim.ref}
          className={`text-center mb-16 transition-all duration-700 ${headerAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/[0.08] border border-primary/15 mb-5">
            <Brain className="h-3.5 w-3.5 text-primary" />
            <span className="text-[13px] text-primary" style={{ fontWeight: 500 }}>Understanding Dyscalculia</span>
          </div>
          <h2 className="text-3xl lg:text-4xl tracking-tight mb-5">What is dyscalculia?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A specific learning difference that affects how people process numbers, time, and mathematical concepts.
            It's not about intelligence. It's about how the brain works differently.
          </p>
        </div>

        {/* Key Characteristics */}
        <div ref={cardsAnim.ref} className="mb-24">
          <h3 className="text-center text-sm text-muted-foreground/60 uppercase tracking-widest mb-10" style={{ fontWeight: 600 }}>Key characteristics</h3>
          <div className="grid md:grid-cols-3 gap-5">
            {keyPoints.map((point, index) => (
              <div
                key={index}
                className={`p-7 rounded-2xl bg-gradient-to-br ${point.gradient} border border-border/30 hover:border-border/60 transition-all duration-300 hover:shadow-custom hover:-translate-y-1 ${cardsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border ${point.iconColor} mb-5`}>
                  <point.icon className="h-6 w-6" />
                </div>
                <h4 className="text-[15px] mb-2" style={{ fontWeight: 600 }}>{point.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Misconceptions */}
        <div ref={mythsAnim.ref} className="mb-24">
          <div className={`text-center mb-10 transition-all duration-700 ${mythsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <h3 className="text-2xl lg:text-3xl tracking-tight mb-3">What dyscalculia is NOT</h3>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Clear up common misconceptions that prevent proper understanding
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {visibleMisconceptions.map((item, index) => (
              <div
                key={index}
                className={`p-5 rounded-2xl bg-card border border-border/40 hover:border-border/60 transition-all duration-300 hover:shadow-custom ${mythsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <div className="text-sm text-accent" style={{ fontWeight: 600 }}>Myth: "{item.myth}"</div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{item.reality}</span>
                    </div>
                  </div>
                </div>
              </div>
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
        <div ref={comorbAnim.ref} className="mb-24">
          <div className={`text-center mb-10 transition-all duration-700 ${comorbAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <h3 className="text-2xl lg:text-3xl tracking-tight mb-3">Often occurs with</h3>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Understanding these connections helps with comprehensive support
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {comorbidities.map((condition, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-2xl bg-card border border-border/40 hover:border-primary/20 transition-all duration-300 hover:shadow-custom ${comorbAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="text-2xl text-primary mb-1" style={{ fontWeight: 700 }}>{condition.percentage}</div>
                <h4 className="text-sm mb-1.5" style={{ fontWeight: 600 }}>{condition.name}</h4>
                <p className="text-xs text-muted-foreground">{condition.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Treatment & Medication */}
        <div ref={treatmentAnim.ref} className="mb-16">
          <div className={`text-center mb-10 transition-all duration-700 ${treatmentAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <h3 className="text-2xl lg:text-3xl tracking-tight mb-3">Treatment & medication</h3>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Support focuses on educational strategies, accommodations, and treating co-occurring conditions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {treatments.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-card border border-border/40 hover:border-border/60 transition-all duration-300 hover:shadow-custom ${treatmentAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border ${item.iconColor} flex-shrink-0`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h4 className="text-[15px]" style={{ fontWeight: 600 }}>{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
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
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center p-10 rounded-3xl bg-gradient-to-br from-primary/[0.06] to-accent/[0.04] border border-primary/10">
          <h3 className="text-xl mb-3" style={{ fontWeight: 600 }}>Ready to learn more?</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Explore accommodation strategies or browse our curated reading list.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#accommodations" className="btn-primary inline-block text-center px-6 py-3">View accommodations</a>
            <a href="#books" className="btn-secondary inline-block text-center px-6 py-3">Browse books</a>
          </div>
        </div>
      </div>
    </section>
  );
}