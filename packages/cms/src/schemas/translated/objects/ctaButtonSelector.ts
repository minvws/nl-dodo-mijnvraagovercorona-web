import { defineField, defineType } from 'sanity';
import { filterReferenceByLanguage } from '../../../utilities/filterReferenceByLanguage';

export default defineType({
	title: 'CTA Knoppen',
	name: 'ctaButtonSelector',
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
	],
});
