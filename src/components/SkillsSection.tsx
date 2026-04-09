import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { assetsMap } from '../assetsMap';


// ─── Skills Data & SVG Icon Delivery ───────────────────────
const skillsData = [
  { name: "HTML", category: "Frontend", slug: "html5", color: "#E34F26" },
  { name: "CSS", category: "Frontend", slug: "css3", color: "#1572B6" },
  { name: "JavaScript", category: "Frontend", slug: "javascript", color: "#F7DF1E" },
  { name: "React", category: "Frontend", slug: "react", color: "#61DAFB" },
  { name: "Node.js", category: "Backend", slug: "nodedotjs", color: "#339933" },
  { name: "PHP", category: "Backend", slug: "php", color: "#777BB4" },
  { name: "ASP.NET", category: "Backend", slug: "dotnet", color: "#512BD4" },
  { name: "MySQL", category: "Database", slug: "mysql", color: "#4479A1" },
  { name: "Firebase", category: "Database", slug: "firebase", color: "#FFCA28" },
  { name: "Supabase", category: "Database", slug: "supabase", color: "#3ECF8E" },
  { name: "Linux", category: "Systems", slug: "linux", color: "#FCC624" },
  { name: "Kali Linux", category: "Systems", slug: "kalilinux", color: "#557C94" },
  { name: "Ubuntu", category: "Systems", slug: "ubuntu", color: "#E95420" },
  { name: "Terminal", category: "Systems", slug: "gnometerminal", color: "#505050" },
  { name: "VS Code", category: "Tools", slug: "visualstudiocode", color: "#007ACC" },
  { name: "Jupyter", category: "Tools", slug: "jupyter", color: "#F37626" },
  { name: "Chrome Ext", category: "Browser", slug: "googlechrome", color: "#4285F4" },
  { name: "DevTools", category: "Browser", slug: "googlechrome", color: "#4285F4" },
  { name: "Cheat Engine", category: "Security", slug: "cheatengine", color: "#8B0000" }, // Custom mapping if simpleicons lacks
  { name: "Lucky Patcher", category: "Security", slug: "android", color: "#3DDC84" },
  { name: "Git", category: "Version Control", slug: "git", color: "#F05032" },
  { name: "GitHub", category: "Version Control", slug: "github", color: "#181717" },
  { name: "Word", category: "Microsoft", slug: "microsoftword", color: "#5798faff" },
  { name: "Excel", category: "Microsoft", slug: "microsoftexcel", color: "#217346" },
  { name: "PowerPoint", category: "Microsoft", slug: "microsoftpowerpoint", color: "#B7472A" },
  { name: "Photoshop", category: "Creative", slug: "adobephotoshop", color: "#31A8FF" },
  { name: "CapCut", category: "Creative", slug: "bytedance", color: "#000000" }, // Fallback icon
  { name: "Filmora", category: "Creative", slug: "wondershare", color: "#00E5FF" },
  { name: "Flutter", category: "Mobile", slug: "flutter", color: "#02569B" },
  { name: "ChatGPT", category: "AI Tools", slug: "openai", color: "#412991" },
  { name: "Claude", category: "AI Tools", slug: "anthropic", color: "#1A1A1A" },
  { name: "Docker", category: "Systems", slug: "docker", color: "#2496ED" },
  { name: "Pinterest", category: "AI Tools", slug: "pinterest", color: "#BD081C" },
];

