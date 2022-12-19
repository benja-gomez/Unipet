<script>
	import { enhance } from '$app/forms';

	// Props
	/** Exposes pet props to this component. */
	export let parent;
	export let pet;

	// Stores
	import { modalStore } from '@brainandbones/skeleton';
	import PetSmallCard from './PetSmallCard.svelte';

	// Form Data
	const formData = {
		name: 'Jane Doe',
		tel: '214-555-1234',
		email: 'jdoe@email.com'
	};

	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit() {
		$modalStore[0].response(formData);
		modalStore.close();
	}
	function cancel() {
		modalStore.close();
	}

	// Base Classes
	const cBase = 'space-y-4';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

<div class="modal-example-form {cBase}">
	<div class=" text-2xl font-bold pb-4">Cancelar Publicacion</div>
	<PetSmallCard {pet} />

	<footer class="modal-footer  flex  gap-5  items-center justify-end">
		<button class="btn ring-2 ring-inset ring-surface-500 " on:click={cancel}>Cancelar</button>
		<form use:enhance method="POST" action="/mod?/cancel_publication">
			<input type="number" class="hidden" name="publication_id" value={pet.publication_id} />
			<button class=" btn  bg-warning-500 text-white" href="" on:click={cancel}>Confirmar</button>
		</form>
	</footer>
</div>
