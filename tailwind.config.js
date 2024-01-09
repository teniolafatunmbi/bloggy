/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      screens: {
        xxs: "340px",
        xs: "475px",
        sm: "640px",
        md: "768px",
        xm: "900px",
        lg: "1024px",
        lgXl: "1100px",
        xl: "1280px",
        xxl: "1440px",
        "2xl": "1536px",
      },
      padding: {
				"container-xl": "7.5rem",
				"container-lg": "5rem",
				"container-md": "3.5rem",
				"container-base": "1.5rem",
			},
			margin: {
				"container-xl": "7.5rem",
				"container-lg": "5rem",
				"container-base": "1.5rem",
			},
    },
  },
  plugins: [],
}

