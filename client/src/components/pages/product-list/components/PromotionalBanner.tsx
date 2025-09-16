import Image from 'next/image';
import { useIsMobile } from '@/hooks/use-mobile';

interface PromotionalBannerProps {
  src: string;
  alt: string;
  className?: string;
}

interface ResponsiveBannerProps {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  className?: string;
}

// Predefined banner configurations with responsive URLs
const BANNER_CONFIGS = {
  earthMonth: {
    desktop: 'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D1920/https://search.statics.backmarket.com/Banners/LP+banners+UK/EarthMonth_PLP_Banners_Desktop_US.jpg',
    mobile: 'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D750/https://search.statics.backmarket.com/Banners/LP+banners+UK/EarthMonth_PLP_Banners_CardDesktop_US.jpg',
    alt: 'Earth Month - Sustainable Tech for a Better Planet',
  },
  backForum: {
    desktop: 'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D1920/https://images.ctfassets.net/mmeshd7gafk1/1BhuBHTwdn4CGayQsC8mZc/8be8369fbe4634fafe3c9452e82d4770/BackForum_HP-Banner_Desktop_US.jpg',
    mobile: 'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D750/https://images.ctfassets.net/mmeshd7gafk1/77HA31xnU3icLGIKUGxxO0/242fe573860e9e54fc52dff4de49cfc4/BackForum_HP-Banner_Mobile_US.jpg',
    alt: 'Back Forum - Community & Support',
  },
} as const;

export function PromotionalBanner({ 
  src, 
  alt, 
  className = '' 
}: PromotionalBannerProps) {
  return (
    <div className={`my-4 ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes='100vw'
        className='w-full h-auto hover:shadow-lg transition-shadow duration-300 rounded-lg cursor-pointer'
        priority={false}
      />
    </div>
  );
}

// Responsive banner component
export function ResponsiveBanner({ 
  desktopSrc, 
  mobileSrc, 
  alt, 
  className = '' 
}: ResponsiveBannerProps) {
  const isMobile = useIsMobile();
  const src = isMobile ? mobileSrc : desktopSrc;
  
  return (
    <PromotionalBanner 
      src={src} 
      alt={alt} 
      className={className} 
    />
  );
}

// Pre-configured banner components with responsive images
export function EarthMonthBanner({ className }: { className?: string }) {
  return (
    <ResponsiveBanner
      desktopSrc={BANNER_CONFIGS.earthMonth.desktop}
      mobileSrc={BANNER_CONFIGS.earthMonth.mobile}
      alt={BANNER_CONFIGS.earthMonth.alt}
      className={className}
    />
  );
}

export function BackForumBanner({ className }: { className?: string }) {
  return (
    <ResponsiveBanner
      desktopSrc={BANNER_CONFIGS.backForum.desktop}
      mobileSrc={BANNER_CONFIGS.backForum.mobile}
      alt={BANNER_CONFIGS.backForum.alt}
      className={className}
    />
  );
}