const STYLES = `
.skills-universe-bg {
  background: radial-gradient(circle at center, #0a0b14 0%, #030409 100%);
}

.infinity-path {
  fill: none;
  stroke-width: 2.5;
  stroke: url(#infinity-gradient);
  stroke-linejoin: round;
  stroke-linecap: round;
  filter: drop-shadow(0 0 16px rgba(0, 255, 204, 0.4));
  animation: infinity-glow 4s ease-in-out infinite alternate;
}

@keyframes infinity-glow {
  0% { filter: drop-shadow(0 0 12px rgba(168, 85, 247, 0.5)) drop-shadow(0 0 20px rgba(0, 255, 204, 0.3)); }
  100% { filter: drop-shadow(0 0 24px rgba(0, 255, 204, 0.8)) drop-shadow(0 0 35px rgba(168, 85, 247, 0.6)); }
}

.skill-node {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 52px;
  height: 52px;
  margin-top: -26px;
  margin-left: -26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(10, 15, 25, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05);
  cursor: pointer;
  z-index: 10;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform, box-shadow;
}

.skill-node:hover {
  z-index: 50 !important;
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--node-color, rgba(255,255,255,0.4));
  box-shadow: 0 0 25px var(--node-color, rgba(255,255,255,0.3)), 
              inset 0 0 15px var(--node-color, rgba(255,255,255,0.1));
  transform: scale(1.1) translateY(-5px);
}

.skill-node img {
  width: 26px;
  height: 26px;
  object-fit: contain;
  filter: brightness(0.9) contrast(1.1) drop-shadow(0 0 2px rgba(0,0,0,0.5));
  transition: all 0.3s ease;
}

.skill-node:hover img {
  transform: scale(1.1);
  filter: brightness(1.1) contrast(1.2) drop-shadow(0 0 4px var(--node-color, rgba(255,255,255,0.8)));
}

.skill-tooltip {
  position: absolute;
  top: -46px;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  pointer-events: none;
  opacity: 0;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  color: white;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.skill-node:hover .skill-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.skill-tooltip-category {
  font-size: 9px;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--node-color, #aaa);
}

/* Infinity dash animation */
.infinity-line {
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
  animation: dash 6s linear infinite;
}

@keyframes dash {
  0% { stroke-dashoffset: 2000; }
  100% { stroke-dashoffset: 0; }
}

/* Swirling Energy Ring */
.node-energy-ring {
  position: absolute;
  top: -16px; left: -16px; right: -16px; bottom: -16px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg, 
    transparent 0%, 
    var(--node-color) 25%, 
    transparent 40%, 
    var(--node-color) 75%, 
    transparent 90%
  );
  -webkit-mask: radial-gradient(circle at 50% 50%, transparent 58%, black 61%);
  mask: radial-gradient(circle at 50% 50%, transparent 58%, black 61%);
  opacity: 0;
  transform: scale(0.8) rotate(0deg);
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
  animation: energy-spin 2s linear infinite;
  mix-blend-mode: screen;
}

.node-energy-ring::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(
    from 90deg, 
    transparent 0%, 
    rgba(255,255,255,0.6) 20%, 
    transparent 35%, 
    rgba(255,255,255,0.6) 70%, 
    transparent 85%
  );
  -webkit-mask: radial-gradient(circle at 50% 50%, transparent 63%, black 65%);
  mask: radial-gradient(circle at 50% 50%, transparent 63%, black 65%);
}

.skill-node:hover .node-energy-ring {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

@keyframes energy-spin {
  100% { transform: scale(1) rotate(360deg); }
}
`;

