import { defineType, defineField } from 'sanity'

export default defineType({
	title: 'Kwetsbaarheid melden Pagina',
	name: 'kwetsbaarheid-melden-page',
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
		{
			title: 'Content',
			name: 'content',
			type: 'localeBlock',
		},
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
