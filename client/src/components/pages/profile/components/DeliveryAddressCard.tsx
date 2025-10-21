'use client';

import { useEffect, useState } from 'react';
import ProfileCardContainer from './ProfileCardContainer';
import DeliveryAddressDialog, { DeliveryAddressData } from './DeliveryAddressDialog';

interface DeliveryAddressCardProps {
  deliveryInfo: DeliveryAddressData | null;
  onAddressUpdate?: (data: DeliveryAddressData) => void;
}

function DeliveryAddressCard({ deliveryInfo, onAddressUpdate }: DeliveryAddressCardProps) {
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);
  const [deliveryData, setDeliveryData] = useState<DeliveryAddressData | null>(deliveryInfo);

  // Sync deliveryData state with deliveryInfo prop when it changes
  useEffect(() => {
    setDeliveryData(deliveryInfo);
  }, [deliveryInfo]);

  const handleDeliveryAddressSave = (data: DeliveryAddressData) => {
    setDeliveryData(data);
    onAddressUpdate?.(data);
  };

  const formatDeliveryAddress = (data: DeliveryAddressData) => {
    const parts = [
      `Full Name : ${data.fullName?.trim()}`,
      data.phone && `Phone : ${data.phone?.trim()}`,
      `City : ${data.city?.trim()}, Việt Nam`,
      `District : ${data.district?.trim()}`,
      `Ward : ${data.ward?.trim()}`,
      `Address Line : ${data.addressLine?.trim()}`,
    ].filter(Boolean);

    return parts.join('\n');
  };

  return (
    <>
      <ProfileCardContainer
        onEditButtonClick={() => setShowDeliveryDialog(true)}
        title='Delivery Address'
      >
        {deliveryData ? (
          <div className='text-secondary whitespace-pre-line leading-7 truncate'>
            {formatDeliveryAddress(deliveryData)}
          </div>
        ) : (
          <div className='text-muted'>
            There is no address registered yet.
          </div>
        )}
      </ProfileCardContainer>

      {/* Delivery Address Dialog */}
      <DeliveryAddressDialog
        isOpen={showDeliveryDialog}
        onClose={() => setShowDeliveryDialog(false)}
        onSave={handleDeliveryAddressSave}
        initialData={deliveryData || {
          fullName: '',
          phone: '',
          city: '',
          district: '',
          ward: '',
          addressLine: '',
        }}
      />
    </>
  );
}

export default DeliveryAddressCard;