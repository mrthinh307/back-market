import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getRelevantVariants } from '@/api/product-variant.api';
import { USE_QUERY_KEY } from '@/constants/use-query-key';
import {
  RelevantVariantGroup,
  ProductVariantDetail,
} from '@/types/product-selection.type';
import { AttributeSelection, SkeletonSection } from './';
import { useSectionTracking } from '@/hooks/useSectionTracking';
import GlobalErrorComponent from '../../GlobalErrorComponent';

// Main component - ultra simple with Link navigation
const SelectVariantSection: React.FC<{
  productVariant: ProductVariantDetail;
  onProgressChange?: (
    currentSection: number,
    totalSections: number,
    progressPercentage: number,
  ) => void;
}> = ({ productVariant, onProgressChange }) => {
  // Extract data from productVariant
  const { productId, defaultVariantId } = useMemo(
    () => ({
      productId: productVariant.product.id,
      defaultVariantId: productVariant.id,
    }),
    [productVariant.product.id, productVariant.id],
  );

  // Fetch relevant variants data from API
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: USE_QUERY_KEY.PRODUCT_VARIANT_RELEVANTS(
      productId,
      defaultVariantId,
    ),
    queryFn: () => getRelevantVariants(productId, defaultVariantId),
    enabled: !!productId && !!defaultVariantId,
  });

  const relevantVariantsData: RelevantVariantGroup[] = useMemo(
    () => data?.relevantVariants || [],
    [data?.relevantVariants],
  );

  // Calculate available sections (excluding sections with <= 1 option)
  const availableSections = useMemo(
    () => relevantVariantsData.filter((group) => group.items.length > 1),
    [relevantVariantsData],
  );

  // Setup section tracking
  const { containerRef, registerSection } = useSectionTracking({
    sectionCount: availableSections.length,
    trackingEnabled: availableSections.length > 0,
    onProgressChange,
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className='flex justify-center'>
        <div className='w-full mb-7 md:space-y-6'>
          <SkeletonSection />
          <SkeletonSection />
          <SkeletonSection />
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <GlobalErrorComponent
        statusCode={error.name || '400'}
        title='Some variants are taking a nap :))'
        message={
          error.message ||
          `If you’re here, it might be because of a error in fetching relevant variants. Please try again later.`
        }
        buttonText='Try again'
        onButtonClick={() => {
          refetch();
        }}
      />
    );
  }

  return (
    <div className='flex justify-center'>
      {relevantVariantsData.length > 0 && (
        <div ref={containerRef} className='w-full mb-7 md:space-y-6'>
          {availableSections.map(
            (attributeGroup: RelevantVariantGroup, index: number) => {
              const attributeCode = attributeGroup.attribute.code;
              return (
                <div
                  key={attributeCode}
                  ref={(el) => registerSection(el, index)}
                >
                  <AttributeSelection
                    attributeGroup={attributeGroup}
                    productVariant={productVariant}
                  />
                </div>
              );
            },
          )}
        </div>
      )}
    </div>
  );
};

export default SelectVariantSection;
