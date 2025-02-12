'use client';

import { Avatar } from '@nextui-org/avatar';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/navbar';
import { Home, LogOut, LucideBookMarked, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { Link } from '@nextui-org/link';

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function NavbarAdminUser() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove(process.env.COOKIE_NAME as string);
    router.push('/login');
  };

  const menuItems = [
    {
      title: 'Profile',
      url: '/profile/profile',
      icon: User,
    },
    {
      title: 'My Courses',
      url: '/profile/courses',
      icon: LucideBookMarked,
    },
    {
      title: 'Transaction',
      url: '/profile/transaction',
      icon: Home,
    },
  ];

  return (
    <Navbar
      className="border-b border-neutral-800 fixed top-0 left-0 right-0"
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="start">
        <NavbarBrand
          onClick={() => router.push('/')}
          className="cursor-pointer"
        >
          <AcmeLogo />
          <p className="hidden sm:block font-bold text-inherit">LMS</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className="sm:hidden h-10"
      />
      <NavbarContent
        as="div"
        className="items-center hidden sm:flex !justify-end"
      >
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Fadhil"
              size="sm"
              // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="logout" color="danger" onPress={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu className="justify-between py-6">
        <NavbarMenuItem>
          {menuItems.map((item, index) => (
            <Link
              key={`${item}-${index}`}
              className="w-full space-x-3 space-y-3"
              color={'foreground'}
              href={item.url}
              size="lg"
            >
              {<item.icon className="h-5 w-5" />}
              <span className="">{item.title}</span>
            </Link>
          ))}
        </NavbarMenuItem>
        <Link
          key="logout"
          color="danger"
          onPress={handleLogout}
          className="space-x-3"
        >
          <LogOut size={20} />
          <span>Log Out</span>
        </Link>
      </NavbarMenu>
    </Navbar>
  );
}
