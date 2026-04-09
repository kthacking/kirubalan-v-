import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { Briefcase } from "lucide-react";

const duties = [
  "Supported internal web processes and documentation",
  "Built basic web interfaces using HTML, CSS, and JavaScript",
  "Gained hands-on exposure to full-stack workflows",
  "Learned frontend–backend interaction patterns",
  "Worked with RESTful APIs and database concepts",
  "Collaborated with the team, quickly adapting to tools",
  "Consistently met deadlines across the internship",
];

const ExperienceSection = () => (
  <section className="theme-light bg-background text-foreground py-32 section-padding relative">
    <div className="absolute inset-0 grid-bg opacity-20" />
    <div className="relative z-10 max-w-5xl mx-auto">
      <ScrollReveal>
        <SectionLabel number="08" label="Experience" />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 className="heading-lg mb-16">
          Real-world <span className="text-gradient">work</span>.
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px]" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:justify-between items-start gap-6 mb-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Full Stack Web Developer Intern</h3>
                  <p className="text-lg text-primary font-semibold mt-1">VDart</p>
                  <div className="flex flex-wrap gap-3 mt-3">
                    <span className="glass px-3 py-1 rounded-full text-xs font-mono text-muted-foreground">July 2025 – September 2025</span>
                    <span className="glass px-3 py-1 rounded-full text-xs font-mono text-muted-foreground">3 months</span>
                    <span className="glass px-3 py-1 rounded-full text-xs font-mono text-muted-foreground">Trichy, India</span>
                    <span className="glass px-3 py-1 rounded-full text-xs font-mono text-primary">Paid Internship</span>
                  </div>
                </div>
              </div>
              <a
                href="/vdart-journey"
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/50 transition-all duration-300 text-primary font-medium text-sm whitespace-nowrap md:self-start self-stretch justify-center"
              >
                View Story <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>

            <div className="mb-6">
              <p className="label-text mb-2">How I Got There</p>
              <p className="body-text">Cracking the interview at VDart remains one of my proudest achievements. I worked with my own dedicated setup from day one and it felt like real work from the very beginning.</p>
            </div>

            <div className="mb-6">
              <p className="label-text mb-3">What I Delivered</p>
              <div className="space-y-2">
                {duties.map((d, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl p-5">
              <p className="label-text mb-2">Result</p>
              <p className="text-sm text-foreground font-semibold">Received Full Stack Web Development Certificate from VDart (2025)</p>

            </div>

          </div>

        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default ExperienceSection;
