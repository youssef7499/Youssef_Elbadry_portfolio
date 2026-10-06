/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['"Cairo"', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Identity Colors extracted from Youssef El-Badry's Official Logo
        brand: {
          // Deep Emerald / Pine Green
          pine: {
            950: '#041511',
            900: '#07211B', // Main dark mode background
            850: '#0B2B23', // Elevated card / surface
            800: '#0F382E', // Subtle card highlight
            700: '#174B3E', // Border
            600: '#216151',
            500: '#2E7C69',
          },
          // Warm Golden Ochre ("البدري" in the logo)
          gold: {
            DEFAULT: '#E5A83B',
            light: '#F3B84C',
            hover: '#F5BE59',
            dark: '#C78C26',
            glow: 'rgba(229, 168, 59, 0.35)',
            subtle: 'rgba(229, 168, 59, 0.12)',
          },
          // Warm Ivory / Cream ("يوسف" in the logo & Light Mode)
          cream: {
            50: '#FAF8F5',
            100: '#F5EFE6', // Light mode canvas
            200: '#EFE5D7',
            300: '#DECDBD',
            ivory: '#F7EFE4', // Text color in dark mode
          }
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { opacity: 0.4, filter: 'blur(20px)' },
          '100%': { opacity: 0.8, filter: 'blur(32px)' },
        }
      }
    },
  },
  plugins: [],
}
