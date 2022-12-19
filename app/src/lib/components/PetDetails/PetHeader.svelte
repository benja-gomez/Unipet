<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { user } from '$lib/stores';

	import { getContext } from 'svelte';

	let post = getContext('post');
	// let user = getContext('user');

</script>

<div class=" flex flex-col md:flex-row w-full   ">
	<div class="flex flex-col  w-full">
		<div class=" font-bold text-3xl">{post.pet_type} {post.pub_type}</div>
		<div class=" font-semibold text-xl">{post.comune}, {post.region}</div>
		<div class=" flex items-center gap-1  text-slate-800/60  ">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
				/>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
			</svg>
			<div class=" font-semibold text-sm  ">
				{post.visits} Visitas
			</div>
		</div>
	</div>
	{#if $user?.mod}
		<div class=" flex gap-2">
			<form use:enhance method="POST" action="/mod/review?/approve">
				<input type="number" class="hidden" name="publication_id" value={post.publication_id} />
				<button class="btn h-10 font-bold  text-slate-200 bg-lime-500">Aprobar</button>
			</form>
			<form use:enhance method="POST" action="/mod/review?/reject">
				<input type="number" class="hidden" name="publication_id" value={post.publication_id} />
				<button class="btn h-10 font-bold  text-slate-200 bg-rose-500">Rechazar</button>
			</form>

			<!-- <button class="btn h-10 font-bold  text-slate-50 bg-amber-500">Incompleto</button> -->
		</div>
	{:else if $user}
		{#if post.user_id != $user.user_id}
			<!-- content here -->

			<div class=" flex  md:justify-end w-full ">
				<div class=" flex ">
					<a href={`/publication/${$page.params.publication_id}/chat`} class="btn  h-12 bg-indigo-500 text-white uppercase font-bold">Contactar</a>
				</div>
			</div>
		{/if}
	{:else}
		<div class=" flex  md:justify-end w-full ">
			<div class=" flex ">
				<a href={`/auth/login`} class="btn  h-12 bg-indigo-500 text-white uppercase font-bold">Contactar</a>
			</div>
		</div>
	{/if}
</div>
