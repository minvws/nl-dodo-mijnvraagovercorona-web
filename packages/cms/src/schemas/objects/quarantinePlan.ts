export default {
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
				{
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				},
				{
					title: 'Dag',
					name: 'day',
					type: 'number',
				},
				{
					title: 'Dagen sinds event om op te tonen',
					name: 'showOn',
					type: 'array',
					of: [{ type: 'number' }],
				},
				{
					title: 'Onderdelen',
					name: 'bullets',
					type: 'array',
					of: [{ type: 'localeBlock' }],
				},
			],
		},
	],
};
