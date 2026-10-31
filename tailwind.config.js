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
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        // Light warm-neutral palette
        brand: {
          ivory: '#F8F7F3',
          surface: '#FFFFFF',
          charcoal: '#202522',
          forest: '#405D4C',
          forestDark: '#324A3D',
          forestLight: '#547A64',
          sage: '#819685',
          sageLight: '#EAF0E9',
          stone: '#E9E6DF',
          muted: '#777B75',
          border: '#E7E6E0',
        },
        // Dark desktop application palette
        app: {
          bg: '#202522',
          secondary: '#292F2B',
          elevated: '#303832',
          elevatedHover: '#374039',
          text: '#F5F4EF',
          muted: '#A9B0A8',
          accent: '#91AA94',
          accentHover: '#A4BFA7',
          border: '#3C453E',
        },
        // Status semantic colors
        status: {
          connected: '#4F765D',
          connecting: '#B58C4B',
          disconnected: '#8A8D88',
          error: '#A95E58',
          info: '#607E8A',
        }
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'equalizer': 'equalizer 1.2s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        equalizer: {
          '0%, 100%': { height: '30%' },
          '50%': { height: '100%' },
        }
      }
    },
  },
  plugins: [],
}

