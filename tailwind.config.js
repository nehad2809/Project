/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'newspaper-headline': ['Playfair Display', 'serif'],
        'newspaper-body': ['Crimson Text', 'serif'],
        'newspaper-caption': ['Source Serif Pro', 'serif'],
      },
      colors: {
        'newspaper': {
          'cream': '#fefcf7',
          'ink': '#1a1a1a',
          'gold': '#d4af37',
        },
        'amber': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'typewriter': 'typewriter 2s steps(40, end)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        typewriter: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      lineHeight: {
        'extra-tight': '1.1',
        'newspaper': '1.6',
      },
      letterSpacing: {
        'newspaper': '0.01em',
        'headline': '-0.02em',
      },
    },
  },
  plugins: [],
};