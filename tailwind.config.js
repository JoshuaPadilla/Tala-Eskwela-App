/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#124170",
          200: "#26667F",
          300: "#67C090",
          400: "#DDF4E7",
        },
        background: "#e6f0e9",
        black: {
          100: "#1E1E1E",
          200: "#4D4D4D",
          300: "#8C8E98",
          400: "#E5E5E5",
        },
        danger: "#F75555",
        status: {
          pending: "#ffcc80",
          processing: "#64b5f6",
          completed: "#a5d6a7",
        },
      },
    },
  },
  plugins: [],
};
