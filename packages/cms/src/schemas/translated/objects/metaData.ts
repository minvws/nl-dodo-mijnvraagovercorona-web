export default {
	title: 'Page meta data',
	name: 'metaData',
	type: 'object',
	fields: [
		{
			title: 'Titel',
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		},
		{
			title: 'Omschrijving',
			name: 'description',
			type: 'string',
			validation: (Rule) => Rule.required(),
		},
		{
			title: 'Social share image',
			name: 'socialShareImage',
			description: '1200x632, geen SVG',
			type: 'image',
		},
		{
			title: 'Geen geldig zoekresultaat',
			name: 'noIndex',
			type: 'boolean',
			description:
				'Als deze toggle aan staat zal de pagina niet geindexeerd worden door zoekmachines.',
		},
	],
	options: {
		collapsible: true,
		collapsed: true,
	},
};
