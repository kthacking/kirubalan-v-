import { useState, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { Award, X, ZoomIn, Star } from "lucide-react";
import { supabase } from '../lib/supabase';

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
        <ScrollReveal>
          <SectionLabel number="10" label="Achievements & Milestones" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="heading-lg mb-12">
            <span className="text-gradient">Milestones</span> unlocked.
          </h2>
        </ScrollReveal>

        <div className="relative max-w-5xl mx-auto py-10 mt-8 border-t border-border/50 md:border-none pt-12 md:pt-10">
          <div className="absolute top-0 bottom-0 left-[24px] md:left-1/2 w-[2px] -translate-x-[1px] bg-gradient-to-b from-primary/50 via-primary/10 to-transparent z-0" />
          
          <div className="space-y-12 md:space-y-24">
            {ACHIEVEMENTS.map((a, i) => (
              <TimelineItem key={a.title} a={a} i={i} gifBg={gifs['bib']} />
            ))}
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
const TimelineItem = ({ a, i, gifBg }: any) => {
  const isLeft = i % 2 === 0;
  return (
    <ScrollReveal delay={i * 0.1}>
      <div className="relative flex items-center group w-full">
        <div className="absolute left-[24px] md:left-1/2 w-10 h-10 -translate-x-1/2 flex items-center justify-center rounded-full bg-background border-4 border-primary/20 group-hover:border-primary group-hover:scale-110 transition-all duration-300 z-10 shadow-lg">
          <div className="relative flex items-center justify-center w-3 h-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-50 group-hover:animate-ping" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
          </div>
        </div>

        <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isLeft ? 'md:pr-14' : 'md:pl-14 md:ml-auto'}`}>
          <div className="relative glass rounded-2xl p-6 md:p-8 glass-hover transition-all duration-500 group-hover:-translate-y-2 border border-border/50 group-hover:border-primary/50 overflow-hidden" 
               style={{ background: gifBg ? `url(${gifBg})` : 'rgba(255, 255, 255, 1)', backgroundSize: 'cover', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(255, 255, 255, 0)255, 0.5)' }}>
            <div className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} -mr-12 -mt-12 w-48 h-48 bg-primary/10 rounded-full blur-[50px] group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none`} />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary font-mono text-lg font-bold shrink-0 shadow-inner group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{a.title}</h4>
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{a.desc}</p>
            </div>
            <div className={`absolute bottom-0 h-1 bg-gradient-to-r from-primary to-transparent w-0 group-hover:w-full transition-all duration-700 ease-out ${isLeft ? 'left-0' : 'right-0'}`} />
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

const ACHIEVEMENTS = [
  { title: "VDart Internship", desc: "Cracked the interview. Completed 3-month full-stack internship. Had his own dedicated workstation at the office." },
  { title: "Bug Bounty", desc: "Found and reported a real security bug in his college's EDU website. Responsible disclosure. Real-world security impact." },
  { title: "YouTube — KT Hacking", desc: "Built a hacking channel from zero to 2,000–3,000 subscribers. Rebuilt from scratch after termination. Resilience in action." },
  { title: "Tools Used by Friends & Peers", desc: "Friends and peers actively use ZIPStruct and QuickEdi in real workflows. Real-world adoption is the ultimate validation." },
  { title: "LinkedIn Recognition", desc: "Posted tools on LinkedIn. Received congratulations and community engagement. Built a professional presence through shipped work." },
  { title: "DThub Ecosystem", desc: "Created and named his own developer ecosystem. ZIPStruct is officially branded as 'Part of the DThub Ecosystem.'" },
  { title: "QuickEdi GitHub Star", desc: "Received a GitHub star on QuickEdi (Nexus Builder). First external recognition for the visual site builder." },
  { title: "Self-Taught Journey", desc: "Complete self-directed path: game hacker in 6th grade → professional full-stack developer in 2025. 100% curiosity-driven." },
  { title: "College Web Project", desc: "Developed a full web project during college — beyond curriculum requirements.                                               ." },
  { title: "TCS Certified", desc: "Soft Skills & Communication certified by Tata Consultancy Services — 2024." },
];

export default CertificationsSection;
