import { Card, CardBody } from '@nextui-org/card';
import React from 'react';
import Marquee from 'react-fast-marquee';
import {
  IoLogoJavascript,
  IoLogoPython,
  IoLogoReact,
  IoLogoVue,
  IoLogoAngular,
  IoLogoNodejs,
  IoLogoLaravel,
  IoLogoHtml5,
  IoLogoCss3,
  IoLogoGithub,
  IoLogoGitlab,
  IoLogoDocker,
  IoLogoVercel,
  IoLogoAmazon,
  IoLogoGoogle,
  IoLogoAndroid,
  IoLogoApple,
  IoLogoFigma,
} from 'react-icons/io5';

import Title from './title';

const logoListFirst = [
  {
    name: 'HTML',
    logo: <IoLogoHtml5 className="text-orange-600" size={24} />,
  },
  {
    name: 'CSS',
    logo: <IoLogoCss3 className="text-blue-500" size={24} />,
  },
  {
    name: 'Javascript',
    logo: <IoLogoJavascript className="text-yellow-500" size={24} />,
  },
  {
    name: 'Python',
    logo: <IoLogoPython className="text-yellow-300" size={24} />,
  },
  {
    name: 'React',
    logo: <IoLogoReact className="text-cyan-400" size={24} />,
  },
  {
    name: 'Vue',
    logo: <IoLogoVue className="text-green-700" size={24} />,
  },
  {
    name: 'Angular',
    logo: <IoLogoAngular className="text-red-700" size={24} />,
  },
  {
    name: 'Nodejs',
    logo: <IoLogoNodejs className="text-green-600" size={24} />,
  },
  {
    name: 'Laravel',
    logo: <IoLogoLaravel className="text-orange-600" size={24} />,
  },
];

const logoListSecond = [
  {
    name: 'Github',
    logo: <IoLogoGithub size={24} />,
  },
  {
    name: 'Gitlab',
    logo: <IoLogoGitlab className="text-orange-500" size={24} />,
  },
  {
    name: 'Docker',
    logo: <IoLogoDocker className="text-blue-500" size={24} />,
  },
  {
    name: 'Vercel',
    logo: <IoLogoVercel size={24} />,
  },
  {
    name: 'Amazon',
    logo: <IoLogoAmazon size={24} />,
  },
  {
    name: 'Google',
    logo: <IoLogoGoogle size={24} />,
  },
  {
    name: 'Android',
    logo: <IoLogoAndroid className="text-green-500" size={24} />,
  },
  {
    name: 'Apple',
    logo: <IoLogoApple size={24} />,
  },
  {
    name: 'Figma',
    logo: <IoLogoFigma size={24} />,
  },
];

const Category = () => {
  return (
    <div className="py-12 space-y-6">
      {' '}
      <Title
        className="text-center"
        subTitle="Learn New Skills According to your interests"
        title="  Our Recomended"
      />
      <Marquee
        pauseOnHover
        className="flex space-x-4 "
        gradient={false}
        speed={50}
      >
        {logoListFirst.map((item, key) => {
          return (
            <Card
              key={key}
              className="w-max border shadow-none dark:border-borderColor cursor-pointer group mx-4 hover:border-blue-600 dark:hover:border-blue-600"
            >
              <CardBody className="hover:text-primary-500">
                <div className="flex items-center space-x-4 px-8">
                  {item.logo}
                  <span className="text-xl">{item.name}</span>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </Marquee>
      <Marquee
        pauseOnHover
        className="flex space-x-4 "
        direction="right"
        gradient={false}
        speed={50}
      >
        {logoListSecond.map((item, key) => {
          return (
            <Card
              key={key}
              className="w-max border shadow-none dark:border-borderColor cursor-pointer group mx-4 hover:border-blue-600 dark:hover:border-blue-600"
            >
              <CardBody className="hover:text-primary-500">
                <div className="flex items-center space-x-4 px-8">
                  {item.logo}
                  <span className="text-xl">{item.name}</span>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </Marquee>
    </div>
  );
};

export default Category;
