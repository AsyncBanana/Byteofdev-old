/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import cookie from 'cookie';

const directives = {
	'img-src': ['*', "'self'"],
	'font-src': ['*', "'self'", 'data:'],
	'style-src': ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
	'default-src': ["'self'", '*.storyblok.com', 'ws://localhost:24678'],
	'script-src': ["'self'", "'unsafe-inline'"]
};
/** @type {import('@sveltejs/kit').GetSession} */
export const getSession = async (request) => {
	const cookies = cookie.parse(request.headers.cookie || 'theme={}');
	return {
		theme: JSON.parse(cookies.theme)
	};
};

let CSP = Object.entries(directives)
	.map(([key, arr]) => key + ' ' + arr.join(' '))
	.join('; ');

export async function handle({ request, resolve }) {
	const response = await resolve(request);
	return {
		...response,
		headers: {
			...response.headers,
			'X-Frame-Options': 'SAMEORIGIN',
			'Feature-Policy': `microphone 'none'; geolocation 'none'; document-domain 'none'; display-capture 'none'; fullscreen 'none'; gamepad 'none'; gyroscope 'none'; sync-xhr 'none'; screen-wake-lock 'none';`,
			'X-Content-Type-Options': `nosniff`,
			'Content-Security-Policy': CSP
		}
	};
}
