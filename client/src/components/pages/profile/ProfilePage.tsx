'use client';

import UserProfileCard from '@/components/pages/profile/components/UserProfileCard';
import DeliveryAddressCard from '@/components/pages/profile/components/DeliveryAddressCard';
import { DeliveryAddressData } from '@/components/pages/profile/components/DeliveryAddressDialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { UserAuth } from '@/types/user.types';

interface ProfilePageProps {
  userInfo: UserAuth | null;
  deliveryInfo: DeliveryAddressData | null;
}

function ProfilePage({ userInfo, deliveryInfo }: ProfilePageProps) {
  const { isAuthenticated, logout } = useAuth();

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
          {/* User profile */}
          <UserProfileCard userInfo={userInfo} />

          {/* Delivery info */}
          <DeliveryAddressCard deliveryInfo={deliveryInfo} />

          {/* Logout button */}
          {isAuthenticated && (
            <Button onClick={logout} className='w-full md:col-span-2'>
              Log out
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
