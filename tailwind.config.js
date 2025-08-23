/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores de piel
        "piel-oscuro": "#cb997e",
        "piel-claro": "#ddbea9",
        "piel-blanco": "#ffe8d6",

        // Colores verdes
        "verde-gris": "#b7b7a4",
        "verde-claro": "#a5a58d",
        "verde-oscuro": "#6b705c",
      },
      backgroundImage: {
        // Gradientes personalizados
        "gradient-1": "linear-gradient(90deg, #ffe8d6, #ddbea9)",
        "gradient-2": "linear-gradient(90deg, #a5a58d, #6b705c)",
        "gradient-3": "linear-gradient(360deg, #cb997e, #ffe8d6)",
        "gradient-navbar": "linear-gradient(to bottom left, #6b705c, #ffffff)",
      },
      // Alternativa usando gradientColorStops
      gradientColorStops: {
        "piel-blanco": "#ffe8d6",
        "piel-claro": "#ddbea9",
        "piel-oscuro": "#cb997e",
        "verde-claro": "#a5a58d",
        "verde-oscuro": "#6b705c",
      },
    },
  },
  plugins: [],
};
