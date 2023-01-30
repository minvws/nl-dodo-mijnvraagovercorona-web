import { defineType, defineField } from 'sanity'

export default defineType({	
	title: 'Thema’s',
	name: 'theme-document',
	type: 'document',
	fields: [
		defineField({
			title: 'Meta data',
			name: 'metaData',
			type: 'pageMetaData',
		}),
		defineField({
			title: 'Overzicht',
			name: 'overview',
			type: 'object',
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				}),
				defineField({ title: 'Icoon', name: 'icon', type: 'image' }),
			],
		}),
		defineField({
			title: 'Header',
			name: 'header',
			type: 'object',
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				}),
				defineField({
					title: 'Chapeau',
					name: 'chapeau',
					type: 'localeString',
				}),
				defineField({
					title: 'Content',
					name: 'content',
					type: 'localeBlock',
				}),
				defineField({
					title: 'Illustratie',
					name: 'image',
					type: 'image',
				}),
			],
		}),

		defineField({
			title: 'Flow titel',
			name: 'titleFlow',
			type: 'localeString',
			description: 'Deze titel komt na `X situatie(s)` boven de startpunten',
		}),
		defineField({
			title: 'Vraag startpunten',
			name: 'questionCollection',
			type: 'questionSelector',
		}),
		defineField({
			title: 'Verhalen',
			name: 'storiesCollection',
			type: 'array',
			of: [
				defineField({
					title: 'Verhaal',
					name: 'story',
					type: 'reference',
					to: [{ type: 'story-document' }],
				}),
			],
		}),
		defineField({
			title: 'Hulp',
			name: 'assistanceReference',
			type: 'reference',
			to: [{ type: 'assistance-document' }],
		}),
		defineField({
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'header.title.nl',
			},
		}),
		defineField({
			title: 'URL',
			name: 'url',
			type: 'string',
		}),
	],
	preview: {
		select: {
			title: 'overview.title.nl',
			subtitle: 'slug.current',
			media: 'overview.icon',
		},
	},
});