export class AttributeDto {
  id: number;
  code: string;
  attributeName: string;
  value: {
    id: number;
    name: string;
  };
}

export class ProductVariantDetailDto {
  id: string;
  sku: string | null;
  title: string | null;

  subtitleRaw: string[]; // 👈 Array ["512 GB", "Black", "Unlocked"]
  subtitleText: string; // 👈 String "512 GB - Black - Unlocked"

  stock: number;
  price: number;

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

  attributes: AttributeDto[];
}
