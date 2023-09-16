<script lang="ts">
	let memeData = {
		src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROp8KtGXSZiDqlMkUxjjXl0bjHacqNVkppbA&usqp=CAU',
		numBoxes: 2
	};
</script>

<!-- <p><a href="/wait">Meme it!</a></p> -->
<img src={memeData.src} alt="meme" />

<form>
	{#each [...Array(memeData.numBoxes).keys()] as numBox}
		<input type="text" placeholder="Caption goes here" />
	{/each}
</form>

<style>
	/* * {
		justify-content: initial !important;
	} */

	img {
		width: 90vw;
		border-radius: 25px;
		margin-left: 2.5vh;
		margin-right: 2.5vh;
		margin-bottom: 2.5vh;
	}

	input {
		width: 90vw;
		margin-left: 2.5vh;
		margin-right: 2.5vh;
		margin-bottom: 2vh;
		line-height: 7vh;
		cursor: pointer;
		display: inline-block;
		user-select: none;
		/* margin: 5vw; */
		transition: all 125ms ease-in-out;
		text-decoration: none;
		box-sizing: border-box;
		text-align: center;
		box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);

		&.full {
			border-radius: 15px;
			/* padding: 15px; */
		}

		&.inline {
			border-radius: 5px;
			/* padding: 6px; */
		}

		background-color: var(--dark);
		color: var(--light);

		&:hover {
			transform: scale(1.05);
		}

		&:active {
			transform: scale(0.95);
		}

		&[data-disabled='true'] {
			filter: grayscale(0.2) contrast(0.8);
			box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);

			&:hover,
			&:active {
				transform: scale(1);
			}
		}
	}
</style>
