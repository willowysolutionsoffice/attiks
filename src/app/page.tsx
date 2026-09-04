import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import AboutGallerySlider from '@/components/AboutGallerySlider';
import ProjectShowcaseGrid from '@/components/ProjectShowcaseGrid';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { getAllProjects } from '@/lib/projects';
import { getGalleryPostsAction } from '@/actions/gallery.actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [projects, galleryPosts] = await Promise.all([
    getAllProjects(),
    getGalleryPostsAction(),
  ]);

  return (
    <main>
      <Navbar />
      <Hero projects={projects} />
      <AboutSection />
      <AboutGallerySlider projects={projects} />
      <ProjectShowcaseGrid initialPosts={galleryPosts} limit={20} />
      <Testimonials />
      <Footer />
      
    </main>
  );
}
