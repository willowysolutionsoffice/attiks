import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { projects } from '@/data/projects';

const AboutGallerySlider = dynamic(() => import('@/components/AboutGallerySlider'));
const DirectorsSection = dynamic(() => import('@/components/DirectorsSection'));
const ProjectShowcaseGrid = dynamic(() => import('@/components/ProjectShowcaseGrid'));
const AwardsSection = dynamic(() => import('@/components/AwardsSection'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero projects={projects} />
      <AboutSection />
      <AboutGallerySlider projects={projects} />
      <DirectorsSection />
      <ProjectShowcaseGrid initialProjects={projects} />
      <AwardsSection />
      <Testimonials />
      <Footer />
    </main>
  );
}
