'use client';

import { useEffect } from 'react';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import { useGetCookie } from 'cookies-next';
import Cookies from 'js-cookie';

import ListCourse from '@/components/home/list-course';
import { Navbar } from '@/components/shared/navbar';
import Faq from '@/components/home/faq';
import Category from '@/components/home/category';
import Title from '@/components/home/title';
import FreeClass from '@/components/home/free-class';
import Community from '@/components/home/community';
import Footer from '@/components/home/footer';

export default function Home() {
  const router = useRouter();
  const getCookie = useGetCookie();

  return (
    <div className="relative flex flex-col w-full h-screen">
      <Navbar />
      <main className="  pt-16  ">
        <div className="space-y-16 ">
          <section className="flex   px-16 items-end justify-between  ">
            <Title
              subTitle="Learn New Skills According to your interests"
              title="OurRecomended"
              className="max-w-[450px]"
            />
            <Button
              color="primary"
              onPress={() => {
                router.push('/course');
              }}
            >
              See All Class
            </Button>
          </section>
          <ListCourse />
          <Category />
          <FreeClass />
          <Community />
          <Faq />
          <Footer />
        </div>
      </main>
      {/* <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
          title="nextui.org homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">NextUI</p>
        </Link>
      </footer> */}
    </div>
  );
}
