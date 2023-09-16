<script>
	import Button from '$lib/components/Button.svelte';
	import { emojis, colors } from '$lib/random';
	import PlayerList from '$lib/components/PlayerList.svelte';

	let players = [
		{
			username: 'aasdfas',
			color: colors[0],
			score: 500,
			rank: 1,
			emoji: emojis[11]
		},
		{
			username: 'bfasdgs',
			color: colors[1],
			score: 200,
			rank: 3,
			emoji: emojis[63]
		},
		{
			username: 'chfghdf',
			color: colors[2],
			score: 300,
			rank: 2,
			emoji: emojis[43]
		},
		{
			username: 'djkljlk',
			color: colors[3],
			score: 100,
			rank: 4,
			emoji: emojis[25]
		},
		{
			username: 'edsfkasd',
			color: colors[4],
			score: 5,
			rank: 5,
			emoji: emojis[10]
		}
	];
	let emojiProfile = [];
</script>

<PlayerList />
