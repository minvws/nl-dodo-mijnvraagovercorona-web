import dotenv from 'dotenv';

/** Get the custom set environment */
const ENV = process.env.ENVIRONMENT || 'development';

/** Use the env based on the passed env value */
dotenv.config({ path: `.env.${ENV}` });

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sanity from 'astro-sanity';
import Compress from 'astro-compress';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import pagefind from 'astro-pagefind';
import icon from 'astro-icon';

console.log(`ENVIRONMENT: ${ENV}`);

export default defineConfig({
	site: 'https://mijnvraagovercorona.nl/',
	scopedStyleStrategy: 'where',
	integrations: [
		// @ts-expect-error
		sitemap(),
		// @ts-expect-error
		sanity({
			projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
			dataset: process.env.PUBLIC_SANITY_DATASET,
			apiVersion: 'v2023-03-21',
			useCdn: process.env.NODE_ENV === 'production',
		}),
		// @ts-expect-error
		Compress({
			CSS: false,
			HTML: false,
			JavaScript: false,
		}),
		// @ts-expect-error
		icon(),
		// @ts-expect-error
		pagefind(),
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
