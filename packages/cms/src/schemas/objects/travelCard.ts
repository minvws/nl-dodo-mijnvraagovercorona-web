import { defineField, defineType } from 'sanity'

export default defineType({
	title: 'Reizen blok',
	name: 'travelCard',
	type: 'object',
	fields: [
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'localeString',
		}),
		defineField({
			title: 'Subtitel',
			name: 'subtitle',
			type: 'localeString',
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						defineField({
							title: 'Content',
							name: 'content',
							type: 'localeBlock',
						}),
						defineField({
							title: 'Condities',
							name: 'conditions',
							type: 'conditions',
						}),
					],
					preview: {
						select: {
							title: 'content.nl',
						},
					},
				},
			],
		}),
		defineField({
			title: 'Onderdelen',
			name: 'bullets',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						defineField({
							title: 'Content',
							name: 'content',
							type: 'localeBlock',
						}),
						defineField({
							title: 'Icoon',
							name: 'icon',
							type: 'string',
							options: {
								list: ['safe', 'warning-yellow', 'warning-red'],
							},
						}),
						defineField({
							title: 'Condities',
							name: 'conditions',
							type: 'conditions',
						}),
					],
					preview: {
						select: {
							title: 'content.nl',
							subtitle: 'conditions.riskCategory',
							// There is no way to get all properties form an array,
							// so you have to fetch them one by one (even if they might not exist),
							// and concat them in prepare below.
							// https://www.sanity.io/docs/previews-list-views
							riskcategory0: 'conditions.riskCategory.0.name',
							riskcategory1: 'conditions.riskCategory.1.name',
							riskcategory2: 'conditions.riskCategory.2.name',
							riskcategory3: 'conditions.riskCategory.3.name',
						},
						prepare({
							title,
							riskcategory0,
							riskcategory1,
							riskcategory2,
							riskcategory3,
						}: any) {
							const riskLevels = [
								riskcategory0,
								riskcategory1,
								riskcategory2,
								riskcategory3,
							].filter(Boolean);

							return {
								title: title[0].children[0].text,
								subtitle: riskLevels.join(', '),
							};
						},
					},
				},
			],
		}),
	],
	options: {
		collapsible: true,
		collapsed: true,
	},
});
