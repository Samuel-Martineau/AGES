<script lang="ts">
	import { Doc, User, docStore } from 'sveltefire';
	import Logo from '$lib/components/Logo.svelte';
	import { firestore } from '$lib/firebase';

	interface UserData {
		username: string;
	}
	const UserData = {} as UserData;
</script>

<User let:user>
	<Logo />

	<Doc ref="users/{user.uid}" let:data={userData} type={UserData}>
		<div>
			<input type="text" placeholder="username" value={userData.username} />
			<p style="opacity: 1;">Username</p>
		</div>
	</Doc>

	<div>
		<!-- <p><a class:disabled={username.trim() === ''} href="/join">Join Game</a></p> -->
		<p><a href="/create">Create Game</a></p>
	</div>
</User>
