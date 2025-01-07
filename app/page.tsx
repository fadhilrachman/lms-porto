"use client";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import ListCourse from "@/components/home/list-course";
import { Navbar } from "@/components/shared/navbar";

export default function Home() {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        <div className="space-y-4">
          <section className="flex  items-end justify-between gap-4 py-8 ">
            <div className="">
              <p className="text-primary-500">Our Recomended</p>
              <h3 className="text-3xl font-semibold max-w-[400px]">
                Learn New Skills According to your interests
              </h3>
            </div>
            <Button color="primary">See All Class</Button>
          </section>
          <ListCourse />
        </div>
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
          title="nextui.org homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">NextUI</p>
        </Link>
      </footer>
    </div>
  );
}
