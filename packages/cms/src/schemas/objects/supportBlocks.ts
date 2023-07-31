import { defineType, defineField } from 'sanity';
import { filterReferenceByLanguage } from '../../utilities/filterReferenceByLanguage';

export default defineType({
	title: 'Hulp per onderwerp',
	name: 'supportBlocks',
	type: 'object',
	fields: [
		defineField({
			title: 'Label',
			name: 'label',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((label, context) =>
					!context.document.cards?.items?.length
						? true
						: label && label.length >= 1
						? true
						: 'Label verplicht',
				),
		}),

		defineField({
			title: 'Onderwerpen',
			name: 'items',
			description: 'Voeg (alleen) kaarten toe met een icoon',
			type: 'array',
			of: [
				{
					title: 'Card',
					name: 'card',
					type: 'reference',
					to: [{ type: 'card' }],
					options: {
						filter: filterReferenceByLanguage,
					},
				},
			],
			validation: (Rule) =>
				Rule.custom((items) => {
					if (!items) return true;
					return items.length === 0 || (items.length >= 2 && items.length <= 4)
						? true
						: 'Het moet minmaal 2, maximaal 4 items bevatten';
				}),
		}),
	],
});
