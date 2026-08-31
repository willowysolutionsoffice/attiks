import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { readDatabase } from '@/lib/db';
import { projects as seedProjects } from '@/data/projects';

export const unstable_instant = { prefetch: 'static' };

const AboutGallerySlider = dynamic(() => import('@/components/AboutGallerySlider'));
const ProjectShowcaseGrid = dynamic(() => import('@/components/ProjectShowcaseGrid'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));

export default function Home() {
  let initialProjects = seedProjects;
  try {
    const db = readDatabase();
    if (db && db.projects && db.projects.length > 0) {
      initialProjects = db.projects;
    }
  } catch (err) {
    console.error('Failed to load database in Home page:', err);
  }

  return (
    <main>
      <Navbar />
      <Hero />
      <AboutSection />
      <AboutGallerySlider />
      <ProjectShowcaseGrid initialProjects={initialProjects} />
      <Testimonials />
      <Footer />
    </main>
  );
}
