// Icon data structure
export interface IconData {
  type: 'delivery' | 'carrier' | 'warranty' | 'verified' | 'trade-in' | 'returns' | 'support';
  className: string;
  viewBox: string;
  paths: Array<{
    d: string;
    fillRule?: 'evenodd' | 'nonzero' | 'inherit';
    clipRule?: 'evenodd' | 'nonzero' | 'inherit';
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
        clipRule: 'evenodd',
      },
      {
        d: 'M3.5 7.25a.75.75 0 0 0 0 1.5H7a.75.75 0 0 0 0-1.5H3.5',
      },
    ],
  },
  carrier: {
    type: 'carrier',
    className: 'h-6 w-6 md:h-8 md:w-8',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M10.25 12.75A.75.75 0 0 1 11 13.5v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75',
      },
      {
        d: 'M14.5 6.7c0-1.291 1.166-2.45 2.75-2.45S20 5.409 20 6.7v1.8a.75.75 0 0 0 1.5 0V6.7c0-2.243-1.968-3.95-4.25-3.95C14.967 2.75 13 4.457 13 6.7v2.05H5.75A3.25 3.25 0 0 0 2.5 12v6a3.25 3.25 0 0 0 3.25 3.25h9A3.25 3.25 0 0 0 18 18v-6a3.25 3.25 0 0 0-3.25-3.25H14.5V6.7m-8.75 3.55A1.75 1.75 0 0 0 4 12v6a1.75 1.75 0 0 0 1.75 1.75h9A1.75 1.75 0 0 0 16.5 18v-6a1.75 1.75 0 0 0-1.75-1.75h-9',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
      },
    ],
  },
  warranty: {
    type: 'warranty',
    className: 'h-6 w-6 md:h-8 md:w-8',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M17.53 8.54a.75.75 0 0 0-1.06-1.061L11 12.949l-2.47-2.47a.75.75 0 0 0-1.06 1.06l2.646 2.647a1.25 1.25 0 0 0 1.768 0l5.646-5.647',
      },
      {
        d: 'M4.5 2.759a1.25 1.25 0 0 0-1.25 1.25V8.73c0 9.392 7.29 12.1 8.395 12.455a1.147 1.147 0 0 0 .71 0C13.46 20.83 20.75 18.122 20.75 8.73V4.01a1.25 1.25 0 0 0-1.25-1.25h-15m.25 5.97V4.26h14.5v4.47c0 8.106-6.024 10.573-7.25 10.992-1.226-.419-7.25-2.886-7.25-10.992',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
      },
    ],
  },
  verified: {
    type: 'verified',
    className: 'h-6 w-6 md:h-8 md:w-8',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M16.548 9.512a.75.75 0 1 0-1.096-1.024L10.4 13.901l-1.852-1.984a.75.75 0 0 0-1.096 1.023l2.034 2.18a1.25 1.25 0 0 0 1.828 0l5.234-5.608',
      },
      {
        d: 'M13.764 3.401c-.993-1.535-3.24-1.535-4.233 0A1.021 1.021 0 0 1 8.306 3.8C6.6 3.141 4.782 4.462 4.88 6.288A1.021 1.021 0 0 1 4.124 7.33C2.357 7.8 1.662 9.937 2.816 11.356a1.021 1.021 0 0 1 0 1.288c-1.154 1.42-.46 3.556 1.308 4.026a1.021 1.021 0 0 1 .757 1.042C4.782 19.538 6.6 20.86 8.306 20.201a1.021 1.021 0 0 1 1.225.398c.993 1.535 3.24 1.535 4.233 0A1.021 1.021 0 0 1 14.99 20.2c1.706.658 3.523-.663 3.425-2.489a1.021 1.021 0 0 1 .757-1.042c1.767-.47 2.461-2.607 1.308-4.026a1.021 1.021 0 0 1 0-1.288c1.153-1.42.46-3.556-1.308-4.026a1.021 1.021 0 0 1-.757-1.042c.098-1.826-1.719-3.147-3.425-2.489A1.021 1.021 0 0 1 13.765 3.4M10.79 4.216a1.021 1.021 0 0 1 1.715 0A2.521 2.521 0 0 0 15.529 5.2a1.021 1.021 0 0 1 1.387 1.008 2.521 2.521 0 0 0 1.869 2.572 1.021 1.021 0 0 1 .53 1.631 2.521 2.521 0 0 0 0 3.18 1.021 1.021 0 0 1-.53 1.63 2.521 2.521 0 0 0-1.869 2.573 1.021 1.021 0 0 1-1.387 1.008 2.521 2.521 0 0 0-3.024.983 1.021 1.021 0 0 1-1.715 0A2.521 2.521 0 0 0 7.766 18.8a1.021 1.021 0 0 1-1.387-1.008 2.521 2.521 0 0 0-1.87-2.572 1.021 1.021 0 0 1-.53-1.631 2.521 2.521 0 0 0 0-3.18 1.021 1.021 0 0 1 .53-1.63 2.521 2.521 0 0 0 1.87-2.573 1.021 1.021 0 0 1 1.387-1.008 2.521 2.521 0 0 0 3.024-.983',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
      },
    ],
  },
  'trade-in': {
    type: 'trade-in',
    className: 'h-8 w-8 m-1',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M7 3.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5M4.75 7a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
      },
      {
        d: 'M13 6.25a.75.75 0 0 0 0 1.5h5.19l-1.72 1.72a.75.75 0 1 0 1.06 1.06l2.647-2.646a1.25 1.25 0 0 0 0-1.768L17.53 3.47a.75.75 0 1 0-1.06 1.06l1.72 1.72H13m-7.19 10H11a.75.75 0 0 1 0 1.5H5.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-2.647-2.646a1.25 1.25 0 0 1 0-1.768L6.47 13.47a.75.75 0 1 1 1.06 1.06l-1.72 1.72',
      },
      {
        d: 'M14.5 13.25a1.25 1.25 0 0 0-1.25 1.25v5a1.25 1.25 0 0 0 1.25 1.25h5a1.25 1.25 0 0 0 1.25-1.25v-5a1.25 1.25 0 0 0-1.25-1.25h-5m.25 6v-4.5h4.5v4.5h-4.5',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
      },
    ],
  },
  'returns': {
    type: 'returns',
    className: 'h-6 w-6 md:h-8 md:w-8',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M2.25 12A9.75 9.75 0 0 1 12 2.25a9.72 9.72 0 0 1 6.75 2.714V3a.75.75 0 0 1 1.5 0v3.5A1.25 1.25 0 0 1 19 7.75h-3a.75.75 0 0 1 0-1.5h1.916l-.043-.044A8.25 8.25 0 1 0 12 20.25 8.25 8.25 0 0 0 20.25 12a.75.75 0 0 1 1.5 0c0 5.385-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12',
      },
      {
        d: 'M12 11.5c2.21 0 4-.672 4-1.5s-1.79-1.5-4-1.5S8 9.172 8 10s1.79 1.5 4 1.5',
      },
      {
        d: 'M15.092 11.763C14.264 12.073 13.17 12.25 12 12.25c-1.17 0-2.264-.177-3.092-.487a4.305 4.305 0 0 1-.644-.3C8.094 11.63 8 11.811 8 12c0 .829 1.79 1.5 4 1.5s4-.671 4-1.5c0-.19-.093-.37-.264-.537a4.307 4.307 0 0 1-.644.3',
      },
      {
        d: 'M12 14.25c1.17 0 2.264-.177 3.092-.487a4.307 4.307 0 0 0 .644-.3C15.906 13.63 16 13.811 16 14c0 .829-1.79 1.5-4 1.5S8 14.83 8 14c0-.19.093-.37.264-.537a4.305 4.305 0 0 0 .644.3C9.736 14.073 10.83 14.25 12 14.25',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
      },
    ],
  },
  'support': {
    type: 'support',
    className: 'h-6 w-6 md:h-8 md:w-8',
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M12 3.75a6.251 6.251 0 0 0-6.21 5.534A1.25 1.25 0 0 1 6.75 10.5v5a1.25 1.25 0 0 1-1.25 1.25 3.25 3.25 0 0 1-3.25-3.25v-1a3.251 3.251 0 0 1 2.016-3.008 7.75 7.75 0 0 1 15.468 0A3.251 3.251 0 0 1 21.75 12.5v1a3.251 3.251 0 0 1-2.242 3.09l-.993 1.49a3.75 3.75 0 0 1-3.12 1.67h-.748a2.751 2.751 0 1 1 0-1.5h.747a2.25 2.25 0 0 0 1.873-1.002l.493-.74a1.248 1.248 0 0 1-.51-1.008v-5a1.25 1.25 0 0 1 .96-1.216A6.25 6.25 0 0 0 12 3.75m-6.75 7.018a1.75 1.75 0 0 0-1.5 1.732v1a1.75 1.75 0 0 0 1.5 1.732v-4.464M12 20.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5m6.75-9.482v4.464a1.75 1.75 0 0 0 1.5-1.732v-1a1.75 1.75 0 0 0-1.5-1.732',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
      },
    ],
  },
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
  default: [
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
  'cart-perks': [
    {
      id: 'warranty',
      title: '1-year minimum warranty',
      iconType: 'warranty',
    },
    {
      id: 'returns',
      title: 'Free 30-day returns',
      iconType: 'returns',
    },
    {
      id: 'delivery',
      title: 'Free delivery on all items',
      iconType: 'delivery',
    },
    {
      id: 'support',
      title: 'Excellent customer support',
      iconType: 'support',
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
  { id: 'fair', name: 'Fair', price: '$ 349.00' },
  { id: 'good', name: 'Good', price: '$ 308.99', isGoodDeal: true },
  { id: 'excellent', name: 'Excellent', price: '$ 341.00' },
  { id: 'premium', name: 'Premium', price: '$ 439.56' },
];

// Storage options
export const storageOptions: SelectionOptionData[] = [
  { id: '128', name: '128 GB', price: '$ 308.99' },
  { id: '256', name: '256 GB', price: '$ 378.99' },
  { id: '512', name: '512 GB', price: '$ 430.92' },
];

// Color options
export const colorOptions: SelectionOptionData[] = [
  {
    id: 'midnight',
    name: 'Midnight',
    price: '$ 316.00',
    color: 'rgb(24, 32, 40)',
  },
  { id: 'red', name: 'Red', price: '$ 342.00', color: 'rgb(255, 0, 0)' },
  { id: 'blue', name: 'Blue', price: '$ 308.99', color: 'rgb(156, 176, 196)' },
  {
    id: 'green',
    name: 'Green',
    price: '$ 342.00',
    color: 'rgb(217, 239, 213)',
  },
  {
    id: 'starlight',
    name: 'Starlight',
    price: '$ 308.99',
    color: 'rgb(238, 233, 229)',
  },
  { id: 'pink', name: 'Pink', price: '$ 308.99', color: 'rgb(252, 231, 231)' },
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

// Product inspection data structure
export interface ProductInspectionData {
  id: string;
  name: string;
  iconData: IconData;
}

// Product inspection SVG data
export const productInspectionData: ProductInspectionData[] = [
  {
    id: 'buttons',
    name: 'Buttons',
    iconData: {
      type: 'delivery',
      className: 'text-foreground',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'M11.193 4.604c0-.71-.242-1.31-.666-1.733A2.133 2.133 0 0 0 9.016 2.25a2.132 2.132 0 0 0-1.51.62C7.08 3.296 6.84 3.896 6.84 4.605v6.166L4.851 13.42c-.397.53-.59 1.232-.6 1.886-.011.648.156 1.387.647 1.923a.772.772 0 0 0 .023.023l3.554 3.553c.46.497 1.137.944 1.968.944h4.278a5.695 5.695 0 0 0 2.76-.701 4.673 4.673 0 0 0 1.541-1.355 3.85 3.85 0 0 0 .728-2.258V11.02c0-.71-.241-1.31-.666-1.734a2.133 2.133 0 0 0-1.51-.62 2.166 2.166 0 0 0-.785.147 2.218 2.218 0 0 0-.557-.952 2.133 2.133 0 0 0-1.51-.62 2.137 2.137 0 0 0-1.427.54 2.136 2.136 0 0 0-1.426-.54 2.169 2.169 0 0 0-.676.107V4.604m6.493 14.357c.363-.453.564-.984.564-1.525V11.02c0-.36-.116-.562-.226-.673a.633.633 0 0 0-.45-.181.634.634 0 0 0-.45.181c-.111.11-.226.313-.226.673v.713a.75.75 0 0 1-1.5 0V9.594c0-.36-.116-.562-.226-.672a.633.633 0 0 0-.45-.182.633.633 0 0 0-.45.182c-.111.11-.227.312-.227.672v1.426a.75.75 0 0 1-1.5 0V9.594c0-.36-.115-.562-.226-.672a.633.633 0 0 0-.45-.182.633.633 0 0 0-.45.182c-.11.11-.226.312-.226.67v1.428a.75.75 0 0 1-1.5 0V4.604c0-.36-.116-.562-.227-.672a.633.633 0 0 0-.45-.182.632.632 0 0 0-.45.181C8.456 4.041 8.34 4.244 8.34 4.604v9.98a.75.75 0 1 1-1.5 0V13.27l-.789 1.052c-.168.225-.294.601-.3 1.01-.008.408.103.714.244.875l3.552 3.55a.795.795 0 0 1 .023.025c.29.316.6.469.873.469h4.278a4.135 4.135 0 0 0 1.977-.476 3.232 3.232 0 0 0 .988-.813',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
      ],
    },
  },
  {
    id: 'sim-memory-card',
    name: 'SIM/memory card reader',
    iconData: {
      type: 'delivery',
      className: '',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'M8 5.25A.75.75 0 0 1 8.75 6v2a.75.75 0 0 1-1.5 0V6A.75.75 0 0 1 8 5.25M11.75 6a.75.75 0 0 0-1.5 0v2a.75.75 0 0 0 1.5 0V6M14 5.25A.75.75 0 0 1 14.75 6v2a.75.75 0 0 1-1.5 0V6A.75.75 0 0 1 14 5.25',
        },
        {
          d: 'M8.5 12.25a1.25 1.25 0 0 0-1.25 1.25v4a1.25 1.25 0 0 0 1.25 1.25h7a1.25 1.25 0 0 0 1.25-1.25v-4a1.25 1.25 0 0 0-1.25-1.25h-7m.25 5v-3.5h6.5v3.5h-6.5',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
        {
          d: 'M4.25 4.5A2.25 2.25 0 0 1 6.5 2.25h8.293a1.25 1.25 0 0 1 .884.366l3.707 3.707a1.25 1.25 0 0 1 .366.884V19.5a2.25 2.25 0 0 1-2.25 2.25h-11a2.25 2.25 0 0 1-2.25-2.25v-15M6.5 3.75A.75.75 0 0 0 5.75 4.5v15a.75.75 0 0 0 .75.75h11a.75.75 0 0 0 .75-.75V7.31l-3.56-3.56H6.5',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
      ],
    },
  },
  {
    id: 'data-deletion',
    name: 'Data deletion',
    iconData: {
      type: 'delivery',
      className: '',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'm16.695 4.75-.807 8.065c-.113 1.133-1.492 1.625-2.297.82l-3.325-3.324v2.482c0 1.114-1.346 1.671-2.134.884L4.766 10.31v8.939h14.452L18.31 4.75h-1.616m-1.47-.374a1.25 1.25 0 0 1 1.244-1.126h2.077a1.25 1.25 0 0 1 1.248 1.172l.937 15a1.25 1.25 0 0 1-1.247 1.328H4.516a1.25 1.25 0 0 1-1.25-1.25V9.707c0-1.114 1.347-1.671 2.134-.884l3.366 3.366V9.707c0-1.114 1.347-1.671 2.134-.884l3.527 3.528.798-7.975',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
      ],
    },
  },
  {
    id: 'chargers-cables',
    name: 'Chargers/cables',
    iconData: {
      type: 'delivery',
      className: 'text-foreground',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'M10.616 7.882 7.993 11.98a.5.5 0 0 0 .42.77H10.5l-.662 3.144c-.069.326.366.505.546.224l2.624-4.1a.5.5 0 0 0-.422-.769H10.5l.662-3.145c.069-.326-.366-.504-.546-.223',
        },
        {
          d: 'M2.75 7.5A3.25 3.25 0 0 1 6 4.25h9a3.25 3.25 0 0 1 3.24 3h2.26a.75.75 0 0 1 0 1.5h-2.25v7.75A3.25 3.25 0 0 1 15 19.75H6a3.25 3.25 0 0 1-3.25-3.25v-9m14 0v9A1.75 1.75 0 0 1 15 18.25H6a1.75 1.75 0 0 1-1.75-1.75v-9A1.75 1.75 0 0 1 6 5.75h9a1.75 1.75 0 0 1 1.75 1.75',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
      ],
    },
  },
  {
    id: 'unlocked-by-previous-owner',
    name: 'Unlocked by previous owner',
    iconData: {
      type: 'delivery',
      className: 'text-foreground',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'M10.25 12.75A.75.75 0 0 1 11 13.5v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75',
        },
        {
          d: 'M14.5 6.7c0-1.291 1.166-2.45 2.75-2.45S20 5.409 20 6.7v1.8a.75.75 0 0 0 1.5 0V6.7c0-2.243-1.968-3.95-4.25-3.95C14.967 2.75 13 4.457 13 6.7v2.05H5.75A3.25 3.25 0 0 0 2.5 12v6a3.25 3.25 0 0 0 3.25 3.25h9A3.25 3.25 0 0 0 18 18v-6a3.25 3.25 0 0 0-3.25-3.25H14.5V6.7m-8.75 3.55A1.75 1.75 0 0 0 4 12v6a1.75 1.75 0 0 0 1.75 1.75h9A1.75 1.75 0 0 0 16.5 18v-6a1.75 1.75 0 0 0-1.75-1.75h-9',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
      ],
    },
  },
  {
    id: 'gps-positioning',
    name: 'GPS/positioning system',
    iconData: {
      type: 'delivery',
      className: 'text-foreground',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'M10.763 8.861a1.75 1.75 0 1 1 2.474 2.475 1.75 1.75 0 0 1-2.474-2.475',
        },
        {
          d: 'M12 2.348c-4.341 0-7.75 3.732-7.75 7.95 0 1.033.387 2.152.922 3.222.541 1.084 1.27 2.188 2.029 3.21 1.52 2.046 3.211 3.827 3.923 4.552a1.223 1.223 0 0 0 1.752 0c.712-.725 2.404-2.506 3.923-4.552.76-1.022 1.488-2.126 2.029-3.21.535-1.07.922-2.189.922-3.222 0-4.218-3.409-7.95-7.75-7.95m-6.25 7.95c0-3.453 2.8-6.45 6.25-6.45s6.25 2.997 6.25 6.45c0 .69-.27 1.562-.764 2.552-.488.976-1.161 2.003-1.891 2.986-1.337 1.8-2.823 3.398-3.595 4.196-.772-.798-2.258-2.396-3.595-4.196-.73-.983-1.403-2.01-1.891-2.986-.495-.99-.764-1.861-.764-2.552',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
      ],
    },
  },
  {
    id: 'cameras',
    name: 'Cameras',
    iconData: {
      type: 'delivery',
      className: '',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'M12 10.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5M9.75 14a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
        {
          d: 'M8.178 4.197A1.25 1.25 0 0 1 9.39 3.25h5.22a1.25 1.25 0 0 1 1.212.947l.764 3.053H19.5a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25v-9A2.25 2.25 0 0 1 4.5 7.25h2.914l.764-3.053m6.236.553.626 2.5H8.96l.626-2.5h4.829m-9.914 4A.75.75 0 0 0 3.75 9.5v9a.75.75 0 0 0 .75.75h15a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75h-15',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
      ],
    },
  },
  {
    id: 'external-sensors',
    name: 'External sensors',
    iconData: {
      type: 'delivery',
      className: 'text-foreground',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'M11.193 4.604c0-.71-.242-1.31-.666-1.733A2.133 2.133 0 0 0 9.016 2.25a2.132 2.132 0 0 0-1.51.62C7.08 3.296 6.84 3.896 6.84 4.605v6.166L4.851 13.42c-.397.53-.59 1.232-.6 1.886-.011.648.156 1.387.647 1.923a.772.772 0 0 0 .023.023l3.554 3.553c.46.497 1.137.944 1.968.944h4.278a5.695 5.695 0 0 0 2.76-.701 4.673 4.673 0 0 0 1.541-1.355 3.85 3.85 0 0 0 .728-2.258V11.02c0-.71-.241-1.31-.666-1.734a2.133 2.133 0 0 0-1.51-.62 2.166 2.166 0 0 0-.785.147 2.218 2.218 0 0 0-.557-.952 2.133 2.133 0 0 0-1.51-.62 2.137 2.137 0 0 0-1.427.54 2.136 2.136 0 0 0-1.426-.54 2.169 2.169 0 0 0-.676.107V4.604m6.493 14.357c.363-.453.564-.984.564-1.525V11.02c0-.36-.116-.562-.226-.673a.633.633 0 0 0-.45-.181.634.634 0 0 0-.45.181c-.111.11-.226.313-.226.673v.713a.75.75 0 0 1-1.5 0V9.594c0-.36-.116-.562-.226-.672a.633.633 0 0 0-.45-.182.633.633 0 0 0-.45.182c-.111.11-.227.312-.227.672v1.426a.75.75 0 0 1-1.5 0V9.594c0-.36-.115-.562-.226-.672a.633.633 0 0 0-.45-.182.633.633 0 0 0-.45.182c-.11.11-.226.312-.226.67v1.428a.75.75 0 0 1-1.5 0V4.604c0-.36-.116-.562-.227-.672a.633.633 0 0 0-.45-.182.632.632 0 0 0-.45.181C8.456 4.041 8.34 4.244 8.34 4.604v9.98a.75.75 0 1 1-1.5 0V13.27l-.789 1.052c-.168.225-.294.601-.3 1.01-.008.408.103.714.244.875l3.552 3.55a.795.795 0 0 1 .023.025c.29.316.6.469.873.469h4.278a4.135 4.135 0 0 0 1.977-.476 3.232 3.232 0 0 0 .988-.813',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
      ],
    },
  },
  {
    id: 'biometric-sensors',
    name: 'Biometric sensors',
    iconData: {
      type: 'delivery',
      className: '',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'M17.03 9.53a.75.75 0 0 0-1.06-1.06l-5.47 5.47-2.47-2.47a.75.75 0 0 0-1.06 1.06l2.646 2.647a1.25 1.25 0 0 0 1.768 0L17.03 9.53',
        },
        {
          d: 'M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25M3.75 12a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
      ],
    },
  },
  {
    id: 'wifi-bluetooth',
    name: 'Wi-Fi and Bluetooth',
    iconData: {
      type: 'delivery',
      className: '',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'M2.984 8.86a.75.75 0 0 0 1.061 1.06c4.393-4.393 11.517-4.393 15.91 0a.75.75 0 0 0 1.06-1.06c-4.979-4.98-13.051-4.98-18.03 0m2.829 2.828a.75.75 0 0 0 1.06 1.06 7.25 7.25 0 0 1 10.253 0 .75.75 0 0 0 1.061-1.06 8.75 8.75 0 0 0-12.374 0m2.828 3.889a.75.75 0 0 1 0-1.06 4.75 4.75 0 0 1 6.718 0 .75.75 0 1 1-1.061 1.06 3.25 3.25 0 0 0-4.596 0 .75.75 0 0 1-1.06 0M12 18.875a1 1 0 1 0 0-2 1 1 0 0 0 0 2',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
      ],
    },
  },
  {
    id: 'imei-serial',
    name: 'IMEI serial number',
    iconData: {
      type: 'delivery',
      className: '',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4',
        },
        {
          d: 'M12 2.25A.75.75 0 0 1 12.75 3v1.286a7.752 7.752 0 0 1 6.964 6.964H21a.75.75 0 0 1 0 1.5h-1.286a7.752 7.752 0 0 1-6.964 6.964V21a.75.75 0 0 1-1.5 0v-1.286a7.752 7.752 0 0 1-6.964-6.964H3a.75.75 0 0 1 0-1.5h1.286a7.752 7.752 0 0 1 6.964-6.964V3A.75.75 0 0 1 12 2.25m-6.205 10.5H7a.75.75 0 0 0 0-1.5H5.795a6.253 6.253 0 0 1 5.455-5.455V7a.75.75 0 0 0 1.5 0V5.795a6.253 6.253 0 0 1 5.456 5.455H17a.75.75 0 0 0 0 1.5h1.206a6.253 6.253 0 0 1-5.456 5.456V17a.75.75 0 0 0-1.5 0v1.206a6.253 6.253 0 0 1-5.455-5.456',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
      ],
    },
  },
  {
    id: 'water-damage',
    name: 'Water damage',
    iconData: {
      type: 'delivery',
      className: '',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'M13.613 7.617a.75.75 0 0 0-1.226.864l1.735 2.465a.75.75 0 0 0 1.227-.863l-1.736-2.466',
        },
        {
          d: 'M12 21.652c4.341 0 7.75-3.732 7.75-7.95 0-1.033-.387-2.152-.922-3.222-.541-1.084-1.27-2.188-2.029-3.21-1.519-2.046-3.211-3.827-3.923-4.552a1.223 1.223 0 0 0-1.752 0C10.412 3.443 8.72 5.224 7.2 7.27c-.76 1.023-1.488 2.127-2.029 3.21-.535 1.071-.922 2.19-.922 3.223 0 4.218 3.409 7.95 7.75 7.95m6.25-7.95c0 3.453-2.8 6.45-6.25 6.45s-6.25-2.997-6.25-6.45c0-.69.27-1.562.764-2.552.488-.977 1.161-2.003 1.891-2.986 1.337-1.8 2.823-3.398 3.595-4.196.772.798 2.258 2.396 3.595 4.196.73.983 1.403 2.01 1.891 2.986.494.99.764 1.861.764 2.551',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
      ],
    },
  },
  {
    id: 'flash-indicator-lights',
    name: 'Flash and indicator lights',
    iconData: {
      type: 'delivery',
      className: '',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'M12.75 3.25a.75.75 0 0 0-1.5 0v1.414a.75.75 0 0 0 1.5 0V3.25M4.97 5.22a.75.75 0 0 1 1.06 0l1 1a.75.75 0 0 1-1.06 1.06l-1-1a.75.75 0 0 1 0-1.06m14.06 1.06a.75.75 0 0 0-1.06-1.06l-1 1a.75.75 0 0 0 1.06 1.06l1-1M5.164 11.25A.75.75 0 0 1 4.414 12H3a.75.75 0 0 1 0-1.5h1.414a.75.75 0 0 1 .75.75m16.586 0A.75.75 0 0 1 21 12h-1.414a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75',
        },
        {
          d: 'M6.25 12.101C6.199 8.501 9.192 6.5 12 6.5c2.822 0 5.75 2.009 5.75 5.59v.011c-.022 1.504-.498 2.573-1.455 3.585a24.344 24.344 0 0 1-.364.374 3.821 3.821 0 0 0-.424.474c-.115.164-.205.358-.24.78a1.322 1.322 0 0 1-.017.12v1.816A2.25 2.25 0 0 1 13 21.5h-2a2.25 2.25 0 0 1-2.25-2.25v-1.814a1.286 1.286 0 0 1-.016-.122c-.036-.422-.126-.616-.241-.78a3.86 3.86 0 0 0-.425-.475 16.71 16.71 0 0 1-.362-.373c-.958-1.011-1.433-2.081-1.455-3.585m4 6.399h3.5v.75A.75.75 0 0 1 13 20h-2a.75.75 0 0 1-.75-.75V18.5m4.031-2.83c-.265.376-.422.786-.49 1.33h-3.582c-.069-.544-.225-.954-.49-1.33-.182-.26-.434-.515-.676-.761a18.155 18.155 0 0 1-.248-.255c-.709-.748-1.028-1.462-1.044-2.575C7.713 9.519 9.81 8 12 8c2.176 0 4.246 1.51 4.249 4.085-.017 1.11-.337 1.822-1.044 2.57a18.024 18.024 0 0 1-.249.255c-.242.245-.493.501-.676.76',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
      ],
    },
  },
  {
    id: 'mics-speakers',
    name: 'Mics and speakers',
    iconData: {
      type: 'delivery',
      className: '',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'M12 3.75a6.251 6.251 0 0 0-6.21 5.534A1.25 1.25 0 0 1 6.75 10.5v5a1.25 1.25 0 0 1-1.25 1.25 3.25 3.25 0 0 1-3.25-3.25v-1a3.251 3.251 0 0 1 2.016-3.008 7.75 7.75 0 0 1 15.468 0A3.251 3.251 0 0 1 21.75 12.5v1a3.251 3.251 0 0 1-2.242 3.09l-.993 1.49a3.75 3.75 0 0 1-3.12 1.67h-.748a2.751 2.751 0 1 1 0-1.5h.747a2.25 2.25 0 0 0 1.873-1.002l.493-.74a1.248 1.248 0 0 1-.51-1.008v-5a1.25 1.25 0 0 1 .96-1.216A6.25 6.25 0 0 0 12 3.75m-6.75 7.018a1.75 1.75 0 0 0-1.5 1.732v1a1.75 1.75 0 0 0 1.5 1.732v-4.464M12 20.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5m6.75-9.482v4.464a1.75 1.75 0 0 0 1.5-1.732v-1a1.75 1.75 0 0 0-1.5-1.732',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
      ],
    },
  },
  {
    id: 'input-output-ports',
    name: 'Input and output ports',
    iconData: {
      type: 'delivery',
      className: '',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'M9 2.75A.75.75 0 0 1 9.75 3.5v1.75h4.5V3.5a.75.75 0 0 1 1.5 0v1.764a2.25 2.25 0 0 1 2 2.236v3a2.25 2.25 0 0 1-2.25 2.25h-2.75v7.75a.75.75 0 0 1-1.5 0v-7.75H8.5a2.25 2.25 0 0 1-2.25-2.25v-3a2.25 2.25 0 0 1 2-2.236V3.5A.75.75 0 0 1 9 2.75m6.5 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-7a.75.75 0 0 1-.75-.75v-3A.75.75 0 0 1 8.5 6.75h7',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
        {
          d: 'm18.008 14.06-2.019 3.172A.5.5 0 0 0 16.411 18H18l-.583 2.622c-.074.334.38.512.552.216l2.092-3.586A.5.5 0 0 0 19.63 16.5H18l.552-2.206c.082-.33-.362-.521-.544-.234',
        },
      ],
    },
  },
  {
    id: 'phone-carrier',
    name: 'Phone carrier',
    iconData: {
      type: 'delivery',
      className: '',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'M2.984 8.86a.75.75 0 0 0 1.061 1.06c4.393-4.393 11.517-4.393 15.91 0a.75.75 0 0 0 1.06-1.06c-4.979-4.98-13.051-4.98-18.03 0m2.829 2.828a.75.75 0 0 0 1.06 1.06 7.25 7.25 0 0 1 10.253 0 .75.75 0 0 0 1.061-1.06 8.75 8.75 0 0 0-12.374 0m2.828 3.889a.75.75 0 0 1 0-1.06 4.75 4.75 0 0 1 6.718 0 .75.75 0 1 1-1.061 1.06 3.25 3.25 0 0 0-4.596 0 .75.75 0 0 1-1.06 0M12 18.875a1 1 0 1 0 0-2 1 1 0 0 0 0 2',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
      ],
    },
  },
  {
    id: 'battery-health',
    name: 'Battery health',
    iconData: {
      type: 'delivery',
      className: '',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'm10.749 5.972-2.812 6.325A.5.5 0 0 0 8.394 13h2.231L9.93 17.864c-.05.345.43.483.571.165l2.812-6.326A.5.5 0 0 0 12.856 11h-2.231l.695-4.864c.05-.345-.43-.483-.571-.164',
        },
        {
          d: 'M7.872 8.75H5.125a.75.75 0 0 0-.75.75v5a.75.75 0 0 0 .75.75h3.663l-.214 1.5H5.125a2.25 2.25 0 0 1-2.25-2.25v-5a2.25 2.25 0 0 1 2.25-2.25h3.414l-.667 1.5m4.59 0h3.663a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-.75.75h-2.747l-.667 1.5h3.414a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-3.45l-.213 1.5m8.548 2.176a1.5 1.5 0 0 1 .115.574v1a1.5 1.5 0 0 1-1.202 1.47c-.162.033-.298-.104-.298-.27v-3.4c0-.166.136-.303.298-.27a1.498 1.498 0 0 1 1.088.896',
        },
      ],
    },
  },
  {
    id: 'mechanical-parts',
    name: 'Mechanical parts',
    iconData: {
      type: 'delivery',
      className: '',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'M11.232 3a1.25 1.25 0 0 1 1.535 0l8.693 6.761a.75.75 0 1 1-.92 1.184L12 4.303l-8.54 6.642a.75.75 0 1 1-.92-1.184L11.231 3',
        },
        {
          d: 'M5 11a.75.75 0 0 1 .75.75v6.75h8.75a.75.75 0 0 1 0 1.5h-9a1.25 1.25 0 0 1-1.25-1.25v-7A.75.75 0 0 1 5 11m14 0a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 19 11',
        },
        {
          d: 'M15.06 11.317c.836.837 1.082 2.263.575 3.403l5.082 5.083a1 1 0 1 1-1.414 1.414l-5.083-5.082c-1.14.507-2.566.261-3.403-.575-1.001-1-.939-2.358-.817-3.064.038-.22.296-.286.454-.128l1.69 1.69a.3.3 0 0 0 .212.088h.99a.3.3 0 0 0 .3-.3v-.99a.3.3 0 0 0-.088-.212l-1.69-1.69c-.158-.158-.092-.416.128-.454.706-.122 2.063-.184 3.064.817',
        },
      ],
    },
  },
  {
    id: 'parts-compatibility',
    name: 'Parts compatibility',
    iconData: {
      type: 'delivery',
      className: '',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'M7.53 11.53a.75.75 0 0 1-1.06 0L3.823 8.884a1.25 1.25 0 0 1 0-1.768L6.47 4.47a.75.75 0 0 1 1.06 1.06L5.81 7.25H17a.75.75 0 0 1 0 1.5H5.81l1.72 1.72a.75.75 0 0 1 0 1.06M6.25 16A.75.75 0 0 0 7 16.75h11.19l-1.72 1.72a.75.75 0 1 0 1.06 1.06l2.647-2.646a1.25 1.25 0 0 0 0-1.768L17.53 12.47a.75.75 0 0 0-1.06 1.06l1.72 1.72H7A.75.75 0 0 0 6.25 16',
        },
      ],
    },
  },
  {
    id: 'screen',
    name: 'Screen',
    iconData: {
      type: 'delivery',
      className: '',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'M12 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2M10.5 4.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3',
        },
        {
          d: 'M5.25 5.5A3.25 3.25 0 0 1 8.5 2.25h7a3.25 3.25 0 0 1 3.25 3.25v13a3.25 3.25 0 0 1-3.25 3.25h-7a3.25 3.25 0 0 1-3.25-3.25v-13M8.5 3.75A1.75 1.75 0 0 0 6.75 5.5v13a1.75 1.75 0 0 0 1.75 1.75h7a1.75 1.75 0 0 0 1.75-1.75v-13a1.75 1.75 0 0 0-1.75-1.75h-7',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
      ],
    },
  },
  {
    id: 'other-features',
    name: 'Other features specific to this device',
    iconData: {
      type: 'delivery',
      className: '',
      viewBox: '0 0 24 24',
      paths: [
        {
          d: 'M6.875 11a.75.75 0 0 1 .75-.75h8.75a.75.75 0 0 1 0 1.5h-8.75A.75.75 0 0 1 6.875 11m.75 2.25a.75.75 0 0 0 0 1.5h8.75a.75.75 0 0 0 0-1.5h-8.75m0 3a.75.75 0 0 0 0 1.5h8.75a.75.75 0 0 0 0-1.5h-8.75',
        },
        {
          d: 'M5.5 3.25A2.25 2.25 0 0 0 3.25 5.5v13a2.25 2.25 0 0 0 2.25 2.25h13a2.25 2.25 0 0 0 2.25-2.25v-13a2.25 2.25 0 0 0-2.25-2.25h-13M4.75 5.5A.75.75 0 0 1 5.5 4.75h13a.75.75 0 0 1 .75.75v13a.75.75 0 0 1-.75.75h-13a.75.75 0 0 1-.75-.75v-13',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },
      ],
    },
  },
];

