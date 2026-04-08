import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, User, MessageSquare, Calendar, Loader2, 
  Trash2, CheckCircle, ExternalLink, Filter, ChevronDown, 
  Search, Eye, SquareCheck
} from "lucide-react";
import { toast } from "sonner";

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  status: 'new' | 'read' | 'replied';
  is_deleted: boolean;
}

type FilterStatus = 'all' | 'new' | 'read' | 'replied';

const MyConnectSection = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all');

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("contacts")
        .select("id, name, message, status, created_at")
        .eq("is_deleted", false)
        .order("created_at", { ascending: false });

      if (activeFilter !== 'all') {
        query = query.eq('status', activeFilter);
      }

      const { data, error } = await query.limit(50);

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [activeFilter]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <section id="connect" className="py-32 section-padding relative overflow-hidden bg-[#fafafa]">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionLabel number="15" label="Network Feed" />
        </ScrollReveal>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <ScrollReveal delay={0.1}>
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                My Connect<span className="text-primary italic">.</span>
              </h2>
              <p className="text-slate-500 max-w-md text-sm leading-relaxed">
                Recent inquiries and professional connections from the Redfox ecosystem.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
              {(['all', 'new', 'replied'] as FilterStatus[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeFilter === filter 
                      ? "bg-slate-900 text-white shadow-md shadow-slate-200" 
                      : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fetching Records...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {contacts.length === 0 ? (
                <motion.div 
                   key="empty"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="col-span-full py-32 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center space-y-4"
                >
                  <Search className="w-8 h-8 text-slate-200" />
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No transmissions detected</p>
                </motion.div>
              ) : (
                contacts.map((contact, index) => (
                  <motion.div
                    key={contact.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-[2rem] p-8 border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col h-full"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <User size={20} />
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                        {new Date(contact.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </div>
                    </div>

                    <div className="space-y-4 flex-grow">
                      <h4 className="font-black text-slate-900 text-xl tracking-tight leading-none group-hover:text-primary transition-colors">
                        {contact.name}
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-6 italic">
                        "{contact.message}"
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-50 flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                       <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Verified Inquiry</span>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyConnectSection;
