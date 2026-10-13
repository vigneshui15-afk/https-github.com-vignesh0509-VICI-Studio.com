import React, { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { WorkflowSection } from './components/WorkflowSection';
import { AboutSection } from './components/AboutSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ContactModal } from './components/ContactModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BackToTop } from './components/BackToTop';
import { AdminDashboardModal } from './components/dashboard/AdminDashboardModal';
import { ServiceItem, ProjectItem } from './types';

function MainAppContent() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState<boolean>(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'work', 'testimonials', 'process', 'about'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenContact = (defaultPkg?: string, defaultSvc?: string) => {
    setSelectedPackage(defaultPkg);
    setSelectedServiceId(defaultSvc);
    setContactModalOpen(true);
  };

  const handleViewWork = () => {
    const workElem = document.getElementById('work');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0F172A] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Scroll Progress Indicator Bar */}
      <ScrollProgressBar />

      {/* Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onOpenContact={() => handleOpenContact()}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartProject={() => handleOpenContact()}
          onViewWork={handleViewWork}
        />

        {/* What We Build (Services) */}
        <ServicesSection
          onSelectService={(service) => setSelectedService(service)}
        />

        {/* Recent Projects (Portfolio Case Studies with live simulator) */}
        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* How We Work (Flowchart & User Stories) */}
        <WorkflowSection />

        {/* Client Testimonials (Pure slider mode) */}
        <TestimonialsSection />

        {/* Who We Are & Why Choose Vici Studio (About) */}
        <AboutSection />

        {/* Ready to Build Your Website? (Bottom CTA Banner) */}
        <CtaBanner
          onStartProject={() => handleOpenContact()}
          onWhatsApp={() => setWhatsAppModalOpen(true)}
        />
      </main>

      {/* Footer with social media icons and admin dashboard access */}
      <Footer
        onOpenContact={() => handleOpenContact()}
        onOpenDashboard={() => setAdminDashboardOpen(true)}
      />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onStartSimilar={(projectName) => {
          setSelectedProject(null);
          handleOpenContact(undefined, projectName);
        }}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onStartWithService={(serviceId) => {
          setSelectedService(null);
          handleOpenContact(undefined, serviceId);
        }}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        defaultPackage={selectedPackage}
        defaultService={selectedServiceId}
      />

      <WhatsAppModal
        isOpen={whatsAppModalOpen}
        onClose={() => setWhatsAppModalOpen(false)}
      />

      {/* Admin Studio & CMS Dashboard Modal */}
      <AdminDashboardModal
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
      />

      {/* Persistent Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <MainAppContent />
    </DataProvider>
  );
}
