import React, { Suspense, lazy } from "react";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import FluidBackground from "@/components/FluidBackground";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const OriginStorySection = lazy(() => import("@/components/OriginStorySection"));
const PersonalitySection = lazy(() => import("@/components/PersonalitySection"));
const EducationSection = lazy(() => import("@/components/EducationSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const CertificationsSection = lazy(() => import("@/components/CertificationsSection"));
const ResumeSection = lazy(() => import("@/components/ResumeSection"));
const YouTubeSection = lazy(() => import("@/components/YouTubeSection"));
const ToolsSection = lazy(() => import("@/components/ToolsSection"));
const StatsSection = lazy(() => import("@/components/StatsSection"));
const QuotesSection = lazy(() => import("@/components/QuotesSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const MyConnectSection = lazy(() => import("@/components/MyConnectSection"));
const PaintStrip = lazy(() => import("@/components/PaintStrip"));

const SectionLoading = () => <div className="h-[200px] flex items-center justify-center opacity-20">Loading...</div>;

const Index = () => {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <Suspense fallback={<SectionLoading />}>
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
      </Suspense>
    </div>
  );
};

export default Index;
