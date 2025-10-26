'use client';

import { useState } from 'react';
import { formatPhoneNumber } from 'react-phone-number-input';

import ProfileCardContainer from './ProfileCardContainer';
import DeliveryAddressDialog, {
  DeliveryAddressData,
} from './DeliveryAddressDialog';

interface DeliveryAddressCardProps {
  deliveryInfo: DeliveryAddressData | null;
  onAddressUpdate?: (data: DeliveryAddressData) => void;
}

function DeliveryAddressCard({
  deliveryInfo,
  onAddressUpdate,
}: DeliveryAddressCardProps) {
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);
  const [deliveryData, setDeliveryData] = useState<DeliveryAddressData | null>(
    deliveryInfo,
  );

  const handleDeliveryAddressSave = (data: DeliveryAddressData) => {
    setDeliveryData(data);
    onAddressUpdate?.(data);
  };

  const formatDeliveryAddress = (data: DeliveryAddressData) => {
    return (
      <>
        <div><strong>Full Name:</strong> {data.fullName?.trim()}</div>
        {data.phone && (
          <div>
            <strong>Phone:</strong> {formatPhoneNumber(data.phone.trim())}
          </div>
        )}
        <div><strong>City:</strong> {data.city?.trim()}, Việt Nam</div>
        <div><strong>District:</strong> {data.district?.trim()}</div>
        <div><strong>Ward:</strong> {data.ward?.trim()}</div>
        <div><strong>Address Line:</strong> {data.addressLine?.trim()}</div>
      </>
    );
  };

  return (
    <>
      <ProfileCardContainer
        onEditButtonClick={() => setShowDeliveryDialog(true)}
        title='Delivery Address'
      >
        {deliveryData ? (
          <div className='text-secondary-foreground whitespace-pre-line leading-7 truncate font-heading'>
            {formatDeliveryAddress(deliveryData)}
          </div>
        ) : (
          <div className='text-muted-foreground'>There is no address registered yet.</div>
        )}
      </ProfileCardContainer>

      {/* Delivery Address Dialog */}
      <DeliveryAddressDialog
        isOpen={showDeliveryDialog}
        onClose={() => setShowDeliveryDialog(false)}
        onSave={handleDeliveryAddressSave}
        initialData={
          deliveryData || {
            fullName: '',
            phone: '',
            city: '',
            district: '',
            ward: '',
            addressLine: '',
          }
        }
      />
    </>
  );
}

export default DeliveryAddressCard;
