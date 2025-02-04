'use client';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { link as linkStyles } from '@nextui-org/theme';
import NextLink from 'next/link';
import clsx from 'clsx';
import { Avatar } from '@nextui-org/avatar';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { GithubIcon, Logo } from '@/components/shared/icons';
import { ThemeSwitch } from '@/components/theme-switch';
import { siteConfig } from '@/config/site';
import { LayoutDashboard, LogOut, LucideBookMarked, User } from 'lucide-react';

export const Navbar = () => {
  const [myCookie, setMyCookie] = useState<string | undefined>(undefined);
  const isAdmin = JSON.parse(localStorage.getItem('is_admin')) || false;
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove(process.env.COOKIE_NAME as string);
    localStorage.removeItem('is_admin');
    router.push('/login');
  };

  useEffect(() => {
    // Pastikan cookie dibaca hanya di klien
    const cookie = Cookies.get(process.env.COOKIE_NAME as string);

    setMyCookie(cookie);
  }, []);

  return (
    <NextUINavbar className="shadow px-6" maxWidth="full" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">LMS</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium',
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {myCookie ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
              />
            </DropdownTrigger>

            <DropdownMenu aria-label="Profile Actions" variant="flat">
              {!isAdmin ? (
                <>
                  <DropdownItem
                    key="help_and_feedback"
                    onPress={() => {
                      router.push('/profile/profile');
                    }}
                  >
                    <div className="flex items-center gap-2 border-b border-neutral-400 py-2">
                      <User size={20} />
                      <span>Profile</span>
                    </div>
                  </DropdownItem>
                  <DropdownItem
                    key="my_courses"
                    onPress={() => {
                      router.push('/profile/courses');
                    }}
                  >
                    <div className="flex items-center gap-2 border-b border-neutral-400 py-2">
                      <LucideBookMarked size={20} />
                      <span>My Courses</span>
                    </div>
                  </DropdownItem>
                </>
              ) : (
                <>
                  <DropdownItem
                    key="help_and_feedback"
                    onPress={() => {
                      router.push('/dashboard/course');
                    }}
                  >
                    <div className="flex items-center gap-2 border-b border-neutral-400 py-2">
                      <LayoutDashboard size={20} />
                      <span>Dashboard</span>
                    </div>
                  </DropdownItem>
                </>
              )}
              <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                <div className="flex items-center gap-2">
                  <LogOut size={20} />
                  <span>Log Out</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NextLink
            className={clsx(
              linkStyles({ color: 'foreground' }),
              'data-[active=true]:text-primary data-[active=true]:font-medium',
            )}
            color="foreground"
            href={'/login'}
          >
            <Button color="primary">Login</Button>
          </NextLink>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === siteConfig.navMenuItems.length - 1
                      ? 'danger'
                      : 'foreground'
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
