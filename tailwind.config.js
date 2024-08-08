/** @type {import('tailwindcss').Config} */

const colors = {
  'primary-50': 'var(--primary-50)',
  'primary-100': 'var(--primary-100)',
  'primary-200': 'var(--primary-200)',
  'primary-300': 'var(--primary-300)',
  'primary-400': 'var(--primary-400)',
  'primary-500': 'var(--primary-500)',
  'primary-600': 'var(--primary-600)',
  'primary-700': 'var(--primary-700)',
  'primary-800': 'var(--primary-800)',
  'primary-900': 'var(--primary-900)',
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
