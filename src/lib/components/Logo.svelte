<script lang="ts">
	import { emojis, getRandomEmoji } from '$lib/random';

	let randomEmojis = emojis.sort(() => 0.5 - Math.random()).slice(0, 4);

	setInterval(() => {
		const [first, second, third, fourth] = randomEmojis;
		let newEmoji;
		do {
			newEmoji = getRandomEmoji();
		} while ([first, second, fourth].includes(newEmoji));
		randomEmojis = [newEmoji, first, fourth, second];
	}, 250);
</script>

<div>
	{#each randomEmojis as emoji}
		<span>{emoji}</span>
	{/each}
</div>

<style>
	@keyframes spin {
		100% {
			transform: rotate(-360deg);
		}
	}

	div {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		align-items: center;
		width: 110px;
		height: 110px;
		animation: spin 4s linear infinite;
	}

	span {
		justify-self: center;
		font-size: 50px;
		line-height: 50px;
		animation: spin 2s linear infinite reverse;
	}
</style>
