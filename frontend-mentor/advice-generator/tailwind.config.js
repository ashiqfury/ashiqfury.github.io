module.exports = {
	content: ['./src/**/*.{html,js}', './*.{html, js}'],
	theme: {
		extend: {
			boxShadow: {
				main: '30px 40px 5px rgba(32, 37, 45, 0.1), 10px 20px 5px 30px rgba(44, 50, 59, 0.1)',
				anim: '0 0 10px hsl(150, 100%, 66%), 0 0 20px hsl(150, 100%, 66%)',
			},
			colors: {
				primary: '#52ffa8',
				dark: {
					1: '#1b2027',
					2: '#323b48',
				},
			},
			fontFamily: {
				custom: ['Manrope', 'sans-serif'],
			},
			backgroundImage: {
				// divider: "url('./images/pattern-divider-desktop.svg')",
			},
		},
	},
	plugins: [],
}
