'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

import { saveUserAddress } from '@/api/user.api';
import FormInput from '@/components/form/FormInput';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { PhoneInput } from '@/components/ui/phone-input';
import { successToastProps } from '@/libs/toast/toast-props';
import { deliveryAddressSchema } from '@/validations/FormValidation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useVietnameseAddress } from '@/hooks/useVietnameseAddress';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

interface DeliveryAddressDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: DeliveryAddressData) => void;
  initialData?: DeliveryAddressData;
}

export interface DeliveryAddressData {
  id?: string;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  ward: string;
  addressLine: string;
  isDefault?: boolean;
}

const DeliveryAddressDialog: React.FC<DeliveryAddressDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<DeliveryAddressData>({
    fullName: initialData?.fullName || '',
    phone: initialData?.phone || '',
    city: initialData?.city || '',
    district: initialData?.district || '',
    ward: initialData?.ward || '',
    addressLine: initialData?.addressLine || '',
  });

  // Vietnamese address hook
  const {
    cities,
    districts,
    wards,
    loading: addressLoading,
    error: addressError,
    updateDistricts,
    updateWards,
    getCityName,
    getDistrictName,
    getWardName,
  } = useVietnameseAddress();

  // State for selected IDs
  const [selectedCityId, setSelectedCityId] = useState<string>('');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('');
  const [selectedWardId, setSelectedWardId] = useState<string>('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

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

  // Effect to populate dropdowns with initial data
  useEffect(() => {
    if (!initialData || !cities.length || isInitialized) return;

    const city = cities.find((c) => c.Name === initialData.city);
    if (!city) return;

    const district = city.Districts.find((d) => d.Name === initialData.district);
    if (!district) return;

    const ward = district.Wards.find((w) => w.Name === initialData.ward);

    // Set all IDs at once
    setSelectedCityId(city.Id);
    setSelectedDistrictId(district.Id);
    setSelectedWardId(ward?.Id || '');

    // Update dropdowns
    updateDistricts(city.Id);
    updateWards(district.Id, city.Districts);

    setIsInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, cities]);

  // Validation helper function
  const validateField = (field: string, value: string) => {
    try {
      deliveryAddressSchema.shape[
        field as keyof typeof deliveryAddressSchema.shape
      ].parse(value);
      setErrors((prev) => ({ ...prev, [field]: '' }));
    } catch (error) {
      if (
        error instanceof z.ZodError &&
        error.errors.length > 0 &&
        error.errors[0]
      ) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0]!.message }));
      }
    }
  };

  // Handler for city selection
  const handleCityChange = (cityId: string) => {
    // Reset dependent fields
    setSelectedCityId(cityId);
    setSelectedDistrictId('');
    setSelectedWardId('');
    
    // Update districts based on selected city
    updateDistricts(cityId);

    // Update form data
    const cityName = getCityName(cityId);
    setFormData((prev) => ({
      ...prev,
      city: cityName,
      district: '',
      ward: '',
    }));
    
    // Mark as touched and validate
    setTouched((prev) => ({ ...prev, city: true }));
    validateField('city', cityName);
  };

  // Handler for district selection
  const handleDistrictChange = (districtId: string) => {
    // Reset dependent fields
    setSelectedDistrictId(districtId);
    setSelectedWardId('');
    
    // Update wards based on selected district
    updateWards(districtId);

    // Update form data
    const districtName = getDistrictName(districtId);
    setFormData((prev) => ({
      ...prev,
      district: districtName,
      ward: '',
    }));
    
    // Mark as touched and validate
    setTouched((prev) => ({ ...prev, district: true }));
    validateField('district', districtName);
  };

  // Handler for ward selection
  const handleWardChange = (wardId: string) => {
    setSelectedWardId(wardId);

    // Update form data
    const wardName = getWardName(wardId);
    setFormData((prev) => ({ ...prev, ward: wardName }));
    
    // Mark as touched and validate
    setTouched((prev) => ({ ...prev, ward: true }));
    validateField('ward', wardName);
  };

  // Handler for text input changes
  const handleInputChange =
    (field: keyof DeliveryAddressData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      
      // Update form data
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Mark field as touched
      setTouched((prev) => ({ ...prev, [field]: true }));

      // Validate field
      validateField(field, value);
    };

  // Check if form data has changed from initial data
  const isDataChanged = () => {
    if (!initialData) return true; // New address

    // Compare all relevant fields
    return (
      formData.fullName !== initialData.fullName ||
      formData.phone !== initialData.phone ||
      formData.city !== initialData.city ||
      formData.district !== initialData.district ||
      formData.ward !== initialData.ward ||
      formData.addressLine !== initialData.addressLine
    );
  };

  // Validate all fields before saving
  const validateAllFields = () => {
    try {
      deliveryAddressSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        
        // Mark all fields as touched to show errors
        setTouched({
          fullName: true,
          phone: true,
          city: true,
          district: true,
          ward: true,
          addressLine: true,
        });
      }
      return false;
    }
  };

  // Save handler
  const handleSave = async () => {
    // Validate all fields first
    if (!validateAllFields()) {
      toast.error('Please fix all validation errors before saving.');
      return;
    }

    // Check if there are any changes
    if (!isDataChanged()) {
      toast.success('No changes to save!');
      return;
    }

    setIsSaving(true);

    try {
      // Save address
      const savedAddress = await saveUserAddress(formData);
      toast.success('Address saved successfully!', {
        ...successToastProps,
      });

      // Callback with saved data
      onSave({ ...formData, id: savedAddress.id });
      onClose();
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error('Failed to save address. Please try again.');
    } finally {
      setIsSaving(false);
    }
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
        <div className='relative mb-5 md:mb-6 pb-4 md:pb-6 border-b border-border flex items-center justify-between flex-shrink-0'>
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
        <div className='overflow-y-auto flex-1 z-90 px-1'>
          <FormInput
            label='Full name'
            value={formData.fullName}
            onChange={handleInputChange('fullName')}
            error={touched.fullName && !!errors.fullName}
            description={errors.fullName}
            isShowDescription={touched.fullName && !!errors.fullName}
            className='mb-4 mt-1'
            labelClassName='!text-muted-foreground'
          />

          {/* Country - Fixed to Vietnam */}
          <div className='relative mb-4 mt-1'>
            <div className='w-full h-12 px-3 py-2 border border-border rounded-sm bg-input flex items-center'>
              <span className='text-muted-foreground'>Country</span>
              <span className='ml-auto text-foreground'>Vietnam</span>
            </div>
          </div>

          {/* City Select */}
          <div className='mb-4 mt-1'>
            <Select
              value={selectedCityId}
              onValueChange={handleCityChange}
              disabled={addressLoading}
            >
              <SelectTrigger className='w-full !h-12 rounded-sm border border-dark placeholder:text-base text-base placeholder:text-muted-foreground'>
                <SelectValue
                  placeholder={addressLoading ? 'Loading cities...' : 'City'}
                />
              </SelectTrigger>
              <SelectContent className='rounded-sm'>
                {cities.map((city) => (
                  <SelectItem
                    key={city.Id}
                    value={city.Id}
                    className='rounded-sm'
                  >
                    {city.Name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {touched.city && errors.city && (
              <p className='text-sm mt-2 text-destructive'>{errors.city}</p>
            )}
            {addressError && (
              <p className='text-sm mt-2 text-destructive'>{addressError}</p>
            )}
          </div>

          {/* District Select */}
          <div className='mb-4 mt-1'>
            <Select
              value={selectedDistrictId}
              onValueChange={handleDistrictChange}
              disabled={!selectedCityId || addressLoading}
            >
              <SelectTrigger className='w-full !h-12 rounded-sm border border-dark placeholder:text-base text-base placeholder:text-muted-foreground'>
                <SelectValue
                  placeholder={
                    !selectedCityId ? 'Select city first' : 'District'
                  }
                />
              </SelectTrigger>
              <SelectContent className='rounded-sm'>
                {districts.map((district) => (
                  <SelectItem
                    key={district.Id}
                    value={district.Id}
                    className='rounded-sm'
                  >
                    {district.Name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {touched.district && errors.district && (
              <p className='text-sm mt-2 text-destructive'>{errors.district}</p>
            )}
          </div>

          {/* Ward Select */}
          <div className='mb-4 mt-1'>
            <Select
              value={selectedWardId}
              onValueChange={handleWardChange}
              disabled={!selectedDistrictId || addressLoading}
            >
              <SelectTrigger className='w-full !h-12 rounded-sm border border-dark placeholder:text-base text-base placeholder:text-muted-foreground'>
                <SelectValue
                  placeholder={
                    !selectedDistrictId ? 'Select district first' : 'Ward'
                  }
                />
              </SelectTrigger>
              <SelectContent className='rounded-sm'>
                {wards.map((ward) => (
                  <SelectItem
                    key={ward.Id}
                    value={ward.Id}
                    className='rounded-sm'
                  >
                    {ward.Name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {touched.ward && errors.ward && (
              <p className='text-sm mt-2 text-destructive'>{errors.ward}</p>
            )}
          </div>

          <FormInput
            label='Address Line'
            value={formData.addressLine}
            onChange={handleInputChange('addressLine')}
            error={touched.addressLine && !!errors.addressLine}
            description={errors.addressLine}
            isShowDescription={touched.addressLine && !!errors.addressLine}
            className='mb-4 mt-1'
          />

          {/* Phone Number */}
          <div className='relative mb-4 mt-1'>
            <PhoneInput
              value={formData.phone}
              onChange={(phone) => {
                setFormData((prev) => ({ ...prev, phone }));
                setTouched((prev) => ({ ...prev, phone: true }));
                validateField('phone', phone);
              }}
            />
            {touched.phone && errors.phone && (
              <p className='text-sm mt-2 text-destructive'>{errors.phone}</p>
            )}
          </div>

          <p className='text-sm text-muted-foreground mt-2'>
            We need it for the delivery, just in case we need to reach you.
          </p>
        </div>

        {/* Save Button */}
        <div className='mt-6 pt-4 border-t border-border flex-shrink-0'>
          <Button
            onClick={handleSave}
            className='w-full h-12 text-sm md:text-base'
          >
            {isSaving ? <LoadingSpinner /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddressDialog;
