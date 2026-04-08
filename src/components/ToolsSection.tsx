import { useRef, useMemo } from "react";
import SectionLabel from "./SectionLabel";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";

/* ─── Tool Data ─── */
const tools = [
  { name: "VS Code", desc: "Primary code editor for all development", icon: "⚡" },
  { name: "Chrome DevTools", desc: "Daily — inspect and learn from other websites' styles", icon: "🔍" },
  { name: "Git & GitHub", desc: "Version control, open source, deployment", icon: "🔀" },
  { name: "Stitch", desc: "Figma-alternative for UI/UX design and mockups", icon: "✏️" },
  { name: "Flux", desc: "AI image generation for visual assets", icon: "🎨" },
  { name: "Antigravity AI", desc: "Learning new technologies faster", icon: "🤖" },
  { name: "Canva", desc: "Graphics and visual content creation", icon: "🖼" },
  { name: "CapCut", desc: "Video editing for YouTube", icon: "🎬" },
  { name: "Adobe Photoshop", desc: "Photo editing and asset creation", icon: "📸" },
  { name: "MS Office Suite", desc: "Word, Excel, PowerPoint, Outlook", icon: "📊" },
];

/* ─── Floating Particle ─── */
const Particle = ({ index }: { index: number }) => {
  const size = 2 + Math.random() * 4;
  const x = Math.random() * 100;
  const delay = Math.random() * 5;
  const duration = 8 + Math.random() * 12;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        bottom: "-5%",
        background: `hsla(151, 100%, ${50 + index * 3}%, ${0.15 + Math.random() * 0.25})`,
        filter: `blur(${Math.random() > 0.5 ? 1 : 0}px)`,
      }}
      animate={{
        y: [0, -800 - Math.random() * 400],
        x: [0, (Math.random() - 0.5) * 200],
        opacity: [0, 0.8, 0.6, 0],
        scale: [0.5, 1.2, 0.8, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
};

/* ─── Animated Tool Card ─── */
const ToolCard = ({
  tool,
  index,
  scrollYProgress,
}: {
  tool: (typeof tools)[0];
  index: number;
  scrollYProgress: any;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-40px" });

  // Each card enters at a different scroll point — staggered cascade
  const entryStart = 0.05 + index * 0.035;
  const entryEnd = entryStart + 0.12;

  // Scroll-driven transforms
  const rawY = useTransform(scrollYProgress, [entryStart, entryEnd], [120, 0]);
  const rawOpacity = useTransform(scrollYProgress, [entryStart, entryEnd], [0, 1]);
  const rawScale = useTransform(scrollYProgress, [entryStart, entryEnd], [0.6, 1]);
  const rawRotateX = useTransform(scrollYProgress, [entryStart, entryEnd], [45, 0]);
  const rawRotateY = useTransform(
    scrollYProgress,
    [entryStart, entryEnd],
    [index % 2 === 0 ? -25 : 25, 0]
  );
  const rawBlur = useTransform(scrollYProgress, [entryStart, entryEnd], [10, 0]);

  // Spring physics for buttery smoothness
  const springConfig = { stiffness: 120, damping: 20, mass: 0.8 };
  const y = useSpring(rawY, springConfig);
  const opacity = useSpring(rawOpacity, springConfig);
  const scale = useSpring(rawScale, springConfig);
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);
  const blur = useSpring(rawBlur, { stiffness: 80, damping: 25 });

  // Glow intensity pulses based on scroll
  const glowOpacity = useTransform(
    scrollYProgress,
    [entryEnd, entryEnd + 0.05, entryEnd + 0.1],
    [0, 0.6, 0.2]
  );
  const glowSpring = useSpring(glowOpacity, { stiffness: 60, damping: 18 });

  // Row stagger: offset alternate rows
  const row = Math.floor(index / 5);
  const rowOffsetRaw = useTransform(
    scrollYProgress,
    [0.0, 0.3, 0.7],
    [row % 2 === 0 ? -60 : 60, 0, row % 2 === 0 ? 30 : -30]
  );
  const rowOffset = useSpring(rowOffsetRaw, { stiffness: 50, damping: 20 });

  return (
    <motion.div
      ref={cardRef}
      style={{
        y,
        opacity,
        scale,
        rotateX,
        rotateY,
        x: rowOffset,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        scale: 1.1,
        rotateX: -5,
        rotateY: 8,
        y: -12,
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      className="relative group cursor-pointer"
    >
      {/* Glow background layer */}
      <motion.div
        className="absolute -inset-1 rounded-2xl blur-xl pointer-events-none"
        style={{
          background: "linear-gradient(135deg, hsla(151,100%,50%,0.3), hsla(180,100%,50%,0.2))",
          opacity: glowSpring,
        }}
      />

      {/* Card body */}
      <div className="relative glass rounded-xl p-6 text-center overflow-hidden transition-colors duration-300 group-hover:border-[hsla(151,100%,50%,0.3)] border border-transparent"
        style={{ background: "hsla(var(--glass-bg))", backdropFilter: "blur(20px)" }}
      >
        {/* Shimmer sweep on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, hsla(151,100%,50%,0.06) 45%, hsla(151,100%,50%,0.12) 50%, hsla(151,100%,50%,0.06) 55%, transparent 60%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s ease-in-out infinite",
          }}
        />

        {/* Orbiting ring behind icon */}
        <div className="relative mx-auto w-14 h-14 flex items-center justify-center mb-3">
          <motion.div
            className="absolute inset-0 rounded-full border border-[hsla(151,100%,50%,0.15)]"
            animate={isInView ? { rotate: 360, scale: [1, 1.15, 1] } : {}}
            transition={{ rotate: { duration: 12, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
          />
          <motion.div
            className="absolute inset-[-4px] rounded-full border border-dashed border-[hsla(180,100%,50%,0.1)]"
            animate={isInView ? { rotate: -360 } : {}}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          {/* Orbiting dot */}
          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{ background: "hsl(151,100%,50%)", boxShadow: "0 0 8px hsla(151,100%,50%,0.6)" }}
            animate={isInView ? { rotate: 360 } : {}}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-[22px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-current" />
          </motion.div>
          <span className="text-3xl relative z-10 drop-shadow-lg">{tool.icon}</span>
        </div>

        <h4 className="text-sm font-semibold text-foreground mb-1 tracking-wide">{tool.name}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{tool.desc}</p>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(151,100%,50%), hsl(180,100%,50%), transparent)",
          }}
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.8, delay: index * 0.06, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
};

/* ─── Main Section ─── */
const ToolsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Section-level parallax layers
  const bgY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const bgYSpring = useSpring(bgY, { stiffness: 40, damping: 20 });

  // Title effects
  const titleScale = useTransform(scrollYProgress, [0, 0.15], [0.85, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const titleSpring = useSpring(titleScale, { stiffness: 100, damping: 18 });
  const titleYSpring = useSpring(titleY, { stiffness: 100, damping: 18 });
  const titleOpacitySpring = useSpring(titleOpacity, { stiffness: 100, damping: 18 });

  // Decorative line width
  const lineWidth = useTransform(scrollYProgress, [0.05, 0.25], ["0%", "100%"]);
  const lineWidthSpring = useSpring(lineWidth, { stiffness: 60, damping: 20 });

  // Generate particles once
  const particles = useMemo(
    () => Array.from({ length: 25 }, (_, i) => <Particle key={i} index={i} />),
    []
  );

  return (
    <section
      ref={sectionRef}
      className="theme-light relative bg-background text-foreground py-32 section-padding overflow-hidden"
    >
      {/* ── Background layers ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgYSpring }}
      >
        {/* Radial gradient orbs */}
        <div
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, hsl(151,100%,50%), transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, hsl(180,100%,50%), transparent 70%)" }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(hsla(151,100%,50%,0.3) 1px, transparent 1px), linear-gradient(90deg, hsla(151,100%,50%,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles}
      </div>

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section label */}
        <motion.div
          style={{ opacity: titleOpacitySpring, y: titleYSpring }}
        >
          <SectionLabel number="12" label="Daily Tools" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="heading-lg mb-4"
          style={{
            scale: titleSpring,
            y: titleYSpring,
            opacity: titleOpacitySpring,
          }}
        >
          My <span className="text-gradient">toolkit</span>.
        </motion.h2>

        {/* Animated underline */}
        <motion.div
          className="h-[2px] mb-16 rounded-full"
          style={{
            width: lineWidthSpring,
            background: "linear-gradient(90deg, hsl(151,100%,50%), hsl(180,100%,50%), transparent)",
          }}
        />

        {/* Tool cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {tools.map((t, i) => (
            <ToolCard
              key={t.name}
              tool={t}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Bottom decorative tagline */}
        <motion.p
          className="text-center text-xs text-muted-foreground mt-16 tracking-[0.3em] uppercase"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          — crafted with precision —
        </motion.p>
      </div>

      {/* ── Shimmer keyframe (injected via style tag) ── */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
};

export default ToolsSection;
