import { redirect } from '@sveltejs/kit';
import { verifyJwtToken } from './lib/server/session.utils';

export async function handle({ event, resolve }) {

	const jwt = await event.cookies.get('unipet_session');
	if (jwt) {
		const user = await verifyJwtToken(jwt);
		event.locals.user = user ? user : null;
	}

	await routeGuard(event.route.id, event.locals.user);

	return await resolve(event);
}


async function routeGuard(route, user) {
	let publicRoutes = ['/publication', '/blog', '/restore', '/search', '/auth/login', '/auth/register', '/auth/restore'];
	if (route != '/') {
		if (!user && !publicRoutes.some((r) => route.startsWith(r) && route != '/publication/new')) throw await redirect(307, '/auth/register');
	}
	if (route.startsWith('/mod') && !user?.mod) throw await redirect(307, '/');
}
