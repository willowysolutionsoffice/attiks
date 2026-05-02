'use client';

import Image from 'next/image';

export default function PropertiesHeader() {
  return (
    <>
      <header className="properties-header">
        <span className="properties-label">Properties</span>
        <h1 className="properties-title">
          EXPLORE OUR FINEST<br />RESIDENCES
        </h1>
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
        </div>
        <div className="project-hero-overlay"></div>
        <div className="project-hero-content">
          <h2 className="project-hero-title">THE URBAN VILLA</h2>
          <p className="project-hero-address">123 Main Street, Suite 200, Austin, TX 78701</p>
          <div className="hero-buttons">
            <a href="#" className="hero-btn-white">Learn more</a>
            <a href="#" className="hero-btn-outline">View all</a>
          </div>
        </div>
      </section>
    </>
  );
}
