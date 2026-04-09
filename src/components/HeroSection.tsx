import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Youtube, Mail } from "lucide-react";
import heroPhoto from "@/assets/my.png";
import foxLogo from "@/assets/redfox-logo.jpg";
import { assetsMap } from '../assetsMap';




const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-white grid-bg overflow-hidden">
      {/* Floating elements */}
      <div className="floating-element top-20 left-10 w-20 h-20 border border-primary/20 rounded-full animate-float" />
      <div className="floating-element top-40 right-20 w-32 h-32 border border-primary/10 rounded-full animate-float" style={{ animationDelay: "2s" }} />
      <div className="floating-element bottom-40 left-1/4 w-16 h-16 bg-primary/5 rounded-lg rotate-45 animate-float" style={{ animationDelay: "4s" }} />
      <div className="floating-element top-1/3 right-1/3 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
      <div className="floating-element bottom-1/3 left-1/3 w-3 h-3 bg-primary rounded-full animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      {/* Gradient orb */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 -left-32 w-64 h-64 bg-primary/3 rounded-full blur-[100px]" />

      <div className="section-padding relative z-10 py-20">
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-20"
        >
          <div className="flex items-center gap-3">
            <div id="fox-logo-slot" className="w-8 h-8 rounded-full overflow-hidden">
              <img 
                id="fox-logo-static" 
                src={foxLogo} 
                alt="REDFOX" 
                className="w-full h-full object-cover rounded-full transition-opacity duration-300" 
                style={{ opacity: 0, mixBlendMode: "multiply" }}
              />
            </div>
            <span className="font-mono text-sm text-muted-foreground">REDFOX</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/kthacking" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Github size={18} /></a>
            <a href="https://www.linkedin.com/in/kirubalan-v" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={18} /></a>
            <a href="mailto:kirubalan220@gmail.com" className="text-muted-foreground hover:text-primary transition-colors"><Mail size={18} /></a>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div className="md:w-full lg:w-4/5 text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="label-text mb-6"
            >
              Full-Stack Web Developer · Browser Hacker · Tool Builder
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="heading-xl mb-6"
            >
              <span 
                className="kt whitespace-nowrap block mb-2" 
                style={{ 
                  backgroundImage: `url(${assetsMap['g8']})`,
                  animation: 'moveBg 12s linear infinite'
                }}
              >
                {[..."KIRUBALAN"].map((letter, i) => (
                  <span key={i} className="kigif">{letter}</span>
                ))}
              </span>
              <span 
                className=" block leading-none"
                style={{ 
                 
                  color:'lightgreen',
                }}
              >
                V
              </span>

            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="body-text max-w-lg mb-4"
            >
              "I don't just build software — I hack experiences."
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-mono text-sm text-muted-foreground mb-8"
            >
              aka <span className="text-primary">kthacking</span> / <span className="text-primary">KT</span> — Trichy, Tamil Nadu, India
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              {["🎯 Hacker", "REDFOX Ecosystem", "BCA IT — 7.9 CGPA"].map((tag) => (
                <span key={tag} className="glass px-4 py-2 rounded-full text-sm font-mono text-muted-foreground">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right - Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative">

              {/* Profile Card — Static, lightweight */}
              <div className="w-72 h-72 md:w-96 md:h-96 z-10">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-black/5">
                  <img 
                    src={heroPhoto} 
                    alt="Kirubalan V" 
                    className="w-full h-full object-cover" 
                    loading="eager" 
                    fetchPriority="high"
                  />
                </div>
              </div>
              {/* Floating card */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 glass-strong rounded-xl px-4 py-3"
              >
                <p className="font-mono text-xs text-primary">15 repos</p>
                <p className="text-xs text-muted-foreground">on GitHub</p>
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -top-4 -right-4 glass-strong rounded-xl px-4 py-3"
              >
                <p className="font-mono text-xs text-primary">2K+ subs</p>
                <p className="text-xs text-muted-foreground">YouTube</p>
              </motion.div>
            </div>
          </motion.div>
        </div>


      </div>
    </section>
  );
};

export default HeroSection;
