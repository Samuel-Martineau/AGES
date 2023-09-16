import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';
import { faker } from '@faker-js/faker';

admin.initializeApp();

export const onCreateUser = functions.auth.user().onCreate((user) => {
	return admin
		.firestore()
		.collection('users')
		.doc(user.uid)
		.set({ username: faker.animal.cetacean() });
});
