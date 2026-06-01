import { Link } from "react-router";
import { Button } from "./ui/button";
import { ArrowRight, Mail, MessageSquare, ClipboardCheck, HeartHandshake } from "lucide-react";
import { usePageMeta } from "../lib/usePageMeta";

const contactReasons = [
  {
    icon: MessageSquare,
    title: "Share lived experience",
    description: "Tell me what rings true, what feels missing, or what language feels more respectful.",
  },
  {
    icon: ClipboardCheck,
    title: "Join future validation",
    description: "I plan to use light user interviews to validate the self-check, tools, and explanations.",
  },
  {
    icon: HeartHandshake,
    title: "Suggest resources",
    description: "Send useful tools, books, supports, or organizations that helped you or someone you support.",
  },
];

export function ContactPage() {
  usePageMeta({
    title: "Contact Count Me In",
    description: "Contact Count Me In to share feedback, suggest resources, or take part in future user validation for this dyscalculia support project.",
  });

  return (
    <div>
      <section className="relative overflow-hidden bg-[#F6EFE2] pt-28 pb-20">
        <div className="absolute inset-0 opacity-80">
          <img
            src="/differentbydesign2.png"
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F6EFE2] via-[#F6EFE2]/88 to-[#F6EFE2]/35" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-2xl space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 tape-label">
              <Mail className="h-3.5 w-3.5 text-primary" />
              <span className="text-[13px] text-primary" style={{ fontWeight: 600 }}>Contact</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-[2.6rem] leading-[1.02] tracking-[-0.03em] text-[#173F46] sm:text-[4.5rem]">
                Help shape Count Me In.
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-[#2F4F52]">
                This is a personal project built from reading, lived curiosity, and careful synthesis. Feedback, stories, and user interviews will help make it more useful and more honest.
              </p>
            </div>

            <a href="mailto:info@momops.org?subject=Count%20Me%20In%20feedback">
              <Button className="h-12 bg-[#173F46] px-7 text-white hover:bg-[#225966]">
                Email Count Me In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-custom">
          <div className="grid gap-5 md:grid-cols-3">
            {contactReasons.map((item) => (
              <div key={item.title} className="paper-card rounded-2xl p-7">
                <div className="relative z-10 mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <h2 className="relative z-10 mb-2 text-lg text-[#173F46]" style={{ fontWeight: 600 }}>
                  {item.title}
                </h2>
                <p className="relative z-10 text-sm leading-relaxed text-[#496568]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 paper-surface rounded-3xl p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="mb-3 inline-flex rounded-full px-3 py-1.5 text-xs uppercase tracking-widest tape-label" style={{ fontWeight: 600 }}>
                  Validation note
                </p>
                <h2 className="text-3xl tracking-tight text-[#173F46]">Stories can come later. Testing can start small.</h2>
              </div>
              <div className="space-y-4 text-[#496568]">
                <p className="leading-relaxed">
                  For now, the best next step is simple: ask a few adults with number difficulty, ADHD, dyslexia, or late identification to walk through the self-check and tools pages.
                </p>
                <p className="leading-relaxed">
                  I would capture where they feel seen, where the wording feels too strong, and what practical support they expected but could not find.
                </p>
                <Link to="/self-check" className="inline-flex items-center text-sm text-primary" style={{ fontWeight: 600 }}>
                  Review the self-check
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
