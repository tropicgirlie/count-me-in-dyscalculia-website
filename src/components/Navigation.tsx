import { useState, useEffect, useRef, type ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { MdMenu, MdClose, MdArrowForward, MdExpandMore, MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "../lib/theme-provider";
import { useFont } from "../lib/font-provider";
import logo from "figma:asset/7df1fcf1a964339a60566b3dcb8f4a1327784680.png";

const spring = { type: "spring", stiffness: 380, damping: 32 } as const;

// Theme toggle button component
function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-ink/5 transition-colors"
      aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {resolvedTheme === "dark" ? <MdOutlineLightMode className="h-4 w-4" /> : <MdOutlineDarkMode className="h-4 w-4" />}
    </button>
  );
}

// Dyslexia font toggle button component
function FontToggle() {
  const { font, toggleDyslexiaFont } = useFont();

  return (
    <button
      onClick={toggleDyslexiaFont}
      className={`h-9 w-9 rounded-full transition-colors flex items-center justify-center ${
        font === "dyslexia"
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-ink/5"
      }`}
      aria-label={font === "dyslexia" ? "Switch to default font" : "Switch to dyslexia-friendly font"}
      aria-pressed={font === "dyslexia"}
      title={font === "dyslexia" ? "Dyslexia-friendly font enabled — click to switch back" : "Switch to dyslexia-friendly font (OpenDyslexic)"}
    >
      <span className="text-[15px] leading-none" style={{ fontWeight: 600, letterSpacing: "-0.02em" }} aria-hidden="true">
        Aa
      </span>
    </button>
  );
}

interface DropdownItem {
  name: string;
  href: string;
  description?: string;
  isHash?: boolean;
}

