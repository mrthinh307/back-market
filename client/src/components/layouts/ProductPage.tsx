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

  const storageOptions = ['64GB', '128GB', '256GB', '512GB'];

  const specifications = [
    { label: 'Screen size', value: '6.1 inches' },
    { label: 'Display', value: 'Super Retina XDR OLED' },
    { label: 'Processor', value: 'A15 Bionic chip' },
    { label: 'Camera', value: '12MP dual camera system' },
    { label: 'Battery life', value: 'Up to 17 hours video playback' },
    { label: 'Water resistance', value: 'IP68' },
    { label: 'Operating system', value: 'iOS 15' },
  ];

  const features = [
    'Face ID for secure authentication',
    'Dual camera system with Portrait mode',
    'A15 Bionic chip for lightning-fast performance',
    'All-day battery life',
    'Durable design with Ceramic Shield front',
    '5G capable for super-fast downloads',
  ];

  const selectedConditionData = conditionOptions.find(
    (opt) => opt.id === selectedCondition,
  );

  return (
    <div className="bg-white">
      <div className="flex justify-center bg-surface-default-low pb-18 md:pb-48">
        <div className="max-w-full grow px-24 lg:max-w-[1184px] lg:basis-full lg:px-32">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="bg-surface-default-low hidden md:block"
          >
            <ol className="m-0 flex list-none items-center py-12 md:py-20">
              <li
                className="text-action-default-hi md:flex md:shrink-0 hidden"
                itemProp="itemListElement"
                itemScope
                itemType=""
              >
                <a
                  href="/"
                  className="flex items-center whitespace-nowrap text-action-default-hi focus-visible-outline-default-hi rounded-sm font-weight-body-1-link cursor-pointer [text-align:inherit] hover:text-action-default-hi-hover no-underline hover:underline"
                >
                  <span className="body-2-bold truncate" itemProp="name">
                    Home
                  </span>
                </a>
                <svg
                  aria-hidden="true"
                  className="hidden md:mx-8 md:block"
                  fill="currentColor"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path
                    fillRule="evenodd"
                    d="m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <meta content="1" itemProp="position"></meta>
              </li>

              <li
                className="text-action-default-hi md:flex md:shrink-0 hidden"
                itemProp="itemListElement"
                itemScope
                itemType=""
              >
                <a
                  href="/"
                  className="flex items-center whitespace-nowrap text-action-default-hi focus-visible-outline-default-hi rounded-sm font-weight-body-1-link cursor-pointer [text-align:inherit] hover:text-action-default-hi-hover no-underline hover:underline"
                >
                  <span className="body-2-bold truncate" itemProp="name">
                    Smartphones
                  </span>
                </a>
                <svg
                  aria-hidden="true"
                  className="hidden md:mx-8 md:block"
                  fill="currentColor"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path
                    fillRule="evenodd"
                    d="m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <meta content="1" itemProp="position"></meta>
              </li>

              <li
                className="text-action-default-hi md:flex md:shrink-0 hidden"
                itemProp="itemListElement"
                itemScope
                itemType=""
              >
                <a
                  href="/"
                  className="flex items-center whitespace-nowrap text-action-default-hi focus-visible-outline-default-hi rounded-sm font-weight-body-1-link cursor-pointer [text-align:inherit] hover:text-action-default-hi-hover no-underline hover:underline"
                >
                  <span className="body-2-bold truncate" itemProp="name">
                    Iphone
                  </span>
                </a>
                <svg
                  aria-hidden="true"
                  className="hidden md:mx-8 md:block"
                  fill="currentColor"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path
                    fillRule="evenodd"
                    d="m13.043 12-3.47 3.47a.75.75 0 1 0 1.06 1.06l3.647-3.646a1.25 1.25 0 0 0 0-1.768L10.634 7.47a.75.75 0 0 0-1.06 1.06L13.042 12"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <meta content="1" itemProp="position"></meta>
              </li>

              <li
                className="text-action-default-hi md:flex min-w-[6ch] hidden"
                itemScope
                itemProp="itemListElement"
                itemType=""
              >
                <div
                  aria-current="page"
                  className="body-2 truncate"
                  itemProp="name"
                >
                  iPhone 13 128GB - Pink - Unlocked
                </div>
                <meta content="4" itemProp="name"></meta>
              </li>
            </ol>
          </nav>

          {/* Product Images */}
          <div className="flex flex-col flex-wrap items-center md:flex-row md:flex-nowrap">
            {/* Main Image */}
            <div className="relative w-full max-w-full grow-0 md:w-1/3 lg:w-1/2">
              <div className="top-[7rem] md:sticky md:right-1/2 md:mr-56">
                <div>
                  <div className="flex justify-center" data-test="carousel">
                    <div className="relative -mb-4 flex min-h-72 flex-col flex-wrap overflow-hidden mt-12 md:mt-32 md:grow">
                      <div className="relative flex w-full grow justify-center">
                        <ul className="w-full list-none">
                          <li
                            aria-hidden="false"
                            className="flex w-full list-none justify-center motion-safe:animate-fade-in block"
                            id="gallery-carousel"
                          >
                            <button
                              className="relative focus-visible-outline-inset-hi rounded-sm cursor-pointer"
                              type="button"
                            >
                              <Image
                                fetchPriority="high"
                                className="rounded-lg block !h-[66.7vw] max-h-full w-auto md:!h-auto md:w-full lg:w-[29.125rem] h-auto max-h-full max-w-full leading-none"
                                alt="iPhone 13 128GB - Pink - Unlocked"
                                height="976"
                                width={976}
                                decoding="async"
                                sizes="(max-width: 768px) 100vw, 466px"
                                src="/assets/images/Iphone13.avif"
                              ></Image>
                            </button>
                          </li>
                        </ul>
                      </div>

                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Product Title & Rating */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                iPhone 13 - Unlocked
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    4.2 (1,247 reviews)
                  </span>
                </div>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <Share2 size={16} />
                  <span className="text-sm">Share</span>
                </button>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <Shield size={16} />
                  <span>12-month warranty</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <Truck size={16} />
                  <span>Free delivery</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <RotateCcw size={16} />
                  <span>30-day returns</span>
                </div>
              </div>
            </div>

            {/* Storage Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Storage
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {storageOptions.map((storage) => (
                  <button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                      selectedStorage === storage
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Condition
              </h3>
              <div className="space-y-3">
                {conditionOptions.map((condition) => (
                  <div
                    key={condition.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedCondition === condition.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedCondition(condition.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              selectedCondition === condition.id
                                ? 'border-green-500 bg-green-500'
                                : 'border-gray-300'
                            }`}
                          >
                            {selectedCondition === condition.id && (
                              <Check size={10} className="text-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {condition.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {condition.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">
                          £{condition.price}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500 line-through">
                            £{condition.originalPrice}
                          </span>
                          <span className="text-sm text-green-600 font-medium">
                            Save £{condition.savings}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {condition.available} available
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mb-8">
              <button className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-green-700 transition-colors mb-4">
                Add to cart - £{selectedConditionData?.price}
              </button>
              <p className="text-center text-sm text-gray-600">
                Free delivery • Ready to ship in 1-2 days
              </p>
            </div>

            {/* Product Highlights */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Why choose this iPhone?
              </h3>
              <ul className="space-y-2">
                {features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check
                      size={16}
                      className="text-green-500 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['overview', 'specs', 'condition', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'overview' && (
              <div className="max-w-4xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Product Overview
                </h3>
                <p className="text-gray-600 mb-6">
                  The iPhone 13 features a beautiful 6.1-inch Super Retina XDR
                  display, the powerful A15 Bionic chip, and an advanced
                  dual-camera system for incredible photos and videos. With its
                  durable design and all-day battery life, it's the perfect
                  smartphone for everyday use.
                </p>

                <h4 className="text-lg font-medium text-gray-900 mb-3">
                  Key Features
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check
                        size={16}
                        className="text-green-500 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-4xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Technical Specifications
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-3 border-b border-gray-200"
                    >
                      <span className="font-medium text-gray-900">
                        {spec.label}
                      </span>
                      <span className="text-gray-600">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'condition' && (
              <div className="max-w-4xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Understanding Our Conditions
                </h3>
                <div className="space-y-6">
                  {conditionOptions.map((condition) => (
                    <div
                      key={condition.id}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      <h4 className="text-lg font-medium text-gray-900 mb-2">
                        {condition.name}
                      </h4>
                      <p className="text-gray-600 mb-4">
                        {condition.description}
                      </p>
                      <div className="text-sm text-gray-500">
                        <p>• All devices are fully functional</p>
                        <p>• Comes with 12-month warranty</p>
                        <p>• 30-day return policy</p>
                        <p>• Professional quality check performed</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-4xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Customer Reviews
                </h3>
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={`${
                                i < 4
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium text-gray-900">
                          John D.
                        </span>
                        <span className="text-sm text-gray-500">
                          Excellent condition
                        </span>
                      </div>
                      <p className="text-gray-600">
                        Great phone in excellent condition. Exactly as described
                        and arrived quickly. Very happy with my purchase from
                        Back Market.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Often bought together Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Often bought together</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6 lg:mb-0">
                {/* First Product */}
                <div className="flex items-center space-x-4">
                  <div className="w-48 h-48 rounded-lg flex items-center justify-center">
                    <Image
                      src="/assets/images/Iphone13.avif"
                      alt="iPhone 15 Plus"
                      width={216}
                      height={216}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">iPhone 15 Plus</h3>
                    <p className="text-sm text-gray-600">128 GB - Pink - Unlocked</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-lg font-bold text-gray-900">£431.00</span>
                      <span className="text-sm text-gray-500 line-through">£799.00 new</span>
                    </div>
                  </div>
                </div>

                <div className="text-2xl font-bold text-gray-400">+</div>

                <div className="flex items-center space-x-4">
                  <div className="w-48 h-48 rounded-lg flex items-center justify-center">
                    <Image
                      src="/assets/images/Iphone13.avif"
                      alt="Case iPhone 15 Plus"
                      width={216}
                      height={216}
                      className="rounded-lg object-cover"
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

              <div className="text-center lg:text-right">
                <div className="text-lg font-bold text-gray-900 mb-2">Total price: £454.99</div>
                <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  Add both to cart
                </button>
                <div className="flex items-center justify-center lg:justify-end space-x-1 mt-2 text-sm text-gray-500">
                  <Truck size={14} />
                  <span>These items might be sold and delivered by different sellers</span>
                </div>
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
            {/* iPhone 14 */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <Image
                  src="/assets/images/Iphone13.avif"
                  alt="iPhone 14"
                  width={192}
                  height={192}
                  className="rounded-lg object-cover"
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
                  className="rounded-lg object-cover"
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
                  className="rounded-lg object-cover"
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
                  className="rounded-lg object-cover"
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
            {/* iPhone 14 */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <Image
                  src="/assets/images/Iphone13.avif"
                  alt="iPhone 14"
                  width={192}
                  height={192}
                  className="rounded-lg object-cover"
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
  );
};

export default ProductPage;
