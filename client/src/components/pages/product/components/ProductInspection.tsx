import React from 'react';
import { getProductInspectionData } from '../seed/temp-data-product';

const ProductInspection: React.FC = () => {
  const inspectionData = getProductInspectionData();

  return (
    <div className="md:py-6 w-full">
      <h2 className="text-[22px] mb-6 px-6 text-center font-semibold text-secondary">
        All devices are restored professionally based on a 25-point inspection
      </h2>
      <div className="relative w-full overflow-x-auto scrollbar-none gradient-mask-lr-10-90">
        <ul className="flex gap-6 overflow-x-auto px-6 py-1 scrollbar-none w-full max-w-none">
          {inspectionData.map((item) => (
            <li 
              key={item.id} 
              className="flex w-40 shrink-0 flex-col items-center gap-1 text-center p-2 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 group cursor-pointer"
            >
              <svg
                aria-hidden="true"
                fill="currentColor"
                height="24"
                viewBox={item.iconData.viewBox}
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                className="text-muted-foreground transition-all duration-300 ease-in-out group-hover:text-primary group-hover:scale-110"
              >
                {item.iconData.paths.map((path, index) => (
                  <path
                    key={index}
                    d={path.d}
                    fillRule={path.fillRule}
                    clipRule={path.clipRule}
                  />
                ))}
              </svg>
              <span className="text-muted-foreground transition-all duration-300 ease-in-out group-hover:text-foreground group-hover:font-medium">
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductInspection;
