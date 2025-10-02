import React from 'react';
import { getProductFeatures } from '../../product/seed/temp-data-product';
import FeatureIcon from '../../product/components/FeatureIcon';
import { FeatureItem } from '../../product/components/ProductFeatures';

const CartPerksSection: React.FC<{ className?: string }> = ({ className = '' }) => {
  const perks: FeatureItem[] = getProductFeatures('cart-perks').map((feature) => ({
    id: feature.id,
    title: feature.title,
    description: feature.description,
    icon: <FeatureIcon iconType={feature.iconType} />,
    onClick: feature.onClick,
  }));

  return (
    <div className={`w-full ${className}`}>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Your perks with every purchase:
      </h3>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6 w-full">
        <div className="grid grid-cols-2 gap-6">
          {perks.map((perk) => {
            const Component = perk.onClick ? 'button' : 'div';
            const isUnderlined = perk.id === 'warranty' || perk.id === 'returns';

            return (
              <Component
                key={perk.id}
                className="flex items-center gap-3"
                onClick={perk.onClick}
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {perk.icon}
                </div>
                <span 
                  className={`text-sm font-medium text-black ${
                    isUnderlined ? 'underline' : ''
                  }`}
                >
                  {perk.title}
                </span>
              </Component>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CartPerksSection;

