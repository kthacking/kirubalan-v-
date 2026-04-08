import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";

const quotes = [
  { text: "I don't just build software — I hack experiences.", context: "Personal Tagline" },
  { text: "From GTA cheats to Chrome extensions — curiosity drives everything.", context: "Origin Philosophy" },
  { text: "Progress over Perfection.", context: "QuickEdi's Philosophy" },
  { text: "Built for devs, by a dev.", context: "DThub Ecosystem" },
];

const QuotesSection = () => (
  <section className="py-32 section-padding relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/3 rounded-full blur-[80px]" />
    </div>
    <div className="relative z-10 max-w-4xl mx-auto">
      <ScrollReveal>
        <h2 className="heading-lg text-center mb-16">
          Words I <span className="text-gradient">live by</span>.
        </h2>
      </ScrollReveal>

      <div className="space-y-12">
        {quotes.map((q, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <motion.blockquote
              whileHover={{ x: 8 }}
              className="border-l-2 border-primary pl-8 py-4"
            >
              <p className="text-2xl md:text-3xl font-light text-foreground leading-relaxed">"{q.text}"</p>
              <cite className="block mt-3 font-mono text-sm text-primary not-italic">— {q.context}</cite>
            </motion.blockquote>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default QuotesSection;
