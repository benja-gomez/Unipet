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
			if (!files.length) {
				valid = false;
			}
			return valid;
		}
		let publicationSchema = yup.object().shape({
			name: yup.string().min(1, 'El nombre debe tener minimo un caracter').max(30, 'El nombre debe tener maximo 30 caracteres').nullable(true),
			petType: yup.number().oneOf([1, 2, 3]).required(),
			petTypeDesc: yup.string().max(200, 'Maximo 200 caracters').nullable(true),
			pubType: yup.number().oneOf([1, 2, 3]).required(),
			pubTypeDesc: yup.string().max(200, 'Tipo de publicacion maximo 200 caracteres').nullable(true),
			age: yup.string().min(0, 'Edad minima 0').max(100, ' Edad maxima 100').nullable(true),
			diseases: yup.string().max(400, 'Las enfermedades tienen un maximo de 400 caracters').nullable(true),
			description: yup
				.string()
				.min(10, 'La descripcion debe ser de un minimo de 10 caracters')
				.max(500, 'La descripcion debe ser de un maximo de 10 caracters')
				.required('Debe ingresar una descripcion'),
			comune: yup.number('Debe indicar la comuna').min(1).max(500).required('Debe indicar la comuna').typeError('Debe indicar la comuna'),
			address: yup
				.string()
				.min(2, 'La direccion debe contener como minimo 2 caracteres')
				.max(100, 'La direccion debe contener como maximo 100 caracteres')
				.required(),
			images: yup.array().required().test('is-correct-file', 'Debe incluir una imagen', checkIfFilesAreTooBig)
		});

		const body = await request.formData();
		let name = body.get('name');
		let petType = body.get('petType');
		let petTypeDesc = body.get('petTypeDesc');
		let pubType = body.get('pubType');
		let pubTypeDesc = body.get('pubTypeDesc');
		let age = body.get('age');
		let diseases = body.get('diseases');
		let description = body.get('description');
		let comune = body.get('comune');
		let address = body.get('address');
		let images = body.getAll('images');
		let dataValid = await publicationSchema
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
		if (age == 'null') age = 0;
	

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

	}
}
