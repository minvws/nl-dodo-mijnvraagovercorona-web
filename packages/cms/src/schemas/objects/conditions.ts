export default {
	title: 'Condities',
	name: 'conditions',
	type: 'object',
	fields: [
		{
			title: 'Risico Categorie',
			name: 'riskCategory',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'risk-category-document' }] }],
		},
		{
			title: 'Coronamelder',
			name: 'coronamelder',
			type: 'boolean',
		},
	],
};
