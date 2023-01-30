import { defineField, defineType } from 'sanity'

export default defineType({
	title: 'Verhaal uitgebreid',
	name: 'storyExtended',
	type: 'object',
	preview: {
		select: {
			title: 'title.nl',
			subtitle: 'overview.title.nl',
			media: 'overview.icon',
		},
	},
	fields: [
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'localeString',
		}),
		defineField({
			title: 'Content Blocks',
			name: 'contentBlocks',
			type: 'contentBlocks',
		}),
		defineField({
			title: 'Overzicht',
			name: 'overview',
			type: 'object',
			description: 'wordt alleen weergegeven op pagina’s met een TOC',
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				}),
				defineField({
					title: 'Icoon',
					name: 'icon',
					type: 'image',
				}),
			],
		}),
	],
});
