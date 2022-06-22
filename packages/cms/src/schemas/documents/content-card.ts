export default {
	title: 'Content Card',
	name: 'content-card-document',
	type: 'document',
	preview: {
		select: {
			title: 'title.nl',
			subtitle: 'chapeau.nl',
		},
	},
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
			title: 'Content',
			name: 'content',
			type: 'localeBlock',
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
							title: 'Text',
							name: 'text',
							type: 'localeString',
						},
						{
							title: 'Situatie',
							name: 'situation',
							type: 'reference',
							to: [
								{ type: 'situation-question-document' },
								{ type: 'situation-result-document' },
							],
						},
						{
							title: 'Link',
							name: 'link',
							type: 'localeString',
						},
					],
					preview: {
						select: {
							title: 'text.nl',
						},
					},
				},
			],
		},
	],
};
