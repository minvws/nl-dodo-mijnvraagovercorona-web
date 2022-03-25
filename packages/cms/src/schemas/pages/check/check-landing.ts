export default {
	title: 'Check Landing Pagina',
	name: 'check-landing-page',
	type: 'document',
	fieldsets: [{ name: 'situations', title: 'Situaties' }],
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
					title: 'Chapeau',
					name: 'chapeau',
					type: 'localeString',
				},
				{
					title: 'Subtitel',
					name: 'subtitle',
					type: 'localeString',
				},

				{
					title: 'Situatie titel',
					name: 'currentSituation',
					type: 'localeString',
				},
				{
					title: 'Maatregelen titel',
					name: 'measuresTitle',
					type: 'localeString',
				},
				{
					title: 'Maatregelen tekst',
					name: 'measuresText',
					type: 'localeString',
				},
				{
					title: 'Advies Title',
					name: 'adviceTitle',
					type: 'localeString',
				},
				{
					title: 'Adviezen',
					name: 'advice',
					type: 'array',
					of: [
						{
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
									title: 'Icoon',
									name: 'icon',
									type: 'image',
								},
							],
							preview: {
								select: {
									title: 'title.nl',
									subtitle: 'subtitle.nl',
									media: 'icon',
								},
							},
						},
					],
				},
			],
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
		{
			title: 'Cases nieuw',
			name: 'folders',
			type: 'array',
			hidden: true,
			of: [
				{
					type: 'folder',
				},
			],
		},
		{
			title: 'Cases titel',
			name: 'titleCases',
			type: 'localeString',
			fieldset: 'situations',
		},
		{
			title: 'Cases mobile afbeelding',
			name: 'imageMobileCases',
			type: 'image',
			fieldset: 'situations',
		},
		{
			title: 'Cases desktop afbeelding',
			name: 'imageDesktopCases',
			type: 'image',
			fieldset: 'situations',
		},
		{
			title: 'Cases',
			name: 'cases',
			type: 'array',
			fieldset: 'situations',
			of: [{ type: 'case' }],
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
			title: 'Onderwerpen',
			name: 'topics',
			type: 'object',
			fields: [
				{ title: 'Titel', name: 'title', type: 'localeString' },
				{
					title: 'Onderwerpen',
					name: 'topics',
					type: 'array',
					of: [
						{
							title: 'Ondwerp',
							name: 'topic',
							type: 'object',
							fields: [
								{ title: 'Icoon', name: 'icon', type: 'image' },
								{ title: 'Titel', name: 'title', type: 'localeString' },
								{ title: 'Link', name: 'href', type: 'string' },
							],
						},
					],
				},
			],
		},
		{
			title: 'Hulp',
			name: 'help',
			type: 'object',
			fields: [
				{ title: 'Titel', name: 'title', type: 'localeString' },
				{ title: 'Stel je vraag', name: 'question', type: 'localeString' },
				{ title: 'Openingstijden', name: 'openingHours', type: 'localeString' },
			],
		},
		{
			title: 'Feedback',
			name: 'feedback',
			type: 'object',
			fields: [
				{ title: 'Titel', name: 'title', type: 'localeString' },
				{ title: 'Button', name: 'button', type: 'localeString' },
			],
		},
		{
			title: 'URL',
			name: 'url',
			type: 'string',
		},
	],
};
