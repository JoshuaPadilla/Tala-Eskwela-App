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
      fontFamily: {
        "poppins-bold": ["Poppins-Bold", "sans-serif"],
        "poppins-extrabold": ["Poppins-ExtraBold", "sans-serif"],
        "poppins-light": ["Poppins-Light", "sans-serif"],
        "poppins-medium": ["Poppins-Medium", "sans-serif"],
        "poppins-regular": ["Poppins-Regular", "sans-serif"],
        "poppins-semibold": ["Poppins-SemiBold", "sans-serif"],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-regular": ["Rubik-Regular", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
      },
      colors: {
        schedStatus: {
          upcoming: "#ABE7B2",
          ongoing: "#FFF9BD",
          ended: "#FF8F8F",
        },
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
          late: "#FCC61D",
          absent: "#F75555",
          present: "#B6F500",
        },
      },
    },
  },
  plugins: [],
};
