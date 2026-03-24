export const skillCourses = [
  {
    id: 'agriculture-crop-cultivation',
    category: 'Agriculture',
    skill: 'Crop Cultivation',
    description: 'Learn soil prep, seed planning, and water-smart growing methods.',
    coverImage:
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    videos: [
      {
        id: 'agri-v1',
        title: 'Soil Testing Fundamentals',
        duration: '08:40',
        thumbnail:
          'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'agri-v2',
        title: 'Seed Selection by Season',
        duration: '09:15',
        thumbnail:
          'https://images.unsplash.com/photo-1463123081488-789f998ac9c4?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'agri-v3',
        title: 'Irrigation Without Waste',
        duration: '11:03',
        thumbnail:
          'https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    quiz: {
      id: 'agri-quiz',
      questions: [
        {
          id: 'aq1',
          question: 'What should be checked before choosing seeds?',
          options: ['Phone storage', 'Soil and climate fit', 'Paint color', 'Market timing only'],
          answer: 'Soil and climate fit',
        },
        {
          id: 'aq2',
          question: 'Drip irrigation primarily helps to:',
          options: ['Increase weeds', 'Reduce water loss', 'Harden soil', 'Delay growth'],
          answer: 'Reduce water loss',
        },
      ],
    },
    assignment: {
      title: 'Prepare Soil and Upload Image',
      instructions:
        'Prepare a small cultivation patch, add compost, and upload one clear image of your prepared soil bed.',
    },
  },
  {
    id: 'handicrafts-pottery',
    category: 'Handicrafts',
    skill: 'Pottery',
    description: 'Build pottery fundamentals from clay prep to final finishing.',
    coverImage:
      'https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=1200&q=80',
    videos: [
      {
        id: 'pot-v1',
        title: 'Clay Conditioning Basics',
        duration: '07:20',
        thumbnail:
          'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'pot-v2',
        title: 'Centering on the Wheel',
        duration: '10:27',
        thumbnail:
          'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'pot-v3',
        title: 'Drying and Surface Finish',
        duration: '08:58',
        thumbnail:
          'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    quiz: {
      id: 'pot-quiz',
      questions: [
        {
          id: 'pq1',
          question: 'Why is clay conditioning important?',
          options: ['Adds perfume', 'Removes air pockets', 'Makes it metallic', 'Prevents glazing'],
          answer: 'Removes air pockets',
        },
        {
          id: 'pq2',
          question: 'A common reason a pot collapses is:',
          options: ['Too much centering pressure mismatch', 'Too much color', 'Too much lighting', 'Too much kiln heat before shaping'],
          answer: 'Too much centering pressure mismatch',
        },
      ],
    },
    assignment: {
      title: 'Create One Pot and Upload Image',
      instructions:
        'Shape one basic pot, let it dry partially, and upload an image showing symmetry and wall thickness.',
    },
  },
  {
    id: 'dairy-farming',
    category: 'Dairy Farming',
    skill: 'Dairy Farming Essentials',
    description: 'Understand feed routines, hygiene, and healthy milk handling.',
    coverImage:
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80',
    videos: [
      {
        id: 'dairy-v1',
        title: 'Nutrition Planning for Cattle',
        duration: '09:40',
        thumbnail:
          'https://images.unsplash.com/photo-1606057092606-402b94f7f49e?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'dairy-v2',
        title: 'Shed Hygiene Checklist',
        duration: '07:50',
        thumbnail:
          'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'dairy-v3',
        title: 'Safe Milk Collection Steps',
        duration: '10:12',
        thumbnail:
          'https://images.unsplash.com/photo-1511715112108-9acc6b9f0f01?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    quiz: {
      id: 'dairy-quiz',
      questions: [
        {
          id: 'dq1',
          question: 'First hygiene step before milking is:',
          options: ['Skipping handwash', 'Cleaning udder and hands', 'Boiling milk', 'Feeding concentrate'],
          answer: 'Cleaning udder and hands',
        },
        {
          id: 'dq2',
          question: 'Balanced feed should include:',
          options: ['Only grains', 'Only water', 'Fodder + minerals + clean water', 'Only salt'],
          answer: 'Fodder + minerals + clean water',
        },
      ],
    },
    assignment: {
      title: 'Prepare Feed Plan and Upload Image',
      instructions:
        'Prepare one-day feed setup for your cattle and upload an image showing feed and water arrangement.',
    },
  },
  {
    id: 'cooking-community-kitchen',
    category: 'Cooking',
    skill: 'Community Cooking',
    description: 'Learn safe prep, nutrition balance, and low-waste cooking methods.',
    coverImage:
      'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80',
    videos: [
      {
        id: 'cook-v1',
        title: 'Kitchen Hygiene Foundations',
        duration: '06:55',
        thumbnail:
          'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'cook-v2',
        title: 'Balanced Meal Planning',
        duration: '09:02',
        thumbnail:
          'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'cook-v3',
        title: 'Low-Waste Cooking Practice',
        duration: '08:18',
        thumbnail:
          'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    quiz: {
      id: 'cook-quiz',
      questions: [
        {
          id: 'cq1',
          question: 'Best way to reduce cooking waste is:',
          options: ['Discard peels always', 'Plan portions and reuse scraps smartly', 'Buy excess produce', 'Cook without storage'],
          answer: 'Plan portions and reuse scraps smartly',
        },
        {
          id: 'cq2',
          question: 'Food safety starts with:',
          options: ['High flame only', 'Hand and surface hygiene', 'Adding extra oil', 'Late refrigeration'],
          answer: 'Hand and surface hygiene',
        },
      ],
    },
    assignment: {
      title: 'Cook One Low-Waste Meal',
      instructions:
        'Prepare one meal using leftovers or peels creatively and upload a photo of the final dish.',
    },
  },
]
