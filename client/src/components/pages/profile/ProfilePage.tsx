'use client';

import { useQuery } from '@tanstack/react-query';
import UserProfileCard from '@/components/pages/profile/components/UserProfileCard';
import DeliveryAddressCard from '@/components/pages/profile/components/DeliveryAddressCard';
import { DeliveryAddressData } from '@/components/pages/profile/components/DeliveryAddressDialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { UserAuth } from '@/types/user.types';
import { fetchProfile, getUserAddress } from '@/api/user.api';
import { USE_QUERY_KEY } from '@/constants/use-query-key';

interface ProfilePageProps {
  userInfo: UserAuth | null;
  deliveryInfo: DeliveryAddressData | null;
}

function ProfilePage({ userInfo: serverUserInfo, deliveryInfo: serverDeliveryInfo }: ProfilePageProps) {
  const { isAuthenticated, logout } = useAuth();

  // Fallback to client-side fetching if server-side fetch failed
  const { data: clientUserInfo } = useQuery({
    queryKey: USE_QUERY_KEY.AUTH_USER(),
    queryFn: fetchProfile,
    enabled: !serverUserInfo && isAuthenticated,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
  });

  const { data: clientDeliveryInfo } = useQuery({
    queryKey: USE_QUERY_KEY.USER_ADDRESS(),
    queryFn: getUserAddress,
    enabled: !serverDeliveryInfo && isAuthenticated,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
  });

  // Use server data if available, otherwise fallback to client data
  const userInfo = serverUserInfo || (clientUserInfo as UserAuth | null) || null;
  const deliveryInfo = serverDeliveryInfo || (clientDeliveryInfo as DeliveryAddressData | null) || null;

  return (
    <>
      <div className='container'>
        <div className='mb-8 space-y-1 text-center'>
          <h2 className='text-3xl font-heading font-bold'>Profile</h2>
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
