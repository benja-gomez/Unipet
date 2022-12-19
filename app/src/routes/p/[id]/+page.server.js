import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	throw redirect(302, `/publication/${params.id}`);
}
