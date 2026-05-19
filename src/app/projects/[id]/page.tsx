import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Dummy data for the specific project
const projectsData: Record<string, { name: string; image: string; description: string; highlights: string[] }> = {
  'downtown-district': {
    name: 'Downtown District',
    image: '/comm_downtown.png',
    description: 'A vibrant urban community offering a modern lifestyle with easy access to the city\'s best dining, shopping, and entertainment.',
    highlights: ['Prime location', 'Modern amenities', 'Skyline views']
  },
  'modern-residence': {
    name: 'Modern Residence',
    image: '/comm_modern.png',
    description: 'Experience contemporary living at its finest in our elegantly designed modern residences, where every detail is crafted for your comfort.',
    highlights: ['Contemporary design', 'Smart home features', 'Private balconies']
  },
  'historic-city': {
    name: 'Historic City',
    image: '/comm_historic.png',
    description: 'Step into a world of timeless elegance. Our Historic City properties blend classic architecture with modern conveniences.',
    highlights: ['Classic architecture', 'Cultural hub', 'Restored interiors']
  },
  'beach-front-district': {
    name: 'Beach Front District',
    image: '/comm_beach.png',
    description: 'Wake up to the sound of waves. The Beach Front District offers unparalleled luxury living right on the pristine coast.',
    highlights: ['Ocean views', 'Private beach access', 'Resort-style pool']
  }
};

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projectsData[id];

  if (!project) {
    return (
      <main>
        <Navbar />
        <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexDirection: 'column' }}>
          <h1>Project not found</h1>
          <Link href="/" style={{ marginTop: '20px', textDecoration: 'underline' }}>Return Home</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Navbar />

      <section style={{ position: 'relative', width: '100%', height: '60vh' }}>
        <Image 
          src={project.image}
          alt={project.name}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 'bold', letterSpacing: '0.05em', textAlign: 'center' }}>
            {project.name.toUpperCase()}
          </h1>
          <p style={{ marginTop: '20px', fontSize: '1.2rem', letterSpacing: '0.1em' }}>EXCEPTIONAL LIVING</p>
        </div>
      </section>

      <section style={{ padding: '80px var(--section-padding)', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '30px', fontWeight: 600 }}>About {project.name}</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)' }}>
            {project.description}
          </p>
          <div style={{ marginTop: '40px' }}>
            <Link href="/contact" style={{ display: 'inline-block', padding: '14px 32px', background: '#fff', color: '#000', fontWeight: 'bold', borderRadius: '2px', textDecoration: 'none' }}>
              Inquire Now
            </Link>
          </div>
        </div>

        <div style={{ flex: '1 1 300px', background: '#111', padding: '40px', borderRadius: '4px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '25px', fontWeight: 500 }}>Highlights</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {project.highlights.map((highlight, idx) => (
              <li key={idx} style={{ padding: '15px 0', borderBottom: '1px solid #333', color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#fff', borderRadius: '50%', marginRight: '15px' }}></span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
