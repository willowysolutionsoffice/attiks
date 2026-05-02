import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PropertyShowcase from '@/components/PropertyShowcase';
import CoastalPalace from '@/components/CoastalPalace';
import SkylinePenthouse from '@/components/SkylinePenthouse';
import ForestRetreat from '@/components/ForestRetreat';
import AboutSection from '@/components/AboutSection';
import AboutPhilosophy from '@/components/AboutPhilosophy';
import CommunityCarousel from '@/components/CommunityCarousel';
import TestimonialsSection from '@/components/TestimonialsSection';
import PressAndMediaSection from '@/components/PressAndMediaSection';
import JourneyCTASection from '@/components/JourneyCTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />

      <div style={{ position: 'relative' }}>
        <HeroSection />

        <PropertyShowcase />

        <CoastalPalace />

        <SkylinePenthouse />

        <ForestRetreat />
      </div>

      <AboutSection />

      <AboutPhilosophy />

      <CommunityCarousel />

      <TestimonialsSection />

      <PressAndMediaSection />

      <JourneyCTASection />

      <Footer />
    </main>
  );
}
