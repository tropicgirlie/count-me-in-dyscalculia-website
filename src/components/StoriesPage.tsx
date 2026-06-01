import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  ArrowRight,
  Heart,
  Sparkles,
  Star,
  Mic,
  Palette,
  Film,
  Music,
} from "lucide-react";
import { usePageMeta } from "../lib/usePageMeta";

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
      <section className="pt-24 pb-16 relative overflow-hidden bg-[#F6EFE2]">
        <div className="absolute inset-0 opacity-55">
          <img src="/abstracthero.png" alt="" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F6EFE2]/90 via-[#F6EFE2]/82 to-[#F6EFE2]" />
        </div>
        <div className="container-custom relative z-10">
          <div className="text-center space-y-5 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full tape-label">
              <Heart className="h-3.5 w-3.5 text-accent" />
              <span className="text-[13px] text-accent" style={{ fontWeight: 500 }}>Stories & Faces of Dyscalculia</span>
            </div>

            <h1 className="text-[2.5rem] lg:text-[3.25rem] leading-[1.05] tracking-tight">
              <span className="text-[#173F46]">You're Not Alone</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              From world-famous performers to everyday people navigating life
              with dyscalculia. These stories prove that a different
              relationship with numbers doesn't define your worth.
            </p>
          </div>
        </div>
      </section>

      {/* Famous People */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#F6EFE2]/35" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full tape-label">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-[13px] text-primary" style={{ fontWeight: 500 }}>Famous Faces</span>
            </div>
            <h2 className="text-3xl lg:text-4xl tracking-tight">People you know who have dyscalculia</h2>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Dyscalculia doesn't stop people from doing extraordinary things.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {famousPeople.map((person) => (
              <Card key={person.name} className="paper-card transition-all duration-300 hover:-translate-y-1 hover:shadow-custom">
                <CardContent className="p-7">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative z-10 p-2.5 bg-primary/10 rounded-xl flex-shrink-0">
                      <person.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg">{person.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {person.role}
                      </p>
                    </div>
                  </div>

                  <blockquote className="relative z-10 text-sm leading-relaxed italic text-foreground/80 mb-4 pl-4 border-l-2 border-primary/20">
                    "{person.quote}"
                  </blockquote>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {person.note}
                  </p>

                  <p className="text-xs text-muted-foreground/70 italic">
                    {person.source}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-10 max-w-xl mx-auto leading-relaxed">
            These attributions are based on public statements and interviews.
            Dyscalculia manifests differently in everyone, famous or not.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center p-12 paper-surface rounded-2xl">
            <h2 className="text-3xl mb-4">Think This Might Be You?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Reading these stories and seeing yourself in them? Our self-check
              tool can help you reflect on your own experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/self-check">
                <Button className="btn-primary px-8 py-3 text-lg">
                  Take the Self-Check
                </Button>
              </Link>
              <Link to="/get-assessed">
                <Button variant="outline" className="px-8 py-3 text-lg">
                  Find Assessment Providers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}