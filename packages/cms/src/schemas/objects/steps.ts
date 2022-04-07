export default {
	title: 'Stappen',
	name: 'steps',
	type: 'array',
	of: [
		{
			type: 'object',
			preview: {
				select: {
					title: 'title.nl',
				},
			},
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
					title: 'Punten',
					name: 'points',
					type: 'array',
					of: [
						{
							type: 'object',
							preview: {
								select: {
									title: 'title.nl',
								},
							},
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
							],
						},
					],
				},
			],
		},
	],
};
