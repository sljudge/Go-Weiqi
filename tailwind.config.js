const plugin = require('tailwindcss/plugin')
const boardSizes = [9, 13, 19]

const colors = {
  'primary': '#1e1e1e',
  'secondary': '#fdc300',
}

module.exports = {
  purge: [
    './components/*.js',
    './scss/*.scss'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
      },
      height: {
        '100vw': "100vw"
      },
      minWidth: {
        "1": '.25rem',
        "2": '.5rem',
        "4": '1rem',
        "6": '1.5rem',
        "8": '2rem',
        "12": "3rem"
      },
      maxWidth: {
        "board": '600px',
        "1": '.25rem',
        "2": '.5rem',
        "4": '1rem',
        "6": '1.5rem',
        "8": '2rem',
        "12": "3rem"
      },
      minHeight: {
        "1": '.25rem',
        "2": '.5rem',
        "4": '1rem',
        "6": '1.5rem',
        "8": '2rem',
        "12": "3rem"
      },
      maxHeight: {
        "board": '600px',
        "75vh": "75vh",
        "1": '.25rem',
        "2": '.5rem',
        "4": '1rem',
        "6": '1.5rem',
        "8": '2rem',
        "12": "3rem"
      },
      outline: {
        'white-xl': '4px solid #ffffff'
      }
    },
  },
  variants: {
    extend: {
      borderRadius: ['hover'],
      borderWidth: ['hover'],
      outline: ['hover'],
      fontWeight: ['hover']
    },
  },
  plugins: [

  ],
}
