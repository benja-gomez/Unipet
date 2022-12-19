<script>
	import Step from '$lib/components/Stepper/Step.svelte';
	export let datos;
</script>

<Step index={3}>
	<svelte:fragment slot="header">
		<div class=" font-bold text-2xl">Enviar</div>
	</svelte:fragment>
</Step>
