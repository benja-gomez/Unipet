import { query } from '$lib/server/db';
import { minioClient, toBuffer } from '$lib/server/minio';
import { json } from '@sveltejs/kit';
import { nanoid } from 'nanoid';
import * as yup from 'yup';

export async function POST({ request, files, locals }) {
	try {
		function checkIfFilesAreTooBig(files) {
			let valid = true;
			if (files) {
				files.map((file) => {
					const size = file.size / 1024 / 1024;
					if (size > 10) {
						valid = false;
					}
				});
			}
			return valid;
		}
		let publicationSchema = yup.object().shape({
			name: yup.string().min(1).max(30).nullable(),
			petType: yup.number().oneOf([1, 2, 3]).required(),
			petTypeDesc: yup.string().max(200).nullable(),
			pubType: yup.number().oneOf([1, 2, 3]).required(),
			pubTypeDesc: yup.string().max(200).nullable(),
			age: yup.string().min(0).max(100).nullable(),
			diseases: yup.string().max(400).nullable(),
			description: yup.string().min(10).max(500).required(),
			comune: yup.number().min(1).max(500).required(),
			address: yup.string().min(2).max(100).required(),
			images: yup.array().required().test('is-correct-file', 'Imagen muy grande', checkIfFilesAreTooBig)
		});

		const body = await request.formData();
		const name = body.get('name');
		const petType = body.get('petType');
		const petTypeDesc = body.get('petTypeDesc');
		const pubType = body.get('pubType');
		const pubTypeDesc = body.get('pubTypeDesc');
		const age = body.get('age');
		const diseases = body.get('diseases');
		const description = body.get('description');
		const comune = body.get('comune');
		const address = body.get('address');
		const images = body.getAll('images');
		const dataValid = await publicationSchema
			.validate({
				name,
				petType,
				petTypeDesc,
				pubType,
				pubTypeDesc,
				age,
				diseases,
				description,
				comune,
				address,
				images
			})
			.catch((err) => {
				return { message: err.errors[0] };
			});
		
		if (!dataValid.comune) return json({ success: false, message: dataValid.message });
		let {
			rows: [publication]
		} = await query(
			`
		INSERT INTO publication(user_id, pet_name, pet_type_id , pet_type_desc, pub_type_id, pub_type_desc ,age , diseases ,description , comune, address) 
		SELECT $1,$2, $3,$4,$5,$6,$7,$8,$9,$10,$11 
		RETURNING *`,
			[locals.user.user_id, name, petType, petTypeDesc, pubType, pubTypeDesc, age, diseases, description, comune, address]
		);
		if (await images) {
			let imgIds = [];
			for await (const image of images) {
				let imgId = nanoid();
				imgIds.push(imgId);
				let buffer = await image.arrayBuffer();
				var metaData = {
					'Content-Type': 'image/jpeg'
				};
				let newBuffer = await toBuffer(buffer);
				await minioClient.putObject('unipet', `${imgId}.jpg`, newBuffer, metaData);
				let {
					rows: [imagenes]
				} = await query(`INSERT INTO publication_img (publication_id, img_code) SELECT $1,$2`, [publication.publication_id, imgId]);
			}
		}

		return json({ success: true });
	} catch (error) {
		console.log(error);
	
	}
}
