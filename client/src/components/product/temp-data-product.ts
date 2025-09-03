

// Icon data structure
export interface IconData {
  type: 'delivery' | 'carrier' | 'warranty' | 'verified' | 'trade-in';
  className: string;
  viewBox: string;
  paths: Array<{
    d: string;
    fillRule?: "evenodd" | "nonzero" | "inherit";
    clipRule?: "evenodd" | "nonzero" | "inherit";
  }>;
}

// Icon data
export const iconData: Record<string, IconData> = {
  delivery: {
    type: 'delivery',
    className: 'h-6 w-6 md:h-8 md:w-8',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M2.25 5.5A.75.75 0 0 1 3 4.75h10.5a1.25 1.25 0 0 1 1.225 1h2.966a1.25 1.25 0 0 1 1.118.691l1.655 3.31H20.5A1.25 1.25 0 0 1 21.75 11v5a1.25 1.25 0 0 1-1.25 1.25h-.854a2.751 2.751 0 0 1-5.292 0h-3.207a2.751 2.751 0 0 1-5.293 0H5A1.25 1.25 0 0 1 3.75 16v-5.5a.75.75 0 0 1 1.5 0v5.25h.604a2.751 2.751 0 0 1 5.292 0h2.104v-9.5H3A.75.75 0 0 1 2.25 5.5m18 10.25h-.604a2.751 2.751 0 0 0-4.896-.832V11.25h5.5v4.5m-5.5-6v-2.5h2.787l1.25 2.5H14.75m-7.5 6.75a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0M17 15.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5',
        fillRule: 'evenodd',
        clipRule: 'evenodd'
      },
      {
        d: 'M3.5 7.25a.75.75 0 0 0 0 1.5H7a.75.75 0 0 0 0-1.5H3.5'
      }
    ]
  },
  carrier: {
    type: 'carrier',
    className: 'h-6 w-6 md:h-6 md:w-6',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M17.53 8.54a.75.75 0 0 0-1.06-1.061L11 12.949l-2.47-2.47a.75.75 0 0 0-1.06 1.06l2.646 2.647a1.25 1.25 0 0 0 1.768 0l5.646-5.647'
      },
      {
        d: 'M4.5 2.759a1.25 1.25 0 0 0-1.25 1.25V8.73c0 9.392 7.29 12.1 8.395 12.455a1.147 1.147 0 0 0 .71 0C13.46 20.83 20.75 18.122 20.75 8.73V4.01a1.25 1.25 0 0 0-1.25-1.25h-15m.25 5.97V4.26h14.5v4.47c0 8.106-6.024 10.573-7.25 10.992-1.226-.419-7.25-2.886-7.25-10.992',
        fillRule: 'evenodd',
        clipRule: 'evenodd'
      }
    ]
  },
  warranty: {
    type: 'warranty',
    className: 'h-6 w-6 md:h-6 md:w-6',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M16.548 9.512a.75.75 0 1 0-1.096-1.024L10.4 13.901l-1.852-1.984a.75.75 0 0 0-1.096 1.023l2.034 2.18a1.25 1.25 0 0 0 1.828 0l5.234-5.608'
      },
      {
        d: 'M13.764 3.401c-.993-1.535-3.24-1.535-4.233 0A1.021 1.021 0 0 1 8.306 3.8C6.6 3.141 4.782 4.462 4.88 6.288A1.021 1.021 0 0 1 4.124 7.33C2.357 7.8 1.662 9.937 2.816 11.356a1.021 1.021 0 0 1 0 1.288c-1.154 1.42-.46 3.556 1.308 4.026a1.021 1.021 0 0 1 .757 1.042C4.782 19.538 6.6 20.86 8.306 20.201a1.021 1.021 0 0 1 1.225.398c.993 1.535 3.24 1.535 4.233 0A1.021 1.021 0 0 1 14.99 20.2c1.706.658 3.523-.663 3.425-2.489a1.021 1.021 0 0 1 .757-1.042c1.767-.47 2.461-2.607 1.308-4.026a1.021 1.021 0 0 1 0-1.288c1.153-1.42.46-3.556-1.308-4.026a1.021 1.021 0 0 1-.757-1.042c.098-1.826-1.719-3.147-3.425-2.489A1.021 1.021 0 0 1 13.765 3.4M10.79 4.216a1.021 1.021 0 0 1 1.715 0A2.521 2.521 0 0 0 15.529 5.2a1.021 1.021 0 0 1 1.387 1.008 2.521 2.521 0 0 0 1.869 2.572 1.021 1.021 0 0 1 .53 1.631 2.521 2.521 0 0 0 0 3.18 1.021 1.021 0 0 1-.53 1.63 2.521 2.521 0 0 0-1.869 2.573 1.021 1.021 0 0 1-1.387 1.008 2.521 2.521 0 0 0-3.024.983 1.021 1.021 0 0 1-1.715 0A2.521 2.521 0 0 0 7.766 18.8a1.021 1.021 0 0 1-1.387-1.008 2.521 2.521 0 0 0-1.87-2.572 1.021 1.021 0 0 1-.53-1.631 2.521 2.521 0 0 0 0-3.18 1.021 1.021 0 0 1 .53-1.63 2.521 2.521 0 0 0 1.87-2.573 1.021 1.021 0 0 1 1.387-1.008 2.521 2.521 0 0 0 3.024-.983',
        fillRule: 'evenodd',
        clipRule: 'evenodd'
      }
    ]
  },
  verified: {
    type: 'verified',
    className: 'h-6 w-6 md:h-8 md:w-8',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M16.548 9.512a.75.75 0 1 0-1.096-1.024L10.4 13.901l-1.852-1.984a.75.75 0 0 0-1.096 1.023l2.034 2.18a1.25 1.25 0 0 0 1.828 0l5.234-5.608'
      },
      {
        d: 'M13.764 3.401c-.993-1.535-3.24-1.535-4.233 0A1.021 1.021 0 0 1 8.306 3.8C6.6 3.141 4.782 4.462 4.88 6.288A1.021 1.021 0 0 1 4.124 7.33C2.357 7.8 1.662 9.937 2.816 11.356a1.021 1.021 0 0 1 0 1.288c-1.154 1.42-.46 3.556 1.308 4.026a1.021 1.021 0 0 1 .757 1.042C4.782 19.538 6.6 20.86 8.306 20.201a1.021 1.021 0 0 1 1.225.398c.993 1.535 3.24 1.535 4.233 0A1.021 1.021 0 0 1 14.99 20.2c1.706.658 3.523-.663 3.425-2.489a1.021 1.021 0 0 1 .757-1.042c1.767-.47 2.461-2.607 1.308-4.026a1.021 1.021 0 0 1 0-1.288c1.153-1.42.46-3.556-1.308-4.026a1.021 1.021 0 0 1-.757-1.042c.098-1.826-1.719-3.147-3.425-2.489A1.021 1.021 0 0 1 13.765 3.4M10.79 4.216a1.021 1.021 0 0 1 1.715 0A2.521 2.521 0 0 0 15.529 5.2a1.021 1.021 0 0 1 1.387 1.008 2.521 2.521 0 0 0 1.869 2.572 1.021 1.021 0 0 1 .53 1.631 2.521 2.521 0 0 0 0 3.18 1.021 1.021 0 0 1-.53 1.63 2.521 2.521 0 0 0-1.869 2.573 1.021 1.021 0 0 1-1.387 1.008 2.521 2.521 0 0 0-3.024.983 1.021 1.021 0 0 1-1.715 0A2.521 2.521 0 0 0 7.766 18.8a1.021 1.021 0 0 1-1.387-1.008 2.521 2.521 0 0 0-1.87-2.572 1.021 1.021 0 0 1-.53-1.631 2.521 2.521 0 0 0 0-3.18 1.021 1.021 0 0 1 .53-1.63 2.521 2.521 0 0 0 1.87-2.573 1.021 1.021 0 0 1 1.387-1.008 2.521 2.521 0 0 0 3.024-.983',
        fillRule: 'evenodd',
        clipRule: 'evenodd'
      }
    ]
  },
  'trade-in': {
    type: 'trade-in',
    className: 'h-8 w-8 m-1',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M7 3.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5M4.75 7a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0',
        fillRule: 'evenodd',
        clipRule: 'evenodd'
      },
      {
        d: 'M13 6.25a.75.75 0 0 0 0 1.5h5.19l-1.72 1.72a.75.75 0 1 0 1.06 1.06l2.647-2.646a1.25 1.25 0 0 0 0-1.768L17.53 3.47a.75.75 0 1 0-1.06 1.06l1.72 1.72H13m-7.19 10H11a.75.75 0 0 1 0 1.5H5.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-2.647-2.646a1.25 1.25 0 0 1 0-1.768L6.47 13.47a.75.75 0 1 1 1.06 1.06l-1.72 1.72'
      },
      {
        d: 'M14.5 13.25a1.25 1.25 0 0 0-1.25 1.25v5a1.25 1.25 0 0 0 1.25 1.25h5a1.25 1.25 0 0 0 1.25-1.25v-5a1.25 1.25 0 0 0-1.25-1.25h-5m.25 6v-4.5h4.5v4.5h-4.5',
        fillRule: 'evenodd',
        clipRule: 'evenodd'
      }
    ]
  }
};

