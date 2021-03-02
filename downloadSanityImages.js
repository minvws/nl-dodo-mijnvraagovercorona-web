const stream = require('stream');
const { promisify } = require('util');
const { mkdirSync, createWriteStream } = require('fs');
const got = require('got');

const pipeline = promisify(stream.pipeline);

(async () => {
	try {
		const { result } = await got(
			'https://6h7384ur.api.sanity.io/v1/data/query/production?query=*%5B_type%3D%3D%22sanity.imageAsset%22%5D%7B%0A%20%20url%2C%0A%20%20originalFilename%0A%7D',
			{
				headers: {
					'user-agent': undefined,
				},
			},
		).json();

		mkdirSync('./public/images/sanity/');

		for (const { url, originalFilename } of result) {
			await pipeline(
				got.stream(url),
				createWriteStream(`./public/images/sanity/${originalFilename}`),
			);
		}
	} catch (error) {
		console.log(error);
	}
})();
