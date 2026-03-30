import { AmbientBackground } from "@/components/ambient-background";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { CredibilitySection } from "@/components/sections/credibility-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-surface text-ink">
      <AmbientBackground />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <CredibilitySection />
      <ContactSection />
      <Footer />
    </main>
  );
}
