import { defineField, defineType } from 'sanity';

export default defineType({
	title: 'Folder',
	name: 'folder',
	type: 'object',
	preview: {
		select: {
			title: 'title.nl',
			media: 'image',
		},
	},
	fields: [
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'localeString',
		}),
		defineField({
			title: 'Tekst',
			name: 'content',
			type: 'localeBlock',
		}),
		defineField({
			title: 'Afbeelding',
			name: 'image',
			type: 'image',
		}),
		defineField({
			title: 'Cases',
			name: 'cases',
			type: 'array',
			of: [{ type: 'case' }],
		}),
	],
});
