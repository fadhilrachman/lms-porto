import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Button } from '@nextui-org/button';
import { ArrowLeft, Check, CheckCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const items = [
  {
    key: 1,
    title: 'content 1',
    content: [
      {
        sub_title: 'content 1',
        isChecked: true,
      },
      {
        sub_title: 'content 2',
        isChecked: false,
      },
    ],
  },
  {
    key: 2,
    title: 'content 1',
    content: [
      {
        sub_title: 'content 1',
        isChecked: true,
      },
      {
        sub_title: 'content 2',
        isChecked: false,
      },
    ],
  },
  {
    key: 3,
    title: 'content 1',
    content: [
      {
        sub_title: 'content 1',
        isChecked: true,
      },
      {
        sub_title: 'content 2',
        isChecked: false,
      },
    ],
  },
];
const ChapterSidebar = () => {
  const router = useRouter();
  return (
    <div className="min-w-[350px] space-y-6 z-50 h-full fixed py-6 px-3 border-r border-neutral-800">
      <div className="flex items-center gap-3 px-3">
        <Button variant="light" onPress={() => router.back()}>
          <ArrowLeft />
          <span className="font-semibold text-lg">My Courses</span>
        </Button>
      </div>
      <Accordion
        variant="splitted"
        defaultExpandedKeys={'1'}
        className="max-w-full"
      >
        {items.map((item) => (
          <AccordionItem
            key={item.key}
            aria-label={item.title}
            title={item.title}
          >
            <div className="space-y-3">
              {item.content.map((res, i) => (
                <div
                  key={i}
                  className="cursor-pointer flex justify-between rounded-xl bg-neutral-800  px-4 py-3"
                >
                  <span>{res.sub_title}</span>
                  {res.isChecked ? (
                    <CheckCheck className="text-green-500" />
                  ) : null}
                </div>
              ))}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ChapterSidebar;
