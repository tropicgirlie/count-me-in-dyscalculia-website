import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { MdOutlineOpenInNew as ExternalLink, MdOutlineDownload as Download, MdOutlineMenuBook as BookOpen, MdOutlineGroups as Users, MdOutlinePublic as Globe, MdOutlineLightbulb as Lightbulb, MdOutlineAutoAwesome as Sparkles, MdArrowForward as ArrowRight } from "react-icons/md";
import { Link } from "react-router";
import { usePageMeta } from "../lib/usePageMeta";

const ease = [0.16, 1, 0.3, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, ease },
} as const;

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
    <div>
      {/* Hero */}
      <section className="pt-36 pb-16 relative overflow-hidden bg-paper">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_70%_15%,rgba(0,150,136,0.07),transparent_65%)]" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full tape-label">
              <Sparkles className="h-3.5 w-3.5 text-ink" />
              <span className="text-[13px] text-ink" style={{ fontWeight: 500 }}>Free Resources</span>
            </div>

            <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.03] tracking-tight text-ink" style={{ fontWeight: 520 }}>
              Free dyscalculia <span className="italic" style={{ fontWeight: 420 }}>resources</span>
            </h1>

            <p className="text-lg text-ink-muted max-w-xl mx-auto leading-relaxed">
              A curated collection of free tools, organizations, and resources to support your dyscalculia journey.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto pt-2">
              {[
                { value: "12+", label: "Trusted Organizations" },
                { value: "3", label: "Free Downloads" },
                { value: "100%", label: "Free Access" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease, delay: 0.2 + i * 0.08 }}
                  className="text-center p-5 paper-card rounded-2xl"
                >
                  <div className="numeral text-3xl text-ink mb-1 tabular-nums" style={{ fontWeight: 500 }}>{stat.value}</div>
                  <div className="text-xs text-ink-muted">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div {...reveal} className="text-center mb-12">
            <p className="mx-auto mb-3 inline-flex rounded-full px-3 py-1.5 text-xs uppercase tracking-widest tape-label" style={{ fontWeight: 600 }}>Downloads</p>
            <h2 className="font-display text-3xl lg:text-4xl tracking-tight text-ink mb-4" style={{ fontWeight: 520 }}>Free downloads</h2>
            <p className="text-ink-muted max-w-md mx-auto">Practical guides and checklists you can download right now</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {downloadableResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease, delay: index * 0.08 }}
                className="p-6 paper-card rounded-2xl transition-all duration-300 hover:shadow-custom hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Download className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-[11px] text-ink-muted/60 bg-ink/[0.05] px-2.5 py-1 rounded-full">
                    {resource.size}
                  </span>
                </div>
                <h3 className="font-sans text-[15px] text-ink mb-2" style={{ fontWeight: 600 }}>{resource.title}</h3>
                <p className="text-sm text-ink-muted mb-5 leading-relaxed">{resource.description}</p>
                <Button className="w-full bg-ink hover:bg-ink-soft text-white rounded-full group text-sm">
                  Download Free
                  <Download className="ml-2 h-3.5 w-3.5 group-hover:translate-y-0.5 transition-transform" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-paper/35" />
        <div className="container-custom relative z-10">
          <motion.div {...reveal} className="text-center mb-12">
            <p className="mx-auto mb-3 inline-flex rounded-full px-3 py-1.5 text-xs uppercase tracking-widest tape-label" style={{ fontWeight: 600 }}>Curated links</p>
            <h2 className="font-display text-3xl lg:text-4xl tracking-tight text-ink mb-4" style={{ fontWeight: 520 }}>Trusted organizations & tools</h2>
            <p className="text-ink-muted max-w-md mx-auto">Carefully curated resources from established organizations</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {resources.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease, delay: (categoryIndex % 2) * 0.08 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    {category.icon}
                  </div>
                  <h3 className="font-sans text-lg text-ink" style={{ fontWeight: 600 }}>{category.title}</h3>
                </div>

                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <a
                      key={itemIndex}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-5 paper-card rounded-2xl transition-all duration-300 hover:shadow-custom hover:-translate-y-0.5 group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm text-ink mb-1 group-hover:text-primary transition-colors" style={{ fontWeight: 600 }}>{item.name}</h4>
                          <p className="text-sm text-ink-muted leading-relaxed">{item.description}</p>
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 text-ink-muted/30 group-hover:text-primary transition-colors flex-shrink-0 ml-3 mt-0.5" />
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div {...reveal} className="text-center p-10 lg:p-14 rounded-3xl paper-surface">
            <h2 className="font-display text-2xl lg:text-3xl text-ink tracking-tight mb-3" style={{ fontWeight: 520 }}>Keep building your support network</h2>
            <p className="text-ink-muted mb-8 max-w-lg mx-auto leading-relaxed">
              These resources are just the beginning. Every small step forward counts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-ink hover:bg-ink-soft text-white px-8 h-12 rounded-full shadow-lg group">
                  Explore More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/#accommodations">
                <Button variant="outline" className="border-ink/20 text-ink hover:bg-ink/5 px-8 h-12 rounded-full">
                  View Accommodations
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              {["Always free", "Regularly updated", "Community verified"].map(label => (
                <span key={label} className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
