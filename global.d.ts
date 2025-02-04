// global.d.ts (letakkan di folder `src` atau di root proyek)
declare module "clsx" {
  export type ClassValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | { [key: string]: boolean };
}
