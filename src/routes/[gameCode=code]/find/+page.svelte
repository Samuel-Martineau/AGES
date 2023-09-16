<!-- naive infinite scroll with #each loop -->

<script lang="ts">
	let memeUrls: string[] = [
		'https://media.npr.org/assets/img/2015/03/03/overly_custom-39399d2cf8b6395770e3f10fd45b22ce39df70d4.jpg',
		'https://primulaproducts.com/cdn/shop/articles/Coffee_Meme_-_1_600x.jpg?v=1633903536',
		'https://d.newsweek.com/en/full/1176971/obesity-meme.png?w=1600&h=900&q=88&f=0c8293185b292dc0d5eb47eace629bd1',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROp8KtGXSZiDqlMkUxjjXl0bjHacqNVkppbA&usqp=CAU'
	];

	let reactionEmojis: string[] = ['🤖', '😂', '🤢'];
</script>

<!-- {#each [...Array(100).keys()] as _} -->
<!-- {#each memeUrls as memeUrl}
		<img src={memeUrl} alt="meme" />
		{#each reactionEmojis as reactionEmoji}
			<p>{reactionEmoji}</p>
		{/each}
	{/each} -->

<div class="emoji-container">
	{#each memeUrls as memeUrl}
		<div class="meme">
			<img src={memeUrl} alt="meme" />
			<div class="emoji-list">
				{#each reactionEmojis as reactionEmoji}
					<button on:click={() => alert('hi')}>{reactionEmoji}</button>
				{/each}
			</div>
		</div>
	{/each}
</div>

<!-- {/each} -->

<style>
	img {
		width: 90vw;
		border-radius: 25px;
		margin-left: 2.5vh;
		margin-right: 2.5vh;
	}

	.emoji-container {
		display: flex;
		flex-wrap: wrap;
	}

	.meme {
		/* margin: 10px; */
		text-align: right;
	}

	.emoji-list {
		display: flex;
		justify-content: flex-end; /* Align emojis to the right */
		margin-right: 2vh;
		margin-bottom: 1.5vh;
	}

	button {
		font-size: 2.5em;
		margin: 0 0.2em 0 0;
		background: none;
		border-radius: 10px;
	}
</style>
