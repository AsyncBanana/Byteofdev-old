/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post({ body, headers }) {
	if (
		headers['content-type'] !== 'application/x-www-form-urlencoded' &&
		headers['content-type'] !== 'application/json'
	) {
		return { status: 400 };
	}
	const email = body.get('email');
	if (!email) {
		return { status: 400 };
	}
	const res = await fetch('https://api.sendgrid.com/v3/marketing/contacts', {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_SENDGRID_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			contacts: [
				{
					email: email
				}
			]
		})
	});
	return {
		status: 303,
		headers: {
			Location: `/thanks?returnTo=${headers['referer']}`
		}
	};
}
