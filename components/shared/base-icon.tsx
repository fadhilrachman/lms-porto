import React from "react";
import * as VscIcons from "react-icons/si";
const BaseIcon = ({ iconKey }: { iconKey: string }) => {
  const IconComponent = VscIcons[iconKey as keyof typeof VscIcons];

  return <IconComponent />;
};

export default BaseIcon;
