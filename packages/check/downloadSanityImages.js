const stream = require('stream');
const { promisify } = require('util');
const { mkdirSync, createWriteStream, rmSync } = require('fs');
const got = require('got');

const pipeline = promisify(stream.pipeline);

(async () => {
	try {
		const { result } = await got(
			'https://yiy91tbc.api.sanity.io/v1/data/query/production?query=*%5B_type%3D%3D%22sanity.imageAsset%22%5D%7B%0A%20%20url%2C%0A%20%20sha1hash%2C%0A%20%20originalFilename%0A%7D',
			{
				headers: {
					'user-agent': undefined,
				},
			},
		).json();

		rmSync('./public/images/sanity/', { recursive: true, force: true });
		mkdirSync('./public/images/sanity/');

		for (const { url, sha1hash, originalFilename } of result) {
			await pipeline(
				got.stream(url),
				createWriteStream(
					`./public/images/sanity/${sha1hash}-${originalFilename}`,
				),
			);
		}
	} catch (error) {
		console.log(error);
	}
})();
