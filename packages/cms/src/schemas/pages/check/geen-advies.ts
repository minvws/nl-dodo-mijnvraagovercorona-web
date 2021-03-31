export default {
	title: 'Geen advies',
	name: 'geen-advies-page',
	type: 'document',
	fields: [
		{
			title: 'Meta data',
			name: 'metaData',
			type: 'pageMetaData',
		},
		{
			title: 'URL',
			name: 'url',
			type: 'string',
		},
		{
			title: 'Header',
			name: 'header',
			type: 'object',
			fields: [
				{
					title: 'Voorloper titel',
					name: 'pretitle',
					type: 'localeString',
				},
				{
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				},
			],
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
		{
			title: 'Content',
			name: 'content',
			type: 'localeBlock',
		},
	],
};
