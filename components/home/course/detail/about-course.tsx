import React from "react";

import Title from "../../title";

const AboutCourse = ({ description }: { description: string }) => {
  return (
    <section className="space-y-4" id="aboutCourse">
      <Title subTitle="About" />
      <div className="space-y-3">
        <p>{description}</p>
      </div>
    </section>
  );
};

export default AboutCourse;
