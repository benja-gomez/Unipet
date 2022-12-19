import '$lib/server/session.utils';
import { redirect } from '@sveltejs/kit';


export const actions = {
	logout: async (event) => {
		event.cookies.delete('unipet_session', { path: '/', secure: false });
		event.locals.user = null;

		throw redirect(307, '/');
	}
};
