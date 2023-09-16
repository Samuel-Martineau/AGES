<script lang="ts">
	import { emojis } from '$lib/random';

	const randomEmojis = emojis.sort(() => 0.5 - Math.random()).slice(0, 4);
</script>

<div>
	{#each randomEmojis as emoji}
		<span>{emoji}</span>
	{/each}
</div>

<style>
	div {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		align-items: center;
		width: 110px;
		height: 110px;
	}

	span {
		justify-self: center;
		font-size: 50px;
		line-height: 50px;
	}
</style>
