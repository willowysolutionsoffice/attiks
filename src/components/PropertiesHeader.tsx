'use client';

import Image from 'next/image';
import Link from 'next/link';
import PageHeader from './PageHeader';

export default function PropertiesHeader() {
  return (
    <>
      <header className="properties-header">
        <PageHeader 
          label="Properties"
          title={<>EXPLORE OUR FINEST<br />RESIDENCES</>}
        />
      </header>

      <section className="project-hero">
        <div className="section-bg">
          <Image
            src="/projects/urban-villa.png"
            alt="The Urban Villa"
            fill
            className="object-cover"
            priority
          />
          <div className="project-hero-overlay"></div>
          <div className="project-hero-content">
            <h2 className="project-hero-title">THE URBAN VILLA</h2>
            <p className="project-hero-address">123 Main Street, Suite 200, Austin, TX 78701</p>
            <div className="hero-buttons">
              <Link href="/about" className="hero-btn-white">Learn more</Link>
              <Link href="/projects" className="hero-btn-outline">View all</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
