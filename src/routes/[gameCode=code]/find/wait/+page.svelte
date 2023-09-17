<script lang="ts">
	import { goto } from '$app/navigation';
	import Logo from '$lib/components/Logo.svelte';
	import { gameData, playersData, user } from '$lib/firebase';

	$: if ($gameData.phase === 'showMakers') goto('../showMakers');

	$: if ($gameData.host === $user!.uid && !$playersData.some((p) => !p.done))
		$gameData.phase = 'showMakers';
</script>

<Logo />

<p>Waiting for other players...</p>

<div />
