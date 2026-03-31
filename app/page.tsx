import { AmbientBackground } from "@/components/ambient-background";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-surface text-ink">
      <ScrollProgress />
      <AmbientBackground />
      <Navbar />
      <HeroSection />
      <div className="section-divider mx-4" />
      <AboutSection />
      <div className="section-divider mx-4" />
      <SkillsSection />
      <div className="section-divider mx-4" />
      <ProjectsSection />
      <div className="section-divider mx-4" />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
