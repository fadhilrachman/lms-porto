import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
const Faq = () => {
  const listDataAccordion = [
    {
      title: "Can a beginner join in?",
      description:
        "BuildWithAngga menyediakan mentor dan kelas online UI/UX Design, Web Development, Freelancer, Data Science yang bisa dipelajari secara gratis, sangat dianjurkan untuk pemula atau Anda yang ingin switch career. Setelah menyelesaikan kelas gratis, BuildWithAngga menyarankan Anda mengikuti kelas Premium dalam membangun portfolio yang digunakan sebagai modal bekerja.",
    },
    {
      title: "Can a beginner join in?",
      description:
        "BuildWithAngga menyediakan mentor dan kelas online UI/UX Design, Web Development, Freelancer, Data Science yang bisa dipelajari secara gratis, sangat dianjurkan untuk pemula atau Anda yang ingin switch career. Setelah menyelesaikan kelas gratis, BuildWithAngga menyarankan Anda mengikuti kelas Premium dalam membangun portfolio yang digunakan sebagai modal bekerja.",
    },
    {
      title: "Can a beginner join in?",
      description:
        "BuildWithAngga menyediakan mentor dan kelas online UI/UX Design, Web Development, Freelancer, Data Science yang bisa dipelajari secara gratis, sangat dianjurkan untuk pemula atau Anda yang ingin switch career. Setelah menyelesaikan kelas gratis, BuildWithAngga menyarankan Anda mengikuti kelas Premium dalam membangun portfolio yang digunakan sebagai modal bekerja.",
    },
    {
      title: "Can a beginner join in?",
      description:
        "BuildWithAngga menyediakan mentor dan kelas online UI/UX Design, Web Development, Freelancer, Data Science yang bisa dipelajari secara gratis, sangat dianjurkan untuk pemula atau Anda yang ingin switch career. Setelah menyelesaikan kelas gratis, BuildWithAngga menyarankan Anda mengikuti kelas Premium dalam membangun portfolio yang digunakan sebagai modal bekerja.",
    },
  ];
  return (
    <section className="px-16 space-y-6" id="faq">
      <h3 className="text-3xl text-center font-semibold ">
        Frequently Asked Questions
      </h3>
      <div className="!max-w-[1000px] mx-auto">
        <Accordion variant="splitted" className="space-y-6">
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
