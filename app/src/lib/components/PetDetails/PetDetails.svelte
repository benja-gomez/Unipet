<script>
	import { editPub } from '$lib/stores';
	import PetDescription from './PetDescription.svelte';
	import PetDescriptionEdit from './PetDescriptionEdit.svelte';
	import PetHeader from './PetHeader.svelte';
	import PetPhotos from './PetPhotos.svelte';
</script>

<div class="flex  flex-col container mx-auto  my-4 bg-base-100 py-4 rounded-lg shadow-xl px-3 md:px-10">
	<PetHeader />
	<PetPhotos />
	{#if $editPub}
		<PetDescriptionEdit />
	{:else}
		<PetDescription />
	{/if}
</div>
