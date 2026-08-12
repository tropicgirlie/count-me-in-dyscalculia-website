import React, { useRef } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MdOutlineStar as Star, MdOutlineOpenInNew as ExternalLink, MdOutlineMenuBook as BookOpen, MdOutlineGroups as Users, MdOutlineSchool as GraduationCap, MdOutlineLocalLibrary as Library } from "react-icons/md";
import { getBooks, type Book } from "../lib/data-store";

function useInView(_threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  return { ref, isVisible: true };
}

export function BooksSection() {
  const books = getBooks();
  const headerAnim = useInView();
  const gridAnim = useInView();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Academic Research": return GraduationCap;
      case "Personal Narrative": return Users;
      default: return BookOpen;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Academic Research": return "text-blue-600 bg-blue-50 border-blue-100";
      case "Educational Resource":
      case "Educational Guide":
      case "Teaching Resource": return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "Personal Narrative": return "text-purple-600 bg-purple-50 border-purple-100";
      case "Clinical Reference": return "text-red-600 bg-red-50 border-red-100";
      case "Practical Guide": return "text-orange-600 bg-orange-50 border-orange-100";
      default: return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-paper/25" />
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div
          ref={headerAnim.ref}
          className={`text-center mb-14 transition-all duration-700 ${headerAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full tape-label mb-5">
            <Library className="h-3.5 w-3.5 text-primary" />
            <span className="text-[13px] text-primary" style={{ fontWeight: 500 }}>Essential Reading</span>
          </div>
          <h2 className="text-3xl lg:text-4xl tracking-tight mb-5 text-ink">Essential Reading on Dyscalculia</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Carefully curated selection of valuable books, from academic research to practical guides.
          </p>
        </div>

        {/* Books Grid */}
        <div ref={gridAnim.ref} className="grid lg:grid-cols-2 gap-4 mb-20">
          {books.map((book, index) => (
            <div
              key={index}
              className={`group p-0 paper-card rounded-2xl hover:border-primary/20 overflow-hidden transition-all duration-300 hover:shadow-custom hover:-translate-y-1 ${gridAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Book Cover */}
                <div className="md:w-44 h-56 md:h-auto relative overflow-hidden bg-[#D7E6E3] flex-shrink-0">
                  <ImageWithFallback
                    src={book.image}
                    alt={`${book.title} book cover`}
                    className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-card/90 backdrop-blur-sm text-foreground text-[11px] px-2.5 py-1 rounded-full" style={{ fontWeight: 600 }}>
                      #{index + 1}
                    </span>
                  </div>
                </div>

                {/* Book Details */}
                <div className="flex-1 p-5 space-y-3">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="text-[15px] leading-tight line-clamp-2" style={{ fontWeight: 600 }}>{book.title}</h3>
                      <div className="flex items-center gap-1 text-xs flex-shrink-0">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span style={{ fontWeight: 600 }}>{book.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">by {book.author} ({book.year})</p>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Badge variant="outline" className={`text-[10px] ${getCategoryColor(book.category)}`}>
                      {React.createElement(getCategoryIcon(book.category), { className: "h-3 w-3 mr-1" })}
                      {book.category}
                    </Badge>
                    <Badge variant="outline" className="text-[10px]">
                      {book.audience}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {book.description}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <div className="text-[11px] text-muted-foreground/60">
                      {book.publisher} · ISBN: {book.isbn}
                    </div>
                    {book.link ? (
                      <a href={book.link} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/5 h-8 text-xs rounded-full px-3 group/btn">
                          Find book
                          <ExternalLink className="ml-1.5 h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Button>
                      </a>
                    ) : (
                      <Button variant="ghost" size="sm" className="text-muted-foreground h-8 text-xs rounded-full px-3">
                        Find book
                        <ExternalLink className="ml-1.5 h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Free Resources */}
        <div className="paper-surface rounded-3xl p-8 lg:p-10">
          <div className="text-center mb-8">
            <h3 className="text-xl lg:text-2xl tracking-tight mb-3" style={{ fontWeight: 600 }}>Free Resources</h3>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Access these valuable free resources to learn more about dyscalculia and get support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                title: "British Dyslexia Association",
                description: "Comprehensive information about dyscalculia and dyslexia support",
                url: "https://www.bdadyslexia.org.uk/dyscalculia",
                category: "Support"
              },
              {
                title: "Dyslexia Association Ireland",
                description: "Resources and support for learning differences in Ireland",
                url: "https://www.dyslexia.ie/information/dyscalculia/",
                category: "Support"
              },
              {
                title: "Number Race Game",
                description: "Free educational game to help with number sense development",
                url: "https://www.thenumberrace.com/",
                category: "Tools"
              },
              {
                title: "Dyscalculia Blog",
                description: "Personal experiences and practical tips from the dyscalculia community",
                url: "https://www.dyscalculiablog.org/",
                category: "Community"
              },
              {
                title: "Khan Academy Math",
                description: "Free math lessons with visual and step-by-step explanations",
                url: "https://www.khanacademy.org/math",
                category: "Tools"
              },
              {
                title: "Understood.org",
                description: "Learning and thinking differences support and resources",
                url: "https://www.understood.org/en/learning-thinking-differences/child-learning-disabilities/dyscalculia",
                category: "Support"
              },
              {
                title: "Cambridge Mathematics",
                description: "Research-based approaches to mathematics education",
                url: "https://www.cambridgemaths.org/",
                category: "Research"
              }
            ].map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 paper-card rounded-xl hover:shadow-custom transition-all duration-300 group hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm group-hover:text-primary transition-colors" style={{ fontWeight: 600 }}>
                    {resource.title}
                  </h4>
                  <ExternalLink className="h-3 w-3 text-muted-foreground/30 group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                </div>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2 leading-relaxed">
                  {resource.description}
                </p>
                <span className="text-[10px] text-muted-foreground/60 bg-muted/60 px-2 py-0.5 rounded-full">
                  {resource.category}
                </span>
              </a>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-xs text-muted-foreground/50">
              Know of a great resource? <a href="mailto:info@momops.org" className="text-primary hover:text-primary/80 transition-colors">Suggest a link</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
