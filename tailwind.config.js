/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "from-purple-400",
    "via-pink-500",
    "to-red-600",
    "from-indigo-400",
    "via-purple-500",
    "to-pink-500",
    {
      pattern: /^opacity-/,
    },
  ],
  theme: {
    extend: {
      colors: {
        "kids-blue": "#4ECDC4",
        "kids-pink": "#FF6B9D",
        "kids-yellow": "#FFE66D",
        "kids-green": "#A8E6CF",
        "kids-purple": "#A8E6CF",
        "kids-orange": "#FF8A65",
        "kids-cyan": "#45B7D1",
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s infinite",
        rainbow: "rainbow 4s linear infinite",
        shimmer: "shimmer 2s infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "bounce-gentle": "bounce-gentle 3s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        rainbow: {
          "0%": { color: "#FF6B9D" },
          "16%": { color: "#4ECDC4" },
          "32%": { color: "#45B7D1" },
          "48%": { color: "#FFE66D" },
          "64%": { color: "#A8E6CF" },
          "80%": { color: "#FF8A65" },
          "100%": { color: "#FF6B9D" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(255, 107, 157, 0.4)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(255, 107, 157, 0.8)",
            transform: "scale(1.05)",
          },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(255, 107, 157, 0.6)",
        "glow-hover": "0 0 50px rgba(78, 205, 196, 0.8)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".preserve-3d": {
          transformStyle: "preserve-3d",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
      });
    },
  ],
};
