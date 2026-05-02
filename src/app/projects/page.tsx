import Navbar from '@/components/Navbar';
import PropertiesHeader from '@/components/PropertiesHeader';
import PropertyGrid from '@/components/PropertyGrid';
import Footer from '@/components/Footer';

export default function ProjectsPage() {
  return (
    <main>
      <Navbar />
      <PropertiesHeader />
      <PropertyGrid />
      {/* Remaining sections will be added here */}
      <Footer />
    </main>
  );
}
