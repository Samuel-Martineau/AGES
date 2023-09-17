<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import PointsList from '$lib/components/PointsList.svelte';
	import { gameData, playerData, user } from '$lib/firebase';
	import type { PageData } from './$types';

	export let data: PageData;

	$: if ($gameData.phase === 'makeMeme') {
		$playerData.done = false;
		$playerData.previousScore += $playerData.score;
		$playerData.score = 0;
		goto('./makeMeme');
	}

	function next() {
		$gameData.roundMemes = {};
		fetch(`/${data.gameCode}/aiMeme`, {
			method: 'POST'
		});
		$gameData.phase = 'makeMeme';
	}
</script>

<PointsList />

{#if $gameData.host === $user.uid}
	<div style="padding-bottom: 25px;"><Button on:click={next}>Continue</Button></div>
{:else}
	<div />
{/if}
