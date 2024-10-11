const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
		  fontFamily: {
			sans: ['Adelle Sans', ...defaultTheme.fontFamily.sans],
		  },
		  colors: {
			'primary': '#8ECAE6',
			'secondary': '#219EBC',
			'dark': '#023047',
			'accent-1': '#FFB703',
			'accent-2': '#FB8500',
		  },
		},
	  },
	darkMode: 'class',
	plugins: [require('tailwindcss-safe-area')],
}