import { defineField, defineType } from 'sanity'

export default defineType({
	title: 'Quarantaine Plan',
	name: 'quarantinePlan',
	type: 'array',
	of: [
		{
			title: 'Plan Onderdeel',
			name: 'item',
			type: 'object',
			preview: {
				select: {
					title: 'title',
					showOn: 'showOn',
				},
				prepare({
					title,
					showOn,
				}: {
					title: { nl: string };
					showOn?: number[];
				}) {
					return {
						title: title.nl,
						subtitle: showOn ? `Toon op dagen ${showOn.join(', ')}` : undefined,
					};
				},
			},
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				}),
				defineField({
					title: 'Dag',
					name: 'day',
					type: 'number',
				}),
				defineField({
					title: 'Dagen sinds event om op te tonen',
					name: 'showOn',
					type: 'array',
					of: [{ type: 'number' }],
				}),
				defineField({
					title: 'Onderdelen',
					name: 'bullets',
					type: 'array',
					of: [{ type: 'localeBlock' }],
				}),
			],
		},
	],
});
