export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  category: string;
  description: string;
  projectTitle?: string;
  projectLink?: string;
  badgeType?: 'laurel' | 'trophy' | 'medal' | 'star' | 'cube';
  image: string;
}

export const awardsData: Award[] = [
  {
    id: 'award-1',
    title: 'Best Residential Villa of the Year',
    organization: 'World Architecture Festival',
    year: '2025',
    category: 'Residential Architecture',
    description: 'Recognized for climate-resilient cliffside integration and vernacular stone craftsmanship.',
    projectTitle: 'The Cliffside Pavilion',
    projectLink: '/projects',
    badgeType: 'laurel',
    image: '/architecture.webp',
  },
  {
    id: 'award-2',
    title: 'Sustainable Design Winner',
    organization: 'Dezeen International Awards',
    year: '2024',
    category: 'Sustainability & Ecology',
    description: 'Awarded for passive monsoon micro-climate management and zero-net mass timber engineering.',
    projectTitle: 'Monsoon Sanctuary',
    projectLink: '/projects',
    badgeType: 'trophy',
    image: '/forest.webp',
  },
  {
    id: 'award-3',
    title: 'Excellence in Spatial Proportions',
    organization: 'AIA Design Excellence',
    year: '2024',
    category: 'Interior & Space',
    description: 'Honored for monolithic stone transitions, bespoke illumination, and sensory material harmony.',
    projectTitle: 'The Courtyard Residence',
    projectLink: '/projects',
    badgeType: 'medal',
    image: '/living_room.webp',
  },
  {
    id: 'award-4',
    title: 'Building of the Year Finalist',
    organization: 'ArchDaily Global',
    year: '2023',
    category: 'Hospitality & Retreats',
    description: 'Celebrated for biophilic canopy integration in tropical high-humidity coastal environments.',
    projectTitle: 'Backwater Serenity Resort',
    projectLink: '/projects',
    badgeType: 'star',
    image: '/coastal_palace.webp',
  },
  {
    id: 'award-5',
    title: 'Regional Masterpiece Award',
    organization: 'IIA National Chapter',
    year: '2023',
    category: 'Heritage & Vernacular',
    description: 'Acknowledged for reimagining traditional courtyard ventilation with contemporary minimalism.',
    projectTitle: 'Nalukettu Modern Villa',
    projectLink: '/projects',
    badgeType: 'laurel',
    image: '/villa_showcase.webp',
  },
  {
    id: 'award-6',
    title: 'Cultural Landmark Distinction',
    organization: 'International Architecture Awards',
    year: '2022',
    category: 'Urban & Cultural',
    description: 'Distinction for public realm integration, porous facades, and thermal chimney ventilation.',
    projectTitle: 'Attiks Horizon Studio',
    projectLink: '/projects',
    badgeType: 'cube',
    image: '/comm_modern.webp',
  },
];
