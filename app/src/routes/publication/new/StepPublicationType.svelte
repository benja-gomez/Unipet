<script>
	import Step from '$lib/components/Stepper/Step.svelte';
	export let datos;
	let petType = [
		{ type: 'Perro', code: 1 },
		{ type: 'Gato', code: 2 },
		{ type: 'Otro', code: 3 }
	];
	let pubType = [
		{ type: 'Mascota Extraviada', code: 1 },
		{ type: 'Mascota Encontrada', code: 2 },
		{ type: 'Otro', code: 3 }
	];
</script>

<Step index={0}>
	<svelte:fragment slot="header">
		<div class=" font-bold text-2xl">Tipo de Publicacion</div>
	</svelte:fragment>
	<div class=" flex flex-col">
		<div class=" flex items-start  gap-3 justify-start">
			<div class="flex flex-col max-w-[200px] w-full	">
				<label for="surname">Tipo Mascota</label>
				<select
					bind:value={datos.petType}
					class="input input-primary input-sm input-bordered w-full "
				>
					{#each petType as item}
						<option value={item.code}> {item.type} </option>
					{/each}
				</select>
			</div>
			<div class="flex flex-col max-w-[200px] w-full">
				<label for="surname">Tipo Publicacion</label>
				<select
					bind:value={datos.pubType}
					class="input input-primary input-sm input-bordered w-full"
				>
					{#each pubType as item}
						<option value={item.code}> {item.type} </option>
					{/each}
				</select>
			</div>
		</div>
		<div class=" flex items-start  gap-3 justify-start">
			<div class=" flex flex-col max-w-[200px] w-full">
				{#if datos.petType == 3}
					<label for="surname">Ingrese Tipo Mascota</label>
					<input
						bind:value={datos.petTypeDesc}
						class="input input-primary input-sm input-bordered"
						type="text"
					/>
				{/if}
			</div>
			<div class=" flex flex-col max-w-[200px] w-full">
				{#if datos.pubType == 3}
					<div class=" col-span-3  flex flex-col">
						<label for="surname">Ingrese el tipo</label>
						<input
							bind:value={datos.pubTypeDesc}
							class="input input-primary input-sm input-bordered"
							type="text"
						/>
					</div>
				{/if}
			</div>
		</div>
	</div>
</Step>
