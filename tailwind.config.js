/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/views/chatView.{vue,js,ts,jsx,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
  };