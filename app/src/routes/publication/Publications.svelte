<script>
	import PetSmallCard from '$lib/components/PetSmallCard/PetSmallCard.svelte';

	export let data;
</script>

<div class=" md:col-span-9">
	<div class=" grid md:grid-cols-3 gap-4 p-2">
		{#if data.publications}
			{#each data.publications as item}
				<PetSmallCard allowCancel bind:pet={item} />
			{/each}
		{:else}
			<div class=" flex items-center justify-center font-bold text-3xl md:col-span-3 h-full">No hay publicaciones</div>
		{/if}
	</div>
</div>
