import React, { useState } from 'react';
import Image from 'next/image';
import ProductSelection from '@/components/product/ProductSelection';
import ColorSelection from '@/components/product/ColorSelection';
import ProductFeatures from '@/components/product/ProductFeatures';
import FeatureIcon from '@/components/product/FeatureIcon';
import { SelectionOption, FeatureItem } from '@/types/product-selection.type';
import {
  getTradeInFeatures,
  getProductConditionOptions,
  getStorageOptions,
  getColorOptions,
  getProductImages,
} from '../product/temp-data-product';

// Icons components
const CheckIcon = () => (
  <svg className='h-4 w-4 shrink-0' fill='currentColor' viewBox='0 0 24 24'>
    <path d='M17.03 9.53a.75.75 0 0 0-1.06-1.06l-5.47 5.47-2.47-2.47a.75.75 0 0 0-1.06 1.06l2.646 2.647a1.25 1.25 0 0 0 1.768 0L17.03 9.53' />
    <path
      fillRule='evenodd'
      d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25M3.75 12a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0'
      clipRule='evenodd'
    />
  </svg>
);

const StarIcon = () => (
  <svg className='h-4 w-4 shrink-0' fill='currentColor' viewBox='0 0 24 24'>
    <path d='m10.749 5.972-2.812 6.325A.5.5 0 0 0 8.394 13h2.231L9.93 17.864c-.05.345.43.483.571.165l2.812-6.326A.5.5 0 0 0 12.856 11h-2.231l.695-4.864c.05-.345-.43-.483-.571-.164' />
  </svg>
);

// Product condition component
const ProductCondition = () => {
  const [selectedCondition, setSelectedCondition] = useState('good');

  const conditions: SelectionOption[] = getProductConditionOptions();

  const infoButtonIcon = (
    <svg
      className='h-8 w-8 m-1 ml-0'
      fill='currentColor'
      viewBox='0 0 24 24'
      width={32}
    >
      <path
        fillRule='evenodd'
        d='M3.69 3h16.62a1.58 1.58 0 0 1 1.581 1.577v14.846A1.58 1.58 0 0 1 20.31 21H3.69a1.579 1.579 0 0 1-1.581-1.577V4.577A1.579 1.579 0 0 1 3.69 3m5.933 14.453h3.262a.1.1 0 0 0 .07-.17l-5.167-5.167a.166.166 0 0 1 0-.233l5.167-5.168a.1.1 0 0 0-.07-.17H9.623a.39.39 0 0 0-.277.116l-5.222 5.222a.166.166 0 0 0 0 .233l5.222 5.222a.39.39 0 0 0 .277.115m10.173-.17-5.168-5.167a.166.166 0 0 1 0-.234l5.168-5.168a.1.1 0 0 0-.071-.17h-3.262a.39.39 0 0 0-.277.116l-5.222 5.222a.166.166 0 0 0 0 .233l5.222 5.223a.39.39 0 0 0 .277.115h3.262a.1.1 0 0 0 .07-.17'
        clipRule='evenodd'
      />
    </svg>
  );

  const leftContent = (
    <div className='relative mx-auto mb-4 max-w-[498px] md:mb-0 md:block md:w-full md:min-w-[337px]'>
      <div className='relative -mb-4 flex min-h-72 flex-col flex-wrap overflow-hidden w-full pb-4'>
        <div className='relative flex w-full grow justify-center'>
          <div className='rounded-lg relative flex w-full md:rounded-[32px]'>
            <Image
              src='https://product-page.statics.backmarket.com/images/pickers/models/iphone_13_grade_11_body.png'
              alt='iPhone 13 Body'
              width={498}
              height={498}
              className='rounded-lg h-auto w-full max-h-[498px] md:min-w-[337px] md:max-w-[498px] md:rounded-[32px]'
            />
            <div className='caption bg-gray-100 absolute right-3 top-3 px-4'>
              <span className='font-duplet text-sm'>Example image</span>
            </div>
            <div className='rounded-b-lg absolute inset-x-0 bottom-0 flex flex-col p-4 md:flex-row md:flex-wrap md:items-center md:rounded-b-[32px] md:pb-6 md:pl-8 md:pt-12 bg-gradient-to-t from-black/80 to-transparent'>
              <p className='text-white text-xl mr-2 mt-2 font-duplet'>
                <span>Body</span>
              </p>
              <div className='flex grow flex-row flex-wrap'>
                <div className='bg-white rounded-full text-xs mr-2 mt-2 flex w-fit items-center p-1 pr-2 text-center'>
                  <CheckIcon />
                  <span className='ml-1 text-left font-duplet'>
                    Light signs of use
                  </span>
                </div>
                <div className='bg-white rounded-full text-xs mr-2 mt-2 flex w-fit items-center p-1 pr-2 text-center'>
                  <CheckIcon />
                  <span className='ml-1 text-left font-duplet'>
                    Verified parts
                  </span>
                </div>
                <div className='bg-white rounded-full text-xs mr-2 mt-2 flex w-fit items-center p-1 pr-2 text-center'>
                  <StarIcon />
                  <span className='ml-1 text-left font-duplet'>
                    Battery for daily use
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ProductSelection
      title='Select the condition'
      options={conditions}
      selectedOption={selectedCondition}
      onSelectionChange={setSelectedCondition}
      leftContent={leftContent}
      showInfoButton={true}
      infoButtonText='Refurbishers have restored devices to high quality based on a 25-point inspection. Compare conditions'
      infoButtonIcon={infoButtonIcon}
      gridColumns={2}
    />
  );
};

