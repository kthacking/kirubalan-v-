import { useState, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { Award, X, ZoomIn, Star } from "lucide-react";
import { supabase } from '../lib/supabase';
import cardFrame from "@/assets/cardframe.png";

const CertificationsSection = () => {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [specialCertCards, setSpecialCertCards] = useState<any[]>([]);
  const [gifs, setGifs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch all certificates from Supabase
        const { data: certData, error: certError } = await supabase
          .from('assets')
          .select('*')
          .eq('type', 'certificate')
          .order('created_at', { ascending: true });

        if (certError) throw certError;

        // 2. Fetch decorative Gifs and backgrounds
        const { data: gifData, error: gifError } = await supabase
          .from('assets')
          .select('name, url')
          .in('name', ['g10', 'g17', 'g8', 'b1', 'bib']);

        if (gifError) throw gifError;

        const gifMap: Record<string, string> = {};
        gifData?.forEach(g => { gifMap[g.name] = g.url; });
        setGifs(gifMap);

        // 3. Process certificates (Parsing composite name string: SPECIAL | Title | Details)
        const special: any[] = [];
        const standard: any[] = [];

        certData?.forEach(asset => {
          const parts = asset.name.split(' | ');
          
          if (parts[0] === 'SPECIAL') {
            const title = parts[1];
            const details = parts[2] || "";
            
            // Map specific GIFs to the 3 special items
            let gifName = "g10";
            if (title.includes("VDart")) gifName = "g17";
            else if (title.includes("Field Visit")) gifName = "g8";

            special.push({
              title,
              details,
              image: asset.url,
              gif: gifMap[gifName] || "",
              featured: true
            });
          } else {
            const title = parts[0];
            const details = parts[1] || "Professional certification achievement.";
            
            standard.push({
              title,
              details,
              image: asset.url
            });
          }
        });

        setSpecialCertCards(special);
        setCertificates(standard);
      } catch (err) {
        console.error("Error loading certs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return null;

  return (
    <section className="theme-light bg-background text-foreground py-32 section-padding">
      <div className="max-w-6xl mx-auto">
        {/* Certifications Header */}
        <ScrollReveal>
          <SectionLabel number="09" label="Certifications" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="heading-lg mb-12">
            <span className="text-gradient">Certified</span> skills.
          </h2>
        </ScrollReveal>

        {/* Special Certificates Row */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {specialCertCards.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 0.12}>
              <div className="relative glass-strong rounded-2xl overflow-hidden h-full flex flex-col group border border-primary/30 neon-glow">
                <div className="absolute inset-0 z-0">
                  <img src={c.gif} alt="" className="w-full h-full object-cover opacity-25" />
                  <img src={gifs['b1']} alt="" style={{ zIndex: "10" , position:"absolute" , top:"-20%" , left:"30%"}} />
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold backdrop-blur-sm border border-primary/30">
                    <Star size={12} className="fill-primary" />
                  </span>
                </div>
                
                <div className="relative cursor-pointer overflow-hidden z-10" onClick={() => setLightboxImg(c.image)}>
                  <img src={c.image} alt={c.title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="text-primary" size={32} />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col relative z-20 bg-background/40 backdrop-blur-md">
                   <h3 className="text-lg font-bold text-foreground mb-4">{c.title}</h3>
                  <div className="space-y-3">
                    {c.details.split('. ').map((sentence: string, idx: number) => (
                      sentence.trim() && (
                        <p key={idx} className="text-sm text-muted-foreground leading-relaxed">
                          {sentence.trim()}{sentence.endsWith('.') ? '' : '.'}
                        </p>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Standard Certificates Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-24">
          {certificates.map((c, i) => (
            <ScrollReveal key={c.title + i} delay={i * 0.08}>
              <div className="glass rounded-2xl overflow-hidden h-full flex flex-col group border border-border/10 hover:border-primary/30 transition-all duration-500">
                <div className="relative cursor-pointer overflow-hidden aspect-[4/3]" onClick={() => setLightboxImg(c.image)}>
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="text-white" size={24} />
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col bg-white/5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Award className="text-primary" size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">{c.title}</h3>
                  <div className="space-y-2">
                    {c.details.split('. ').map((s: string, idx: number) => (
                      s.trim() && (
                        <p key={idx} className="text-[11px] text-muted-foreground leading-snug">
                          {s.trim()}{s.endsWith('.') ? '' : '.'}
                        </p>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="relative bg-[#030303] rounded-[48px] mt-32 py-24 px-4 md:px-12 overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
          {/* Subtle Ambient Glows - Orange & Red Mix */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,80,0,0.06)_0%,transparent_60%)] pointer-events-none will-change-[opacity]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(220,38,38,0.05)_0%,transparent_60%)] pointer-events-none will-change-[opacity]" />

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="flex justify-center md:block mb-4">
              <ScrollReveal>
                <SectionLabel number="10" label="Achievements & Milestones" />
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.1}>
              <h2 className="heading-lg mb-20 text-center md:text-left text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Milestones</span> unlocked.
              </h2>
            </ScrollReveal>

            <div className="relative">
              {/* Central glowing timeline line */}
              <div className="absolute top-0 bottom-0 left-[24px] md:left-1/2 w-[2px] -translate-x-[1px] bg-gradient-to-b from-transparent via-purple-500/30 to-transparent" />
              
              <div className="space-y-4">
                {ACHIEVEMENTS.map((a, i) => (
                  <TimelineItem key={a.title} a={a} i={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors">
            <X size={32} /> 
          </button>
          <img src={lightboxImg} alt="Certificate Full View" className="max-w-full max-h-[90vh] rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] object-contain" />
        </div>
      )}
    </section>
  );
};

// Sub-component for Timeline Items
const TimelineItem = ({ a, i }: any) => {
  const isLeft = i % 2 === 0;
  return (
    <ScrollReveal delay={i * 0.1}>
      <div className="relative flex items-center group/timeline w-full pb-8 md:pb-16 last:pb-0">
        {/* Futuristic Timeline Dot */}
        <div className="absolute left-[24px] md:left-1/2 w-8 h-8 -translate-x-1/2 flex items-center justify-center z-20">
          <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-[8px] group-hover/timeline:bg-cyan-500/40 transition-colors duration-500" />
          <div className="w-3 h-3 rounded-full bg-purple-500 border-2 border-[#050505] group-hover/timeline:bg-cyan-400 group-hover/timeline:shadow-[0_0_15px_rgba(34,211,238,0.8)] group-hover/timeline:scale-150 transition-all duration-300 will-change-transform" />
        </div>

        {/* Desktop Wrapper handling exactly 2 halves */}
        <div className="hidden md:flex w-full items-center relative z-10">
           {isLeft ? (
              <>
                 {/* Left Half (The Card) */}
                 <div className="w-1/2 flex justify-end pr-12 lg:pr-20">
                    <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center z-20">
                       <img src={cardFrame} className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_0_10px_rgba(168,85,247,0.2)] rotate-90" alt="Neon Frame" />
                       <div className="relative z-10 flex flex-col items-center justify-center text-center px-8">
                         <span className="font-mono text-cyan-400 text-xs font-black tracking-[0.2em] uppercase opacity-80 mb-2 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]">
                           Mission {String(i + 1).padStart(2, "0")}
                         </span>
                         <h4 className="text-lg font-bold text-white leading-tight drop-shadow-lg px-2 line-clamp-3">
                           {a.title}
                         </h4>
                       </div>
                    </div>
                 </div>

                 {/* Right Half (The Desc Popup) */}
                 <div className="w-1/2 flex justify-start pl-12 lg:pl-20 relative items-center">
                    <div className="w-[280px] lg:w-[320px] opacity-0 pointer-events-none transition-all duration-300 ease-out -translate-x-5 group-hover/timeline:translate-x-0 group-hover/timeline:opacity-100 bg-[#050505]/95 border border-purple-500/20 p-6 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.15)] backdrop-blur-md">
                       <p className="text-sm text-white/70 leading-relaxed font-medium">
                         {a.desc}
                       </p>
                    </div>
                 </div>
              </>
           ) : (
              <>
                 {/* Left Half (The Desc Popup) */}
                 <div className="w-1/2 flex justify-end pr-12 lg:pr-20 relative items-center">
                    <div className="w-[280px] lg:w-[320px] opacity-0 pointer-events-none transition-all duration-300 ease-out translate-x-5 group-hover/timeline:translate-x-0 group-hover/timeline:opacity-100 bg-[#050505]/95 border border-purple-500/20 p-6 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.15)] backdrop-blur-md text-right">
                       <p className="text-sm text-white/70 leading-relaxed font-medium">
                         {a.desc}
                       </p>
                    </div>
                 </div>

                 {/* Right Half (The Card) */}
                 <div className="w-1/2 flex justify-start pl-12 lg:pl-20">
                    <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center z-20">
                       <img src={cardFrame} className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_0_10px_rgba(168,85,247,0.2)] rotate-90" alt="Neon Frame" />
                       <div className="relative z-10 flex flex-col items-center justify-center text-center px-8">
                         <span className="font-mono text-cyan-400 text-xs font-black tracking-[0.2em] uppercase opacity-80 mb-2 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]">
                           Mission {String(i + 1).padStart(2, "0")}
                         </span>
                         <h4 className="text-lg font-bold text-white leading-tight drop-shadow-lg px-2 line-clamp-3">
                           {a.title}
                         </h4>
                       </div>
                    </div>
                 </div>
              </>
           )}
        </div>

        {/* Mobile View */}
        <div className="md:hidden w-full pl-[56px] pr-4 flex flex-col justify-center relative">
           <div className="relative w-full max-w-[260px] aspect-square flex items-center justify-center z-20">
              <img src={cardFrame} className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_0_10px_rgba(168,85,247,0.2)] rotate-90" alt="Neon Frame" />
              
              <div className="relative z-10 flex flex-col items-center justify-center text-center px-8">
                <span className="font-mono text-cyan-400 text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase opacity-80 mb-2 drop-shadow-md">
                  Mission {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white leading-tight px-2 line-clamp-3">
                  {a.title}
                </h4>
              </div>
           </div>

           {/* Mobile Expanding Description (Fade Down) */}
           <div className="w-full max-w-[260px] mt-2 opacity-0 h-0 overflow-hidden pointer-events-none group-hover/timeline:opacity-100 group-hover/timeline:h-auto group-hover/timeline:pointer-events-auto transition-all duration-300">
              <div className="bg-[#050505]/95 border border-cyan-500/30 p-4 rounded-xl backdrop-blur-md shadow-2xl mt-4">
                 <p className="text-xs text-white/70 leading-relaxed font-medium text-center">
                   {a.desc}
                 </p>
              </div>
           </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

const ACHIEVEMENTS = [
  { title: "VDart Internship", desc: "Cracked the interview. Completed 3-month full-stack internship. I worked with my own dedicated setup from day one." },
  { title: "Bug Bounty", desc: "Found and reported a real security bug in my college's EDU website. Responsible disclosure. Real-world security impact." },
  { title: "YouTube — KT Hacking", desc: "Built a hacking channel from zero to 2,000–3,000 subscribers. Rebuilt from scratch after termination. Resilience in action." },
  { title: "Tools Used by Friends & Peers", desc: "Friends and peers actively use ZIPStruct and QuickEdi in real workflows. Real-world adoption is the ultimate validation." },
  { title: "LinkedIn Recognition", desc: "Posted tools on LinkedIn. Received congratulations and community engagement. Built a professional presence through shipped work." },
  { title: "DThub Ecosystem", desc: "I've created and architected my own developer ecosystem. ZIPStruct is officially branded as 'Part of the DThub Ecosystem.'" },
  { title: "QuickEdi GitHub Star", desc: "Received a GitHub star on QuickEdi (Nexus Builder). First external recognition for the visual site builder." },
  { title: "Self-Taught Journey", desc: "Complete self-directed path: game hacker in 6th grade → professional full-stack developer in 2025. 100% curiosity-driven." },
  { title: "College Web Project", desc: "Developed a full web project during college — beyond curriculum requirements.                                               ." },
  { title: "TCS Certified", desc: "Soft Skills & Communication certified by Tata Consultancy Services — 2024." },
];

export default CertificationsSection;
