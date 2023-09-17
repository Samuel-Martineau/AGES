import type { RequestHandler } from './$types';
import { generateMeme } from '$lib/meme';

export const POST: RequestHandler = async ({ request }) => {
	const { templateId, boxes } = await request.json();
	return new Response(await generateMeme(templateId, boxes));
};
