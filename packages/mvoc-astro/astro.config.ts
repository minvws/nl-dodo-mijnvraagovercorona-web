import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sanity from 'astro-sanity';
import compress from 'astro-compress';

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
		resolve: {
			alias: {
				'@design-system-styles/': './src/design-system/',
			},
		},
	},
});
