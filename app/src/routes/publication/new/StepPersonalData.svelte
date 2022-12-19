<script>
	import Select from 'svelte-select';
	import Step from '$lib/components/Stepper/Step.svelte';

	import { getContext } from 'svelte';
	export let datos;
	let regiones = getContext('regiones');

	function handleSelect(event) {
		if (regionSeleccionada) {
			regionSeleccionada = null;
			comunaSeleccionada = null;
		}
		regionSeleccionada = event.detail;
	}
	function comuneSelect(event) {
		datos.comune = event.detail.id;
	}
	let regionSeleccionada;
	let comunaSeleccionada;
</script>

<Step index={2}>
	<svelte:fragment slot="header">
		<div class=" font-bold text-2xl">Datos Personales</div>
	</svelte:fragment>
	<form class="flex flex-col themed max-w-sm">
		<label for="region">Region:</label>
		<Select
			bind:value={regionSeleccionada}
			class="themed"
			on:select={handleSelect}
			id="region"
			items={regiones}
		/>
		{#if regionSeleccionada}
			<label for="comunas">Comuna</label>
			<Select
				on:select={comuneSelect}
				bind:value={comunaSeleccionada}
				id="comunas"
				items={regionSeleccionada.comunas}
			/>
		{/if}
	</form>
	{#if comunaSeleccionada?.id}
		<input class="hidden" type="number" name="comune" bind:value={comunaSeleccionada.id} />
	{/if}
	<div class=" flex flex-col max-w-sm w-full">
		<label for="surname">Direccion</label>
		<input
			bind:value={datos.address}
			class="input input-primary input-sm input-bordered"
			type="text"
			name="address"
		/>
	</div>
	<div class=" flex flex-col max-w-sm w-full">
		<label for="surname">Numero de contacto</label>
		<input
			bind:value={datos.phone}
			class="input input-primary input-sm input-bordered"
			type="text"
			name="phone"
		/>
	</div>
</Step>

<style>
	.themed {
		--border: 1px solid rgb(var(--color-surface-300) / var(--tw-border-opacity));
		--borderRadius: 8px;
		--background: rgb(var(--color-surface-200) / var(--tw-bg-opacity));
		--listBackground: rgb(var(--color-surface-200));
	}
</style>
