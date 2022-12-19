import * as jwt from 'jsonwebtoken';

const secret = 'arce_playboy';

export async function createJwtToken(user) {
	const token = await jwt.sign(user, secret);

	return token;
}
export async function verifyJwtToken(token) {
	const user = await jwt.verify(token, secret);

	return user;
}
