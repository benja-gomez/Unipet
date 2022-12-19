<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import ModStats from './ModStats.svelte';
	import Pagination from './Pagination.svelte';

	export let data;

	$: totalPages = Math.ceil(data?.total / 10) ?? 1;

	$: p = +($page.url.searchParams.get('page') ?? '1');
	$: status = $page.url.searchParams.get('status') ?? 'Pending';

	async function updateData(event) {
		status = await event.target.value;
		await goto(`/mod?page=1&status=${status}`);
	}
	function changePage(event) {
		goto(`/mod/?page=${event.detail}&status=${status}`);
	}
</script>

<div class="container mx-auto py-10 w-full">
	<div class="flex w-full justify-center">
		<ModStats />
	</div>
	<div class="flex gap-4 items-center justify-center">
		<select on:change={updateData} bind:value={status} class="select w-full max-w-xs my-4">
			{#each data.status_options as item}
				<option value={item.status}>{item.status}</option>
			{/each}
		</select>
	</div>
	<div class="overflow-x-auto w-full">
		<div class=" text-2xl font-bold pb-2">
			Publicaciones {status}
		</div>
		<table class="table w-full">
			<thead>
				<tr>
					<th># ID</th>
					<th>Nombre Persona</th>
					<th>Nombre Mascota</th>
					<th>Direccion</th>
					<th>Accion</th>
				</tr>
			</thead>
			<tbody>
				{#if data?.posts}
					{#each data.posts as post}
						<tr>
							<td>
								<div class="flex ">
									<div class="flex  items-center justify-center gap-4">
										<div class=" text-xl font-bold">
											#{post.publication_id}
										</div>
										{#if post.imagenes}
											<img
												loading="lazy"
												class="max-w-[120px] rounded-lg"
												src={`https://unipetminio.ostap.io/unipet/${post.imagenes[0]}.jpg`}
												alt=""
											/>
										{/if}
									</div>
								</div>
							</td>
							<td>{post.userdata.name} {post.userdata.surname}</td>
							<td>{post.pet_name}</td>
							<td>{post.address}</td>
							<td>
								<div class="flex flex-col">
									<a class="btn bg-lime-500 text-slate-200 btn-sm" href={`/mod/review/?publication_id=${post.publication_id}`}>Revisar</a>
								</div>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>

		<div class="flex items-center justify-center py-4 w-full">
			<Pagination on:changePage={changePage} bind:pages={totalPages} bind:p />
		</div>
	</div>
</div>
