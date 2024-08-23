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
        primary: "#000000",
        secondary: "#6575A8",
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
        poppins: "var(--font-poppins)",
        raleway: "var(--font-raleway)",
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
        ".font-heading": {
          fontFamily: "var(--font-raleway)",
          fontWeight: "600",
          fontSize: "40px",
          lineHeight: "1.3",
          color: "#4A4A4A",
        },
        ".font-others": {
          fontFamily: "var(--font-poppins)",
          fontWeight: "400",
          fontSize: "16px",
          lineHeight: "24px",
          color: "#333333",
        },
        ".admin-dash-card": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          display: "flex",
          padding: "16px 6px 16px 6px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        ".list": {
          marginBottom: "24px",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          maxWidth: "500px",
          height: "100%",
          maxHeight: "384px",
          borderRadius: "0.375rem",
          display: "flex",
          padding: "16px 8px 16px 8px",
          boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
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
          ".font-heading": {
            fontSize: "36px",
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
