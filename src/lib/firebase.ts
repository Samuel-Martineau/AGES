import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

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
