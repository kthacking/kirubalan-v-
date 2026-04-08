import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Youtube, Send, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import foxLogo from "@/assets/redfox-logo.jpg";
import { assetsMap } from '../assetsMap';
import { supabase } from '../lib/supabase';
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{ 
          name: formData.name, 
          email: formData.email, 
          message: formData.message,
          status: 'new'
        }]);

      if (error) throw error;

      setIsSent(true);
      setFormData({ name: "", email: "", message: "" });
      toast.success("Message recorded successfully!");
      
      // Auto-reset "Success" view after 8 seconds
      setTimeout(() => setIsSent(false), 8000);
      
    } catch (error) {
      toast.error("Handshake failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 section-padding relative overflow-hidden" style={{background: `url(${assetsMap['pbp']})`, backgroundSize: 'fill' }}>
      <div className="absolute inset-0" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionLabel number="14" label="Get in Touch" />
        </ScrollReveal>
        
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <ScrollReveal delay={0.1}>
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[0.9]">
                  Let's <br/> <span className="text-primary italic">Collaborate.</span>
                </h2>
                <p className="text-slate-800 max-w-md text-lg leading-relaxed font-medium">
                  Have a vision? Let's turn it into a pixel-perfect reality. Reach out for collaborations or just a tech chat.
                </p>
              </div>
            </ScrollReveal>

            <div className="space-y-8">
              {[
                { icon: Mail, label: "Correspondence", value: "kirubalan220@gmail.com", href: "mailto:kirubalan220@gmail.com" },
                { icon: Phone, label: "Voice", value: "+91 6385430428", href: "tel:+916385430428" },
                { icon: MapPin, label: "Base", value: "Trichy, Tamil Nadu, India" },
              ].map((c, i) => (
                <ScrollReveal key={c.label} delay={0.2 + (i * 0.1)}>
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-black/5 backdrop-blur-md border border-black/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                      <c.icon className="text-slate-900" size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-1">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="text-white hover:text-slate-900 transition-colors font-bold text-lg">{c.value}</a>
                      ) : (
                        <p className="font-bold text-lg text-white">{c.value}</p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.5}>
              <div className="flex gap-4 p-2 bg-black/5 w-fit rounded-3xl border border-black/10 backdrop-blur-sm">
                {[
                  { icon: Github, href: "https://github.com/kthacking" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/kirubalan-v" },
                  { icon: Youtube, href: "#" },
                ].map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-black/5 hover:bg-white hover:text-slate-900 flex items-center justify-center text-slate-900 transition-all duration-500 border border-black/5">
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.3}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl opacity-30" />
              
              <AnimatePresence mode="wait">
                {isSent ? (
                   <motion.div 
                     key="success"
                     initial={{ opacity: 0, scale: 0.9, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 1.1 }}
                     className="bg-white/10 backdrop-blur-[9px] rounded-[2.5rem] p-12 border border-white/20 flex flex-col items-center justify-center text-center space-y-6 min-h-[500px]"
                   >
                     <div className="relative">
                       <motion.div 
                         initial={{ scale: 0 }}
                         animate={{ scale: 1 }}
                         transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                         className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                       >
                         <CheckCircle2 size={48} />
                       </motion.div>
                     </div>
                     <div className="space-y-2">
                       <h3 className="text-3xl font-black text-white tracking-tight">Signal Received!</h3>
                       <p className="text-slate-900 text-sm max-w-[280px] leading-relaxed mx-auto font-medium">
                         The Redfox team will review your inquiry. Expect a response shortly.
                       </p>
                     </div>
                     <button 
                       onClick={() => setIsSent(false)}
                       className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 pt-4"
                     >
                       <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
                       Send another message
                     </button>
                   </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="bg-white/10 backdrop-blur-[9px] rounded-[2.5rem] p-10 mt-10 space-y-6 border border-white/10"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-900 px-1">Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-black/5 border border-black/10 rounded-2xl px-5 py-4 text-sm text-slate-900 placeholder:text-black/20 focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                          placeholder="Project Lead" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-900 px-1">Email</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-black/5 border border-black/10 rounded-2xl px-5 py-4 text-sm text-slate-900 placeholder:text-black/20 focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                          placeholder="client@growth.com" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-900 px-1">Vision Brief</label>
                      <textarea 
                        rows={5} 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-black/5 border border-black/10 rounded-2xl px-5 py-4 text-sm text-slate-900 placeholder:text-black/20 focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none" 
                        placeholder="Tell us about your project..." 
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-slate-900 text-white h-16 rounded-2xl font-bold text-sm hover:bg-primary transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50 group overflow-hidden relative"
                    >
                      <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      <span className="relative z-10 flex items-center gap-3">
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Transmitting...
                          </>
                        ) : (
                          <>
                            Initiate Spark
                            <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.6}>
          <div className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 shadow-sm bg-white/10 backdrop-blur-sm">
                <img src={foxLogo} alt="REDFOX" className="doi w-full h-full object-cover" style={{ mixBlendMode: 'multiply'} }/>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                <span className="text-white font-black">© 2026</span> REDFOX ECOSYSTEM • BUILT BY KIRUBALAN V
              </div>
            </div>
            <div className="flex gap-8 font-mono text-[10px] uppercase tracking-widest text-slate-500">
              <span className="hover:text-primary transition-colors cursor-pointer">Security Protocol 1.0</span>
              <span className="hover:text-primary transition-colors cursor-pointer">Privacy Matrix</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
