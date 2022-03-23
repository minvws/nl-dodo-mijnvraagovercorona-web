export default {
	title: 'Check Jouw Situatie Pagina',
	name: 'jouw-situatie-page',
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
			type: 'header',
		},
		{
			title: 'Jouw situaties titel',
			name: 'situationsYouTitle',
			type: 'localeString',
		},
		{
			title: 'Jouw situaties',
			name: 'situationsYou',
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
							title: 'ContentBlocks',
							name: 'contentBlocks',
							type: 'contentBlocks',
						},
					],
				},
			],
		},
		{
			title: 'Andere situaties titel',
			name: 'situationsOtherTitle',
			type: 'localeString',
		},
		{
			title: 'Andere situaties',
			name: 'situationsOther',
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
							title: 'ContentBlocks',
							name: 'contentBlocks',
							type: 'contentBlocks',
						},
					],
				},
			],
		},
		{
			title: 'Uitzonderingen titel',
			name: 'situationsExceptionsTitle',
			type: 'localeString',
		},
		{
			title: 'Uitzonderingen content',
			name: 'situationsExceptionsContent',
			type: 'localeBlock',
		},
		{
			title: 'Uitzonderingen',
			name: 'situationsExceptions',
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
							title: 'ContentBlocks',
							name: 'contentBlocks',
							type: 'contentBlocks',
						},
					],
				},
			],
		},
		{
			title: 'Geen match',
			name: 'noMatch',
			type: 'object',
			fields: [
				{ title: 'Titel', name: 'title', type: 'localeString' },
				{ title: 'Button', name: 'button', type: 'localeString' },
				{
					title: 'Content',
					name: 'content',
					type: 'localeBlock',
				},
			],
		},
		{
			title: 'URL',
			name: 'url',
			type: 'string',
		},
		{
			title: 'Huidige stap label',
			name: 'currentStepLabel',
			type: 'localeString',
		},
	],
};
