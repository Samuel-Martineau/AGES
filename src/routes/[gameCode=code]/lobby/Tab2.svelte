<script lang="ts">
	import type { PageData } from './$types';

	export let gameCode: string;

	let gameUrl = `https://cappin.ca/${gameCode}/lobby`;
</script>

<img
	src="https://api.qrserver.com/v1/create-qr-code/
		?size=250x250
		&data={encodeURIComponent(gameUrl)}
		&color=016a70"
	alt={gameUrl}
/>

<style>
	img {
		display: block;
		margin-top: 70px;
		padding: 5px;
		border: 3px solid black;
		border-radius: 10px;
		background-color: white;
		width: 250px;
		height: 250px;
		margin-left: auto;
		margin-right: auto;
	}
</style>
