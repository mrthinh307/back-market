'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useSaveUserAddress } from '@/hooks/useUserAddress';
import DeliveryAddressForm, {
  DeliveryAddressData,
  DeliveryAddressFormRef,
} from '@/components/form/DeliveryAddressForm';

interface DeliveryAddressDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: DeliveryAddressData) => void;
  initialData?: DeliveryAddressData;
}

const DeliveryAddressDialog: React.FC<DeliveryAddressDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const formRef = useRef<DeliveryAddressFormRef>(null);
  
  // Use mutation hook with auto cache invalidation
  const { mutateAsync: saveAddress } = useSaveUserAddress();

  // Lock body scroll when dialog is open
  useBodyScrollLock(isOpen);

  // Animate sheet when opening
  useEffect(() => {
    if (!isOpen) {
      setIsSheetVisible(false);
      return;
    }

    const rafId = requestAnimationFrame(() => {
      setIsSheetVisible(true);
    });

    return () => cancelAnimationFrame(rafId);
  }, [isOpen]);

  // Save handler
  const handleSave = async (data: DeliveryAddressData) => {
    // Save address (mutation will auto invalidate cache + show toast)
    const savedAddress = await saveAddress(data);
    
    // Callback with saved data
    onSave({ ...data, id: savedAddress.id });
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-end md:items-center justify-center px-0 md:px-4 md:pb-0'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/60 dark:bg-black/80'
      />

      {/* Dialog */}
      <div
        className={`relative bg-secondary-background w-full max-w-2xl md:rounded-lg rounded-t-3xl shadow-lg flex flex-col p-5 md:p-6 max-h-[90vh] md:max-h-[95vh] transform transition-transform duration-300 ease-out md:duration-200 ${isSheetVisible ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}`}
      >
        {/* Header */}
        <div className='relative mb-5 md:mb-6 pb-4 md:pb-6 border-b border-border flex items-center justify-between shrink-0'>
          <div className='w-9 md:w-10' />
          <h2 className='text-base md:text-lg text-foreground font-medium text-center'>
            Delivery Address
          </h2>
          <Button
            size='icon'
            className='hover:bg-icon-button-hover bg-transparent transition-colors ease-in h-9 w-9 md:h-10 md:w-10'
            onClick={onClose}
          >
            <Image
              src='/assets/images/x-icon.svg'
              alt='Close Button'
              width={22}
              height={22}
              className='dark:invert md:w-6 md:h-6'
            />
          </Button>
        </div>

        {/* Form */}
        <DeliveryAddressForm 
          ref={formRef} 
          initialData={initialData}
          onSave={handleSave}
          showSaveButton={true}
        />
      </div>
    </div>
  );
};

export default DeliveryAddressDialog;
