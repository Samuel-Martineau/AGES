<script lang="ts">
	import type { PageData } from './$types';
	import Tabs from '$lib/components/Tabs.svelte';
	import Tab1 from './Tab1.svelte';
	import Tab2 from './Tab2.svelte';
	import Button from '$lib/components/Button.svelte';
	import { gameData, user } from '$lib/firebase';

	export let data: PageData;

	let items = [
		{ label: 'Player List', value: 1, component: Tab1, props: {} },
		{ label: 'QR Code', value: 2, component: Tab2, props: { gameCode: data.gameCode } }
	];
</script>

<input bind:checked={$gameData.started} type="checkbox" />
<input type="checkbox" bind:checked={$gameData.started} />

<div><Tabs {items} /></div>

<Button href="/{data.gameCode}/makeMeme">Start Game</Button>
