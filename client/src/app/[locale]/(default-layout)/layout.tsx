import React from 'react';
import { Footer, Header } from '@/components/layouts';
import { cookies } from 'next/headers';
import { getUserProfile } from '@/libs/server-fetchers/user';

export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value || null;
  let avatarUrl = null;
  if (accessToken) {
    const userProfile = await getUserProfile();
    if (userProfile) {
      avatarUrl = userProfile.profile?.avatarUrl;
    }
  }

  return (
    <main className='mx-auto'>
      <Header avatarUrl={avatarUrl} />

      <div className='mx-auto pt-[124px] md:pt-[133px]'>{children}</div>

      <Footer />
    </main>
  );
}
