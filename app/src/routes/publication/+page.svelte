<script>
	import Publications from './Publications.svelte';
	import SearchFilter from './SearchFilter.svelte';
	export let data;
</script>

<div class=" my-4 max-w-7xl mx-auto p-2">
	<div class="grid md:grid-cols-12 gap-3 items-start">
		<SearchFilter bind:data bind:comunes={data.comunes} />
		<Publications bind:data />
	</div>
</div>
