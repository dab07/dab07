/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './constants/**/*.{js,jsx,ts,tsx}',
    './hooks/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        // Add your custom fonts here if needed
      },
      colors: {
        // Add your custom colors here
      },
    },
  },
  plugins: [],
  // Web-specific optimizations
  corePlugins: {
    // Disable plugins that don't work well with React Native
    preflight: false,
  },
}

