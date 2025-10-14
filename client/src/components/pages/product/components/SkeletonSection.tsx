import { Skeleton } from '@/components/ui/skeleton';

const SkeletonSection: React.FC = () => {
  return (
    <div className='py-8'>
      {/* Mobile title skeleton */}
      <div className='mb-4 md:hidden'>
        <Skeleton className='h-8 w-48' />
      </div>

      <div className='flex flex-col md:flex-row md:justify-center md:items-center'>
        {/* Left side - Image skeleton */}
        <div className='max-w-full md:relative md:mr-8 md:min-w-[337px] md:max-w-[498px] md:grow lg:mr-16'>
          <div className='flex w-full flex-col justify-center opacity-100 transition-opacity duration-500 ease-out'>
            <div className='relative mb-4 max-w-[498px] md:mb-0 md:w-full md:min-w-[337px]'>
              <div className='relative -mb-4 flex min-h-64 lg:min-h-72 flex-col flex-wrap overflow-hidden w-full pb-4'>
                <div className='relative flex w-full grow justify-center'>
                  <Skeleton className='rounded-lg md:rounded-[32px] w-full min-h-[337px] md:min-h-[498px] relative'></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Options skeleton */}
        <div className='md:w-[360px] md:shrink-0 min-[900px]:w-[456px]'>
          <div className='opacity-100 transition-opacity duration-500 ease-out'>
            <fieldset role='radiogroup'>
              <legend className='mb-3 flex items-baseline justify-between'>
                {/* Desktop title skeleton */}
                <Skeleton className='h-10 w-64 mb-2 hidden md:block' />
              </legend>

              {/* Options grid skeleton */}
              <ul className='list-none grid gap-x-3 gap-y-3 grid-cols-2'>
                {[1, 2, 3, 4].map((index) => (
                  <li key={index}>
                    <div className='rounded-sm relative flex size-full flex-col border border-border py-3'>
                      <div className='m-auto flex w-full flex-row items-center pl-2 pr-4'>
                        <div className='shrink-0'>
                          <div className='flex size-6 items-center justify-center'>
                            <Skeleton className='rounded-full size-3' />
                          </div>
                        </div>
                        <div className='ml-4 flex grow'>
                          <div className='flex grow flex-nowrap text-left flex-col space-y-1'>
                            <Skeleton className='h-5 w-20' />
                            <Skeleton className='h-4 w-16' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonSection;
