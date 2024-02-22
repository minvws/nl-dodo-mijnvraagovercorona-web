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
import { sanityDataSet, sanityProjectID } from './environment.mjs';

console.log(`ENVIRONMENT: ${ENV}`);

export default defineConfig({
	site: 'https://mijnvraagovercorona.nl/',
	scopedStyleStrategy: 'where',
	integrations: [
		sitemap(),
		sanity({
			projectId: sanityProjectID,
			dataset: sanityDataSet,
			apiVersion: 'v2023-03-21',
			useCdn: false,
		}),
		Compress({
			CSS: false,
			HTML: false,
			JavaScript: false,
		}),
		icon({
			// Icon dir of UI package
			iconDir: '../ui/src/lib/elements/Icon/icons',
		}),
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
