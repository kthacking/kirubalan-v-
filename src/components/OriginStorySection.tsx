import { useRef, useCallback, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { assetsMap } from '../assetsMap';

// ─── Step Data ─────────────────────────────────────────────
const steps = [
  {
    label: "START",
    icon: "🎮",
    title: "Game Hacker",
    desc: "In sixth grade, I started recording GTA gameplay for YouTube. When the screen recorder failed, I fixed it myself. I found Cheat Engine, modified game memory values, and gave myself infinite cash. That one hack sparked everything.",
    accent: "#f59e0b",
    foldFrom: "#00d2a0",
    foldTo: "#00957a",
    num: "01",
  },
  {
    label: "LEVEL UP",
    icon: "🔓",
    title: "Kali Linux Explorer",
    desc: "Moved to TG32, started learning real hacking — discovered Kali Linux, explored ESP32, NodeMcu, and system-level hacking. The terminal became home.",
    accent: "#f59e0b",
    foldFrom: "#f5c842",
    foldTo: "#d97706",
    num: "02",
  },
  {
    label: "PIVOT",
    icon: "🌐",
    title: "Web Developer",
    desc: "Crossed into web development — because the web gave instant output. Seeing results in the browser, immediately, was as addictive as gaming. Never stopped building since.",
    accent: "#f59e0b",
    foldFrom: "#a855f7",
    foldTo: "#6d28d9",
    num: "03",
  },
  {
    label: "NOW",
    icon: "🛠",
    title: "Tool Builder",
    desc: "From game hacker → Kali explorer → web dev → tool builder. Curiosity has always been the engine. Now, I build tools that my friends and peers rely on every day.",
    accent: "#f59e0b",
    foldFrom: "#ff6b35",
    foldTo: "#c0392b",
    num: "04",
  },
];

// ─── Hex Grid Background (Canvas - Reactive) ───────────────
const HexGridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const hexesRef = useRef<{ cx: number; cy: number; path: Path2D }[]>([]);

  const HEX_SIZE = 48; // radius
  const GAP = 2;

  const buildHexPath = (cx: number, cy: number, r: number) => {
    const path = new Path2D();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 180) * (60 * i - 30);
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) path.moveTo(x, y);
      else path.lineTo(x, y);
    }
    path.closePath();
    return path;
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x: mx, y: my } = mouseRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hexesRef.current.forEach(({ cx, cy, path }) => {
      const dist = Math.hypot(mx - cx, my - cy);
      const threshold = 180;
      const glow = Math.max(0, 1 - dist / threshold);

      // Base hex background (very subtle white/grey)
      ctx.fillStyle = "#ffffff";
      ctx.fill(path);

      // Reactive glow (warm gold/amber)
      if (glow > 0) {
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, HEX_SIZE);
        grad.addColorStop(0, `rgba(255, 179, 0, ${glow * 0.35})`);
        grad.addColorStop(0.5, `rgba(255, 150, 0, ${glow * 0.12})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fill(path);
      }

      // Border stroke
      ctx.strokeStyle = glow > 0.1 
        ? `rgba(255, 160, 0, ${0.05 + glow * 0.3})`
        : "rgba(229, 231, 235, 0.4)"; // light grey border #e5e7eb
      ctx.lineWidth = glow > 0.1 ? 1.5 : 0.8;
      ctx.stroke(path);
    });
  }, []);

  const buildGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.width;
    const H = canvas.height;
    const r = HEX_SIZE - GAP / 2;
    const colW = Math.sqrt(3) * HEX_SIZE;
    const rowH = 1.5 * HEX_SIZE;

    const hexes: typeof hexesRef.current = [];
    const cols = Math.ceil(W / colW) + 2;
    const rows = Math.ceil(H / rowH) + 2;

    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const cx = col * colW + (row % 2 === 0 ? 0 : colW / 2);
        const cy = row * rowH;
        hexes.push({ cx, cy, path: buildHexPath(cx, cy, r) });
      }
    }
    hexesRef.current = hexes;
  }, []);

  const loop = useCallback(() => {
    draw();
    rafRef.current = requestAnimationFrame(loop);
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        buildGrid();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    resize();
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, [buildGrid, loop]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
};

// ─── CSS Styles ───────────────────────────────────────────
const CARD_CSS = `
.pf-card {
  position: relative;
  background: rgba(0, 0, 0, 0);
  backdrop-filter: blur(14px) saturate(180%);
  -webkit-backdrop-filter: blur(14px) saturate(180%);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 20px;
  padding: 38px 34px 68px 34px;
  overflow: hidden;
  cursor: default;
  will-change: transform, box-shadow;
  box-shadow: 
    inset 0 0 24px rgba(245, 180, 0, 0.08),
    0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.5s cubic-bezier(0.34, 1.4, 0.64, 1);
  z-index: 2;
}

.pf-card:hover {
  transform: translateY(-8px) scale(1.015);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.1),
    0 0 40px rgba(255, 180, 0, 0.25);
  border-color: rgba(245, 158, 11, 0.45);
}

.pf-card::before {
  content: "";
  position: absolute;
  bottom: 0; right: 0;
  width: 60px; height: 60px;
  background: rgba(0, 0, 0, 0.15);
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
  z-index: 1;
  border-radius: 0 0 20px 0;
  filter: blur(6px);
  transition: all 0.45s cubic-bezier(0.34, 1.3, 0.64, 1);
}

.pf-card::after {
  content: "";
  position: absolute;
  bottom: 0; right: 0;
  width: 58px; height: 58px;
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
  z-index: 2;
  border-radius: 0 0 20px 0;
  box-shadow: -3px -3px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.45s cubic-bezier(0.34, 1.3, 0.64, 1);
}
 .pf-card{
  cursor: auto;
}
.pf-card:hover::before { width: 96px; height: 96px; }
.pf-card:hover::after  { width: 92px; height: 92px; }

.pf-1::after { background: linear-gradient(135deg, #00d2a0, #00957a); }
.pf-2::after { background: linear-gradient(135deg, #f5c842, #d97706); }
.pf-3::after { background: linear-gradient(135deg, #a855f7, #6d28d9); }
.pf-4::after { background: linear-gradient(135deg, #ff6b35, #c0392b); }
`;

// ─── Paper Fold Card Component ─────────────────────────────
const PaperFoldCard = ({ step, idx }: { step: (typeof steps)[0]; idx: number }) => (
  <div className={`pf-card pf-${idx + 1}`} style={{background:`url(${assetsMap['hb']})`}}>
    {/* Inner Depth details */}
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/60 to-transparent z-0" />
    <div className="absolute bottom-3 right-3 font-bold text-white/90 text-[11px] tracking-widest font-mono z-10 pointer-events-none select-none">
      {step.num}
    </div>
    <div className="absolute bottom-0 right-0 w-[2px] h-16 pointer-events-none opacity-20 z-10" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />

    {/* Content */}
    <div className="relative z-10">
      <div className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] mb-5 leading-none" style={{ color: "#d97706" }}>
        {step.label}
      </div>
      <div className="text-3xl mb-5 leading-none filter drop-shadow-sm">{step.icon}</div>
      <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-4">
        {step.title}
      </h3>
      <p className="text-sm leading-relaxed text-slate-600">
        {step.desc}
      </p>
    </div>
  </div>
);

// ─── Main Section Component ────────────────────────────────
const OriginStorySection = () => {
  return (
    <section className="relative py-32 section-padding overflow-hidden" style={{ background: "linear-gradient(160deg, #ffffff 0%, #f9fafb 100%)" }}>
      <style>{CARD_CSS}</style>

      {/* Reactive Canvas Hex Grid */}
      <HexGridBackground />

      {/* Soft overlay to calm the grid lines far from mouse */}
      <div className="absolute inset-0 pointer-events-none bg-white/5 opacity-50 z-[1]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionLabel number="02" label="Origin Story" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="heading-lg mb-4 text-slate-900">
            How <span className="text-gradient">curiosity</span>
            <br />became a career.
          </h2>
          <p className="mt-3 mb-16 max-w-xl text-base leading-relaxed text-slate-600">
            Every builder has an origin. Here's how a game memory hack in sixth
            grade became a full-stack dev career.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={0.15 + i * 0.1}>
              <PaperFoldCard step={step} idx={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OriginStorySection;
