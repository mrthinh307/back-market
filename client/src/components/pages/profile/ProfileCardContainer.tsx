import { Button } from '@/components/ui/button';

function ProfileCardContainer({ children, onEditButtonClick, title }: { children?: React.ReactNode, onEditButtonClick: () => void, title: string }) {
  return (
    <div className='bg-background-secondary shadow-sm rounded-lg flex gap-4 px-4 py-6'>
      <div className='flex-1'>
        <h2 className='pb-3 font-semibold text-[20px] md:text-[22px]'>{title}</h2>
        <div className='flex items-center'>
          {children ? (
            <div>{children}</div>
          ) : (
            <div>There is no address information available.</div>
          )}
        </div>
      </div>
      <div className='flex-initial'>
        <Button variant='outline' size='sm' onClick={() => onEditButtonClick()}>
          Edit
        </Button>
      </div>
    </div>
  );
}

export default ProfileCardContainer;
