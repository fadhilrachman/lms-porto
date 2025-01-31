'use client';

import { Avatar } from '@nextui-org/avatar';
import Image from 'next/image';
import React from 'react';
import { SiGmail } from 'react-icons/si';

export default function Profile() {
  return (
    <div>
      <div className="flex gap-6 p-6">
        <Avatar src="/images/thought-catalog.jpg" size="lg" />
        <div className="">
          <p className="text-2xl font-semibold">Pepep Saepul Rohman</p>
          <p className=" flex items-center gap-1">
            <SiGmail size={16} /> <span>test@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
