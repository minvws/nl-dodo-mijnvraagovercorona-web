import { defineField, defineType } from 'sanity'

export default defineType({
	title: 'Case',
	name: 'case',
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
			title: 'Titel',
			name: 'title',
			type: 'localeString',
		}),
		defineField({
			title: 'Titel suffix',
			name: 'titleSuffix',
			type: 'localeString',
		}),
		defineField({
			title: 'Intro',
			name: 'intro',
			type: 'localeString',
		}),
		defineField({
			title: 'Lees meer knop',
			name: 'readMoreLabel',
			type: 'localeString',
		}),
		defineField({
			title: 'ContentBlocks',
			name: 'contentBlocks',
			type: 'contentBlocks',
		}),
	],
});
