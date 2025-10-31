import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import ProfilePage from '@/components/pages/profile/ProfilePage';
import { getUserAddress, getUserProfile } from '@/libs/server-fetchers/user';
import { USE_QUERY_KEY } from '@/constants/use-query-key';

export default async function Profile() {
  const queryClient = new QueryClient();

  // Fetch user profile (not cached in React Query, just for SSR)
  const userInfo = await getUserProfile();

  // Prefetch address data for React Query cache
  await queryClient.prefetchQuery({
    queryKey: USE_QUERY_KEY.USER_ADDRESS(),
    queryFn: getUserAddress,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfilePage userInfo={userInfo} />
    </HydrationBoundary>
  );
}
