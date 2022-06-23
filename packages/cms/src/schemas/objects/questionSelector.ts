export default {
	title: 'Vraag startpunten',
	name: 'questionSelector',
	type: 'array',
	of: [
		{
			title: 'Vraag overzicht',
			name: 'questionOverview',
			type: 'object',
			fields: [
				{
					title: 'Titel',
					name: 'title',
					type: 'localeBlock',
				},
				{
					title: 'Vraag referentie',
					name: 'questionReference',
					type: 'reference',
					to: [{ type: 'situation-question-document' }],
				},
			],
			preview: {
				select: {
					title: 'title.nl',
					subtitle: 'questionReference.slug.current',
				},
			},
		},
	],
};