function NavDropdown({
  label,
  items,
  active = false,
}: {
  label: string;
  items: DropdownItem[];
  active?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative text-[13px] transition-colors duration-200 px-3.5 py-1.5 rounded-full flex items-center gap-1 ${
          active ? "text-ink" : "text-ink-muted hover:text-ink"
        }`}
        style={{ fontWeight: 500 }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {active && (
          <motion.span
            layoutId="nav-active-pill"
            className="absolute inset-0 rounded-full bg-ink/[0.07]"
            transition={spring}
          />
        )}
        <span className="relative z-10 flex items-center gap-1">
          {label}
          <MdExpandMore className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 mt-3 w-60 bg-card/95 backdrop-blur-xl border border-ink/10 rounded-2xl shadow-elevated p-2 z-50 origin-top"
          >
            {items.map((item) => (
              <NavDropdownLink key={item.name} item={item} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavDropdownLink({ item }: { item: DropdownItem }) {
  const location = useLocation();
  const isActive = location.pathname === item.href;
  const baseClasses = `block px-3.5 py-2.5 text-[13px] rounded-xl transition-all duration-200 ${
    isActive ? "text-primary bg-primary/5" : "text-ink-muted hover:text-ink hover:bg-ink/[0.04]"
  }`;

  const content = (
    <>
      <div style={{ fontWeight: 500 }}>{item.name}</div>
      {item.description && <div className="text-[11px] text-ink-muted/70 font-normal mt-0.5">{item.description}</div>}
    </>
  );

  if (item.isHash) {
    return <a href={item.href} className={baseClasses}>{content}</a>;
  }
  return <Link to={item.href} className={baseClasses}>{content}</Link>;
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const learnItems: DropdownItem[] = [
    { name: "What is Dyscalculia?", href: isHome ? "#understand" : "/#understand", isHash: isHome, description: "Learn the basics" },
    { name: "Blog", href: "/blog", description: "Articles & insights" },
    { name: "Books", href: isHome ? "#books" : "/#books", isHash: isHome, description: "Curated reading" },
    { name: "Free Resources", href: "/free-resources", description: "Helpful links" },
    { name: "Store", href: "/store", description: "Guides & products" },
  ];

  const toolsItems: DropdownItem[] = [
    { name: "Apps & Tools", href: "/tools", description: "Assistive technology" },
    { name: "Accommodations", href: isHome ? "#accommodations" : "/#accommodations", isHash: isHome, description: "Workplace strategies" },
    { name: "Get Assessed", href: "/get-assessed", description: "Find professionals" },
  ];

  const communityItems: DropdownItem[] = [
    { name: "Stories", href: "/stories", description: "Personal experiences" },
    { name: "About", href: "/about", description: "Our mission" },
    { name: "Contact", href: "/contact", description: "Get in touch" },
  ];

  const isLearnActive = ["/blog", "/free-resources"].includes(location.pathname) ||
    (isHome && ["#understand", "#books"].some((h) => location.hash === h));
  const isToolsActive = location.pathname === "/tools" || location.pathname === "/get-assessed" ||
    (isHome && location.hash === "#accommodations");
  const isCommunityActive = ["/stories", "/about", "/contact"].includes(location.pathname);
  const isSelfCheckActive = location.pathname === "/self-check";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3 left-0 right-0 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1240px] mx-auto" style={{ padding: "0 clamp(0.75rem, 3vw, 1.5rem)" }}>
        <div
          className={`
            flex items-center justify-between h-14 pl-4 pr-2 rounded-full border transition-all duration-500
            ${scrolled
              ? "bg-card/85 backdrop-blur-xl border-ink/10 shadow-elevated"
              : "bg-card/55 backdrop-blur-md border-ink/[0.06]"
            }
          `}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group shrink-0">
            <img
              src={logo}
              alt="Count Me In Logo"
              className="w-8 h-8 rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            />
            <div className="flex flex-col">
              <span className="text-[14px] text-ink tracking-tight leading-tight" style={{ fontWeight: 600 }}>Count Me In</span>
              <span className="text-[9px] text-ink-muted/70 -mt-px tracking-[0.14em] uppercase">Dyscalculia</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center rounded-full px-1 py-1">
              <NavDropdown label="Learn" items={learnItems} active={isLearnActive} />

              <Link
                to="/self-check"
                className={`relative text-[13px] transition-colors duration-200 px-3.5 py-1.5 rounded-full ${
                  isSelfCheckActive ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
                style={{ fontWeight: 500 }}
              >
                {isSelfCheckActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-ink/[0.07]"
                    transition={spring}
                  />
                )}
                <span className="relative z-10">Self-Check</span>
              </Link>

              <NavDropdown label="Tools & Help" items={toolsItems} active={isToolsActive} />
              <NavDropdown label="Community" items={communityItems} active={isCommunityActive} />
            </div>
          </div>

          {/* Toggles + CTA */}
          <div className="hidden lg:flex items-center gap-1.5">
            <ThemeToggle />
            <FontToggle />
            <Link to="/ebook" className="ml-1">
              <Button className="bg-ink hover:bg-ink-soft text-white text-[13px] px-5 h-9 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group">
                Get the Guide
                <MdArrowForward className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-full text-ink-muted hover:text-ink hover:bg-ink/5 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <MdClose className="h-5 w-5" /> : <MdMenu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden mt-2 py-3 bg-card/95 backdrop-blur-xl rounded-3xl border border-ink/10 shadow-elevated max-h-[70vh] overflow-y-auto origin-top"
            >
              <MobileSection title="Learn">
                <MobileLink href={isHome ? "#understand" : "/#understand"} isHash={isHome}>What is Dyscalculia?</MobileLink>
                <MobileLink href="/blog">Blog</MobileLink>
                <MobileLink href={isHome ? "#books" : "/#books"} isHash={isHome}>Books</MobileLink>
                <MobileLink href="/free-resources">Free Resources</MobileLink>
              </MobileSection>

              <div className="section-divider mx-5 my-2" />

              <div className="px-5 py-1">
                <MobileLink href="/self-check" highlight>Self-Check</MobileLink>
              </div>

              <div className="section-divider mx-5 my-2" />

              <MobileSection title="Tools & Help">
                <MobileLink href="/tools">Apps & Tools</MobileLink>
                <MobileLink href={isHome ? "#accommodations" : "/#accommodations"} isHash={isHome}>Accommodations</MobileLink>
                <MobileLink href="/get-assessed">Get Assessed</MobileLink>
              </MobileSection>

              <div className="section-divider mx-5 my-2" />

              <MobileSection title="Community">
                <MobileLink href="/stories">Stories</MobileLink>
                <MobileLink href="/about">About</MobileLink>
                <MobileLink href="/contact">Contact</MobileLink>
              </MobileSection>

              <div className="px-4 pt-3 pb-2 mx-2">
                <Link to="/ebook" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-ink hover:bg-ink-soft text-white px-6 py-2.5 rounded-full shadow-sm">
                    Get the Guide
                    <MdArrowForward className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

function MobileSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="px-5 py-1">
      <span className="text-[10px] text-ink-muted/50 uppercase tracking-widest mb-1 block" style={{ fontWeight: 600 }}>
        {title}
      </span>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function MobileLink({
  href,
  children,
  isHash = false,
  highlight = false,
}: {
  href: string;
  children: ReactNode;
  isHash?: boolean;
  highlight?: boolean;
}) {
  const location = useLocation();

  const baseClasses = `block px-3 py-2 text-sm rounded-xl transition-colors duration-200 ${
    highlight
      ? "text-primary bg-primary/5 font-medium"
      : location.pathname === href
        ? "text-primary bg-primary/5"
        : "text-ink-muted hover:text-ink hover:bg-ink/[0.04]"
  }`;

  if (isHash) {
    return <a href={href} className={baseClasses} style={{ fontWeight: highlight ? 600 : 500 }}>{children}</a>;
  }
  return <Link to={href} className={baseClasses} style={{ fontWeight: highlight ? 600 : 500 }}>{children}</Link>;
}
