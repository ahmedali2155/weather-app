/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: '#0B1026',
        dawn: '#F2A65A',
        cloud: '#EDEFF7',
        storm: '#6C63AC',
        teal: '#3EC9A7',
        ink: '#0E1220',
        glass: 'rgba(255,255,255,0.08)'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      backdropBlur: { xs: '2px' },
      keyframes: {
        drift: { '0%': { transform: 'translateX(-10%)' }, '100%': { transform: 'translateX(110%)' } },
        fall: { '0%': { transform: 'translateY(-10%)' }, '100%': { transform: 'translateY(110vh)' } },
        twinkle: { '0%,100%': { opacity: 0.2 }, '50%': { opacity: 1 } },
        flash: { '0%,94%,100%': { opacity: 0 }, '95%': { opacity: 1 }, '97%': { opacity: 0.2 }, '98%': { opacity: 0.9 } },
        rise: { '0%': { transform: 'translateY(6px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } }
      },
      animation: {
        drift: 'drift 40s linear infinite',
        'drift-slow': 'drift 70s linear infinite',
        fall: 'fall 2.2s linear infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        flash: 'flash 8s ease-in-out infinite',
        rise: 'rise 0.4s ease-out both'
      }
    }
  },
  plugins: []
}
