import { Link } from "react-router";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  MdOutlineFavoriteBorder as Heart,
  MdOutlineAutoAwesome as Sparkles,
  MdOutlineStar as Star,
  MdOutlineMic as Mic,
  MdOutlinePalette as Palette,
  MdOutlineMovie as Film,
  MdOutlineMusicNote as Music,
  MdOutlineFormatQuote as Quote,
  MdArrowForward as ArrowRight,
} from "react-icons/md";
import { usePageMeta } from "../lib/usePageMeta";

const ease = [0.16, 1, 0.3, 1] as const;

interface FamousPerson {
  name: string;
  role: string;
  icon: typeof Star;
  quote: string;
  source: string;
  note: string;
}

const famousPeople: FamousPerson[] = [
  {
    name: "Cher",
    role: "Singer, Actress, Icon",
    icon: Music,
    quote:
      "I have dyscalculia... numbers and I have never been friends. I can barely dial a phone number.",
    source: "Publicly discussed in multiple interviews",
    note: "One of the first celebrities to openly discuss having both dyslexia and dyscalculia, helping raise awareness decades before most people had heard the word.",
  },
  {
    name: "Henry Winkler",
    role: "Actor, Author, Advocate",
    icon: Film,
    quote:
      "I was told I was stupid. I was told I was lazy. None of that was true.",
    source: "Discussed in interviews and his children's book series",
    note: "Best known as The Fonz, Winkler has spoken extensively about his learning differences including dyscalculia and dyslexia, and has authored children's books featuring neurodiverse characters.",
  },
  {
    name: "Robbie Williams",
    role: "Singer, Songwriter",
    icon: Mic,
    quote:
      "I have a problem with numbers. I genuinely cannot do maths. It's a real thing, dyscalculia.",
    source: "Discussed in public interviews",
    note: "The multi-platinum artist has been open about his dyscalculia and how it affected his schooling and daily life.",
  },
  {
    name: "Mick Hucknall",
    role: "Simply Red, Musician",
    icon: Music,
    quote:
      "I was terrible at maths. I later found out there was actually a reason for that.",
    source: "Discussed in interviews",
    note: "The Simply Red frontman has spoken about his struggles with numbers and his later understanding that dyscalculia was behind them.",
  },
  {
    name: "Bella Thorne",
    role: "Actress, Director, Author",
    icon: Palette,
    quote:
      "Having dyslexia and dyscalculia made school a nightmare. But it also made me more creative.",
    source: "Discussed publicly and on social media",
    note: "Has been vocal about her learning differences and how they shaped her creative approach to acting, writing, and directing.",
  },
  {
    name: "Mary Tyler Moore",
    role: "Actress, Television Pioneer",
    icon: Star,
    quote:
      "Numbers just didn't make sense to me the way words did.",
    source: "Referenced in biographical accounts",
    note: "The beloved actress reportedly lived with dyscalculia, navigating a hugely successful career while managing difficulties with numbers.",
  },
];

export function StoriesPage() {
  usePageMeta({
    title: "Famous People with Dyscalculia: Stories | Count Me In",
    description: "Discover celebrities and public figures with dyscalculia. From Cher to Bella Thorne. Real stories proving number differences don't define your worth.",
  });

  return (
    <div>
      {/* Hero */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-paper">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_70%_15%,rgba(0,150,136,0.07),transparent_65%)]" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="text-center space-y-6 max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full tape-label">
              <Heart className="h-3.5 w-3.5 text-accent" />
              <span className="text-[13px] text-ink" style={{ fontWeight: 500 }}>Stories & Faces of Dyscalculia</span>
            </div>

            <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.03] tracking-tight text-ink" style={{ fontWeight: 520 }}>
              You're <span className="italic" style={{ fontWeight: 420 }}>not alone</span>
            </h1>

            <p className="text-lg text-ink-muted leading-relaxed">
              From world-famous performers to everyday people navigating life
              with dyscalculia. These stories prove that a different
              relationship with numbers doesn't define your worth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quote wall */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-paper/35" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="text-center mb-16 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full tape-label">
              <Sparkles className="h-3.5 w-3.5 text-ink" />
              <span className="text-[13px] text-ink" style={{ fontWeight: 500 }}>Famous Faces</span>
            </div>
            <h2 className="font-display text-3xl lg:text-5xl tracking-tight text-ink" style={{ fontWeight: 520 }}>
              People you know who have dyscalculia
            </h2>
            <p className="text-lg text-ink-muted max-w-lg mx-auto leading-relaxed">
              Dyscalculia doesn't stop people from doing extraordinary things.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {famousPeople.map((person, i) => {
              const flip = i % 2 === 1;
              return (
                <motion.figure
                  key={person.name}
                  initial={{ opacity: 0, y: 32, x: flip ? 24 : -24 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease }}
                  className={`paper-card relative rounded-3xl p-8 sm:p-10 overflow-hidden ${
                    flip ? "sm:ml-16" : "sm:mr-16"
                  }`}
                >
                  <Quote
                    aria-hidden="true"
                    className={`absolute top-6 h-16 w-16 text-primary/[0.08] ${flip ? "right-8 -scale-x-100" : "left-8"}`}
                  />
                  <blockquote className="relative z-10 font-display text-[clamp(1.35rem,2.8vw,1.8rem)] leading-[1.35] text-ink mb-6" style={{ fontWeight: 480 }}>
                    "{person.quote}"
                  </blockquote>

                  <figcaption className="relative z-10 flex items-start gap-4">
                    <div className="p-2.5 bg-primary/10 rounded-xl flex-shrink-0">
                      <person.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-[15px] text-ink" style={{ fontWeight: 600 }}>{person.name}</span>
                        <span className="text-sm text-ink-muted"> · {person.role}</span>
                      </div>
                      <p className="text-sm text-ink-muted leading-relaxed">{person.note}</p>
                      <p className="text-xs text-ink-muted/60 italic">{person.source}</p>
                    </div>
                  </figcaption>
                </motion.figure>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-xs text-ink-muted mt-12 max-w-xl mx-auto leading-relaxed"
          >
            These attributions are based on public statements and interviews.
            Dyscalculia manifests differently in everyone, famous or not.
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
            className="text-center p-12 paper-surface rounded-3xl"
          >
            <h2 className="font-display text-3xl lg:text-4xl text-ink mb-4" style={{ fontWeight: 520 }}>Think this might be you?</h2>
            <p className="text-ink-muted mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Reading these stories and seeing yourself in them? Our self-check
              tool can help you reflect on your own experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/self-check">
                <Button className="bg-ink hover:bg-ink-soft text-white px-8 h-12 rounded-full shadow-lg group text-[15px]">
                  Take the Self-Check
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/get-assessed">
                <Button variant="outline" className="border-ink/20 text-ink hover:bg-ink/5 px-8 h-12 rounded-full text-[15px]">
                  Find Assessment Providers
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
