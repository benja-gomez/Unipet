<script>
	import Step from '$lib/components/Stepper/Step.svelte';
	import { data } from 'autoprefixer';
	import PetImages from './PetImages.svelte';
	export let datos, files;

	function imgComprimidas(event) {
		files = event.detail;
	}
</script>

<Step index={1}>
	<svelte:fragment slot="header">
		<div class=" font-bold text-2xl">Detalles de la Mascota</div>
	</svelte:fragment>
	<div class=" flex flex-col max-w-[300px] w-full">
		<label for="name">Nombre de la mascota</label>
		<input
			bind:value={datos.name}
			class="  input input-primary input-sm input-bordered"
			type="text"
			name="name"
		/>
	</div>
	<div class=" flex flex-col max-w-[300px] w-full">
		<label for="surname">Enfermedades</label>
		<textarea bind:value={datos.diseases} class="textarea textarea-primary" placeholder="..." />
	</div>
	<div class=" flex flex-col max-w-[300px] w-full">
		<label for="surname">Otros Detalles</label>
		<textarea bind:value={datos.description} class="textarea textarea-primary" placeholder="..." />
	</div>
	<div class=" flex flex-col max-w-[300px] w-full">
		<label for="surname">Edad</label>
		<input
			bind:value={datos.age}
			class="input input-primary input-sm input-bordered"
			type="text"
			name="age"
		/>
	</div>
	<div class=" flex flex-col max-w-[300px] w-full">
		<label for="surname">Fotografias</label>
		<PetImages on:imgComprimidas={imgComprimidas} bind:loaded={data.photos} />
	</div>
</Step>
