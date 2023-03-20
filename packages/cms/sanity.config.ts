import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import {
	ReferenceBehavior,
	withDocumentI18nPlugin,
} from '@sanity/document-internationalization';
import { scheduledPublishing } from '@sanity/scheduled-publishing';

import schemas from './src/schemas/schema';
import deskStructure from './src/deskStructure';

export default defineConfig({
	title: 'mijnvraagovercorona.nl',
	projectId: 'yiy91tbc',
	dataset: 'production',
	plugins: withDocumentI18nPlugin(
		[
			deskTool({
				structure: deskStructure,
			}),
			visionTool(),
			scheduledPublishing(),
		],
		{
			base: 'nl',
			referenceBehavior: ReferenceBehavior.WEAK,
			languages: [
				{
					id: 'nl',
					title: 'Nederlands',
				},
				{
					id: 'en',
					title: 'Engels',
				},
				{
					id: 'tr',
					title: 'Turks',
				},
				{
					id: 'pl',
					title: 'Pools',
				},
				{
					id: 'ar',
					title: 'Arabisch',
				},
			],
		},
	),
	tools: (prev) => {
		// 👇 Uses environment variables set by Vite in development mode
		if (import.meta.env.DEV) {
			return prev;
		}

		return prev.filter((tool) => tool.name !== 'vision');
	},
	schema: {
		types: schemas,
	},
});
