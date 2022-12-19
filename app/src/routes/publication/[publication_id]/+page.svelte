<script>
	import PetDetails from '$lib/components/PetDetails/PetDetails.svelte';
	import { setContext } from 'svelte';

	export let data;
	setContext('post', data.post);
</script>

<PetDetails />
<!-- 
<div class="p-2">
	<div class="flex flex-col md:flex-row gap-2 w-full">
		<div class=" flex flex-col gap-2 p-10 bg-slate-200 font-bold rounded-lg ">
			Nombre Mascota: {data.post.pet_name}
			{#each data.post.imagenes as item}
				<img class="max-w-[300px]" src={`https://unipetminio.ostap.io/unipet/${item}.jpg`} alt="" />
			{/each}

			<a
				href={`/publication/${data.post.publication_id}`}
				class="btn btn-primary btn-sm">Ver</a
			>
		</div>
	
	</div>
</div> -->
