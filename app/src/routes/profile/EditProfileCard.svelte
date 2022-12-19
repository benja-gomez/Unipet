<script>
	import { enhance } from '$app/forms';
	import Select from 'svelte-select';
	import { Divider, SlideToggle, toastStore } from '@brainandbones/skeleton';
	import { user } from '$lib/stores';
	export let profile, comunes, user_address;
	function setComune(event) {
		comune = event.detail.value;
	}
	let comune;

	function triggerToast(message) {
		const t = {
			message,
			autohide: true,
			timeout: 5000,
			classes: 'font-bold'
		};
		toastStore.trigger(t);
	}
	function errorToast(message) {
		const t = {
			message,
			autohide: true,
			timeout: 5000,
			classes: 'bg-rose-500 font-bold'
		};
		toastStore.trigger(t);
	}
</script>

<div class="md:col-span-8">
	<div class="card themed">
		<header class="card-header font-bold text-xl ">Perfil</header>
		<div class="card-body">
			<div class=" flex flex-col gap-2">
				<div class="flex  justify-between ">
					<div class=" font-bold text-lg">Recibir Notificaciones</div>
					<SlideToggle size="sm" accent="bg-lime-500" bind:checked={$user.pet_finder} />
				</div>
				<form
					use:enhance={({ data }) => {
						data.set('pet_finder', $user.pet_finder);
						return async ({ result, update }) => {
							triggerToast('Notificaciones Actualizadas');
						};
					}}
					class=" mb-3 flex  w-full justify-center"
					action="?/finder"
					method="POST"
				>
					<button class="btn btnsm bg-lime-500 w-full">Guardar</button>
				</form>
			</div>
			<Divider class="py-2" />
			<form
				use:enhance={() => {
					return async ({ result }) => {
						const res = await result.data;

						if (res.success) {
							triggerToast('Perfil Actualizado !');
						} else {
							errorToast(res.message);
						}
					};
				}}
				method="POST"
				action="?/profile"
				class="flex flex-col gap-2"
			>
				<label for="phone">Telefono</label>
				<input value={profile.phone} type="text" name="phone" />
				<button class="btn bg-lime-500">Actualizar</button>
			</form>
			<Divider class=" my-3" />
			<div class=" font-bold">Tus Direcciones</div>
			<form
				use:enhance={() => {
					return async ({ result, update }) => {
						const res = await result.data;

						if (res.success) {
							triggerToast('Direccion agregada');
							await update();
						} else {
							errorToast(res.message);
						}
					};
				}}
				method="POST"
				action="?/address"
				class="flex flex-col gap-2 themed"
			>
				<label for="comune">Comuna</label>
				<Select class=" !text-slate-700" on:select={setComune} name="comune" id="comunes" items={comunes} />
				<input class="hidden" type="number" name="comune" bind:value={comune} />

				<label for="address">Direccion</label>
				<input type="text" name="address" />
				<label for="description">Guardar direccion como</label>
				<input type="text" name="description" />
				<button class="btn bg-lime-500">Agregar Direccion</button>
			</form>
			{#if user_address}
				<Divider class="mt-2" />
				<div class=" card-body space-y-1">
					<p class="font-bold">Tus Direcciones</p>
					<hr />
					<dl class="list-dl">
						{#each user_address as item}
							<div class="!p-0 border-b border-slate-400 last:border-none !rounded-none">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
									<path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
									/>
								</svg>

								<span class="flex-auto"
									><dt class=" font-bold">{item.comune}</dt>
									<dd>{item.address}</dd></span
								>
								<div>
									<form
										use:enhance={() => {
											return async ({ update }) => {
												triggerToast('Direccion Eliminada');
												await update();
											};
										}}
										method="POST"
										action="?/delete"
									>
										<input type="number" name="user_address_id" class="hidden" bind:value={item.user_address_id} />
										<button class="btn btn-sm bg-rose-600 text-white font-bold uppercase">Eliminar</button>
									</form>
								</div>
							</div>
						{/each}
					</dl>
				</div>
				<!-- content here -->
			{/if}
		</div>
	</div>
</div>

<style>
	.themed {
		--border: 1px solid rgb(var(--color-surface-300) / var(--tw-border-opacity));
		--borderRadius: 8px;
		--background: rgb(var(--color-surface-200) / var(--tw-bg-opacity));
		--listBackground: rgb(var(--color-surface-200));
	}
</style>
