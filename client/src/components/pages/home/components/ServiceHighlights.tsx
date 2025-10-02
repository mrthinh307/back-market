import Image from 'next/image';
import { useMemo } from 'react';

function ServiceHighlights({
  className,
  content,
  contentSize = 'md',
}: {
  className?: string;
  content?: Array<{ icon: string; text: string }>;
  contentSize?: 'sm' | 'md' | 'lg';
}) {
  const displayContent = useMemo(() => {
    return content && content.length > 0
      ? content
      : [
          {
            icon: '/assets/images/verified.png',
            text: 'Professionally refurbished',
          },
          {
            icon: '/assets/images/cashback-icon.svg',
            text: 'Cashback with Trade-in',
          },
          {
            icon: '/assets/images/card-visit.svg',
            text: 'Pay-as-you-go',
          },
          {
            icon: '/assets/images/phone-icon.svg',
            text: 'App exclusive features',
          },
        ];
  }, []);

  const contentSizeNumber = contentSize === 'sm' ? 20 : contentSize === 'md' ? 24 : 28;
  const contentSizeText = contentSize === 'sm' ? 'text-xs' : contentSize === 'md' ? 'text-sm' : 'text-base';

  return (
    <section className={`mb-14`}>
      <div
        className={`w-full bg-background-secondary rounded-lg grid gap-3 grid-cols-2 md:grid-cols-4 p-3 ${className}`}
      >
        {displayContent.map((item, index) => (
          <div key={index} className='flex gap-3 items-center justify-start'>
            <div className='p-2 rounded-md bg-sub-background shrink-0'>
              <Image
                src={item.icon}
                alt={item.text}
                width={contentSizeNumber}
                height={contentSizeNumber}
                className='dark:invert'
              />
            </div>
            <span className={`font-semibold ${contentSizeText} underline`}>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServiceHighlights;
