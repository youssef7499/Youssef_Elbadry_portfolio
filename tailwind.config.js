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
        // Deep Emerald Pine from Logo Circle
        pine: {
          950: '#041612',
          900: '#07231D',
          850: '#0B2C24',
          800: '#0F382E',
          700: '#16493D',
          600: '#1F6151',
          500: '#2A7A66',
        },
        // Warm Golden Amber from "البدري"
        gold: {
          DEFAULT: '#E5A83B',
          light: '#F5BD55',
          dark: '#C88D22',
          hover: '#F0B345',
          50: '#FDF9F0',
          100: '#FBF2E0',
          200: '#F6E1B9',
          300: '#EECB89',
          400: '#E7B557',
          500: '#E5A83B',
          600: '#C78C25',
          700: '#9E6A16',
        },
        // Warm Cream / Ivory from "يوسف"
        cream: {
          50: '#FAF8F5',
          100: '#F5EFE6',
          200: '#EFE5D7',
          300: '#DECDBD',
          ivory: '#F7EFE4',
        }
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(229, 168, 59, 0.25)',
        'pine-glow': '0 0 35px rgba(15, 56, 46, 0.4)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
