import { defineField, defineType } from 'sanity';
import { filterReferenceByLanguage } from '../../utilities/filterReferenceByLanguage';

export default defineType({
	title: 'CTA Knoppen',
	name: 'ctaButtonSelectorWithCategories',
	type: 'array',
	of: [
		defineField({
			title: 'CTA Knop',
			name: 'ctaButton',
			type: 'reference',
			to: [{ type: 'cta-button-document' }],
			options: {
				filter: filterReferenceByLanguage,
			},
		}),

		defineField({
			title: 'Categorie',
			name: 'category',
			type: 'object',
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
				}),

				defineField({
					title: 'Vraag startpunten',
					name: 'ctaButtonCollection',
					type: 'ctaButtonSelector',
				}),
			],
		}),
	],
});
