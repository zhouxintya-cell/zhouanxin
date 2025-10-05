/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'abyss-blue': '#031B3F',
        'reef-coral': '#FF7B89',
        'glow-cyan': '#3EE6FF',
        'midnight-blue': '#020C1B',
        'lagoon-blue': '#0B3D91',
        'kelp-green': '#1F9A84',
        'sunlit-water': '#C2F3FF',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
        body: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 45px rgba(62, 230, 255, 0.45)',
        'coral': '0 20px 45px rgba(255, 123, 137, 0.25)',
      },
      animation: {
        'float-slow': 'float 18s ease-in-out infinite',
        'float-medium': 'float 14s ease-in-out infinite',
        'float-fast': 'float 8s ease-in-out infinite',
        'bubble-rise': 'bubble 16s linear infinite',
        'jelly-pulse': 'jelly 8s ease-in-out infinite',
        shimmer: 'shimmer 6s ease-in-out infinite',
        'star-twinkle': 'twinkle 5s ease-in-out infinite',
        'crab-walk': 'crab 28s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(-8px)' },
          '50%': { transform: 'translateY(12px)' },
        },
        bubble: {
          '0%': { transform: 'translateY(0) scale(0.6)', opacity: '0' },
          '25%': { opacity: '0.4' },
          '50%': { opacity: '0.75' },
          '100%': { transform: 'translateY(-180px) scale(1.05)', opacity: '0' },
        },
        jelly: {
          '0%, 100%': {
            transform: 'translate3d(0, 0, 0) scale(1)',
            filter: 'drop-shadow(0 0 12px rgba(62, 230, 255, 0.35))',
          },
          '50%': {
            transform: 'translate3d(0, -30px, 0) scale(1.08)',
            filter: 'drop-shadow(0 0 25px rgba(62, 230, 255, 0.75))',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.9' },
        },
        crab: {
          '0%': { transform: 'translateX(-120%)' },
          '70%': { transform: 'translateX(110%)' },
          '100%': { transform: 'translateX(110%)' },
        },
      },
    },
  },
  plugins: [],
}
