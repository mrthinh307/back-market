import Image from 'next/image';
import { F2Header, Header } from '../layouts';
import { Button } from '../ui/button';

export default function GlobalErrorComponent({
  headerComponent,
  statusCode = '404',
  title = 'Time to touch grass?',
  message = `If you’re here, it might be because the URL isn’t correct, the link is broken, or this is a sign from the universe to log off and touch grass. Not this grass. Please don’t touch this grass.`,
  imageUrl = 'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://front-office.statics.backmarket.com/bece087cbbc358f0e7e9fe6513352759d4e85a61/img/404.jpg',
  buttonText = 'Back away slowly',
  onButtonClick,
  className,
}: {
  headerComponent?: 'default' | 'f2-header';
  statusCode?: string;
  title?: string;
  message?: string;
  imageUrl?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}) {
  return (
    <div className='mx-auto bg-background'>
      {headerComponent === 'f2-header' ? (
        <F2Header />
      ) : headerComponent === 'default' ? (
        <Header />
      ) : null}
      <main
        className={`mx-auto ${headerComponent === 'default' ? 'pt-[124px] md:pt-[133px]' : headerComponent === 'f2-header' ? 'pt-16 h-[calc(100vh-4rem)]' : ''} ${className}`}
      >
        <div className='flex justify-center py-8 text-center'>
          <div className='container'>
            <div className='mb-8'>
              <h2 className='text-[42px] md:text-[56px] font-heading font-bold mb-4 leading-12 md:leading-16'>
                {statusCode}
              </h2>
              <h2 className='text-[42px] md:text-[56px] font-heading font-bold leading-12 md:leading-16'>
                {title}
              </h2>
            </div>
            <p className='text-secondary'>{message}</p>
            <Image
              src={imageUrl}
              alt={`Error ${statusCode} - ${title}`}
              width={0}
              height={0}
              sizes='100vw'
              className='mx-auto my-8 block h-[220px] md:h-[320px] w-full md:w-[448px] object-cover'
            />
            <Button onClick={onButtonClick}>{buttonText}</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
