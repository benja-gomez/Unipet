import { query } from '$lib/server/db';
import { get } from '../lib/api';

export async function load({ fetch }) {
	const { rows } = await query(`

		select * from "publications@"() WHERE status = 'Approved' ORDER BY RANDOM() LIMIT 4
	
	`);

	return { posts: rows };
}
