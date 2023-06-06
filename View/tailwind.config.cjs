const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto"],
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        babarBeige: "#FAF2E5",
        babarBeigeDark: "#F2D7AA",
        babarYellow: "#F0BD40",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        // make scrollbar invisible for all browsers
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none",
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    }),
  ],
};
