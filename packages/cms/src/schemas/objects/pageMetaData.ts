export default {
	title: 'Page meta data',
	name: 'pageMetaData',
	type: 'object',
	initialValue: {
		site: 'mijn-vraag-over-corona',
	},
	fields: [
		{
			title: 'Site',
			name: 'site',
			type: 'string',
			readOnly: true,
			options: {
				list: ['reizen-tijdens-corona', 'mijn-vraag-over-corona'],
			},
		},
		{ title: 'Titel', name: 'title', type: 'localeString' },
		{ title: 'Omschrijving', name: 'description', type: 'localeString' },
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
				'Als deze toggle aan staat zal de pagina niet geindexeerd worden door Google.',
		},
	],
	options: {
		collapsible: true,
		collapsed: true,
	},
};
