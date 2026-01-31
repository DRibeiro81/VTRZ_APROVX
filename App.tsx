import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnalyzerSection from './components/AnalyzerSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import HowItWorks from './components/HowItWorks';
import BenefitsSection from './components/BenefitsSection';
import TargetAudience from './components/TargetAudience';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import WaitlistModal from './components/WaitlistModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden relative">
      {/* Global Noise Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[40] opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      <WaitlistModal isOpen={isModalOpen} onClose={closeModal} />
      
      <Navbar onOpenModal={openModal} />
      <main className="flex-grow">
        <Hero onOpenModal={openModal} />
        <ProblemSection />
        <SolutionSection />
        <HowItWorks onOpenModal={openModal} />
        <BenefitsSection onOpenModal={openModal} />
        <TargetAudience />
        <Testimonials />
        <FinalCTA onOpenModal={openModal} />
      </main>
      <Footer />
    </div>
  );
};

export default App;