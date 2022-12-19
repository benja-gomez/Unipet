import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
	host: process.env.UNIPET_DB_HOST,
	port: 5432,
	user: 'postgres',
	database: process.env.UNIPET_DB_NAME,
	password: process.env.UNIPET_DB_PASSWORD,
});

export const query = (text, params, callback) => {
	return pool.query(text, params, callback);
};
