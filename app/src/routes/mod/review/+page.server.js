import { query } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import * as yup from 'yup';

export async function load({ locals, url }) {
	const publication_id = url.searchParams.get('publication_id');

	const { rows } = await query(
		/*sql*/ `
            SELECT      * 
            FROM	    "publications@"() a 
            WHERE       publication_id = $1
	`,
		[publication_id]
	);
	if (!rows[0]) {
		throw redirect(307, '/mod');
	}
	return {
		post: rows[0]
	};
}
export const actions = {
	approve: async ({ request, cookies }) => {
		const data = await request.formData();
		const publication_id = data.get('publication_id');
		let approveSchema = yup.object().shape({
			publication_id: yup.number().min(1).integer().required()
		});
		const dataValid = await approveSchema
			.validate({
				publication_id
			})
			.catch((err) => {
				return { message: err.errors[0] };
			});

		if (!dataValid.publication_id) return { success: false, message: dataValid.message };

		await query(
			`UPDATE publication a SET publication_status_id	  = b.publication_status_id	  FROM publication_status b WHERE b.status = 'Approved' AND a.publication_id = $1  `,
			[publication_id]
		);
		throw redirect(307, '/mod');
	},
	reject: async ({ request, cookies }) => {
		const data = await request.formData();
		const publication_id = data.get('publication_id');
		let approveSchema = yup.object().shape({
			publication_id: yup.number().min(1).integer().required()
		});
		const dataValid = await approveSchema
			.validate({
				publication_id
			})
			.catch((err) => {
				return { message: err.errors[0] };
			});

		if (!dataValid.publication_id) return { success: false, message: dataValid.message };
		await query(
			`UPDATE publication a SET publication_status_id	  = b.publication_status_id	  FROM publication_status b WHERE b.status = 'Rejected' AND a.publication_id = $1  `,
			[publication_id]
		);
		throw redirect(307, '/mod');
	}
};
