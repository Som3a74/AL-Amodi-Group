import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, XIcon } from "lucide-react";
import { motion } from "framer-motion";
import type { NavItem } from "@/types/types";
import logo from "@/assets/logo.png";

export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ar'>('en');

  const isHomePage = location.pathname === "/" || location.pathname === "";

  useEffect(() => { 
    setIsScrolled(window.scrollY > 10);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Products", href: "/products" },
    { title: "Services", href: "/services" },
    { title: "Contact", href: "/contact" },
  ];

  const toggleLanguage = (lang: 'en' | 'ar') => {
    setCurrentLanguage(lang);
    // Here you can add language switching logic
  };

  return (
    <motion.header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled || !isHomePage
          ? "bg-background/80 backdrop-blur-md border-b border-gray-200 shadow-sm text-black/80"
          : "bg-transparent text-gray-100"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-bold text-xl tracking-tight"
        >
          <img src={logo} alt="AL Amodi Group" className="h-14 w-auto" />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-2",
              )}
            >
              {item.title}
              {location.pathname === item.href && (
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                  layoutId="navbar-indicator"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="hidden md:flex items-center gap-1 text-sm">
            <button
              onClick={() => toggleLanguage('en')}
              className={cn(
                "px-2 py-1 rounded transition-colors",
                currentLanguage === 'en' 
                  ? "text-primary font-semibold" 
                  : "hover:text-primary"
              )}
            >
              ENGLISH
            </button>
            <span className="text-muted-foreground">|</span>
            <button
              onClick={() => toggleLanguage('ar')}
              className={cn(
                "px-2 py-1 rounded transition-colors",
                currentLanguage === 'ar' 
                  ? "text-primary font-semibold" 
                  : "hover:text-primary"
              )}
            >
              العربية
            </button>
          </div>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Toggle Menu"
              >
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="px-0">
              <div className="px-7 flex items-center justify-between mb-6">
                <div className="font-bold text-xl">AL Amodi Group</div>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <XIcon className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
              </div>
              <nav className="flex flex-col px-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "py-3 text-base font-medium transition-colors hover:text-primary",
                      location.pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
                
                {/* Mobile Language Switcher */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 px-3">
                    <button
                      onClick={() => toggleLanguage('en')}
                      className={cn(
                        "px-3 py-2 rounded transition-colors text-sm",
                        currentLanguage === 'en' 
                          ? "text-primary font-semibold bg-primary/10" 
                          : "hover:text-primary"
                      )}
                    >
                      ENGLISH
                    </button>
                    <span className="text-muted-foreground">|</span>
                    <button
                      onClick={() => toggleLanguage('ar')}
                      className={cn(
                        "px-3 py-2 rounded transition-colors text-sm",
                        currentLanguage === 'ar' 
                          ? "text-primary font-semibold bg-primary/10" 
                          : "hover:text-primary"
                      )}
                    >
                      العربية
                    </button>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}