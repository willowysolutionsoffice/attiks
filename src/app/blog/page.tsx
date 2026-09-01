import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';

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
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#111111', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <section style={{ padding: '160px var(--section-padding) 120px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

            {/* Header */}
            <PageHeader 
              label="Media &amp; Insights"
              title={<>Refined architectural<br />discourse</>}
            />

            {/* Grid */}
            <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
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
                    background: '#f0f0f0',
                    borderRadius: '4px',
                    border: '1px solid #e5e5e5'
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
                    fontSize: 'clamp(18px, 1.1vw, 20px)',
                    color: '#666666',
                    marginBottom: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    textTransform: 'none'
                  }}>
                    {article.category}
                  </p>
                  <h2 style={{
                    fontSize: 'clamp(1.3rem, 1.6vw, 1.6rem)',
                    color: '#000000',
                    fontWeight: 600,
                    lineHeight: '1.35',
                    letterSpacing: '-0.02em',
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
