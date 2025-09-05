import React from 'react';
import { iconData } from '@/components/pages/product/seed/temp-data-product';

interface FeatureIconProps {
  iconType: keyof typeof iconData;
}

const FeatureIcon: React.FC<FeatureIconProps> = ({ iconType }) => {
  const icon = iconData[iconType];
  
  if (!icon) {
    return null;
  }

  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      height="24"
      viewBox={icon.viewBox}
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      className={icon.className}
    >
      {icon.paths.map((path, index) => (
        <path
          key={index}
          d={path.d}
          fillRule={path.fillRule}
          clipRule={path.clipRule}
        />
      ))}
    </svg>
  );
};

export default FeatureIcon;
