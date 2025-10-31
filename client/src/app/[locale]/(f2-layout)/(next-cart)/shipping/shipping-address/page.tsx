'use client';

import { useRouter } from 'next/navigation';

import DeliveryAddressForm, {
  DeliveryAddressData,
} from '@/components/form/DeliveryAddressForm';
import { ServiceHighlights } from '@/components/pages/home/components';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUserAddress, useSaveUserAddress } from '@/hooks/useUserAddress';

function ShippingAddress() {
  const isMobile = useIsMobile();
  const router = useRouter();

  // Get user's existing address from cache
  const { data: existingAddress } = useUserAddress();
  
  // Use mutation hook with auto cache invalidation
  const { mutateAsync: saveAddress } = useSaveUserAddress();

  const handleSave = async (data: DeliveryAddressData) => {
    // Save address (mutation will auto invalidate cache + show toast)
    await saveAddress(data);
    
    // Navigate back to confirmation page
    router.push('/shipping/confirmation-address');
  };

  return (
    <div>
      <div className='w-full bg-secondary-background p-6 shadow-sm rounded-lg'>
        <h2 className='text-[22px] font-semibold mb-3 md:mb-6'>
          Shipping address
        </h2>

        {/* Integrated DeliveryAddressForm with existing data */}
        <DeliveryAddressForm
          initialData={existingAddress}
          onSave={handleSave}
          saveButtonText='Confirm address'
          showSaveButton={true}
          showMutedLine={false}
        />
      </div>

      <p className='text-secondary-foreground text-xs py-4 md:px-6'>
        This information is processed by Back Market (JUNG SAS) and the sellers
        to manage your order. You have the right to access, rectify and delete
        your personal data. More info in our data protection policy
      </p>

      <div className='mt-6 md:mt-14'>
        <h2 className='text-[22px] font-semibold mb-4'>
          Your perks with every purchase:
        </h2>
        <ServiceHighlights
          className='grid-cols-1! sm:grid-cols-2! p-6 -mx-8'
          contentSize={isMobile ? 'md' : 'lg'}
        />
      </div>
    </div>
  );
}

export default ShippingAddress;
