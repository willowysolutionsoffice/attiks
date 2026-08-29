import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

const AboutGallerySlider = dynamic(() => import('@/components/AboutGallerySlider'));
const ProjectShowcaseGrid = dynamic(() => import('@/components/ProjectShowcaseGrid'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutSection />
      <AboutGallerySlider />
      <ProjectShowcaseGrid />
      <Testimonials />
      <Footer />
    </main>
  );
}
