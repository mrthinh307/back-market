'use client';
import { useState } from 'react';
import { logout } from '@/api/auth.api';
import ProfileCardContainer from '@/components/pages/profile/ProfileCardContainer';
import DeliveryAddressDialog, { DeliveryAddressData } from '@/components/pages/profile/DeliveryAddressDialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from 'next-intl';

function ProfilePage() {
  const locale = useLocale();
  const { accessToken, setAccessToken } = useAuth();
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);
  const [deliveryData, setDeliveryData] = useState<DeliveryAddressData>({
    firstName: '',
    lastName: '',
    country: 'Vietnam',
    city: '',
    district: '',
    streetAddress: '',
    phoneNumber: '',
  });

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setAccessToken(null);
      window.location.href = `/${locale}/email`;
    }
  };

  const handleDeliveryAddressSave = (data: DeliveryAddressData) => {
    setDeliveryData(data);
  };

  const formatDeliveryAddress = (data: DeliveryAddressData) => {
    const parts = [
      `${data.firstName} ${data.lastName}`.trim(),
      data.streetAddress,
      `${data.district}, ${data.city}`.replace(/^, |, $/, ''),
      data.country,
      data.phoneNumber && `Phone: ${data.phoneNumber}`,
    ].filter(Boolean);
    
    return parts.join('\n');
  };

  const hasDeliveryAddress = deliveryData.firstName && deliveryData.lastName && deliveryData.city;

  return (
    <>
      <div className='container'>
        <div className='mb-8 space-y-1 text-center'>
          <h2 className='text-3xl font-heading font-semibold'>Profile</h2>
          <p className='text-center text-muted mt-2'>
            Who am I? Where am I? Why am I? Look no further for the answers.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <ProfileCardContainer
            onEditButtonClick={() => console.log('Edit button clicked')}
            title='Personal details'
          >
            <div className='w-[20ch] truncate lg:w-[40ch]'>23020708 Hoang Duy Thinh</div>
            <div>
              <div className='text-green-700'>
                <div className='flex items-center gap-1'>
                  <svg
                    aria-hidden='true'
                    fill='currentColor'
                    height='12'
                    viewBox='0 0 24 24'
                    width='12'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M17.03 9.53a.75.75 0 0 0-1.06-1.06l-5.47 5.47-2.47-2.47a.75.75 0 0 0-1.06 1.06l2.646 2.647a1.25 1.25 0 0 0 1.768 0L17.03 9.53'></path>
                    <path
                      fillRule='evenodd'
                      d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25M3.75 12a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  Verified
                </div>
              </div>
            </div>
            <div className='w-[20ch] truncate lg:w-[40ch]'>23020708@vnu.edu.vn</div>
            <div className='mt-4 flex flex-col gap-4'>
              <span className='underline font-semibold cursor-pointer'>
                Change password
              </span>
              <span className='underline font-semibold cursor-pointer'>
                Delete your account
              </span>
            </div>
          </ProfileCardContainer>
          
          <ProfileCardContainer
            onEditButtonClick={() => setShowDeliveryDialog(true)}
            title='Delivery Address'
          >
            {hasDeliveryAddress ? (
              <div className="text-lg text-secondary whitespace-pre-line">
                {formatDeliveryAddress(deliveryData)}
              </div>
            ) : (
              <div className="text-muted">There is no address registered yet.</div>
            )}
          </ProfileCardContainer>
          
          {accessToken && (
            <Button onClick={handleLogout} className='w-full md:col-span-2'>
              Log out
            </Button>
          )}
        </div>
      </div>

      {/* Delivery Address Dialog */}
      <DeliveryAddressDialog
        isOpen={showDeliveryDialog}
        onClose={() => setShowDeliveryDialog(false)}
        onSave={handleDeliveryAddressSave}
        initialData={deliveryData}
      />
    </>
  );
}

export default ProfilePage;
