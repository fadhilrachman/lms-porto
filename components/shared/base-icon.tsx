import React from "react";
import * as SiIcons from "react-icons/si";

const BaseIcon = ({ iconKey }: { iconKey?: string }) => {
  if (!iconKey) return null;

  const IconComponent = SiIcons[iconKey as keyof typeof SiIcons] as
    | React.ComponentType
    | undefined;

  if (!IconComponent) return null;

  return <IconComponent />;
};

export default BaseIcon;
