import { defineField, defineType } from 'sanity'

export default defineType({
	title: 'Verhaal',
	name: 'story',
	type: 'object',
	preview: {
		select: {
			title: 'title.nl',
			subtitle: 'pretitle.nl',
			media: 'image',
		},
	},
	fields: [
		defineField({
			title: 'Chapeau',
			name: 'chapeau',
			type: 'localeString',
		}),
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'localeString',
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'localeBlock',
		}),
		defineField({
			title: 'Buttons',
			name: 'buttons',
			type: 'array',
			of: [{ type: 'button' }],
		}),
		defineField({
			title: 'Afbeelding',
			name: 'image',
			type: 'image',
		}),
	],
});
