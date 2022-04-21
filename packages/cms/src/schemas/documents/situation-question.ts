export default {
	title: 'Situatie Vraag Documenten',
	name: 'situation-question-document',
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
			to: [{ type: 'situation-flow-document' }],
		},
		{
			title: 'Type vraag',
			name: 'type',
			type: 'string',
			options: {
				list: ['datepicker', 'single', 'multiple'],
			},
		},
		{
			title: 'Antwoorden',
			name: 'answersSingle',
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
								{ type: 'situation-question-document' },
								{ type: 'situation-result-document' },
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
			hidden: ({ document }: { document: { type: string } }) =>
				document?.type !== 'single',
		},
		{
			title: 'Antwoorden',
			name: 'answersMultiple',
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
					],
					preview: {
						select: {
							title: 'content.nl',
							subtitle: 'content.next.header.title',
						},
					},
				},
			],
			hidden: ({ document }: { document: { type: string } }) =>
				document?.type !== 'multiple',
		},
		{
			title: 'Toon meer',
			name: 'showMore',
			type: 'object',
			fields: [
				{
					title: 'Maximum aantal antwoorden',
					name: 'max',
					type: 'number',
				},
				{
					title: 'Text',
					name: 'text',
					type: 'localeString',
				},
			],
			hidden: ({ document }: { document: { type: string } }) =>
				document?.type !== 'multiple',
		},
		{
			title: 'Buttons',
			name: 'buttons',
			type: 'array',
			of: [
				{
					title: 'Button',
					name: 'button',
					type: 'object',
					fields: [
						{
							title: 'Tekst',
							name: 'text',
							type: 'localeString',
						},
					],
				},
			],
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'header.title.nl',
				isUnique: () => true,
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
