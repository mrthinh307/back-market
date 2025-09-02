import React, { useState } from 'react';
import Image from 'next/image';

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

const ArrowLeftIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      d="m10.957 12 3.47-3.47a.75.75 0 1 0-1.06-1.06L9.72 11.116a1.25 1.25 0 0 0 0 1.768l3.646 3.646a.75.75 0 0 0 1.06-1.06L10.958 12"
      clipRule="evenodd"
    />
  </svg>
);

// Product condition component
const ProductCondition = () => {
  const [selectedCondition, setSelectedCondition] = useState('good');

  const conditions = [
    { id: 'fair', name: 'Fair', price: '$349.00' },
    { id: 'good', name: 'Good', price: '$308.99', isGoodDeal: true },
    { id: 'excellent', name: 'Excellent', price: '$341.00' },
    { id: 'premium', name: 'Premium', price: '$439.56' },
  ];

  return (
    <div className="py-2 md:py-6 px-12">
      <div className="md:flex md:justify-center md:items-center">
        {/* Left side - Product image */}
        <div className="max-w-full md:relative md:mr-4 md:min-w-[337px] md:max-w-[498px] md:grow lg:mr-8 hidden md:block">
          <div className="flex w-full flex-col justify-center opacity-100 transition-opacity duration-500 ease-out">
            <div className="relative mx-auto mb-4 max-w-[498px] md:mb-0 md:block md:w-full md:min-w-[337px]">
              <div className="relative -mb-4 flex min-h-72 flex-col flex-wrap overflow-hidden w-full pb-4">
                <div className="relative flex w-full grow justify-center">
                  <div className="rounded-lg relative flex w-full md:rounded-[32px]">
                    <Image
                      src="https://product-page.statics.backmarket.com/images/pickers/models/iphone_13_grade_11_body.png"
                      alt="iPhone 13 Body"
                      width={498}
                      height={498}
                      className="rounded-lg h-auto w-full max-h-[498px] md:min-w-[337px] md:max-w-[498px] md:rounded-[32px]"
                    />
                    <div className="caption bg-gray-100 absolute right-3 top-3 px-4">
                      <span>Example image</span>
                    </div>
                    <div className="rounded-b-lg absolute inset-x-0 bottom-0 flex flex-col p-4 md:flex-row md:flex-wrap md:items-center md:rounded-b-[32px] md:pb-6 md:pl-8 md:pt-12 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white text-xl mr-2 mt-2">
                        <span>Body</span>
                      </p>
                      <div className="flex grow flex-row flex-wrap">
                        <div className="bg-white rounded-full text-xs mr-2 mt-2 flex w-fit items-center p-1 pr-2 text-center">
                          <CheckIcon />
                          <span className="ml-1 text-left">
                            Light signs of use
                          </span>
                        </div>
                        <div className="bg-white rounded-full text-xs mr-2 mt-2 flex w-fit items-center p-1 pr-2 text-center">
                          <CheckIcon />
                          <span className="ml-1 text-left">Verified parts</span>
                        </div>
                        <div className="bg-white rounded-full text-xs mr-2 mt-2 flex w-fit items-center p-1 pr-2 text-center">
                          <StarIcon />
                          <span className="ml-1 text-left">
                            Battery for daily use
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Condition selection */}
        <div className="w-full md:w-1/2 md:shrink-0 p-8">
          <div className="opacity-100 transition-opacity duration-500 ease-out">
            <fieldset role="radiogroup">
              <legend className="mb-3 flex items-baseline justify-between">
                <h2 className="text-2xl font-bold">
                  <span>Select the condition</span>
                </h2>
                <button className="text-blue-600 relative bottom-2 block pl-3 md:hidden text-sm font-medium cursor-pointer hover:text-blue-700 underline">
                  Compare
                </button>
              </legend>
              <div>
                <p className="text-sm mb-4 block md:hidden -mt-4">
                  All guaranteed 100% functional
                </p>
              </div>

              {/* Info button */}
              <button className="shadow-md rounded-lg relative no-underline transition duration-200 ease-in bg-blue-50 focus:outline-none cursor-pointer hover:bg-blue-100 hover:shadow-lg mb-6 flex min-h-[72px] w-full flex-row items-center gap-3 px-4 py-3 md:flex">
                <svg
                  className="h-8 w-8 m-1 ml-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width={32}
                >
                  <path
                    fillRule="evenodd"
                    d="M3.69 3h16.62a1.58 1.58 0 0 1 1.581 1.577v14.846A1.58 1.58 0 0 1 20.31 21H3.69a1.579 1.579 0 0 1-1.581-1.577V4.577A1.579 1.579 0 0 1 3.69 3m5.933 14.453h3.262a.1.1 0 0 0 .07-.17l-5.167-5.167a.166.166 0 0 1 0-.233l5.167-5.168a.1.1 0 0 0-.07-.17H9.623a.39.39 0 0 0-.277.116l-5.222 5.222a.166.166 0 0 0 0 .233l5.222 5.222a.39.39 0 0 0 .277.115m10.173-.17-5.168-5.167a.166.166 0 0 1 0-.234l5.168-5.168a.1.1 0 0 0-.071-.17h-3.262a.39.39 0 0 0-.277.116l-5.222 5.222a.166.166 0 0 0 0 .233l5.222 5.223a.39.39 0 0 0 .277.115h3.262a.1.1 0 0 0 .07-.17"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-sm flex-1 text-left">
                  <p className="mb-0">
                    Refurbishers have restored devices to high quality based on
                    a 25-point inspection. Compare conditions
                  </p>
                </div>
                <ArrowRightIcon />
              </button>

              {/* Condition options */}
              <ul className="list-none grid grid-cols-2 gap-x-3 gap-y-3 ">
                {conditions.map((condition) => (
                  <li key={condition.id}>
                    <button
                      aria-checked={selectedCondition === condition.id}
                      aria-disabled="false"
                      className={`focus:outline-none rounded-sm relative flex size-full flex-col border py-3 no-underline ${
                        selectedCondition === condition.id
                          ? 'bg-pink-50 border-black hover:bg-pink-100'
                          : 'bg-white border-black hover:bg-gray-200'
                      }`}
                      role="radio"
                      type="button"
                      onClick={() => setSelectedCondition(condition.id)}
                    >
                      <div className="m-auto flex w-full flex-row items-center pl-2 pr-4">
                        <div className="shrink-0">
                          <div className="flex size-6 items-center justify-center">
                            <div
                              className={`rounded-full border ${
                                selectedCondition === condition.id
                                  ? 'bg-black border-black'
                                  : 'bg-transparent border-black'
                              }`}
                              style={{
                                width: condition.id === 'premium' ? '16px' : '12px',
                                height: condition.id === 'premium' ? '16px' : '12px',
                              }}
                            />
                          </div>
                        </div>
                        <div className="ml-4 flex grow flex-col">
                          <div className="flex grow flex-nowrap items-start text-left flex-col">
                            <span
                              className={`mr-2 min-w-[100px] grow ${
                                selectedCondition === condition.id
                                  ? 'text-black font-bold'
                                  : 'text-gray-900'
                              }`}
                            >
                              {condition.name}
                            </span>
                            <span
                              className={`text-sm flex shrink-0 items-center gap-1 ${
                                condition.isGoodDeal
                                  ? 'text-green-600'
                                  : 'text-gray-600'
                              }`}
                            >
                              {condition.isGoodDeal && (
                                <svg
                                  className="h-6 w-6"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M6.166 5.106a.75.75 0 1 0-1.06 1.06l11.447 11.448h-5.26a.75.75 0 1 0 0 1.5h6.57a1.25 1.25 0 0 0 1.25-1.25v-6.571a.75.75 0 0 0-1.5 0v5.26L6.167 5.106" />
                                </svg>
                              )}
                              {condition.price}
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

// Storage selection component
const StorageSelection = () => {
  const [selectedStorage, setSelectedStorage] = useState('128');

  const storageOptions = [
    { id: '128', name: '128 GB', price: '$308.99' },
    { id: '256', name: '256 GB', price: '$378.99' },
    { id: '512', name: '512 GB', price: '$430.92' },
  ];

  return (
    <div className="py-2 md:py-6 px-12">
      <div className="md:flex md:justify-center md:items-center">
        {/* Left side - Storage image */}
        <div className="max-w-full md:relative md:mr-8 md:min-w-[337px] md:max-w-[498px] md:grow lg:mr-16 hidden md:block">
          <div className="flex w-full flex-col justify-center opacity-100 transition-opacity duration-500 ease-out">
            <div className="rounded-lg relative md:rounded-[32px]">
              <Image
                src="https://front-office.statics.backmarket.com/9c0fed50e64a2e15e6b5469ecfd36c97597d1517/img/product/funnel/desktop/smartphone/step-storage.jpg"
                alt="Storage selection"
                width={498}
                height={498}
                className="rounded-lg block max-w-[498px] max-h-[498px] md:min-w-[337px] md:rounded-[32px]"
              />
            </div>
          </div>
        </div>

        {/* Right side - Storage selection */}
        <div className="md:shrink-0 w-full md:w-1/2 p-8">
          <div className="opacity-100 transition-opacity duration-500 ease-out">
            <fieldset role="radiogroup">
              <legend className="mb-3 flex items-baseline justify-between">
                <h2 className="text-2xl font-bold">
                  <span>Select storage</span>
                </h2>
              </legend>

              <ul className="list-none grid gap-y-3">
                {storageOptions.map((storage) => (
                  <li key={storage.id}>
                    <button
                      aria-checked={selectedStorage === storage.id}
                      aria-disabled="false"
                      className={`focus:outline-none rounded-sm relative flex size-full flex-col border py-2 no-underline ${
                        selectedStorage === storage.id
                          ? 'bg-pink-50 border-black hover:bg-pink-100'
                          : 'bg-white border-black hover:bg-gray-200'
                      }`}
                      role="radio"
                      type="button"
                      onClick={() => setSelectedStorage(storage.id)}
                    >
                      <div className="m-auto flex w-full flex-row items-center pl-2 pr-4">
                        <div className="shrink-0">
                          <div className="flex size-6 items-center justify-center">
                            <div
                              className={`rounded-full border ${
                                selectedStorage === storage.id
                                  ? 'bg-black border-black'
                                  : 'bg-transparent border-black'
                              }`}
                              style={{ width: '12px', height: '12px' }}
                            />
                          </div>
                        </div>
                        <div className="ml-4 flex grow flex-col">
                          <div className="flex grow flex-nowrap items-start text-left flex-row">
                            <span
                              className={`mr-2 min-w-[100px] grow ${
                                selectedStorage === storage.id
                                  ? 'text-black font-bold'
                                  : 'text-gray-900'
                              }`}
                            >
                              {storage.name}
                            </span>
                            <span className="text-sm flex shrink-0 items-center gap-1 text-gray-600 pt-3">
                              {storage.price}
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

// Color selection component
const ColorSelection = () => {
  const [selectedColor, setSelectedColor] = useState('pink');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const colors = [
    {
      id: 'midnight',
      name: 'Midnight',
      price: '$316.00',
      color: 'rgb(24, 32, 40)',
    },
    { id: 'red', name: 'Red', price: '$342.00', color: 'rgb(255, 0, 0)' },
    { id: 'blue', name: 'Blue', price: '$308.99', color: 'rgb(156, 176, 196)' },
    {
      id: 'green',
      name: 'Green',
      price: '$342.00',
      color: 'rgb(217, 239, 213)',
    },
    {
      id: 'starlight',
      name: 'Starlight',
      price: '$308.99',
      color: 'rgb(238, 233, 229)',
    },
    { id: 'pink', name: 'Pink', price: '$308.99', color: 'rgb(252, 231, 231)' },
  ];

  const productImages = [
    'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
    'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-2_4afc23ba-0d58-4702-a96b-285ff6754398.jpg',
    'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-3_ee749f47-ef5e-498c-bce1-fe3d67463bb7.jpg',
  ];

  return (
    <div className="py-8 md:py-9 px-12">
      <div className="md:flex md:justify-center md:items-center">
        {/* Left side - Product gallery */}
        <div className="max-w-full md:relative md:mr-8 md:min-w-[337px] md:max-w-[498px] md:grow lg:mr-16 hidden md:block">
          <div className="flex w-full flex-col justify-center opacity-100 transition-opacity duration-500 ease-out">
            <div className="mb-4 w-full">
              <div className="flex justify-center">
                <div className="relative -mb-4 flex min-h-72 flex-col flex-wrap overflow-hidden mt-3 md:mt-8 md:grow">
                  <div className="relative flex w-full grow justify-center">
                    <div className="relative">
                      <Image
                        src="https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg"
                        alt="iPhone 13 128GB - Pink - Unlocked"
                        width={976}
                        height={976}
                        className="rounded-lg block !h-[66.7vw] max-h-full w-auto md:!h-auto md:w-full lg:w-[29.125rem]"
                        priority={currentImageIndex === 0}
                      />
                    </div>
                  </div>

                  {/* Image navigation */}
                  <div className="relative isolate mx-auto flex w-full justify-center pt-3 h-15">
                    <div className="flex items-center px-2 py-1">
                      <button
                        className="rounded-full flex shrink-0 cursor-pointer appearance-none items-center justify-center border-0 no-underline disabled:cursor-not-allowed transition duration-300 ease-in size-8 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
                        type="button"
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
                      <ul className="flex list-none flex-row gap-2 overflow-hidden py-1 justify-center">
                        {productImages.map((_, index) => (
                          <li key={index} className="flex">
                            <button
                              aria-current={currentImageIndex === index}
                              aria-label={`Controller ${index + 1}`}
                              className="flex focus:outline-none rounded-sm size-10"
                              type="button"
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
                                  src="https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg"
                                  alt={`Product image ${index + 1}`}
                                  width={40}
                                  height={40}
                                  className="!h-10 object-cover"
                                />
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center px-2 py-1">
                      <button
                        className="rounded-full flex shrink-0 cursor-pointer appearance-none items-center justify-center border-0 no-underline disabled:cursor-not-allowed transition duration-300 ease-in size-8 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
                        type="button"
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
        <div className="md:shrink-0 w-1/2 p-8">
          <div className="opacity-100 transition-opacity duration-500 ease-out">
            <fieldset role="radiogroup">
              <legend className="mb-3 flex items-baseline justify-between">
                <h2 className="text-2xl font-bold">
                  <span>Select the color</span>
                </h2>
              </legend>

              <ul className="list-none grid grid-cols-2 gap-x-3 gap-y-3">
                {colors.map((color) => (
                  <li key={color.id}>
                    <button
                      aria-checked={selectedColor === color.id}
                      aria-disabled="false"
                      className={`focus:outline-none rounded-sm relative flex size-full flex-col border py-3 no-underline ${
                        selectedColor === color.id
                          ? 'bg-pink-50 border-black hover:bg-pink-100'
                          : 'bg-white border-black hover:bg-gray-200'
                      }`}
                      role="radio"
                      type="button"
                      onClick={() => setSelectedColor(color.id)}
                    >
                      <div className="m-auto flex w-full flex-row items-center pl-2 pr-4">
                        <div className="shrink-0">
                          <div
                            className="border border-gray-300 rounded-md m-2 size-4"
                            style={{ backgroundColor: color.color }}
                          />
                        </div>
                        <div className="ml-4 flex grow flex-col">
                          <div className="flex grow flex-nowrap items-start text-left flex-col">
                            <span
                              className={`mr-2 min-w-[100px] grow ${
                                selectedColor === color.id
                                  ? 'text-black font-bold'
                                  : 'text-gray-900'
                              }`}
                            >
                              {color.name}
                            </span>
                            <span className="text-sm flex shrink-0 items-center gap-1 text-gray-600">
                              {color.price}
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

// Trade-in component
const TradeInSection = () => {
  return (
    <div className="py-8 md:py-9 px-12">
      <div className="md:flex md:justify-center md:items-center">
        {/* Left side - Trade-in image */}
        <div className="max-w-full md:relative md:mr-8 md:min-w-[337px] md:max-w-[498px] md:grow lg:mr-16 hidden md:block">
          <div className="flex w-full flex-col justify-center opacity-100 transition-opacity duration-500 ease-out">
            <Image
              src="https://front-office.statics.backmarket.com/9c0fed50e64a2e15e6b5469ecfd36c97597d1517/img/product/funnel/step-trade-in-2.jpg"
              alt="Trade-in"
              width={498}
              height={498}
              className="rounded-lg block min-w-[337px] max-w-[498px] max-h-[498px] md:rounded-[32px]"
            />
          </div>
        </div>

        {/* Right side - Trade-in content */}
        <div className="md:shrink-0 w-1/2 p-8">
          <div className="opacity-100 transition-opacity duration-500 ease-out">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-4">
                Get this for even less with Trade-in
              </h2>

              <button className="shadow-md rounded-lg relative no-underline transition duration-200 ease-in bg-blue-50 focus:outline-none cursor-pointer hover:bg-blue-100 hover:shadow-lg mb-6 flex min-h-[72px] w-full flex-row items-center gap-3 px-4 py-3">
                <svg
                  className="h-8 w-8 m-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M7 3.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5M4.75 7a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0" 
                    clipRule="evenodd"
                  ></path>
                  <path d="M13 6.25a.75.75 0 0 0 0 1.5h5.19l-1.72 1.72a.75.75 0 1 0 1.06 1.06l2.647-2.646a1.25 1.25 0 0 0 0-1.768L17.53 3.47a.75.75 0 1 0-1.06 1.06l1.72 1.72H13m-7.19 10H11a.75.75 0 0 1 0 1.5H5.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-2.647-2.646a1.25 1.25 0 0 1 0-1.768L6.47 13.47a.75.75 0 1 1 1.06 1.06l-1.72 1.72" />
                  <path 
                    fillRule="evenodd" 
                    d="M14.5 13.25a1.25 1.25 0 0 0-1.25 1.25v5a1.25 1.25 0 0 0 1.25 1.25h5a1.25 1.25 0 0 0 1.25-1.25v-5a1.25 1.25 0 0 0-1.25-1.25h-5m.25 6v-4.5h4.5v4.5h-4.5" 
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div className="text-sm flex-1 text-left">
                  <p className="mb-0">See how Trade-in works</p>
                </div>
                <ArrowRightIcon />
              </button>

              <ul className="list-none">
                <li className="mb-3">
                  <div>
                    <div className="relative mb-2">
                      <div className="relative flex items-center">
                        <div className="w-full relative">
                          <input
                            type="text"
                            aria-label="Search your device"
                            className="peer rounded-sm relative w-full min-w-0 pl-3 transition-colors duration-200 bg-gray-100 hover:bg-gray-200 text-gray-900 h-12 border border-solid border-gray-300 focus:border-blue-500 focus:outline-none pr-12"
                            placeholder="Search your device"
                          />
                        </div>
                        <svg
                          className="text-gray-600 pointer-events-none absolute right-3 shrink-0 select-none h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2.25a7.75 7.75 0 1 0 4.924 13.735l5.546 5.545a.75.75 0 1 0 1.06-1.06l-5.545-5.546A7.75 7.75 0 0 0 10 2.25M3.75 10a6.25 6.25 0 1 1 12.5 0 6.25 6.25 0 0 1-12.5 0"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <span className="text-gray-600 text-sm">
                      e.g. iPhone 11, MacBook Air, Galaxy S21...
                    </span>
                  </div>
                </li>
                <li>
                  <button className="focus:outline-none rounded-sm relative flex size-full flex-col border py-3 no-underline bg-white border-gray-300 hover:bg-gray-50">
                    <div className="m-auto flex w-full flex-row items-center pl-2 pr-4">
                      <div className="ml-4 flex grow flex-col">
                        <div className="flex grow flex-nowrap items-start text-left flex-row">
                          <span className="mr-2 min-w-[100px] grow text-gray-900">
                            No trade-in
                          </span>
                          <span className="text-sm flex shrink-0 items-center gap-1 text-gray-600 pt-3"></span>
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
    <div className="md:flex md:justify-center md:items-center pb-12 pt-14 md:py-0">
      <div className="max-w-full md:relative md:mr-8 md:min-w-[337px] md:max-w-[498px] md:grow lg:mr-16 hidden md:block">
        <div className="flex w-full flex-col justify-center opacity-100 transition-opacity duration-500 ease-out">
          <div className="text-gray-900 text-2xl font-bold flex grow flex-col items-end">
            <span>Go unlimited for 20% less.</span>
          </div>
        </div>
      </div>
      <div className="md:shrink-0">
        <div className="opacity-100 transition-opacity duration-500 ease-out">
          <div className="flex">
            <div className="shadow-lg rounded-lg flex flex-col gap-4 bg-[#1800FF] px-6 pt-4 md:px-8 md:pt-8">
              <h2 className="text-white text-2xl font-bold md:hidden">
                Go unlimited for 20% less.
              </h2>
              <div className="text-white">
                <span className="font-bold">
                  This phone comes with an offer for unlimited premium 5G data
                  on Verizon's network for $20/month for 2 years. That's a total
                  savings of $120 with no strings attached.
                </span>
                <p className="text-xs">Terms apply</p>
              </div>
              <div>
                <button className="rounded-sm relative max-w-full select-none no-underline inline-flex h-8 items-center justify-center px-3 transition duration-300 cursor-pointer bg-white text-black border-none hover:bg-gray-100">
                  <span className="flex items-center">
                    <span className="flex items-center space-x-2">
                      <span className="text-sm font-bold truncate">
                        See plan details
                      </span>
                    </span>
                  </span>
                </button>
              </div>
              <footer>
                <div className="flex items-center justify-end gap-5 md:hidden">
                  <Image
                    src="/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D260/https://front-office.statics.backmarket.com/9c0fed50e64a2e15e6b5469ecfd36c97597d1517/img/visible-by-verizon/character-cropped.png"
                    alt=""
                    width={100}
                    height={95}
                    className="h-auto max-h-full max-w-full"
                  />
                  <Image
                    src="https://front-office.statics.backmarket.com/9c0fed50e64a2e15e6b5469ecfd36c97597d1517/img/visible-by-verizon/logo-two-lines.svg"
                    alt="Visible partnered with Back Market"
                    width={129}
                    height={58}
                    className="md:hidden h-auto max-h-full max-w-full"
                  />
                </div>
                <div className="hidden items-center justify-between md:flex">
                  <Image
                    src="/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D260/https://front-office.statics.backmarket.com/9c0fed50e64a2e15e6b5469ecfd36c97597d1517/img/visible-by-verizon/character.png"
                    alt=""
                    width={98}
                    height={94}
                    className="h-auto max-h-full max-w-full"
                  />
                  <Image
                    src="https://front-office.statics.backmarket.com/9c0fed50e64a2e15e6b5469ecfd36c97597d1517/img/visible-by-verizon/logo-with-backmarket.svg"
                    alt="Visible partnered with Back Market"
                    width={200}
                    height={42}
                    className="h-auto max-h-full max-w-full"
                  />
                </div>
              </footer>
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
    <div className="flex justify-center bg-gray-50">
      <div className="max-w-full grow px-6 lg:max-w-[1184px] lg:basis-full lg:px-8">
        <div className="mb-7 md:space-y-24 mt-12">
          {/* Main content sections */}
          <ProductCondition />
          <StorageSelection />
          <ColorSelection />
          <TradeInSection />
          <VerizonOffer />
        </div>
      </div>
    </div>
  );
};

export default Section3;
