import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sanity from 'astro-sanity';
import compress from 'astro-compress';
import browserslistToEsbuild from 'browserslist-to-esbuild';

export default defineConfig({
	site: 'https://mijnvraagovercorona.nl/',
	integrations: [
		sitemap(),
		sanity({
			projectId: 'yiy91tbc',
			dataset: 'production',
			apiVersion: 'v2022-03-23',
			useCdn: true,
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
