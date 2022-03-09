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
	],
	preview: {
		select: {
			title: 'name.nl',
			riskCategory0: 'riskCategoryPlanning.0.riskCategory.label',
			riskCategory1: 'riskCategoryPlanning.1.riskCategory.label',
			riskCategory2: 'riskCategoryPlanning.2.riskCategory.label',
			riskCategory3: 'riskCategoryPlanning.3.riskCategory.label',
			riskCategory4: 'riskCategoryPlanning.4.riskCategory.label',
			riskCategory5: 'riskCategoryPlanning.5.riskCategory.label',
			riskCategory6: 'riskCategoryPlanning.6.riskCategory.label',
			riskCategory7: 'riskCategoryPlanning.7.riskCategory.label',
			riskCategory8: 'riskCategoryPlanning.8.riskCategory.label',
			riskCategory9: 'riskCategoryPlanning.9.riskCategory.label',
		},
		prepare({
			title,
			riskCategory0,
			riskCategory1,
			riskCategory2,
			riskCategory3,
			riskCategory4,
			riskCategory5,
			riskCategory6,
			riskCategory7,
			riskCategory8,
			riskCategory9,
		}: {
			title: string;
			riskCategory0: string | undefined;
			riskCategory1: string | undefined;
			riskCategory2: string | undefined;
			riskCategory3: string | undefined;
			riskCategory4: string | undefined;
			riskCategory5: string | undefined;
			riskCategory6: string | undefined;
			riskCategory7: string | undefined;
			riskCategory8: string | undefined;
			riskCategory9: string | undefined;
		}) {
			const riskCategories = [
				riskCategory0,
				riskCategory1,
				riskCategory2,
				riskCategory3,
				riskCategory4,
				riskCategory5,
				riskCategory6,
				riskCategory7,
				riskCategory8,
				riskCategory9,
			].filter(Boolean);

			return {
				title,
				subtitle: riskCategories[riskCategories.length - 1],
			};
		},
	},
};
