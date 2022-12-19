<script>
	import { page } from '$app/stores';

	$: isSender = $page.data.user.user_id == msg.user_id;
	$: chatClass = isSender ? `chat-end` : `chat-start`;
	export let msg;
</script>

<div class=" w-full">
	<div class=" chat {chatClass}">
		<div class="chat-header">
			{msg.name}
			<time class="text-xs opacity-50">2 hour ago</time>
		</div>
		<div class="chat-image avatar">
			<div class="w-10 !rounded-full"><img alt="ppl" class=" rounded-full" src={`https://avatars.lindernman.xyz/${msg.name}`} /></div>
		</div>
		<div class="  chat-bubble">{msg.message}</div>
	</div>
</div>

<style>
	.chat-end .chat-image {
		grid-column-start: 2;
	}
	.chat-end .chat-bubble {
		grid-column-start: 1;
		border-bottom-right-radius: 0;
	}
	.chat-end .chat-header,
	.chat-end .chat-footer {
		grid-column-start: 1;
	}
	.chat-end {
		place-items: end;
		grid-template-columns: 1fr auto !important;
	}
	.chat-start .chat-header,
	.chat-start .chat-footer {
		grid-column-start: 2;
	}
	.chat-header {
		grid-row-start: 1;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
	.chat-start .chat-bubble::before {
		-webkit-mask-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMycgaGVpZ2h0PSczJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIGZpbGw9J2JsYWNrJyBkPSdtIDAgMyBMIDMgMyBMIDMgMCBDIDMgMSAxIDMgMCAzJy8+PC9zdmc+);
		mask-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMycgaGVpZ2h0PSczJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIGZpbGw9J2JsYWNrJyBkPSdtIDAgMyBMIDMgMyBMIDMgMCBDIDMgMSAxIDMgMCAzJy8+PC9zdmc+);
		left: -0.75rem;
	}
	.chat-end .chat-bubble::before {
		-webkit-mask-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMycgaGVpZ2h0PSczJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIGZpbGw9J2JsYWNrJyBkPSdtIDAgMyBMIDEgMyBMIDMgMyBDIDIgMyAwIDEgMCAwJy8+PC9zdmc+);
		mask-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMycgaGVpZ2h0PSczJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIGZpbGw9J2JsYWNrJyBkPSdtIDAgMyBMIDEgMyBMIDMgMyBDIDIgMyAwIDEgMCAwJy8+PC9zdmc+);
		left: 100%;
	}
	.chat-bubble {
		position: relative;
		display: block;
		width: -moz-fit-content;
		width: fit-content;
		padding: 0.5rem 1rem;
		max-width: 90%;

		min-height: 2.75rem;
		min-width: 2.75rem;

		@apply bg-slate-500 rounded-lg font-semibold text-white;
	}
	.chat-end .chat-bubble {
		grid-column-start: 1;
		border-bottom-right-radius: 0;
	}
	.chat-start .chat-bubble {
		grid-column-start: 2;
		border-bottom-left-radius: 0;
	}
	.chat {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		column-gap: 0.75rem;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
	}
	.chat-start {
		place-items: start;
		grid-template-columns: auto 1fr;
	}
	.chat-bubble::before {
		position: absolute;
		bottom: 0;
		height: 0.75rem;
		width: 0.75rem;
		background-color: inherit;
		content: '';
		-webkit-mask-size: contain;
		mask-size: contain;
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-position: center;
		mask-position: center;
	}
	.chat-start .chat-image {
		grid-column-start: 1;
	}
	.chat-image {
		grid-row: span 2 / span 2;
		align-self: flex-end;
	}
	.avatar {
		position: relative;
		display: inline-flex;
	}
</style>
