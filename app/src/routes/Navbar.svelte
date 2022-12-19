<script>
	import { AppBar } from '@brainandbones/skeleton';

	import { menu } from '@brainandbones/skeleton';

	export let user;
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a href="/" class=" text-4xl font-extrabold flex">
			<span>Uni</span>
			<span class="text-lime-500">Pet</span>
		</a>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<a class=" btn  !text-slate-800 font-bold text-lg hover:bg-slate-600/10 duration-300 " href="/publication"> Publicaciones</a>
		<a class=" btn  !text-slate-800 font-bold text-lg hover:bg-slate-600/10 duration-300 " href="/blog"> Blog</a>
		{#if user}
			<a class=" btn  !text-slate-800 font-bold text-lg hover:bg-slate-600/10 duration-300 " href="/publication/new"> Crear Aviso</a>
		{/if}
		{#if user?.mod}
			<a class=" btn btn-ghost font-bold text-lg" href="/mod"> Administracion</a>
		{/if}

		{#if !user}
			<div class="navbar-end gap-2">
				<a class="btn  bg-lime-500  font-bold uppercase text-white" href="/auth/login">Ingresar</a>
				<a class=" btn bg-amber-500  font-bold uppercase text-white" href="/auth/register">Registro</a>
			</div>
		{:else}
			<span class="relative">
				<!-- Trigger: apply the 'use:menu' action and supply the unique menu ID -->
				<button use:menu={{ menu: 'example' }}>
					<div class="btn ring-2 ring-accent-500 ring-inset font-bold text-lg">
						{user.name}
					</div></button
				>

				<!-- Menu: set a matching 'data-menu-[menuId]' attribute -->

				<nav class="list-nav card p-4 w-64 shadow-xl" data-menu="example">
					<ul>
						<li><a href="/profile">Perfil</a></li>
						<li><a href="/chat">Mis Chat</a></li>
						<li><a href="/profile/publications">Publicaciones</a></li>
						<li>
							<form method="POST" action="/auth?/logout">
								<button class=" btn bg-primary-500 w-full">Cerrar Sesion</button>
							</form>
						</li>
					</ul>
				</nav>
			</span>
		{/if}
	</svelte:fragment>
</AppBar>
