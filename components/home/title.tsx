import React from "react";

interface Props {
  title?: string;
  subTitle?: string;
  subTitle2?: string;
  className?: string;
}
const Title = ({ subTitle, title, className, subTitle2 }: Props) => {
  return (
    <div className={` ${className}`}>
      <p className="text-primary-500 font-semibold text-xl">{title}</p>
      <h3 className="text-3xl font-semibold">{subTitle}</h3>
      <p className="mt-2 text-neutral-300 max-w-[500px]">{subTitle2}</p>
    </div>
  );
};

export default Title;
