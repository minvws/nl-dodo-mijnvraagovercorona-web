// sanity.config.js
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { withDocumentI18nPlugin } from '@sanity/document-internationalization';
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
		],
		{
			base: 'nl',
			referenceBehavior: 'strong',
			languages: [
				{
					id: 'nl',
					title: 'Nederlands',
				},
				{
					id: 'en',
					title: 'English',
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
