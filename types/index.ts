import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface BaseResponseList<T> {
  message: string;
  data: T[];
  pagination: {
    current: number;
    total_page: number;
    total_data: number;
  };
}
