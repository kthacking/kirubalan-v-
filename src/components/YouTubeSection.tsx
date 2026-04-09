import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { Youtube, MonitorPlay, Smartphone, Play } from "lucide-react";
import { assetsMap } from '../assetsMap';


// Video data
const videos = [
  "HBAPUB0IXLQ",
  "u30cE97O9lY",
  "0GcjDKaNlb8",
  "zK5h1U6qoQ0",
  "VQImqm2lhRw"
];

const shorts = [
  "9rJBb2wJEfs",
  "phqju8TWSsE",
  "wkxGaZREl5c"
];

const timeline = [
  { label: "Started", value: "~6th Grade (gaming content)" },
  { label: "Evolved", value: "Hacking tutorials" },
  { label: "Terminated", value: "YouTube removed channel (no disclaimers)" },
  { label: "Relaunched", value: 'Rebuilt with disclaimers — "KT Hacking"' },
  { label: "Current", value: "Active channel, paused uploads — focused on dev work" },
];

/**
 * Lite YouTube Embed — shows a static thumbnail and only loads
 * the heavy iframe when the user clicks play.
 * Eliminates ERR_QUIC_PROTOCOL_ERROR caused by YouTube's QUIC thumbnail fetches.
 */
const LiteYouTube = ({ id, isShort = false }: { id: string; isShort?: boolean }) => {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${id}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      className="absolute inset-0 w-full h-full cursor-pointer group/play bg-black"
      onClick={() => setActive(true)}
      aria-label={`Play video ${id}`}
    >
      {/* Thumbnail — uses img.youtube.com which serves over standard HTTPS (no QUIC) */}
      <img
        src={isShort 
          ? `https://img.youtube.com/vi/${id}/mqdefault.jpg`
          : `https://img.youtube.com/vi/${id}/hqdefault.jpg`
        }
        alt=""
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover/play:bg-black/20 transition-colors duration-300" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-600/90 group-hover/play:bg-red-600 group-hover/play:scale-110 transition-all duration-300 flex items-center justify-center shadow-[0_0_30px_rgba(255,0,0,0.4)]">
          <Play size={28} className="text-white ml-1" fill="white" />
        </div>
      </div>
    </button>
  );
};

const YouTubeSection = () => (
  <section className="theme-light bg-background text-foreground py-32 section-padding relative overflow-hidden">
    {/* Decorative background shapes */}
    <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-[#FFE800]/5 rounded-full blur-[150px] pointer-events-none" />
    <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
    <div className="relative z-10 max-w-6xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <ScrollReveal>
             <SectionLabel number="11" label="YouTube" />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="heading-lg mt-6 text-[#FFE800]">
              Content <span className="text-gradient">Creator</span>.
            </h2>
            <p className="body-text mt-4 max-w-xl">
              Sharing knowledge, hacking tutorials, and developer tools with the world through video content.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Channel Profile Banner & Stats */}
      <ScrollReveal delay={0.2}>
        <div className="glass rounded-3xl overflow-hidden shadow-sm border border-border/50 group hover:border-[#FFE800]/30 transition-all duration-500">
          {/* Banner */}
          <div className="h-40 md:h-64 w-full bg-gradient-to-r from-zinc-900 via-zinc-900 to-black relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
            {/* Ambient light glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[100px] bg-[#FFE800]/20 blur-[70px]"></div>
            <img src={assetsMap['1775494829Jpg']} alt="" loading="lazy" onError={(e) => (e.currentTarget.style.display = 'none')} />
          </div>
          
          {/* Channel Info */}
          <div className="px-6 md:px-12 pb-8 md:pb-12 relative flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 -mt-16 md:-mt-20">
            {/* Avatar */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background bg-zinc-900 flex items-center justify-center overflow-hidden shadow-xl relative z-10 flex-shrink-0">
            <img src={assetsMap['cp'] || "public/photos/cp.jpg"} alt="KT Hacking" loading="lazy" onError={(e) => (e.currentTarget.src = 'https://ui-avatars.com/api/?name=KT&background=FF0000&color=fff')} />
            </div>

            {/* Stats & Actions */}
            <div className="flex-1 mt-2 md:mt-24 text-center md:text-left w-full">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 justify-between">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground">KT HACKING 220</h3>
                  <p className="text-muted-foreground font-medium mt-1">@kiruba220 • 2.88K subscribers • 137 videos</p>
                </div>
                <a 
                  href="https://www.youtube.com/@kiruba220" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-foreground text-background hover:bg-[#FFE800] hover:text-black px-6 py-3 rounded-full font-semibold transition-all duration-300 w-full md:w-auto hover:shadow-[0_0_20px_rgba(255,232,0,0.4)]"
                >
                  <Youtube size={20} />
                  Subscribe
                </a>
              </div>
              <p className="body-text mt-4 max-w-3xl leading-relaxed">
                I originally started as a gaming content creator in 6th grade. My first channel evolved into a hacking channel, which was later terminated, but I rebuilt it safely from scratch as "KT Hacking". Now, I'm focused on software development and building tools while leaving the videos online for education.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Featured Videos */}
      <ScrollReveal delay={0.3}>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-[#FFE800]/10 rounded-lg">
                <MonitorPlay size={24} className="text-[#FFE800]" />
             </div>
             <h3 className="heading-md text-[#FFE800]">Featured <span className="text-gradient">Videos</span>.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((id, idx) => (
              <div key={idx} className="glass rounded-2xl overflow-hidden shadow-sm group hover:-translate-y-1 transition-transform duration-300 border border-border/40">
                <div className="w-full aspect-video relative bg-zinc-900">
                  <LiteYouTube id={id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* YouTube Shorts */}
      <ScrollReveal delay={0.4}>
        <div className="space-y-6 mt-16">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-[#FFE800]/10 rounded-lg">
                <Smartphone size={25} className="text-[#FFE800]" />
             </div>
             <h3 className="heading-md text-[#FFE800]">Popular <span className="text-gradient">Shorts</span>.</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl">
            {shorts.map((id, idx) => (
              <div key={idx} className="glass rounded-2xl overflow-hidden shadow-sm group hover:-translate-y-1 transition-transform duration-300 border border-border/40 mx-auto w-full max-w-[320px]">
                <div className="w-full aspect-[9/16] relative bg-zinc-900">
                  <LiteYouTube id={id} isShort />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Channel History Timeline */}
      <ScrollReveal delay={0.5}>
        <div className="mt-16 glass p-8 md:p-12 rounded-3xl border border-border/50">
           <div className="flex flex-col md:flex-row gap-12">
             <div className="md:w-1/3">
                <h3 className="text-3xl font-bold mb-4 text-[#FFE800]">Channel <span className="text-gradient">Journey</span>.</h3>
                <p className="body-text">Every setback is a setup for a comeback. Rebuilding the channel from scratch taught resilience and the importance of adapting to platforms.</p>
             </div>
             <div className="md:w-2/3 border-l-2 border-border/60 pl-6 md:pl-10 space-y-8 relative">
                {timeline.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[33px] md:-left-[49px] top-1.5 w-4 h-4 rounded-full bg-[#FFE800] border-4 border-background shadow-[0_0_10px_rgba(255,232,0,0.5)]" />
                    <h4 className="text-lg font-bold text-foreground mb-1">{item.label}</h4>
                    <p className="text-muted-foreground">{item.value}</p>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </ScrollReveal>

    </div>
  </section>
);

export default YouTubeSection;
