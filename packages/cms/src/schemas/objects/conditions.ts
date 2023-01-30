import { defineField, defineType } from 'sanity'

export default defineType({
	title: 'Condities',
	name: 'conditions',
	type: 'object',
	fields: [
		defineField({
			title: 'Risico Categorie',
			name: 'riskCategory',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'risk-category-document' }] }],
		}),
		defineField({
			title: 'Coronamelder',
			name: 'coronamelder',
			type: 'boolean',
		}),
	],
});
