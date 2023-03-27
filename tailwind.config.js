/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'primary-dark': '#1a2028',
      'secondary-dark': '#0c0e12',
      'background-dark': '#0e1216',
      'border-dark': '#282d37',
      'button-dark': '#937ced',
      'text-dark': '#ccc',
      'hover-dark': '#282d37',

      'icon-color-dark':'#afb0b1',

      'color-1':"#057df0",
      'color-2':"#e65406",
      'color-3':"#ffa500",

      'primary': 'white',
      'secondary': '#4f46e5',
      'background': 'white',
      'border': '#ececec',
      'button': '#4f46e5',
      'text': 'black',
      'hover': 'white',

      'light-gray': '#999',
    },
  },
  plugins: [],
}
