import * as yup from 'yup';
import bcrypt from 'bcryptjs';
import { query } from '$lib/server/db';

export let registerSchema = yup.object().shape({
	name: yup.string().min(1).max(30).required('El Nombre es obligatorio'),
	surname: yup.string().min(1).max(30).required('El Apellido es obligatorio'),
	email: yup.string().email('Debe ingresar un correo valido').required('El correo es obligatorio'),
	phone: yup
		.string()
		.required('El telefono es obligatorio')
		.matches(/^[0-9]+$/, 'Solo numeros')
		.min(8, 'El numero debe ser de 8 digitos')
		.max(8, 'El numero debe ser de 8 digitos'),
	password: yup.string().min(6).max(30).required('La clave es obligatoria'),
	repassword: yup
		.string()
		.required('Repetir la clave es obligatorio')
		.oneOf([yup.ref('password'), null], 'Las claves deben ser identicas'),
	pet_finder: yup.boolean().required()
});
export let loginSchema = yup.object().shape({
	email: yup.string().email('Debe ingresar un correo valido').required('El correo es obligatorio'),
	password: yup.string().min(6).max(30).required('La clave es obligatoria')
});
export async function userExists(phone, email) {
	const { rows } = await query('SELECT * FROM users WHERE phone = $1 OR email = $2 LIMIT 1', [phone, email]);

	if (rows.length) return true;

	return false;
}
export async function checkUser(email) {
	const { rows } = await query('SELECT user_id,name, surname, email,password, mod, pet_finder FROM users WHERE email = $1 LIMIT 1', [email]);

	if (rows.length) return rows[0];

	return false;
}
export async function hashPassword(password) {
	const salt = await bcrypt.genSaltSync(10);
	const hash = await bcrypt.hashSync(password, salt);
	return hash;
}
export async function passwordMatch(hash, password) {
	const isValid = await bcrypt.compareSync(password, hash);
	return isValid;
}
