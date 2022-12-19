import { query } from '$lib/server/db';
import { registerSchema, userExists, hashPassword } from '$lib/server/auth.utils';
import '$lib/server/session.utils';
import { redirect } from '@sveltejs/kit';
import { createJwtToken } from '$lib/server/session.utils';
export const actions = {
	register: async ({ request, cookies }) => {
		const data = await request.formData();
	
		const email = data.get('email');
		const name = data.get('name');
		const surname = data.get('surname');
		const password = data.get('password');
		const repassword = data.get('repassword');
		const phone = data.get('phone');
		const pet_finder = data.get('pet_finder');

		// Revisa si los datos son validos
		const dataValid = await registerSchema
			.validate({
				name,
				surname,
				email,
				phone,
				password,
				repassword,
				pet_finder
			})
			.catch((err) => {
				return { message: err.errors[0] };
			});
		if (!dataValid.surname) return { success: false, message: dataValid.message };

		// Verifica que no exista el telefono o el correo
		const exists = await userExists(phone, email);
		if (exists) return { success: false, message: 'El telefono o el correo ya estan registrados' };

		const hash = await hashPassword(password);
		const { rows } = await query(
			`INSERT INTO users (name,surname,email,phone,password, pet_finder) SELECT $1,$2,$3,$4,$5,$6  RETURNING user_id,name, surname, email`,
			[name, surname, email, phone, hash, pet_finder]
		);
		const token = await createJwtToken(rows[0]);
		cookies.set('unipet_session', token, { path: '/', secure: false });
		throw redirect(307, '/');
	}
};
