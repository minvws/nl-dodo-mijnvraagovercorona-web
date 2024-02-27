import { defineType, defineField } from 'sanity';
import { filterReferenceByLanguage } from '../../utilities/filterReferenceByLanguage';

export default defineType({
	title: 'Meest gestelde vragen',
	name: 'cards',
	type: 'object',
	fields: [
		defineField({
			title: 'Label',
			name: 'label',
			type: 'string',
			description: 'Dit veld word alleen getoond voor screenreader gebruikers',
			readOnly: ({ parent }) => !parent?.items?.length,
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
			title: 'Kaarten',
			name: 'items',
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
					return items.length === 0 || (items.length >= 2 && items.length <= 3)
						? true
						: 'Het moet minmaal 2, maximaal 3 items bevatten';
				}),
		}),
	],
});
