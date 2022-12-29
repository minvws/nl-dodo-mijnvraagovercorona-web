export default {
	title: 'Link naar interne pagina',
	name: 'internalPageSelector',
	type: 'array',
	of: [
		{
			title: 'Overzicht',
			name: 'pageOverview',
			type: 'object',
			fields: [
				{
					title: 'Label',
					name: 'label',
					type: 'customBlock',
				},
				{
					title: 'Pagina referentie',
					name: 'pageReference',
					type: 'reference',
					to: [
						{ type: 'situation-question-document' },
						{ type: 'situation-result-document' },
						{ type: 'tip-document' },
						{ type: 'theme-document' },
					],
				},
			],
			preview: {
				select: {
					title: 'label',
					subtitle: 'pageReference.slug.current',
				},
			},
		},
	],
};
