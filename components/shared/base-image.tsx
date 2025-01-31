"use client";

import NextImage, { ImageProps as NextImageProps } from "next/image";

import clsx from "clsx";
import { useState } from "react";

type ImageProps = {
  rounded?: string;
  src: string;
} & NextImageProps;

const BaseImg = (props: ImageProps) => {
  const { alt, src, className, rounded, ...rest } = props;
  const [isLoading, setLoading] = useState(true);

  return (
    <div
      className={clsx(
        "overflow-hidden",
        isLoading ? "animate-pulse" : "",
        rounded
      )}
    >
      <img
        data-testid="image"
        className={clsx(
          "duration-700 ease-in-out",
          isLoading
            ? "scale-[1.02] blur-xl grayscale"
            : "scale-100 blur-0 grayscale-0",
          rounded,
          className
        )}
        src={src}
        alt={"IMAGE CUYYYYY"}
        loading="lazy"
        width={100}
        height={300}
        quality={100}
        onLoad={() => setLoading(false)}
        {...rest}
      />
    </div>
  );
};
export default BaseImg;
