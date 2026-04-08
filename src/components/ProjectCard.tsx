import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Star, ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";

interface Project {
  name: string;
  product?: string;
  type: string;
  repo: string;
  live?: string;
  stars: number;
  commits?: number;
  languages: string;
  techStack: string;
  story: string;
  solves: string;
  features: string[];
  proves: string;
  flagship?: boolean;
  socialImpact?: boolean;
  ecosystem?: string;
}

interface CardTheme {
  bg: string;
  accent: string;
  shape1: string;
  shape2: string;
  badge: string;
  glow: string;
}

const themes: CardTheme[] = [
  { bg: "from-orange-100 to-amber-50", accent: "hsl(25, 95%, 53%)", shape1: "hsl(25, 90%, 70%)", shape2: "hsl(35, 90%, 80%)", badge: "bg-orange-500", glow: "hsla(25, 95%, 53%, 0.4)" },
  { bg: "from-violet-100 to-purple-50", accent: "hsl(270, 70%, 55%)", shape1: "hsl(270, 60%, 70%)", shape2: "hsl(280, 50%, 80%)", badge: "bg-violet-500", glow: "hsla(270, 70%, 55%, 0.4)" },
  { bg: "from-emerald-100 to-teal-50", accent: "hsl(160, 70%, 40%)", shape1: "hsl(160, 50%, 60%)", shape2: "hsl(170, 40%, 75%)", badge: "bg-emerald-500", glow: "hsla(160, 70%, 40%, 0.4)" },
  { bg: "from-rose-100 to-pink-50", accent: "hsl(340, 80%, 55%)", shape1: "hsl(340, 60%, 70%)", shape2: "hsl(350, 50%, 80%)", badge: "bg-rose-500", glow: "hsla(340, 80%, 55%, 0.4)" },
  { bg: "from-sky-100 to-blue-50", accent: "hsl(200, 80%, 50%)", shape1: "hsl(200, 60%, 65%)", shape2: "hsl(210, 50%, 78%)", badge: "bg-sky-500", glow: "hsla(200, 80%, 50%, 0.4)" },
  { bg: "from-amber-100 to-yellow-50", accent: "hsl(40, 90%, 50%)", shape1: "hsl(40, 70%, 65%)", shape2: "hsl(45, 60%, 78%)", badge: "bg-amber-500", glow: "hsla(40, 90%, 50%, 0.4)" },
  { bg: "from-slate-200 to-gray-100", accent: "hsl(220, 15%, 45%)", shape1: "hsl(220, 10%, 60%)", shape2: "hsl(220, 8%, 75%)", badge: "bg-slate-500", glow: "hsla(220, 15%, 45%, 0.3)" },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const theme = themes[index % themes.length];

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.35, ease: "easeOut", layout: { duration: 0.4, ease: "easeInOut" } }}
      className="relative rounded-3xl overflow-hidden cursor-pointer group"
      style={{
        boxShadow: expanded
          ? `0 0 30px ${theme.glow}, 0 20px 60px rgba(0,0,0,0.15)`
          : `0 4px 20px rgba(0,0,0,0.06)`,
        transition: "box-shadow 0.4s ease",
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg}`} />

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 backdrop-blur-[1px] bg-white/10" />

      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${theme.glow}, transparent 70%)`,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Active/expanded glow border */}
      {expanded && (
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none z-20"
          style={{
            border: `2px solid ${theme.accent}`,
            boxShadow: `inset 0 0 20px ${theme.glow}`,
          }}
        />
      )}

      {/* Abstract shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute rounded-full opacity-40"
          style={{
            width: 200,
            height: 200,
            background: `radial-gradient(circle, ${theme.shape1}, ${theme.shape2})`,
            right: "-30px",
            top: "-40px",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute rounded-full opacity-30"
          style={{
            width: 80,
            height: 80,
            background: theme.shape1,
            right: "80px",
            bottom: "60px",
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute rounded-2xl opacity-20"
          style={{
            width: 100,
            height: 100,
            background: theme.accent,
            right: "20px",
            top: "60px",
            transform: "rotate(15deg)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-10 flex flex-col">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {project.flagship && (
            <span className={`${theme.badge} text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5`}>
              <Star size={11} fill="white" /> FLAGSHIP
            </span>
          )}
          {project.socialImpact && (
            <span className="bg-white/80 backdrop-blur-sm text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5" style={{ color: theme.accent }}>
              ● SOCIAL IMPACT
            </span>
          )}
          {project.ecosystem && (
            <span className="bg-white/60 backdrop-blur-sm text-xs font-mono px-3 py-1.5 rounded-full text-gray-600">
              {project.ecosystem}
            </span>
          )}
          <span className="bg-white/60 backdrop-blur-sm text-xs font-mono px-3 py-1.5 rounded-full text-gray-600">
            {project.type}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1 font-display">
          {project.name}
        </h3>
        {project.product && (
          <p className="font-mono text-sm mb-4" style={{ color: theme.accent }}>{project.product}</p>
        )}

        {/* Description */}
        <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-lg mb-6">
          {project.solves}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {project.stars > 0 && (
            <span className="flex items-center gap-1 text-xs text-gray-500 bg-white/50 px-2.5 py-1 rounded-full">
              <Star size={11} style={{ color: theme.accent }} /> {project.stars}
            </span>
          )}
          {project.commits && (
            <span className="text-xs text-gray-500 bg-white/50 px-2.5 py-1 rounded-full font-mono">
              {project.commits} commits
            </span>
          )}
          <span className="text-xs text-gray-500 bg-white/50 px-2.5 py-1 rounded-full font-mono">
            {project.languages.split("·")[0].trim()}
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 mt-auto">
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 text-sm font-semibold text-gray-800 hover:underline underline-offset-4 group/link"
          >
            <Github size={16} /> Repo <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-sm font-semibold hover:underline underline-offset-4"
              style={{ color: theme.accent }}
            >
              <ExternalLink size={14} /> Live Demo <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
            </a>
          )}
        </div>

        {/* Expand indicator */}
        <motion.div
          className="absolute bottom-4 right-6 flex items-center gap-1 text-xs text-gray-400"
          animate={{ rotate: expanded ? 180 : 0 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </div>

      {/* Expanded detail panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative z-10 overflow-hidden"
          >
            <div className="bg-white/70 backdrop-blur-xl border-t border-white/40 p-8 md:p-10 space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: theme.accent }}>The Story</p>
                <p className="text-sm text-gray-700 leading-relaxed">{project.story}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: theme.accent }}>Tech Stack</p>
                <p className="font-mono text-sm text-gray-600">{project.techStack}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: theme.accent }}>Key Features</p>
                <div className="grid md:grid-cols-2 gap-2">
                  {project.features.map((f, fi) => (
                    <div key={fi} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: theme.accent }} />
                      <span className="text-sm text-gray-600">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/60 rounded-xl p-5 border border-white/50">
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: theme.accent }}>What It Proves</p>
                <p className="text-sm text-gray-600 leading-relaxed">{project.proves}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export { type Project };
export default ProjectCard;
