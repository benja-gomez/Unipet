<script>
	import EditProfileCard from './EditProfileCard.svelte';
	import SmallProfileCard from './SmallProfileCard.svelte';

	export let data;

	let profile = data.profile;
</script>

<div class="flex flex-col max-w-3xl  mx-auto my-6 p-2  w-full">
	<div class="grid md:grid-cols-12 gap-2">
		<SmallProfileCard bind:profile />
		<EditProfileCard bind:profile bind:comunes={data.comunes} bind:user_address={data.user_address} />
	</div>
</div>
