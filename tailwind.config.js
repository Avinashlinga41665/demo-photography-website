module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  safelist: [
    "[transform-style:preserve-3d]",
    "[transform:rotateY(180deg)]",
    "[backface-visibility:hidden]"
  ],
  plugins: [],
};
