import { Link } from "react-router";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { MdArrowForward as ArrowRight, MdOutlineMail as Mail, MdOutlineChatBubbleOutline as MessageSquare, MdOutlineAssignmentTurnedIn as ClipboardCheck, MdOutlineVolunteerActivism as HeartHandshake } from "react-icons/md";
import { usePageMeta } from "../lib/usePageMeta";

const ease = [0.16, 1, 0.3, 1] as const;

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
      <section className="relative overflow-hidden bg-paper pt-36 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_75%_15%,rgba(0,150,136,0.08),transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease }}
            className="max-w-2xl space-y-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 tape-label">
              <Mail className="h-3.5 w-3.5 text-ink" />
              <span className="text-[13px] text-ink" style={{ fontWeight: 500 }}>Contact</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-[clamp(2.6rem,6vw,4.25rem)] leading-[1.02] tracking-tight text-ink" style={{ fontWeight: 520 }}>
                Help shape <span className="italic" style={{ fontWeight: 420 }}>Count Me In.</span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
                This is a personal project built from reading, lived curiosity, and careful synthesis. Feedback, stories, and user interviews will help make it more useful and more honest.
              </p>
            </div>

            <a href="mailto:info@momops.org?subject=Count%20Me%20In%20feedback">
              <Button className="h-12 bg-ink px-7 text-white hover:bg-ink-soft shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group">
                Email Count Me In
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-custom">
          <div className="grid gap-5 md:grid-cols-3">
            {contactReasons.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease, delay: i * 0.09 }}
                className="paper-card rounded-2xl p-7 transition-all duration-300 hover:shadow-custom hover:-translate-y-1"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <h2 className="font-sans mb-2 text-lg text-ink" style={{ fontWeight: 600 }}>
                  {item.title}
                </h2>
                <p className="text-sm leading-relaxed text-ink-muted">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
            className="mt-12 paper-surface rounded-3xl p-8 lg:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="mb-3 inline-flex rounded-full px-3 py-1.5 text-xs uppercase tracking-widest tape-label" style={{ fontWeight: 600 }}>
                  Validation note
                </p>
                <h2 className="font-display text-3xl tracking-tight text-ink" style={{ fontWeight: 520 }}>Stories can come later. Testing can start small.</h2>
              </div>
              <div className="space-y-4 text-ink-muted">
                <p className="leading-relaxed">
                  For now, the best next step is simple: ask a few adults with number difficulty, ADHD, dyslexia, or late identification to walk through the self-check and tools pages.
                </p>
                <p className="leading-relaxed">
                  I would capture where they feel seen, where the wording feels too strong, and what practical support they expected but could not find.
                </p>
                <Link to="/self-check" className="inline-flex items-center text-sm text-primary group" style={{ fontWeight: 600 }}>
                  Review the self-check
                  <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
