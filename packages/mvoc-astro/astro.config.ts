import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sanity from 'astro-sanity';
import compress from 'astro-compress';
import preact from '@astrojs/preact';

export default defineConfig({
	site: 'https://mijnvraagovercorona.nl/',
	integrations: [
		preact({ compat: true }),
		compress(),
		sitemap(),
		sanity({
			projectId: 'yiy91tbc',
			dataset: 'production',
			apiVersion: 'v2022-03-23',
			useCdn: true,
		}),
	],
});
