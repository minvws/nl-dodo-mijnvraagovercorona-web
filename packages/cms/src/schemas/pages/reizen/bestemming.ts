export default {
	title: 'Reizen Bestemming Pagina',
	name: 'bestemming-page',
	type: 'document',
	fields: [
		{
			title: 'Meta data',
			name: 'metaData',
			type: 'pageMetaData',
		},
		{
			title: 'Header',
			name: 'header',
			type: 'header',
		},
		{
			title: 'Placeholder',
			name: 'placeholder',
			type: 'localeString',
		},
		{
			title: 'Niet gevonden',
			name: 'nietGevonden',
			type: 'localeString',
		},
		{
			title: 'Button',
			name: 'button',
			type: 'localeString',
		},
		{
			title: 'URL',
			name: 'url',
			type: 'string',
		},
	],
};
