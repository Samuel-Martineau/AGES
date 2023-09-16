import fs from 'fs';

const memes = JSON.parse(fs.readFileSync('./memes.json').toString());

const trainingData = memes
	.flatMap((m) =>
		m.texts.map((t) =>
			JSON.stringify({
				messages: [
					{
						role: 'system',
						content:
							'Invent a meme made for the template requested by the user. Output the different boxes as a JSON array.'
					},
					{ role: 'user', content: m.template },
					{
						role: 'assistant',
						content: JSON.stringify(t)
					}
				]
			})
		)
	)
	.join('\n');

fs.writeFileSync('./fine-tuning-data.jsonl', trainingData);
