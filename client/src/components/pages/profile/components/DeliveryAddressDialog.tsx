'use client';

import React, { useState, useEffect } from 'react';
import FormInput from '@/components/form/FormInput';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { PhoneInput } from '@/components/ui/phone-input';
import { saveUserAddress } from '@/api/user.api';
import { toast } from 'sonner';
import { successToastProps } from '@/libs/toast/toast-props';
import { deliveryAddressSchema } from '@/validations/FormValidation';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useVietnameseAddress } from '@/hooks/useVietnameseAddress';

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

  // Effect to populate dropdowns with initial data
  useEffect(() => {
    if (!initialData || !cities.length) return;

    // Find city ID by name
    const foundCity = cities.find((city) => city.Name === initialData.city);
    if (foundCity) {
      setSelectedCityId(foundCity.Id);
      updateDistricts(foundCity.Id);

      // Find district ID by name
      const foundDistrict = foundCity.Districts.find(
        (district) => district.Name === initialData.district,
      );
      if (foundDistrict) {
        setSelectedDistrictId(foundDistrict.Id);
        updateWards(foundDistrict.Id);

        // Find ward ID by name
        const foundWard = foundDistrict.Wards.find(
          (ward) => ward.Name === initialData.ward,
        );
        if (foundWard) {
          setSelectedWardId(foundWard.Id);
        }
      }
    }
  }, [initialData, cities, updateDistricts, updateWards]);

  // Handlers for address selection
  const handleCityChange = (cityId: string) => {
    setSelectedCityId(cityId);
    setSelectedDistrictId('');
    setSelectedWardId('');
    updateDistricts(cityId);

    const cityName = getCityName(cityId);
    setFormData((prev) => ({
      ...prev,
      city: cityName,
      district: '',
      ward: '',
    }));
    setTouched((prev) => ({ ...prev, city: true }));
    if (touched.city || cityName.length > 0) {
      validateField('city', cityName);
    }
  };

  const handleDistrictChange = (districtId: string) => {
    setSelectedDistrictId(districtId);
    setSelectedWardId('');
    updateWards(districtId);

    const districtName = getDistrictName(districtId);
    setFormData((prev) => ({
      ...prev,
      district: districtName,
      ward: '',
    }));
    setTouched((prev) => ({ ...prev, district: true }));
    if (touched.district || districtName.length > 0) {
      validateField('district', districtName);
    }
  };

  const handleWardChange = (wardId: string) => {
    setSelectedWardId(wardId);

    const wardName = getWardName(wardId);
    setFormData((prev) => ({ ...prev, ward: wardName }));
    setTouched((prev) => ({ ...prev, ward: true }));
    if (touched.ward || wardName.length > 0) {
      validateField('ward', wardName);
    }
  };

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

  const handleInputChange =
    (field: keyof DeliveryAddressData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Mark field as touched
      setTouched((prev) => ({ ...prev, [field]: true }));

      // Validate field if it's been touched
      if (touched[field] || value.length > 0) {
        validateField(field, value);
      }
    };

  const isDataChanged = () => {
    if (!initialData) return true; // If no initial data, it's a new address

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
      // Save only when there are changes
      const savedAddress = await saveUserAddress(formData);
      toast.success('Address saved successfully!', {
        ...successToastProps,
      });

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
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/60 dark:bg-black/80'
        onClick={onClose}
      />

      {/* Dialog */}
      <div className='relative bg-background-secondary rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[95vh] shadow-lg flex flex-col'>
        {/* Header */}
        <div className='relative mb-6 pb-6 border-b border-border flex justify-between flex-shrink-0'>
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
        <div className='overflow-y-auto flex-1 z-90'>
          <FormInput
            label='Full name'
            value={formData.fullName}
            onChange={handleInputChange('fullName')}
            error={touched.fullName && !!errors.fullName}
            description={errors.fullName}
            isShowDescription={touched.fullName && !!errors.fullName}
            className='mb-4 mt-1 mx-1'
            labelClassName='!text-muted-foreground'
          />

          {/* Country - Fixed to Vietnam */}
          <div className='relative mb-4 mt-1 mx-1'>
            <div className='w-full h-12 px-3 py-2 border border-border rounded-sm bg-input flex items-center'>
              <span className='text-muted-foreground'>Country</span>
              <span className='ml-auto text-foreground'>Vietnam</span>
            </div>
          </div>

          {/* City Select */}
          <div className='mb-4 mt-1 mx-1'>
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
          <div className='mb-4 mt-1 mx-1'>
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
          <div className='mb-4 mt-1 mx-1'>
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
            className='mb-4 mt-1 mx-1'
          />

          {/* Phone Number */}
          <div className='relative mb-4 mt-1 mx-1'>
            <PhoneInput
              value={formData.phone}
              onChange={(phone) => {
                setFormData((prev) => ({ ...prev, phone }));
                setTouched((prev) => ({ ...prev, phone: true }));
                if (touched.phone || phone.length > 0) {
                  validateField('phone', phone);
                }
              }}
            />
            {touched.phone && errors.phone && (
              <p className='text-sm mt-2 text-destructive'>{errors.phone}</p>
            )}
          </div>

          <p className='text-sm text-muted-foreground mt-2 mx-1'>
            We need it for the delivery, just in case we need to reach you.
          </p>
        </div>

        {/* Save Button */}
        <div className='mt-6 pt-4 border-t border-border flex-shrink-0 mx-1'>
          <Button onClick={handleSave} className='w-full'>
            {isSaving ? <LoadingSpinner /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddressDialog;
