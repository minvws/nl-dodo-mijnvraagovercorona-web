import { defineField, defineType } from 'sanity'

export default defineType({
	title: 'Onhulling',
	name: 'disclosure',
	type: 'object',
	preview: {
		select: {
			title: 'label.this.nl',
		},
	},
	fields: [
		defineField({
			title: 'Label',
			name: 'label',
			type: 'thisOrThatLocaleString',
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'localeBlock',
		}),
	],
});
