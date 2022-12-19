<script>
	import { triggerToast } from '$lib/utils';

	function dummy() {
		triggerToast('Se te enviaran las instrucciones a tu correo');
	}
</script>

<div class=" flex   h-full items-center  juc gap-5  max-w-7xl mx-auto p-10">
	<div class="w-full">
		<img class=" rounded-lg shadow-2xl w-full h-full" src="/page1.jpg" alt="" />
	</div>
	<div class="p-4 bg-base-100 rounded-lg  shadow   mx-auto w-full bg-slate-50">
		<div class="font-bold text-2xl text-center pb-10">Recuperar Contrasena</div>
		<div class="flex flex-col justify-center items-center gap-2">
			<div class="flex flex-col  md:px-20 w-full">
				<label for="surname">Email</label>

				<input value="test@test.com" type="email" name="email" required />

				<button on:click={dummy} class="btn bg-lime-500 uppercase font-bold text-lg	 text-white btn-sm mt-4">Enviar correo</button>
				<div class=" flex justify-between mt-4">
					<div>
						<a href="/auth/login">Ingresar</a>
					</div>
					<div>
						<a href="/auth/register">Crear Cuenta</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
