// Backend API Response Types
export interface Grade {
  id: number;
  name: string;
  displayOrder: number;
}

export interface RelevantVariantGroup {
  attribute: {
    id: number;
    code: string;
    name: string;
  };
  items: {
    variantId: string;
    slug: string;
    available: boolean;
    selected: boolean;
    priceValue: number;
    priceWithCurrency: string;
    grade: Grade;
  }[];
}

export interface RelevantVariantsResponse {
  relevantVariants: RelevantVariantGroup[];
}

export interface ProductVariantDetail {
  id: string;
  slug: string;
  title: string;
  subtitle: {
    raw: string[];
    text: string;
  };
  available: boolean;
  priceValue: number;
  priceWithCurrency: string;
  product: {
    id: string;
    name: string;
    brand: {
      id: string;
      name: string;
    } | null;
    category: {
      id: number;
      name: string;
    };
  };
  attributes: Array<{
    id: number;
    code: string;
    name: string;
    grade: Grade;
  }>;
  reviewRating: {
    count: number;
    average: number;
  };
  images: {
    id: number;
    imageUrl: string;
    altText: string | null;
    displayOrder: number;
  }[];
}
