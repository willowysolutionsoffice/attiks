import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';

export const unstable_instant = { prefetch: 'static' };

const articles = [
  {
    category: 'Article',
    title: 'The Rise of Modern Minimalist Architecture in Tropical Climates',
    image: '/interior.webp'
  },
  {
    category: 'Insight',
    title: 'Why Material Honesty and Context Define Enduring Spaces',
    image: '/story_discussion.webp'
  },
  {
    category: 'Case Study',
    title: 'Inside a Modern Kerala Villa Designed for Passive Ventilation',
    image: '/villa_showcase.webp'
  },
  {
    category: 'Article',
    title: 'Courtyard Dynamics: Balancing Daylight and Thermal Comfort',
    image: '/architecture.webp'
  },
  {
    category: 'Insight',
    title: 'How Regional Geology and Climate Shape Modern Foundations',
    image: '/forest.webp'
  },
  {
    category: 'Feature',
    title: 'Sustainable Luxury: Integrating Laterite, Timber, and Concrete',
    image: '/penthouse.webp'
  }
];

export default function BlogPage() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <section style={{ padding: '160px var(--section-padding) 120px' }}>
          <div style={{ maxWidth: '100%', margin: '0 auto' }}>

            {/* Header */}
            <PageHeader 
              label="Media &amp; Insights"
              title={<>REFINED ARCHITECTURAL<br />DISCOURSE</>}
            />

            {/* Grid */}
            <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {articles.map((article, index) => (
                <article
                  key={index}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1/1.15',
                    marginBottom: '20px',
                    overflow: 'hidden',
                    background: '#111',
                    borderRadius: '2px',
                  }}>
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="property-card-img"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <p style={{
                    fontSize: '0.82rem',
                    color: '#C4703F',
                    marginBottom: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}>
                    {article.category}
                  </p>
                  <h2 style={{
                    fontSize: '1.25rem',
                    color: '#fff',
                    fontWeight: 600,
                    lineHeight: '1.3',
                    letterSpacing: '-0.01em',
                    textTransform: 'none'
                  }}>
                    {article.title}
                  </h2>
                </article>
              ))}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
