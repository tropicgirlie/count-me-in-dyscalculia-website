import { useState, useEffect, useRef, type ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { Menu, X, ArrowRight, ChevronDown, Sun, Moon, Type } from "lucide-react";
import { useTheme } from "../lib/theme-provider";
import { useFont } from "../lib/font-provider";
import logo from "figma:asset/7df1fcf1a964339a60566b3dcb8f4a1327784680.png";

// Theme toggle button component
function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
      aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

// Dyslexia font toggle button component
function FontToggle() {
  const { font, toggleDyslexiaFont } = useFont();
  
  return (
    <button
      onClick={toggleDyslexiaFont}
      className={`p-2 rounded-full transition-colors ${
        font === "dyslexia" 
          ? "text-primary bg-primary/10" 
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      }`}
      aria-label={font === "dyslexia" ? "Switch to default font" : "Switch to dyslexia-friendly font"}
      title={font === "dyslexia" ? "Dyslexia-friendly font enabled" : "Enable dyslexia-friendly font"}
    >
      <Type className="h-4 w-4" />
    </button>
  );
}

// Dropdown component with descriptions
interface DropdownItem {
  name: string;
  href: string;
  description?: string;
  isHash?: boolean;
}

function NavDropdown({ 
  label, 
  items, 
  active = false 
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
        className={`relative text-[13px] transition-all duration-200 px-3.5 py-1.5 rounded-full flex items-center gap-1 ${
          active ? 'text-primary bg-white shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-white/80 hover:shadow-sm'
        }`}
        style={{ fontWeight: 500 }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-elevated p-2 animate-fade-in z-50">
          {items.map((item) => (
            <NavDropdownLink key={item.name} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function NavDropdownLink({ item }: { item: DropdownItem }) {
  const location = useLocation();
  const isActive = location.pathname === item.href;
  const baseClasses = `block px-3.5 py-2.5 text-[13px] rounded-xl transition-all duration-200 ${
    isActive ? 'text-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
  }`;

  const content = (
    <>
      <div style={{ fontWeight: 500 }}>{item.name}</div>
      {item.description && <div className="text-[11px] text-muted-foreground/70 font-normal mt-0.5">{item.description}</div>}
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

  // Cognitive-load-optimized nav structure
  // Reduced from 8 items to 3 dropdowns + 1 standalone + CTA
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
    (isHome && ["#understand", "#books"].some(h => location.hash === h));
  const isToolsActive = location.pathname === "/tools" || location.pathname === "/get-assessed" ||
    (isHome && location.hash === "#accommodations");
  const isCommunityActive = ["/stories", "/about", "/contact"].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled
          ? 'glass-effect shadow-custom'
          : 'bg-background/60 backdrop-blur-sm'
        }
      `}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1200px] mx-auto" style={{ padding: '0 clamp(1.5rem, 4vw, 3rem)' }}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <img
              src={logo}
              alt="Count Me In Logo"
              className="w-9 h-9 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            />
            <div className="flex flex-col">
              <span className="text-[15px] text-foreground tracking-tight" style={{ fontWeight: 600 }}>Count Me In</span>
              <span className="text-[10px] text-muted-foreground/60 -mt-0.5 tracking-wide uppercase">Dyscalculia</span>
            </div>
          </Link>

          {/* Desktop Navigation - Reduced from 8 to 4 items + CTA */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center bg-muted/40 rounded-full px-1 py-1">
              {/* 1. Learn Dropdown */}
              <NavDropdown label="Learn" items={learnItems} active={isLearnActive} />

              {/* 2. Self-Check - Standalone (elevated per request) */}
              <Link
                to="/self-check"
                className={`relative text-[13px] transition-all duration-200 px-3.5 py-1.5 rounded-full ${
                  location.pathname === "/self-check"
                    ? 'text-primary bg-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/80 hover:shadow-sm'
                }`}
                style={{ fontWeight: 500 }}
              >
                Self-Check
              </Link>

              {/* 3. Tools & Help Dropdown */}
              <NavDropdown label="Tools & Help" items={toolsItems} active={isToolsActive} />

              {/* 4. Community Dropdown */}
              <NavDropdown label="Community" items={communityItems} active={isCommunityActive} />
            </div>
          </div>

          {/* Theme Toggle + Font Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            <FontToggle />
            <Link to="/ebook">
              <Button className="bg-primary hover:bg-primary/90 text-white text-[13px] px-5 py-2 h-9 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group">
                Get the Guide
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation - Collapsible sections with headers */}
        {isOpen && (
          <div className="lg:hidden py-3 bg-white/95 backdrop-blur-xl mt-1 rounded-2xl border border-border/50 shadow-elevated animate-fade-in mx-1 mb-2 max-h-[70vh] overflow-y-auto">
            {/* Learn Section */}
            <MobileSection title="Learn">
              <MobileLink href={isHome ? "#understand" : "/#understand"} isHash={isHome}>What is Dyscalculia?</MobileLink>
              <MobileLink href="/blog">Blog</MobileLink>
              <MobileLink href={isHome ? "#books" : "/#books"} isHash={isHome}>Books</MobileLink>
              <MobileLink href="/free-resources">Free Resources</MobileLink>
            </MobileSection>

            <div className="section-divider mx-5 my-2" />

            {/* Self-Check - Prominent */}
            <div className="px-5 py-1">
              <MobileLink href="/self-check" highlight>Self-Check</MobileLink>
            </div>

            <div className="section-divider mx-5 my-2" />

            {/* Tools & Help Section */}
            <MobileSection title="Tools & Help">
              <MobileLink href="/tools">Apps & Tools</MobileLink>
              <MobileLink href={isHome ? "#accommodations" : "/#accommodations"} isHash={isHome}>Accommodations</MobileLink>
              <MobileLink href="/get-assessed">Get Assessed</MobileLink>
            </MobileSection>

            <div className="section-divider mx-5 my-2" />

            {/* Community Section */}
            <MobileSection title="Community">
              <MobileLink href="/stories">Stories</MobileLink>
              <MobileLink href="/about">About</MobileLink>
              <MobileLink href="/contact">Contact</MobileLink>
            </MobileSection>

            <div className="px-4 pt-3 pb-2 mx-2">
              <Link to="/ebook" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full shadow-sm">
                  Get the Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Mobile section component
function MobileSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="px-5 py-1">
      <span className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-1 block" style={{ fontWeight: 600 }}>
        {title}
      </span>
      <div className="space-y-0.5">
        {children}
      </div>
    </div>
  );
}

// Mobile link component
function MobileLink({ 
  href, 
  children, 
  isHash = false, 
  highlight = false 
}: { 
  href: string; 
  children: ReactNode; 
  isHash?: boolean;
  highlight?: boolean;
}) {
  const location = useLocation();

  const baseClasses = `block px-3 py-2 text-sm rounded-xl transition-colors duration-200 ${
    highlight
      ? 'text-primary bg-primary/5 font-medium'
      : location.pathname === href
        ? 'text-primary bg-primary/5'
        : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
  }`;

  if (isHash) {
    return <a href={href} className={baseClasses} style={{ fontWeight: highlight ? 600 : 500 }}>{children}</a>;
  }
  return <Link to={href} className={baseClasses} style={{ fontWeight: highlight ? 600 : 500 }}>{children}</Link>;
}
