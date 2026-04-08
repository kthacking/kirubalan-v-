import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from '../lib/supabase';
import foxLogo from "../assets/redfox-logo.jpg";

const SceneCard = ({ scene, index }: { scene: any, index: number }) => {
  const extra = scene.extra_data || {};
  const isZigZag = extra.isZigZagLayout;
  const isSplit = extra.isSplitLayout;

  const renderLines = (lines: string[]) => {
    return lines.map((line, i) => {
      if (line === "---") return <div key={i} className="h-4 md:h-6" />;

      const lowerLine = line.toLowerCase();
      const isHighlight = lowerLine.includes("i chose experience") ||
        lowerLine.includes("changed everything") ||
        lowerLine.includes("selection") ||
        lowerLine.includes("evolved") ||
        lowerLine.includes("mastered");

      if (line.includes("Shekinah Florance")) {
        const parts = line.split("Shekinah Florance");
        return (
          <p key={i} className="text-slate-600 text-lg md:text-xl leading-relaxed font-sans">
            {parts[0]}
            <span className="blur-md select-none leading-none inline-block decoration-transparent">
              Shekinah Florance
            </span>
            {parts[1]}
          </p>
        );
      }

      return (
        <p key={i} className={`${isHighlight ? 'text-blue-600 font-bold text-xl md:text-3xl my-6' : 'text-slate-600 text-lg md:text-xl'} leading-relaxed font-sans`}>
          {line}
        </p>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mb-40 md:mb-64"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Category & Order Info */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[10px] font-black tracking-[0.2em] text-blue-500 uppercase px-4 py-1.5 bg-blue-50/50 rounded-full border border-blue-100">
            {scene.category || "Moment"} • STEP 0{index + 1}
          </span>
        </div>

        {/* Narrative Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          {/* Text Content */}
          <div className="lg:col-span-4 space-y-10 order-2 lg:order-1">
            <h2 className="text-4xl md:text-7xl font-serif text-slate-900 leading-[1.05] tracking-tight">
              {scene.title}
            </h2>

            <div className="space-y-2">
              {isSplit ? (
                <div className="space-y-12">
                  <div className="space-y-4">{renderLines(extra.linesPart1 || [])}</div>
                  <div className="space-y-4">{renderLines(extra.linesPart2 || [])}</div>
                  <div className="space-y-4 pt-10 border-t border-slate-100">
                    {renderLines(extra.linesPart3 || [])}
                    {scene.title.includes("First Day") && (
                      <div className="flex flex-wrap gap-3 mt-10">
                        {['HTML', 'CSS', 'JavaScript'].map(tag => (
                          <span key={tag} className="px-5 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-400 font-mono text-[10px] font-bold uppercase tracking-widest">{tag}</span>
                        ))}
                        <span className="px-5 py-2 rounded-lg bg-blue-600 text-white font-bold font-mono text-[10px] uppercase tracking-widest shadow-lg shadow-blue-200">React</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : isZigZag ? (
                <div className="space-y-32">
                  {extra.blocks?.map((block: any, bIdx: number) => (
                    <div key={bIdx} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-center group/block">
                      <div className="lg:col-span-4 space-y-4">{renderLines(block.lines || [])}</div>
                      {block.image_url && (
                        <div className="lg:col-span-8 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100/50 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)]">
                          <img
                            src={block.image_url}
                            alt="Process step"
                            className="w-full h-auto block"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {renderLines(extra.lines || [])}
                </div>
              )}
            </div>
          </div>

          {/* Visual Presentation (Main Image for Non-ZigZag) */}
          {!isZigZag && scene.image_url && (
            <div className="lg:col-span-8 order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-slate-100">
                <img
                  src={scene.image_url}
                  alt={scene.title}
                  className="w-full h-auto block transition-transform duration-1000"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const VDartJourney = () => {
  const [journeyData, setJourneyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJourney = async () => {
      try {
        const { data, error } = await supabase
          .from('vdart_journey')
          .select('*')
          .order('scene_order', { ascending: true });

        if (error) throw error;
        setJourneyData(data || []);
      } catch (err) {
        console.error("Failed to fetch journey:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJourney();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-8 bg-white/70 backdrop-blur-xl border-b border-slate-100 flex justify-between items-center transition-all">
        <Link to="/" className="group flex items-center gap-4 text-[11px] font-black text-slate-400 hover:text-blue-600 tracking-widest transition-all">
          <ArrowLeft size={16} /> BACK TO PORTFOLIO
        </Link>
        <div className="flex items-center gap-4">
          <div className="font-mono text-[9px] font-bold text-slate-300 tracking-[0.4em] uppercase">
            VDART INT. LOG • 2025
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
               src={foxLogo} 
               alt="REDFOX" 
               className="w-full h-full object-cover rounded-full" 
               style={{ mixBlendMode: "multiply" }}
            />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="space-y-12"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-blue-500" />
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em]">Full-Stack Internship Story</span>
            </div>
            <h1 className="text-[12vw] md:text-[8rem] lg:text-[10rem] font-serif text-slate-900 tracking-tight leading-[0.85] italic">
              Production <br /> Engineering.
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 font-light max-w-3xl leading-relaxed">
              A detailed photographic record of my professional growth at VDart, transitioning from theoretical knowledge to building real enterprise systems.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Narrative */}
      <main className="pb-64 space-y-40 md:space-y-64">
        {journeyData.map((scene, idx) => (
          <SceneCard key={scene.id} scene={scene} index={idx} />
        ))}
      </main>

      {/* Final Outro */}
      <footer className="bg-slate-50 py-48 px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-16"
        >
          <h3 className="text-5xl md:text-8xl font-serif text-slate-900 tracking-tighter italic">From student, <br /> to engineer.</h3>

          <Link to="/" className="group inline-flex items-center gap-6 px-12 py-5 bg-white border border-slate-200 rounded-full text-sm font-bold shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-500">
            VIEW MORE PROJECTS
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white transition-transform group-hover:rotate-45">
              <ChevronRight size={16} />
            </div>
          </Link>
        </motion.div>
      </footer>
    </div>
  );
};

export default VDartJourney;
