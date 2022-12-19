import { UNIPET_DB_HOST,UNIPET_DB_NAME,UNIPET_DB_PASSWORD } from '$env/static/private';
import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
	host: UNIPET_DB_HOST,
	port: 5432,
	user: 'postgres',
	database: UNIPET_DB_NAME,
	password: UNIPET_DB_PASSWORD	,
});

export const query = (text, params, callback) => {
	return pool.query(text, params, callback);
};
