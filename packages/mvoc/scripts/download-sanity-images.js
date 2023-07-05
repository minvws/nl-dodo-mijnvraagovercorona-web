const stream = require('stream');
const { promisify } = require('util');
const {
	mkdirSync,
	createWriteStream,
	rmSync,
	existsSync,
	readdirSync,
} = require('fs');
const got = require('got');
const dotenv = require('dotenv');

/** Get the custom set environment */
const ENV = process.env.ENVIRONMENT || 'development';

/** Use the env based on the passed env value */
dotenv.config({ path: `.env.${ENV}` });

const pipeline = promisify(stream.pipeline);

const folder = './public/images/sanity';

(async () => {
	try {
		const { result } = await got(
			`https://${process.env.PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.PUBLIC_SANITY_DATASET}?query=*%5B_type%3D%3D%22sanity.imageAsset%22%5D%7B%0A%20%20url%2C%0A%20%20sha1hash%2C%0A%20%20originalFilename%0A%7D`,
			{
				headers: {
					'user-agent': undefined,
				},
			},
		).json();

		// check if folder exists
		if (!existsSync(folder)) {
			console.log(`Creating '${folder}'`);
			mkdirSync(folder);
		}

		// Read the files present on the disk to compare them later with sanity database
		let diskFiles = readdirSync(folder, {
			withFileTypes: true,
		})
			.filter((item) => !item.isDirectory())
			.map((item) => item.name);

		// loop over result from sanity
		for (const { url, sha1hash, originalFilename } of result) {
			const fileName = `${sha1hash}-${originalFilename}`;
			const filePath = `${folder}/${fileName}`;

			// Remove item from diskfiles if its present in sanity
			diskFiles = diskFiles.filter((item) => item !== fileName);

			if (!existsSync(filePath)) {
				await pipeline(got.stream(url), createWriteStream(filePath));
			}
		}

		// remove files from disk which are not present in sanity
		diskFiles.forEach((file) => {
			rmSync(`${folder}/${file}`, { force: true });
			console.log(
				'File removed from sanity so also removed from disk:',
				`${folder}/${file}`,
			);
		});
	} catch (error) {
		console.log(error);
	}
})();
