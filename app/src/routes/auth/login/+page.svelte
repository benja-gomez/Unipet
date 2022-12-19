<script>
	import { enhance } from '$app/forms';

	export let form, data;
</script>

<div class=" flex   h-full items-center  juc gap-5  max-w-7xl mx-auto p-10">
	<div class="w-full">
		<img class=" rounded-lg shadow-2xl w-full h-full" src="/page1.jpg" alt="" />
	</div>
	<div class="p-4 bg-base-100 rounded-lg  shadow   mx-auto w-full bg-slate-50">
		<div class="font-bold text-2xl text-center pb-10">Iniciar Sesion</div>
		<div class="flex flex-col justify-center items-center gap-2">
			<form use:enhance class="flex flex-col  md:px-20 w-full" method="POST" action="?/login">
				<label for="surname">Email</label>

				<input value="test@test.com" type="email" name="email" required />

				<label for="surname">Clave </label>

				<input class="input input-primary input-sm input-bordered" value="123123" type="password" name="password" required />

				{#if form?.message && !form?.success}
					<p class="text-red-500">{form.message}</p>
				{/if}
				<button class="btn bg-lime-500 uppercase font-bold text-lg	 text-white btn-sm mt-4">Ingresar</button>
				<div class=" flex justify-between mt-4">
					<div>
						<a href="/auth/restore">Olvidaste la contrasena?</a>
					</div>
					<div>
						<a href="/auth/register">Crear Cuenta</a>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
