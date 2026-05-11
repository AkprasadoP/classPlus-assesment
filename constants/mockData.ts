export interface Template {
  id: string;
  imageURL: string;
  categoryId: string;
  isPremium: boolean;
  trending: boolean;
  quoteText: string;
}

export interface Category {
  id: string;
  label: string;
  emoji: string;
}

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'All', emoji: '🌟' },
  { id: 'shayari', label: 'Shayari', emoji: '✍️' },
  { id: 'birthday', label: 'Birthday', emoji: '🎂' },
  { id: 'anniversary', label: 'Anniversary', emoji: '💍' },
  { id: 'festivals', label: 'Festivals', emoji: '🪔' },
];

export const MOCK_TEMPLATES: Template[] = [
  {
    id: '1',
    imageURL: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&q=80',
    categoryId: 'shayari',
    isPremium: false,
    trending: true,
    quoteText: 'Love is in the air. Let the heart speak what words cannot.',
  },
  {
    id: '2',
    imageURL: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400&q=80',
    categoryId: 'anniversary',
    isPremium: false,
    trending: true,
    quoteText: 'Together is a beautiful place to be, watching the sun set on another perfect year.',
  },
  {
    id: '3',
    imageURL: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&q=80',
    categoryId: 'birthday',
    isPremium: true,
    trending: true,
    quoteText: 'Wishing you the happiest of birthdays filled with beautiful roses!',
  },
  {
    id: '4',
    imageURL: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&q=80',
    categoryId: 'anniversary',
    isPremium: false,
    trending: false,
    quoteText: 'Walking hand in hand into the future.',
  },
  {
    id: '5',
    imageURL: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80',
    categoryId: 'festivals',
    isPremium: true,
    trending: true,
    quoteText: 'May the festival of lights guide your way to happiness.',
  },
  {
    id: '6',
    imageURL: 'https://images.unsplash.com/photo-1518562173290-a8792256384f?q=80&w=800',
    categoryId: 'shayari',
    isPremium: false,
    trending: false,
    quoteText: 'Dil to hai dil...',
  },
  {
    id: '7',
    imageURL: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=800',
    categoryId: 'festivals',
    isPremium: false,
    trending: false,
    quoteText: 'Festival of lights and joy.',
  },
  {
    id: '8',
    imageURL: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800',
    categoryId: 'anniversary',
    isPremium: true,
    trending: true,
    quoteText: 'Cheers to another great year.',
  },
  {
    id: '9',
    imageURL: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800',
    categoryId: 'birthday',
    isPremium: false,
    trending: false,
    quoteText: 'Party time!',
  },
  {
    id: '10',
    imageURL: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800',
    categoryId: 'festivals',
    isPremium: false,
    trending: true,
    quoteText: 'Spring season wishes.',
  },
];
