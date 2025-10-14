import ProfilePage from '@/components/pages/profile/ProfilePage';
import { getUserAddress, getUserProfile } from '@/libs/server-fetchers/user';

export default async function Profile() {
  const [userInfo, deliveryInfo] = await Promise.all([
    getUserProfile(),
    getUserAddress(),
  ]);

  return <ProfilePage userInfo={userInfo} deliveryInfo={deliveryInfo} />;
}
