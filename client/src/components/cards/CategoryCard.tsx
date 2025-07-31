
import Link from 'next/link';
import Image from 'next/image';
import { CategoryCardProps } from '@/types/cards.type';

function CategoryCard({ category }: { category: CategoryCardProps }) {
  return (
    <Link href={'/'} className='flex w-full h-full'>
      <div className='flex flex-col gap-2 text-left w-full'>
        <div className='w-full rounded-xl overflow-hidden'>
          <Image
            src={category.image}
            alt={category.name}
            width={0}
            height={0}
            sizes='100vw'
            layout="responsive"
            objectFit="cover"
            className="w-full h-auto"
          />
        </div>
        <h3 className='font-semibold text-lg md:text-xl'>{category.name}</h3>
      </div>
    </Link>
  );
}
export default CategoryCard;
