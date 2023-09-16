<script lang="ts">
	import './styles.css';

	import { FirebaseApp, SignedIn, SignedOut } from 'sveltefire';
	import { auth, firestore, storage } from '$lib/firebase';
	import { browser } from '$app/environment';
	import { GoogleAuthProvider, signInAnonymously, signInWithPopup } from 'firebase/auth';

	if (browser) signInAnonymously(auth);
</script>

<FirebaseApp {auth} {firestore} {storage}>
	<h1>Cappin</h1>
	<slot />e
</FirebaseApp>
