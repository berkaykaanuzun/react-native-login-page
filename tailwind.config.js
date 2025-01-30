/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#FFFFFF",
        bgGradientStart: "#2A3502",
        bgGradientMid: "#495A04",
        bgGradientEnd: "#5C7005",
        buttonGradientStart: "#FFFFFF",
        buttonGradientEnd: "#E0E0E0",
      },
      padding: {
        inputHorizontal: "20px",
        inputVertical: "18px",
        page: "60px",
      },
      fontSize: {
        title: "18px",
        input: "14px",
        label: "18px"
      },
      fontFamily: {
        lato: ["Lato_400Regular", "sans-serif"  ],
        latoBold: ["Lato_700Bold", "sans-serif"],
        latoBlack: ["Lato_900Black", "sans-serif"],
        latoLight: ["Lato_300Light", "sans-serif"],
      },
    },
  },
  plugins: [],
};
