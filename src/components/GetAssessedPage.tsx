import { useState } from "react";
import { Link } from "react-router";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  ExternalLink,
  ArrowRight,
  MapPin,
  Clock,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  FileText,
  Users,
  Lightbulb,
} from "lucide-react";
import { usePageMeta } from "../lib/usePageMeta";

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
    title: "1. Learn about dyscalculia",
    description:
      "Understand what dyscalculia is and isn't. Our self-check can help you reflect on your experiences.",
  },
  {
    icon: FileText,
    title: "2. Gather your history",
    description:
      "School reports, work challenges, examples of daily struggles with numbers. This context helps assessors.",
  },
  {
    icon: Users,
    title: "3. Choose a provider",
    description:
      "Use the directory below to find an assessment provider. Ask if they specialise in adult dyscalculia.",
  },
  {
    icon: CheckCircle,
    title: "4. Attend assessment",
    description:
      "Assessments typically take 2–3 hours and include various number-related tasks. It's thorough but not scary.",
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
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#F6EFE2]/60" />
        <div className="absolute top-32 -left-32 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[100px] pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full tape-label">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-[13px] text-primary" style={{ fontWeight: 500 }}>Get Assessed</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-[2.5rem] lg:text-[3.25rem] leading-[1.05] tracking-tight">
                  <span className="text-[#173F46]">Professional Assessment</span>
                </h1>
                <p className="text-xl text-muted-foreground" style={{ fontWeight: 500 }}>
                  The key to understanding and support
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                A professional dyscalculia assessment isn't just a label. It's
                access to accommodations, self-understanding, and strategies
                tailored to how your brain actually works.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/self-check">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-7 py-3 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group h-12">
                    Take Self-Check First
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a href="#providers">
                  <Button
                    variant="outline"
                    className="border-1.5 border-primary/25 text-primary hover:bg-primary/5 px-7 py-3 rounded-full transition-all duration-300 h-12"
                  >
                    View Providers
                  </Button>
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative paper-surface rounded-2xl p-2 overflow-hidden w-full max-w-md lg:max-w-full">
                <img
                  src="/differentbydesign2.png"
                  alt="A calm workspace with visual planning supports, calculator, checklist, and color-coded information."
                  className="w-full rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-[#F6EFE2]/35">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">How to Get Assessed</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Four straightforward steps from curiosity to clarity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <Card key={index} className="paper-card transition-all duration-300 hover:-translate-y-1 hover:shadow-custom">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-base mb-2" style={{ fontWeight: 600 }}>{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Providers */}
      <section id="providers" className="py-20 scroll-mt-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Assessment Providers</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Organisations that offer dyscalculia assessment for adults
            </p>
          </div>

          {/* Region Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2.5 rounded-full text-sm transition-all duration-200 ${
                  selectedRegion === region
                    ? "bg-primary text-white shadow-lg"
                    : "paper-card text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
                style={{ fontWeight: 500 }}
              >
                {region === "all" ? "All Regions" : region}
              </button>
            ))}
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {filtered.map((provider) => (
              <Card key={provider.name} className="paper-card transition-all duration-200 hover:shadow-custom">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg" style={{ fontWeight: 600 }}>{provider.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {provider.region}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {provider.service}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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

                    <div className="flex items-center gap-2">
                      <a
                        href={provider.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          className="rounded-full text-sm group"
                        >
                          Visit
                          <ExternalLink className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                      </a>
                      <button
                        onClick={() =>
                          setExpandedProvider(
                            expandedProvider === provider.name
                              ? null
                              : provider.name
                          )
                        }
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                        aria-label="Show more details"
                      >
                        {expandedProvider === provider.name ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {expandedProvider === provider.name && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {provider.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pricing Disclaimer */}
          <div className="max-w-4xl mx-auto mt-8 p-4 paper-surface rounded-xl">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong>Pricing disclaimer:</strong> Prices and wait times are
                approximate and were gathered from provider websites. Always
                check directly with providers for current pricing, availability,
                and whether they assess adults specifically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-[#F6EFE2]/35">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">What to Expect</h2>
            <p className="text-xl text-muted-foreground">
              A typical adult dyscalculia assessment
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Background interview (30–60 min)",
                description:
                  "The assessor will ask about your educational history, daily challenges with numbers, family history, and any existing diagnoses (like ADHD).",
              },
              {
                title: "Standardised tests (60–90 min)",
                description:
                  "You'll complete a series of number-related tasks: arithmetic, estimation, number sense, working memory. It's thorough but not intimidating.",
              },
              {
                title: "Report & recommendations (1–2 weeks after)",
                description:
                  "You'll receive a detailed report with findings, a diagnosis (if applicable), and tailored recommendations for accommodations and strategies.",
              },
            ].map((item, i) => (
              <Card key={i} className="paper-card">
                <CardContent className="p-6">
                  <h3 className="text-lg mb-2" style={{ fontWeight: 600 }}>{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center p-12 paper-surface rounded-2xl">
            <h2 className="text-3xl mb-4">Not Sure Yet?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              That's completely okay. Start with our self-check to reflect on
              your experiences, or explore our free resources to learn more about
              dyscalculia at your own pace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/self-check">
                <Button className="btn-primary px-8 py-3 text-lg">
                  Take the Self-Check
                </Button>
              </Link>
              <Link to="/free-resources">
                <Button variant="outline" className="px-8 py-3 text-lg">
                  Free Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
