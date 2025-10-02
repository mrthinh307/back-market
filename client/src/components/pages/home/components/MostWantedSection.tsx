'use client';
import CategoryCard from '@/components/cards/CategoryCard';
import { CategoryCardProps } from '@/types/cards.type';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

function MostWantedSection() {
  const router = useRouter();
  
  const mostWantedCategories: Array<CategoryCardProps> = useMemo(() => [
    {
      image:
        'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/1bRy70V8KNknn628bf14h8/7cb91c57d9b5019a7bbdea84e44f7ce6/Phone_HP_Category_Smartphone_desktop.jpg',
      name: 'iPhone',
      api: {
        categoryId: '50',
        brandId: '49094ceb-1020-4009-9a16-dc22e5fa1525'
      }
    },
    {
      image:
        'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/jW258Um5YCpwOTHNgEokq/8107a6bda740c5f5f1775b3d20e4f519/Phone_HP_Category_Tablet_desktop.jpg',
      name: 'iPad',
      api: {
        categoryId: '36',
      }
    },
    {
      image:
        'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/5GjoGJCqWVngJRShjjG7a/b7d6c965d1a18230836a0c1a904364b4/HP_Category_Laptop_desktop.jpg',
      name: 'MacBook',
      api: {
        //TODO: Merge categories for MacBook and Macbook M1,...
        //FIXME: categoryId: [39, 40, 41, 42] => categoryId: '41',
        categoryId: '41',
      }
    },
    {
      image:
        'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/1W08wc0KJB4db2rXsJyP1P/d33003dff519479cf666caf3cef79fdd/Phone_HP_Category_Watch_desktop__2_.jpg',
      name: 'Smartwatches',
      api: {
        categoryId: '17',
      }
    },
    {
      image:
        'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/1kHjYTtX4lFsNMLAybrL15/c029e8d64b9bc9c00bc8480a162d674d/Modular_bloc_-_Samsung_-_Desktop.jpg',
      name: 'Android Smartphones',
      api: {
        categoryId: '50',
        isExcludedBrand: true,
        brandId: '49094ceb-1020-4009-9a16-dc22e5fa1525' // Exclude Apple
      }
    },
    {
      image:
        'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/5hkcYLitLSwmhC6mC9UkYI/79127a29f263eb383967f6147fe803dc/Copy_of_most-wanted--all-laptops--desktop.webp',
      name: 'Windows Laptops',
      api: {
        categoryId: '43',
      }
    },
    {
      image:
        'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/2EN51erORsZuV5a2DkicAI/c3f3fdd8d0a53fb95364d638333b4950/-WIP-_Universe_Page_-_Airpods.png',
      name: 'AirPods',
      api: {
        categoryId: '25',
      }
    },
    {
      image:
        'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/6NskjJVCrZH1ZbtUNVq8BT/2f2ce83d7d5ff35943f04105e97cc3f6/Deals_-_Desktop.jpg',
      name: 'Good deals',
    },
  ], []);

  const locale = useLocale();

  const handleCategoryCardClick = (api: CategoryCardProps['api']) => {
    if (!api) {
      // Navigate to general products page if no specific API parameters
      router.push('/list');
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
        {mostWantedCategories.map((category, index) => (
          <div key={`${category.name}-${index}`} className='col-span-1 flex' onClick={() => handleCategoryCardClick(category.api)}>
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default MostWantedSection;
