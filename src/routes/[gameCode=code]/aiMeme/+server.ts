import type { RequestHandler } from './$types';
import { generateMeme } from '$lib/meme';
import { generateMemeCaption } from '$lib/openai';
import { getRandomAiMemeTemplate } from '$lib/random';
import { firestore } from '$lib/firebase';
import { DocumentReference, doc, setDoc, updateDoc } from 'firebase/firestore';
import type { GameData, PlayerData } from '$lib/types';

export const POST: RequestHandler = async ({ params: { gameCode } }) => {
	const template = getRandomAiMemeTemplate();

	const boxes = await generateMemeCaption(template.name);
	const memeUrl = await generateMeme(template.id, boxes);

	const gameDataRef = doc(firestore, 'games', gameCode) as DocumentReference<GameData>;
	const aiPlayerRef = doc(
		firestore,
		'games',
		gameCode,
		'players',
		'ai'
	) as DocumentReference<PlayerData>;

	await Promise.all([
		updateDoc(gameDataRef, {
			['roundMemes.ai']: {
				memeUrl,
				guessedBy: [],
				laughedBy: [],
				vomitedBy: [],
				randomKey: Math.random().toString()
			} satisfies GameData['roundMemes'][number]
		}),
		setDoc(aiPlayerRef, {
			color: '#0ea5e9',
			previousScore: 0,
			emoji: '🤖',
			score: 0,
			username: 'Sage',
			done: true
		})
	]);

	return new Response('success');
};
