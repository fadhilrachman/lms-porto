'use client';

import { useGetMe } from '@/hooks/profile.hook';
import { Avatar } from '@nextui-org/avatar';
import React from 'react';
// import { SiGmail } from 'react-icons/si';

export default function Profile() {
  const { data, isFetching } = useGetMe();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="h-96 w-fit flex flex-col justify-center items-center p-6">
        <Avatar src="/images/thought-catalog.jpg" size="lg" fallback />
        <p className="text-2xl font-semibold mt-6">{data?.user_name}</p>
        <p>{data?.email}</p>
      </div>
    </div>
  );
}
