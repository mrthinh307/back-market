import { CategoryCardProps } from '@/types/cards.type';

export const CATEGORIES_DATA: Array<CategoryCardProps> = [
  {
    image:
      'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/1bRy70V8KNknn628bf14h8/7cb91c57d9b5019a7bbdea84e44f7ce6/Phone_HP_Category_Smartphone_desktop.jpg',
    name: 'iPhone',
    api: {
      categoryId: '50',
      brandId: '49094ceb-1020-4009-9a16-dc22e5fa1525',
      pageTitle: 'Refurbished Apple iPhones',
      pageSubtitle:
        'Buy a certified refurbished iPhone for less for the same quality as new. Browse our huge selection of affordable iPhone deals to choose from.',
      seoTitle: 'Cheap Refurbished iPhones | Back Market',
      seoDescription:
        'Discover our refurbished products at unbeatable prices. Shop now and save big on quality electronics! Buy Cheap Refurbished iPhones today!',
    },
  },
  {
    image:
      'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/jW258Um5YCpwOTHNgEokq/8107a6bda740c5f5f1775b3d20e4f519/Phone_HP_Category_Tablet_desktop.jpg',
    name: 'iPad',
    api: {
      categoryId: '36',
      pageTitle: 'Refurbished Apple iPads',
      pageSubtitle:
        'Explore our collection of cheap refurbished iPad deals and buy one at a fraction of the price when compared to brand new. For ultimate portability and a myriad of functional benefits, the Apple iPad is everything you need at your fingertips.',
      seoTitle: 'Cheap Refurbished iPads | Back Market',
      seoDescription:
        'Discover our refurbished products at unbeatable prices. Shop now and save big on quality electronics! Buy Cheap Refurbished iPads today!',
    },
  },
  {
    image:
      'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/5GjoGJCqWVngJRShjjG7a/b7d6c965d1a18230836a0c1a904364b4/HP_Category_Laptop_desktop.jpg',
    name: 'MacBook',
    api: {
      // TODO: Merge categories for MacBook and Macbook M1,...
      // FIXME: categoryId: [39, 40, 41, 42] => categoryId: '41',
      categoryId: '41',
      pageTitle: 'Refurbished Apple MacBooks',
      pageSubtitle:
        'Discover our range of cheap refurbished MacBooks and get a great deal on a high-quality laptop. All our MacBooks are tested and certified to work like new, so you can shop with confidence.',
      seoTitle: 'Cheap Refurbished MacBooks | Back Market',
      seoDescription:
        'Discover our refurbished products at unbeatable prices. Shop now and save big on quality electronics! Buy Cheap Refurbished MacBooks today!',
    },
  },
  {
    image:
      'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/1W08wc0KJB4db2rXsJyP1P/d33003dff519479cf666caf3cef79fdd/Phone_HP_Category_Watch_desktop__2_.jpg',
    name: 'Smartwatches',
    api: {
      categoryId: '17',
      pageTitle: 'Refurbished Smartwatches',
      pageSubtitle:
        'Buy a certified refurbished smartwatch for less for the same quality as new.',
      seoTitle: 'Cheap Refurbished Smartwatches | Back Market',
      seoDescription:
        'Discover our refurbished products at unbeatable prices. Shop now and save big on quality electronics! Buy Cheap Refurbished Smartwatches today!',
    },
  },
  {
    image:
      'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/1kHjYTtX4lFsNMLAybrL15/c029e8d64b9bc9c00bc8480a162d674d/Modular_bloc_-_Samsung_-_Desktop.jpg',
    name: 'Android Smartphones',
    api: {
      categoryId: '50',
      isExcludedBrand: true,
      brandId: '49094ceb-1020-4009-9a16-dc22e5fa1525', // Exclude Apple
      pageTitle: 'Refurbished Android Smartphones',
      pageSubtitle:
        'Buy a certified refurbished Android smartphone for less for the same quality as new.',
      seoTitle: 'Cheap Refurbished Android Smartphones | Back Market',
      seoDescription:
        'Discover our refurbished products at unbeatable prices. Shop now and save big on quality electronics! Buy Cheap Refurbished Android Smartphones today!',
    },
  },
  {
    image:
      'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/5hkcYLitLSwmhC6mC9UkYI/79127a29f263eb383967f6147fe803dc/Copy_of_most-wanted--all-laptops--desktop.webp',
    name: 'Windows Laptops',
    api: {
      categoryId: '43',
      pageTitle: 'Refurbished Windows Laptops',
      pageSubtitle:
        'Discover our range of cheap refurbished Windows laptops and get a great deal on a high-quality laptop. All our Windows laptops are tested and certified to work like new, so you can shop with confidence.',
      seoTitle: 'Cheap Refurbished Windows Laptops | Back Market',
      seoDescription:
        'Discover our refurbished products at unbeatable prices. Shop now and save big on quality electronics! Buy Cheap Refurbished Windows Laptops today!',
    },
  },
  {
    image:
      'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/2EN51erORsZuV5a2DkicAI/c3f3fdd8d0a53fb95364d638333b4950/-WIP-_Universe_Page_-_Airpods.png',
    name: 'AirPods',
    api: {
      categoryId: '25',
      pageTitle: 'Refurbished Apple AirPods',
      pageSubtitle:
        'Explore our collection of cheap refurbished AirPods and buy a pair at a fraction of the price when compared to brand new. For ultimate portability and a myriad of functional benefits, Apple AirPods are everything you need at your fingertips.',
      seoTitle: 'Cheap Refurbished AirPods | Back Market',
      seoDescription:
        'Discover our refurbished products at unbeatable prices. Shop now and save big on quality electronics! Buy Cheap Refurbished AirPods today!',
    },
  },
  {
    image:
      'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/6NskjJVCrZH1ZbtUNVq8BT/2f2ce83d7d5ff35943f04105e97cc3f6/Deals_-_Desktop.jpg',
    name: 'Good deals',
    api: {
      // TODO: Create a specific category for "Good deals"?
      categoryId: '0',
      pageTitle: 'Refurbished Products on Sale',
      pageSubtitle:
        'Discover our range of refurbished products on sale and get a great deal on high-quality electronics. All our products are tested and certified to work like new, so you can shop with confidence.',
      seoTitle: 'Refurbished Products on Sale | Back Market',
      seoDescription:
        'Discover our refurbished products at unbeatable prices. Shop now and save big on quality electronics! Buy Refurbished Products on Sale today!',
    },
  },
];

