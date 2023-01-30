import { defineField, defineType } from 'sanity'

export default defineType({
	title: 'Video',
	name: 'video',
	type: 'object',
	fields: [
		defineField({
			title: 'Video embed URL',
			name: 'url',
			type: 'url',
		}),
		defineField({
			title: 'Cover image',
			name: 'image',
			type: 'image',
		}),
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'localeString',
			description: 'Word getoond/voorgelezen aan screenreader gebruikers',
		}),
	],
	preview: {
		select: {
			title: 'title.nl',
			subtitle: 'url',
			icon: 'image',
		},
	},
});
