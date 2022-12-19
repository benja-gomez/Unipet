<script>
	import { getContext } from 'svelte';

	let post = getContext('post');

	let picked = post.imagenes[0];
</script>

<div class="flex max-md:flex-col gap-6 my-10">
	<div class="flex relative md:w-7/12 w-full">
		{#key picked}
			<div class="flex w-full items-center justify-center     ">
				<img src={`https://unipetminio.ostap.io/unipet/${picked}.jpg`} class=" max-h-[400px] w-full object-contain bg-stone-600" />
			</div>{/key}
	</div>
	<div class="md:w-5/12 relative">
		<div class="grid grid-cols-3 gap-2">
			{#each post.imagenes as img}
				<div class:ring={img == picked} class=" flex w-full rounded-lg  max-w-[150px] max-h-[150px] relative cursor-pointer">
					<img
						src={`https://unipetminio.ostap.io/unipet/${img}.jpg`}
						class=" w-full  object-contain bg-stone-600  rounded-lg"
						on:click={() => (picked = img)}
					/>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.containert {
		width: 100%;
		display: flex;
	}
	.item {
		flex-shrink: 0;
	}
</style>
