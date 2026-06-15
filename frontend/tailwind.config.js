export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#E8EDF3',
          100: '#C5D0DE',
          200: '#9FAFC5',
          300: '#7A8FAD',
          400: '#597499',
          500: '#3A5985',
          600: '#2A4470',
          700: '#1B2E4B',
          800: '#0D1F35',
          900: '#070F1A',
        },
        accent: {
          50:  '#FDF8EC',
          100: '#F9EBC4',
          200: '#F4D88B',
          300: '#EFC455',
          400: '#E9B02A',
          500: '#C9A84C',
          600: '#A88835',
          700: '#866820',
          800: '#634C0E',
          900: '#412F00',
        },
        steel: {
          50:  '#F8FAFC',
          100: '#F0F4F8',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'ken-burns': 'kenBurns 7s ease-in-out infinite alternate',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        kenBurns: {
          '0%':   { transform: 'scale(1)   translateX(0px)' },
          '100%': { transform: 'scale(1.08) translateX(-20px)' },
        },
      },
    },
  },
  plugins: [],
}