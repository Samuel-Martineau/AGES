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

<FirebaseApp {auth} {firestore} {storage}>
	<h1>Cappin</h1>
	<SignedIn><slot /></SignedIn>
	<SignedOut><Logo /></SignedOut>
</FirebaseApp>
