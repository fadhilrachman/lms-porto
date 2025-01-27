"use client";

import { Button } from "@nextui-org/button";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { useParams, useRouter } from "next/navigation";
import { IoPlayCircle } from "react-icons/io5";
import React from "react";

import LoadingFullpage from "@/components/shared/loading-fullpage";
import Footer from "@/components/home/footer";
import { Navbar } from "@/components/shared/navbar";
import { useGetDetailCourse } from "@/hooks/course-user.hooks";

const LayoutLearn = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { course_id, content_id } = useParams();
  const { data, isFetching } = useGetDetailCourse(course_id as string);

  return isFetching ? (
    <LoadingFullpage />
  ) : (
    <div className="relative space-y-12  ">
      {" "}
      <Navbar />
      <div className="px-4 sm:px-12 md:px-24 xl:px-36 space-y-12">
        <div className=" grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* <Chapter List> */}
          <div className=" border-r border-neutral-800 w-full col-span-2 space-y-4">
            <div className="sticky top-14 min-h-max px-2 py-0">
              <h2 className="pl-3 pb-6 text-xl font-semibold">Chapter</h2>
              <Accordion className="space-y-2" variant="splitted">
                {data?.result.chapter.map((chapter, key) => {
                  return (
                    <AccordionItem
                      key={key}
                      aria-label="Accordion 1"
                      className="pb-3"
                      title={chapter.title}
                    >
                      {chapter.content.length !== 0 ? (
                        <div className="space-y-4">
                          {chapter.content.map((content, key) => (
                            <Button
                              key={key}
                              className="w-full justify-start py-6"
                              color={
                                content.id == content_id ? "primary" : "default"
                              }
                              onPress={() => {
                                router.push(
                                  `/course/${course_id}/learn/${content.id}`,
                                );
                              }}
                            >
                              <IoPlayCircle size={28} />
                              <p className="text-md">{content.title}</p>
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <p>Content is empty</p>
                      )}
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LayoutLearn;
