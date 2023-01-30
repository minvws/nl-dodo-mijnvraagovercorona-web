import { defineField, defineType } from 'sanity'

export default defineType({
	title: 'Meer tips',
	name: 'moreTips',
	type: 'object',
	options: {
		collapsible: true,
		collapsed: true,
	},
	fields: [
		defineField({
			title: 'Titel',
			name: 'moreTips',
			type: 'localeString',
			description:
				'Indien titel leeg word gelaten wordt `Meer Tips` in siteSettings getoond',
		}),
		defineField({
			title: 'Meer tips',
			name: 'tipCollection',
			type: 'tipSelector',
		}),
	],
});
