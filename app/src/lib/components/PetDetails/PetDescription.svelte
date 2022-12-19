<script>
	import { page } from '$app/stores';
	import { editPub } from '$lib/stores';
	import dayjs from 'dayjs';
	import { getContext } from 'svelte';

	let post = getContext('post');

	$: currentUser = $page?.data?.user?.user_id;
	$: publicationUser = post.user_id;
</script>

<div class="grid md:grid-cols-12 gap-4">
	<div class=" md:col-span-8">
		<div class="flex flex-col font-bold gap-4 relative">
			{#if currentUser == publicationUser || $page?.data?.user?.mod}
				<div class=" absolute right-0 top-0">
					<button on:click={() => ($editPub = true)} class=" btn btn-sm bg-amber-400 flex items-center rounded ">
						Editar
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
							/>
						</svg>
					</button>
				</div>
			{/if}
			<div class=" flex flex-col">
				<div class=" font-bold text-lg">Descripcion</div>
				<div class="   font-normal">
					{post.description}
				</div>
			</div>
			{#if post.diseases}
				<div class=" flex flex-col">
					<div class=" font-bold text-lg">Enfermedades</div>
					<div class="   font-normal">
						{post.diseases}
					</div>
				</div>
			{/if}
		</div>
	</div>
	<div class="md:col-span-4">
		<div class="flex flex-col border rounded-lg shadow p-4 bg-gray-100 gap-3">
			<div class="font-bold text-lg">Detalles</div>
			{#if post.pet_name}
				<div class="flex flex-col gap-0 ">
					<div class=" text-lime-600 font-bold text-sm tracking-tight leading-4">NOMBRE</div>
					<div class="  text-lg font-bold tracking-tight leading-5 uppercase">{post.pet_name}</div>
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
					<div class="  text-lg font-bold tracking-tight leading-5 uppercase">{post.age} ANOS</div>
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
