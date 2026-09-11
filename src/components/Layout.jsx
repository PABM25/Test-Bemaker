import { useState } from "react";
import { Outlet } from "react-router-dom";
import { MessageCircle, X, Send } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "¡Hola! Soy el asistente virtual de BeMaker. ¿En qué te puedo ayudar hoy?" },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { from: "user", text },
      {
        from: "bot",
        text: "Gracias por tu mensaje. Un especialista de BeMaker te contactará muy pronto.",
      },
    ]);
    setText("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`mb-4 w-[300px] sm:w-[340px] rounded-2xl bg-card text-card-foreground border border-border/10 shadow-2xl shadow-secondary/30 overflow-hidden transition-all duration-300 origin-bottom-right ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none absolute"
        }`}
      >
        <div className="bg-secondary text-secondary-foreground px-5 py-4 flex items-center gap-3">
          <span className="relative w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-primary" />
          </span>
          <div>
            <h3 className="text-sm font-bold">BeMaker Bot</h3>
            <p className="text-xs text-secondary-foreground/60 flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full bg-primary"
                style={{ animation: "pulseGreen 2s infinite" }}
              />
              En línea
            </p>
          </div>
        </div>
        <div className="max-h-64 overflow-y-auto px-5 py-4 space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              style={{ animation: "fadeInMsg 0.4s ease-out both" }}
              className={`text-sm px-4 py-2.5 rounded-xl max-w-[85%] ${
                m.from === "bot"
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground ml-auto"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="flex items-center gap-2 px-4 py-3 border-t border-border/10">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 min-h-[40px] rounded-full bg-background border border-border/30 px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            type="submit"
            aria-label="Enviar"
            className="w-10 h-10 flex-shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      <button
        onClick={() => setOpen(!open)}
        aria-label="Abrir chat"
        className="w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-xl shadow-accent/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ml-auto"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>
    </div>
  );
}

export default function Layout() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}