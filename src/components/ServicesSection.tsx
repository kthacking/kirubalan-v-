import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Globe, Smartphone, Cpu, Search, Code, Chrome, ShoppingCart, Wrench, RotateCcw } from "lucide-react";

const services = [
  { icon: Globe, title: "Web Development", desc: "Responsive, modern websites built with HTML5, CSS3, and Vanilla JavaScript. Clean code, no bloat, premium visual quality.", color: "#FFD166", tilt: -3 },
  { icon: Code, title: "No Code / Visual Builder", desc: "Custom visual site builders like QuickEdi — drag-and-drop, theme presets, export to code. Built for designers and devs alike.", color: "#06D6A0", tilt: 2 },
  { icon: Smartphone, title: "Responsive UX", desc: "Mobile-first responsive design with viewport controls: Desktop (100%), Tablet (768px), Mobile (375px).", color: "#118AB2", tilt: -2 },
  { icon: Search, title: "SEO Optimization", desc: "Search engine optimization for better visibility, semantic HTML, meta tags, and performance tuning.", color: "#EF476F", tilt: 3 },
  { icon: Wrench, title: "Developer Tools", desc: "Scaffolding tools, utility hubs, and developer workflow automation — all browser-based, zero dependencies.", color: "#7209B7", tilt: -4 },
  { icon: ShoppingCart, title: "E-commerce Solutions", desc: "Full PHP/MySQL e-commerce platforms — product catalogs, shopping carts, auth systems, order management.", color: "#F77F00", tilt: 2 },
  { icon: Cpu, title: "IoT Hardware Projects", desc: "ESP32, NodeMcu integration with web interfaces. Bridging hardware and software through the browser.", color: "#4CC9F0", tilt: -2 },
  { icon: Chrome, title: "Chrome Extensions", desc: "Manifest V3 Chrome extensions with content script injection, popup UI, and full browser API integration.", color: "#3A86FF", tilt: 3 },
];

const blobPaths = [
  "M44.5,-51.3C56.1,-41.4,63,-25.3,65.2,-8.6C67.4,8.1,64.9,25.3,55.5,37.3C46.1,49.3,29.8,56,12.4,60.1C-5,64.2,-23.4,65.6,-37.3,58.3C-51.2,51,-60.6,35,-64.2,18C-67.8,1,-65.6,-17,-57.2,-30.4C-48.8,-43.8,-34.2,-52.7,-19.6,-61C-5,-69.3,9.5,-77,22.6,-73.5C35.7,-70,45.5,-55.3,44.5,-51.3Z",
  "M43.3,-49.8C54.5,-40.4,60.8,-25.2,63.4,-9C66,7.2,64.8,24.4,56.3,37.4C47.8,50.4,32,59.2,14.8,64.1C-2.4,69,-21,70,-34.8,62.4C-48.6,54.8,-57.6,38.6,-62.6,21.2C-67.6,3.8,-68.6,-14.8,-61.1,-28.7C-53.6,-42.6,-37.6,-51.8,-22.2,-59.1C-6.8,-66.4,8,-71.8,21.2,-67.5C34.4,-63.2,46,-55.2,43.3,-49.8Z",
  "M39.4,-47.3C49.3,-37.5,54.4,-23.2,57.6,-7.6C60.8,8,62.1,24.8,54.8,37.4C47.5,50,31.6,58.3,15.2,62.4C-1.2,66.5,-18.1,66.4,-32.3,59.6C-46.5,52.8,-58,39.3,-62.6,23.8C-67.2,8.3,-64.9,-9.2,-57.5,-23.3C-50.1,-37.4,-37.6,-48.1,-24.6,-56.5C-11.6,-64.9,1.9,-71,14.8,-68.1C27.7,-65.2,39.8,-53.3,39.4,-47.3Z",
];

// Enhanced textures for cardboard and paper
const paperNoiseUrl = "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E";

const cardboardCorrugationPattern = "repeating-linear-gradient(rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px, rgba(255,255,255,0.08) 4px, rgba(255,255,255,0.08) 5px)";

type FallenState = { [key: number]: boolean };
type ResetPhase = "idle" | "raining" | "settling" | "swinging";

const ServicesSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [fallen, setFallen] = useState<FallenState>({});
  const [resetPhase, setResetPhase] = useState<ResetPhase>("idle");
  const sectionRef = useRef<HTMLDivElement>(null);

  // Generate unique random fall physics per card
  const fallPhysics = useMemo(() => {
    return services.map(() => ({
      rotateZ: (Math.random() > 0.5 ? 1 : -1) * (12 + Math.random() * 20),
      rotateY: (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 8),
      delay: Math.random() * 0.2,
      driftX: [
        0,
        -(15 + Math.random() * 25),
        (10 + Math.random() * 20),
        -(8 + Math.random() * 12),
        (5 + Math.random() * 8),
        0,
      ],
    }));
  }, []);

  // Random rain start positions per card (for reset rain)
  const rainPhysics = useMemo(() => {
    return services.map(() => ({
      startX: (Math.random() - 0.5) * 400,
      startRotate: (Math.random() > 0.5 ? 1 : -1) * (8 + Math.random() * 18),
      driftX: [
        0,
        (Math.random() > 0.5 ? 1 : -1) * (10 + Math.random() * 20),
        (Math.random() > 0.5 ? -1 : 1) * (5 + Math.random() * 15),
        0,
      ],
      delay: Math.random() * 0.35,
    }));
  }, []);

  // Close on outside click → triggers realistic fall
  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (openIndex === null || resetPhase !== "idle") return;
      const target = e.target as HTMLElement;
      if (!target.closest(`[data-note-index="${openIndex}"]`)) {
        setFallen((prev) => ({ ...prev, [openIndex]: true }));
        setOpenIndex(null);
      }
    },
    [openIndex, resetPhase]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [handleOutsideClick]);

  // Auto-reset after 10 seconds when any note falls
  useEffect(() => {
    const hasFallen = Object.values(fallen).some((v) => v);
    if (!hasFallen || resetPhase !== "idle") return;
    const timer = setTimeout(() => {
      triggerReset();
    }, 10000);
    return () => clearTimeout(timer);
  }, [fallen, resetPhase]);

  const triggerReset = () => {
    setResetPhase("raining");
    // Rain phase: 1.5s
    setTimeout(() => {
      setFallen({});
      setOpenIndex(null);
      setResetPhase("settling");
      // Settle phase: 0.4s
      setTimeout(() => {
        setResetPhase("swinging");
        // Swing phase: 0.6s then idle
        setTimeout(() => {
          setResetPhase("idle");
        }, 700);
      }, 500);
    }, 1600);
  };

  const handleNoteClick = (index: number) => {
    if (fallen[index] || resetPhase !== "idle") return;
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const hasFallenNotes = Object.values(fallen).some((v) => v);

  return (
    <section
      ref={sectionRef}
      className="py-32 section-padding relative overflow-hidden"
      style={{ background: "#f5f5f5" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionLabel number="06" label="Services" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="heading-lg mb-20" style={{ color: "#111" }}>
            What I <span className="text-gradient">build</span>.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          <AnimatePresence mode="popLayout">
            {services.map((s, i) => {
              const isOpen = openIndex === i;
              const isFallen = fallen[i];
              const blobPath = blobPaths[i % blobPaths.length];
              const fp = fallPhysics[i];
              const rp = rainPhysics[i];

              // ── FALLEN STATE: realistic cardboard fall ──
              if (isFallen && resetPhase === "idle") {
                return (
                  <motion.div
                    key={s.title + "-fall"}
                    data-note-index={i}
                    initial={{ opacity: 1, y: 0, x: 0, rotate: s.tilt, scale: 1 }}
                    animate={{
                      opacity: [1, 0.7, 0],
                      y: [-10, 30, window.innerHeight * 1.3],
                      x: fp.driftX,
                      rotate: [s.tilt, fp.rotateZ * 0.5, fp.rotateZ],
                      scale: [1, 1, 0.95],
                      rotateX: [0, 5, 5],
                      rotateY: [0, fp.rotateY, fp.rotateY],
                    }}
                    transition={{
                      duration: 1.6,
                      delay: fp.delay,
                      ease: [0.22, 1, 0.36, 1],
                      opacity: { times: [0, 0.5, 1], duration: 1.6 },
                      y: { times: [0, 0.08, 1], duration: 1.6 },
                      x: { times: [0, 0.15, 0.35, 0.55, 0.75, 1], duration: 1.6 },
                      rotate: { times: [0, 0.3, 1], duration: 1.6 },
                      scale: { times: [0, 0.5, 1], duration: 1.6 },
                    }}
                    className="relative cursor-pointer"
                    style={{
                      willChange: "transform, opacity",
                      transformOrigin: "center top",
                      perspective: 800,
                    }}
                  >
                    <NoteCard
                      service={s}
                      index={i}
                      isOpen={false}
                      blobPath={blobPath}
                    />
                  </motion.div>
                );
              }

              // ── RAINING STATE: cardboard rain from top ──
              if (isFallen && resetPhase === "raining") {
                return (
                  <motion.div
                    key={s.title + "-rain"}
                    data-note-index={i}
                    initial={{
                      opacity: 0,
                      y: -window.innerHeight * 0.6,
                      x: rp.startX,
                      rotate: rp.startRotate,
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: [0, 1, 1],
                      y: [-window.innerHeight * 0.6, -20, 0],
                      x: [...rp.driftX],
                      rotate: [rp.startRotate, rp.startRotate * 0.5, s.tilt],
                      scale: [0.9, 0.95, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: rp.delay,
                      ease: [0.22, 1, 0.36, 1],
                      opacity: { times: [0, 0.2, 1], duration: 1.5 },
                      y: { times: [0, 0.7, 1], duration: 1.5 },
                      x: { times: [0, 0.3, 0.65, 1], duration: 1.5 },
                      rotate: { times: [0, 0.6, 1], duration: 1.5 },
                    }}
                    className="relative cursor-pointer"
                    style={{
                      willChange: "transform, opacity",
                      transformOrigin: "center top",
                      perspective: 800,
                    }}
                  >
                    <NoteCard
                      service={s}
                      index={i}
                      isOpen={false}
                      blobPath={blobPath}
                    />
                  </motion.div>
                );
              }

              // ── SETTLING / SWINGING STATES ──
              const isSwinging = resetPhase === "swinging";

              return (
                <motion.div
                  key={s.title}
                  data-note-index={i}
                  layout
                  onClick={() => handleNoteClick(i)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{
                    opacity: 1,
                    y: isSwinging ? [5, 0] : 0,
                    scale: isOpen ? 1.1 : 1,
                    rotate: isSwinging
                      ? [s.tilt - 4, s.tilt + 4, s.tilt - 2, s.tilt]
                      : isOpen
                        ? 0
                        : s.tilt,
                    zIndex: isOpen ? 50 : 1,
                    rotateX: isOpen ? 0 : 2,
                    rotateY: isOpen ? 0 : s.tilt > 0 ? -2 : 2,
                  }}
                  transition={{
                    duration: isSwinging ? 0.6 : 0.4,
                    ease: isSwinging
                      ? [0.36, 0, 0.66, -0.56]
                      : [0.22, 1, 0.36, 1],
                    layout: { duration: 0.4 },
                    rotate: isSwinging
                      ? { duration: 0.6, times: [0, 0.3, 0.6, 1] }
                      : undefined,
                    y: isSwinging
                      ? { duration: 0.6, times: [0, 1] }
                      : undefined,
                  }}
                  className="relative cursor-pointer"
                  style={{
                    willChange: "transform, opacity",
                    transformOrigin: "center top",
                    perspective: 800,
                  }}
                >
                  <NoteCard
                    service={s}
                    index={i}
                    isOpen={isOpen}
                    blobPath={blobPath}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Global SVG Filters for the Ripped Edge effect */}
        <svg width="0" height="0" className="absolute">
          <filter id="ripped-edge" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

        {/* Reset Button */}
        <AnimatePresence>
          {hasFallenNotes && resetPhase === "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35 }}
              className="flex justify-center mt-14"
            >
              <button
                onClick={triggerReset}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.1)",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
                  color: "#333",
                }}
              >
                <RotateCcw size={15} />
                Reset Notes
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

interface NoteCardProps {
  service: (typeof services)[0];
  index: number;
  isOpen: boolean;
  blobPath?: string;
}

const NoteCard = ({ service, index, isOpen }: NoteCardProps) => {
  const Icon = service.icon;

  return (
    <div className="relative w-full select-none pt-4">
      {/* Tape Element (Masking Tape) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[85px] h-[35px] z-30 pointer-events-none opacity-90"
        style={{
          background: "linear-gradient(135deg, #e6c88f 0%, #cfaa6b 100%)",
          borderRadius: "2px",
          border: "1px solid rgba(0,0,0,0.04)",
          transform: `translateX(-50%) rotate(${(index % 2 === 0 ? 1 : -1) * (3 + Math.random() * 4)}deg)`,
          boxShadow: "0 3px 6px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.3)",
          clipPath: "polygon(1% 1%, 98% 3%, 99% 98%, 2% 96%)", 
          filter: "url(#ripped-edge)",
        }}
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,transparent_30%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      {/* Main Wrapper for Drop Shadow */}
      <div
        className="relative transition-all duration-300 mt-2"
        style={{
          filter: isOpen 
            ? "drop-shadow(4px 10px 15px rgba(0,0,0,0.15))" 
            : "drop-shadow(2px 6px 12px rgba(0,0,0,0.1))"
        }}
      >
        {/* Main Paper Note with clip-mask for binder holes and separated text */}
        <div className="relative min-h-[200px] rounded-sm">
          
          {/* Ripped Edge Background Layer */}
          <div 
             className="absolute inset-0 pointer-events-none rounded-sm"
             style={{
               backgroundColor: "#fdf8ee",
               backgroundImage: "linear-gradient(transparent, transparent 27px, #ded5c2 27px, #ded5c2 28px), radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.02) 100%)",
               backgroundSize: "100% 28px, 100% 100%",
               backgroundPosition: "0 10px, 0 0",
               WebkitMaskImage: "radial-gradient(circle at 4px 14px, transparent 6px, black 7px)",
               maskImage: "radial-gradient(circle at 4px 14px, transparent 6px, black 7px)",
               WebkitMaskSize: "100% 28px",
               maskSize: "100% 28px",
               WebkitMaskPosition: "0 10px",
               maskPosition: "0 10px",
               WebkitMaskRepeat: "repeat",
               maskRepeat: "repeat",
               filter: "url(#ripped-edge)",
             }}
          >
            {/* Subtle noise overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url("${paperNoiseUrl}")`,
                backgroundSize: "128px 128px",
                opacity: 0.2,
                mixBlendMode: "overlay",
              }}
            />
          </div>

          {/* Clean Crisp Text Layer */}
          <div className="relative z-10 h-full flex flex-col pointer-events-auto"
               style={{ padding: isOpen ? "28px 20px 24px 36px" : "24px 16px 20px 32px" }}>
            
            {/* Icon and Title Container */}
            <div className="flex items-center gap-3 mb-2 relative z-10 w-full pr-2">
              <div
                className="w-10 h-10 rounded-md flex items-center justify-center transition-all duration-300 shrink-0"
                style={{
                  background: service.color + "15",
                  color: service.color,
                }}
              >
                <Icon size={20} strokeWidth={2.5} />
              </div>
              <h3
                className="font-bold text-base md:text-lg transition-colors duration-300 break-words flex-1"
                style={{ color: "#222", letterSpacing: "-0.01em", lineHeight: "1.2" }}
              >
                {service.title}
              </h3>
            </div>

            {/* Description (visible on open) */}
            <motion.div
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden relative"
            >
              <p
                className="text-[14px] leading-[28px] mt-1 relative z-10"
                style={{ color: "#444" }}
              >
                {service.desc}
              </p>
            </motion.div>

            {/* Tap hint when closed */}
            {!isOpen && (
              <p
                className="relative z-10 text-[10px] mt-2 mb-1 tracking-widest uppercase font-bold"
                style={{ color: service.color, opacity: 0.9 }}
              >
                Read More
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
