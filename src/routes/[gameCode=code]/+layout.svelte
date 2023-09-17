<script lang="ts">
	import { gameData, playerData, playersData } from '$lib/firebase';

	$gameData;
	$playerData;
	$playersData;
</script>

{#if $gameData && $playerData && $playersData}
	<slot />
{/if}
