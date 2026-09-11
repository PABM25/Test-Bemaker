import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, Compass, HeartHandshake, Sparkles, MessageSquare } from "lucide-react";

/* --- Custom Styles for Native Animations (WPO) --- */
const injectStyles = () => {
  if (typeof document === 'undefined') return;
  if (!document.getElementById('home-animations')) {
    const style = document.createElement('style');
    style.id = 'home-animations';
    style.innerHTML = `
      @keyframes floatA { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(3deg); } }
      @keyframes floatB { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-2deg); } }
      @keyframes floatC { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-10px) scale(1.05); } }
      @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      @keyframes scrollMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-50%)); } }
      @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    `;
    document.head.appendChild(style);
  }
};

/* ---------------- Scroll reveal wrapper ---------------- */
const AnimatedElement = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setIsVisible(true);
      return;
    }
    const fallback = setTimeout(() => setIsVisible(true), 800 + delay);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(fallback);
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 200px 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [delay]);
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className || ""}`}
    >
      {children}
    </div>
  );
};

/* ---------------- Hero ---------------- */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-secondary text-secondary-foreground min-h-[90vh] flex items-center">
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"
        style={{ animation: "floatA 10s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[120px] pointer-events-none"
        style={{ animation: "floatB 12s ease-in-out 2s infinite" }}
      />
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20 sm:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold leading-[1.1] tracking-tight mb-6">
            Desarrollo de Landing Pages y{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-[shimmer_4s_linear_infinite]">
              Automatización
            </span>{" "}
            para PYMEs
          </h1>
          <p className="text-base sm:text-lg text-secondary-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Soluciones web y móviles personalizadas para pequeñas empresas.
            Optimiza operaciones, llega a más clientes y escala con
            tecnología diseñada para tus necesidades.
          </p>
          <Link
            to="/Contacto"
            className="inline-flex items-center gap-2 min-h-[48px] px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-[0_0_30px_-5px_rgba(var(--primary),0.4)] hover:shadow-[0_0_40px_-5px_rgba(var(--primary),0.6)] hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_ease-in-out_infinite]" />
            <span className="relative z-10">Empieza ahora</span>
            <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Process / Flujo de trabajo ---------------- */
function ProcessSection() {
  const staticFallback = [
    { number: "01", title: "Idea & Estrategia", description: "Comprendemos tu negocio, tus metas y definimos el camino tecnológico más rentable para tu PYME." },
    { number: "02", title: "Diseño UX/UI", description: "Creamos interfaces accesibles, intuitivas y elegantes que cautivan a todo tipo de usuarios." },
    { number: "03", title: "Desarrollo", description: "Escribimos código limpio, robusto y escalable para que tu plataforma funcione sin fallos." },
    { number: "04", title: "Lanzamiento", description: "Desplegamos tu solución digital y te acompañamos para asegurar tu crecimiento continuo." },
  ];
  const items = staticFallback;

  return (
    <section className="relative bg-secondary py-20 sm:py-32 border-t border-border/5">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement className="text-center mb-16">
          <p className="text-accent font-semibold tracking-[0.2em] text-xs uppercase mb-4">
            Nuestro Flujo de Trabajo
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-secondary-foreground tracking-tight max-w-3xl mx-auto">
            Flujo de trabajo en Desarrollo Web y Automatización
          </h2>
        </AnimatedElement>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((step, index) => (
            <AnimatedElement key={step.id || index} delay={index * 100}>
              <article className="group relative h-full rounded-2xl bg-card/80 backdrop-blur-md text-card-foreground p-8 border border-border/10 hover:border-border/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 transition-opacity group-hover:opacity-10 pointer-events-none">
                  <span className="text-8xl font-black">{step.number}</span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-3 text-card-foreground">{step.title}</h3>
                  <p className="text-sm text-card-foreground/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index === items.length - 1 && (
                  <div className="absolute bottom-6 right-6 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-accent-foreground shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                )}
              </article>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- About / Historia ---------------- */
function AboutSection() {
  const pillars = [
    {
      icon: Eye,
      title: "Visión",
      description:
        "Ser el socio tecnológico de confianza para empresas que buscan transformar sus ideas en realidades digitales impactantes.",
      gradient: "from-primary/20 to-transparent",
    },
    {
      icon: Compass,
      title: "Misión",
      description:
        "Facilitar el éxito a través de soluciones de software innovadoras, rápidas y centradas absolutamente en el usuario final.",
      gradient: "from-accent/20 to-transparent",
    },
    {
      icon: HeartHandshake,
      title: "Valores",
      description:
        "Innovación, Colaboración, Calidad, Integridad y una profunda Pasión por la accesibilidad tecnológica.",
      gradient: "from-destructive/20 to-transparent",
    },
  ];

  return (
    <section id="about-nosotros" className="relative bg-background py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <AnimatedElement>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto mb-20 leading-relaxed">
            Somos mentes apasionadas dedicadas a construir el futuro. Creemos en el poder del diseño accesible para resolver problemas y en la tecnología para escalar negocios.
          </p>
        </AnimatedElement>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((p, index) => (
            <AnimatedElement key={p.title} delay={index * 150}>
              <div className="group relative h-full rounded-3xl bg-card border border-border/50 p-10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-b ${p.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto rounded-full bg-background border border-border flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:border-primary/30 transition-all duration-500">
                    <p.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h4 className="text-xl font-bold text-card-foreground mb-4">
                    {p.title}
                  </h4>
                  <p className="text-sm text-card-foreground/70 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    TestimonialEntity.list().then(setTestimonials).catch(() => {});
  }, []);
  const staticFallback = [
    { quote: "Gracias a BeMaker, pudimos digitalizar nuestro sistema de trazabilidad en tiempo récord. El diseño es increíblemente intuitivo.", author: "Lavandería DeLaCruz" },
    { quote: "Lograron entender lo que necesitábamos para gestionar nuestros inventarios y trabajos de manera eficiente. Su equipo es profesional y muy atento.", author: "Construcciones V&G" },
    { quote: "Soporte rápido y código impecable. Totalmente recomendados para cualquier PYME que quiera profesionalizarse.", author: "Construcciones V&G" },
  ];
  const items = testimonials.length > 0 ? testimonials : staticFallback;

  return (
    <section className="relative bg-background pb-24 sm:pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement className="text-center mb-16">
          <h2 className="text-muted-foreground text-lg sm:text-xl font-medium tracking-tight mb-4">
            Testimonios de empresas que ya dieron el salto digital.
          </h2>
        </AnimatedElement>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t, index) => (
            <AnimatedElement key={t.id || index} delay={index * 120}>
              <div className="h-full rounded-2xl bg-card text-card-foreground p-8 border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between">
                <div>
                  <Sparkles className="w-5 h-5 text-accent mb-6 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <p className="text-sm sm:text-base text-card-foreground/80 leading-relaxed italic mb-8">
                    "{t.quote}"
                  </p>
                </div>
                <h5 className="text-sm font-bold text-primary">
                  — {t.author}
                </h5>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Partners / Marquee ---------------- */
function PartnersSection() {
  const [partners, setPartners] = useState([]);
  useEffect(() => {
    PartnerEntity.list().then(setPartners).catch(() => {});
  }, []);
  const staticFallback = [
    { name: "Construcciones V&G", image_url: "https://media.base44.com/images/public/6aa31f5575f766e47f89b72f/ff0da3d74_bemaker_cl_Contru_436f585d.png" },
    { name: "DeLaCruz Lavandería", image_url: "https://media.base44.com/images/public/6aa31f5575f766e47f89b72f/84c97e7a6_bemaker_cl_delacruz_edb07b4f.png" },
  ];
  const items = partners.length > 0 ? partners : staticFallback;
  
  // Duplicate enough times to ensure seamless scrolling
  const marqueeItems = [...items, ...items, ...items, ...items, ...items, ...items];

  return (
    <section className="relative bg-muted/30 py-20 sm:py-24 border-y border-border/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <AnimatedElement className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Empresas que han confiado en nosotros
          </h2>
        </AnimatedElement>
      </div>
      
      <div className="relative overflow-hidden py-8">
        {/* Gradient masks for smooth fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div 
          className="flex items-center w-max"
          style={{ animation: "scrollMarquee 30s linear infinite" }}
        >
          {marqueeItems.map((p, i) => (
            <div key={i} className="flex-shrink-0 px-12">
              <img
                src={p.image_url}
                alt={p.name}
                loading="lazy"
                className="h-24 w-auto object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center mt-12">
        <Link
          to="/Portafolio"
          className="inline-flex items-center gap-2 min-h-[48px] px-8 py-3 rounded-full bg-foreground text-background font-semibold hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] active:scale-95 transition-all duration-300 group"
        >
          Descubre nuestro Portafolio completo
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CTASection() {
  return (
    <section className="relative bg-background py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[2rem] flex flex-col justify-between px-8 sm:px-16 py-16 sm:py-20 isolate bg-[#010066] text-white border-2 border-[#4AB0D9] shadow-[inset_0_0_90px_rgba(27,101,166,.18),0_0_28px_rgba(74,176,217,.72),0_0_110px_rgba(27,101,166,.3)]">
          {/* Glow orbs */}
          <div
            className="absolute rounded-full pointer-events-none -z-10"
            style={{
              width: "780px",
              height: "780px",
              right: "-260px",
              top: "-275px",
              background:
                "radial-gradient(circle, rgba(74,176,217,.28) 0, rgba(27,101,166,.1) 35%, transparent 70%)",
              filter: "blur(4px)",
              animation: "drift 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none -z-10"
            style={{
              width: "680px",
              height: "680px",
              left: "-290px",
              bottom: "-290px",
              background:
                "radial-gradient(circle, rgba(237,8,7,.18) 0, rgba(27,101,166,.08) 38%, transparent 72%)",
              animation: "drift 10s ease-in-out infinite reverse",
            }}
          />

          {/* Scan line */}
          <div
            className="absolute left-0 right-0 h-[2px] opacity-70"
            style={{
              background: "linear-gradient(90deg, transparent, #4AB0D9, transparent)",
              boxShadow: "0 0 16px #4AB0D9",
              animation: "scan 5s ease-in-out infinite",
            }}
          />

          {/* Corner brackets */}
          <div className="absolute w-[34px] h-[34px] border-[#4AB0D9] border-solid opacity-80" style={{ top: "20px", left: "20px", borderWidth: "2px 0 0 2px" }} />
          <div className="absolute w-[34px] h-[34px] border-[#4AB0D9] border-solid opacity-80" style={{ top: "20px", right: "20px", borderWidth: "2px 2px 0 0" }} />
          <div className="absolute w-[34px] h-[34px] border-[#4AB0D9] border-solid opacity-80" style={{ bottom: "20px", left: "20px", borderWidth: "0 0 2px 2px" }} />
          <div className="absolute w-[34px] h-[34px] border-[#4AB0D9] border-solid opacity-80" style={{ bottom: "20px", right: "20px", borderWidth: "0 2px 2px 0" }} />

          {/* Eyebrow */}
          <p
            className="relative z-10 text-[#4AB0D9] text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase"
            style={{ animation: "rise .7s ease both" }}
          >
            ¿Listo para construir?
          </p>

          {/* Copy */}
          <div className="relative z-10 max-w-[1040px] my-auto py-10">
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white"
              style={{ textShadow: "0 0 24px rgba(74,176,217,.35)", animation: "rise .8s .1s ease both" }}
            >
              ¿Listo para construir?
            </h2>
            <p
              className="text-white/70 text-base sm:text-lg max-w-xl leading-relaxed"
              style={{ animation: "rise .8s .2s ease both" }}
            >
              Convierte tu visión en una plataforma digital de alto impacto y
              escala tu negocio al siguiente nivel.
            </p>
          </div>

          {/* Action */}
          <Link
            to="/Contacto"
            className="group relative z-10 inline-flex items-center gap-5 w-max min-h-[56px] sm:min-h-[64px] px-8 sm:px-10 rounded-xl bg-[#1B65A6] border border-[#4AB0D9] text-white font-bold text-base sm:text-lg shadow-[0_0_18px_rgba(27,101,166,.72),inset_0_1px_0_rgba(255,255,255,.35)] hover:bg-[#4AB0D9] hover:shadow-[0_0_28px_rgba(74,176,217,.95),inset_0_1px_0_rgba(255,255,255,.5)] active:bg-[#1B65A6] active:shadow-[0_0_12px_rgba(74,176,217,.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4AB0D9] focus-visible:outline-offset-2 transition-all duration-300"
          >
            <span>Empezar proyecto</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-[5px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    injectStyles();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary">
      <HeroSection />
      <ProcessSection />
      <AboutSection />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
    </div>
  );
}