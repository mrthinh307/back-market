import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function ReviewCard({ className }: { className?: string }) {
  return (
    <Link href='/'>
      <div className={`h-full ${className}`}>
        <div className='bg-secondary-background shadow-sm rounded-lg hover:drop-shadow-lg cursor-pointer h-full'>
          <div className='relative h-[400px]'>
            <Image
              src='https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D1920/https://reviews.statics.backmarket.com/review-attachment/gUzjqfO4FSFx6cNy5lq4vk91btIdIsE6kc9nIl9RSz60lQ7ts3RQ8W7qxGbDxj1KRJYzJj9dGhz79voFaBsFsFWKtFGk/original.jpeg'
              alt='Review Image'
              width={0}
              height={0}
              sizes='100vw'
              className='rounded-t-lg object-cover w-full h-full max-w-full max-h-full leading-none'
            />
            <span className='rounded-xs inline-block max-w-full truncate font-sm font-semibold px-1 py-0 bg-input-hover absolute left-4 top-4'>
              Mathhew P.
            </span>
            <div className='absolute bottom-4 left-4 right-4 flex flex-col gap-4'>
              <div className='text-white text-sm font-semibold line-clamp-4'>
                Easy to use app with easy ordering using ApplePay. Shipping
                status was lagged but was surprised when it arrived early. The
                description of what is missing could have better and my
                suggestion would be to show all included and not included items.
              </div>
              <div className='flex gap-1 items-center h-[18px]'>
                <div className='flex mt-[1px]'>
                  {(() => {
                    const stars = 5 as number;
                    return [...Array.from({ length: 5 })].map((_, index) => (
                      <StarIcon
                        key={index}
                        className={`size-3 text-white ${index + 1 <= stars ? 'fill-white' : ''}`}
                      />
                    ));
                  })()}
                </div>
                <span className='text-xs font-semibold text-white'>5/5</span>
              </div>
            </div>
          </div>
          <div className='flex grow gap-4 p-4'>
            <Image
              src='https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D260/https://d2e6ccujb3mkqf.cloudfront.net/fcaf8791-00c8-4813-9196-d14198f5b8a2-1_1bc2f09e-cd6a-4f12-97f9-dab0a7ca4374.jpg'
              alt='Espresso maker with grinder Without capsule Sage Barista Pro SES878BST 1.9000L - Black'
              className='h-[52px] w-[52px] object-cover rounded-sm'
              width={52}
              height={52}
            />
            <div className='text-xs'>
              Espresso maker with grinder Without capsule Sage Barista Pro
              SES878BST 1.9000L - Black
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ReviewCard;
