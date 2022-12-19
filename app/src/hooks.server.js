import { redirect } from '@sveltejs/kit';
import { verifyJwtToken } from './lib/server/session.utils';

export async function handle({ event, resolve }) {
	console.log(process.env);
	const jwt = await event.cookies.get('unipet_session');
	if (jwt) {
		const user = await verifyJwtToken(jwt);
		event.locals.user = user ? user : null;
	}

	await routeGuard(event.route.id, event.locals.user);

	return await resolve(event);
}

async function routeGuard(route, user) {
	let needLoginRoutes = ['/publication/new', '/profile'];

	if (!user && needLoginRoutes.some((r) => route.startsWith(r))) throw await redirect(307, '/auth/register');
	if (route.startsWith('/mod') && !user?.mod) throw await redirect(307, '/');
}
