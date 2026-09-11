import { Link } from "react-router-dom";
import { Linkedin, Instagram, Facebook, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-secondary text-secondary-foreground border-t border-border/10">
      {/* Brand accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#010066] via-[#1B65A6] to-[#ED0807]" />

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-4 gap-10">
        <div className="sm:col-span-2">
          <Link to="/" className="inline-flex items-center min-h-[44px] mb-4">
            <img
              src="https://media.base44.com/images/public/6aa31f5575f766e47f89b72f/c6185d7fe_bemaker_cl_LOGO_BEMAKER-16_copy_548fdea4.png"
              alt="BeMaker"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextElementSibling.style.display = "inline";
              }}
              className="h-8 w-auto object-contain"
            />
            <span className="font-bold text-xl text-secondary-foreground" style={{ display: "none" }}>
              BeMaker
            </span>
          </Link>
          <p className="text-secondary-foreground/60 text-sm max-w-sm leading-relaxed">
            Desarrollo de landing pages y automatización para PYMEs. Tecnología
            a la medida para escalar tu negocio con confianza.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-secondary-foreground/50 mb-4">
            Navegación
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#about-nosotros" className="text-secondary-foreground/70 hover:text-primary transition-colors duration-200 min-h-[44px] inline-flex items-center">
                Sobre Nosotros
              </a>
            </li>
            <li>
              <Link to="/Portafolio" className="text-secondary-foreground/70 hover:text-primary transition-colors duration-200 min-h-[44px] inline-flex items-center">
                Portafolio
              </Link>
            </li>
            <li>
              <Link to="/Contacto" className="text-secondary-foreground/70 hover:text-primary transition-colors duration-200 min-h-[44px] inline-flex items-center">
                Contacto
              </Link>
            </li>
            <li>
              <a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors duration-200 min-h-[44px] inline-flex items-center">
                Ir a la tienda
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-secondary-foreground/50 mb-4">
            Síguenos
          </h4>
          <div className="flex items-center gap-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-secondary-foreground/5 hover:bg-[#ED0807] hover:text-white transition-colors duration-300"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-secondary-foreground/5 hover:bg-[#ED0807] hover:text-white transition-colors duration-300"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-secondary-foreground/5 hover:bg-[#ED0807] hover:text-white transition-colors duration-300"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-secondary-foreground/50 text-xs sm:text-sm text-center sm:text-left">
            © 2025 BeMaker. Todos los derechos reservados.
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}