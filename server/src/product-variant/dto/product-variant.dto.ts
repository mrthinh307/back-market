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

export class SubtitleDto {
  raw?: string[]; // 👈 Array ["512 GB", "Black", "Unlocked"]
  text?: string; // 👈 String "512 GB - Black - Unlocked"
}

export class ProductVariantDetailDto {
  id: string;
  slug: string;
  title: string | null;

  subtitle: SubtitleDto;

  available: boolean;
  selected?: boolean;

  price: string;
  priceWithCurrency: `$ ${string}`;

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

  reviewRating: {
    count: number;
    average: number;
  };
}

export class VariantItemDto {
  variantId: string;
  slug: string;
  available: boolean;
  selected: boolean;
  price: string;
  priceWithCurrency: string;
  grade: AttributeValueDto;
}

export class ProductDto {
  relevantVariants: {
    attribute: AttributeDto;
    items: VariantItemDto[];
  }[];
}
