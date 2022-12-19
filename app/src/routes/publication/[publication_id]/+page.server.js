import { query } from '$lib/server/db';
import * as yup from 'yup';
export async function load({ params }) {
	query('UPDATE publication SET visits = visits + 1 WHERE publication_id = $1', [params.publication_id]);
	const { rows } = await query(
		`
		SELECT 		*
		FROM 		"publications@"()
		WHERE 		publication_id = $1

	
	`,
		[params.publication_id]
	);

	return {
		post: rows[0]
	};
}
export const actions = {
	update: async ({ request, cookies, locals, url, params }) => {
		const data = await request.formData();
		const post = JSON.parse(data.get('post'));

		let updateSchema = yup.object().shape({
			pet_name: yup.string().min(1).max(100).nullable(),
			diseases: yup.string().min(1).max(1000).nullable(),
			description: yup.string().min(20).max(1000).required(),
			age: yup.number().min(0).max(100).nullable()
		});
		const dataValid = await updateSchema
			.validate({
				pet_name: post.pet_name,
				diseases: post.diseases,
				description: post.description,
				age: post.age
			})
			.catch((err) => {
				return { message: err.errors[0] };
			});

		if (!dataValid.diseases) return { success: false, message: dataValid.message };
		const { rows } = await query(
			/*sql*/ `

			UPDATE 		publication a
			SET 		pet_name 				= COALESCE($1, pet_name),
						diseases 				= COALESCE($2, diseases),
						description 			= COALESCE($3, description),
						age 					= COALESCE($4, age),
						publication_status_id  	= CASE WHEN b.mod = false THEN 3 ELSE a.publication_status_id END,
						updated_at  = NOW()
			FROM 		users b
			WHERE 		publication_id = $5
			AND 		b.user_id 	= $6
			AND 		(a.user_id = $6 OR b.mod = true )

		`,
			[post.pet_name, post.diseases, post.description, post.age, params.publication_id, locals.user.user_id]
		);

		return { success: true };
	}
};
