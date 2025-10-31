'use client';

import React, { useState, useEffect, useImperativeHandle } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';

import FormInput from '@/components/form/FormInput';
import { PhoneInput } from '@/components/ui/phone-input';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { deliveryAddressSchema } from '@/validations/FormValidation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useVietnameseAddress } from '@/hooks/useVietnameseAddress';

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

interface DeliveryAddressFormProps {
  initialData?: DeliveryAddressData;
  ref?: React.Ref<DeliveryAddressFormRef>;
  onSave?: (data: DeliveryAddressData) => Promise<void> | void;
  saveButtonText?: string;
  showSaveButton?: boolean;
  buttonClassName?: string;
  showMutedLine?: boolean;
}

export interface DeliveryAddressFormRef {
  getFormData: () => DeliveryAddressData;
  validateForm: () => boolean;
  isDataChanged: () => boolean;
  handleSave: () => Promise<void>;
  buttonClassName?: string;
  showMutedLine?: boolean;
}

const DeliveryAddressForm: React.FC<DeliveryAddressFormProps> = ({
  initialData,
  ref,
  onSave,
  saveButtonText = 'Save',
  showSaveButton = true,
  buttonClassName,
  showMutedLine = true,
}) => {
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
  const [isInitialized, setIsInitialized] = useState(false);

  // Effect to populate dropdowns with initial data
  useEffect(() => {
    if (!initialData || !cities.length || isInitialized) return;

    const city = cities.find((c) => c.Name === initialData.city);
    if (!city) return;

    const district = city.Districts.find(
      (d) => d.Name === initialData.district,
    );
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
  const validateForm = () => {
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

  // Internal save handler
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    // Validate all fields first
    if (!validateForm()) {
      toast.error('Please fix all validation errors before saving.');
      return;
    }

    // Check if there are any changes
    if (!isDataChanged()) {
      toast.success('No changes to save!');
      return;
    }

    if (onSave) {
      setIsSaving(true);
      try {
        await onSave(formData);
      } finally {
        setIsSaving(false);
      }
    }
  };

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    getFormData: () => formData,
    validateForm,
    isDataChanged,
    handleSave,
  }));

  return (
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
        <div className='w-full h-12 px-3 py-2 border border-dark rounded-sm bg-input flex items-center'>
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
          <SelectTrigger className='w-full h-12! rounded-sm border border-dark placeholder:text-base text-base placeholder:text-muted-foreground'>
            <SelectValue
              placeholder={addressLoading ? 'Loading cities...' : 'City'}
            />
          </SelectTrigger>
          <SelectContent className='rounded-none!'>
            {cities.map((city) => (
              <SelectItem
                key={city.Id}
                value={city.Id}
                className='rounded-none!'
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
          <SelectTrigger className='w-full h-12! rounded-sm border border-dark placeholder:text-base text-base placeholder:text-muted-foreground'>
            <SelectValue
              placeholder={!selectedCityId ? 'Select city first' : 'District'}
            />
          </SelectTrigger>
          <SelectContent className='rounded-none!'>
            {districts.map((district) => (
              <SelectItem
                key={district.Id}
                value={district.Id}
                className='rounded-none!'
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
          <SelectTrigger className='w-full h-12! rounded-sm border border-dark placeholder:text-base text-base placeholder:text-muted-foreground'>
            <SelectValue
              placeholder={
                !selectedDistrictId ? 'Select district first' : 'Ward'
              }
            />
          </SelectTrigger>
          <SelectContent className='rounded-none!'>
            {wards.map((ward) => (
              <SelectItem
                key={ward.Id}
                value={ward.Id}
                className='rounded-none!'
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

      {/* Save Button */}
      {showSaveButton && (
        <div
          className={`mt-6 pt-4 flex justify-end ${showMutedLine && 'border-t border-border'}`}
        >
          <Button
            onClick={handleSave}
            className={`w-full h-12 text-sm md:text-base ${buttonClassName}`}
            disabled={isSaving}
          >
            {isSaving ? <LoadingSpinner /> : saveButtonText}
          </Button>
        </div>
      )}
    </div>
  );
};

DeliveryAddressForm.displayName = 'DeliveryAddressForm';

export default DeliveryAddressForm;
