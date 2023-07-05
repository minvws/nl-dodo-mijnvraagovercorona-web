import dotenv from 'dotenv-flow';

dotenv.config();

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sanity from 'astro-sanity';
import compress from 'astro-compress';
import browserslistToEsbuild from 'browserslist-to-esbuild';

export default defineConfig({
	site: 'https://mijnvraagovercorona.nl/',
	integrations: [
		sitemap(),
		// @ts-expect-error
		sanity({
			projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
			dataset: process.env.PUBLIC_SANITY_DATASET,
			apiVersion: 'v2023-03-21',
			useCdn: process.env.NODE_ENV === 'production',
		}),
		compress(),
	],
	vite: {
		build: {
			target: browserslistToEsbuild(),
			cssTarget: browserslistToEsbuild(),
		},
		resolve: {
			alias: {
				'@design-system-styles/': './src/design-system/',
			},
		},
	},
});
