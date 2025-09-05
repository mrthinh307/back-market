import React, { useState } from 'react';
import Image from 'next/image';
import { SelectionOption } from '@/types/product-selection.type';

// Icons components
const ArrowRightIcon = () => (
  <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
    <path
      fillRule='evenodd'
      d='m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12'
      clipRule='evenodd'
    />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
    <path
      fillRule='evenodd'
      d='m10.957 12 3.47-3.47a.75.75 0 1 0-1.06-1.06L9.72 11.116a1.25 1.25 0 0 0 0 1.768l3.646 3.646a.75.75 0 0 0 1.06-1.06L10.958 12'
      clipRule='evenodd'
    />
  </svg>
);

interface ColorSelectionProps {
  title: string;
  options: SelectionOption[];
  selectedOption: string;
  onSelectionChange: (optionId: string) => void;
  productImages: string[];
}

const ColorSelection: React.FC<ColorSelectionProps> = ({
  title,
  options,
  selectedOption,
  onSelectionChange,
  productImages,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className='py-8 md:py-9 px-12'>
      <div className='md:flex md:justify-center md:items-center'>
        {/* Left side - Product gallery */}
        <div className='max-w-full md:relative md:mr-8 md:min-w-[337px] md:max-w-[498px] md:grow lg:mr-16 hidden md:block'>
          <div className='flex w-full flex-col justify-center opacity-100 transition-opacity duration-500 ease-out'>
            <div className='mb-4 w-full'>
              <div className='flex justify-center'>
                <div className='relative -mb-4 flex min-h-72 flex-col flex-wrap overflow-hidden mt-3 md:mt-8 md:grow'>
                  <div className='relative flex w-full grow justify-center'>
                    <div className='relative'>
                      <Image
                        src={
                          productImages[currentImageIndex] ||
                          productImages[0] ||
                          ''
                        }
                        alt='iPhone 13 128GB - Pink - Unlocked'
                        width={976}
                        height={976}
                        className='rounded-lg block !h-[66.7vw] max-h-full w-auto md:!h-auto md:w-full lg:w-[29.125rem]'
                        priority={currentImageIndex === 0}
                      />
                    </div>
                  </div>

                  {/* Image navigation */}
                  <div className='relative isolate mx-auto flex w-full justify-center pt-3 h-15'>
                    <div className='flex items-center px-2 py-1'>
                      <button
                        className='rounded-full flex shrink-0 cursor-pointer appearance-none items-center justify-center border-0 no-underline disabled:cursor-not-allowed transition duration-300 ease-in size-8 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400'
                        type='button'
                        onClick={() =>
                          setCurrentImageIndex(
                            Math.max(0, currentImageIndex - 1),
                          )
                        }
                        disabled={currentImageIndex === 0}
                      >
                        <ArrowLeftIcon />
                      </button>
                    </div>
                    <div>
                      <ul className='flex list-none flex-row gap-2 overflow-hidden py-1 justify-center'>
                        {productImages.map((_, index) => (
                          <li key={index} className='flex'>
                            <button
                              aria-current={currentImageIndex === index}
                              aria-label={`Controller ${index + 1}`}
                              className='flex focus:outline-none rounded-sm size-10'
                              type='button'
                              onClick={() => setCurrentImageIndex(index)}
                            >
                              <div
                                className={`appearance-none overflow-hidden no-underline transition-colors rounded-sm flex size-10 justify-center border border-solid ${
                                  currentImageIndex === index
                                    ? 'bg-blue-600 border-blue-600'
                                    : 'bg-gray-200 border-gray-300'
                                }`}
                              >
                                <Image
                                  src={
                                    productImages[index] ||
                                    productImages[0] ||
                                    ''
                                  }
                                  alt={`Product image ${index + 1}`}
                                  width={40}
                                  height={40}
                                  className='!h-10 object-cover'
                                />
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className='flex items-center px-2 py-1'>
                      <button
                        className='rounded-full flex shrink-0 cursor-pointer appearance-none items-center justify-center border-0 no-underline disabled:cursor-not-allowed transition duration-300 ease-in size-8 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400'
                        type='button'
                        onClick={() =>
                          setCurrentImageIndex(
                            Math.min(
                              productImages.length - 1,
                              currentImageIndex + 1,
                            ),
                          )
                        }
                        disabled={
                          currentImageIndex === productImages.length - 1
                        }
                      >
                        <ArrowRightIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Color selection */}
        <div className='md:shrink-0 w-1/2 p-8'>
          <div className='opacity-100 transition-opacity duration-500 ease-out'>
            <fieldset role='radiogroup'>
              <legend className='mb-3 flex items-baseline justify-between'>
                <h2 className='text-3xl font-heading font-semibold'>
                  <span>{title}</span>
                </h2>
              </legend>

              <ul className='list-none grid grid-cols-2 gap-x-3 gap-y-3'>
                {options.map((option) => (
                  <li key={option.id}>
                    <button
                      aria-checked={selectedOption === option.id}
                      aria-disabled='false'
                      className={`focus:outline-none rounded-sm relative flex size-full flex-col border py-3 no-underline ${
                        selectedOption === option.id
                          ? 'bg-pink-50 border-black hover:bg-pink-100'
                          : 'bg-white border-black hover:bg-gray-200'
                      }`}
                      role='radio'
                      type='button'
                      onClick={() => onSelectionChange(option.id)}
                    >
                      <div className='m-auto flex w-full flex-row items-center pl-2 pr-4'>
                        <div className='shrink-0'>
                          <div
                            className='border border-gray-300 rounded-md m-2 size-4'
                            style={{ backgroundColor: option.color }}
                          />
                        </div>
                        <div className='ml-4 flex grow flex-col'>
                          <div className='flex grow flex-nowrap items-start text-left flex-col'>
                            <span
                              className={`mr-2 min-w-[100px] grow font-duplet ${
                                selectedOption === option.id
                                  ? 'text-black font-semibold'
                                  : 'text-gray-900 font-normal'
                              }`}
                            >
                              {option.name}
                            </span>
                            <span className='text-sm flex shrink-0 items-center gap-1 text-gray-600 font-duplet'>
                              {option.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
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

export default ColorSelection;
