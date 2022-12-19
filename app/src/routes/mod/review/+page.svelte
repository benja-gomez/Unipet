<script>
	import PetDetails from '$lib/components/PetDetails/PetDetails.svelte';
	import { setContext } from 'svelte';

	export let data;

	setContext('post', data.post);
</script>

<div class="max-w-4xl mx-auto">
	<PetDetails />
</div>
