import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'DODO-UI Component library',
			logo: {
				src: './src/assets/logo-vws.svg',
				replacesTitle: true,
			},
			customCss: ['./src/lib/globals.scss', './src/sl-override.css'],
			sidebar: [
				{
					label: 'Getting Started',
					link: '/getting-started/',
				},
				{
					label: 'Primitives',
					autogenerate: {
						directory: '/primitives',
					},
				},
				{
					label: 'Elements',
					autogenerate: {
						directory: '/elements',
						collapsed: false,
					},
				},
				{
					label: 'Components',
					autogenerate: {
						directory: '/components',
						collapsed: false,
					},
				},
			],
			components: {
				// Disable Theming
				ThemeProvider: './src/components/Starlight/ThemeProvider.astro',
				ThemeSelect: './src/components/Starlight/ThemeSelect.astro',
			},
		}),
		icon({
			iconDir: 'src/lib/elements/Icon/icons',
		}),
	],
});
