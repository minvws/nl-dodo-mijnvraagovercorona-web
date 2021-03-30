export default {
	title: 'Reizen Periode Pagina',
	name: 'periode-page',
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
			title: 'Terug tekst',
			name: 'terugTekst',
			type: 'localeString',
		},
		{
			title: 'Datum kiestekst',
			name: 'datumKiesTekst',
			type: 'localeString',
		},
		{
			title: 'Datum tussentekst',
			name: 'datumTussenTekst',
			type: 'localeString',
		},
		{
			title: 'Maanden',
			name: 'maanden',
			type: 'array',
			of: [
				{
					title: 'Maand',
					name: 'maand',
					type: 'localeString',
				},
			],
		},
		{
			title: 'Dagen',
			name: 'dagen',
			type: 'array',
			of: [
				{
					title: 'Dag',
					name: 'dag',
					type: 'localeString',
				},
			],
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
