import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'video',
	name: 'video',
	type: 'object',
	fields: [
		defineField({
			title: 'Video embed URL',
			name: 'url',
			type: 'url',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Cover image',
			name: 'image',
			type: 'image',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'string',
			description: 'Word getoond/voorgelezen aan screenreader gebruikers',
			validation: (Rule) => Rule.required(),
		}),
	],
	options: {
		collapsible: true,
		collapsed: false,
	},
	preview: {
		select: {
			title: 'title',
			subtitle: 'url',
			media: 'image',
		},
	},
});
