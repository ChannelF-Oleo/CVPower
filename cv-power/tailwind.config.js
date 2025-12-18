/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#F9F7F2',    // Crema: Fondos generales
          dark: '#101929',     // Azul Profundo: Textos, Footer, Navbar
          accent: '#CCA43B',   // Mostaza: Botones (CTA), Iconos, Destacados
          secondary: '#E5E0D8',// Gris Cálido: Fondos de tarjetas o secciones alternas
          white: '#FFFFFF',    // Blanco puro: Solo para interior de inputs o tarjetas específicas
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'], // Títulos (H1, H2) - Lujo
        sans: ['"Inter"', 'sans-serif'],        // Textos largos (P) - Legibilidad
      }
    },
  },
  plugins: [],
}