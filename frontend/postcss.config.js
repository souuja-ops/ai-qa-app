// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
// This configuration file sets up PostCSS to use Tailwind CSS and Autoprefixer.
// It ensures that Tailwind's utility classes are processed correctly and that vendor prefixes are added where necessary for better browser compatibility.