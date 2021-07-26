export default {
	title: 'Check Ik ben beschermd Pagina',
	name: 'check-ik-ben-beschermd-page',
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
			title: 'Beschermd header pre title',
			name: 'pretitle',
			type: 'localeString',
		},
		{
			title: 'Beschermd text',
			name: 'isBeschermdText',
			type: 'localeBlock',
		},
		{
			title: 'URL',
			name: 'url',
			type: 'string',
		},
	],
};
