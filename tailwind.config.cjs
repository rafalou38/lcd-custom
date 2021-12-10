const forms = require('@tailwindcss/forms');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				blue: '#64B5F6',
				green: '#44BD32',
				red: '#FF0000'
			}
		}
	},

	plugins: [forms]
};

module.exports = config;
