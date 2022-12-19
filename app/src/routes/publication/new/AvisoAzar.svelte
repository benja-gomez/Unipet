<script>
	import { toastStore } from '@brainandbones/skeleton';
	import { getContext } from 'svelte';
	let regiones = getContext('regiones');

	let files;
	let quality = 0.5;
	export let loaded = [];
	let maxWidth = 2400;
	function resizeCalc(width, height) {
		if (width >= maxWidth) {
			let ratio = maxWidth / width;
			return ratio;
		}
		return 1;
	}

	async function compressImage(imgToCompress, resizingFactor, quality) {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		const originalWidth = imgToCompress.width;
		const originalHeight = imgToCompress.height;
		const canvasWidth = originalWidth * resizingFactor;
		const canvasHeight = originalHeight * resizingFactor;

		canvas.width = canvasWidth;
		canvas.height = canvasHeight;

		context.drawImage(imgToCompress, 0, 0, originalWidth * resizingFactor, originalHeight * resizingFactor);

		let blob = await new Promise((blob) => canvas.toBlob(blob, 'image/jpeg', quality));
		await loaded.push(blob);
		return blob;
	}

	async function loadFiles() {
		let preview = [];
		for await (const file of files) {
			let loadImage = await toDataUrl(file);
			let img = document.createElement('img');

			img.src = loadImage;
			img.setAttribute('id', file.name);
			img.addEventListener('load', async () => {
				let resizingFactor = await resizeCalc(img.width, img.height);

				await compressImage(img, resizingFactor, quality);
				await preview.push(img);

				for await (const img of preview) {
					document.querySelector('#preview').append(img);
				}
			});
		}
	}

	let nombres = `Mico Noa Chispa Nina Rayo Toby Chiqui Rocky Plutón Thor Chico Simba Luna Bruno Lola Nico Coco Bimba Linda
                    Max Luna Zar Kira Bruno Thor Sultán Lola Sol Nala Gordo Rex Grande Rocky Lobo Zeus Oso Simba Zorro Coco
                    Trufa Oreo Kinder Macarrón Donut Choco Cookie Coco Hueso Mojito Brownie Nugget Moca Cheddar Frappe Thor
                    Rocco Baloo Nana Chucky Potter Rei Dama Hulk Jack Uggie Dante Conan Luna Akira Molly Thanos Beethoven
                    Frank Golfo Dumbo Merlín Vader Penny Rocky Brian Verdell Reina Dino Troya Obi Wan Starsky Nemo Golfo
                    Totó Bolt Frodo Leia R2 Indiana Nala Hachiko Slinky Truman Fiona Luke Vito Scooby Simba Lassie Dug Pongo
                    Máximo Toby Electra Copito Butkus Marley Sam Perdita Neo Rambo Valentín Coco Milo Zero Balto Spock Arwen
                    Minnie Max Charlie Fang Casper Yago Pumba Samantha Batman Flash Raven Iron Man Thor Hulk Deadpool Venom
                    Falcon Iceman Loki Groot Spiderman Thanos Tokyo Río Berlín Denver Nairobi Helsinki Moscú Oslo Profesor
                    Arturito Gandía Marsella Bogotá Lisboa Manila Harry Ron Hermione Draco Sirius Hagrid Lucius Snape Voldemort
                    Hedwig Simba Nala Scar Timón Pumba Kiara Pluto Goofy Popeye Bambi Chita Tarzán Bethoveen Mickey Alpha
                    Bolt Buddy Oskar Otto Pepper Percy Dante Reina Dixie Rufo Toby Lucky Olaf Frozen Mowgli Arya Rin Tin
                    Tin Homer Khalessi Tyrion DArtacán Lisa Cersei Jon Patán Marge Ragnar Dany Kira Bob Lilly Heisenberg
                    Foggie Goku Pam Tony Pluto Hodor Sabrina Pancho Goofy Klaus Epi Snoopy Bender Krasty Blas Scooby Doo
                    Fray Tormenta Dexter Pequeño Ayudante de Santa Claus Bart Fantasma Nelson Nelson Shakespeare Wagner Bach
                    Colón Dalí Steve Newton Copérnico Poe Freud Einstein Otto Martin Winston Picasso Miguelangelo Laika
                    Barry Edison Ramses Obama Marie Cleopatra Darwin Galileo Brutus Aristóteles Bill Dalton Platón Ford Winston
                    Kant Goya Zeus Danko Hércules Tanka Athos Silas Atenea Yuki Odín Nakama Venus Aquiles Odiseo Troya Ulises
                    Igor Athos Adonis Porthos Maya Aramis Anka Meraki Cosmos Warro Noel Levis Póker Picoleto Karma Babas
                    Pimpollo Pocholo Chimo Peluche Tequila Crazy Wi-Fi Choco Crack Iphone Pecas Capi Kinder Bingo Capitán
                    Trasto Oreo Cacao Tequila Kodak Birra Joy Brownie Bolita Killa Twistter Dientes Púa Firulais Fiera Pitufo
                    Lola Pepe Lalo Pepa Lucas Quique Simón Sara Hugo Curro Macarena Koke Nono Paloma Paco Bruce Jerry Eddie
                    John Smoky Spike Silver Guy Bobby Jenny Michael Dakota Willy Mandy Walter Deisy Apollo Honey Billy
                    Gou Buddy Kin Cooper Sparkie Dick Boss Fox`;

	nombres = nombres.split(' ');
	nombres = nombres.filter((entry) => entry.trim() != '');
	function toDataUrl(url) {
		return new Promise((resolve) => {
			var xhr = new XMLHttpRequest();
			xhr.onload = function () {
				var reader = new FileReader();
				reader.onloadend = function () {
					resolve(reader.result);
				};
				reader.readAsDataURL(xhr.response);
			};
			xhr.open('GET', url);
			xhr.responseType = 'blob';
			xhr.send();
		});
	}

	async function comunaAlAzar() {
		let comunas = [];
		for await (const region of regiones) {
			comunas = comunas.concat(region.comunas);
		}

		return comunas[Math.floor(Math.random() * comunas.length)];
	}
	async function generarAzar() {
		let animales = [1, 2];
		let tipoPublicacion = [1, 2];
		const animalRandom = animales[Math.floor(Math.random() * animales.length)];
		const tipoPublicacionRandom = tipoPublicacion[Math.floor(Math.random() * tipoPublicacion.length)];
		const comuna = await comunaAlAzar();
		const nombreAzar = await nombres[Math.floor(Math.random() * nombres.length)];
		const edadAzar = Math.floor(Math.random() * 20);
		const address = 'Direccion de muestra 123';
		const description = 'Description de ejemplo, hola';
		const diseases = 'Enfermedades de ejemplo, hola';
		const cantidadImagenes = Math.floor(Math.random() * 5) + 3;
		let res =
			animalRandom == 1
				? await fetch(`https://shibe.online/api/shibes?count=${cantidadImagenes}`)
				: await fetch(`https://shibe.online/api/cats?count=${cantidadImagenes}`);

		res = await res.json();
		files = await res;
		await loadFiles();

		let datos = {
			name: nombreAzar,
			petType: animalRandom,
			pubType: tipoPublicacionRandom,
			age: edadAzar,
			diseases,
			description,
			comune: comuna.id,
			address
		};
		await onComplete(datos);
	}
	function triggerToast(message) {
		const t = {
			message,
			autohide: true,
			timeout: 5000,
			classes: 'font-bold'
		};
		toastStore.trigger(t);
	}
	function errorToast(message) {
		const t = {
			message,
			autohide: true,
			timeout: 5000,
			classes: 'bg-rose-500 font-bold'
		};
		toastStore.trigger(t);
	}
	async function onComplete(datos) {
		const formdata = new FormData();
		for (var key in datos) {
			formdata.append(key, datos[key]);
		}
		if (loaded) {
			for await (const image of loaded) {
				formdata.append('images', image);
			}
		}

		let res = await fetch('/publication/new', {
			method: 'POST',
			headers: {
				Accept: 'application/json'
			},
			body: formdata
		});
		res = await res.json();
		loaded = [];

		if (!res.success) {
			errorToast(res.message);
		} else {
			triggerToast('Publicacion registrada');
		}
	}
</script>

<div class="p-4  mx-auto bg-slate-100 rounded-lg shadow max-w-3xl  my-8">
	<div>
		<button on:click={generarAzar} class=" btn bg-lime-500"> Insertar Aviso al azar </button>
	</div>
	<div id="preview" class="preview gap-2 pt-2 flex flex-wrap  w-full" />
</div>
