import { AiOutlineClockCircle } from 'react-icons/ai';

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
			title: 'Regio',
			name: 'region',
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
		// @TODO: Remove old riskcategory once all risk categories
		// are move to the new riskCategoryPlanning property.
		{
			title: 'Risico Categorie',
			name: 'riskCategory',
			type: 'reference',
			to: [{ type: 'risk-category-document' }],
		},
		{
			title: 'Risico categorie planning',
			name: 'riskCategoryPlanning',
			type: 'array',
			of: [
				{
					name: 'riskCategory',
					title: 'Risicocategorie',
					type: 'object',
					icon: AiOutlineClockCircle,
					fields: [
						{
							title: 'Datum van ingang (0.00u)',
							name: 'startDate',
							type: 'date',
							options: { dateFormat: 'DD-MM-YYYY' },
						},
						{
							title: 'Risicocategorie',
							name: 'riskCategory',
							type: 'reference',
							to: [{ type: 'risk-category-document' }],
						},
					],
					preview: {
						select: {
							title: 'startDate',
							subtitle: 'riskCategory.name',
						},
						prepare({ title, subtitle }: { title: string; subtitle: string }) {
							return {
								title: title ? title.split('-').reverse().join('-') : undefined,
								subtitle,
							};
						},
					},
				},
			],
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
			by: [{ field: 'name.nl', direction: 'asc' }],
		},
		{
			title: 'Risico Categorie',
			name: 'riskCategoryDesc',
			by: [{ field: 'riskCategory.label', direction: 'desc' }],
		},
	],
	preview: {
		select: {
			title: 'name.nl',
			subtitle: 'riskCategoryPlanning.0.riskCategory.label',
		},
	},
};
