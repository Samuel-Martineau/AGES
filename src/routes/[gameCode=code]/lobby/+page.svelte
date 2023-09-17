<script lang="ts">
	import type { PageData } from './$types';
	import Tabs from '$lib/components/Tabs.svelte';
	import Tab1 from './Tab1.svelte';
	import Tab2 from './Tab2.svelte';
	import Button from '$lib/components/Button.svelte';
	import { firestore, playersData, user, playerData, gameData } from '$lib/firebase';
	import { DocumentReference, doc, setDoc, getDoc } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	export let data: PageData;

	$: areUsernamesValid = !$playersData.some((p) => (p.username?.trim() ?? '') === '');
	$: if ($gameData.phase === 'makeMeme') goto('./makeMeme');

	let items = [
		{ label: 'Player List', value: 1, component: Tab1, props: {} },
		{ label: 'QR Code', value: 2, component: Tab2, props: { gameCode: data.gameCode } }
	];

	function startGame() {
		$gameData.phase = 'makeMeme';
	}
</script>

<div><Tabs {items} /></div>

{#if $gameData.host === $user?.uid}
	<div style="padding-bottom: 25px;">
		<Button on:click={startGame} disabled={!areUsernamesValid}>Start Game</Button>
	</div>
{/if}
