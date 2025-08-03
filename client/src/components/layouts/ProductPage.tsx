import React, { useState } from 'react';
import {
  Star,
  Heart,
  Share2,
  Shield,
  Truck,
  RotateCcw,
  Info,
  ChevronDown,
  ChevronRight,
  Check,
  X,
} from 'lucide-react';
import Image from 'next/image';

const ProductPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedCondition, setSelectedCondition] = useState('excellent');
  const [selectedStorage, setSelectedStorage] = useState('128GB');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const productImages = [
    '/api/placeholder/400/400',
    '/api/placeholder/400/400',
    '/api/placeholder/400/400',
    '/api/placeholder/400/400',
    '/api/placeholder/400/400',
  ];

  const conditionOptions = [
    {
      id: 'excellent',
      name: 'Excellent',
      price: 579,
      originalPrice: 699,
      savings: 120,
      description: 'Light signs of use',
      available: 12,
    },
    {
      id: 'very-good',
      name: 'Very Good',
      price: 549,
      originalPrice: 699,
      savings: 150,
      description: 'Visible signs of use',
      available: 8,
    },
    {
      id: 'good',
      name: 'Good',
      price: 519,
      originalPrice: 699,
      savings: 180,
      description: 'Clear signs of use',
      available: 3,
    },
  ];

  return (
    <div className="flex justify-center pb-5 md:pb-8">
      <div
        className="max-w-full grow px-3 lg:max-w-[1184px] lg:basis-full lg:px-3"
        data-test="container-wrapper"
      >
        <nav
          aria-label="Breadcrumb"
          className="bg-surface-default-low hidden md:block"
        >
          <ol
            className="m-0 flex md:py-8"
            itemType="http://schema.org/BreadcrumbList"
          >
            <li
              className="text-action-default-hi md:flex md:shrink-0 hidden"
              itemProp="itemListElement"
              itemType="http://schema.org/ListItem"
            >
              <a
                href="https://www.backmarket.com/en-us"
                rel="noreferrer noopener"
                className="flex items-center whitespace-nowrap text-action-default-hi focus-visible-outline-default-hi rounded-sm font-weight-body-1-link cursor-pointer [text-align:inherit] hover:text-action-default-hi-hover no-underline hover:underline"
                itemProp="item"
              >
                <span
                  className="body-2-bold truncate font-bold"
                  itemProp="name"
                >
                  Home
                </span>
              </a>
              <svg
                aria-hidden="true"
                fill="currentColor"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden md:mx-3 md:block"
              >
                <path
                  fillRule="evenodd"
                  d="m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12"
                  clipRule="evenodd"
                ></path>
              </svg>
              <meta content="1" itemProp="position" />
            </li>
            <li
              className="text-action-default-hi md:flex md:shrink-0 hidden"
              itemProp="itemListElement"
              itemType="http://schema.org/ListItem"
            >
              <a
                href="https://www.backmarket.com/en-us/l/smartphones/0744fd27-8605-465d-8691-3b6dffda5969"
                rel="noreferrer noopener"
                className="flex items-center whitespace-nowrap text-action-default-hi focus-visible-outline-default-hi rounded-sm font-weight-body-1-link cursor-pointer [text-align:inherit] hover:text-action-default-hi-hover no-underline hover:underline"
                itemProp="item"
              >
                <svg
                  aria-hidden="true"
                  fill="currentColor"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-8 shrink-0 md:hidden"
                >
                  <path d="M8.427 7.53a.75.75 0 0 0-1.06-1.06L2.72 11.116a1.25 1.25 0 0 0 0 1.768l4.646 4.646a.75.75 0 0 0 1.06-1.06l-3.719-3.72h16.19a.75.75 0 1 0 0-1.5H4.706l3.72-3.72"></path>
                </svg>
                <span
                  className="body-2-bold truncate font-bold"
                  itemProp="name"
                >
                  Smartphones
                </span>
              </a>
              <svg
                aria-hidden="true"
                fill="currentColor"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden md:mx-3 md:block"
              >
                <path
                  fillRule="evenodd"
                  d="m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12"
                  clipRule="evenodd"
                ></path>
              </svg>
              <meta content="2" itemProp="position" />
            </li>
            <li
              className="text-action-default-hi md:flex md:shrink-0 min-w-0"
              itemProp="itemListElement"
              itemType="http://schema.org/ListItem"
            >
              <a
                href="https://www.backmarket.com/en-us/l/iphone/e8724fea-197e-4815-85ce-21b8068020cc"
                rel="noreferrer noopener"
                className="flex items-center whitespace-nowrap text-action-default-hi focus-visible-outline-default-hi rounded-sm font-weight-body-1-link cursor-pointer [text-align:inherit] hover:text-action-default-hi-hover no-underline hover:underline"
                itemProp="item"
              >
                <svg
                  aria-hidden="true"
                  fill="currentColor"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-8 shrink-0 md:hidden"
                >
                  <path d="M8.427 7.53a.75.75 0 0 0-1.06-1.06L2.72 11.116a1.25 1.25 0 0 0 0 1.768l4.646 4.646a.75.75 0 0 0 1.06-1.06l-3.719-3.72h16.19a.75.75 0 1 0 0-1.5H4.706l3.72-3.72"></path>
                </svg>
                <span
                  className="body-2-bold truncate font-bold"
                  itemProp="name"
                >
                  iPhone
                </span>
              </a>
              <svg
                aria-hidden="true"
                fill="currentColor"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden md:mx-3 md:block"
              >
                <path
                  fillRule="evenodd"
                  d="m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12"
                  clipRule="evenodd"
                ></path>
              </svg>
              <meta content="3" itemProp="position" />
            </li>
            <li
              className="text-action-default-hi md:flex min-w-[6ch] hidden"
              itemProp="itemListElement"
              itemType="http://schema.org/ListItem"
            >
              <div
                aria-current="page"
                className="body-2 truncate"
                itemProp="name"
              >
                iPhone 13 128GB - Pink - Unlocked
              </div>
              <meta content="4" itemProp="position" />
            </li>
          </ol>
        </nav>
        <nav
          aria-label="Breadcrumb"
          className="bg-surface-default-low md:hidden"
        >
          <ol
            className="m-0 flex list-none items-center py-8 md:py-12"
            itemType="http://schema.org/BreadcrumbList"
          >
            <li
              className="text-action-default-low caption-bold flex py-8 md:body-2-bold"
              itemProp="itemListElement"
              itemType="http://schema.org/ListItem"
            >
              <a
                href="https://www.backmarket.com/en-us/l/smartphones/0744fd27-8605-465d-8691-3b6dffda5969"
                rel="noreferrer noopener"
                className="text-action-default-low flex items-center whitespace-nowrap text-action-default-hi focus-visible-outline-default-hi rounded-sm font-weight-body-1-link cursor-pointer [text-align:inherit] hover:text-action-default-hi-hover no-underline hover:underline"
                itemProp="item"
              >
                <span className="truncate" itemProp="name">
                  Smartphones
                </span>
              </a>
              <span aria-hidden="true" className="mx-4">
                •
              </span>
              <meta content="1" itemProp="position" />
            </li>
            <li
              className="text-action-default-low caption-bold flex py-8 md:body-2-bold"
              itemProp="itemListElement"
              itemType="http://schema.org/ListItem"
            >
              <a
                href="https://www.backmarket.com/en-us/l/iphone/e8724fea-197e-4815-85ce-21b8068020cc"
                rel="noreferrer noopener"
                className="text-action-default-low flex items-center whitespace-nowrap text-action-default-hi focus-visible-outline-default-hi rounded-sm font-weight-body-1-link cursor-pointer [text-align:inherit] hover:text-action-default-hi-hover no-underline hover:underline"
                itemProp="item"
              >
                <span className="truncate" itemProp="name">
                  iPhone
                </span>
              </a>
              <meta content="2" itemProp="position" />
            </li>
          </ol>
        </nav>
        <div className="flex flex-col flex-wrap items-center md:flex-row md:flex-nowrap">
          <div className="relative w-full max-w-full grow-0 md:w-1/3 lg:w-1/2">
            <div className="top-[7rem] md:sticky md:right-1/2 md:mr-14">
              <div>
                <div className="flex justify-center" data-test="carousel">
                  <div className="relative -mb-4 flex min-h-72 flex-col flex-wrap overflow-hidden mt-3 md:mt-8 md:grow">
                    <div className="relative flex w-full grow justify-center">
                      <ul className="w-full list-none">
                        <li
                          id="gallery-carousel"
                          aria-hidden="false"
                          className="flex w-full list-none justify-center motion-safe:animate-fade-in"
                        >
                          <button
                            className="relative focus-visible-outline-inset-hi rounded-sm cursor-pointer"
                            type="button"
                          >
                            <Image
                              fetchPriority="high"
                              className="rounded-lg block w-auto md:!h-auto md:w-full lg:w-[29.125rem] h-auto max-h-full max-w-full leading-none"
                              alt="iPhone 13 128GB - Pink - Unlocked"
                              decoding="async"
                              height="976"
                              loading="eager"
                              sizes="(max-width: 768px) 100vw, 466px"
                              src="https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg"
                              width="976"
                            />
                          </button>
                        </li>
                      </ul>
                      <div className="sr-only" role="status">
                        "1 / 6. "{' '}
                        <span aria-labelledby="gallery-carousel"></span>
                      </div>
                    </div>
                    <div className="relative isolate mx-auto flex w-full justify-center h-60">
                      <div className="flex items-center px-8 py-4 absolute left-0 z-10 mt-4">
                        <button
                          className=" bg-black rounded-full flex cursor-pointer items-center justify-center size-8 hover:bg-gray-700 duration-300"
                          type="button"
                        >
                          <svg
                            className="text-white"
                            aria-hidden="false"
                            aria-label="Previous"
                            fill="currentColor"
                            height="24"
                            role="img"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="m10.957 12 3.47-3.47a.75.75 0 1 0-1.06-1.06L9.72 11.116a1.25 1.25 0 0 0 0 1.768l3.646 3.646a.75.75 0 0 0 1.06-1.06L10.958 12"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      <div>
                        <div className="gradient-mask-lr-60 absolute inset-x-0">
                          <ul
                            className="flex list-none flex-row gap-8 overflow-hidden py-4 justify-normal"
                            style={{ paddingLeft: 56, paddingRight: 56 }}
                          ></ul>
                        </div>
                      </div>
                      <div className="flex items-center px-8 py-4 absolute right-0 z-10 mt-4">
                        <button
                          className=" bg-black rounded-full flex cursor-pointer items-center justify-center size-8 hover:bg-gray-700 duration-300"
                          type="button"
                        >
                          <svg
                            className="text-white"
                            aria-hidden="false"
                            aria-label="Next"
                            fill="currentColor"
                            height="24"
                            role="img"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-full grow-0 md:w-2/3 md:basis-2/3 lg:w-1/2 lg:basis-1/2">
            <div className="flex flex-col items-start md:flex-col-reverse">
              <div className="w-full">
                <div className="mb-64 hidden md:block">
                  <a
                    className=" bg-green-200 rounded-sm body-2-bold inline-flex items-center self-center p-2 pr-4 isolate mb-4"
                    href="#ecoBlocks"
                  >
                    <Image
                      alt=""
                      className="stroke-success"
                      height="24"
                      src="https://front-office.statics.backmarket.com/9c0fed50e64a2e15e6b5469ecfd36c97597d1517/img/product/eco-block/butterfly.svg"
                      width="24"
                    />
                    <span className="ml-1 underline">
                      More sustainable than new
                    </span>
                  </a>
                  <h1 className="text-3xl">
                    iPhone 13 128GB - Pink - Unlocked
                  </h1>
                  <button
                    className="flex bg-transparent items-center"
                    data-test="product-page-reviews-count"
                    type="button"
                  >
                    <div className="text-action-default-hi flex items-center">
                      <div
                        aria-label="Rating of 4.4 out of 5 stars"
                        className="text-action-default-hi flex items-center"
                        role="img"
                      >
                        <div className="flex cursor-pointer">
                          <svg
                            aria-hidden="true"
                            fill="currentColor"
                            height="16"
                            viewBox="0 0 24 24"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M13.154 3.65c-.427-1.026-1.881-1.026-2.308 0L8.838 8.478l-5.21.418C2.519 8.984 2.07 10.367 2.914 11.09l3.97 3.4-1.213 5.085c-.258 1.082.919 1.937 1.868 1.357l4.46-2.724 4.462 2.724c.949.58 2.125-.275 1.867-1.357l-1.212-5.084 3.97-3.4c.844-.724.394-2.107-.714-2.196l-5.21-.418-2.008-4.826"></path>
                          </svg>
                          <svg
                            aria-hidden="true"
                            fill="currentColor"
                            height="16"
                            viewBox="0 0 24 24"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M13.154 3.65c-.427-1.026-1.881-1.026-2.308 0L8.838 8.478l-5.21.418C2.519 8.984 2.07 10.367 2.914 11.09l3.97 3.4-1.213 5.085c-.258 1.082.919 1.937 1.868 1.357l4.46-2.724 4.462 2.724c.949.58 2.125-.275 1.867-1.357l-1.212-5.084 3.97-3.4c.844-.724.394-2.107-.714-2.196l-5.21-.418-2.008-4.826"></path>
                          </svg>
                          <svg
                            aria-hidden="true"
                            fill="currentColor"
                            height="16"
                            viewBox="0 0 24 24"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M13.154 3.65c-.427-1.026-1.881-1.026-2.308 0L8.838 8.478l-5.21.418C2.519 8.984 2.07 10.367 2.914 11.09l3.97 3.4-1.213 5.085c-.258 1.082.919 1.937 1.868 1.357l4.46-2.724 4.462 2.724c.949.58 2.125-.275 1.867-1.357l-1.212-5.084 3.97-3.4c.844-.724.394-2.107-.714-2.196l-5.21-.418-2.008-4.826"></path>
                          </svg>
                          <svg
                            aria-hidden="true"
                            fill="currentColor"
                            height="16"
                            viewBox="0 0 24 24"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M13.154 3.65c-.427-1.026-1.881-1.026-2.308 0L8.838 8.478l-5.21.418C2.519 8.984 2.07 10.367 2.914 11.09l3.97 3.4-1.213 5.085c-.258 1.082.919 1.937 1.868 1.357l4.46-2.724 4.462 2.724c.949.58 2.125-.275 1.867-1.357l-1.212-5.084 3.97-3.4c.844-.724.394-2.107-.714-2.196l-5.21-.418-2.008-4.826"></path>
                          </svg>
                          <svg
                            aria-hidden="true"
                            fill="currentColor"
                            height="16"
                            viewBox="0 0 24 24"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M13.154 3.65c-.427-1.026-1.881-1.026-2.308 0L8.838 8.478l-5.21.418C2.519 8.984 2.07 10.367 2.914 11.09l3.97 3.4-1.213 5.085a1.231 1.231 0 0 0 .464 1.289l-.013.055.048-.03a1.231 1.231 0 0 0 1.369.043l4.46-2.724 4.462 2.724c.949.58 2.125-.275 1.867-1.357l-1.212-5.084 3.97-3.4c.844-.724.394-2.107-.714-2.196l-5.21-.418-2.008-4.826M12 16.666a1.248 1.248 0 0 1 .652.183l4.078 2.49-1.109-4.648a1.25 1.25 0 0 1 .403-1.24l3.63-3.108-4.765-.382a1.25 1.25 0 0 1-1.054-.766L12 4.782v11.883"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <span
                          aria-hidden="true"
                          className="ml-2 mt-1 pb-2 md:mt-2 body-2-bold cursor-pointer"
                        >
                          4.4/5
                        </span>
                      </div>
                    </div>
                    <div className="body-2-link underline-offset-2 ml-3 underline cursor-pointer">
                      (3,743 reviews)
                    </div>
                  </button>
                  <div className="mt-6 flex items-center">
                    <div className="grow">
                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-4">
                          <span
                            className="text-2xl font-bold"
                            data-qa="productpage-product-price"
                            data-test="productpage-product-price"
                          >
                            $288.99
                          </span>
                          <div className="flex flex-wrap gap-x-4">
                            <span className="body-2-bold whitespace-nowrap">
                              before trade-in
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2">
                          <span className="caption z-[1]">
                            <span id="trigger-v-0-5-0-0">
                              <button className="text-static-default-low cursor-pointer whitespace-nowrap">
                                <span className="text-gray-700 line-through">
                                  <span className="">$629.00</span> new
                                </span>
                              </button>
                            </span>
                          </span>
                          <div className="bg-green-300">
                            <span
                              className="rounded-xs inline-block max-w-full truncate px-1 py-0 font-bold text-sl"
                              title="Save $340.01"
                            >
                              Save $340.01
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      aria-disabled="false"
                      className="bg-black text-white rounded-sm relative select-none no-underline motion-safe:ease-in inline-block w-auto px-4 py-3 hover:no-underline motion-safe:transition-colors motion-safe:duration-200 cursor-pointer border-none min-w-[164px] max-w-[256px] grow hover:bg-gray-800"
                      data-id="product-page-buy-button-desktop"
                      data-qa="product-page-buy-button-desktop"
                      type="button"
                    >
                      <span
                        aria-hidden="false"
                        className="pointer-events-none flex items-center justify-center"
                      >
                        <span className="body-1-bold truncate">
                          Add to cart
                        </span>
                      </span>
                    </button>

                    <button
                      aria-disabled="false"
                      aria-label="Add to Favorites"
                      className="hover:bg-gray-200 rounded-sm relative max-w-full select-none no-underline motion-safe:ease-in inline-flex h-12 items-center justify-center px-3 motion-safe:transition motion-safe:duration-300 cursor-pointer border-solid mx-3 border-2 border-black "
                      data-qa="my-favorites-toggle"
                      type="button"
                    >
                      <span className="pointer-events-none flex items-center">
                        <span className="pointer-events-none flex items-center space-x-8">
                          <span className="body-2-bold pointer-events-none truncate">
                            <svg
                              aria-hidden="true"
                              fill="currentColor"
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                              className="my-8"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.5 4.87a3.75 3.75 0 0 0-3.75 3.75c0 1.14.596 2.126 1.462 2.977l.014.014L12 19.01l6.774-7.4.014-.013c.866-.85 1.462-1.838 1.462-2.977a3.75 3.75 0 0 0-3.75-3.75c-.982 0-1.813.493-2.515 1.077a13.434 13.434 0 0 0-.7.634l-.209.197a4.47 4.47 0 0 1-.4.342C12.578 7.19 12.326 7.37 12 7.37c-.325 0-.578-.18-.676-.25a4.47 4.47 0 0 1-.4-.342L10.716 6.58c-.211-.2-.436-.414-.701-.634C9.313 5.363 8.482 4.87 7.5 4.87M2.25 8.62c0-2.9 2.35-5.25 5.25-5.25 1.503 0 2.672.757 3.474 1.423a15.976 15.976 0 0 1 .8.724A27.034 27.034 0 0 0 12 5.73a9.016 9.016 0 0 0 .226-.213 15.976 15.976 0 0 1 .8-.724c.802-.666 1.97-1.423 3.474-1.423 2.9 0 5.25 2.35 5.25 5.25 0 1.694-.888 3.038-1.896 4.033l-6.932 7.57a1.25 1.25 0 0 1-1.844 0l-6.932-7.57C3.138 11.658 2.25 10.313 2.25 8.62m9.51-2.692s.006-.005.017-.01a.077.077 0 0 1-.017.01m.463-.01a.087.087 0 0 1 .017.01l-.017-.01"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </span>
                      </span>
                    </button>
                  </div>
                  <div className="flex items-center gap-x-4 body-2 text-primary pt-6">
                    <div className="flex flex-wrap items-center gap-4 self-start w-[40px] flex-shrink-0 mr-1 ">
                      <Image
                        alt="Affirm"
                        className="h-auto max-h-full max-w-full leading-none"
                        decoding="async"
                        height="20"
                        loading="lazy"
                        sizes="100vw"
                        src="https://front-office.statics.backmarket.com/9c0fed50e64a2e15e6b5469ecfd36c97597d1517/img/payment/methods-v5/affirm.svg"
                        width="36"
                      />
                    </div>

                    <div className="grow">
                      Buy now, pay later.
                      <div data-test="affirm-modal" className="inline">
                        <a
                          className="px-1"
                          data-affirm-color="black"
                          data-amount="28899"
                          data-learnmore-show="false"
                          data-page-type="product"
                          data-test="affirm-link"
                        ></a>
                        <button
                          aria-label="'Learn more about Affirm payment options"
                          className="rounded-sm font-weight-body-1-link cursor-pointer [text-align:inherit] underline"
                          type="button"
                        >
                          Learn more
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:relative">
                    <div className="gap-4 flex flex-col md:flex-row md:flex-nowrap md:items-center md:overflow-hidden">
                      <button
                        className="bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-full body-2 flex h-9 w-fit max-w-full shrink-0 items-center px-2"
                        type="button"
                      >
                        <div className="mr-8 shrink-0">
                          <svg
                            aria-hidden="true"
                            fill="currentColor"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                            className=""
                          >
                            <path
                              fill-rule="evenodd"
                              d="M7 3.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5M4.75 7a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0"
                              clip-rule="evenodd"
                            ></path>
                            <path d="M13 6.25a.75.75 0 0 0 0 1.5h5.19l-1.72 1.72a.75.75 0 1 0 1.06 1.06l2.647-2.646a1.25 1.25 0 0 0 0-1.768L17.53 3.47a.75.75 0 1 0-1.06 1.06l1.72 1.72H13m-7.19 10H11a.75.75 0 0 1 0 1.5H5.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-2.647-2.646a1.25 1.25 0 0 1 0-1.768L6.47 13.47a.75.75 0 1 1 1.06 1.06l-1.72 1.72"></path>
                            <path
                              fill-rule="evenodd"
                              d="M14.5 13.25a1.25 1.25 0 0 0-1.25 1.25v5a1.25 1.25 0 0 0 1.25 1.25h5a1.25 1.25 0 0 0 1.25-1.25v-5a1.25 1.25 0 0 0-1.25-1.25h-5m.25 6v-4.5h4.5v4.5h-4.5"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <p className="line-clamp-1 overflow-hidden text-ellipsis text-left md:overflow-auto md:text-clip">
                          Get this for even less with Trade-in
                        </p>
                        <svg
                          aria-hidden="true"
                          fill="currentColor"
                          height="24"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="shrink-0"
                        >
                          <path
                            fill-rule="evenodd"
                            d="m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className=" bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-full body-2 flex h-9 w-fit max-w-full shrink-0 items-center px-3"
                        type="button"
                      >
                        <div className="mr-8 shrink-0">
                          <Image
                            alt="Visible by verizon tiny logo"
                            className="h-auto max-h-full max-w-full leading-none"
                            decoding="async"
                            height="20"
                            loading="lazy"
                            sizes="100vw"
                            src="https://front-office.statics.backmarket.com/9c0fed50e64a2e15e6b5469ecfd36c97597d1517/img/visible-by-verizon/visible-by-verizon-logo-tiny.svg"
                            width="20"
                          />
                        </div>
                        <p className="line-clamp-1 overflow-hidden text-ellipsis text-left md:overflow-auto md:text-clip">
                          Save big: $20/month unlimited data
                        </p>
                        <svg
                          aria-hidden="true"
                          fill="currentColor"
                          height="24"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="shrink-0"
                        >
                          <path
                            fill-rule="evenodd"
                            d="m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className="absolute right-0 top-[-2px] z-[1] hidden w-[104px] items-center justify-end md:flex">
                      <button
                        className=" bg-gray-300 rounded-full flex shrink-0 cursor-pointer appearance-none items-center justify-center border-0 no-underline disabled:cursor-not-allowed motion-safe:transition motion-safe:duration-300 motion-safe:ease-in size-10"
                        type="button"
                      >
                        <svg
                          aria-hidden="false"
                          aria-label="View more"
                          fill="currentColor"
                          height="24"
                          role="img"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className=" mb-7 md:mb-8 mt-6">
                    <div className="flex flex-col gap-2">
                      <div className="bg-blue-100 rounded-lg flex flex-row items-center p-2">
                        <div className="mr-2 flex h-10 w-10 shrink-0 items-center justify-center md:h-12 md:w-12">
                          <svg
                            aria-hidden="true"
                            fill="currentColor"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 md:h-8 md:w-8"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 5.5A.75.75 0 0 1 3 4.75h10.5a1.25 1.25 0 0 1 1.225 1h2.966a1.25 1.25 0 0 1 1.118.691l1.655 3.31H20.5A1.25 1.25 0 0 1 21.75 11v5a1.25 1.25 0 0 1-1.25 1.25h-.854a2.751 2.751 0 0 1-5.292 0h-3.207a2.751 2.751 0 0 1-5.293 0H5A1.25 1.25 0 0 1 3.75 16v-5.5a.75.75 0 0 1 1.5 0v5.25h.604a2.751 2.751 0 0 1 5.292 0h2.104v-9.5H3A.75.75 0 0 1 2.25 5.5m18 10.25h-.604a2.751 2.751 0 0 0-4.896-.832V11.25h5.5v4.5m-5.5-6v-2.5h2.787l1.25 2.5H14.75m-7.5 6.75a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0M17 15.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5"
                              clipRule="evenodd"
                            ></path>
                            <path d="M3.5 7.25a.75.75 0 0 0 0 1.5H7a.75.75 0 0 0 0-1.5H3.5"></path>
                          </svg>
                        </div>
                        <div className="flex w-full items-center justify-between text-left">
                          <div className="flex flex-col">
                            <div className="text-xl font-bold">
                              <div>
                                <div>
                                  <span>Free delivery by Aug 6 - Aug 7</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button className=" bg-blue-100 hover:bg-blue-200 cursor-pointer rounded-lg flex flex-row items-center p-2 motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-in w-full">
                        <div className="mr-2 flex h-10 w-10 shrink-0 items-center justify-center md:h-12 md:w-12">
                          <svg
                            aria-hidden="true"
                            fill="currentColor"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 md:h-8 md:w-8"
                          >
                            <path d="M10.25 12.75A.75.75 0 0 1 11 13.5v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75"></path>
                            <path
                              fillRule="evenodd"
                              d="M14.5 6.7c0-1.291 1.166-2.45 2.75-2.45S20 5.409 20 6.7v1.8a.75.75 0 0 0 1.5 0V6.7c0-2.243-1.968-3.95-4.25-3.95C14.967 2.75 13 4.457 13 6.7v2.05H5.75A3.25 3.25 0 0 0 2.5 12v6a3.25 3.25 0 0 0 3.25 3.25h9A3.25 3.25 0 0 0 18 18v-6a3.25 3.25 0 0 0-3.25-3.25H14.5V6.7m-8.75 3.55A1.75 1.75 0 0 0 4 12v6a1.75 1.75 0 0 0 1.75 1.75h9A1.75 1.75 0 0 0 16.5 18v-6a1.75 1.75 0 0 0-1.75-1.75h-9"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex w-full items-center justify-between text-left">
                          <div className="flex flex-col">
                            <div className="font-bold text-xl">
                              <div className="w-full">
                                Works with all carriers
                              </div>
                            </div>
                            <div className="caption">
                              <div className="w-full">
                                This phone is unlocked
                              </div>
                            </div>
                          </div>
                          <div className="ml-2 flex h-10 w-10 items-center">
                            <svg
                              aria-hidden="true"
                              fill="currentColor"
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-24 w-full"
                            >
                              <path
                                fillRule="evenodd"
                                d="m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </button>

                      <button className="bg-blue-100 hover:bg-blue-200 cursor-pointer rounded-lg flex flex-row items-center p-2 motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-in">
                        <div className="mr-2 flex h-10 w-10 shrink-0 items-center justify-center md:h-12 md:w-12">
                          <svg
                            aria-hidden="true"
                            fill="currentColor"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 md:h-6 md:w-6"
                          >
                            <path d="M17.53 8.54a.75.75 0 0 0-1.06-1.061L11 12.949l-2.47-2.47a.75.75 0 0 0-1.06 1.06l2.646 2.647a1.25 1.25 0 0 0 1.768 0l5.646-5.647"></path>
                            <path
                              fillRule="evenodd"
                              d="M4.5 2.759a1.25 1.25 0 0 0-1.25 1.25V8.73c0 9.392 7.29 12.1 8.395 12.455a1.147 1.147 0 0 0 .71 0C13.46 20.83 20.75 18.122 20.75 8.73V4.01a1.25 1.25 0 0 0-1.25-1.25h-15m.25 5.97V4.26h14.5v4.47c0 8.106-6.024 10.573-7.25 10.992-1.226-.419-7.25-2.886-7.25-10.992"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex w-full items-center justify-between text-left">
                          <div className="flex flex-col">
                            <div className="font-bold text-xl">
                              <div>Free 30-day returns</div>
                              <div>1-year warranty</div>
                            </div>
                            <div className="caption"></div>
                          </div>
                          <div className="ml-2 flex h-10 w-10 items-center">
                            <svg
                              aria-hidden="true"
                              fill="currentColor"
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-24 w-full"
                            >
                              <path
                                fillRule="evenodd"
                                d="m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </button>

                      <button className="bg-blue-100 cursor-pointer hover:bg-blue-200 rounded-lg flex flex-row items-center p-2 motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-in">
                        <div className="mr-2 flex h-10 w-10 shrink-0 items-center justify-center md:h-12 md:w-12">
                          <svg
                            aria-hidden="true"
                            fill="currentColor"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 md:h-8 md:w-8"
                          >
                            <path d="M16.548 9.512a.75.75 0 1 0-1.096-1.024L10.4 13.901l-1.852-1.984a.75.75 0 0 0-1.096 1.023l2.034 2.18a1.25 1.25 0 0 0 1.828 0l5.234-5.608"></path>
                            <path
                              fillRule="evenodd"
                              d="M13.764 3.401c-.993-1.535-3.24-1.535-4.233 0A1.021 1.021 0 0 1 8.306 3.8C6.6 3.141 4.782 4.462 4.88 6.288A1.021 1.021 0 0 1 4.124 7.33C2.357 7.8 1.662 9.937 2.816 11.356a1.021 1.021 0 0 1 0 1.288c-1.154 1.42-.46 3.556 1.308 4.026a1.021 1.021 0 0 1 .757 1.042C4.782 19.538 6.6 20.86 8.306 20.201a1.021 1.021 0 0 1 1.225.398c.993 1.535 3.24 1.535 4.233 0A1.021 1.021 0 0 1 14.99 20.2c1.706.658 3.523-.663 3.425-2.489a1.021 1.021 0 0 1 .757-1.042c1.767-.47 2.461-2.607 1.308-4.026a1.021 1.021 0 0 1 0-1.288c1.153-1.42.46-3.556-1.308-4.026a1.021 1.021 0 0 1-.757-1.042c.098-1.826-1.719-3.147-3.425-2.489A1.021 1.021 0 0 1 13.765 3.4M10.79 4.216a1.021 1.021 0 0 1 1.715 0A2.521 2.521 0 0 0 15.529 5.2a1.021 1.021 0 0 1 1.387 1.008 2.521 2.521 0 0 0 1.869 2.572 1.021 1.021 0 0 1 .53 1.631 2.521 2.521 0 0 0 0 3.18 1.021 1.021 0 0 1-.53 1.63 2.521 2.521 0 0 0-1.869 2.573 1.021 1.021 0 0 1-1.387 1.008 2.521 2.521 0 0 0-3.024.983 1.021 1.021 0 0 1-1.715 0A2.521 2.521 0 0 0 7.766 18.8a1.021 1.021 0 0 1-1.387-1.008 2.521 2.521 0 0 0-1.87-2.572 1.021 1.021 0 0 1-.53-1.631 2.521 2.521 0 0 0 0-3.18 1.021 1.021 0 0 1 .53-1.63 2.521 2.521 0 0 0 1.87-2.573 1.021 1.021 0 0 1 1.387-1.008 2.521 2.521 0 0 0 3.024-.983"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex w-full items-center justify-between text-left">
                          <div className="flex flex-col">
                            <div className="font-bold text-xl">
                              Verified Refurbished
                            </div>
                            <div className="caption"></div>
                          </div>
                          <div className="ml-2 flex h-10 w-10 items-center">
                            <svg
                              aria-hidden="true"
                              fill="currentColor"
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-24 w-full"
                            >
                              <path
                                fillRule="evenodd"
                                d="m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        

        {/* often bougth section */}
        <div className="">
          <div className="max-w-7xl mx-auto p-8 sm:px-6 lg:px-8 ">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Often bought together</h2>
            <div className="bg-white border border-gray-200 rounded-lg py-6 flex flex-row items-center">
              <div className="flex flex-col w-2/3 grow md:gap-8 lg:flex-row items-stretch justify-center">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6 lg:mb-0">
                  <div className='flex w-[200px] flex-col items-center lg:w-[254px]'>
                    <div className="flex h-full items-center gap-4 md:flex-col md:gap-8 md:px-8 md:py-10">
                      <div className="shrink-0">
                        <Image
                          fetchPriority="high"
                          className="rounded-lg block w-auto md:!h-auto md:w-full lg:w-[29.125rem] h-auto max-h-full max-w-full leading-none"
                          alt="iPhone 13 128GB - Pink - Unlocked"
                          decoding="async"
                          height="132"
                          loading="eager"
                          sizes="(max-width: 768px) 100vw, 466px"
                          src="https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg"
                          width="132"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">iPhone 13</h3>
                        <p className="text-sm text-gray-600">128 GB - Pink - Unlocked</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-lg font-bold text-gray-900">£431.00</span>
                          <span className="text-sm text-gray-500 line-through">£799.00 new</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-16">
                    <svg
                      aria-hidden="true"
                      fill="currentColor"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-24 w-24"
                      >
                      <path
                        fillRule="evenodd"
                        d="M12.75 6a.75.75 0 0 0-1.5 0v5.25H6a.75.75 0 0 0 0 1.5h5.25V18a.75.75 0 0 0 1.5 0v-5.25H18a.75.75 0 0 0 0-1.5h-5.25V6"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>

                  <div className='flex w-[200px] flex-col items-center lg:w-[254px]'>
                    <div className="flex h-full items-center gap-4 md:flex-col md:gap-8 md:px-8 md:py-10">
                      <div className="shrink-0">
                        <Image
                          fetchPriority="high"
                          className="rounded-lg block w-auto md:!h-auto md:w-full lg:w-[29.125rem] h-auto max-h-full max-w-full leading-none"
                          alt="iPhone 13 128GB - Pink - Unlocked"
                          decoding="async"
                          height="132"
                          loading="eager"
                          sizes="(max-width: 768px) 100vw, 466px"
                          src="https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg"
                          width="132"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Case iPhone 15 Plus and 2 protective screens - TPU -...</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-lg font-bold text-gray-900">£23.99</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-right flex flex-col w-1/3 grow p-6 place-items-center justify-center">
                  <div className="text-lg font-bold text-xl text-gray-900 mb-4">Total price: £454.99</div>
                  <button
                    aria-disabled="false"
                    className="bg-black text-white rounded-sm relative select-none no-underline motion-safe:ease-in inline-block w-auto px-4 py-3 hover:no-underline motion-safe:transition-colors motion-safe:duration-200 cursor-pointer border-none min-w-[164px] max-w-[256px] grow hover:bg-gray-800"
                    data-id="product-page-buy-button-desktop"
                    data-qa="product-page-buy-button-desktop"
                    type="button"
                  >
                    <span
                      aria-hidden="false"
                      className="pointer-events-none flex items-center justify-center"
                    >
                      <span className="body-1-bold text-xl truncate">
                        Add both to cart
                      </span>
                    </span>
                  </button>
                  <div className="mt-4 text-static-info-hi text-gray-500 flex items-center md:max-w-[190px]">
                    <span>These items might be sold and delivered by different sellers 🚛</span>
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* You may also like Section */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <Image
                    src="/assets/images/Iphone13.avif"
                    alt="iPhone 14"
                    width={192}
                    height={192}
                    className="h-auto max-h-full max-w-full leading-none"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">iPhone 14</h3>
                <p className="text-sm text-gray-600 mb-2">Midnight · 128 GB · Physical SIM + eSIM</p>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">4.5/5 (16490)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">£263.00</span>
                  <span className="text-sm text-gray-500 line-through">£599.00 new</span>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <Image
                    src="/assets/images/Iphone13.avif"
                    alt="iPhone 14"
                    width={192}
                    height={192}
                    className="h-auto max-h-full max-w-full leading-none"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">iPhone 14</h3>
                <p className="text-sm text-gray-600 mb-2">Midnight · 128 GB · Physical SIM + eSIM</p>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">4.5/5 (16490)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">£263.00</span>
                  <span className="text-sm text-gray-500 line-through">£599.00 new</span>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <Image
                    src="/assets/images/Iphone13.avif"
                    alt="iPhone 14"
                    width={192}
                    height={192}
                    className="h-auto max-h-full max-w-full leading-none"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">iPhone 14</h3>
                <p className="text-sm text-gray-600 mb-2">Midnight · 128 GB · Physical SIM + eSIM</p>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">4.5/5 (16490)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">£263.00</span>
                  <span className="text-sm text-gray-500 line-through">£599.00 new</span>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <Image
                    src="/assets/images/Iphone13.avif"
                    alt="iPhone 14"
                    width={192}
                    height={192}
                    className="h-auto max-h-full max-w-full leading-none"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">iPhone 14</h3>
                <p className="text-sm text-gray-600 mb-2">Midnight · 128 GB · Physical SIM + eSIM</p>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">4.5/5 (16490)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">£263.00</span>
                  <span className="text-sm text-gray-500 line-through">£599.00 new</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product bla bla bla bla Tabs */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Pairs well with</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <Image
                    src="/assets/images/Iphone13.avif"
                    alt="iPhone 14"
                    width={192}
                    height={192}
                    className="h-auto max-h-full max-w-full leading-none"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">iPhone 14</h3>
                <p className="text-sm text-gray-600 mb-2">Midnight · 128 GB · Physical SIM + eSIM</p>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">4.5/5 (12099)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">£391.00</span>
                  <span className="text-sm text-gray-500 line-through">£1,099.00 new</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">iPhone 13 - Unlocked: customer reviews</h2>
            <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={24}
                        className={`${
                          i < 4 ? 'text-black fill-current mr-1' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-2xl text-black font-medium">
                      4.6/5 (38 verified reviews in the last 24 months.)
                    </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">

              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ProductPage;
