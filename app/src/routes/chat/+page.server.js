import { query } from '$lib/server/db';

export async function load({ request, locals, params }) {
	let { rows: chat } = await query(
		/*sql*/ `
            SELECT  a.* , b.*, c.name, a.created_at as chat_creation
            FROM    chat a 
            JOIN    publications_view b ON a.publication_id = b.publication_id
            JOIN    users c ON c.user_id = b.user_id
            WHERE   (a.user_id = $1 OR b.user_id = $1)
    `,
		[locals.user.user_id]
	);

	return { chat };
}
