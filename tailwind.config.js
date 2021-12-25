import { defineConfig, transform } from 'windicss/helpers';

export default defineConfig({
	darkMode: 'class',
	plugins: [transform('daisyui')],
	daisyui: {
		themes: ['light', 'dark']
	},
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'Verdana', 'Geneva', 'Tahoma', 'sans-serif']
			}
		}
	}
});
