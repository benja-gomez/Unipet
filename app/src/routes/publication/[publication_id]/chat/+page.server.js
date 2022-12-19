import { query } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import * as yup from 'yup';

export async function load({ request, locals, params, url }) {
	
	let { rows: chat } = await query(
		/*sql*/ `
    WITH chatm AS (
        SELECT      a.*, c.name
        FROM        chat a
        JOIN        publication b ON a.publication_id = b.publication_id
        JOIN        users c ON c.user_id = b.user_id
        WHERE       (a.user_id = $1 OR b.user_id = $1)
        AND         a.publication_id = $2
    ), msg AS (
        SELECT      array_agg(a) messages
        FROM    (
            SELECT      a.*, b.name
            FROM        chat_message a
            JOIN        users b ON a.user_id = b.user_id
            ) a
        RIGHT JOIN   chatm b ON a.chat_id = b.chat_id
    )
    SELECT          a.*, to_jsonb(array_remove(b.messages, NULL)) messages
    FROM            chatm a, msg b
    `,
		[locals.user.user_id, params.publication_id]
	);

	if (!chat.length) {
		let { rows: chat } = await query(
			`
            INSERT INTO chat (user_id, publication_id) SELECT $1, $2
        `,
			[locals.user.user_id, params.publication_id]
		);
		throw redirect(302, url.pathname);
	}
	return { chat: chat[0] };
}
export const actions = {
	message: async ({ request, cookies, locals }) => {
		const data = await request.formData();
		const message = data.get('message');
		const publication_id = Number(data.get('publication_id'));

		const dataValid = await messageSchema
			.validate({
				message,
				publication_id
			})
			.catch((err) => {
				return { message: err.errors[0] };
			});

		if (!dataValid.publication_id) return await fail(400, { success: false, message: dataValid.message });
		const { rows: msg } = await query(
			`
            WITH data AS (
                SELECT a.chat_id, $2::int as user_id, $3 as message
                FROM chat a , publication b
                WHERE  a.publication_id = $1 
                AND    a.publication_id = b.publication_id 
                AND    (a.user_id = $2 OR  b.user_id = $2)
            )
            INSERT INTO chat_message(chat_id,user_id,message) 
            SELECT    chat_id, user_id, message
            FROM        data
`,
			[publication_id, locals.user.user_id, message]
		);
		return {};
	}
};

let messageSchema = yup.object().shape({
	message: yup
		.string()
		.required('Debe ingresar al menos un caracter')
		.min(1, 'Debe ingresar al menos un caracter')
		.max(400, 'Solo se permiten 400 caracteres'),
	publication_id: yup.number().integer().required()
});
