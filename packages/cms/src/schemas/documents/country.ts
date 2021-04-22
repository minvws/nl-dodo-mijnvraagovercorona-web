export default {
	title: 'Land Documenten',
	name: 'land-document',
	type: 'document',
	fields: [
		{
			title: 'Slug',
			name: 'slug',
			type: 'string',
		},
		{
			title: 'Naam',
			name: 'name',
			type: 'localeString',
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
		{
			title: 'Risico Categorie',
			name: 'riskCategory',
			type: 'reference',
			to: [{ type: 'risk-category-document' }],
		},
		{
			title: 'Synoniemen',
			name: 'synonyms',
			type: 'array',
			of: [{ type: 'localeString' }],
		},
	],
	preview: {
		select: {
			title: 'name.nl',
			subtitle: 'riskCategory.label',
		},
	},
};
