import '$lib/server/session.utils';
import { redirect } from '@sveltejs/kit';
import { createJwtToken } from '$lib/server/session.utils';
import { loginSchema } from '$lib/server/auth.utils';
import { checkUser, passwordMatch } from '../../../lib/server/auth.utils';


export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		// Revisa si los datos son validos
		const dataValid = await loginSchema
			.validate({
				email,
				password
			})
			.catch((err) => {
				return { message: err.errors[0] };
			});
		if (!dataValid.email) return { success: false, message: dataValid.message };

		// Verifica que no exista el telefono o el correo
		const user = await checkUser(email);

		if (!user) return { success: false, message: 'Datos incorrectos' };

		const validPass = await passwordMatch(user.password, password);
		delete user.password;
		if (validPass) {
			const token = await createJwtToken(user);
			cookies.set('unipet_session', token, { path: '/', secure: false });
			throw redirect(307, '/');
		}
	}
};
