<script>
	import '../theme.postcss';
	import '@brainandbones/skeleton/styles/all.css';
	import { Alert, Modal, Toast } from '@brainandbones/skeleton';
	import { AppShell } from '@brainandbones/skeleton';
	import Navbar from './Navbar.svelte';
	import { setContext } from 'svelte';
	import { user } from '$lib/stores';
	export let data;
	$user = data.user;
</script>

<Toast background="bg-lime-600" />
<Modal />
<AppShell>
	<svelte:fragment slot="pageHeader">
		<Navbar bind:user={data.user} />
		{#if data?.user?.pet_finder && !data.address}
			<Alert class=" flex items-center justify-center text-center w-full !p-4">
				<div class=" flex items-center justify-center font-semibold gap-4 ">
					<span class=" text-2xl"> ⚠️ </span>Debes agregar una direccion para recibir notificaciones!
					<a href="/profile" class=" btn btn-sm bg-amber-500 font-bold text-white">Agregar</a>
				</div>
			</Alert>
		{/if}
	</svelte:fragment>

	<slot />


</AppShell>

<style>
	:global(.btn) {
		@apply font-bold text-white;
	}
</style>
