import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Youtube, Mail } from "lucide-react";
import heroPhoto from "@/assets/my.png";
import foxLogo from "@/assets/redfox-logo.jpg";
import { assetsMap } from '../assetsMap';
import InteractiveGrid from "./InteractiveGrid";




const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-black overflow-hidden">
      <InteractiveGrid />
     
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
              className="heading-xl mb-8 relative"
            >
              <div className="absolute -left-10 top-0 w-24 h-24 bg-primary/20 blur-[60px] -z-10 animate-pulse" />
              <span
                className="kt whitespace-nowrap block mb-4"
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
                className="block leading-none font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c00] via-[#ffb347] to-[#ff8c00] animate-shimmer"
                style={{
                  backgroundSize: '200% auto',
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

          {/* Right - Profile Photo with Ultra-Liquid Glass Effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* 🧪 The Ultra-Liquid Glass Card */}
              <motion.div 
                whileHover={{ rotateY: -8, rotateX: 4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative w-72 h-[420px] md:w-[380px] md:h-[520px] rounded-[48px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)] border border-white/20 z-10"
              >
                {/* 🌊 Internal Liquid Layer (Amber/Orange) */}
                <div className="absolute inset-0 z-0 opacity-50 mix-blend-screen pointer-events-none">
                   <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-transparent to-orange-600/20 animate-pulse" />
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,165,0,0.2),transparent_70%)]" />
                </div>

                {/* 🧊 Deep Glass Blur */}
                <div className="absolute inset-0 backdrop-blur-[40px] bg-white/[0.03]" />

                {/* 👤 Profile Image */}
                <img
                  src={heroPhoto}
                  alt="Kirubalan V"
                  className="absolute inset-0 w-full h-full object-cover object-center z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* ✨ Pro Shine Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20" />
                
                {/* Border Highlights */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-20" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-20" />
              </motion.div>

              {/* 🔥 Fiery Orbital Lights */}
              <div className="absolute -inset-10 bg-amber-500/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              <div className="absolute -inset-10 bg-orange-600/10 blur-[100px] rounded-full translate-x-12 translate-y-12 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />

              {/* 🏷️ Floating Pro Badges (Amber Theme) */}
              <motion.div
                animate={{ y: [-15, 15, -15], rotate: [-1, 1, -1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-12 backdrop-blur-2xl bg-black/40 rounded-3xl px-6 py-4 border border-white/10 shadow-2xl z-30"
              >
                <div className="flex items-center gap-3">
                   <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)] animate-pulse" />
                   <div>
                    <p className="font-mono text-xs font-black text-amber-500 uppercase tracking-widest">15+ Repos</p>
                    <p className="text-[10px] text-white/40 font-bold tracking-tighter">GITHUB REPOSITORY</p>
                   </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [15, -15, 15], rotate: [1, -1, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-8 backdrop-blur-2xl bg-black/40 rounded-3xl px-6 py-4 border border-white/10 shadow-2xl z-30"
              >
                <div className="flex items-center gap-3">
                   <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)] animate-pulse" />
                   <div>
                    <p className="font-mono text-xs font-black text-orange-500 uppercase tracking-widest">2.8K Sub</p>
                    <p className="text-[10px] text-white/40 font-bold tracking-tighter">YT CHANNEL ACCESS</p>
                   </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>


      </div>
    </section>
  );
};

export default HeroSection;
