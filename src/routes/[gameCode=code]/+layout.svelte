<script lang="ts">
	import { gameData } from '$lib/firebase';

	$gameData;
</script>

{#if $gameData}
	<slot />
{/if}
