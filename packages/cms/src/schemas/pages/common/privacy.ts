import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Privacy Pagina',
	name: 'privacy-page',
	type: 'document',
	fields: [
		defineField({
			title: 'Meta data',
			name: 'metaData',
			type: 'pageMetaData',
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
