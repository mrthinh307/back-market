import Image from 'next/image';
import Link from 'next/link';

function ArticleCard({ className }: { className?: string }) {
  return (
    <Link href={'/'}>
      <article
        className={`shadow-sm rounded-lg relative flex cursor-pointer overflow-hidden hover:shadow-lg motion-safe:transition motion-safe:duration-300 motion-safe:ease-in flex-col max-h-[280px] ${className}`}
      >
        <Image
          src='https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D1920/https://images.ctfassets.net/mmeshd7gafk1/c160e233e1f64d4630bf41f765ea305f-meta-526-276/9cee0099cea7d02d9eec454ef63cf739/UK-Blog_Art._Header_V1.png'
          width={0}
          height={0}
          layout='responsive'
          objectFit='cover'
          className='object-cover h-[168px] w-full max-h-full max-w-full leading-none'
          alt='article image'
          />
        <div className='bg-background-secondary flex flex-1 flex-col items-start justify-between p-6'>
          <div className='w-full'>
            <div className='text-xs text-muted'>News</div>
            <h3 className='line-clamp-2 font-semibold'>
              Back Market has prevented 1 million tonnes of carbon.
            </h3>
            <p className='text-muted mt-2 text-sm line-clamp-3'></p>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ArticleCard;
