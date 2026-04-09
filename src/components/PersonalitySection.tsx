import { useEffect, useRef, useMemo } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { useAnimationFrame } from "framer-motion";
import { assetsMap } from '../assetsMap';


const traits = [
  { title: "Self-Taught / Autodidact", desc: "Never waited for a course. Learned by doing, breaking, fixing, and rebuilding. Started from Cheat Engine at age 11. Ended up building full no-code visual builders, Chrome extensions, and developer scaffolding tools — all self-driven.", icon: "🧠" },
  { title: "Night Owl Coder", desc: "Best work happens after midnight. Deep focus, no distractions, pure build mode. Most commits pushed in late-night sessions.", icon: "🦉" },
  { title: "Problem Solver Mindset", desc: "Every project started with a real personal problem: Couldn't afford Canva premium → Built QuickEdi. Needed project scaffolding fast → Built ZIPStruct. Aadhaar update was hard → Built Doorstep. Wanted to edit any live webpage → Built web_edit_Extensions.", icon: "🧩" },
  { title: "Design-Obsessed Developer", desc: "Uses Chrome DevTools every single day to inspect and reverse-engineer how other sites style things. Uses Stitch (Figma alternative) for design mockups. Uses Flux for AI image generation. Cares deeply about how things LOOK, not just how they work.", icon: "🎨" },
  { title: "Curious By Nature", desc: "GTA → Cheat Engine → TG32 → Kali Linux → Web Dev → Tool Builder. Curiosity is the engine. Every phase of my journey has been self-directed.", icon: "🔍" },
  { title: "Builder Over Talker", desc: "Friends actually use the tools I build. That is the real measure of success. Real-world adoption > GitHub stars.", icon: "🏗" },
  { title: "Growing Fast", desc: "Currently learning React/Next.js and Three.js/WebGL to level up from vanilla JS. Using Antigravity AI tools to accelerate learning of new technologies.", icon: "🚀" },
];

const clipColors = [
  "hsl(var(--primary))",
  "hsl(45 100% 55%)",
  "hsl(var(--primary))",
  "hsl(45 100% 55%)",
  "hsl(var(--primary))",
  "hsl(45 100% 55%)",
  "hsl(var(--primary))",
];

const PersonalitySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemWidth = 320;
  const gap = 20;
  const snapStep = itemWidth + gap;

  // Triplicate array to allow scrolling in both directions
  const displayTraits = useMemo(() => [
    ...traits, ...traits, ...traits, ...traits, ...traits
  ], []);

  // Initialize scroll near the middle of the duplicated list
  useEffect(() => {
    if (containerRef.current) {
      // Jump to the middle set
      const startLeft = traits.length * 2 * snapStep;
      // Disable smooth scroll temporarily for instant jump
      containerRef.current.style.scrollBehavior = "auto";
      containerRef.current.scrollLeft = startLeft;
      
      // Re-enable smooth scroll after jump
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.style.scrollBehavior = "smooth";
        }
      });
    }
  }, [snapStep]);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -snapStep, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: snapStep, behavior: "smooth" });
  };

  return (
    <section className="theme-light bg-background text-foreground py-40 relative overflow-hidden">
      <style>{`
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
        .hide-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-15" style={{  background: `url(${assetsMap['yu']})`  , backgroundSize:"cover"}}/>
      
      <ScrollReveal delay={0.1}>
        <div className="text-center mb-20 px-6 relative z-10">
          <SectionLabel number="03" label="Personality & Working Style" />
          <h2 className="heading-lg mt-6">
            How I <span className="text-gradient">think</span> & how I work.
          </h2>
        </div>
      </ScrollReveal>

      <div className="relative w-full max-w-[100vw] overflow-hidden " style={{  background: `url(${assetsMap['yu']})`  , backgroundSize:"cover"}}>
        {/* Native Scroll Track */}
        <div
          ref={containerRef}
          className="hide-scroll flex items-center overflow-x-auto w-full h-[520px] cursor-default"
          style={{
            scrollSnapType: "x mandatory",
            paddingLeft: "calc(50vw - 160px)",
            paddingRight: "calc(50vw - 160px)",
            gap: `${gap}px`
          }}
        >
          {displayTraits.map((trait, i) => (
            <CarouselItem 
              key={`${trait.title}-${i}`} 
              trait={trait} 
              index={i} 
              color={clipColors[i % clipColors.length]}
              containerRef={containerRef}
              itemWidth={itemWidth}
              gap={gap}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-6 mt-6 relative z-20" style={{display:"none"}}>
          <button 
            onClick={scrollLeft}
            aria-label="Previous card"
            className="w-14 h-14 rounded-full flex items-center justify-center border transition-all hover:bg-white/10 active:scale-95 cursor-pointer"
            style={{ 
              borderColor: "rgba(255,255,255,0.15)", 
              background: "rgba(20,20,20,0.8)", 
              backdropFilter: "blur(10px)",
              color: "#fff"
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <button 
            onClick={scrollRight}
            aria-label="Next card"
            className="w-14 h-14 rounded-full flex items-center justify-center border transition-all hover:bg-white/10 active:scale-95 cursor-pointer"
            style={{ 
              borderColor: "rgba(255,255,255,0.15)", 
              background: "rgba(20,20,20,0.8)", 
              backdropFilter: "blur(10px)",
              color: "#fff"
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
      
    </section>
  );
};

const CarouselItem = ({ trait, color, containerRef, itemWidth, gap }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Directly mutate DOM at 60fps instead of using React State to ensure high performance
  useAnimationFrame(() => {
    if (!cardRef.current || !innerRef.current || !containerRef.current) return;
    
    try {
      const rect = cardRef.current.getBoundingClientRect();
      const contRect = containerRef.current.getBoundingClientRect();
      
      const itemCenter = rect.left + rect.width / 2;
      const contCenter = contRect.left + contRect.width / 2;
      
      const dist = (itemCenter - contCenter) / (itemWidth + gap);
      const absDist = Math.abs(dist);

      // Hierarchical Scaling
      let scale = 1;
      if (absDist <= 1) {
        scale = 1 - absDist * 0.15; // 1.0 to 0.85
      } else {
        scale = 0.85 - (absDist - 1) * 0.15; // 0.85 to 0.7
      }
      scale = Math.max(scale, 0.6);

      // Y Shift
      let y = -10;
      if (absDist <= 1) {
         y = -10 + absDist * 20; // Center is highest
      } else {
         y = 10;
      }

      // X Overlap Layering -> Pulls side cards toward the center
      const overlapX = -dist * 60; 

      // Opacity
      const opacity = Math.max(1 - absDist * 0.4, 0);
      
      // Z-Index Stack
      const zIndex = 100 - Math.round(absDist * 10);

      innerRef.current.style.transform = `translate3d(${overlapX}px, ${y}px, 0) scale(${scale})`;
      innerRef.current.style.opacity = `${opacity}`;
      innerRef.current.style.zIndex = `${zIndex}`;
    } catch (e) {
      // fail silently on unmount bounds check
    }
  });

  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 relative cursor-default"
      style={{ 
        width: `${itemWidth}px`, 
        height: "440px",
        scrollSnapAlign: "center" 
      }}
    >
      <div
        ref={innerRef}
        className="absolute inset-0 rounded-[2.5rem] p-8 border transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] select-none"
        style={{
          background: "rgba(15, 15, 15, 0.9)",
          backdropFilter: "blur(10px)",
          borderColor: "rgba(255, 255, 255, 0.08)",
          boxShadow: `0 30px 70px -15px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255,255,255,0.05)`,
          willChange: "transform, opacity",
          transformOrigin: "center center",
        }}
      >
        {/* Card grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-10 right-10 h-[2px]"
          style={{ 
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            boxShadow: `0 0 10px ${color}`
          }}
        />

        <div className="relative z-10 flex flex-col h-full items-center text-center">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
            style={{ background: `${color}15`, border: `1px solid ${color}33` }}
          >
            <span className="text-4xl block drop-shadow-md">
              {trait.icon}
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-6 tracking-tight leading-tight uppercase font-display">
            {trait.title}
          </h3>
          
          <p className="text-base leading-relaxed text-gray-400 font-light max-w-[260px]">
            {trait.desc}
          </p>
          
          <div className="mt-auto pt-8 opacity-20">
            <div className="flex gap-1.5">
              {[1, 2, 3].map(dot => (
                <div key={dot} className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalitySection;
