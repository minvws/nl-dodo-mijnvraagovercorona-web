const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');
const got = require('got');
const dotenv = require('dotenv');

/** Get the custom set environment */
const ENV = process.env.ENVIRONMENT || 'development';

/** Use the env based on the passed env value */
dotenv.config({ path: `.env.${ENV}` });

const folder = './data';

/** Check if the folder exists */
if (!existsSync(folder)) {
	mkdirSync(folder);
}

const firstDayOfCorona = new Date('02-27-2020').toISOString();

const LAST_UPDATE_TIMESTAMP_PATH = path.resolve(
	__dirname,
	`../data/${ENV}-last-update-timestamp.txt`,
);

/**
 * Reads the last update timestamp from the file, or returns a default value if not found.
 * @returns {string} Last update timestamp.
 */
const readLastUpdateTimestamp = () => {
	try {
		const timestamp = readFileSync(LAST_UPDATE_TIMESTAMP_PATH, 'utf8');
		const date = new Date(timestamp);

		/** Add 1 second to be safe with comparison */
		date.setSeconds(date.getSeconds() + 1);

		return date.toISOString();
	} catch (err) {
		if (err.code === 'ENOENT') {
			return firstDayOfCorona;
		} else {
			/** Other errors, rethrow the exception */
			throw err;
		}
	}
};

/**
 * Cleans a date string by extracting the expected format (YYYY-MM-DDTHH:mm:ss.SSSZ)
 * and returning the matched string if it's valid. Throws an error if the input is invalid.
 *
 * @param {string} dateString - The input date string to be cleaned.
 * @returns {string} The cleaned date string in the format YYYY-MM-DDTHH:mm:ss.SSSZ.
 * @throws {Error} Throws an error if the input date string is invalid.
 */
const cleanDateString = (dateString) => {
	const regex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)/;
	const match = dateString.match(regex);

	if (match) {
		return match[1];
	} else {
		throw new Error('Invalid date string');
	}
};

/**
 * Fetches documents from Sanity that have been created or updated
 * since the last run, and writes the latest timestamp to a file.
 * Sets the environment variable CHANGES_DETECTED based on whether
 * any changes were found.
 */
(async () => {
	try {
		/** Initialize the last run timestamp with a default value */
		const lastRunTimestamp = cleanDateString(readLastUpdateTimestamp());

		/** Define the Sanity query to fetch documents created or updated since the last run */
		const query = `*[_updatedAt > "${lastRunTimestamp}" || _createdAt > "${lastRunTimestamp}"]{
            _id,
            _type,
            _createdAt,
            _updatedAt
        } | order(_updatedAt asc)`;

		/** Execute the query against the Sanity API */
		const { result } = await got(
			`https://${process.env.PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.PUBLIC_SANITY_DATASET}`,
			{
				searchParams: { query },
				headers: {
					'user-agent': undefined,
				},
			},
		).json();

		/** Check if there are any changes since the last run */
		if (result.length > 0) {
			/** Find the latest timestamp among the results */
			const latestTimestamp = result.reduce((max, item) => {
				const maxDate = new Date(max);
				const createdAt = new Date(item._createdAt);
				const updatedAt = new Date(item._updatedAt);

				if (createdAt > maxDate) max = createdAt.toISOString();
				if (updatedAt > maxDate) max = updatedAt.toISOString();

				return max;
			}, new Date(lastRunTimestamp).toISOString());

			/** Write the latest timestamp to the file */
			writeFileSync(LAST_UPDATE_TIMESTAMP_PATH, latestTimestamp);

			/** Set the environment variable to indicate that changes were detected */
			process.env.CHANGES_DETECTED = 'true';
			console.log('Documents changed or created since the last run:');
			result.forEach((doc) => {
				console.log(`- ${doc._id} (${doc._type}) (${doc._updatedAt})`);
			});

			process.stdout.write('true');
		} else {
			/** Set the environment variable to indicate that no changes were detected */
			process.env.CHANGES_DETECTED = 'false';
			console.log('No changes detected since the last run.');

			process.stdout.write('false');
		}
	} catch (error) {
		console.log(error);
	}
})();
