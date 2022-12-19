<script>
	import dayjs from 'dayjs';

	export let data;

</script>

<div
	class="flex flex-col gap-3 items-center mx-auto p-2 justify-center"
>
	{#each data.blog as blog_item}
		<div
			class="w-full max-w-xl card overflow-hidden"
			href="#"
		>
			<header>
				<!-- <img
			src="https://source.unsplash.com/random/1280x540?skeleton"
			class="bg-black/50 w-full aspect-[21/9]"
			alt="Post"
            /> -->
			</header>
			<div class="card-body space-y-4">
				<h6 class="font-extrabold text-sm text-primary-500">
					{blog_item.type}
				</h6>
				<h3 class="font-semibold">{blog_item.title}</h3>
				<article>
					<p>
						Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Ipsum iusto magnam
						maxime quos, voluptate qui repudiandae
						itaque officia nisi rerum voluptas
						sunt facilis error, placeat
						consectetur asperiores provident
						possimus doloremque?
                        {blog_item.content}
					</p>
				</article>
			</div>
			<hr />
			<footer
				class="p-4 flex justify-start items-center space-x-4"
			>
				<div
					class="flex-auto flex justify-between items-center"
				>
					<h6 class="font-bold">UniPet</h6>
					<small
						>{dayjs(blog_item.created_at).format(
							'DD/MM/YYYY'
						)}</small
					>
				</div>
			</footer>
		</div>
	{/each}
</div>
