/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: 'var(--c-surface)',
        gray: {
          50: 'var(--c-gray-50)',
          100: 'var(--c-gray-100)',
          200: 'var(--c-gray-200)',
          300: 'var(--c-gray-300)',
          400: 'var(--c-gray-400)',
          500: 'var(--c-gray-500)',
          600: 'var(--c-gray-600)',
          700: 'var(--c-gray-700)',
          800: 'var(--c-gray-700)',
          900: 'var(--c-gray-900)',
          950: 'var(--c-gray-900)',
        },
        brand: {
          50: 'var(--c-brand-50)',
          100: 'var(--c-brand-100)',
          200: 'var(--c-brand-200)',
          300: 'var(--c-brand-300)',
          400: 'var(--c-brand-400)',
          500: 'var(--c-brand-500)',
          600: 'var(--c-brand-600)',
          700: 'var(--c-brand-700)',
          800: 'var(--c-brand-800)',
          900: 'var(--c-brand-900)',
          950: 'var(--c-brand-950)',
        },
        green: {
          50: 'var(--c-green-50)',
          200: 'var(--c-green-200)',
        },
        amber: {
          50: 'var(--c-amber-50)',
          200: 'var(--c-amber-200)',
        },
        red: {
          50: 'var(--c-red-50)',
          200: 'var(--c-red-200)',
        },
      },
    },
  },
  plugins: [],
}
