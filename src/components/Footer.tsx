import { Link } from "react-router";
import { Mail, ArrowUpRight } from "lucide-react";
import logo from "figma:asset/7df1fcf1a964339a60566b3dcb8f4a1327784680.png";

export function Footer() {
  const linkClass = "text-background/50 hover:text-background/90 transition-colors duration-200 flex items-center gap-1 group";

  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="flex items-center space-x-2.5 group w-fit">
              <img
                src={logo}
                alt="Count Me In Logo"
                className="w-9 h-9 rounded-lg transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="text-sm text-background" style={{ fontWeight: 600 }}>Count Me In</span>
                <span className="text-[10px] text-background/40 uppercase tracking-widest">Dyscalculia</span>
              </div>
            </Link>
            <p className="text-sm text-background/50 max-w-xs leading-relaxed">
              Evidence-based information and support for understanding and navigating life with dyscalculia.
            </p>
            <a
              href="mailto:info@momops.org"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
              aria-label="Send us an email"
            >
              <Mail className="h-4 w-4" />
              Get in touch
              <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
            </a>
          </div>

          {/* Learn */}
          <nav className="lg:col-span-2 space-y-4" aria-label="Learn more about dyscalculia">
            <h4 className="text-[11px] text-background/30 uppercase tracking-widest" style={{ fontWeight: 600 }}>Learn</h4>
            <div className="space-y-3 text-sm">
              <Link to="/#understand" className={linkClass}>What is dyscalculia?</Link>
              <Link to="/about" className={linkClass}>About</Link>
              <Link to="/blog" className={linkClass}>Blog</Link>
              <Link to="/stories" className={linkClass}>Stories</Link>
            </div>
          </nav>

          {/* Resources */}
          <nav className="lg:col-span-3 space-y-4" aria-label="Dyscalculia resources">
            <h4 className="text-[11px] text-background/30 uppercase tracking-widest" style={{ fontWeight: 600 }}>Resources</h4>
            <div className="space-y-3 text-sm">
              <Link to="/#books" className={linkClass}>Essential books</Link>
              <Link to="/tools" className={linkClass}>Tools & Apps</Link>
              <Link to="/free-resources" className={linkClass}>Free resources</Link>
              <Link to="/store" className={linkClass}>Helpful gadgets</Link>
              <Link to="/ebook" className={linkClass}>Numbers Out of Place</Link>
              <Link to="/#accommodations" className={linkClass}>Accommodations</Link>
            </div>
          </nav>

          {/* Support */}
          <nav className="lg:col-span-3 space-y-4" aria-label="Dyscalculia support">
            <h4 className="text-[11px] text-background/30 uppercase tracking-widest" style={{ fontWeight: 600 }}>Support</h4>
            <div className="space-y-3 text-sm">
              <Link to="/self-check" className={linkClass}>Self-Check Quiz</Link>
              <Link to="/get-assessed" className={linkClass}>Get Assessed</Link>
              <Link to="/#accommodations" className={linkClass}>Workplace strategies</Link>
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/30">
            © {new Date().getFullYear()} Count Me In · Not a substitute for professional medical advice
          </p>
          <p className="text-xs text-background/30">
            made by{" "}
            <a
              href="https://luana.systems"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/70 hover:text-primary transition-colors"
            >
              luana.systems
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}