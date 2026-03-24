export const learningCategories = [
  'Agriculture & Farming',
  'Animal & Dairy',
  'Handicrafts & Art',
  'Construction & Practical Skills',
  'Food & Cooking',
  'Nature & Survival',
  'Mechanical & Repair',
  'Business & Trade',
  'Soft Skills',
  'Cultural Skills',
]

export const categoryLessons = [
  {
    id: 'cat-1',
    category: 'Agriculture & Farming',
    title: 'Water Smart Irrigation Basics',
    thumbnail:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
    level: 'Beginner',
    duration: '12:10',
  },
  {
    id: 'cat-2',
    category: 'Animal & Dairy',
    title: 'Healthy Cattle Care Routine',
    thumbnail:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80',
    level: 'Intermediate',
    duration: '09:45',
  },
  {
    id: 'cat-3',
    category: 'Handicrafts & Art',
    title: 'Pottery Wheel Techniques',
    thumbnail:
      'https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=1200&q=80',
    level: 'Intermediate',
    duration: '15:20',
  },
  {
    id: 'cat-4',
    category: 'Business & Trade',
    title: 'Pricing Handmade Products',
    thumbnail:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    level: 'Advanced',
    duration: '10:08',
  },
]

export const marketplaceProducts = [
  {
    id: 'prod-1',
    title: 'Handmade Clay Pot Set',
    price: 349,
    category: 'Handicrafts & Art',
    seller: 'Sita Devi',
    location: 'Village - Jaipur',
    image:
      'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=1200&q=80',
    description: 'Traditional clay pot set made by local artisans.',
  },
  {
    id: 'prod-2',
    title: 'Organic Jaggery',
    price: 180,
    category: 'Food & Cooking',
    seller: 'Ramesh Kumar',
    location: 'Village - Kolhapur',
    image:
      'https://images.unsplash.com/photo-1514995669114-6081e934b693?auto=format&fit=crop&w=1200&q=80',
    description: 'Chemical-free jaggery prepared in small batches.',
  },
  {
    id: 'prod-3',
    title: 'Bamboo Basket Pack',
    price: 280,
    category: 'Cultural Skills',
    seller: 'Lakshmi Bai',
    location: 'Village - Guwahati',
    image:
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    description: 'Durable handwoven bamboo baskets for home use.',
  },
]

export const skillPosts = [
  {
    id: 'post-1',
    user: 'Mohan Patil',
    location: 'Village - Satara',
    caption: 'Today I finished 20 eco-bricks using crop waste and mud mix.',
    media:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    likes: 23,
    comments: 4,
  },
  {
    id: 'post-2',
    user: 'Ayesha Khan',
    location: 'City - Bhopal',
    caption: 'Shared pottery polishing method with students from nearby villages.',
    media:
      'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=1200&q=80',
    likes: 41,
    comments: 9,
  },
]

export const sampleQuiz = {
  id: 'community-quiz',
  title: 'Sustainability Quick Check',
  questions: [
    {
      id: 'cq-1',
      question: 'Which material decomposes fastest?',
      options: ['Plastic bag', 'Banana peel', 'Glass bottle', 'Aluminum foil'],
      answer: 'Banana peel',
    },
    {
      id: 'cq-2',
      question: 'Best way to reduce household water waste?',
      options: ['Longer showers', 'Fix leakage quickly', 'Daily hose cleaning', 'Open tap while brushing'],
      answer: 'Fix leakage quickly',
    },
  ],
}
