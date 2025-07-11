import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, XIcon, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import type { NavItem } from "@/types/types";
import logo from "@/assets/logo.png";
import { useCart } from "@/hooks/useCart";
import CartSidebar from "@/components/common/CartSidebar";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  const [cartBounce, setCartBounce] = useState(false);

  const isHomePage = location.pathname === "/" || location.pathname === "";

  useEffect(() => { 
    setIsScrolled(window.scrollY > 10);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart bounce animation when item count changes
  useEffect(() => {
    if (cart.itemCount > 0) {
      setCartBounce(true);
      const timer = setTimeout(() => setCartBounce(false), 600);
      return () => clearTimeout(timer);
    }
  }, [cart.itemCount]);

  const navItems: Pick<NavItem, 'key' | 'href'>[] = [
    { key: "home", href: "/" },
    { key: "products", href: "/products" },
    { key: "cart", href: "/cart" },
    { key: "services", href: "/services" },
    { key: "contact", href: "/contact" },
  ];

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
              {t(`nav.${item.key}`)}
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
          {/* Cart Button */}
          <motion.div
            animate={cartBounce ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cart.itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold"
                >
                  {cart.itemCount}
                </motion.span>
              )}
            </Button>
          </motion.div>

          {/* Language Switcher */}
          <div className="hidden md:flex">
            <LanguageSwitcher />
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
                    {t(`nav.${item.key}`)}
                  </Link>
                ))}
                
                {/* Mobile Language Switcher */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-center">
                    <LanguageSwitcher />
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </motion.header>
  );
}