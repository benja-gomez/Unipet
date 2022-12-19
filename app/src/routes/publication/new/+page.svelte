<script>
	import Stepper from '$lib/components/Stepper/Stepper.svelte';
	import { setContext } from 'svelte';

	import { writable } from 'svelte/store';
	import AvisoAzar from './AvisoAzar.svelte';
	import StepPersonalData from './StepPersonalData.svelte';
	import StepPetDetails from './StepPetDetails.svelte';
	import StepPublicationType from './StepPublicationType.svelte';
	import StepSend from './StepSend.svelte';
	export let data;
	setContext('regiones', data.regiones);
	const active = writable(0);

	let files;
	let datos = {
		name: '',
		petType: 1,
		petTypeDesc: '',
		pubType: 1,
		pubTypeDesc: '',
		age: null,
		diseases: null,
		description: null,
		region: null,
		comune: null,
		address: null,
		phone: null,
		photos: null,
		city: null
	};
	async function onComplete() {
		try {
			const formdata = new FormData();
			for (var key in datos) {
				formdata.append(key, datos[key]);
			}
			if (files) {
				for await (const image of files) {
					formdata.append('images', image);
				}
			}

			await fetch('/publication/new', {
				method: 'POST',
				headers: {
					Accept: 'application/json'
				},
				body: formdata
			});
			
		} catch (error) {
			
		}
	}
</script>

<AvisoAzar />
<div class=" flex  items-start justify-evenly gap-4 max-w-3xl mx-auto w-full h-full">
	<div class="  w-full bg-slate-100 shadow-xl rounded-xl p-4">
		<div class=" gap-x-4 gap-y-2 w-full" method="POST" action="?/publicar">
			<Stepper {active} length={4} on:complete={onComplete}>
				<StepPublicationType bind:datos />
				<StepPetDetails bind:datos bind:files />
				<StepPersonalData bind:datos />
				<StepSend bind:datos />
			</Stepper>
		</div>
	</div>
</div>
