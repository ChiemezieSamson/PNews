module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	corePlugins: {
		preflight: true,
	},
	theme: {
		screens: {
			xxs: "270px",
			sxs: "420px",
			imgxs: "480px",
			xs: "520px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
		extend: {
			fontFamily: {
				round: ["Varela Round", "sans-serif"],
				poppins: ["poppins", "sans-serif"],
				lora: ["Lora", "serif"],
				josefin: ["Josefin Sans", "sans-serif"],
			},
			gridTemplateRows: {
				8: "repeat(8, minmax(0, 1fr))",
			},
		},
	},
	plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
