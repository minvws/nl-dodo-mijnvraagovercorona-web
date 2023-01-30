import { defineField, defineType } from 'sanity'

export default defineType({
	title: 'Page meta data',
	name: 'pageMetaData',
	type: 'object',
	initialValue: {
		site: 'mijn-vraag-over-corona',
	},
	fields: [
		defineField({
			title: 'Site',
			name: 'site',
			type: 'string',
			readOnly: true,
			options: {
				list: ['reizen-tijdens-corona', 'mijn-vraag-over-corona'],
			},
		}),
		defineField({ title: 'Titel', name: 'title', type: 'localeString' }),
		defineField({ title: 'Omschrijving', name: 'description', type: 'localeString' }),
		defineField({
			title: 'Social share image',
			name: 'socialShareImage',
			description: '1200x632, geen SVG',
			type: 'image',
		}),
		defineField({
			title: 'Geen geldig zoekresultaat',
			name: 'noIndex',
			type: 'boolean',
			description:
				'Als deze toggle aan staat zal de pagina niet geindexeerd worden door Google.',
		}),
	],
	options: {
		collapsible: true,
		collapsed: true,
	},
});
