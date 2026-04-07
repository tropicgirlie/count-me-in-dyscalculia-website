import React from "react";
import { Button } from "./ui/button";
import { Navigation } from "./Navigation";
import { ExternalLink, Download, BookOpen, Users, Globe, Lightbulb, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { usePageMeta } from "../lib/usePageMeta";

export function FreeResourcesPage() {
  usePageMeta({
    title: "Free Dyscalculia Resources: Tools & Support | Count Me In",
    description: "Free dyscalculia resources: support organizations, research, apps, and educational tools. Curated for adults navigating number difficulties.",
  });

  const resources = [
    {
      title: "Dyscalculia Support Organizations",
      icon: <Users className="h-5 w-5" />,
      items: [
        { name: "The Dyscalculia Association", url: "https://dyscalculia.me.uk", description: "UK-based support and information" },
        { name: "National Center for Learning Disabilities", url: "https://www.ncld.org", description: "US resources and advocacy" },
        { name: "Understood.org", url: "https://www.understood.org", description: "Comprehensive learning differences support" }
      ]
    },
    {
      title: "Research & Information",
      icon: <BookOpen className="h-5 w-5" />,
      items: [
        { name: "BDA Dyscalculia Guidance", url: "https://www.bdadyslexia.org.uk/dyscalculia", description: "British Dyslexia Association resources" },
        { name: "International Dyscalculia Consortium", url: "https://dyscalculiaconsortium.org", description: "Research-based information and tools" },
        { name: "Learning Disabilities Association", url: "https://ldaamerica.org", description: "Educational resources and fact sheets" }
      ]
    },
    {
      title: "Practical Tools & Apps",
      icon: <Lightbulb className="h-5 w-5" />,
      items: [
        { name: "Photomath", url: "https://photomath.com", description: "Camera calculator for step-by-step solutions" },
        { name: "ModMath", url: "https://modmath.com", description: "Digital graph paper for organized calculations" },
        { name: "Number Line by ABCya", url: "https://www.abcya.com/games/number_line", description: "Interactive number line practice" }
      ]
    },
    {
      title: "Educational Resources",
      icon: <Globe className="h-5 w-5" />,
      items: [
        { name: "Khan Academy", url: "https://www.khanacademy.org", description: "Free math courses with visual explanations" },
        { name: "Number Talks", url: "https://numbertalks.com", description: "Mental math strategy development" },
        { name: "Which Number", url: "https://whichnumber.com", description: "Dyscalculia-friendly math games" }
      ]
    }
  ];

  const downloadableResources = [
    { title: "Dyscalculia Workplace Accommodation Guide", description: "A comprehensive guide for HR professionals and employees", size: "PDF · 2.1 MB" },
    { title: "Daily Number Strategies Checklist", description: "Practical tips for managing numbers in everyday life", size: "PDF · 850 KB" },
    { title: "Parent Advocacy Toolkit", description: "Resources for supporting children with dyscalculia", size: "PDF · 1.5 MB" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh" />
          <div className="container-custom relative z-10">
            <div className="mb-8">
              <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group" style={{ fontWeight: 500 }}>
                <ArrowLeft className="h-3.5 w-3.5 mr-1.5 group-hover:-translate-x-0.5 transition-transform" />
                Back to home
              </Link>
            </div>

            <div className="text-center space-y-5 mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/[0.08] border border-primary/15">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-[13px] text-primary" style={{ fontWeight: 500 }}>Free Resources</span>
              </div>
              
              <h1 className="text-[2.5rem] lg:text-[3.25rem] leading-[1.05] tracking-tight">
                Free Dyscalculia Resources
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                A curated collection of free tools, organizations, and resources to support your dyscalculia journey.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
              {[
                { value: "12+", label: "Trusted Organizations", color: "text-primary" },
                { value: "3", label: "Free Downloads", color: "text-accent" },
                { value: "100%", label: "Free Access", color: "text-primary" },
              ].map((stat, i) => (
                <div key={i} className="text-center p-5 bg-card rounded-2xl border border-border/40">
                  <div className={`text-2xl ${stat.color} mb-1`} style={{ fontWeight: 700 }}>{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Downloads */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <p className="text-xs text-primary uppercase tracking-widest mb-3" style={{ fontWeight: 600 }}>Downloads</p>
              <h2 className="text-3xl lg:text-4xl tracking-tight mb-4">Free Downloads</h2>
              <p className="text-muted-foreground max-w-md mx-auto">Practical guides and checklists you can download right now</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {downloadableResources.map((resource, index) => (
                <div key={index} className="p-6 bg-card rounded-2xl border border-border/40 hover:border-primary/20 transition-all duration-300 hover:shadow-custom hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 bg-primary/[0.08] rounded-xl flex items-center justify-center">
                      <Download className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-[11px] text-muted-foreground/60 bg-muted/50 px-2.5 py-1 rounded-full">
                      {resource.size}
                    </span>
                  </div>
                  <h3 className="text-[15px] mb-2" style={{ fontWeight: 600 }}>{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{resource.description}</p>
                  <Button className="w-full btn-primary group text-sm">
                    Download Free
                    <Download className="ml-2 h-3.5 w-3.5 group-hover:translate-y-0.5 transition-transform" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* External Resources */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-background" />
          <div className="container-custom relative z-10">
            <div className="text-center mb-12">
              <p className="text-xs text-primary uppercase tracking-widest mb-3" style={{ fontWeight: 600 }}>Curated links</p>
              <h2 className="text-3xl lg:text-4xl tracking-tight mb-4">Trusted Organizations & Tools</h2>
              <p className="text-muted-foreground max-w-md mx-auto">Carefully curated resources from established organizations</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {resources.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary/[0.08] rounded-xl flex items-center justify-center text-primary">
                      {category.icon}
                    </div>
                    <h3 className="text-lg" style={{ fontWeight: 600 }}>{category.title}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <a
                        key={itemIndex}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-5 bg-card rounded-2xl border border-border/40 hover:border-primary/20 transition-all duration-300 hover:shadow-custom group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm mb-1 group-hover:text-primary transition-colors" style={{ fontWeight: 600 }}>{item.name}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                          </div>
                          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors flex-shrink-0 ml-3 mt-0.5" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center p-10 lg:p-14 rounded-3xl bg-gradient-to-br from-primary/[0.06] via-background to-accent/[0.04] border border-primary/10">
              <h2 className="text-2xl lg:text-3xl tracking-tight mb-3">Keep Building Your Support Network</h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
                These resources are just the beginning. Every small step forward counts.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/">
                  <Button className="btn-primary px-7 py-3">Explore More</Button>
                </Link>
                <Link to="/#accommodations">
                  <Button variant="outline" className="btn-secondary px-7 py-3">View Accommodations</Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-center gap-4 mt-8">
                {["Always free", "Regularly updated", "Community verified"].map(label => (
                  <span key={label} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background">
        <div className="container-custom py-8 text-center space-y-2">
          <p className="text-xs text-background/30">
            © {new Date().getFullYear()} Count Me In · Information and support for dyscalculia awareness
          </p>
          <p className="text-xs text-background/30">
            made by{" "}
            <a href="https://luana.systems" target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary transition-colors">
              luana.systems
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}