import { defineField, defineType } from 'sanity';

export default defineType({
	title: 'Tekst met vertalingen in enkelvoud/meervoud',
	name: 'thisOrThatLocaleString',
	type: 'object',
	options: { collapsible: true },
	fields: [
		defineField({
			title: 'This',
			name: 'this',
			type: 'localeString',
		}),
		defineField({
			title: 'That',
			name: 'that',
			type: 'localeString',
		}),
	],
});
