<!-- naive infinite scroll with #each loop -->

<script lang="ts">
	interface MemeType {
		url: string;
		color: string;
	}

	let memeObjects: MemeType[] = [
		{
			url: 'https://media.npr.org/assets/img/2015/03/03/overly_custom-39399d2cf8b6395770e3f10fd45b22ce39df70d4.jpg',
			color: 'FF00FF'
		},
		{
			url: 'https://primulaproducts.com/cdn/shop/articles/Coffee_Meme_-_1_600x.jpg?v=1633903536',
			color: 'FFFFFF'
		},
		{
			url: 'https://d.newsweek.com/en/full/1176971/obesity-meme.png?w=1600&h=900&q=88&f=0c8293185b292dc0d5eb47eace629bd1',
			color: 'FF0000'
		},
		{
			url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROp8KtGXSZiDqlMkUxjjXl0bjHacqNVkppbA&usqp=CAU',
			color: '0000FF'
		}
	];

	let flipped = false;
</script>

<div class="emoji-container">
	{#each memeObjects as memeObject}
		<div class="meme">
			<!-- <div style="position: relative">
				<div
					style="position: absolute; 
						background-color: #{memeObject.color};
						opacity: 0.5;
						width: 100%; 
						height: 100%;
						border-radius: 25px;"
				/>
				<img style="display: block;" src={memeObject.url} alt="meme" />
				<button class="card" class:flipped on:click={() => (flipped = !flipped)}>hello</button>
			</div> -->

			<div
				class="card"
				class:flipped
				style:transform={flipped ? 'rotateY(0)' : ''}
				style:--bg-1="palegoldenrod"
				style:--bg-2="black"
				style:--bg-3="goldenrod"
			>
				<div class="front">
					<!-- <span class="symbol">♠</span> -->
					<img style="display: block;" src={memeObject.url} alt="meme" />
				</div>
				<div class="back">
					<div
						style="position: absolute; 
							background-color: #{memeObject.color};
							opacity: 0.5;
							width: 100%; 
							height: 100%;
							border-radius: 25px;"
					/>
				</div>
			</div>

			<button on:click={() => (flipped = !flipped)}>Button</button>
		</div>
	{/each}
</div>

<!-- {/each} -->

<style>
	img {
		width: 90vw;
		border-radius: 25px;
		gap: 60px 60px;
		/* margin-left: 2.5vh; */
		/* margin-right: 2.5vh; */
	}

	.meme {
		/* margin: 10px; */
		text-align: right;
		display: flex;
		flex-direction: column;
		gap: 1em;
		height: 100%;
		align-items: center;
		justify-content: center;
		perspective: 100vh;
	}

	.card {
		position: relative;
		aspect-ratio: 2.5 / 3.5;
		font-size: min(1vh, 0.25rem);
		height: 80em;
		background: var(--bg-1);
		border-radius: 2em;
		transform: rotateX(180deg);
		transition: transform 2s;
		transform-style: preserve-3d;
		padding: 0;
		user-select: none;
		cursor: pointer;
	}

	.card.flipped {
		transform: rotateX(0);
	}

	.back,
	.front {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		backface-visibility: hidden;
		border-radius: 2em;
		border: 1px solid var(--fg-2);
		box-sizing: border-box;
		padding: 2em;
	}

	.back {
		background: url(./svelte-logo.svg) no-repeat 5em 5em,
			url(./svelte-logo.svg) no-repeat calc(100% - 5em) calc(100% - 5em);
		background-size: 8em 8em, 8em 8em;
	}

	.front {
		background: url(./svelte-logo.svg) no-repeat 5em 5em,
			url(./svelte-logo.svg) no-repeat calc(100% - 5em) calc(100% - 5em);
		background-size: 8em 8em, 8em 8em;
	}

	.symbol {
		font-size: 30em;
		color: var(--fg-1);
	}

	.pattern {
		width: 100%;
		height: 100%;
		background-color: var(--bg-2);
		/* pattern from https://projects.verou.me/css3patterns/#marrakesh */
		background-image: radial-gradient(var(--bg-3) 0.9em, transparent 1em),
			repeating-radial-gradient(
				var(--bg-3) 0,
				var(--bg-3) 0.4em,
				transparent 0.5em,
				transparent 2em,
				var(--bg-3) 2.1em,
				var(--bg-3) 2.5em,
				transparent 2.6em,
				transparent 5em
			);
		background-size: 3em 3em, 9em 9em;
		background-position: 0 0;
		border-radius: 1em;
	}
</style>
