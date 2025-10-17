'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import Input from '@/components/form/FormInput';
import { mailBoxIcon } from '@/public/assets/images';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showLearnMore, setShowLearnMore] = useState(false);

  const footerSections = [
    {
      title: 'About',
      links: [
        { label: 'About us', href: '/about' },
        { label: 'Press', href: '/press' },
        { label: 'Our impact', href: '/impact' },
        { label: `We're hiring!`, href: '/careers' },
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
        { label: 'Commercial warranty', href: '/warranty' },
        { label: 'Insurances', href: '/insurance' },
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
        { label: 'Tech Journal', href: '/tech-talk' },
        { label: 'Compare devices', href: '/compare' },
        { label: 'Gift ideas', href: '/gifts' },
      ],
    },
    {
      title: 'Law and order',
      links: [
        { label: 'Terms of Use', href: '/terms' },
        { label: 'Terms of Sale', href: '/terms-sale' },
        { label: 'Trade-in Terms and Conditions', href: '/sell-terms' },
        { label: 'Cookies and privacy settings', href: '/cookies' },
        { label: 'Data protection', href: '/privacy' },
        { label: 'Other legal information', href: '/legal' },
        { label: 'Legal notices', href: '/impressum' },
        { label: 'Report illicit content', href: '/report' },
      ],
    },
  ];

  const paymentMethods = [
    { src: '/assets/images/Visa.png', alt: 'Visa' },
    { src: '/assets/images/Mastercard.png', alt: 'Mastercard' },
    { src: '/assets/images/ApplePay.png', alt: 'Apple Pay' },
    {
      src: '/assets/images/GooglePay.png',
      alt: 'Google Pay',
      bg: 'bg-green-50',
    },
    { src: '/assets/images/Klarna.png', alt: 'Klarna' },
    { src: '/assets/images/Paypal.jpg', alt: 'PayPal' },
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <footer className='bg-background-secondary'>
      {/* Newsletter Section */}
      <div className='border-b border-border'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
            <div className='flex-1 lg:max-w-md'>
              <h3 className='text-xl lg:text-2xl font-semibold mb-2'>
                Get £15 off your first order.
              </h3>
              <p className='text-muted'>
                On orders of £250 or more, when you sign up for emails.
              </p>
            </div>

            <div className='flex-1 lg:max-w-lg'>
              <form
                onSubmit={handleEmailSubmit}
                className='flex flex-col sm:flex-row gap-3'
              >
                <div className='flex-1'>
                  <Input
                    label='Email address'
                    icon={mailBoxIcon}
                    value={email}
                    onChange={handleEmailChange}
                    className='w-full'
                  />
                </div>
                <Button type='submit' className='whitespace-nowrap'>
                  Sign up
                </Button>
              </form>

              <button
                type='button'
                onClick={() => setShowLearnMore(!showLearnMore)}
                className='flex items-center text-sm font-medium underline cursor-pointer transition-colors mt-3 md:mt-0'
              >
                <ChevronDown
                  className={`h-4 w-4 mr-1 transition-transform ${showLearnMore ? 'rotate-180' : ''}`}
                />
                Learn more
              </button>

              {showLearnMore && (
                <div className='mt-3 p-4 bg-muted-secondary rounded-sm text-sm'>
                  <p>
                    Terms and conditions apply. Discount valid for new
                    subscribers only. Minimum order value £250. Cannot be
                    combined with other offers.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12'>
          {footerSections.map((section, index) => (
            <div
              key={index}
              className={`
                ${index === 4 ? 'lg:col-span-2 md:col-span-2' : 'lg:col-span-1 md:col-span-1'}
              `}
            >
              <h4 className='text-lg font-semibold mb-2'>
                {section.title}
              </h4>
              <ul className='space-y-2'>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className='text-sm text-muted hover:text-foreground transition-colors block'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social Media Icons - Über uns section */}
              {index === 0 && (
                <div className='flex gap-2 mt-4'>
                  <Link
                    href='#'
                    className='p-2 bg-muted rounded-full hover:bg-muted-foreground transition-colors w-fit'
                    aria-label='Twitter'
                  >
                    <Twitter className='h-4 w-4 text-background-secondary' />
                  </Link>
                  <Link
                    href='#'
                    className='p-2 bg-muted rounded-full hover:bg-muted-foreground transition-colors w-fit'
                    aria-label='LinkedIn'
                  >
                    <Linkedin className='h-4 w-4 text-background-secondary' />
                  </Link>
                  <Link
                    href='#'
                    className='p-2 bg-muted rounded-full hover:bg-muted-foreground transition-colors w-fit'
                    aria-label='Facebook'
                  >
                    <Facebook className='h-4 w-4 text-background-secondary' />
                  </Link>
                  <Link
                    href='#'
                    className='p-2 bg-muted rounded-full hover:bg-muted-foreground transition-colors w-fit'
                    aria-label='Instagram'
                  >
                    <Instagram className='h-4 w-4 text-background-secondary' />
                  </Link>
                </div>
              )}

              {/* Payment Methods - Services section */}
              {index === 2 && (
                <div className='mt-6'>
                  <div className='flex flex-wrap gap-2 max-w-xs'>
                    {paymentMethods.map((payment, idx) => (
                      <div
                        key={idx}
                        className={`w-12 h-8 ${payment.bg || 'bg-background'} rounded border border-border flex items-center justify-center p-1`}
                      >
                        <Image
                          src={payment.src}
                          alt={payment.alt}
                          height={0}
                          width={0}
                          sizes='100vw'
                          className='object-contain w-8 h-auto'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className='mt-12 pt-8 border-t border-border'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
            <div className='text-center md:text-left'>
              <p className='text-sm text-muted font-medium'>
                © 2025 Back Market
              </p>
            </div>

            {/* App Download Links */}
            <div className='flex justify-center md:justify-end gap-4'>
              <Link href='#' className='block hover:opacity-80 transition-opacity'>
                <Image
                  src='/assets/images/GooglePlay.svg'
                  alt='Download on Google Play'
                  height={40}
                  width={135}
                />
              </Link>
              <Link href='#' className='block hover:opacity-80 transition-opacity'>
                <Image
                  src='/assets/images/apple-store.svg'
                  alt='Download on App Store'
                  height={40}
                  width={120}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
