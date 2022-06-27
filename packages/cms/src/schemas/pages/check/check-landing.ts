export default {
	title: 'Check Landing Pagina',
	name: 'check-landing-page',
	type: 'document',
	fieldsets: [
		{
			name: 'situations',
			title: 'Situaties',
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
	],
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
					title: 'Illustratie',
					name: 'image',
					type: 'image',
				},
			],
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
		{
			title: 'Huidige situatie',
			name: 'currentSituation',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				{
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				},
				{
					title: 'Maatregelen',
					name: 'measures',
					type: 'aid',
				},
				{
					title: 'Adviezen',
					name: 'advice',
					type: 'aid',
				},
			],
		},
		{
			title: 'Nu belangrijk',
			name: 'important',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				{
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				},
				{
					title: 'Uitleg',
					name: 'content',
					type: 'localeBlock',
				},
				{
					title: 'Icoon',
					name: 'icon',
					type: 'image',
				},
				{
					title: 'Vraag startpunten',
					name: 'questionCollection',
					type: 'questionSelector',
				},
			],
		},
		{
			title: 'Themas',
			name: 'themes',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				{
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				},
				{
					title: 'Uitleg',
					name: 'content',
					type: 'localeBlock',
				},
				{
					title: 'Thema’s',
					name: 'themeCollection',
					type: 'themeSelector',
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
			title: 'Onderwerpen',
			name: 'topics',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				{ title: 'Titel', name: 'title', type: 'localeString' },
				{
					title: 'Onderwerpen',
					name: 'topics',
					type: 'array',
					of: [
						{
							title: 'Onderwerp',
							name: 'topic',
							type: 'reference',
							to: [{ type: 'topic-document' }],
						},
					],
				},
			],
		},
		{
			title: 'Hulp',
			name: 'assistanceReference',
			type: 'reference',
			to: [{ type: 'assistance-document' }],
		},
		{
			title: 'Feedback',
			name: 'feedback',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
			},
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
