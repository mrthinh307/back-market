import React from 'react';
import Image from 'next/image';
import { ProductSelectionProps } from '@/types/product-selection.type';

// Icons components
const CheckIcon = () => (
  <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.03 9.53a.75.75 0 0 0-1.06-1.06l-5.47 5.47-2.47-2.47a.75.75 0 0 0-1.06 1.06l2.646 2.647a1.25 1.25 0 0 0 1.768 0L17.03 9.53" />
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25M3.75 12a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0"
      clipRule="evenodd"
    />
  </svg>
);

const StarIcon = () => (
  <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="m10.749 5.972-2.812 6.325A.5.5 0 0 0 8.394 13h2.231L9.93 17.864c-.05.345.43.483.571.165l2.812-6.326A.5.5 0 0 0 12.856 11h-2.231l.695-4.864c.05-.345-.43-.483-.571-.164" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      d="m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12"
      clipRule="evenodd"
    />
  </svg>
);

const ProductSelection: React.FC<ProductSelectionProps> = ({
  title,
  options,
  selectedOption,
  onSelectionChange,
  leftImage,
  leftContent,
  showInfoButton = false,
  infoButtonText,
  infoButtonIcon,
  gridColumns = 2,
  customOptionRenderer,
}) => {
  const defaultOptionRenderer = (option: any, isSelected: boolean) => (
    <button
      aria-checked={isSelected}
      aria-disabled="false"
      className={`focus:outline-none rounded-sm relative flex size-full flex-col border py-3 no-underline ${
        isSelected
          ? 'bg-pink-50 border-black hover:bg-pink-100'
          : 'bg-white border-black hover:bg-gray-200'
      }`}
      role="radio"
      type="button"
      onClick={() => onSelectionChange(option.id)}
    >
      <div className="m-auto flex w-full flex-row items-center pl-2 pr-4">
        <div className="shrink-0">
          <div className="flex size-6 items-center justify-center">
            {option.color ? (
              <div
                className="border border-gray-300 rounded-md m-2 size-4"
                style={{ backgroundColor: option.color }}
              />
            ) : (
              <div
                className={`rounded-full border ${
                  isSelected
                    ? 'bg-black border-black'
                    : 'bg-transparent border-black'
                }`}
                style={{
                  width: option.id === 'premium' ? '16px' : '12px',
                  height: option.id === 'premium' ? '16px' : '12px',
                }}
              />
            )}
          </div>
        </div>
        <div className="ml-4 flex grow flex-col">
          <div className="flex grow flex-nowrap items-start text-left flex-col">
            <span
              className={`mr-2 min-w-[100px] grow font-duplet ${
                isSelected
                  ? 'text-black font-semibold'
                  : 'text-gray-900 font-normal'
              }`}
            >
              {option.name}
            </span>
            <span
              className={`text-sm flex shrink-0 items-center gap-1 font-duplet ${
                option.isGoodDeal
                  ? 'text-green-600'
                  : 'text-gray-600'
              }`}
            >
              {option.isGoodDeal && (
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.166 5.106a.75.75 0 1 0-1.06 1.06l11.447 11.448h-5.26a.75.75 0 1 0 0 1.5h6.57a1.25 1.25 0 0 0 1.25-1.25v-6.571a.75.75 0 0 0-1.5 0v5.26L6.167 5.106" />
                </svg>
              )}
              {option.price}
            </span>
          </div>
        </div>
      </div>
    </button>
  );

  return (
    <div className="py-2 md:py-6 px-12">
      <div className="md:flex md:justify-center md:items-center">
        {/* Left side - Image or custom content */}
        {(leftImage || leftContent) && (
          <div className="max-w-full md:relative md:mr-4 md:min-w-[337px] md:max-w-[498px] md:grow lg:mr-8 hidden md:block">
            <div className="flex w-full flex-col justify-center opacity-100 transition-opacity duration-500 ease-out">
              {leftImage && (
                <div className="relative mx-auto mb-4 max-w-[498px] md:mb-0 md:block md:w-full md:min-w-[337px]">
                  <div className="relative -mb-4 flex min-h-72 flex-col flex-wrap overflow-hidden w-full pb-4">
                    <div className="relative flex w-full grow justify-center">
                      <div className="rounded-lg relative flex w-full md:rounded-[32px]">
                        <Image
                          src={leftImage.src}
                          alt={leftImage.alt}
                          width={leftImage.width}
                          height={leftImage.height}
                          className="rounded-lg h-auto w-full max-h-[498px] md:min-w-[337px] md:max-w-[498px] md:rounded-[32px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {leftContent}
            </div>
          </div>
        )}

        {/* Right side - Selection */}
        <div className="w-full md:w-1/2 md:shrink-0 p-8">
          <div className="opacity-100 transition-opacity duration-500 ease-out">
            <fieldset role="radiogroup">
              <legend className="mb-3 flex items-baseline justify-between">
                <h2 className="text-2xl font-duplet font-semibold">
                  <span>{title}</span>
                </h2>
                <button className="text-blue-600 relative bottom-2 block pl-3 md:hidden text-sm font-duplet font-medium cursor-pointer hover:text-blue-700 underline">
                  Compare
                </button>
              </legend>
              <div>
                <p className="text-sm mb-4 block md:hidden -mt-4 font-duplet">
                  All guaranteed 100% functional
                </p>
              </div>

              {/* Info button */}
              {showInfoButton && (
                <button className="shadow-md rounded-lg relative no-underline transition duration-200 ease-in bg-blue-50 focus:outline-none cursor-pointer hover:bg-blue-100 hover:shadow-lg mb-6 flex min-h-[72px] w-full flex-row items-center gap-3 px-4 py-3 md:flex">
                  {infoButtonIcon}
                  <div className="text-sm flex-1 text-left font-duplet">
                    <p className="mb-0">{infoButtonText}</p>
                  </div>
                  <ArrowRightIcon />
                </button>
              )}

              {/* Options */}
              <ul className={`list-none grid gap-x-3 gap-y-3 ${
                gridColumns === 2 ? 'grid-cols-2' : 'gap-y-3'
              }`}>
                {options.map((option) => (
                  <li key={option.id}>
                    {customOptionRenderer 
                      ? customOptionRenderer(option, selectedOption === option.id)
                      : defaultOptionRenderer(option, selectedOption === option.id)
                    }
                  </li>
                ))}
              </ul>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSelection;
