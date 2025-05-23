/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}", "./public/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        background: "#EEEEEE",
        main: "#47A992",
        second: "#2D3332",
        thrid: "#332F2D"
      }
    },
  },
  plugins: [require('flowbite/plugin')],
};
