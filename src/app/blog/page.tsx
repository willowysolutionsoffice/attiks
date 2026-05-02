'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';

const articles = [
  {
    category: 'Article',
    title: 'The Rise of Modern Minimalist Homes in Luxury Real Estate',
    image: '/interior.png'
  },
  {
    category: 'Insight',
    title: 'Why Emotional Connections Are the Key to Selling Luxury Homes',
    image: '/story_discussion.png'
  },
  {
    category: 'Article',
    title: 'Inside a $10M Modern Villa Designed for Elevated Living',
    image: '/villa_showcase.png'
  },
  {
    category: 'Article',
    title: 'Staging Secrets Every Seller of Luxury Homes Should Know',
    image: '/architecture.png'
  },
  {
    category: 'Insight',
    title: 'How Location Shapes the True Value of Prestigious Properties',
    image: '/forest.png'
  },
  {
    category: 'Insight',
    title: 'Top Luxury Market Trends to Watch in 2025 and Beyond',
    image: '/penthouse.png'
  }
];

export default function BlogPage() {
  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ padding: '160px var(--section-padding) 120px', flex: 1 }}>
        <div style={{ maxWidth: '100%', margin: '0 auto' }}>

          {/* Header */}
          <PageHeader 
            label="Blog"
            title={<>REFINED REAL ESTATE<br />INSIGHTS</>}
          />

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
            {articles.map((article, index) => (
              <div
                key={index}
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1/1.2',
                  marginBottom: '20px',
                  overflow: 'hidden'
                }}>
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="property-card-img"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#fff',
                  marginBottom: '1rem',
                  fontWeight: 600,
                  letterSpacing: '0.01em'
                }}>
                  {article.category}
                </p>
                <h3 style={{
                  fontSize: '1.35rem',
                  color: '#fff',
                  fontWeight: 600,
                  lineHeight: '1.25',
                  letterSpacing: '-0.01em',
                  textTransform: 'none'
                }}>
                  {article.title}
                </h3>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
