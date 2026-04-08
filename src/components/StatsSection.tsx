import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";

const stats = [
  { value: "15", label: "GitHub Repos" },
  { value: "6", label: "Pinned Projects" },
  { value: "7", label: "Total Projects" },
  { value: "4", label: "GitHub Stars" },
  { value: "2", label: "Live Deployed" },
  { value: "27", label: "Most Commits (QuickEdi)" },
  { value: "3mo", label: "Internship (VDart)" },
  { value: "2", label: "Certifications" },
  { value: "2K+", label: "YouTube Subscribers" },
  { value: "~30", label: "Videos Published" },
  { value: "7.9", label: "College CGPA" },
  { value: "2026", label: "Graduation" },
  { value: "~2016", label: "Coding Since" },
  { value: "JS", label: "Primary Language" },
];

const StatsSection = () => (
  <section className="py-32 section-padding relative">
    <div className="absolute inset-0 dot-bg opacity-40" />
    <div className="relative z-10 max-w-6xl mx-auto">
      <ScrollReveal>
        <h2 className="heading-lg text-center mb-4">
          By the <span className="text-gradient">numbers</span>.
        </h2>
        <p className="body-text text-center mb-16">A snapshot of the journey so far.</p>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {stats.map((s, i) => (
          <ScrollReveal key={s.label} delay={i * 0.03}>
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="glass rounded-xl p-5 text-center"
            >
              <p className="text-2xl md:text-3xl font-bold text-primary font-mono">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* Extra details */}
      <ScrollReveal delay={0.3}>
        <div className="mt-12 glass rounded-xl p-6 grid md:grid-cols-3 gap-4">
          <div>
            <p className="label-text mb-1">Currently Learning</p>
            <p className="font-mono text-sm text-primary">React/Next.js · Three.js/WebGL</p>
          </div>
          <div>
            <p className="label-text mb-1">Design Tools</p>
            <p className="font-mono text-sm text-muted-foreground">Stitch + Flux + Canva</p>
          </div>
          <div>
            <p className="label-text mb-1">Ecosystem Brand</p>
            <p className="font-mono text-sm text-primary">DThub</p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default StatsSection;
