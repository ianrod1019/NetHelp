/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef9ff',
          100: '#d9f1ff',
          200: '#bbe7ff',
          300: '#8ad8ff',
          400: '#52c0ff',
          500: '#2aa3ff',
          600: '#1385f5',
          700: '#106ae0',
          800: '#1354b4',
          900: '#15498e',
          950: '#102e57',
        },
      },
    },
  },
  plugins: [],
}
