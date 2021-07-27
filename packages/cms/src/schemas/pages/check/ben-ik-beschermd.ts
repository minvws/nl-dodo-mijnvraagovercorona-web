export default {
	title: 'Check Ben ik beschermd Pagina',
	name: 'check-ben-ik-beschermd-page',
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
			title: 'Beschermd veld label',
			name: 'beschermdLabel',
			type: 'localeString',
		},
		{
			title: 'Beschermd help text',
			name: 'beschermdHelpText',
			type: 'localeBlock',
		},
		{
			title: 'Beschermd ja label',
			name: 'beschermdYesLabel',
			type: 'localeBlock',
		},
		{
			title: 'Beschermd nee label',
			name: 'beschermdNoLabel',
			type: 'localeBlock',
		},
		{
			title: 'Beschermd button text',
			name: 'beschermdButtonText',
			type: 'localeString',
		},
		{
			title: 'URL',
			name: 'url',
			type: 'string',
		},
		{
			title: 'Huidige stap label',
			name: 'currentStepLabel',
			type: 'localeString',
		},
	],
};
