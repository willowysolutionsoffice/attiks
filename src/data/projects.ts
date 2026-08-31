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
    id: "tech-park",
    title: "Soori Residence ",
    category: "residential",
    location: "Coimbatore, Tamil Nadu",
    year: "2026",
    image: "/uploads/img_1788003575720_attiks-136.jpg",
    description: "A home shaped by its context, its climate, and the everyday life of its occupants.\n\nDesigned as a composition of volumes, courtyards, transitions and carefully considered spaces, Soori Residence explores a quiet dialogue between architecture and nature.\n\nThe experience unfolds gradually from the approach and arrival to the more intimate spaces within with light, landscape, material and scale working together to create a sense of continuity throughout the home.\n\nEvery element was considered not only as an object, but as part of the experience of living.",
    highlights: [
      "Soori Residence | Coimbatore"
    ],
    gallery: [
      "/uploads/img_1788003644615_attiks-46.jpg",
      "/uploads/img_1788003645062_attiks-58.jpg",
      "/uploads/img_1788003645619_attiks-60.jpg",
      "/uploads/img_1788003646043_attiks-136.jpg",
      "/uploads/img_1788003646576_attiks-28.jpg",
      "/uploads/img_1788003647867_attiks-30.jpg",
      "/uploads/img_1788003648441_attiks-74.jpg",
      "/uploads/img_1788003648917_attiks-86.jpg",
      "/uploads/img_1788003649878_attiks-89.jpg",
      "/uploads/img_1788003650614_attiks-107.jpg",
      "/uploads/img_1788003651228_attiks-24.jpg",
      "/uploads/img_1788003651746_attiks-33.jpg",
      "/uploads/img_1788003652613_attiks-55.jpg",
      "/uploads/img_1788003653069_attiks-62.jpg",
      "/uploads/img_1788003653896_attiks-67.jpg",
      "/uploads/img_1788003654579_attiks-94.jpg",
      "/uploads/img_1788003655126_attiks-11.jpg",
      "/uploads/img_1788003655510_attiks-72.jpg",
      "/uploads/img_1788003656352_attiks-104.jpg",
      "/uploads/img_1788003656843_attiks-111.jpg",
      "/uploads/img_1788003657355_attiks-25.jpg",
      "/uploads/img_1788003658124_attiks-77.jpg",
      "/uploads/img_1788003658430_attiks-78.jpg",
      "/uploads/img_1788003658999_attiks-84.jpg",
      "/uploads/img_1788003659348_attiks-119.jpg",
      "/uploads/img_1788003660003_attiks-126.jpg",
      "/uploads/img_1788003661112_attiks-80.jpg",
      "/uploads/img_1788003661792_attiks-93.jpg",
      "/uploads/img_1788003662357_attiks-96.jpg",
      "/uploads/img_1788003662675_attiks-122.jpg",
      "/uploads/img_1788003664011_attiks-22.jpg",
      "/uploads/img_1788003664558_attiks-38.jpg",
      "/uploads/img_1788003665042_attiks-108.jpg",
      "/uploads/img_1788003665518_attiks-112.jpg",
      "/uploads/img_1788003665864_attiks-123.jpg",
      "/uploads/img_1788003666362_attiks-29.jpg",
      "/uploads/img_1788003666906_attiks-41.jpg",
      "/uploads/img_1788003667224_attiks-97.jpg",
      "/uploads/img_1788003667729_attiks-103.jpg",
      "/uploads/img_1788003667993_attiks-117.jpg",
      "/uploads/img_1788003668354_attiks-120.jpg",
      "/uploads/img_1788003668826_attiks-137.jpg",
      "/uploads/img_1788003669444_attiks-115.jpg"
    ],
    scope: "Masterplanning & Architecture",
    area: "7800 Sqf",
    status: "published",
    featured: true
  },
  {
    id: "coastal-villa",
    title: "Jannath Ayisha",
    category: "residential",
    location: "Varkala, Kerala",
    year: "2024",
    image: "/uploads/img_1788004263217_x-20.jpg",
    description: "Jannath Ayisha Residence is conceived as a tropical modern home that celebrates scale, light, and landscape. The design embraces generous volumes that create a sense of openness, while expansive openings allow natural light to define and transform the interiors throughout the day. Framed by lush landscaping, the residence establishes a seamless dialogue between indoor and outdoor spaces, merging the warmth of tropical living with the clarity and precision of contemporary design.",
    highlights: [
      "Panoramic Ocean Vistas",
      "Locally Sourced Laterite",
      "Natural Sea Breeze Corridors"
    ],
    scope: "Residential Architecture & Landscape",
    area: "6,200 sq.ft",
    status: "published",
    featured: true,
    gallery: [
      "/uploads/img_1788004496155_UC_TH--12.jpg",
      "/uploads/img_1788004496285_x-17.jpg",
      "/uploads/img_1788004496450_x-22.jpg",
      "/uploads/img_1788004496699_x-33.jpg",
      "/uploads/img_1788004496728_JPEG_LQ--3_copy.jpg",
      "/uploads/img_1788004496869_UC_TH--7.jpg",
      "/uploads/img_1788004496901_UC_TH--8.jpg",
      "/uploads/img_1788004496988_UC_TH-003040.jpg",
      "/uploads/img_1788004497037_UC_TH-003062.jpg",
      "/uploads/img_1788004497112_UC_TH-003171.jpg",
      "/uploads/img_1788004497174_UC_TH-003192.jpg",
      "/uploads/img_1788004497391_UC_TH-003195.jpg",
      "/uploads/img_1788004497489_x-7.jpg",
      "/uploads/img_1788004497587_x-12.jpg",
      "/uploads/img_1788004497720_x-14.jpg",
      "/uploads/img_1788004497825_x-20.jpg",
      "/uploads/img_1788004497891_x-24.jpg",
      "/uploads/img_1788004498026_x-42.jpg",
      "/uploads/img_1788004498185_x-43.jpg"
    ]
  },
  {
    id: "arts-center",
    title: "The Edge Convention Center",
    category: "residential",
    location: " Malappuram, Kerala,",
    year: "2024",
    image: "/uploads/img_1788004592408_Set01__34_.jpg",
    description: "The Edge by Attiks Architecture\n\nThis convention center, at a glance gives a modern and contemporary outlook with which, building itself creates uniqueness and brings harmony to its surrounding spaces. The main intention was to maximize the land utilization with minimum footprint. Hence the design envisioned on split level, establishing maximum view and space utilization.\n\nThe project consist of a banquet hall that can seat up to 800 people and 1200 to dine, the custom made lights and the seating arrangements makes the hall more attractive. Adjacent to the main hall, there is a Lobby and a VIP lounge with separate dining space.\n\nCheckout The Full Project Here: Link in the bio\n\nProject Details:\nProject Name: The Edge ( Convention Center)\nLocation: Panthavoor, Malappuram, Kerala, India\nBuilt-up Area: 33000 sq.ft.\nCost: Undisclosed\nCompletion Year: 2022",
    highlights: [
      "Acoustic Auditorium",
      "Open-Air Amphitheater",
      "Daylight-Filtered Galleries"
    ],
    scope: "Institutional & Cultural Campus",
    area: "33,765 sq.ft ",
    status: "published",
    featured: true,
    gallery: [
      "/uploads/img_1788004679585_Set01__34_.jpg",
      "/uploads/img_1788004680124_Set01__5_.jpg",
      "/uploads/img_1788004680933_Set01__13_.jpg",
      "/uploads/img_1788004681523_Set01__39_.jpg",
      "/uploads/img_1788004681806_Set02__1_.jpg"
    ]
  },
  {
    id: "beach-resort",
    title: "Pavilion House",
    category: "interior",
    location: "Ponnani, Kerala",
    year: "2023",
    image: "/uploads/img_1788005063615_DSC08120-Edit-1.jpg.jpeg",
    description: "The main idea was to merge the built with in the landscape. As the building ages and trees grow, the built and unbuilt will become more and more seamless. The design response primarily to the context and brings its essence with in. The central court is kept as the focus by the allure of red bricks representing the traditional nadumuttom. Area have been woven together to create seamless floor spaces with a few landscaped elements. The split-level renders better connectivity within the house, allowing private spaces to overlook the central court. The Material palette is kept minimal, Kota stone flooring captures reflection and while exposed concrete ceiling add a rustic charm. Wooden flooring and the details bring in richness, with white walls tying it all together. Courtyards have been designed to serve multiple functions, making the space flexible and multifunctional. Deck could occasionally turn into a gathering space / even a stage during festive gathering which the client had expressed a need for early on, in their requirements. Skylights were added to create interest within the space. A well-lit home, the house sufficiently lit in the daytime with the light that comes in through skylight and slit windows eliminating the need for artificial.",
    highlights: [
      "Vernacular Sloping Roofs",
      "Private Plunge Pools",
      "Eco-Sensitive Coastline Footprint"
    ],
    scope: "Hospitality Architecture & Interiors",
    area: "72,000 sq.ft",
    status: "published",
    featured: true,
    gallery: [
      "/uploads/img_1788005098374_DSC08069-Edit-18.jpg.jpeg",
      "/uploads/img_1788005107671_DSC08087-Edit-9.jpg.jpeg",
      "/uploads/img_1788005108505_DSC08103-Edit-4.jpg.jpeg",
      "/uploads/img_1788005109147_DSC08115-Edit-2.jpg.jpeg",
      "/uploads/img_1788005109515_DSC08120-Edit-1.jpg.jpeg",
      "/uploads/img_1788005110054_DSC07936-Edit-2-31.jpg.jpeg",
      "/uploads/img_1788005110920_DSC07944-Edit-28.jpg.jpeg",
      "/uploads/img_1788005111230_DSC07990-Edit-26.jpg.jpeg",
      "/uploads/img_1788005111526_DSC08002-Edit-23.jpg.jpeg",
      "/uploads/img_1788005112253_DSC08066-Edit-20.jpg.jpeg",
      "/uploads/img_1788005112574_DSC08076-Edit-14.jpg.jpeg"
    ]
  },
  {
    id: "heritage-school",
    title: "Heritage Academy",
    category: "institutional",
    location: "Malappuram, Kerala",
    year: "2023",
    image: "/uploads/img_1788005287699_42.png",
    description: "An educational campus that reinterprets traditional Kerala architectural motifs within a contemporary institutional framework.",
    highlights: [
      "Shaded Verandah Corridors",
      "Central Amphitheater Plaza",
      "Solar-Optimized Classrooms"
    ],
    scope: "Educational Campus Masterplan",
    area: "95,000 sq.ft",
    status: "published",
    featured: false,
    gallery: [
      "/uploads/img_1788005339901_bridge_003.png",
      "/uploads/img_1788005341307_SKYLIGHT_003.png",
      "/uploads/img_1788005342244_51.png",
      "/uploads/img_1788005344511_SKYLIGHT_002.png",
      "/uploads/img_1788005347099_class_room_02.png",
      "/uploads/img_1788005347594_012.png",
      "/uploads/img_1788005348897_42.png",
      "/uploads/img_1788005350665_SKYLIGHT_001.png",
      "/uploads/img_1788005353893_011.png",
      "/uploads/img_1788005354958_014.png",
      "/uploads/img_1788005355331_037.png",
      "/uploads/img_1788005357131_43.png",
      "/uploads/img_1788005358504_47.png",
      "/uploads/img_1788005358786_53.png",
      "/uploads/img_1788005359001_54.png",
      "/uploads/img_1788005359569_039.png",
      "/uploads/img_1788005360242_45.png"
    ]
  }
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
