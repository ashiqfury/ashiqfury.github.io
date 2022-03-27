module.exports = {
	content: ['./src/**/*.{html,js}', './*.{html, js}'],
	darkMode: false,
	theme: {
		extend: {
			colors: {
				primary: {
					red: 'hsl(12, 88%, 59%)',
					blue: 'hsl(228, 39%, 23%)',
				},
				neutral: {
					grayBlue: 'hsl(227, 12%, 61%)',
					blue: 'hsl(233, 12%, 13%)',
					red: 'hsl(13, 100%, 96%)',
					gray: 'hsl(0, 0%, 98%)',
				},
			},
			fontFamily: {
				custom: ['Be Vietnam Pro', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
