import { defineField, defineType } from 'sanity';
import { filterReferenceByLanguage } from '../../utilities/filterReferenceByLanguage';

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
		defineField({
			title: 'Section title',
			name: 'taleSection',
			type: 'object',
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
				}),
				defineField({
					title: 'Icoon',
					name: 'image',
					type: 'image',
				}),
			],
		}),
	],
});
