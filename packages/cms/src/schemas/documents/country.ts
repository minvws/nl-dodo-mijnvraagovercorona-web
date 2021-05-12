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
			title: 'Nederland Wereldwijd Slug',
			description:
				'Dit veld hoeft enkel ingevuld te worden wanneer de url slug voor Nederland Wereldwijd anders is.',
			name: 'nederlandWereldwijdSlug',
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
	orderings: [
		{
      		title: 'Naam',
      		name: 'nameAsc',
      		by: [
        		{field: 'name.nl', direction: 'asc'}
      		]
		},
		{
      		title: 'Risico Categorie',
      		name: 'riskCategoryDesc',
      		by: [
        		{field: 'riskCategory.label', direction: 'desc'}
      		]
		}
	],
	preview: {
		select: {
			title: 'name.nl',
			subtitle: 'riskCategory.label',
		},
	},
};
