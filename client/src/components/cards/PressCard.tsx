import Image from 'next/image';
import Link from 'next/link';

function PressCard({ className }: { className?: string }) {
  return (
    <Link href={'/'} className='h-full'>
      <article
        className={`bg-background-secondary shadow-sm rounded-lg focus-within:shadow-md relative cursor-pointer overflow-hidden hover:shadow-md motion-safe:transition motion-safe:duration-300 motion-safe:ease-in p-8 h-full ${className}`}
      >
        <div className='content-center flex-col h-full'>
          <div className='flex h-[108px] w-[144px] items-stretch'>
            <Image
              alt='press image'
              src='https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D3840/https://images.ctfassets.net/mmeshd7gafk1/37P1QBmYi9cYnpzur916zL/a0c658ce86c0695e3e7402a2bf73821b/UK._The_Guardian.jpg'
              width={0}
              height={0}
              className='block w-full object-contain max-w-full max-h-full leading-none'
              sizes='100vw'
            />
          </div>
          <div className='pt-6 text-lg md:text-xl font-semibold select-text text-center '>
            "Back Market – now a certified B Corp, which guarantees certain
            ethical standards."
          </div>
          <div className='text-sm text-muted mt-2 select-text'>31/07/2025</div>
        </div>
      </article>
    </Link>
  );
}

export default PressCard;
