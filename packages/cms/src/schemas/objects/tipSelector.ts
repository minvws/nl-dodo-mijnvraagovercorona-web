export default {
	title: 'Selecteer tips',
	name: 'tipSelector',
	type: 'array',
	of: [
		{
			title: 'Tip overzicht',
			name: 'tipOverview',
			type: 'object',
			fields: [
				{
					title: 'Tip referentie',
					name: 'tipReference',
					type: 'reference',
					to: [{ type: 'tip-document' }],
				},
			],
			preview: {
				select: {
					title: 'tipReference.header.title.nl',
					subtitle: 'tipReference.slug.current',
				},
			},
		},
	],
};
