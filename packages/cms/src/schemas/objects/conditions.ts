export default {
	title: 'Condities',
	name: 'conditions',
	type: 'object',
	fields: [
		{
			title: 'Reisfase',
			name: 'travelStage',
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
			title: 'Risico Categorie Tussenstop Kort',
			name: 'stopoverShort',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'risk-category-document' }] }],
		},
				{
			title: 'Risico Categorie Tussenstop Lang',
			name: 'stopoverLong',
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
			title: 'Gebruik hoogste risico categorie',
			name: 'useHighestRiskCategory',
			description: 'Gebruik voor de conditie "Risico Categorie" de hoogste risico categorie tussen zowel de tussenstop als de eindbestemming',
			type: 'boolean',
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
