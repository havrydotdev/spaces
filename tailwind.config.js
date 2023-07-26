/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'home-gradient': 'linear-gradient(180deg,_#7F6AFF_0%,_#5C4BC5_100%)'
      }
    },
    colors: {
      'grayc': '#F5F3FF'
    },
    letterSpacing: {
      '1': '1.25px'
    }
  },
  plugins: [],
}
