export default {
	title: 'Check Landing Pagina',
	name: 'check-landing-page',
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
					title: 'Voorloper titel',
					name: 'pretitle',
					type: 'localeString',
				},
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
			title: 'Cases titel',
			name: 'titleCases',
			type: 'localeString',
		},
		{
			title: 'Cases',
			name: 'cases',
			type: 'array',
			of: [
				{
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
						{
							title: 'Titel',
							name: 'title',
							type: 'localeString',
						},
						{
							title: 'Titel suffix',
							name: 'titleSuffix',
							type: 'localeString',
						},
						{
							title: 'Intro',
							name: 'intro',
							type: 'localeString',
						},
						{
							title: 'Lees meer knop',
							name: 'readMoreLabel',
							type: 'localeString',
						},
						{
							title: 'ContentBlocks',
							name: 'contentBlocks',
							type: 'contentBlocks',
						},
					],
				},
			],
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
							type: 'localeText',
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
