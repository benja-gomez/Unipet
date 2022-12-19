import { query } from '$lib/server/db';
import { user } from '$lib/stores';

export async function load({ locals }) {
	let address;

	if (locals?.user?.pet_finder) {
		let { rows } = await query(
			`			
		SELECT jsonb_agg( a) user_address
		FROM (
			SELECT 		comuna as comune,
						address,
						description,
						user_address_id
			FROM 		user_address a
			JOIN 		city b ON a.comune = b.id
			AND 		a.user_id = $1
		) a`,
			[locals.user.user_id]
		);
		address = rows[0].user_address;
	}

	user.set(locals.user);
	return {
		user: locals.user,
		address
	};
}
