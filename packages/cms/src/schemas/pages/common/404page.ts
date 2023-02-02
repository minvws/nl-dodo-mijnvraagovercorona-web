import { defineType, defineField } from 'sanity';

export default defineType({
	title: '404 Pagina',
	name: 'error-404-page',
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
					title: 'Voorloper titel',
					name: 'pretitle',
					type: 'localeString',
				}),
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				}),
				defineField({
					title: 'Subtitel',
					name: 'subtitle',
					type: 'localeString',
				}),
				defineField({
					title: 'Button',
					name: 'button',
					type: 'localeString',
				}),
			],
			options: {
				collapsible: true,
				collapsed: true,
			},
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'localeBlock',
		}),
		defineField({
			title: 'URL',
			name: 'url',
			type: 'string',
		}),
	],
	preview: {
		select: {
			title: 'metaData.site',
		},
	},
});