// ─── Component ─────────────────────────────────────────────
const SkillsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  // Distribute nodes evenly across 3 concentric orbits
  const orbits = useMemo(() => {
    const layer1 = skillsData.slice(0, 8); // Inner (Fast)
    const layer2 = skillsData.slice(8, 20); // Middle (Medium)
    const layer3 = skillsData.slice(20); // Outer (Slow)
    return [
      { radiusX: 180, radiusY: 80, speed: 18, direction: 1, items: layer1 },
      { radiusX: 300, radiusY: 140, speed: 28, direction: -1, items: layer2 },
      { radiusX: 420, radiusY: 200, speed: 40, direction: 1, items: layer3 },
    ];
  }, []);

  return (
<section
  className="py-32 section-padding relative overflow-hidden skills-universe-bg min-h-[90vh] flex flex-col justify-center"
  style={{
    backgroundImage: `url(${assetsMap['g5']})`,
    backgroundSize: "cover",
    backgroundPosition: "center 130px",
    backgroundRepeat: "no-repeat",
    backgroundColor:"white"
  }}
>      <style>{STYLES}</style>

      {/* Background ambient lighting */}
      

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <ScrollReveal>
          <SectionLabel number="05" label="Ecosystem" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="heading-lg mb-4 text-white">
            <span className="thani">The</span> <span className="text-transparent " style={{color:"#6cffddff"}}>universe of tools.</span> 
          </h2>
          <p className="body-text max-w-2xl mb-16 text-slate-400">
            A continuous loop of building, breaking, and mastering. No tool is out of reach; every system is just another puzzle to solve.
          </p>
        </ScrollReveal>

        {/* The Interactive Universe */}
        <div
          ref={containerRef}
          className="relative w-full h-[600px] sm:h-[700px] flex items-center justify-center perspective-1000"
          onMouseLeave={() => setActiveSkill(null)}
        >
          {isInView && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Infinity SVG in the center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] sm:w-[460px] sm:h-[230px] opacity-70 pointer-events-none">
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="infinity-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="50%" stopColor="#2dd4bf" />
                      <stop offset="100%" stopColor="#4ade80" />
                    </linearGradient>
                  </defs>
                  <path
                    className="infinity-path infinity-line"
                    d="M 25 25 C 10 0, 0 10, 0 25 C 0 40, 10 50, 25 25 C 40 0, 50 10, 50 25 C 50 40, 40 50, 25 25 Z"
                    transform="translate(25, 0)"
                  />
                  {/* Faint static track under the moving line */}
                  <path
                    className="infinity-path"
                    style={{ stroke: "rgba(255,255,255,0.05)", animation: "none", filter: "none" }}
                    d="M 25 25 C 10 0, 0 10, 0 25 C 0 40, 10 50, 25 25 C 40 0, 50 10, 50 25 C 50 40, 40 50, 25 25 Z"
                    transform="translate(25, 0)"
                  />
                </svg>
              </div>

              {/* Orbital Nodes */}
              {orbits.map((orbit, orbitIdx) => (
                <div key={orbitIdx} className="absolute inset-0 pointer-events-none">
                  {orbit.items.map((skill, i) => {
                    const angleOffset = (i / orbit.items.length) * 360;
                    return (
                      <motion.div
                        key={skill.name}
                        className="absolute top-1/2 left-1/2"
                        initial={{ rotate: angleOffset }}
                        animate={{
                          rotate: orbit.direction > 0 ? [angleOffset, angleOffset + 360] : [angleOffset, angleOffset - 360]
                        }}
                        transition={{
                          repeat: Infinity,
                          ease: "linear",
                          duration: orbit.speed
                        }}
                      >
                        {/* Counter-rotate the actual node so it stays upright */}
                        <motion.div
                          className="absolute pointer-events-auto"
                          style={{
                            x: orbit.radiusX,
                            y: 0,
                            willChange: "transform",
                          }}
                          initial={{ rotate: -angleOffset }}
                          animate={{
                            rotate: orbit.direction > 0 ? [-angleOffset, -angleOffset - 360] : [-angleOffset, -angleOffset + 360]
                          }}
                          transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: orbit.speed
                          }}
                        >
                          {/* The Node Element */}
                          <div
                            className="skill-node"
                            style={{ "--node-color": skill.color } as React.CSSProperties}
                            onMouseEnter={() => setActiveSkill(skill.name)}
                          >
                            <div className="node-energy-ring" />
                            <img
                              src={`https://cdn.simpleicons.org/${skill.slug}/white`}
                              alt={skill.name}
                              onError={(e) => {
                                // Fallback if simpleicon slug is incorrect
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(skill.name.substring(0, 1))}&background=random&color=fff&rounded=true&bold=true&font-size=0.6`;
                              }}
                            />

                            {/* Tooltip */}
                            <div className="skill-tooltip">
                              <span className="font-semibold text-white">{skill.name}</span>
                              <span className="skill-tooltip-category">{skill.category}</span>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              ))}

              {/* Center Tech Core Label */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-0 mix-blend-screen">
                <p className="text-white/20 font-mono tracking-[0.5em] text-sm uppercase blur-[0.5px]">Continuous<br />Integration</p>
              </div>

            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
