/** @type {import('tailwindcss').Config} */
// Brand tokens ("New Mexico": chile red, turquoise, sun yellow, adobe). Use these names in components, never
// raw hex values, so a palette change is a one-file edit.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FBF6EE', // page background (adobe white)
          100: '#F4E9DA', // alternating sections
          200: '#EBDDC8',
        },
        stone: {
          300: '#DCCBB5', // borders, dividers
          500: '#8F7F6E',
          600: '#6B5E51', // secondary text (AA on sand-50)
        },
        ink: {
          DEFAULT: '#2A2522', // body text
          soft: '#4A413A',
        },
        // Chile red: primary (links, buttons, icons, dark bands)
        chile: {
          50: '#FCEFEE',
          100: '#F6D6D3',
          600: '#B3262D',
          700: '#9B1C24', // primary
          800: '#7E1720',
          900: '#5A1018', // dark bands, hover
        },
        // Turquoise: quote buttons and small accent text
        turquoise: {
          100: '#D7F0EE',
          500: '#2BA9A3',
          600: '#0B7A75', // quote buttons (AA with white text)
          700: '#075E5A', // accent text (AA on sand)
        },
        // Sun yellow (NM flag): highlights on dark backgrounds only
        sun: {
          400: '#F2B31B',
          500: '#E09E0B',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
      },
      boxShadow: {
        card: '0 1px 2px rgb(42 37 34 / 0.06), 0 4px 16px rgb(42 37 34 / 0.06)',
      },
    },
  },
  plugins: [],
};
