/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#070605",
          925: "#0d0b0a",
          900: "#14110f",
          850: "#1b1714",
          800: "#25201c",
          700: "#332d27"
        },
        redwood: {
          700: "#7d2a22",
          600: "#a13a2d",
          500: "#c74634",
          400: "#e3634f",
          300: "#ff8a72"
        },
        warm: {
          50: "#f8f3ea",
          100: "#eee5d8",
          200: "#d6cabb",
          300: "#b9aa99",
          400: "#a79b8f",
          500: "#817365",
          700: "#4f463d"
        },
        signal: {
          jade: "#6ccf8d",
          amber: "#d8a84e",
          sky: "#7cc7df",
          coral: "#e3634f"
        }
      },
      fontFamily: {
        display: ["Inter", "SF Pro Display", "Segoe UI", "sans-serif"],
        mono: ["IBM Plex Mono", "SFMono-Regular", "Consolas", "monospace"]
      },
      boxShadow: {
        panel: "0 24px 80px rgba(0, 0, 0, 0.42)",
        glow: "0 0 44px rgba(199, 70, 52, 0.22)"
      }
    }
  },
  plugins: []
};
