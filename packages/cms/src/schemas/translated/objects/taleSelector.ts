import { defineField, defineType } from 'sanity';
import { filterReferenceByLanguage } from '../../../utilities/filterReferenceByLanguage';

export default defineType({
	title: 'Tale',
	name: 'taleSelector',
	type: 'array',
	of: [
		defineField({
			title: 'Tale',
			name: 'tale',
			type: 'reference',
			to: [{ type: 'tale' }],
			options: {
				filter: filterReferenceByLanguage,
			},
		}),
	],
});
