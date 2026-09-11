import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Moon, Sun, Store } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("bemaker-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <header
      className={`sticky top-0 z-50 bg-secondary text-secondary-foreground transition-all duration-300 ${
        scrolled ? "shadow-lg shadow-black/10 border-b border-border/10" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[68px]">
        <Link to="/" className="flex items-center min-h-[44px] group">
          <img
            src="/brand/LOGO%20BEMAKER-14%20copy.PNG"
            alt="BeMaker"
            className="brand-logo brand-logo-light h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <img
            src="/brand/LOGO%20BEMAKER-16%20copy.png"
            alt="BeMaker"
            className="brand-logo brand-logo-dark h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <nav className="hidden sm:flex items-center gap-8 text-sm font-medium">
          <a
            href="#about-nosotros"
            className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200"
          >
            Sobre Nosotros
          </a>
          <Link
            to="/Portafolio"
            className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200"
          >
            Portafolio
          </Link>
          <Link
            to="/Contacto"
            className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200"
          >
            Contacto
          </Link>
          <a
            href="#"
            className="flex items-center gap-2 text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200"
          >
            <Store className="w-4 h-4" />
            Ir a la tienda
          </a>
        </nav>

        <div className="hidden sm:flex items-center gap-4">
          <Link
            to="/Contacto"
            className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-full border border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Comenzar
          </Link>
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Cambiar tema"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary-foreground/5 hover:bg-secondary-foreground/10 text-secondary-foreground transition-colors duration-300"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-secondary-foreground hover:bg-secondary-foreground/10 w-11 h-11"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-secondary text-secondary-foreground border-border/10">
            <nav className="flex flex-col gap-6 mt-10 text-base font-medium">
              <a
                href="#about-nosotros"
                onClick={() => setOpen(false)}
                className="min-h-[44px] flex items-center text-secondary-foreground/85 hover:text-secondary-foreground"
              >
                Sobre Nosotros
              </a>
              <Link
                to="/Portafolio"
                onClick={() => setOpen(false)}
                className="min-h-[44px] flex items-center text-secondary-foreground/85 hover:text-secondary-foreground"
              >
                Portafolio
              </Link>
              <Link
                to="/Contacto"
                onClick={() => setOpen(false)}
                className="min-h-[44px] flex items-center text-secondary-foreground/85 hover:text-secondary-foreground"
              >
                Contacto
              </Link>
              <a
                href="#"
                onClick={() => setOpen(false)}
                className="min-h-[44px] flex items-center gap-3 text-secondary-foreground/85 hover:text-secondary-foreground"
              >
                <Store className="w-5 h-5" />
                Ir a la tienda
              </a>
              <div className="pt-4 mt-2 border-t border-border/10">
                <Link
                  to="/Contacto"
                  onClick={() => setOpen(false)}
                  className="w-full inline-flex items-center justify-center min-h-[44px] px-6 rounded-full border border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary text-sm font-semibold transition-all duration-300"
                >
                  Comenzar
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}