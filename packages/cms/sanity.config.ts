import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { documentInternationalization } from '@sanity/document-internationalization';
import { scheduledPublishing } from '@sanity/scheduled-publishing';

import schemas from './src/schemas/schema';
import deskStructure from './src/deskStructure';
import { studioDataSet, studioProjectID, studioTitle } from './src/environment';
import { theme } from './src/theme';

export default defineConfig({
	theme,
	title: studioTitle,
	projectId: studioProjectID,
	dataset: studioDataSet,
	plugins: [
		deskTool({
			structure: deskStructure,
		}),
		scheduledPublishing(),
		visionTool(),
		documentInternationalization({
			// Required:
			supportedLanguages: [
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
			schemaTypes: [
				'assistance',
				'card',
				'cta-button-document',
				'duo-column-content',
				'modals',
				'siteSettings',
				'tale',
				'pza-landing-page',
				'locations-page',
				'advice-page',
				'error-page',
				'generic-page',
				'homepage',
				'question-page',
				'question-landing-page',
				'theme-page',
			],
			// Optional:
			weakReferences: true, // default false
			languageField: '__i18n_lang', // default "language"
		}),
	],
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
