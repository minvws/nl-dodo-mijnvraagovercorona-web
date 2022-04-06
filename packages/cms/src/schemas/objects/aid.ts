export default {
	title: 'Hulp',
	name: 'aid',
	type: 'object',
	fields: [
		{
			title: 'Titel',
			name: 'title',
			type: 'localeString',
		},
		{
			title: 'Content',
			name: 'content',
			type: 'localeBlock',
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
};
