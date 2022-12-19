import { query } from "$lib/server/db"


export async function load(){
    let datosbd = await query(`
    SELECT b.*
    FROM blog as b 
    `)

    return {blog:datosbd.rows}
}