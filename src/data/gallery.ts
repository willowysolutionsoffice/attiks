export interface GalleryPost {
  id: string;
  image: string;
  caption: string;
  description?: string;
  location?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'auto';
  createdAt?: string;
  active?: boolean;
  order?: number;
}

export const defaultGalleryPosts: GalleryPost[] = [
  {
    id: 'post-1',
    image: '/images/image1.webp',
    caption: 'Attiks Architecture Studio',
    description: 'Inside our design studio where materiality, climate, and spatial proportions come together.',
    location: 'Calicut, Kerala',
    aspectRatio: 'square',
    createdAt: '2026-03-01',
    active: true,
    order: 1,
  },
  {
    id: 'post-2',
    image: '/images/image2.webp',
    caption: 'Principal Design Atelier',
    description: 'Collaborative architectural dialogue shaping enduring structures across Kerala.',
    location: 'Kochi, Kerala',
    aspectRatio: 'portrait',
    createdAt: '2026-02-28',
    active: true,
    order: 2,
  },
  {
    id: 'post-3',
    image: '/images/image3.webp',
    caption: 'Biennale Pavilion Exhibition',
    description: 'Experimental pavilion exploring vernacular timber joinery and passive airflow.',
    location: 'Fort Kochi, Kerala',
    aspectRatio: 'square',
    createdAt: '2026-02-24',
    active: true,
    order: 3,
  },
  {
    id: 'post-4',
    image: '/images/image4.webp',
    caption: 'Materials & Craft Lab',
    description: 'Physical mockups and sustainable clay masonry experiments.',
    location: 'Wayanad, Kerala',
    aspectRatio: 'portrait',
    createdAt: '2026-02-20',
    active: true,
    order: 4,
  },
  {
    id: 'post-5',
    image: '/value_people.webp',
    caption: 'Vernacular Craft & People',
    description: 'Working alongside generational stone artisans and timber craftsmen.',
    location: 'Calicut, Kerala',
    aspectRatio: 'landscape',
    createdAt: '2026-02-15',
    active: true,
    order: 5,
  },
  {
    id: 'post-6',
    image: '/founder.webp',
    caption: 'Principal Leadership',
    description: 'Guiding philosophy: architecture should serve both people and place.',
    location: 'Kerala',
    aspectRatio: 'portrait',
    createdAt: '2026-02-10',
    active: true,
    order: 6,
  },
  {
    id: 'post-7',
    image: '/story_discussion.webp',
    caption: 'Design & Spatial Dialogue',
    description: 'Translating client visions into tangible, timeless spatial experiences.',
    location: 'Thrissur, Kerala',
    aspectRatio: 'square',
    createdAt: '2026-02-05',
    active: true,
    order: 7,
  },
  {
    id: 'post-8',
    image: '/team_photo.webp',
    caption: 'Attiks Architectural Collective',
    description: 'The multidisciplinary minds behind our residential and commercial portfolio.',
    location: 'Kerala',
    aspectRatio: 'landscape',
    createdAt: '2026-01-28',
    active: true,
    order: 8,
  },
  {
    id: 'post-9',
    image: '/value_design.webp',
    caption: 'Biophilic Form & Innovation',
    description: 'Integrating lush tropical greenery seamlessly with monolithic concrete walls.',
    location: 'Kochi, Kerala',
    aspectRatio: 'square',
    createdAt: '2026-01-20',
    active: true,
    order: 9,
  },
];