// Storage selection component
const StorageSelection = () => {
  const [selectedStorage, setSelectedStorage] = useState('128');

  const storageOptions: SelectionOption[] = getStorageOptions();

  return (
    <ProductSelection
      title='Select storage'
      options={storageOptions}
      selectedOption={selectedStorage}
      onSelectionChange={setSelectedStorage}
      leftImage={{
        src: 'https://front-office.statics.backmarket.com/9c0fed50e64a2e15e6b5469ecfd36c97597d1517/img/product/funnel/desktop/smartphone/step-storage.jpg',
        alt: 'Storage selection',
        width: 498,
        height: 498,
      }}
      gridColumns={1}
    />
  );
};

// Color selection component
const ColorSelectionComponent = () => {
  const [selectedColor, setSelectedColor] = useState('pink');

  const colors: SelectionOption[] = getColorOptions();
  const productImages = getProductImages();

  return (
    <ColorSelection
      title='Select the color'
      options={colors}
      selectedOption={selectedColor}
      onSelectionChange={setSelectedColor}
      productImages={productImages}
    />
  );
};

// Trade-in component
const TradeInSection = () => {
  const tradeInFeaturesData = getTradeInFeatures();

  // Transform data to FeatureItem format
  const tradeInFeatures: FeatureItem[] = tradeInFeaturesData.map((feature) => ({
    id: feature.id,
    title: feature.title,
    description: feature.description,
    icon: <FeatureIcon iconType={feature.iconType} />,
    onClick: feature.onClick,
  }));

  return (
    <div className='py-2 md:py-3 px-3'>
      <div className='md:flex md:justify-center md:items-center'>
        {/* Left side - Trade-in image */}
        <div className='max-w-full md:relative md:mr-8 md:min-w-[337px] md:max-w-[498px] md:grow lg:mr-16 hidden md:block'>
          <div className='flex w-full flex-col justify-center opacity-100 transition-opacity duration-500 ease-out'>
            <Image
              src='https://front-office.statics.backmarket.com/9c0fed50e64a2e15e6b5469ecfd36c97597d1517/img/product/funnel/step-trade-in-2.jpg'
              alt='Trade-in'
              width={498}
              height={498}
              className='rounded-lg block min-w-[337px] max-w-[498px] max-h-[498px] md:rounded-[32px]'
            />
          </div>
        </div>

        {/* Right side - Trade-in content */}
        <div className='md:shrink-0 w-1/2 p-12'>
          <div className='opacity-100 transition-opacity duration-500 ease-out'>
            <div className='flex flex-col'>
              <h2 className='font-heading text-3xl font-bold mb-4'>
                Get this for even less with Trade-in
              </h2>

              {/* Trade-in features */}
              <div className='mb-6'>
                <ProductFeatures
                  features={tradeInFeatures}
                  className='mb-0 mt-0'
                />
              </div>

              <ul className='list-none'>
                <li className='mb-3'>
                  <div>
                    <div className='relative mb-2'>
                      <div className='relative flex items-center'>
                        <div className='w-full relative'>
                          <input
                            type='text'
                            aria-label='Search your device'
                            className='peer rounded-sm relative w-full min-w-0 pl-3 transition-colors duration-200 bg-gray-100 hover:bg-gray-200 text-gray-900 h-12 border border-solid border-gray-300 focus:border-blue-500 focus:outline-none pr-12 font-duplet'
                            placeholder='Search your device'
                          />
                        </div>
                        <svg
                          className='text-gray-600 pointer-events-none absolute right-3 shrink-0 select-none h-5 w-5'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 2.25a7.75 7.75 0 1 0 4.924 13.735l5.546 5.545a.75.75 0 1 0 1.06-1.06l-5.545-5.546A7.75 7.75 0 0 0 10 2.25M3.75 10a6.25 6.25 0 1 1 12.5 0 6.25 6.25 0 0 1-12.5 0'
                            clipRule='evenodd'
                          />
                        </svg>
                      </div>
                    </div>
                    <span className='text-gray-600 text-sm font-duplet'>
                      e.g. iPhone 11, MacBook Air, Galaxy S21...
                    </span>
                  </div>
                </li>
                <li>
                  <button className='focus:outline-none rounded-sm relative flex size-full flex-col border py-3 no-underline bg-white border-gray-300 hover:bg-gray-50'>
                    <div className='m-auto flex w-full flex-row items-center pl-2 pr-4'>
                      <div className='ml-4 flex grow flex-col'>
                        <div className='flex grow flex-nowrap items-start text-left flex-row'>
                          <span className='mr-2 min-w-[100px] grow text-gray-900 font-duplet'>
                            No trade-in
                          </span>
                          <span className='text-sm flex shrink-0 items-center gap-1 text-gray-600 pt-3 font-duplet'></span>
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Verizon offer component
const VerizonOffer = () => {
  return (
    <div className='py-8 md:py-9 px-12'>
      <div className='flex flex-col md:flex md:flex-row md:justify-center md:items-center'>
        <div className='max-w-full md:relative md:mr-8 md:min-w-[337px] md:max-w-[498px] md:grow lg:mr-32 hidden md:block'>
          <div className='flex w-full flex-col justify-center opacity-100 transition-opacity duration-500 ease-out'>
            <div className='text-gray-900 text-3xl font-heading font-semibold flex grow flex-col items-end'>
              <span>Go unlimited for 20% less.</span>
            </div>
          </div>
        </div>
        <div className='md:shrink-0 w-fit'>
          <div className='opacity-100 transition-opacity duration-500 ease-out'>
            <div className='flex justify-center md:justify-start'>
              <div className='shadow-lg rounded-lg flex flex-col gap-4 bg-[#1800FF] px-6 pt-4 md:px-8 md:pt-8 w-full max-w-md '>
                <h2 className='text-white text-2xl font-duplet font-semibold md:hidden'>
                  Go unlimited for 20% less.
                </h2>
                <div className='text-white font-duplet'>
                  <span className='font-semibold text-sm md:text-base leading-relaxed'>
                    This phone comes with an offer for unlimited premium 5G data
                    on Verizon's network for $20/month for 2 years. That's a
                    total savings of $120 with no strings attached.
                  </span>
                  <p className='text-xs font-normal mt-2'>Terms apply</p>
                </div>
                <div>
                  <button className='rounded-sm relative w-full md:w-auto select-none no-underline inline-flex h-10 md:h-8 items-center justify-center px-4 md:px-3 transition duration-300 cursor-pointer bg-white text-black border-none hover:bg-gray-100 font-duplet font-medium'>
                    <span className='flex items-center'>
                      <span className='flex items-center space-x-2'>
                        <span className='text-sm font-semibold truncate'>
                          See plan details
                        </span>
                      </span>
                    </span>
                  </button>
                </div>
                <footer>
                  <div className='flex items-center justify-end gap-5 md:hidden'>
                    <Image
                      src='https://front-office.statics.backmarket.com/9c0fed50e64a2e15e6b5469ecfd36c97597d1517/img/visible-by-verizon/character-cropped.png'
                      alt=''
                      width={100}
                      height={95}
                      className='h-auto max-h-full max-w-full'
                    />
                    <Image
                      src='https://front-office.statics.backmarket.com/9c0fed50e64a2e15e6b5469ecfd36c97597d1517/img/visible-by-verizon/logo-two-lines.svg'
                      alt='Visible partnered with Back Market'
                      width={129}
                      height={58}
                      className='md:hidden h-auto max-h-full max-w-full'
                    />
                  </div>
                  <div className='hidden items-center justify-between md:flex'>
                    <Image
                      src='https://front-office.statics.backmarket.com/9c0fed50e64a2e15e6b5469ecfd36c97597d1517/img/visible-by-verizon/character.png'
                      alt=''
                      width={98}
                      height={94}
                      className='h-auto max-h-full max-w-full'
                    />
                    <Image
                      src='https://front-office.statics.backmarket.com/9c0fed50e64a2e15e6b5469ecfd36c97597d1517/img/visible-by-verizon/logo-with-backmarket.svg'
                      alt='Visible partnered with Back Market'
                      width={200}
                      height={42}
                      className='h-auto max-h-full max-w-full'
                    />
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Section3 component
const Section3: React.FC = () => {
  return (
    <div className='flex justify-center bg-gray-50'>
      <div className='max-w-full grow px-6 lg:max-w-[1184px] lg:basis-full lg:px-8'>
        <div className='mb-7 md:space-y-24 mt-12'>
          {/* Main content sections */}
          <ProductCondition />
          <StorageSelection />
          <ColorSelectionComponent />
          <TradeInSection />
          <VerizonOffer />
        </div>
      </div>
    </div>
  );
};

export default Section3;
