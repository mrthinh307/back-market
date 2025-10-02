import React, { memo, useMemo } from 'react';
import { RelevantVariantGroup, ProductVariantDetail } from '@/types/product-selection.type';
import { LeftSideSelectionSection, RightSideSelectionSection } from './';

// Configuration type for attribute sections
type AttributeConfig = {
  title: string;
  gridColumns: 1 | 2;
  leftImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  showLeftImageDescriptions?: boolean;
  showExampleImageBadge?: boolean;
  leftCarouselImages?: string[];
  showBadge?: boolean;
  className?: string;
};

// Configuration for different selection types based on attribute codes
const getAttributeSectionConfig = (
  attributeCode: string,
  attributeName: string,
  productVariant: ProductVariantDetail
): AttributeConfig => {
  const baseConfigs: Record<string, AttributeConfig> = {
    GRADES: {
      title: 'Select the condition',
      leftImage: {
        src: 'https://product-page.statics.backmarket.com/images/pickers/models/iphone_13_grade_11_body.png',
        alt: 'Product condition',
        width: 498,
        height: 498,
      },
      showLeftImageDescriptions: true,
      showExampleImageBadge: true,
      gridColumns: 2,
      showBadge: true,
      className: 'md:py-6',
    },
    BATTERY: {
      title: 'Choose a battery option',
      leftImage: {
        src: 'https://www.backmarket.de/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://front-office.statics.backmarket.com/7ccc56c52347115f382912877b19318a77c9ac9c/img/product/funnel/smartphone/step-battery.jpg',
        alt: 'Battery health',
        width: 498,
        height: 498,
      },
      gridColumns: 1,
    },
    STORAGE: {
      title: 'Select storage',
      leftImage: {
        src: 'https://front-office.statics.backmarket.com/9c0fed50e64a2e15e6b5469ecfd36c97597d1517/img/product/funnel/desktop/smartphone/step-storage.jpg',
        alt: 'Storage selection',
        width: 498,
        height: 498,
      },
      gridColumns: 1,
    },
    COLOR: {
      title: 'Select the color',
      leftCarouselImages: productVariant.images?.map((img) => img.imageUrl) || [],
      gridColumns: 2,
    },
    DUAL_SIM: {
      title: 'Choose your type of SIM card',
      leftImage: {
        src: 'https://www.backmarket.de/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://front-office.statics.backmarket.com/7ccc56c52347115f382912877b19318a77c9ac9c/img/product/funnel/smartphone/step-sim.jpg',
        alt: 'SIM type',
        width: 498,
        height: 498,
      },
      gridColumns: 1,
    },
  };

  return baseConfigs[attributeCode] || {
    title: attributeName,
    gridColumns: 1 as const,
  };
};

// Universal Selection Component - optimized with memo and useMemo
const AttributeSelection: React.FC<{
  attributeGroup: RelevantVariantGroup;
  productVariant: ProductVariantDetail;
}> = memo(({ attributeGroup, productVariant }) => {
  // Memoize config để tránh re-calculate mỗi render
  const config = useMemo(() => {
    return getAttributeSectionConfig(
      attributeGroup.attribute.code,
      attributeGroup.attribute.name,
      productVariant
    );
  }, [attributeGroup.attribute.code, attributeGroup.attribute.name, productVariant]);

  // Memoize options array để tránh re-create mỗi render
  const options = useMemo(() => 
    attributeGroup.items.map((item) => ({
      id: item.variantId,
      name: item.grade.name,
      price: item.priceWithCurrency,
      isGoodDeal: false,
    })), 
    [attributeGroup.items]
  );

  // Memoize selectedOption để tránh re-calculate
  const selectedOption = useMemo(() => 
    attributeGroup.items.find((item) => item.selected)?.variantId || '',
    [attributeGroup.items]
  );

  return (
    <div className={`py-8 ${config.className}`}>
      {/* Title - Always at the top */}
      <div className='mb-4 md:hidden'>
        <h2 className='text-2xl font-heading font-semibold text-foreground'>
          <span>{config.title}</span>
        </h2>
      </div>

      <div className='flex flex-col md:flex-row md:justify-center md:items-center'>
        {/* Left side - Image or custom content */}
        <LeftSideSelectionSection
          leftImage={config.leftImage}
          leftCarouselImages={config.leftCarouselImages}
          showLeftImageDescriptions={config.showLeftImageDescriptions}
          showExampleImageBadge={config.showExampleImageBadge}
        />

        {/* Right side - Selection */}
        <RightSideSelectionSection
          title={config.title}
          options={options}
          selectedOption={selectedOption}
          gridColumns={config.gridColumns}
          showBadge={config.showBadge}
        />
      </div>
    </div>
  );
});

export default AttributeSelection;
