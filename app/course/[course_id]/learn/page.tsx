"use client";
import AboutCourse from "@/components/home/course/detail/about-course";
import Footer from "@/components/home/footer";
import Title from "@/components/home/title";
import { Navbar } from "@/components/shared/navbar";
import VideoRender from "@/components/shared/video-render";
import { Button } from "@nextui-org/button";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import {
  Check,
  FileVideo,
  Globe,
  ScrollText,
  TableOfContents,
} from "lucide-react";
import { IoPlayCircle, IoCheckmarkCircle } from "react-icons/io5";
import React, { useState } from "react";
import { Home } from "lucide-react";
import YouTube from "react-youtube";
const LearnCourse = () => {
  const [tab, setTab] = useState("About");

  const listSidebar = [
    {
      title: "Dashboard",
      url: "/profile/dashboard",
      icon: Home,
    },
    {
      title: "Course",
      url: "/profile/course",
      icon: Home,
    },
    {
      title: "Transaction",
      url: "/profile/dashboard",
      icon: Home,
    },
  ];

  const listTab = [
    {
      title: "About",
      href: "#aboutCourse",
    },
    {
      title: "Content",
      href: "#contentCourse",
    },
  ];

  return (
    <div className="relative space-y-12  ">
      {" "}
      <Navbar />
      <div className="px-4 sm:px-12 md:px-24 xl:px-36 space-y-12">
        <div className=" grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* <Chapter List> */}
          <div className=" border-r border-neutral-800 w-full col-span-2 space-y-4">
            <div className="sticky top-14 min-h-max px-2 py-0">
            <h2 className="pl-3 pb-6 text-xl font-semibold">Chapter</h2>
            <Accordion variant="splitted" className="space-y-2">
            {listSidebar.map((val, key) => {
                return (
                    <AccordionItem
                    key={key}
                    aria-label="Accordion 1"
                    className="pb-3"
                    title={val.title}
                    >   
                        <div className="space-y-4">
                            <Button
                                color="primary"
                                className="w-full justify-start py-6"
                                onPress={() => {
                                }}
                            >
                                <IoPlayCircle size={28} />
                                <p className="text-md">
                                    Introduction
                                </p>
                            </Button>
                            <Button
                                color="default"
                                className="w-full justify-start py-6"
                                onPress={() => {
                                }}
                            >
                                <IoPlayCircle size={28} />
                                <p className="text-md">
                                    Configuration
                                </p>
                            </Button>
                            <Button
                                color="default"
                                className="w-full justify-start py-6"
                                onPress={() => {
                                }}
                            >
                                <IoPlayCircle size={28} />
                                <p className="text-md">
                                    Get started
                                </p>
                            </Button>

                        </div>
                    </AccordionItem>
                );
            })}
            </Accordion>
            </div>
          </div>
          {/* </Chapter List> */}
          {/* <Video Player> */}
          <div className="col-span-4 space-y-4 ">
            <VideoRender url="https://www.youtube.com/watch?v=8NCyvC9OTOA" />
            {/* Video Section */}
            <div className=" border-b pb-3 dark:border-borderColor">
              <div className="flex flex-row justify-between">
                <div className="space-x-4">
                    {listTab.map((val, key) => {
                        return (
                        <Button
                            color={val.title == tab ? "secondary" : "default"}
                            onPress={() => {
                            setTab(val.title);
                            }}
                            size="lg"
                            key={key}
                        >
                            {val.title}
                        </Button>
                        );
                    })}
                </div>
                <Button
                    color="primary"
                    className="w-28 py-6"
                    onPress={() => {
                    }}
                >
                    <IoCheckmarkCircle size={28} />
                    <p className="text-md">
                        Done
                    </p>
                </Button>
              </div>
            </div>
            <div className="space-y-8">
              <AboutCourse />
            </div>
          </div>
          {/* </Video Player> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LearnCourse;
