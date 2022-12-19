<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	export let form, data;

	$: pet_finder = $page.url.searchParams.get('pet_finder') || 0;
</script>

<div class=" flex   h-full items-center  juc gap-5  max-w-7xl mx-auto p-10">
	<div class="w-full">
		<img class=" rounded-lg shadow-2xl w-full h-full" src="/page2.jpg" alt="" />
	</div>
	<div class="p-4 bg-base-100 rounded-lg  shadow max-w-4xl mx-auto w-full bg-slate-50">
		<div class="font-bold text-2xl text-center pb-10">Crear Cuenta</div>
		<div class="flex flex-col justify-center items-center gap-2">
			<form use:enhance class="flex flex-col  md:px-20 w-full" method="POST" action="?/register">
				<input bind:value={pet_finder} type="number" name="pet_finder" class="hidden" />

				<label for="name">Nombre</label>
				<input class="input input-primary input-sm input-bordered" value="Benjamin" type="text" name="name" required />
				<label for="surname">Apellido</label>
				<input class="input input-primary input-sm input-bordered" value="Benjaminovich" type="text" name="surname" required />
				<label for="surname">Email</label>
				<input class="input input-primary input-sm input-bordered" value="test@test.com" type="email" name="email" required />
				<label for="surname">Telefono</label>
				<div class=" flex items-center h-full ">
					<div class=" bg-slate-500 h-full px-1 py-2 rounded-l-lg border border-slate-400 border-r-0  font-bold text-white">+569</div>
					<input
						class="input input-primary input-sm input-bordered !rounded-l-none !border-l-0"
						maxlength="8"
						value="12345678"
						type="text"
						name="phone"
						required
					/>
				</div>
				<label for="surname">Clave </label>
				<input class="input input-primary input-sm input-bordered" value="123123" type="password" name="password" required />
				<label for="surname">Repetir Clave</label>
				<input class="input input-primary input-sm input-bordered" value="123123" type="password" name="repassword" required />
				{#if form?.message && !form?.success}
					<p class="text-red-500">
						{form.message}
					</p>
				{/if}
				<button class="btn bg-lime-500 text-white font-bold uppercase btn-sm mt-4">Registrarse</button>
				<div class=" flex  justify-center mt-4">
					<div>
						<a href="/auth/login">Ya tienes cuenta?</a>
					</div>
			
				</div>
			</form>
		</div>
	</div>
</div>
