import { Button } from "./ui/button";
import { ExternalLink, Download, BookOpen, Users, Globe, Lightbulb } from "lucide-react";

export function FreeResourcesSection() {
  const resources = [
    {
      title: "Dyscalculia Support Organizations",
      icon: <Users className="h-6 w-6" />,
      items: [
        {
          name: "The Dyscalculia Association",
          url: "https://dyscalculia.me.uk",
          description: "UK-based support and information"
        },
        {
          name: "National Center for Learning Disabilities",
          url: "https://www.ncld.org",
          description: "US resources and advocacy"
        },
        {
          name: "Understood.org",
          url: "https://www.understood.org",
          description: "Comprehensive learning differences support"
        }
      ]
    },
    {
      title: "Research & Information",
      icon: <BookOpen className="h-6 w-6" />,
      items: [
        {
          name: "BDA Dyscalculia Guidance",
          url: "https://www.bdadyslexia.org.uk/dyscalculia",
          description: "British Dyslexia Association resources"
        },
        {
          name: "International Dyscalculia Consortium",
          url: "https://dyscalculiaconsortium.org",
          description: "Research-based information and tools"
        },
        {
          name: "Learning Disabilities Association",
          url: "https://ldaamerica.org",
          description: "Educational resources and fact sheets"
        }
      ]
    },
    {
      title: "Practical Tools & Apps",
      icon: <Lightbulb className="h-6 w-6" />,
      items: [
        {
          name: "Photomath",
          url: "https://photomath.com",
          description: "Camera calculator for step-by-step solutions"
        },
        {
          name: "ModMath",
          url: "https://modmath.com",
          description: "Digital graph paper for organized calculations"
        },
        {
          name: "Number Line by ABCya",
          url: "https://www.abcya.com/games/number_line",
          description: "Interactive number line practice"
        }
      ]
    },
    {
      title: "Educational Resources",
      icon: <Globe className="h-6 w-6" />,
      items: [
        {
          name: "Khan Academy",
          url: "https://www.khanacademy.org",
          description: "Free math courses with visual explanations"
        },
        {
          name: "Number Talks",
          url: "https://numbertalks.com",
          description: "Mental math strategy development"
        },
        {
          name: "Which Number",
          url: "https://whichnumber.com",
          description: "Dyscalculia-friendly math games"
        }
      ]
    }
  ];

  const downloadableResources = [
    {
      title: "Dyscalculia Workplace Accommodation Guide",
      description: "A comprehensive guide for HR professionals and employees",
      size: "PDF • 2.1 MB"
    },
    {
      title: "Daily Number Strategies Checklist",
      description: "Practical tips for managing numbers in everyday life",
      size: "PDF • 850 KB"
    },
    {
      title: "Parent Advocacy Toolkit",
      description: "Resources for supporting children with dyscalculia",
      size: "PDF • 1.5 MB"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container-custom">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold">Free Resources</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A curated collection of free tools, organizations, and resources to support your dyscalculia journey
          </p>
        </div>

        {/* Downloadable Resources */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-2">Free Downloads</h3>
            <p className="text-muted-foreground">Practical guides and checklists you can download right now</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {downloadableResources.map((resource, index) => (
              <div key={index} className="bg-card rounded-xl border p-6 hover:shadow-hover transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Download className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {resource.size}
                  </span>
                </div>
                <h4 className="font-semibold mb-2">{resource.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                <Button variant="outline" className="w-full group">
                  Download Free
                  <Download className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* External Resources */}
        <div className="grid lg:grid-cols-2 gap-8">
          {resources.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-semibold">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-card rounded-lg border p-4 hover:shadow-hover transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          Visit website
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border">
          <h3 className="text-2xl font-semibold mb-4">Want More Comprehensive Support?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            While these free resources are helpful, "Numbers Out of Place" provides a complete, 
            personal guide with detailed strategies, real stories, and practical tools specifically 
            designed for adults with dyscalculia and ADHD.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#ebook-page">
              <Button className="btn-primary px-8 py-3">
                Get Numbers Out of Place - £29.99
              </Button>
            </a>
            <a href="#ebook-page">
              <Button variant="outline" className="px-8 py-3">
                Preview Sample
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}