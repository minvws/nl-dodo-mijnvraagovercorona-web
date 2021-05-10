export default {
	title: 'Reizen Tussenstop Pagina',
	name: 'tussenstop-page',
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
			title: 'Button',
			name: 'toResultButton',
			type: 'localeString',
		},
		{
			title: '"Ja"-label',
			name: 'yes',
			type: 'localeString',
		},
		{
			title: '"Nee"-label',
			name: 'no',
			type: 'localeString',
		},
		{
			title: 'Radio button "ja"-tekst',
			name: 'radioYes',
			type: 'localeString',
		},
		{
			title: 'Radio button "nee"-tekst',
			name: 'radioNo',
			type: 'localeString',
		},
		{
			title: '"Land niet gevonden"-tekst',
			name: 'notFound',
			type: 'localeString',
		},
		{
			title: 'Slechtzienden tekst label dat uitleg geeft over land zoekveld',
			name: 'searchLabel',
			type: 'localeString',
		},
		{
			title: 'Land zoekveld placeholder',
			name: 'placeholder',
			type: 'localeString',
		},
		{
			title: 'URL',
			name: 'url',
			type: 'string',
		},
	],
};
