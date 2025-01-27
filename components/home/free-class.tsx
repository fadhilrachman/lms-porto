import { Card, CardBody } from "@nextui-org/card";
import Image from "next/image";
import React from "react";
import { Button } from "@nextui-org/button";

import Title from "./title";

import benchAccountingImage from "@/public/images/bench-accounting.jpg";
import glenCarstensPetersImage from "@/public/images/glenn-carstens-peters.jpg";
import kobuAgencyImage from "@/public/images/kobu-agency.jpg";
import linkedinSalesSolutionsImage from "@/public/images/linkedin-sales-solutions.jpg";
import mimiThianImage from "@/public/images/mimi-thian.jpg";
import nathanDumlaoImage from "@/public/images/nathan-dumlao.jpg";
import priscillaDuPrezzImage from "@/public/images/priscilla-du-preez.jpg";
import scottGrahamImage from "@/public/images/scott-graham.jpg";
import surfaceImage from "@/public/images/surface.jpg";
import thoughtCatalogImage from "@/public/images/thought-catalog.jpg";
import trueAgencyImage from "@/public/images/true-agency.jpg";

const srcList = [
  {
    image: benchAccountingImage,
  },
  {
    image: glenCarstensPetersImage,
  },
  {
    image: kobuAgencyImage,
  },
  {
    image: linkedinSalesSolutionsImage,
  },
  {
    image: mimiThianImage,
  },
  {
    image: nathanDumlaoImage,
  },
  {
    image: priscillaDuPrezzImage,
  },
  {
    image: scottGrahamImage,
  },
  {
    image: surfaceImage,
  },
  {
    image: thoughtCatalogImage,
  },
  {
    image: trueAgencyImage,
  },
];

// const FreeClass = () => {
//   return (
//     <Card className="md:mx-[300px] p-0 rounded-3xl  bg-backgroundColor text-white">
//       <CardBody className="p-0">
//         <div className="flex flex-row overflow-hidden w-full">
//           <div className="space-y-4 p-6">
//             <Title
//               subTitle="Join Free Classes"
//               subTitle2="Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, excepturi"
//             />
//             <Button color="primary">Join</Button>
//           </div>
//           <Marquee
//             className=""
//             gradient={false}
//             speed={50}
//             direction="up"
//           >
//             {srcList.map((item, key) => {
//               return (
//                   <Image
//                     key={key}
//                     alt='product'
//                     height={150}
//                     // width={250}
//                     objectFit="cover"
//                     style={{
//                       margin: '10px',
//                       // height: '150px',
//                       width: 'full-width'
//                     }}
//                     src={item.image}
//                   />

//               );
//             })}
//           </Marquee>
//         </div>
//       </CardBody>
//     </Card>
//   );
// };

const FreeClass = () => {
  return (
    <Card className="h-48 md:mx-[300px] p-0 rounded-3xl bg-gradient-to-br from-indigo-800 to-backgroundColor text-white">
      <CardBody className="p-0 overflow-hidden">
        <div className="w-full">
          <div className="absolute right-0">
            <Image
              alt="free-class-bg"
              className="h-max opacity-30"
              src={kobuAgencyImage}
              style={{ objectPosition: "0 -100px" }}
            />
          </div>
          <div className="space-y-4 p-6 w-full h-screen absolute">
            <Title
              subTitle="Join Free Classes"
              subTitle2="Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, excepturi"
            />
            <Button color="primary">Join</Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default FreeClass;
