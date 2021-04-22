export default {
	title: 'Condities',
	name: 'conditions',
	type: 'object',
	fields: [
		{
			title: 'Reisfase',
			name: 'travelfase',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'travel-fase-document' }] }],
		},
		{
			title: 'Risico Categorie',
			name: 'riskCategory',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'risk-category-document' }] }],
		},
		{
			title: 'Vervoersmethode',
			name: 'meansOfTransport',
			type: 'array',
			of: [
				{ type: 'reference', to: [{ type: 'means-of-transport-document' }] },
			],
		},
		{
			title: 'Dagen sinds thuiskomst',
			name: 'daysHome',
			type: 'array',
			of: [{ type: 'number' }],
		},
		{
			title: 'Coronamelder',
			name: 'coronamelder',
			type: 'boolean',
		},
		{
			title: 'Voormalig vliegverbod',
			name: 'formerFlyRestriction',
			type: 'boolean',
		},
	],
};
