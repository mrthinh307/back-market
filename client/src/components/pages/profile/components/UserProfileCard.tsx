'use client';

import ProfileCardContainer from './ProfileCardContainer';
import { UserAuth } from '@/types/user.types';

interface UserProfileCardProps {
  userInfo: UserAuth | null;
}

function UserProfileCard({ userInfo }: UserProfileCardProps) {
  const handleEditButtonClick = () => {
    console.log('Edit button clicked');
  };

  return (
    <ProfileCardContainer
      onEditButtonClick={handleEditButtonClick}
      title='Personal details'
    >
      <div className='w-[20ch] truncate lg:w-[40ch]'>
        {userInfo?.profile?.firstName} {userInfo?.profile?.lastName}
      </div>
      <div>
        <div
          className={`${userInfo?.emailVerified ? 'text-green-600' : 'text-yellow-600'}`}
        >
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
            {userInfo?.emailVerified ? 'Verified' : 'Not Verified'}
          </div>
        </div>
      </div>
      <div className='w-[20ch] truncate lg:w-[40ch]'>
        {userInfo?.email}
      </div>
      <div className='mt-4 flex flex-col gap-4'>
        <span className='underline font-semibold cursor-pointer'>
          Change password
        </span>
        <span className='underline font-semibold cursor-pointer'>
          Delete your account
        </span>
      </div>
    </ProfileCardContainer>
  );
}

export default UserProfileCard;