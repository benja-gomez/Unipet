<script>
	import PetSmallCard from '$lib/components/PetSmallCard/PetSmallCard.svelte';

	export let data;

</script>

<div class=" my-6  max-w-5xl mx-auto p-3">
	<div class=" flex flex-col items-center ">
		<div class=" font-bold text-4xl mb-8">Tus publicaciones</div>
		<div class=" grid  sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-6">
			{#if data.posts}
				{#each data.posts as post}
					<PetSmallCard pet={post} allowCancel />
				{/each}
			{/if}
		</div>
	</div>
</div>
