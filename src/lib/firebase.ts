import { initializeApp } from 'firebase/app';
import { DocumentReference, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { collectionStore, userStore } from 'sveltefire';
import { page } from '$app/stores';
import type { GameData, PlayerData } from '$lib/types';
import { derived, type Readable, type Writable } from 'svelte/store';
import { docStore, type DocStore } from 'sveltefire';
import { faker } from '@faker-js/faker';
import { getRandomColour, getRandomEmoji } from './random';

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
		get ref() {
			return doc?.ref;
		},
		set: (v: GameData) => {
			if (doc) doc.set(v);
		}
	} as Writable<GameData> & { ref: DocumentReference<GameData> | null | undefined };
})();

export const playersData = derived(page, ($page, set) => {
	if ($page.params.gameCode) {
		return collectionStore<PlayerData & { id: string }>(
			firestore,
			`games/${$page.params.gameCode}/players`
		).subscribe(set);
	} else {
		set([]);
	}
}) as Readable<(PlayerData & { id: string })[]>;

export const playerData = (function () {
	let doc: DocStore<PlayerData> | null = null;
	const { subscribe } = derived([page, user], ([$page, $user], set) => {
		if ($page.params.gameCode && $user) {
			doc = docStore<PlayerData>(firestore, `games/${$page.params.gameCode}/players/${$user.uid}`);
			if (doc.ref)
				getDoc(doc.ref).then((d) => {
					if (!d.exists()) {
						setDoc(d.ref, {
							username: faker.animal.cetacean(),
							color: getRandomColour(),
							emoji: getRandomEmoji(),
							score: 0,
							previousScore: 0,
							done: false
						});
					}
				});
			return doc.subscribe(set);
		} else {
			doc = null;
			set(null);
		}
	});
	return {
		subscribe,
		set: (v: PlayerData) => {
			if (doc) doc.set(v);
		}
	} as Writable<PlayerData>;
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
