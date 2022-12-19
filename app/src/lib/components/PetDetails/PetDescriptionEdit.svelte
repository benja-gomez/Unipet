<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { editPub } from '$lib/stores';
	import { toastStore } from '@brainandbones/skeleton';
	import dayjs from 'dayjs';
	import { getContext } from 'svelte';

	let post = getContext('post');
	$: stringed = JSON.stringify(post);

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

<div class="grid md:grid-cols-12 gap-4">
	<div class=" md:col-span-8">
		<div class="flex flex-col font-bold gap-4 ">
			<div class=" flex items-center justify-between gap-2 ">
				<div class=" font-bold text-lg">Detalles</div>
				<div class=" flex gap-2">
					<form
						use:enhance={() => {
							return async ({ result, update }) => {
								$editPub = false;
								const res = await result.data;

								if (res.success) {
									triggerToast('Publicacion Actualizada');
								} else {
									errorToast(res.message);
								}

								await update();
							};
						}}
						method="POST"
						action={`/publication/${$page.params.publication_id}?/update`}
					>
						<input type="text" name="post" class="hidden" bind:value={stringed} />
						<button class=" btn btn-sm bg-lime-400 flex items-center rounded ">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
								<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
							</svg>
							Guardar
						</button>
					</form>

					<button on:click={() => ($editPub = false)} class=" btn btn-sm bg-amber-400 flex items-center rounded "> Cancelar </button>
				</div>
			</div>
			<div class=" flex flex-col">
				<div class=" font-bold text-lg">Descripcion</div>
				<textarea name="" id="" class=" max-w-2xl" bind:value={post.description} />
			</div>
			{#if post.diseases}
				<div class=" flex flex-col">
					<div class=" font-bold text-lg">Enfermedades</div>
					<textarea name="" id="" class=" max-w-2xl" bind:value={post.diseases} />
				</div>
			{/if}
		</div>
	</div>
	<div class="md:col-span-4">
		<div class="flex flex-col border rounded-lg shadow p-4 bg-gray-100 gap-3 font-extrabold">
			<div class="font-bold text-lg">Detalles</div>
			{#if post.pet_name}
				<div class="flex flex-col gap-0 ">
					<div class=" text-lime-600 font-bold text-sm tracking-tight leading-4">NOMBRE</div>
					<input type="text" name="pet_name" bind:value={post.pet_name} />
				</div>
			{/if}
			<div class="flex flex-col gap-0 ">
				<div class=" text-lime-600 font-bold text-sm tracking-tight leading-4">FECHA REGISTRO</div>
				<div class="  text-lg font-bold tracking-tight leading-5 uppercase">
					{dayjs(post.created_at).format('DD-MM-YYYY ')}
				</div>
			</div>
			<div class="flex flex-col gap-0 ">
				<div class=" text-lime-600 font-bold text-sm tracking-tight leading-4">REGION</div>
				<div class="  text-lg font-bold tracking-tight leading-5 uppercase">{post.region}</div>
			</div>
			<div class="flex flex-col gap-0 ">
				<div class=" text-lime-600 font-bold text-sm tracking-tight leading-4">COMUNA</div>
				<div class="  text-lg font-bold tracking-tight leading-5 uppercase">{post.comune}</div>
			</div>
			{#if post.age}
				<div class="flex flex-col gap-0 ">
					<div class=" text-lime-600 font-bold text-sm tracking-tight leading-4">EDAD</div>
					<div class=" flex gap-2 items-center  font-extrabold">
						<input type="text" name="age" class=" max-w-[100px]" bind:value={post.age} /> Anos
					</div>
				</div>
			{/if}
			<div class="flex flex-col gap-0 ">
				<div class=" text-lime-600 font-bold text-sm tracking-tight leading-4">ULTIMA ACTUALIZACION</div>
				<div class="  text-lg font-bold tracking-tight leading-5 uppercase">
					{dayjs(post.updated_at).format('DD-MM-YYYY ')}
				</div>
			</div>
			<div class="btn btn-lg bg-lime-600 hover:bg-lime-700 border-none">Contactar</div>
		</div>
	</div>
</div>
