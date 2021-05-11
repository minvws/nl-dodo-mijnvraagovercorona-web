export default {
	title: 'Reizen blok',
	name: 'travelCard',
	type: 'object',
	fields: [
		{
			title: 'Titel',
			name: 'title',
			type: 'localeString',
		},
		{
			title: 'Subtitel',
			name: 'subtitle',
			type: 'localeString',
		},
		{
			title: 'Content',
			name: 'content',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							title: 'Content',
							name: 'content',
							type: 'localeBlock',
						},
						{
							title: 'Condities',
							name: 'conditions',
							type: 'conditions',
						},
					],
					preview: {
						select: {
							title: 'content.nl',
						},
					},
				},
			],
		},
		{
			title: 'Onderdelen',
			name: 'bullets',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							title: 'Content',
							name: 'content',
							type: 'localeBlock',
						},
						{
							title: 'Icoon',
							name: 'icon',
							type: 'string',
							options: {
								list: ['safe', 'warning-yellow', 'warning-red'],
							},
						},
						{
							title: 'Condities',
							name: 'conditions',
							type: 'conditions',
						},
					],
					preview: {
						select: {
							title: 'content.nl',
						},
					},
				},
			],
		},
	],
	options: {
		collapsible: true,
		collapsed: true,
	},
};
