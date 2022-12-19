<script>
	import FileDropzone from '$lib/components/FileDropzone.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
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

	function fileToDataUri(field) {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.addEventListener('load', () => {
				resolve(reader.result);
			});
			reader.readAsDataURL(field);
		});
	}

	$: if (files) loadFiles();
	async function loadFiles() {
		let preview = [];
		for await (const file of files) {
			let loadImage = await fileToDataUri(file);
			let img = document.createElement('img');

			img.src = loadImage;
			img.setAttribute('id', file.name);
			img.addEventListener('load', async () => {
				let resizingFactor = await resizeCalc(img.width, img.height);

				await compressImage(img, resizingFactor, quality);
				await preview.push(img);
				dispatch('imgComprimidas', loaded);
				for await (const img of preview) {
					document.querySelector('#preview1').append(img);
				}
			});
		}
	}

	async function uploadImages() {
		const formdata = new FormData();
		for await (const image of loaded) {
			formdata.append('images', image);
		}
		await fetch('/test/subir', {
			method: 'POST',
			headers: {
				Accept: 'application/json'
			},
			body: formdata
		});
	}
</script>

<div id="preview1" class="preview py-3 gap-2 flex items-center max-w-[200px]" />
<FileDropzone bind:files multiple id="file" accept="image/*" />

<style>
	:global(.preview > img) {
		@apply rounded-lg max-h-[200px] object-contain;
	}
</style>
