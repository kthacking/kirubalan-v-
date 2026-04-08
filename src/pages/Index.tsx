import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import AboutSection from "@/components/AboutSection";
import OriginStorySection from "@/components/OriginStorySection";
import PersonalitySection from "@/components/PersonalitySection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import CertificationsSection from "@/components/CertificationsSection";
import ResumeSection from "@/components/ResumeSection";
import YouTubeSection from "@/components/YouTubeSection";
import ToolsSection from "@/components/ToolsSection";
import StatsSection from "@/components/StatsSection";
import QuotesSection from "@/components/QuotesSection";
import ContactSection from "@/components/ContactSection";
import MyConnectSection from "@/components/MyConnectSection";
import PaintStrip from "@/components/PaintStrip";

const Index = () => {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <MarqueeStrip text="OPEN FOR PROJECTS" />
      <AboutSection />
      <MarqueeStrip text="Origin Story" />
      <OriginStorySection />
      <MarqueeStrip text="CURIOSITY · CODE · CRAFT · CREATE" variant="outline" />
      <PersonalitySection />
      
      <MarqueeStrip text="PROGRESS OVER PERFECTION" />
      <SkillsSection />
      <MarqueeStrip text="The universe of tools" />
      <ServicesSection />
      <MarqueeStrip text="BUILT FOR DEVS BY A DEV" />
      <ProjectsSection />
      <MarqueeStrip text="Real-world work" />
      <ExperienceSection />
      <PaintStrip text="college " />
      <EducationSection />
      <MarqueeStrip text="Formal Education" />
      <CertificationsSection />
      <MarqueeStrip text="The Resume" />
      <ResumeSection />
      <MarqueeStrip text="The Youtube Channel" variant="outline"/>
      <YouTubeSection />
      <MarqueeStrip text="FROM GTA CHEATS TO CHROME EXTENSIONS" />
      <ToolsSection />
      <StatsSection />
      <QuotesSection />
      <MyConnectSection />
      <ContactSection />
    </div>
  );
};

export default Index;
