import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
const Faq = () => {
  const listDataAccordion = [
    {
      title: "What is an LMS?",
      description:
        "An LMS is a web-based learning management system that allows users to access training materials, take exams, and track learning progress online.",
    },
    {
      title: "What are the main features available in this LMS?",
      description:
        "User management (admin, user), Virtual classes and learning modules, Interactive quizzes and project-based assignments, Reporting and analysis of learning performance, Certification upon course completion.",
    },
    {
      title: "Can I access this LMS via mobile device?",
      description:
        "Yes! The LMS is compatible with desktop, tablet, and smartphone devices via browser.",
    },
    {
      title: "How to register as a user?",
      description:
        "To register, click the “Register” button on the main page, fill out the registration form, and confirm via the email sent.",
    },
  ];

  return (
    <section className="px-6 md:px-16 space-y-6" id="faq">
      <h3 className="text-xl sm:text-2xl md:text-3xl text-center font-semibold ">
        Frequently Asked Questions
      </h3>
      <div className="!max-w-[1000px] mx-auto">
        <Accordion className="space-y-6" variant="splitted">
          {listDataAccordion.map((val, key) => {
            return (
              <AccordionItem
                key={key}
                aria-label="Accordion 1"
                title={val.title}
              >
                {val.description}
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
