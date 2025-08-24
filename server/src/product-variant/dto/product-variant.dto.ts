export class AttributeValueDto {
  id: number;
  name: string;
  displayOrder: number;
}

export class AttributeDto {
  id: number;
  code: string;
  name: string;
  grade?: AttributeValueDto;
}

export class ProductVariantDetailDto {
  id: string;
  slug: string;
  title: string | null;

  subtitleRaw?: string[]; // 👈 Array ["512 GB", "Black", "Unlocked"]
  subtitleText?: string; // 👈 String "512 GB - Black - Unlocked"

  available: boolean;
  selected?: boolean;
  price: {
    amount: number;
    currency: 'USD';  
  };

  product?: {
    id: string;
    name: string;
    category: {
      id: number;
      name: string;
    };
    brand: {
      id: string;
      name: string;
    } | null;
  };

  attributes: AttributeDto[];
}

export class VariantItemDto {
  variantId: string;
  slug: string;
  available: boolean;
  selected: boolean;
  price: {
    amount: number;
    currency: 'USD';
  };
  grade: AttributeValueDto;
};

export class ProductDto {
  relevantVariants: {
    attribute:AttributeDto;
    items: VariantItemDto[];
  }[];
}
