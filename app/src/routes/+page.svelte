<script>
	import { AnimatedCounter } from '@benzara/svelte-animated-counter';
	import PetSmallCard from '$lib/components/PetSmallCard/PetSmallCard.svelte';
	const skillsValues = ['Mascotas', 'Familias'];
	export let data;

</script>

<div class="w-full  bg-center bg-cover h-[32rem]" style="background-image: url('/portada.jpg');  ">
	<div class="flex items-center justify-center w-full h-full bg-gray-900/40">
		<div
			class="container max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center text-slate-100"
		>
			<div class="space-y-4">
				<div class="h-[56px] text-6xl font-extrabold">UniPet</div>

				<h2 class="md:text-3xl">Ayudando a encontrar mascotas extraviadas desde el 1533</h2>

				<nav class="flex space-x-4 font-bold uppercase">
					<a href="/publication/new" class="btn bg-lime-600"
						><span>Publicar Aviso</span> <span>→</span></a
					> <a href="/search" class="btn  bg-slate-900/30">Ayudanos a buscar</a>
				</nav>
				<div class=" text-2xl font-semibold flex  gap-2">
					<div class="">Mas de 5000</div>
					<div class="!mt-0.5  relative skew-x-12 bg-lime-500/40">
						<div class=" block -skew-x-12 ">
							<AnimatedCounter
								interval={2500}
								values={skillsValues}
								ease="cubic-bezier(0.25, 0.1, 0.25, 1)"
								direction="up"
							/>
						</div>
					</div>
					Contentas
				</div>
			</div>
		</div>
	</div>
</div>

<div class="p-2 container mx-auto max-w-6xl mt-6">
	<div class=" font-bold text-2xl text-center pb-6 underline decoration-indigo-500">
		Ultimas Publicaciones
	</div>
	<div class=" grid  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
		{#if data.posts}
			{#each data.posts as post}
				<PetSmallCard pet={post} allowCancel />
			{/each}
		{/if}
	</div>
	<div class=" flex items-center justify-center">
		<a class="btn btn-lg bg-lime-500 font-bold uppercase mt-10" href="/publication">
			Ver Todas las Publicaciones</a
		>
	</div>
</div>
