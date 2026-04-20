export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "forest-green": "#1F4D36",
        "premium-gold": "#C8A96B",
        "ivory-white": "#FAF9F6",
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Poppins', 'sans-serif'],
        accent: ['Yatra One', 'cursive'],
      },
    },
  },
  plugins: [],
}