import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  MdArrowForward as ArrowRight,
  MdOutlineSchedule as Clock,
  MdOutlineSearch as Search,
  MdOutlineMenuBook as BookOpen,
} from "react-icons/md";
import { usePageMeta } from "../lib/usePageMeta";

const ease = [0.16, 1, 0.3, 1] as const;

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

function CategoryChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs" style={{ fontWeight: 600 }}>
      {label}
    </span>
  );
}

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
  const isDefaultView = selectedCategory === "All" && searchQuery === "";

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
            className="text-center space-y-6 max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full tape-label">
              <BookOpen className="h-3.5 w-3.5 text-ink" />
              <span className="text-[13px] text-ink" style={{ fontWeight: 500 }}>Blog & Articles</span>
            </div>

            <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.03] tracking-tight text-ink" style={{ fontWeight: 520 }}>
              Insights & <span className="italic" style={{ fontWeight: 420 }}>strategies</span>
            </h1>

            <p className="text-lg text-ink-muted leading-relaxed">
              Articles about dyscalculia, ADHD, neurodiversity, and practical
              strategies for daily life. Written with clarity and care.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-ink/12 rounded-full text-sm text-ink shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-3 border-b border-ink/8 sticky top-20 z-40 bg-background/85 backdrop-blur-md">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-ink text-white shadow-md"
                    : "bg-white border border-ink/10 text-ink-muted hover:text-ink hover:border-ink/30"
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
      {isDefaultView && (
        <section className="py-16 lg:py-20">
          <div className="container-custom">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease }}
              className="font-display text-2xl lg:text-3xl text-ink mb-8" style={{ fontWeight: 520 }}
            >
              Featured articles
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, ease, delay: i * 0.08 }}
                  className="paper-card rounded-3xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-custom hover:-translate-y-1"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <CategoryChip label={post.category} />
                      <span className="text-xs text-ink-muted flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                      <span className="text-xs text-ink-muted">{post.date}</span>
                    </div>
                    <h3 className="font-display text-xl lg:text-2xl text-ink mb-3 group-hover:text-primary transition-colors" style={{ fontWeight: 520 }}>
                      {post.title}
                    </h3>
                    <p className="text-ink-muted leading-relaxed">{post.excerpt}</p>
                    <div className="mt-4">
                      <span className="inline-flex items-center gap-1 text-sm text-primary group-hover:underline" style={{ fontWeight: 500 }}>
                        Read article
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All/Filtered Posts */}
      <section className="py-16 lg:py-20 bg-paper/35 border-y border-ink/8">
        <div className="container-custom">
          <h2 className="font-display text-2xl lg:text-3xl text-ink mb-8" style={{ fontWeight: 520 }}>
            {isDefaultView
              ? "All articles"
              : `${filtered.length} ${filtered.length === 1 ? "article" : "articles"} found`}
          </h2>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-ink-muted mb-4">No articles match your search.</p>
              <Button
                variant="outline"
                className="border-ink/20 text-ink hover:bg-ink/5 rounded-full"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {(isDefaultView ? posts : filtered).map((post) => (
                  <motion.article
                    layout
                    key={post.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, ease }}
                    className="paper-card rounded-3xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-custom hover:-translate-y-1"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <CategoryChip label={post.category} />
                        <span className="text-xs text-ink-muted flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-display text-lg text-ink mb-2 group-hover:text-primary transition-colors" style={{ fontWeight: 520 }}>
                        {post.title}
                      </h3>
                      <p className="text-sm text-ink-muted leading-relaxed line-clamp-3">{post.excerpt}</p>
                      <div className="mt-3">
                        <span className="inline-flex items-center gap-1 text-xs text-primary" style={{ fontWeight: 500 }}>
                          Read more
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
            className="text-center p-12 paper-surface rounded-3xl"
          >
            <h2 className="font-display text-3xl lg:text-4xl text-ink mb-4" style={{ fontWeight: 520 }}>Stay in the loop</h2>
            <p className="text-ink-muted mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              New articles, strategies, and resources, delivered with care and
              zero spam. Join the Count Me In community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 bg-white border border-ink/12 rounded-full text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary"
              />
              <Button className="bg-ink hover:bg-ink-soft text-white px-8 h-12 rounded-full shadow-lg">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-ink-muted mt-3">No spam, ever. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
