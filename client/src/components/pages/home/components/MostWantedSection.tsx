import CategoryCard from '@/components/cards/CategoryCard';
import { CategoryCardProps } from '@/types/cards.type';

function MostWantedSection() {
  const mostWantedCategories: Array<CategoryCardProps> = [
    {
      image:
        'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/1bRy70V8KNknn628bf14h8/7cb91c57d9b5019a7bbdea84e44f7ce6/Phone_HP_Category_Smartphone_desktop.jpg',
      name: 'iPhone',
    },
    {
      image:
        'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/jW258Um5YCpwOTHNgEokq/8107a6bda740c5f5f1775b3d20e4f519/Phone_HP_Category_Tablet_desktop.jpg',
      name: 'iPad',
    },
    {
      image:
        'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/5GjoGJCqWVngJRShjjG7a/b7d6c965d1a18230836a0c1a904364b4/HP_Category_Laptop_desktop.jpg',
      name: 'MacBook',
    },
    {
      image:
        'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/1W08wc0KJB4db2rXsJyP1P/d33003dff519479cf666caf3cef79fdd/Phone_HP_Category_Watch_desktop__2_.jpg',
      name: 'Smartwatches',
    },
    {
      image:
        'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/1kHjYTtX4lFsNMLAybrL15/c029e8d64b9bc9c00bc8480a162d674d/Modular_bloc_-_Samsung_-_Desktop.jpg',
      name: 'Android Smartphones',
    },
    {
      image:
        'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/5hkcYLitLSwmhC6mC9UkYI/79127a29f263eb383967f6147fe803dc/Copy_of_most-wanted--all-laptops--desktop.webp',
      name: 'Windows Laptops',
    },
    {
      image:
        'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/2EN51erORsZuV5a2DkicAI/c3f3fdd8d0a53fb95364d638333b4950/-WIP-_Universe_Page_-_Airpods.png',
      name: 'AirPods',
    },
    {
      image:
        'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/6NskjJVCrZH1ZbtUNVq8BT/2f2ce83d7d5ff35943f04105e97cc3f6/Deals_-_Desktop.jpg',
      name: 'Good deals',
    },
  ];

  return (
    <section className='container mb-14'>
      <div className='w-full flex items-center mb-4'>
        <h2 className='font-semibold text-[22px]'>Shop our most wanted</h2>
      </div>
      <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-3'>
        {/* Category Cards */}
        {mostWantedCategories.map((category, index) => (
          <div key={`${category.name}-${index}`} className='col-span-1 flex'>
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default MostWantedSection;
