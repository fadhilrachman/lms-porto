"use client";
import AboutCourse from "@/components/home/course/detail/about-course";
import Footer from "@/components/home/footer";
import Title from "@/components/home/title";
import { Navbar } from "@/components/shared/navbar";
import VideoRender from "@/components/shared/video-render";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import {
  Check,
  FileVideo,
  Globe,
  ScrollText,
  TableOfContents,
} from "lucide-react";
import React, { useState } from "react";
import YouTube from "react-youtube";
const CourseDetail = () => {
  const [tab, setTab] = useState("About");

  const listTab = [
    {
      title: "About",
      href: "#aboutCourse",
    },
    {
      title: "Content",
      href: "#contentCourse",
    },
    // {
    //   title: "Review",
    //   href: "#reviewCourse",
    // },
  ];
  return (
    <div className="relative space-y-12  ">
      {" "}
      <Navbar />
      <div className="px-4 sm:px-12 md:px-24 xl:px-36 space-y-12">
        <div className="max-w-[600px] text-center mx-auto">
          <h3 className="text-3xl font-semibold mb-2">Online Course</h3>
          <Title
            className="text-center  mx-auto space-y-2"
            subTitle="Kelas Online WP Elementor Mastery: Bikin Website Portofolio Professional"
            subTitle2="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, nisi"
          />
          <div className="flex items-center mt-4 justify-center space-x-2">
            <Globe />
            <p>
              Release Date{" "}
              <span className="text-secondary font-semibold">12 June 2020</span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          <div className="col-span-4 space-y-4 ">
            <VideoRender url="https://www.youtube.com/watch?v=8NCyvC9OTOA" />

            <div className="space-x-4 border-b pb-3 dark:border-borderColor">
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
            <div className="space-y-8">
              <AboutCourse />
            </div>
          </div>
          <div className="col-span-2 space-y-4 w-full">
            <Card className="w-full">
              <CardHeader className="pb-0">Benefits for you</CardHeader>
              <CardBody as={"div"} className="space-y-4">
                <div className="border flex justify-between items-center rounded-2xl p-3 dark:border-borderColor">
                  <div className="flex items-center space-x-2">
                    <TableOfContents />
                    <p className="text-sm">27 Chapter</p>
                  </div>
                  <Check className="text-green-500" />
                </div>
                <div className="border flex justify-between items-center rounded-2xl p-3 dark:border-borderColor">
                  <div className="flex items-center space-x-2">
                    <FileVideo />
                    <p className="text-sm">27 Video</p>
                  </div>
                  <Check className="text-green-500" />
                </div>{" "}
                <div className="border flex justify-between items-center rounded-2xl p-3 dark:border-borderColor">
                  <div className="flex items-center space-x-2">
                    <ScrollText />
                    <p className="text-sm">Get Certificate</p>
                  </div>
                  <Check className="text-green-500" />
                </div>
              </CardBody>
            </Card>

            <Button color="primary" className="w-full">
              Buy Course
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetail;
