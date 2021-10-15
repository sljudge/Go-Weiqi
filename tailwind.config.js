const plugin = require('tailwindcss/plugin')
const boardSizes = [9,13,19]

const colors = {
  'primary': '#1e1e1e',
  'secondary': '#fdc300',
}

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
      },
      height: {
        
      },
      minWidth:{
        "1":'.25rem',
        "2":'.5rem',
        "4":'1rem',
        "6":'1.5rem',
        "8":'2rem',
        "12": "3rem"
      },
      maxWidth: {
        "1":'.25rem',
        "2":'.5rem',
        "4":'1rem',
        "6":'1.5rem',
        "8":'2rem',
        "12": "3rem"
      },
      minHeight: {
        "1":'.25rem',
        "2":'.5rem',
        "4":'1rem',
        "6":'1.5rem',
        "8":'2rem',
        "12": "3rem"
      },
      maxHeight: {
        "1":'.25rem',
        "2":'.5rem',
        "4":'1rem',
        "6":'1.5rem',
        "8":'2rem',
        "12": "3rem"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
  
  ],
}
