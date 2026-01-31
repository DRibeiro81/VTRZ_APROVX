/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aprovex: {
          blue: '#1F4FD8',     // Azul Profissional
          green: '#2DBE7F',    // Verde Crescimento
          graphite: '#1C1C1C', // Grafite Elegante
          white: '#FFFFFF',    // Branco Estratégico
          gray: '#E6E8EB',     // Cinza Neutro
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