// Product features data structure
export interface ProductFeatureData {
  id: string;
  title: string;
  description?: string;
  iconType: keyof typeof iconData;
  onClick?: () => void;
}

// Product features data
export const productFeaturesData: Record<string, ProductFeatureData[]> = {
  'iphone-13': [
    {
      id: 'delivery',
      title: 'Free delivery by Aug 6 - Aug 7',
      iconType: 'delivery',
    },
    {
      id: 'carriers',
      title: 'Works with all carriers',
      description: 'This phone is unlocked',
      iconType: 'carrier',
      onClick: () => console.log('Carriers clicked'),
    },
    {
      id: 'warranty',
      title: 'Free 30-day returns\n1-year warranty',
      iconType: 'warranty',
      onClick: () => console.log('Warranty clicked'),
    },
    {
      id: 'verified',
      title: 'Verified Refurbished',
      iconType: 'verified',
      onClick: () => console.log('Verified clicked'),
    },
  ],
  'macbook-air': [
    {
      id: 'delivery',
      title: 'Free delivery by Aug 8 - Aug 10',
      iconType: 'delivery',
    },
    {
      id: 'warranty',
      title: '2-year warranty',
      description: 'Extended warranty included',
      iconType: 'warranty',
      onClick: () => console.log('Warranty clicked'),
    },
    {
      id: 'verified',
      title: 'Verified Refurbished',
      iconType: 'verified',
      onClick: () => console.log('Verified clicked'),
    },
  ],
  'ipad-pro': [
    {
      id: 'delivery',
      title: 'Free delivery by Aug 5 - Aug 7',
      iconType: 'delivery',
    },
    {
      id: 'carriers',
      title: 'WiFi + Cellular models available',
      description: 'Choose your connectivity',
      iconType: 'carrier',
      onClick: () => console.log('Carriers clicked'),
    },
    {
      id: 'verified',
      title: 'Verified Refurbished',
      iconType: 'verified',
      onClick: () => console.log('Verified clicked'),
    },
  ],
  'default': [
    {
      id: 'delivery',
      title: 'Free delivery',
      iconType: 'delivery',
    },
    {
      id: 'verified',
      title: 'Verified Refurbished',
      iconType: 'verified',
      onClick: () => console.log('Verified clicked'),
    },
  ],
};

