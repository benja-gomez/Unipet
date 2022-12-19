import { query } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import * as yup from 'yup';
export async function load({ locals, url, fetch }) {
	let modFilterShema = yup.object().shape({
		page: yup.number().min(1).required(),
		status: yup.string().oneOf(['Approved', 'Rejected', 'Pending', 'Cancelled', 'Completed', 'Expired', 'Incomplete'])
	});
	const page = await +(url.searchParams.get('page') ?? '1');
	const status = (await url.searchParams.get('status')) ?? 'Pending';
	const dataValid = await modFilterShema
		.validate({
			page,
			status
		})
		.catch((err) => {
			return { message: err.errors[0] };
		});
	if (!dataValid.status) return { success: false, message: dataValid.message };

	const q = new URLSearchParams();
	q.set('page', page);
	q.set('status', status);

	const { rows } = await query(
		/*sql*/ `
        WITH totalpendientes AS 
        (
            SELECT      count(*) total  
            FROM	    "publications@"() a 
            WHERE       status = $2
        ), datos AS 
        (
            SELECT jsonb_agg(b) data FROM (

          
            SELECT 	    *  
            FROM	    "publications@"() a 
            WHERE       status = $2
            ORDER BY    publication_id
            LIMIT       10   
            OFFSET      10 * ($1 - 1)  ) b
        ), statuses AS 
        (
            SELECT  jsonb_agg(a) status_options 
            FROM    (
                SELECT  *
                FROM    publication_status
            ) a
        )
        SELECT      a.total, COALESCE(b.data, '[]'::jsonb) posts, status_options
        FROM        totalpendientes a
        LEFT JOIN     datos b ON true
        JOIN        statuses c ON true

	`,
		[page, status]
	);

	return rows[0];
}
export const actions = {
	cancel_publication: async ({ request, cookies }) => {
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
			`   UPDATE  publication a       
                SET     publication_status_id = b.publication_status_id	  
                FROM    publication_status  b 
                WHERE   b.status = 'Cancelled' 
                AND     a.publication_id = $1  `,
			[publication_id]
		);

		throw redirect(307, '/');
	}
};
