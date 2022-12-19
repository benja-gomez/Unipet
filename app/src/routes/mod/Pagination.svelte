<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let pages;
	export let p;
</script>

{#if pages > 1}
	<div class="btn-group">
		<button on:click={() => dispatch('changePage', p - 1)} class="btn bg-lime-500" disabled={p <= 1} class:btn-disabled={p - 1 <= 0}>«</button>
		<button class="btn bg-lime-500">Page {p}</button>
		<button disabled={p >= pages} on:click={() => dispatch('changePage', p + 1)} class="btn bg-lime-500" class:btn-disabled={p + 1 > pages}>»</button>
	</div>
{/if}
