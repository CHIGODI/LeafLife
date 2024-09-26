/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
      colors: {
        // Main color palette
        'color-p': '#A8E6CF',
        'bg': '#f8fafb',
        'hover': '#22c55e',
        'hover-d': '#E8F5E9',
        'text-lg': '#b5bcc6',
        'text-dk': '#0e224c',



        'nav-bg': '#FFFFFF',         // Vibrant Green (Nav Background)
        'nav-text': '#0e2238',           // Off-White (Link Text)
        'nav-hover': '#22c55e',          // Light Green (Hover State for Links)
        'nav-active': '#E8F5E9',         // Vibrant Green (Active Link Background)
        'dropdown-bg': '#A5D6A7',        // Sage Green (Dropdown Background)
        'dropdown-hover': '#C8E6C9',     // Lighter Sage Green (Dropdown Hover Background)
      },
      boxShadow: {
        'right': '3px 0px 8px rgba(99, 99, 99, 0.2)',
        'all': 'rgba(149, 157, 165, 0.2) 0px 8px 24px',

      },
      fontWeight: {
        'extrabold': '800',
      },
    },
  },
  plugins: [],
}