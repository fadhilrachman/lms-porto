"use client"

import React, { useState } from 'react'
import { IoCheckmarkCircle } from 'react-icons/io5';
import { Button } from "@nextui-org/button";
import { useParams } from "next/navigation";


import VideoRender from '@/components/shared/video-render';
import AboutCourse from '@/components/home/course/detail/about-course';

export default function Content() {
	const { content_id } = useParams();
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
  ];

  return (
		<div className="col-span-4 space-y-4 ">
			<VideoRender url="https://www.youtube.com/watch?v=8NCyvC9OTOA" />

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
  )
}
