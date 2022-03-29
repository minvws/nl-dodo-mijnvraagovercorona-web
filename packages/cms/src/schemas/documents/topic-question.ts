export default {
	title: 'Onderwerp Vraag Documenten',
	name: 'topic-question-document',
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
			title: 'Onderwerp',
			name: 'topic',
			type: 'reference',
			to: [{ type: 'topic-document' }],
		},
		{
			title: 'Antwoorden',
			name: 'answers',
			type: 'array',
			of: [
				{
					title: 'Antwoord',
					name: 'answer',
					type: 'object',
					fields: [
						{
							title: 'Content',
							name: 'content',
							type: 'localeBlock',
						},
						{
							title: 'Volgende',
							name: 'next',
							type: 'reference',
							to: [
								{ type: 'topic-question-document' },
								{ type: 'topic-result-document' },
							],
						},
					],
					preview: {
						select: {
							title: 'content.nl',
							subtitle: 'content.next.header.title',
						},
					},
				},
			],
		},
		{
			title: 'Button',
			name: 'button',
			type: 'localeString',
		},
		{
			title: 'Stappen',
			name: 'steps',
			type: 'object',
			fields: [
				{
					title: 'Huidige',
					name: 'current',
					type: 'number',
				},
				{
					title: 'Totaal',
					name: 'total',
					type: 'number',
				},
			],
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'header.title.nl',
			},
		},
	],
	preview: {
		select: {
			title: 'header.title.nl',
			subtitle: 'topic.name.nl',
		},
	},
};
