import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AttributeDto,
  ProductVariantDetailDto,
  ProductDto,
  VariantItemDto,
} from './dto/product-variant.dto';
import { generateSlug } from 'src/common/utils/string';
import { Prisma } from '@prisma/client';

// Type for Prisma raw query result (before transformation to DTO)
type PrismaProductVariant = {
  id: string;
  sku: string;
  title: string;
  stock: number;
  price: Prisma.Decimal; // Prisma Decimal
  attributes: {
    attributeId: number;
    valueId: number;
    attribute: {
      id: number;
      code: string;
      name: string;
    };
    value: {
      id: number;
      value: string;
      displayOrder: number;
    };
  }[];
};

@Injectable()
export class ProductVariantService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get individual product variant by ID
   * Returns complete details of a specific variant including product info, attributes, etc.
   * Used for: cart items, order details, checkout, variant-specific operations
   */
  async getProductVariantById(
    variantId: string,
  ): Promise<ProductVariantDetailDto> {
    const variant = await this.prisma.productVariant.findUnique({
      where: { id: variantId },
      include: {
        product: {
          include: {
            brand: true,
            category: true,
          },
        },
        attributes: {
          include: {
            attribute: true,
            value: true,
          },
          orderBy: {
            attributeId: 'asc',
          },
        },
      },
    });

    if (!variant) {
      throw new NotFoundException('Product variant not found');
    }

    const attributes: AttributeDto[] = variant.attributes.map((attr) => ({
      id: attr.attribute.id,
      code: attr.attribute.code,
      name: attr.attribute.name,
      grade: {
        id: attr.value.id,
        name: attr.value.value,
        displayOrder: attr.value.displayOrder,
      },
    }));

    const subtitleRaw = attributes.map((a) => a.grade?.name || '');
    const subtitleText = subtitleRaw.join(' - ');

    return {
      id: variant.id,
      slug: generateSlug(variant.sku!),
      title: variant.title,
      subtitleRaw,
      subtitleText,
      available: variant.stock > 0,
      price: {
        amount: variant.price ? variant.price.toNumber() : 0,
        currency: 'USD',
      },
      product: {
        id: variant.product.id,
        name: variant.product.name,
        brand: variant.product.brand
          ? {
              id: variant.product.brand.id,
              name: variant.product.brand.name,
            }
          : null,
        category: {
          id: variant.product.category.id,
          name: variant.product.category.name,
        },
      },
      attributes,
      // images: [],
      // reviews: [],
    };
  }

  /**
   * Delete a product variant by ID
   * Used for admin operations to remove variants
   */
  async deleteProductVariant(variantId: string): Promise<void> {
    // First check if the variant exists
    const existingVariant = await this.prisma.productVariant.findUnique({
      where: { id: variantId },
    });

    if (!existingVariant) {
      throw new NotFoundException(`Product variant with ID ${variantId} not found`);
    }

    // If variant exists, proceed with deletion
    await this.prisma.productVariant.delete({
      where: { id: variantId },
    });
  }

  /**
   * Get relevant variants for product detail page
   * Returns variants filtered by Back Market's selection logic:
   * - Only returns variants that differ by exactly one attribute from default combination
   * - Used for product detail page where users select options (condition, storage, color, etc.)
   */
  async getRelevantVariants(
    productId: string, 
    defaultVariantId?: string
  ): Promise<ProductDto> {    
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        variants: {
          include: {
            attributes: {
              include: {
                attribute: true,
                value: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // Get default variant or first variant if not specified
    let defaultVariant = product.variants[0] as PrismaProductVariant;
    if (defaultVariantId) {
      const foundVariant = product.variants.find(v => v.id === defaultVariantId) as PrismaProductVariant;
      if (foundVariant) {
        defaultVariant = foundVariant;
      }
    }

    if (!defaultVariant) {
      throw new NotFoundException(`No variants found for product ${productId}`);
    }

    // Get default variant's attribute combination
    const defaultCombination = defaultVariant.attributes.reduce((acc, attr) => {
      acc[attr.attributeId] = attr.valueId;
      return acc;
    }, {} as Record<number, number>);

    // Get all possible variants based on default combination
    const relevantVariants = this.filterRelevantVariants(product.variants as PrismaProductVariant[], defaultCombination);

    // Make sure default variant is included
    if (!relevantVariants.includes(defaultVariant)) {
      relevantVariants.unshift(defaultVariant);
    }

    // Group variants by attributes to create relevantVariants structure
    const relevantVariantsGrouped = this.groupVariantsByAttribute(
      relevantVariants, 
      defaultCombination
    );

    return {
      relevantVariants: relevantVariantsGrouped,
    };
  }

  /**
   * Filter relevant variants based on default combination
   * Returns variants that differ by only one attribute from the default combination
   * OPTIMIZED: Single pass through variants with pre-built index
   */
  private filterRelevantVariants(
    allVariants: PrismaProductVariant[], 
    defaultCombination: Record<number, number>
  ): PrismaProductVariant[] {
    console.log('🔍 Default combination:', defaultCombination);
    console.log('📦 Total variants to filter:', allVariants.length);
    
    const relevantVariants = new Set<PrismaProductVariant>();
    const attributeIds = Object.keys(defaultCombination).map(id => parseInt(id));

    // Single pass through all variants - much more efficient
    allVariants.forEach(variant => {
      const variantCombination = variant.attributes.reduce((acc: Record<number, number>, attr) => {
        acc[attr.attributeId] = attr.valueId;
        return acc;
      }, {});

      // Check if this variant differs by exactly one attribute
      let differenceCount = 0;
      let differentAttribute = -1;

      for (const attributeId of attributeIds) {
        if (variantCombination[attributeId] !== defaultCombination[attributeId]) {
          differenceCount++;
          differentAttribute = attributeId;
          
          // Early exit if more than one difference
          if (differenceCount > 1) break;
        }
      }

      // Include variant if it differs by exactly one attribute
      if (differenceCount === 1) {
        console.log(`✅ Added variant ${variant.id} (differs by attribute ${differentAttribute})`);
        relevantVariants.add(variant);
      }
    });

    console.log(`\n📊 Summary: Found ${relevantVariants.size} relevant variants`);
    console.log('Relevant variant IDs:', Array.from(relevantVariants).map(v => v.id));
    
    return Array.from(relevantVariants);
  }

  /**
   * Group variants by attribute to create the relevantVariants structure
   * OPTIMIZED: Pre-build attribute-value maps to avoid duplicate processing
   */
  private groupVariantsByAttribute(
    variants: PrismaProductVariant[],
    defaultCombination: Record<number, number>
  ) {
    console.log('\n🔄 Grouping variants by attribute...');
    console.log('Input variants count:', variants.length);
    
    // Pre-build attribute index and value maps in single pass
    const attributeIndex = new Map<number, { 
      attribute: AttributeDto;
      valueToVariant: Map<number, PrismaProductVariant>;
    }>();

    // Single pass to build complete index
    variants.forEach(variant => {
      variant.attributes.forEach(attr => {
        const attributeId = attr.attributeId;
        
        if (!attributeIndex.has(attributeId)) {
          attributeIndex.set(attributeId, {
            attribute: {
              id: attr.attribute.id,
              code: attr.attribute.code,
              name: attr.attribute.name,
            },
            valueToVariant: new Map()
          });
        }

        const group = attributeIndex.get(attributeId)!;
        const valueId = attr.valueId;
        
        // Only store first variant for each value (automatic deduplication)
        if (!group.valueToVariant.has(valueId)) {
          group.valueToVariant.set(valueId, variant);
          console.log(`✅ Indexed ${attr.attribute.code}: "${attr.value.value}" -> variant ${variant.id}`);
        }
      });
    });

    console.log('Found attributes:', Array.from(attributeIndex.keys()));

    // Build final result from index and sort by attribute ID and value display order
    const result = Array.from(attributeIndex.entries())
      .sort(([attributeIdA], [attributeIdB]) => attributeIdA - attributeIdB) // Sort by attribute ID
      .map(([attributeId, group]) => {
        const items: VariantItemDto[] = Array.from(group.valueToVariant.entries())
          .map(([, variant]) => {
            const variantAttr = variant.attributes.find(attr => attr.attributeId === attributeId);
            
            return {
              variantId: variant.id,
              slug: generateSlug(variant.sku),
              available: variant.stock > 0,
              selected: defaultCombination[attributeId] === variantAttr!.valueId,
              price: {
                amount: variant.price ? variant.price.toNumber() : 0,
                currency: 'USD' as const,
              },
              grade: {
                id: variantAttr!.value.id,
                name: variantAttr!.value.value,
                displayOrder: variantAttr!.value.displayOrder,
              },
            };
          })
          .sort((a, b) => a.grade.displayOrder - b.grade.displayOrder); // Sort items by displayOrder

        return {
          attribute: group.attribute,
          items
        };
      }).filter(group => group.items.length > 0);

    console.log('\n🎉 Final result summary (sorted by attribute ID and displayOrder):');
    result.forEach((group, index) => {
      console.log(`  ${index + 1}. Attribute ${group.attribute.id} (${group.attribute.code}): ${group.items.length} items`);
      group.items.forEach((item, itemIndex) => {
        console.log(`     ${itemIndex + 1}. [${item.grade.displayOrder}] ${item.grade.name} - ${item.variantId} (${item.selected ? 'SELECTED' : 'not selected'})`);
      });
    });
    
    return result;
  }
}
