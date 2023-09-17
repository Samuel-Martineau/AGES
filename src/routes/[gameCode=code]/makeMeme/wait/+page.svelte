<script lang="ts">
	import { goto } from '$app/navigation';
	import Logo from '$lib/components/Logo.svelte';
	import { gameData, playersData, user } from '$lib/firebase';

	$: if ($gameData.phase === 'find') goto('../find');

	$: if (
		$gameData.host === $user!.uid &&
		Object.values($gameData.roundMemes).length === $playersData.length
	)
		$gameData.phase = 'find';
</script>

<Logo />

<p>Waiting for other players...</p>

<div />
