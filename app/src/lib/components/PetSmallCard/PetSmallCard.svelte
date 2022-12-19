<script>
	import { modalStore } from '@brainandbones/skeleton';
	import { page } from '$app/stores';
	import ModConfirmar from './ModConfirmar.svelte';
	import dayjs from 'dayjs';

	export let pet;
	export let allowCancel;
	function triggerCustomModal() {
		const modalComponent = {
			// Pass a reference to your custom component
			ref: ModConfirmar,
			// Add your props as key/value pairs
			props: { pet },
			// Provide default slot content as a template literal
			slot: '<p>Skeleton</p>'
		};
		const d = {
			type: 'component',
			component: modalComponent,
			response: () => {
		
			}
			// NOTE: title, body, response, etc are supported!
		};
		modalStore.trigger(d);
	}
	$: pubTypeRibbon = pet.pub_type == 'Extraviado' ? 'bg-lime-600' : 'bg-sky-600';
</script>

<a
	class="card overflow-hidden bg-slate-100  duration-100 shadow-xl  hover:scale-105  transition-all relative"
	href={allowCancel ? `/publication/${pet.publication_id}` : '#'}
>
	{#if $page.data.user?.mod && allowCancel}
		<!-- content here -->

		<div class="absolute right-3 top-3 text-white font-bold">
			<button
				class="btn-icon btn-ghost-tertiary btn-sm h-2 !w-2 !p-3.5"
				on:click|preventDefault={() => triggerCustomModal()}>✕</button
			>
		</div>
	{/if}
	<header class="flex flex-col  max-h-[190px] h-full w-full ">
		<img
			loading="lazy"
			class=" object-cover bg-stone-700 w-full h-full"
			src={`https://unipetminio.ostap.io/unipet/${pet.imagenes[0]}.jpg`}
			alt=""
		/>
		<div class=" text-surface-100 text-center font-bold shadow-xl uppercase {pubTypeRibbon}">
			{pet.pub_type}
		</div>
	</header>
	<div class="card-body space-y-1">
		<h6 class="text-lime-600 font-extrabold text-lg">{pet.pet_name}</h6>
		<div class="flex items-center gap-3 font-bold">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class="w-4 h-4"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
				/>
			</svg>
			{pet.comune}
		</div>
		<div class="flex items-center gap-3 font-bold">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class="w-4 h-4"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
				/>
			</svg>
			{dayjs(pet.created_at).format('DD-MM-YYYY')}
		</div>
	</div>
</a>
