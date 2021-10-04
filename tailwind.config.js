module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
     '3': '3px',
      '4': '4px',
     '6': '6px',
     '8': '8px',
    },
    rotate: {
      '5': '5deg',
      '-180': '-180deg',
       '-90': '-90deg',
      '-45': '-45deg',
       '0': '0',
       '10': '10deg',
       '-10': '-10deg',
       '15': '15deg',
       '-15': '-15deg',
       '30': '30deg',
       '45': '45deg',
       '90': '90deg',
      '135': '135deg',
       '180': '180deg',
      '270': '270deg',
     }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
