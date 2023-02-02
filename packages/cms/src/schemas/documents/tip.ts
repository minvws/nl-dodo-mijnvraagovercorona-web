import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Tips',
	name: 'tip-document',
	type: 'document',
	fields: [
		defineField({
			title: 'Meta data',
			name: 'metaData',
			type: 'pageMetaData',
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
					title: 'Afbeelding',
					name: 'image',
					type: 'image',
				}),
				defineField({
					title: 'Content',
					name: 'content',
					type: 'localeBlock',
				}),
				defineField({
					title: 'Toon table of contents',
					name: 'showTOC',
					type: 'boolean',
					description:
						'Als deze toggle aan staat genereren we een table of contents.',
				}),
			],
		}),
		defineField({
			title: 'Verhalen',
			name: 'storiesCollection',
			type: 'array',
			of: [
				{
					title: 'Verhaal',
					name: 'story',
					type: 'reference',
					to: [{ type: 'story-document' }],
				},
			],
		}),
		defineField({
			title: 'Meer tips',
			name: 'moreTips',
			type: 'moreTips',
		}),
		defineField({
			title: 'Bronnen',
			name: 'sources',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'localeString',
					description:
						'Indien titel leeg word gelaten wordt `Bronnen` in siteSettings getoond',
				}),
				defineField({
					title: 'Content',
					name: 'content',
					type: 'localeBlock',
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
			title: 'header.title.nl',
			subtitle: 'slug.current',
			media: 'header.image',
		},
	},
});
