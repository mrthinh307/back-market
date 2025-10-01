'use client';

import React, { useState } from 'react';
import FormInput from '@/components/form/FormInput';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { PhoneInput } from '@/components/ui/phone-input';

interface DeliveryAddressDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: DeliveryAddressData) => void;
  initialData?: DeliveryAddressData;
}

export interface DeliveryAddressData {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  phoneNumber: string;
}

const DeliveryAddressDialog: React.FC<DeliveryAddressDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<DeliveryAddressData>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    country: 'Vietnam',
    city: initialData?.city || '',
    district: initialData?.district || '',
    streetAddress: initialData?.streetAddress || '',
    phoneNumber: initialData?.phoneNumber || '',
  });

  const handleInputChange =
    (field: keyof DeliveryAddressData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onSave(formData);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div className='absolute inset-0 bg-black/60 dark:bg-black/80' onClick={onClose} />

      {/* Dialog */}
      <div className='relative bg-background-secondary rounded-lg p-6 w-full max-w-2xl mx-4 max-h-full overflow-y-auto shadow-lg'>
        {/* Header */}
        <div className='relative mb-8 pb-6 border-b border-border flex justify-between'>
          <div className='w-10 h-full'></div>
          <h2 className='text-lg text-foreground font-normal text-center content-center'>
            Delivery Address
          </h2>
          <Button
            size='icon'
            className='hover:bg-icon-button-hover bg-transparent transition-colors ease-in'
            onClick={onClose}
          >
            <Image
              src='/assets/images/x-icon.svg'
              alt='Close Button'
              width={24}
              height={24}
              className='dark:invert'
            />
          </Button>
        </div>

        {/* Form */}
        <div>
          <FormInput
            label='First name'
            value={formData.firstName}
            onChange={handleInputChange('firstName')}
            className='mb-4'
          />

          <FormInput
            label='Last name'
            value={formData.lastName}
            onChange={handleInputChange('lastName')}
            className='mb-4'
          />

          {/* Country - Fixed to Vietnam */}
          <div className='relative mb-4'>
            <div className='w-full h-12 px-3 py-2 border border-border rounded-sm bg-input flex items-center'>
              <span className='text-muted-foreground text-sm'>Country</span>
              <span className='ml-auto text-foreground'>Vietnam</span>
            </div>
          </div>

          <FormInput
            label='City'
            value={formData.city}
            onChange={handleInputChange('city')}
            className='mb-4'
          />

          <FormInput
            label='District'
            value={formData.district}
            onChange={handleInputChange('district')}
            className='mb-4'
          />

          <FormInput
            label='Street address'
            value={formData.streetAddress}
            onChange={handleInputChange('streetAddress')}
            className='mb-4'
          />

          {/* Phone Number - Fixed */}
          <div className='relative mb-4'>
            <PhoneInput />
          </div>

          <p className='text-sm text-muted-foreground mt-2'>
            We need it for the delivery, just in case we need to reach you.
          </p>
        </div>

        {/* Save Button */}
        <div className='mt-4'>
          <Button
            onClick={handleSave}
            className='w-full'
          >
            {isSaving ? <LoadingSpinner /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddressDialog;
