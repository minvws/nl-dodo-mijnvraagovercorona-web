import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	site: `http://astro.build`,
	integrations: [mdx(), preact(), react()],
	vite: {
		resolve: {
			alias: {
				'@design-system-styles/': './src/lib/',
			},
		},
	},
});
