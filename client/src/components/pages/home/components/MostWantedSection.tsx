'use client';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

import CategoryCard from '@/components/cards/CategoryCard';
import { CategoryCardProps } from '@/types/cards.type';
import { CATEGORIES_DATA } from '@/components/pages/product-list/data/categories';

function MostWantedSection() {
  const router = useRouter();

  const locale = useLocale();

  const handleCategoryCardClick = (api: CategoryCardProps['api']) => {
    if (!api) {
      return;
    }

    // Build search params correctly
    const searchParams = new URLSearchParams();
    searchParams.append('categoryId', api.categoryId);

    if (api.brandId) {
      searchParams.append('brandId', api.brandId);
    }

    if (api.isExcludedBrand !== undefined) {
      searchParams.append('isExcludedBrand', api.isExcludedBrand.toString());
    }

    // Navigate to specific category page
    router.push(`/${locale}/list?${searchParams.toString()}`);
  };

  return (
    <section className='container mb-14'>
      <div className='w-full flex items-center mb-4'>
        <h2 className='font-semibold text-[22px]'>Shop our most wanted</h2>
      </div>
      <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-3'>
        {/* Category Cards */}
        {CATEGORIES_DATA.map((category, index) => (
          <div
            key={`${category.name}-${index}`}
            className='col-span-1 flex'
            onClick={() => handleCategoryCardClick(category.api)}
          >
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default MostWantedSection;