// Helper function to find category metadata by parameters
export function getCategoryMetadata(params: {
  categoryId: string;
  brandId?: string;
  isExcludedBrand?: boolean;
}) {
  const category = CATEGORIES_DATA.find((cat) => {
    if (!cat.api) return false;
    
    const { categoryId, brandId, isExcludedBrand } = params;
    const api = cat.api;
    
    // Match categoryId
    if (api.categoryId !== categoryId) return false;
    
    // Match brandId if provided
    if (brandId && api.brandId !== brandId) return false;
    
    // Match isExcludedBrand if provided
    if (isExcludedBrand && api.isExcludedBrand !== isExcludedBrand) return false;
    
    return true;
  });

  if (category?.api) {
    return {
      pageTitle: category.api.pageTitle,
      pageSubtitle: category.api.pageSubtitle,
      seoTitle: category.api.seoTitle,
      seoDescription: category.api.seoDescription,
    };
  }

  // Default fallback
  return {
    pageTitle: 'Refurbished Electronics',
    pageSubtitle: 'Discover our range of refurbished electronics and get a great deal on high-quality products.',
    seoTitle: 'Refurbished Electronics | Back Market',
    seoDescription: 'Discover our refurbished products at unbeatable prices. Shop now and save big on quality electronics!',
  };
}