import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import { assetsMap } from '../assetsMap';


const AboutSection = () => {
  return (
    <section className="theme-light bg-background text-foreground py-32 section-padding relative">
     
      <div className="absolute inset-0 dot-bg opacity-50" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionLabel number="01" label="About Me" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="heading-lg mb-12">
            From <span className="text-gradient">game hacks</span> to<br />
            building real tools.
          </h2> 
         
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <ScrollReveal delay={0.2}>
              <p className="body-text">
                Web developer with strong expertise in HTML, CSS, JavaScript, and PHP, skilled in creating responsive user interfaces and functional backend components. Proven ability to debug and resolve issues efficiently while adapting to new technologies.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="body-text">
                Experienced in MS Office, Excel, video editing, and managing a YouTube channel, with hands-on technical support experience from working in a computer center. Highly motivated to begin a web development role, committed to continuous learning, teamwork, and delivering reliable web solutions using best coding practices.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <p className="body-text">
                Self-taught developer who went from modifying GTA game values with <span className="text-foreground font-semibold">Cheat Engine</span> in sixth grade to building full no-code visual site builders, Chrome extensions, and developer tools — all with <span className="text-primary font-semibold">zero framework dependency</span>.
              </p>
            </ScrollReveal>
          </div>

          <div className="space-y-6">
            <ScrollReveal delay={0.3}>
              <p className="body-text">
                Completed a 3-month full-stack internship at <span className="text-foreground font-semibold">VDart</span>, found a bug in my college's EDU website, run a YouTube channel (<span className="text-primary">KT Hacking</span>) with 2,000–3,000 subscribers, and built tools that my friends and peers actively use.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <p className="body-text">
                Currently graduating BCA IT from <span className="text-foreground font-semibold">St. Joseph's College (Autonomous)</span>, Trichy, with a 7.9 CGPA. Actively growing into React/Next.js and Three.js/WebGL.
              </p>
            </ScrollReveal>

            {/* Taglines */}
            <ScrollReveal delay={0.5}>
              <div className="glass rounded-xl p-6 mt-8 space-y-3">
                <p className="label-text text-primary mb-4">Taglines</p>
                {[
                  '"I don\'t just build software — I hack experiences."',
                  '"From GTA cheats to Chrome extensions — curiosity drives everything."',
                  '"Progress over Perfection."',
                  '"Built for devs, by a dev."',
                ].map((t) => (
                  <p key={t} className="font-mono text-sm text-muted-foreground">{t}</p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
        <div className="carousel">
          <div className="track">
            <img src={assetsMap['g6']} loading="lazy" />
            <img src={assetsMap['g7']} loading="lazy" />
            <img src={assetsMap['g2']} loading="lazy" />
            <img src={assetsMap['g13']} loading="lazy" />
            <img src={assetsMap['g14']} loading="lazy" />

            {/* duplicate for smooth loop */}
            <img src={assetsMap['g6']} loading="lazy" />
            <img src={assetsMap['g7']} loading="lazy" />
            <img src={assetsMap['g2']} loading="lazy" />
            <img src={assetsMap['g13']} loading="lazy" />
            <img src={assetsMap['g14']} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