// Helper function to get product inspection data
export const getProductInspectionData = (): ProductInspectionData[] => {
  return productInspectionData;
};

const relatedProducts = [
  {
    id: '1',
    name: 'iPhone 14',
    description: 'Midnight · 128 GB · Physical SIM + eSIM',
    image:
      'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
    price: 263.0,
    originalPrice: 599.0,
    rating: 4.5,
    reviewCount: 16490,
  },
  {
    id: '2',
    name: 'iPhone 14 Pro',
    description: 'Space Black · 256 GB · Physical SIM + eSIM',
    image:
      'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-2_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
    price: 389.0,
    originalPrice: 699.0,
    rating: 4.6,
    reviewCount: 12850,
  },
  {
    id: '3',
    name: 'iPhone 13 Pro',
    description: 'Sierra Blue · 128 GB · Physical SIM + eSIM',
    image:
      'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-3_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
    price: 299.0,
    originalPrice: 599.0,
    rating: 4.4,
    reviewCount: 9870,
  },
  {
    id: '4',
    name: 'iPhone 12',
    description: 'Blue · 64 GB · Physical SIM + eSIM',
    image:
      'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-4_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
    price: 199.0,
    originalPrice: 499.0,
    rating: 4.3,
    reviewCount: 7560,
  },
];

const pairsWellProducts = [
  {
    id: '5',
    name: 'iPhone 14 Plus',
    description: 'Midnight · 128 GB · Physical SIM + eSIM',
    image:
      'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-5_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
    price: 391.0,
    originalPrice: 1099.0,
    rating: 3.5,
    reviewCount: 12099,
  },
];

export const getRelatedProducts = () => {
  return relatedProducts;
}

export const getPairsWellProducts = () => {
  return pairsWellProducts;
}