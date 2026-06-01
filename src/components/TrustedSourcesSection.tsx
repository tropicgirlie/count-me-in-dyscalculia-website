import { useRef } from "react";
import { Badge } from "./ui/badge";
import { ExternalLink, FileText, Globe, GraduationCap, Building2, Shield } from "lucide-react";

export function TrustedSourcesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = true;

  const sources = [
    {
      name: "British Dyslexia Association",
      type: "Charity Organization",
      description: "UK's leading charity for dyslexia and dyscalculia support",
      icon: Building2,
      category: "Support",
      categoryColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
      link: "https://www.bdadyslexia.org.uk/"
    },
    {
      name: "NHS Service Manual",
      type: "Healthcare Guidelines",
      description: "Official NHS guidance on learning differences and assessment",
      icon: FileText,
      category: "Healthcare",
      categoryColor: "text-blue-600 bg-blue-50 border-blue-100",
      link: "https://www.nhs.uk/"
    },
    {
      name: "Dyslexia Association of Ireland",
      type: "Support Organization",
      description: "Ireland's national organization for dyslexia and dyscalculia",
      icon: Building2,
      category: "Support",
      categoryColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
      link: "https://www.dyslexia.ie/"
    },
    {
      name: "CUH NHS Foundation Trust",
      type: "Clinical Guidance",
      description: "Assessment guidelines from Cambridge University Hospitals",
      icon: GraduationCap,
      category: "Healthcare",
      categoryColor: "text-blue-600 bg-blue-50 border-blue-100",
      link: "https://www.cuh.nhs.uk/"
    },
    {
      name: "Butterworth Research (2019)",
      type: "Academic Research",
      description: "Peer-reviewed research on dyscalculia prevalence and neurology",
      icon: FileText,
      category: "Research",
      categoryColor: "text-purple-600 bg-purple-50 border-purple-100",
      link: "#"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[#F6EFE2]/35" />
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full tape-label mb-5">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span className="text-[13px] text-primary" style={{ fontWeight: 500 }}>Evidence-Based Information</span>
          </div>
          <h2 className="text-3xl lg:text-4xl tracking-tight mb-4 text-[#173F46]">Trusted Sources</h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Our content is based on peer-reviewed research and guidelines from leading healthcare organizations.
          </p>
        </div>

        {/* Sources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {sources.map((source, index) => (
            <a
              key={index}
              href={source.link !== "#" ? source.link : undefined}
              target={source.link !== "#" ? "_blank" : undefined}
              rel={source.link !== "#" ? "noopener noreferrer" : undefined}
              className={`group block p-5 paper-card rounded-2xl hover:border-primary/20 transition-all duration-300 hover:shadow-custom hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-muted/60 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <source.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm leading-tight group-hover:text-primary transition-colors" style={{ fontWeight: 600 }}>{source.name}</h4>
                    <p className="text-[11px] text-muted-foreground/60">{source.type}</p>
                  </div>
                </div>
                {source.link !== "#" && (
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors flex-shrink-0" />
                )}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {source.description}
              </p>

              <Badge variant="outline" className={`text-[10px] ${source.categoryColor}`}>
                {source.category}
              </Badge>
            </a>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="p-5 rounded-2xl paper-surface">
          <p className="text-sm text-muted-foreground max-w-4xl mx-auto text-center leading-relaxed">
            <strong className="text-foreground">Medical Disclaimer:</strong> This information is for educational purposes only and is not a substitute for professional medical advice. Always consult with qualified healthcare professionals.
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[11px] text-muted-foreground/40">
            Sources last reviewed: March 2025 · Updated regularly
          </p>
        </div>
      </div>
    </section>
  );
}
