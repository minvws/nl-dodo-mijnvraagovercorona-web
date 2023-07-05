import sanityClient from '@sanity/client';
import { studioDataSet, studioProjectID } from '../environment';

const client = sanityClient({
	projectId: studioProjectID,
	dataset: studioDataSet,
	apiVersion: '2023-03-21',
	useCdn: false,
});

export default client;
