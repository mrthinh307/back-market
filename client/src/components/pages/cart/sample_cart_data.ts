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
    name: 'iPhone 15 128 GB Pink',
    image: 'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D260/https://d2e6ccujb3mkqf.cloudfront.net/b8d85dd9-b4d2-49c5-8727-834860a70d1f-1_6bd131ac-d1de-4b4c-8ce4-6d983683f95d.jpg',
    price: 429.00,
    originalPrice: 599.00,
    quantity: 1,
    color: 'Midnight',
    condition: 'Fair',
    warranty: '12 months',
    deliveryInfo: 'Get it by 29 Sept - 30 Sept - Free',
    stockQuantity: 1,
    savings: 289.00,
    isBackupEligible: true
  },
  {
    id: '2',
    name: 'iPhone 15 128 GB Pink',
    image: 'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D260/https://d2e6ccujb3mkqf.cloudfront.net/b8d85dd9-b4d2-49c5-8727-834860a70d1f-1_6bd131ac-d1de-4b4c-8ce4-6d983683f95d.jpg',
    price: 429.00,
    originalPrice: 599.00,
    quantity: 1,
    color: 'Midnight',
    condition: 'Fair',
    warranty: '12 months',
    deliveryInfo: 'Get it by 29 Sept - 30 Sept - Free',
    stockQuantity: 1,
    savings: 289.00,
    isBackupEligible: true
  },
  
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