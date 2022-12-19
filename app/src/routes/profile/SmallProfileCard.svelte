<script>
	export let profile;
</script>

<div class="md:col-span-4 w-full">
	<div class=" w-full flex flex-col gap-2">
		<div class="card w-full">
			<header class="card-header">
				<div class=" flex items-center justify-center ">
					<img
						class="rounded-full max-w-[100px] ring ring-lime-500"
						src={`https://avatars.lindernman.xyz/${profile.name}${profile.surname}`}
						alt=""
					/>
				</div>
			</header>
			<div class="card-body flex justify-center">
				<div class=" font-bold text-lg">
					{profile.name}
					{profile.surname}
				</div>
			</div>
			<footer class="card-footer">
				<div class="flex flex-col gap-2 w-full">
					<div class="flex items-center gap-2 font-semibold ">
						<div class="w-[20px]">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
								/>
							</svg>
						</div>
						<div>
							{profile.email}
						</div>
					</div>
					<div class="flex items-center gap-2 font-semibold ">
						<div class="w-[20px]">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
								/>
							</svg>
						</div>
						<div>
							{profile.phone.replace('+', '')}
						</div>
					</div>
				</div>
			</footer>
		</div>
	</div>
</div>
