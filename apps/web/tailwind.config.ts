import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Inter Tight"', 'Inter', 'ui-sans-serif', 'sans-serif']
      },
      boxShadow: {
        float: '0 10px 40px rgba(15, 23, 42, 0.08)',
        card: '0 20px 50px rgba(15, 23, 42, 0.06)'
      }
    }
  }
} satisfies Config
