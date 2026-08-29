export type Category = 'commercial' | 'residential' | 'institutional' | 'cultural' | 'interior' | 'hospitality';

export interface Project {
  id: string;
  title: string;
  category: Category;
  location: string;
  year: string;
  image: string;
  description: string;
  highlights?: string[];
  gallery?: string[];
  scope?: string;
  area?: string;
  status?: 'published' | 'draft';
  featured?: boolean;
}

export const categories: { label: string; value: Category }[] = [
  { label: 'commercial', value: 'commercial' },
  { label: 'residential', value: 'residential' },
  { label: 'institutional', value: 'institutional' },
  { label: 'cultural', value: 'cultural' },
  { label: 'interior', value: 'interior' },
  { label: 'hospitality', value: 'hospitality' },
];

export const projects: Project[] = [
  {
    id: 'tech-park',
    title: 'Greenfield Tech Park',
    category: 'commercial',
    location: 'Kochi, Kerala',
    year: '2024',
    image: '/architecture.webp',
    description: 'A sprawling commercial campus designed to integrate natural ventilation, courtyards, and landscape elements into a modern workplace environment.',
    highlights: ['Passive Cooling Courtyards', 'High-Performance Double Glazing', 'Contextual Timber Screens'],
    gallery: ['/architecture.webp', '/comm_modern.webp', '/interior.webp', '/comm_downtown.webp'],
    scope: 'Masterplanning & Architecture',
    area: '180,000 sq.ft'
  },
  {
    id: 'coastal-villa',
    title: 'Coastal Villa',
    category: 'residential',
    location: 'Varkala, Kerala',
    year: '2024',
    image: '/coastal_palace.webp',
    description: 'A private residence that responds to its coastal context with open plans, timber screens, and seamless indoor-outdoor living.',
    highlights: ['Panoramic Ocean Vistas', 'Locally Sourced Laterite', 'Natural Sea Breeze Corridors'],
    scope: 'Residential Architecture & Landscape',
    area: '6,200 sq.ft'
  },
  {
    id: 'arts-center',
    title: 'Kerala Arts Center',
    category: 'cultural',
    location: 'Thrissur, Kerala',
    year: '2023',
    image: '/comm_modern.webp',
    description: 'A cultural institution celebrating regional arts through a series of interconnected galleries, performance spaces, and sculpture gardens.',
    highlights: ['Acoustic Auditorium', 'Open-Air Amphitheater', 'Daylight-Filtered Galleries'],
    scope: 'Institutional & Cultural Campus',
    area: '45,000 sq.ft'
  },
  {
    id: 'beach-resort',
    title: 'Bayshore Resort',
    category: 'hospitality',
    location: 'Kovalam, Kerala',
    year: '2023',
    image: '/comm_beach.webp',
    description: 'A beachfront resort drawing from Kerala\'s vernacular architecture with sloping roofs, open verandahs, and lush tropical landscaping.',
    highlights: ['Vernacular Sloping Roofs', 'Private Plunge Pools', 'Eco-Sensitive Coastline Footprint'],
    scope: 'Hospitality Architecture & Interiors',
    area: '72,000 sq.ft'
  },
  {
    id: 'heritage-school',
    title: 'Heritage Academy',
    category: 'institutional',
    location: 'Palakkad, Kerala',
    year: '2023',
    image: '/comm_historic.webp',
    description: 'An educational campus that reinterprets traditional Kerala architectural motifs within a contemporary institutional framework.',
    highlights: ['Shaded Verandah Corridors', 'Central Amphitheater Plaza', 'Solar-Optimized Classrooms'],
    scope: 'Educational Campus Masterplan',
    area: '95,000 sq.ft'
  },
  {
    id: 'lakeside-residence',
    title: 'Lakeside Residence',
    category: 'residential',
    location: 'Alleppey, Kerala',
    year: '2022',
    image: '/forest.webp',
    description: 'A lakeside dwelling designed around the relationship between water, light, and lush vegetation.',
    highlights: ['Direct Waterbody Interaction', 'Cantilevered Viewing Decks', 'Subtle Teak & Stone Materiality'],
    scope: 'Bespoke Private Residence',
    area: '5,400 sq.ft'
  },
  {
    id: 'corporate-hq',
    title: 'Indus Corporate HQ',
    category: 'commercial',
    location: 'Trivandrum, Kerala',
    year: '2022',
    image: '/comm_downtown.webp',
    description: 'A landmark corporate headquarters integrating passive cooling strategies with a bold contemporary expression.',
    highlights: ['Terraced Green Facade', 'Net-Zero Energy Goals', 'Collaborative Atrium Hub'],
    scope: 'Commercial Headquarters',
    area: '110,000 sq.ft'
  },
  {
    id: 'gallery-interior',
    title: 'Gallery Interior',
    category: 'interior',
    location: 'Kochi, Kerala',
    year: '2024',
    image: '/interior.webp',
    description: 'A minimalist gallery interior designed to showcase contemporary Indian art with precision lighting and neutral materiality.',
    highlights: ['Museum-Grade Lighting', 'Micro-Cement Continuous Flooring', 'Acoustic Wall Panels'],
    scope: 'Interior Architecture & Curation',
    area: '3,800 sq.ft'
  },
  {
    id: 'wellness-retreat',
    title: 'Wellness Retreat',
    category: 'hospitality',
    location: 'Wayanad, Kerala',
    year: '2023',
    image: '/living_room.webp',
    description: 'An Ayurvedic wellness retreat nestled in the Western Ghats, using local stone, timber, and bamboo in a sustainable construction.',
    highlights: ['Mountain Ridge Contouring', 'Thermal Mass Laterite Walls', 'Rainwater Harvest Reservoirs'],
    scope: 'Eco-Resort & Spa Campus',
    area: '38,000 sq.ft'
  },
  {
    id: 'museum-extension',
    title: 'Museum Extension',
    category: 'cultural',
    location: 'Kozhikode, Kerala',
    year: '2022',
    image: '/penthouse.webp',
    description: 'An extension to an existing museum creating a dialogue between the old structure and new contemporary galleries.',
    highlights: ['Heritage Transition Bridge', 'Climate-Controlled Archives', 'Sculptural Corten Steel Entry'],
    scope: 'Public Civic Architecture',
    area: '24,000 sq.ft'
  },
  {
    id: 'urban-apartments',
    title: 'Urban Commons',
    category: 'residential',
    location: 'Kochi, Kerala',
    year: '2024',
    image: '/villa_showcase.webp',
    description: 'A multi-family residential development emphasizing shared green spaces, community living, and contextual urbanism.',
    highlights: ['Sky Gardens on Every Level', 'Community Gathering Courtyards', 'Modular Flexible Layouts'],
    scope: 'Multi-Family Residential',
    area: '88,000 sq.ft'
  },
  {
    id: 'research-lab',
    title: 'Marine Research Lab',
    category: 'institutional',
    location: 'Mangalore',
    year: '2024',
    image: '/hero.webp',
    description: 'A marine research facility designed to withstand coastal conditions while providing state-of-the-art laboratory environments.',
    highlights: ['Saline-Resistant Facade', 'Specialized Wet Labs', 'Rooftop Weather Observatory'],
    scope: 'Specialized Institutional Facility',
    area: '52,000 sq.ft'
  },
];

export const testimonials = [
  {
    quote: 'Attiks Architecture creates architecture that responds thoughtfully to context, material, climate and the experience of space.',
    author: 'Arjun Menon',
    designation: 'Director, Greenfield Developments',
  },
  {
    quote: 'Their ability to translate complex requirements into elegant, timeless forms is what sets them apart. Every detail is considered.',
    author: 'Priya Nair',
    designation: 'Founder, Bayshore Hospitality',
  },
  {
    quote: 'Working with the Attiks team was a deeply collaborative experience. They brought genuine vision and sensitivity to our project.',
    author: 'Ravi Shankar',
    designation: 'Trustee, Kerala Arts Foundation',
  },
];
