import { useState } from "react";
import { Link } from "react-router";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  ArrowRight,
  Clock,
  Tag,
  Search,
  BookOpen,
} from "lucide-react";
import { usePageMeta } from "../lib/usePageMeta";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  featured?: boolean;
}

const posts: BlogPost[] = [
  {
    id: "math-learning-disability-vs-anxiety",
    title: "Math Learning Disability vs Math Anxiety: Understanding the Difference",
    excerpt:
      "Is it dyscalculia or math anxiety? Learn the key differences between a math learning disability and anxiety about numbers, and why getting the right diagnosis matters.",
    category: "Understanding",
    readTime: "8 min",
    date: "April 2025",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBzdHVkZW50JTIwbWF0aCUyMGNvbmZ1c2lvbnxlbnwxfHx8fDE3NzMwOTY3NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: true,
  },
  {
    id: "what-is-dyscalculia",
    title: "What Is Dyscalculia? A Clear, Jargon-Free Explanation",
    excerpt:
      "Dyscalculia isn't being 'bad at maths.' It's a specific learning difference that affects how the brain processes numbers. Here's what that actually means in plain language.",
    category: "Understanding",
    readTime: "6 min",
    date: "April 2025",
    image:
      "https://images.unsplash.com/photo-1768335590901-9cf8b664db9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb3VybmFsJTIwd3JpdGluZyUyMHNlbGYlMjByZWZsZWN0aW9uJTIwbWluZGZ1bHxlbnwxfHx8fDE3NzMwOTY3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: true,
  },
  {
    id: "adhd-dyscalculia-overlap",
    title: "ADHD and Dyscalculia: Understanding the Overlap",
    excerpt:
      "Up to 40% of people with ADHD also have dyscalculia. The combination of attention challenges and number processing differences creates a unique double bind.",
    category: "ADHD",
    readTime: "8 min",
    date: "March 2025",
    image:
      "https://images.unsplash.com/photo-1742210959222-cfedb9cfa88a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHdvcmtpbmclMjBsYXB0b3AlMjBjb3p5JTIwaG9tZSUyMG9mZmljZXxlbnwxfHx8fDE3NzMwOTY3NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: true,
  },
  {
    id: "time-blindness-strategies",
    title: "5 Time-Blindness Strategies That Actually Work",
    excerpt:
      "Time-blindness isn't laziness, it's a real cognitive difference. These five visual and tactile strategies can help you manage time without relying on numbers.",
    category: "Strategies",
    readTime: "5 min",
    date: "March 2025",
    image:
      "https://images.unsplash.com/photo-1607823477495-682ec53827b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXN1YWwlMjB0aW1lciUyMGNvbG9yZnVsJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3MzA5MDg0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "women-dyscalculia-gender-gap",
    title: "Why Women With Dyscalculia Are Often Overlooked",
    excerpt:
      "The gender gap in neurodiversity diagnosis is real. Women are more likely to mask, compensate, and go undiagnosed. Here's why, and what needs to change.",
    category: "Research",
    readTime: "7 min",
    date: "February 2025",
    image:
      "https://images.unsplash.com/photo-1771924368443-1d53147edbd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwY29tbXVuaXR5JTIwc3VwcG9ydCUyMGdyb3VwfGVufDF8fHx8MTc3Mjk5NTUwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "workplace-accommodations-guide",
    title: "Asking for Dyscalculia Accommodations at Work",
    excerpt:
      "You have rights. Here's a practical guide to requesting workplace accommodations: what to say, who to approach, and what reasonable adjustments might look like.",
    category: "Workplace",
    readTime: "9 min",
    date: "February 2025",
    image:
      "https://images.unsplash.com/photo-1593444286621-98245b7d4530?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwc3ljaG9sb2d5JTIwYXNzZXNzbWVudCUyMG9mZmljZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzMwOTY3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "cooking-with-dyscalculia",
    title: "Cooking Without Numbers: Kitchen Hacks for Dyscalculia",
    excerpt:
      "Recipes assume you can measure, convert, and time things accurately. When you can't, cooking gets stressful. Here are colour-coded, visual strategies for the kitchen.",
    category: "Daily Life",
    readTime: "4 min",
    date: "January 2025",
    image:
      "https://images.unsplash.com/photo-1589313815891-3e32def41118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWFzdXJpbmclMjBjdXBzJTIwa2l0Y2hlbiUyMGNvbG9yZnVsfGVufDF8fHx8MTc3MzA5MDg0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

const allCategories = ["All", ...new Set(posts.map((p) => p.category))];

export function BlogPage() {
  usePageMeta({
    title: "Dyscalculia Blog: Articles & Strategies | Count Me In",
    description: "Articles about dyscalculia, ADHD, and neurodiversity. Practical strategies for daily life, workplace accommodations, and understanding number difficulties.",
  });

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = filtered.filter((p) => !p.featured || selectedCategory !== "All");

  return (
    <div>
      {/* Hero */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="container-custom relative z-10">
          <div className="text-center space-y-5 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/[0.08] border border-primary/15">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              <span className="text-[13px] text-primary" style={{ fontWeight: 500 }}>Blog & Articles</span>
            </div>

            <h1 className="text-[2.5rem] lg:text-[3.25rem] leading-[1.05] tracking-tight">
              <span className="text-gradient">Insights & Strategies</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Articles about dyscalculia, ADHD, neurodiversity, and practical
              strategies for daily life. Written with clarity and care.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-card border border-border/60 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 border-b border-border/30 sticky top-[72px] z-40 bg-background/95 backdrop-blur-sm">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-lg"
                    : "bg-card border text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
                style={{ fontWeight: 500 }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === "All" && searchQuery === "" && (
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-2xl mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="shadow-custom hover:shadow-hover transition-all duration-300 overflow-hidden group cursor-pointer"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge
                        variant="outline"
                        className="text-primary border-primary/30"
                      >
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {post.date}
                      </span>
                    </div>
                    <h3 className="text-xl mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="mt-4">
                      <span className="text-sm text-primary group-hover:underline" style={{ fontWeight: 500 }}>
                        Read article
                        <ArrowRight className="inline ml-1 h-3.5 w-3.5" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All/Filtered Posts */}
      <section className="py-16 bg-muted/20 border-y border-border/30">
        <div className="container-custom">
          <h2 className="text-2xl mb-8">
            {selectedCategory === "All" && searchQuery === ""
              ? "All Articles"
              : `${filtered.length} ${filtered.length === 1 ? "article" : "articles"} found`}
          </h2>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                No articles match your search.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(selectedCategory === "All" && searchQuery === ""
                ? posts
                : filtered
              ).map((post) => (
                <Card
                  key={post.id}
                  className="shadow-custom hover:shadow-hover transition-all duration-300 overflow-hidden group cursor-pointer"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge
                        variant="outline"
                        className="text-xs text-primary border-primary/30"
                      >
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-base mb-2 group-hover:text-primary transition-colors" style={{ fontWeight: 600 }}>
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-3">
                      <span className="text-xs text-primary" style={{ fontWeight: 500 }}>
                        Read more
                        <ArrowRight className="inline ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center p-12 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border">
            <h2 className="text-3xl mb-4">Stay in the Loop</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              New articles, strategies, and resources, delivered with care and
              zero spam. Join the Count Me In community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 bg-card border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full shadow-lg">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}