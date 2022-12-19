import { query } from '$lib/server/db';

export async function load({ locals }) {
	const { rows } = await query(
		`

    select * from "publications@"() WHERE user_id = $1

`,
		[locals.user.user_id]
	);

	return { posts: rows };
}
