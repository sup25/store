const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./common/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./constants/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },

      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
      },
      colors: {
        primary: "#1C3144",
        secondary: "#8CB7F5",
        tertiary: "#98C1D9",
        btn: "#D00000",
      },
      borderRadius: {
        20: "20px",
        30: "30px",
      },
      boxShadow: {
        contact: "0px 69px 114px rgba(0, 0, 0, 0.08)",
      },
      fontFamily: {
        poppins: "var(--poppins-font)",
        atf: "var(--font-atf)",
        MG: "var(--font-MG)",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".section": {
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "0 10px",
          "@screen sm": {
            padding: "0 30px",
          },
        },
        ".container": {
          maxWidth: theme("maxWidth.container"),
        },
        ".table-container": {
          "@media (max-width: 1200px)": {
            overflowX: "scroll",
          },
        },
        "@media screen and (max-width: 768px)": {
          ".none": {
            display: "none !important",
          },
        },
      });
    }),
  ],
};

//sm	640px
//md  768px
//lg  1024px
//xl  1280px
//2xl 1536px
