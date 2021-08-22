import preprocess from 'svelte-preprocess';
import WindiCSS from 'vite-plugin-windicss';
import { visualizer } from 'rollup-plugin-visualizer';
import node from '@sveltejs/adapter-cloudflare-workers';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: node(),
		target: '#svelte',
		vite: {
			plugins: [
				WindiCSS.default({
					scan: {
						dirs: ['src'],
						fileExtensions: ['svelte']
					}
				}),
				visualizer({
					title: 'ByteofDev bundle makeup'
				})
			]
		}
	}
};

export default config;
