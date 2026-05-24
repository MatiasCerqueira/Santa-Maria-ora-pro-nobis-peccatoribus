/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        fell: ['"IM Fell English"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#1a2340',
          mid: '#243058',
        },
        marian: '#2c4a8c',
        gold: {
          DEFAULT: '#b5954a',
          light: '#d4b06a',
          pale: '#f0e4c3',
        },
        cream: {
          DEFAULT: '#faf7f0',
          dark: '#f0e9d8',
        },
      },
    },
  },
  plugins: [],
}
