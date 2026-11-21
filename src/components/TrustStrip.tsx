import { useEffect, useRef, useState } from "react";
import { MdOutlineGroups as Users, MdOutlinePsychology as Brain, MdOutlineSchedule as Clock, MdOutlineCheckCircle as CheckCircle, MdOpenInNew as ExternalLink } from "react-icons/md";

function useCountUp(target: string, isVisible: boolean) {
  const [display, setDisplay] = useState(target);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    // Only animate numeric values
    const numMatch = target.match(/^(\d+)/);
    if (!numMatch) {
      setDisplay(target);
      return;
    }

    const end = parseInt(numMatch[1]);
    const suffix = target.slice(numMatch[1].length);
    const duration = 1200;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * end);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isVisible, target]);

  return display;
}

export function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = true;

  const stats = [
    {
      icon: Users,
      number: "1 in 20",
      label: "people have dyscalculia",
      description: "More common than you think",
      source: "British Dyslexia Association",
      sourceUrl: "https://www.bdadyslexia.org.uk/dyslexia/neurodiversity-and-co-occurring-differences/dyscalculia"
    },
    {
      icon: Brain,
      number: "Lifelong",
      label: "neurological difference",
      description: "Not a learning disability",
      source: "Cleveland Clinic",
      sourceUrl: "https://my.clevelandclinic.org/health/diseases/23949-dyscalculia"
    },
    {
      icon: Clock,
      number: "Early",
      label: "recognition matters",
      description: "Better outcomes with support",
      source: "Cambridge University Hospitals NHS",
      sourceUrl: "https://www.cuh.nhs.uk/"
    },
    {
      icon: CheckCircle,
      number: "100%",
      label: "treatable with support",
      description: "Accommodations work",
      source: "Understood.org",
      sourceUrl: "https://www.understood.org/en/articles/treatment-options-for-dyscalculia"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-paper/35" />
      <div className="container-custom relative z-10">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="mx-auto mb-3 inline-flex rounded-full px-3 py-1.5 text-xs uppercase tracking-widest tape-label" style={{ fontWeight: 600 }}>The facts</p>
          <h2 className="text-3xl lg:text-4xl tracking-tight mb-4 text-ink">What you need to know</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Evidence-based facts from leading researchers and healthcare providers
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`text-center p-6 lg:p-8 paper-card rounded-2xl hover:border-primary/20 transition-all duration-500 group hover:shadow-custom hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative z-10 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/[0.08] text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <stat.icon className="h-5 w-5" />
              </div>
              
              <div className="space-y-1.5">
                <div className="relative z-10 text-2xl lg:text-3xl text-primary tracking-tight" style={{ fontWeight: 700 }}>{stat.number}</div>
                <h3 className="text-sm text-foreground" style={{ fontWeight: 600 }}>{stat.label}</h3>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <a
                  href={stat.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 pt-2 text-[11px] text-primary/70 hover:text-primary transition-colors"
                  aria-label={`Source: ${stat.source} (opens in new tab)`}
                >
                  <cite className="not-italic">{stat.source}</cite>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Trust logos */}
        <div className="mt-16 pt-8">
          <div className="text-center space-y-5">
            <p className="text-[11px] text-muted-foreground/60 uppercase tracking-widest" style={{ fontWeight: 500 }}>Recommended sources</p>
            <div className="flex flex-wrap justify-center items-center gap-3">
              {["NHS", "British Dyslexia Association", "HSE Ireland", "Research-backed"].map(name => (
                <span key={name} className="text-xs text-muted-foreground/50 px-4 py-2 rounded-full bg-muted/50 border border-border/30" style={{ fontWeight: 500 }}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
