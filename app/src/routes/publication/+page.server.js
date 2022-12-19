import { get } from '$lib/api';
import { query } from '$lib/server/db';
import * as yup from 'yup';
export async function load({ fetch, url }) {
	
	const filterSchema = yup.object().shape({
		pub_type: yup.string().oneOf(['Todos', 'Extraviado', 'Encontrados', 'Otros']).required(),
		pet_type: yup.string().oneOf(['Todos', 'Perro', 'Gato', 'Otros']).required(),
		page: yup.number().positive().min(1).required()
	});

	let pub_type = url.searchParams.get('pub_type') ?? 'Todos';
	let pet_type = url.searchParams.get('pet_type') ?? 'Todos';
	let page = url.searchParams.get('page') ?? '1';
	
	const dataValid = await filterSchema
		.validate({
			pub_type,
			pet_type,
			page
		})
		.catch((err) => {
			return { message: err.errors[0] };
		});
	if (!dataValid.pub_type) return { success: false, message: dataValid.message };
	const { rows } = await query(
		`
    WITH comunes AS (
        SELECT  jsonb_agg(a) comunes
        FROM    (
            SELECT  id as value, comuna as label
            FROM    city 
        ) a
    ),totalpubs AS (
        SELECT      count(*) total_publications
        FROM        "publications@"() 
        WHERE       ($1 = 'Todos' OR pub_type = $1) 
        AND         ($2 = 'Todos' OR pet_type = $2) 
        AND         status = 'Approved'
    ), pubs AS 
    (
        SELECT jsonb_agg(a) publications
        FROM    (

            SELECT      * 
            FROM        "publications@"() 
            WHERE       ($1 = 'Todos' OR pub_type = $1) 
            AND         ($2 = 'Todos' OR pet_type = $2) 
            AND         status = 'Approved'
            ORDER BY    created_at ASC
            LIMIT       9   
            OFFSET      9 * ($3 - 1)  
      
        ) a
    )
    SELECT      comunes, publications,total_publications FROM comunes, pubs, totalpubs
    `,
		[pub_type, pet_type, page]
	);

	return rows[0];
}
