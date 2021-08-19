import cookie from 'cookie';
interface Session {
	theme: string;
}
/** @type {import('@sveltejs/kit').GetSession} */
export const getSession = async (request): Promise<Session> => {
	const cookies = cookie.parse(request.headers.cookie || 'theme={}');

	return {
		theme: JSON.parse(cookies.theme)
	};
};
