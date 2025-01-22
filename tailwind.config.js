const { heroui } = require("@heroui/theme");
import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(autocomplete|button|ripple|spinner|form|input|listbox|divider|popover|scroll-shadow).js",
  ],
  theme: {
    extend: {
      colors: {
        backgroundGrayDark: "#18181B",
        backgroundGrayLight: "#f5f5f5",
        borderColor: "#3A3A3A",
        backgroundColor: "#181230",
        textGray: {
          light: "#6B7280",
          dark: "#9CA3AF",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), heroui()],
};
