export default {
	title: 'Check Ben ik uitgezonderd Pagina',
	name: 'check-ben-ik-uitgezonderd-page',
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
			title: 'Uitgezonderd veld label',
			name: 'uitgezonderdLabel',
			type: 'localeString',
		},
		{
			title: 'Uitgezonderd help text',
			name: 'uitgezonderdHelpText',
			type: 'localeBlock',
		},
		{
			title: 'Uitgezonderd ja label',
			name: 'uitgezonderdYesLabel',
			type: 'localeBlock',
		},
		{
			title: 'Uitgezonderd nee label',
			name: 'uitgezonderdNoLabel',
			type: 'localeBlock',
		},
		{
			title: 'Uitgezonderd button text',
			name: 'uitgezonderdButtonText',
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
