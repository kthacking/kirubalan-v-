import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { FileText, Download, ExternalLink } from "lucide-react";

const ResumeSection = () => {
  const resumeUrl = "/resume/kr.pdf";

  return (
    <section className="theme-light bg-background text-foreground py-32 section-padding">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionLabel number="11" label="Resume" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="heading-lg mb-4">
            My <span className="text-gradient">Resume</span>.
          </h2>
          <p className="body-text max-w-2xl mb-10">
            View or download my complete resume below.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href={resumeUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold transition-all hover:opacity-90"
            >
              <Download size={18} />
              Download Resume
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass glass-hover font-semibold text-foreground transition-all"
            >
              <ExternalLink size={18} />
              Open in New Tab
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="glass rounded-2xl overflow-hidden neon-glow">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
              <FileText className="text-primary" size={20} />
              <span className="font-mono text-sm text-muted-foreground">myresume1.pdf</span>
            </div>
            <div className="w-full" style={{ height: "80vh" }}>
              <iframe
                src={resumeUrl}
                title="Resume"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ResumeSection;
