import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationTimeline } from './components/EducationTimeline';
import { CertificationsAchievements } from './components/CertificationsAchievements';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { StandaloneExportModal } from './components/StandaloneExportModal';
import { Toast } from './components/Toast';
import { CustomCursor } from './components/CustomCursor';
import { Project } from './types';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isStandaloneModalOpen, setIsStandaloneModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  const handleNavigateTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080b12] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-cyan-500/25 selection:text-cyan-200 relative">
      
      {/* Navigation Header */}
      <Navbar 
        onResumeClick={() => setIsResumeOpen(true)}
        onTerminalToggle={() => setIsTerminalOpen(!isTerminalOpen)}
        onStandaloneClick={() => setIsStandaloneModalOpen(true)}
      />

      {/* Main Content Layout */}
      <main>
        <Hero 
          onResumeClick={() => setIsResumeOpen(true)}
          onTerminalOpen={() => setIsTerminalOpen(true)}
          onShowToast={showToast}
          onStandaloneClick={() => setIsStandaloneModalOpen(true)}
        />

        <AboutSection />

        <ExperienceSection />

        <ProjectsSection 
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <SkillsSection />

        <EducationTimeline />

        <CertificationsAchievements 
          onShowToast={showToast}
        />

        <ContactSection 
          onShowToast={showToast}
          onStandaloneClick={() => setIsStandaloneModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer 
        onResumeClick={() => setIsResumeOpen(true)}
        onTerminalOpen={() => setIsTerminalOpen(true)}
        onStandaloneClick={() => setIsStandaloneModalOpen(true)}
      />

      {/* Interactive Terminal Modal */}
      <InteractiveTerminal 
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onNavigateTo={(section) => {
          setIsTerminalOpen(false);
          handleNavigateTo(section);
        }}
      />

      {/* Project Deep-Dive Inspection Modal */}
      <ProjectModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Full Resume Sheet Modal */}
      <ResumeModal 
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onShowToast={showToast}
      />

      {/* Standalone HTML/CSS/JS & Google Apps Script Modal */}
      <StandaloneExportModal
        isOpen={isStandaloneModalOpen}
        onClose={() => setIsStandaloneModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Global Toast Notification */}
      <Toast 
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* Cyberpunk & Neon Interactive Custom Cursor */}
      <CustomCursor />

    </div>
  );
}
