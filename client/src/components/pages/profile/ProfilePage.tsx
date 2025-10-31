'use client';

import DeliveryAddressCard from '@/components/pages/profile/components/DeliveryAddressCard';
import UserProfileCard from '@/components/pages/profile/components/UserProfileCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useUserAddress } from '@/hooks/useUserAddress';
import { UserAuth } from '@/types/user.types';

interface ProfilePageProps {
  userInfo: UserAuth | null;
}

function ProfilePage({ userInfo }: ProfilePageProps) {
  const { isAuthenticated, logout } = useAuth();
  
  // Get address from React Query cache (hydrated from SSR)
  const { data: deliveryInfo } = useUserAddress();

  return (
    <>
      <div className='container'>
        <div className='mb-8 space-y-1 text-center'>
          <h2 className='text-3xl font-heading font-bold'>Profile</h2>
          <p className='text-center text-muted-foreground mt-2'>
            Who am I? Where am I? Why am I? Look no further for the answers.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* User profile */}
          <UserProfileCard userInfo={userInfo} />

          {/* Delivery info */}
          <DeliveryAddressCard deliveryInfo={deliveryInfo ?? null} />

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