// Trade-in features data
export const tradeInFeaturesData: ProductFeatureData[] = [
  {
    id: 'trade-in-info',
    title: 'See how Trade-in works',
    iconType: 'trade-in',
    onClick: () => console.log('Trade-in info clicked'),
  },
];

// Selection options data
export interface SelectionOptionData {
  id: string;
  name: string;
  price: string;
  color?: string;
  isGoodDeal?: boolean;
}

// Product condition options
export const productConditionOptions: SelectionOptionData[] = [
  { id: 'fair', name: 'Fair', price: '$349.00' },
  { id: 'good', name: 'Good', price: '$308.99', isGoodDeal: true },
  { id: 'excellent', name: 'Excellent', price: '$341.00' },
  { id: 'premium', name: 'Premium', price: '$439.56' },
];

// Storage options
export const storageOptions: SelectionOptionData[] = [
  { id: '128', name: '128 GB', price: '$308.99' },
  { id: '256', name: '256 GB', price: '$378.99' },
  { id: '512', name: '512 GB', price: '$430.92' },
];

// Color options
export const colorOptions: SelectionOptionData[] = [
  {
    id: 'midnight',
    name: 'Midnight',
    price: '$316.00',
    color: 'rgb(24, 32, 40)',
  },
  { id: 'red', name: 'Red', price: '$342.00', color: 'rgb(255, 0, 0)' },
  { id: 'blue', name: 'Blue', price: '$308.99', color: 'rgb(156, 176, 196)' },
  {
    id: 'green',
    name: 'Green',
    price: '$342.00',
    color: 'rgb(217, 239, 213)',
  },
  {
    id: 'starlight',
    name: 'Starlight',
    price: '$308.99',
    color: 'rgb(238, 233, 229)',
  },
  { id: 'pink', name: 'Pink', price: '$308.99', color: 'rgb(252, 231, 231)' },
];

// Product images
export const productImages = [
  'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
  'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-2_4afc23ba-0d58-4702-a96b-285ff6754398.jpg',
  'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-3_ee749f47-ef5e-498c-bce1-fe3d67463bb7.jpg',
];

// Helper functions
export const getProductFeatures = (productId: string): ProductFeatureData[] => {
  return productFeaturesData[productId] || productFeaturesData.default || [];
};

export const getTradeInFeatures = (): ProductFeatureData[] => {
  return tradeInFeaturesData;
};

export const getProductConditionOptions = (): SelectionOptionData[] => {
  return productConditionOptions;
};

export const getStorageOptions = (): SelectionOptionData[] => {
  return storageOptions;
};

export const getColorOptions = (): SelectionOptionData[] => {
  return colorOptions;
};

export const getProductImages = (): string[] => {
  return productImages;
};
