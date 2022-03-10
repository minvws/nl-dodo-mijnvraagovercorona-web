export default {
	title: 'Reizen Landing Pagina',
	name: 'landing-page',
	type: 'document',
	fields: [
		{
			title: 'Meta data',
			name: 'metaData',
			type: 'pageMetaData',
		},
		{
			title: 'Header',
			name: 'header',
			type: 'object',
			fields: [
				{
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				},
				{
					title: 'Subtitel',
					name: 'subtitle',
					type: 'localeString',
				},
				{
					title: 'Button',
					name: 'button',
					type: 'localeString',
				},
			],
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
		{
			title: 'Uitleg',
			name: 'uitleg',
			type: 'array',
			of: [
				{
					title: 'Onderdeel',
					name: 'item',
					type: 'object',
					preview: {
						select: {
							title: 'title.nl',
							subtitle: 'pretitle.nl',
							media: 'image',
						},
					},
					fields: [
						{
							title: 'Voortitel',
							name: 'pretitle',
							type: 'localeString',
						},
						{
							title: 'Titel',
							name: 'title',
							type: 'localeString',
						},
						{
							title: 'Omschrijving',
							name: 'description',
							type: 'localeBlock',
						},
						{
							title: 'Afbeelding',
							name: 'image',
							type: 'image',
						},
						{
							title: 'Linklijstje',
							name: 'linklist',
							type: 'object',
							fields: [
								{
									title: 'id',
									name: 'id',
									type: 'localeString',
								},
								{
									title: 'USP',
									name: 'usp',
									type: 'localeString',
								},
							],
						},
					],
				},
			],
		},
		{
			title: 'URL',
			name: 'url',
			type: 'string',
		},
	],
};
