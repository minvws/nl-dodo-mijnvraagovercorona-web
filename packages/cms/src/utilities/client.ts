import { createClient } from '@sanity/client';

const client = createClient({
	projectId: 'yiy91tbc',
	dataset: 'production',
	apiVersion: '2021-10-21',
	useCdn: false,
});

export default client;
