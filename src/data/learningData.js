export const learningProfile = {
  name: 'Aarav Mehta',
  bio: 'Circular economy enthusiast focused on reducing household waste footprint.',
  avatar:
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
}

export const learningVideos = [
  {
    id: 'video-1',
    title: 'Home Recycling Blueprint',
    duration: '08:24',
    difficulty: 'Beginner',
    thumbnail:
      'https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/X2YgM1Zw4_E',
  },
  {
    id: 'video-2',
    title: 'Smart Segregation in Small Spaces',
    duration: '11:05',
    difficulty: 'Intermediate',
    thumbnail:
      'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/xn5fJ5xD6DU',
  },
  {
    id: 'video-3',
    title: 'Compost Systems That Actually Work',
    duration: '14:32',
    difficulty: 'Advanced',
    thumbnail:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/FM5r3qR8LxQ',
  },
]

export const learningQuizzes = [
  {
    id: 'quiz-1',
    title: 'Recycling Basics Check',
    questions: [
      {
        id: 'q1',
        question: 'Which item is typically recyclable in curbside programs?',
        options: ['Greasy pizza box', 'Glass bottle', 'Used tissue', 'Food waste'],
        answer: 'Glass bottle',
      },
      {
        id: 'q2',
        question: 'What is the first step before recycling a plastic container?',
        options: ['Paint it', 'Rinse it', 'Cut it', 'Freeze it'],
        answer: 'Rinse it',
      },
      {
        id: 'q3',
        question: 'Organic kitchen waste is best handled by:',
        options: ['Burning', 'Landfill', 'Composting', 'Mixing with glass'],
        answer: 'Composting',
      },
    ],
  },
]

export const learningActivities = [
  {
    id: 'activity-1',
    title: 'Recycle 2kg Plastic This Week',
    instructions:
      'Collect plastic packaging from home, rinse, dry, and submit 2kg to your nearest collection center.',
    points: 80,
  },
  {
    id: 'activity-2',
    title: 'Create a Home Compost Setup',
    instructions:
      'Use a ventilated container, add dry leaves + kitchen scraps in layers, and track moisture daily for 7 days.',
    points: 120,
  },
  {
    id: 'activity-3',
    title: 'Neighborhood Awareness Post',
    instructions:
      'Share one practical segregation tip with neighbors and document one before/after waste management change.',
    points: 60,
  },
]

export const sortingGameItems = [
  { id: 'item-1', label: 'Aluminum can', recyclable: true },
  { id: 'item-2', label: 'Banana peel', recyclable: false },
  { id: 'item-3', label: 'Cardboard box', recyclable: true },
  { id: 'item-4', label: 'Chip packet', recyclable: false },
  { id: 'item-5', label: 'Glass jar', recyclable: true },
]
