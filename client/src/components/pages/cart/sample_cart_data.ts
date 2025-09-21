// Cart item interface
export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  color?: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'New';
  warranty: string;
  deliveryInfo?: string;
  availability?: string;
  stockQuantity?: number;
  savings?: number;
  badge?: string;
  isBackupEligible?: boolean;
}

// Sample cart data
export const sampleCartItems: CartItem[] = [
  {
    id: '1',
    name: 'iPhone 14 128GB - Midnight - Unlocked',
    image: 'https://images.ctfassets.net/mmeshd7gafk1/7zCu5bgeaunPJvoLyqo2go/33738f657887fc7fdee9f5a02cb6f780/Web-Desktop-Photo_table-tennis-.jpg',
    price: 310.00,
    originalPrice: 599.00,
    quantity: 1,
    color: 'Midnight',
    condition: 'Fair',
    warranty: '12 months',
    deliveryInfo: 'Get it by 23 Sept - 24 Sept - Free',
    stockQuantity: 1,
    savings: 289.00,
    isBackupEligible: true
  },
  {
    id: '2',
    name: 'Case iPhone 14 and 2 protective screens - TPU - Transparent',
    image: 'https://images.ctfassets.net/mmeshd7gafk1/NqbgS5c30ueCeP3zSwFgT/bfa60cb0c156d2d2e0e2d89ea130b18b/Web-Desktop-Photo_mess.jpg',
    price: 23.99,
    quantity: 1,
    color: 'Transparent',
    condition: 'New',
    warranty: '12 months',
    deliveryInfo: 'Get it by 24 Sept - 25 Sept - Free',
    stockQuantity: 15,
    badge: 'Lowest price in 7 days'
  },
  {
    id: '3',
    name: 'iPhone 13 128GB - Midnight - Unlocked',
    image: 'https://images.ctfassets.net/mmeshd7gafk1/7zCu5bgeaunPJvoLyqo2go/33738f657887fc7fdee9f5a02cb6f780/Web-Desktop-Photo_table-tennis-.jpg',
    price: 267.75,
    originalPrice: 599.00,
    quantity: 1,
    color: 'Midnight',
    condition: 'Excellent',
    warranty: '12 months',
    deliveryInfo: 'Get it by 25 Sept - 26 Sept - Free',
    stockQuantity: 3,
    savings: 331.25
  },
  {
    id: '3',
    name: 'iPhone 13 128GB - Midnight - Unlocked',
    image: 'https://images.ctfassets.net/mmeshd7gafk1/7zCu5bgeaunPJvoLyqo2go/33738f657887fc7fdee9f5a02cb6f780/Web-Desktop-Photo_table-tennis-.jpg',
    price: 267.75,
    originalPrice: 599.00,
    quantity: 1,
    color: 'Midnight',
    condition: 'Excellent',
    warranty: '12 months',
    deliveryInfo: 'Get it by 25 Sept - 26 Sept - Free',
    stockQuantity: 3,
    savings: 331.25
  },
  {
    id: '4',
    name: 'iPhone 13 128GB - Midnight - Unlocked',
    image: 'https://images.ctfassets.net/mmeshd7gafk1/7zCu5bgeaunPJvoLyqo2go/33738f657887fc7fdee9f5a02cb6f780/Web-Desktop-Photo_table-tennis-.jpg',
    price: 267.75,
    originalPrice: 599.00,
    quantity: 1,
    color: 'Midnight',
    condition: 'Excellent',
    warranty: '12 months',
    deliveryInfo: 'Get it by 25 Sept - 26 Sept - Free',
    stockQuantity: 3,
    savings: 331.25
  },
  {
    id: '5',
    name: 'iPhone 13 128GB - Midnight - Unlocked',
    image: 'https://images.ctfassets.net/mmeshd7gafk1/7zCu5bgeaunPJvoLyqo2go/33738f657887fc7fdee9f5a02cb6f780/Web-Desktop-Photo_table-tennis-.jpg',
    price: 267.75,
    originalPrice: 599.00,
    quantity: 1,
    color: 'Midnight',
    condition: 'Excellent',
    warranty: '12 months',
    deliveryInfo: 'Get it by 25 Sept - 26 Sept - Free',
    stockQuantity: 3,
    savings: 331.25
  }

];

// Sample recommended products for "Complete your cart" section
export const recommendedProducts = [
  {
    id: 'rec1',
    name: 'AirPods Pro 2 (2023)',
    image: 'https://images.ctfassets.net/mmeshd7gafk1/7zCu5bgeaunPJvoLyqo2go/33738f657887fc7fdee9f5a02cb6f780/Web-Desktop-Photo_table-tennis-.jpg',
    price: '£142.00',
    starsValue: 4.7,
    reviewsCount: 785,
    colors: [{ label: 'White', color: '#FFFFFF' }]
  },
  {
    id: 'rec2',
    name: 'Magic mouse Wireless - White',
    image: 'https://images.ctfassets.net/mmeshd7gafk1/7zCu5bgeaunPJvoLyqo2go/33738f657887fc7fdee9f5a02cb6f780/Web-Desktop-Photo_table-tennis-.jpg',
    price: '£49.99',
    newPrice: '£60.00 new',
    starsValue: 4.3,
    reviewsCount: 693,
    colors: [{ label: 'White', color: '#FFFFFF' }]
  },
  {
    id: 'rec3',
    name: 'Cover MacBook Air 13" (2018-2022) & MacBook Pro 13"...',
    image: 'https://images.ctfassets.net/mmeshd7gafk1/7zCu5bgeaunPJvoLyqo2go/33738f657887fc7fdee9f5a02cb6f780/Web-Desktop-Photo_table-tennis-.jpg',
    price: '£29.99',
    starsValue: 4.3,
    reviewsCount: 45,
    colors: [{ label: 'Black', color: '#000000' }]
  },
  {
    id: 'rec4',
    name: 'Apple Watch Series 8 45mm GPS - Midnight',
    image: 'https://images.ctfassets.net/mmeshd7gafk1/7zCu5bgeaunPJvoLyqo2go/33738f657887fc7fdee9f5a02cb6f780/Web-Desktop-Photo_table-tennis-.jpg',
    price: '£299.99',
    newPrice: '£429.00 new',
    starsValue: 4.5,
    reviewsCount: 1247,
    colors: [{ label: 'Midnight', color: '#1C1C1E' }]
  },
  {
    id: 'rec5',
    name: 'iPad Air 5th Gen 10.9" 64GB WiFi - Space Gray',
    image: 'https://images.ctfassets.net/mmeshd7gafk1/7zCu5bgeaunPJvoLyqo2go/33738f657887fc7fdee9f5a02cb6f780/Web-Desktop-Photo_table-tennis-.jpg',
    price: '£449.99',
    newPrice: '£599.00 new',
    starsValue: 4.6,
    reviewsCount: 892,
    colors: [{ label: 'Space Gray', color: '#8E8E93' }]
  },
  {
    id: 'rec6',
    name: 'MacBook Pro 13" M2 256GB SSD - Space Gray',
    image: 'https://images.ctfassets.net/mmeshd7gafk1/7zCu5bgeaunPJvoLyqo2go/33738f657887fc7fdee9f5a02cb6f780/Web-Desktop-Photo_table-tennis-.jpg',
    price: '£1099.99',
    newPrice: '£1499.00 new',
    starsValue: 4.8,
    reviewsCount: 156,
    colors: [{ label: 'Space Gray', color: '#8E8E93' }]
  }
];