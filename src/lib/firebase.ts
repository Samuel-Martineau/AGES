import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { userStore } from 'sveltefire';
import { page } from '$app/stores';
import type { GameData } from '$lib/types';
import { derived, type Writable } from 'svelte/store';
import { docStore, type DocStore } from 'sveltefire';

const app = initializeApp({
	apiKey: 'AIzaSyBM3FZk-CPbXlw-N4IgcNAo2ai7BwqWCeE',
	authDomain: 'cappin-e4063.firebaseapp.com',
	projectId: 'cappin-e4063',
	storageBucket: 'cappin-e4063.appspot.com',
	messagingSenderId: '1057773461439',
	appId: '1:1057773461439:web:b5eaa3bdc33d2251b24b0a',
	measurementId: 'G-HYJ2X1NSRG'
});
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const user = userStore(auth);

export const gameData = (function () {
	let doc: DocStore<GameData> | null = null;
	const { subscribe } = derived(page, ($page, set) => {
		if ($page.params.gameCode) {
			doc = docStore<GameData>(firestore, `games/${$page.params.gameCode}`);
			return doc.subscribe(set);
		} else {
			doc = null;
			set(null);
		}
	});
	return {
		subscribe,
		set: (v: GameData) => {
			if (doc) doc.set(v);
		}
	} as Writable<GameData>;
})();

// export const userData = (function () {
// 	let doc: DocStore<UserData> | null = null;
// 	const { subscribe } = derived(user, ($user, set) => {
// 		if ($user) {
// 			doc = docStore<UserData>(firestore, `users/${$user.uid}`);
// 			return doc.subscribe(set);
// 		} else {
// 			doc = null;
// 			set(null);
// 		}
// 	});
// 	return {
// 		subscribe,
// 		set: (v: UserData) => {
// 			if (doc) doc.set(v);
// 		}
// 	} as Readable<UserData | null>;
// })();
