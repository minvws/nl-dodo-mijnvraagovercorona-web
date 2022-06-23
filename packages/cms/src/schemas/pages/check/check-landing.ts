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
			title: 'Hulp',
			name: 'help',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
			},
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
