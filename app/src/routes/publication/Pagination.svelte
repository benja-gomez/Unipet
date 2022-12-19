<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let pages;
	export let page;
</script>

{#if pages > 1}
	<div class="btn-group">
		<button class="btn btn-sm bg-lime-600/60 text-lg px-5 h-8   font-bold" on:click={() => dispatch('changePage', page - 1)} disabled={page - 1 <= 0}
			>«</button
		>
		<button class="btn font-semibold text-sm">Pagina {page}</button>
		<button
			on:click={() => dispatch('changePage', page + 1)}
			class="btn btn-sm bg-lime-600/60 text-lg px-5 h-8   font-bold"
			disabled={page + 1 > pages}>»</button
		>
	</div>
{/if}
