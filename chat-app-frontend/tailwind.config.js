/** @type {import('tailwindcss').Config} */

module.exports = {
  prefix: "cai-",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "black-color": "#000000",
        "white-color": "#FFFFFF",
        "powder-blue-color": "#F7F6F7",
        "steel-blue-color": "#939CB0",
        "neon-blue-color": "#5555FF",
        "blue-color":"#ECEDFD",
      },
    },
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    }
  },

  plugins: [],

}
