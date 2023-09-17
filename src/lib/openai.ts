import { PRIVATE_OPENAI_API_KEY } from '$env/static/private';

import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: PRIVATE_OPENAI_API_KEY
});

export async function generateMemeCaption(templateName: string) {
	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: 'system',
				content:
					'Invent a meme made for the template requested by the user. Output the different boxes as a JSON array.'
			},
			{ role: 'user', content: templateName }
		],
		model: 'ft:gpt-3.5-turbo-0613:personal::7zeuBtJq'
	});
	return JSON.parse(completion.choices[0].message.content!);
}
