<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import PointsList from '$lib/components/PointsList.svelte';
	import { gameData, playerData, user } from '$lib/firebase';

	$: if ($gameData.phase === 'makeMeme') {
		$playerData.done = false;
		$playerData.previousScore += $playerData.score;
		$playerData.score = 0;
		goto('./makeMeme');
	}

	async function submit() {
		$gameData.roundMemes = {};
		$gameData.phase = 'makeMeme';
	}
</script>

<PointsList />

{#if $gameData.host === $user.uid}
	<Button on:click={submit}>Continue</Button>
{/if}
