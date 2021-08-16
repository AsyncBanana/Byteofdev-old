import { defineConfig, transform } from 'windicss/helpers';

export default defineConfig({
	darkMode: 'class',
	plugins: [transform('daisyui')]
});
