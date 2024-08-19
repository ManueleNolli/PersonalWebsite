/** @type {import('tailwindcss').Config} */

const colors = {
  'primary-50': '#e6f2f6',
  'primary-100': '#cce5ed',
  'primary-150': '#b3d9e4',
  'primary-200': '#9accdb',
  'primary-250': '#81bfd3',
  'primary-300': '#67b2ca',
  'primary-350': '#4ea5c1',
  'primary-400': '#3599b8',
  'primary-450': '#1b8caf',
  'primary-500': '#027fa6',
  'primary-550': '#027295',
  'primary-600': '#026685',
  'primary-650': '#015974',
  'primary-700': '#014c64',
  'primary-750': '#014053',
  'primary-800': '#013342',
  'primary-850': '#012632',
  'primary-900': '#000d11',
  'surface-50': 'var(--surface-50)',
  'surface-100': 'var(--surface-100)',
  'surface-200': 'var(--surface-200)',
  'surface-300': 'var(--surface-300)',
  'surface-400': 'var(--surface-400)',
  'surface-500': 'var(--surface-500)',
  'surface-600': 'var(--surface-600)',
  'surface-700': 'var(--surface-700)',
  'surface-800': 'var(--surface-800)',
  'surface-900': 'var(--surface-900)',
}

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: colors,
    },
    screens: {
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }
      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }
      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }
      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }
      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
}
