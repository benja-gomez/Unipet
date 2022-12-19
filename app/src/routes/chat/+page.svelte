<script>
	import { Divider } from '@brainandbones/skeleton';
	import dayjs from 'dayjs';

	export let data;

</script>

<div class=" max-w-2xl mx-auto p-2 mt-4">
	<h2 class=" font-bold">Tus Chats</h2>
	<div class=" flex flex-col bg-surface-100 mt-4 rounded-lg shadow-xl border-x border-slate-400 ">
		<div class=" w-full">
			<div class=" bg-slate-600 rounded-t-lg p-4">
				<div class=" font-bold text-white text-lg">Historial de Chats</div>
			</div>
			<div class=" rounded-b-lg ">
				<div class=" flex flex-col gap-3 max-h-[600px]  overflow-y-scroll w-full px-2 py-2">
					{#if data.chat.length}
						<div class=" grid items-center justify-center grid-cols-4 gap-2 border-b border-slate-400 last:border-none">
							<div class=" font-bold">Chat</div>
							<div class="  font-bold">Fecha</div>
							<div class=" font-bold">Asunto</div>
							<div class=" font-bold" />
							<Divider class=" col-span-4" />
							{#each data.chat as chat}
								<div class=" font-bold">
									Chat con {chat.name}
								</div>
								<div class=" flex flex-col ">
									<div class=" text-xs">Creado</div>
									<div class=" text-sm font-semibold">
										{dayjs(chat.chat_creation).format('DD-MM-YYYY')}
									</div>
								</div>
								<div class=" font-bold">
									{chat.pet_type}
									{chat.pub_type}
								</div>
								<div class=" flex items-end w-full justify-end pr-2">
									<a class=" btn btn-sm bg-lime-500 font-bold text-white" href={`/publication/${chat.publication_id}/chat`}>Ver Chat </a>
								</div>
							{/each}
						</div>
					{/if}
					{#if !data.chat.length}
						<div class=" flex items-center justify-center  h-[400px]">
							<div class="  font-bold text-lg text-center">No hay Chats</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
