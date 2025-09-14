import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getRelevantVariants } from '@/api/product-variant.api';
import ErrorState from '@/components/ui/ErrorState';
import {
  RelevantVariantGroup,
  ProductVariantDetail,
} from '@/types/product-selection.type';
import { AttributeSelection, SkeletonSection } from './';

// Main component - ultra simple with Link navigation
const SelectVariantSection: React.FC<{
  productVariant: ProductVariantDetail;
}> = ({ productVariant }) => {
  // Extract data from productVariant
  const { productId, defaultVariantId } = useMemo(() => ({
    productId: productVariant.product.id,
    defaultVariantId: productVariant.id,
  }), [productVariant.product.id, productVariant.id]);

  // Fetch relevant variants data from API
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['relevant-variants', productId, defaultVariantId],
    queryFn: () => getRelevantVariants(productId, defaultVariantId),
    enabled: !!productId && !!defaultVariantId,
  });

  const relevantVariantsData: RelevantVariantGroup[] = useMemo(() => 
    data?.relevantVariants || [], 
    [data?.relevantVariants]
  );

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
      <ErrorState
        message={
          error.message || 'Error loading variant options. Please try again.'
        }
        reset={refetch}
      />
    );
  }

  return (
    <div className='flex justify-center'>
      {relevantVariantsData.length > 0 && (
        <div className='w-full mb-7 md:space-y-6'>
          {relevantVariantsData.map((attributeGroup: RelevantVariantGroup) => {
            if (attributeGroup.items.length <= 1) return null; // Skip if only one or no option
            const attributeCode = attributeGroup.attribute.code;
            return (
              <AttributeSelection
                key={attributeCode}
                attributeGroup={attributeGroup}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectVariantSection;
