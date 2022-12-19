import { query } from '$lib/server/db';

export async function load({}) {
	const { rows } = await query(`
	WITH comunasssss as (
		SELECT comuna as value, comuna as label,  provincia_id , id FROM comunas
	)
	SELECT reg.region as value , reg.region as label, json_agg(com) comunas
	FROM regiones reg
	JOIN provincias pro ON reg.id = pro.region_id::int
	JOIN comunasssss com ON com.provincia_id = pro.id
	GROUP BY reg.region`);
	return { regiones: rows };
}


