import { PRIVATE_IMGFLIP_PASSWORD, PRIVATE_IMGFLIP_USERNAME } from '$env/static/private';

export async function generateMeme(templateId: string, boxes: string[]): Promise<string> {
	const res = await fetch('https://api.imgflip.com/caption_image', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams([
			['template_id', templateId],
			['username', PRIVATE_IMGFLIP_USERNAME],
			['password', PRIVATE_IMGFLIP_PASSWORD],
			...boxes.map((b, i) => [`boxes[${i}][text]`, b])
		])
	});
	const body = await res.text();
	try {
		return JSON.parse(body).data.url;
	} catch {
		console.log(body);
		return '';
	}
}
