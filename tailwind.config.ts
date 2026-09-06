import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        washi: {
          50: "#FAF8F5",
          100: "#F5F2EB",
          200: "#EFECE6",
          300: "#E5DFD5",
          400: "#D8CFC4",
        },
        sumi: {
          900: "#1A1817",
          800: "#292524",
          700: "#44403C",
          600: "#57534E",
        },
        hanko: {
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
        },
        eartag: {
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        matcha: {
          700: "#2D5A3E",
          800: "#1E3A2B",
        }
      },
      fontFamily: {
        serif: ["var(--font-noto-serif-jp)", "Shippori Mincho", "Hiragino Mincho ProN", "Yu Mincho", "serif"],
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(0, 0, 0, 0.04)",
        card: "0 4px 20px -2px rgba(28, 25, 23, 0.06)",
        "card-hover": "0 12px 28px -4px rgba(28, 25, 23, 0.12)",
      }
    },
  },
  plugins: [],
};
export default config;