'use client';

import Image from 'next/image';

const properties = [
  {
    title: 'MODERN HILLSIDE HOME',
    address: '123 Crestview Lane, Beverly Hills, CA',
    image: '/projects/hillside-home.png',
  },
  {
    title: 'THE COASTAL PALACE',
    address: '88 Ocean Drive, Malibu, CA',
    image: '/projects/coastal-palace.png',
  },
  {
    title: 'SKYLINE PENTHOUSE',
    address: '500 Park Avenue, New York, NY',
    image: '/projects/skyline-penthouse.png',
  },
  {
    title: 'FOREST RETREAT',
    address: '45 Pine Creek Road, Aspen, CO',
    image: '/projects/forest-retreat.png',
  },
  {
    title: 'DESERT OASIS',
    address: '777 Mirage Way, Palm Springs, CA',
    image: '/projects/desert-oasis.png',
  },
  {
    title: 'LAKESIDE VILLA',
    address: '12 Blue Water Court, Lake Tahoe, NV',
    image: '/projects/lakeside-villa.png',
  },
];

export default function PropertyGrid() {
  return (
    <section className="property-grid">
      {properties.map((prop, index) => (
        <div key={index} className="property-card">
          <div className="property-card-img">
            <Image
              src={prop.image}
              alt={prop.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="property-card-corner">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="0,0 100,0 100,100" />
            </svg>
          </div>
          <div className="property-card-content">
            <h3 className="property-card-title">{prop.title}</h3>
            <p className="property-card-address">{prop.address}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
