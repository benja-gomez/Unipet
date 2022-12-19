<script>
	import { goto } from '$app/navigation';

	// import Select from 'svelte-select';

	import Pagination from './Pagination.svelte';

	export let comunes, data;

	let filters = {
		pub_type: 'Todos',
		pet_type: 'Todos',
		comune: null,
		date: null,
		page: 1
	};

	async function filterResults() {
		goto(`?pub_type=${filters.pub_type}&pet_type=${filters.pet_type}&page=${filters.page}`);
	}
	async function changePage(event) {
		filters.page = await event.detail;
		filterResults();
	}
</script>

<div class="card md:col-span-3 p-3 themed !bg-slate-100 shadow-xl">
	<div class=" flex flex-col">
		<div class=" font-bold border-b border-slate-300 mb-4">Filtros Busqueda</div>
		<div class=" flex flex-col">
			<label for="pub_type" class="mt-2">Tipo de Publicacion</label>
			<select bind:value={filters.pub_type}>
				<option value="Todos" selected>Todos</option>
				<option value="Extraviado">Extraviados</option>
				<option value="Encontrado">Encontrados</option>
				<option value="Otros">Otros</option>
			</select>
			<label for="pub_type" class="mt-2">Tipo Animal</label>
			<select bind:value={filters.pet_type}>
				<option value="Todos" selected>Todos</option>
				<option value="Perro">Perro</option>
				<option value="Gato">Gato</option>
				<option value="Otros">Otros</option>
			</select>
			<label for="pub_type" class="mt-2">Comuna</label>
			<!-- <Select on:select={setComune} name="comune" id="comunes" items={comunes} /> -->

			<button on:click={filterResults} class=" mt-4 font-bold text-white uppercase btn btn-sm bg-lime-500">Filtrar</button>
			<div class=" w-full flex items-center justify-center mt-6">
				<Pagination on:changePage={changePage} bind:page={filters.page} pages={Math.ceil(data.total_publications / 9)} />
			</div>
		</div>
	</div>
</div>

<style>
	.themed {
		--border: 1px solid rgb(var(--color-surface-300));
		--borderRadius: 8px;
		--background: rgb(var(--color-surface-200) / var(--tw-bg-opacity));
		--listBackground: rgb(var(--color-surface-200));
	}
</style>
