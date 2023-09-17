<script lang="ts">
	import './styles.css';

	import { FirebaseApp, SignedIn, SignedOut } from 'sveltefire';
	import { auth, firestore, storage, user } from '$lib/firebase';
	import { browser } from '$app/environment';
	import { signInAnonymously } from 'firebase/auth';
	import Logo from '$lib/components/Logo.svelte';

	if (browser) signInAnonymously(auth);
	$user;
</script>

<svelte:head>
	<title>Cappin</title>
	<link
		rel="icon"
		href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧢</text></svg>"
	/>
</svelte:head>

<FirebaseApp {auth} {firestore} {storage}>
	<div />
	<h1>Cappin</h1>
	<SignedIn><slot /></SignedIn>
	<SignedOut><Logo /></SignedOut>
</FirebaseApp>
