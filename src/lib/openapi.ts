import { PRIVATE_OPENAI_API_KEY } from '$env/static/private';

import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: PRIVATE_OPENAI_API_KEY
});

// async function main() {
// 	const completion = await openai.chat.completions.create({
// 		messages: [{ role: 'user', content: 'Say this is a test' }],
// 		model: 'gpt-3.5-turbo'
// 	});

// 	console.log(completion.choices);
// }

export async function doTest() {
	const completion = await openai.chat.completions.create({
		messages: [{ role: 'user', content: 'Say this is a test' }],
		model: 'gpt-3.5-turbo'
	});
	console.log(completion.choices);
}
