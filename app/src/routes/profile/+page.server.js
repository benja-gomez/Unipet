import { query } from '$lib/server/db';
import { createJwtToken } from '$lib/server/session.utils';
import * as yup from 'yup';

export async function load({ locals }) {
	const { rows } = await query(
		`
        WITH perfil AS (

            SELECT  email, name, surname, phone, birth_date, rut 
            FROM    users 
            WHERE   user_id = $1

        ), comunes AS (

            SELECT  jsonb_agg(a) comunes
            FROM    (
                SELECT  id as value, comuna as label
                FROM    city 
            ) a

        ), user_comunes AS (
			SELECT jsonb_agg( a) user_address
			FROM (
				SELECT 		comuna as comune,
							address,
							description,
							user_address_id
				FROM 		user_address a
				JOIN 		city b ON a.comune = b.id
				WHERE 		a.user_id = $1
			) a

		)
        SELECT  to_jsonb(a) profile, 
                b.comunes,
				c.user_address
        FROM    perfil a, 
                comunes b,
				user_comunes c

        `,
		[locals.user.user_id]
	);

	return rows[0];
}
export const actions = {
	profile: async ({ request, cookies, locals }) => {
		let phoneSchema = yup.object().shape({
			phone: yup
				.string()
				.required('El telefono es obligatorio')
				.matches(/^[0-9]+$/, 'Solo numeros')
				.min(8, 'El numero debe ser de 8 digitos')
				.max(8, 'El numero debe ser de 8 digitos')
		});
		const data = await request.formData();
		const phone = await data.get('phone');
		const dataValid = await phoneSchema
			.validate({
				phone
			})
			.catch((err) => {
				return { message: err.errors[0] };
			});

		if (!dataValid.phone) return { success: false, message: dataValid.message };
		const { rows } = await query(
			`
            UPDATE      users
            SET         phone = COALESCE($2, phone)
            WHERE       user_id = $1
        `,
			[locals.user.user_id, phone]
		);

		return { success: true };
	},
	address: async ({ request, cookies, locals }) => {
		const data = await request.formData();

		const comune = await data.get('comune');
		const description = await data.get('description');
		const address = await data.get('address');

		let addressSchema = yup.object().shape({
			comune: yup.number().min(1).max(500).required(),
			address: yup.string().min(2).max(100).required(),
			description: yup.string().min(1).max(20).required()
		});
		const dataValid = await addressSchema
			.validate({
				comune,
				address,
				description
			})
			.catch((err) => {
				return { message: err.errors[0] };
			});
		if (!dataValid.comune) return { success: false, message: dataValid.message };
		const { rows } = await query(
			`
            INSERT INTO user_address(user_id, comune, address, description)
            SELECT $1,$2,$3,$4
        `,
			[locals.user.user_id, comune, address, description]
		);

		return { success: true };
	},
	delete: async ({ request, cookies, locals }) => {
		const data = await request.formData();

		const user_address_id = await data.get('user_address_id');
		let deleteAddressSchema = yup.object().shape({
			user_address_id: yup.number().integer().positive().required()
		});

		const dataValid = await deleteAddressSchema
			.validate({
				user_address_id
			})
			.catch((err) => {
				return { message: err.errors[0] };
			});
		if (!dataValid.user_address_id) return { success: false, message: dataValid.message };
		const { rows } = await query(
			`
            DELETE FROM user_address WHERE user_id = $1 AND user_address_id = $2 RETURNING *
        `,
			[locals.user.user_id, user_address_id]
		);

		return { success: true };
	},
	finder: async ({ request, cookies, locals }) => {
		const data = await request.formData();

		let pet_finder = await data.get('pet_finder');

		let deleteAddressSchema = yup.object().shape({
			pet_finder: yup.bool().required()
		});

		const dataValid = await deleteAddressSchema
			.validate({
				pet_finder
			})
			.catch((err) => {
				return { message: err.errors[0] };
			});

		if (dataValid.message) return { success: false, message: dataValid.message };
		await query(`UPDATE users SET pet_finder = $2 WHERE user_id = $1`, [locals.user.user_id, pet_finder]);
		let user = locals.user;
		user.pet_finder = await dataValid.pet_finder;

		const token = await createJwtToken(user);
		cookies.delete('unipet_session', { path: '/', secure: false });
		cookies.set('unipet_session', token, { path: '/', secure: false });

		return { success: true };
	}
};
