import React, { useState } from 'react';
import {
  ChevronDown,
  Mail,
  Linkedin,
  Facebook,
  Instagram,
  XCircle,
} from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  // Kiểm tra lỗi email đơn giản
  const isEmailError = touched && email && !email.includes('@');

  const footerSections = [
    {
      title: 'About',
      links: [
        { label: 'About us', href: '/about' },
        { label: 'Press', href: '/press' },
        { label: 'Our impact', href: '/impact' },
        { label: "We're hiring!", href: '/careers' },
        { label: 'Trustpilot', href: '/trustpilot' },
      ],
    },
    {
      title: 'Help',
      links: [
        { label: 'Contact us', href: '/contact' },
        { label: 'Help Center', href: '/help' },
        { label: 'Delivery', href: '/delivery' },
        { label: 'Returns and refunds', href: '/returns' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Commercial warranty', href: '/commercial-warranty' },
        { label: 'Insurances', href: '/insurances' },
        { label: 'Sell old tech', href: '/sell' },
        { label: 'Student offer', href: '/student' },
        { label: 'Sellers: Register to sell', href: '/seller-register' },
        { label: 'Seller portal', href: '/seller-portal' },
        { label: 'Payments 100% secured', href: '/payments' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Tech Journal', href: '/tech-journal' },
        { label: 'Compare devices', href: '/compare' },
        { label: 'Gift ideas', href: '/gifts' },
      ],
    },
    {
      title: 'Law and order',
      links: [
        { label: 'Terms of Use', href: '/terms' },
        { label: 'Terms of Sale', href: '/terms-sale' },
        { label: 'Trade-in Terms and Conditions', href: '/trade-in-terms' },
        { label: 'Cookies and privacy settings', href: '/cookies' },
        { label: 'Data protection', href: '/data-protection' },
        { label: 'Other legal information', href: '/legal' },
        { label: 'Legal notices', href: '/legal-notices' },
        { label: 'Report illicit content', href: '/report' },
      ],
    },
  ];

  const paymentMethods = [
    { name: 'Visa', logo: '/api/placeholder/40/24' },
    { name: 'Mastercard', logo: '/api/placeholder/40/24' },
    { name: 'American Express', logo: '/api/placeholder/40/24' },
    { name: 'PayPal', logo: '/api/placeholder/40/24' },
    { name: 'Maestro', logo: '/api/placeholder/40/24' },
    { name: 'Apple Pay', logo: '/api/placeholder/40/24' },
    { name: 'Google Pay', logo: '/api/placeholder/40/24' },
    { name: 'Klarna', logo: '/api/placeholder/40/24' },
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
  };

  return (
    <footer className='bg-gray-50 border-t border-gray-200'>
      {/* Newsletter Section */}
      <div className='bg-white border-b border-gray-200'>
        <div className='flex flex-col md:flex-row justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-x-8'>
          <div className='mb-4 md:mb-0'>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              Get £15 off your first order.
            </h3>
            <p className='text-gray-600'>
              On orders of £250 or more, when you sign up for emails.
            </p>
          </div>
          <div className='px-30 flex-shrink-0'>
            <form
              onSubmit={handleEmailSubmit}
              className='flex gap-2 w-80 md:w-auto'
            >
              <div className='relative'>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                    setIsFocused(false);
                    setTouched(true);
                  }}
                  id='footer-email'
                  className={`
                    w-80 md:w-96 px-4 pt-5 pb-2 border-3 rounded-lg  hover:bg-gray-200
                    placeholder-transparent peer
                    ${isEmailError ? ' border-red-400' : 'border-gray-900'}
                  `}
                  placeholder='Email'
                  required
                />
                <label
                  htmlFor='footer-email'
                  className={`
                    absolute left-3 px-1 -translate-y-1/5 transition-all duration-200
                    pointer-events-none
                    max-w-[calc(100%-2.5rem)] overflow-hidden whitespace-nowrap
                    text-base text-black
                    ${email || isFocused ? 'top-2 text-xs text-gray-700' : 'top-5'}
                  `}
                >
                  Email
                </label>
                {email ? (
                  <button
                    type='button'
                    onClick={() => setEmail('')}
                    className='absolute right-3 top-4.5 h-5 w-5 flex items-center justify-center text-gray-800 transition-colors
                              border-2 hover:border-gray-600 rounded-full cursor-pointer'
                    tabIndex={-1}
                    aria-label='Xóa email'
                  >
                    <XCircle className='h-5 w-5' />
                  </button>
                ) : (
                  <Mail className='absolute right-3 top-4.5 h-5 w-5 text-gray-800' />
                )}
              </div>
              <button
                type='submit'
                className='px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-bold cursor-pointer'
              >
                Sign up
              </button>
            </form>
            {/* Nút Learn more và phần ghi chú đặt ngay dưới form */}
            <button
              onClick={() => setShowLearnMore(!showLearnMore)}
              className='flex items-center text-sm font-bold underline text-gray-900 cursor-pointer transition-colors mt-2'
            >
              <ChevronDown
                className={`h-4 w-4 mr-1 transition-transform ${showLearnMore ? 'rotate-180' : ''}`}
              />
              Learn more
            </button>
            {showLearnMore && (
              <div className='mt-2 p-4 bg-gray-50 rounded-lg text-sm text-gray-600 w-124'>
                <p>
                  Terms and conditions apply. Discount valid for new subscribers
                  only. Minimum order value £250. Cannot be combined with other
                  offers.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8'>
          {footerSections.map((section, index) => (
            <div key={index} className={index === 4 ? 'lg:col-span-2' : ''}>
              <h4 className='text-sm font-semibold text-gray-900 mb-4'>
                {section.title}
              </h4>
              <ul className='space-y-3'>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className='text-sm text-gray-600 hover:text-gray-900 transition-colors'
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* B-Corp Certification */}
          <div className='flex justify-center lg:justify-end'>
            <div className='w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center'>
              <div className='text-center'>
                <div className='w-12 h-12 border-2 border-gray-400 rounded-full flex items-center justify-center mb-1'>
                  <span className='text-lg font-bold text-gray-600'>B</span>
                </div>
                <p className='text-xs text-gray-500'>Certified</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className='mt-8 pt-8 border-t border-gray-200'>
          <div className='flex items-center justify-between'>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='p-2 bg-gray-600 rounded-full hover:bg-gray-700 transition-colors'
              >
                <Linkedin className='h-4 w-4 text-white' />
              </a>
              <a
                href='#'
                className='p-2 bg-gray-600 rounded-full hover:bg-gray-700 transition-colors'
              >
                <Facebook className='h-4 w-4 text-white' />
              </a>
              <a
                href='#'
                className='p-2 bg-gray-600 rounded-full hover:bg-gray-700 transition-colors'
              >
                <Instagram className='h-4 w-4 text-white' />
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className='mt-8'>
          <div className='flex flex-wrap gap-3'>
            {/* Payment Method Icons */}
            <div className='flex items-center gap-2'>
              <div className='w-12 h-8 bg-blue-600 rounded flex items-center justify-center'>
                <span className='text-white text-xs font-bold'>VISA</span>
              </div>
              <div className='w-12 h-8 bg-red-500 rounded flex items-center justify-center'>
                <span className='text-white text-xs font-bold'>MC</span>
              </div>
              <div className='w-12 h-8 bg-blue-500 rounded flex items-center justify-center'>
                <span className='text-white text-xs font-bold'>AMEX</span>
              </div>
              <div className='w-12 h-8 bg-blue-400 rounded flex items-center justify-center'>
                <span className='text-white text-xs font-bold'>PP</span>
              </div>
              <div className='w-12 h-8 bg-red-600 rounded flex items-center justify-center'>
                <span className='text-white text-xs font-bold'>M</span>
              </div>
              <div className='w-12 h-8 bg-black rounded flex items-center justify-center'>
                <span className='text-white text-xs font-bold'>PAY</span>
              </div>
              <div className='w-12 h-8 bg-gray-600 rounded flex items-center justify-center'>
                <span className='text-white text-xs font-bold'>GP</span>
              </div>
              <div className='w-12 h-8 bg-pink-500 rounded flex items-center justify-center'>
                <span className='text-white text-xs font-bold'>K</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-12 pt-8 border-t border-gray-200'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='text-sm text-gray-600 mb-4 md:mb-0'>
              © 2025 Back Market
            </div>

            {/* App Download Links */}
            <div className='flex space-x-4'>
              <a href='#' className='inline-block'>
                <div className='bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2'>
                  <div className='text-xs'>
                    <div className='text-white'>GET IT ON</div>
                    <div className='font-bold'>Google Play</div>
                  </div>
                </div>
              </a>
              <a href='#' className='inline-block'>
                <div className='bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2'>
                  <div className='text-xs'>
                    <div className='text-white'>Download on the</div>
                    <div className='font-bold'>App Store</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
