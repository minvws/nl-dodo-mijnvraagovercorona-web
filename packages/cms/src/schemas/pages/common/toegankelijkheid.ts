export default {
	title: 'Toegankelijkheid Pagina',
	name: 'toegankelijkheid-page',
	type: 'document',
	fields: [
		{
			title: 'Meta data',
			name: 'metaData',
			type: 'pageMetaData',
		},
		{
			title: 'Titel',
			name: 'title',
			type: 'localeString',
		},
		{
			title: 'Content',
			name: 'content',
			type: 'localeBlock',
		},
		{
			title: 'URL',
			name: 'url',
			type: 'string',
		},
	],
	preview: {
		select: {
			title: 'metaData.site',
		},
	},
};
