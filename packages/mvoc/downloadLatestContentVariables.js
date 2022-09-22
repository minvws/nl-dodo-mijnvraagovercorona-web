const { mkdirSync, rmSync, writeFileSync } = require('fs');
const got = require('got');

(async () => {
	try {
		const result = await got(
			'https://mijnvraagovercorona.nl/data/v1/content-variables.json',
			{
				headers: {
					'user-agent': undefined,
				},
			},
		).json();

		rmSync('./public/data/v1/', { recursive: true, force: true });
		mkdirSync('./public/data/v1/', { recursive: true });

		writeFileSync(
			`./public/data/v1/content-variables.json`,
			JSON.stringify(result),
		);
	} catch (error) {
		console.log(error);
	}
})();
