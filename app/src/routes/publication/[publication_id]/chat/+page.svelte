<script>
	import { enhance } from '$app/forms';
	import { afterUpdate, tick } from 'svelte';

	import { page } from '$app/stores';
	import { errorToast } from '$lib/utils';
	import ChatMessage from './ChatMessage.svelte';

	export let form;
	export let data;

	$: if (form && form?.success == false) {
		errorToast(form?.message);
	}

	let list = [];
	let element;
	let messageInput;

	afterUpdate(() => {
		if (list) scrollToBottom(element);
	});

	$: if (list && element) {
		scrollToBottom(element);
	}

	const scrollToBottom = async (node) => {
		await node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
		document.getElementById('messageId').focus();
	};
</script>

<div class=" max-w-2xl mx-auto p-2 mt-4">
	<h2 class=" font-bold">Contacto</h2>
	<div class=" flex flex-col bg-surface-100 mt-4 rounded-lg shadow-xl border-x border-slate-400 ">
		<div class=" w-full">
			<div class=" bg-slate-600 rounded-t-lg p-4 flex justify-between">
				<div class=" font-bold text-white text-lg">Tu chat con : {data?.chat.name}</div>
			</div>
			<div class=" rounded-b-lg ">
				<div bind:this={element} class=" flex flex-col gap-3 max-h-[600px]  overflow-y-scroll w-full px-2 py-2">
					<div class=" w-full h-full">
						{#if data?.chat.messages.length}
							{#each data.chat.messages as msg, i}
								<ChatMessage othername={data.chat.name} bind:msg />
							{/each}
						{/if}
						{#if !data?.chat.messages.length}
							<div class=" flex items-center justify-center  h-[400px]">
								<div class="  font-bold text-lg text-center">Aun no hay mensajes</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
			<div class=" bg-slate-500 rounded-b-lg">
				<form use:enhance class=" flex gap-4 p-4" action="?/message" method="POST">
					<input id="messageId" bind:this={messageInput} name="message" class=" font-semibold" type="text" />
					<input type="number" class="hidden" name="publication_id" bind:value={$page.params.publication_id} />
					<button class="btn bg-emerald-500 text-white">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
							/>
						</svg>
					</button>
				</form>
			</div>
		</div>
	</div>
</div>
